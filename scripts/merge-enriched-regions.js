/**
 * scripts/merge-enriched-regions.js
 *
 * Merges enriched state regions into data/usa/metro-regions-catalog.js:
 * - Florida (FL): 20 comprehensive regions (South Florida, Orlando, Tampa Bay, Space Coast, Keys, etc.)
 * - Washington (WA): 16 comprehensive regions (Western WA, Seattle Metro, South Sound, Spokane, etc.)
 * - Texas (TX): 16 regions
 * - North Carolina (NC): 7 regions
 * - Georgia (GA): 7 regions
 * - Arizona (AZ): 4 regions
 * - Colorado (CO): 6 regions
 * - Illinois (IL): 7 regions
 * - Pennsylvania (PA): 8 regions
 * - Adds complete coverage for ND (North Dakota), NE (Nebraska), and NH (New Hampshire).
 */

const fs = require('fs');
const path = require('path');
const { MASTER_REGIONS } = require('../data/usa/metro-regions-catalog.js');
const { ENRICHED_STATE_REGIONS } = require('./enrich-state-regions.js');

// Add missing states: ND, NE, NH
const ADDITIONAL_STATES = {
  'ND': [
    {
      id: 'ND-red-river-valley',
      name: 'Red River Valley',
      fullName: 'Red River Valley & Eastern North Dakota (Fargo & Grand Forks)',
      state: 'ND',
      tier: 1,
      description: 'Major population center, North Dakota State University, Microsoft campus in Fargo, and University of North Dakota aerospace in Grand Forks.',
      googleUrl: 'https://www.google.com/maps/place/Red+River+Valley,+ND',
      counties: ['Cass', 'Grand Forks', 'Richland', 'Traill', 'Walsh', 'Pembina', 'Barnes', 'Steele']
    },
    {
      id: 'ND-central-capital',
      name: 'Central North Dakota',
      fullName: 'Central North Dakota & Capital Region (Bismarck & Minot)',
      state: 'ND',
      tier: 1,
      description: 'State capital Bismarck on the Missouri River, Minot Air Force Base (B-52 bombers and Minuteman missiles), and energy generation corridor.',
      googleUrl: 'https://www.google.com/maps/place/Central+North+Dakota,+ND',
      counties: ['Burleigh', 'Morton', 'Ward', 'McLean', 'Mercer', 'Oliver', 'Stutsman', 'Kidder', 'Wells', 'Pierce', 'McHenry']
    },
    {
      id: 'ND-western-bakken',
      name: 'Western North Dakota',
      fullName: 'Western North Dakota & Bakken Formation (Williston & Dickinson)',
      state: 'ND',
      tier: 1,
      description: 'Bakken oil and gas shale energy powerhouse, Theodore Roosevelt National Park badlands, and historic ranching in Medora.',
      googleUrl: 'https://www.google.com/maps/place/Western+North+Dakota,+ND',
      counties: ['Williams', 'McKenzie', 'Stark', 'Mountrail', 'Dunn', 'Divide', 'Burke', 'Bowman', 'Billings', 'Slope', 'Golden Valley']
    }
  ],
  'NE': [
    {
      id: 'NE-omaha-metro',
      name: 'Greater Omaha Metro',
      fullName: 'Greater Omaha Metropolitan Area (Omaha, Bellevue & Papillion)',
      state: 'NE',
      tier: 1,
      description: 'Economic engine of Nebraska, Berkshire Hathaway headquarters, Offutt Air Force Base (USSTRATCOM), and Henry Doorly Zoo.',
      googleUrl: 'https://www.google.com/maps/place/Greater+Omaha,+NE',
      counties: ['Douglas', 'Sarpy', 'Cass', 'Washington', 'Dodge', 'Saunders']
    },
    {
      id: 'NE-lincoln-capital',
      name: 'Lincoln & Capital Region',
      fullName: 'Lincoln Metropolitan Area & Southeast Nebraska (Cornhuskers & Capitol)',
      state: 'NE',
      tier: 1,
      description: 'Nebraska state capitol tower, University of Nebraska-Lincoln flagship campus, state government center, and agricultural tech.',
      googleUrl: 'https://www.google.com/maps/place/Lincoln,+NE',
      counties: ['Lancaster', 'Seward', 'Saline', 'Gage', 'Otoe', 'Jefferson']
    },
    {
      id: 'NE-central-tri-cities',
      name: 'Central Nebraska',
      fullName: 'Central Nebraska & Tri-Cities (Grand Island, Kearney & Hastings)',
      state: 'NE',
      tier: 1,
      description: 'Platte River valley agricultural heartland, sandhill crane migration corridor, University of Nebraska at Kearney, and manufacturing.',
      googleUrl: 'https://www.google.com/maps/place/Central+Nebraska,+NE',
      counties: ['Hall', 'Buffalo', 'Adams', 'Dawson', 'Phelps', 'Kearney', 'Hamilton', 'Merrick', 'Platte', 'Madison']
    },
    {
      id: 'NE-western-panhandle',
      name: 'Western Nebraska & Panhandle',
      fullName: 'Western Nebraska & The Panhandle (Scottsbluff, North Platte & Sandhills)',
      state: 'NE',
      tier: 1,
      description: 'Chimney Rock and Scotts Bluff National Monuments along Oregon Trail, Union Pacific Bailey Yard in North Platte, and scenic Sandhills cattle ranches.',
      googleUrl: 'https://www.google.com/maps/place/Western+Nebraska,+NE',
      counties: ['Scotts Bluff', 'Lincoln', 'Box Butte', 'Dawes', 'Cheyenne', 'Keith', 'Morrill', 'Kimball', 'Sheridan', 'Cherry', 'Custer']
    }
  ],
  'NH': [
    {
      id: 'NH-merrimack-valley-seacoast',
      name: 'Merrimack Valley & Seacoast',
      fullName: 'Southern New Hampshire & Seacoast (Manchester, Nashua & Portsmouth)',
      state: 'NH',
      tier: 1,
      description: 'Economic heart of New Hampshire, Manchester-Boston Regional Airport, historic Portsmouth seaport and naval shipyard, and high-tech manufacturing.',
      googleUrl: 'https://www.google.com/maps/place/Southern+New+Hampshire,+NH',
      counties: ['Hillsborough', 'Rockingham', 'Strafford', 'Merrimack']
    },
    {
      id: 'NH-lakes-monadnock',
      name: 'Lakes Region & Monadnock',
      fullName: 'Lakes Region & Monadnock (Lake Winnipesaukee, Concord & Keene)',
      state: 'NH',
      tier: 1,
      description: 'Lake Winnipesaukee resort boating, Mount Monadnock (most-climbed mountain in North America), state capital Concord, and college towns.',
      googleUrl: 'https://www.google.com/maps/place/Lakes+Region,+NH',
      counties: ['Belknap', 'Cheshire', 'Sullivan']
    },
    {
      id: 'NH-white-mountains-north',
      name: 'White Mountains & Great North Woods',
      fullName: 'White Mountains & Great North Woods (Mount Washington & Franconia)',
      state: 'NH',
      tier: 1,
      description: 'Mount Washington (highest peak in Northeast), Presidential Range, Franconia Notch, world-class ski resorts (Bretton Woods, Loon), and vast wilderness.',
      googleUrl: 'https://www.google.com/maps/place/White+Mountains,+NH',
      counties: ['Grafton', 'Carroll', 'Coos']
    }
  ]
};

