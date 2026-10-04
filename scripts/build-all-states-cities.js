const fs = require('fs');
const path = require('path');
const shapefile = require('shapefile');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');

/**
 * National Multi-State City & Regional Hierarchy Builder
 * 
 * Enriches all 52 US state files (data/usa/states/*.json) with:
 * 1. Authentic official boundary polygons for all cities from US Census Places shapefile
 * 2. Stitched ZIP code boundaries for unincorporated communities and territories
 * 3. Macro metro regions from Thumbtack market coverage with composite boundaries and town hierarchies
 * 4. Links each city to its parent county, member ZIP codes, and parent metro
 * 5. Re-generates national search index (data/usa/search-index.json)
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

// State capitals mapping
const STATE_CAPITALS = {
  AL: 'Montgomery', AK: 'Juneau', AZ: 'Phoenix', AR: 'Little Rock', CA: 'Sacramento',
  CO: 'Denver', CT: 'Hartford', DE: 'Dover', FL: 'Tallahassee', GA: 'Atlanta',
  HI: 'Honolulu', ID: 'Boise', IL: 'Springfield', IN: 'Indianapolis', IA: 'Des Moines',
  KS: 'Topeka', KY: 'Frankfort', LA: 'Baton Rouge', ME: 'Augusta', MD: 'Annapolis',
  MA: 'Boston', MI: 'Lansing', MN: 'Saint Paul', MS: 'Jackson', MO: 'Jefferson City',
  MT: 'Helena', NE: 'Lincoln', NV: 'Carson City', NH: 'Concord', NJ: 'Trenton',
  NM: 'Santa Fe', NY: 'Albany', NC: 'Raleigh', ND: 'Bismarck', OH: 'Columbus',
  OK: 'Oklahoma City', OR: 'Salem', PA: 'Harrisburg', RI: 'Providence', SC: 'Columbia',
  SD: 'Pierre', TN: 'Nashville', TX: 'Austin', UT: 'Salt Lake City', VT: 'Montpelier',
  VA: 'Richmond', WA: 'Olympia', WV: 'Charleston', WI: 'Madison', WY: 'Cheyenne',
  DC: 'Washington', PR: 'San Juan'
};

async function main() {
  const args = process.argv.slice(2);
  const targetStateArg = args.find(a => a.startsWith('--state='))?.split('=')[1]?.toUpperCase();

  console.log('🚀 Starting National Multi-State City & Regional Hierarchy Generator...');

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
    const cleanName = name.toLowerCase().replace(/\s+(city|town|village|cdp|borough)$/i, '').trim();

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
        placesByState.get(st).set(name.toLowerCase(), placeObj);
        censusCount++;
      }
    } catch (e) {}
  }
  console.log(`✓ Indexed ${censusCount} official Census Places across ${placesByState.size} states/territories.`);

  // 2. Load Thumbtack market coverage
  let marketCoverage = {};
  const mcFile = '/Volumes/Porche/Thumbtack/thumbtack-web/data/market_coverage.json';
  if (fs.existsSync(mcFile)) {
    try {
      const mcRaw = JSON.parse(fs.readFileSync(mcFile, 'utf8'));
      marketCoverage = mcRaw.states || {};
      console.log(`✓ Loaded Thumbtack market coverage for ${Object.keys(marketCoverage).length} states.`);
    } catch (e) {
      console.warn('Could not load market_coverage.json:', e.message);
    }
  }

  // 3. Load Thumbtack us_states_directory
  let statesDirectory = new Map();
  const dirFile = '/Volumes/Porche/Thumbtack/thumbtack-web/data/us_states_directory.json';
  if (fs.existsSync(dirFile)) {
    try {
      const dirRaw = JSON.parse(fs.readFileSync(dirFile, 'utf8'));
      for (const st of dirRaw) {
        statesDirectory.set(st.code, st.allCities || []);
      }
      console.log(`✓ Loaded Thumbtack directory for ${statesDirectory.size} states.`);
    } catch (e) {
      console.warn('Could not load us_states_directory.json:', e.message);
    }
  }

  // 4. Load Thumbtack geo_zip_index
  let zipToCityIdMap = new Map();
  const zipIdxFile = '/Volumes/Porche/Thumbtack/thumbtack-web/data/geo_zip_index.json';
  if (fs.existsSync(zipIdxFile)) {
    try {
      const zipIdxRaw = JSON.parse(fs.readFileSync(zipIdxFile, 'utf8'));
      const zList = zipIdxRaw.zips || {};
      const zKeys = Object.keys(zList);
      for (const k of zKeys) {
        const item = zList[k];
        if (item && item.zip && item.cityId) {
          zipToCityIdMap.set(String(item.zip).padStart(5, '0'), item.cityId);
        }
      }
      console.log(`✓ Loaded ${zipToCityIdMap.size} ZIP-to-City mappings from Thumbtack.`);
    } catch (e) {
      console.warn('Could not load geo_zip_index.json:', e.message);
    }
  }

  // 5. Process state files
  const statesDir = path.join(__dirname, '..', 'data', 'usa', 'states');
  const stateFiles = fs.readdirSync(statesDir).filter(f => f.endsWith('.json'));
  console.log(`\nFound ${stateFiles.length} state files in ${statesDir}`);

  let totalNationalCities = 0;
  let totalNationalRegions = 0;

  for (const file of stateFiles) {
    const stCode = file.replace('.json', '').toUpperCase();
    if (targetStateArg && stCode !== targetStateArg) continue;

    // California was already meticulously generated with 1,253 cities and 38 metros
    if (stCode === 'CA' && !targetStateArg) {
      const caData = JSON.parse(fs.readFileSync(path.join(statesDir, file), 'utf8'));
      totalNationalCities += caData.cities?.length || 0;
      totalNationalRegions += caData.regions?.length || 0;
      console.log(`⏩ Preserving California (CA): ${caData.cities?.length} cities, ${caData.regions?.length} regions`);
      continue;
    }

    console.log(`\nProcessing ${stCode}...`);
    const filePath = path.join(statesDir, file);
    const stateData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const stCensus = placesByState.get(stCode) || new Map();
    const stDirCities = statesDirectory.get(stCode) || [];
    const stMc = marketCoverage[stCode] || {};
    const rawRegions = stMc.regions || [];

    // Map towns to metro regions
    const townToRegionMap = new Map();
    for (const r of rawRegions) {
      for (const t of (r.towns || [])) {
        const tLower = t.name.toLowerCase().trim();
        townToRegionMap.set(tLower, {
          metroId: r.id,
          metroName: r.name,
          liquidity: r.liquidity,
          pros: t.pros,
          topCategory: t.topCategory
        });
        const cleanT = tLower.replace(/\s+(city|town|village|cdp)$/i, '').trim();
        townToRegionMap.set(cleanT, {
          metroId: r.id,
          metroName: r.name,
          liquidity: r.liquidity,
          pros: t.pros,
          topCategory: t.topCategory
        });
      }
    }

    // Group state ZIP codes by city
    const zipsByCity = new Map();
    const cityCounties = new Map();
    const cityCoords = new Map();

    for (const z of (stateData.zipcodes || [])) {
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

    const enrichedCities = [];
    const seenCitySlugs = new Set();
    const capitalName = STATE_CAPITALS[stCode] || stateData.capital || '';

    // A. Add Census Places that belong to this state and have boundary polygons
    for (const [key, place] of stCensus.entries()) {
      if (key !== place.slug) continue; // skip cleanName duplicate keys
      if (seenCitySlugs.has(place.slug)) continue;

      const cLower = place.name.toLowerCase();
      const cleanLower = place.cleanName.toLowerCase();
      const zips = zipsByCity.get(cLower) || zipsByCity.get(cleanLower) || [];

      // Filter out minuscule unpopulated places unless they have ZIPs or are incorporated
      const isIncorporated = place.fullName.includes('city') || place.fullName.includes('town') || place.fullName.includes('village');
      if (zips.length === 0 && !isIncorporated && place.bounds[2] * place.bounds[3] < 0.05) {
        continue;
      }

      seenCitySlugs.add(place.slug);
      const memberZipCodes = zips.map(z => z.zip);
      const county = cityCounties.get(cLower) || cityCounties.get(cleanLower) || '';
      const coords = cityCoords.get(cLower) || cityCoords.get(cleanLower) || (zips[0] ? { lat: zips[0].lat, lon: zips[0].lon } : {});
      const metroInfo = townToRegionMap.get(cLower) || townToRegionMap.get(cleanLower);

      enrichedCities.push({
        id: `${stCode}-${place.slug}`,
        name: place.name,
        cityName: place.name,
        state: stCode,
        county: county,
        metroName: metroInfo?.metroName || '',
        metroId: metroInfo?.metroId || '',
        isCapital: place.name.toLowerCase() === capitalName.toLowerCase(),
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

    // B. Add any remaining cities from Thumbtack Directory
    for (const tCity of stDirCities) {
      const slug = tCity.slug;
      if (seenCitySlugs.has(slug)) continue;

      const cLower = tCity.name.toLowerCase().trim();
      const censusMatch = stCensus.get(slug) || stCensus.get(cLower);
      const zips = zipsByCity.get(cLower) || [];
      const county = cityCounties.get(cLower) || '';
      const coords = cityCoords.get(cLower) || (zips[0] ? { lat: zips[0].lat, lon: zips[0].lon } : {});
      const metroInfo = townToRegionMap.get(cLower);

      let boundaryPath = censusMatch ? censusMatch.path : '';
      let bounds = censusMatch ? censusMatch.bounds : null;
      let center = censusMatch ? censusMatch.center : null;

      // If no Census boundary, stitch from member ZIPs
      if (!boundaryPath && zips.length > 0) {
        boundaryPath = zips.map(z => z.path).filter(Boolean).join(' ');
        if (zips[0]?.bounds) {
          const minX = Math.min(...zips.map(z => z.bounds[0]));
          const minY = Math.min(...zips.map(z => z.bounds[1]));
          const maxX = Math.max(...zips.map(z => z.bounds[0] + z.bounds[2]));
          const maxY = Math.max(...zips.map(z => z.bounds[1] + z.bounds[3]));
          bounds = [
            Math.round(minX * 100) / 100,
            Math.round(minY * 100) / 100,
            Math.round((maxX - minX) * 100) / 100,
            Math.round((maxY - minY) * 100) / 100
          ];
          center = [
            Math.round((minX + (maxX - minX) / 2) * 100) / 100,
            Math.round((minY + (maxY - minY) / 2) * 100) / 100
          ];
        }
      }

      if (!boundaryPath && (!bounds || !center)) continue;

      seenCitySlugs.add(slug);
      const memberZipCodes = zips.map(z => z.zip);

      enrichedCities.push({
        id: `${stCode}-${slug}`,
        name: tCity.name,
        cityName: tCity.name,
        state: stCode,
        county: county,
        metroName: metroInfo?.metroName || '',
        metroId: metroInfo?.metroId || '',
        isCapital: tCity.name.toLowerCase() === capitalName.toLowerCase(),
        zipCount: memberZipCodes.length,
        zips: memberZipCodes,
        bounds: bounds || [0, 0, 0, 0],
        center: center || [0, 0],
        x: center ? center[0] : 0,
        y: center ? center[1] : 0,
        lat: coords.lat,
        lon: coords.lon,
        path: boundaryPath
      });
    }

    // C. Add remaining cities from ZIP codes by stitching
    for (const [cLower, zips] of zipsByCity.entries()) {
      const slug = cLower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (seenCitySlugs.has(slug)) continue;
      seenCitySlugs.add(slug);

      const first = zips[0];
      const memberZipCodes = zips.map(z => z.zip);
      const validZipPaths = zips.map(z => z.path).filter(Boolean);
      if (validZipPaths.length === 0) continue;

      const stitchedPath = validZipPaths.join(' ');
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
      const metroInfo = townToRegionMap.get(cLower);

      enrichedCities.push({
        id: `${stCode}-${slug}`,
        name: first.city,
        cityName: first.city,
        state: stCode,
        county: first.county || '',
        metroName: metroInfo?.metroName || '',
        metroId: metroInfo?.metroId || '',
        isCapital: first.city.toLowerCase() === capitalName.toLowerCase(),
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

    // Sort cities: capital first, then by zipCount / size
    enrichedCities.sort((a, b) => {
      if (a.isCapital) return -1;
      if (b.isCapital) return 1;
      return (b.zipCount || 0) - (a.zipCount || 0);
    });

    // D. Build Macro Metro Regions for this State
    const enrichedRegions = [];
    for (const r of rawRegions) {
      // Find all cities in this state assigned to this region
      const memberCities = enrichedCities.filter(c => c.metroId === r.id || (c.metroName && c.metroName.toLowerCase() === r.name.toLowerCase()));
      
      // If member cities are sparse, check if any of r.towns match enrichedCities by name
      if (r.towns) {
        for (const t of r.towns) {
          const tName = t.name.toLowerCase();
          const matchCity = enrichedCities.find(c => c.name.toLowerCase() === tName || c.name.toLowerCase().includes(tName));
          if (matchCity && !memberCities.some(mc => mc.id === matchCity.id)) {
            matchCity.metroId = r.id;
            matchCity.metroName = r.name;
            memberCities.push(matchCity);
          }
        }
      }

      // Collect all ZIP codes in this region
      const regionZipsSet = new Set();
      memberCities.forEach(c => (c.zips || []).forEach(z => regionZipsSet.add(z)));

      // Composite boundary and bounds
      let rBounds = stateData.bounds;
      let rCenter = stateData.center;
      let rPath = '';

      if (memberCities.length > 0) {
        const validBounds = memberCities.map(c => c.bounds).filter(b => b && b[2] > 0);
        if (validBounds.length > 0) {
          const minX = Math.min(...validBounds.map(b => b[0]));
          const minY = Math.min(...validBounds.map(b => b[1]));
          const maxX = Math.max(...validBounds.map(b => b[0] + b[2]));
          const maxY = Math.max(...validBounds.map(b => b[1] + b[3]));
          rBounds = [
            Math.round(minX * 100) / 100,
            Math.round(minY * 100) / 100,
            Math.round((maxX - minX) * 100) / 100,
            Math.round((maxY - minY) * 100) / 100
          ];
          rCenter = [
            Math.round((minX + (maxX - minX) / 2) * 100) / 100,
            Math.round((minY + (maxY - minY) / 2) * 100) / 100
          ];
        }
        rPath = memberCities.map(c => c.path).filter(Boolean).slice(0, 15).join(' ');
      }

      enrichedRegions.push({
        id: r.id,
        name: r.name,
        state: stCode,
        tier: r.liquidity === 'HIGH' ? 1 : 2,
        description: (r.towns || []).slice(0, 5).map(t => t.name).join(', '),
        monthlyReach: r.totalPros ? Math.round(r.totalPros * 12) : 500,
        isHighDemand: r.liquidity === 'HIGH' || r.liquidity === 'OPTIMAL',
        selectState: 'unselected',
        center: rCenter,
        bounds: rBounds,
        path: rPath,
        citiesCount: memberCities.length || (r.towns?.length || 0),
        zipCount: regionZipsSet.size || ((r.towns?.length || 0) * 3),
        cities: memberCities.slice(0, 24).map(c => ({
          id: c.id,
          name: c.name,
          monthlyReach: Math.max(1, Math.round((c.zipCount || 1) * 1.5)),
          isHighDemand: c.zipCount > 3,
          zipCount: c.zipCount || 1,
          zips: c.zips || []
        }))
      });
    }

    // Attach enriched cities and regions to stateData
    stateData.cities = enrichedCities;
    stateData.citiesCount = enrichedCities.length;
    stateData.regions = enrichedRegions;
    stateData.regionsCount = enrichedRegions.length;

    fs.writeFileSync(filePath, JSON.stringify(stateData, null, 2), 'utf8');
    console.log(`✓ ${stCode}: ${enrichedCities.length} cities with real boundaries, ${enrichedRegions.length} macro regions saved.`);

    totalNationalCities += enrichedCities.length;
    totalNationalRegions += enrichedRegions.length;
  }

  console.log(`\n🎉 Nationwide City and Regional Generation Complete!`);
  console.log(`Total cities mapped across states: ${totalNationalCities}`);
  console.log(`Total macro regions mapped: ${totalNationalRegions}`);

  // 6. Regenerate data/usa/search-index.json
  console.log('\nGenerating consolidated search index (data/usa/search-index.json)...');
  const searchIndex = [];

  for (const file of stateFiles) {
    const stCode = file.replace('.json', '').toUpperCase();
    const filePath = path.join(statesDir, file);
    const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // State entry
    searchIndex.push({
      type: 'state',
      id: d.abbr || stCode,
      name: d.name,
      abbr: d.abbr || stCode,
      capital: d.capital,
      center: d.center,
      bounds: d.bounds
    });

    // Macro Metro Regions
    for (const r of (d.regions || [])) {
      searchIndex.push({
        type: 'region',
        id: r.id,
        name: r.name,
        state: stCode,
        stateName: d.name,
        center: r.center,
        bounds: r.bounds,
        citiesCount: r.citiesCount,
        zipCount: r.zipCount
      });
    }

    // Cities
    for (const c of (d.cities || [])) {
      searchIndex.push({
        type: 'city',
        id: c.id,
        name: c.name,
        cityName: c.name,
        state: stCode,
        stateName: d.name,
        county: c.county || '',
        metroName: c.metroName || '',
        center: c.center,
        bounds: c.bounds,
        zipCount: c.zipCount || 0
      });
    }

    // Counties
    for (const co of (d.counties || [])) {
      searchIndex.push({
        type: 'county',
        id: co.id,
        name: co.name,
        state: stCode,
        stateName: d.name,
        center: co.center,
        bounds: co.bounds
      });
    }

    // Congressional Districts
    for (const cd of (d.districts || [])) {
      searchIndex.push({
        type: 'district',
        id: cd.id,
        name: cd.name,
        shortName: cd.shortName || cd.id,
        state: stCode,
        stateName: d.name,
        center: cd.center,
        bounds: cd.bounds
      });
    }

    // Top ZIP Codes (index all ZIPs)
    for (const z of (d.zipcodes || [])) {
      searchIndex.push({
        type: 'zip',
        id: z.zip,
        zip: z.zip,
        name: `${z.zip} (${z.city || ''})`,
        city: z.city || '',
        state: stCode,
        stateName: d.name,
        county: z.county || '',
        district: z.district || '',
        center: z.center,
        bounds: z.bounds
      });
    }
  }

  const searchIndexPath = path.join(__dirname, '..', 'data', 'usa', 'search-index.json');
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex), 'utf8');
  console.log(`✓ Consolidated search index generated with ${searchIndex.length} items (${(fs.statSync(searchIndexPath).size / (1024 * 1024)).toFixed(2)} MB)`);
}

main().catch(err => {
  console.error('Fatal error in generator:', err);
  process.exit(1);
});
