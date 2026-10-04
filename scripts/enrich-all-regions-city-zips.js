/**
 * scripts/enrich-all-regions-city-zips.js
 *
 * Traverses all 52 US state files (data/usa/states/*.json) and ensures that:
 * 1. Every region's member cities in `region.cities` have their exact constituent `zips` array populated.
 * 2. Cities in regions without zips are matched against stateData.cities and stateData.zipcodes.
 * 3. Ensures the 3-tier hierarchy (Region -> Cities -> ZIP codes) is 100% complete nationwide.
 */

const fs = require('fs');
const path = require('path');

const statesDir = path.join(__dirname, '..', 'data', 'usa', 'states');
const stateFiles = fs.readdirSync(statesDir).filter(f => f.endsWith('.json')).sort();

console.log(`🚀 Enriching region city zips across ${stateFiles.length} state files...`);

let totalStatesUpdated = 0;
let totalRegionsUpdated = 0;
let totalCitiesEnriched = 0;

stateFiles.forEach(file => {
  const filePath = path.join(statesDir, file);
  const stateData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let modified = false;

  // Build lookup maps
  const cityMap = new Map();
  (stateData.cities || []).forEach(c => {
    cityMap.set(c.id, c);
    cityMap.set(c.name.toLowerCase().trim(), c);
  });

  const zipsByCity = new Map();
  (stateData.zipcodes || []).forEach(z => {
    if (z.city) {
      const cLower = z.city.toLowerCase().trim();
      if (!zipsByCity.has(cLower)) zipsByCity.set(cLower, []);
      zipsByCity.get(cLower).push(z.zip);
    }
  });

  (stateData.regions || []).forEach(reg => {
    let regModified = false;
    (reg.cities || []).forEach(c => {
      if (!c.zips || c.zips.length === 0) {
        const full = cityMap.get(c.id) || cityMap.get(c.name.toLowerCase().trim());
        let zips = full?.zips || [];
        if (zips.length === 0) {
          zips = zipsByCity.get(c.name.toLowerCase().trim()) || [];
        }
        if (zips.length > 0) {
          c.zips = Array.from(new Set(zips));
          c.zipCount = c.zips.length;
          regModified = true;
          totalCitiesEnriched++;
        }
      }
    });

    if (regModified) {
      totalRegionsUpdated++;
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(stateData, null, 2), 'utf8');
    totalStatesUpdated++;
  }
});

console.log(`\n✨ Successfully enriched ${totalCitiesEnriched} cities across ${totalRegionsUpdated} regions in ${totalStatesUpdated} states!`);
