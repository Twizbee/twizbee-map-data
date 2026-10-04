/**
 * scripts/build-zip-based-regions.js
 *
 * Implements Option 3: Bottom-up region synthesis directly from constituent ZIP code polygons.
 * Instead of county boundary approximations, this tool merges the exact ZCTA features
 * of constituent ZIP codes into a 100% tight dissolved outer perimeter.
 *
 * Demonstrates:
 * 1. San Jose & Silicon Valley (South Bay - 48 ZIPs from Thumbtack market)
 * 2. Santa Ana & Orange County Metro (87 ZIPs)
 * 3. Chicagoland (258 ZIPs)
 * 4. Metro Atlanta (142 ZIPs)
 */

const fs = require('fs');
const path = require('path');
const topojsonClient = require('topojson-client');
const topojsonServer = require('topojson-server');
const d3Geo = require('d3-geo');

function round(val, decimals = 2) {
  if (val === null || val === undefined || isNaN(val)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

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
  console.log('🚀 Generating ZIP-dissolved boundaries (Option 3: Bottom-Up ZIP Model)...');

  const us = require('us-atlas/counties-10m.json');
  const statesGeo = topojsonClient.feature(us, us.objects.states);
  const masterProj = d3Geo.geoAlbersUsa().fitSize([960, 600], statesGeo);
  const pathGen = d3Geo.geoPath().projection(masterProj);

  function dissolveZipCodes(stateAbbr, zipList) {
    const prefix = stateAbbr.toLowerCase() + '_';
    const tempDir = path.join(__dirname, '..', 'temp_zipcodes');
    const file = fs.readdirSync(tempDir).find(f => f.toLowerCase().startsWith(prefix) && f.endsWith('.min.json'));
    if (!file) throw new Error(`Missing temp_zipcodes file for ${stateAbbr}`);

    const geoData = JSON.parse(fs.readFileSync(path.join(tempDir, file), 'utf8'));
    const zipSet = new Set(zipList.map(z => String(z).padStart(5, '0')));
    const matchedFeatures = geoData.features.filter(f => zipSet.has(String(f.properties.ZCTA5CE10).padStart(5, '0')));

    if (matchedFeatures.length === 0) {
      throw new Error(`No ZCTA features matched for ${stateAbbr} with ${zipList.length} zips`);
    }

    const zipTopo = topojsonServer.topology({ zips: { type: 'FeatureCollection', features: matchedFeatures } }, 1e5);
    const merged = topojsonClient.merge(zipTopo, zipTopo.objects.zips.geometries);
    const rawPath = pathGen(merged);
    const cleanedPath = cleanSvgPath(rawPath, 2);
    const rawBounds = pathGen.bounds(merged);

    const bounds = [
      round(rawBounds[0][0]),
      round(rawBounds[0][1]),
      round(rawBounds[1][0] - rawBounds[0][0]),
      round(rawBounds[1][1] - rawBounds[0][1])
    ];

    const center = [
      round(bounds[0] + bounds[2] / 2),
      round(bounds[1] + bounds[3] / 2)
    ];

    return {
      path: cleanedPath,
      bounds,
      center,
      matchedCount: matchedFeatures.length,
      matchedZips: matchedFeatures.map(f => f.properties.ZCTA5CE10)
    };
  }

  // 1. Process California: San Jose & Santa Ana
  console.log('\n📍 Processing California (San Jose & Santa Ana)...');
  const caPath = path.join(__dirname, '..', 'data', 'usa', 'states', 'CA.json');
  const caData = JSON.parse(fs.readFileSync(caPath, 'utf8'));

  // San Jose & Silicon Valley (48 exact Thumbtack / South Bay ZIPs)
  const sjZips = [
    '95110', '95111', '95112', '95113', '95116', '95117', '95118', '95119', '95120', '95121',
    '95122', '95123', '95124', '95125', '95126', '95127', '95128', '95129', '95130', '95131',
    '95132', '95133', '95134', '95135', '95136', '95138', '95139', '95148',
    '95050', '95051', '95053', '95054', '94085', '94086', '94087', '94089',
    '95008', '95070', '95002', '95013', '95030', '95032', '95035', '95014',
    '95037', '95140', '95046', '95020'
  ];
  const sjDissolved = dissolveZipCodes('CA', sjZips);
  console.log(`  ✓ Dissolved San Jose: ${sjDissolved.matchedCount} ZIPs merged. Path len: ${sjDissolved.path.length}`);

  // Santa Ana & Orange County Metro (87 Orange County ZIPs)
  const ocZips = caData.regions.find(r => r.id === 'CA-orange-county')?.zips || [];
  const ocDissolved = dissolveZipCodes('CA', ocZips);
  console.log(`  ✓ Dissolved Santa Ana / OC: ${ocDissolved.matchedCount} ZIPs merged. Path len: ${ocDissolved.path.length}`);

  // Helper to extract member cities
  function getMemberCities(stateData, zipList) {
    const zSet = new Set(zipList);
    return (stateData.cities || [])
      .filter(c => (c.zips || []).some(z => zSet.has(z)))
      .map(c => ({
        id: c.id,
        name: c.name,
        type: c.type || 'city',
        tier: c.tier || 1,
        county: c.county,
        zipCount: (c.zips || []).filter(z => zSet.has(z)).length,
        pop: c.pop || 0
      }));
  }

  // Update or insert CA-san-jose-silicon-valley
  const sjCities = getMemberCities(caData, sjZips);
  const sjRegionObj = {
    id: 'CA-san-jose-silicon-valley',
    name: 'San Jose & Silicon Valley',
    fullName: 'San Jose, Silicon Valley & South Bay Metro',
    state: 'CA',
    tier: 2,
    type: 'metro-region',
    parentRegion: 'CA-san-francisco-bay-area',
    description: 'Premier tech capital of the world, housing headquarters of Apple, Google, Meta, Nvidia, Adobe, and Zoom across San Jose, Sunnyvale, Santa Clara, Cupertino, and Mountain View.',
    googleUrl: 'https://www.google.com/maps/place/San+Jose,+CA/',
    counties: ['Santa Clara'],
    countyCount: 1,
    bounds: sjDissolved.bounds,
    center: sjDissolved.center,
    x: sjDissolved.center[0],
    y: sjDissolved.center[1],
    path: sjDissolved.path,
    stitchedPath: sjDissolved.path,
    isDissolvedBoundary: true,
    boundarySource: 'dissolved-zcta-polygons',
    zipCount: sjZips.length,
    zips: sjZips,
    citiesCount: sjCities.length,
    cities: sjCities,
    adTargeting: {
      metaGeoTarget: {
        type: 'custom_locations',
        zips: sjZips.map(z => ({ key: z, country: 'US' }))
      },
      googleAdsTarget: {
        type: 'Postal Code',
        criteria: sjZips
      },
      thumbtackProTarget: {
        metro: 'San Jose - Silicon Valley',
        zipCount: sjZips.length,
        commaSeparatedZips: sjZips.join(', ')
      }
    }
  };

  // Update or insert CA-santa-ana-orange-county
  const ocCities = getMemberCities(caData, ocZips);
  const ocRegionObj = {
    id: 'CA-santa-ana-orange-county',
    name: 'Santa Ana & Orange County',
    fullName: 'Santa Ana, Anaheim, Irvine & Orange County Metro',
    state: 'CA',
    tier: 2,
    type: 'metro-region',
    parentRegion: 'CA-southern-california',
    description: 'Southern California economic and entertainment powerhouse encompassing Santa Ana, Anaheim, Irvine Spectrum, Huntington Beach, and Disneyland Resort.',
    googleUrl: 'https://www.google.com/maps/place/Santa+Ana,+CA/',
    counties: ['Orange'],
    countyCount: 1,
    bounds: ocDissolved.bounds,
    center: ocDissolved.center,
    x: ocDissolved.center[0],
    y: ocDissolved.center[1],
    path: ocDissolved.path,
    stitchedPath: ocDissolved.path,
    isDissolvedBoundary: true,
    boundarySource: 'dissolved-zcta-polygons',
    zipCount: ocZips.length,
    zips: ocZips,
    citiesCount: ocCities.length,
    cities: ocCities,
    adTargeting: {
      metaGeoTarget: {
        type: 'custom_locations',
        zips: ocZips.map(z => ({ key: z, country: 'US' }))
      },
      googleAdsTarget: {
        type: 'Postal Code',
        criteria: ocZips
      },
      thumbtackProTarget: {
        metro: 'Orange County',
        zipCount: ocZips.length,
        commaSeparatedZips: ocZips.join(', ')
      }
    }
  };

  // Put into caData.regions
  const upsertRegion = (reg) => {
    const idx = caData.regions.findIndex(r => r.id === reg.id);
    if (idx >= 0) caData.regions[idx] = reg;
    else caData.regions.push(reg);
  };
  upsertRegion(sjRegionObj);
  upsertRegion(ocRegionObj);

  // Also update existing alias regions so old links/ids work
  const silIdx = caData.regions.findIndex(r => r.id === 'CA-silicon-valley');
  if (silIdx >= 0) {
    caData.regions[silIdx] = {
      ...caData.regions[silIdx],
      ...sjRegionObj,
      id: 'CA-silicon-valley',
      name: 'Silicon Valley (San Jose South Bay)'
    };
  }
  const ocIdx = caData.regions.findIndex(r => r.id === 'CA-orange-county');
  if (ocIdx >= 0) {
    caData.regions[ocIdx] = {
      ...caData.regions[ocIdx],
      ...ocRegionObj,
      id: 'CA-orange-county'
    };
  }

  fs.writeFileSync(caPath, JSON.stringify(caData, null, 2), 'utf8');
  console.log(`  ✓ Wrote updated California data with ZIP-dissolved regions to ${caPath}`);

  // 2. Process Illinois: Chicagoland
  console.log('\n📍 Processing Illinois (Chicagoland)...');
  const ilPath = path.join(__dirname, '..', 'data', 'usa', 'states', 'IL.json');
  const ilData = JSON.parse(fs.readFileSync(ilPath, 'utf8'));
  const ilReg = ilData.regions.find(r => r.id === 'IL-chicagoland');
  if (ilReg && ilReg.zips && ilReg.zips.length > 0) {
    const ilDissolved = dissolveZipCodes('IL', ilReg.zips);
    ilReg.path = ilDissolved.path;
    ilReg.stitchedPath = ilDissolved.path;
    ilReg.bounds = ilDissolved.bounds;
    ilReg.center = ilDissolved.center;
    ilReg.x = ilDissolved.center[0];
    ilReg.y = ilDissolved.center[1];
    ilReg.isDissolvedBoundary = true;
    ilReg.boundarySource = 'dissolved-zcta-polygons';
    fs.writeFileSync(ilPath, JSON.stringify(ilData, null, 2), 'utf8');
    console.log(`  ✓ Dissolved Chicagoland: ${ilDissolved.matchedCount} ZIPs merged. Path len: ${ilDissolved.path.length}`);
  }

  // 3. Process Georgia: Metro Atlanta
  console.log('\n📍 Processing Georgia (Metro Atlanta)...');
  const gaPath = path.join(__dirname, '..', 'data', 'usa', 'states', 'GA.json');
  const gaData = JSON.parse(fs.readFileSync(gaPath, 'utf8'));
  const gaReg = gaData.regions.find(r => r.id === 'GA-metro-atlanta');
  if (gaReg && gaReg.zips && gaReg.zips.length > 0) {
    const gaDissolved = dissolveZipCodes('GA', gaReg.zips);
    gaReg.path = gaDissolved.path;
    gaReg.stitchedPath = gaDissolved.path;
    gaReg.bounds = gaDissolved.bounds;
    gaReg.center = gaDissolved.center;
    gaReg.x = gaDissolved.center[0];
    gaReg.y = gaDissolved.center[1];
    gaReg.isDissolvedBoundary = true;
    gaReg.boundarySource = 'dissolved-zcta-polygons';
    fs.writeFileSync(gaPath, JSON.stringify(gaData, null, 2), 'utf8');
    console.log(`  ✓ Dissolved Metro Atlanta: ${gaDissolved.matchedCount} ZIPs merged. Path len: ${gaDissolved.path.length}`);
  }

  // 4. Update Search Index
  console.log('\n📍 Updating Search Index...');
  const searchIndexPath = path.join(__dirname, '..', 'data', 'usa', 'search-index.json');
  const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

  const upsertSearchIndex = (item) => {
    const idx = searchIndex.findIndex(s => s.type === 'region' && s.id === item.id);
    if (idx >= 0) searchIndex[idx] = item;
    else searchIndex.push(item);
  };

  upsertSearchIndex({
    type: 'region',
    id: sjRegionObj.id,
    name: sjRegionObj.name,
    fullName: sjRegionObj.fullName,
    state: 'CA',
    tier: 2,
    zipCount: sjRegionObj.zipCount,
    bounds: sjRegionObj.bounds,
    center: sjRegionObj.center,
    keywords: 'San Jose, Silicon Valley, South Bay, Santa Clara, Sunnyvale, Campbell, Cupertino, Milpitas, Apple, Google, Meta, Thumbtack pro market'
  });

  upsertSearchIndex({
    type: 'region',
    id: ocRegionObj.id,
    name: ocRegionObj.name,
    fullName: ocRegionObj.fullName,
    state: 'CA',
    tier: 2,
    zipCount: ocRegionObj.zipCount,
    bounds: ocRegionObj.bounds,
    center: ocRegionObj.center,
    keywords: 'Santa Ana, Orange County, Anaheim, Irvine, Huntington Beach, Newport Beach, Fullerton, Costa Mesa, Disneyland, Thumbtack pro market'
  });

  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex), 'utf8');
  console.log(`  ✓ Search index updated.`);

  console.log('\n✨ Option 3 ZIP-dissolved regions build completed successfully!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
