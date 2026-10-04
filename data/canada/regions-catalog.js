/**
 * Master Catalog of Canadian Geographic, Advertising & Metropolitan Regions
 * Covers Macro-Regions (Tier 1) across ALL 10 Provinces & 3 Territories.
 *
 * Each region is defined by its constituent Statistics Canada Census Divisions (CDs) so that:
 * 1. Vector geometry is stitched directly from official cartographic Census Division boundaries
 * 2. Internal lines are dissolved using TopoJSON merge to produce 100% exact Google Maps outlines
 * 3. Exact bounding box and center are automatically computed
 * 4. All member Postal FSAs and cities are aggregated for direct ad targeting export (Meta, Google, Thumbtack)
 */

const CANADA_REGIONS = [
  {
    "id": "ON-greater-toronto-area",
    "name": "Greater Toronto Area",
    "fullName": "Greater Toronto Area (GTA)",
    "province": "ON",
    "tier": 1,
    "desc": "Canada's primary financial and corporate headquarters capital, encompassing Toronto, Peel, York, Durham, and Halton.",
    "googleUrl": "https://www.google.com/maps/place/Greater+Toronto+Area,+ON,+Canada",
    "censusDivisions": [
      "Toronto",
      "Peel",
      "York",
      "Durham",
      "Halton"
    ]
  },
  {
    "id": "ON-golden-horseshoe",
    "name": "Golden Horseshoe",
    "fullName": "Golden Horseshoe (Lake Ontario Urban Arc)",
    "province": "ON",
    "tier": 1,
    "desc": "Densely populated industrial and consumer arc wrapping Lake Ontario from Niagara to Durham.",
    "googleUrl": "https://www.google.com/maps/place/Golden+Horseshoe,+ON,+Canada",
    "censusDivisions": [
      "Toronto",
      "Peel",
      "York",
      "Durham",
      "Halton",
      "Hamilton",
      "Niagara",
      "Waterloo",
      "Wellington",
      "Brant",
      "Haldimand-Norfolk"
    ]
  },
  {
    "id": "ON-southwestern-ontario",
    "name": "Southwestern Ontario",
    "fullName": "Southwestern Ontario (London, Windsor & Agri-Industrial Belt)",
    "province": "ON",
    "tier": 1,
    "desc": "Automotive manufacturing, agricultural heartland, and Great Lakes border crossings.",
    "googleUrl": "https://www.google.com/maps/place/Southwestern+Ontario,+ON,+Canada",
    "censusDivisions": [
      "Middlesex",
      "Essex",
      "Lambton",
      "Chatham-Kent",
      "Elgin",
      "Oxford",
      "Huron",
      "Perth",
      "Bruce",
      "Grey"
    ]
  },
  {
    "id": "ON-eastern-ontario-national-capital",
    "name": "Eastern Ontario",
    "fullName": "Eastern Ontario & National Capital Region (Ottawa)",
    "province": "ON",
    "tier": 1,
    "desc": "National capital Ottawa, federal government institutions, high-tech defense corridor, and St. Lawrence Seaway.",
    "googleUrl": "https://www.google.com/maps/place/Eastern+Ontario,+ON,+Canada",
    "censusDivisions": [
      "Ottawa",
      "Prescott and Russell",
      "Stormont, Dundas and Glengarry",
      "Leeds and Grenville",
      "Lanark",
      "Renfrew",
      "Frontenac",
      "Lennox and Addington",
      "Hastings",
      "Prince Edward"
    ]
  },
  {
    "id": "ON-central-ontario-cottage-country",
    "name": "Central Ontario",
    "fullName": "Central Ontario & Cottage Country (Simcoe, Muskoka, Kawarthas)",
    "province": "ON",
    "tier": 1,
    "desc": "Lake Simcoe, Georgian Bay, Muskoka lakes, and Kawartha Lakes resort vacationland.",
    "censusDivisions": [
      "Simcoe",
      "Kawartha Lakes",
      "Peterborough",
      "Northumberland",
      "Dufferin",
      "Muskoka",
      "Haliburton"
    ]
  },
  {
    "id": "ON-northern-ontario",
    "name": "Northern Ontario",
    "fullName": "Northern Ontario (Sudbury, Thunder Bay & Minerals Corridor)",
    "province": "ON",
    "tier": 1,
    "desc": "Rich mineral wealth (Ring of Fire, Sudbury Basin nickel/copper), forestry, and Lake Superior port Thunder Bay.",
    "censusDivisions": [
      "Greater Sudbury",
      "Sudbury",
      "Manitoulin",
      "Algoma",
      "Cochrane",
      "Timiskaming",
      "Nipissing",
      "Thunder Bay",
      "Rainy River",
      "Kenora"
    ]
  },
  {
    "id": "QC-greater-montreal",
    "name": "Greater Montreal",
    "fullName": "Greater Montreal (Grand Montr\u00e9al / Communaut\u00e9 m\u00e9tropolitaine de Montr\u00e9al)",
    "province": "QC",
    "tier": 1,
    "desc": "Global AI, aerospace (Bombardier, CAE), video game development, cultural capital, and bilingual metropolis.",
    "googleUrl": "https://www.google.com/maps/place/Greater+Montreal,+QC,+Canada",
    "censusDivisions": [
      "Montr\u00e9al",
      "Laval",
      "Longueuil",
      "Roussillon",
      "Th\u00e9r\u00e8se-De Blainville",
      "Deux-Montagnes",
      "Mirabel",
      "La Vall\u00e9e-du-Richelieu",
      "Vaudreuil-Soulanges"
    ]
  },
  {
    "id": "QC-capitale-nationale",
    "name": "Capitale-Nationale",
    "fullName": "Capitale-Nationale (Quebec City Metropolitan Area)",
    "province": "QC",
    "tier": 1,
    "desc": "Historic UNESCO World Heritage fortified city, provincial parliament, optics/photonics tech, and insurance center.",
    "googleUrl": "https://www.google.com/maps/place/Capitale-Nationale,+QC,+Canada",
    "censusDivisions": [
      "Qu\u00e9bec",
      "L\u00e9vis",
      "La Jacques-Cartier",
      "L'\u00cele-d'Orl\u00e9ans",
      "La C\u00f4te-de-Beaupr\u00e9",
      "Portneuf",
      "Charlevoix",
      "Charlevoix-Est"
    ]
  },
  {
    "id": "QC-laurentides-lanaudiere",
    "name": "Laurentides & Lanaudi\u00e8re",
    "fullName": "Laurentides & Lanaudi\u00e8re Resort Regions",
    "province": "QC",
    "tier": 1,
    "desc": "Mont Tremblant alpine ski resort, Laurentian mountains, and northern metropolitan recreational escape.",
    "censusDivisions": [
      "Les Laurentides",
      "Les Pays-d'en-Haut",
      "Antoine-Labelle",
      "Les Moulins",
      "D'Autray",
      "Joliette",
      "Matawinie",
      "Montcalm",
      "Argenteuil"
    ]
  },
  {
    "id": "QC-estrie-eastern-townships",
    "name": "Estrie",
    "fullName": "Estrie (Eastern Townships / Cantons-de-l'Est)",
    "province": "QC",
    "tier": 1,
    "desc": "Sherbrooke university and health hub, Lake Memphremagog, picturesque wine route, and Appalachian border mountains.",
    "censusDivisions": [
      "Sherbrooke",
      "Memphr\u00e9magog",
      "Coaticook",
      "Le Val-Saint-Fran\u00e7ois",
      "Les Sources",
      "Le Haut-Saint-Fran\u00e7ois",
      "Brome-Missisquoi",
      "La Haute-Yamaska"
    ]
  },
  {
    "id": "QC-outaouais-gatineau",
    "name": "Outaouais",
    "fullName": "Outaouais (Gatineau / National Capital Region)",
    "province": "QC",
    "tier": 1,
    "desc": "Federal government complex in Gatineau, Gatineau Park wilderness, and Ottawa River bilingual corridor.",
    "censusDivisions": [
      "Gatineau",
      "Les Collines-de-l'Outaouais",
      "Papineau",
      "La Vall\u00e9e-de-la-Gatineau",
      "Pontiac"
    ]
  },
  {
    "id": "QC-saguenay-lac-saint-jean",
    "name": "Saguenay\u2013Lac-Saint-Jean",
    "fullName": "Saguenay\u2013Lac-Saint-Jean (Aluminum Valley & Fjord)",
    "province": "QC",
    "tier": 1,
    "desc": "Hydroelectric energy, Rio Tinto aluminum smelting, scenic Saguenay Fjord, and Lac Saint-Jean blueberries and tourism.",
    "censusDivisions": [
      "Le Saguenay-et-son-Fjord",
      "Lac-Saint-Jean-Est",
      "Le Domaine-du-Roy",
      "Maria-Chapdelaine"
    ]
  },
  {
    "id": "BC-metro-vancouver-lower-mainland",
    "name": "Metro Vancouver & Lower Mainland",
    "fullName": "Metro Vancouver & Lower Mainland Economic Hub",
    "province": "BC",
    "tier": 1,
    "desc": "Port of Vancouver (Canada's largest port), film production (Hollywood North), clean tech, finance, and Burrard Inlet.",
    "googleUrl": "https://www.google.com/maps/place/Metro+Vancouver,+BC,+Canada",
    "censusDivisions": [
      "Greater Vancouver",
      "Fraser Valley",
      "Squamish-Lillooet"
    ]
  },
  {
    "id": "BC-vancouver-island-coast",
    "name": "Vancouver Island & Coast",
    "fullName": "Vancouver Island & Coastal Archipelago",
    "province": "BC",
    "tier": 1,
    "desc": "Provincial capital Victoria, tech sector, tourism, maritime defense (CFB Esquimalt), and Tofino Pacific Rim.",
    "censusDivisions": [
      "Capital",
      "Cowichan Valley",
      "Nanaimo",
      "Comox Valley",
      "Strathcona",
      "Alberni-Clayoquot",
      "Powell River",
      "Mount Waddington",
      "Central Coast"
    ]
  },
  {
    "id": "BC-okanagan-interior",
    "name": "Okanagan Valley & Thompson",
    "fullName": "Okanagan Valley & Thompson-Nicola Interior",
    "province": "BC",
    "tier": 1,
    "desc": "Canada's premier wine country, Kelowna tech hub, Okanagan Lake resorts, and Kamloops transportation center.",
    "censusDivisions": [
      "Central Okanagan",
      "North Okanagan",
      "Okanagan-Similkameen",
      "Thompson-Nicola",
      "Columbia-Shuswap"
    ]
  },
  {
    "id": "BC-kootenays",
    "name": "The Kootenays",
    "fullName": "The Kootenays (Rocky Mountain & Columbia Basin)",
    "province": "BC",
    "tier": 1,
    "desc": "Steep mountain terrain, Teck mining in Trail/Elk Valley, powder skiing in Nelson/Fernie/Revelstoke.",
    "censusDivisions": [
      "East Kootenay",
      "Central Kootenay",
      "Kootenay Boundary"
    ]
  },
  {
    "id": "BC-northern-bc-peace-river",
    "name": "Northern British Columbia",
    "fullName": "Northern BC (Prince George, Peace River & LNG Coast)",
    "province": "BC",
    "tier": 1,
    "desc": "Prince George supply hub, Kitimat LNG Canada export terminal, Port of Prince Rupert, and Peace River energy.",
    "censusDivisions": [
      "Cariboo",
      "Fraser-Fort George",
      "Bulkley-Nechako",
      "Peace River",
      "Kitimat-Stikine",
      "Northern Rockies",
      "Stikine"
    ]
  },
  {
    "id": "AB-calgary-metropolitan-region",
    "name": "Calgary Metropolitan Region",
    "fullName": "Calgary Metropolitan Region (Energy & Innovation Hub)",
    "province": "AB",
    "tier": 1,
    "desc": "Global energy headquarters, tech ecosystem, Bow River valley, and gateway to Banff and the Canadian Rockies.",
    "googleUrl": "https://www.google.com/maps/place/Calgary,+AB,+Canada",
    "censusDivisions": [
      "Division No.  6",
      "Division No. 6"
    ]
  },
  {
    "id": "AB-edmonton-capital-region",
    "name": "Edmonton Capital Region",
    "fullName": "Edmonton Metropolitan Region (Provincial Capital)",
    "province": "AB",
    "tier": 1,
    "desc": "Provincial capital, AI research (Amii), University of Alberta, manufacturing, and North Saskatchewan River valley.",
    "googleUrl": "https://www.google.com/maps/place/Edmonton,+AB,+Canada",
    "censusDivisions": [
      "Division No. 11"
    ]
  },
  {
    "id": "AB-central-alberta-red-deer",
    "name": "Central Alberta",
    "fullName": "Central Alberta (Red Deer Industrial Corridor)",
    "province": "AB",
    "tier": 1,
    "desc": "The bustling economic corridor connecting Calgary and Edmonton along Queen Elizabeth II Highway.",
    "censusDivisions": [
      "Division No.  8",
      "Division No. 8",
      "Division No.  7",
      "Division No. 7",
      "Division No.  9",
      "Division No. 9",
      "Division No. 10"
    ]
  },
  {
    "id": "AB-southern-alberta",
    "name": "Southern Alberta",
    "fullName": "Southern Alberta (Lethbridge & Medicine Hat)",
    "province": "AB",
    "tier": 1,
    "desc": "Agricultural food processing, renewable wind energy corridor, and southern badlands (Dinosaur Provincial Park).",
    "censusDivisions": [
      "Division No.  1",
      "Division No. 1",
      "Division No.  2",
      "Division No. 2",
      "Division No.  3",
      "Division No.  4",
      "Division No.  5"
    ]
  },
  {
    "id": "AB-northern-alberta-oilsands",
    "name": "Northern Alberta & Oil Sands",
    "fullName": "Northern Alberta (Fort McMurray Oil Sands & Grande Prairie)",
    "province": "AB",
    "tier": 1,
    "desc": "Athabasca oil sands energy capital (Fort McMurray), Montney natural gas formation, and Peace River agricultural basin.",
    "censusDivisions": [
      "Division No. 16",
      "Division No. 19",
      "Division No. 12",
      "Division No. 13",
      "Division No. 14",
      "Division No. 15",
      "Division No. 17",
      "Division No. 18"
    ]
  },
  {
    "id": "MB-winnipeg-capital-region",
    "name": "Winnipeg Capital Region",
    "fullName": "Winnipeg Metropolitan Region (Capital Hub)",
    "province": "MB",
    "tier": 1,
    "desc": "Provincial capital, CentrePort Canada inland tri-modal port, Canadian Museum for Human Rights, and The Forks.",
    "censusDivisions": [
      "Division No. 11"
    ]
  },
  {
    "id": "MB-southern-manitoba-brandon",
    "name": "Southern Manitoba & Westman",
    "fullName": "Southern Manitoba (Brandon & Pembina Valley)",
    "province": "MB",
    "tier": 1,
    "desc": "Agricultural crop production, manufacturing in Brandon, and vibrant manufacturing/agribusiness communities.",
    "censusDivisions": [
      "Division No.  7",
      "Division No. 7",
      "Division No.  1",
      "Division No.  2",
      "Division No.  3",
      "Division No.  4",
      "Division No.  5",
      "Division No.  6",
      "Division No.  8",
      "Division No.  9",
      "Division No. 10",
      "Division No. 12"
    ]
  },
  {
    "id": "MB-northern-manitoba-churchill",
    "name": "Northern Manitoba & Parkland",
    "fullName": "Northern Manitoba (Thompson, Flin Flon & Churchill Arctic Port)",
    "province": "MB",
    "tier": 1,
    "desc": "Arctic seaport of Churchill (polar bear and beluga capital), nickel/zinc mining, and clean hydroelectric power stations.",
    "censusDivisions": [
      "Division No. 21",
      "Division No. 22",
      "Division No. 23",
      "Division No. 19",
      "Division No. 20",
      "Division No. 16",
      "Division No. 17"
    ]
  },
  {
    "id": "SK-saskatoon-region",
    "name": "Saskatoon Region",
    "fullName": "Saskatoon Metropolitan Region (Bridge City)",
    "province": "SK",
    "tier": 1,
    "desc": "Potash and uranium mining global headquarters, University of Saskatchewan / Canadian Light Source synchrotron, and tech hub.",
    "censusDivisions": [
      "Division No. 11"
    ]
  },
  {
    "id": "SK-regina-capital-region",
    "name": "Regina Capital Region",
    "fullName": "Regina Capital Region (Queen City)",
    "province": "SK",
    "tier": 1,
    "desc": "Provincial capital, Wascana Centre, global fertilizer headquarters, steel manufacturing, and agricultural equipment.",
    "censusDivisions": [
      "Division No.  6",
      "Division No. 6"
    ]
  },
  {
    "id": "SK-southern-agricultural",
    "name": "Southern Saskatchewan",
    "fullName": "Southern Saskatchewan (Grain & Oil Plains)",
    "province": "SK",
    "tier": 1,
    "desc": "Vast wheat and canola prairie breadbasket, Bakken oil formation, and Grasslands National Park.",
    "censusDivisions": [
      "Division No.  1",
      "Division No.  2",
      "Division No.  3",
      "Division No.  4",
      "Division No.  7",
      "Division No.  8"
    ]
  },
  {
    "id": "SK-central-northern-boreal",
    "name": "Central & Northern Saskatchewan",
    "fullName": "Central & Northern Saskatchewan (Prince Albert & Boreal)",
    "province": "SK",
    "tier": 1,
    "desc": "Prince Albert National Park, forestry, Athabasca Basin high-grade uranium mines, and northern lake country.",
    "censusDivisions": [
      "Division No. 15",
      "Division No. 16",
      "Division No. 17",
      "Division No. 18",
      "Division No. 14",
      "Division No. 13",
      "Division No. 12",
      "Division No.  9",
      "Division No. 10"
    ]
  },
  {
    "id": "NS-halifax-regional-municipality",
    "name": "Halifax Region",
    "fullName": "Halifax Regional Municipality (HRM - Atlantic Gateway)",
    "province": "NS",
    "tier": 1,
    "desc": "Atlantic Canada's largest economic powerhouse, deepwater container port, naval headquarters, universities, and ocean tech cluster.",
    "censusDivisions": [
      "Halifax"
    ]
  },
  {
    "id": "NS-cape-breton-island",
    "name": "Cape Breton Island",
    "fullName": "Cape Breton Island (Cabot Trail & Sydney)",
    "province": "NS",
    "tier": 1,
    "desc": "World-famous Cabot Trail coastal highway, Celtic Gaelic culture, Cape Breton Highlands, and port of Sydney.",
    "censusDivisions": [
      "Cape Breton",
      "Inverness",
      "Richmond",
      "Victoria"
    ]
  },
  {
    "id": "NS-annapolis-valley-south-shore",
    "name": "Annapolis Valley & South Shore",
    "fullName": "Annapolis Valley (Wine & Apples) & South Shore (Lunenburg / Peggy's Cove)",
    "province": "NS",
    "tier": 1,
    "desc": "Tidal Bay wine appellation in Annapolis Valley, UNESCO town of Lunenburg (home of the Bluenose), and Peggy's Cove lighthouse.",
    "censusDivisions": [
      "Kings",
      "Annapolis",
      "Hants",
      "Lunenburg",
      "Queens",
      "Shelburne",
      "Yarmouth",
      "Digby"
    ]
  },
  {
    "id": "NB-greater-moncton",
    "name": "Greater Moncton",
    "fullName": "Greater Moncton (Hub City & Dieppe / Riverview)",
    "province": "NB",
    "tier": 1,
    "desc": "Primary logistics, retail, and transportation hub of the Maritimes, bilingual university center, and Tidal Bore on Petitcodiac River.",
    "censusDivisions": [
      "Westmorland",
      "Albert"
    ]
  },
  {
    "id": "NB-saint-john-fundy",
    "name": "Saint John & Bay of Fundy",
    "fullName": "Saint John Industrial Port & Bay of Fundy Coast",
    "province": "NB",
    "tier": 1,
    "desc": "Canada's oldest incorporated city, Irving Oil refinery, Port of Saint John, and highest tides in the world at Bay of Fundy.",
    "censusDivisions": [
      "Saint John",
      "Charlotte",
      "Kings"
    ]
  },
  {
    "id": "NB-fredericton-capital",
    "name": "Fredericton Capital Region",
    "fullName": "Fredericton Capital Region (Research & Cybersecurity Hub)",
    "province": "NB",
    "tier": 1,
    "desc": "Provincial capital, University of New Brunswick, Canadian Cyber Centre innovation hub, and Saint John River valley.",
    "censusDivisions": [
      "York",
      "Sunbury",
      "Queens",
      "Carleton"
    ]
  },
  {
    "id": "NB-acadian-peninsula-north",
    "name": "Acadian Peninsula & Northern NB",
    "fullName": "Acadian Peninsula & Northern New Brunswick Coast",
    "province": "NB",
    "tier": 1,
    "desc": "Vibrant Acadian francophone cultural heartland, commercial fisheries, Miramichi salmon river, and Chaleur Bay.",
    "censusDivisions": [
      "Gloucester",
      "Northumberland",
      "Restigouche",
      "Madawaska",
      "Victoria",
      "Kent"
    ]
  },
  {
    "id": "NL-st-johns-avalon",
    "name": "St. John's Metro & Avalon",
    "fullName": "St. John's Metropolitan Area & Avalon Peninsula",
    "province": "NL",
    "tier": 1,
    "desc": "Oldest city in North America, offshore oil and gas operations base, Memorial University, and Signal Hill / Cape Spear.",
    "censusDivisions": [
      "Division No.  1",
      "Division No. 1"
    ]
  },
  {
    "id": "NL-western-newfoundland-labrador",
    "name": "Western Newfoundland & Labrador",
    "fullName": "Western Newfoundland (Gros Morne) & Labrador",
    "province": "NL",
    "tier": 1,
    "desc": "Gros Morne National Park UNESCO site, Corner Brook, Churchill Falls hydroelectric station, and iron ore in Labrador City.",
    "censusDivisions": [
      "Division No.  4",
      "Division No.  5",
      "Division No.  9",
      "Division No. 10",
      "Division No. 2",
      "Division No. 3",
      "Division No. 6",
      "Division No. 7",
      "Division No. 8"
    ]
  },
  {
    "id": "PE-charlottetown-queens",
    "name": "Greater Charlottetown",
    "fullName": "Greater Charlottetown & Queens County",
    "province": "PE",
    "tier": 1,
    "desc": "Birthplace of Confederation (1864 Charlottetown Conference), provincial capital, bio-science cluster, and central red sandstone coast.",
    "censusDivisions": [
      "Queens"
    ]
  },
  {
    "id": "PE-prince-kings-counties",
    "name": "Prince & Kings Counties",
    "fullName": "Prince County (Summerside) & Kings County (Eastern PEI)",
    "province": "PE",
    "tier": 1,
    "desc": "Summerside aerospace manufacturing, Anne of Green Gables tourism, world-famous PEI potatoes, and Confederation Bridge gateway.",
    "censusDivisions": [
      "Prince",
      "Kings"
    ]
  },
  {
    "id": "YT-yukon-territory",
    "name": "Yukon Territory",
    "fullName": "Yukon Territory (Whitehorse, Klondike & Dawson City)",
    "province": "YT",
    "tier": 1,
    "desc": "Territorial capital Whitehorse, Klondike Gold Rush historic Dawson City, Kluane National Park (Mount Logan), and Aurora Borealis tourism.",
    "censusDivisions": [
      "Yukon"
    ]
  },
  {
    "id": "NT-northwest-territories",
    "name": "Northwest Territories",
    "fullName": "Northwest Territories (Yellowknife, South Slave & Arctic Coast)",
    "province": "NT",
    "tier": 1,
    "desc": "Diamond capital of North America (Ekati, Diavik), territorial capital Yellowknife on Great Slave Lake, and Mackenzie River valley.",
    "censusDivisions": [
      "Region 1",
      "Region 2",
      "Region 3",
      "Region 4",
      "Region 5",
      "Region 6"
    ]
  },
  {
    "id": "NU-nunavut-territory",
    "name": "Nunavut Territory",
    "fullName": "Nunavut Territory (Iqaluit, Baffin & Arctic Archipelago)",
    "province": "NU",
    "tier": 1,
    "desc": "Canada's largest and northernmost territory, capital Iqaluit on Frobisher Bay, Inuit cultural traditions, and Arctic mining.",
    "censusDivisions": [
      "Baffin",
      "Keewatin",
      "Kitikmeot"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CANADA_REGIONS };
}
