const fs = require('fs');
const path = require('path');

/**
 * Canadian Metro, City, Borough, and Neighborhood Targeting Catalog
 * Structured specifically for Meta / Facebook Ads & Google Ads FSA breakdowns.
 */

function round(val, decimals = 2) {
  const f = Math.pow(10, decimals);
  return Math.round(val * f) / f;
}

// Comprehensive Canadian Metros, Major Cities, and Official Boroughs/Sub-Markets
const CANADA_SUBREGIONS = [
  // =========================================================================
  // ONTARIO (ON) - Greater Toronto Area & Major Cities
  // =========================================================================
  // 1. Toronto Amalgamated Boroughs
  {
    name: 'Old Toronto',
    fullName: 'Old Toronto (Downtown & Central), Toronto',
    parentCity: 'Toronto',
    metroName: 'Greater Toronto Area',
    county: 'Toronto',
    state: 'ON',
    type: 'borough',
    tier: 2,
    lat: 43.6532,
    lon: -79.3832,
    fsaPrefixes: ['M4W', 'M4X', 'M4Y', 'M5A', 'M5B', 'M5C', 'M5E', 'M5G', 'M5H', 'M5J', 'M5K', 'M5L', 'M5S', 'M5T', 'M5V', 'M5W', 'M5X', 'M6G', 'M6J', 'M6K', 'M6P', 'M6R', 'M4V', 'M4T', 'M4S', 'M4R', 'M4P', 'M4N', 'M4E', 'M4L', 'M4M', 'M4K', 'M4J']
  },
  {
    name: 'North York',
    fullName: 'North York Borough, Toronto',
    parentCity: 'Toronto',
    metroName: 'Greater Toronto Area',
    county: 'Toronto',
    state: 'ON',
    type: 'borough',
    tier: 2,
    lat: 43.7615,
    lon: -79.4111,
    fsaPrefixes: ['M2H', 'M2J', 'M2K', 'M2L', 'M2M', 'M2N', 'M2P', 'M2R', 'M3A', 'M3B', 'M3C', 'M3H', 'M3J', 'M3K', 'M3L', 'M3M', 'M3N']
  },
  {
    name: 'Scarborough',
    fullName: 'Scarborough Borough, Toronto',
    parentCity: 'Toronto',
    metroName: 'Greater Toronto Area',
    county: 'Toronto',
    state: 'ON',
    type: 'borough',
    tier: 2,
    lat: 43.7764,
    lon: -79.2318,
    fsaPrefixes: ['M1B', 'M1C', 'M1E', 'M1G', 'M1H', 'M1J', 'M1K', 'M1L', 'M1M', 'M1N', 'M1P', 'M1R', 'M1S', 'M1T', 'M1V', 'M1W', 'M1X']
  },
  {
    name: 'Etobicoke',
    fullName: 'Etobicoke Borough, Toronto',
    parentCity: 'Toronto',
    metroName: 'Greater Toronto Area',
    county: 'Toronto',
    state: 'ON',
    type: 'borough',
    tier: 2,
    lat: 43.6205,
    lon: -79.5132,
    fsaPrefixes: ['M8V', 'M8W', 'M8X', 'M8Y', 'M8Z', 'M9A', 'M9B', 'M9C', 'M9L', 'M9M', 'M9N', 'M9P', 'M9R', 'M9V', 'M9W']
  },
  {
    name: 'York',
    fullName: 'York Borough, Toronto',
    parentCity: 'Toronto',
    metroName: 'Greater Toronto Area',
    county: 'Toronto',
    state: 'ON',
    type: 'borough',
    tier: 2,
    lat: 43.6896,
    lon: -79.4506,
    fsaPrefixes: ['M6E', 'M6M', 'M6N']
  },
  {
    name: 'East York',
    fullName: 'East York Borough, Toronto',
    parentCity: 'Toronto',
    metroName: 'Greater Toronto Area',
    county: 'Toronto',
    state: 'ON',
    type: 'borough',
    tier: 2,
    lat: 43.6912,
    lon: -79.3417,
    fsaPrefixes: ['M4B', 'M4C', 'M4G', 'M4H']
  },
  {
    name: 'Downtown Toronto',
    fullName: 'Downtown Toronto / Financial District',
    parentCity: 'Toronto',
    metroName: 'Greater Toronto Area',
    county: 'Toronto',
    state: 'ON',
    type: 'neighborhood',
    tier: 2,
    lat: 43.6487,
    lon: -79.3817,
    fsaPrefixes: ['M5H', 'M5J', 'M5K', 'M5L', 'M5X', 'M5C', 'M5B', 'M5G', 'M5V']
  },
  {
    name: 'Midtown Toronto',
    fullName: 'Midtown Toronto (Yonge & Eglinton, Rosedale)',
    parentCity: 'Toronto',
    metroName: 'Greater Toronto Area',
    county: 'Toronto',
    state: 'ON',
    type: 'neighborhood',
    tier: 2,
    lat: 43.7067,
    lon: -79.3986,
    fsaPrefixes: ['M4P', 'M4R', 'M4S', 'M4T', 'M4V', 'M4N']
  },

  // 2. Ottawa Sub-Markets
  {
    name: 'Downtown & Centretown',
    fullName: 'Downtown & Centretown, Ottawa',
    parentCity: 'Ottawa',
    metroName: 'National Capital Region',
    county: 'Ottawa',
    state: 'ON',
    type: 'neighborhood',
    tier: 2,
    lat: 45.4190,
    lon: -75.6980,
    fsaPrefixes: ['K1P', 'K2P', 'K1R']
  },
  {
    name: 'The Glebe & Old Ottawa',
    fullName: 'The Glebe & Old Ottawa South',
    parentCity: 'Ottawa',
    metroName: 'National Capital Region',
    county: 'Ottawa',
    state: 'ON',
    type: 'neighborhood',
    tier: 2,
    lat: 45.4020,
    lon: -75.6915,
    fsaPrefixes: ['K1S', 'K1N']
  },
  {
    name: 'Kanata & Stittsville',
    fullName: 'Kanata & Stittsville Tech Hub, Ottawa',
    parentCity: 'Ottawa',
    metroName: 'National Capital Region',
    county: 'Ottawa',
    state: 'ON',
    type: 'neighborhood',
    tier: 2,
    lat: 45.3088,
    lon: -75.9200,
    fsaPrefixes: ['K2K', 'K2L', 'K2M', 'K2T', 'K2S', 'K2V']
  },
  {
    name: 'Nepean & Barrhaven',
    fullName: 'Nepean & Barrhaven, Ottawa',
    parentCity: 'Ottawa',
    metroName: 'National Capital Region',
    county: 'Ottawa',
    state: 'ON',
    type: 'neighborhood',
    tier: 2,
    lat: 45.3349,
    lon: -75.7241,
    fsaPrefixes: ['K2G', 'K2H', 'K2J']
  },
  {
    name: 'Orléans',
    fullName: 'Orléans, Ottawa',
    parentCity: 'Ottawa',
    metroName: 'National Capital Region',
    county: 'Ottawa',
    state: 'ON',
    type: 'neighborhood',
    tier: 2,
    lat: 45.4744,
    lon: -75.5165,
    fsaPrefixes: ['K1C', 'K1E', 'K1W', 'K4A']
  },

  // =========================================================================
  // QUEBEC (QC) - Greater Montreal Arrondissements & Major Cities
  // =========================================================================
  {
    name: 'Ville-Marie',
    fullName: 'Ville-Marie (Centre-Ville / Downtown), Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.5088,
    lon: -73.5540,
    fsaPrefixes: ['H3B', 'H3A', 'H3G', 'H2Z', 'H2X', 'H3C']
  },
  {
    name: 'Le Plateau-Mont-Royal',
    fullName: 'Le Plateau-Mont-Royal Arrondissement, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.5225,
    lon: -73.5786,
    fsaPrefixes: ['H2W', 'H2T', 'H2J', 'H2H']
  },
  {
    name: 'Rosemont–La Petite-Patrie',
    fullName: 'Rosemont–La Petite-Patrie, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.5414,
    lon: -73.5977,
    fsaPrefixes: ['H2S', 'H2G', 'H1Y', 'H1X']
  },
  {
    name: 'Côte-des-Neiges–NDG',
    fullName: 'Côte-des-Neiges–Notre-Dame-de-Grâce, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.4899,
    lon: -73.6268,
    fsaPrefixes: ['H3W', 'H4A', 'H3V', 'H4B']
  },
  {
    name: 'Mercier–Hochelaga-Maisonneuve',
    fullName: 'Mercier–Hochelaga-Maisonneuve, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.5458,
    lon: -73.5283,
    fsaPrefixes: ['H1V', 'H1W', 'H1L', 'H1K']
  },
  {
    name: 'Villeray–Saint-Michel–Parc-Extension',
    fullName: 'Villeray–Saint-Michel–Parc-Extension, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.5539,
    lon: -73.6067,
    fsaPrefixes: ['H2A', 'H2E', 'H2R', 'H3N']
  },
  {
    name: 'Ahuntsic-Cartierville',
    fullName: 'Ahuntsic-Cartierville, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.5528,
    lon: -73.6708,
    fsaPrefixes: ['H2C', 'H2M', 'H2N', 'H3L', 'H4J']
  },
  {
    name: 'Saint-Laurent',
    fullName: 'Saint-Laurent Arrondissement, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.5088,
    lon: -73.6828,
    fsaPrefixes: ['H4L', 'H4M', 'H4N', 'H4R', 'H4S']
  },
  {
    name: 'Verdun & Le Sud-Ouest',
    fullName: 'Verdun, Saint-Henri & Le Sud-Ouest, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.4578,
    lon: -73.5714,
    fsaPrefixes: ['H4G', 'H4E', 'H3K', 'H3J', 'H4C']
  },
  {
    name: 'LaSalle',
    fullName: 'LaSalle Arrondissement, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.4314,
    lon: -73.6347,
    fsaPrefixes: ['H8N', 'H8P', 'H8R']
  },
  {
    name: 'Outremont & Westmount',
    fullName: 'Outremont & Westmount, Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'borough',
    tier: 2,
    lat: 45.5186,
    lon: -73.6067,
    fsaPrefixes: ['H2V', 'H3Y', 'H3Z']
  },
  {
    name: 'West Island',
    fullName: 'West Island (Pointe-Claire, DDO, Kirkland), Montréal',
    parentCity: 'Montreal',
    metroName: 'Greater Montreal',
    county: 'Montréal',
    state: 'QC',
    type: 'neighborhood',
    tier: 2,
    lat: 45.4500,
    lon: -73.8167,
    fsaPrefixes: ['H9A', 'H9B', 'H9C', 'H9G', 'H9H', 'H9J', 'H9K', 'H9R', 'H9S', 'H9W']
  },

  // =========================================================================
  // BRITISH COLUMBIA (BC) - Metro Vancouver & Regions
  // =========================================================================
  {
    name: 'Downtown Vancouver',
    fullName: 'Downtown Vancouver & Yaletown',
    parentCity: 'Vancouver',
    metroName: 'Metro Vancouver',
    county: 'Greater Vancouver',
    state: 'BC',
    type: 'neighborhood',
    tier: 2,
    lat: 49.2820,
    lon: -123.1171,
    fsaPrefixes: ['V6B', 'V6C', 'V6E', 'V6Z', 'V7X', 'V7Y']
  },
  {
    name: 'West End & Coal Harbour',
    fullName: 'West End & Coal Harbour, Vancouver',
    parentCity: 'Vancouver',
    metroName: 'Metro Vancouver',
    county: 'Greater Vancouver',
    state: 'BC',
    type: 'neighborhood',
    tier: 2,
    lat: 49.2878,
    lon: -123.1344,
    fsaPrefixes: ['V6G', 'V6E']
  },
  {
    name: 'Kitsilano & West Point Grey',
    fullName: 'Kitsilano & West Point Grey, Vancouver',
    parentCity: 'Vancouver',
    metroName: 'Metro Vancouver',
    county: 'Greater Vancouver',
    state: 'BC',
    type: 'neighborhood',
    tier: 2,
    lat: 49.2684,
    lon: -123.1683,
    fsaPrefixes: ['V6K', 'V6R', 'V6T']
  },
  {
    name: 'Mount Pleasant & Fairview',
    fullName: 'Mount Pleasant & Fairview, Vancouver',
    parentCity: 'Vancouver',
    metroName: 'Metro Vancouver',
    county: 'Greater Vancouver',
    state: 'BC',
    type: 'neighborhood',
    tier: 2,
    lat: 49.2631,
    lon: -123.1190,
    fsaPrefixes: ['V5T', 'V5Y', 'V5Z', 'V6H', 'V6J']
  },
  {
    name: 'East Vancouver',
    fullName: 'East Vancouver & Commercial Drive',
    parentCity: 'Vancouver',
    metroName: 'Metro Vancouver',
    county: 'Greater Vancouver',
    state: 'BC',
    type: 'neighborhood',
    tier: 2,
    lat: 49.2667,
    lon: -123.0694,
    fsaPrefixes: ['V5L', 'V5K', 'V5N', 'V5V', 'V5W']
  },
  {
    name: 'South Vancouver & Kerrisdale',
    fullName: 'South Vancouver, Kerrisdale & Marpole',
    parentCity: 'Vancouver',
    metroName: 'Metro Vancouver',
    county: 'Greater Vancouver',
    state: 'BC',
    type: 'neighborhood',
    tier: 2,
    lat: 49.2200,
    lon: -123.1400,
    fsaPrefixes: ['V6M', 'V6N', 'V6P', 'V5X', 'V5P', 'V5S']
  },

  // =========================================================================
  // ALBERTA (AB) - Calgary & Edmonton Sectors
  // =========================================================================
  {
    name: 'Downtown Calgary & Beltline',
    fullName: 'Downtown Calgary & Beltline',
    parentCity: 'Calgary',
    metroName: 'Calgary Region',
    county: 'Division No. 6',
    state: 'AB',
    type: 'neighborhood',
    tier: 2,
    lat: 51.0447,
    lon: -114.0719,
    fsaPrefixes: ['T2P', 'T2R', 'T2G']
  },
  {
    name: 'Northwest Calgary (NW)',
    fullName: 'Northwest Calgary (Kensington, University, Crowfoot)',
    parentCity: 'Calgary',
    metroName: 'Calgary Region',
    county: 'Division No. 6',
    state: 'AB',
    type: 'borough',
    tier: 2,
    lat: 51.0850,
    lon: -114.1350,
    fsaPrefixes: ['T2N', 'T2M', 'T2K', 'T2L', 'T3A', 'T3B', 'T3G', 'T3K', 'T3L', 'T3R']
  },
  {
    name: 'Southwest Calgary (SW)',
    fullName: 'Southwest Calgary (Mount Royal, Marda Loop, Signal Hill)',
    parentCity: 'Calgary',
    metroName: 'Calgary Region',
    county: 'Division No. 6',
    state: 'AB',
    type: 'borough',
    tier: 2,
    lat: 50.9850,
    lon: -114.1100,
    fsaPrefixes: ['T2S', 'T2T', 'T2V', 'T2W', 'T2Y', 'T3E', 'T3H', 'T3S']
  },
  {
    name: 'Northeast Calgary (NE)',
    fullName: 'Northeast Calgary (Airport, Saddletowne, Marlborough)',
    parentCity: 'Calgary',
    metroName: 'Calgary Region',
    county: 'Division No. 6',
    state: 'AB',
    type: 'borough',
    tier: 2,
    lat: 51.1000,
    lon: -113.9800,
    fsaPrefixes: ['T1Y', 'T2A', 'T2E', 'T3J', 'T3N', 'T3P']
  },
  {
    name: 'Southeast Calgary (SE)',
    fullName: 'Southeast Calgary (Inglewood, Quarry Park, McKenzie Towne)',
    parentCity: 'Calgary',
    metroName: 'Calgary Region',
    county: 'Division No. 6',
    state: 'AB',
    type: 'borough',
    tier: 2,
    lat: 50.9400,
    lon: -113.9700,
    fsaPrefixes: ['T2B', 'T2C', 'T2H', 'T2J', 'T2Z', 'T3M']
  },
  {
    name: 'Downtown & Central Edmonton',
    fullName: 'Downtown & Central Edmonton',
    parentCity: 'Edmonton',
    metroName: 'Edmonton Capital Region',
    county: 'Division No. 11',
    state: 'AB',
    type: 'neighborhood',
    tier: 2,
    lat: 53.5461,
    lon: -113.4938,
    fsaPrefixes: ['T5J', 'T5K', 'T5H', 'T5B']
  },
  {
    name: 'Strathcona & University Core',
    fullName: 'Strathcona & University Core, Edmonton',
    parentCity: 'Edmonton',
    metroName: 'Edmonton Capital Region',
    county: 'Division No. 11',
    state: 'AB',
    type: 'neighborhood',
    tier: 2,
    lat: 53.5181,
    lon: -113.4988,
    fsaPrefixes: ['T6E', 'T6G', 'T6C']
  },
  {
    name: 'West Edmonton',
    fullName: 'West Edmonton (Mall & Callingwood)',
    parentCity: 'Edmonton',
    metroName: 'Edmonton Capital Region',
    county: 'Division No. 11',
    state: 'AB',
    type: 'neighborhood',
    tier: 2,
    lat: 53.5225,
    lon: -113.6242,
    fsaPrefixes: ['T5R', 'T5S', 'T5T']
  },
  {
    name: 'South Edmonton',
    fullName: 'South Edmonton & Windermere',
    parentCity: 'Edmonton',
    metroName: 'Edmonton Capital Region',
    county: 'Division No. 11',
    state: 'AB',
    type: 'neighborhood',
    tier: 2,
    lat: 53.4400,
    lon: -113.5000,
    fsaPrefixes: ['T6H', 'T6J', 'T6K', 'T6L', 'T6W', 'T6X']
  },
  {
    name: 'North Edmonton',
    fullName: 'North Edmonton & Castle Downs',
    parentCity: 'Edmonton',
    metroName: 'Edmonton Capital Region',
    county: 'Division No. 11',
    state: 'AB',
    type: 'neighborhood',
    tier: 2,
    lat: 53.5900,
    lon: -113.5100,
    fsaPrefixes: ['T5C', 'T5E', 'T5G', 'T5L', 'T5M', 'T5N', 'T5P', 'T5V', 'T5W', 'T5X', 'T5Y', 'T5Z']
  }
];

