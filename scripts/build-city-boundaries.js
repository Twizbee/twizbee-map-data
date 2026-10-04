const fs = require('fs');
const path = require('path');
const shapefile = require('shapefile');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');

/**
 * Builds official city boundary polygons from US Census Places shapefile and Thumbtack data,
 * links member ZIP codes, metro hierarchies, and enriches state data files.
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

async function main() {
  console.log('🚀 Starting City Boundaries & Regional Hierarchy Build...');

  // Setup national Albers USA projection
  const us = require('us-atlas/counties-10m.json');
  const statesGeo = topojsonClient.feature(us, us.objects.states);
  const masterProj = d3Geo.geoAlbersUsa().fitSize([960, 600], statesGeo);
  const pathGen = d3Geo.geoPath().projection(masterProj);

  // 1. Read Census Places shapefile
  const shpPath = '/Users/eric/.gemini/antigravity/brain/c848c212-eac7-47f5-bb5a-cccdd2a15528/scratch/census_places/cb_2023_us_place_500k.shp';
  console.log(`Reading Census Places from ${shpPath}...`);
  const censusSource = await shapefile.open(shpPath);

  // Map Census Places by state: Map<st, Map<slug, Place>>
  const placesByState = new Map();
  let censusCount = 0;

  while (true) {
    const res = await censusSource.read();
    if (res.done) break;
    const p = res.value.properties;
    const st = p.STUSPS;
    if (!placesByState.has(st)) placesByState.set(st, new Map());

    const name = p.NAME;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const cleanName = name.toLowerCase().replace(/\s+(city|town|village|cdp)$/i, '').trim();

    try {
      const rawPath = pathGen(res.value);
      if (rawPath) {
        const svgPath = cleanSvgPath(rawPath, 2);
        const b = pathGen.bounds(res.value);
        const bounds = [
          Math.round(b[0][0] * 100) / 100,
          Math.round(b[0][1] * 100) / 100,
          Math.round((b[1][0] - b[0][0]) * 100) / 100,
          Math.round((b[1][1] - b[0][1]) * 100) / 100
        ];
        const placeObj = {
          name,
          cleanName,
          slug,
          lsad: p.LSAD,
          fullName: p.NAMELSAD,
          path: svgPath,
          bounds,
          center: [
            Math.round((bounds[0] + bounds[2] / 2) * 100) / 100,
            Math.round((bounds[1] + bounds[3] / 2) * 100) / 100
          ]
        };
        placesByState.get(st).set(slug, placeObj);
        placesByState.get(st).set(cleanName, placeObj);
        censusCount++;
      }
    } catch (e) {}
  }
  console.log(`✓ Indexed ${censusCount} official Census Places across ${placesByState.size} states/territories.`);

  // 2. Load Thumbtack California Regions if available
  let ttSubregionsMap = new Map();
  let ttMetros = [];
  let ttMetrosById = new Map();
  let ttData = null;

  const ttFile = path.join(__dirname, '..', 'data', 'thumbtack', 'california-regions.json');
  if (fs.existsSync(ttFile)) {
    ttData = JSON.parse(fs.readFileSync(ttFile, 'utf8'));
    ttMetros = ttData.metros || [];
    for (const m of ttMetros) {
      ttMetrosById.set(m.id, m);
    }
    for (const sub of (ttData.subregions || [])) {
      const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const parentMetro = ttMetrosById.get(sub.parentPk);
      sub.metroName = sub.metroName || parentMetro?.name || '';
      sub.parentCity = sub.parentCity || parentMetro?.name.split('-')[0].trim() || '';

      ttSubregionsMap.set(slug, sub);
      ttSubregionsMap.set(sub.name.toLowerCase(), sub);
    }
    console.log(`✓ Loaded ${ttMetros.length} Thumbtack metros and ${ttSubregionsMap.size / 2} subregions.`);
  }

  // 3. Process California (CA.json)
  const caFile = path.join(__dirname, '..', 'data', 'usa', 'states', 'CA.json');
  if (fs.existsSync(caFile)) {
    const ca = JSON.parse(fs.readFileSync(caFile, 'utf8'));
    const caCensus = placesByState.get('CA') || new Map();

    // Group California ZIP codes by city
    const zipsByCity = new Map();
    const cityCounties = new Map();
    const cityCoords = new Map();

    for (const z of (ca.zipcodes || [])) {
      const c = z.city ? z.city.trim() : '';
      if (!c) continue;
      const cLower = c.toLowerCase();
      if (!zipsByCity.has(cLower)) zipsByCity.set(cLower, []);
      zipsByCity.get(cLower).push(z);

      if (z.county && !cityCounties.has(cLower)) {
        cityCounties.set(cLower, z.county);
      }
      if (z.lat && z.lon && !cityCoords.has(cLower)) {
        cityCoords.set(cLower, { lat: z.lat, lon: z.lon });
      }
    }
    console.log(`✓ Mapped ${zipsByCity.size} unique cities from California ZIP codes.`);

    // Build comprehensive cities list for California
    const enrichedCities = [];
    const seenCitySlugs = new Set();

    // A. First add all subregions from Thumbtack (has exact metro hierarchy)
    for (const [key, sub] of ttSubregionsMap.entries()) {
      const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (seenCitySlugs.has(slug)) continue;
      seenCitySlugs.add(slug);

      const cLower = sub.name.toLowerCase();
      const memberZips = sub.zips || (zipsByCity.get(cLower)?.map(z => z.zip) || []);
      const county = cityCounties.get(cLower) || '';
      const coords = cityCoords.get(cLower) || {};

      // Prefer Census Place boundary if available, else Thumbtack polygon
      const censusMatch = caCensus.get(slug) || caCensus.get(cLower);
      const boundaryPath = censusMatch ? censusMatch.path : sub.path;
      const bounds = censusMatch ? censusMatch.bounds : sub.bounds;
      const center = censusMatch ? censusMatch.center : sub.center;

      enrichedCities.push({
        id: `CA-${slug}`,
        name: sub.name,
        cityName: sub.name,
        state: 'CA',
        county: county,
        metroName: sub.metroName || '',
        metroId: sub.parentPk || '',
        parentCity: sub.parentCity || '',
        isCapital: sub.name.toLowerCase() === 'sacramento',
        zipCount: memberZips.length,
        zips: memberZips,
        bounds: bounds,
        center: center,
        x: center[0],
        y: center[1],
        lat: coords.lat,
        lon: coords.lon,
        path: boundaryPath
      });
    }

    // B. Add all Census Places in California that have member ZIP codes
    for (const [key, place] of caCensus.entries()) {
      if (key !== place.slug) continue; // avoid double entries from cleanName
      if (seenCitySlugs.has(place.slug)) continue;

      const cLower = place.name.toLowerCase();
      const zips = zipsByCity.get(cLower) || zipsByCity.get(place.cleanName) || [];
      if (zips.length === 0 && !place.fullName.includes('city')) continue;

      seenCitySlugs.add(place.slug);
      const memberZipCodes = zips.map(z => z.zip);
      const county = cityCounties.get(cLower) || cityCounties.get(place.cleanName) || '';
      const coords = cityCoords.get(cLower) || (zips[0] ? { lat: zips[0].lat, lon: zips[0].lon } : {});

      enrichedCities.push({
        id: `CA-${place.slug}`,
        name: place.name,
        cityName: place.name,
        state: 'CA',
        county: county,
        metroName: '',
        metroId: '',
        parentCity: '',
        isCapital: place.name.toLowerCase() === 'sacramento',
        zipCount: memberZipCodes.length,
        zips: memberZipCodes,
        bounds: place.bounds,
        center: place.center,
        x: place.center[0],
        y: place.center[1],
        lat: coords.lat,
        lon: coords.lon,
        path: place.path
      });
    }

    // C. Add any remaining cities from ZIP codes by stitching their ZIP codes
    for (const [cLower, zips] of zipsByCity.entries()) {
      const slug = cLower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (seenCitySlugs.has(slug)) continue;
      seenCitySlugs.add(slug);

      const first = zips[0];
      const memberZipCodes = zips.map(z => z.zip);
      const stitchedPath = zips.map(z => z.path).filter(Boolean).join(' ');
      if (!stitchedPath) continue;

      const minX = Math.min(...zips.map(z => z.bounds[0]));
      const minY = Math.min(...zips.map(z => z.bounds[1]));
      const maxX = Math.max(...zips.map(z => z.bounds[0] + z.bounds[2]));
      const maxY = Math.max(...zips.map(z => z.bounds[1] + z.bounds[3]));
      const bounds = [
        Math.round(minX * 100) / 100,
        Math.round(minY * 100) / 100,
        Math.round((maxX - minX) * 100) / 100,
        Math.round((maxY - minY) * 100) / 100
      ];
      const center = [
        Math.round((minX + (maxX - minX) / 2) * 100) / 100,
        Math.round((minY + (maxY - minY) / 2) * 100) / 100
      ];

      enrichedCities.push({
        id: `CA-${slug}`,
        name: first.city,
        cityName: first.city,
        state: 'CA',
        county: first.county || '',
        metroName: '',
        metroId: '',
        parentCity: '',
        isCapital: false,
        zipCount: memberZipCodes.length,
        zips: memberZipCodes,
        bounds: bounds,
        center: center,
        x: center[0],
        y: center[1],
        lat: first.lat,
        lon: first.lon,
        path: stitchedPath
      });
    }

    // Sort cities: capitals first, then high zip count descending, then alphabetical
    enrichedCities.sort((a, b) => {
      if (a.isCapital && !b.isCapital) return -1;
      if (!a.isCapital && b.isCapital) return 1;
      if (b.zipCount !== a.zipCount) return b.zipCount - a.zipCount;
      return a.name.localeCompare(b.name);
    });

    console.log(`✓ Enriched California with ${enrichedCities.length} fully bounded cities with city limits!`);

    // Verify Milpitas
    const milpitas = enrichedCities.find(c => c.name.toLowerCase() === 'milpitas');
    console.log('Milpitas verification:', {
      id: milpitas?.id,
      name: milpitas?.name,
      metroName: milpitas?.metroName,
      zips: milpitas?.zips,
      hasPath: !!milpitas?.path,
      pathLen: milpitas?.path?.length,
      bounds: milpitas?.bounds
    });

    ca.cities = enrichedCities;
    if (ttMetros.length > 0) ca.regions = ttMetros;
    if (ttData?.subregions) ca.subregions = ttData.subregions;

    fs.writeFileSync(caFile, JSON.stringify(ca, null, 2));
    console.log(`✅ Saved updated ${caFile}`);
  }

  // 4. Update Search Index
  console.log('Building consolidated search index...');
  const searchIndex = [];

  // Read all states in data/usa/states/*.json
  const statesDir = path.join(__dirname, '..', 'data', 'usa', 'states');
  const stateFiles = fs.readdirSync(statesDir).filter(f => f.endsWith('.json'));

  for (const sf of stateFiles) {
    const stCode = sf.replace('.json', '');
    const stData = JSON.parse(fs.readFileSync(path.join(statesDir, sf), 'utf8'));

    // A. State item
    searchIndex.push({
      type: 'state',
      id: stData.abbr || stCode,
      abbr: stData.abbr || stCode,
      name: stData.name,
      capital: stData.capital,
      center: stData.center,
      bounds: stData.bounds
    });

    // B. Regions / Metros
    if (stData.regions) {
      for (const r of stData.regions) {
        searchIndex.push({
          type: 'region',
          id: r.id,
          name: `${r.name} Metro Area`,
          metroName: r.name,
          state: stCode,
          citiesCount: r.citiesCount,
          zipCount: r.zipCount,
          bounds: r.bounds,
          center: r.center
        });
      }
    }

    // C. Subregions
    if (stData.subregions) {
      for (const sub of stData.subregions) {
        searchIndex.push({
          type: 'subregion',
          id: sub.id,
          name: `${sub.name}, ${sub.parentCity ? sub.parentCity + ', ' : ''}${sub.state || stCode}`,
          cityName: sub.name,
          parentCity: sub.parentCity || '',
          metroName: sub.metroName || '',
          metroId: sub.parentPk || '',
          state: sub.state || stCode,
          zipCount: sub.zipCount || (sub.zips ? sub.zips.length : 1),
          zips: sub.zips || [],
          bounds: sub.bounds,
          center: sub.center,
          monthlyReach: sub.monthlyReach
        });
      }
    }

    // D. Cities (with full city limits!)
    if (stData.cities) {
      for (const c of stData.cities) {
        searchIndex.push({
          type: 'city',
          id: c.id,
          name: `${c.name}, ${stCode}`,
          cityName: c.name,
          state: stCode,
          county: c.county,
          metroName: c.metroName || '',
          metroId: c.metroId || '',
          parentCity: c.parentCity || '',
          isCapital: !!c.isCapital,
          zipCount: c.zipCount || (c.zips ? c.zips.length : 1),
          zips: c.zips || [],
          x: c.x,
          y: c.y,
          lat: c.lat,
          lon: c.lon,
          bounds: c.bounds
        });
      }
    }

    // E. Zip codes
    if (stData.zipcodes) {
      for (const z of stData.zipcodes) {
        searchIndex.push({
          type: 'zip',
          id: z.zip,
          name: `${z.zip} - ${z.city || ''}, ${stCode}`,
          zip: z.zip,
          city: z.city,
          county: z.county,
          district: z.district,
          state: stCode,
          lat: z.lat,
          lon: z.lon,
          x: z.x,
          y: z.y,
          bounds: z.bounds
        });
      }
    }
  }

  console.log(`✓ Total search index items: ${searchIndex.length}`);

  const searchIndexFile = path.join(__dirname, '..', 'data', 'usa', 'search-index.json');
  fs.writeFileSync(searchIndexFile, JSON.stringify(searchIndex, null, 2));
  console.log(`✅ Saved search index to ${searchIndexFile}`);

  console.log('🎉 Done building city boundaries and search index!');
}

main().catch(console.error);
