/**
 * scripts/build-canada-regions.js
 *
 * Generates unified, dissolved topological boundaries for:
 * Canadian Macro-Regions & Metro Areas across all 10 Provinces & 3 Territories.
 *
 * Merges constituent Census Divisions using topojsonClient.merge to ensure 100% seamless
 * exterior outlines with 0 internal boundary lines, matching Google Maps regional views.
 *
 * Aggregates all constituent Postal FSAs and cities for instant Meta/Google/Thumbtack ad targeting.
 */

const fs = require('fs');
const path = require('path');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');
const { CANADA_REGIONS } = require('../data/canada/regions-catalog.js');

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

const PRUID_MAP = {
  'NL': '10', 'PE': '11', 'NS': '12', 'NB': '13', 'QC': '24', 'ON': '35',
  'MB': '46', 'SK': '47', 'AB': '48', 'BC': '59', 'YT': '60', 'NT': '61', 'NU': '62'
};

async function main() {
  console.log('🍁 Building Master Macro & Metro Regions for Canada...');

  const provTopo = JSON.parse(fs.readFileSync('temp_canada/provinces.topojson', 'utf8'));
  const provGeo = topojsonClient.feature(provTopo, Object.keys(provTopo.objects)[0]);

  const cdTopo = JSON.parse(fs.readFileSync('temp_canada/census_divisions.topojson', 'utf8'));
  const cdObjectName = Object.keys(cdTopo.objects)[0];
  const cdGeometries = cdTopo.objects[cdObjectName].geometries;

  const projection = d3Geo.geoConicEqualArea()
    .parallels([49, 77])
    .rotate([96, 0])
    .center([0, 62])
    .fitExtent([[30, 30], [930, 570]], provGeo);

  const pathGen = d3Geo.geoPath().projection(projection);

  // Group Canada regions by province
  const regionsByProv = {};
  CANADA_REGIONS.forEach(r => {
    const p = r.province;
    if (!regionsByProv[p]) regionsByProv[p] = [];
    regionsByProv[p].push(r);
  });

  const provJsonPath = path.join(__dirname, '..', 'data', 'canada', 'provinces.json');
  const provsMeta = JSON.parse(fs.readFileSync(provJsonPath, 'utf8'));

  const searchIndexPath = path.join(__dirname, '..', 'data', 'canada', 'search-index.json');
  const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

  const allProvinceDetails = {};
  let totalRegionsBuilt = 0;

  for (const provMeta of provsMeta) {
    const abbr = provMeta.abbr;
    const pruid = PRUID_MAP[abbr];
    const provFilePath = path.join(__dirname, '..', 'data', 'canada', 'provinces', `${abbr}.json`);

    if (!fs.existsSync(provFilePath)) {
      console.warn(`  ⚠️ Missing file for ${abbr}`);
      continue;
    }

    const provData = JSON.parse(fs.readFileSync(provFilePath, 'utf8'));
    const provRegions = regionsByProv[abbr] || [];
    console.log(`\n📍 Processing ${abbr} (${provData.name}) - ${provRegions.length} regions...`);

    const provCDGeoms = cdGeometries.filter(g => String(g.properties.pruid) === pruid);
    const cdLookup = {};
    provCDGeoms.forEach(g => {
      const raw = (g.properties.cdname || '').replace(/\s+/g, ' ').toLowerCase().trim();
      const clean = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      cdLookup[raw] = g;
      cdLookup[clean] = g;
      cdLookup[String(g.properties.cduid)] = g;
    });

    const builtRegions = [];

    for (const regDef of provRegions) {
      const matchedGeoms = [];
      const missingNames = [];

      for (const name of regDef.censusDivisions) {
        const raw = name.replace(/\s+/g, ' ').toLowerCase().trim();
        const clean = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let found = cdLookup[raw] || cdLookup[clean];
        if (!found) {
          found = provCDGeoms.find(g => {
            const gn = (g.properties.cdname || '').replace(/\s+/g, ' ').toLowerCase();
            const gnc = gn.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return gn.includes(raw) || raw.includes(gn) || gnc.includes(clean) || clean.includes(gnc);
          });
        }
        if (found) {
          if (!matchedGeoms.includes(found)) {
            matchedGeoms.push(found);
          }
        } else {
          missingNames.push(name);
        }
      }

      if (missingNames.length > 0) {
        console.warn(`  ⚠️ Region ${regDef.name} missing CDs: ${missingNames.join(', ')}`);
      }

      if (matchedGeoms.length === 0) {
        console.error(`  ❌ No CD geometries matched for ${regDef.name}`);
        continue;
      }

      // Dissolve constituent Census Divisions into single seamless outer boundary
      const mergedFeature = topojsonClient.merge(cdTopo, matchedGeoms);
      const rawPath = pathGen(mergedFeature);
      const cleanedPath = cleanSvgPath(rawPath, 2);
      const rawBounds = pathGen.bounds(mergedFeature);

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

      // Build constituent CD names lookup set
      const cdNamesSet = new Set();
      matchedGeoms.forEach(g => {
        const n = (g.properties.cdname || '').replace(/\s+/g, ' ').toLowerCase().trim();
        const nc = n.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        cdNamesSet.add(n);
        cdNamesSet.add(nc);
        cdNamesSet.add(String(g.properties.cduid));
      });

      // Aggregate Cities
      const memberCities = (provData.cities || [])
        .filter(c => {
          const cc = (c.county || '').replace(/\s+/g, ' ').toLowerCase().trim();
          const cn = cc.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          if (cdNamesSet.has(cc) || cdNamesSet.has(cn)) return true;
          // Bounding box spatial containment
          if (c.x >= bounds[0] - 5 && c.x <= bounds[0] + bounds[2] + 5 &&
              c.y >= bounds[1] - 5 && c.y <= bounds[1] + bounds[3] + 5) {
            return true;
          }
          return false;
        })
        .map(c => ({
          id: `${abbr}-${c.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          name: c.name,
          type: 'city',
          tier: 1,
          county: c.county,
          zipCount: c.zipCount || (c.zips ? c.zips.length : 0),
          pop: c.pop || 0
        }));

      // Aggregate Postal FSAs
      const memberZipsSet = new Set();
      // 1. From matched cities
      (provData.cities || []).filter(c => {
        const cc = (c.county || '').replace(/\s+/g, ' ').toLowerCase().trim();
        const cn = cc.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return cdNamesSet.has(cc) || cdNamesSet.has(cn);
      }).forEach(c => {
        (c.zips || []).forEach(z => memberZipsSet.add(z));
      });

      // 2. From FSAs in province matching county or spatial bounds
      (provData.zipcodes || []).forEach(z => {
        const zc = (z.county || '').replace(/\s+/g, ' ').toLowerCase().trim();
        const zn = zc.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (cdNamesSet.has(zc) || cdNamesSet.has(zn)) {
          memberZipsSet.add(z.zip);
        } else if (z.center &&
                   z.center[0] >= bounds[0] && z.center[0] <= bounds[0] + bounds[2] &&
                   z.center[1] >= bounds[1] && z.center[1] <= bounds[1] + bounds[3]) {
          memberZipsSet.add(z.zip);
        }
      });

      const memberZips = Array.from(memberZipsSet).sort();

      const regionObj = {
        id: regDef.id,
        name: regDef.name,
        fullName: regDef.fullName,
        province: abbr,
        state: abbr,
        tier: regDef.tier || 1,
        type: 'macro-region',
        parentRegion: null,
        description: regDef.desc,
        googleUrl: regDef.googleUrl || null,
        censusDivisions: regDef.censusDivisions,
        censusDivisionCount: regDef.censusDivisions.length,
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
      console.log(`  ✓ Built Macro-Region: ${regDef.name} (${regDef.censusDivisions.length} CDs, ${memberCities.length} cities, ${memberZips.length} FSAs, path len: ${cleanedPath.length})`);
    }

    provData.regions = builtRegions;
    provData.regionsCount = builtRegions.length;

    fs.writeFileSync(provFilePath, JSON.stringify(provData, null, 2), 'utf8');
    allProvinceDetails[abbr] = provData;

    // Update meta
    provMeta.regionsCount = provData.regionsCount;

    // Update search index
    for (let i = searchIndex.length - 1; i >= 0; i--) {
      if (searchIndex[i].type === 'region' && (searchIndex[i].state === abbr || searchIndex[i].province === abbr)) {
        searchIndex.splice(i, 1);
      }
    }

    builtRegions.forEach(r => {
      searchIndex.push({
        type: 'region',
        id: r.id,
        name: `${r.name}, ${abbr}`,
        fullName: r.fullName,
        cityName: r.name,
        state: abbr,
        province: abbr,
        tier: r.tier,
        bounds: r.bounds,
        center: r.center,
        zipCount: r.zipCount,
        keywords: `${r.name} ${r.fullName} ${abbr} ${r.censusDivisions.join(' ')} macro-region canada`
      });
    });
  }

  // Save provinces.json
  fs.writeFileSync(provJsonPath, JSON.stringify(provsMeta, null, 2), 'utf8');
  console.log(`✓ Updated ${provJsonPath}`);

  // Save search-index.json
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex), 'utf8');
  console.log(`✓ Updated ${searchIndexPath} (${searchIndex.length} total entries)`);

  // Update dist/canada-all-data.js
  const distDir = path.join(__dirname, '..', 'dist');
  const canadaBundleContent = `/**
 * Pre-bundled offline map data for Canada (including Macro-Regions).
 * Generated automatically by build-canada-regions.js.
 */
(function() {
  var data = {
    states: ${JSON.stringify(provsMeta)},
    searchIndex: ${JSON.stringify(searchIndex)},
    stateDetails: ${JSON.stringify(allProvinceDetails)}
  };
  if (typeof window !== 'undefined') {
    window.__CANADA_MAP_DATA__ = data;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = data;
  }
})();
`;
  fs.writeFileSync(path.join(distDir, 'canada-all-data.js'), canadaBundleContent, 'utf8');
  console.log(`✓ Updated dist/canada-all-data.js`);

  console.log(`\n🎉 Successfully built ${totalRegionsBuilt} Canadian Macro & Metro Regions across all 13 Provinces and Territories!`);
}

main().catch(err => {
  console.error('Fatal error in build-canada-regions:', err);
  process.exit(1);
});