// Definition of Major Canadian Cities with True Primary FSA Allocations
const MAJOR_CITIES_FSA_ALLOCATION = {
  // Ontario
  'Toronto': (z) => z.zip.startsWith('M'),
  'Ottawa': (z) => z.zip.startsWith('K1') || z.zip.startsWith('K2') || ['K4A','K4B','K4C','K4M','K4P'].includes(z.zip),
  'Mississauga': (z) => ['L4T','L4V','L4W','L4X','L4Y','L4Z','L5A','L5B','L5C','L5E','L5G','L5H','L5J','L5K','L5L','L5M','L5N','L5R','L5V','L5W'].includes(z.zip),
  'Brampton': (z) => ['L6P','L6R','L6S','L6T','L6V','L6W','L6X','L6Y','L6Z','L7A'].includes(z.zip),
  'Hamilton': (z) => ['L8E','L8G','L8H','L8J','L8K','L8L','L8M','L8N','L8P','L8R','L8S','L8T','L8V','L8W','L9A','L9B','L9C','L9G','L9H','L9K'].includes(z.zip),
  'London': (z) => ['N5V','N5W','N5X','N5Y','N5Z','N6A','N6B','N6C','N6E','N6G','N6H','N6J','N6K','N6L','N6M','N6N','N6P'].includes(z.zip),
  'Markham': (z) => ['L3P','L3R','L3S','L3T','L6B','L6C','L6E','L6G'].includes(z.zip),
  'Vaughan': (z) => ['L4H','L4J','L4K','L4L','L6A'].includes(z.zip),
  'Kitchener': (z) => ['N2A','N2B','N2C','N2E','N2G','N2H','N2K','N2M','N2N','N2P','N2R'].includes(z.zip),
  'Waterloo': (z) => ['N2J','N2L','N2T','N2V'].includes(z.zip),
  'Cambridge': (z) => ['N1P','N1R','N1S','N1T','N3C','N3E','N3H'].includes(z.zip),
  'Windsor': (z) => ['N8N','N8P','N8R','N8S','N8T','N8W','N8X','N8Y','N9A','N9B','N9C','N9E','N9G','N9J','N9K'].includes(z.zip),
  'Richmond Hill': (z) => ['L4B','L4C','L4E','L4S'].includes(z.zip),
  'Oakville': (z) => ['L6H','L6J','L6K','L6L','L6M'].includes(z.zip),
  'Burlington': (z) => ['L7L','L7M','L7N','L7P','L7R','L7S','L7T'].includes(z.zip),
  'Oshawa': (z) => ['L1G','L1H','L1J','L1K','L1L'].includes(z.zip),
  'Barrie': (z) => ['L4M','L4N','L9X'].includes(z.zip),
  'Guelph': (z) => ['N1C','N1E','N1G','N1H','N1K','N1L'].includes(z.zip),
  'Kingston': (z) => ['K7K','K7L','K7M','K7P'].includes(z.zip),
  'Sudbury': (z) => ['P3A','P3B','P3C','P3E','P3G','P3L','P3N','P3P','P3Y'].includes(z.zip),
  'Thunder Bay': (z) => ['P7A','P7B','P7C','P7E','P7G','P7J','P7K'].includes(z.zip),
  'Niagara Falls': (z) => ['L2E','L2G','L2H','L2J'].includes(z.zip),
  'St. Catharines': (z) => ['L2M','L2N','L2P','L2R','L2S','L2T','L2V','L2W'].includes(z.zip),

  // Quebec
  'Montreal': (z) => z.zip.startsWith('H') && z.zip !== 'H0H' && !z.zip.startsWith('H7'),
  'Laval': (z) => z.zip.startsWith('H7'),
  'Longueuil': (z) => ['J4B','J4G','J4H','J4J','J4K','J4L','J4M','J4N','J4P','J4R','J4S','J4T','J4V','J4W','J4X','J4Y','J4Z'].includes(z.zip),
  'Quebec City': (z) => z.zip.startsWith('G1') || z.zip.startsWith('G2') || ['G3E','G3G','G3K'].includes(z.zip),
  'Gatineau': (z) => ['J8P','J8R','J8T','J8V','J8X','J8Y','J8Z','J9A','J9H','J9J'].includes(z.zip),
  'Sherbrooke': (z) => ['J1C','J1E','J1G','J1H','J1J','J1K','J1L','J1M','J1N','J1R'].includes(z.zip),
  'Trois-Rivières': (z) => ['G8T','G8V','G8W','G8Y','G8Z','G9A','G9B','G9C'].includes(z.zip),
  'Lévis': (z) => ['G6V','G6W','G6X','G6Y','G6Z','G7A'].includes(z.zip),
  'Saguenay': (z) => ['G7B','G7G','G7H','G7J','G7K','G7N','G7P','G7S','G7T','G7X','G7Y','G7Z'].includes(z.zip),

  // British Columbia
  'Vancouver': (z) => ['V5K','V5L','V5M','V5N','V5P','V5R','V5S','V5T','V5V','V5W','V5X','V5Y','V5Z','V6A','V6B','V6C','V6E','V6G','V6H','V6J','V6K','V6L','V6M','V6N','V6P','V6R','V6S','V6T','V6Z','V7X','V7Y'].includes(z.zip),
  'Burnaby': (z) => ['V5A','V5B','V5C','V5E','V5G','V5H','V5J'].includes(z.zip),
  'Richmond': (z) => ['V6V','V6W','V6X','V6Y','V7A','V7B','V7C','V7E'].includes(z.zip),
  'Surrey': (z) => ['V3R','V3S','V3T','V3V','V3W','V3X','V3Z','V4A','V4N','V4P'].includes(z.zip),
  'Coquitlam': (z) => ['V3B','V3C','V3E','V3J'].includes(z.zip),
  'North Vancouver': (z) => ['V7G','V7H','V7J','V7K','V7L','V7M','V7N','V7P','V7R'].includes(z.zip),
  'West Vancouver': (z) => ['V7S','V7T','V7V','V7W'].includes(z.zip),
  'Victoria': (z) => ['V8N','V8P','V8R','V8S','V8T','V8V','V8W','V8X','V8Y','V8Z','V9A','V9B','V9C','V9E'].includes(z.zip),
  'Kelowna': (z) => ['V1P','V1V','V1W','V1X','V1Y','V1Z'].includes(z.zip),
  'Abbotsford': (z) => ['V2S','V2T','V3G','V4X'].includes(z.zip),
  'Kamloops': (z) => ['V1S','V2B','V2C','V2E'].includes(z.zip),
  'Nanaimo': (z) => ['V9R','V9S','V9T','V9V'].includes(z.zip),
  'Prince George': (z) => ['V2K','V2L','V2M','V2N'].includes(z.zip),

  // Alberta
  'Calgary': (z) => ['T1Y','T2A','T2B','T2C','T2E','T2G','T2H','T2J','T2K','T2L','T2M','T2N','T2P','T2R','T2S','T2T','T2V','T2W','T2X','T2Y','T2Z','T3A','T3B','T3C','T3E','T3G','T3H','T3J','T3K','T3L','T3M','T3N','T3P','T3R','T3S'].includes(z.zip),
  'Edmonton': (z) => ['T5A','T5B','T5C','T5E','T5G','T5H','T5J','T5K','T5L','T5M','T5N','T5P','T5R','T5S','T5T','T5V','T5W','T5X','T5Y','T5Z','T6A','T6B','T6C','T6E','T6G','T6H','T6J','T6K','T6L','T6M','T6N','T6P','T6R','T6S','T6T','T6V','T6W','T6X'].includes(z.zip),
  'Red Deer': (z) => ['T4N','T4P','T4R'].includes(z.zip),
  'Lethbridge': (z) => ['T1H','T1J','T1K'].includes(z.zip),
  'Medicine Hat': (z) => ['T1A','T1B','T1C'].includes(z.zip),
  'Grande Prairie': (z) => ['T8V','T8W','T8X'].includes(z.zip),
  'Fort McMurray': (z) => ['T9H','T9J','T9K'].includes(z.zip),
  'Airdrie': (z) => ['T4A','T4B'].includes(z.zip),
  'St. Albert': (z) => ['T8N'].includes(z.zip),

  // Manitoba
  'Winnipeg': (z) => z.zip.startsWith('R2') || z.zip.startsWith('R3'),
  'Brandon': (z) => ['R7A','R7B','R7C'].includes(z.zip),

  // Saskatchewan
  'Saskatoon': (z) => z.zip.startsWith('S7'),
  'Regina': (z) => z.zip.startsWith('S4'),

  // Nova Scotia
  'Halifax': (z) => z.zip.startsWith('B3') || z.zip.startsWith('B4'),
  'Sydney': (z) => ['B1P','B1R','B1S'].includes(z.zip),

  // New Brunswick
  'Moncton': (z) => ['E1A','E1C','E1E','E1G'].includes(z.zip),
  'Saint John': (z) => ['E2J','E2K','E2L','E2M','E2N','E2P'].includes(z.zip),
  'Fredericton': (z) => ['E3A','E3B','E3C','E3E','E3G'].includes(z.zip),

  // Newfoundland and Labrador
  "St. John's": (z) => ['A1A','A1B','A1C','A1E','A1G','A1H','A1N','A1S'].includes(z.zip),

  // Prince Edward Island
  'Charlottetown': (z) => ['C1A','C1C','C1E'].includes(z.zip),

  // Territories
  'Yellowknife': (z) => ['X1A'].includes(z.zip),
  'Whitehorse': (z) => ['Y1A'].includes(z.zip),
  'Iqaluit': (z) => ['X0A'].includes(z.zip)
};