function main() {
  console.log(`Starting merge. Initial Master Regions count: ${MASTER_REGIONS.length}`);

  // Combine ENRICHED_STATE_REGIONS and ADDITIONAL_STATES
  const replacementMap = { ...ADDITIONAL_STATES };

  for (const [st, regions] of Object.entries(ENRICHED_STATE_REGIONS)) {
    replacementMap[st] = regions.map(r => ({
      id: r.id,
      name: r.name,
      fullName: r.fullName,
      state: st,
      tier: r.tier,
      parentRegion: r.parentRegion || null,
      description: r.desc || r.description,
      googleUrl: r.googleUrl || `https://www.google.com/maps/place/${encodeURIComponent(r.name)},+${st}`,
      counties: r.counties
    }));
  }

  // Filter out any existing regions from states being replaced
  const replacedStates = new Set(Object.keys(replacementMap));
  const retainedRegions = MASTER_REGIONS.filter(r => !replacedStates.has(r.state));

  console.log(`Retained ${retainedRegions.length} regions from unaffected states.`);

  // Flatten and append new regions
  const newRegions = [];
  for (const st of Object.keys(replacementMap).sort()) {
    const list = replacementMap[st];
    newRegions.push(...list);
    console.log(`  + Added ${list.length} regions for ${st}`);
  }

  const finalCatalog = [...retainedRegions, ...newRegions];
  // Sort by state, then tier, then name
  finalCatalog.sort((a, b) => {
    if (a.state !== b.state) return a.state.localeCompare(b.state);
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.name.localeCompare(b.name);
  });

  console.log(`Final Master Catalog count: ${finalCatalog.length} regions across all 52 states & territories.`);

  // Write back to data/usa/metro-regions-catalog.js
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
  console.log(`Successfully updated ${catalogPath}`);
}

main();
