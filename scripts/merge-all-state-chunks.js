/**
 * scripts/merge-all-state-chunks.js
 *
 * Merges all 5 chunks + CA, FL, WA, TX, ND, NE into the Master National Catalog:
 * - Chunk 1: NY, PA, NJ, MA, MD, VA, CT, WV
 * - Chunk 2: NC, SC, GA, TN, AL, LA, MS, AR, KY, OK
 * - Chunk 3: IL, OH, MI, IN, WI, MN, MO, IA, KS, SD
 * - Chunk 4: AZ, CO, NV, UT, NM, ID, MT, WY
 * - Chunk 5: OR, HI, AK, PR, ME, VT, NH, RI, DE, DC
 * - Anchors: CA, FL, WA, TX, ND, NE
 *
 * Total: All 52 US States & Territories (50 States + DC + PR)
 */

const fs = require('fs');
const path = require('path');

const { CHUNK_1_REGIONS } = require('./enrich-chunk-1.js');
const { CHUNK_2_REGIONS } = require('./enrich-chunk-2.js');
const { CHUNK_3_REGIONS } = require('./enrich-chunk-3.js');
const { CHUNK_4_REGIONS } = require('./enrich-chunk-4.js');
const { CHUNK_5_REGIONS } = require('./enrich-chunk-5.js');

// Current master catalog to preserve anchors (CA, FL, WA, TX, ND, NE)
const { MASTER_REGIONS: CURRENT_CATALOG } = require('../data/usa/metro-regions-catalog.js');

function main() {
  console.log('🌎 Merging all regional chunks into Master National Catalog...');

  // Combine chunks 1 through 5
  const allChunkRegions = {
    ...CHUNK_1_REGIONS,
    ...CHUNK_2_REGIONS,
    ...CHUNK_3_REGIONS,
    ...CHUNK_4_REGIONS,
    ...CHUNK_5_REGIONS
  };

  // Anchors to keep from CURRENT_CATALOG
  const ANCHOR_STATES = ['CA', 'FL', 'WA', 'TX', 'ND', 'NE'];
  const anchorRegions = CURRENT_CATALOG.filter(r => ANCHOR_STATES.includes(r.state));

  console.log(`Preserving ${anchorRegions.length} anchor regions from ${ANCHOR_STATES.join(', ')}.`);

  const finalCatalog = [...anchorRegions];

  // Process chunk states
  for (const [st, regions] of Object.entries(allChunkRegions)) {
    const formatted = regions.map(r => ({
      id: r.id,
      name: r.name,
      fullName: r.fullName,
      state: st,
      tier: r.tier || 1,
      parentRegion: r.parentRegion || null,
      description: r.desc || r.description,
      googleUrl: r.googleUrl || `https://www.google.com/maps/place/${encodeURIComponent(r.name)},+${st}`,
      counties: r.counties
    }));
    finalCatalog.push(...formatted);
    console.log(`  + Added ${formatted.length} regions for ${st}`);
  }

  // Sort by state, tier, name
  finalCatalog.sort((a, b) => {
    if (a.state !== b.state) return a.state.localeCompare(b.state);
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.name.localeCompare(b.name);
  });

  const uniqueStates = [...new Set(finalCatalog.map(r => r.state))];
  console.log(`\n🎉 Total Catalog: ${finalCatalog.length} regions across all ${uniqueStates.length} states & territories!`);

  const catalogPath = path.join(__dirname, '..', 'data', 'usa', 'metro-regions-catalog.js');
  const fileContent = `/**
 * Master Catalog of Geographic, Advertising & Metropolitan Regions
 * Covers Macro-Regions (Tier 1) and Sub-Regions / Metros (Tier 2) across ALL 50 States, DC, and Puerto Rico.
 *
 * Each region is defined by its constituent counties so that:
 * 1. Vector geometry is stitched directly from 1:500k Census cartographic county boundaries
 * 2. Internal lines are dissolved using TopoJSON merge to produce 100% exact Google Maps outlines
 * 3. Exact bounding box and center are automatically computed
 * 4. All member ZIP codes are aggregated for direct ad targeting export (Meta, Google, Thumbtack)
 */

const MASTER_REGIONS = ${JSON.stringify(finalCatalog, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MASTER_REGIONS };
}
`;

  fs.writeFileSync(catalogPath, fileContent, 'utf8');
  console.log(`✓ Updated ${catalogPath}`);
}

main();
