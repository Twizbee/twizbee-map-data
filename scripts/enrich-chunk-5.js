/**
 * scripts/enrich-chunk-5.js
 *
 * Granular Macro & Metro Regional Definitions for Chunk 5:
 * Pacific Northwest, West Coast, Island & Northern New England:
 * OR, HI, AK, PR, ME, VT, NH, RI, DE, DC.
 */

const CHUNK_5_REGIONS = {
  // =========================================================================
  // OREGON (OR)
  // =========================================================================
  'OR': [
    // Tier 1: Macro-Regions
    {
      id: 'OR-portland-metro',
      name: 'Portland Metro',
      fullName: 'Portland Metropolitan Area & Silicon Forest',
      tier: 1,
      description: 'Oregon\'s economic engine: Nike world headquarters in Beaverton, Intel\'s largest global semiconductor research and manufacturing campus in Hillsboro, Powell\'s Books, and Mount Hood vistas.',
      counties: ['Multnomah', 'Washington', 'Clackamas', 'Columbia', 'Yamhill']
    },
    {
      id: 'OR-willamette-valley',
      name: 'Willamette Valley',
      fullName: 'Willamette Valley (Salem State Capital & Eugene / Ducks)',
      tier: 1,
      description: 'World-renowned Willamette Valley Pinot Noir wine AVA, Oregon state capitol in Salem, University of Oregon (TrackTown USA) in Eugene, and Oregon State University in Corvallis.',
      counties: ['Marion', 'Polk', 'Linn', 'Benton', 'Lane']
    },
    {
      id: 'OR-central-high-desert-bend',
      name: 'Central Oregon',
      fullName: 'Central Oregon & High Desert (Bend, Redmond & Mount Bachelor)',
      tier: 1,
      description: 'Outdoor recreation capital of the Pacific Northwest in Bend (300 days of sunshine, Mount Bachelor ski resort, Deschutes River fly fishing, and craft breweries).',
      counties: ['Deschutes', 'Crook', 'Jefferson']
    },
    {
      id: 'OR-southern-rogue-valley',
      name: 'Southern Oregon',
      fullName: 'Southern Oregon & Rogue Valley (Medford, Ashland & Crater Lake)',
      tier: 1,
      description: 'Crater Lake National Park (deepest lake in the US / pristine caldera sapphire water), Oregon Shakespeare Festival in Ashland, Harry & David orchards in Medford, and Rogue River rafting.',
      counties: ['Jackson', 'Josephine', 'Douglas', 'Klamath', 'Lake']
    },
    {
      id: 'OR-coast-columbia-gorge',
      name: 'Oregon Coast & Gorge',
      fullName: 'Oregon Coast & Columbia River Gorge (Haystack Rock to Multnomah Falls)',
      tier: 1,
      description: '363 miles of public coastline (Cannon Beach Haystack Rock, Tillamook Creamery cheese factory, historic Astoria), and Columbia River Gorge National Scenic Area waterfalls.',
      counties: ['Clatsop', 'Tillamook', 'Lincoln', 'Coos', 'Curry', 'Hood River', 'Wasco', 'Sherman', 'Gilliam', 'Morrow', 'Umatilla', 'Union', 'Wallowa', 'Baker', 'Grant', 'Wheeler', 'Harney', 'Malheur']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'OR-portland-multnomah-core',
      name: 'Portland & Multnomah Core',
      fullName: 'City of Portland & Multnomah County (Pearl District & Downtown)',
      tier: 2,
      parentRegion: 'Portland Metro',
      description: 'Willamette River bridges ("Bridgetown"), Pearl District galleries, Forest Park (one of the largest urban forest reserves in the country), and Pioneer Courthouse Square.',
      counties: ['Multnomah']
    },
    {
      id: 'OR-silicon-forest-washington-county',
      name: 'Silicon Forest / Washington County',
      fullName: 'Silicon Forest Core (Beaverton, Hillsboro & Tigard)',
      tier: 2,
      parentRegion: 'Portland Metro',
      description: 'Intel Ronler Acres high-volume chip foundries, Nike World Campus, high-tech engineering corridor, and scenic Chehalem Mountains wine foothills.',
      counties: ['Washington']
    },
    {
      id: 'OR-bend-deschutes-core',
      name: 'Bend & Deschutes County',
      fullName: 'Bend & Deschutes County (Cascade Lakes & Old Mill)',
      tier: 2,
      parentRegion: 'Central Oregon',
      description: 'Historic Old Mill District along the Deschutes River, Phil\'s Trail mountain biking, Mount Bachelor gateway, and craft brewery trail.',
      counties: ['Deschutes']
    }
  ],

  // =========================================================================
  // HAWAII (HI)
  // =========================================================================
  'HI': [
    // Tier 1: Macro-Regions
    {
      id: 'HI-oahu-honolulu',
      name: 'Oahu',
      fullName: 'Oahu / City & County of Honolulu (The Gathering Place)',
      tier: 1,
      description: 'State capital Honolulu, historic Iolani Palace (only royal palace on US soil), world-famous Waikiki Beach, Pearl Harbor National Memorial, and legendary North Shore big-wave surf.',
      counties: ['Honolulu']
    },
    {
      id: 'HI-maui-county',
      name: 'Maui County',
      fullName: 'Maui County (The Valley Isle, Molokai & Lanai)',
      tier: 1,
      description: 'Haleakala National Park sunrise above the clouds, Road to Hana waterfalls, Kaanapali and Wailea luxury resorts, humpback whale sanctuary, and plantation pineapple heritage.',
      counties: ['Maui', 'Kalawao']
    },
    {
      id: 'HI-hawaii-island-big-island',
      name: 'Hawaii Island (Big Island)',
      fullName: 'Hawaii Island / The Big Island (Volcanoes & Kona Coast)',
      tier: 1,
      description: 'Hawaii Volcanoes National Park (Kilauea active lava flows), snow-capped Mauna Kea world astronomy summit, sunny Kona coffee coast, and lush tropical Hilo waterfalls.',
      counties: ['Hawaii']
    },
    {
      id: 'HI-kauai-county',
      name: 'Kauai',
      fullName: 'Kauai / The Garden Isle (Napali Coast & Waimea Canyon)',
      tier: 1,
      description: 'Soaring emerald sea cliffs of the Napali Coast, Waimea Canyon ("The Grand Canyon of the Pacific"), Hanalei Bay, and lush tropical botanical preserves.',
      counties: ['Kauai']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'HI-honolulu-urban-core',
      name: 'Honolulu Urban Core',
      fullName: 'Honolulu Urban Core (Waikiki, Ala Moana & Downtown)',
      tier: 2,
      parentRegion: 'Oahu',
      description: 'Diamond Head state monument, Kalakaua Avenue luxury shopping in Waikiki, Ala Moana Center (world\'s largest open-air shopping center), and Kakaako street art district.',
      counties: ['Honolulu']
    }
  ],

  // =========================================================================
  // ALASKA (AK)
  // =========================================================================
  'AK': [
    // Tier 1: Macro-Regions
    {
      id: 'AK-southcentral',
      name: 'Southcentral Alaska',
      fullName: 'Southcentral Alaska (Anchorage, Mat-Su Valley & Kenai Peninsula)',
      tier: 1,
      description: 'Population center of Alaska encompassing Anchorage, Matanuska-Susitna agriculture, Kenai River world-record king salmon fishing, and Prince William Sound tidewater glaciers.',
      counties: ['Anchorage', 'Matanuska-Susitna', 'Kenai Peninsula', 'Valdez-Cordova']
    },
    {
      id: 'AK-interior',
      name: 'Interior Alaska',
      fullName: 'Interior Alaska (Fairbanks, Tanana Valley & Denali)',
      tier: 1,
      description: 'Denali National Park (North America\'s highest peak at 20,310 ft), Fairbanks Golden Heart City, University of Alaska Fairbanks, Fort Wainwright, and Aurora Borealis viewing.',
      counties: ['Fairbanks North Star', 'Denali', 'Southeast Fairbanks', 'Yukon-Koyukuk']
    },
    {
      id: 'AK-southeast',
      name: 'Southeast Alaska',
      fullName: 'Southeast Alaska & Inside Passage (Juneau Capital & Panhandle)',
      tier: 1,
      description: 'State capital Juneau (accessible only by sea or air), Mendenhall Glacier, Tongass National Forest (largest national forest in US), historic Ketchikan totem poles, and Sitka Russian heritage.',
      counties: ['Juneau', 'Ketchikan Gateway', 'Sitka', 'Petersburg', 'Wrangell', 'Haines', 'Skagway', 'Hoonah-Angoon', 'Prince of Wales-Hyder']
    },
    {
      id: 'AK-north-and-west',
      name: 'Northern & Western Alaska',
      fullName: 'Northern & Western Alaska (North Slope Oil & Bering Strait)',
      tier: 1,
      description: 'Prudhoe Bay and the Trans-Alaska Pipeline starting terminal on the Arctic Ocean, historic Iditarod Trail finish in Nome, Bristol Bay commercial wild sockeye salmon fishery, and Kodiak Island.',
      counties: ['North Slope', 'Northwest Arctic', 'Nome', 'Bethel', 'Kusilvak', 'Dillingham', 'Bristol Bay', 'Lake and Peninsula', 'Aleutians East', 'Aleutians West', 'Kodiak Island']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'AK-anchorage-municipality-core',
      name: 'Anchorage Municipality',
      fullName: 'Municipality of Anchorage (Downtown & Ted Stevens Cargo Hub)',
      tier: 2,
      parentRegion: 'Southcentral Alaska',
      description: 'Over 40% of Alaska\'s entire population, Ted Stevens Anchorage International Airport (one of the busiest air cargo airports in the world connecting Asia and North America), and Tony Knowles Coastal Trail.',
      counties: ['Anchorage']
    }
  ],

  // =========================================================================
  // PUERTO RICO (PR)
  // =========================================================================
  'PR': [
    // Tier 1: Macro-Regions
    {
      id: 'PR-san-juan-metro',
      name: 'San Juan Metro',
      fullName: 'San Juan Metropolitan Area (Old San Juan, Condado & Hato Rey)',
      tier: 1,
      description: 'Capital of Puerto Rico, historic 16th-century fortress Castillo San Felipe del Morro, Condado beachfront resorts, and Hato Rey "Golden Mile" banking financial center.',
      counties: ['San Juan', 'Bayamón', 'Carolina', 'Guaynabo', 'Trujillo Alto', 'Cataño']
    },
    {
      id: 'PR-northern-coast-porta-atlantico',
      name: 'Northern Coast',
      fullName: 'Northern Coast & Porta Atlántico (Arecibo & Karst Country)',
      tier: 1,
      description: 'Limestone mogotes and karst caves at Camuy River Cave Park, historic Arecibo observatory region, Atlantic Ocean surf breaks in Vega Baja, and pharmaceutical manufacturing.',
      counties: ['Arecibo', 'Camuy', 'Hatillo', 'Barceloneta', 'Florida', 'Manatí', 'Vega Baja', 'Vega Alta', 'Dorado', 'Toa Baja', 'Toa Alta']
    },
    {
      id: 'PR-western-porta-del-sol',
      name: 'Western Puerto Rico',
      fullName: 'Western Puerto Rico & Porta del Sol (Rincón Surf & Mayagüez)',
      tier: 1,
      description: 'World-class surfing in Rincón, bioluminescent bay in La Parguera, dramatic limestone cliffs and lighthouse in Cabo Rojo, and University of Puerto Rico at Mayagüez engineering campus.',
      counties: ['Mayagüez', 'Aguadilla', 'Rincón', 'Cabo Rojo', 'Aguada', 'Moca', 'Isabela', 'San Sebastián', 'Añasco', 'Hormigueros']
    },
    {
      id: 'PR-southern-porta-caribe',
      name: 'Southern Puerto Rico',
      fullName: 'Southern Puerto Rico & Porta Caribe (Ponce The Pearl of the South)',
      tier: 1,
      description: 'Historic city of Ponce (Parque de Bombas historic fire station, Ponce Museum of Art), Serrallés rum distillery (Don Q), Caribbean Sea harbor, and fertile coastal plains.',
      counties: ['Ponce', 'Juana Díaz', 'Santa Isabel', 'Salinas', 'Guayama', 'Peñuelas', 'Guayanilla', 'Yauco']
    },
    {
      id: 'PR-eastern-porta-antillas',
      name: 'Eastern Puerto Rico & Islands',
      fullName: 'Eastern Puerto Rico, El Yunque & Spanish Virgin Islands (Culebra & Vieques)',
      tier: 1,
      description: 'El Yunque National Forest (only tropical rainforest in US National Forest System), bioluminescent Mosquito Bay in Vieques, world-ranked Flamenco Beach in Culebra, and Fajardo marinas.',
      counties: ['Fajardo', 'Luquillo', 'Río Grande', 'Canóvanas', 'Loíza', 'Ceiba', 'Naguabo', 'Humacao', 'Yabucoa', 'Caguas', 'Gurabo', 'San Lorenzo', 'Juncos', 'Las Piedras', 'Culebra', 'Vieques']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'PR-san-juan-capital-core',
      name: 'San Juan Capital Core',
      fullName: 'City of San Juan & Historic District',
      tier: 2,
      parentRegion: 'San Juan Metro',
      description: 'Historic UNESCO World Heritage fortresses El Morro and San Cristóbal, pastel colonial cobblestone streets, Puerto Rico Convention Center, and Luis Muñoz Marín International Airport.',
      counties: ['San Juan']
    },
    {
      id: 'PR-mayaguez-porta-del-sol-core',
      name: 'Mayagüez & Western Coast',
      fullName: 'Mayagüez & Porta del Sol Coastal Hub',
      tier: 2,
      parentRegion: 'Western Puerto Rico',
      description: 'Historic Plaza Colón, Teatro Yagüez, Port of Mayagüez, coastal culinary strip in Joyuda (seafood capital), and Rincón surfing beaches.',
      counties: ['Mayagüez', 'Cabo Rojo']
    }
  ],

  // =========================================================================
  // MAINE (ME)
  // =========================================================================
  'ME': [
    // Tier 1: Macro-Regions
    {
      id: 'ME-southern-portland-metro',
      name: 'Southern Maine',
      fullName: 'Southern Maine & Greater Portland (Casco Bay & Coastal Beaches)',
      tier: 1,
      description: 'Maine\'s commercial and culinary hub in Portland (Old Port cobblestone district, Portland Head Light in Cape Elizabeth), sandy beaches in Ogunquit and York, and Kennebunkport.',
      counties: ['Cumberland', 'York']
    },
    {
      id: 'ME-midcoast-central-capital',
      name: 'Midcoast & Central Maine',
      fullName: 'Midcoast & Central Maine (Augusta State Capital, Rockland & Bangor)',
      tier: 1,
      description: 'Maine state capitol in Augusta, world lobster capital Rockland, sailing schooners in Camden harbor, University of Maine flagship in Orono, and LL Bean flagship in Freeport.',
      counties: ['Kennebec', 'Sagadahoc', 'Lincoln', 'Knox', 'Waldo', 'Androscoggin', 'Penobscot']
    },
    {
      id: 'ME-downeast-acadia-northwoods',
      name: 'Downeast & North Woods',
      fullName: 'Downeast, Acadia National Park & North Woods (Mount Desert Island)',
      tier: 1,
      description: 'Acadia National Park on Mount Desert Island (Cadillac Mountain, first place to see sunrise in US), Bar Harbor, Moosehead Lake, Mount Katahdin (Appalachian Trail northern terminus), and vast timberlands.',
      counties: ['Hancock', 'Washington', 'Aroostook', 'Piscataquis', 'Somerset', 'Franklin', 'Oxford']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'ME-greater-portland-cumberland-core',
      name: 'Greater Portland & Casco Bay',
      fullName: 'City of Portland & Cumberland County Core',
      tier: 2,
      parentRegion: 'Southern Maine',
      description: 'Bon Appétit restaurant city of the year, Casco Bay islands ferry terminal, craft brewing capital, and commercial marine working waterfront.',
      counties: ['Cumberland']
    }
  ],

  // =========================================================================
  // VERMONT (VT)
  // =========================================================================
  'VT': [
    // Tier 1: Macro-Regions
    {
      id: 'VT-champlain-valley-burlington',
      name: 'Champlain Valley',
      fullName: 'Champlain Valley & Greater Burlington (Lake Champlain & UVM)',
      tier: 1,
      description: 'Vermont\'s economic center along scenic Lake Champlain: Church Street Marketplace in Burlington, University of Vermont, Ben & Jerry\'s ice cream roots, and GlobalFoundries semiconductor fab in Essex Junction.',
      counties: ['Chittenden', 'Franklin', 'Grand Isle', 'Addison']
    },
    {
      id: 'VT-central-green-mountains',
      name: 'Central Vermont',
      fullName: 'Central Vermont & Green Mountains (Montpelier State Capital & Stowe)',
      tier: 1,
      description: 'Smallest state capital in the US (Montpelier, only state capital without a McDonald\'s), world-class skiing at Stowe Mountain Resort and Sugarbush, and pure Vermont maple syrup production.',
      counties: ['Washington', 'Lamoille', 'Orange', 'Rutland']
    },
    {
      id: 'VT-southern-vermont-manchester',
      name: 'Southern Vermont',
      fullName: 'Southern Vermont & Taconic Mountains (Manchester, Bennington & Brattleboro)',
      tier: 1,
      description: 'Historic Bennington Battle Monument, Hildene (Robert Todd Lincoln estate) in Manchester, Killington and Mount Snow ski resorts, and quintessential New England covered bridges.',
      counties: ['Windham', 'Bennington', 'Windsor']
    },
    {
      id: 'VT-northeast-kingdom-nek',
      name: 'Northeast Kingdom (NEK)',
      fullName: 'Northeast Kingdom of Vermont (St. Johnsbury, Jay Peak & Lake Memphremagog)',
      tier: 1,
      description: 'Vermont\'s most rural and untamed wilderness corner, Jay Peak deep-powder ski resort, Burke Mountain Kingdom Trails mountain biking, Fairbanks Museum, and craft artisan cheese.',
      counties: ['Caledonia', 'Essex', 'Orleans']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'VT-burlington-chittenden-core',
      name: 'Burlington & Chittenden Core',
      fullName: 'City of Burlington & Chittenden County Core',
      tier: 2,
      parentRegion: 'Champlain Valley',
      description: 'Lake Champlain waterfront bike path, South End arts district, Flynn Center for the Performing Arts, and historic college hill.',
      counties: ['Chittenden']
    }
  ],

  // =========================================================================
  // NEW HAMPSHIRE (NH)
  // =========================================================================
  'NH': [
    // Tier 1: Macro-Regions
    {
      id: 'NH-merrimack-valley-seacoast',
      name: 'Merrimack Valley & Seacoast',
      fullName: 'Southern New Hampshire & Seacoast (Manchester, Nashua & Portsmouth)',
      tier: 1,
      description: 'Economic heart of New Hampshire, Manchester-Boston Regional Airport, historic Portsmouth seaport and naval shipyard, defense electronics (BAE Systems), and no general sales or income tax.',
      counties: ['Hillsborough', 'Rockingham', 'Strafford', 'Merrimack']
    },
    {
      id: 'NH-lakes-monadnock',
      name: 'Lakes Region & Monadnock',
      fullName: 'Lakes Region & Monadnock (Lake Winnipesaukee, Concord & Keene)',
      tier: 1,
      description: 'Lake Winnipesaukee resort boating, Mount Monadnock (most-climbed mountain in North America), New Hampshire state house in Concord, and colonial college towns.',
      counties: ['Belknap', 'Cheshire', 'Sullivan']
    },
    {
      id: 'NH-white-mountains-north',
      name: 'White Mountains & North Woods',
      fullName: 'White Mountains & Great North Woods (Mount Washington & Franconia Notch)',
      tier: 1,
      description: 'Mount Washington (highest peak in Northeast at 6,288 ft / extreme weather observatory), Franconia Notch, world-class ski resorts (Bretton Woods, Loon), and vast northern wilderness.',
      counties: ['Grafton', 'Carroll', 'Coos']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'NH-manchester-nashua-core',
      name: 'Manchester & Nashua Core',
      fullName: 'Manchester & Nashua Urban Corridor (Hillsborough County)',
      tier: 2,
      parentRegion: 'Merrimack Valley & Seacoast',
      description: 'Historic Amoskeag textile millyard transformed into high-tech biotech labs (ARMI bio-fabrication), Currier Museum of Art, and retail commerce.',
      counties: ['Hillsborough']
    },
    {
      id: 'NH-portsmouth-seacoast-core',
      name: 'Portsmouth & Seacoast',
      fullName: 'Portsmouth & Seacoast Historic Harbor (Rockingham County)',
      tier: 2,
      parentRegion: 'Merrimack Valley & Seacoast',
      description: '18 miles of Atlantic coastline, Strawbery Banke Museum historic district, Market Square dining, and Hampton Beach state park.',
      counties: ['Rockingham']
    }
  ],

  // =========================================================================
  // RHODE ISLAND (RI)
  // =========================================================================
  'RI': [
    // Tier 1: Macro-Regions
    {
      id: 'RI-greater-providence',
      name: 'Greater Providence',
      fullName: 'Greater Providence & Blackstone Valley (Creative Capital & Ivy League)',
      tier: 1,
      description: 'Rhode Island state capitol, Brown University and RISD (Rhode Island School of Design), WaterFire festival, Federal Hill Italian dining, and Blackstone River Valley (birthplace of American Industrial Revolution).',
      counties: ['Providence', 'Bristol']
    },
    {
      id: 'RI-newport-aquidneck',
      name: 'Newport & Aquidneck Island',
      fullName: 'Newport & Aquidneck Island (Sailing Capital & Gilded Age Mansions)',
      tier: 1,
      description: 'Sailing capital of the world, Gilded Age Vanderbilt mansions (The Breakers, Marble House), Cliff Walk ocean trail, International Tennis Hall of Fame, and Naval War College.',
      counties: ['Newport']
    },
    {
      id: 'RI-south-county-beaches',
      name: 'South County & Coastal',
      fullName: 'South County & Coastal Rhode Island (Narragansett & Watch Hill)',
      tier: 1,
      description: 'Over 100 miles of coastline, Narragansett Town Beach surfing, Ocean House luxury resort in Watch Hill, Point Judith Block Island ferry terminal, and University of Rhode Island in Kingston.',
      counties: ['Washington']
    },
    {
      id: 'RI-kent-county-west-bay',
      name: 'Kent County & West Bay',
      fullName: 'Kent County & West Bay (Warwick & TF Green Airport)',
      tier: 1,
      description: 'Rhode Island T.F. Green International Airport, Goddard Memorial State Park on Greenwich Bay, historic East Greenwich main street, and distribution logistics.',
      counties: ['Kent']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'RI-providence-urban-core',
      name: 'City of Providence Core',
      fullName: 'City of Providence Urban Core (College Hill & Downtown)',
      tier: 2,
      parentRegion: 'Greater Providence',
      description: 'Providence Riverwalk, College Hill historic brick architecture, Rhode Island State House, and Providence Performing Arts Center.',
      counties: ['Providence']
    }
  ],

  // =========================================================================
  // DELAWARE (DE)
  // =========================================================================
  'DE': [
    // Tier 1: Macro-Regions
    {
      id: 'DE-new-castle-wilmington',
      name: 'New Castle County',
      fullName: 'New Castle County & Greater Wilmington (Corporate Capital & Brandywine)',
      tier: 1,
      description: 'Corporate capital of the world (over 65% of Fortune 500 companies are incorporated in Delaware), DuPont chemical heritage, Winterthur and Longwood gardens gateway, and University of Delaware in Newark.',
      counties: ['New Castle']
    },
    {
      id: 'DE-kent-dover-capital',
      name: 'Kent County',
      fullName: 'Kent County & Capital Region (Dover Air Force Base & State Capitol)',
      tier: 1,
      description: 'Delaware state capitol (first state to ratify the US Constitution), Dover Motor Speedway ("The Monster Mile" NASCAR), and Dover Air Force Base (Air Mobility Command / C-5 & C-17 cargo).',
      counties: ['Kent']
    },
    {
      id: 'DE-sussex-coastal-beaches',
      name: 'Sussex County & Beaches',
      fullName: 'Sussex County & Delaware Beaches (Rehoboth, Lewes & Bethany Beach)',
      tier: 1,
      description: 'Atlantic oceanfront boardwalk in Rehoboth Beach, historic Dutch settlement of Lewes, Cape Henlopen State Park, Cape May-Lewes Ferry, and massive poultry farming agribusiness (Perdue).',
      counties: ['Sussex']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'DE-wilmington-core',
      name: 'Wilmington Urban Core',
      fullName: 'City of Wilmington & Riverfront District',
      tier: 2,
      parentRegion: 'New Castle County',
      description: 'Christina Riverfront promenade, Chase Fieldhouse, Delaware Art Museum, Chancery Court legal hub, and Wilmington Amtrak train station.',
      counties: ['New Castle']
    }
  ],

  // =========================================================================
  // DISTRICT OF COLUMBIA (DC)
  // =========================================================================
  'DC': [
    // Tier 1: Macro-Regions
    {
      id: 'DC-district-of-columbia',
      name: 'District of Columbia',
      fullName: 'District of Columbia (National Capital & Federal District)',
      tier: 1,
      description: 'Seat of the United States federal government, The White House, US Capitol, National Mall, Smithsonian Institution museums, and international diplomatic embassies.',
      counties: ['District of Columbia']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'DC-federal-core',
      name: 'Federal Core & National Mall',
      fullName: 'Federal Core (National Mall, Capitol Hill & Downtown DC)',
      tier: 2,
      parentRegion: 'District of Columbia',
      description: 'Lincoln Memorial, Washington Monument, Smithsonian complex, Library of Congress, Supreme Court, and Pennsylvania Avenue corridor.',
      counties: ['District of Columbia']
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHUNK_5_REGIONS };
}
