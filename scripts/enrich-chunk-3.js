/**
 * scripts/enrich-chunk-3.js
 *
 * Granular Macro & Metro Regional Definitions for Chunk 3:
 * Midwest Powerhouses: IL, OH, MI, IN, WI, MN, MO, IA, KS, SD.
 */

const CHUNK_3_REGIONS = {
  // =========================================================================
  // ILLINOIS (IL)
  // =========================================================================
  'IL': [
    // Tier 1: Macro-Regions
    {
      id: 'IL-chicagoland',
      name: 'Chicagoland',
      fullName: 'Chicagoland / Chicago Metropolitan Area',
      tier: 1,
      description: 'Third largest metropolis in US, world financial futures exchanges (CME), Fortune 500 capital, architectural landmarks, and Lake Michigan shoreline.',
      counties: ['Cook', 'DuPage', 'Lake', 'Will', 'Kane', 'McHenry', 'Kendall']
    },
    {
      id: 'IL-central-illinois',
      name: 'Central Illinois',
      fullName: 'Central Illinois & Prairie State Heartland (Springfield & Peoria)',
      tier: 1,
      description: 'State capital Springfield (Abraham Lincoln presidential home/tomb), University of Illinois at Urbana-Champaign (UIUC engineering), State Farm HQ in Bloomington, and Caterpillar heritage.',
      counties: ['Sangamon', 'Peoria', 'Champaign', 'McLean', 'Tazewell', 'Macon', 'Woodford', 'De Witt', 'Piatt', 'Christian', 'Logan', 'Menard', 'Mason']
    },
    {
      id: 'IL-northern-illinois-rockford',
      name: 'Northern Illinois',
      fullName: 'Northern Illinois & Stateline (Rockford, DeKalb & Quad Cities)',
      tier: 1,
      description: 'Aerospace manufacturing hub in Rockford, Northern Illinois University in DeKalb, John Deere world headquarters in Moline (Quad Cities), and Mississippi River bluffs.',
      counties: ['Winnebago', 'Boone', 'DeKalb', 'Ogle', 'Lee', 'Stephenson', 'Jo Daviess', 'Carroll', 'Whiteside', 'Rock Island', 'Henry', 'Mercer', 'LaSalle', 'Grundy', 'Kankakee']
    },
    {
      id: 'IL-metro-east-st-louis',
      name: 'Metro East (St. Louis)',
      fullName: 'Metro East / Illinois St. Louis Metropolitan Area',
      tier: 1,
      description: 'The Illinois suburbs of St. Louis, Cahokia Mounds UNESCO World Heritage Site (ancient pre-Columbian civilization), Scott Air Force Base (US TRANSCOM), and Mississippi River bridges.',
      counties: ['Madison', 'St. Clair', 'Monroe', 'Clinton', 'Jersey', 'Bond', 'Macoupin', 'Calhoun']
    },
    {
      id: 'IL-southern-shawnee',
      name: 'Southern Illinois',
      fullName: 'Southern Illinois & Shawnee National Forest (Little Egypt & Carbondale)',
      tier: 1,
      description: 'Southern Illinois University (SIU Carbondale), Shawnee National Forest (Garden of the Gods), Ohio & Mississippi River confluence in Cairo, and coal/winery country.',
      counties: ['Jackson', 'Williamson', 'Saline', 'Union', 'Johnson', 'Pope', 'Hardin', 'Alexander', 'Pulaski', 'Massac', 'Perry', 'Franklin', 'Hamilton', 'White', 'Jefferson', 'Marion', 'Clay', 'Wayne', 'Edwards', 'Wabash']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'IL-chicago-cook-core',
      name: 'Chicago & Cook County',
      fullName: 'City of Chicago & Cook County Urban Core',
      tier: 2,
      parentRegion: 'Chicagoland',
      description: 'The Loop, Magnificent Mile, Willis Tower, Millennium Park, Navy Pier, O\'Hare International Airport, and 77 historic neighborhood community areas.',
      counties: ['Cook']
    },
    {
      id: 'IL-collar-counties',
      name: 'The Collar Counties',
      fullName: 'Chicago Collar Counties (DuPage, Lake, Will, Kane & McHenry)',
      tier: 2,
      parentRegion: 'Chicagoland',
      description: 'High-income suburban corporate corridors (Naperville, Schaumburg, Oak Brook), Argonne National Laboratory, Fermilab particle physics accelerator, and Lake Michigan North Shore.',
      counties: ['DuPage', 'Lake', 'Will', 'Kane', 'McHenry']
    }
  ],

  // =========================================================================
  // OHIO (OH)
  // =========================================================================
  'OH': [
    // Tier 1: Macro-Regions
    {
      id: 'OH-central-columbus',
      name: 'Central Ohio',
      fullName: 'Central Ohio (Greater Columbus & Silicon Heartland)',
      tier: 1,
      description: 'Ohio state capitol, The Ohio State University, Cardinal Health, Nationwide, and Intel\'s multi-billion dollar semiconductor megafab campus.',
      counties: ['Franklin', 'Delaware', 'Licking', 'Fairfield', 'Pickaway', 'Union', 'Madison']
    },
    {
      id: 'OH-greater-cincinnati',
      name: 'Greater Cincinnati',
      fullName: 'Greater Cincinnati & Ohio River Hub (Southwest Ohio)',
      tier: 1,
      description: 'Procter & Gamble global HQ, Kroger headquarters, GE Aerospace, historic Over-the-Rhine arts, and University of Cincinnati.',
      counties: ['Hamilton', 'Butler', 'Warren', 'Clermont', 'Brown']
    },
    {
      id: 'OH-greater-cleveland',
      name: 'Greater Cleveland',
      fullName: 'Greater Cleveland & Lake Erie Northeast',
      tier: 1,
      description: 'World-renowned Cleveland Clinic, Case Western Reserve University, Rock and Roll Hall of Fame, Lake Erie port, and advanced healthcare/biomed.',
      counties: ['Cuyahoga', 'Lorain', 'Lake', 'Geauga', 'Medina']
    },
    {
      id: 'OH-akron-canton',
      name: 'Akron-Canton',
      fullName: 'Akron-Canton (Polymer Valley & Pro Football Hall of Fame)',
      tier: 1,
      description: 'Global polymer and tire engineering center (Goodyear, Bridgestone), Pro Football Hall of Fame in Canton, and Cuyahoga Valley National Park.',
      counties: ['Summit', 'Stark', 'Portage', 'Wayne']
    },
    {
      id: 'OH-miami-valley-dayton',
      name: 'Miami Valley & Dayton',
      fullName: 'Miami Valley (Dayton Aerospace & Wright-Patterson AFB)',
      tier: 1,
      description: 'Birthplace of Aviation, Wright-Patterson Air Force Base (Air Force Materiel Command), University of Dayton, and sensor technology.',
      counties: ['Montgomery', 'Greene', 'Miami', 'Clark', 'Preble']
    },
    {
      id: 'OH-northwest-toledo',
      name: 'Northwest Ohio & Toledo',
      fullName: 'Northwest Ohio (Toledo Glass City & Lake Erie Western Basin)',
      tier: 1,
      description: 'Jeep assembly plant, glass manufacturing center (Owens-Illinois, Libbey), Port of Toledo, and solar manufacturing corridor (First Solar).',
      counties: ['Lucas', 'Wood', 'Fulton', 'Ottawa', 'Sandusky', 'Hancock']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'OH-columbus-franklin-core',
      name: 'Columbus & Franklin Core',
      fullName: 'Columbus & Franklin County (Downtown & Short North)',
      tier: 2,
      parentRegion: 'Central Ohio',
      description: 'Scioto Mile riverfront, Ohio Stadium ("The Horseshoe"), Arena District, Short North Arts District, and German Village.',
      counties: ['Franklin']
    },
    {
      id: 'OH-cleveland-cuyahoga-core',
      name: 'Cleveland & Cuyahoga Core',
      fullName: 'Cleveland & Cuyahoga County (Downtown & University Circle)',
      tier: 2,
      parentRegion: 'Greater Cleveland',
      description: 'Public Square, Playhouse Square (second largest theater district in US), Cleveland Museum of Art, and Gordon Square arts district.',
      counties: ['Cuyahoga']
    }
  ],

  // =========================================================================
  // MICHIGAN (MI)
  // =========================================================================
  'MI': [
    // Tier 1: Macro-Regions
    {
      id: 'MI-metro-detroit',
      name: 'Metro Detroit',
      fullName: 'Metro Detroit & Southeast Michigan (Motor City Capital)',
      tier: 1,
      description: 'Global epicenter of the automotive industry (General Motors, Ford, Stellantis), Detroit River international shipping to Canada, and motown music.',
      counties: ['Wayne', 'Oakland', 'Macomb', 'Livingston', 'St. Clair', 'Lapeer']
    },
    {
      id: 'MI-west-michigan-grand-rapids',
      name: 'West Michigan',
      fullName: 'West Michigan & Grand Rapids (Furniture City & Medical Mile)',
      tier: 1,
      description: 'Grand Rapids Medical Mile research corridor, office furniture capital (Steelcase, Herman Miller), craft beer destination ("Beer City USA"), and Lake Michigan dunes.',
      counties: ['Kent', 'Ottawa', 'Muskegon', 'Allegan', 'Kalamazoo', 'Van Buren', 'Berrien', 'Cass', 'St. Joseph']
    },
    {
      id: 'MI-ann-arbor-washtenaw',
      name: 'Ann Arbor & Washtenaw',
      fullName: 'Ann Arbor & Greater Washtenaw (University of Michigan & Mobility)',
      tier: 1,
      description: 'University of Michigan flagship campus, Michigan Stadium ("The Big House"), autonomous vehicle testing proving grounds, and software startups.',
      counties: ['Washtenaw', 'Monroe', 'Lenawee', 'Jackson']
    },
    {
      id: 'MI-mid-michigan-capital',
      name: 'Mid-Michigan & Tri-Cities',
      fullName: 'Mid-Michigan & Capital Region (Lansing, Flint & Saginaw)',
      tier: 1,
      description: 'Michigan state capitol in Lansing, Michigan State University in East Lansing, Dow Chemical global headquarters in Midland, and auto assembly.',
      counties: ['Ingham', 'Eaton', 'Clinton', 'Genesee', 'Saginaw', 'Bay', 'Midland', 'Shiawassee']
    },
    {
      id: 'MI-northern-lower-traverse',
      name: 'Northern Lower Michigan',
      fullName: 'Northern Lower Michigan (Traverse City & Sleeping Bear Dunes)',
      tier: 1,
      description: 'Sleeping Bear Dunes National Lakeshore, National Cherry Festival in Traverse City, award-winning Old Mission/Leelanau wine AVAs, and Lake Michigan resorts.',
      counties: ['Grand Traverse', 'Leelanau', 'Benzie', 'Antrim', 'Kalkaska', 'Charlevoix', 'Emmet', 'Cheboygan', 'Otsego', 'Wexford', 'Manistee']
    },
    {
      id: 'MI-upper-peninsula-up',
      name: 'The Upper Peninsula (U.P.)',
      fullName: 'Upper Peninsula of Michigan & Lake Superior Shoreline',
      tier: 1,
      description: 'Pictured Rocks National Lakeshore, historic Mackinac Island (fudge and horses, no cars allowed), copper/iron mining heritage, and wild boreal forests.',
      counties: ['Marquette', 'Chippewa', 'Houghton', 'Delta', 'Dickinson', 'Menominee', 'Gogebic', 'Ontonagon', 'Iron', 'Baraga', 'Keweenaw', 'Luce', 'Mackinac', 'Schoolcraft', 'Alger']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'MI-detroit-wayne-core',
      name: 'Detroit & Wayne County',
      fullName: 'Detroit Urban Core & Wayne County (Downtown & Riverwalk)',
      tier: 2,
      parentRegion: 'Metro Detroit',
      description: 'GM Renaissance Center, Campus Martius Park, Detroit Institute of Arts (Diego Rivera murals), Henry Ford Museum in Dearborn, and Ambassador Bridge.',
      counties: ['Wayne']
    },
    {
      id: 'MI-oakland-affluent-tech',
      name: 'Oakland County Automation Alley',
      fullName: 'Oakland County Automation Alley (Troy, Southfield & Rochester Hills)',
      tier: 2,
      parentRegion: 'Metro Detroit',
      description: 'One of America\'s premier automation and robotics engineering counties, Chrysler World Headquarters in Auburn Hills, and affluent Birmingham/Bloomfield Hills.',
      counties: ['Oakland']
    }
  ],

  // =========================================================================
  // INDIANA (IN)
  // =========================================================================
  'IN': [
    // Tier 1: Macro-Regions
    {
      id: 'IN-central-indianapolis-metro',
      name: 'Central Indiana',
      fullName: 'Central Indiana & Greater Indianapolis (Crossroads of America)',
      tier: 1,
      description: 'Indianapolis Motor Speedway (Indy 500, world\'s largest single-day sporting event), Eli Lilly and Company global HQ, state government capital, and logistics crossroads.',
      counties: ['Marion', 'Hamilton', 'Hendricks', 'Johnson', 'Hancock', 'Boone', 'Morgan', 'Shelby', 'Madison']
    },
    {
      id: 'IN-northwest-chicago-suburbs',
      name: 'Northwest Indiana (NWI)',
      fullName: 'Northwest Indiana & The Region (Chicago Suburbs & Lake Michigan)',
      tier: 1,
      description: 'Indiana Dunes National Park, Gary and East Chicago steelworks (Cleveland-Cliffs), commuter rail directly into downtown Chicago, and BP Whiting Refinery.',
      counties: ['Lake', 'Porter', 'LaPorte', 'Newton', 'Jasper', 'Starke']
    },
    {
      id: 'IN-north-fort-wayne-south-bend',
      name: 'Northern Indiana',
      fullName: 'Northern Indiana (Fort Wayne & South Bend / Notre Dame)',
      tier: 1,
      description: 'University of Notre Dame in South Bend, orthopedic medical device capital of the world in Warsaw (Zimmer Biomet), RV manufacturing capital in Elkhart, and Fort Wayne.',
      counties: ['Allen', 'St. Joseph', 'Elkhart', 'Kosciusko', 'Marshall', 'Fulton', 'Noble', 'DeKalb', 'Whitley', 'Huntington', 'Wells', 'Adams', 'Steuben', 'LaGrange', 'Wabash']
    },
    {
      id: 'IN-southern-bloomington-evansville',
      name: 'Southern Indiana',
      fullName: 'Southern Indiana & Ohio River Valley (Bloomington & Evansville)',
      tier: 1,
      description: 'Indiana University flagship campus in Bloomington, limestone quarries (Empire State Building stone), Toyota Motor Manufacturing Indiana in Princeton, and Ohio River ports.',
      counties: ['Monroe', 'Vanderburgh', 'Clark', 'Floyd', 'Bartholomew', 'Vigo', 'Tippecanoe', 'Dubois', 'Warrick', 'Gibson', 'Posey', 'Spencer', 'Perry', 'Crawford', 'Harrison', 'Washington', 'Orange', 'Lawrence', 'Jackson', 'Jennings', 'Jefferson', 'Switzerland', 'Ohio', 'Dearborn', 'Ripley', 'Franklin', 'Decatur', 'Brown', 'Greene', 'Sullivan', 'Knox', 'Daviess', 'Martin', 'Pike']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'IN-indianapolis-marion-core',
      name: 'Indianapolis & Marion Core',
      fullName: 'Indianapolis & Marion County (Monument Circle & Mass Ave)',
      tier: 2,
      parentRegion: 'Central Indiana',
      description: 'Soldiers and Sailors Monument, Lucas Oil Stadium, Gainbridge Fieldhouse, Wholesale District, and IUPUI campus.',
      counties: ['Marion']
    },
    {
      id: 'IN-hamilton-carmel-fishers',
      name: 'Hamilton County Affluent Belt',
      fullName: 'Hamilton County (Carmel, Fishers, Noblesville & Westfield)',
      tier: 2,
      parentRegion: 'Central Indiana',
      description: 'Nationally recognized best places to live, Carmel Arts & Design District, roundabouts capital, Fishers Nickel Plate District, and Grand Park Sports Campus.',
      counties: ['Hamilton']
    }
  ],

  // =========================================================================
  // WISCONSIN (WI)
  // =========================================================================
  'WI': [
    // Tier 1: Macro-Regions
    {
      id: 'WI-greater-milwaukee',
      name: 'Greater Milwaukee',
      fullName: 'Greater Milwaukee & Lake Michigan Coastal Area',
      tier: 1,
      description: 'Brewing heritage, Harley-Davidson global HQ, Summerfest (world\'s largest music festival), Milwaukee Art Museum (Calatrava wings), and Lake Michigan shoreline.',
      counties: ['Milwaukee', 'Waukesha', 'Ozaukee', 'Washington', 'Racine', 'Kenosha']
    },
    {
      id: 'WI-greater-madison-capital',
      name: 'Greater Madison',
      fullName: 'Greater Madison & South Central Wisconsin (State Capital & UW)',
      tier: 1,
      description: 'Wisconsin state capitol situated between Lake Mendota and Lake Monona, University of Wisconsin-Madison, Epic Systems healthcare software campus, and biotech.',
      counties: ['Dane', 'Columbia', 'Sauk', 'Iowa', 'Green', 'Rock', 'Jefferson', 'Dodge', 'Lafayette', 'Grant']
    },
    {
      id: 'WI-fox-valley-green-bay',
      name: 'Fox Valley & Green Bay',
      fullName: 'Fox Valley & Green Bay (Titletown & Door County Peninsula)',
      tier: 1,
      description: 'Historic Lambeau Field and the Green Bay Packers, paper making and packaging along the Fox River in Appleton/Oshkosh, and Door County cherry orchards/lighthouses.',
      counties: ['Brown', 'Outagamie', 'Winnebago', 'Fond du Lac', 'Calumet', 'Door', 'Kewaunee', 'Manitowoc', 'Sheboygan']
    },
    {
      id: 'WI-western-wisconsin-eau-claire',
      name: 'Western Wisconsin',
      fullName: 'Western Wisconsin & Coulee Region (Eau Claire & La Crosse)',
      tier: 1,
      description: 'Driftless Area unglaciated limestone bluffs along the Mississippi River in La Crosse, thriving indie music scene in Eau Claire (Bon Iver), and Twin Cities commuter basin.',
      counties: ['Eau Claire', 'Chippewa', 'La Crosse', 'St. Croix', 'Pierce', 'Dunn', 'Pepin', 'Buffalo', 'Trempealeau', 'Jackson', 'Monroe', 'Vernon', 'Crawford', 'Richland']
    },
    {
      id: 'WI-northwoods-lake-superior',
      name: 'Northwoods & Lake Superior',
      fullName: 'Wisconsin Northwoods & Lake Superior Shoreline (Apostle Islands)',
      tier: 1,
      description: 'Apostle Islands National Lakeshore sea caves, thousands of freshwater glacial lakes, Hayward lumberjack championships, Minocqua chain of lakes, and timber.',
      counties: ['Marathon', 'Wood', 'Portage', 'Oneida', 'Vilas', 'Ashland', 'Bayfield', 'Douglas', 'Burnett', 'Washburn', 'Sawyer', 'Price', 'Rusk', 'Barron', 'Polk', 'Taylor', 'Lincoln', 'Langlade', 'Clark', 'Shawano', 'Oconto', 'Marinette', 'Forest', 'Florence', 'Iron']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'WI-milwaukee-county-core',
      name: 'Milwaukee County Core',
      fullName: 'Milwaukee County Core (Downtown, Third Ward & Lakefront)',
      tier: 2,
      parentRegion: 'Greater Milwaukee',
      description: 'Historic Third Ward arts and dining, Fiserv Forum / Deer District, Lakefront Brewery, and American Family Field (Brewers).',
      counties: ['Milwaukee']
    },
    {
      id: 'WI-madison-dane-core',
      name: 'Madison & Dane County',
      fullName: 'Madison & Dane County Core (Isthmus & Silicon Prairie)',
      tier: 2,
      parentRegion: 'Greater Madison',
      description: 'State Street pedestrian mall, Camp Randall Stadium, research park, Monona Terrace, and Madison farmers market.',
      counties: ['Dane']
    }
  ],

  // =========================================================================
  // MINNESOTA (MN)
  // =========================================================================
  'MN': [
    // Tier 1: Macro-Regions
    {
      id: 'MN-twin-cities-metro',
      name: 'Twin Cities Metro',
      fullName: 'Twin Cities Metropolitan Area (Minneapolis & Saint Paul)',
      tier: 1,
      description: 'Major corporate headquarters powerhouse (Target, Best Buy, 3M, UnitedHealth Group, General Mills), Mall of America, Guthrie Theater, and 10,000 lakes.',
      counties: ['Hennepin', 'Ramsey', 'Dakota', 'Anoka', 'Washington', 'Scott', 'Carver', 'Wright', 'Sherburne', 'Chisago']
    },
    {
      id: 'MN-rochester-southeast',
      name: 'Rochester & Southeast MN',
      fullName: 'Rochester & Southeast Minnesota (Mayo Clinic Medical Capital)',
      tier: 1,
      description: 'World-renowned Mayo Clinic global destination medical center, IBM Rochester computing legacy, and picturesque Mississippi River blufflands.',
      counties: ['Olmsted', 'Winona', 'Goodhue', 'Wabasha', 'Fillmore', 'Houston', 'Mower', 'Dodge', 'Freeborn', 'Steele', 'Rice']
    },
    {
      id: 'MN-duluth-arrowhead',
      name: 'Duluth & The Arrowhead',
      fullName: 'Duluth, The Arrowhead & Lake Superior North Shore',
      tier: 1,
      description: 'Port of Duluth-Superior (world\'s furthest-inland freshwater port), Aerial Lift Bridge, Boundary Waters Canoe Area Wilderness (BWCAW), and iron ore Range.',
      counties: ['St. Louis', 'Lake', 'Cook', 'Carlton', 'Itasca', 'Koochiching', 'Aitkin']
    },
    {
      id: 'MN-central-western-prairie',
      name: 'Central & Western Minnesota',
      fullName: 'Central & Western Minnesota (St. Cloud, Moorhead & Farmlands)',
      tier: 1,
      description: 'St. Cloud granite quarries on Mississippi River, fertile Red River Valley sugarbeet and wheat basin in Moorhead, and agricultural food processing.',
      counties: ['Stearns', 'Benton', 'Clay', 'Otter Tail', 'Douglas', 'Crow Wing', 'Blue Earth', 'Nicollet', 'Brown', 'Kandiyohi', 'Meeker', 'McLeod', 'Morrison', 'Todd', 'Mille Lacs', 'Kanabec', 'Pine', 'Cass', 'Hubbard', 'Beltrami']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'MN-minneapolis-hennepin-core',
      name: 'Minneapolis & Hennepin',
      fullName: 'Minneapolis Core & Hennepin County (Downtown & Chain of Lakes)',
      tier: 2,
      parentRegion: 'Twin Cities Metro',
      description: 'Skyway-connected downtown skyscrapers, Stone Arch Bridge overlooking St. Anthony Falls, Chain of Lakes (Bde Maka Ska, Harriet), and Target Field.',
      counties: ['Hennepin']
    },
    {
      id: 'MN-st-paul-ramsey-core',
      name: 'Saint Paul & Ramsey',
      fullName: 'Saint Paul & Ramsey County (State Capitol & Summit Avenue)',
      tier: 2,
      parentRegion: 'Twin Cities Metro',
      description: 'Cass Gilbert-designed Minnesota State Capitol, historic Summit Avenue Victorian mansions, Xcel Energy Center, and Science Museum of Minnesota.',
      counties: ['Ramsey']
    }
  ],

  // =========================================================================
  // MISSOURI (MO)
  // =========================================================================
  'MO': [
    // Tier 1: Macro-Regions
    {
      id: 'MO-greater-st-louis',
      name: 'Greater St. Louis',
      fullName: 'Greater St. Louis (Gateway to the West & Bio-Innovation)',
      tier: 1,
      description: 'Iconic 630-foot stainless steel Gateway Arch National Park, Danforth Plant Science Center / ag-biotech hub, Anheuser-Busch brewery, and Washington University in St. Louis.',
      counties: ['St. Louis', 'St. Charles', 'Jefferson', 'Franklin', 'Lincoln', 'Warren']
    },
    {
      id: 'MO-greater-kansas-city',
      name: 'Greater Kansas City (MO)',
      fullName: 'Greater Kansas City Missouri (Jazz, BBQ & Country Club Plaza)',
      tier: 1,
      description: 'World-famous Kansas City barbecue, historic 18th & Vine jazz district, Country Club Plaza Spanish architecture, Hallmark Cards HQ, and Cerner/Oracle healthcare.',
      counties: ['Jackson', 'Clay', 'Platte', 'Cass', 'Ray', 'Clinton', 'Lafayette']
    },
    {
      id: 'MO-southwest-springfield-ozarks',
      name: 'Southwest Missouri & Ozarks',
      fullName: 'Southwest Missouri & The Ozarks (Springfield & Branson Entertainment)',
      tier: 1,
      description: 'Bass Pro Shops flagship Grandaddy store in Springfield, Branson live theater entertainment strip and Silver Dollar City, and Table Rock Lake resort recreation.',
      counties: ['Greene', 'Christian', 'Taney', 'Stone', 'Jasper', 'Newton', 'Webster', 'Polk', 'Lawrence', 'Barry', 'Laclede', 'Camden']
    },
    {
      id: 'MO-central-columbia-capital',
      name: 'Central Missouri',
      fullName: 'Central Missouri & Lake of the Ozarks (Columbia & State Capital)',
      tier: 1,
      description: 'University of Missouri (Mizzou) in Columbia, state government capitol in Jefferson City, and Lake of the Ozarks boating playground with over 1,150 miles of shoreline.',
      counties: ['Boone', 'Cole', 'Callaway', 'Miller', 'Morgan', 'Moniteau', 'Cooper', 'Audrain', 'Pettis', 'Saline', 'Howard', 'Osage', 'Maries', 'Phelps', 'Pulaski']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'MO-st-louis-core',
      name: 'St. Louis City & Central Core',
      fullName: 'St. Louis City Core & Forest Park',
      tier: 2,
      parentRegion: 'Greater St. Louis',
      description: 'Gateway Arch, Busch Stadium (St. Louis Cardinals), Forest Park (1,300-acre park featuring free Saint Louis Zoo and Art Museum), and Central West End.',
      counties: ['St. Louis']
    },
    {
      id: 'MO-kansas-city-jackson-core',
      name: 'Kansas City & Jackson Core',
      fullName: 'Kansas City & Jackson County Core (Downtown & Plaza)',
      tier: 2,
      parentRegion: 'Greater Kansas City (MO)',
      description: 'Power & Light District, T-Mobile Center, National WWI Museum and Memorial at Liberty Memorial, and Union Station.',
      counties: ['Jackson']
    }
  ],

  // =========================================================================
  // IOWA (IA)
  // =========================================================================
  'IA': [
    // Tier 1: Macro-Regions
    {
      id: 'IA-central-des-moines',
      name: 'Central Iowa',
      fullName: 'Central Iowa & Greater Des Moines (Insurance & Financial Hub)',
      tier: 1,
      description: 'Iowa state capitol with 23-karat gold leaf dome, major global insurance and financial center (Principal Financial), Des Moines Art Center, and Iowa State Fair.',
      counties: ['Polk', 'Dallas', 'Warren', 'Story', 'Boone', 'Jasper', 'Marion', 'Madison']
    },
    {
      id: 'IA-eastern-cedar-rapids-iowa-city',
      name: 'Eastern Iowa',
      fullName: 'Eastern Iowa (Cedar Rapids & Iowa City Corridor)',
      tier: 1,
      description: 'University of Iowa in Iowa City (UI Hospitals and Clinics / famed Writers\' Workshop), Collins Aerospace engineering in Cedar Rapids, and Quaker Oats manufacturing.',
      counties: ['Linn', 'Johnson', 'Benton', 'Jones', 'Iowa', 'Washington', 'Cedar']
    },
    {
      id: 'IA-quad-cities-mississippi',
      name: 'Quad Cities & Mississippi River',
      fullName: 'Quad Cities Iowa & Mississippi River Corridor (Davenport & Dubuque)',
      tier: 1,
      description: 'Davenport and Bettendorf on Mississippi River, John Deere manufacturing, historic port of Dubuque, Field of Dreams movie site in Dyersville, and limestone river bluffs.',
      counties: ['Scott', 'Dubuque', 'Clinton', 'Muscatine', 'Jackson', 'Des Moines', 'Lee']
    },
    {
      id: 'IA-western-siouxland-pottawattamie',
      name: 'Western Iowa',
      fullName: 'Western Iowa & Siouxland (Sioux City & Council Bluffs / Omaha East)',
      tier: 1,
      description: 'Council Bluffs casino and data center corridor across from Omaha, Tyson Foods beef processing in Sioux City, Loess Hills National Scenic Byway, and corn/soy ag.',
      counties: ['Pottawattamie', 'Woodbury', 'Plymouth', 'Sioux', 'Harrison', 'Mills', 'Cass', 'Page', 'Fremont', 'Montgomery']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'IA-des-moines-polk-core',
      name: 'Des Moines & Polk Core',
      fullName: 'Des Moines & Polk County (East Village & Downtown Skywalks)',
      tier: 2,
      parentRegion: 'Central Iowa',
      description: 'Historic East Village shopping, 4 miles of climate-controlled downtown skywalks, Pappajohn Sculpture Park, and Wells Fargo Arena.',
      counties: ['Polk']
    }
  ],

  // =========================================================================
  // KANSAS (KS)
  // =========================================================================
  'KS': [
    // Tier 1: Macro-Regions
    {
      id: 'KS-kansas-city-metro',
      name: 'Kansas City Metro (KS)',
      fullName: 'Kansas City Kansas & Johnson County (Overland Park & Olathe)',
      tier: 1,
      description: 'High-income Johnson County suburbs, corporate office campuses, Garmin global headquarters in Olathe, Kansas Speedway, and Sporting KC soccer.',
      counties: ['Johnson', 'Wyandotte', 'Leavenworth', 'Miami']
    },
    {
      id: 'KS-wichita-south-central',
      name: 'Wichita & South Central',
      fullName: 'Wichita & South Central Kansas (Air Capital of the World)',
      tier: 1,
      description: 'Global center of general aviation aircraft design and manufacturing (Textron Aviation, Cessna, Beechcraft, Learjet, Spirit AeroSystems), and Koch Industries HQ.',
      counties: ['Sedgwick', 'Butler', 'Harvey', 'Reno', 'Sumner', 'Cowley', 'McPherson']
    },
    {
      id: 'KS-topeka-lawrence-flint-hills',
      name: 'Topeka & Flint Hills',
      fullName: 'Topeka, Lawrence & The Flint Hills (State Capitol & Jayhawks)',
      tier: 1,
      description: 'Kansas state capitol in Topeka, historic Brown v. Board of Education national site, University of Kansas (KU Jayhawks) in Lawrence, and Tallgrass Prairie National Preserve.',
      counties: ['Shawnee', 'Douglas', 'Riley', 'Pottawatomie', 'Geary', 'Lyon', 'Wabaunsee', 'Osage', 'Franklin', 'Chase', 'Morris']
    },
    {
      id: 'KS-western-high-plains',
      name: 'Western Kansas',
      fullName: 'Western Kansas & High Plains (Dodge City, Garden City & Hays)',
      tier: 1,
      description: 'Historic Wild West cowtown in Dodge City (Boot Hill Museum), vast high-yield grain wheat belts, massive beef cattle feedlots and packing, and Fort Hays State University.',
      counties: ['Ford', 'Finney', 'Ellis', 'Seward', 'Saline', 'Barton', 'Thomas', 'Sherman', 'Scott', 'Grant', 'Stevens', 'Morton', 'Gray', 'Meade', 'Hodgeman', 'Ness', 'Rush', 'Pawnee', 'Edwards', 'Kiowa', 'Comanche', 'Clark']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'KS-johnson-county-affluent',
      name: 'Johnson County Tech Belt',
      fullName: 'Johnson County Suburbs (Overland Park, Leawood & Olathe)',
      tier: 2,
      parentRegion: 'Kansas City Metro (KS)',
      description: 'Consistently ranked among the top counties in America for public schools and quality of life, Corporate Woods business park, and Town Center Plaza.',
      counties: ['Johnson']
    },
    {
      id: 'KS-wichita-sedgwick-core',
      name: 'Wichita & Sedgwick Core',
      fullName: 'Wichita & Sedgwick County (Old Town & Keeper of the Plains)',
      tier: 2,
      parentRegion: 'Wichita & South Central',
      description: '44-foot Keeper of the Plains statue at the confluence of the Big and Little Arkansas rivers, historic brick Old Town entertainment district, and Wichita State University.',
      counties: ['Sedgwick']
    }
  ],

  // =========================================================================
  // SOUTH DAKOTA (SD)
  // =========================================================================
  'SD': [
    // Tier 1: Macro-Regions
    {
      id: 'SD-sioux-falls-east-river',
      name: 'Sioux Falls & East River',
      fullName: 'Sioux Falls & East River South Dakota (Falls Park & Financial Hub)',
      tier: 1,
      description: 'South Dakota\'s largest city, natural quartzite waterfalls at Falls Park, major national credit card banking and financial operations (no state income tax), and healthcare.',
      counties: ['Minnehaha', 'Lincoln', 'Brown', 'Brookings', 'Codington', 'Yankton', 'Davison', 'Clay', 'Union', 'Lake', 'Moody', 'Turner', 'McCook']
    },
    {
      id: 'SD-black-hills-rapid-city',
      name: 'Black Hills & Rapid City',
      fullName: 'Black Hills & Rapid City (Mount Rushmore, Badlands & Sturgis)',
      tier: 1,
      description: 'Mount Rushmore National Memorial, Crazy Horse Memorial, Badlands National Park, Custer State Park buffalo herds, Ellsworth AFB (B-21 Raider stealth bomber), and historic Deadwood.',
      counties: ['Pennington', 'Meade', 'Lawrence', 'Custer', 'Fall River', 'Oglala Lakota', 'Butte']
    },
    {
      id: 'SD-central-missouri-river',
      name: 'Central South Dakota',
      fullName: 'Central South Dakota & Capital Region (Pierre & Lake Oahe)',
      tier: 1,
      description: 'South Dakota state capitol in Pierre along the Missouri River, massive Lake Oahe reservoir (one of the largest dam reservoirs in the US for walleye fishing), and expansive cattle ranchlands.',
      counties: ['Hughes', 'Stanley', 'Lyman', 'Brule', 'Potter', 'Sully', 'Dewey', 'Corson', 'Ziebach', 'Haakon', 'Jackson', 'Jones', 'Mellette', 'Todd', 'Tripp', 'Gregory']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'SD-sioux-falls-metro-core',
      name: 'Sioux Falls Metro Core',
      fullName: 'Sioux Falls Metropolitan Area (Minnehaha & Lincoln Counties)',
      tier: 2,
      parentRegion: 'Sioux Falls & East River',
      description: 'Rapidly expanding commercial nucleus spanning Minnehaha and Lincoln counties, Denny Sanford PREMIER Center, Sanford Health, and Avera Health systems.',
      counties: ['Minnehaha', 'Lincoln']
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHUNK_3_REGIONS };
}
