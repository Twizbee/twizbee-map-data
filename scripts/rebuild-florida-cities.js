/**
 * scripts/rebuild-florida-cities.js
 *
 * Restores and enriches all Florida cities with:
 * 1. Authentic US Census Places boundary polygons (Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale, etc.)
 * 2. Stitched ZIP code boundaries for unincorporated communities
 * 3. Sets both `path` and `stitchedPath` so all cities render flawlessly on the map
 * 4. Preserves all 20 curated Florida macro and metro regions
 * 5. Updates member cities for each Florida region
 */

const fs = require('fs');
const path = require('path');
const shapefile = require('shapefile');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');

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
  console.log('🌴 Rebuilding all Florida Cities from official Census Places & ZIPs...');

  const us = require('us-atlas/counties-10m.json');
  const statesGeo = topojsonClient.feature(us, us.objects.states);
  const masterProj = d3Geo.geoAlbersUsa().fitSize([960, 600], statesGeo);
  const pathGen = d3Geo.geoPath().projection(masterProj);

  // 1. Read Census Places shapefile for Florida
  const shpPath = '/Users/eric/.gemini/antigravity/brain/c848c212-eac7-47f5-bb5a-cccdd2a15528/scratch/census_places/cb_2023_us_place_500k.shp';
  const censusSource = await shapefile.open(shpPath);

  const flPlaces = new Map();
  while (true) {
    const res = await censusSource.read();
    if (res.done) break;
    const p = res.value.properties;
    if (p.STUSPS !== 'FL') continue;

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
        flPlaces.set(slug, placeObj);
        flPlaces.set(cleanName, placeObj);
        flPlaces.set(name.toLowerCase(), placeObj);
      }
    } catch (e) {}
  }
  console.log(`✓ Loaded ${flPlaces.size} Florida Census Place entries.`);

  // 2. Load Florida State File
  const flPath = path.join(__dirname, '..', 'data', 'usa', 'states', 'FL.json');
  const flData = JSON.parse(fs.readFileSync(flPath, 'utf8'));

  // Group Florida ZIP codes by city
  const zipsByCity = new Map();
  const cityCounties = new Map();
  const cityCoords = new Map();

  for (const z of (flData.zipcodes || [])) {
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
  const capitalName = 'Tallahassee';

  // A. Process Census Places for Florida
  for (const [key, place] of flPlaces.entries()) {
    if (key !== place.slug) continue; // avoid duplicate aliases
    if (seenCitySlugs.has(place.slug)) continue;

    const cLower = place.name.toLowerCase();
    const cleanLower = place.cleanName.toLowerCase();
    const zips = zipsByCity.get(cLower) || zipsByCity.get(cleanLower) || [];

    const isIncorporated = place.fullName.includes('city') || place.fullName.includes('town') || place.fullName.includes('village');
    // Keep all places with ZIPs, or incorporated places, or significant CDPs
    if (zips.length === 0 && !isIncorporated && place.bounds[2] * place.bounds[3] < 0.04) {
      continue;
    }

    seenCitySlugs.add(place.slug);
    const county = cityCounties.get(cLower) || cityCounties.get(cleanLower) || '';
    const coords = cityCoords.get(cLower) || cityCoords.get(cleanLower) || {};
    const memberZipCodes = zips.map(z => z.zip);

    enrichedCities.push({
      id: `FL-${place.slug}`,
      name: place.name,
      cityName: place.name,
      fullName: place.fullName,
      state: 'FL',
      county: county,
      isCapital: place.name.toLowerCase() === capitalName.toLowerCase(),
      type: isIncorporated ? 'city' : 'cdp',
      zipCount: memberZipCodes.length,
      zips: memberZipCodes,
      bounds: place.bounds,
      center: place.center,
      x: place.center[0],
      y: place.center[1],
      lat: coords.lat || 0,
      lon: coords.lon || 0,
      path: place.path,
      stitchedPath: place.path
    });
  }

  // B. Process remaining postal cities from ZIP codes
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

    enrichedCities.push({
      id: `FL-${slug}`,
      name: first.city,
      cityName: first.city,
      fullName: first.city,
      state: 'FL',
      county: first.county || '',
      isCapital: first.city.toLowerCase() === capitalName.toLowerCase(),
      type: 'city',
      zipCount: memberZipCodes.length,
      zips: memberZipCodes,
      bounds: bounds,
      center: center,
      x: center[0],
      y: center[1],
      lat: first.lat,
      lon: first.lon,
      path: stitchedPath,
      stitchedPath: stitchedPath
    });
  }

  // Sort: capital first, then by zipCount / importance
  enrichedCities.sort((a, b) => {
    if (a.isCapital) return -1;
    if (b.isCapital) return 1;
    return (b.zipCount || 0) - (a.zipCount || 0);
  });

  console.log(`✓ Generated ${enrichedCities.length} Florida cities with full vector boundaries!`);

  // 3. Link Cities to Florida Regions
  (flData.regions || []).forEach(reg => {
    const regCounties = new Set((reg.counties || []).map(c => c.toLowerCase().trim()));
    const regZips = new Set(reg.zips || []);

    const memberCities = enrichedCities.filter(c => {
      const cCo = (c.county || '').toLowerCase().trim();
      if (regCounties.has(cCo)) return true;
      if (c.zips && c.zips.some(z => regZips.has(z))) return true;
      return false;
    });

    reg.citiesCount = memberCities.length;
    reg.cities = memberCities.map(c => ({
      id: c.id,
      name: c.name,
      type: c.type || 'city',
      tier: c.isCapital ? 1 : 2,
      county: c.county,
      zipCount: c.zipCount,
      pop: c.pop || 0
    }));
  });

  flData.cities = enrichedCities;
  flData.citiesCount = enrichedCities.length;

  fs.writeFileSync(flPath, JSON.stringify(flData, null, 2), 'utf8');
  console.log(`✓ Saved ${flPath} with ${enrichedCities.length} cities.`);

  // 4. Update data/usa/search-index.json with Florida cities
  console.log('\n📍 Updating search index with all Florida cities...');
  const searchIndexPath = path.join(__dirname, '..', 'data', 'usa', 'search-index.json');
  let searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

  // Remove old FL city entries
  searchIndex = searchIndex.filter(s => !(s.state === 'FL' && s.type === 'city'));

  // Add new FL city entries
  for (const c of enrichedCities) {
    searchIndex.push({
      type: 'city',
      id: c.id,
      name: `${c.name}, FL`,
      cityName: c.name,
      county: c.county || '',
      state: 'FL',
      lat: c.lat,
      lon: c.lon,
      x: c.x,
      y: c.y,
      bounds: c.bounds,
      zipCount: c.zipCount,
      keywords: `${c.name}, ${c.county} County, FL, Florida city`
    });
  }

  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex), 'utf8');
  console.log(`✓ Search index updated. Total entries: ${searchIndex.length}`);

  console.log('\n✨ Florida cities restoration complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
