/**
 * Master Catalog of Geographic, Advertising & Metropolitan Regions
 * Covers Macro-Regions (Tier 1) and Sub-Regions / Metros (Tier 2) across ALL 50 States, DC, and Puerto Rico.
 *
 * Each region is defined by its constituent counties so that:
 * 1. Vector geometry is stitched directly from 1:500k Census cartographic county boundaries
 * 2. Internal lines are dissolved using TopoJSON merge to produce 100% exact Google Maps outlines
 * 3. Exact bounding box and center are automatically computed
 * 4. All member ZIP codes are aggregated for direct ad targeting export (Meta, Google, Thumbtack)
 */

const MASTER_REGIONS = [
  {
    "id": "AK-interior",
    "name": "Interior Alaska",
    "fullName": "Interior Alaska (Fairbanks, Tanana Valley & Denali)",
    "state": "AK",
    "tier": 1,
    "parentRegion": null,
    "description": "Denali National Park (North America's highest peak at 20,310 ft), Fairbanks Golden Heart City, University of Alaska Fairbanks, Fort Wainwright, and Aurora Borealis viewing.",
    "googleUrl": "https://www.google.com/maps/place/Interior%20Alaska,+AK",
    "counties": [
      "Fairbanks North Star",
      "Denali",
      "Southeast Fairbanks",
      "Yukon-Koyukuk"
    ]
  },
  {
    "id": "AK-north-and-west",
    "name": "Northern & Western Alaska",
    "fullName": "Northern & Western Alaska (North Slope Oil & Bering Strait)",
    "state": "AK",
    "tier": 1,
    "parentRegion": null,
    "description": "Prudhoe Bay and the Trans-Alaska Pipeline starting terminal on the Arctic Ocean, historic Iditarod Trail finish in Nome, Bristol Bay commercial wild sockeye salmon fishery, and Kodiak Island.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20%26%20Western%20Alaska,+AK",
    "counties": [
      "North Slope",
      "Northwest Arctic",
      "Nome",
      "Bethel",
      "Kusilvak",
      "Dillingham",
      "Bristol Bay",
      "Lake and Peninsula",
      "Aleutians East",
      "Aleutians West",
      "Kodiak Island"
    ]
  },
  {
    "id": "AK-southcentral",
    "name": "Southcentral Alaska",
    "fullName": "Southcentral Alaska (Anchorage, Mat-Su Valley & Kenai Peninsula)",
    "state": "AK",
    "tier": 1,
    "parentRegion": null,
    "description": "Population center of Alaska encompassing Anchorage, Matanuska-Susitna agriculture, Kenai River world-record king salmon fishing, and Prince William Sound tidewater glaciers.",
    "googleUrl": "https://www.google.com/maps/place/Southcentral%20Alaska,+AK",
    "counties": [
      "Anchorage",
      "Matanuska-Susitna",
      "Kenai Peninsula",
      "Valdez-Cordova"
    ]
  },
  {
    "id": "AK-southeast",
    "name": "Southeast Alaska",
    "fullName": "Southeast Alaska & Inside Passage (Juneau Capital & Panhandle)",
    "state": "AK",
    "tier": 1,
    "parentRegion": null,
    "description": "State capital Juneau (accessible only by sea or air), Mendenhall Glacier, Tongass National Forest (largest national forest in US), historic Ketchikan totem poles, and Sitka Russian heritage.",
    "googleUrl": "https://www.google.com/maps/place/Southeast%20Alaska,+AK",
    "counties": [
      "Juneau",
      "Ketchikan Gateway",
      "Sitka",
      "Petersburg",
      "Wrangell",
      "Haines",
      "Skagway",
      "Hoonah-Angoon",
      "Prince of Wales-Hyder"
    ]
  },
  {
    "id": "AK-anchorage-municipality-core",
    "name": "Anchorage Municipality",
    "fullName": "Municipality of Anchorage (Downtown & Ted Stevens Cargo Hub)",
    "state": "AK",
    "tier": 2,
    "parentRegion": "Southcentral Alaska",
    "description": "Over 40% of Alaska's entire population, Ted Stevens Anchorage International Airport (one of the busiest air cargo airports in the world connecting Asia and North America), and Tony Knowles Coastal Trail.",
    "googleUrl": "https://www.google.com/maps/place/Anchorage%20Municipality,+AK",
    "counties": [
      "Anchorage"
    ]
  },
  {
    "id": "AL-central-birmingham-metro",
    "name": "Central Alabama",
    "fullName": "Central Alabama & Greater Birmingham (Magic City & Medical Center)",
    "state": "AL",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Alabama at Birmingham (UAB Medicine), Vulcan Park statue (world's largest cast iron statue), financial and banking hub, and automotive corridor.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Alabama,+AL",
    "counties": [
      "Jefferson",
      "Shelby",
      "St. Clair",
      "Blount",
      "Walker",
      "Bibb",
      "Chilton"
    ]
  },
  {
    "id": "AL-north-huntsville-rocket-city",
    "name": "North Alabama",
    "fullName": "North Alabama & Tennessee Valley (Rocket City Huntsville & The Shoals)",
    "state": "AL",
    "tier": 1,
    "parentRegion": null,
    "description": "NASA Marshall Space Flight Center, US Army Redstone Arsenal, Cummins Research Park (second largest in US), FBI campus, and Muscle Shoals music sound.",
    "googleUrl": "https://www.google.com/maps/place/North%20Alabama,+AL",
    "counties": [
      "Madison",
      "Limestone",
      "Morgan",
      "Marshall",
      "Lauderdale",
      "Colbert",
      "Jackson",
      "DeKalb",
      "Cullman",
      "Lawrence"
    ]
  },
  {
    "id": "AL-river-region-capital",
    "name": "River Region & Wiregrass",
    "fullName": "River Region & Wiregrass (Montgomery Capitol, Maxwell AFB & Dothan)",
    "state": "AL",
    "tier": 1,
    "parentRegion": null,
    "description": "Alabama state capitol, Civil Rights Memorial and Legacy Museum, Maxwell Air Force Base (Air University), Hyundai plant, and Dothan peanut capital.",
    "googleUrl": "https://www.google.com/maps/place/River%20Region%20%26%20Wiregrass,+AL",
    "counties": [
      "Montgomery",
      "Autauga",
      "Elmore",
      "Houston",
      "Dale",
      "Coffee",
      "Covington",
      "Pike",
      "Lee",
      "Russell",
      "Macon",
      "Bullock",
      "Dallas"
    ]
  },
  {
    "id": "AL-south-gulf-coast-mobile",
    "name": "South Alabama & Gulf Coast",
    "fullName": "South Alabama & Gulf Coast (Mobile Bay, Orange Beach & Gulf Shores)",
    "state": "AL",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic port city of Mobile (oldest Mardi Gras in US), Airbus A320/A220 aircraft manufacturing, and sugar-white quartz sand beaches on the Gulf.",
    "googleUrl": "https://www.google.com/maps/place/South%20Alabama%20%26%20Gulf%20Coast,+AL",
    "counties": [
      "Mobile",
      "Baldwin",
      "Escambia",
      "Washington",
      "Clarke",
      "Monroe",
      "Conecuh"
    ]
  },
  {
    "id": "AL-baldwin-gulf-shores",
    "name": "Baldwin County & Gulf Coast",
    "fullName": "Baldwin County (Gulf Shores, Orange Beach & Fairhope)",
    "state": "AL",
    "tier": 2,
    "parentRegion": "South Alabama & Gulf Coast",
    "description": "Fastest-growing county in Alabama, Gulf State Park, Perdido Pass, scenic Fairhope on Mobile Bay, and deep-sea sportfishing.",
    "googleUrl": "https://www.google.com/maps/place/Baldwin%20County%20%26%20Gulf%20Coast,+AL",
    "counties": [
      "Baldwin"
    ]
  },
  {
    "id": "AL-huntsville-madison-core",
    "name": "Huntsville & Madison",
    "fullName": "Huntsville & Madison County (Space & Defense Tech Capital)",
    "state": "AL",
    "tier": 2,
    "parentRegion": "North Alabama",
    "description": "Fastest-growing and largest city in Alabama, highest concentration of aerospace engineers in the US, and Saturn V rocket landmark.",
    "googleUrl": "https://www.google.com/maps/place/Huntsville%20%26%20Madison,+AL",
    "counties": [
      "Madison",
      "Limestone"
    ]
  },
  {
    "id": "AR-river-valley-fort-smith",
    "name": "Arkansas River Valley",
    "fullName": "Arkansas River Valley & Fort Smith (Mount Magazine & Ouachitas)",
    "state": "AR",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic frontier military post in Fort Smith, Ebbing Air National Guard Base (foreign pilot F-35 training), Mount Magazine (highest point in AR), and nuclear power at Russellville.",
    "googleUrl": "https://www.google.com/maps/place/Arkansas%20River%20Valley,+AR",
    "counties": [
      "Sebastian",
      "Crawford",
      "Pope",
      "Johnson",
      "Franklin",
      "Logan",
      "Yell",
      "Conway"
    ]
  },
  {
    "id": "AR-central-little-rock-capital",
    "name": "Central Arkansas",
    "fullName": "Central Arkansas & Greater Little Rock (State Capital & River Market)",
    "state": "AR",
    "tier": 1,
    "parentRegion": null,
    "description": "Arkansas state capitol, William J. Clinton Presidential Library, River Market entertainment district, Little Rock Air Force Base (C-130 fleet), and Simmons Bank Arena.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Arkansas,+AR",
    "counties": [
      "Pulaski",
      "Saline",
      "Faulkner",
      "Lonoke",
      "Garland",
      "White",
      "Grant",
      "Perry"
    ]
  },
  {
    "id": "AR-northeast-delta-jonesboro",
    "name": "Northeast Arkansas & Delta",
    "fullName": "Northeast Arkansas & Delta (Jonesboro & Mississippi River Alluvial Plain)",
    "state": "AR",
    "tier": 1,
    "parentRegion": null,
    "description": "Arkansas State University in Jonesboro, world's leading rice-growing region (Riceland Foods), Nucor steel mills along the Mississippi River in Blytheville, and agricultural exports.",
    "googleUrl": "https://www.google.com/maps/place/Northeast%20Arkansas%20%26%20Delta,+AR",
    "counties": [
      "Craighead",
      "Mississippi",
      "Crittenden",
      "Greene",
      "Poinsett",
      "Cross",
      "St. Francis",
      "Lee",
      "Phillips",
      "Clay",
      "Randolph",
      "Lawrence",
      "Jackson"
    ]
  },
  {
    "id": "AR-northwest-arkansas-nwa",
    "name": "Northwest Arkansas (NWA)",
    "fullName": "Northwest Arkansas (Bentonville, Fayetteville, Rogers & Springdale)",
    "state": "AR",
    "tier": 1,
    "parentRegion": null,
    "description": "One of America's fastest-growing corporate powerhouses: Walmart global HQ, Tyson Foods, J.B. Hunt Transport, Crystal Bridges Museum of American Art, and University of Arkansas.",
    "googleUrl": "https://www.google.com/maps/place/Northwest%20Arkansas%20(NWA),+AR",
    "counties": [
      "Benton",
      "Washington",
      "Carroll",
      "Madison"
    ]
  },
  {
    "id": "AR-south-timberlands-hot-springs",
    "name": "South Arkansas Timberlands",
    "fullName": "South Arkansas Timberlands & Ouachita Foothills (El Dorado & Texarkana)",
    "state": "AR",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Hot Springs National Park thermal bathhouses, Oaklawn racing and casino, vast pine timberlands, Murphy USA headquarters in El Dorado, and bromine chemical extraction.",
    "googleUrl": "https://www.google.com/maps/place/South%20Arkansas%20Timberlands,+AR",
    "counties": [
      "Union",
      "Miller",
      "Columbia",
      "Ouachita",
      "Clark",
      "Hot Spring",
      "Ashley",
      "Bradley",
      "Drew",
      "Chicot",
      "Desha",
      "Jefferson",
      "Cleveland",
      "Lincoln",
      "Dallas",
      "Calhoun",
      "Nevada",
      "Hempstead",
      "Lafayette",
      "Little River",
      "Sevier",
      "Howard",
      "Pike",
      "Montgomery",
      "Polk",
      "Scott"
    ]
  },
  {
    "id": "AR-bentonville-rogers-core",
    "name": "Bentonville & Rogers",
    "fullName": "Bentonville & Rogers (Walmart Global HQ & World Cycling Capital)",
    "state": "AR",
    "tier": 2,
    "parentRegion": "Northwest Arkansas (NWA)",
    "description": "Walmart Home Office, The Momentary modern art, hundreds of miles of mountain biking trails, and Beaver Lake shoreline.",
    "googleUrl": "https://www.google.com/maps/place/Bentonville%20%26%20Rogers,+AR",
    "counties": [
      "Benton"
    ]
  },
  {
    "id": "AR-fayetteville-springdale",
    "name": "Fayetteville & Springdale",
    "fullName": "Fayetteville & Springdale (University of Arkansas & Tyson Foods)",
    "state": "AR",
    "tier": 2,
    "parentRegion": "Northwest Arkansas (NWA)",
    "description": "Donald W. Reynolds Razorback Stadium, Dickson Street entertainment, Tyson Foods global HQ, and Shiloh Museum of Ozark History.",
    "googleUrl": "https://www.google.com/maps/place/Fayetteville%20%26%20Springdale,+AR",
    "counties": [
      "Washington"
    ]
  },
  {
    "id": "AZ-northern-high-country",
    "name": "Northern Arizona",
    "fullName": "Northern Arizona & High Country (Grand Canyon, Flagstaff & Sedona)",
    "state": "AZ",
    "tier": 1,
    "parentRegion": null,
    "description": "Grand Canyon National Park (Seven Natural Wonders of the World), red rock vortexes in Sedona, Northern Arizona University in Flagstaff, and ponderosa pine forests.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Arizona,+AZ",
    "counties": [
      "Coconino",
      "Yavapai",
      "Navajo",
      "Apache",
      "Gila"
    ]
  },
  {
    "id": "AZ-phoenix-metro",
    "name": "Phoenix Metro",
    "fullName": "Phoenix Metropolitan Area (Valley of the Sun)",
    "state": "AZ",
    "tier": 1,
    "parentRegion": null,
    "description": "Fast-growing desert metropolis, semiconductor manufacturing hub (TSMC, Intel), Scottsdale luxury resorts, and vibrant East/West Valley communities.",
    "googleUrl": "https://www.google.com/maps/place/Phoenix%20Metro,+AZ",
    "counties": [
      "Maricopa",
      "Pinal"
    ]
  },
  {
    "id": "AZ-tucson-southern",
    "name": "Tucson & Southern Arizona",
    "fullName": "Tucson & Southern Arizona (Optics Valley & Sonoran Desert)",
    "state": "AZ",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Arizona, international dark-sky astronomy observatories, Davis-Monthan AFB boneyard, Saguaro National Park, and border commerce.",
    "googleUrl": "https://www.google.com/maps/place/Tucson%20%26%20Southern%20Arizona,+AZ",
    "counties": [
      "Pima",
      "Cochise",
      "Santa Cruz",
      "Graham",
      "Greenlee"
    ]
  },
  {
    "id": "AZ-western-colorado-river",
    "name": "Western Arizona",
    "fullName": "Western Arizona & Colorado River Corridor (Yuma & Lake Havasu)",
    "state": "AZ",
    "tier": 1,
    "parentRegion": null,
    "description": "Winter salad bowl agriculture capital in Yuma, London Bridge in Lake Havasu City, Hoover Dam recreation, and Colorado River boating.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Arizona,+AZ",
    "counties": [
      "Yuma",
      "Mohave",
      "La Paz"
    ]
  },
  {
    "id": "AZ-phoenix-maricopa-core",
    "name": "Phoenix & Maricopa Core",
    "fullName": "City of Phoenix & Maricopa County Core",
    "state": "AZ",
    "tier": 2,
    "parentRegion": "Phoenix Metro",
    "description": "Downtown Phoenix biomedical campus, Roosevelt Row arts, Sky Harbor International Airport, Biltmore financial district, and Camelback Mountain.",
    "googleUrl": "https://www.google.com/maps/place/Phoenix%20%26%20Maricopa%20Core,+AZ",
    "counties": [
      "Maricopa"
    ]
  },
  {
    "id": "AZ-tucson-pima-core",
    "name": "Tucson & Pima Core",
    "fullName": "Tucson & Pima County Core (Catalina Foothills & Downtown)",
    "state": "AZ",
    "tier": 2,
    "parentRegion": "Tucson & Southern Arizona",
    "description": "Historic El Presidio district, UNESCO City of Gastronomy culinary corridor, Catalina Foothills resort enclaves, and Raytheon defense systems.",
    "googleUrl": "https://www.google.com/maps/place/Tucson%20%26%20Pima%20Core,+AZ",
    "counties": [
      "Pima"
    ]
  },
  {
    "id": "CA-central-california",
    "name": "Central California",
    "fullName": "Central California (Central Coast & San Joaquin Valley)",
    "state": "CA",
    "tier": 1,
    "description": "The middle third of California encompassing the agricultural heartland of the San Joaquin Valley and the coastal communities of the Central Coast.",
    "googleUrl": "https://www.google.com/maps/place/Central+California,+CA/@37.103743,-121.3354984,8z",
    "counties": [
      "Fresno",
      "Kern",
      "Kings",
      "Madera",
      "Mariposa",
      "Merced",
      "Monterey",
      "San Benito",
      "San Luis Obispo",
      "Santa Barbara",
      "Santa Cruz",
      "Stanislaus",
      "Tulare",
      "Tuolumne",
      "Calaveras",
      "San Joaquin",
      "Inyo",
      "Mono"
    ]
  },
  {
    "id": "CA-northern-california",
    "name": "Northern California",
    "fullName": "Northern California (NorCal)",
    "state": "CA",
    "tier": 1,
    "description": "Encompasses the San Francisco Bay Area, Greater Sacramento, Silicon Valley, Wine Country, North Coast, Central Coast North, and northern Sierra Nevada.",
    "googleUrl": "https://www.google.com/maps/place/Northern+California,+CA/@38.8683151,-122.704974,7z",
    "counties": [
      "Alameda",
      "Alpine",
      "Amador",
      "Butte",
      "Calaveras",
      "Colusa",
      "Contra Costa",
      "Del Norte",
      "El Dorado",
      "Glenn",
      "Humboldt",
      "Lake",
      "Lassen",
      "Marin",
      "Mariposa",
      "Mendocino",
      "Modoc",
      "Mono",
      "Monterey",
      "Napa",
      "Nevada",
      "Placer",
      "Plumas",
      "Sacramento",
      "San Benito",
      "San Francisco",
      "San Joaquin",
      "San Mateo",
      "Santa Clara",
      "Santa Cruz",
      "Shasta",
      "Sierra",
      "Siskiyou",
      "Solano",
      "Sonoma",
      "Stanislaus",
      "Sutter",
      "Tehama",
      "Trinity",
      "Tuolumne",
      "Yolo",
      "Yuba"
    ]
  },
  {
    "id": "CA-southern-california",
    "name": "Southern California",
    "fullName": "Southern California (SoCal)",
    "state": "CA",
    "tier": 1,
    "description": "Encompasses Greater Los Angeles, Orange County, San Diego Metro, the Inland Empire, Ventura, Santa Barbara, Kern, and Imperial counties.",
    "googleUrl": "https://www.google.com/maps/place/Southern+California,+CA/@34.1410998,-120.424914,7z",
    "counties": [
      "Imperial",
      "Kern",
      "Los Angeles",
      "Orange",
      "Riverside",
      "San Bernardino",
      "San Diego",
      "San Luis Obispo",
      "Santa Barbara",
      "Ventura"
    ]
  },
  {
    "id": "CA-central-coast",
    "name": "Central Coast",
    "fullName": "California Central Coast (Monterey, SLO & Santa Barbara)",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Central California",
    "description": "The scenic coastal region between Ventura County and the San Francisco Bay Area.",
    "counties": [
      "Monterey",
      "San Benito",
      "San Luis Obispo",
      "Santa Barbara",
      "Santa Cruz"
    ]
  },
  {
    "id": "CA-east-bay",
    "name": "East Bay",
    "fullName": "San Francisco East Bay (Alameda & Contra Costa)",
    "state": "CA",
    "tier": 2,
    "parentRegion": "San Francisco Bay Area",
    "description": "The eastern side of the San Francisco Bay encompassing Oakland, Berkeley, Fremont, and Walnut Creek.",
    "counties": [
      "Alameda",
      "Contra Costa"
    ]
  },
  {
    "id": "CA-gold-country",
    "name": "Gold Country & High Sierra",
    "fullName": "Gold Country, Lake Tahoe & High Sierra",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Northern California",
    "description": "Historic mother lode gold rush foothills and eastern alpine Sierra Nevada.",
    "counties": [
      "Amador",
      "Calaveras",
      "Tuolumne",
      "Mariposa",
      "Alpine",
      "Mono",
      "Inyo",
      "Nevada",
      "Sierra"
    ]
  },
  {
    "id": "CA-greater-los-angeles",
    "name": "Greater Los Angeles",
    "fullName": "Greater Los Angeles Metro (LA & Orange Counties)",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Southern California",
    "description": "The massive metropolitan basin encompassing Los Angeles and Orange counties.",
    "counties": [
      "Los Angeles",
      "Orange"
    ]
  },
  {
    "id": "CA-greater-sacramento",
    "name": "Greater Sacramento",
    "fullName": "Greater Sacramento / Capital Region",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Northern California",
    "description": "The political and metropolitan hub of California centered around the state capital.",
    "counties": [
      "Sacramento",
      "Yolo",
      "Placer",
      "El Dorado"
    ]
  },
  {
    "id": "CA-inland-empire",
    "name": "Inland Empire",
    "fullName": "Inland Empire (Riverside & San Bernardino Counties)",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Southern California",
    "description": "The expansive Southern California metropolitan area directly east of Los Angeles.",
    "counties": [
      "Riverside",
      "San Bernardino"
    ]
  },
  {
    "id": "CA-orange-county",
    "name": "Orange County",
    "fullName": "Orange County (Anaheim, Irvine, Newport Beach)",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Southern California",
    "description": "High-income coastal metropolitan region between Los Angeles and San Diego.",
    "counties": [
      "Orange"
    ]
  },
  {
    "id": "CA-san-diego-metro",
    "name": "San Diego Metro",
    "fullName": "San Diego County & Metropolitan Area",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Southern California",
    "description": "Southernmost coastal region spanning from the Mexico border to Camp Pendleton.",
    "counties": [
      "San Diego"
    ]
  },
  {
    "id": "CA-san-francisco-bay-area",
    "name": "San Francisco Bay Area",
    "fullName": "San Francisco Bay Area (9-County Region)",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Northern California",
    "description": "The major metropolitan region surrounding the San Francisco, San Pablo, and Suisun Bay estuaries.",
    "counties": [
      "Alameda",
      "Contra Costa",
      "Marin",
      "Napa",
      "San Francisco",
      "San Mateo",
      "Santa Clara",
      "Solano",
      "Sonoma"
    ]
  },
  {
    "id": "CA-peninsula",
    "name": "San Francisco Peninsula",
    "fullName": "San Francisco Peninsula (San Mateo County)",
    "state": "CA",
    "tier": 2,
    "parentRegion": "San Francisco Bay Area",
    "description": "The peninsula connecting San Francisco to Silicon Valley.",
    "counties": [
      "San Mateo"
    ]
  },
  {
    "id": "CA-san-joaquin-valley",
    "name": "San Joaquin Valley",
    "fullName": "San Joaquin Valley (Central Valley South)",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Central California",
    "description": "The agricultural powerhouse of California spanning eight counties from San Joaquin to Kern.",
    "counties": [
      "Fresno",
      "Kern",
      "Kings",
      "Madera",
      "Merced",
      "San Joaquin",
      "Stanislaus",
      "Tulare"
    ]
  },
  {
    "id": "CA-shasta-cascade",
    "name": "Shasta Cascade",
    "fullName": "Shasta Cascade & North State",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Northern California",
    "description": "The rugged northernmost region of California centered on Mount Shasta and Lassen Peak.",
    "counties": [
      "Shasta",
      "Tehama",
      "Butte",
      "Glenn",
      "Colusa",
      "Sutter",
      "Yuba",
      "Siskiyou",
      "Lassen",
      "Modoc",
      "Plumas"
    ]
  },
  {
    "id": "CA-silicon-valley",
    "name": "Silicon Valley",
    "fullName": "Silicon Valley - Santa Clara & San Mateo Tech Corridor",
    "state": "CA",
    "tier": 2,
    "parentRegion": "San Francisco Bay Area",
    "description": "Global tech hub spanning Santa Clara County, southern San Mateo County, southern Alameda County, and the Santa Cruz mountain border.",
    "counties": [
      "Santa Clara",
      "San Mateo",
      "Santa Cruz"
    ]
  },
  {
    "id": "CA-wine-country",
    "name": "Wine Country",
    "fullName": "California Wine Country & North Bay",
    "state": "CA",
    "tier": 2,
    "parentRegion": "Northern California",
    "description": "World-renowned viticultural region north of the Golden Gate.",
    "counties": [
      "Napa",
      "Sonoma",
      "Marin",
      "Mendocino",
      "Lake"
    ]
  },
  {
    "id": "CO-boulder-northern",
    "name": "Boulder & Northern Colorado",
    "fullName": "Boulder & Northern Colorado (Silicon Flatirons, Fort Collins & CSU)",
    "state": "CO",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Colorado Boulder, tech startup ecosystem, National Center for Atmospheric Research (NCAR), Fort Collins craft beer, and Rocky Mountain National Park.",
    "googleUrl": "https://www.google.com/maps/place/Boulder%20%26%20Northern%20Colorado,+CO",
    "counties": [
      "Boulder",
      "Larimer",
      "Weld"
    ]
  },
  {
    "id": "CO-colorado-springs",
    "name": "Colorado Springs",
    "fullName": "Colorado Springs & Pikes Peak Region (Olympic City USA)",
    "state": "CO",
    "tier": 1,
    "parentRegion": null,
    "description": "US Olympic & Paralympic Training Center, Garden of the Gods, US Air Force Academy, Peterson Space Force Base, and NORAD Cheyenne Mountain.",
    "googleUrl": "https://www.google.com/maps/place/Colorado%20Springs,+CO",
    "counties": [
      "El Paso",
      "Teller"
    ]
  },
  {
    "id": "CO-front-range",
    "name": "Front Range Corridor",
    "fullName": "Front Range Urban Corridor (Denver, Boulder & Springs)",
    "state": "CO",
    "tier": 1,
    "parentRegion": null,
    "description": "The heavily populated eastern base of the Rocky Mountains where 85% of Colorado's population and economy resides.",
    "googleUrl": "https://www.google.com/maps/place/Front%20Range%20Corridor,+CO",
    "counties": [
      "Denver",
      "Arapahoe",
      "Jefferson",
      "Adams",
      "Douglas",
      "Broomfield",
      "Boulder",
      "Larimer",
      "Weld",
      "El Paso"
    ]
  },
  {
    "id": "CO-greater-denver",
    "name": "Greater Denver Metro",
    "fullName": "Greater Denver Metropolitan Area (Mile High City)",
    "state": "CO",
    "tier": 1,
    "parentRegion": null,
    "description": "One mile above sea level, major aerospace (Lockheed Martin, Ball Aerospace), telecommunications, craft brewing, and energy capital.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Denver%20Metro,+CO",
    "counties": [
      "Denver",
      "Arapahoe",
      "Jefferson",
      "Adams",
      "Douglas",
      "Broomfield"
    ]
  },
  {
    "id": "CO-pueblo-southern",
    "name": "Pueblo & Southern Colorado",
    "fullName": "Pueblo & Southern Colorado (Steel City & San Luis Valley)",
    "state": "CO",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic steelmaking mills in Pueblo, Arkansas River green chile agriculture, Great Sand Dunes National Park, and historic Hispanic cultural roots.",
    "googleUrl": "https://www.google.com/maps/place/Pueblo%20%26%20Southern%20Colorado,+CO",
    "counties": [
      "Pueblo",
      "Fremont",
      "Alamosa",
      "Rio Grande",
      "Conejos",
      "Costilla",
      "Saguache",
      "Huerfano",
      "Las Animas",
      "Chaffee",
      "Custer"
    ]
  },
  {
    "id": "CO-western-slope-mountains",
    "name": "Western Slope & Mountains",
    "fullName": "Western Slope & Rocky Mountain Resorts (Vail, Aspen & Grand Junction)",
    "state": "CO",
    "tier": 1,
    "parentRegion": null,
    "description": "World-famous ski resorts (Vail, Aspen, Breckenridge, Steamboat, Telluride), Colorado River headwaters, Palisade peach orchards, and red rock canyons.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Slope%20%26%20Mountains,+CO",
    "counties": [
      "Eagle",
      "Pitkin",
      "Summit",
      "Routt",
      "Grand",
      "Mesa",
      "Garfield",
      "Gunnison",
      "Montrose",
      "San Miguel",
      "Ouray",
      "Delta",
      "Rio Blanco",
      "Moffat",
      "La Plata",
      "Montezuma",
      "Archuleta",
      "San Juan",
      "Dolores"
    ]
  },
  {
    "id": "CO-boulder-county-core",
    "name": "Boulder & Flatirons Core",
    "fullName": "Boulder County & Flatirons Innovation Belt",
    "state": "CO",
    "tier": 2,
    "parentRegion": "Boulder & Northern Colorado",
    "description": "Iconic sandstone Flatirons backdrop, Pearl Street pedestrian mall, Google Boulder campus, and federal scientific laboratories (NIST, NOAA).",
    "googleUrl": "https://www.google.com/maps/place/Boulder%20%26%20Flatirons%20Core,+CO",
    "counties": [
      "Boulder"
    ]
  },
  {
    "id": "CO-denver-county-core",
    "name": "Denver County Core",
    "fullName": "City & County of Denver (Downtown, LoDo & RiNo)",
    "state": "CO",
    "tier": 2,
    "parentRegion": "Greater Denver Metro",
    "description": "Colorado State Capitol, Lower Downtown (LoDo) historic warehouses, River North (RiNo) art district, Coors Field, and Ball Arena.",
    "googleUrl": "https://www.google.com/maps/place/Denver%20County%20Core,+CO",
    "counties": [
      "Denver"
    ]
  },
  {
    "id": "CT-eastern-mystic-casinos",
    "name": "Eastern Connecticut",
    "fullName": "Eastern Connecticut & Thames Valley (Mystic Seaport & Naval Submarine Base)",
    "state": "CT",
    "tier": 1,
    "parentRegion": null,
    "description": "Naval Submarine Base New London (\"Home of the Submarine Force\"), General Dynamics Electric Boat nuclear submarine shipyard, Mystic Aquarium, and Foxwoods / Mohegan Sun.",
    "googleUrl": "https://www.google.com/maps/place/Eastern%20Connecticut,+CT",
    "counties": [
      "New London",
      "Windham"
    ]
  },
  {
    "id": "CT-fairfield-gold-coast",
    "name": "Fairfield County",
    "fullName": "Fairfield County & The Gold Coast (Stamford, Greenwich & Bridgeport)",
    "state": "CT",
    "tier": 1,
    "parentRegion": null,
    "description": "Premier hedge fund and financial management hub, affluent Long Island Sound coastline, Metro-North express rail to Grand Central, and Greenwich estates.",
    "googleUrl": "https://www.google.com/maps/place/Fairfield%20County,+CT",
    "counties": [
      "Fairfield"
    ]
  },
  {
    "id": "CT-greater-hartford",
    "name": "Greater Hartford",
    "fullName": "Greater Hartford & Capital Region (Insurance Capital of the World)",
    "state": "CT",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Connecticut state capitol, global insurance headquarters (Travelers, Aetna, The Hartford), Pratt & Whitney aerospace, and Mark Twain House.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Hartford,+CT",
    "counties": [
      "Hartford",
      "Tolland"
    ]
  },
  {
    "id": "CT-greater-new-haven",
    "name": "Greater New Haven",
    "fullName": "Greater New Haven & Long Island Sound (Yale University & Coastal)",
    "state": "CT",
    "tier": 1,
    "parentRegion": null,
    "description": "Yale University, world-renowned New Haven-style apizza (Frank Pepe, Sally's), bioscience cluster, and Long Island Sound harbors.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20New%20Haven,+CT",
    "counties": [
      "New Haven",
      "Middlesex"
    ]
  },
  {
    "id": "CT-litchfield-hills",
    "name": "Litchfield Hills",
    "fullName": "Litchfield Hills & Northwest Highlands",
    "state": "CT",
    "tier": 1,
    "parentRegion": null,
    "description": "Scenic rolling hills, historic village greens, antique trails, covered bridges, Appalachian Trail, and picturesque country estates.",
    "googleUrl": "https://www.google.com/maps/place/Litchfield%20Hills,+CT",
    "counties": [
      "Litchfield"
    ]
  },
  {
    "id": "DC-district-of-columbia",
    "name": "District of Columbia",
    "fullName": "District of Columbia (National Capital & Federal District)",
    "state": "DC",
    "tier": 1,
    "parentRegion": null,
    "description": "Seat of the United States federal government, The White House, US Capitol, National Mall, Smithsonian Institution museums, and international diplomatic embassies.",
    "googleUrl": "https://www.google.com/maps/place/District%20of%20Columbia,+DC",
    "counties": [
      "District of Columbia"
    ]
  },
  {
    "id": "DC-federal-core",
    "name": "Federal Core & National Mall",
    "fullName": "Federal Core (National Mall, Capitol Hill & Downtown DC)",
    "state": "DC",
    "tier": 2,
    "parentRegion": "District of Columbia",
    "description": "Lincoln Memorial, Washington Monument, Smithsonian complex, Library of Congress, Supreme Court, and Pennsylvania Avenue corridor.",
    "googleUrl": "https://www.google.com/maps/place/Federal%20Core%20%26%20National%20Mall,+DC",
    "counties": [
      "District of Columbia"
    ]
  },
  {
    "id": "DE-kent-dover-capital",
    "name": "Kent County",
    "fullName": "Kent County & Capital Region (Dover Air Force Base & State Capitol)",
    "state": "DE",
    "tier": 1,
    "parentRegion": null,
    "description": "Delaware state capitol (first state to ratify the US Constitution), Dover Motor Speedway (\"The Monster Mile\" NASCAR), and Dover Air Force Base (Air Mobility Command / C-5 & C-17 cargo).",
    "googleUrl": "https://www.google.com/maps/place/Kent%20County,+DE",
    "counties": [
      "Kent"
    ]
  },
  {
    "id": "DE-new-castle-wilmington",
    "name": "New Castle County",
    "fullName": "New Castle County & Greater Wilmington (Corporate Capital & Brandywine)",
    "state": "DE",
    "tier": 1,
    "parentRegion": null,
    "description": "Corporate capital of the world (over 65% of Fortune 500 companies are incorporated in Delaware), DuPont chemical heritage, Winterthur and Longwood gardens gateway, and University of Delaware in Newark.",
    "googleUrl": "https://www.google.com/maps/place/New%20Castle%20County,+DE",
    "counties": [
      "New Castle"
    ]
  },
  {
    "id": "DE-sussex-coastal-beaches",
    "name": "Sussex County & Beaches",
    "fullName": "Sussex County & Delaware Beaches (Rehoboth, Lewes & Bethany Beach)",
    "state": "DE",
    "tier": 1,
    "parentRegion": null,
    "description": "Atlantic oceanfront boardwalk in Rehoboth Beach, historic Dutch settlement of Lewes, Cape Henlopen State Park, Cape May-Lewes Ferry, and massive poultry farming agribusiness (Perdue).",
    "googleUrl": "https://www.google.com/maps/place/Sussex%20County%20%26%20Beaches,+DE",
    "counties": [
      "Sussex"
    ]
  },
  {
    "id": "DE-wilmington-core",
    "name": "Wilmington Urban Core",
    "fullName": "City of Wilmington & Riverfront District",
    "state": "DE",
    "tier": 2,
    "parentRegion": "New Castle County",
    "description": "Christina Riverfront promenade, Chase Fieldhouse, Delaware Art Museum, Chancery Court legal hub, and Wilmington Amtrak train station.",
    "googleUrl": "https://www.google.com/maps/place/Wilmington%20Urban%20Core,+DE",
    "counties": [
      "New Castle"
    ]
  },
  {
    "id": "FL-capital-big-bend",
    "name": "Big Bend & Capital Region",
    "fullName": "Big Bend & Capital Region (Tallahassee & Apalachee Bay)",
    "state": "FL",
    "tier": 1,
    "parentRegion": null,
    "description": "Florida state capitol, Florida State University, Florida A&M, Apalachicola National Forest, and pristine coastline.",
    "googleUrl": "https://www.google.com/maps/place/Big%20Bend%20%26%20Capital%20Region,+FL",
    "counties": [
      "Leon",
      "Gadsden",
      "Wakulla",
      "Jefferson",
      "Franklin",
      "Liberty"
    ]
  },
  {
    "id": "FL-central-florida",
    "name": "Central Florida",
    "fullName": "Central Florida (Greater Orlando, I-4 Tech & Space Coast)",
    "state": "FL",
    "tier": 1,
    "parentRegion": null,
    "description": "Global tourism capital, simulation tech corridor, Kennedy Space Center, and rapid growth along the I-4 corridor.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Florida,+FL",
    "counties": [
      "Orange",
      "Seminole",
      "Osceola",
      "Lake",
      "Volusia",
      "Brevard",
      "Polk",
      "Sumter"
    ]
  },
  {
    "id": "FL-first-coast",
    "name": "First Coast",
    "fullName": "First Coast & Northeast Florida (Jacksonville & St. Augustine)",
    "state": "FL",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic St. Augustine (oldest continuously inhabited European city in US), deepwater Port of Jacksonville, naval bases, and Ponte Vedra.",
    "googleUrl": "https://www.google.com/maps/place/First%20Coast,+FL",
    "counties": [
      "Duval",
      "St. Johns",
      "Clay",
      "Nassau",
      "Baker",
      "Putnam",
      "Flagler"
    ]
  },
  {
    "id": "FL-emerald-coast-panhandle",
    "name": "Florida Panhandle",
    "fullName": "Florida Panhandle & Emerald Coast (Pensacola to Panama City)",
    "state": "FL",
    "tier": 1,
    "parentRegion": null,
    "description": "Sugar-white sand beaches, military aviation hubs (Eglin AFB, Pensacola NAS), Destin, 30A, and coastal fisheries.",
    "googleUrl": "https://www.google.com/maps/place/Florida%20Panhandle,+FL",
    "counties": [
      "Escambia",
      "Santa Rosa",
      "Okaloosa",
      "Walton",
      "Bay",
      "Washington",
      "Holmes",
      "Jackson",
      "Calhoun",
      "Gulf"
    ]
  },
  {
    "id": "FL-north-central-nature-coast",
    "name": "North Central Florida",
    "fullName": "North Central Florida & Nature Coast (Gainesville & Ocala)",
    "state": "FL",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Florida in Gainesville, world equestrian horse capital Ocala, freshwater natural springs, and rural timberlands.",
    "googleUrl": "https://www.google.com/maps/place/North%20Central%20Florida,+FL",
    "counties": [
      "Alachua",
      "Marion",
      "Citrus",
      "Levy",
      "Dixie",
      "Gilchrist",
      "Columbia",
      "Suwannee",
      "Lafayette",
      "Hamilton",
      "Madison",
      "Taylor",
      "Union",
      "Bradford"
    ]
  },
  {
    "id": "FL-south-florida",
    "name": "South Florida",
    "fullName": "South Florida (Miami, Fort Lauderdale & The Palm Beaches)",
    "state": "FL",
    "tier": 1,
    "parentRegion": null,
    "description": "The vibrant southeast Florida metropolitan powerhouse encompassing Miami-Dade, Broward, Palm Beach, and the Florida Keys.",
    "googleUrl": "https://www.google.com/maps/place/South%20Florida,+FL",
    "counties": [
      "Miami-Dade",
      "Broward",
      "Palm Beach",
      "Monroe"
    ]
  },
  {
    "id": "FL-southwest-florida",
    "name": "Southwest Florida",
    "fullName": "Southwest Florida (Cape Coral, Fort Myers & Naples)",
    "state": "FL",
    "tier": 1,
    "parentRegion": null,
    "description": "Sun-drenched Gulf Coast barrier islands (Sanibel, Captiva, Marco Island), affluent Naples, and booming Cape Coral.",
    "googleUrl": "https://www.google.com/maps/place/Southwest%20Florida,+FL",
    "counties": [
      "Lee",
      "Collier",
      "Charlotte",
      "Hendry",
      "Glades"
    ]
  },
  {
    "id": "FL-tampa-bay",
    "name": "Tampa Bay Area",
    "fullName": "Tampa Bay Area (Tampa, St. Petersburg & Clearwater)",
    "state": "FL",
    "tier": 1,
    "parentRegion": null,
    "description": "Financial, healthcare, defense (MacDill AFB), and Gulf Coast beach communities spanning Tampa Bay.",
    "googleUrl": "https://www.google.com/maps/place/Tampa%20Bay%20Area,+FL",
    "counties": [
      "Hillsborough",
      "Pinellas",
      "Pasco",
      "Hernando",
      "Manatee",
      "Sarasota"
    ]
  },
  {
    "id": "FL-cape-coral-fort-myers",
    "name": "Cape Coral - Fort Myers",
    "fullName": "Cape Coral - Fort Myers Metropolitan Area",
    "state": "FL",
    "tier": 2,
    "parentRegion": "Southwest Florida",
    "description": "Over 400 miles of navigable canals in Cape Coral, Thomas Edison & Henry Ford winter estates, and Gulf of Mexico barrier islands.",
    "googleUrl": "https://www.google.com/maps/place/Cape%20Coral%20-%20Fort%20Myers,+FL",
    "counties": [
      "Lee"
    ]
  },
  {
    "id": "FL-florida-keys",
    "name": "Florida Keys",
    "fullName": "Florida Keys & Monroe County (Key West, Marathon & Key Largo)",
    "state": "FL",
    "tier": 2,
    "parentRegion": "South Florida",
    "description": "Scenic Overseas Highway across 42 bridges, coral reef barrier reef, sportfishing, and historic Old Town Key West.",
    "googleUrl": "https://www.google.com/maps/place/Florida%20Keys,+FL",
    "counties": [
      "Monroe"
    ]
  },
  {
    "id": "FL-fort-lauderdale-broward",
    "name": "Fort Lauderdale / Broward",
    "fullName": "Greater Fort Lauderdale & Broward County",
    "state": "FL",
    "tier": 2,
    "parentRegion": "South Florida",
    "description": "\"Venice of America\" canal waterways, Port Everglades, Fort Lauderdale yachting capital, and suburban commercial centers.",
    "googleUrl": "https://www.google.com/maps/place/Fort%20Lauderdale%20%2F%20Broward,+FL",
    "counties": [
      "Broward"
    ]
  },
  {
    "id": "FL-greater-orlando",
    "name": "Greater Orlando",
    "fullName": "Greater Orlando Metropolitan Area (Orange, Seminole & Osceola)",
    "state": "FL",
    "tier": 2,
    "parentRegion": "Central Florida",
    "description": "Walt Disney World, Universal Orlando, UCF research park, downtown Orlando tech sector, and Lake Nona Medical City.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Orlando,+FL",
    "counties": [
      "Orange",
      "Seminole",
      "Osceola",
      "Lake"
    ]
  },
  {
    "id": "FL-lakeland-winter-haven",
    "name": "Lakeland - Winter Haven",
    "fullName": "Lakeland - Winter Haven Metro & Polk County",
    "state": "FL",
    "tier": 2,
    "parentRegion": "Central Florida",
    "description": "Major logistics and distribution fulfillment crossroads midway between Tampa and Orlando, Publix headquarters, and Legoland.",
    "googleUrl": "https://www.google.com/maps/place/Lakeland%20-%20Winter%20Haven,+FL",
    "counties": [
      "Polk"
    ]
  },
  {
    "id": "FL-greater-miami",
    "name": "Miami-Dade Metro",
    "fullName": "Greater Miami & Miami-Dade County (Brickell, South Beach & Doral)",
    "state": "FL",
    "tier": 2,
    "parentRegion": "South Florida",
    "description": "Gateway to the Americas, Brickell financial district, South Beach, PortMiami cruise capital, and Wynwood arts.",
    "googleUrl": "https://www.google.com/maps/place/Miami-Dade%20Metro,+FL",
    "counties": [
      "Miami-Dade"
    ]
  },
  {
    "id": "FL-naples-marco-island",
    "name": "Naples & Marco Island",
    "fullName": "Naples - Marco Island Metro & Collier County",
    "state": "FL",
    "tier": 2,
    "parentRegion": "Southwest Florida",
    "description": "Exclusive Fifth Avenue South dining, championship golf courses, Ten Thousand Islands gateway, and Everglades wildlife.",
    "googleUrl": "https://www.google.com/maps/place/Naples%20%26%20Marco%20Island,+FL",
    "counties": [
      "Collier"
    ]
  },
  {
    "id": "FL-palm-beach-gold-coast",
    "name": "Palm Beach & Gold Coast",
    "fullName": "Palm Beach County & The Gold Coast (Boca Raton to Jupiter)",
    "state": "FL",
    "tier": 2,
    "parentRegion": "South Florida",
    "description": "High-wealth financial migration hub (\"Wall Street South\"), luxury oceanfront estates, equestrian Wellington, and golf resorts.",
    "googleUrl": "https://www.google.com/maps/place/Palm%20Beach%20%26%20Gold%20Coast,+FL",
    "counties": [
      "Palm Beach"
    ]
  },
  {
    "id": "FL-space-coast",
    "name": "Space Coast",
    "fullName": "Space Coast & Brevard County (Cape Canaveral & Melbourne)",
    "state": "FL",
    "tier": 2,
    "parentRegion": "Central Florida",
    "description": "NASA Kennedy Space Center, Cape Canaveral Space Force Station, SpaceX/Blue Origin launch pads, and Melbourne aerospace.",
    "googleUrl": "https://www.google.com/maps/place/Space%20Coast,+FL",
    "counties": [
      "Brevard"
    ]
  },
  {
    "id": "FL-suncoast-sarasota-bradenton",
    "name": "The Suncoast",
    "fullName": "The Suncoast (Sarasota, Bradenton & Lakewood Ranch)",
    "state": "FL",
    "tier": 2,
    "parentRegion": "Tampa Bay Area",
    "description": "Siesta Key white quartz sand beaches, Ringling arts museum, master-planned Lakewood Ranch, and Bradenton waterfront.",
    "googleUrl": "https://www.google.com/maps/place/The%20Suncoast,+FL",
    "counties": [
      "Sarasota",
      "Manatee"
    ]
  },
  {
    "id": "FL-the-villages",
    "name": "The Villages & Sumter",
    "fullName": "The Villages & Sumter County (Active Adult Metro)",
    "state": "FL",
    "tier": 2,
    "parentRegion": "Central Florida",
    "description": "America's largest and fastest-growing master-planned active adult retirement community with over 130,000 residents.",
    "googleUrl": "https://www.google.com/maps/place/The%20Villages%20%26%20Sumter,+FL",
    "counties": [
      "Sumter"
    ]
  },
  {
    "id": "FL-treasure-coast",
    "name": "Treasure Coast",
    "fullName": "Treasure Coast (Port St. Lucie, Stuart & Vero Beach)",
    "state": "FL",
    "tier": 2,
    "parentRegion": "South Florida",
    "description": "Historic shipwreck Spanish galleons, Indian River Lagoon biodiversity, sailfish capital Stuart, and fast-growing Port St. Lucie.",
    "googleUrl": "https://www.google.com/maps/place/Treasure%20Coast,+FL",
    "counties": [
      "Martin",
      "St. Lucie",
      "Indian River"
    ]
  },
  {
    "id": "GA-augusta-csra",
    "name": "Augusta & CSRA",
    "fullName": "Augusta & Central Savannah River Area (Masters Golf & US Cyber Command)",
    "state": "GA",
    "tier": 1,
    "parentRegion": null,
    "description": "Home of The Masters golf tournament at Augusta National, Fort Eisenhower (US Army Cyber Center of Excellence), and Savannah River corridor.",
    "googleUrl": "https://www.google.com/maps/place/Augusta%20%26%20CSRA,+GA",
    "counties": [
      "Richmond",
      "Columbia",
      "Burke",
      "McDuffie",
      "Lincoln",
      "Warren",
      "Wilkes"
    ]
  },
  {
    "id": "GA-central-macon-athens",
    "name": "Central Georgia & Classic City",
    "fullName": "Central Georgia & Athens (Macon Crossroads & Classic City UGA)",
    "state": "GA",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Georgia in Athens, historic music roots in Macon (Allman Brothers, Otis Redding), Robins Air Force Base, and Georgia peach farmlands.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Georgia%20%26%20Classic%20City,+GA",
    "counties": [
      "Bibb",
      "Houston",
      "Clarke",
      "Oconee",
      "Peach",
      "Jones",
      "Monroe",
      "Baldwin",
      "Putnam",
      "Morgan",
      "Oglethorpe",
      "Madison",
      "Jackson",
      "Barrow",
      "Walton"
    ]
  },
  {
    "id": "GA-coastal-savannah",
    "name": "Coastal Georgia",
    "fullName": "Coastal Georgia & Historic Savannah (Port of Savannah & Golden Isles)",
    "state": "GA",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Savannah garden squares, SCAD arts, Port of Savannah (busiest container terminal in US Southeast), and Golden Isles barrier island resorts (St. Simons, Sea Island).",
    "googleUrl": "https://www.google.com/maps/place/Coastal%20Georgia,+GA",
    "counties": [
      "Chatham",
      "Bryan",
      "Effingham",
      "Glynn",
      "Camden",
      "McIntosh",
      "Liberty"
    ]
  },
  {
    "id": "GA-columbus-south-georgia",
    "name": "Columbus & South Georgia",
    "fullName": "Columbus, Chattahoochee Valley & South Georgia (Fort Moore & Peanuts)",
    "state": "GA",
    "tier": 1,
    "parentRegion": null,
    "description": "Aflac headquarters in Columbus, Fort Moore (Armor and Infantry School), world's longest urban whitewater course, and peanut/pecan agricultural empire.",
    "googleUrl": "https://www.google.com/maps/place/Columbus%20%26%20South%20Georgia,+GA",
    "counties": [
      "Muscogee",
      "Harris",
      "Chattahoochee",
      "Dougherty",
      "Lowndes",
      "Thomas",
      "Tift",
      "Colquitt",
      "Ware"
    ]
  },
  {
    "id": "GA-metro-atlanta",
    "name": "Metro Atlanta",
    "fullName": "Metro Atlanta (Core 12-County Economic Engine)",
    "state": "GA",
    "tier": 1,
    "parentRegion": null,
    "description": "Economic capital of the American South, Hartsfield-Jackson International Airport (world's busiest), Fortune 500 capital, and Georgia Tech.",
    "googleUrl": "https://www.google.com/maps/place/Metro%20Atlanta,+GA",
    "counties": [
      "Fulton",
      "Gwinnett",
      "Cobb",
      "DeKalb",
      "Clayton",
      "Cherokee",
      "Forsyth",
      "Henry",
      "Douglas",
      "Fayette",
      "Coweta",
      "Paulding"
    ]
  },
  {
    "id": "GA-north-georgia-mountains",
    "name": "North Georgia Mountains",
    "fullName": "North Georgia Mountains & Blue Ridge (Appalachian Trail Southern Terminus)",
    "state": "GA",
    "tier": 1,
    "parentRegion": null,
    "description": "Springer Mountain (Appalachian Trail start), Bavarian alpine town Helen, Lake Lanier, Lake Burton, apple orchards in Ellijay, and wine trail.",
    "googleUrl": "https://www.google.com/maps/place/North%20Georgia%20Mountains,+GA",
    "counties": [
      "Hall",
      "Dawson",
      "Lumpkin",
      "White",
      "Habersham",
      "Fannin",
      "Union",
      "Towns",
      "Rabun",
      "Gilmer",
      "Pickens"
    ]
  },
  {
    "id": "GA-atlanta-core",
    "name": "Atlanta Urban Core",
    "fullName": "Atlanta Urban Core (Fulton, DeKalb & Atlanta BeltLine)",
    "state": "GA",
    "tier": 2,
    "parentRegion": "Metro Atlanta",
    "description": "Downtown Atlanta, Midtown tech square, Buckhead financial district, Decatur, and the multi-mile Atlanta BeltLine transit/arts loop.",
    "googleUrl": "https://www.google.com/maps/place/Atlanta%20Urban%20Core,+GA",
    "counties": [
      "Fulton",
      "DeKalb"
    ]
  },
  {
    "id": "GA-north-atlanta-affluent",
    "name": "North Atlanta Tech Belt",
    "fullName": "North Atlanta Tech Corridor (Alpharetta, Roswell & Johns Creek)",
    "state": "GA",
    "tier": 2,
    "parentRegion": "Metro Atlanta",
    "description": "\"Technology City of the South\", elite public schools, corporate offices, master-planned neighborhoods, and Lake Windward.",
    "googleUrl": "https://www.google.com/maps/place/North%20Atlanta%20Tech%20Belt,+GA",
    "counties": [
      "Forsyth",
      "Cherokee"
    ]
  },
  {
    "id": "GA-savannah-historic-port",
    "name": "Savannah & Chatham",
    "fullName": "Savannah & Chatham County (Historic District & Port)",
    "state": "GA",
    "tier": 2,
    "parentRegion": "Coastal Georgia",
    "description": "22 historic park squares, Forsyth Park fountain, River Street cobblestones, Tybee Island beaches, and Gulfstream Aerospace.",
    "googleUrl": "https://www.google.com/maps/place/Savannah%20%26%20Chatham,+GA",
    "counties": [
      "Chatham"
    ]
  },
  {
    "id": "HI-hawaii-island-big-island",
    "name": "Hawaii Island (Big Island)",
    "fullName": "Hawaii Island / The Big Island (Volcanoes & Kona Coast)",
    "state": "HI",
    "tier": 1,
    "parentRegion": null,
    "description": "Hawaii Volcanoes National Park (Kilauea active lava flows), snow-capped Mauna Kea world astronomy summit, sunny Kona coffee coast, and lush tropical Hilo waterfalls.",
    "googleUrl": "https://www.google.com/maps/place/Hawaii%20Island%20(Big%20Island),+HI",
    "counties": [
      "Hawaii"
    ]
  },
  {
    "id": "HI-kauai-county",
    "name": "Kauai",
    "fullName": "Kauai / The Garden Isle (Napali Coast & Waimea Canyon)",
    "state": "HI",
    "tier": 1,
    "parentRegion": null,
    "description": "Soaring emerald sea cliffs of the Napali Coast, Waimea Canyon (\"The Grand Canyon of the Pacific\"), Hanalei Bay, and lush tropical botanical preserves.",
    "googleUrl": "https://www.google.com/maps/place/Kauai,+HI",
    "counties": [
      "Kauai"
    ]
  },
  {
    "id": "HI-maui-county",
    "name": "Maui County",
    "fullName": "Maui County (The Valley Isle, Molokai & Lanai)",
    "state": "HI",
    "tier": 1,
    "parentRegion": null,
    "description": "Haleakala National Park sunrise above the clouds, Road to Hana waterfalls, Kaanapali and Wailea luxury resorts, humpback whale sanctuary, and plantation pineapple heritage.",
    "googleUrl": "https://www.google.com/maps/place/Maui%20County,+HI",
    "counties": [
      "Maui",
      "Kalawao"
    ]
  },
  {
    "id": "HI-oahu-honolulu",
    "name": "Oahu",
    "fullName": "Oahu / City & County of Honolulu (The Gathering Place)",
    "state": "HI",
    "tier": 1,
    "parentRegion": null,
    "description": "State capital Honolulu, historic Iolani Palace (only royal palace on US soil), world-famous Waikiki Beach, Pearl Harbor National Memorial, and legendary North Shore big-wave surf.",
    "googleUrl": "https://www.google.com/maps/place/Oahu,+HI",
    "counties": [
      "Honolulu"
    ]
  },
  {
    "id": "HI-honolulu-urban-core",
    "name": "Honolulu Urban Core",
    "fullName": "Honolulu Urban Core (Waikiki, Ala Moana & Downtown)",
    "state": "HI",
    "tier": 2,
    "parentRegion": "Oahu",
    "description": "Diamond Head state monument, Kalakaua Avenue luxury shopping in Waikiki, Ala Moana Center (world's largest open-air shopping center), and Kakaako street art district.",
    "googleUrl": "https://www.google.com/maps/place/Honolulu%20Urban%20Core,+HI",
    "counties": [
      "Honolulu"
    ]
  },
  {
    "id": "IA-central-des-moines",
    "name": "Central Iowa",
    "fullName": "Central Iowa & Greater Des Moines (Insurance & Financial Hub)",
    "state": "IA",
    "tier": 1,
    "parentRegion": null,
    "description": "Iowa state capitol with 23-karat gold leaf dome, major global insurance and financial center (Principal Financial), Des Moines Art Center, and Iowa State Fair.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Iowa,+IA",
    "counties": [
      "Polk",
      "Dallas",
      "Warren",
      "Story",
      "Boone",
      "Jasper",
      "Marion",
      "Madison"
    ]
  },
  {
    "id": "IA-eastern-cedar-rapids-iowa-city",
    "name": "Eastern Iowa",
    "fullName": "Eastern Iowa (Cedar Rapids & Iowa City Corridor)",
    "state": "IA",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Iowa in Iowa City (UI Hospitals and Clinics / famed Writers' Workshop), Collins Aerospace engineering in Cedar Rapids, and Quaker Oats manufacturing.",
    "googleUrl": "https://www.google.com/maps/place/Eastern%20Iowa,+IA",
    "counties": [
      "Linn",
      "Johnson",
      "Benton",
      "Jones",
      "Iowa",
      "Washington",
      "Cedar"
    ]
  },
  {
    "id": "IA-quad-cities-mississippi",
    "name": "Quad Cities & Mississippi River",
    "fullName": "Quad Cities Iowa & Mississippi River Corridor (Davenport & Dubuque)",
    "state": "IA",
    "tier": 1,
    "parentRegion": null,
    "description": "Davenport and Bettendorf on Mississippi River, John Deere manufacturing, historic port of Dubuque, Field of Dreams movie site in Dyersville, and limestone river bluffs.",
    "googleUrl": "https://www.google.com/maps/place/Quad%20Cities%20%26%20Mississippi%20River,+IA",
    "counties": [
      "Scott",
      "Dubuque",
      "Clinton",
      "Muscatine",
      "Jackson",
      "Des Moines",
      "Lee"
    ]
  },
  {
    "id": "IA-western-siouxland-pottawattamie",
    "name": "Western Iowa",
    "fullName": "Western Iowa & Siouxland (Sioux City & Council Bluffs / Omaha East)",
    "state": "IA",
    "tier": 1,
    "parentRegion": null,
    "description": "Council Bluffs casino and data center corridor across from Omaha, Tyson Foods beef processing in Sioux City, Loess Hills National Scenic Byway, and corn/soy ag.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Iowa,+IA",
    "counties": [
      "Pottawattamie",
      "Woodbury",
      "Plymouth",
      "Sioux",
      "Harrison",
      "Mills",
      "Cass",
      "Page",
      "Fremont",
      "Montgomery"
    ]
  },
  {
    "id": "IA-des-moines-polk-core",
    "name": "Des Moines & Polk Core",
    "fullName": "Des Moines & Polk County (East Village & Downtown Skywalks)",
    "state": "IA",
    "tier": 2,
    "parentRegion": "Central Iowa",
    "description": "Historic East Village shopping, 4 miles of climate-controlled downtown skywalks, Pappajohn Sculpture Park, and Wells Fargo Arena.",
    "googleUrl": "https://www.google.com/maps/place/Des%20Moines%20%26%20Polk%20Core,+IA",
    "counties": [
      "Polk"
    ]
  },
  {
    "id": "ID-eastern-idaho-falls-pocatello",
    "name": "Eastern Idaho",
    "fullName": "Eastern Idaho & Snake River Plain (Idaho Falls & Pocatello)",
    "state": "ID",
    "tier": 1,
    "parentRegion": null,
    "description": "Idaho National Laboratory (nation's leading nuclear energy research lab), Idaho State University in Pocatello, famous Idaho Russet potato farmlands, and Grand Teton gateway.",
    "googleUrl": "https://www.google.com/maps/place/Eastern%20Idaho,+ID",
    "counties": [
      "Bonneville",
      "Bannock",
      "Bingham",
      "Jefferson",
      "Madison",
      "Fremont",
      "Teton",
      "Power",
      "Caribou",
      "Bear Lake",
      "Franklin",
      "Oneida",
      "Clark",
      "Lemhi",
      "Custer",
      "Butte"
    ]
  },
  {
    "id": "ID-magic-valley-twin-falls",
    "name": "Magic Valley & Sun Valley",
    "fullName": "Magic Valley & Wood River Valley (Twin Falls & Sun Valley Resort)",
    "state": "ID",
    "tier": 1,
    "parentRegion": null,
    "description": "Perrine Bridge BASE jumping over Snake River Canyon in Twin Falls, Shoshone Falls (\"Niagara of the West\"), Chobani world's largest yogurt plant, and iconic Sun Valley ski resort.",
    "googleUrl": "https://www.google.com/maps/place/Magic%20Valley%20%26%20Sun%20Valley,+ID",
    "counties": [
      "Twin Falls",
      "Jerome",
      "Blaine",
      "Cassia",
      "Minidoka",
      "Gooding",
      "Lincoln",
      "Camas"
    ]
  },
  {
    "id": "ID-north-panhandle-coeur-dalene",
    "name": "North Idaho Panhandle",
    "fullName": "North Idaho Panhandle & Coeur d'Alene (Lakes & Silver Valley)",
    "state": "ID",
    "tier": 1,
    "parentRegion": null,
    "description": "Pristine glacial lakes (Lake Coeur d'Alene, Lake Pend Oreille), Schweitzer Mountain ski resort in Sandpoint, historic Silver Valley mining, and Bitterroot Mountains.",
    "googleUrl": "https://www.google.com/maps/place/North%20Idaho%20Panhandle,+ID",
    "counties": [
      "Kootenai",
      "Bonner",
      "Boundary",
      "Shoshone",
      "Benewah",
      "Latah",
      "Nez Perce",
      "Lewis",
      "Clearwater",
      "Idaho"
    ]
  },
  {
    "id": "ID-treasure-valley-boise",
    "name": "Treasure Valley",
    "fullName": "Treasure Valley & Greater Boise (City of Trees & Tech Corridor)",
    "state": "ID",
    "tier": 1,
    "parentRegion": null,
    "description": "Idaho state capitol, Boise State University (blue turf Albertsons Stadium), Micron Technology global headquarters, Hewlett-Packard campus, and Boise River Greenbelt.",
    "googleUrl": "https://www.google.com/maps/place/Treasure%20Valley,+ID",
    "counties": [
      "Ada",
      "Canyon",
      "Gem",
      "Boise",
      "Owyhee",
      "Payette",
      "Elmore"
    ]
  },
  {
    "id": "ID-boise-ada-county-core",
    "name": "Boise & Ada County Core",
    "fullName": "City of Boise & Ada County Core (Downtown & Foothills)",
    "state": "ID",
    "tier": 2,
    "parentRegion": "Treasure Valley",
    "description": "Basque Block, Downtown Boise 8th Street restaurant corridor, Bogus Basin mountain recreation, and Ridge to Rivers foothills trail system.",
    "googleUrl": "https://www.google.com/maps/place/Boise%20%26%20Ada%20County%20Core,+ID",
    "counties": [
      "Ada"
    ]
  },
  {
    "id": "ID-coeur-dalene-kootenai-core",
    "name": "Coeur d'Alene & Kootenai",
    "fullName": "Coeur d'Alene & Kootenai County (Lake Coeur d'Alene & Resort)",
    "state": "ID",
    "tier": 2,
    "parentRegion": "North Idaho Panhandle",
    "description": "Floating green golf course at Coeur d'Alene Resort, Tubbs Hill lakeside park, Silverwood Theme Park, and scenic Spokane River outlet.",
    "googleUrl": "https://www.google.com/maps/place/Coeur%20d'Alene%20%26%20Kootenai,+ID",
    "counties": [
      "Kootenai"
    ]
  },
  {
    "id": "IL-central-illinois",
    "name": "Central Illinois",
    "fullName": "Central Illinois & Prairie State Heartland (Springfield & Peoria)",
    "state": "IL",
    "tier": 1,
    "parentRegion": null,
    "description": "State capital Springfield (Abraham Lincoln presidential home/tomb), University of Illinois at Urbana-Champaign (UIUC engineering), State Farm HQ in Bloomington, and Caterpillar heritage.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Illinois,+IL",
    "counties": [
      "Sangamon",
      "Peoria",
      "Champaign",
      "McLean",
      "Tazewell",
      "Macon",
      "Woodford",
      "De Witt",
      "Piatt",
      "Christian",
      "Logan",
      "Menard",
      "Mason"
    ]
  },
  {
    "id": "IL-chicagoland",
    "name": "Chicagoland",
    "fullName": "Chicagoland / Chicago Metropolitan Area",
    "state": "IL",
    "tier": 1,
    "parentRegion": null,
    "description": "Third largest metropolis in US, world financial futures exchanges (CME), Fortune 500 capital, architectural landmarks, and Lake Michigan shoreline.",
    "googleUrl": "https://www.google.com/maps/place/Chicagoland,+IL",
    "counties": [
      "Cook",
      "DuPage",
      "Lake",
      "Will",
      "Kane",
      "McHenry",
      "Kendall"
    ]
  },
  {
    "id": "IL-metro-east-st-louis",
    "name": "Metro East (St. Louis)",
    "fullName": "Metro East / Illinois St. Louis Metropolitan Area",
    "state": "IL",
    "tier": 1,
    "parentRegion": null,
    "description": "The Illinois suburbs of St. Louis, Cahokia Mounds UNESCO World Heritage Site (ancient pre-Columbian civilization), Scott Air Force Base (US TRANSCOM), and Mississippi River bridges.",
    "googleUrl": "https://www.google.com/maps/place/Metro%20East%20(St.%20Louis),+IL",
    "counties": [
      "Madison",
      "St. Clair",
      "Monroe",
      "Clinton",
      "Jersey",
      "Bond",
      "Macoupin",
      "Calhoun"
    ]
  },
  {
    "id": "IL-northern-illinois-rockford",
    "name": "Northern Illinois",
    "fullName": "Northern Illinois & Stateline (Rockford, DeKalb & Quad Cities)",
    "state": "IL",
    "tier": 1,
    "parentRegion": null,
    "description": "Aerospace manufacturing hub in Rockford, Northern Illinois University in DeKalb, John Deere world headquarters in Moline (Quad Cities), and Mississippi River bluffs.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Illinois,+IL",
    "counties": [
      "Winnebago",
      "Boone",
      "DeKalb",
      "Ogle",
      "Lee",
      "Stephenson",
      "Jo Daviess",
      "Carroll",
      "Whiteside",
      "Rock Island",
      "Henry",
      "Mercer",
      "LaSalle",
      "Grundy",
      "Kankakee"
    ]
  },
  {
    "id": "IL-southern-shawnee",
    "name": "Southern Illinois",
    "fullName": "Southern Illinois & Shawnee National Forest (Little Egypt & Carbondale)",
    "state": "IL",
    "tier": 1,
    "parentRegion": null,
    "description": "Southern Illinois University (SIU Carbondale), Shawnee National Forest (Garden of the Gods), Ohio & Mississippi River confluence in Cairo, and coal/winery country.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Illinois,+IL",
    "counties": [
      "Jackson",
      "Williamson",
      "Saline",
      "Union",
      "Johnson",
      "Pope",
      "Hardin",
      "Alexander",
      "Pulaski",
      "Massac",
      "Perry",
      "Franklin",
      "Hamilton",
      "White",
      "Jefferson",
      "Marion",
      "Clay",
      "Wayne",
      "Edwards",
      "Wabash"
    ]
  },
  {
    "id": "IL-chicago-cook-core",
    "name": "Chicago & Cook County",
    "fullName": "City of Chicago & Cook County Urban Core",
    "state": "IL",
    "tier": 2,
    "parentRegion": "Chicagoland",
    "description": "The Loop, Magnificent Mile, Willis Tower, Millennium Park, Navy Pier, O'Hare International Airport, and 77 historic neighborhood community areas.",
    "googleUrl": "https://www.google.com/maps/place/Chicago%20%26%20Cook%20County,+IL",
    "counties": [
      "Cook"
    ]
  },
  {
    "id": "IL-collar-counties",
    "name": "The Collar Counties",
    "fullName": "Chicago Collar Counties (DuPage, Lake, Will, Kane & McHenry)",
    "state": "IL",
    "tier": 2,
    "parentRegion": "Chicagoland",
    "description": "High-income suburban corporate corridors (Naperville, Schaumburg, Oak Brook), Argonne National Laboratory, Fermilab particle physics accelerator, and Lake Michigan North Shore.",
    "googleUrl": "https://www.google.com/maps/place/The%20Collar%20Counties,+IL",
    "counties": [
      "DuPage",
      "Lake",
      "Will",
      "Kane",
      "McHenry"
    ]
  },
  {
    "id": "IN-central-indianapolis-metro",
    "name": "Central Indiana",
    "fullName": "Central Indiana & Greater Indianapolis (Crossroads of America)",
    "state": "IN",
    "tier": 1,
    "parentRegion": null,
    "description": "Indianapolis Motor Speedway (Indy 500, world's largest single-day sporting event), Eli Lilly and Company global HQ, state government capital, and logistics crossroads.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Indiana,+IN",
    "counties": [
      "Marion",
      "Hamilton",
      "Hendricks",
      "Johnson",
      "Hancock",
      "Boone",
      "Morgan",
      "Shelby",
      "Madison"
    ]
  },
  {
    "id": "IN-north-fort-wayne-south-bend",
    "name": "Northern Indiana",
    "fullName": "Northern Indiana (Fort Wayne & South Bend / Notre Dame)",
    "state": "IN",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Notre Dame in South Bend, orthopedic medical device capital of the world in Warsaw (Zimmer Biomet), RV manufacturing capital in Elkhart, and Fort Wayne.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Indiana,+IN",
    "counties": [
      "Allen",
      "St. Joseph",
      "Elkhart",
      "Kosciusko",
      "Marshall",
      "Fulton",
      "Noble",
      "DeKalb",
      "Whitley",
      "Huntington",
      "Wells",
      "Adams",
      "Steuben",
      "LaGrange",
      "Wabash"
    ]
  },
  {
    "id": "IN-northwest-chicago-suburbs",
    "name": "Northwest Indiana (NWI)",
    "fullName": "Northwest Indiana & The Region (Chicago Suburbs & Lake Michigan)",
    "state": "IN",
    "tier": 1,
    "parentRegion": null,
    "description": "Indiana Dunes National Park, Gary and East Chicago steelworks (Cleveland-Cliffs), commuter rail directly into downtown Chicago, and BP Whiting Refinery.",
    "googleUrl": "https://www.google.com/maps/place/Northwest%20Indiana%20(NWI),+IN",
    "counties": [
      "Lake",
      "Porter",
      "LaPorte",
      "Newton",
      "Jasper",
      "Starke"
    ]
  },
  {
    "id": "IN-southern-bloomington-evansville",
    "name": "Southern Indiana",
    "fullName": "Southern Indiana & Ohio River Valley (Bloomington & Evansville)",
    "state": "IN",
    "tier": 1,
    "parentRegion": null,
    "description": "Indiana University flagship campus in Bloomington, limestone quarries (Empire State Building stone), Toyota Motor Manufacturing Indiana in Princeton, and Ohio River ports.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Indiana,+IN",
    "counties": [
      "Monroe",
      "Vanderburgh",
      "Clark",
      "Floyd",
      "Bartholomew",
      "Vigo",
      "Tippecanoe",
      "Dubois",
      "Warrick",
      "Gibson",
      "Posey",
      "Spencer",
      "Perry",
      "Crawford",
      "Harrison",
      "Washington",
      "Orange",
      "Lawrence",
      "Jackson",
      "Jennings",
      "Jefferson",
      "Switzerland",
      "Ohio",
      "Dearborn",
      "Ripley",
      "Franklin",
      "Decatur",
      "Brown",
      "Greene",
      "Sullivan",
      "Knox",
      "Daviess",
      "Martin",
      "Pike"
    ]
  },
  {
    "id": "IN-hamilton-carmel-fishers",
    "name": "Hamilton County Affluent Belt",
    "fullName": "Hamilton County (Carmel, Fishers, Noblesville & Westfield)",
    "state": "IN",
    "tier": 2,
    "parentRegion": "Central Indiana",
    "description": "Nationally recognized best places to live, Carmel Arts & Design District, roundabouts capital, Fishers Nickel Plate District, and Grand Park Sports Campus.",
    "googleUrl": "https://www.google.com/maps/place/Hamilton%20County%20Affluent%20Belt,+IN",
    "counties": [
      "Hamilton"
    ]
  },
  {
    "id": "IN-indianapolis-marion-core",
    "name": "Indianapolis & Marion Core",
    "fullName": "Indianapolis & Marion County (Monument Circle & Mass Ave)",
    "state": "IN",
    "tier": 2,
    "parentRegion": "Central Indiana",
    "description": "Soldiers and Sailors Monument, Lucas Oil Stadium, Gainbridge Fieldhouse, Wholesale District, and IUPUI campus.",
    "googleUrl": "https://www.google.com/maps/place/Indianapolis%20%26%20Marion%20Core,+IN",
    "counties": [
      "Marion"
    ]
  },
  {
    "id": "KS-kansas-city-metro",
    "name": "Kansas City Metro (KS)",
    "fullName": "Kansas City Kansas & Johnson County (Overland Park & Olathe)",
    "state": "KS",
    "tier": 1,
    "parentRegion": null,
    "description": "High-income Johnson County suburbs, corporate office campuses, Garmin global headquarters in Olathe, Kansas Speedway, and Sporting KC soccer.",
    "googleUrl": "https://www.google.com/maps/place/Kansas%20City%20Metro%20(KS),+KS",
    "counties": [
      "Johnson",
      "Wyandotte",
      "Leavenworth",
      "Miami"
    ]
  },
  {
    "id": "KS-topeka-lawrence-flint-hills",
    "name": "Topeka & Flint Hills",
    "fullName": "Topeka, Lawrence & The Flint Hills (State Capitol & Jayhawks)",
    "state": "KS",
    "tier": 1,
    "parentRegion": null,
    "description": "Kansas state capitol in Topeka, historic Brown v. Board of Education national site, University of Kansas (KU Jayhawks) in Lawrence, and Tallgrass Prairie National Preserve.",
    "googleUrl": "https://www.google.com/maps/place/Topeka%20%26%20Flint%20Hills,+KS",
    "counties": [
      "Shawnee",
      "Douglas",
      "Riley",
      "Pottawatomie",
      "Geary",
      "Lyon",
      "Wabaunsee",
      "Osage",
      "Franklin",
      "Chase",
      "Morris"
    ]
  },
  {
    "id": "KS-western-high-plains",
    "name": "Western Kansas",
    "fullName": "Western Kansas & High Plains (Dodge City, Garden City & Hays)",
    "state": "KS",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Wild West cowtown in Dodge City (Boot Hill Museum), vast high-yield grain wheat belts, massive beef cattle feedlots and packing, and Fort Hays State University.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Kansas,+KS",
    "counties": [
      "Ford",
      "Finney",
      "Ellis",
      "Seward",
      "Saline",
      "Barton",
      "Thomas",
      "Sherman",
      "Scott",
      "Grant",
      "Stevens",
      "Morton",
      "Gray",
      "Meade",
      "Hodgeman",
      "Ness",
      "Rush",
      "Pawnee",
      "Edwards",
      "Kiowa",
      "Comanche",
      "Clark"
    ]
  },
  {
    "id": "KS-wichita-south-central",
    "name": "Wichita & South Central",
    "fullName": "Wichita & South Central Kansas (Air Capital of the World)",
    "state": "KS",
    "tier": 1,
    "parentRegion": null,
    "description": "Global center of general aviation aircraft design and manufacturing (Textron Aviation, Cessna, Beechcraft, Learjet, Spirit AeroSystems), and Koch Industries HQ.",
    "googleUrl": "https://www.google.com/maps/place/Wichita%20%26%20South%20Central,+KS",
    "counties": [
      "Sedgwick",
      "Butler",
      "Harvey",
      "Reno",
      "Sumner",
      "Cowley",
      "McPherson"
    ]
  },
  {
    "id": "KS-johnson-county-affluent",
    "name": "Johnson County Tech Belt",
    "fullName": "Johnson County Suburbs (Overland Park, Leawood & Olathe)",
    "state": "KS",
    "tier": 2,
    "parentRegion": "Kansas City Metro (KS)",
    "description": "Consistently ranked among the top counties in America for public schools and quality of life, Corporate Woods business park, and Town Center Plaza.",
    "googleUrl": "https://www.google.com/maps/place/Johnson%20County%20Tech%20Belt,+KS",
    "counties": [
      "Johnson"
    ]
  },
  {
    "id": "KS-wichita-sedgwick-core",
    "name": "Wichita & Sedgwick Core",
    "fullName": "Wichita & Sedgwick County (Old Town & Keeper of the Plains)",
    "state": "KS",
    "tier": 2,
    "parentRegion": "Wichita & South Central",
    "description": "44-foot Keeper of the Plains statue at the confluence of the Big and Little Arkansas rivers, historic brick Old Town entertainment district, and Wichita State University.",
    "googleUrl": "https://www.google.com/maps/place/Wichita%20%26%20Sedgwick%20Core,+KS",
    "counties": [
      "Sedgwick"
    ]
  },
  {
    "id": "KY-bluegrass-lexington",
    "name": "Bluegrass Region",
    "fullName": "Bluegrass Region & Horse Country (Lexington & State Capital)",
    "state": "KY",
    "tier": 1,
    "parentRegion": null,
    "description": "Horse Capital of the World, Keeneland racecourse, Kentucky Bourbon Trail, University of Kentucky (Wildcats basketball), and state capitol in Frankfort.",
    "googleUrl": "https://www.google.com/maps/place/Bluegrass%20Region,+KY",
    "counties": [
      "Fayette",
      "Scott",
      "Woodford",
      "Jessamine",
      "Clark",
      "Bourbon",
      "Franklin",
      "Madison"
    ]
  },
  {
    "id": "KY-eastern-appalachian",
    "name": "Eastern Kentucky",
    "fullName": "Eastern Kentucky & Appalachian Coalfields (Red River Gorge & Country Music)",
    "state": "KY",
    "tier": 1,
    "parentRegion": null,
    "description": "Red River Gorge geological area world-class rock climbing, Natural Bridge State Resort Park, country music highway US-23, and Appalachian artisan crafts.",
    "googleUrl": "https://www.google.com/maps/place/Eastern%20Kentucky,+KY",
    "counties": [
      "Pike",
      "Floyd",
      "Harlan",
      "Perry",
      "Letcher",
      "Knott",
      "Bell"
    ]
  },
  {
    "id": "KY-louisville-metro",
    "name": "Greater Louisville",
    "fullName": "Greater Louisville & Falls of the Ohio (Derby City & Logistics)",
    "state": "KY",
    "tier": 1,
    "parentRegion": null,
    "description": "Churchill Downs (Kentucky Derby), Louisville Slugger museum, UPS Worldport global air hub, GE Appliances, and Ohio River waterfront.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Louisville,+KY",
    "counties": [
      "Jefferson",
      "Oldham",
      "Bullitt",
      "Shelby",
      "Spencer",
      "Henry"
    ]
  },
  {
    "id": "KY-northern-kentucky-cincinnati",
    "name": "Northern Kentucky",
    "fullName": "Northern Kentucky & South Cincinnati (Covington, Newport & CVG)",
    "state": "KY",
    "tier": 1,
    "parentRegion": null,
    "description": "Cincinnati/Northern Kentucky International Airport (CVG Amazon Air Hub), historic Roebling Suspension Bridge, Newport Aquarium, and Fidelity Investments.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Kentucky,+KY",
    "counties": [
      "Kenton",
      "Campbell",
      "Boone",
      "Grant",
      "Pendleton"
    ]
  },
  {
    "id": "KY-western-pennyrile",
    "name": "Western Kentucky",
    "fullName": "Western Kentucky & Pennyrile (Bowling Green & Owensboro)",
    "state": "KY",
    "tier": 1,
    "parentRegion": null,
    "description": "National Corvette Museum and GM Corvette assembly plant in Bowling Green, Mammoth Cave National Park (world's longest cave system), and western bluegrass barbecue.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Kentucky,+KY",
    "counties": [
      "Warren",
      "Daviess",
      "McCracken",
      "Christian",
      "Henderson",
      "Hopkins"
    ]
  },
  {
    "id": "KY-lexington-fayette-core",
    "name": "Lexington & Fayette Core",
    "fullName": "Lexington & Fayette County (Downtown & UK Campus)",
    "state": "KY",
    "tier": 2,
    "parentRegion": "Bluegrass Region",
    "description": "Thoroughbred horse farms, historic Victorian Square, Rupp Arena at Central Bank Center, and Kentucky Horse Park.",
    "googleUrl": "https://www.google.com/maps/place/Lexington%20%26%20Fayette%20Core,+KY",
    "counties": [
      "Fayette"
    ]
  },
  {
    "id": "KY-louisville-jefferson-core",
    "name": "Louisville & Jefferson Core",
    "fullName": "City of Louisville & Jefferson County (Downtown & Highlands)",
    "state": "KY",
    "tier": 2,
    "parentRegion": "Greater Louisville",
    "description": "Whiskey Row historic bourbon tasting rooms, Muhammad Ali Center, 4th Street Live!, and University of Louisville medical center.",
    "googleUrl": "https://www.google.com/maps/place/Louisville%20%26%20Jefferson%20Core,+KY",
    "counties": [
      "Jefferson"
    ]
  },
  {
    "id": "LA-acadiana-cajun",
    "name": "Acadiana / Cajun Country",
    "fullName": "Acadiana (Lafayette, Vermilion Bay & Bayou Teche)",
    "state": "LA",
    "tier": 1,
    "parentRegion": null,
    "description": "The cultural heartland of Cajun French heritage, Zydeco music, crawfish farming, Avery Island (Tabasco sauce factory), and offshore energy support.",
    "googleUrl": "https://www.google.com/maps/place/Acadiana%20%2F%20Cajun%20Country,+LA",
    "counties": [
      "Lafayette",
      "St. Martin",
      "Vermilion",
      "Iberia",
      "St. Mary",
      "Acadia",
      "St. Landry",
      "Evangeline"
    ]
  },
  {
    "id": "LA-capital-baton-rouge",
    "name": "Capital Region",
    "fullName": "Baton Rouge & Capital Region (LSU & Petrochemical Corridor)",
    "state": "LA",
    "tier": 1,
    "parentRegion": null,
    "description": "Louisiana state capitol (tallest state capitol in the US), Louisiana State University (LSU Tigers), and deepwater Mississippi River petrochemical processing.",
    "googleUrl": "https://www.google.com/maps/place/Capital%20Region,+LA",
    "counties": [
      "East Baton Rouge",
      "Ascension",
      "Livingston",
      "West Baton Rouge",
      "Iberville",
      "East Feliciana",
      "West Feliciana",
      "Pointe Coupee"
    ]
  },
  {
    "id": "LA-greater-new-orleans",
    "name": "Greater New Orleans",
    "fullName": "Greater New Orleans & Crescent City (French Quarter & Northshore)",
    "state": "LA",
    "tier": 1,
    "parentRegion": null,
    "description": "Global epicenter of jazz, Mardi Gras, Creole/Cajun cuisine, Port of New Orleans on the Mississippi River, Superdome, and Lake Pontchartrain Causeway.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20New%20Orleans,+LA",
    "counties": [
      "Orleans",
      "Jefferson",
      "St. Tammany",
      "St. Bernard",
      "Plaquemines",
      "St. Charles",
      "St. John the Baptist",
      "Tangipahoa",
      "Washington"
    ]
  },
  {
    "id": "LA-north-arklatex-shreveport",
    "name": "North Louisiana",
    "fullName": "North Louisiana & Ark-La-Tex (Shreveport-Bossier & Monroe)",
    "state": "LA",
    "tier": 1,
    "parentRegion": null,
    "description": "Barksdale Air Force Base (Air Force Global Strike Command / B-52 fleet), Red River casino gaming, CenturyLink/Lumen campus in Monroe, and timber.",
    "googleUrl": "https://www.google.com/maps/place/North%20Louisiana,+LA",
    "counties": [
      "Caddo",
      "Bossier",
      "Ouachita",
      "Lincoln",
      "Webster",
      "De Soto",
      "Bienville",
      "Claiborne",
      "Union",
      "Morehouse"
    ]
  },
  {
    "id": "LA-southwest-lake-charles",
    "name": "Southwest Louisiana",
    "fullName": "Southwest Louisiana (Lake Charles LNG & Petrochemical Port)",
    "state": "LA",
    "tier": 1,
    "parentRegion": null,
    "description": "Major global liquefied natural gas (LNG) export terminals, petrochemical refineries, casino resort properties, and Creole Nature Trail.",
    "googleUrl": "https://www.google.com/maps/place/Southwest%20Louisiana,+LA",
    "counties": [
      "Calcasieu",
      "Cameron",
      "Beauregard",
      "Allen",
      "Jefferson Davis"
    ]
  },
  {
    "id": "LA-baton-rouge-ebr-core",
    "name": "Baton Rouge & East Baton Rouge",
    "fullName": "Baton Rouge & East Baton Rouge Parish (Capitol & LSU)",
    "state": "LA",
    "tier": 2,
    "parentRegion": "Capital Region",
    "description": "Tiger Stadium, Mississippi River levee bike trail, state government complex, and ExxonMobil refinery.",
    "googleUrl": "https://www.google.com/maps/place/Baton%20Rouge%20%26%20East%20Baton%20Rouge,+LA",
    "counties": [
      "East Baton Rouge"
    ]
  },
  {
    "id": "LA-new-orleans-orleans-core",
    "name": "New Orleans / Orleans Parish",
    "fullName": "New Orleans Core (French Quarter, Garden District & Downtown)",
    "state": "LA",
    "tier": 2,
    "parentRegion": "Greater New Orleans",
    "description": "Bourbon Street, Jackson Square, historic St. Charles Avenue streetcars, Port of New Orleans, and Tulane University.",
    "googleUrl": "https://www.google.com/maps/place/New%20Orleans%20%2F%20Orleans%20Parish,+LA",
    "counties": [
      "Orleans"
    ]
  },
  {
    "id": "MA-central-mass",
    "name": "Central Massachusetts",
    "fullName": "Central Massachusetts & Greater Worcester",
    "state": "MA",
    "tier": 1,
    "parentRegion": null,
    "description": "New England's second largest city, UMass Chan Medical School, robotics, advanced manufacturing, and Wachusett Mountain.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Massachusetts,+MA",
    "counties": [
      "Worcester"
    ]
  },
  {
    "id": "MA-greater-boston",
    "name": "Greater Boston",
    "fullName": "Greater Boston & Route 128 Tech Corridor",
    "state": "MA",
    "tier": 1,
    "parentRegion": null,
    "description": "World capital of higher education (Harvard, MIT), premier biotech/life sciences innovation cluster, Kendall Square, and venture capital.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Boston,+MA",
    "counties": [
      "Suffolk",
      "Middlesex",
      "Norfolk",
      "Essex"
    ]
  },
  {
    "id": "MA-south-coast-cape",
    "name": "South Shore, Cape & Islands",
    "fullName": "South Shore, Cape Cod & The Islands",
    "state": "MA",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Plymouth Rock, scenic Cape Cod National Seashore, Martha's Vineyard and Nantucket elite island resorts, and New Bedford port.",
    "googleUrl": "https://www.google.com/maps/place/South%20Shore%2C%20Cape%20%26%20Islands,+MA",
    "counties": [
      "Plymouth",
      "Barnstable",
      "Bristol",
      "Dukes",
      "Nantucket"
    ]
  },
  {
    "id": "MA-western-mass-berkshires",
    "name": "Western Massachusetts",
    "fullName": "Western Massachusetts, Pioneer Valley & The Berkshires",
    "state": "MA",
    "tier": 1,
    "parentRegion": null,
    "description": "Five College Consortium (UMass Amherst, Smith, Amherst), Basketball Hall of Fame in Springfield, Tanglewood music festival, and Berkshire mountains.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Massachusetts,+MA",
    "counties": [
      "Hampden",
      "Hampshire",
      "Franklin",
      "Berkshire"
    ]
  },
  {
    "id": "MA-boston-cambridge-core",
    "name": "Boston & Cambridge Core",
    "fullName": "Boston & Cambridge Core (Suffolk County & Innovation District)",
    "state": "MA",
    "tier": 2,
    "parentRegion": "Greater Boston",
    "description": "Downtown Boston, Back Bay, Seaport Innovation District, Harvard & MIT campuses along the Charles River, and Fenway Park.",
    "googleUrl": "https://www.google.com/maps/place/Boston%20%26%20Cambridge%20Core,+MA",
    "counties": [
      "Suffolk"
    ]
  },
  {
    "id": "MA-cape-cod-islands",
    "name": "Cape Cod & The Islands",
    "fullName": "Cape Cod, Martha's Vineyard & Nantucket",
    "state": "MA",
    "tier": 2,
    "parentRegion": "South Shore, Cape & Islands",
    "description": "Iconic lighthouses, Cape Cod Canal, Provincetown arts colony, whaling heritage in Nantucket, and Edgartown harbor estates.",
    "googleUrl": "https://www.google.com/maps/place/Cape%20Cod%20%26%20The%20Islands,+MA",
    "counties": [
      "Barnstable",
      "Dukes",
      "Nantucket"
    ]
  },
  {
    "id": "MA-route-128-tech",
    "name": "Route 128 / MetroWest",
    "fullName": "Route 128 Tech Belt & MetroWest (Waltham, Newton & Framingham)",
    "state": "MA",
    "tier": 2,
    "parentRegion": "Greater Boston",
    "description": "\"America's Technology Highway\", premier corporate R&D campuses, Waltham robotics hub, and affluent residential suburbs.",
    "googleUrl": "https://www.google.com/maps/place/Route%20128%20%2F%20MetroWest,+MA",
    "counties": [
      "Middlesex",
      "Norfolk"
    ]
  },
  {
    "id": "MD-baltimore-metro",
    "name": "Greater Baltimore",
    "fullName": "Greater Baltimore & Central Maryland",
    "state": "MD",
    "tier": 1,
    "parentRegion": null,
    "description": "Johns Hopkins Hospital and University, Inner Harbor, Port of Baltimore, Fort McHenry (Star-Spangled Banner birthplace), and NSA / Fort Meade cybersecurity.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Baltimore,+MD",
    "counties": [
      "Baltimore",
      "Anne Arundel",
      "Howard",
      "Harford",
      "Carroll"
    ]
  },
  {
    "id": "MD-capital-region",
    "name": "Maryland DC Suburbs",
    "fullName": "Maryland National Capital Region (Montgomery & Prince George's)",
    "state": "MD",
    "tier": 1,
    "parentRegion": null,
    "description": "NIH & FDA federal health research campuses, Bethesda biomedical corridor, University of Maryland College Park, and affluent DC suburbs.",
    "googleUrl": "https://www.google.com/maps/place/Maryland%20DC%20Suburbs,+MD",
    "counties": [
      "Montgomery",
      "Prince George's",
      "Frederick"
    ]
  },
  {
    "id": "MD-eastern-shore",
    "name": "The Eastern Shore",
    "fullName": "Maryland Eastern Shore & Atlantic Coast (Ocean City & Chesapeake)",
    "state": "MD",
    "tier": 1,
    "parentRegion": null,
    "description": "Chesapeake Bay maritime tradition, world-famous Maryland blue crabs, historic St. Michaels sailing, and 10 miles of white sand Ocean City beaches.",
    "googleUrl": "https://www.google.com/maps/place/The%20Eastern%20Shore,+MD",
    "counties": [
      "Queen Anne's",
      "Talbot",
      "Dorchester",
      "Wicomico",
      "Worcester",
      "Somerset",
      "Caroline",
      "Kent",
      "Cecil"
    ]
  },
  {
    "id": "MD-western-southern",
    "name": "Western & Southern Maryland",
    "fullName": "Western Maryland & Southern Tidewater (Appalachians to Potomac)",
    "state": "MD",
    "tier": 1,
    "parentRegion": null,
    "description": "Deep Creek Lake mountain recreation in Garrett County, historic Cumberland C&O Canal, and Naval Air Station Patuxent River defense testing.",
    "googleUrl": "https://www.google.com/maps/place/Western%20%26%20Southern%20Maryland,+MD",
    "counties": [
      "Garrett",
      "Allegany",
      "Washington",
      "Charles",
      "Calvert",
      "St. Mary's"
    ]
  },
  {
    "id": "MD-annapolis-chesapeake",
    "name": "Annapolis & Anne Arundel",
    "fullName": "Annapolis, Anne Arundel & Chesapeake Bay (US Naval Academy)",
    "state": "MD",
    "tier": 2,
    "parentRegion": "Greater Baltimore",
    "description": "Maryland state capital, US Naval Academy on Severn River, sailing capital of America, and BWI Thurgood Marshall Airport.",
    "googleUrl": "https://www.google.com/maps/place/Annapolis%20%26%20Anne%20Arundel,+MD",
    "counties": [
      "Anne Arundel"
    ]
  },
  {
    "id": "MD-montgomery-biotech",
    "name": "Montgomery County / I-270",
    "fullName": "Montgomery County & I-270 Tech Corridor (Bethesda, Rockville & Gaithersburg)",
    "state": "MD",
    "tier": 2,
    "parentRegion": "Maryland DC Suburbs",
    "description": "\"DNA Valley\" biotechnology cluster, National Institutes of Health, Walter Reed Military Medical, and luxury shopping in Chevy Chase.",
    "googleUrl": "https://www.google.com/maps/place/Montgomery%20County%20%2F%20I-270,+MD",
    "counties": [
      "Montgomery"
    ]
  },
  {
    "id": "ME-downeast-acadia-northwoods",
    "name": "Downeast & North Woods",
    "fullName": "Downeast, Acadia National Park & North Woods (Mount Desert Island)",
    "state": "ME",
    "tier": 1,
    "parentRegion": null,
    "description": "Acadia National Park on Mount Desert Island (Cadillac Mountain, first place to see sunrise in US), Bar Harbor, Moosehead Lake, Mount Katahdin (Appalachian Trail northern terminus), and vast timberlands.",
    "googleUrl": "https://www.google.com/maps/place/Downeast%20%26%20North%20Woods,+ME",
    "counties": [
      "Hancock",
      "Washington",
      "Aroostook",
      "Piscataquis",
      "Somerset",
      "Franklin",
      "Oxford"
    ]
  },
  {
    "id": "ME-midcoast-central-capital",
    "name": "Midcoast & Central Maine",
    "fullName": "Midcoast & Central Maine (Augusta State Capital, Rockland & Bangor)",
    "state": "ME",
    "tier": 1,
    "parentRegion": null,
    "description": "Maine state capitol in Augusta, world lobster capital Rockland, sailing schooners in Camden harbor, University of Maine flagship in Orono, and LL Bean flagship in Freeport.",
    "googleUrl": "https://www.google.com/maps/place/Midcoast%20%26%20Central%20Maine,+ME",
    "counties": [
      "Kennebec",
      "Sagadahoc",
      "Lincoln",
      "Knox",
      "Waldo",
      "Androscoggin",
      "Penobscot"
    ]
  },
  {
    "id": "ME-southern-portland-metro",
    "name": "Southern Maine",
    "fullName": "Southern Maine & Greater Portland (Casco Bay & Coastal Beaches)",
    "state": "ME",
    "tier": 1,
    "parentRegion": null,
    "description": "Maine's commercial and culinary hub in Portland (Old Port cobblestone district, Portland Head Light in Cape Elizabeth), sandy beaches in Ogunquit and York, and Kennebunkport.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Maine,+ME",
    "counties": [
      "Cumberland",
      "York"
    ]
  },
  {
    "id": "ME-greater-portland-cumberland-core",
    "name": "Greater Portland & Casco Bay",
    "fullName": "City of Portland & Cumberland County Core",
    "state": "ME",
    "tier": 2,
    "parentRegion": "Southern Maine",
    "description": "Bon Appétit restaurant city of the year, Casco Bay islands ferry terminal, craft brewing capital, and commercial marine working waterfront.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Portland%20%26%20Casco%20Bay,+ME",
    "counties": [
      "Cumberland"
    ]
  },
  {
    "id": "MI-ann-arbor-washtenaw",
    "name": "Ann Arbor & Washtenaw",
    "fullName": "Ann Arbor & Greater Washtenaw (University of Michigan & Mobility)",
    "state": "MI",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Michigan flagship campus, Michigan Stadium (\"The Big House\"), autonomous vehicle testing proving grounds, and software startups.",
    "googleUrl": "https://www.google.com/maps/place/Ann%20Arbor%20%26%20Washtenaw,+MI",
    "counties": [
      "Washtenaw",
      "Monroe",
      "Lenawee",
      "Jackson"
    ]
  },
  {
    "id": "MI-metro-detroit",
    "name": "Metro Detroit",
    "fullName": "Metro Detroit & Southeast Michigan (Motor City Capital)",
    "state": "MI",
    "tier": 1,
    "parentRegion": null,
    "description": "Global epicenter of the automotive industry (General Motors, Ford, Stellantis), Detroit River international shipping to Canada, and motown music.",
    "googleUrl": "https://www.google.com/maps/place/Metro%20Detroit,+MI",
    "counties": [
      "Wayne",
      "Oakland",
      "Macomb",
      "Livingston",
      "St. Clair",
      "Lapeer"
    ]
  },
  {
    "id": "MI-mid-michigan-capital",
    "name": "Mid-Michigan & Tri-Cities",
    "fullName": "Mid-Michigan & Capital Region (Lansing, Flint & Saginaw)",
    "state": "MI",
    "tier": 1,
    "parentRegion": null,
    "description": "Michigan state capitol in Lansing, Michigan State University in East Lansing, Dow Chemical global headquarters in Midland, and auto assembly.",
    "googleUrl": "https://www.google.com/maps/place/Mid-Michigan%20%26%20Tri-Cities,+MI",
    "counties": [
      "Ingham",
      "Eaton",
      "Clinton",
      "Genesee",
      "Saginaw",
      "Bay",
      "Midland",
      "Shiawassee"
    ]
  },
  {
    "id": "MI-northern-lower-traverse",
    "name": "Northern Lower Michigan",
    "fullName": "Northern Lower Michigan (Traverse City & Sleeping Bear Dunes)",
    "state": "MI",
    "tier": 1,
    "parentRegion": null,
    "description": "Sleeping Bear Dunes National Lakeshore, National Cherry Festival in Traverse City, award-winning Old Mission/Leelanau wine AVAs, and Lake Michigan resorts.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Lower%20Michigan,+MI",
    "counties": [
      "Grand Traverse",
      "Leelanau",
      "Benzie",
      "Antrim",
      "Kalkaska",
      "Charlevoix",
      "Emmet",
      "Cheboygan",
      "Otsego",
      "Wexford",
      "Manistee"
    ]
  },
  {
    "id": "MI-upper-peninsula-up",
    "name": "The Upper Peninsula (U.P.)",
    "fullName": "Upper Peninsula of Michigan & Lake Superior Shoreline",
    "state": "MI",
    "tier": 1,
    "parentRegion": null,
    "description": "Pictured Rocks National Lakeshore, historic Mackinac Island (fudge and horses, no cars allowed), copper/iron mining heritage, and wild boreal forests.",
    "googleUrl": "https://www.google.com/maps/place/The%20Upper%20Peninsula%20(U.P.),+MI",
    "counties": [
      "Marquette",
      "Chippewa",
      "Houghton",
      "Delta",
      "Dickinson",
      "Menominee",
      "Gogebic",
      "Ontonagon",
      "Iron",
      "Baraga",
      "Keweenaw",
      "Luce",
      "Mackinac",
      "Schoolcraft",
      "Alger"
    ]
  },
  {
    "id": "MI-west-michigan-grand-rapids",
    "name": "West Michigan",
    "fullName": "West Michigan & Grand Rapids (Furniture City & Medical Mile)",
    "state": "MI",
    "tier": 1,
    "parentRegion": null,
    "description": "Grand Rapids Medical Mile research corridor, office furniture capital (Steelcase, Herman Miller), craft beer destination (\"Beer City USA\"), and Lake Michigan dunes.",
    "googleUrl": "https://www.google.com/maps/place/West%20Michigan,+MI",
    "counties": [
      "Kent",
      "Ottawa",
      "Muskegon",
      "Allegan",
      "Kalamazoo",
      "Van Buren",
      "Berrien",
      "Cass",
      "St. Joseph"
    ]
  },
  {
    "id": "MI-detroit-wayne-core",
    "name": "Detroit & Wayne County",
    "fullName": "Detroit Urban Core & Wayne County (Downtown & Riverwalk)",
    "state": "MI",
    "tier": 2,
    "parentRegion": "Metro Detroit",
    "description": "GM Renaissance Center, Campus Martius Park, Detroit Institute of Arts (Diego Rivera murals), Henry Ford Museum in Dearborn, and Ambassador Bridge.",
    "googleUrl": "https://www.google.com/maps/place/Detroit%20%26%20Wayne%20County,+MI",
    "counties": [
      "Wayne"
    ]
  },
  {
    "id": "MI-oakland-affluent-tech",
    "name": "Oakland County Automation Alley",
    "fullName": "Oakland County Automation Alley (Troy, Southfield & Rochester Hills)",
    "state": "MI",
    "tier": 2,
    "parentRegion": "Metro Detroit",
    "description": "One of America's premier automation and robotics engineering counties, Chrysler World Headquarters in Auburn Hills, and affluent Birmingham/Bloomfield Hills.",
    "googleUrl": "https://www.google.com/maps/place/Oakland%20County%20Automation%20Alley,+MI",
    "counties": [
      "Oakland"
    ]
  },
  {
    "id": "MN-central-western-prairie",
    "name": "Central & Western Minnesota",
    "fullName": "Central & Western Minnesota (St. Cloud, Moorhead & Farmlands)",
    "state": "MN",
    "tier": 1,
    "parentRegion": null,
    "description": "St. Cloud granite quarries on Mississippi River, fertile Red River Valley sugarbeet and wheat basin in Moorhead, and agricultural food processing.",
    "googleUrl": "https://www.google.com/maps/place/Central%20%26%20Western%20Minnesota,+MN",
    "counties": [
      "Stearns",
      "Benton",
      "Clay",
      "Otter Tail",
      "Douglas",
      "Crow Wing",
      "Blue Earth",
      "Nicollet",
      "Brown",
      "Kandiyohi",
      "Meeker",
      "McLeod",
      "Morrison",
      "Todd",
      "Mille Lacs",
      "Kanabec",
      "Pine",
      "Cass",
      "Hubbard",
      "Beltrami"
    ]
  },
  {
    "id": "MN-duluth-arrowhead",
    "name": "Duluth & The Arrowhead",
    "fullName": "Duluth, The Arrowhead & Lake Superior North Shore",
    "state": "MN",
    "tier": 1,
    "parentRegion": null,
    "description": "Port of Duluth-Superior (world's furthest-inland freshwater port), Aerial Lift Bridge, Boundary Waters Canoe Area Wilderness (BWCAW), and iron ore Range.",
    "googleUrl": "https://www.google.com/maps/place/Duluth%20%26%20The%20Arrowhead,+MN",
    "counties": [
      "St. Louis",
      "Lake",
      "Cook",
      "Carlton",
      "Itasca",
      "Koochiching",
      "Aitkin"
    ]
  },
  {
    "id": "MN-rochester-southeast",
    "name": "Rochester & Southeast MN",
    "fullName": "Rochester & Southeast Minnesota (Mayo Clinic Medical Capital)",
    "state": "MN",
    "tier": 1,
    "parentRegion": null,
    "description": "World-renowned Mayo Clinic global destination medical center, IBM Rochester computing legacy, and picturesque Mississippi River blufflands.",
    "googleUrl": "https://www.google.com/maps/place/Rochester%20%26%20Southeast%20MN,+MN",
    "counties": [
      "Olmsted",
      "Winona",
      "Goodhue",
      "Wabasha",
      "Fillmore",
      "Houston",
      "Mower",
      "Dodge",
      "Freeborn",
      "Steele",
      "Rice"
    ]
  },
  {
    "id": "MN-twin-cities-metro",
    "name": "Twin Cities Metro",
    "fullName": "Twin Cities Metropolitan Area (Minneapolis & Saint Paul)",
    "state": "MN",
    "tier": 1,
    "parentRegion": null,
    "description": "Major corporate headquarters powerhouse (Target, Best Buy, 3M, UnitedHealth Group, General Mills), Mall of America, Guthrie Theater, and 10,000 lakes.",
    "googleUrl": "https://www.google.com/maps/place/Twin%20Cities%20Metro,+MN",
    "counties": [
      "Hennepin",
      "Ramsey",
      "Dakota",
      "Anoka",
      "Washington",
      "Scott",
      "Carver",
      "Wright",
      "Sherburne",
      "Chisago"
    ]
  },
  {
    "id": "MN-minneapolis-hennepin-core",
    "name": "Minneapolis & Hennepin",
    "fullName": "Minneapolis Core & Hennepin County (Downtown & Chain of Lakes)",
    "state": "MN",
    "tier": 2,
    "parentRegion": "Twin Cities Metro",
    "description": "Skyway-connected downtown skyscrapers, Stone Arch Bridge overlooking St. Anthony Falls, Chain of Lakes (Bde Maka Ska, Harriet), and Target Field.",
    "googleUrl": "https://www.google.com/maps/place/Minneapolis%20%26%20Hennepin,+MN",
    "counties": [
      "Hennepin"
    ]
  },
  {
    "id": "MN-st-paul-ramsey-core",
    "name": "Saint Paul & Ramsey",
    "fullName": "Saint Paul & Ramsey County (State Capitol & Summit Avenue)",
    "state": "MN",
    "tier": 2,
    "parentRegion": "Twin Cities Metro",
    "description": "Cass Gilbert-designed Minnesota State Capitol, historic Summit Avenue Victorian mansions, Xcel Energy Center, and Science Museum of Minnesota.",
    "googleUrl": "https://www.google.com/maps/place/Saint%20Paul%20%26%20Ramsey,+MN",
    "counties": [
      "Ramsey"
    ]
  },
  {
    "id": "MO-central-columbia-capital",
    "name": "Central Missouri",
    "fullName": "Central Missouri & Lake of the Ozarks (Columbia & State Capital)",
    "state": "MO",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Missouri (Mizzou) in Columbia, state government capitol in Jefferson City, and Lake of the Ozarks boating playground with over 1,150 miles of shoreline.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Missouri,+MO",
    "counties": [
      "Boone",
      "Cole",
      "Callaway",
      "Miller",
      "Morgan",
      "Moniteau",
      "Cooper",
      "Audrain",
      "Pettis",
      "Saline",
      "Howard",
      "Osage",
      "Maries",
      "Phelps",
      "Pulaski"
    ]
  },
  {
    "id": "MO-greater-kansas-city",
    "name": "Greater Kansas City (MO)",
    "fullName": "Greater Kansas City Missouri (Jazz, BBQ & Country Club Plaza)",
    "state": "MO",
    "tier": 1,
    "parentRegion": null,
    "description": "World-famous Kansas City barbecue, historic 18th & Vine jazz district, Country Club Plaza Spanish architecture, Hallmark Cards HQ, and Cerner/Oracle healthcare.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Kansas%20City%20(MO),+MO",
    "counties": [
      "Jackson",
      "Clay",
      "Platte",
      "Cass",
      "Ray",
      "Clinton",
      "Lafayette"
    ]
  },
  {
    "id": "MO-greater-st-louis",
    "name": "Greater St. Louis",
    "fullName": "Greater St. Louis (Gateway to the West & Bio-Innovation)",
    "state": "MO",
    "tier": 1,
    "parentRegion": null,
    "description": "Iconic 630-foot stainless steel Gateway Arch National Park, Danforth Plant Science Center / ag-biotech hub, Anheuser-Busch brewery, and Washington University in St. Louis.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20St.%20Louis,+MO",
    "counties": [
      "St. Louis",
      "St. Charles",
      "Jefferson",
      "Franklin",
      "Lincoln",
      "Warren"
    ]
  },
  {
    "id": "MO-southwest-springfield-ozarks",
    "name": "Southwest Missouri & Ozarks",
    "fullName": "Southwest Missouri & The Ozarks (Springfield & Branson Entertainment)",
    "state": "MO",
    "tier": 1,
    "parentRegion": null,
    "description": "Bass Pro Shops flagship Grandaddy store in Springfield, Branson live theater entertainment strip and Silver Dollar City, and Table Rock Lake resort recreation.",
    "googleUrl": "https://www.google.com/maps/place/Southwest%20Missouri%20%26%20Ozarks,+MO",
    "counties": [
      "Greene",
      "Christian",
      "Taney",
      "Stone",
      "Jasper",
      "Newton",
      "Webster",
      "Polk",
      "Lawrence",
      "Barry",
      "Laclede",
      "Camden"
    ]
  },
  {
    "id": "MO-kansas-city-jackson-core",
    "name": "Kansas City & Jackson Core",
    "fullName": "Kansas City & Jackson County Core (Downtown & Plaza)",
    "state": "MO",
    "tier": 2,
    "parentRegion": "Greater Kansas City (MO)",
    "description": "Power & Light District, T-Mobile Center, National WWI Museum and Memorial at Liberty Memorial, and Union Station.",
    "googleUrl": "https://www.google.com/maps/place/Kansas%20City%20%26%20Jackson%20Core,+MO",
    "counties": [
      "Jackson"
    ]
  },
  {
    "id": "MO-st-louis-core",
    "name": "St. Louis City & Central Core",
    "fullName": "St. Louis City Core & Forest Park",
    "state": "MO",
    "tier": 2,
    "parentRegion": "Greater St. Louis",
    "description": "Gateway Arch, Busch Stadium (St. Louis Cardinals), Forest Park (1,300-acre park featuring free Saint Louis Zoo and Art Museum), and Central West End.",
    "googleUrl": "https://www.google.com/maps/place/St.%20Louis%20City%20%26%20Central%20Core,+MO",
    "counties": [
      "St. Louis"
    ]
  },
  {
    "id": "MS-greater-jackson-capital",
    "name": "Greater Jackson",
    "fullName": "Greater Jackson & Capital Region (Metro Jackson & Ross Barnett)",
    "state": "MS",
    "tier": 1,
    "parentRegion": null,
    "description": "Mississippi state capitol, University of Mississippi Medical Center (UMMC), historic Fondren arts district, and Ross Barnett Reservoir recreation.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Jackson,+MS",
    "counties": [
      "Hinds",
      "Madison",
      "Rankin",
      "Warren",
      "Yazoo",
      "Copiah",
      "Simpson"
    ]
  },
  {
    "id": "MS-gulf-coast",
    "name": "Mississippi Gulf Coast",
    "fullName": "Mississippi Gulf Coast (Biloxi, Gulfport & Ocean Springs)",
    "state": "MS",
    "tier": 1,
    "parentRegion": null,
    "description": "26 miles of continuous scenic beach highway, world-class casino resorts in Biloxi, Port of Gulfport, Keesler Air Force Base, and Walter Anderson art.",
    "googleUrl": "https://www.google.com/maps/place/Mississippi%20Gulf%20Coast,+MS",
    "counties": [
      "Harrison",
      "Jackson",
      "Hancock",
      "Pearl River",
      "Stone",
      "George"
    ]
  },
  {
    "id": "MS-north-desoto-oxford",
    "name": "North Mississippi",
    "fullName": "North Mississippi (DeSoto / Memphis Suburbs & Oxford / Ole Miss)",
    "state": "MS",
    "tier": 1,
    "parentRegion": null,
    "description": "Booming Memphis suburban distribution corridor in Southaven and Olive Branch, University of Mississippi (Ole Miss) in Oxford, and Toyota assembly.",
    "googleUrl": "https://www.google.com/maps/place/North%20Mississippi,+MS",
    "counties": [
      "DeSoto",
      "Lafayette",
      "Lee",
      "Marshall",
      "Tate",
      "Panola",
      "Union",
      "Pontotoc",
      "Alcorn"
    ]
  },
  {
    "id": "MS-pine-belt-delta",
    "name": "Pine Belt & The Delta",
    "fullName": "Pine Belt & Mississippi Delta (Hattiesburg, Meridian & Delta Blues)",
    "state": "MS",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Southern Mississippi in Hattiesburg, Camp Shelby, birthplace of Delta blues in Clarksdale, and fertile alluvial cotton/soybean basin.",
    "googleUrl": "https://www.google.com/maps/place/Pine%20Belt%20%26%20The%20Delta,+MS",
    "counties": [
      "Forrest",
      "Lamar",
      "Jones",
      "Lauderdale",
      "Washington",
      "Bolivar",
      "Sunflower",
      "Leflore",
      "Coahoma",
      "Quitman"
    ]
  },
  {
    "id": "MS-gulf-coast-biloxi-gulfport",
    "name": "Biloxi & Gulfport Metro",
    "fullName": "Biloxi & Gulfport Coastal Strip (Harrison County)",
    "state": "MS",
    "tier": 2,
    "parentRegion": "Mississippi Gulf Coast",
    "description": "Beau Rivage, Hard Rock Biloxi, Mississippi Coast Coliseum, barrier island ferries to Ship Island, and commercial seafood packing.",
    "googleUrl": "https://www.google.com/maps/place/Biloxi%20%26%20Gulfport%20Metro,+MS",
    "counties": [
      "Harrison"
    ]
  },
  {
    "id": "MS-desoto-southaven",
    "name": "DeSoto County / Memphis South",
    "fullName": "DeSoto County (Southaven, Olive Branch & Hernando)",
    "state": "MS",
    "tier": 2,
    "parentRegion": "North Mississippi",
    "description": "Fastest-growing county in Mississippi, massive e-commerce fulfillment hubs, Silo Square town center, and Landers Center.",
    "googleUrl": "https://www.google.com/maps/place/DeSoto%20County%20%2F%20Memphis%20South,+MS",
    "counties": [
      "DeSoto"
    ]
  },
  {
    "id": "MT-central-capital-helena",
    "name": "Central Montana & Capital",
    "fullName": "Central Montana & Capital Region (Helena & Great Falls)",
    "state": "MT",
    "tier": 1,
    "parentRegion": null,
    "description": "Montana state capitol in Helena, historic Last Chance Gulch gold mining heritage, Great Falls waterfalls on the Missouri River, C.M. Russell Western art museum, and Malmstrom AFB.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Montana%20%26%20Capital,+MT",
    "counties": [
      "Lewis and Clark",
      "Cascade",
      "Jefferson",
      "Broadwater",
      "Meagher",
      "Judith Basin",
      "Fergus",
      "Chouteau",
      "Teton",
      "Pondera",
      "Toole",
      "Glacier",
      "Liberty",
      "Hill",
      "Blaine",
      "Phillips"
    ]
  },
  {
    "id": "MT-flathead-glacier-kalispell",
    "name": "Flathead Valley & Glacier",
    "fullName": "Flathead Valley & Glacier National Park (Kalispell & Whitefish)",
    "state": "MT",
    "tier": 1,
    "parentRegion": null,
    "description": "Glacier National Park (\"Crown of the Continent\"), Going-to-the-Sun Road, pristine Flathead Lake (largest natural freshwater lake west of Mississippi), and Whitefish Mountain Resort.",
    "googleUrl": "https://www.google.com/maps/place/Flathead%20Valley%20%26%20Glacier,+MT",
    "counties": [
      "Flathead",
      "Lincoln"
    ]
  },
  {
    "id": "MT-gallatin-bozeman-big-sky",
    "name": "Gallatin Valley & Big Sky",
    "fullName": "Gallatin Valley (Bozeman, Big Sky Resort & Yellowstone Gateway)",
    "state": "MT",
    "tier": 1,
    "parentRegion": null,
    "description": "Montana State University in Bozeman, high-tech optics and photonics cluster, world-class skiing at Big Sky Resort, and northern entrance to Yellowstone National Park.",
    "googleUrl": "https://www.google.com/maps/place/Gallatin%20Valley%20%26%20Big%20Sky,+MT",
    "counties": [
      "Gallatin",
      "Park",
      "Madison"
    ]
  },
  {
    "id": "MT-western-missoula-bitterroot",
    "name": "Western Montana",
    "fullName": "Western Montana & Bitterroot Valley (Missoula & Clark Fork)",
    "state": "MT",
    "tier": 1,
    "parentRegion": null,
    "description": "University of Montana in Missoula (\"Garden City\"), confluence of five mountain ranges, Bitterroot River fly fishing, craft breweries, and wilderness access.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Montana,+MT",
    "counties": [
      "Missoula",
      "Ravalli",
      "Lake",
      "Sanders",
      "Mineral",
      "Granite",
      "Powell"
    ]
  },
  {
    "id": "MT-yellowstone-billings-metro",
    "name": "Yellowstone Valley & Billings",
    "fullName": "Yellowstone Valley & Billings Metropolitan Area (Magic City)",
    "state": "MT",
    "tier": 1,
    "parentRegion": null,
    "description": "Montana's largest city, Rimrocks sandstone formations, major regional medical and financial hub for the northern plains, oil refining, and Little Bighorn battlefield.",
    "googleUrl": "https://www.google.com/maps/place/Yellowstone%20Valley%20%26%20Billings,+MT",
    "counties": [
      "Yellowstone",
      "Carbon",
      "Stillwater",
      "Sweet Grass",
      "Musselshell",
      "Golden Valley",
      "Wheatland"
    ]
  },
  {
    "id": "MT-billings-yellowstone-core",
    "name": "Billings & Yellowstone Core",
    "fullName": "Billings Urban Core & Yellowstone County",
    "state": "MT",
    "tier": 2,
    "parentRegion": "Yellowstone Valley & Billings",
    "description": "Downtown Billings historic district, Montana's only walkable brewery district, Dehler Park baseball, and regional trade crossroads.",
    "googleUrl": "https://www.google.com/maps/place/Billings%20%26%20Yellowstone%20Core,+MT",
    "counties": [
      "Yellowstone"
    ]
  },
  {
    "id": "MT-bozeman-gallatin-core",
    "name": "Bozeman & Gallatin Core",
    "fullName": "Bozeman & Gallatin County Core (Main Street & Tech Hub)",
    "state": "MT",
    "tier": 2,
    "parentRegion": "Gallatin Valley & Big Sky",
    "description": "Historic brick Main Street, Museum of the Rockies (world-class Tyrannosaurus rex fossils), Bozeman Yellowstone International Airport, and Bridger Bowl ski area.",
    "googleUrl": "https://www.google.com/maps/place/Bozeman%20%26%20Gallatin%20Core,+MT",
    "counties": [
      "Gallatin"
    ]
  },
  {
    "id": "NC-charlotte-metro",
    "name": "Charlotte Metro",
    "fullName": "Charlotte Metropolitan Area (Queen City & Lake Norman)",
    "state": "NC",
    "tier": 1,
    "parentRegion": null,
    "description": "Second largest banking center in the US (Bank of America global HQ), NASCAR Hall of Fame, corporate HQs, and fast-growing suburbs.",
    "googleUrl": "https://www.google.com/maps/place/Charlotte%20Metro,+NC",
    "counties": [
      "Mecklenburg",
      "Union",
      "Cabarrus",
      "Gaston",
      "Iredell",
      "Lincoln",
      "Rowan"
    ]
  },
  {
    "id": "NC-coastal-wilmington-outer-banks",
    "name": "Coastal North Carolina",
    "fullName": "Coastal North Carolina (Wilmington, Cape Fear & The Outer Banks)",
    "state": "NC",
    "tier": 1,
    "parentRegion": null,
    "description": "Cape Hatteras National Seashore barrier islands, Wright Brothers First Flight in Kill Devil Hills, port city Wilmington, and pristine beaches.",
    "googleUrl": "https://www.google.com/maps/place/Coastal%20North%20Carolina,+NC",
    "counties": [
      "New Hanover",
      "Brunswick",
      "Pender",
      "Onslow",
      "Carteret",
      "Dare",
      "Currituck",
      "Hyde",
      "Pamlico",
      "Craven",
      "Beaufort"
    ]
  },
  {
    "id": "NC-piedmont-triad",
    "name": "Piedmont Triad",
    "fullName": "Piedmont Triad (Greensboro, Winston-Salem & High Point)",
    "state": "NC",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic tobacco and textile heritage transformed into aviation (HondaJet), Wake Forest biotech, and international home furnishings market.",
    "googleUrl": "https://www.google.com/maps/place/Piedmont%20Triad,+NC",
    "counties": [
      "Guilford",
      "Forsyth",
      "Davidson",
      "Alamance",
      "Randolph",
      "Rockingham",
      "Stokes",
      "Davie",
      "Yadkin"
    ]
  },
  {
    "id": "NC-research-triangle",
    "name": "Research Triangle",
    "fullName": "Research Triangle (Raleigh, Durham & Chapel Hill)",
    "state": "NC",
    "tier": 1,
    "parentRegion": null,
    "description": "World-renowned innovation center anchored by Duke University, UNC Chapel Hill, NC State, and Research Triangle Park (RTP) biotech hub.",
    "googleUrl": "https://www.google.com/maps/place/Research%20Triangle,+NC",
    "counties": [
      "Wake",
      "Durham",
      "Orange",
      "Johnston",
      "Chatham"
    ]
  },
  {
    "id": "NC-sandhills-fayetteville",
    "name": "Sandhills & Eastern NC",
    "fullName": "Sandhills & Eastern North Carolina (Fayetteville & Pinehurst)",
    "state": "NC",
    "tier": 1,
    "parentRegion": null,
    "description": "Fort Liberty (one of the largest military installations in the world), Pinehurst historic golf resort, and fertile coastal plain agriculture.",
    "googleUrl": "https://www.google.com/maps/place/Sandhills%20%26%20Eastern%20NC,+NC",
    "counties": [
      "Cumberland",
      "Moore",
      "Harnett",
      "Lee",
      "Hoke",
      "Robeson",
      "Wayne",
      "Wilson",
      "Pitt",
      "Nash",
      "Edgecombe",
      "Lenoir"
    ]
  },
  {
    "id": "NC-western-mountains",
    "name": "Western North Carolina",
    "fullName": "Western North Carolina & Blue Ridge (Asheville & Great Smokies)",
    "state": "NC",
    "tier": 1,
    "parentRegion": null,
    "description": "Vibrant arts and craft brewery destination in Asheville, Biltmore Estate, Blue Ridge Parkway, and Mount Mitchell (highest peak east of Mississippi).",
    "googleUrl": "https://www.google.com/maps/place/Western%20North%20Carolina,+NC",
    "counties": [
      "Buncombe",
      "Henderson",
      "Haywood",
      "Transylvania",
      "Jackson",
      "Macon",
      "Watauga",
      "Avery",
      "Madison",
      "Yancey",
      "Mitchell",
      "Cherokee",
      "Clay",
      "Graham",
      "Swain"
    ]
  },
  {
    "id": "NC-charlotte-core",
    "name": "Charlotte & Mecklenburg",
    "fullName": "Charlotte Core & Mecklenburg County (Uptown & South End)",
    "state": "NC",
    "tier": 2,
    "parentRegion": "Charlotte Metro",
    "description": "Uptown skyscraper skyline, South End tech and design district, Charlotte Douglas International Airport, and major sports stadiums.",
    "googleUrl": "https://www.google.com/maps/place/Charlotte%20%26%20Mecklenburg,+NC",
    "counties": [
      "Mecklenburg"
    ]
  },
  {
    "id": "NC-asheville-buncombe",
    "name": "Greater Asheville",
    "fullName": "Greater Asheville & Buncombe County (Art & Blue Ridge Mountains)",
    "state": "NC",
    "tier": 2,
    "parentRegion": "Western North Carolina",
    "description": "Appalachian mountain culture, French Broad River arts district, historic Grove Park Inn, and outdoor recreation gateway.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Asheville,+NC",
    "counties": [
      "Buncombe",
      "Henderson"
    ]
  },
  {
    "id": "NC-triangle-core",
    "name": "Raleigh & Triangle Core",
    "fullName": "Raleigh, Durham & Wake County Core (Research Triangle Park)",
    "state": "NC",
    "tier": 2,
    "parentRegion": "Research Triangle",
    "description": "North Carolina state capitol in Raleigh, Duke University Medical Center in Durham, and R&D campuses.",
    "googleUrl": "https://www.google.com/maps/place/Raleigh%20%26%20Triangle%20Core,+NC",
    "counties": [
      "Wake",
      "Durham"
    ]
  },
  {
    "id": "NC-wilmington-cape-fear",
    "name": "Wilmington & Cape Fear",
    "fullName": "Wilmington & Cape Fear Coast (New Hanover & Brunswick)",
    "state": "NC",
    "tier": 2,
    "parentRegion": "Coastal North Carolina",
    "description": "Historic riverfront district, Battleship North Carolina, Wrightsville Beach, EUE/Screen Gems film production studios, and Port of Wilmington.",
    "googleUrl": "https://www.google.com/maps/place/Wilmington%20%26%20Cape%20Fear,+NC",
    "counties": [
      "New Hanover",
      "Brunswick"
    ]
  },
  {
    "id": "ND-central-capital",
    "name": "Central North Dakota",
    "fullName": "Central North Dakota & Capital Region (Bismarck & Minot)",
    "state": "ND",
    "tier": 1,
    "description": "State capital Bismarck on the Missouri River, Minot Air Force Base (B-52 bombers and Minuteman missiles), and energy generation corridor.",
    "googleUrl": "https://www.google.com/maps/place/Central+North+Dakota,+ND",
    "counties": [
      "Burleigh",
      "Morton",
      "Ward",
      "McLean",
      "Mercer",
      "Oliver",
      "Stutsman",
      "Kidder",
      "Wells",
      "Pierce",
      "McHenry"
    ]
  },
  {
    "id": "ND-red-river-valley",
    "name": "Red River Valley",
    "fullName": "Red River Valley & Eastern North Dakota (Fargo & Grand Forks)",
    "state": "ND",
    "tier": 1,
    "description": "Major population center, North Dakota State University, Microsoft campus in Fargo, and University of North Dakota aerospace in Grand Forks.",
    "googleUrl": "https://www.google.com/maps/place/Red+River+Valley,+ND",
    "counties": [
      "Cass",
      "Grand Forks",
      "Richland",
      "Traill",
      "Walsh",
      "Pembina",
      "Barnes",
      "Steele"
    ]
  },
  {
    "id": "ND-western-bakken",
    "name": "Western North Dakota",
    "fullName": "Western North Dakota & Bakken Formation (Williston & Dickinson)",
    "state": "ND",
    "tier": 1,
    "description": "Bakken oil and gas shale energy powerhouse, Theodore Roosevelt National Park badlands, and historic ranching in Medora.",
    "googleUrl": "https://www.google.com/maps/place/Western+North+Dakota,+ND",
    "counties": [
      "Williams",
      "McKenzie",
      "Stark",
      "Mountrail",
      "Dunn",
      "Divide",
      "Burke",
      "Bowman",
      "Billings",
      "Slope",
      "Golden Valley"
    ]
  },
  {
    "id": "NE-central-tri-cities",
    "name": "Central Nebraska",
    "fullName": "Central Nebraska & Tri-Cities (Grand Island, Kearney & Hastings)",
    "state": "NE",
    "tier": 1,
    "description": "Platte River valley agricultural heartland, sandhill crane migration corridor, University of Nebraska at Kearney, and manufacturing.",
    "googleUrl": "https://www.google.com/maps/place/Central+Nebraska,+NE",
    "counties": [
      "Hall",
      "Buffalo",
      "Adams",
      "Dawson",
      "Phelps",
      "Kearney",
      "Hamilton",
      "Merrick",
      "Platte",
      "Madison"
    ]
  },
  {
    "id": "NE-omaha-metro",
    "name": "Greater Omaha Metro",
    "fullName": "Greater Omaha Metropolitan Area (Omaha, Bellevue & Papillion)",
    "state": "NE",
    "tier": 1,
    "description": "Economic engine of Nebraska, Berkshire Hathaway headquarters, Offutt Air Force Base (USSTRATCOM), and Henry Doorly Zoo.",
    "googleUrl": "https://www.google.com/maps/place/Greater+Omaha,+NE",
    "counties": [
      "Douglas",
      "Sarpy",
      "Cass",
      "Washington",
      "Dodge",
      "Saunders"
    ]
  },
  {
    "id": "NE-lincoln-capital",
    "name": "Lincoln & Capital Region",
    "fullName": "Lincoln Metropolitan Area & Southeast Nebraska (Cornhuskers & Capitol)",
    "state": "NE",
    "tier": 1,
    "description": "Nebraska state capitol tower, University of Nebraska-Lincoln flagship campus, state government center, and agricultural tech.",
    "googleUrl": "https://www.google.com/maps/place/Lincoln,+NE",
    "counties": [
      "Lancaster",
      "Seward",
      "Saline",
      "Gage",
      "Otoe",
      "Jefferson"
    ]
  },
  {
    "id": "NE-western-panhandle",
    "name": "Western Nebraska & Panhandle",
    "fullName": "Western Nebraska & The Panhandle (Scottsbluff, North Platte & Sandhills)",
    "state": "NE",
    "tier": 1,
    "description": "Chimney Rock and Scotts Bluff National Monuments along Oregon Trail, Union Pacific Bailey Yard in North Platte, and scenic Sandhills cattle ranches.",
    "googleUrl": "https://www.google.com/maps/place/Western+Nebraska,+NE",
    "counties": [
      "Scotts Bluff",
      "Lincoln",
      "Box Butte",
      "Dawes",
      "Cheyenne",
      "Keith",
      "Morrill",
      "Kimball",
      "Sheridan",
      "Cherry",
      "Custer"
    ]
  },
  {
    "id": "NH-lakes-monadnock",
    "name": "Lakes Region & Monadnock",
    "fullName": "Lakes Region & Monadnock (Lake Winnipesaukee, Concord & Keene)",
    "state": "NH",
    "tier": 1,
    "parentRegion": null,
    "description": "Lake Winnipesaukee resort boating, Mount Monadnock (most-climbed mountain in North America), New Hampshire state house in Concord, and colonial college towns.",
    "googleUrl": "https://www.google.com/maps/place/Lakes%20Region%20%26%20Monadnock,+NH",
    "counties": [
      "Belknap",
      "Cheshire",
      "Sullivan"
    ]
  },
  {
    "id": "NH-merrimack-valley-seacoast",
    "name": "Merrimack Valley & Seacoast",
    "fullName": "Southern New Hampshire & Seacoast (Manchester, Nashua & Portsmouth)",
    "state": "NH",
    "tier": 1,
    "parentRegion": null,
    "description": "Economic heart of New Hampshire, Manchester-Boston Regional Airport, historic Portsmouth seaport and naval shipyard, defense electronics (BAE Systems), and no general sales or income tax.",
    "googleUrl": "https://www.google.com/maps/place/Merrimack%20Valley%20%26%20Seacoast,+NH",
    "counties": [
      "Hillsborough",
      "Rockingham",
      "Strafford",
      "Merrimack"
    ]
  },
  {
    "id": "NH-white-mountains-north",
    "name": "White Mountains & North Woods",
    "fullName": "White Mountains & Great North Woods (Mount Washington & Franconia Notch)",
    "state": "NH",
    "tier": 1,
    "parentRegion": null,
    "description": "Mount Washington (highest peak in Northeast at 6,288 ft / extreme weather observatory), Franconia Notch, world-class ski resorts (Bretton Woods, Loon), and vast northern wilderness.",
    "googleUrl": "https://www.google.com/maps/place/White%20Mountains%20%26%20North%20Woods,+NH",
    "counties": [
      "Grafton",
      "Carroll",
      "Coos"
    ]
  },
  {
    "id": "NH-manchester-nashua-core",
    "name": "Manchester & Nashua Core",
    "fullName": "Manchester & Nashua Urban Corridor (Hillsborough County)",
    "state": "NH",
    "tier": 2,
    "parentRegion": "Merrimack Valley & Seacoast",
    "description": "Historic Amoskeag textile millyard transformed into high-tech biotech labs (ARMI bio-fabrication), Currier Museum of Art, and retail commerce.",
    "googleUrl": "https://www.google.com/maps/place/Manchester%20%26%20Nashua%20Core,+NH",
    "counties": [
      "Hillsborough"
    ]
  },
  {
    "id": "NH-portsmouth-seacoast-core",
    "name": "Portsmouth & Seacoast",
    "fullName": "Portsmouth & Seacoast Historic Harbor (Rockingham County)",
    "state": "NH",
    "tier": 2,
    "parentRegion": "Merrimack Valley & Seacoast",
    "description": "18 miles of Atlantic coastline, Strawbery Banke Museum historic district, Market Square dining, and Hampton Beach state park.",
    "googleUrl": "https://www.google.com/maps/place/Portsmouth%20%26%20Seacoast,+NH",
    "counties": [
      "Rockingham"
    ]
  },
  {
    "id": "NJ-central-jersey",
    "name": "Central Jersey",
    "fullName": "Central Jersey (Raritan Valley, Princeton & Research Corridor)",
    "state": "NJ",
    "tier": 1,
    "parentRegion": null,
    "description": "The pharmaceutical and research cradle (\"Medicine Chest of the World\"), Princeton University, Rutgers New Brunswick, and bio-pharma campuses.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Jersey,+NJ",
    "counties": [
      "Middlesex",
      "Somerset",
      "Mercer",
      "Hunterdon"
    ]
  },
  {
    "id": "NJ-north-jersey",
    "name": "North Jersey",
    "fullName": "North Jersey (NYC Metropolitan Gateway & Skylands)",
    "state": "NJ",
    "tier": 1,
    "parentRegion": null,
    "description": "Densely populated economic powerhouse across the Hudson River from Manhattan, major corporate HQs, and MetLife Stadium complex.",
    "googleUrl": "https://www.google.com/maps/place/North%20Jersey,+NJ",
    "counties": [
      "Bergen",
      "Hudson",
      "Essex",
      "Passaic",
      "Union",
      "Morris",
      "Sussex",
      "Warren"
    ]
  },
  {
    "id": "NJ-south-jersey",
    "name": "South Jersey",
    "fullName": "South Jersey & Delaware Valley (Camden, Atlantic City & Pine Barrens)",
    "state": "NJ",
    "tier": 1,
    "parentRegion": null,
    "description": "Philadelphia suburban riverfront corridor, Atlantic City casino boardwalk, Cape May Victorian historic resort, and the Pinelands National Reserve.",
    "googleUrl": "https://www.google.com/maps/place/South%20Jersey,+NJ",
    "counties": [
      "Camden",
      "Burlington",
      "Gloucester",
      "Atlantic",
      "Cape May",
      "Cumberland",
      "Salem"
    ]
  },
  {
    "id": "NJ-jersey-shore",
    "name": "The Jersey Shore",
    "fullName": "The Jersey Shore (Monmouth & Ocean Coastal Playground)",
    "state": "NJ",
    "tier": 1,
    "parentRegion": null,
    "description": "141 miles of Atlantic Ocean coastline, historic boardwalks (Asbury Park, Point Pleasant, Seaside Heights), and Sandy Hook.",
    "googleUrl": "https://www.google.com/maps/place/The%20Jersey%20Shore,+NJ",
    "counties": [
      "Monmouth",
      "Ocean"
    ]
  },
  {
    "id": "NJ-atlantic-city-shore",
    "name": "Atlantic City & Cape May",
    "fullName": "Atlantic City & Cape May Coastal Peninsula",
    "state": "NJ",
    "tier": 2,
    "parentRegion": "South Jersey",
    "description": "World-famous Atlantic City casino resorts, historic Victorian Cape May architecture, Cape May Point lighthouse, and commercial fisheries.",
    "googleUrl": "https://www.google.com/maps/place/Atlantic%20City%20%26%20Cape%20May,+NJ",
    "counties": [
      "Atlantic",
      "Cape May"
    ]
  },
  {
    "id": "NJ-bergen-passaic",
    "name": "Bergen & Passaic",
    "fullName": "Bergen & Passaic Counties (Paramus, Hackensack & Paterson Falls)",
    "state": "NJ",
    "tier": 2,
    "parentRegion": "North Jersey",
    "description": "George Washington Bridge gateway, affluent suburban parkway towns, retail capital Paramus, and Great Falls historic national park.",
    "googleUrl": "https://www.google.com/maps/place/Bergen%20%26%20Passaic,+NJ",
    "counties": [
      "Bergen",
      "Passaic"
    ]
  },
  {
    "id": "NJ-gold-coast-hudson",
    "name": "Gold Coast & Gateway",
    "fullName": "Gold Coast & Gateway (Jersey City, Hoboken & Newark)",
    "state": "NJ",
    "tier": 2,
    "parentRegion": "North Jersey",
    "description": "\"Wall Street West\" financial towers on the Hudson River waterfront, PATH train transit hub, and Newark Liberty International Airport.",
    "googleUrl": "https://www.google.com/maps/place/Gold%20Coast%20%26%20Gateway,+NJ",
    "counties": [
      "Hudson",
      "Essex"
    ]
  },
  {
    "id": "NJ-princeton-mercer",
    "name": "Princeton & Mercer Corridor",
    "fullName": "Princeton & Greater Mercer County (State Capital & Ivy League)",
    "state": "NJ",
    "tier": 2,
    "parentRegion": "Central Jersey",
    "description": "Princeton University, Route 1 Innovation Corridor, Institute for Advanced Study, and Trenton state government capitol.",
    "googleUrl": "https://www.google.com/maps/place/Princeton%20%26%20Mercer%20Corridor,+NJ",
    "counties": [
      "Mercer",
      "Somerset"
    ]
  },
  {
    "id": "NM-central-albuquerque-metro",
    "name": "Central New Mexico",
    "fullName": "Central New Mexico & Greater Albuquerque (Duke City & Sandia)",
    "state": "NM",
    "tier": 1,
    "parentRegion": null,
    "description": "Albuquerque International Balloon Fiesta (largest hot air balloon event in world), Sandia National Laboratories, University of New Mexico, and Sandia Peak Tramway.",
    "googleUrl": "https://www.google.com/maps/place/Central%20New%20Mexico,+NM",
    "counties": [
      "Bernalillo",
      "Sandoval",
      "Valencia",
      "Torrance"
    ]
  },
  {
    "id": "NM-eastern-permian-oil",
    "name": "Eastern New Mexico",
    "fullName": "Eastern New Mexico & Permian Basin (Carlsbad Caverns & Oil Country)",
    "state": "NM",
    "tier": 1,
    "parentRegion": null,
    "description": "Permian Basin Delaware sub-basin oil and natural gas powerhouse in Hobbs/Carlsbad, Carlsbad Caverns National Park underground limestone chambers, and UFO folklore in Roswell.",
    "googleUrl": "https://www.google.com/maps/place/Eastern%20New%20Mexico,+NM",
    "counties": [
      "Eddy",
      "Lea",
      "Chaves",
      "Roosevelt",
      "Curry",
      "Quay",
      "Guadalupe",
      "De Baca",
      "Harding",
      "San Juan",
      "McKinley",
      "Cibola"
    ]
  },
  {
    "id": "NM-northern-santa-fe-taos",
    "name": "Northern New Mexico",
    "fullName": "Northern New Mexico (Santa Fe Historic Capital, Taos & Los Alamos)",
    "state": "NM",
    "tier": 1,
    "parentRegion": null,
    "description": "Oldest state capital in the US (founded 1610), Pueblo Revival architecture, Santa Fe Opera, world-class art galleries on Canyon Road, Los Alamos National Laboratory, and Taos Ski Valley.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20New%20Mexico,+NM",
    "counties": [
      "Santa Fe",
      "Taos",
      "Los Alamos",
      "Rio Arriba",
      "San Miguel",
      "Mora",
      "Colfax",
      "Union"
    ]
  },
  {
    "id": "NM-southern-las-cruces-space",
    "name": "Southern New Mexico",
    "fullName": "Southern New Mexico (Las Cruces, White Sands & Organ Mountains)",
    "state": "NM",
    "tier": 1,
    "parentRegion": null,
    "description": "New Mexico State University in Las Cruces, glistening gypsum dunes at White Sands National Park, White Sands Missile Range, Spaceport America, and green chile capital Hatch.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20New%20Mexico,+NM",
    "counties": [
      "Doña Ana",
      "Otero",
      "Luna",
      "Sierra",
      "Grant",
      "Hidalgo",
      "Catron",
      "Socorro",
      "Lincoln"
    ]
  },
  {
    "id": "NM-albuquerque-bernalillo-core",
    "name": "Albuquerque & Bernalillo Core",
    "fullName": "Albuquerque Urban Core (Historic Old Town, Nob Hill & Downtown)",
    "state": "NM",
    "tier": 2,
    "parentRegion": "Central New Mexico",
    "description": "Historic Old Town plaza dating to 1706, Route 66 neon on Central Avenue / Nob Hill, Petroglyph National Monument, and Kirtland Air Force Base.",
    "googleUrl": "https://www.google.com/maps/place/Albuquerque%20%26%20Bernalillo%20Core,+NM",
    "counties": [
      "Bernalillo"
    ]
  },
  {
    "id": "NM-santa-fe-county-core",
    "name": "Santa Fe Historic Core",
    "fullName": "Santa Fe County & Historic Plaza (The City Different)",
    "state": "NM",
    "tier": 2,
    "parentRegion": "Northern New Mexico",
    "description": "Historic Santa Fe Plaza, Palace of the Governors, Georgia O'Keeffe Museum, Meow Wolf immersive art headquarters, and Santa Fe Railyard.",
    "googleUrl": "https://www.google.com/maps/place/Santa%20Fe%20Historic%20Core,+NM",
    "counties": [
      "Santa Fe"
    ]
  },
  {
    "id": "NV-las-vegas-valley",
    "name": "Las Vegas Valley",
    "fullName": "Las Vegas Valley & Southern Nevada (Entertainment Capital)",
    "state": "NV",
    "tier": 1,
    "parentRegion": null,
    "description": "World's premier entertainment and convention destination, iconic Las Vegas Strip mega-resorts, Hoover Dam, Red Rock Canyon, and Lake Mead.",
    "googleUrl": "https://www.google.com/maps/place/Las%20Vegas%20Valley,+NV",
    "counties": [
      "Clark",
      "Nye"
    ]
  },
  {
    "id": "NV-reno-tahoe-gateway",
    "name": "Reno-Tahoe & Western NV",
    "fullName": "Reno, Sparks & Lake Tahoe (The Biggest Little City & Sierra Nevada)",
    "state": "NV",
    "tier": 1,
    "parentRegion": null,
    "description": "Lake Tahoe alpine resort clarity, Reno MidTown arts, Tahoe Reno Industrial Center (Tesla Gigafactory, Google, Switch), and state capital Carson City.",
    "googleUrl": "https://www.google.com/maps/place/Reno-Tahoe%20%26%20Western%20NV,+NV",
    "counties": [
      "Washoe",
      "Carson City",
      "Douglas",
      "Storey",
      "Lyon",
      "Churchill"
    ]
  },
  {
    "id": "NV-rural-mining-corridor",
    "name": "Rural Nevada & Mining Corridor",
    "fullName": "Rural Nevada & Great Basin (Gold Mining & Loneliest Road)",
    "state": "NV",
    "tier": 1,
    "parentRegion": null,
    "description": "Top gold-producing region in the Americas (Carlin Trend), Great Basin National Park (ancient bristlecone pines), and historic mining boomtowns along US-50.",
    "googleUrl": "https://www.google.com/maps/place/Rural%20Nevada%20%26%20Mining%20Corridor,+NV",
    "counties": [
      "Elko",
      "Humboldt",
      "White Pine",
      "Lander",
      "Eureka",
      "Pershing",
      "Mineral",
      "Esmeralda",
      "Lincoln"
    ]
  },
  {
    "id": "NV-clark-county-las-vegas-core",
    "name": "Las Vegas & Clark Core",
    "fullName": "Las Vegas & Clark County Core (The Strip, Downtown & Summerlin)",
    "state": "NV",
    "tier": 2,
    "parentRegion": "Las Vegas Valley",
    "description": "Bellagio fountains, Fremont Street Experience, Allegiant Stadium (Raiders), Sphere at The Venetian, and master-planned Summerlin.",
    "googleUrl": "https://www.google.com/maps/place/Las%20Vegas%20%26%20Clark%20Core,+NV",
    "counties": [
      "Clark"
    ]
  },
  {
    "id": "NV-reno-washoe-core",
    "name": "Reno & Washoe County",
    "fullName": "Reno-Sparks Urban Core (Truckee River & University)",
    "state": "NV",
    "tier": 2,
    "parentRegion": "Reno-Tahoe & Western NV",
    "description": "Truckee Riverwalk District, University of Nevada Reno (UNR), National Automobile Museum, and Sierra Nevada mountain passes.",
    "googleUrl": "https://www.google.com/maps/place/Reno%20%26%20Washoe%20County,+NV",
    "counties": [
      "Washoe"
    ]
  },
  {
    "id": "NY-downstate",
    "name": "Downstate New York",
    "fullName": "Downstate New York (NYC, Long Island & Lower Hudson Valley)",
    "state": "NY",
    "tier": 1,
    "parentRegion": null,
    "description": "The premier commercial, financial, and cultural hub of the US encompassing the 5 boroughs of New York City, Long Island, and Westchester.",
    "googleUrl": "https://www.google.com/maps/place/Downstate%20New%20York,+NY",
    "counties": [
      "New York",
      "Kings",
      "Queens",
      "Bronx",
      "Richmond",
      "Nassau",
      "Suffolk",
      "Westchester",
      "Rockland",
      "Putnam"
    ]
  },
  {
    "id": "NY-hudson-valley",
    "name": "Hudson Valley",
    "fullName": "Hudson Valley (Westchester, Rockland, Orange & Mid-Hudson)",
    "state": "NY",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic scenic river valley connecting NYC to the state capital, historic estates, Culinary Institute, and West Point Military Academy.",
    "googleUrl": "https://www.google.com/maps/place/Hudson%20Valley,+NY",
    "counties": [
      "Westchester",
      "Rockland",
      "Putnam",
      "Orange",
      "Dutchess",
      "Ulster",
      "Sullivan",
      "Columbia",
      "Greene"
    ]
  },
  {
    "id": "NY-upstate",
    "name": "Upstate New York",
    "fullName": "Upstate New York (Capital, Central, Western & Adirondacks)",
    "state": "NY",
    "tier": 1,
    "parentRegion": null,
    "description": "The vast region extending from the Hudson Valley north to the Canadian border and west to the Great Lakes and Niagara Falls.",
    "googleUrl": "https://www.google.com/maps/place/Upstate%20New%20York,+NY",
    "counties": [
      "Albany",
      "Rensselaer",
      "Saratoga",
      "Schenectady",
      "Warren",
      "Washington",
      "Oneida",
      "Onondaga",
      "Madison",
      "Oswego",
      "Cayuga",
      "Cortland",
      "Tompkins",
      "Monroe",
      "Ontario",
      "Wayne",
      "Livingston",
      "Yates",
      "Seneca",
      "Erie",
      "Niagara",
      "Chautauqua",
      "Cattaraugus",
      "Allegany",
      "Genesee",
      "Orleans",
      "Wyoming",
      "Broome",
      "Tioga",
      "Chemung",
      "Steuben",
      "Schuyler",
      "Chenango",
      "Otsego",
      "Delaware",
      "Dutchess",
      "Orange",
      "Ulster",
      "Sullivan",
      "Columbia",
      "Greene",
      "Clinton",
      "Franklin",
      "Essex",
      "St. Lawrence",
      "Jefferson",
      "Lewis",
      "Hamilton",
      "Herkimer",
      "Fulton",
      "Montgomery",
      "Schoharie"
    ]
  },
  {
    "id": "NY-western-new-york",
    "name": "Western New York",
    "fullName": "Western New York & Niagara Frontier (Buffalo & Rochester Corridor)",
    "state": "NY",
    "tier": 1,
    "parentRegion": null,
    "description": "Great Lakes manufacturing, Niagara Falls tourism, University at Buffalo, and optics/imaging tech in Rochester.",
    "googleUrl": "https://www.google.com/maps/place/Western%20New%20York,+NY",
    "counties": [
      "Erie",
      "Niagara",
      "Monroe",
      "Ontario",
      "Wayne",
      "Genesee",
      "Orleans",
      "Livingston",
      "Wyoming",
      "Chautauqua",
      "Cattaraugus",
      "Allegany"
    ]
  },
  {
    "id": "NY-adirondacks-north-country",
    "name": "Adirondacks & North Country",
    "fullName": "Adirondack Park & North Country (Lake Placid, Plattsburgh & Thousand Islands)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Upstate New York",
    "description": "6-million-acre Adirondack Park (largest state park in contiguous US), Lake Placid Olympic village, Fort Drum 10th Mountain Division, and St. Lawrence River.",
    "googleUrl": "https://www.google.com/maps/place/Adirondacks%20%26%20North%20Country,+NY",
    "counties": [
      "Clinton",
      "Essex",
      "Franklin",
      "St. Lawrence",
      "Jefferson",
      "Lewis",
      "Hamilton",
      "Warren"
    ]
  },
  {
    "id": "NY-brooklyn-kings",
    "name": "Brooklyn",
    "fullName": "Brooklyn / Kings County (Downtown, Williamsburg, DUMBO & Flatbush)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "New York City (5 Boroughs)",
    "description": "Vibrant cultural innovator, tech startup hub (Brooklyn Navy Yard), historic brownstone neighborhoods, and Coney Island.",
    "googleUrl": "https://www.google.com/maps/place/Brooklyn,+NY",
    "counties": [
      "Kings"
    ]
  },
  {
    "id": "NY-capital-district",
    "name": "Capital District",
    "fullName": "Capital District & Tech Valley (Albany, Saratoga Springs, Troy & Schenectady)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Upstate New York",
    "description": "New York state government capital, Albany NanoTech Complex / semiconductor cluster, Saratoga thoroughbred racetrack, and RPI engineering.",
    "googleUrl": "https://www.google.com/maps/place/Capital%20District,+NY",
    "counties": [
      "Albany",
      "Rensselaer",
      "Saratoga",
      "Schenectady"
    ]
  },
  {
    "id": "NY-central-ny-syracuse",
    "name": "Central New York & Syracuse",
    "fullName": "Central New York (Syracuse, Onondaga & Micron MegaFab Corridor)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Upstate New York",
    "description": "Syracuse University, crossroads of the NYS Thruway and I-81, and future multi-billion Micron Technology semiconductor megafab.",
    "googleUrl": "https://www.google.com/maps/place/Central%20New%20York%20%26%20Syracuse,+NY",
    "counties": [
      "Onondaga",
      "Oswego",
      "Madison",
      "Cayuga",
      "Cortland"
    ]
  },
  {
    "id": "NY-greater-buffalo",
    "name": "Greater Buffalo & Niagara",
    "fullName": "Greater Buffalo-Niagara Falls Metropolitan Area",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Western New York",
    "description": "Second largest metro in NY, architectural masterpiece heritage (Frank Lloyd Wright), Peace Bridge Canadian border crossing, and Niagara Falls.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Buffalo%20%26%20Niagara,+NY",
    "counties": [
      "Erie",
      "Niagara"
    ]
  },
  {
    "id": "NY-greater-rochester",
    "name": "Greater Rochester",
    "fullName": "Greater Rochester & Finger Lakes Gateway",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Western New York",
    "description": "Global imaging, optics, and photonics capital (Kodak, Xerox, Bausch & Lomb roots), University of Rochester, and wine country.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Rochester,+NY",
    "counties": [
      "Monroe",
      "Ontario",
      "Wayne",
      "Livingston"
    ]
  },
  {
    "id": "NY-long-island",
    "name": "Long Island",
    "fullName": "Long Island (Nassau & Suffolk Counties / Hamptons & Gold Coast)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Downstate New York",
    "description": "Affluent suburban North Shore Gold Coast, South Shore beaches (Jones Beach), Fire Island, world-famous Hamptons estates, and Brookhaven National Lab.",
    "googleUrl": "https://www.google.com/maps/place/Long%20Island,+NY",
    "counties": [
      "Nassau",
      "Suffolk"
    ]
  },
  {
    "id": "NY-manhattan-core",
    "name": "Manhattan Core",
    "fullName": "Manhattan / New York County (Midtown, Financial District & Harlem)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "New York City (5 Boroughs)",
    "description": "The dense urban economic nucleus, Central Park, Silicon Alley tech, Fortune 500 headquarters, and iconic world landmarks.",
    "googleUrl": "https://www.google.com/maps/place/Manhattan%20Core,+NY",
    "counties": [
      "New York"
    ]
  },
  {
    "id": "NY-new-york-city",
    "name": "New York City (5 Boroughs)",
    "fullName": "New York City (Manhattan, Brooklyn, Queens, Bronx & Staten Island)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Downstate New York",
    "description": "America's largest city, global finance (Wall Street), Broadway theater, United Nations headquarters, and historic immigrant cultural corridors.",
    "googleUrl": "https://www.google.com/maps/place/New%20York%20City%20(5%20Boroughs),+NY",
    "counties": [
      "New York",
      "Kings",
      "Queens",
      "Bronx",
      "Richmond"
    ]
  },
  {
    "id": "NY-queens",
    "name": "Queens",
    "fullName": "Queens County (Long Island City, Astoria, Flushing & JFK/LGA)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "New York City (5 Boroughs)",
    "description": "The most ethnically diverse urban county on earth, JFK and LaGuardia international airports, and Long Island City waterfront tech.",
    "googleUrl": "https://www.google.com/maps/place/Queens,+NY",
    "counties": [
      "Queens"
    ]
  },
  {
    "id": "NY-southern-tier-ithaca",
    "name": "Southern Tier & Finger Lakes",
    "fullName": "Southern Tier (Binghamton, Elmira, Corning & Ithaca / Cornell)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Upstate New York",
    "description": "Cornell University & Ithaca gorges, Corning Inc. global glass innovation, Binghamton aerospace simulation, and Finger Lakes wine AVA.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Tier%20%26%20Finger%20Lakes,+NY",
    "counties": [
      "Tompkins",
      "Broome",
      "Tioga",
      "Chemung",
      "Steuben",
      "Schuyler"
    ]
  },
  {
    "id": "NY-staten-island",
    "name": "Staten Island",
    "fullName": "Staten Island / Richmond County (North Shore, Mid-Island & South Shore)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "New York City (5 Boroughs)",
    "description": "The borough of parks and green spaces, historic Richmond Town, scenic Staten Island Ferry, and residential communities.",
    "googleUrl": "https://www.google.com/maps/place/Staten%20Island,+NY",
    "counties": [
      "Richmond"
    ]
  },
  {
    "id": "NY-bronx",
    "name": "The Bronx",
    "fullName": "The Bronx / Bronx County (South Bronx, Riverdale & Pelham Bay)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "New York City (5 Boroughs)",
    "description": "Birthplace of Hip Hop, historic Yankee Stadium, the Bronx Zoo, New York Botanical Garden, and maritime City Island.",
    "googleUrl": "https://www.google.com/maps/place/The%20Bronx,+NY",
    "counties": [
      "Bronx"
    ]
  },
  {
    "id": "NY-westchester-suburbs",
    "name": "Westchester & Lower Hudson",
    "fullName": "Westchester & Lower Hudson Suburbs (White Plains, Yonkers & Rockland)",
    "state": "NY",
    "tier": 2,
    "parentRegion": "Hudson Valley",
    "description": "Prime commuter rail corridor, corporate headquarters (Mastercard, IBM), affluent Sound Shore and Hudson River communities.",
    "googleUrl": "https://www.google.com/maps/place/Westchester%20%26%20Lower%20Hudson,+NY",
    "counties": [
      "Westchester",
      "Rockland",
      "Putnam"
    ]
  },
  {
    "id": "OH-akron-canton",
    "name": "Akron-Canton",
    "fullName": "Akron-Canton (Polymer Valley & Pro Football Hall of Fame)",
    "state": "OH",
    "tier": 1,
    "parentRegion": null,
    "description": "Global polymer and tire engineering center (Goodyear, Bridgestone), Pro Football Hall of Fame in Canton, and Cuyahoga Valley National Park.",
    "googleUrl": "https://www.google.com/maps/place/Akron-Canton,+OH",
    "counties": [
      "Summit",
      "Stark",
      "Portage",
      "Wayne"
    ]
  },
  {
    "id": "OH-central-columbus",
    "name": "Central Ohio",
    "fullName": "Central Ohio (Greater Columbus & Silicon Heartland)",
    "state": "OH",
    "tier": 1,
    "parentRegion": null,
    "description": "Ohio state capitol, The Ohio State University, Cardinal Health, Nationwide, and Intel's multi-billion dollar semiconductor megafab campus.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Ohio,+OH",
    "counties": [
      "Franklin",
      "Delaware",
      "Licking",
      "Fairfield",
      "Pickaway",
      "Union",
      "Madison"
    ]
  },
  {
    "id": "OH-greater-cincinnati",
    "name": "Greater Cincinnati",
    "fullName": "Greater Cincinnati & Ohio River Hub (Southwest Ohio)",
    "state": "OH",
    "tier": 1,
    "parentRegion": null,
    "description": "Procter & Gamble global HQ, Kroger headquarters, GE Aerospace, historic Over-the-Rhine arts, and University of Cincinnati.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Cincinnati,+OH",
    "counties": [
      "Hamilton",
      "Butler",
      "Warren",
      "Clermont",
      "Brown"
    ]
  },
  {
    "id": "OH-greater-cleveland",
    "name": "Greater Cleveland",
    "fullName": "Greater Cleveland & Lake Erie Northeast",
    "state": "OH",
    "tier": 1,
    "parentRegion": null,
    "description": "World-renowned Cleveland Clinic, Case Western Reserve University, Rock and Roll Hall of Fame, Lake Erie port, and advanced healthcare/biomed.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Cleveland,+OH",
    "counties": [
      "Cuyahoga",
      "Lorain",
      "Lake",
      "Geauga",
      "Medina"
    ]
  },
  {
    "id": "OH-miami-valley-dayton",
    "name": "Miami Valley & Dayton",
    "fullName": "Miami Valley (Dayton Aerospace & Wright-Patterson AFB)",
    "state": "OH",
    "tier": 1,
    "parentRegion": null,
    "description": "Birthplace of Aviation, Wright-Patterson Air Force Base (Air Force Materiel Command), University of Dayton, and sensor technology.",
    "googleUrl": "https://www.google.com/maps/place/Miami%20Valley%20%26%20Dayton,+OH",
    "counties": [
      "Montgomery",
      "Greene",
      "Miami",
      "Clark",
      "Preble"
    ]
  },
  {
    "id": "OH-northwest-toledo",
    "name": "Northwest Ohio & Toledo",
    "fullName": "Northwest Ohio (Toledo Glass City & Lake Erie Western Basin)",
    "state": "OH",
    "tier": 1,
    "parentRegion": null,
    "description": "Jeep assembly plant, glass manufacturing center (Owens-Illinois, Libbey), Port of Toledo, and solar manufacturing corridor (First Solar).",
    "googleUrl": "https://www.google.com/maps/place/Northwest%20Ohio%20%26%20Toledo,+OH",
    "counties": [
      "Lucas",
      "Wood",
      "Fulton",
      "Ottawa",
      "Sandusky",
      "Hancock"
    ]
  },
  {
    "id": "OH-cleveland-cuyahoga-core",
    "name": "Cleveland & Cuyahoga Core",
    "fullName": "Cleveland & Cuyahoga County (Downtown & University Circle)",
    "state": "OH",
    "tier": 2,
    "parentRegion": "Greater Cleveland",
    "description": "Public Square, Playhouse Square (second largest theater district in US), Cleveland Museum of Art, and Gordon Square arts district.",
    "googleUrl": "https://www.google.com/maps/place/Cleveland%20%26%20Cuyahoga%20Core,+OH",
    "counties": [
      "Cuyahoga"
    ]
  },
  {
    "id": "OH-columbus-franklin-core",
    "name": "Columbus & Franklin Core",
    "fullName": "Columbus & Franklin County (Downtown & Short North)",
    "state": "OH",
    "tier": 2,
    "parentRegion": "Central Ohio",
    "description": "Scioto Mile riverfront, Ohio Stadium (\"The Horseshoe\"), Arena District, Short North Arts District, and German Village.",
    "googleUrl": "https://www.google.com/maps/place/Columbus%20%26%20Franklin%20Core,+OH",
    "counties": [
      "Franklin"
    ]
  },
  {
    "id": "OK-greater-oklahoma-city",
    "name": "Greater Oklahoma City",
    "fullName": "Greater Oklahoma City Metropolitan Area (OKC & Bricktown)",
    "state": "OK",
    "tier": 1,
    "parentRegion": null,
    "description": "Oklahoma state capitol with working oil wells on grounds, Bricktown canal entertainment district, Tinker Air Force Base (largest air depot in DoD), and Devon Energy Tower.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Oklahoma%20City,+OK",
    "counties": [
      "Oklahoma",
      "Cleveland",
      "Canadian",
      "Logan",
      "McClain",
      "Pottawatomie"
    ]
  },
  {
    "id": "OK-southeast-choctaw",
    "name": "Southeast Oklahoma",
    "fullName": "Southeast Oklahoma & Choctaw Nation (Beavers Bend & Kiamichi Mountains)",
    "state": "OK",
    "tier": 1,
    "parentRegion": null,
    "description": "Beavers Bend State Park and Broken Bow luxury cabin getaways, Choctaw Nation headquarters in Durant, pine forests, and mountain lakes.",
    "googleUrl": "https://www.google.com/maps/place/Southeast%20Oklahoma,+OK",
    "counties": [
      "Carter",
      "Bryan",
      "Pittsburg",
      "Le Flore",
      "McCurtain"
    ]
  },
  {
    "id": "OK-southwest-lawton",
    "name": "Southwest Oklahoma",
    "fullName": "Southwest Oklahoma & Wichita Mountains (Lawton & Fort Sill)",
    "state": "OK",
    "tier": 1,
    "parentRegion": null,
    "description": "Fort Sill Fires Center of Excellence (US Army Artillery), Wichita Mountains Wildlife Refuge (free-roaming bison herds), and Quartz Mountain.",
    "googleUrl": "https://www.google.com/maps/place/Southwest%20Oklahoma,+OK",
    "counties": [
      "Comanche",
      "Stephens",
      "Grady",
      "Caddo",
      "Jackson",
      "Beckham"
    ]
  },
  {
    "id": "OK-tulsa-green-country",
    "name": "Tulsa & Green Country",
    "fullName": "Tulsa & Green Country (Oil Capital Heritage & Gathering Place)",
    "state": "OK",
    "tier": 1,
    "parentRegion": null,
    "description": "Gathering Place (world-ranked 66-acre riverfront park), world-class Art Deco architecture, Philbrook Museum of Art, Route 66, and aerospace maintenance.",
    "googleUrl": "https://www.google.com/maps/place/Tulsa%20%26%20Green%20Country,+OK",
    "counties": [
      "Tulsa",
      "Rogers",
      "Wagoner",
      "Creek",
      "Osage",
      "Okmulgee"
    ]
  },
  {
    "id": "OK-okc-oklahoma-county-core",
    "name": "Oklahoma City Core",
    "fullName": "Oklahoma City & Oklahoma County (Downtown & Midtown)",
    "state": "OK",
    "tier": 2,
    "parentRegion": "Greater Oklahoma City",
    "description": "Paycom Center (OKC Thunder NBA), Scissortail Park, Myriad Botanical Gardens crystal bridge, and Oklahoma City National Memorial & Museum.",
    "googleUrl": "https://www.google.com/maps/place/Oklahoma%20City%20Core,+OK",
    "counties": [
      "Oklahoma"
    ]
  },
  {
    "id": "OK-tulsa-county-core",
    "name": "Tulsa Urban Core",
    "fullName": "City of Tulsa & Tulsa County Core (Downtown & Arts District)",
    "state": "OK",
    "tier": 2,
    "parentRegion": "Tulsa & Green Country",
    "description": "BOK Center, Tulsa Arts District, Bob Dylan Center, Woody Guthrie Center, and Greenwood historic Black Wall Street district.",
    "googleUrl": "https://www.google.com/maps/place/Tulsa%20Urban%20Core,+OK",
    "counties": [
      "Tulsa"
    ]
  },
  {
    "id": "OR-central-high-desert-bend",
    "name": "Central Oregon",
    "fullName": "Central Oregon & High Desert (Bend, Redmond & Mount Bachelor)",
    "state": "OR",
    "tier": 1,
    "parentRegion": null,
    "description": "Outdoor recreation capital of the Pacific Northwest in Bend (300 days of sunshine, Mount Bachelor ski resort, Deschutes River fly fishing, and craft breweries).",
    "googleUrl": "https://www.google.com/maps/place/Central%20Oregon,+OR",
    "counties": [
      "Deschutes",
      "Crook",
      "Jefferson"
    ]
  },
  {
    "id": "OR-coast-columbia-gorge",
    "name": "Oregon Coast & Gorge",
    "fullName": "Oregon Coast & Columbia River Gorge (Haystack Rock to Multnomah Falls)",
    "state": "OR",
    "tier": 1,
    "parentRegion": null,
    "description": "363 miles of public coastline (Cannon Beach Haystack Rock, Tillamook Creamery cheese factory, historic Astoria), and Columbia River Gorge National Scenic Area waterfalls.",
    "googleUrl": "https://www.google.com/maps/place/Oregon%20Coast%20%26%20Gorge,+OR",
    "counties": [
      "Clatsop",
      "Tillamook",
      "Lincoln",
      "Coos",
      "Curry",
      "Hood River",
      "Wasco",
      "Sherman",
      "Gilliam",
      "Morrow",
      "Umatilla",
      "Union",
      "Wallowa",
      "Baker",
      "Grant",
      "Wheeler",
      "Harney",
      "Malheur"
    ]
  },
  {
    "id": "OR-portland-metro",
    "name": "Portland Metro",
    "fullName": "Portland Metropolitan Area & Silicon Forest",
    "state": "OR",
    "tier": 1,
    "parentRegion": null,
    "description": "Oregon's economic engine: Nike world headquarters in Beaverton, Intel's largest global semiconductor research and manufacturing campus in Hillsboro, Powell's Books, and Mount Hood vistas.",
    "googleUrl": "https://www.google.com/maps/place/Portland%20Metro,+OR",
    "counties": [
      "Multnomah",
      "Washington",
      "Clackamas",
      "Columbia",
      "Yamhill"
    ]
  },
  {
    "id": "OR-southern-rogue-valley",
    "name": "Southern Oregon",
    "fullName": "Southern Oregon & Rogue Valley (Medford, Ashland & Crater Lake)",
    "state": "OR",
    "tier": 1,
    "parentRegion": null,
    "description": "Crater Lake National Park (deepest lake in the US / pristine caldera sapphire water), Oregon Shakespeare Festival in Ashland, Harry & David orchards in Medford, and Rogue River rafting.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Oregon,+OR",
    "counties": [
      "Jackson",
      "Josephine",
      "Douglas",
      "Klamath",
      "Lake"
    ]
  },
  {
    "id": "OR-willamette-valley",
    "name": "Willamette Valley",
    "fullName": "Willamette Valley (Salem State Capital & Eugene / Ducks)",
    "state": "OR",
    "tier": 1,
    "parentRegion": null,
    "description": "World-renowned Willamette Valley Pinot Noir wine AVA, Oregon state capitol in Salem, University of Oregon (TrackTown USA) in Eugene, and Oregon State University in Corvallis.",
    "googleUrl": "https://www.google.com/maps/place/Willamette%20Valley,+OR",
    "counties": [
      "Marion",
      "Polk",
      "Linn",
      "Benton",
      "Lane"
    ]
  },
  {
    "id": "OR-bend-deschutes-core",
    "name": "Bend & Deschutes County",
    "fullName": "Bend & Deschutes County (Cascade Lakes & Old Mill)",
    "state": "OR",
    "tier": 2,
    "parentRegion": "Central Oregon",
    "description": "Historic Old Mill District along the Deschutes River, Phil's Trail mountain biking, Mount Bachelor gateway, and craft brewery trail.",
    "googleUrl": "https://www.google.com/maps/place/Bend%20%26%20Deschutes%20County,+OR",
    "counties": [
      "Deschutes"
    ]
  },
  {
    "id": "OR-portland-multnomah-core",
    "name": "Portland & Multnomah Core",
    "fullName": "City of Portland & Multnomah County (Pearl District & Downtown)",
    "state": "OR",
    "tier": 2,
    "parentRegion": "Portland Metro",
    "description": "Willamette River bridges (\"Bridgetown\"), Pearl District galleries, Forest Park (one of the largest urban forest reserves in the country), and Pioneer Courthouse Square.",
    "googleUrl": "https://www.google.com/maps/place/Portland%20%26%20Multnomah%20Core,+OR",
    "counties": [
      "Multnomah"
    ]
  },
  {
    "id": "OR-silicon-forest-washington-county",
    "name": "Silicon Forest / Washington County",
    "fullName": "Silicon Forest Core (Beaverton, Hillsboro & Tigard)",
    "state": "OR",
    "tier": 2,
    "parentRegion": "Portland Metro",
    "description": "Intel Ronler Acres high-volume chip foundries, Nike World Campus, high-tech engineering corridor, and scenic Chehalem Mountains wine foothills.",
    "googleUrl": "https://www.google.com/maps/place/Silicon%20Forest%20%2F%20Washington%20County,+OR",
    "counties": [
      "Washington"
    ]
  },
  {
    "id": "PA-central-highlands",
    "name": "Central Pennsylvania",
    "fullName": "Central Pennsylvania & Allegheny Highlands (State College / Happy Valley)",
    "state": "PA",
    "tier": 1,
    "parentRegion": null,
    "description": "Penn State University flagship campus in State College, Little League World Series in Williamsport, Altoona rail history, and state forests.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Pennsylvania,+PA",
    "counties": [
      "Centre",
      "Blair",
      "Huntingdon",
      "Mifflin",
      "Juniata",
      "Snyder",
      "Union",
      "Northumberland",
      "Montour",
      "Columbia",
      "Lycoming",
      "Clinton",
      "Clearfield",
      "Cambria",
      "Bedford",
      "Somerset",
      "Fulton"
    ]
  },
  {
    "id": "PA-greater-pittsburgh-western",
    "name": "Greater Pittsburgh & Western PA",
    "fullName": "Greater Pittsburgh & Western Pennsylvania (Steel City & Tech)",
    "state": "PA",
    "tier": 1,
    "parentRegion": null,
    "description": "Carnegie Mellon University robotics / AI hub, UPMC healthcare powerhouse, Three Rivers confluence, and energy manufacturing.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Pittsburgh%20%26%20Western%20PA,+PA",
    "counties": [
      "Allegheny",
      "Westmoreland",
      "Washington",
      "Beaver",
      "Butler",
      "Fayette",
      "Armstrong",
      "Lawrence",
      "Indiana",
      "Greene"
    ]
  },
  {
    "id": "PA-lehigh-valley-northeast",
    "name": "Northeast & Lehigh Valley",
    "fullName": "Northeast Pennsylvania, Poconos & Lehigh Valley",
    "state": "PA",
    "tier": 1,
    "parentRegion": null,
    "description": "Logistics distribution crossroads, historic Bethlehem steel heritage, Pocono Mountains four-season resort retreats, and Scranton/Wilkes-Barre.",
    "googleUrl": "https://www.google.com/maps/place/Northeast%20%26%20Lehigh%20Valley,+PA",
    "counties": [
      "Lehigh",
      "Northampton",
      "Monroe",
      "Pike",
      "Wayne",
      "Carbon",
      "Lackawanna",
      "Luzerne",
      "Schuylkill"
    ]
  },
  {
    "id": "PA-northwest-great-lakes",
    "name": "Northwest Pennsylvania",
    "fullName": "Northwest Pennsylvania & Lake Erie Gateway",
    "state": "PA",
    "tier": 1,
    "parentRegion": null,
    "description": "Presque Isle State Park beaches on Lake Erie, commercial port, plastics and advanced manufacturing, and Allegheny National Forest.",
    "googleUrl": "https://www.google.com/maps/place/Northwest%20Pennsylvania,+PA",
    "counties": [
      "Erie",
      "Crawford",
      "Mercer",
      "Venango",
      "Warren",
      "Forest",
      "Clarion",
      "Elk",
      "Cameron",
      "McKean",
      "Potter",
      "Tioga",
      "Bradford",
      "Susquehanna",
      "Wyoming",
      "Sullivan"
    ]
  },
  {
    "id": "PA-south-central-capital",
    "name": "South Central & Susquehanna",
    "fullName": "South Central Pennsylvania & Capital Region (Harrisburg, Lancaster & York)",
    "state": "PA",
    "tier": 1,
    "parentRegion": null,
    "description": "Pennsylvania state capitol, Hershey chocolate capital, historic Pennsylvania Dutch Amish agricultural heartland, and Civil War Gettysburg.",
    "googleUrl": "https://www.google.com/maps/place/South%20Central%20%26%20Susquehanna,+PA",
    "counties": [
      "Dauphin",
      "Cumberland",
      "Lancaster",
      "York",
      "Lebanon",
      "Adams",
      "Franklin",
      "Perry"
    ]
  },
  {
    "id": "PA-southeast-delaware-valley",
    "name": "Southeast Pennsylvania",
    "fullName": "Southeast Pennsylvania & Delaware Valley (Greater Philadelphia)",
    "state": "PA",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic cradle of American liberty, life sciences and biotech hub, affluent suburban counties, and Delaware River deepwater ports.",
    "googleUrl": "https://www.google.com/maps/place/Southeast%20Pennsylvania,+PA",
    "counties": [
      "Philadelphia",
      "Montgomery",
      "Bucks",
      "Delaware",
      "Chester"
    ]
  },
  {
    "id": "PA-lancaster-county",
    "name": "Lancaster & Dutch Country",
    "fullName": "Lancaster County & Historic Dutch Country",
    "state": "PA",
    "tier": 2,
    "parentRegion": "South Central & Susquehanna",
    "description": "America's oldest Amish settlement, thriving downtown Lancaster arts district, farm-to-table culinary destination, and heritage tourism.",
    "googleUrl": "https://www.google.com/maps/place/Lancaster%20%26%20Dutch%20Country,+PA",
    "counties": [
      "Lancaster"
    ]
  },
  {
    "id": "PA-lehigh-valley-metro",
    "name": "Lehigh Valley",
    "fullName": "Lehigh Valley Metropolitan Area (Allentown, Bethlehem & Easton)",
    "state": "PA",
    "tier": 2,
    "parentRegion": "Northeast & Lehigh Valley",
    "description": "Fastest-growing region in PA, Sands/Wind Creek resort, Crayola headquarters, Martin Guitar, and multi-modal freight fulfillment logistics.",
    "googleUrl": "https://www.google.com/maps/place/Lehigh%20Valley,+PA",
    "counties": [
      "Lehigh",
      "Northampton"
    ]
  },
  {
    "id": "PA-philadelphia-core",
    "name": "Philadelphia City Core",
    "fullName": "Philadelphia County & Center City Core",
    "state": "PA",
    "tier": 2,
    "parentRegion": "Southeast Pennsylvania",
    "description": "Center City, University City (Penn, Drexel), Comcast Center skyscrapers, Independence Hall, and vibrant South/Fishtown neighborhoods.",
    "googleUrl": "https://www.google.com/maps/place/Philadelphia%20City%20Core,+PA",
    "counties": [
      "Philadelphia"
    ]
  },
  {
    "id": "PA-pittsburgh-allegheny",
    "name": "Pittsburgh & Allegheny County",
    "fullName": "Pittsburgh & Allegheny County (Downtown, Oakland & Strip District)",
    "state": "PA",
    "tier": 2,
    "parentRegion": "Greater Pittsburgh & Western PA",
    "description": "The City of Bridges, Golden Triangle skyline, CMU autonomous vehicle engineering labs, and world-class healthcare centers.",
    "googleUrl": "https://www.google.com/maps/place/Pittsburgh%20%26%20Allegheny%20County,+PA",
    "counties": [
      "Allegheny"
    ]
  },
  {
    "id": "PA-scranton-wilkes-barre-metro",
    "name": "Scranton & Wyoming Valley",
    "fullName": "Scranton / Wilkes-Barre & Wyoming Valley",
    "state": "PA",
    "tier": 2,
    "parentRegion": "Northeast & Lehigh Valley",
    "description": "Historic anthracite coal capital, University of Scranton, Mohegan Pennsylvania casino, and Pocono mountain gateway.",
    "googleUrl": "https://www.google.com/maps/place/Scranton%20%26%20Wyoming%20Valley,+PA",
    "counties": [
      "Lackawanna",
      "Luzerne"
    ]
  },
  {
    "id": "PA-main-line-suburbs",
    "name": "Suburban Philadelphia",
    "fullName": "Suburban Philadelphia (Montgomery, Bucks, Delaware & Chester)",
    "state": "PA",
    "tier": 2,
    "parentRegion": "Southeast Pennsylvania",
    "description": "Affluent Main Line estates, King of Prussia shopping/commercial corridor, historic Bucks County artist colonies, and Brandywine Valley.",
    "googleUrl": "https://www.google.com/maps/place/Suburban%20Philadelphia,+PA",
    "counties": [
      "Montgomery",
      "Bucks",
      "Delaware",
      "Chester"
    ]
  },
  {
    "id": "PR-eastern-porta-antillas",
    "name": "Eastern Puerto Rico & Islands",
    "fullName": "Eastern Puerto Rico, El Yunque & Spanish Virgin Islands (Culebra & Vieques)",
    "state": "PR",
    "tier": 1,
    "parentRegion": null,
    "description": "El Yunque National Forest (only tropical rainforest in US National Forest System), bioluminescent Mosquito Bay in Vieques, world-ranked Flamenco Beach in Culebra, and Fajardo marinas.",
    "googleUrl": "https://www.google.com/maps/place/Eastern%20Puerto%20Rico%20%26%20Islands,+PR",
    "counties": [
      "Fajardo",
      "Luquillo",
      "Río Grande",
      "Canóvanas",
      "Loíza",
      "Ceiba",
      "Naguabo",
      "Humacao",
      "Yabucoa",
      "Caguas",
      "Gurabo",
      "San Lorenzo",
      "Juncos",
      "Las Piedras",
      "Culebra",
      "Vieques"
    ]
  },
  {
    "id": "PR-northern-coast-porta-atlantico",
    "name": "Northern Coast",
    "fullName": "Northern Coast & Porta Atlántico (Arecibo & Karst Country)",
    "state": "PR",
    "tier": 1,
    "parentRegion": null,
    "description": "Limestone mogotes and karst caves at Camuy River Cave Park, historic Arecibo observatory region, Atlantic Ocean surf breaks in Vega Baja, and pharmaceutical manufacturing.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Coast,+PR",
    "counties": [
      "Arecibo",
      "Camuy",
      "Hatillo",
      "Barceloneta",
      "Florida",
      "Manatí",
      "Vega Baja",
      "Vega Alta",
      "Dorado",
      "Toa Baja",
      "Toa Alta"
    ]
  },
  {
    "id": "PR-san-juan-metro",
    "name": "San Juan Metro",
    "fullName": "San Juan Metropolitan Area (Old San Juan, Condado & Hato Rey)",
    "state": "PR",
    "tier": 1,
    "parentRegion": null,
    "description": "Capital of Puerto Rico, historic 16th-century fortress Castillo San Felipe del Morro, Condado beachfront resorts, and Hato Rey \"Golden Mile\" banking financial center.",
    "googleUrl": "https://www.google.com/maps/place/San%20Juan%20Metro,+PR",
    "counties": [
      "San Juan",
      "Bayamón",
      "Carolina",
      "Guaynabo",
      "Trujillo Alto",
      "Cataño"
    ]
  },
  {
    "id": "PR-southern-porta-caribe",
    "name": "Southern Puerto Rico",
    "fullName": "Southern Puerto Rico & Porta Caribe (Ponce The Pearl of the South)",
    "state": "PR",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic city of Ponce (Parque de Bombas historic fire station, Ponce Museum of Art), Serrallés rum distillery (Don Q), Caribbean Sea harbor, and fertile coastal plains.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Puerto%20Rico,+PR",
    "counties": [
      "Ponce",
      "Juana Díaz",
      "Santa Isabel",
      "Salinas",
      "Guayama",
      "Peñuelas",
      "Guayanilla",
      "Yauco"
    ]
  },
  {
    "id": "PR-western-porta-del-sol",
    "name": "Western Puerto Rico",
    "fullName": "Western Puerto Rico & Porta del Sol (Rincón Surf & Mayagüez)",
    "state": "PR",
    "tier": 1,
    "parentRegion": null,
    "description": "World-class surfing in Rincón, bioluminescent bay in La Parguera, dramatic limestone cliffs and lighthouse in Cabo Rojo, and University of Puerto Rico at Mayagüez engineering campus.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Puerto%20Rico,+PR",
    "counties": [
      "Mayagüez",
      "Aguadilla",
      "Rincón",
      "Cabo Rojo",
      "Aguada",
      "Moca",
      "Isabela",
      "San Sebastián",
      "Añasco",
      "Hormigueros"
    ]
  },
  {
    "id": "PR-mayaguez-porta-del-sol-core",
    "name": "Mayagüez & Western Coast",
    "fullName": "Mayagüez & Porta del Sol Coastal Hub",
    "state": "PR",
    "tier": 2,
    "parentRegion": "Western Puerto Rico",
    "description": "Historic Plaza Colón, Teatro Yagüez, Port of Mayagüez, coastal culinary strip in Joyuda (seafood capital), and Rincón surfing beaches.",
    "googleUrl": "https://www.google.com/maps/place/Mayag%C3%BCez%20%26%20Western%20Coast,+PR",
    "counties": [
      "Mayagüez",
      "Cabo Rojo"
    ]
  },
  {
    "id": "PR-san-juan-capital-core",
    "name": "San Juan Capital Core",
    "fullName": "City of San Juan & Historic District",
    "state": "PR",
    "tier": 2,
    "parentRegion": "San Juan Metro",
    "description": "Historic UNESCO World Heritage fortresses El Morro and San Cristóbal, pastel colonial cobblestone streets, Puerto Rico Convention Center, and Luis Muñoz Marín International Airport.",
    "googleUrl": "https://www.google.com/maps/place/San%20Juan%20Capital%20Core,+PR",
    "counties": [
      "San Juan"
    ]
  },
  {
    "id": "RI-greater-providence",
    "name": "Greater Providence",
    "fullName": "Greater Providence & Blackstone Valley (Creative Capital & Ivy League)",
    "state": "RI",
    "tier": 1,
    "parentRegion": null,
    "description": "Rhode Island state capitol, Brown University and RISD (Rhode Island School of Design), WaterFire festival, Federal Hill Italian dining, and Blackstone River Valley (birthplace of American Industrial Revolution).",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Providence,+RI",
    "counties": [
      "Providence",
      "Bristol"
    ]
  },
  {
    "id": "RI-kent-county-west-bay",
    "name": "Kent County & West Bay",
    "fullName": "Kent County & West Bay (Warwick & TF Green Airport)",
    "state": "RI",
    "tier": 1,
    "parentRegion": null,
    "description": "Rhode Island T.F. Green International Airport, Goddard Memorial State Park on Greenwich Bay, historic East Greenwich main street, and distribution logistics.",
    "googleUrl": "https://www.google.com/maps/place/Kent%20County%20%26%20West%20Bay,+RI",
    "counties": [
      "Kent"
    ]
  },
  {
    "id": "RI-newport-aquidneck",
    "name": "Newport & Aquidneck Island",
    "fullName": "Newport & Aquidneck Island (Sailing Capital & Gilded Age Mansions)",
    "state": "RI",
    "tier": 1,
    "parentRegion": null,
    "description": "Sailing capital of the world, Gilded Age Vanderbilt mansions (The Breakers, Marble House), Cliff Walk ocean trail, International Tennis Hall of Fame, and Naval War College.",
    "googleUrl": "https://www.google.com/maps/place/Newport%20%26%20Aquidneck%20Island,+RI",
    "counties": [
      "Newport"
    ]
  },
  {
    "id": "RI-south-county-beaches",
    "name": "South County & Coastal",
    "fullName": "South County & Coastal Rhode Island (Narragansett & Watch Hill)",
    "state": "RI",
    "tier": 1,
    "parentRegion": null,
    "description": "Over 100 miles of coastline, Narragansett Town Beach surfing, Ocean House luxury resort in Watch Hill, Point Judith Block Island ferry terminal, and University of Rhode Island in Kingston.",
    "googleUrl": "https://www.google.com/maps/place/South%20County%20%26%20Coastal,+RI",
    "counties": [
      "Washington"
    ]
  },
  {
    "id": "RI-providence-urban-core",
    "name": "City of Providence Core",
    "fullName": "City of Providence Urban Core (College Hill & Downtown)",
    "state": "RI",
    "tier": 2,
    "parentRegion": "Greater Providence",
    "description": "Providence Riverwalk, College Hill historic brick architecture, Rhode Island State House, and Providence Performing Arts Center.",
    "googleUrl": "https://www.google.com/maps/place/City%20of%20Providence%20Core,+RI",
    "counties": [
      "Providence"
    ]
  },
  {
    "id": "SC-charleston-lowcountry",
    "name": "Charleston & Lowcountry",
    "fullName": "Charleston Metropolitan Area & Coastal Lowcountry",
    "state": "SC",
    "tier": 1,
    "parentRegion": null,
    "description": "America's top-ranked historic city, Battery promenade, Rainbow Row, Medical University of South Carolina (MUSC), and Boeing 787 assembly facility.",
    "googleUrl": "https://www.google.com/maps/place/Charleston%20%26%20Lowcountry,+SC",
    "counties": [
      "Charleston",
      "Berkeley",
      "Dorchester",
      "Beaufort",
      "Jasper",
      "Colleton",
      "Hampton"
    ]
  },
  {
    "id": "SC-columbia-midlands",
    "name": "Columbia & The Midlands",
    "fullName": "Columbia & The Midlands (State Capital & Fort Jackson)",
    "state": "SC",
    "tier": 1,
    "parentRegion": null,
    "description": "South Carolina state capitol, University of South Carolina flagship campus, Lake Murray recreation, and Fort Jackson (Army's largest training center).",
    "googleUrl": "https://www.google.com/maps/place/Columbia%20%26%20The%20Midlands,+SC",
    "counties": [
      "Richland",
      "Lexington",
      "Kershaw",
      "Fairfield",
      "Newberry",
      "Sumter",
      "Orangeburg",
      "Calhoun"
    ]
  },
  {
    "id": "SC-greenville-upstate",
    "name": "Greenville & The Upstate",
    "fullName": "Greenville-Spartanburg & The Upstate (I-85 Automotive Corridor)",
    "state": "SC",
    "tier": 1,
    "parentRegion": null,
    "description": "Thriving Downtown Greenville with Falls Park on the Reedy, BMW's largest global manufacturing plant, Michelin North America HQ, and Clemson University.",
    "googleUrl": "https://www.google.com/maps/place/Greenville%20%26%20The%20Upstate,+SC",
    "counties": [
      "Greenville",
      "Spartanburg",
      "Anderson",
      "Pickens",
      "Oconee",
      "Laurens",
      "Cherokee",
      "Union"
    ]
  },
  {
    "id": "SC-myrtle-beach-grand-strand",
    "name": "Myrtle Beach & Grand Strand",
    "fullName": "Myrtle Beach & The Grand Strand (60 Miles of Atlantic Coast)",
    "state": "SC",
    "tier": 1,
    "parentRegion": null,
    "description": "Major family vacation and golf capital with over 90 championship courses, Broadway at the Beach, SkyWheel, and Pawleys Island hammocks.",
    "googleUrl": "https://www.google.com/maps/place/Myrtle%20Beach%20%26%20Grand%20Strand,+SC",
    "counties": [
      "Horry",
      "Georgetown",
      "Marion",
      "Florence",
      "Williamsburg"
    ]
  },
  {
    "id": "SC-charleston-metro-core",
    "name": "Greater Charleston Core",
    "fullName": "Greater Charleston Core (Charleston, Mount Pleasant & Summerville)",
    "state": "SC",
    "tier": 2,
    "parentRegion": "Charleston & Lowcountry",
    "description": "Historic peninsula, Mount Pleasant Shem Creek shrimp boats, Daniel Island tech corridor, and deepwater container terminals.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Charleston%20Core,+SC",
    "counties": [
      "Charleston",
      "Berkeley",
      "Dorchester"
    ]
  },
  {
    "id": "SC-hilton-head-beaufort",
    "name": "Hilton Head & Beaufort",
    "fullName": "Hilton Head Island, Bluffton & Historic Beaufort",
    "state": "SC",
    "tier": 2,
    "parentRegion": "Charleston & Lowcountry",
    "description": "Gated resort plantations (Sea Pines, Palmetto Dunes), RBC Heritage PGA golf, Marine Corps Recruit Depot Parris Island, and antebellum Beaufort.",
    "googleUrl": "https://www.google.com/maps/place/Hilton%20Head%20%26%20Beaufort,+SC",
    "counties": [
      "Beaufort",
      "Jasper"
    ]
  },
  {
    "id": "SD-black-hills-rapid-city",
    "name": "Black Hills & Rapid City",
    "fullName": "Black Hills & Rapid City (Mount Rushmore, Badlands & Sturgis)",
    "state": "SD",
    "tier": 1,
    "parentRegion": null,
    "description": "Mount Rushmore National Memorial, Crazy Horse Memorial, Badlands National Park, Custer State Park buffalo herds, Ellsworth AFB (B-21 Raider stealth bomber), and historic Deadwood.",
    "googleUrl": "https://www.google.com/maps/place/Black%20Hills%20%26%20Rapid%20City,+SD",
    "counties": [
      "Pennington",
      "Meade",
      "Lawrence",
      "Custer",
      "Fall River",
      "Oglala Lakota",
      "Butte"
    ]
  },
  {
    "id": "SD-central-missouri-river",
    "name": "Central South Dakota",
    "fullName": "Central South Dakota & Capital Region (Pierre & Lake Oahe)",
    "state": "SD",
    "tier": 1,
    "parentRegion": null,
    "description": "South Dakota state capitol in Pierre along the Missouri River, massive Lake Oahe reservoir (one of the largest dam reservoirs in the US for walleye fishing), and expansive cattle ranchlands.",
    "googleUrl": "https://www.google.com/maps/place/Central%20South%20Dakota,+SD",
    "counties": [
      "Hughes",
      "Stanley",
      "Lyman",
      "Brule",
      "Potter",
      "Sully",
      "Dewey",
      "Corson",
      "Ziebach",
      "Haakon",
      "Jackson",
      "Jones",
      "Mellette",
      "Todd",
      "Tripp",
      "Gregory"
    ]
  },
  {
    "id": "SD-sioux-falls-east-river",
    "name": "Sioux Falls & East River",
    "fullName": "Sioux Falls & East River South Dakota (Falls Park & Financial Hub)",
    "state": "SD",
    "tier": 1,
    "parentRegion": null,
    "description": "South Dakota's largest city, natural quartzite waterfalls at Falls Park, major national credit card banking and financial operations (no state income tax), and healthcare.",
    "googleUrl": "https://www.google.com/maps/place/Sioux%20Falls%20%26%20East%20River,+SD",
    "counties": [
      "Minnehaha",
      "Lincoln",
      "Brown",
      "Brookings",
      "Codington",
      "Yankton",
      "Davison",
      "Clay",
      "Union",
      "Lake",
      "Moody",
      "Turner",
      "McCook"
    ]
  },
  {
    "id": "SD-sioux-falls-metro-core",
    "name": "Sioux Falls Metro Core",
    "fullName": "Sioux Falls Metropolitan Area (Minnehaha & Lincoln Counties)",
    "state": "SD",
    "tier": 2,
    "parentRegion": "Sioux Falls & East River",
    "description": "Rapidly expanding commercial nucleus spanning Minnehaha and Lincoln counties, Denny Sanford PREMIER Center, Sanford Health, and Avera Health systems.",
    "googleUrl": "https://www.google.com/maps/place/Sioux%20Falls%20Metro%20Core,+SD",
    "counties": [
      "Minnehaha",
      "Lincoln"
    ]
  },
  {
    "id": "TN-chattanooga-southeast",
    "name": "Chattanooga & Southeast TN",
    "fullName": "Chattanooga & Southeast Tennessee (Scenic City & Gig City)",
    "state": "TN",
    "tier": 1,
    "parentRegion": null,
    "description": "Lookout Mountain, Tennessee Aquarium, America's first citywide gigabit fiber network (\"Gig City\"), and Volkswagen electric vehicle assembly.",
    "googleUrl": "https://www.google.com/maps/place/Chattanooga%20%26%20Southeast%20TN,+TN",
    "counties": [
      "Hamilton",
      "Bradley",
      "Marion",
      "Rhea",
      "Sequatchie",
      "Polk",
      "Bledsoe",
      "Meigs"
    ]
  },
  {
    "id": "TN-east-knoxville-smokies",
    "name": "East Tennessee",
    "fullName": "East Tennessee & The Smokies (Knoxville, Oak Ridge & Great Smoky Mountains)",
    "state": "TN",
    "tier": 1,
    "parentRegion": null,
    "description": "Great Smoky Mountains National Park (most visited national park in US), University of Tennessee in Knoxville, and Oak Ridge National Laboratory.",
    "googleUrl": "https://www.google.com/maps/place/East%20Tennessee,+TN",
    "counties": [
      "Knox",
      "Blount",
      "Sevier",
      "Anderson",
      "Loudon",
      "Roane",
      "Jefferson",
      "Grainger",
      "Cocke",
      "Hamblen",
      "Monroe",
      "McMinn"
    ]
  },
  {
    "id": "TN-middle-nashville-capital",
    "name": "Middle Tennessee",
    "fullName": "Middle Tennessee & Greater Nashville (Music City USA)",
    "state": "TN",
    "tier": 1,
    "parentRegion": null,
    "description": "Global capital of country music, healthcare industry center (HCA Healthcare), Vanderbilt University, Nissan North America, and rapid population growth.",
    "googleUrl": "https://www.google.com/maps/place/Middle%20Tennessee,+TN",
    "counties": [
      "Davidson",
      "Williamson",
      "Rutherford",
      "Wilson",
      "Sumner",
      "Robertson",
      "Cheatham",
      "Dickson",
      "Maury",
      "Montgomery"
    ]
  },
  {
    "id": "TN-tri-cities-mountain",
    "name": "Tri-Cities Region",
    "fullName": "Tri-Cities Tennessee (Johnson City, Kingsport & Bristol)",
    "state": "TN",
    "tier": 1,
    "parentRegion": null,
    "description": "Bristol Motor Speedway (\"The Last Great Colosseum\"), birthplace of country music (1927 Bristol Sessions), and East Tennessee State University.",
    "googleUrl": "https://www.google.com/maps/place/Tri-Cities%20Region,+TN",
    "counties": [
      "Washington",
      "Sullivan",
      "Carter",
      "Hawkins",
      "Unicoi",
      "Johnson",
      "Greene"
    ]
  },
  {
    "id": "TN-west-memphis-delta",
    "name": "West Tennessee",
    "fullName": "West Tennessee & Greater Memphis (Blues, BBQ & Global Logistics)",
    "state": "TN",
    "tier": 1,
    "parentRegion": null,
    "description": "FedEx SuperHub (busiest cargo airport in Western Hemisphere), historic Beale Street blues, Graceland (Elvis Presley), and Mississippi River delta.",
    "googleUrl": "https://www.google.com/maps/place/West%20Tennessee,+TN",
    "counties": [
      "Shelby",
      "Fayette",
      "Tipton",
      "Madison",
      "Gibson",
      "Dyer",
      "Lauderdale",
      "Haywood",
      "Hardeman",
      "McNairy"
    ]
  },
  {
    "id": "TN-memphis-shelby-core",
    "name": "Memphis & Shelby Core",
    "fullName": "Memphis & Shelby County (Downtown, Midtown & East Memphis)",
    "state": "TN",
    "tier": 2,
    "parentRegion": "West Tennessee",
    "description": "National Civil Rights Museum, St. Jude Children's Research Hospital, AutoZone headquarters, and Sun Studio.",
    "googleUrl": "https://www.google.com/maps/place/Memphis%20%26%20Shelby%20Core,+TN",
    "counties": [
      "Shelby"
    ]
  },
  {
    "id": "TN-nashville-davidson-core",
    "name": "Nashville & Davidson Core",
    "fullName": "Nashville & Davidson County (Downtown, The Gulch & Music Row)",
    "state": "TN",
    "tier": 2,
    "parentRegion": "Middle Tennessee",
    "description": "Ryman Auditorium, Broadway honky-tonk strip, Music Row recording studios, state capitol, and Nissan Stadium.",
    "googleUrl": "https://www.google.com/maps/place/Nashville%20%26%20Davidson%20Core,+TN",
    "counties": [
      "Davidson"
    ]
  },
  {
    "id": "TN-williamson-franklin-affluent",
    "name": "Williamson & Franklin",
    "fullName": "Williamson County (Historic Franklin, Brentwood & Cool Springs)",
    "state": "TN",
    "tier": 2,
    "parentRegion": "Middle Tennessee",
    "description": "One of the wealthiest counties in the nation, historic downtown Franklin Main Street, Cool Springs corporate corridor, and equestrian rolling hills.",
    "googleUrl": "https://www.google.com/maps/place/Williamson%20%26%20Franklin,+TN",
    "counties": [
      "Williamson"
    ]
  },
  {
    "id": "TX-central-texas",
    "name": "Central Texas",
    "fullName": "Central Texas (Austin & Texas Hill Country)",
    "state": "TX",
    "tier": 1,
    "parentRegion": null,
    "description": "Silicon Hills tech hub in Austin, Texas State Capitol, University of Texas, scenic Hill Country wineries, and music capital.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Texas,+TX",
    "counties": [
      "Travis",
      "Williamson",
      "Hays",
      "Bastrop",
      "Caldwell",
      "Blanco",
      "Burnet",
      "Llano",
      "Gillespie",
      "Bell",
      "McLennan",
      "Coryell",
      "Falls"
    ]
  },
  {
    "id": "TX-east-texas",
    "name": "East Texas",
    "fullName": "East Texas (Piney Woods, Tyler & Longview)",
    "state": "TX",
    "tier": 1,
    "parentRegion": null,
    "description": "Lush Piney Woods forests, Caddo Lake, Tyler rose capital, oil discovery heritage, and border gateway to Louisiana and Arkansas.",
    "googleUrl": "https://www.google.com/maps/place/East%20Texas,+TX",
    "counties": [
      "Smith",
      "Gregg",
      "Harrison",
      "Rusk",
      "Nacogdoches",
      "Angelina",
      "Bowie",
      "Cass",
      "Wood"
    ]
  },
  {
    "id": "TX-gulf-coast-texas",
    "name": "Gulf Coast Texas",
    "fullName": "Gulf Coast Texas (Greater Houston & Space City)",
    "state": "TX",
    "tier": 1,
    "parentRegion": null,
    "description": "Fourth largest city in US, Texas Medical Center (largest medical complex in world), Port of Houston energy corridor, NASA Johnson Space Center, and Galveston Bay.",
    "googleUrl": "https://www.google.com/maps/place/Gulf%20Coast%20Texas,+TX",
    "counties": [
      "Harris",
      "Fort Bend",
      "Montgomery",
      "Brazoria",
      "Galveston",
      "Liberty",
      "Waller",
      "Chambers"
    ]
  },
  {
    "id": "TX-north-texas",
    "name": "North Texas",
    "fullName": "North Texas (DFW Metroplex)",
    "state": "TX",
    "tier": 1,
    "parentRegion": null,
    "description": "The economic powerhouse of North Texas centered around Dallas and Fort Worth, major corporate HQs, and DFW International Airport.",
    "googleUrl": "https://www.google.com/maps/place/North%20Texas,+TX",
    "counties": [
      "Dallas",
      "Tarrant",
      "Collin",
      "Denton",
      "Rockwall",
      "Ellis",
      "Kaufman",
      "Johnson",
      "Parker",
      "Wise"
    ]
  },
  {
    "id": "TX-san-antonio-south-texas",
    "name": "San Antonio & South Texas",
    "fullName": "San Antonio & South Texas (Alamo City & Rio Grande Valley)",
    "state": "TX",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Alamo, San Antonio River Walk, Joint Base San Antonio (Military City USA), cross-border trade corridors, and subtropical Rio Grande Valley.",
    "googleUrl": "https://www.google.com/maps/place/San%20Antonio%20%26%20South%20Texas,+TX",
    "counties": [
      "Bexar",
      "Comal",
      "Guadalupe",
      "Medina",
      "Kendall",
      "Wilson",
      "Hidalgo",
      "Cameron",
      "Starr",
      "Willacy",
      "Nueces",
      "San Patricio"
    ]
  },
  {
    "id": "TX-west-texas",
    "name": "West Texas",
    "fullName": "West Texas & Permian Basin (Midland, Odessa, Lubbock & El Paso)",
    "state": "TX",
    "tier": 1,
    "parentRegion": null,
    "description": "America's highest-producing oil and natural gas field (Permian Basin), Texas Tech University in Lubbock, wind energy farms, and Big Bend / El Paso borderlands.",
    "googleUrl": "https://www.google.com/maps/place/West%20Texas,+TX",
    "counties": [
      "Midland",
      "Ector",
      "Tom Green",
      "Lubbock",
      "Taylor",
      "Howard",
      "El Paso",
      "Hudspeth",
      "Potter",
      "Randall"
    ]
  },
  {
    "id": "TX-coastal-bend",
    "name": "Coastal Bend",
    "fullName": "Coastal Bend & Corpus Christi (Gulf Port & Barrier Islands)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "San Antonio & South Texas",
    "description": "Port of Corpus Christi (leading US crude oil export gateway), Texas State Aquarium, Padre Island National Seashore, and coastal wind farms.",
    "googleUrl": "https://www.google.com/maps/place/Coastal%20Bend,+TX",
    "counties": [
      "Nueces",
      "San Patricio",
      "Aransas",
      "Kleberg",
      "Jim Wells"
    ]
  },
  {
    "id": "TX-collin-denton",
    "name": "Collin & Denton",
    "fullName": "Collin & Denton Counties (Frisco, Plano & McKinney)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "North Texas",
    "description": "Platinum Corridor corporate headquarters (Toyota, Frito-Lay), master-planned Frisco sports city, and top-ranked public schools.",
    "googleUrl": "https://www.google.com/maps/place/Collin%20%26%20Denton,+TX",
    "counties": [
      "Collin",
      "Denton"
    ]
  },
  {
    "id": "TX-dallas-core",
    "name": "Dallas County & Metro",
    "fullName": "Dallas County & Urban Core (Downtown, Uptown & Suburbs)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "North Texas",
    "description": "Financial, telecommunications, and arts capital of Texas, Dallas Arts District, and major corporate employment centers.",
    "googleUrl": "https://www.google.com/maps/place/Dallas%20County%20%26%20Metro,+TX",
    "counties": [
      "Dallas",
      "Rockwall",
      "Ellis",
      "Kaufman"
    ]
  },
  {
    "id": "TX-el-paso-trans-pecos",
    "name": "El Paso & Trans-Pecos",
    "fullName": "El Paso Metro & Trans-Pecos (Borderplex & Big Bend)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "West Texas",
    "description": "Franklin Mountains, Fort Bliss, international trade with Ciudad Juárez, and gateway to Big Bend National Park and Marfa.",
    "googleUrl": "https://www.google.com/maps/place/El%20Paso%20%26%20Trans-Pecos,+TX",
    "counties": [
      "El Paso",
      "Hudspeth",
      "Culberson",
      "Reeves",
      "Brewster",
      "Presidio"
    ]
  },
  {
    "id": "TX-fort-worth-tarrant",
    "name": "Fort Worth & Tarrant",
    "fullName": "Fort Worth & Tarrant County (Cowtown & Mid-Cities)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "North Texas",
    "description": "Fort Worth Stockyards Western heritage, Lockheed Martin / Bell defense aerospace, Arlington entertainment district (Cowboys / Rangers stadiums).",
    "googleUrl": "https://www.google.com/maps/place/Fort%20Worth%20%26%20Tarrant,+TX",
    "counties": [
      "Tarrant",
      "Parker",
      "Johnson",
      "Wise"
    ]
  },
  {
    "id": "TX-greater-austin",
    "name": "Greater Austin",
    "fullName": "Greater Austin Metropolitan Area (Silicon Hills)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "Central Texas",
    "description": "Tech giants (Tesla, Apple, Dell, Google, Samsung foundry), South by Southwest (SXSW), Austin FC, and Colorado River lakes.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Austin,+TX",
    "counties": [
      "Travis",
      "Williamson",
      "Hays",
      "Bastrop",
      "Caldwell"
    ]
  },
  {
    "id": "TX-greater-san-antonio",
    "name": "Greater San Antonio",
    "fullName": "Greater San Antonio Metropolitan Area (Bexar & Comal)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "San Antonio & South Texas",
    "description": "Rich Hispanic and German heritage, cybersecurity hub, USAA headquarters, Toyota manufacturing plant, and New Braunfels Hill Country gateway.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20San%20Antonio,+TX",
    "counties": [
      "Bexar",
      "Comal",
      "Guadalupe",
      "Medina",
      "Kendall",
      "Wilson"
    ]
  },
  {
    "id": "TX-rio-grande-valley",
    "name": "Rio Grande Valley",
    "fullName": "Rio Grande Valley / RGV (McAllen & Brownsville)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "San Antonio & South Texas",
    "description": "Bilingual border metropolis, SpaceX Starbase launch site at Boca Chica, cross-border manufacturing, and citrus agriculture.",
    "googleUrl": "https://www.google.com/maps/place/Rio%20Grande%20Valley,+TX",
    "counties": [
      "Hidalgo",
      "Cameron",
      "Starr",
      "Willacy"
    ]
  },
  {
    "id": "TX-texas-hill-country",
    "name": "Texas Hill Country",
    "fullName": "Texas Hill Country (Fredericksburg, Kerrville & Marble Falls)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "Central Texas",
    "description": "Limestone hills, spring-fed rivers (Guadalupe, Frio), German heritage wineries in Fredericksburg, and Enchanted Rock.",
    "googleUrl": "https://www.google.com/maps/place/Texas%20Hill%20Country,+TX",
    "counties": [
      "Blanco",
      "Gillespie",
      "Kerr",
      "Kendall",
      "Bandera",
      "Llano",
      "Burnet",
      "Mason"
    ]
  },
  {
    "id": "TX-texas-panhandle",
    "name": "Texas Panhandle",
    "fullName": "Texas Panhandle & High Plains (Amarillo & Palo Duro)",
    "state": "TX",
    "tier": 2,
    "parentRegion": "West Texas",
    "description": "Palo Duro Canyon (second largest canyon in US), Route 66, Cadillac Ranch, cattle feedlots, and wind energy corridor.",
    "googleUrl": "https://www.google.com/maps/place/Texas%20Panhandle,+TX",
    "counties": [
      "Potter",
      "Randall",
      "Moore",
      "Hutchinson",
      "Deaf Smith",
      "Gray",
      "Hale"
    ]
  },
  {
    "id": "UT-northern-utah-ogden-logan",
    "name": "Northern Utah",
    "fullName": "Northern Utah & Bear River (Ogden Aerospace & Cache Valley)",
    "state": "UT",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic 25th Street in Ogden, Hill Air Force Base (largest employer in northern Utah / F-35 maintenance), and Utah State University in Logan.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Utah,+UT",
    "counties": [
      "Weber",
      "Cache",
      "Box Elder",
      "Rich"
    ]
  },
  {
    "id": "UT-southern-red-rock-zion",
    "name": "Southern Utah & Red Rock",
    "fullName": "Southern Utah & The Mighty 5 (Zion, Bryce, Moab & St. George)",
    "state": "UT",
    "tier": 1,
    "parentRegion": null,
    "description": "Zion National Park, Bryce Canyon, Arches, Canyonlands, Capitol Reef, booming year-round resort climate in St. George, and red sandstone arches.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Utah%20%26%20Red%20Rock,+UT",
    "counties": [
      "Washington",
      "Iron",
      "Kane",
      "Garfield",
      "Wayne",
      "San Juan",
      "Grand",
      "Emery",
      "Carbon",
      "Sevier",
      "Sanpete",
      "Millard",
      "Beaver",
      "Piute"
    ]
  },
  {
    "id": "UT-utah-valley-silicon-slopes",
    "name": "Utah Valley / Silicon Slopes",
    "fullName": "Utah Valley & Silicon Slopes (Provo, Orem & Lehi Tech Hub)",
    "state": "UT",
    "tier": 1,
    "parentRegion": null,
    "description": "One of the fastest-growing tech and SaaS corridors in the country (Adobe, Qualtrics, Ancestry), Brigham Young University (BYU), and Mount Timpanogos.",
    "googleUrl": "https://www.google.com/maps/place/Utah%20Valley%20%2F%20Silicon%20Slopes,+UT",
    "counties": [
      "Utah",
      "Wasatch"
    ]
  },
  {
    "id": "UT-wasatch-front",
    "name": "Wasatch Front",
    "fullName": "Wasatch Front & Salt Lake Metro (Crossroads of the West)",
    "state": "UT",
    "tier": 1,
    "parentRegion": null,
    "description": "Utah state capitol overlooking Salt Lake Valley, Temple Square, Salt Lake City International Airport hub, and immediate access to world-class ski canyons.",
    "googleUrl": "https://www.google.com/maps/place/Wasatch%20Front,+UT",
    "counties": [
      "Salt Lake",
      "Davis",
      "Tooele",
      "Morgan"
    ]
  },
  {
    "id": "UT-st-george-washington-core",
    "name": "Greater St. George & Zion",
    "fullName": "St. George Metropolitan Area & Washington County (Red Rock Gateway)",
    "state": "UT",
    "tier": 2,
    "parentRegion": "Southern Utah & Red Rock",
    "description": "Fast-growing desert haven, Tuacahn Amphitheatre red cliff theater, Sand Hollow reservoir, championship golf courses, and Zion gateway.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20St.%20George%20%26%20Zion,+UT",
    "counties": [
      "Washington"
    ]
  },
  {
    "id": "UT-salt-lake-county-core",
    "name": "Salt Lake County Core",
    "fullName": "Salt Lake County & Downtown Core",
    "state": "UT",
    "tier": 2,
    "parentRegion": "Wasatch Front",
    "description": "Downtown SLC, Delta Center (Utah Jazz / NHL), University of Utah research park, Sugar House, and Cottonwood Canyons ski access.",
    "googleUrl": "https://www.google.com/maps/place/Salt%20Lake%20County%20Core,+UT",
    "counties": [
      "Salt Lake"
    ]
  },
  {
    "id": "VA-central-richmond-capital",
    "name": "Central Virginia",
    "fullName": "Central Virginia & Capital Region (Greater Richmond & Tri-Cities)",
    "state": "VA",
    "tier": 1,
    "parentRegion": null,
    "description": "Virginia state capital, Federal Reserve Bank of Richmond, Fortune 500 financial and tobacco headquarters, James River rapids, and VCU.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Virginia,+VA",
    "counties": [
      "Richmond",
      "Henrico",
      "Chesterfield",
      "Hanover",
      "Petersburg",
      "Hopewell",
      "Colonial Heights",
      "Powhatan",
      "Goochland",
      "Dinwiddie"
    ]
  },
  {
    "id": "VA-hampton-roads-coastal",
    "name": "Hampton Roads",
    "fullName": "Hampton Roads & Coastal Virginia (Virginia Beach, Norfolk & Newport News)",
    "state": "VA",
    "tier": 1,
    "parentRegion": null,
    "description": "World's largest naval base (Naval Station Norfolk), Newport News Shipbuilding (nuclear aircraft carriers), Atlantic Ocean oceanfront in Virginia Beach, and Colonial Williamsburg.",
    "googleUrl": "https://www.google.com/maps/place/Hampton%20Roads,+VA",
    "counties": [
      "Virginia Beach",
      "Norfolk",
      "Chesapeake",
      "Newport News",
      "Hampton",
      "Portsmouth",
      "Suffolk",
      "James City",
      "York",
      "Williamsburg",
      "Poquoson"
    ]
  },
  {
    "id": "VA-northern-virginia",
    "name": "Northern Virginia (NoVA)",
    "fullName": "Northern Virginia (DC Suburbs & Data Center Alley)",
    "state": "VA",
    "tier": 1,
    "parentRegion": null,
    "description": "The world's largest concentration of data centers (Loudoun County handles 70% of global internet traffic), Pentagon, CIA, and Amazon HQ2.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Virginia%20(NoVA),+VA",
    "counties": [
      "Fairfax",
      "Arlington",
      "Loudoun",
      "Prince William",
      "Alexandria",
      "Falls Church",
      "Manassas",
      "Manassas Park",
      "Fauquier",
      "Stafford"
    ]
  },
  {
    "id": "VA-shenandoah-charlottesville",
    "name": "Shenandoah & Piedmont",
    "fullName": "Shenandoah Valley & Charlottesville (Blue Ridge & Wine Country)",
    "state": "VA",
    "tier": 1,
    "parentRegion": null,
    "description": "Thomas Jefferson's Monticello, University of Virginia in Charlottesville, Shenandoah National Park, Skyline Drive, and Harrisonburg poultry/ag corridor.",
    "googleUrl": "https://www.google.com/maps/place/Shenandoah%20%26%20Piedmont,+VA",
    "counties": [
      "Albemarle",
      "Charlottesville",
      "Rockingham",
      "Harrisonburg",
      "Augusta",
      "Staunton",
      "Waynesboro",
      "Frederick",
      "Winchester",
      "Shenandoah",
      "Page",
      "Warren",
      "Clarke"
    ]
  },
  {
    "id": "VA-southwest-blue-ridge",
    "name": "Southwest Virginia",
    "fullName": "Southwest Virginia & Blue Ridge Highlands (Roanoke & New River Valley)",
    "state": "VA",
    "tier": 1,
    "parentRegion": null,
    "description": "Roanoke \"Star City of the South\", Virginia Tech in Blacksburg, Mount Rogers (highest peak in VA), and Crooked Road heritage music trail.",
    "googleUrl": "https://www.google.com/maps/place/Southwest%20Virginia,+VA",
    "counties": [
      "Roanoke",
      "Salem",
      "Montgomery",
      "Radford",
      "Botetourt",
      "Franklin",
      "Pulaski",
      "Wythe",
      "Smyth",
      "Washington",
      "Bristol"
    ]
  },
  {
    "id": "VA-fairfax-loudoun-tech",
    "name": "Fairfax & Loudoun Tech Belt",
    "fullName": "Fairfax & Loudoun County (Tysons, Reston & Dulles Tech)",
    "state": "VA",
    "tier": 2,
    "parentRegion": "Northern Virginia (NoVA)",
    "description": "Tysons Corner commercial downtown, Reston Town Center, Washington Dulles International Airport, and defense technology defense contractors (General Dynamics, Northrop Grumman).",
    "googleUrl": "https://www.google.com/maps/place/Fairfax%20%26%20Loudoun%20Tech%20Belt,+VA",
    "counties": [
      "Fairfax",
      "Loudoun",
      "Falls Church"
    ]
  },
  {
    "id": "VA-virginia-beach-norfolk",
    "name": "Virginia Beach & Norfolk",
    "fullName": "Virginia Beach & Norfolk Oceanfront & Naval Hub",
    "state": "VA",
    "tier": 2,
    "parentRegion": "Hampton Roads",
    "description": "Longest pleasure beach in the world (Guinness World Records), Atlantic oceanfront resort strip, Waterside District, and NATO Allied Command Transformation.",
    "googleUrl": "https://www.google.com/maps/place/Virginia%20Beach%20%26%20Norfolk,+VA",
    "counties": [
      "Virginia Beach",
      "Norfolk"
    ]
  },
  {
    "id": "VT-central-green-mountains",
    "name": "Central Vermont",
    "fullName": "Central Vermont & Green Mountains (Montpelier State Capital & Stowe)",
    "state": "VT",
    "tier": 1,
    "parentRegion": null,
    "description": "Smallest state capital in the US (Montpelier, only state capital without a McDonald's), world-class skiing at Stowe Mountain Resort and Sugarbush, and pure Vermont maple syrup production.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Vermont,+VT",
    "counties": [
      "Washington",
      "Lamoille",
      "Orange",
      "Rutland"
    ]
  },
  {
    "id": "VT-champlain-valley-burlington",
    "name": "Champlain Valley",
    "fullName": "Champlain Valley & Greater Burlington (Lake Champlain & UVM)",
    "state": "VT",
    "tier": 1,
    "parentRegion": null,
    "description": "Vermont's economic center along scenic Lake Champlain: Church Street Marketplace in Burlington, University of Vermont, Ben & Jerry's ice cream roots, and GlobalFoundries semiconductor fab in Essex Junction.",
    "googleUrl": "https://www.google.com/maps/place/Champlain%20Valley,+VT",
    "counties": [
      "Chittenden",
      "Franklin",
      "Grand Isle",
      "Addison"
    ]
  },
  {
    "id": "VT-northeast-kingdom-nek",
    "name": "Northeast Kingdom (NEK)",
    "fullName": "Northeast Kingdom of Vermont (St. Johnsbury, Jay Peak & Lake Memphremagog)",
    "state": "VT",
    "tier": 1,
    "parentRegion": null,
    "description": "Vermont's most rural and untamed wilderness corner, Jay Peak deep-powder ski resort, Burke Mountain Kingdom Trails mountain biking, Fairbanks Museum, and craft artisan cheese.",
    "googleUrl": "https://www.google.com/maps/place/Northeast%20Kingdom%20(NEK),+VT",
    "counties": [
      "Caledonia",
      "Essex",
      "Orleans"
    ]
  },
  {
    "id": "VT-southern-vermont-manchester",
    "name": "Southern Vermont",
    "fullName": "Southern Vermont & Taconic Mountains (Manchester, Bennington & Brattleboro)",
    "state": "VT",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Bennington Battle Monument, Hildene (Robert Todd Lincoln estate) in Manchester, Killington and Mount Snow ski resorts, and quintessential New England covered bridges.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Vermont,+VT",
    "counties": [
      "Windham",
      "Bennington",
      "Windsor"
    ]
  },
  {
    "id": "VT-burlington-chittenden-core",
    "name": "Burlington & Chittenden Core",
    "fullName": "City of Burlington & Chittenden County Core",
    "state": "VT",
    "tier": 2,
    "parentRegion": "Champlain Valley",
    "description": "Lake Champlain waterfront bike path, South End arts district, Flynn Center for the Performing Arts, and historic college hill.",
    "googleUrl": "https://www.google.com/maps/place/Burlington%20%26%20Chittenden%20Core,+VT",
    "counties": [
      "Chittenden"
    ]
  },
  {
    "id": "WA-central-washington",
    "name": "Central Washington",
    "fullName": "Central Washington (Yakima Valley, Wenatchee & Columbia Basin)",
    "state": "WA",
    "tier": 1,
    "parentRegion": null,
    "description": "Agricultural heartland, world apple capital Wenatchee, hops and wine country in Yakima, and Moses Lake data center cluster.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Washington,+WA",
    "counties": [
      "Yakima",
      "Kittitas",
      "Chelan",
      "Douglas",
      "Grant",
      "Okanogan",
      "Klickitat"
    ]
  },
  {
    "id": "WA-eastern-washington",
    "name": "Eastern Washington",
    "fullName": "Eastern Washington (Inland Northwest, Columbia Basin & Yakima)",
    "state": "WA",
    "tier": 1,
    "parentRegion": null,
    "description": "The sunny, semi-arid agricultural empire, Inland Northwest medical hub Spokane, world-famous apple orchards, and Columbia River hydropower.",
    "googleUrl": "https://www.google.com/maps/place/Eastern%20Washington,+WA",
    "counties": [
      "Spokane",
      "Yakima",
      "Benton",
      "Franklin",
      "Chelan",
      "Douglas",
      "Grant",
      "Kittitas",
      "Walla Walla",
      "Whitman",
      "Stevens",
      "Okanogan",
      "Adams",
      "Lincoln",
      "Asotin",
      "Klickitat",
      "Pend Oreille",
      "Ferry",
      "Columbia",
      "Garfield"
    ]
  },
  {
    "id": "WA-inland-northwest",
    "name": "Inland Northwest",
    "fullName": "Inland Northwest & Greater Spokane (Spokane & Palouse)",
    "state": "WA",
    "tier": 1,
    "parentRegion": null,
    "description": "Regional commercial, healthcare, and higher-education hub serving eastern Washington, north Idaho, and western Montana.",
    "googleUrl": "https://www.google.com/maps/place/Inland%20Northwest,+WA",
    "counties": [
      "Spokane",
      "Stevens",
      "Pend Oreille",
      "Lincoln",
      "Adams",
      "Whitman",
      "Ferry",
      "Asotin",
      "Columbia",
      "Garfield"
    ]
  },
  {
    "id": "WA-puget-sound",
    "name": "Puget Sound",
    "fullName": "Puget Sound Region (Seattle, Tacoma, Everett & Sound Basin)",
    "state": "WA",
    "tier": 1,
    "parentRegion": null,
    "description": "Global tech giants (Amazon, Microsoft), aerospace (Boeing), container shipping ports, and majestic views of Mount Rainier.",
    "googleUrl": "https://www.google.com/maps/place/Puget%20Sound,+WA",
    "counties": [
      "King",
      "Pierce",
      "Snohomish",
      "Kitsap",
      "Thurston",
      "Skagit",
      "Whatcom",
      "Island",
      "San Juan"
    ]
  },
  {
    "id": "WA-western-washington",
    "name": "Western Washington",
    "fullName": "Western Washington (Puget Sound, Olympic Peninsula & Coast)",
    "state": "WA",
    "tier": 1,
    "parentRegion": null,
    "description": "The temperate rainforests, deepwater maritime ports, Cascade foothills, and dominant economic basin west of the Cascade Mountains.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Washington,+WA",
    "counties": [
      "King",
      "Pierce",
      "Snohomish",
      "Kitsap",
      "Thurston",
      "Whatcom",
      "Skagit",
      "Island",
      "San Juan",
      "Clallam",
      "Jefferson",
      "Grays Harbor",
      "Mason",
      "Pacific",
      "Lewis",
      "Wahkiakum",
      "Cowlitz",
      "Clark",
      "Skamania"
    ]
  },
  {
    "id": "WA-seattle-metro",
    "name": "Greater Seattle Metro",
    "fullName": "Greater Seattle Metropolitan Area (King, Snohomish & Pierce)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Puget Sound",
    "description": "The core urban engine of the Pacific Northwest spanning Seattle, Bellevue, Redmond, Tacoma, and Everett.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Seattle%20Metro,+WA",
    "counties": [
      "King",
      "Snohomish",
      "Pierce"
    ]
  },
  {
    "id": "WA-kitsap-peninsula",
    "name": "Kitsap Peninsula",
    "fullName": "Kitsap Peninsula & West Sound (Bremerton & Bainbridge Island)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Puget Sound",
    "description": "Puget Sound Naval Shipyard, scenic ferry connections to downtown Seattle, Bainbridge Island estates, and Poulsbo \"Little Norway\".",
    "googleUrl": "https://www.google.com/maps/place/Kitsap%20Peninsula,+WA",
    "counties": [
      "Kitsap"
    ]
  },
  {
    "id": "WA-north-sound",
    "name": "North Sound & San Juans",
    "fullName": "North Sound & San Juan Islands (Bellingham, Skagit & Island)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Puget Sound",
    "description": "Skagit Valley tulip fields, Western Washington University in Bellingham, orca whale watching in the San Juans, and Deception Pass.",
    "googleUrl": "https://www.google.com/maps/place/North%20Sound%20%26%20San%20Juans,+WA",
    "counties": [
      "Whatcom",
      "Skagit",
      "Island",
      "San Juan"
    ]
  },
  {
    "id": "WA-olympic-peninsula-coast",
    "name": "Olympic Peninsula & Coast",
    "fullName": "Olympic Peninsula & Pacific Coast (Olympic National Park & Beaches)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Western Washington",
    "description": "Olympic National Park, Hoh Rain Forest, Hurricane Ridge, Cape Flattery, Dungeness crab in Sequim, and coastal ports.",
    "googleUrl": "https://www.google.com/maps/place/Olympic%20Peninsula%20%26%20Coast,+WA",
    "counties": [
      "Clallam",
      "Jefferson",
      "Grays Harbor",
      "Pacific"
    ]
  },
  {
    "id": "WA-king-county-seattle",
    "name": "Seattle & King County",
    "fullName": "Seattle & King County (Seattle Core, Eastside & South King)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Puget Sound",
    "description": "Space Needle, Pike Place Market, University of Washington, Amazon headquarters, and affluent tech communities.",
    "googleUrl": "https://www.google.com/maps/place/Seattle%20%26%20King%20County,+WA",
    "counties": [
      "King"
    ]
  },
  {
    "id": "WA-south-sound",
    "name": "South Sound",
    "fullName": "South Sound (Tacoma, Pierce County & Olympia Capital)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Puget Sound",
    "description": "Museum of Glass in Tacoma, Point Defiance, Joint Base Lewis-McChord (JBLM), state capital Olympia, and Puget Sound inlets.",
    "googleUrl": "https://www.google.com/maps/place/South%20Sound,+WA",
    "counties": [
      "Pierce",
      "Thurston",
      "Mason"
    ]
  },
  {
    "id": "WA-southwest-vancouver-metro",
    "name": "Southwest Washington",
    "fullName": "Southwest Washington (Vancouver WA / Portland Metro & Columbia River)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Western Washington",
    "description": "Vancouver WA waterfront renaissance, Mount St. Helens National Volcanic Monument, Port of Longview, and Columbia River gorge.",
    "googleUrl": "https://www.google.com/maps/place/Southwest%20Washington,+WA",
    "counties": [
      "Clark",
      "Cowlitz",
      "Skamania",
      "Wahkiakum",
      "Lewis"
    ]
  },
  {
    "id": "WA-spokane-metro",
    "name": "Spokane Metro",
    "fullName": "Spokane Metropolitan Area (Spokane & Spokane Valley)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Inland Northwest",
    "description": "Spokane Falls, Gonzaga University, medical innovation corridor, Fairchild Air Force Base, and Centennial Trail.",
    "googleUrl": "https://www.google.com/maps/place/Spokane%20Metro,+WA",
    "counties": [
      "Spokane"
    ]
  },
  {
    "id": "WA-tri-cities",
    "name": "Tri-Cities Region",
    "fullName": "Tri-Cities Metropolitan Area (Kennewick, Pasco & Richland)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Central Washington",
    "description": "Pacific Northwest National Laboratory (PNNL), Columbia River confluence, booming viticulture AVA wine region, and agribusiness.",
    "googleUrl": "https://www.google.com/maps/place/Tri-Cities%20Region,+WA",
    "counties": [
      "Benton",
      "Franklin"
    ]
  },
  {
    "id": "WA-wenatchee-valley",
    "name": "Wenatchee & North Central",
    "fullName": "Wenatchee Valley & North Central Cascades (Leavenworth & Chelan)",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Central Washington",
    "description": "Apple capital of the world Wenatchee, Bavarian theme village Leavenworth, glacier-carved Lake Chelan, and North Cascades access.",
    "googleUrl": "https://www.google.com/maps/place/Wenatchee%20%26%20North%20Central,+WA",
    "counties": [
      "Chelan",
      "Douglas",
      "Okanogan"
    ]
  },
  {
    "id": "WA-yakima-valley",
    "name": "Yakima Valley",
    "fullName": "Yakima Valley & Wine Country",
    "state": "WA",
    "tier": 2,
    "parentRegion": "Central Washington",
    "description": "Produces over 75% of the United States hop crop, premium vineyard appellations, apple and cherry orchards, and agricultural heritage.",
    "googleUrl": "https://www.google.com/maps/place/Yakima%20Valley,+WA",
    "counties": [
      "Yakima"
    ]
  },
  {
    "id": "WI-fox-valley-green-bay",
    "name": "Fox Valley & Green Bay",
    "fullName": "Fox Valley & Green Bay (Titletown & Door County Peninsula)",
    "state": "WI",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Lambeau Field and the Green Bay Packers, paper making and packaging along the Fox River in Appleton/Oshkosh, and Door County cherry orchards/lighthouses.",
    "googleUrl": "https://www.google.com/maps/place/Fox%20Valley%20%26%20Green%20Bay,+WI",
    "counties": [
      "Brown",
      "Outagamie",
      "Winnebago",
      "Fond du Lac",
      "Calumet",
      "Door",
      "Kewaunee",
      "Manitowoc",
      "Sheboygan"
    ]
  },
  {
    "id": "WI-greater-madison-capital",
    "name": "Greater Madison",
    "fullName": "Greater Madison & South Central Wisconsin (State Capital & UW)",
    "state": "WI",
    "tier": 1,
    "parentRegion": null,
    "description": "Wisconsin state capitol situated between Lake Mendota and Lake Monona, University of Wisconsin-Madison, Epic Systems healthcare software campus, and biotech.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Madison,+WI",
    "counties": [
      "Dane",
      "Columbia",
      "Sauk",
      "Iowa",
      "Green",
      "Rock",
      "Jefferson",
      "Dodge",
      "Lafayette",
      "Grant"
    ]
  },
  {
    "id": "WI-greater-milwaukee",
    "name": "Greater Milwaukee",
    "fullName": "Greater Milwaukee & Lake Michigan Coastal Area",
    "state": "WI",
    "tier": 1,
    "parentRegion": null,
    "description": "Brewing heritage, Harley-Davidson global HQ, Summerfest (world's largest music festival), Milwaukee Art Museum (Calatrava wings), and Lake Michigan shoreline.",
    "googleUrl": "https://www.google.com/maps/place/Greater%20Milwaukee,+WI",
    "counties": [
      "Milwaukee",
      "Waukesha",
      "Ozaukee",
      "Washington",
      "Racine",
      "Kenosha"
    ]
  },
  {
    "id": "WI-northwoods-lake-superior",
    "name": "Northwoods & Lake Superior",
    "fullName": "Wisconsin Northwoods & Lake Superior Shoreline (Apostle Islands)",
    "state": "WI",
    "tier": 1,
    "parentRegion": null,
    "description": "Apostle Islands National Lakeshore sea caves, thousands of freshwater glacial lakes, Hayward lumberjack championships, Minocqua chain of lakes, and timber.",
    "googleUrl": "https://www.google.com/maps/place/Northwoods%20%26%20Lake%20Superior,+WI",
    "counties": [
      "Marathon",
      "Wood",
      "Portage",
      "Oneida",
      "Vilas",
      "Ashland",
      "Bayfield",
      "Douglas",
      "Burnett",
      "Washburn",
      "Sawyer",
      "Price",
      "Rusk",
      "Barron",
      "Polk",
      "Taylor",
      "Lincoln",
      "Langlade",
      "Clark",
      "Shawano",
      "Oconto",
      "Marinette",
      "Forest",
      "Florence",
      "Iron"
    ]
  },
  {
    "id": "WI-western-wisconsin-eau-claire",
    "name": "Western Wisconsin",
    "fullName": "Western Wisconsin & Coulee Region (Eau Claire & La Crosse)",
    "state": "WI",
    "tier": 1,
    "parentRegion": null,
    "description": "Driftless Area unglaciated limestone bluffs along the Mississippi River in La Crosse, thriving indie music scene in Eau Claire (Bon Iver), and Twin Cities commuter basin.",
    "googleUrl": "https://www.google.com/maps/place/Western%20Wisconsin,+WI",
    "counties": [
      "Eau Claire",
      "Chippewa",
      "La Crosse",
      "St. Croix",
      "Pierce",
      "Dunn",
      "Pepin",
      "Buffalo",
      "Trempealeau",
      "Jackson",
      "Monroe",
      "Vernon",
      "Crawford",
      "Richland"
    ]
  },
  {
    "id": "WI-madison-dane-core",
    "name": "Madison & Dane County",
    "fullName": "Madison & Dane County Core (Isthmus & Silicon Prairie)",
    "state": "WI",
    "tier": 2,
    "parentRegion": "Greater Madison",
    "description": "State Street pedestrian mall, Camp Randall Stadium, research park, Monona Terrace, and Madison farmers market.",
    "googleUrl": "https://www.google.com/maps/place/Madison%20%26%20Dane%20County,+WI",
    "counties": [
      "Dane"
    ]
  },
  {
    "id": "WI-milwaukee-county-core",
    "name": "Milwaukee County Core",
    "fullName": "Milwaukee County Core (Downtown, Third Ward & Lakefront)",
    "state": "WI",
    "tier": 2,
    "parentRegion": "Greater Milwaukee",
    "description": "Historic Third Ward arts and dining, Fiserv Forum / Deer District, Lakefront Brewery, and American Family Field (Brewers).",
    "googleUrl": "https://www.google.com/maps/place/Milwaukee%20County%20Core,+WI",
    "counties": [
      "Milwaukee"
    ]
  },
  {
    "id": "WV-eastern-panhandle-dc",
    "name": "Eastern Panhandle",
    "fullName": "Eastern Panhandle & DC Commuter Belt (Martinsburg & Harpers Ferry)",
    "state": "WV",
    "tier": 1,
    "parentRegion": null,
    "description": "Harpers Ferry National Historical Park (Shenandoah and Potomac rivers confluence), fastest-growing region in WV, commuter rail to Washington DC, and Procter & Gamble manufacturing.",
    "googleUrl": "https://www.google.com/maps/place/Eastern%20Panhandle,+WV",
    "counties": [
      "Berkeley",
      "Jefferson",
      "Morgan"
    ]
  },
  {
    "id": "WV-metro-valley-charleston",
    "name": "Metro Valley & Capital",
    "fullName": "Metro Valley & Capital Region (Charleston & Huntington)",
    "state": "WV",
    "tier": 1,
    "parentRegion": null,
    "description": "West Virginia state capitol dome (Cass Gilbert design), chemical and energy manufacturing along Kanawha River, Marshall University in Huntington, and healthcare hub.",
    "googleUrl": "https://www.google.com/maps/place/Metro%20Valley%20%26%20Capital,+WV",
    "counties": [
      "Kanawha",
      "Putnam",
      "Cabell",
      "Wayne",
      "Lincoln"
    ]
  },
  {
    "id": "WV-north-central-morgantown",
    "name": "North Central West Virginia",
    "fullName": "North Central West Virginia & High Tech (Morgantown, Clarksburg & Fairmont)",
    "state": "WV",
    "tier": 1,
    "parentRegion": null,
    "description": "West Virginia University (WVU Mountaineers), Personal Rapid Transit (PRT), FBI Criminal Justice Information Services (CJIS) national complex, and aerospace technology park.",
    "googleUrl": "https://www.google.com/maps/place/North%20Central%20West%20Virginia,+WV",
    "counties": [
      "Monongalia",
      "Marion",
      "Harrison",
      "Preston",
      "Taylor"
    ]
  },
  {
    "id": "WV-northern-panhandle-wheeling",
    "name": "Northern Panhandle",
    "fullName": "Northern Panhandle & Ohio River (Wheeling & Weirton Steel)",
    "state": "WV",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic Wheeling Suspension Bridge (National Historic Landmark over Ohio River), Oglebay resort park, steel heritage, and natural gas shale drilling.",
    "googleUrl": "https://www.google.com/maps/place/Northern%20Panhandle,+WV",
    "counties": [
      "Ohio",
      "Marshall",
      "Brooke",
      "Hancock"
    ]
  },
  {
    "id": "WV-potomac-highlands-new-river",
    "name": "Southern Highlands & New River Gorge",
    "fullName": "New River Gorge & Potomac Highlands (National Park & Wild Rivers)",
    "state": "WV",
    "tier": 1,
    "parentRegion": null,
    "description": "New River Gorge National Park and Preserve (America's newest national park, 876-foot arch bridge, world-class whitewater rafting), and Snowshoe Mountain ski resort.",
    "googleUrl": "https://www.google.com/maps/place/Southern%20Highlands%20%26%20New%20River%20Gorge,+WV",
    "counties": [
      "Raleigh",
      "Fayette",
      "Mercer",
      "Greenbrier",
      "Summers",
      "Nicholas",
      "Pocahontas",
      "Randolph",
      "Tucker"
    ]
  },
  {
    "id": "WV-charleston-kanawha-core",
    "name": "Charleston & Kanawha Core",
    "fullName": "Charleston Urban Core & Kanawha County (Capital City)",
    "state": "WV",
    "tier": 2,
    "parentRegion": "Metro Valley & Capital",
    "description": "West Virginia State Capitol complex, Clay Center for the Arts and Sciences, Haddad Riverfront Park, and Downtown Charleston banking district.",
    "googleUrl": "https://www.google.com/maps/place/Charleston%20%26%20Kanawha%20Core,+WV",
    "counties": [
      "Kanawha"
    ]
  },
  {
    "id": "WV-morgantown-monongalia-core",
    "name": "Morgantown & Monongalia Core",
    "fullName": "City of Morgantown & Monongalia County (WVU Flagship)",
    "state": "WV",
    "tier": 2,
    "parentRegion": "North Central West Virginia",
    "description": "WVU Medicine Ruby Memorial Hospital, High Street college dining, Milan Puskar Stadium, and Cheat Lake residential estates.",
    "googleUrl": "https://www.google.com/maps/place/Morgantown%20%26%20Monongalia%20Core,+WV",
    "counties": [
      "Monongalia"
    ]
  },
  {
    "id": "WY-central-casper-oil-city",
    "name": "Central Wyoming",
    "fullName": "Central Wyoming & Oil City (Casper & North Platte River)",
    "state": "WY",
    "tier": 1,
    "parentRegion": null,
    "description": "Historic wagon train crossroads (Oregon, California, Mormon trails) along the North Platte River in Casper, oil and energy refining, and National Historic Trails Interpretive Center.",
    "googleUrl": "https://www.google.com/maps/place/Central%20Wyoming,+WY",
    "counties": [
      "Natrona",
      "Converse",
      "Fremont",
      "Carbon"
    ]
  },
  {
    "id": "WY-jackson-hole-yellowstone",
    "name": "Jackson Hole & Yellowstone",
    "fullName": "Jackson Hole, Grand Teton & Yellowstone National Park",
    "state": "WY",
    "tier": 1,
    "parentRegion": null,
    "description": "Yellowstone National Park (first national park in world / Old Faithful geyser), Grand Teton Cathedral Group granite spires, Jackson Hole Mountain Resort, and Federal Reserve Economic Symposium.",
    "googleUrl": "https://www.google.com/maps/place/Jackson%20Hole%20%26%20Yellowstone,+WY",
    "counties": [
      "Teton",
      "Park",
      "Sublette"
    ]
  },
  {
    "id": "WY-powder-river-gillette-sheridan",
    "name": "Powder River Basin",
    "fullName": "Powder River Basin & Bighorn Mountains (Gillette & Sheridan)",
    "state": "WY",
    "tier": 1,
    "parentRegion": null,
    "description": "America's Energy Capital (Powder River Basin low-sulfur coal and natural gas), Devils Tower National Monument (first US national monument), and historic Bighorn Mountains ranching in Sheridan.",
    "googleUrl": "https://www.google.com/maps/place/Powder%20River%20Basin,+WY",
    "counties": [
      "Campbell",
      "Sheridan",
      "Johnson",
      "Crook",
      "Weston",
      "Washakie",
      "Hot Springs",
      "Big Horn",
      "Niobrara",
      "Lincoln",
      "Uinta",
      "Sweetwater"
    ]
  },
  {
    "id": "WY-southeast-cheyenne-capital",
    "name": "Southeast Wyoming",
    "fullName": "Southeast Wyoming & Capital Region (Cheyenne & Laramie / UW)",
    "state": "WY",
    "tier": 1,
    "parentRegion": null,
    "description": "Wyoming state capitol with 24-karat gold dome, Cheyenne Frontier Days (\"Daddy of 'em All\" rodeo), F.E. Warren Air Force Base (ICBM command), and University of Wyoming in Laramie.",
    "googleUrl": "https://www.google.com/maps/place/Southeast%20Wyoming,+WY",
    "counties": [
      "Laramie",
      "Albany",
      "Platte",
      "Goshen"
    ]
  },
  {
    "id": "WY-cheyenne-laramie-county-core",
    "name": "Cheyenne & Laramie County",
    "fullName": "Cheyenne & Laramie County Core (Capital City & Railroad Heritage)",
    "state": "WY",
    "tier": 2,
    "parentRegion": "Southeast Wyoming",
    "description": "Union Pacific Railroad historic depot, Cheyenne Botanic Gardens, Wyoming State Museum, and major regional data center corridor (Microsoft, NCAR supercomputing).",
    "googleUrl": "https://www.google.com/maps/place/Cheyenne%20%26%20Laramie%20County,+WY",
    "counties": [
      "Laramie"
    ]
  },
  {
    "id": "WY-teton-jackson-core",
    "name": "Jackson & Teton County",
    "fullName": "Town of Jackson & Teton County (Town Square Elk Antler Arches)",
    "state": "WY",
    "tier": 2,
    "parentRegion": "Jackson Hole & Yellowstone",
    "description": "Historic Jackson Town Square with four arches made of shed elk antlers, National Elk Refuge, luxury art galleries, and Snake River scenic rafting.",
    "googleUrl": "https://www.google.com/maps/place/Jackson%20%26%20Teton%20County,+WY",
    "counties": [
      "Teton"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MASTER_REGIONS };
}
