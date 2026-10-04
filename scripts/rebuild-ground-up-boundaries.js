const fs = require('fs');
const path = require('path');
const shapefile = require('shapefile');
const topojsonServer = require('topojson-server');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');

/**
 * Rebuild Ground-Up Boundaries for All 52 US States & Jurisdictions
 * 
 * Upgrades:
 * 1. State Boundaries: 1:500,000 Census Cartographic Boundaries (cb_2022_us_state_500k)
 *    Eliminates all coastal cutoffs, peninsulas, headlands, and island truncation.
 * 2. County Boundaries: 1:500,000 Census Cartographic Boundaries (cb_2022_us_county_500k)
 *    Matching all 3,220 counties with shoreline-precise geometries.
 * 3. Legacy County Fallback: Dissolved member ZIP code polygons for CT planning regions & Valdez-Cordova.
 * 4. City Stitched Boundaries: Precomputed dissolved outer perimeter of member ZIP codes.
 * 5. Updates national search index and distribution bundles.
 */

function cleanSvgPath(d, decimals = 2) {
  if (!d) return '';
  const factor = Math.pow(10, decimals);
  let lastX = null, lastY = null;
  return d.replace(/([ML])\s*(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/gi, (m, cmd, xStr, yStr) => {
    const x = Math.round(parseFloat(xStr) * factor) / factor;
    const y = Math.round(parseFloat(yStr) * factor) / factor;
    if (cmd.toUpperCase() === 'L' && x === lastX && y === lastY) {
      return '';
    }
    lastX = x;
    lastY = y;
    return `${cmd.toUpperCase()}${x},${y}`;
  }).replace(/\s+/g, '');
}

function round(val, decimals = 2) {
  const f = Math.pow(10, decimals);
  return Math.round(val * f) / f;
}

async function main() {
  console.log('🚀 Starting National Ground-Up Boundary Alignment Pipeline...');

  // Setup national Albers USA projection
  const us = require('us-atlas/counties-10m.json');
  const statesGeo = topojsonClient.feature(us, us.objects.states);
  const masterProj = d3Geo.geoAlbersUsa().fitSize([960, 600], statesGeo);
  const pathGen = d3Geo.geoPath().projection(masterProj);

  // Puerto Rico Projection Inset
  const prProj = d3Geo.geoConicEqualArea()
    .rotate([66, 0])
    .center([0, 18])
    .parallels([8, 18])
    .scale(1500)
    .translate([900, 545]);
  const prPathGen = d3Geo.geoPath().projection(prProj);

  // Load 500k shapefiles
  console.log('📦 Reading 500k Census State Cartographic Boundaries...');
  const stateShpGeo = await shapefile.read(path.join(__dirname, '..', 'temp_census', 'cb_state_500k', 'cb_2022_us_state_500k.shp'));
  console.log(`✓ Loaded ${stateShpGeo.features.length} state boundaries`);

  console.log('📦 Reading 500k Census County Cartographic Boundaries...');
  const countyShpGeo = await shapefile.read(path.join(__dirname, '..', 'temp_census', 'cb_county_500k', 'cb_2022_us_county_500k.shp'));
  console.log(`✓ Loaded ${countyShpGeo.features.length} county boundaries`);

  // Index county features by GEOID and by STATEFP-name
  const countyByGeoid = new Map();
  const countyByStateAndName = new Map();
  for (const f of countyShpGeo.features) {
    countyByGeoid.set(f.properties.GEOID, f);
    const key = `${f.properties.STATEFP}-${f.properties.NAME.toLowerCase()}`;
    countyByStateAndName.set(key, f);
  }

  // Index state features by STUSPS and STATEFP
  const stateByAbbr = new Map();
  for (const f of stateShpGeo.features) {
    stateByAbbr.set(f.properties.STUSPS, f);
    stateByAbbr.set(f.properties.STATEFP, f);
  }

  const statesDir = path.join(__dirname, '..', 'data', 'usa', 'states');
  const stateFiles = fs.readdirSync(statesDir).filter(f => f.endsWith('.json')).sort();
  console.log(`Processing ${stateFiles.length} state data files...`);

  const statesMaster = [];
  let totalCountiesUpdated = 0;
  let totalCountiesStitched = 0;
  let totalCitiesStitched = 0;

  for (const sf of stateFiles) {
    const abbr = sf.replace('.json', '');
    const statePath = path.join(statesDir, sf);
    const stateData = JSON.parse(fs.readFileSync(statePath, 'utf8'));

    const isPR = (abbr === 'PR' || stateData.fips === '72');
    const activePathGen = isPR ? prPathGen : pathGen;

    // 1. Update State Boundary with 500k Census Geometry
    const stateFeat = stateByAbbr.get(abbr) || stateByAbbr.get(stateData.fips);
    if (stateFeat) {
      const p = cleanSvgPath(activePathGen(stateFeat), 2);
      if (p) {
        stateData.path = p;
        const b = activePathGen.bounds(stateFeat);
        const minX = round(b[0][0]);
        const minY = round(b[0][1]);
        const maxX = round(b[1][0]);
        const maxY = round(b[1][1]);
        const w = round(maxX - minX);
        const h = round(maxY - minY);
        stateData.bounds = [minX, minY, w, h];
        stateData.viewBox = `${minX} ${minY} ${w} ${h}`;

        const center = activePathGen.centroid(stateFeat);
        if (center && !isNaN(center[0])) {
          stateData.center = [round(center[0]), round(center[1])];
        }
      }
    }

    // 2. Load State Zip GeoJSON if present for stitching fallbacks & city dissolves
    let zipGeoFeatures = null;
    const zipGeoPath = path.join(__dirname, '..', 'temp_zipcodes', `${abbr.toLowerCase()}_${stateData.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_zip_codes_geo.min.json`);
    const altZipPath = fs.existsSync(path.join(__dirname, '..', 'temp_zipcodes'))
      ? fs.readdirSync(path.join(__dirname, '..', 'temp_zipcodes')).find(f => f.toLowerCase().startsWith(abbr.toLowerCase() + '_') && f.endsWith('.min.json'))
      : null;
    const actualZipGeoPath = fs.existsSync(zipGeoPath) ? zipGeoPath : (altZipPath ? path.join(__dirname, '..', 'temp_zipcodes', altZipPath) : null);

    if (actualZipGeoPath && fs.existsSync(actualZipGeoPath)) {
      try {
        const rawZips = JSON.parse(fs.readFileSync(actualZipGeoPath, 'utf8'));
        zipGeoFeatures = new Map(rawZips.features.map(f => [String(f.properties.ZCTA5CE10 || '').padStart(5, '0'), f]));
      } catch (e) {}
    }

    // 3. Update Counties with 500k Census Geometry (or ZIP-Stitched Geometry)
    if (stateData.counties && stateData.counties.length > 0) {
      for (const c of stateData.counties) {
        const cleanName = c.name.toLowerCase().replace(/\s+county$/i, '').trim();
        const cFeat = countyByGeoid.get(c.id) ||
                      countyByStateAndName.get(`${stateData.fips}-${cleanName}`) ||
                      countyByStateAndName.get(`${stateData.fips}-${c.name.toLowerCase()}`);

        if (cFeat) {
          const p = cleanSvgPath(activePathGen(cFeat), 2);
          if (p) {
            c.path = p;
            const b = activePathGen.bounds(cFeat);
            const minX = round(b[0][0]);
            const minY = round(b[0][1]);
            const w = round(b[1][0] - b[0][0]);
            const h = round(b[1][1] - b[0][1]);
            c.bounds = [minX, minY, w, h];
            const center = activePathGen.centroid(cFeat);
            if (center && !isNaN(center[0])) {
              c.center = [round(center[0]), round(center[1])];
            }
            totalCountiesUpdated++;
            continue;
          }
        }

        // Fallback: Stitch county from member zip codes (e.g. CT Planning Regions or Valdez-Cordova AK)
        const memberZips = (stateData.zipcodes || []).filter(z =>
          z.county && z.county.toLowerCase().replace(/\s+county$/i, '').trim() === cleanName
        );

        if (memberZips.length > 0 && zipGeoFeatures) {
          const feats = memberZips.map(z => zipGeoFeatures.get(z.zip)).filter(Boolean);
          if (feats.length > 0) {
            try {
              const topo = topojsonServer.topology({ c: { type: 'FeatureCollection', features: feats } }, 4e4);
              const merged = topojsonClient.merge(topo, topo.objects.c.geometries);
              const p = cleanSvgPath(activePathGen(merged), 2);
              if (p) {
                c.path = p;
                const b = activePathGen.bounds(merged);
                const minX = round(b[0][0]);
                const minY = round(b[0][1]);
                const w = round(b[1][0] - b[0][0]);
                const h = round(b[1][1] - b[0][1]);
                c.bounds = [minX, minY, w, h];
                const center = activePathGen.centroid(merged);
                if (center && !isNaN(center[0])) {
                  c.center = [round(center[0]), round(center[1])];
                }
                totalCountiesStitched++;
              }
            } catch (err) {}
          }
        }
      }
    }

    // 4. Stitched ZIP boundaries for Cities & Towns
    if (stateData.cities && stateData.cities.length > 0 && zipGeoFeatures) {
      for (const city of stateData.cities) {
        if (!city.zips || city.zips.length === 0) continue;
        if (city.stitchedPath) continue;

        const feats = city.zips.map(z => zipGeoFeatures.get(z)).filter(Boolean);
        if (feats.length > 0) {
          try {
            const topo = topojsonServer.topology({ c: { type: 'FeatureCollection', features: feats } }, 4e4);
            const merged = topojsonClient.merge(topo, topo.objects.c.geometries);
            const p = cleanSvgPath(activePathGen(merged), 2);
            if (p) {
              city.stitchedPath = p;
              totalCitiesStitched++;
            }
          } catch (e) {}
        }
      }
    }

    // Save updated state file
    fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2), 'utf8');

    // Prepare state metadata for master list
    statesMaster.push({
      fips: stateData.fips,
      abbr: stateData.abbr,
      name: stateData.name,
      capital: stateData.capital,
      population: stateData.population,
      landAreaSqMi: stateData.landAreaSqMi,
      region: stateData.region,
      path: stateData.path,
      bounds: stateData.bounds,
      viewBox: stateData.viewBox,
      center: stateData.center,
      countiesCount: stateData.countiesCount || stateData.counties?.length || 0,
      districtsCount: stateData.districtsCount || stateData.districts?.length || 0,
      citiesCount: stateData.citiesCount || stateData.cities?.length || 0,
      zipCodesCount: stateData.zipCodesCount || stateData.zipcodes?.length || 0,
      regionsCount: stateData.regionsCount || stateData.regions?.length || 0
    });

    process.stdout.write(`✓ ${abbr} `);
  }

  console.log('\n\n═══════════════════════════════════════════════════════════');
  console.log(`✓ Upgraded ${totalCountiesUpdated} counties with 500k Census boundaries`);
  console.log(`✓ Stitched ${totalCountiesStitched} counties from member ZIP codes`);
  console.log(`✓ Precomputed ${totalCitiesStitched} city dissolved stitched boundaries`);
  console.log('═══════════════════════════════════════════════════════════');

  // Save states.json
  const statesJsonPath = path.join(__dirname, '..', 'data', 'usa', 'states.json');
  fs.writeFileSync(statesJsonPath, JSON.stringify(statesMaster, null, 2), 'utf8');
  console.log(`✓ Saved ${statesJsonPath}`);

  // Re-generate search index with updated county & state bounds
  console.log('🔄 Re-generating search index with high-precision bounds...');
  const searchIndex = [];

  for (const st of statesMaster) {
    searchIndex.push({
      type: 'state',
      id: st.abbr,
      name: `${st.name} (${st.abbr})`,
      abbr: st.abbr,
      capital: st.capital,
      center: st.center,
      bounds: st.bounds
    });
  }

  for (const sf of stateFiles) {
    const stateData = JSON.parse(fs.readFileSync(path.join(statesDir, sf), 'utf8'));

    (stateData.regions || []).forEach(r => {
      searchIndex.push({
        type: 'region',
        id: r.id,
        name: `${r.name}, ${stateData.abbr}`,
        metroName: r.name,
        state: stateData.abbr,
        citiesCount: r.citiesCount,
        zipCount: r.zipCount,
        monthlyReach: r.monthlyReach,
        center: r.center,
        bounds: r.bounds
      });
    });

    (stateData.counties || []).forEach(c => {
      searchIndex.push({
        type: 'county',
        id: c.id,
        name: `${c.name} County, ${stateData.abbr}`,
        countyName: c.name,
        state: stateData.abbr,
        bounds: c.bounds
      });
    });

    (stateData.districts || []).forEach(d => {
      searchIndex.push({
        type: 'district',
        id: d.id,
        name: d.name,
        shortName: d.shortName,
        state: stateData.abbr,
        bounds: d.bounds
      });
    });

    (stateData.cities || []).forEach(c => {
      searchIndex.push({
        type: c.tier === 2 ? 'subregion' : 'city',
        id: c.id,
        name: `${c.name}, ${stateData.abbr}`,
        cityName: c.name,
        state: stateData.abbr,
        county: c.county || '',
        metroName: c.metroName || '',
        isCapital: !!c.isCapital,
        zipCount: c.zipCount || (c.zips ? c.zips.length : 1),
        bounds: c.bounds,
        center: c.center,
        tier: c.tier || 1
      });
    });

    (stateData.zipcodes || []).forEach(z => {
      searchIndex.push({
        type: 'zip',
        id: z.zip,
        name: `${z.zip} - ${z.city || 'Area'}, ${stateData.abbr}`,
        zip: z.zip,
        city: z.city || '',
        county: z.county || '',
        district: z.district || '',
        state: stateData.abbr,
        lat: z.lat,
        lon: z.lon,
        x: z.x,
        y: z.y,
        bounds: z.bounds
      });
    });
  }

  const searchIndexPath = path.join(__dirname, '..', 'data', 'usa', 'search-index.json');
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex), 'utf8');
  console.log(`✓ Saved ${searchIndex.length.toLocaleString()} search index entities`);

  console.log('✅ Ground-up boundary rebuild complete!');
}

main().catch(err => {
  console.error('❌ Pipeline failed:', err);
  process.exit(1);
});
