const fs = require('fs');
const path = require('path');
const shapefile = require('shapefile');
const topojsonServer = require('topojson-server');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');

/**
 * Enrich Targeting Hierarchy:
 * 1. Upgrades Congressional Districts to 1:500k Census Precision (cb_2022_us_cd118_500k)
 * 2. Connects all districts to official member ZIP codes from zccd.csv
 * 3. Ingests all Census Places and CDPs from cb_2023_us_place_500k (e.g. Bonny Doon CDP)
 * 4. Ingests recognized sub-localities / neighborhoods (e.g. East San Jose) with stitched boundaries
 * 5. Re-generates national search index and distribution bundles
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

// Master catalog of US metropolitan boroughs, neighborhoods, and sub-markets
const { METRO_NEIGHBORHOODS } = require('../data/usa/metro-neighborhoods-catalog.js');


async function main() {
  console.log('🚀 Starting Congressional District & Sub-Locality Targeting Enrichment...');

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

  // 1. Read 1:500k Congressional Districts
  console.log('📦 Reading 1:500k Census Congressional Districts shapefile...');
  const cd500Geo = await shapefile.read(path.join(__dirname, '..', 'temp_census', 'cb_cd118_500k', 'cb_2022_us_cd118_500k.shp'));
  console.log(`✓ Loaded ${cd500Geo.features.length} 500k Congressional Districts`);

  // Index districts by STATEFP
  const cdByStateFips = new Map();
  for (const f of cd500Geo.features) {
    const sfp = f.properties.STATEFP;
    if (!cdByStateFips.has(sfp)) cdByStateFips.set(sfp, []);
    cdByStateFips.get(sfp).push(f);
  }

  // 2. Read Zip Code to Congressional District Crosswalk
  console.log('📦 Reading Zip to Congressional District crosswalk (zccd.csv)...');
  const zccdLines = fs.readFileSync(path.join(__dirname, '..', 'temp_census', 'zccd.csv'), 'utf8').trim().split('\n');
  const zipsByDistrict = new Map();
  for (let i = 1; i < zccdLines.length; i++) {
    const [fips, abbr, zcta, cd] = zccdLines[i].split(',').map(s => s.trim());
    const distNum = (cd === '0' || cd === '00') ? 'At-Large' : cd.padStart(2, '0');
    const key = `${abbr}-${distNum}`;
    const altKey = `${abbr}-${parseInt(cd, 10)}`;
    if (!zipsByDistrict.has(key)) zipsByDistrict.set(key, new Set());
    if (!zipsByDistrict.has(altKey)) zipsByDistrict.set(altKey, new Set());
    zipsByDistrict.get(key).add(zcta.padStart(5, '0'));
    zipsByDistrict.get(altKey).add(zcta.padStart(5, '0'));
  }
  console.log(`✓ Indexed ZIP mappings for ${zipsByDistrict.size / 2} district keys`);

  // 3. Read Census Places (all 32,608 places & CDPs)
  console.log('📦 Reading 1:500k Census Places shapefile...');
  const placesShpPath = '/Users/eric/.gemini/antigravity/brain/c848c212-eac7-47f5-bb5a-cccdd2a15528/scratch/census_places/cb_2023_us_place_500k.shp';
  const placeSource = await shapefile.open(placesShpPath);
  const placesByState = new Map();
  let totalPlacesRead = 0;

  while (true) {
    const res = await placeSource.read();
    if (res.done) break;
    const p = res.value.properties;
    const st = p.STUSPS;
    if (!placesByState.has(st)) placesByState.set(st, []);
    placesByState.get(st).push(res.value);
    totalPlacesRead++;
  }
  console.log(`✓ Indexed ${totalPlacesRead} Census Places across ${placesByState.size} states/territories`);

  // 4. Process all 52 states
  const statesDir = path.join(__dirname, '..', 'data', 'usa', 'states');
  const stateFiles = fs.readdirSync(statesDir).filter(f => f.endsWith('.json')).sort();
  console.log(`Enriching ${stateFiles.length} state data files...`);

  let totalDistrictsUpdated = 0;
  let totalPlacesAdded = 0;
  let totalNeighborhoodsAdded = 0;

  for (const sf of stateFiles) {
    const abbr = sf.replace('.json', '');
    const statePath = path.join(statesDir, sf);
    const stateData = JSON.parse(fs.readFileSync(statePath, 'utf8'));

    const isPR = (abbr === 'PR' || stateData.fips === '72');
    if (!isPR) {
      const activePathGen = pathGen;

    // A. Upgrade Congressional Districts to 500k Precision
    const cdFeats = cdByStateFips.get(stateData.fips) || [];
    if (cdFeats.length > 0) {
      const newDistricts = [];

      for (const feat of cdFeats) {
        const cdNum = feat.properties.CD118FP;
        const isAtLarge = (cdNum === '00' || cdNum === '0');
        const shortName = isAtLarge ? `${stateData.abbr}-At-Large` : `${stateData.abbr}-${parseInt(cdNum, 10)}`;
        const districtId = `${stateData.abbr}-${cdNum}`;
        const title = isAtLarge ? `${stateData.name} At-Large Congressional District` : `${stateData.name} Congressional District ${parseInt(cdNum, 10)}`;

        const p = cleanSvgPath(activePathGen(feat), 2);
        if (!p) continue;

        const b = activePathGen.bounds(feat);
        const minX = round(b[0][0]);
        const minY = round(b[0][1]);
        const w = round(b[1][0] - b[0][0]);
        const h = round(b[1][1] - b[0][1]);

        let center = activePathGen.centroid(feat);
        if (!center || isNaN(center[0])) {
          center = [minX + w / 2, minY + h / 2];
        } else {
          center = [round(center[0]), round(center[1])];
        }

        // Member ZIP codes
        const memberZipSet = zipsByDistrict.get(shortName) || zipsByDistrict.get(districtId) || new Set();
        const memberZips = Array.from(memberZipSet).sort();

        // Included counties
        const countySet = new Set();
        (stateData.zipcodes || []).forEach(z => {
          if (memberZipSet.has(z.zip) && z.county) {
            countySet.add(z.county.replace(/\s+county$/i, '').trim());
          }
        });

        const landAreaSqMi = round(feat.properties.ALAND * 0.000000386102, 1);

        newDistricts.push({
          id: districtId,
          name: title,
          shortName: shortName,
          state: stateData.abbr,
          congress: '118th',
          session: feat.properties.CDSESSN || '118',
          path: p,
          bounds: [minX, minY, w, h],
          center: center,
          landAreaSqMi: landAreaSqMi,
          zipCount: memberZips.length,
          zips: memberZips,
          counties: Array.from(countySet).sort()
        });

        totalDistrictsUpdated++;
      }

      stateData.districts = newDistricts;
      stateData.districtsCount = newDistricts.length;
    }

    // B. Ingest missing Census Places and CDPs (e.g. Bonny Doon CDP)
    const stPlaces = placesByState.get(abbr) || [];
    const existingCityNames = new Set((stateData.cities || []).map(c => c.name.toLowerCase().trim()));
    const existingCitySlugs = new Set((stateData.cities || []).map(c => (c.id || '').toLowerCase().trim()));

    // Create quick spatial lookup of counties in state for mapping CDP to county
    const countyFeatures = (stateData.counties || []);

    for (const pFeat of stPlaces) {
      const pProps = pFeat.properties;
      const rawName = pProps.NAME;
      const cleanName = rawName.trim();
      const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const cityId = `${abbr}-${slug}`;

      if (existingCityNames.has(cleanName.toLowerCase()) || existingCitySlugs.has(cityId)) {
        // City exists, ensure fullName / LSAD is documented
        const existing = stateData.cities.find(c => c.name.toLowerCase().trim() === cleanName.toLowerCase() || c.id === cityId);
        if (existing) {
          existing.fullName = pProps.NAMELSAD;
          existing.lsad = pProps.LSAD;
          existing.isCdp = (pProps.LSAD === '57');
          if (pProps.ALAND) existing.landAreaSqMi = round(pProps.ALAND * 0.000000386102, 2);
        }
        continue;
      }

      // New Place / CDP (e.g. Bonny Doon CDP)
      const p = cleanSvgPath(activePathGen(pFeat), 2);
      if (!p) continue;

      const b = activePathGen.bounds(pFeat);
      const minX = round(b[0][0]);
      const minY = round(b[0][1]);
      const w = Math.max(0.2, round(b[1][0] - b[0][0]));
      const h = Math.max(0.2, round(b[1][1] - b[0][1]));

      let center = activePathGen.centroid(pFeat);
      if (!center || isNaN(center[0])) {
        center = [minX + w / 2, minY + h / 2];
      } else {
        center = [round(center[0]), round(center[1])];
      }

      // Geo centroid for lat/lon and matching
      const geoCentroid = d3Geo.geoCentroid(pFeat);
      const lon = round(geoCentroid[0], 4);
      const lat = round(geoCentroid[1], 4);

      // Find closest/containing county
      let parentCounty = '';
      if (countyFeatures.length > 0) {
        const cMatch = countyFeatures.find(c =>
          center[0] >= c.bounds[0] && center[0] <= c.bounds[0] + c.bounds[2] &&
          center[1] >= c.bounds[1] && center[1] <= c.bounds[1] + c.bounds[3]
        );
        if (cMatch) parentCounty = cMatch.name;
      }

      // Find closest ZIP codes in state
      const matchingZips = [];
      if (stateData.zipcodes && stateData.zipcodes.length > 0) {
        const candidateZips = stateData.zipcodes.filter(z =>
          (!parentCounty || z.county?.toLowerCase().includes(parentCounty.toLowerCase()))
        );
        const targetList = candidateZips.length > 0 ? candidateZips : stateData.zipcodes;
        const sorted = targetList.map(z => ({
          zip: z.zip,
          dist: Math.hypot((z.lon || 0) - lon, (z.lat || 0) - lat)
        })).sort((a, b) => a.dist - b.dist);

        if (sorted[0] && sorted[0].dist < 0.25) {
          matchingZips.push(sorted[0].zip);
        }
      }

      const placeItem = {
        id: cityId,
        name: cleanName,
        cityName: cleanName,
        fullName: pProps.NAMELSAD,
        lsad: pProps.LSAD,
        isCdp: (pProps.LSAD === '57'),
        type: (pProps.LSAD === '57') ? 'cdp' : 'city',
        state: abbr,
        county: parentCounty,
        path: p,
        bounds: [minX, minY, w, h],
        center: center,
        lat: lat,
        lon: lon,
        zips: matchingZips,
        zipCount: matchingZips.length || 1,
        landAreaSqMi: round(pProps.ALAND * 0.000000386102, 2)
      };

      stateData.cities.push(placeItem);
      existingCityNames.add(cleanName.toLowerCase());
      existingCitySlugs.add(cityId);
      totalPlacesAdded++;
    }

      stateData.citiesCount = stateData.cities.length;
    }

    // C. Add Sub-Localities & Neighborhoods (e.g. East San Jose, Downtown San Jose)
    const stNeighborhoods = METRO_NEIGHBORHOODS.filter(n => n.state === abbr);
    if (stNeighborhoods.length > 0) {
      if (!stateData.subregions) stateData.subregions = [];

      for (const n of stNeighborhoods) {
        const slug = n.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const nType = n.type || 'neighborhood';
        const nid = (nType === 'borough') ? `${abbr}-${slug}` : (n.parentCity ? `${abbr}-${n.parentCity.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${slug}` : `${abbr}-${slug}`);

        // Find member zip codes
        const memberZipCodes = (stateData.zipcodes || []).filter(z => n.zips.includes(z.zip));
        if (memberZipCodes.length === 0) continue;

        const minX = round(Math.min(...memberZipCodes.map(z => z.bounds[0])));
        const minY = round(Math.min(...memberZipCodes.map(z => z.bounds[1])));
        const maxX = round(Math.max(...memberZipCodes.map(z => z.bounds[0] + z.bounds[2])));
        const maxY = round(Math.max(...memberZipCodes.map(z => z.bounds[1] + z.bounds[3])));
        const w = round(maxX - minX);
        const h = round(maxY - minY);
        const center = [round(minX + w / 2), round(minY + h / 2)];

        const stitchedPath = memberZipCodes.map(z => z.path).join(' ');

        const nItem = {
          id: nid,
          name: n.name,
          cityName: n.name,
          fullName: (nType === 'borough') ? `${n.name}, ${abbr}` : (n.parentCity ? `${n.name}, ${n.parentCity}` : `${n.name}, ${abbr}`),
          type: nType,
          tier: n.tier || 2,
          parentCity: n.parentCity,
          metroName: n.metroName,
          county: n.county,
          state: abbr,
          lat: n.lat,
          lon: n.lon,
          center: center,
          bounds: [minX, minY, w, h],
          path: stitchedPath,
          stitchedPath: stitchedPath,
          zips: n.zips,
          zipCount: n.zips.length
        };

        const existingIdx = stateData.subregions.findIndex(s => s.id === nid || s.name === n.name);
        if (existingIdx >= 0) {
          stateData.subregions[existingIdx] = nItem;
        } else {
          stateData.subregions.push(nItem);
        }

        // Also make sure it's in cities array for unified city limits drilldown
        const existingCityIdx = stateData.cities.findIndex(c => c.id === nid || (c.name === n.name && c.parentCity === n.parentCity));
        if (existingCityIdx >= 0) {
          stateData.cities[existingCityIdx] = nItem;
        } else {
          stateData.cities.push(nItem);
        }

        totalNeighborhoodsAdded++;
      }

      stateData.subregionsCount = stateData.subregions.length;
      stateData.citiesCount = stateData.cities.length;
    }

    // Save updated state file
    fs.writeFileSync(statePath, JSON.stringify(stateData, null, 2), 'utf8');
    process.stdout.write(`✓ ${abbr} `);
  }

  console.log('\n\n═══════════════════════════════════════════════════════════');
  console.log(`✓ Upgraded ${totalDistrictsUpdated} Congressional Districts to 500k precision`);
  console.log(`✓ Added ${totalPlacesAdded} Census Places & CDPs`);
  console.log(`✓ Indexed ${totalNeighborhoodsAdded} Sub-Localities & Neighborhoods`);
  console.log('═══════════════════════════════════════════════════════════');

  // Update states.json
  const statesMaster = [];
  for (const sf of stateFiles) {
    const st = JSON.parse(fs.readFileSync(path.join(statesDir, sf), 'utf8'));
    statesMaster.push({
      fips: st.fips,
      abbr: st.abbr,
      name: st.name,
      capital: st.capital,
      population: st.population,
      landAreaSqMi: st.landAreaSqMi,
      region: st.region,
      path: st.path,
      bounds: st.bounds,
      viewBox: st.viewBox,
      center: st.center,
      countiesCount: st.countiesCount || st.counties?.length || 0,
      districtsCount: st.districtsCount || st.districts?.length || 0,
      citiesCount: st.citiesCount || st.cities?.length || 0,
      zipCodesCount: st.zipCodesCount || st.zipcodes?.length || 0,
      regionsCount: st.regionsCount || st.regions?.length || 0,
      subregionsCount: st.subregionsCount || st.subregions?.length || 0
    });
  }
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'usa', 'states.json'), JSON.stringify(statesMaster, null, 2), 'utf8');
  console.log(`✓ Updated states.json with ${statesMaster.length} jurisdictions`);

  // Re-generate complete search index
  console.log('🔄 Re-generating master search index...');
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
      const isPR = (stateData.abbr === 'PR');
      const suffix = isPR ? 'Municipio' : (c.name.toLowerCase().includes('county') || c.name.toLowerCase().includes('parish') || c.name.toLowerCase().includes('borough') ? '' : 'County');
      const displayName = suffix ? `${c.name} ${suffix}, ${stateData.abbr}` : `${c.name}, ${stateData.abbr}`;
      searchIndex.push({
        type: 'county',
        id: c.id,
        name: displayName,
        countyName: c.name,
        state: stateData.abbr,
        bounds: c.bounds
      });
    });

    (stateData.districts || []).forEach(d => {
      searchIndex.push({
        type: 'district',
        id: d.id,
        shortName: d.shortName,
        name: `${d.name} (${d.shortName})`,
        state: stateData.abbr,
        zipCount: d.zipCount,
        zips: d.zips,
        counties: d.counties,
        bounds: d.bounds
      });
    });

    (stateData.cities || []).forEach(c => {
      searchIndex.push({
        type: c.type || (c.tier === 2 ? 'subregion' : (c.isCdp ? 'cdp' : 'city')),
        id: c.id,
        name: `${c.name}, ${stateData.abbr}`,
        fullName: c.fullName || `${c.name}, ${stateData.abbr}`,
        cityName: c.name,
        state: stateData.abbr,
        county: c.county || '',
        parentCity: c.parentCity || '',
        metroName: c.metroName || '',
        isCapital: !!c.isCapital,
        isCdp: !!c.isCdp,
        zipCount: c.zipCount || (c.zips ? c.zips.length : 1),
        zips: c.zips || [],
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

  fs.writeFileSync(path.join(__dirname, '..', 'data', 'usa', 'search-index.json'), JSON.stringify(searchIndex), 'utf8');
  console.log(`✓ Saved ${searchIndex.length.toLocaleString()} searchable entities`);

  console.log('✅ Congressional District & Sub-Locality Enrichment complete!');
}

main().catch(err => {
  console.error('❌ Pipeline failed:', err);
  process.exit(1);
});