async function main() {
  console.log('🍁 Starting Canada Metropolitan & Neighborhood Targeting Pipeline...');

  const provDir = path.join(__dirname, '..', 'data', 'canada', 'provinces');
  const provFiles = fs.readdirSync(provDir).filter(f => f.endsWith('.json')).sort();

  let totalBoroughsAdded = 0;
  let totalCitiesRefined = 0;
  const masterSearchIndex = [];

  // Read provinces master list
  const provMasterPath = path.join(__dirname, '..', 'data', 'canada', 'provinces.json');
  const provincesMaster = JSON.parse(fs.readFileSync(provMasterPath, 'utf8'));

  // 1. Add provinces to master search index
  for (const p of provincesMaster) {
    masterSearchIndex.push({
      type: 'state',
      id: p.abbr,
      name: `${p.name} (${p.abbr})`,
      abbr: p.abbr,
      capital: p.capital,
      center: p.center,
      bounds: p.bounds
    });
  }

  for (const pf of provFiles) {
    const abbr = pf.replace('.json', '');
    const provPath = path.join(provDir, pf);
    const provData = JSON.parse(fs.readFileSync(provPath, 'utf8'));

    const zipcodes = provData.zipcodes || [];
    const zipMap = new Map();
    zipcodes.forEach(z => zipMap.set(z.zip, z));

    // A. Refine existing cities with accurate FSA allocations & bounds
    const existingCities = provData.cities || [];
    const refinedCities = [];

    for (const city of existingCities) {
      const cName = city.name;
      const allocator = MAJOR_CITIES_FSA_ALLOCATION[cName];
      let memberZips = [];

      if (allocator) {
        memberZips = zipcodes.filter(allocator);
      } else {
        // Fallback: match by city field in FSA
        memberZips = zipcodes.filter(z =>
          z.city && z.city.toLowerCase() === cName.toLowerCase()
        );
      }

      if (memberZips.length === 0) {
        memberZips = zipcodes.filter(z =>
          z.city && z.city.toLowerCase().includes(cName.toLowerCase())
        );
      }

      let stitchedPath = '';
      let b = city.bounds;
      if (memberZips.length > 0) {
        stitchedPath = memberZips.map(z => z.path).join(' ');
        const minX = Math.min(...memberZips.map(z => z.bounds[0]));
        const minY = Math.min(...memberZips.map(z => z.bounds[1]));
        const maxX = Math.max(...memberZips.map(z => z.bounds[0] + z.bounds[2]));
        const maxY = Math.max(...memberZips.map(z => z.bounds[1] + z.bounds[3]));
        b = [
          round(minX),
          round(minY),
          round(Math.max(0.5, maxX - minX)),
          round(Math.max(0.5, maxY - minY))
        ];
      }

      const slug = cName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-|-$/g, '');
      const cityId = `${abbr}-${slug}`;
      const center = memberZips.length > 0 ? [round(b[0] + b[2] / 2), round(b[1] + b[3] / 2)] : city.center;

      refinedCities.push({
        id: cityId,
        name: cName,
        cityName: cName,
        fullName: `${cName}, ${abbr}`,
        state: abbr,
        county: city.county || '',
        metroName: (cName === 'Toronto' || cName === 'Mississauga' || cName === 'Brampton' || cName === 'Vaughan' || cName === 'Markham' || cName === 'Richmond Hill' || cName === 'Oakville' || cName === 'Burlington') ? 'Greater Toronto Area' :
                   (cName === 'Montreal' || cName === 'Laval' || cName === 'Longueuil') ? 'Greater Montreal' :
                   (cName === 'Vancouver' || cName === 'Burnaby' || cName === 'Richmond' || cName === 'Surrey' || cName === 'Coquitlam') ? 'Metro Vancouver' :
                   (cName === 'Calgary') ? 'Calgary Region' :
                   (cName === 'Edmonton') ? 'Edmonton Capital Region' :
                   (cName === 'Ottawa') ? 'National Capital Region' : '',
        isCapital: !!city.isCapital,
        isFedCapital: !!city.isFedCapital,
        pop: city.pop,
        lat: city.lat,
        lon: city.lon,
        x: center ? center[0] : city.x,
        y: center ? center[1] : city.y,
        center: center,
        bounds: b,
        stitchedPath: stitchedPath,
        zipCount: memberZips.length || 1,
        zips: memberZips.map(z => z.zip),
        tier: 1
      });

      totalCitiesRefined++;
    }

    // B. Ingest Canadian Boroughs & Sub-Markets
    const provSubregions = CANADA_SUBREGIONS.filter(s => s.state === abbr);
    const subregionsList = [];

    for (const sub of provSubregions) {
      // Find matching FSAs
      const matchingFsas = zipcodes.filter(z => sub.fsaPrefixes.includes(z.zip));
      if (matchingFsas.length === 0) continue;

      const minX = Math.min(...matchingFsas.map(z => z.bounds[0]));
      const minY = Math.min(...matchingFsas.map(z => z.bounds[1]));
      const maxX = Math.max(...matchingFsas.map(z => z.bounds[0] + z.bounds[2]));
      const maxY = Math.max(...matchingFsas.map(z => z.bounds[1] + z.bounds[3]));
      const w = round(Math.max(0.4, maxX - minX));
      const h = round(Math.max(0.4, maxY - minY));
      const center = [round(minX + w / 2), round(minY + h / 2)];

      const stitchedPath = matchingFsas.map(z => z.path).join(' ');
      const slug = sub.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-|-$/g, '');
      const subId = `${abbr}-${sub.parentCity.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${slug}`;

      const subObj = {
        id: subId,
        name: sub.name,
        cityName: sub.name,
        fullName: sub.fullName,
        type: sub.type,
        tier: 2,
        parentCity: sub.parentCity,
        metroName: sub.metroName,
        county: sub.county,
        state: abbr,
        lat: sub.lat,
        lon: sub.lon,
        x: center[0],
        y: center[1],
        center: center,
        bounds: [round(minX), round(minY), w, h],
        path: stitchedPath,
        stitchedPath: stitchedPath,
        zips: matchingFsas.map(z => z.zip).sort(),
        zipCount: matchingFsas.length
      };

      subregionsList.push(subObj);

      // Also register in refinedCities so zoomToCity works seamlessly across all levels
      const existingIdx = refinedCities.findIndex(c => c.id === subId || c.name === sub.name);
      if (existingIdx >= 0) {
        refinedCities[existingIdx] = subObj;
      } else {
        refinedCities.push(subObj);
      }

      totalBoroughsAdded++;
    }

    // Save updated province file
    provData.cities = refinedCities;
    provData.citiesCount = refinedCities.length;
    provData.subregions = subregionsList;
    provData.subregionsCount = subregionsList.length;

    fs.writeFileSync(provPath, JSON.stringify(provData, null, 2), 'utf8');

    // Index all items for search-index.json
    (provData.counties || []).forEach(c => {
      masterSearchIndex.push({
        type: 'county',
        id: c.id,
        countyName: c.name,
        name: `${c.name} (Census Division), ${abbr}`,
        state: abbr,
        bounds: c.bounds
      });
    });

    (provData.districts || []).forEach(d => {
      masterSearchIndex.push({
        type: 'district',
        id: d.id,
        shortName: d.shortName,
        name: `${d.name} (${abbr} Riding)`,
        state: abbr,
        zipCount: d.zipCount,
        zips: d.zips,
        counties: d.counties,
        bounds: d.bounds
      });
    });

    (provData.cities || []).forEach(c => {
      masterSearchIndex.push({
        type: c.type || 'city',
        id: c.id,
        name: `${c.name}, ${abbr}`,
        fullName: c.fullName || `${c.name}, ${abbr}`,
        cityName: c.name,
        state: abbr,
        county: c.county || '',
        parentCity: c.parentCity || '',
        metroName: c.metroName || '',
        isCapital: !!c.isCapital,
        isFedCapital: !!c.isFedCapital,
        zipCount: c.zipCount,
        zips: c.zips,
        bounds: c.bounds,
        center: c.center,
        tier: c.tier || 1
      });
    });

    (provData.zipcodes || []).forEach(z => {
      masterSearchIndex.push({
        type: 'zip',
        id: z.zip,
        name: `FSA ${z.zip} - ${z.city || 'Area'}, ${abbr}`,
        zip: z.zip,
        city: z.city || '',
        county: z.county || '',
        state: abbr,
        lat: z.lat,
        lon: z.lon,
        x: z.center[0],
        y: z.center[1],
        bounds: z.bounds
      });
    });

    console.log(`✓ Processed ${abbr}: ${refinedCities.length} cities/boroughs, ${subregionsList.length} subregions, ${zipcodes.length} FSAs`);
  }

  // Update provinces.json with new counts
  for (const p of provincesMaster) {
    const pf = path.join(provDir, `${p.abbr}.json`);
    if (fs.existsSync(pf)) {
      const data = JSON.parse(fs.readFileSync(pf, 'utf8'));
      p.citiesCount = data.citiesCount || data.cities?.length || 0;
      p.subregionsCount = data.subregionsCount || data.subregions?.length || 0;
      p.countiesCount = data.countiesCount || data.counties?.length || 0;
      p.districtsCount = data.districtsCount || data.districts?.length || 0;
      p.zipCodesCount = data.zipCodesCount || data.zipcodes?.length || 0;
    }
  }
  fs.writeFileSync(provMasterPath, JSON.stringify(provincesMaster, null, 2), 'utf8');

  // Write master search index
  const searchIndexPath = path.join(__dirname, '..', 'data', 'canada', 'search-index.json');
  fs.writeFileSync(searchIndexPath, JSON.stringify(masterSearchIndex), 'utf8');

  // Re-build dist/canada-all-data.js bundle
  console.log('📦 Rebuilding dist/canada-all-data.js bundle...');
  const canadaBundle = {
    provinces: provincesMaster,
    searchIndex: masterSearchIndex,
    provinceData: {}
  };
  for (const pf of provFiles) {
    const abbr = pf.replace('.json', '');
    canadaBundle.provinceData[abbr] = JSON.parse(fs.readFileSync(path.join(provDir, pf), 'utf8'));
  }
  const jsContent = `window.__CANADA_MAP_DATA__ = ${JSON.stringify(canadaBundle)};\n`;
  fs.writeFileSync(path.join(__dirname, '..', 'dist', 'canada-all-data.js'), jsContent, 'utf8');
  console.log(`✓ Rebuilt dist/canada-all-data.js (${(Buffer.byteLength(jsContent) / (1024 * 1024)).toFixed(2)} MB)`);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`✓ Successfully cataloged ${totalCitiesRefined} Canadian cities with accurate FSAs`);
  console.log(`✓ Added ${totalBoroughsAdded} Canadian Boroughs & Sub-Markets with stitched boundaries`);
  console.log(`✓ Re-indexed ${masterSearchIndex.length.toLocaleString()} Canadian searchable entities`);
  console.log('═══════════════════════════════════════════════════════════');
}

main().catch(err => {
  console.error('❌ Canada pipeline failed:', err);
  process.exit(1);
});
