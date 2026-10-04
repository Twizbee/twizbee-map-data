/**
 * scripts/enrich-chunk-1.js
 *
 * Granular Macro & Metro Regional Definitions for Chunk 1:
 * Mid-Atlantic & Northeast Giants: NY, PA, NJ, MA, MD, VA, CT.
 */

const CHUNK_1_REGIONS = {
  // =========================================================================
  // NEW YORK (NY)
  // =========================================================================
  'NY': [
    // Tier 1: Macro-Regions
    {
      id: 'NY-downstate',
      name: 'Downstate New York',
      fullName: 'Downstate New York (NYC, Long Island & Lower Hudson Valley)',
      tier: 1,
      description: 'The premier commercial, financial, and cultural hub of the US encompassing the 5 boroughs of New York City, Long Island, and Westchester.',
      counties: ['New York', 'Kings', 'Queens', 'Bronx', 'Richmond', 'Nassau', 'Suffolk', 'Westchester', 'Rockland', 'Putnam']
    },
    {
      id: 'NY-upstate',
      name: 'Upstate New York',
      fullName: 'Upstate New York (Capital, Central, Western & Adirondacks)',
      tier: 1,
      description: 'The vast region extending from the Hudson Valley north to the Canadian border and west to the Great Lakes and Niagara Falls.',
      counties: [
        'Albany', 'Rensselaer', 'Saratoga', 'Schenectady', 'Warren', 'Washington',
        'Oneida', 'Onondaga', 'Madison', 'Oswego', 'Cayuga', 'Cortland', 'Tompkins',
        'Monroe', 'Ontario', 'Wayne', 'Livingston', 'Yates', 'Seneca',
        'Erie', 'Niagara', 'Chautauqua', 'Cattaraugus', 'Allegany', 'Genesee', 'Orleans', 'Wyoming',
        'Broome', 'Tioga', 'Chemung', 'Steuben', 'Schuyler', 'Chenango', 'Otsego', 'Delaware',
        'Dutchess', 'Orange', 'Ulster', 'Sullivan', 'Columbia', 'Greene',
        'Clinton', 'Franklin', 'Essex', 'St. Lawrence', 'Jefferson', 'Lewis', 'Hamilton', 'Herkimer', 'Fulton', 'Montgomery', 'Schoharie'
      ]
    },
    {
      id: 'NY-hudson-valley',
      name: 'Hudson Valley',
      fullName: 'Hudson Valley (Westchester, Rockland, Orange & Mid-Hudson)',
      tier: 1,
      description: 'Historic scenic river valley connecting NYC to the state capital, historic estates, Culinary Institute, and West Point Military Academy.',
      counties: ['Westchester', 'Rockland', 'Putnam', 'Orange', 'Dutchess', 'Ulster', 'Sullivan', 'Columbia', 'Greene']
    },
    {
      id: 'NY-western-new-york',
      name: 'Western New York',
      fullName: 'Western New York & Niagara Frontier (Buffalo & Rochester Corridor)',
      tier: 1,
      description: 'Great Lakes manufacturing, Niagara Falls tourism, University at Buffalo, and optics/imaging tech in Rochester.',
      counties: ['Erie', 'Niagara', 'Monroe', 'Ontario', 'Wayne', 'Genesee', 'Orleans', 'Livingston', 'Wyoming', 'Chautauqua', 'Cattaraugus', 'Allegany']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'NY-new-york-city',
      name: 'New York City (5 Boroughs)',
      fullName: 'New York City (Manhattan, Brooklyn, Queens, Bronx & Staten Island)',
      tier: 2,
      parentRegion: 'Downstate New York',
      description: 'America\'s largest city, global finance (Wall Street), Broadway theater, United Nations headquarters, and historic immigrant cultural corridors.',
      counties: ['New York', 'Kings', 'Queens', 'Bronx', 'Richmond']
    },
    {
      id: 'NY-manhattan-core',
      name: 'Manhattan Core',
      fullName: 'Manhattan / New York County (Midtown, Financial District & Harlem)',
      tier: 2,
      parentRegion: 'New York City (5 Boroughs)',
      description: 'The dense urban economic nucleus, Central Park, Silicon Alley tech, Fortune 500 headquarters, and iconic world landmarks.',
      counties: ['New York']
    },
    {
      id: 'NY-brooklyn-kings',
      name: 'Brooklyn',
      fullName: 'Brooklyn / Kings County (Downtown, Williamsburg, DUMBO & Flatbush)',
      tier: 2,
      parentRegion: 'New York City (5 Boroughs)',
      description: 'Vibrant cultural innovator, tech startup hub (Brooklyn Navy Yard), historic brownstone neighborhoods, and Coney Island.',
      counties: ['Kings']
    },
    {
      id: 'NY-queens',
      name: 'Queens',
      fullName: 'Queens County (Long Island City, Astoria, Flushing & JFK/LGA)',
      tier: 2,
      parentRegion: 'New York City (5 Boroughs)',
      description: 'The most ethnically diverse urban county on earth, JFK and LaGuardia international airports, and Long Island City waterfront tech.',
      counties: ['Queens']
    },
    {
      id: 'NY-bronx',
      name: 'The Bronx',
      fullName: 'The Bronx / Bronx County (South Bronx, Riverdale & Pelham Bay)',
      tier: 2,
      parentRegion: 'New York City (5 Boroughs)',
      description: 'Birthplace of Hip Hop, historic Yankee Stadium, the Bronx Zoo, New York Botanical Garden, and maritime City Island.',
      counties: ['Bronx']
    },
    {
      id: 'NY-staten-island',
      name: 'Staten Island',
      fullName: 'Staten Island / Richmond County (North Shore, Mid-Island & South Shore)',
      tier: 2,
      parentRegion: 'New York City (5 Boroughs)',
      description: 'The borough of parks and green spaces, historic Richmond Town, scenic Staten Island Ferry, and residential communities.',
      counties: ['Richmond']
    },
    {
      id: 'NY-long-island',
      name: 'Long Island',
      fullName: 'Long Island (Nassau & Suffolk Counties / Hamptons & Gold Coast)',
      tier: 2,
      parentRegion: 'Downstate New York',
      description: 'Affluent suburban North Shore Gold Coast, South Shore beaches (Jones Beach), Fire Island, world-famous Hamptons estates, and Brookhaven National Lab.',
      counties: ['Nassau', 'Suffolk']
    },
    {
      id: 'NY-westchester-suburbs',
      name: 'Westchester & Lower Hudson',
      fullName: 'Westchester & Lower Hudson Suburbs (White Plains, Yonkers & Rockland)',
      tier: 2,
      parentRegion: 'Hudson Valley',
      description: 'Prime commuter rail corridor, corporate headquarters (Mastercard, IBM), affluent Sound Shore and Hudson River communities.',
      counties: ['Westchester', 'Rockland', 'Putnam']
    },
    {
      id: 'NY-capital-district',
      name: 'Capital District',
      fullName: 'Capital District & Tech Valley (Albany, Saratoga Springs, Troy & Schenectady)',
      tier: 2,
      parentRegion: 'Upstate New York',
      description: 'New York state government capital, Albany NanoTech Complex / semiconductor cluster, Saratoga thoroughbred racetrack, and RPI engineering.',
      counties: ['Albany', 'Rensselaer', 'Saratoga', 'Schenectady']
    },
    {
      id: 'NY-greater-buffalo',
      name: 'Greater Buffalo & Niagara',
      fullName: 'Greater Buffalo-Niagara Falls Metropolitan Area',
      tier: 2,
      parentRegion: 'Western New York',
      description: 'Second largest metro in NY, architectural masterpiece heritage (Frank Lloyd Wright), Peace Bridge Canadian border crossing, and Niagara Falls.',
      counties: ['Erie', 'Niagara']
    },
    {
      id: 'NY-greater-rochester',
      name: 'Greater Rochester',
      fullName: 'Greater Rochester & Finger Lakes Gateway',
      tier: 2,
      parentRegion: 'Western New York',
      description: 'Global imaging, optics, and photonics capital (Kodak, Xerox, Bausch & Lomb roots), University of Rochester, and wine country.',
      counties: ['Monroe', 'Ontario', 'Wayne', 'Livingston']
    },
    {
      id: 'NY-central-ny-syracuse',
      name: 'Central New York & Syracuse',
      fullName: 'Central New York (Syracuse, Onondaga & Micron MegaFab Corridor)',
      tier: 2,
      parentRegion: 'Upstate New York',
      description: 'Syracuse University, crossroads of the NYS Thruway and I-81, and future multi-billion Micron Technology semiconductor megafab.',
      counties: ['Onondaga', 'Oswego', 'Madison', 'Cayuga', 'Cortland']
    },
    {
      id: 'NY-southern-tier-ithaca',
      name: 'Southern Tier & Finger Lakes',
      fullName: 'Southern Tier (Binghamton, Elmira, Corning & Ithaca / Cornell)',
      tier: 2,
      parentRegion: 'Upstate New York',
      description: 'Cornell University & Ithaca gorges, Corning Inc. global glass innovation, Binghamton aerospace simulation, and Finger Lakes wine AVA.',
      counties: ['Tompkins', 'Broome', 'Tioga', 'Chemung', 'Steuben', 'Schuyler']
    },
    {
      id: 'NY-adirondacks-north-country',
      name: 'Adirondacks & North Country',
      fullName: 'Adirondack Park & North Country (Lake Placid, Plattsburgh & Thousand Islands)',
      tier: 2,
      parentRegion: 'Upstate New York',
      description: '6-million-acre Adirondack Park (largest state park in contiguous US), Lake Placid Olympic village, Fort Drum 10th Mountain Division, and St. Lawrence River.',
      counties: ['Clinton', 'Essex', 'Franklin', 'St. Lawrence', 'Jefferson', 'Lewis', 'Hamilton', 'Warren']
    }
  ],

  // =========================================================================
  // PENNSYLVANIA (PA)
  // =========================================================================
  'PA': [
    // Tier 1: Macro-Regions
    {
      id: 'PA-southeast-delaware-valley',
      name: 'Southeast Pennsylvania',
      fullName: 'Southeast Pennsylvania & Delaware Valley (Greater Philadelphia)',
      tier: 1,
      description: 'Historic cradle of American liberty, life sciences and biotech hub, affluent suburban counties, and Delaware River deepwater ports.',
      counties: ['Philadelphia', 'Montgomery', 'Bucks', 'Delaware', 'Chester']
    },
    {
      id: 'PA-greater-pittsburgh-western',
      name: 'Greater Pittsburgh & Western PA',
      fullName: 'Greater Pittsburgh & Western Pennsylvania (Steel City & Tech)',
      tier: 1,
      description: 'Carnegie Mellon University robotics / AI hub, UPMC healthcare powerhouse, Three Rivers confluence, and energy manufacturing.',
      counties: ['Allegheny', 'Westmoreland', 'Washington', 'Beaver', 'Butler', 'Fayette', 'Armstrong', 'Lawrence', 'Indiana', 'Greene']
    },
    {
      id: 'PA-lehigh-valley-northeast',
      name: 'Northeast & Lehigh Valley',
      fullName: 'Northeast Pennsylvania, Poconos & Lehigh Valley',
      tier: 1,
      description: 'Logistics distribution crossroads, historic Bethlehem steel heritage, Pocono Mountains four-season resort retreats, and Scranton/Wilkes-Barre.',
      counties: ['Lehigh', 'Northampton', 'Monroe', 'Pike', 'Wayne', 'Carbon', 'Lackawanna', 'Luzerne', 'Schuylkill']
    },
    {
      id: 'PA-south-central-capital',
      name: 'South Central & Susquehanna',
      fullName: 'South Central Pennsylvania & Capital Region (Harrisburg, Lancaster & York)',
      tier: 1,
      description: 'Pennsylvania state capitol, Hershey chocolate capital, historic Pennsylvania Dutch Amish agricultural heartland, and Civil War Gettysburg.',
      counties: ['Dauphin', 'Cumberland', 'Lancaster', 'York', 'Lebanon', 'Adams', 'Franklin', 'Perry']
    },
    {
      id: 'PA-central-highlands',
      name: 'Central Pennsylvania',
      fullName: 'Central Pennsylvania & Allegheny Highlands (State College / Happy Valley)',
      tier: 1,
      description: 'Penn State University flagship campus in State College, Little League World Series in Williamsport, Altoona rail history, and state forests.',
      counties: ['Centre', 'Blair', 'Huntingdon', 'Mifflin', 'Juniata', 'Snyder', 'Union', 'Northumberland', 'Montour', 'Columbia', 'Lycoming', 'Clinton', 'Clearfield', 'Cambria', 'Bedford', 'Somerset', 'Fulton']
    },
    {
      id: 'PA-northwest-great-lakes',
      name: 'Northwest Pennsylvania',
      fullName: 'Northwest Pennsylvania & Lake Erie Gateway',
      tier: 1,
      description: 'Presque Isle State Park beaches on Lake Erie, commercial port, plastics and advanced manufacturing, and Allegheny National Forest.',
      counties: ['Erie', 'Crawford', 'Mercer', 'Venango', 'Warren', 'Forest', 'Clarion', 'Elk', 'Cameron', 'McKean', 'Potter', 'Tioga', 'Bradford', 'Susquehanna', 'Wyoming', 'Sullivan']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'PA-philadelphia-core',
      name: 'Philadelphia City Core',
      fullName: 'Philadelphia County & Center City Core',
      tier: 2,
      parentRegion: 'Southeast Pennsylvania',
      description: 'Center City, University City (Penn, Drexel), Comcast Center skyscrapers, Independence Hall, and vibrant South/Fishtown neighborhoods.',
      counties: ['Philadelphia']
    },
    {
      id: 'PA-main-line-suburbs',
      name: 'Suburban Philadelphia',
      fullName: 'Suburban Philadelphia (Montgomery, Bucks, Delaware & Chester)',
      tier: 2,
      parentRegion: 'Southeast Pennsylvania',
      description: 'Affluent Main Line estates, King of Prussia shopping/commercial corridor, historic Bucks County artist colonies, and Brandywine Valley.',
      counties: ['Montgomery', 'Bucks', 'Delaware', 'Chester']
    },
    {
      id: 'PA-pittsburgh-allegheny',
      name: 'Pittsburgh & Allegheny County',
      fullName: 'Pittsburgh & Allegheny County (Downtown, Oakland & Strip District)',
      tier: 2,
      parentRegion: 'Greater Pittsburgh & Western PA',
      description: 'The City of Bridges, Golden Triangle skyline, CMU autonomous vehicle engineering labs, and world-class healthcare centers.',
      counties: ['Allegheny']
    },
    {
      id: 'PA-lehigh-valley-metro',
      name: 'Lehigh Valley',
      fullName: 'Lehigh Valley Metropolitan Area (Allentown, Bethlehem & Easton)',
      tier: 2,
      parentRegion: 'Northeast & Lehigh Valley',
      description: 'Fastest-growing region in PA, Sands/Wind Creek resort, Crayola headquarters, Martin Guitar, and multi-modal freight fulfillment logistics.',
      counties: ['Lehigh', 'Northampton']
    },
    {
      id: 'PA-lancaster-county',
      name: 'Lancaster & Dutch Country',
      fullName: 'Lancaster County & Historic Dutch Country',
      tier: 2,
      parentRegion: 'South Central & Susquehanna',
      description: 'America\'s oldest Amish settlement, thriving downtown Lancaster arts district, farm-to-table culinary destination, and heritage tourism.',
      counties: ['Lancaster']
    },
    {
      id: 'PA-scranton-wilkes-barre-metro',
      name: 'Scranton & Wyoming Valley',
      fullName: 'Scranton / Wilkes-Barre & Wyoming Valley',
      tier: 2,
      parentRegion: 'Northeast & Lehigh Valley',
      description: 'Historic anthracite coal capital, University of Scranton, Mohegan Pennsylvania casino, and Pocono mountain gateway.',
      counties: ['Lackawanna', 'Luzerne']
    }
  ],

  // =========================================================================
  // NEW JERSEY (NJ)
  // =========================================================================
  'NJ': [
    // Tier 1: Macro-Regions
    {
      id: 'NJ-north-jersey',
      name: 'North Jersey',
      fullName: 'North Jersey (NYC Metropolitan Gateway & Skylands)',
      tier: 1,
      description: 'Densely populated economic powerhouse across the Hudson River from Manhattan, major corporate HQs, and MetLife Stadium complex.',
      counties: ['Bergen', 'Hudson', 'Essex', 'Passaic', 'Union', 'Morris', 'Sussex', 'Warren']
    },
    {
      id: 'NJ-central-jersey',
      name: 'Central Jersey',
      fullName: 'Central Jersey (Raritan Valley, Princeton & Research Corridor)',
      tier: 1,
      description: 'The pharmaceutical and research cradle ("Medicine Chest of the World"), Princeton University, Rutgers New Brunswick, and bio-pharma campuses.',
      counties: ['Middlesex', 'Somerset', 'Mercer', 'Hunterdon']
    },
    {
      id: 'NJ-jersey-shore',
      name: 'The Jersey Shore',
      fullName: 'The Jersey Shore (Monmouth & Ocean Coastal Playground)',
      tier: 1,
      description: '141 miles of Atlantic Ocean coastline, historic boardwalks (Asbury Park, Point Pleasant, Seaside Heights), and Sandy Hook.',
      counties: ['Monmouth', 'Ocean']
    },
    {
      id: 'NJ-south-jersey',
      name: 'South Jersey',
      fullName: 'South Jersey & Delaware Valley (Camden, Atlantic City & Pine Barrens)',
      tier: 1,
      description: 'Philadelphia suburban riverfront corridor, Atlantic City casino boardwalk, Cape May Victorian historic resort, and the Pinelands National Reserve.',
      counties: ['Camden', 'Burlington', 'Gloucester', 'Atlantic', 'Cape May', 'Cumberland', 'Salem']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'NJ-gold-coast-hudson',
      name: 'Gold Coast & Gateway',
      fullName: 'Gold Coast & Gateway (Jersey City, Hoboken & Newark)',
      tier: 2,
      parentRegion: 'North Jersey',
      description: '"Wall Street West" financial towers on the Hudson River waterfront, PATH train transit hub, and Newark Liberty International Airport.',
      counties: ['Hudson', 'Essex']
    },
    {
      id: 'NJ-bergen-passaic',
      name: 'Bergen & Passaic',
      fullName: 'Bergen & Passaic Counties (Paramus, Hackensack & Paterson Falls)',
      tier: 2,
      parentRegion: 'North Jersey',
      description: 'George Washington Bridge gateway, affluent suburban parkway towns, retail capital Paramus, and Great Falls historic national park.',
      counties: ['Bergen', 'Passaic']
    },
    {
      id: 'NJ-princeton-mercer',
      name: 'Princeton & Mercer Corridor',
      fullName: 'Princeton & Greater Mercer County (State Capital & Ivy League)',
      tier: 2,
      parentRegion: 'Central Jersey',
      description: 'Princeton University, Route 1 Innovation Corridor, Institute for Advanced Study, and Trenton state government capitol.',
      counties: ['Mercer', 'Somerset']
    },
    {
      id: 'NJ-atlantic-city-shore',
      name: 'Atlantic City & Cape May',
      fullName: 'Atlantic City & Cape May Coastal Peninsula',
      tier: 2,
      parentRegion: 'South Jersey',
      description: 'World-famous Atlantic City casino resorts, historic Victorian Cape May architecture, Cape May Point lighthouse, and commercial fisheries.',
      counties: ['Atlantic', 'Cape May']
    }
  ],

  // =========================================================================
  // MASSACHUSETTS (MA)
  // =========================================================================
  'MA': [
    // Tier 1: Macro-Regions
    {
      id: 'MA-greater-boston',
      name: 'Greater Boston',
      fullName: 'Greater Boston & Route 128 Tech Corridor',
      tier: 1,
      description: 'World capital of higher education (Harvard, MIT), premier biotech/life sciences innovation cluster, Kendall Square, and venture capital.',
      counties: ['Suffolk', 'Middlesex', 'Norfolk', 'Essex']
    },
    {
      id: 'MA-south-coast-cape',
      name: 'South Shore, Cape & Islands',
      fullName: 'South Shore, Cape Cod & The Islands',
      tier: 1,
      description: 'Historic Plymouth Rock, scenic Cape Cod National Seashore, Martha\'s Vineyard and Nantucket elite island resorts, and New Bedford port.',
      counties: ['Plymouth', 'Barnstable', 'Bristol', 'Dukes', 'Nantucket']
    },
    {
      id: 'MA-central-mass',
      name: 'Central Massachusetts',
      fullName: 'Central Massachusetts & Greater Worcester',
      tier: 1,
      description: 'New England\'s second largest city, UMass Chan Medical School, robotics, advanced manufacturing, and Wachusett Mountain.',
      counties: ['Worcester']
    },
    {
      id: 'MA-western-mass-berkshires',
      name: 'Western Massachusetts',
      fullName: 'Western Massachusetts, Pioneer Valley & The Berkshires',
      tier: 1,
      description: 'Five College Consortium (UMass Amherst, Smith, Amherst), Basketball Hall of Fame in Springfield, Tanglewood music festival, and Berkshire mountains.',
      counties: ['Hampden', 'Hampshire', 'Franklin', 'Berkshire']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'MA-boston-cambridge-core',
      name: 'Boston & Cambridge Core',
      fullName: 'Boston & Cambridge Core (Suffolk County & Innovation District)',
      tier: 2,
      parentRegion: 'Greater Boston',
      description: 'Downtown Boston, Back Bay, Seaport Innovation District, Harvard & MIT campuses along the Charles River, and Fenway Park.',
      counties: ['Suffolk']
    },
    {
      id: 'MA-route-128-tech',
      name: 'Route 128 / MetroWest',
      fullName: 'Route 128 Tech Belt & MetroWest (Waltham, Newton & Framingham)',
      tier: 2,
      parentRegion: 'Greater Boston',
      description: '"America\'s Technology Highway", premier corporate R&D campuses, Waltham robotics hub, and affluent residential suburbs.',
      counties: ['Middlesex', 'Norfolk']
    },
    {
      id: 'MA-cape-cod-islands',
      name: 'Cape Cod & The Islands',
      fullName: 'Cape Cod, Martha\'s Vineyard & Nantucket',
      tier: 2,
      parentRegion: 'South Shore, Cape & Islands',
      description: 'Iconic lighthouses, Cape Cod Canal, Provincetown arts colony, whaling heritage in Nantucket, and Edgartown harbor estates.',
      counties: ['Barnstable', 'Dukes', 'Nantucket']
    }
  ],

  // =========================================================================
  // MARYLAND (MD)
  // =========================================================================
  'MD': [
    // Tier 1: Macro-Regions
    {
      id: 'MD-capital-region',
      name: 'Maryland DC Suburbs',
      fullName: 'Maryland National Capital Region (Montgomery & Prince George\'s)',
      tier: 1,
      description: 'NIH & FDA federal health research campuses, Bethesda biomedical corridor, University of Maryland College Park, and affluent DC suburbs.',
      counties: ['Montgomery', 'Prince George\'s', 'Frederick']
    },
    {
      id: 'MD-baltimore-metro',
      name: 'Greater Baltimore',
      fullName: 'Greater Baltimore & Central Maryland',
      tier: 1,
      description: 'Johns Hopkins Hospital and University, Inner Harbor, Port of Baltimore, Fort McHenry (Star-Spangled Banner birthplace), and NSA / Fort Meade cybersecurity.',
      counties: ['Baltimore', 'Anne Arundel', 'Howard', 'Harford', 'Carroll']
    },
    {
      id: 'MD-eastern-shore',
      name: 'The Eastern Shore',
      fullName: 'Maryland Eastern Shore & Atlantic Coast (Ocean City & Chesapeake)',
      tier: 1,
      description: 'Chesapeake Bay maritime tradition, world-famous Maryland blue crabs, historic St. Michaels sailing, and 10 miles of white sand Ocean City beaches.',
      counties: ['Queen Anne\'s', 'Talbot', 'Dorchester', 'Wicomico', 'Worcester', 'Somerset', 'Caroline', 'Kent', 'Cecil']
    },
    {
      id: 'MD-western-southern',
      name: 'Western & Southern Maryland',
      fullName: 'Western Maryland & Southern Tidewater (Appalachians to Potomac)',
      tier: 1,
      description: 'Deep Creek Lake mountain recreation in Garrett County, historic Cumberland C&O Canal, and Naval Air Station Patuxent River defense testing.',
      counties: ['Garrett', 'Allegany', 'Washington', 'Charles', 'Calvert', 'St. Mary\'s']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'MD-montgomery-biotech',
      name: 'Montgomery County / I-270',
      fullName: 'Montgomery County & I-270 Tech Corridor (Bethesda, Rockville & Gaithersburg)',
      tier: 2,
      parentRegion: 'Maryland DC Suburbs',
      description: '"DNA Valley" biotechnology cluster, National Institutes of Health, Walter Reed Military Medical, and luxury shopping in Chevy Chase.',
      counties: ['Montgomery']
    },
    {
      id: 'MD-annapolis-chesapeake',
      name: 'Annapolis & Anne Arundel',
      fullName: 'Annapolis, Anne Arundel & Chesapeake Bay (US Naval Academy)',
      tier: 2,
      parentRegion: 'Greater Baltimore',
      description: 'Maryland state capital, US Naval Academy on Severn River, sailing capital of America, and BWI Thurgood Marshall Airport.',
      counties: ['Anne Arundel']
    }
  ],

  // =========================================================================
  // VIRGINIA (VA)
  // =========================================================================
  'VA': [
    // Tier 1: Macro-Regions
    {
      id: 'VA-northern-virginia',
      name: 'Northern Virginia (NoVA)',
      fullName: 'Northern Virginia (DC Suburbs & Data Center Alley)',
      tier: 1,
      description: 'The world\'s largest concentration of data centers (Loudoun County handles 70% of global internet traffic), Pentagon, CIA, and Amazon HQ2.',
      counties: ['Fairfax', 'Arlington', 'Loudoun', 'Prince William', 'Alexandria', 'Falls Church', 'Manassas', 'Manassas Park', 'Fauquier', 'Stafford']
    },
    {
      id: 'VA-central-richmond-capital',
      name: 'Central Virginia',
      fullName: 'Central Virginia & Capital Region (Greater Richmond & Tri-Cities)',
      tier: 1,
      description: 'Virginia state capital, Federal Reserve Bank of Richmond, Fortune 500 financial and tobacco headquarters, James River rapids, and VCU.',
      counties: ['Richmond', 'Henrico', 'Chesterfield', 'Hanover', 'Petersburg', 'Hopewell', 'Colonial Heights', 'Powhatan', 'Goochland', 'Dinwiddie']
    },
    {
      id: 'VA-hampton-roads-coastal',
      name: 'Hampton Roads',
      fullName: 'Hampton Roads & Coastal Virginia (Virginia Beach, Norfolk & Newport News)',
      tier: 1,
      description: 'World\'s largest naval base (Naval Station Norfolk), Newport News Shipbuilding (nuclear aircraft carriers), Atlantic Ocean oceanfront in Virginia Beach, and Colonial Williamsburg.',
      counties: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Newport News', 'Hampton', 'Portsmouth', 'Suffolk', 'James City', 'York', 'Williamsburg', 'Poquoson']
    },
    {
      id: 'VA-shenandoah-charlottesville',
      name: 'Shenandoah & Piedmont',
      fullName: 'Shenandoah Valley & Charlottesville (Blue Ridge & Wine Country)',
      tier: 1,
      description: 'Thomas Jefferson\'s Monticello, University of Virginia in Charlottesville, Shenandoah National Park, Skyline Drive, and Harrisonburg poultry/ag corridor.',
      counties: ['Albemarle', 'Charlottesville', 'Rockingham', 'Harrisonburg', 'Augusta', 'Staunton', 'Waynesboro', 'Frederick', 'Winchester', 'Shenandoah', 'Page', 'Warren', 'Clarke']
    },
    {
      id: 'VA-southwest-blue-ridge',
      name: 'Southwest Virginia',
      fullName: 'Southwest Virginia & Blue Ridge Highlands (Roanoke & New River Valley)',
      tier: 1,
      description: 'Roanoke "Star City of the South", Virginia Tech in Blacksburg, Mount Rogers (highest peak in VA), and Crooked Road heritage music trail.',
      counties: ['Roanoke', 'Salem', 'Montgomery', 'Radford', 'Botetourt', 'Franklin', 'Pulaski', 'Wythe', 'Smyth', 'Washington', 'Bristol']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'VA-fairfax-loudoun-tech',
      name: 'Fairfax & Loudoun Tech Belt',
      fullName: 'Fairfax & Loudoun County (Tysons, Reston & Dulles Tech)',
      tier: 2,
      parentRegion: 'Northern Virginia (NoVA)',
      description: 'Tysons Corner commercial downtown, Reston Town Center, Washington Dulles International Airport, and defense technology defense contractors (General Dynamics, Northrop Grumman).',
      counties: ['Fairfax', 'Loudoun', 'Falls Church']
    },
    {
      id: 'VA-virginia-beach-norfolk',
      name: 'Virginia Beach & Norfolk',
      fullName: 'Virginia Beach & Norfolk Oceanfront & Naval Hub',
      tier: 2,
      parentRegion: 'Hampton Roads',
      description: 'Longest pleasure beach in the world (Guinness World Records), Atlantic oceanfront resort strip, Waterside District, and NATO Allied Command Transformation.',
      counties: ['Virginia Beach', 'Norfolk']
    }
  ],

  // =========================================================================
  // CONNECTICUT (CT)
  // =========================================================================
  'CT': [
    // Tier 1: Macro-Regions
    {
      id: 'CT-fairfield-gold-coast',
      name: 'Fairfield County',
      fullName: 'Fairfield County & The Gold Coast (Stamford, Greenwich & Bridgeport)',
      tier: 1,
      description: 'Premier hedge fund and financial management hub, affluent Long Island Sound coastline, Metro-North express rail to Grand Central, and Greenwich estates.',
      counties: ['Fairfield']
    },
    {
      id: 'CT-greater-hartford',
      name: 'Greater Hartford',
      fullName: 'Greater Hartford & Capital Region (Insurance Capital of the World)',
      tier: 1,
      description: 'Historic Connecticut state capitol, global insurance headquarters (Travelers, Aetna, The Hartford), Pratt & Whitney aerospace, and Mark Twain House.',
      counties: ['Hartford', 'Tolland']
    },
    {
      id: 'CT-greater-new-haven',
      name: 'Greater New Haven',
      fullName: 'Greater New Haven & Long Island Sound (Yale University & Coastal)',
      tier: 1,
      description: 'Yale University, world-renowned New Haven-style apizza (Frank Pepe, Sally\'s), bioscience cluster, and Long Island Sound harbors.',
      counties: ['New Haven', 'Middlesex']
    },
    {
      id: 'CT-eastern-mystic-casinos',
      name: 'Eastern Connecticut',
      fullName: 'Eastern Connecticut & Thames Valley (Mystic Seaport & Naval Submarine Base)',
      tier: 1,
      description: 'Naval Submarine Base New London ("Home of the Submarine Force"), General Dynamics Electric Boat nuclear submarine shipyard, Mystic Aquarium, and Foxwoods / Mohegan Sun.',
      counties: ['New London', 'Windham']
    },
    {
      id: 'CT-litchfield-hills',
      name: 'Litchfield Hills',
      fullName: 'Litchfield Hills & Northwest Highlands',
      tier: 1,
      description: 'Scenic rolling hills, historic village greens, antique trails, covered bridges, Appalachian Trail, and picturesque country estates.',
      counties: ['Litchfield']
    }
  ],

  // =========================================================================
  // WEST VIRGINIA (WV)
  // =========================================================================
  'WV': [
    // Tier 1: Macro-Regions
    {
      id: 'WV-eastern-panhandle-dc',
      name: 'Eastern Panhandle',
      fullName: 'Eastern Panhandle & DC Commuter Belt (Martinsburg & Harpers Ferry)',
      tier: 1,
      description: 'Harpers Ferry National Historical Park (Shenandoah and Potomac rivers confluence), fastest-growing region in WV, commuter rail to Washington DC, and Procter & Gamble manufacturing.',
      counties: ['Berkeley', 'Jefferson', 'Morgan']
    },
    {
      id: 'WV-metro-valley-charleston',
      name: 'Metro Valley & Capital',
      fullName: 'Metro Valley & Capital Region (Charleston & Huntington)',
      tier: 1,
      description: 'West Virginia state capitol dome (Cass Gilbert design), chemical and energy manufacturing along Kanawha River, Marshall University in Huntington, and healthcare hub.',
      counties: ['Kanawha', 'Putnam', 'Cabell', 'Wayne', 'Lincoln']
    },
    {
      id: 'WV-north-central-morgantown',
      name: 'North Central West Virginia',
      fullName: 'North Central West Virginia & High Tech (Morgantown, Clarksburg & Fairmont)',
      tier: 1,
      description: 'West Virginia University (WVU Mountaineers), Personal Rapid Transit (PRT), FBI Criminal Justice Information Services (CJIS) national complex, and aerospace technology park.',
      counties: ['Monongalia', 'Marion', 'Harrison', 'Preston', 'Taylor']
    },
    {
      id: 'WV-northern-panhandle-wheeling',
      name: 'Northern Panhandle',
      fullName: 'Northern Panhandle & Ohio River (Wheeling & Weirton Steel)',
      tier: 1,
      description: 'Historic Wheeling Suspension Bridge (National Historic Landmark over Ohio River), Oglebay resort park, steel heritage, and natural gas shale drilling.',
      counties: ['Ohio', 'Marshall', 'Brooke', 'Hancock']
    },
    {
      id: 'WV-potomac-highlands-new-river',
      name: 'Southern Highlands & New River Gorge',
      fullName: 'New River Gorge & Potomac Highlands (National Park & Wild Rivers)',
      tier: 1,
      description: 'New River Gorge National Park and Preserve (America\'s newest national park, 876-foot arch bridge, world-class whitewater rafting), and Snowshoe Mountain ski resort.',
      counties: ['Raleigh', 'Fayette', 'Mercer', 'Greenbrier', 'Summers', 'Nicholas', 'Pocahontas', 'Randolph', 'Tucker']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'WV-charleston-kanawha-core',
      name: 'Charleston & Kanawha Core',
      fullName: 'Charleston Urban Core & Kanawha County (Capital City)',
      tier: 2,
      parentRegion: 'Metro Valley & Capital',
      description: 'West Virginia State Capitol complex, Clay Center for the Arts and Sciences, Haddad Riverfront Park, and Downtown Charleston banking district.',
      counties: ['Kanawha']
    },
    {
      id: 'WV-morgantown-monongalia-core',
      name: 'Morgantown & Monongalia Core',
      fullName: 'City of Morgantown & Monongalia County (WVU Flagship)',
      tier: 2,
      parentRegion: 'North Central West Virginia',
      description: 'WVU Medicine Ruby Memorial Hospital, High Street college dining, Milan Puskar Stadium, and Cheat Lake residential estates.',
      counties: ['Monongalia']
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHUNK_1_REGIONS };
}
