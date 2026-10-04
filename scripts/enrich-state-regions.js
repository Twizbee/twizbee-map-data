/**
 * scripts/enrich-state-regions.js
 *
 * Enriches Florida, Washington State, Texas, North Carolina, Georgia, Arizona,
 * Colorado, Illinois, Pennsylvania, Ohio and others with granular Macro & Metro regions.
 */

const fs = require('fs');
const path = require('path');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');

const ENRICHED_STATE_REGIONS = {
  // =========================================================================
  // FLORIDA (FL)
  // =========================================================================
  'FL': [
    // Tier 1: Macro-Regions
    {
      id: 'FL-south-florida',
      name: 'South Florida',
      fullName: 'South Florida (Miami, Fort Lauderdale & The Palm Beaches)',
      tier: 1,
      desc: 'The vibrant southeast Florida metropolitan powerhouse encompassing Miami-Dade, Broward, Palm Beach, and the Florida Keys.',
      counties: ['Miami-Dade', 'Broward', 'Palm Beach', 'Monroe']
    },
    {
      id: 'FL-central-florida',
      name: 'Central Florida',
      fullName: 'Central Florida (Greater Orlando, I-4 Tech & Space Coast)',
      tier: 1,
      desc: 'Global tourism capital, simulation tech corridor, Kennedy Space Center, and rapid growth along the I-4 corridor.',
      counties: ['Orange', 'Seminole', 'Osceola', 'Lake', 'Volusia', 'Brevard', 'Polk', 'Sumter']
    },
    {
      id: 'FL-tampa-bay',
      name: 'Tampa Bay Area',
      fullName: 'Tampa Bay Area (Tampa, St. Petersburg & Clearwater)',
      tier: 1,
      desc: 'Financial, healthcare, defense (MacDill AFB), and Gulf Coast beach communities spanning Tampa Bay.',
      counties: ['Hillsborough', 'Pinellas', 'Pasco', 'Hernando', 'Manatee', 'Sarasota']
    },
    {
      id: 'FL-first-coast',
      name: 'First Coast',
      fullName: 'First Coast & Northeast Florida (Jacksonville & St. Augustine)',
      tier: 1,
      desc: 'Historic St. Augustine (oldest continuously inhabited European city in US), deepwater Port of Jacksonville, naval bases, and Ponte Vedra.',
      counties: ['Duval', 'St. Johns', 'Clay', 'Nassau', 'Baker', 'Putnam', 'Flagler']
    },
    {
      id: 'FL-southwest-florida',
      name: 'Southwest Florida',
      fullName: 'Southwest Florida (Cape Coral, Fort Myers & Naples)',
      tier: 1,
      desc: 'Sun-drenched Gulf Coast barrier islands (Sanibel, Captiva, Marco Island), affluent Naples, and booming Cape Coral.',
      counties: ['Lee', 'Collier', 'Charlotte', 'Hendry', 'Glades']
    },
    {
      id: 'FL-emerald-coast-panhandle',
      name: 'Florida Panhandle',
      fullName: 'Florida Panhandle & Emerald Coast (Pensacola to Panama City)',
      tier: 1,
      desc: 'Sugar-white sand beaches, military aviation hubs (Eglin AFB, Pensacola NAS), Destin, 30A, and coastal fisheries.',
      counties: ['Escambia', 'Santa Rosa', 'Okaloosa', 'Walton', 'Bay', 'Washington', 'Holmes', 'Jackson', 'Calhoun', 'Gulf']
    },
    {
      id: 'FL-north-central-nature-coast',
      name: 'North Central Florida',
      fullName: 'North Central Florida & Nature Coast (Gainesville & Ocala)',
      tier: 1,
      desc: 'University of Florida in Gainesville, world equestrian horse capital Ocala, freshwater natural springs, and rural timberlands.',
      counties: ['Alachua', 'Marion', 'Citrus', 'Levy', 'Dixie', 'Gilchrist', 'Columbia', 'Suwannee', 'Lafayette', 'Hamilton', 'Madison', 'Taylor', 'Union', 'Bradford']
    },
    {
      id: 'FL-capital-big-bend',
      name: 'Big Bend & Capital Region',
      fullName: 'Big Bend & Capital Region (Tallahassee & Apalachee Bay)',
      tier: 1,
      desc: 'Florida state capitol, Florida State University, Florida A&M, Apalachicola National Forest, and pristine coastline.',
      counties: ['Leon', 'Gadsden', 'Wakulla', 'Jefferson', 'Franklin', 'Liberty']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'FL-greater-miami',
      name: 'Miami-Dade Metro',
      fullName: 'Greater Miami & Miami-Dade County (Brickell, South Beach & Doral)',
      tier: 2,
      parentRegion: 'South Florida',
      desc: 'Gateway to the Americas, Brickell financial district, South Beach, PortMiami cruise capital, and Wynwood arts.',
      counties: ['Miami-Dade']
    },
    {
      id: 'FL-fort-lauderdale-broward',
      name: 'Fort Lauderdale / Broward',
      fullName: 'Greater Fort Lauderdale & Broward County',
      tier: 2,
      parentRegion: 'South Florida',
      desc: '"Venice of America" canal waterways, Port Everglades, Fort Lauderdale yachting capital, and suburban commercial centers.',
      counties: ['Broward']
    },
    {
      id: 'FL-palm-beach-gold-coast',
      name: 'Palm Beach & Gold Coast',
      fullName: 'Palm Beach County & The Gold Coast (Boca Raton to Jupiter)',
      tier: 2,
      parentRegion: 'South Florida',
      desc: 'High-wealth financial migration hub ("Wall Street South"), luxury oceanfront estates, equestrian Wellington, and golf resorts.',
      counties: ['Palm Beach']
    },
    {
      id: 'FL-florida-keys',
      name: 'Florida Keys',
      fullName: 'Florida Keys & Monroe County (Key West, Marathon & Key Largo)',
      tier: 2,
      parentRegion: 'South Florida',
      desc: 'Scenic Overseas Highway across 42 bridges, coral reef barrier reef, sportfishing, and historic Old Town Key West.',
      counties: ['Monroe']
    },
    {
      id: 'FL-treasure-coast',
      name: 'Treasure Coast',
      fullName: 'Treasure Coast (Port St. Lucie, Stuart & Vero Beach)',
      tier: 2,
      parentRegion: 'South Florida',
      desc: 'Historic shipwreck Spanish galleons, Indian River Lagoon biodiversity, sailfish capital Stuart, and fast-growing Port St. Lucie.',
      counties: ['Martin', 'St. Lucie', 'Indian River']
    },
    {
      id: 'FL-greater-orlando',
      name: 'Greater Orlando',
      fullName: 'Greater Orlando Metropolitan Area (Orange, Seminole & Osceola)',
      tier: 2,
      parentRegion: 'Central Florida',
      desc: 'Walt Disney World, Universal Orlando, UCF research park, downtown Orlando tech sector, and Lake Nona Medical City.',
      counties: ['Orange', 'Seminole', 'Osceola', 'Lake']
    },
    {
      id: 'FL-space-coast',
      name: 'Space Coast',
      fullName: 'Space Coast & Brevard County (Cape Canaveral & Melbourne)',
      tier: 2,
      parentRegion: 'Central Florida',
      desc: 'NASA Kennedy Space Center, Cape Canaveral Space Force Station, SpaceX/Blue Origin launch pads, and Melbourne aerospace.',
      counties: ['Brevard']
    },
    {
      id: 'FL-suncoast-sarasota-bradenton',
      name: 'The Suncoast',
      fullName: 'The Suncoast (Sarasota, Bradenton & Lakewood Ranch)',
      tier: 2,
      parentRegion: 'Tampa Bay Area',
      desc: 'Siesta Key white quartz sand beaches, Ringling arts museum, master-planned Lakewood Ranch, and Bradenton waterfront.',
      counties: ['Sarasota', 'Manatee']
    },
    {
      id: 'FL-cape-coral-fort-myers',
      name: 'Cape Coral - Fort Myers',
      fullName: 'Cape Coral - Fort Myers Metropolitan Area',
      tier: 2,
      parentRegion: 'Southwest Florida',
      desc: 'Over 400 miles of navigable canals in Cape Coral, Thomas Edison & Henry Ford winter estates, and Gulf of Mexico barrier islands.',
      counties: ['Lee']
    },
    {
      id: 'FL-naples-marco-island',
      name: 'Naples & Marco Island',
      fullName: 'Naples - Marco Island Metro & Collier County',
      tier: 2,
      parentRegion: 'Southwest Florida',
      desc: 'Exclusive Fifth Avenue South dining, championship golf courses, Ten Thousand Islands gateway, and Everglades wildlife.',
      counties: ['Collier']
    },
    {
      id: 'FL-the-villages',
      name: 'The Villages & Sumter',
      fullName: 'The Villages & Sumter County (Active Adult Metro)',
      tier: 2,
      parentRegion: 'Central Florida',
      desc: 'America\'s largest and fastest-growing master-planned active adult retirement community with over 130,000 residents.',
      counties: ['Sumter']
    },
    {
      id: 'FL-lakeland-winter-haven',
      name: 'Lakeland - Winter Haven',
      fullName: 'Lakeland - Winter Haven Metro & Polk County',
      tier: 2,
      parentRegion: 'Central Florida',
      desc: 'Major logistics and distribution fulfillment crossroads midway between Tampa and Orlando, Publix headquarters, and Legoland.',
      counties: ['Polk']
    }
  ],

  // =========================================================================
  // WASHINGTON (WA)
  // =========================================================================
  'WA': [
    // Tier 1: Macro-Regions
    {
      id: 'WA-western-washington',
      name: 'Western Washington',
      fullName: 'Western Washington (Puget Sound, Olympic Peninsula & Coast)',
      tier: 1,
      desc: 'The temperate rainforests, deepwater maritime ports, Cascade foothills, and dominant economic basin west of the Cascade Mountains.',
      counties: ['King', 'Pierce', 'Snohomish', 'Kitsap', 'Thurston', 'Whatcom', 'Skagit', 'Island', 'San Juan', 'Clallam', 'Jefferson', 'Grays Harbor', 'Mason', 'Pacific', 'Lewis', 'Wahkiakum', 'Cowlitz', 'Clark', 'Skamania']
    },
    {
      id: 'WA-eastern-washington',
      name: 'Eastern Washington',
      fullName: 'Eastern Washington (Inland Northwest, Columbia Basin & Yakima)',
      tier: 1,
      desc: 'The sunny, semi-arid agricultural empire, Inland Northwest medical hub Spokane, world-famous apple orchards, and Columbia River hydropower.',
      counties: ['Spokane', 'Yakima', 'Benton', 'Franklin', 'Chelan', 'Douglas', 'Grant', 'Kittitas', 'Walla Walla', 'Whitman', 'Stevens', 'Okanogan', 'Adams', 'Lincoln', 'Asotin', 'Klickitat', 'Pend Oreille', 'Ferry', 'Columbia', 'Garfield']
    },
    {
      id: 'WA-puget-sound',
      name: 'Puget Sound',
      fullName: 'Puget Sound Region (Seattle, Tacoma, Everett & Sound Basin)',
      tier: 1,
      desc: 'Global tech giants (Amazon, Microsoft), aerospace (Boeing), container shipping ports, and majestic views of Mount Rainier.',
      counties: ['King', 'Pierce', 'Snohomish', 'Kitsap', 'Thurston', 'Skagit', 'Whatcom', 'Island', 'San Juan']
    },
    {
      id: 'WA-central-washington',
      name: 'Central Washington',
      fullName: 'Central Washington (Yakima Valley, Wenatchee & Columbia Basin)',
      tier: 1,
      desc: 'Agricultural heartland, world apple capital Wenatchee, hops and wine country in Yakima, and Moses Lake data center cluster.',
      counties: ['Yakima', 'Kittitas', 'Chelan', 'Douglas', 'Grant', 'Okanogan', 'Klickitat']
    },
    {
      id: 'WA-inland-northwest',
      name: 'Inland Northwest',
      fullName: 'Inland Northwest & Greater Spokane (Spokane & Palouse)',
      tier: 1,
      desc: 'Regional commercial, healthcare, and higher-education hub serving eastern Washington, north Idaho, and western Montana.',
      counties: ['Spokane', 'Stevens', 'Pend Oreille', 'Lincoln', 'Adams', 'Whitman', 'Ferry', 'Asotin', 'Columbia', 'Garfield']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'WA-seattle-metro',
      name: 'Greater Seattle Metro',
      fullName: 'Greater Seattle Metropolitan Area (King, Snohomish & Pierce)',
      tier: 2,
      parentRegion: 'Puget Sound',
      desc: 'The core urban engine of the Pacific Northwest spanning Seattle, Bellevue, Redmond, Tacoma, and Everett.',
      counties: ['King', 'Snohomish', 'Pierce']
    },
    {
      id: 'WA-king-county-seattle',
      name: 'Seattle & King County',
      fullName: 'Seattle & King County (Seattle Core, Eastside & South King)',
      tier: 2,
      parentRegion: 'Puget Sound',
      desc: 'Space Needle, Pike Place Market, University of Washington, Amazon headquarters, and affluent tech communities.',
      counties: ['King']
    },
    {
      id: 'WA-south-sound',
      name: 'South Sound',
      fullName: 'South Sound (Tacoma, Pierce County & Olympia Capital)',
      tier: 2,
      parentRegion: 'Puget Sound',
      desc: 'Museum of Glass in Tacoma, Point Defiance, Joint Base Lewis-McChord (JBLM), state capital Olympia, and Puget Sound inlets.',
      counties: ['Pierce', 'Thurston', 'Mason']
    },
    {
      id: 'WA-north-sound',
      name: 'North Sound & San Juans',
      fullName: 'North Sound & San Juan Islands (Bellingham, Skagit & Island)',
      tier: 2,
      parentRegion: 'Puget Sound',
      desc: 'Skagit Valley tulip fields, Western Washington University in Bellingham, orca whale watching in the San Juans, and Deception Pass.',
      counties: ['Whatcom', 'Skagit', 'Island', 'San Juan']
    },
    {
      id: 'WA-kitsap-peninsula',
      name: 'Kitsap Peninsula',
      fullName: 'Kitsap Peninsula & West Sound (Bremerton & Bainbridge Island)',
      tier: 2,
      parentRegion: 'Puget Sound',
      desc: 'Puget Sound Naval Shipyard, scenic ferry connections to downtown Seattle, Bainbridge Island estates, and Poulsbo "Little Norway".',
      counties: ['Kitsap']
    },
    {
      id: 'WA-olympic-peninsula-coast',
      name: 'Olympic Peninsula & Coast',
      fullName: 'Olympic Peninsula & Pacific Coast (Olympic National Park & Beaches)',
      tier: 2,
      parentRegion: 'Western Washington',
      desc: 'Olympic National Park, Hoh Rain Forest, Hurricane Ridge, Cape Flattery, Dungeness crab in Sequim, and coastal ports.',
      counties: ['Clallam', 'Jefferson', 'Grays Harbor', 'Pacific']
    },
    {
      id: 'WA-southwest-vancouver-metro',
      name: 'Southwest Washington',
      fullName: 'Southwest Washington (Vancouver WA / Portland Metro & Columbia River)',
      tier: 2,
      parentRegion: 'Western Washington',
      desc: 'Vancouver WA waterfront renaissance, Mount St. Helens National Volcanic Monument, Port of Longview, and Columbia River gorge.',
      counties: ['Clark', 'Cowlitz', 'Skamania', 'Wahkiakum', 'Lewis']
    },
    {
      id: 'WA-spokane-metro',
      name: 'Spokane Metro',
      fullName: 'Spokane Metropolitan Area (Spokane & Spokane Valley)',
      tier: 2,
      parentRegion: 'Inland Northwest',
      desc: 'Spokane Falls, Gonzaga University, medical innovation corridor, Fairchild Air Force Base, and Centennial Trail.',
      counties: ['Spokane']
    },
    {
      id: 'WA-tri-cities',
      name: 'Tri-Cities Region',
      fullName: 'Tri-Cities Metropolitan Area (Kennewick, Pasco & Richland)',
      tier: 2,
      parentRegion: 'Central Washington',
      desc: 'Pacific Northwest National Laboratory (PNNL), Columbia River confluence, booming viticulture AVA wine region, and agribusiness.',
      counties: ['Benton', 'Franklin']
    },
    {
      id: 'WA-yakima-valley',
      name: 'Yakima Valley',
      fullName: 'Yakima Valley & Wine Country',
      tier: 2,
      parentRegion: 'Central Washington',
      desc: 'Produces over 75% of the United States hop crop, premium vineyard appellations, apple and cherry orchards, and agricultural heritage.',
      counties: ['Yakima']
    },
    {
      id: 'WA-wenatchee-valley',
      name: 'Wenatchee & North Central',
      fullName: 'Wenatchee Valley & North Central Cascades (Leavenworth & Chelan)',
      tier: 2,
      parentRegion: 'Central Washington',
      desc: 'Apple capital of the world Wenatchee, Bavarian theme village Leavenworth, glacier-carved Lake Chelan, and North Cascades access.',
      counties: ['Chelan', 'Douglas', 'Okanogan']
    }
  ],

  // =========================================================================
  // TEXAS (TX)
  // =========================================================================
  'TX': [
    // Tier 1: Macro-Regions
    {
      id: 'TX-north-texas',
      name: 'North Texas',
      fullName: 'North Texas (DFW Metroplex)',
      tier: 1,
      desc: 'The economic powerhouse of North Texas centered around Dallas and Fort Worth, major corporate HQs, and DFW International Airport.',
      counties: ['Dallas', 'Tarrant', 'Collin', 'Denton', 'Rockwall', 'Ellis', 'Kaufman', 'Johnson', 'Parker', 'Wise']
    },
    {
      id: 'TX-central-texas',
      name: 'Central Texas',
      fullName: 'Central Texas (Austin & Texas Hill Country)',
      tier: 1,
      desc: 'Silicon Hills tech hub in Austin, Texas State Capitol, University of Texas, scenic Hill Country wineries, and music capital.',
      counties: ['Travis', 'Williamson', 'Hays', 'Bastrop', 'Caldwell', 'Blanco', 'Burnet', 'Llano', 'Gillespie', 'Bell', 'McLennan', 'Coryell', 'Falls']
    },
    {
      id: 'TX-gulf-coast-texas',
      name: 'Gulf Coast Texas',
      fullName: 'Gulf Coast Texas (Greater Houston & Space City)',
      tier: 1,
      desc: 'Fourth largest city in US, Texas Medical Center (largest medical complex in world), Port of Houston energy corridor, NASA Johnson Space Center, and Galveston Bay.',
      counties: ['Harris', 'Fort Bend', 'Montgomery', 'Brazoria', 'Galveston', 'Liberty', 'Waller', 'Chambers']
    },
    {
      id: 'TX-san-antonio-south-texas',
      name: 'San Antonio & South Texas',
      fullName: 'San Antonio & South Texas (Alamo City & Rio Grande Valley)',
      tier: 1,
      desc: 'Historic Alamo, San Antonio River Walk, Joint Base San Antonio (Military City USA), cross-border trade corridors, and subtropical Rio Grande Valley.',
      counties: ['Bexar', 'Comal', 'Guadalupe', 'Medina', 'Kendall', 'Wilson', 'Hidalgo', 'Cameron', 'Starr', 'Willacy', 'Nueces', 'San Patricio']
    },
    {
      id: 'TX-west-texas',
      name: 'West Texas',
      fullName: 'West Texas & Permian Basin (Midland, Odessa, Lubbock & El Paso)',
      tier: 1,
      desc: 'America\'s highest-producing oil and natural gas field (Permian Basin), Texas Tech University in Lubbock, wind energy farms, and Big Bend / El Paso borderlands.',
      counties: ['Midland', 'Ector', 'Tom Green', 'Lubbock', 'Taylor', 'Howard', 'El Paso', 'Hudspeth', 'Potter', 'Randall']
    },
    {
      id: 'TX-east-texas',
      name: 'East Texas',
      fullName: 'East Texas (Piney Woods, Tyler & Longview)',
      tier: 1,
      desc: 'Lush Piney Woods forests, Caddo Lake, Tyler rose capital, oil discovery heritage, and border gateway to Louisiana and Arkansas.',
      counties: ['Smith', 'Gregg', 'Harrison', 'Rusk', 'Nacogdoches', 'Angelina', 'Bowie', 'Cass', 'Wood']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'TX-dallas-core',
      name: 'Dallas County & Metro',
      fullName: 'Dallas County & Urban Core (Downtown, Uptown & Suburbs)',
      tier: 2,
      parentRegion: 'North Texas',
      desc: 'Financial, telecommunications, and arts capital of Texas, Dallas Arts District, and major corporate employment centers.',
      counties: ['Dallas', 'Rockwall', 'Ellis', 'Kaufman']
    },
    {
      id: 'TX-fort-worth-tarrant',
      name: 'Fort Worth & Tarrant',
      fullName: 'Fort Worth & Tarrant County (Cowtown & Mid-Cities)',
      tier: 2,
      parentRegion: 'North Texas',
      desc: 'Fort Worth Stockyards Western heritage, Lockheed Martin / Bell defense aerospace, Arlington entertainment district (Cowboys / Rangers stadiums).',
      counties: ['Tarrant', 'Parker', 'Johnson', 'Wise']
    },
    {
      id: 'TX-collin-denton',
      name: 'Collin & Denton',
      fullName: 'Collin & Denton Counties (Frisco, Plano & McKinney)',
      tier: 2,
      parentRegion: 'North Texas',
      desc: 'Platinum Corridor corporate headquarters (Toyota, Frito-Lay), master-planned Frisco sports city, and top-ranked public schools.',
      counties: ['Collin', 'Denton']
    },
    {
      id: 'TX-greater-austin',
      name: 'Greater Austin',
      fullName: 'Greater Austin Metropolitan Area (Silicon Hills)',
      tier: 2,
      parentRegion: 'Central Texas',
      desc: 'Tech giants (Tesla, Apple, Dell, Google, Samsung foundry), South by Southwest (SXSW), Austin FC, and Colorado River lakes.',
      counties: ['Travis', 'Williamson', 'Hays', 'Bastrop', 'Caldwell']
    },
    {
      id: 'TX-greater-san-antonio',
      name: 'Greater San Antonio',
      fullName: 'Greater San Antonio Metropolitan Area (Bexar & Comal)',
      tier: 2,
      parentRegion: 'San Antonio & South Texas',
      desc: 'Rich Hispanic and German heritage, cybersecurity hub, USAA headquarters, Toyota manufacturing plant, and New Braunfels Hill Country gateway.',
      counties: ['Bexar', 'Comal', 'Guadalupe', 'Medina', 'Kendall', 'Wilson']
    },
    {
      id: 'TX-texas-hill-country',
      name: 'Texas Hill Country',
      fullName: 'Texas Hill Country (Fredericksburg, Kerrville & Marble Falls)',
      tier: 2,
      parentRegion: 'Central Texas',
      desc: 'Limestone hills, spring-fed rivers (Guadalupe, Frio), German heritage wineries in Fredericksburg, and Enchanted Rock.',
      counties: ['Blanco', 'Gillespie', 'Kerr', 'Kendall', 'Bandera', 'Llano', 'Burnet', 'Mason']
    },
    {
      id: 'TX-rio-grande-valley',
      name: 'Rio Grande Valley',
      fullName: 'Rio Grande Valley / RGV (McAllen & Brownsville)',
      tier: 2,
      parentRegion: 'San Antonio & South Texas',
      desc: 'Bilingual border metropolis, SpaceX Starbase launch site at Boca Chica, cross-border manufacturing, and citrus agriculture.',
      counties: ['Hidalgo', 'Cameron', 'Starr', 'Willacy']
    },
    {
      id: 'TX-coastal-bend',
      name: 'Coastal Bend',
      fullName: 'Coastal Bend & Corpus Christi (Gulf Port & Barrier Islands)',
      tier: 2,
      parentRegion: 'San Antonio & South Texas',
      desc: 'Port of Corpus Christi (leading US crude oil export gateway), Texas State Aquarium, Padre Island National Seashore, and coastal wind farms.',
      counties: ['Nueces', 'San Patricio', 'Aransas', 'Kleberg', 'Jim Wells']
    },
    {
      id: 'TX-el-paso-trans-pecos',
      name: 'El Paso & Trans-Pecos',
      fullName: 'El Paso Metro & Trans-Pecos (Borderplex & Big Bend)',
      tier: 2,
      parentRegion: 'West Texas',
      desc: 'Franklin Mountains, Fort Bliss, international trade with Ciudad Juárez, and gateway to Big Bend National Park and Marfa.',
      counties: ['El Paso', 'Hudspeth', 'Culberson', 'Reeves', 'Brewster', 'Presidio']
    },
    {
      id: 'TX-texas-panhandle',
      name: 'Texas Panhandle',
      fullName: 'Texas Panhandle & High Plains (Amarillo & Palo Duro)',
      tier: 2,
      parentRegion: 'West Texas',
      desc: 'Palo Duro Canyon (second largest canyon in US), Route 66, Cadillac Ranch, cattle feedlots, and wind energy corridor.',
      counties: ['Potter', 'Randall', 'Moore', 'Hutchinson', 'Deaf Smith', 'Gray', 'Hale']
    }
  ],

  // =========================================================================
  // NORTH CAROLINA (NC)
  // =========================================================================
  'NC': [
    {
      id: 'NC-research-triangle',
      name: 'Research Triangle',
      fullName: 'Research Triangle (Raleigh, Durham & Chapel Hill)',
      tier: 1,
      desc: 'World-renowned innovation center anchored by Duke University, UNC Chapel Hill, NC State, and Research Triangle Park (RTP) biotech hub.',
      counties: ['Wake', 'Durham', 'Orange', 'Johnston', 'Chatham']
    },
    {
      id: 'NC-charlotte-metro',
      name: 'Charlotte Metro',
      fullName: 'Charlotte Metropolitan Area / Metrolina',
      tier: 1,
      desc: 'Second largest banking center in the US (Bank of America, Wells Fargo East Coast), NASCAR Hall of Fame, and Lake Norman.',
      counties: ['Mecklenburg', 'Union', 'Cabarrus', 'Gaston', 'Iredell', 'Lincoln', 'Rowan']
    },
    {
      id: 'NC-piedmont-triad',
      name: 'Piedmont Triad',
      fullName: 'Piedmont Triad (Greensboro, Winston-Salem & High Point)',
      tier: 1,
      desc: 'Home furnishings market capital (High Point), biotech and tobacco heritage (Winston-Salem), aviation logistics (FedEx hub in Greensboro).',
      counties: ['Guilford', 'Forsyth', 'Davidson', 'Alamance', 'Randolph', 'Rockingham']
    },
    {
      id: 'NC-western-nc-asheville',
      name: 'Western North Carolina',
      fullName: 'Western North Carolina & Asheville (Blue Ridge Mountains)',
      tier: 1,
      desc: 'Historic Biltmore Estate, craft beer capital Asheville, Great Smoky Mountains National Park, Blue Ridge Parkway, and Appalachian culture.',
      counties: ['Buncombe', 'Henderson', 'Haywood', 'Watauga', 'Transylvania', 'Madison', 'Jackson']
    },
    {
      id: 'NC-outer-banks-crystal-coast',
      name: 'Outer Banks & Crystal Coast',
      fullName: 'Outer Banks & Crystal Coast (Cape Hatteras & Morehead City)',
      tier: 1,
      desc: 'Wright Brothers National Memorial at Kitty Hawk, Cape Hatteras National Seashore, wild Spanish mustangs of Corolla, and coastal fishing.',
      counties: ['Dare', 'Currituck', 'Hyde', 'Carteret', 'Pamlico']
    },
    {
      id: 'NC-wilmington-cape-fear',
      name: 'Wilmington & Cape Fear',
      fullName: 'Wilmington & Cape Fear Coast',
      tier: 1,
      desc: 'Historic riverfront port on Cape Fear River, Battleship North Carolina, EUE Screen Gems film studios, and Wrightsville Beach.',
      counties: ['New Hanover', 'Brunswick', 'Pender']
    },
    {
      id: 'NC-sandhills-fayetteville',
      name: 'Sandhills & Fayetteville',
      fullName: 'Sandhills & Fayetteville (Fort Liberty & Pinehurst Golf)',
      tier: 1,
      desc: 'Fort Liberty (one of the largest military installations in world), US Open golf championship capital Pinehurst, and longleaf pine forests.',
      counties: ['Cumberland', 'Moore', 'Hoke', 'Harnett', 'Robeson']
    }
  ],

  // =========================================================================
  // GEORGIA (GA)
  // =========================================================================
  'GA': [
    {
      id: 'GA-metro-atlanta',
      name: 'Metro Atlanta',
      fullName: 'Metro Atlanta (Fulton, Gwinnett, Cobb, DeKalb & Core Counties)',
      tier: 1,
      desc: 'Economic hub of the American Southeast, Hartsfield-Jackson Airport (world\'s busiest airport), Fortune 500 headquarters (Coca-Cola, Home Depot, Delta).',
      counties: ['Fulton', 'Gwinnett', 'Cobb', 'DeKalb', 'Clayton', 'Cherokee', 'Forsyth', 'Henry', 'Douglas', 'Fayette', 'Coweta', 'Paulding']
    },
    {
      id: 'GA-coastal-georgia-savannah',
      name: 'Coastal Georgia',
      fullName: 'Coastal Georgia & Savannah (Historic Port & Golden Isles)',
      tier: 1,
      desc: 'Historic Savannah cobblestone squares, Port of Savannah container terminal, St. Simons Island, and Jekyll Island Club historic district.',
      counties: ['Chatham', 'Bryan', 'Effingham', 'Glynn', 'Camden', 'McIntosh']
    },
    {
      id: 'GA-north-georgia-mountains',
      name: 'North Georgia Mountains',
      fullName: 'North Georgia Mountains (Blue Ridge, Helen & Dahlonega)',
      tier: 1,
      desc: 'Blue Ridge Mountains, Chattahoochee National Forest, alpine village Helen, Georgia wine country, and Appalachian Trail southern terminus at Springer Mountain.',
      counties: ['Fannin', 'Gilmer', 'Union', 'Towns', 'Rabun', 'White', 'Lumpkin', 'Habersham']
    },
    {
      id: 'GA-augusta-csra',
      name: 'Augusta & CSRA',
      fullName: 'Augusta & Central Savannah River Area (Masters Golf & Cyber Hub)',
      tier: 1,
      desc: 'Augusta National Golf Club (The Masters Tournament), US Army Cyber Center of Excellence at Fort Eisenhower, and medical research.',
      counties: ['Richmond', 'Columbia', 'Burke', 'McDuffie']
    },
    {
      id: 'GA-central-georgia-macon',
      name: 'Central Georgia',
      fullName: 'Central Georgia (Macon & Robins AFB / Warner Robins)',
      tier: 1,
      desc: 'Ocmulgee Mounds National Historical Park, Southern musical heritage (Allman Brothers, Otis Redding), and Robins Air Force Base.',
      counties: ['Bibb', 'Houston', 'Peach', 'Jones', 'Monroe']
    },
    {
      id: 'GA-columbus-chattahoochee',
      name: 'Columbus & Chattahoochee',
      fullName: 'Columbus & Chattahoochee Valley (Fort Moore & RiverWalk)',
      tier: 1,
      desc: 'Longest urban whitewater rafting course in world on Chattahoochee River, Fort Moore (Maneuver Center of Excellence), and Aflac headquarters.',
      counties: ['Muscogee', 'Harris', 'Chattahoochee', 'Troup']
    },
    {
      id: 'GA-south-georgia-valdosta',
      name: 'South Georgia',
      fullName: 'South Georgia (Valdosta, Albany & Agricultural Belt)',
      tier: 1,
      desc: 'World pecan and peanut capital, Moody Air Force Base, Marine Corps Logistics Base Albany, and wild quail plantations.',
      counties: ['Lowndes', 'Thomas', 'Dougherty', 'Tift', 'Colquitt']
    }
  ],

  // =========================================================================
  // ARIZONA (AZ)
  // =========================================================================
  'AZ': [
    {
      id: 'AZ-phoenix-metro',
      name: 'Phoenix Metro',
      fullName: 'Phoenix Metropolitan Area (Valley of the Sun)',
      tier: 1,
      desc: 'Fast-growing desert metropolis, semiconductor manufacturing hub (TSMC, Intel), Scottsdale luxury resorts, and vibrant East/West Valley communities.',
      counties: ['Maricopa', 'Pinal']
    },
    {
      id: 'AZ-tucson-southern',
      name: 'Tucson & Southern Arizona',
      fullName: 'Tucson & Southern Arizona (Optics Valley & Sonoran Desert)',
      tier: 1,
      desc: 'University of Arizona, Saguaro National Park, aerospace and defense (Raytheon, Davis-Monthan AFB), and UNESCO City of Gastronomy.',
      counties: ['Pima', 'Santa Cruz', 'Cochise']
    },
    {
      id: 'AZ-northern-flagstaff-sedona',
      name: 'Northern Arizona',
      fullName: 'Northern Arizona (Flagstaff, Sedona & Grand Canyon)',
      tier: 1,
      desc: 'Grand Canyon National Park (one of the 7 natural wonders of world), Sedona red rock vortexes, San Francisco Peaks, and historic Route 66 in Flagstaff.',
      counties: ['Coconino', 'Yavapai', 'Navajo', 'Apache']
    },
    {
      id: 'AZ-western-colorado-river',
      name: 'Western Arizona',
      fullName: 'Western Arizona (Lake Havasu City, Yuma & Colorado River)',
      tier: 1,
      desc: 'Historic London Bridge at Lake Havasu, winter vegetable capital Yuma, Colorado River water sports, and desert off-roading.',
      counties: ['Mohave', 'La Paz', 'Yuma']
    }
  ],

  // =========================================================================
  // COLORADO (CO)
  // =========================================================================
  'CO': [
    {
      id: 'CO-front-range',
      name: 'Front Range Corridor',
      fullName: 'Front Range Urban Corridor (Denver, Boulder & Springs)',
      tier: 1,
      desc: 'The heavily populated eastern base of the Rocky Mountains where 85% of Colorado\'s population and economy resides.',
      counties: ['Denver', 'Arapahoe', 'Jefferson', 'Adams', 'Douglas', 'Broomfield', 'Boulder', 'Larimer', 'Weld', 'El Paso']
    },
    {
      id: 'CO-denver-metro',
      name: 'Greater Denver Metro',
      fullName: 'Greater Denver Metropolitan Area (Mile High City)',
      tier: 1,
      desc: 'Colorado State Capitol, Denver Tech Center, aerospace and telecommunications headquarters, Red Rocks Amphitheatre, and Denver International Airport.',
      counties: ['Denver', 'Arapahoe', 'Jefferson', 'Adams', 'Douglas', 'Broomfield']
    },
    {
      id: 'CO-boulder-northern',
      name: 'Boulder & Northern Colorado',
      fullName: 'Boulder & Northern Colorado (Fort Collins & Loveland)',
      tier: 1,
      desc: 'University of Colorado in Boulder, federal research labs (NOAA, NIST), craft brewing capital Fort Collins, and Rocky Mountain National Park gateway.',
      counties: ['Boulder', 'Larimer', 'Weld']
    },
    {
      id: 'CO-colorado-springs-pikes',
      name: 'Colorado Springs',
      fullName: 'Colorado Springs & Pikes Peak Region',
      tier: 1,
      desc: 'US Olympic & Paralympic Committee, US Air Force Academy, Peterson Space Force Base, Garden of the Gods, and Pikes Peak (America\'s Mountain).',
      counties: ['El Paso', 'Teller']
    },
    {
      id: 'CO-western-slope-mountains',
      name: 'Western Slope & Mountains',
      fullName: 'Western Slope & Mountain Ski Corridor (Vail, Aspen & Breckenridge)',
      tier: 1,
      desc: 'World-class Rocky Mountain ski resorts (Vail, Aspen, Breckenridge, Steamboat), Palisade peach orchards, and Colorado National Monument in Grand Junction.',
      counties: ['Mesa', 'Eagle', 'Pitkin', 'Summit', 'Garfield', 'Routt', 'Grand', 'Gunnison', 'La Plata']
    },
    {
      id: 'CO-pueblo-southern',
      name: 'Pueblo & Southern Colorado',
      fullName: 'Pueblo & Southern Colorado (Steel City & San Luis Valley)',
      tier: 1,
      desc: 'Historic steelmaking in Pueblo, famous Pueblo green chiles, Great Sand Dunes National Park, and Hispanic heritage in the high-altitude San Luis Valley.',
      counties: ['Pueblo', 'Fremont', 'Huerfano', 'Las Animas', 'Alamosa']
    }
  ],

  // =========================================================================
  // ILLINOIS (IL)
  // =========================================================================
  'IL': [
    {
      id: 'IL-chicagoland',
      name: 'Chicagoland',
      fullName: 'Chicagoland / Chicago Metropolitan Area',
      tier: 1,
      desc: 'Third largest metropolis in US, world financial futures exchanges (CME), Fortune 500 capital, architectural landmarks, and Lake Michigan shoreline.',
      counties: ['Cook', 'DuPage', 'Lake', 'Will', 'Kane', 'McHenry', 'Kendall']
    },
    {
      id: 'IL-cook-county-chicago',
      name: 'Chicago & Cook County',
      fullName: 'City of Chicago & Cook County Urban Core',
      tier: 2,
      parentRegion: 'Chicagoland',
      desc: 'The Loop, Magnificent Mile, Millennium Park, O\'Hare International Airport, and 77 vibrant community neighborhoods.',
      counties: ['Cook']
    },
    {
      id: 'IL-collar-counties',
      name: 'Chicago Collar Counties',
      fullName: 'Chicago Collar Counties (DuPage, Lake, Will, Kane & McHenry)',
      tier: 2,
      parentRegion: 'Chicagoland',
      desc: 'High-income residential suburbs, corporate research campuses (Fermi National Accelerator Lab, Argonne), and Lake Michigan North Shore.',
      counties: ['DuPage', 'Lake', 'Will', 'Kane', 'McHenry']
    },
    {
      id: 'IL-central-illinois',
      name: 'Central Illinois',
      fullName: 'Central Illinois (Peoria, Bloomington-Normal & Springfield)',
      tier: 1,
      desc: 'Abraham Lincoln presidential sites in Springfield, State Farm headquarters in Bloomington, Caterpillar heritage in Peoria, and fertile agricultural plains.',
      counties: ['Peoria', 'Tazewell', 'McLean', 'Woodford', 'Sangamon', 'Champaign', 'Macon']
    },
    {
      id: 'IL-metro-east-st-louis',
      name: 'Metro East (St. Louis)',
      fullName: 'Metro East (Illinois St. Louis Metropolitan Suburbs)',
      tier: 1,
      desc: 'Scott Air Force Base (US Transportation Command), Cahokia Mounds UNESCO World Heritage site, industrial shipping on the Mississippi River, and Edwardsville.',
      counties: ['Madison', 'St. Clair', 'Monroe', 'Clinton']
    },
    {
      id: 'IL-northern-rockford',
      name: 'Northern Illinois',
      fullName: 'Northern Illinois & Rockford',
      tier: 1,
      desc: 'Manufacturing and aerospace supplier hub in Rockford, Anderson Japanese Gardens, Northern Illinois University in DeKalb, and dairy farmlands.',
      counties: ['Winnebago', 'Boone', 'Ogle', 'DeKalb', 'Stephenson']
    },
    {
      id: 'IL-southern-illinois',
      name: 'Southern Illinois',
      fullName: 'Southern Illinois & Shawnee National Forest (Little Egypt)',
      tier: 1,
      desc: 'Shawnee National Forest, Garden of the Gods rock formations, Southern Illinois University in Carbondale, and confluence of Ohio and Mississippi rivers.',
      counties: ['Jackson', 'Williamson', 'Saline', 'Union', 'Johnson']
    }
  ],

  // =========================================================================
  // PENNSYLVANIA (PA)
  // =========================================================================
  'PA': [
    {
      id: 'PA-greater-philadelphia',
      name: 'Greater Philadelphia',
      fullName: 'Greater Philadelphia / Delaware Valley',
      tier: 1,
      desc: 'Independence Hall and Liberty Bell (birthplace of American democracy), University of Pennsylvania, Comcast headquarters, and affluent Main Line.',
      counties: ['Philadelphia', 'Montgomery', 'Bucks', 'Delaware', 'Chester']
    },
    {
      id: 'PA-greater-pittsburgh',
      name: 'Greater Pittsburgh',
      fullName: 'Greater Pittsburgh & Western Pennsylvania (Steel City Tech)',
      tier: 1,
      desc: 'Carnegie Mellon University robotics / AI hub, University of Pittsburgh medical system (UPMC), Three Rivers (Allegheny, Monongahela, Ohio), and 446 bridges.',
      counties: ['Allegheny', 'Westmoreland', 'Washington', 'Beaver', 'Butler', 'Fayette']
    },
    {
      id: 'PA-lehigh-valley',
      name: 'Lehigh Valley',
      fullName: 'Lehigh Valley (Allentown, Bethlehem & Easton)',
      tier: 1,
      desc: 'Historic Bethlehem steel heritage, Crayola headquarters in Easton, Lehigh University, and rapid e-commerce logistics distribution hub.',
      counties: ['Lehigh', 'Northampton']
    },
    {
      id: 'PA-poconos-northeast',
      name: 'Poconos & Northeast PA',
      fullName: 'Pocono Mountains & Northeastern Pennsylvania',
      tier: 1,
      desc: 'Pocono resort getaways, Lake Wallenpaupack, Delaware Water Gap National Recreation Area, Pocono Raceway, and year-round outdoor recreation.',
      counties: ['Monroe', 'Pike', 'Wayne', 'Carbon']
    },
    {
      id: 'PA-scranton-wilkes-barre',
      name: 'Scranton & Wyoming Valley',
      fullName: 'Scranton / Wilkes-Barre & Wyoming Valley',
      tier: 1,
      desc: 'Anthracite coal heritage, Steamtown National Historic Site, Mohegan Pennsylvania, and Susquehanna River valley communities.',
      counties: ['Lackawanna', 'Luzerne']
    },
    {
      id: 'PA-capital-susquehanna',
      name: 'Capital & Dutch Country',
      fullName: 'Capital Region & Pennsylvania Dutch Country (Harrisburg & Lancaster)',
      tier: 1,
      desc: 'State capitol in Harrisburg, Hershey chocolate world, historic Amish farmlands in Lancaster County, and York motorcycle manufacturing.',
      counties: ['Dauphin', 'Cumberland', 'York', 'Lancaster', 'Lebanon', 'Perry']
    },
    {
      id: 'PA-erie-northwest',
      name: 'Erie & Northwest PA',
      fullName: 'Erie & Northwest Pennsylvania (Great Lakes Gateway)',
      tier: 1,
      desc: 'Presque Isle State Park beaches on Lake Erie, commercial port, plastics manufacturing, and Allegheny National Forest.',
      counties: ['Erie', 'Crawford', 'Mercer', 'Venango']
    },
    {
      id: 'PA-central-state-college',
      name: 'Central Pennsylvania',
      fullName: 'Central Pennsylvania & Happy Valley (Penn State University)',
      tier: 1,
      desc: 'Penn State University flagship campus in State College (Happy Valley), Beaver Stadium, Horseshoe Curve in Altoona, and Little League World Series in Williamsport.',
      counties: ['Centre', 'Blair', 'Mifflin', 'Huntingdon', 'Lycoming']
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ENRICHED_STATE_REGIONS };
}
