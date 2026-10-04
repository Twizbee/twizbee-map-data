/**
 * scripts/build-master-regions.js
 *
 * Generates unified, dissolved topological boundaries for:
 * 1. Macro-Regions (Tier 1: NorCal, SoCal, Central CA, etc.)
 * 2. Metro Regions & Sub-Regions (Tier 2: Bay Area, Silicon Valley, Inland Empire, DFW, etc.)
 *
 * Merges county polygons using topojsonClient.merge to ensure 100% seamless exterior outlines
 * with 0 internal boundary lines, matching Google Maps regional views.
 *
 * Aggregates all constituent ZIP codes and cities for instant Meta/Google/Thumbtack ad targeting.
 */

const fs = require('fs');
const path = require('path');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');
const { MASTER_REGIONS } = require('../data/usa/metro-regions-catalog.js');

function round(val, decimals = 2) {
  const f = Math.pow(10, decimals);
  return Math.round(val * f) / f;
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
  console.log('🌎 Building Master Macro & Metro Regions for US States...');

  const us = require('us-atlas/counties-10m.json');
  const statesGeo = topojsonClient.feature(us, us.objects.states);
  const masterProj = d3Geo.geoAlbersUsa().fitSize([960, 600], statesGeo);
  const pathGen = d3Geo.geoPath().projection(masterProj);

  // Puerto Rico Projection Inset (Conic Equal Area positioned southeast of Florida)
  const prProj = d3Geo.geoConicEqualArea()
    .rotate([66, 0])
    .center([0, 18])
    .parallels([8, 18])
    .scale(1500)
    .translate([900, 545]);
  const prPathGen = d3Geo.geoPath().projection(prProj);

  // Group master regions by state
  const regionsByState = {};
  MASTER_REGIONS.forEach(r => {
    if (!regionsByState[r.state]) regionsByState[r.state] = [];
    regionsByState[r.state].push(r);
  });

  const statesJsonPath = path.join(__dirname, '..', 'data', 'usa', 'states.json');
  const statesMeta = JSON.parse(fs.readFileSync(statesJsonPath, 'utf8'));

  const searchIndexPath = path.join(__dirname, '..', 'data', 'usa', 'search-index.json');
  const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

  let totalRegionsBuilt = 0;

  for (const [stateAbbr, stateRegions] of Object.entries(regionsByState)) {
    const stateFilePath = path.join(__dirname, '..', 'data', 'usa', 'states', `${stateAbbr}.json`);
    if (!fs.existsSync(stateFilePath)) {
      console.warn(`  ⚠️ Missing state file for ${stateAbbr}`);
      continue;
    }

    const stateData = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    console.log(`\n📍 Processing ${stateAbbr} (${stateData.name}) - ${stateRegions.length} regions...`);
    const activePathGen = stateAbbr === 'PR' ? prPathGen : pathGen;

    // Build county lookup
    const countyMap = {};
    (stateData.counties || []).forEach(c => {
      const clean = c.name.toLowerCase().replace(/ (county|parish|borough|municipio|census area)$/i, '').trim();
      const norm = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      countyMap[clean] = c;
      countyMap[norm] = c;
      countyMap[c.name.toLowerCase().trim()] = c;
    });

    const builtRegions = [];

    for (const regDef of stateRegions) {
      const matchedCounties = [];
      const missingCounties = [];

      for (const cName of regDef.counties) {
        const clean = cName.toLowerCase().replace(/ (county|parish|borough|municipio|census area)$/i, '').trim();
        const norm = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (countyMap[clean]) {
          matchedCounties.push(countyMap[clean]);
        } else if (countyMap[norm]) {
          matchedCounties.push(countyMap[norm]);
        } else if (countyMap[cName.toLowerCase().trim()]) {
          matchedCounties.push(countyMap[cName.toLowerCase().trim()]);
        } else {
          missingCounties.push(cName);
        }
      }

      if (missingCounties.length > 0) {
        console.warn(`  ⚠️ Region ${regDef.name} missing counties: ${missingCounties.join(', ')}`);
      }

      if (matchedCounties.length === 0) {
        console.error(`  ❌ No counties found for ${regDef.name}`);
        continue;
      }

      const fipsList = matchedCounties.map(c => c.id);
      const geometries = us.objects.counties.geometries.filter(g => fipsList.includes(g.id));

      if (geometries.length === 0) {
        console.error(`  ❌ No topojson county geometries found for ${regDef.name}`);
        continue;
      }

      // Dissolve constituent county boundaries into single perimeter
      const mergedFeature = topojsonClient.merge(us, geometries);
      const rawPath = activePathGen(mergedFeature);
      const cleanedPath = cleanSvgPath(rawPath, 2);
      const rawBounds = activePathGen.bounds(mergedFeature);

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

      // Aggregate ZIP codes
      const countyNamesSet = new Set();
      matchedCounties.forEach(c => {
        const cl = c.name.toLowerCase().replace(/ (county|parish|borough|municipio|census area)$/i, '').trim();
        const nr = cl.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        countyNamesSet.add(cl);
        countyNamesSet.add(nr);
        countyNamesSet.add(c.name.toLowerCase().trim());
      });
      const fipsSet = new Set(fipsList);

      const memberZips = (stateData.zipcodes || [])
        .filter(z => {
          if (fipsSet.has(z.countyFips)) return true;
          const zc = (z.county || '').toLowerCase().replace(/ (county|parish|borough|municipio|census area)$/i, '').trim();
          const zn = zc.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return countyNamesSet.has(zc) || countyNamesSet.has(zn);
        })
        .map(z => z.zip);

      // Aggregate Cities
      const memberCities = (stateData.cities || [])
        .filter(c => {
          const cc = (c.county || '').toLowerCase().replace(/ (county|parish|borough|municipio|census area)$/i, '').trim();
          const cn = cc.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return countyNamesSet.has(cc) || countyNamesSet.has(cn);
        })
        .map(c => ({
          id: c.id,
          name: c.name,
          type: c.type || 'city',
          tier: c.tier || 1,
          county: c.county,
          zipCount: c.zipCount || (c.zips ? c.zips.length : 0),
          pop: c.pop || 0
        }));

      const regionObj = {
        id: regDef.id,
        name: regDef.name,
        fullName: regDef.fullName,
        state: stateAbbr,
        tier: regDef.tier,
        type: regDef.tier === 1 ? 'macro-region' : 'metro-region',
        parentRegion: regDef.parentRegion || null,
        description: regDef.description,
        googleUrl: regDef.googleUrl || null,
        counties: regDef.counties,
        countyCount: regDef.counties.length,
        bounds,
        center,
        x: center[0],
        y: center[1],
        path: cleanedPath,
        stitchedPath: cleanedPath,
        isDissolvedBoundary: true,
        zipCount: memberZips.length,
        zips: memberZips,
        citiesCount: memberCities.length,
        cities: memberCities,
        adTargeting: {
          googleAdsGeoName: regDef.fullName,
          metaAdsTarget: regDef.fullName,
          totalTargetZips: memberZips.length
        }
      };

      builtRegions.push(regionObj);
      totalRegionsBuilt++;
      console.log(`  ✓ Built ${regDef.tier === 1 ? 'Tier 1 Macro' : 'Tier 2 Metro'}: ${regDef.name} (${regDef.counties.length} counties, ${memberCities.length} cities, ${memberZips.length} ZIPs, path len: ${cleanedPath.length})`);
    }

    // Merge builtRegions into stateData.regions
    // If stateData has existing cluster regions (e.g. from Thumbtack), keep them with tier 3
    const existingClusters = (stateData.regions || []).filter(r => !r.id.startsWith(`${stateAbbr}-`));
    stateData.regions = [...builtRegions, ...existingClusters];
    stateData.regionsCount = stateData.regions.length;

    fs.writeFileSync(stateFilePath, JSON.stringify(stateData, null, 2), 'utf8');

    // Update state meta
    const sMeta = statesMeta.find(s => s.abbr === stateAbbr);
    if (sMeta) {
      sMeta.regionsCount = stateData.regionsCount;
    }

    // Update Search Index
    // Remove old region entries for this state
    for (let i = searchIndex.length - 1; i >= 0; i--) {
      if (searchIndex[i].type === 'region' && searchIndex[i].state === stateAbbr) {
        searchIndex.splice(i, 1);
      }
    }

    // Add new regions to search index
    builtRegions.forEach(r => {
      searchIndex.push({
        type: 'region',
        id: r.id,
        name: `${r.name}, ${r.state}`,
        fullName: r.fullName,
        cityName: r.name,
        state: r.state,
        tier: r.tier,
        bounds: r.bounds,
        center: r.center,
        zipCount: r.zipCount,
        keywords: `${r.name} ${r.fullName} ${r.state} ${r.counties.join(' ')} ${r.tier === 1 ? 'macro-region' : 'metro-region'}`
      });
    });
  }

  // Ensure Puerto Rico Viejo San Juan in search index is accurate
  const osjEntry = searchIndex.find(s => s.id === 'PR-san-juan-old-san-juan-viejo-san-juan');
  if (osjEntry) {
    osjEntry.bounds = [896.89, 532.65, 1.03, 0.34];
    osjEntry.center = [897.41, 532.82];
    osjEntry.name = 'Old San Juan (Viejo San Juan), PR';
    osjEntry.keywords = 'Old San Juan Viejo San Juan San Juan Antiguo historic district PR Puerto Rico 00901';
  }

  // Save states.json
  fs.writeFileSync(statesJsonPath, JSON.stringify(statesMeta, null, 2), 'utf8');
  console.log(`✓ Updated ${statesJsonPath}`);

  // Save search-index.json
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex), 'utf8');
  console.log(`✓ Updated ${searchIndexPath} (${searchIndex.length} total entries)`);

  console.log(`\n🎉 Successfully built ${totalRegionsBuilt} Master Macro & Metro Regions across all states!`);
}

main().catch(err => {
  console.error('Fatal error in build-master-regions:', err);
  process.exit(1);
});
