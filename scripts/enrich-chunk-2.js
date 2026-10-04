/**
 * scripts/enrich-chunk-2.js
 *
 * Granular Macro & Metro Regional Definitions for Chunk 2:
 * Southeast & South Heartland: NC, SC, GA, TN, AL, MS, LA, AR.
 */

const CHUNK_2_REGIONS = {
  // =========================================================================
  // NORTH CAROLINA (NC)
  // =========================================================================
  'NC': [
    // Tier 1: Macro-Regions
    {
      id: 'NC-research-triangle',
      name: 'Research Triangle',
      fullName: 'Research Triangle (Raleigh, Durham & Chapel Hill)',
      tier: 1,
      description: 'World-renowned innovation center anchored by Duke University, UNC Chapel Hill, NC State, and Research Triangle Park (RTP) biotech hub.',
      counties: ['Wake', 'Durham', 'Orange', 'Johnston', 'Chatham']
    },
    {
      id: 'NC-charlotte-metro',
      name: 'Charlotte Metro',
      fullName: 'Charlotte Metropolitan Area (Queen City & Lake Norman)',
      tier: 1,
      description: 'Second largest banking center in the US (Bank of America global HQ), NASCAR Hall of Fame, corporate HQs, and fast-growing suburbs.',
      counties: ['Mecklenburg', 'Union', 'Cabarrus', 'Gaston', 'Iredell', 'Lincoln', 'Rowan']
    },
    {
      id: 'NC-piedmont-triad',
      name: 'Piedmont Triad',
      fullName: 'Piedmont Triad (Greensboro, Winston-Salem & High Point)',
      tier: 1,
      description: 'Historic tobacco and textile heritage transformed into aviation (HondaJet), Wake Forest biotech, and international home furnishings market.',
      counties: ['Guilford', 'Forsyth', 'Davidson', 'Alamance', 'Randolph', 'Rockingham', 'Stokes', 'Davie', 'Yadkin']
    },
    {
      id: 'NC-western-mountains',
      name: 'Western North Carolina',
      fullName: 'Western North Carolina & Blue Ridge (Asheville & Great Smokies)',
      tier: 1,
      description: 'Vibrant arts and craft brewery destination in Asheville, Biltmore Estate, Blue Ridge Parkway, and Mount Mitchell (highest peak east of Mississippi).',
      counties: ['Buncombe', 'Henderson', 'Haywood', 'Transylvania', 'Jackson', 'Macon', 'Watauga', 'Avery', 'Madison', 'Yancey', 'Mitchell', 'Cherokee', 'Clay', 'Graham', 'Swain']
    },
    {
      id: 'NC-coastal-wilmington-outer-banks',
      name: 'Coastal North Carolina',
      fullName: 'Coastal North Carolina (Wilmington, Cape Fear & The Outer Banks)',
      tier: 1,
      description: 'Cape Hatteras National Seashore barrier islands, Wright Brothers First Flight in Kill Devil Hills, port city Wilmington, and pristine beaches.',
      counties: ['New Hanover', 'Brunswick', 'Pender', 'Onslow', 'Carteret', 'Dare', 'Currituck', 'Hyde', 'Pamlico', 'Craven', 'Beaufort']
    },
    {
      id: 'NC-sandhills-fayetteville',
      name: 'Sandhills & Eastern NC',
      fullName: 'Sandhills & Eastern North Carolina (Fayetteville & Pinehurst)',
      tier: 1,
      description: 'Fort Liberty (one of the largest military installations in the world), Pinehurst historic golf resort, and fertile coastal plain agriculture.',
      counties: ['Cumberland', 'Moore', 'Harnett', 'Lee', 'Hoke', 'Robeson', 'Wayne', 'Wilson', 'Pitt', 'Nash', 'Edgecombe', 'Lenoir']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'NC-triangle-core',
      name: 'Raleigh & Triangle Core',
      fullName: 'Raleigh, Durham & Wake County Core (Research Triangle Park)',
      tier: 2,
      parentRegion: 'Research Triangle',
      description: 'North Carolina state capitol in Raleigh, Duke University Medical Center in Durham, and R&D campuses.',
      counties: ['Wake', 'Durham']
    },
    {
      id: 'NC-charlotte-core',
      name: 'Charlotte & Mecklenburg',
      fullName: 'Charlotte Core & Mecklenburg County (Uptown & South End)',
      tier: 2,
      parentRegion: 'Charlotte Metro',
      description: 'Uptown skyscraper skyline, South End tech and design district, Charlotte Douglas International Airport, and major sports stadiums.',
      counties: ['Mecklenburg']
    },
    {
      id: 'NC-asheville-buncombe',
      name: 'Greater Asheville',
      fullName: 'Greater Asheville & Buncombe County (Art & Blue Ridge Mountains)',
      tier: 2,
      parentRegion: 'Western North Carolina',
      description: 'Appalachian mountain culture, French Broad River arts district, historic Grove Park Inn, and outdoor recreation gateway.',
      counties: ['Buncombe', 'Henderson']
    },
    {
      id: 'NC-wilmington-cape-fear',
      name: 'Wilmington & Cape Fear',
      fullName: 'Wilmington & Cape Fear Coast (New Hanover & Brunswick)',
      tier: 2,
      parentRegion: 'Coastal North Carolina',
      description: 'Historic riverfront district, Battleship North Carolina, Wrightsville Beach, EUE/Screen Gems film production studios, and Port of Wilmington.',
      counties: ['New Hanover', 'Brunswick']
    }
  ],

  // =========================================================================
  // SOUTH CAROLINA (SC)
  // =========================================================================
  'SC': [
    // Tier 1: Macro-Regions
    {
      id: 'SC-charleston-lowcountry',
      name: 'Charleston & Lowcountry',
      fullName: 'Charleston Metropolitan Area & Coastal Lowcountry',
      tier: 1,
      description: 'America\'s top-ranked historic city, Battery promenade, Rainbow Row, Medical University of South Carolina (MUSC), and Boeing 787 assembly facility.',
      counties: ['Charleston', 'Berkeley', 'Dorchester', 'Beaufort', 'Jasper', 'Colleton', 'Hampton']
    },
    {
      id: 'SC-greenville-upstate',
      name: 'Greenville & The Upstate',
      fullName: 'Greenville-Spartanburg & The Upstate (I-85 Automotive Corridor)',
      tier: 1,
      description: 'Thriving Downtown Greenville with Falls Park on the Reedy, BMW\'s largest global manufacturing plant, Michelin North America HQ, and Clemson University.',
      counties: ['Greenville', 'Spartanburg', 'Anderson', 'Pickens', 'Oconee', 'Laurens', 'Cherokee', 'Union']
    },
    {
      id: 'SC-columbia-midlands',
      name: 'Columbia & The Midlands',
      fullName: 'Columbia & The Midlands (State Capital & Fort Jackson)',
      tier: 1,
      description: 'South Carolina state capitol, University of South Carolina flagship campus, Lake Murray recreation, and Fort Jackson (Army\'s largest training center).',
      counties: ['Richland', 'Lexington', 'Kershaw', 'Fairfield', 'Newberry', 'Sumter', 'Orangeburg', 'Calhoun']
    },
    {
      id: 'SC-myrtle-beach-grand-strand',
      name: 'Myrtle Beach & Grand Strand',
      fullName: 'Myrtle Beach & The Grand Strand (60 Miles of Atlantic Coast)',
      tier: 1,
      description: 'Major family vacation and golf capital with over 90 championship courses, Broadway at the Beach, SkyWheel, and Pawleys Island hammocks.',
      counties: ['Horry', 'Georgetown', 'Marion', 'Florence', 'Williamsburg']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'SC-charleston-metro-core',
      name: 'Greater Charleston Core',
      fullName: 'Greater Charleston Core (Charleston, Mount Pleasant & Summerville)',
      tier: 2,
      parentRegion: 'Charleston & Lowcountry',
      description: 'Historic peninsula, Mount Pleasant Shem Creek shrimp boats, Daniel Island tech corridor, and deepwater container terminals.',
      counties: ['Charleston', 'Berkeley', 'Dorchester']
    },
    {
      id: 'SC-hilton-head-beaufort',
      name: 'Hilton Head & Beaufort',
      fullName: 'Hilton Head Island, Bluffton & Historic Beaufort',
      tier: 2,
      parentRegion: 'Charleston & Lowcountry',
      description: 'Gated resort plantations (Sea Pines, Palmetto Dunes), RBC Heritage PGA golf, Marine Corps Recruit Depot Parris Island, and antebellum Beaufort.',
      counties: ['Beaufort', 'Jasper']
    }
  ],

  // =========================================================================
  // GEORGIA (GA)
  // =========================================================================
  'GA': [
    // Tier 1: Macro-Regions
    {
      id: 'GA-metro-atlanta',
      name: 'Metro Atlanta',
      fullName: 'Metro Atlanta (Core 12-County Economic Engine)',
      tier: 1,
      description: 'Economic capital of the American South, Hartsfield-Jackson International Airport (world\'s busiest), Fortune 500 capital, and Georgia Tech.',
      counties: ['Fulton', 'Gwinnett', 'Cobb', 'DeKalb', 'Clayton', 'Cherokee', 'Forsyth', 'Henry', 'Douglas', 'Fayette', 'Coweta', 'Paulding']
    },
    {
      id: 'GA-coastal-savannah',
      name: 'Coastal Georgia',
      fullName: 'Coastal Georgia & Historic Savannah (Port of Savannah & Golden Isles)',
      tier: 1,
      description: 'Historic Savannah garden squares, SCAD arts, Port of Savannah (busiest container terminal in US Southeast), and Golden Isles barrier island resorts (St. Simons, Sea Island).',
      counties: ['Chatham', 'Bryan', 'Effingham', 'Glynn', 'Camden', 'McIntosh', 'Liberty']
    },
    {
      id: 'GA-north-georgia-mountains',
      name: 'North Georgia Mountains',
      fullName: 'North Georgia Mountains & Blue Ridge (Appalachian Trail Southern Terminus)',
      tier: 1,
      description: 'Springer Mountain (Appalachian Trail start), Bavarian alpine town Helen, Lake Lanier, Lake Burton, apple orchards in Ellijay, and wine trail.',
      counties: ['Hall', 'Dawson', 'Lumpkin', 'White', 'Habersham', 'Fannin', 'Union', 'Towns', 'Rabun', 'Gilmer', 'Pickens']
    },
    {
      id: 'GA-augusta-csra',
      name: 'Augusta & CSRA',
      fullName: 'Augusta & Central Savannah River Area (Masters Golf & US Cyber Command)',
      tier: 1,
      description: 'Home of The Masters golf tournament at Augusta National, Fort Eisenhower (US Army Cyber Center of Excellence), and Savannah River corridor.',
      counties: ['Richmond', 'Columbia', 'Burke', 'McDuffie', 'Lincoln', 'Warren', 'Wilkes']
    },
    {
      id: 'GA-central-macon-athens',
      name: 'Central Georgia & Classic City',
      fullName: 'Central Georgia & Athens (Macon Crossroads & Classic City UGA)',
      tier: 1,
      description: 'University of Georgia in Athens, historic music roots in Macon (Allman Brothers, Otis Redding), Robins Air Force Base, and Georgia peach farmlands.',
      counties: ['Bibb', 'Houston', 'Clarke', 'Oconee', 'Peach', 'Jones', 'Monroe', 'Baldwin', 'Putnam', 'Morgan', 'Oglethorpe', 'Madison', 'Jackson', 'Barrow', 'Walton']
    },
    {
      id: 'GA-columbus-south-georgia',
      name: 'Columbus & South Georgia',
      fullName: 'Columbus, Chattahoochee Valley & South Georgia (Fort Moore & Peanuts)',
      tier: 1,
      description: 'Aflac headquarters in Columbus, Fort Moore (Armor and Infantry School), world\'s longest urban whitewater course, and peanut/pecan agricultural empire.',
      counties: ['Muscogee', 'Harris', 'Chattahoochee', 'Dougherty', 'Lowndes', 'Thomas', 'Tift', 'Colquitt', 'Ware']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'GA-atlanta-core',
      name: 'Atlanta Urban Core',
      fullName: 'Atlanta Urban Core (Fulton, DeKalb & Atlanta BeltLine)',
      tier: 2,
      parentRegion: 'Metro Atlanta',
      description: 'Downtown Atlanta, Midtown tech square, Buckhead financial district, Decatur, and the multi-mile Atlanta BeltLine transit/arts loop.',
      counties: ['Fulton', 'DeKalb']
    },
    {
      id: 'GA-north-atlanta-affluent',
      name: 'North Atlanta Tech Belt',
      fullName: 'North Atlanta Tech Corridor (Alpharetta, Roswell & Johns Creek)',
      tier: 2,
      parentRegion: 'Metro Atlanta',
      description: '"Technology City of the South", elite public schools, corporate offices, master-planned neighborhoods, and Lake Windward.',
      counties: ['Forsyth', 'Cherokee']
    },
    {
      id: 'GA-savannah-historic-port',
      name: 'Savannah & Chatham',
      fullName: 'Savannah & Chatham County (Historic District & Port)',
      tier: 2,
      parentRegion: 'Coastal Georgia',
      description: '22 historic park squares, Forsyth Park fountain, River Street cobblestones, Tybee Island beaches, and Gulfstream Aerospace.',
      counties: ['Chatham']
    }
  ],

  // =========================================================================
  // TENNESSEE (TN)
  // =========================================================================
  'TN': [
    // Tier 1: Macro-Regions
    {
      id: 'TN-middle-nashville-capital',
      name: 'Middle Tennessee',
      fullName: 'Middle Tennessee & Greater Nashville (Music City USA)',
      tier: 1,
      description: 'Global capital of country music, healthcare industry center (HCA Healthcare), Vanderbilt University, Nissan North America, and rapid population growth.',
      counties: ['Davidson', 'Williamson', 'Rutherford', 'Wilson', 'Sumner', 'Robertson', 'Cheatham', 'Dickson', 'Maury', 'Montgomery']
    },
    {
      id: 'TN-east-knoxville-smokies',
      name: 'East Tennessee',
      fullName: 'East Tennessee & The Smokies (Knoxville, Oak Ridge & Great Smoky Mountains)',
      tier: 1,
      description: 'Great Smoky Mountains National Park (most visited national park in US), University of Tennessee in Knoxville, and Oak Ridge National Laboratory.',
      counties: ['Knox', 'Blount', 'Sevier', 'Anderson', 'Loudon', 'Roane', 'Jefferson', 'Grainger', 'Cocke', 'Hamblen', 'Monroe', 'McMinn']
    },
    {
      id: 'TN-west-memphis-delta',
      name: 'West Tennessee',
      fullName: 'West Tennessee & Greater Memphis (Blues, BBQ & Global Logistics)',
      tier: 1,
      description: 'FedEx SuperHub (busiest cargo airport in Western Hemisphere), historic Beale Street blues, Graceland (Elvis Presley), and Mississippi River delta.',
      counties: ['Shelby', 'Fayette', 'Tipton', 'Madison', 'Gibson', 'Dyer', 'Lauderdale', 'Haywood', 'Hardeman', 'McNairy']
    },
    {
      id: 'TN-chattanooga-southeast',
      name: 'Chattanooga & Southeast TN',
      fullName: 'Chattanooga & Southeast Tennessee (Scenic City & Gig City)',
      tier: 1,
      description: 'Lookout Mountain, Tennessee Aquarium, America\'s first citywide gigabit fiber network ("Gig City"), and Volkswagen electric vehicle assembly.',
      counties: ['Hamilton', 'Bradley', 'Marion', 'Rhea', 'Sequatchie', 'Polk', 'Bledsoe', 'Meigs']
    },
    {
      id: 'TN-tri-cities-mountain',
      name: 'Tri-Cities Region',
      fullName: 'Tri-Cities Tennessee (Johnson City, Kingsport & Bristol)',
      tier: 1,
      description: 'Bristol Motor Speedway ("The Last Great Colosseum"), birthplace of country music (1927 Bristol Sessions), and East Tennessee State University.',
      counties: ['Washington', 'Sullivan', 'Carter', 'Hawkins', 'Unicoi', 'Johnson', 'Greene']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'TN-nashville-davidson-core',
      name: 'Nashville & Davidson Core',
      fullName: 'Nashville & Davidson County (Downtown, The Gulch & Music Row)',
      tier: 2,
      parentRegion: 'Middle Tennessee',
      description: 'Ryman Auditorium, Broadway honky-tonk strip, Music Row recording studios, state capitol, and Nissan Stadium.',
      counties: ['Davidson']
    },
    {
      id: 'TN-williamson-franklin-affluent',
      name: 'Williamson & Franklin',
      fullName: 'Williamson County (Historic Franklin, Brentwood & Cool Springs)',
      tier: 2,
      parentRegion: 'Middle Tennessee',
      description: 'One of the wealthiest counties in the nation, historic downtown Franklin Main Street, Cool Springs corporate corridor, and equestrian rolling hills.',
      counties: ['Williamson']
    },
    {
      id: 'TN-memphis-shelby-core',
      name: 'Memphis & Shelby Core',
      fullName: 'Memphis & Shelby County (Downtown, Midtown & East Memphis)',
      tier: 2,
      parentRegion: 'West Tennessee',
      description: 'National Civil Rights Museum, St. Jude Children\'s Research Hospital, AutoZone headquarters, and Sun Studio.',
      counties: ['Shelby']
    }
  ],

  // =========================================================================
  // ALABAMA (AL)
  // =========================================================================
  'AL': [
    // Tier 1: Macro-Regions
    {
      id: 'AL-central-birmingham-metro',
      name: 'Central Alabama',
      fullName: 'Central Alabama & Greater Birmingham (Magic City & Medical Center)',
      tier: 1,
      description: 'University of Alabama at Birmingham (UAB Medicine), Vulcan Park statue (world\'s largest cast iron statue), financial and banking hub, and automotive corridor.',
      counties: ['Jefferson', 'Shelby', 'St. Clair', 'Blount', 'Walker', 'Bibb', 'Chilton']
    },
    {
      id: 'AL-north-huntsville-rocket-city',
      name: 'North Alabama',
      fullName: 'North Alabama & Tennessee Valley (Rocket City Huntsville & The Shoals)',
      tier: 1,
      description: 'NASA Marshall Space Flight Center, US Army Redstone Arsenal, Cummins Research Park (second largest in US), FBI campus, and Muscle Shoals music sound.',
      counties: ['Madison', 'Limestone', 'Morgan', 'Marshall', 'Lauderdale', 'Colbert', 'Jackson', 'DeKalb', 'Cullman', 'Lawrence']
    },
    {
      id: 'AL-south-gulf-coast-mobile',
      name: 'South Alabama & Gulf Coast',
      fullName: 'South Alabama & Gulf Coast (Mobile Bay, Orange Beach & Gulf Shores)',
      tier: 1,
      description: 'Historic port city of Mobile (oldest Mardi Gras in US), Airbus A320/A220 aircraft manufacturing, and sugar-white quartz sand beaches on the Gulf.',
      counties: ['Mobile', 'Baldwin', 'Escambia', 'Washington', 'Clarke', 'Monroe', 'Conecuh']
    },
    {
      id: 'AL-river-region-capital',
      name: 'River Region & Wiregrass',
      fullName: 'River Region & Wiregrass (Montgomery Capitol, Maxwell AFB & Dothan)',
      tier: 1,
      description: 'Alabama state capitol, Civil Rights Memorial and Legacy Museum, Maxwell Air Force Base (Air University), Hyundai plant, and Dothan peanut capital.',
      counties: ['Montgomery', 'Autauga', 'Elmore', 'Houston', 'Dale', 'Coffee', 'Covington', 'Pike', 'Lee', 'Russell', 'Macon', 'Bullock', 'Dallas']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'AL-huntsville-madison-core',
      name: 'Huntsville & Madison',
      fullName: 'Huntsville & Madison County (Space & Defense Tech Capital)',
      tier: 2,
      parentRegion: 'North Alabama',
      description: 'Fastest-growing and largest city in Alabama, highest concentration of aerospace engineers in the US, and Saturn V rocket landmark.',
      counties: ['Madison', 'Limestone']
    },
    {
      id: 'AL-baldwin-gulf-shores',
      name: 'Baldwin County & Gulf Coast',
      fullName: 'Baldwin County (Gulf Shores, Orange Beach & Fairhope)',
      tier: 2,
      parentRegion: 'South Alabama & Gulf Coast',
      description: 'Fastest-growing county in Alabama, Gulf State Park, Perdido Pass, scenic Fairhope on Mobile Bay, and deep-sea sportfishing.',
      counties: ['Baldwin']
    }
  ],

  // =========================================================================
  // LOUISIANA (LA)
  // =========================================================================
  'LA': [
    // Tier 1: Macro-Regions
    {
      id: 'LA-greater-new-orleans',
      name: 'Greater New Orleans',
      fullName: 'Greater New Orleans & Crescent City (French Quarter & Northshore)',
      tier: 1,
      description: 'Global epicenter of jazz, Mardi Gras, Creole/Cajun cuisine, Port of New Orleans on the Mississippi River, Superdome, and Lake Pontchartrain Causeway.',
      counties: ['Orleans', 'Jefferson', 'St. Tammany', 'St. Bernard', 'Plaquemines', 'St. Charles', 'St. John the Baptist', 'Tangipahoa', 'Washington']
    },
    {
      id: 'LA-capital-baton-rouge',
      name: 'Capital Region',
      fullName: 'Baton Rouge & Capital Region (LSU & Petrochemical Corridor)',
      tier: 1,
      description: 'Louisiana state capitol (tallest state capitol in the US), Louisiana State University (LSU Tigers), and deepwater Mississippi River petrochemical processing.',
      counties: ['East Baton Rouge', 'Ascension', 'Livingston', 'West Baton Rouge', 'Iberville', 'East Feliciana', 'West Feliciana', 'Pointe Coupee']
    },
    {
      id: 'LA-acadiana-cajun',
      name: 'Acadiana / Cajun Country',
      fullName: 'Acadiana (Lafayette, Vermilion Bay & Bayou Teche)',
      tier: 1,
      description: 'The cultural heartland of Cajun French heritage, Zydeco music, crawfish farming, Avery Island (Tabasco sauce factory), and offshore energy support.',
      counties: ['Lafayette', 'St. Martin', 'Vermilion', 'Iberia', 'St. Mary', 'Acadia', 'St. Landry', 'Evangeline']
    },
    {
      id: 'LA-north-arklatex-shreveport',
      name: 'North Louisiana',
      fullName: 'North Louisiana & Ark-La-Tex (Shreveport-Bossier & Monroe)',
      tier: 1,
      description: 'Barksdale Air Force Base (Air Force Global Strike Command / B-52 fleet), Red River casino gaming, CenturyLink/Lumen campus in Monroe, and timber.',
      counties: ['Caddo', 'Bossier', 'Ouachita', 'Lincoln', 'Webster', 'De Soto', 'Bienville', 'Claiborne', 'Union', 'Morehouse']
    },
    {
      id: 'LA-southwest-lake-charles',
      name: 'Southwest Louisiana',
      fullName: 'Southwest Louisiana (Lake Charles LNG & Petrochemical Port)',
      tier: 1,
      description: 'Major global liquefied natural gas (LNG) export terminals, petrochemical refineries, casino resort properties, and Creole Nature Trail.',
      counties: ['Calcasieu', 'Cameron', 'Beauregard', 'Allen', 'Jefferson Davis']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'LA-new-orleans-orleans-core',
      name: 'New Orleans / Orleans Parish',
      fullName: 'New Orleans Core (French Quarter, Garden District & Downtown)',
      tier: 2,
      parentRegion: 'Greater New Orleans',
      description: 'Bourbon Street, Jackson Square, historic St. Charles Avenue streetcars, Port of New Orleans, and Tulane University.',
      counties: ['Orleans']
    },
    {
      id: 'LA-baton-rouge-ebr-core',
      name: 'Baton Rouge & East Baton Rouge',
      fullName: 'Baton Rouge & East Baton Rouge Parish (Capitol & LSU)',
      tier: 2,
      parentRegion: 'Capital Region',
      description: 'Tiger Stadium, Mississippi River levee bike trail, state government complex, and ExxonMobil refinery.',
      counties: ['East Baton Rouge']
    }
  ],

  // =========================================================================
  // MISSISSIPPI (MS)
  // =========================================================================
  'MS': [
    // Tier 1: Macro-Regions
    {
      id: 'MS-greater-jackson-capital',
      name: 'Greater Jackson',
      fullName: 'Greater Jackson & Capital Region (Metro Jackson & Ross Barnett)',
      tier: 1,
      description: 'Mississippi state capitol, University of Mississippi Medical Center (UMMC), historic Fondren arts district, and Ross Barnett Reservoir recreation.',
      counties: ['Hinds', 'Madison', 'Rankin', 'Warren', 'Yazoo', 'Copiah', 'Simpson']
    },
    {
      id: 'MS-gulf-coast',
      name: 'Mississippi Gulf Coast',
      fullName: 'Mississippi Gulf Coast (Biloxi, Gulfport & Ocean Springs)',
      tier: 1,
      description: '26 miles of continuous scenic beach highway, world-class casino resorts in Biloxi, Port of Gulfport, Keesler Air Force Base, and Walter Anderson art.',
      counties: ['Harrison', 'Jackson', 'Hancock', 'Pearl River', 'Stone', 'George']
    },
    {
      id: 'MS-north-desoto-oxford',
      name: 'North Mississippi',
      fullName: 'North Mississippi (DeSoto / Memphis Suburbs & Oxford / Ole Miss)',
      tier: 1,
      description: 'Booming Memphis suburban distribution corridor in Southaven and Olive Branch, University of Mississippi (Ole Miss) in Oxford, and Toyota assembly.',
      counties: ['DeSoto', 'Lafayette', 'Lee', 'Marshall', 'Tate', 'Panola', 'Union', 'Pontotoc', 'Alcorn']
    },
    {
      id: 'MS-pine-belt-delta',
      name: 'Pine Belt & The Delta',
      fullName: 'Pine Belt & Mississippi Delta (Hattiesburg, Meridian & Delta Blues)',
      tier: 1,
      description: 'University of Southern Mississippi in Hattiesburg, Camp Shelby, birthplace of Delta blues in Clarksdale, and fertile alluvial cotton/soybean basin.',
      counties: ['Forrest', 'Lamar', 'Jones', 'Lauderdale', 'Washington', 'Bolivar', 'Sunflower', 'Leflore', 'Coahoma', 'Quitman']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'MS-gulf-coast-biloxi-gulfport',
      name: 'Biloxi & Gulfport Metro',
      fullName: 'Biloxi & Gulfport Coastal Strip (Harrison County)',
      tier: 2,
      parentRegion: 'Mississippi Gulf Coast',
      description: 'Beau Rivage, Hard Rock Biloxi, Mississippi Coast Coliseum, barrier island ferries to Ship Island, and commercial seafood packing.',
      counties: ['Harrison']
    },
    {
      id: 'MS-desoto-southaven',
      name: 'DeSoto County / Memphis South',
      fullName: 'DeSoto County (Southaven, Olive Branch & Hernando)',
      tier: 2,
      parentRegion: 'North Mississippi',
      description: 'Fastest-growing county in Mississippi, massive e-commerce fulfillment hubs, Silo Square town center, and Landers Center.',
      counties: ['DeSoto']
    }
  ],

  // =========================================================================
  // ARKANSAS (AR)
  // =========================================================================
  'AR': [
    // Tier 1: Macro-Regions
    {
      id: 'AR-northwest-arkansas-nwa',
      name: 'Northwest Arkansas (NWA)',
      fullName: 'Northwest Arkansas (Bentonville, Fayetteville, Rogers & Springdale)',
      tier: 1,
      description: 'One of America\'s fastest-growing corporate powerhouses: Walmart global HQ, Tyson Foods, J.B. Hunt Transport, Crystal Bridges Museum of American Art, and University of Arkansas.',
      counties: ['Benton', 'Washington', 'Carroll', 'Madison']
    },
    {
      id: 'AR-central-little-rock-capital',
      name: 'Central Arkansas',
      fullName: 'Central Arkansas & Greater Little Rock (State Capital & River Market)',
      tier: 1,
      description: 'Arkansas state capitol, William J. Clinton Presidential Library, River Market entertainment district, Little Rock Air Force Base (C-130 fleet), and Simmons Bank Arena.',
      counties: ['Pulaski', 'Saline', 'Faulkner', 'Lonoke', 'Garland', 'White', 'Grant', 'Perry']
    },
    {
      id: 'AR-river-valley-fort-smith',
      name: 'Arkansas River Valley',
      fullName: 'Arkansas River Valley & Fort Smith (Mount Magazine & Ouachitas)',
      tier: 1,
      description: 'Historic frontier military post in Fort Smith, Ebbing Air National Guard Base (foreign pilot F-35 training), Mount Magazine (highest point in AR), and nuclear power at Russellville.',
      counties: ['Sebastian', 'Crawford', 'Pope', 'Johnson', 'Franklin', 'Logan', 'Yell', 'Conway']
    },
    {
      id: 'AR-northeast-delta-jonesboro',
      name: 'Northeast Arkansas & Delta',
      fullName: 'Northeast Arkansas & Delta (Jonesboro & Mississippi River Alluvial Plain)',
      tier: 1,
      description: 'Arkansas State University in Jonesboro, world\'s leading rice-growing region (Riceland Foods), Nucor steel mills along the Mississippi River in Blytheville, and agricultural exports.',
      counties: ['Craighead', 'Mississippi', 'Crittenden', 'Greene', 'Poinsett', 'Cross', 'St. Francis', 'Lee', 'Phillips', 'Clay', 'Randolph', 'Lawrence', 'Jackson']
    },
    {
      id: 'AR-south-timberlands-hot-springs',
      name: 'South Arkansas Timberlands',
      fullName: 'South Arkansas Timberlands & Ouachita Foothills (El Dorado & Texarkana)',
      tier: 1,
      description: 'Historic Hot Springs National Park thermal bathhouses, Oaklawn racing and casino, vast pine timberlands, Murphy USA headquarters in El Dorado, and bromine chemical extraction.',
      counties: ['Union', 'Miller', 'Columbia', 'Ouachita', 'Clark', 'Hot Spring', 'Ashley', 'Bradley', 'Drew', 'Chicot', 'Desha', 'Jefferson', 'Cleveland', 'Lincoln', 'Dallas', 'Calhoun', 'Nevada', 'Hempstead', 'Lafayette', 'Little River', 'Sevier', 'Howard', 'Pike', 'Montgomery', 'Polk', 'Scott']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'AR-bentonville-rogers-core',
      name: 'Bentonville & Rogers',
      fullName: 'Bentonville & Rogers (Walmart Global HQ & World Cycling Capital)',
      tier: 2,
      parentRegion: 'Northwest Arkansas (NWA)',
      description: 'Walmart Home Office, The Momentary modern art, hundreds of miles of mountain biking trails, and Beaver Lake shoreline.',
      counties: ['Benton']
    },
    {
      id: 'AR-fayetteville-springdale',
      name: 'Fayetteville & Springdale',
      fullName: 'Fayetteville & Springdale (University of Arkansas & Tyson Foods)',
      tier: 2,
      parentRegion: 'Northwest Arkansas (NWA)',
      description: 'Donald W. Reynolds Razorback Stadium, Dickson Street entertainment, Tyson Foods global HQ, and Shiloh Museum of Ozark History.',
      counties: ['Washington']
    }
  ],

  // =========================================================================
  // KENTUCKY (KY)
  // =========================================================================
  'KY': [
    // Tier 1: Macro-Regions
    {
      id: 'KY-bluegrass-lexington',
      name: 'Bluegrass Region',
      fullName: 'Bluegrass Region & Horse Country (Lexington & State Capital)',
      tier: 1,
      description: 'Horse Capital of the World, Keeneland racecourse, Kentucky Bourbon Trail, University of Kentucky (Wildcats basketball), and state capitol in Frankfort.',
      counties: ['Fayette', 'Scott', 'Woodford', 'Jessamine', 'Clark', 'Bourbon', 'Franklin', 'Madison']
    },
    {
      id: 'KY-louisville-metro',
      name: 'Greater Louisville',
      fullName: 'Greater Louisville & Falls of the Ohio (Derby City & Logistics)',
      tier: 1,
      description: 'Churchill Downs (Kentucky Derby), Louisville Slugger museum, UPS Worldport global air hub, GE Appliances, and Ohio River waterfront.',
      counties: ['Jefferson', 'Oldham', 'Bullitt', 'Shelby', 'Spencer', 'Henry']
    },
    {
      id: 'KY-northern-kentucky-cincinnati',
      name: 'Northern Kentucky',
      fullName: 'Northern Kentucky & South Cincinnati (Covington, Newport & CVG)',
      tier: 1,
      description: 'Cincinnati/Northern Kentucky International Airport (CVG Amazon Air Hub), historic Roebling Suspension Bridge, Newport Aquarium, and Fidelity Investments.',
      counties: ['Kenton', 'Campbell', 'Boone', 'Grant', 'Pendleton']
    },
    {
      id: 'KY-western-pennyrile',
      name: 'Western Kentucky',
      fullName: 'Western Kentucky & Pennyrile (Bowling Green & Owensboro)',
      tier: 1,
      description: 'National Corvette Museum and GM Corvette assembly plant in Bowling Green, Mammoth Cave National Park (world\'s longest cave system), and western bluegrass barbecue.',
      counties: ['Warren', 'Daviess', 'McCracken', 'Christian', 'Henderson', 'Hopkins']
    },
    {
      id: 'KY-eastern-appalachian',
      name: 'Eastern Kentucky',
      fullName: 'Eastern Kentucky & Appalachian Coalfields (Red River Gorge & Country Music)',
      tier: 1,
      description: 'Red River Gorge geological area world-class rock climbing, Natural Bridge State Resort Park, country music highway US-23, and Appalachian artisan crafts.',
      counties: ['Pike', 'Floyd', 'Harlan', 'Perry', 'Letcher', 'Knott', 'Bell']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'KY-louisville-jefferson-core',
      name: 'Louisville & Jefferson Core',
      fullName: 'City of Louisville & Jefferson County (Downtown & Highlands)',
      tier: 2,
      parentRegion: 'Greater Louisville',
      description: 'Whiskey Row historic bourbon tasting rooms, Muhammad Ali Center, 4th Street Live!, and University of Louisville medical center.',
      counties: ['Jefferson']
    },
    {
      id: 'KY-lexington-fayette-core',
      name: 'Lexington & Fayette Core',
      fullName: 'Lexington & Fayette County (Downtown & UK Campus)',
      tier: 2,
      parentRegion: 'Bluegrass Region',
      description: 'Thoroughbred horse farms, historic Victorian Square, Rupp Arena at Central Bank Center, and Kentucky Horse Park.',
      counties: ['Fayette']
    }
  ],

  // =========================================================================
  // OKLAHOMA (OK)
  // =========================================================================
  'OK': [
    // Tier 1: Macro-Regions
    {
      id: 'OK-greater-oklahoma-city',
      name: 'Greater Oklahoma City',
      fullName: 'Greater Oklahoma City Metropolitan Area (OKC & Bricktown)',
      tier: 1,
      description: 'Oklahoma state capitol with working oil wells on grounds, Bricktown canal entertainment district, Tinker Air Force Base (largest air depot in DoD), and Devon Energy Tower.',
      counties: ['Oklahoma', 'Cleveland', 'Canadian', 'Logan', 'McClain', 'Pottawatomie']
    },
    {
      id: 'OK-tulsa-green-country',
      name: 'Tulsa & Green Country',
      fullName: 'Tulsa & Green Country (Oil Capital Heritage & Gathering Place)',
      tier: 1,
      description: 'Gathering Place (world-ranked 66-acre riverfront park), world-class Art Deco architecture, Philbrook Museum of Art, Route 66, and aerospace maintenance.',
      counties: ['Tulsa', 'Rogers', 'Wagoner', 'Creek', 'Osage', 'Okmulgee']
    },
    {
      id: 'OK-southwest-lawton',
      name: 'Southwest Oklahoma',
      fullName: 'Southwest Oklahoma & Wichita Mountains (Lawton & Fort Sill)',
      tier: 1,
      description: 'Fort Sill Fires Center of Excellence (US Army Artillery), Wichita Mountains Wildlife Refuge (free-roaming bison herds), and Quartz Mountain.',
      counties: ['Comanche', 'Stephens', 'Grady', 'Caddo', 'Jackson', 'Beckham']
    },
    {
      id: 'OK-southeast-choctaw',
      name: 'Southeast Oklahoma',
      fullName: 'Southeast Oklahoma & Choctaw Nation (Beavers Bend & Kiamichi Mountains)',
      tier: 1,
      description: 'Beavers Bend State Park and Broken Bow luxury cabin getaways, Choctaw Nation headquarters in Durant, pine forests, and mountain lakes.',
      counties: ['Carter', 'Bryan', 'Pittsburg', 'Le Flore', 'McCurtain']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'OK-okc-oklahoma-county-core',
      name: 'Oklahoma City Core',
      fullName: 'Oklahoma City & Oklahoma County (Downtown & Midtown)',
      tier: 2,
      parentRegion: 'Greater Oklahoma City',
      description: 'Paycom Center (OKC Thunder NBA), Scissortail Park, Myriad Botanical Gardens crystal bridge, and Oklahoma City National Memorial & Museum.',
      counties: ['Oklahoma']
    },
    {
      id: 'OK-tulsa-county-core',
      name: 'Tulsa Urban Core',
      fullName: 'City of Tulsa & Tulsa County Core (Downtown & Arts District)',
      tier: 2,
      parentRegion: 'Tulsa & Green Country',
      description: 'BOK Center, Tulsa Arts District, Bob Dylan Center, Woody Guthrie Center, and Greenwood historic Black Wall Street district.',
      counties: ['Tulsa']
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHUNK_2_REGIONS };
}
