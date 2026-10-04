/**
 * Master Catalog of US Metropolitan Boroughs, Neighborhoods, and Sub-Markets
 * Structured specifically for Meta / Facebook Ads & Google Ads targeting.
 * Every entity maps to exact USPS 5-digit delivery ZIP codes.
 */

const METRO_NEIGHBORHOODS = [
  // =========================================================================
  // NEW YORK (NY) - NYC 5 Boroughs & Iconic Neighborhoods
  // =========================================================================
  // NYC 5 Boroughs
  {
    name: 'Manhattan',
    parentCity: 'New York',
    county: 'New York',
    state: 'NY',
    type: 'borough',
    tier: 2,
    lat: 40.7831,
    lon: -73.9712,
    metroName: 'New York City Metro',
    zips: [
      '10001', '10002', '10003', '10004', '10005', '10006', '10007', '10009', '10010',
      '10011', '10012', '10013', '10014', '10016', '10017', '10018', '10019', '10020',
      '10021', '10022', '10023', '10024', '10025', '10026', '10027', '10028', '10029',
      '10030', '10031', '10032', '10033', '10034', '10035', '10036', '10037', '10038',
      '10039', '10040', '10044', '10065', '10075', '10128', '10280', '10282'
    ]
  },
  {
    name: 'Brooklyn',
    parentCity: 'New York',
    county: 'Kings',
    state: 'NY',
    type: 'borough',
    tier: 2,
    lat: 40.6782,
    lon: -73.9442,
    metroName: 'New York City Metro',
    zips: [
      '11201', '11203', '11204', '11205', '11206', '11207', '11208', '11209', '11210',
      '11211', '11212', '11213', '11214', '11215', '11216', '11217', '11218', '11219',
      '11220', '11221', '11222', '11223', '11224', '11225', '11226', '11228', '11229',
      '11230', '11231', '11232', '11233', '11234', '11235', '11236', '11237', '11238', '11239'
    ]
  },
  {
    name: 'Queens',
    parentCity: 'New York',
    county: 'Queens',
    state: 'NY',
    type: 'borough',
    tier: 2,
    lat: 40.7282,
    lon: -73.7949,
    metroName: 'New York City Metro',
    zips: [
      '11101', '11102', '11103', '11104', '11105', '11106', '11354', '11355', '11356',
      '11357', '11358', '11360', '11361', '11364', '11365', '11367', '11368', '11372',
      '11373', '11374', '11375', '11377', '11378', '11379', '11385', '11411', '11412',
      '11413', '11414', '11415', '11416', '11417', '11418', '11419', '11420', '11421',
      '11422', '11423', '11426', '11427', '11428', '11429', '11432', '11433', '11434',
      '11435', '11436', '11691', '11692', '11693', '11694'
    ]
  },
  {
    name: 'The Bronx',
    parentCity: 'New York',
    county: 'Bronx',
    state: 'NY',
    type: 'borough',
    tier: 2,
    lat: 40.8448,
    lon: -73.8648,
    metroName: 'New York City Metro',
    zips: [
      '10451', '10452', '10453', '10454', '10455', '10456', '10457', '10458', '10459',
      '10460', '10461', '10462', '10463', '10464', '10465', '10466', '10467', '10468',
      '10469', '10470', '10471', '10472', '10473', '10474', '10475'
    ]
  },
  {
    name: 'Staten Island',
    parentCity: 'New York',
    county: 'Richmond',
    state: 'NY',
    type: 'borough',
    tier: 2,
    lat: 40.5795,
    lon: -74.1502,
    metroName: 'New York City Metro',
    zips: [
      '10301', '10302', '10303', '10304', '10305', '10306', '10307', '10308', '10309',
      '10310', '10312', '10314'
    ]
  },
  // Manhattan Neighborhoods
  {
    name: 'Midtown Manhattan',
    parentCity: 'New York',
    county: 'New York',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7549,
    lon: -73.9840,
    metroName: 'New York City Metro',
    zips: ['10016', '10017', '10018', '10019', '10020', '10022', '10036']
  },
  {
    name: 'Financial District & Tribeca',
    parentCity: 'New York',
    county: 'New York',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7075,
    lon: -74.0090,
    metroName: 'New York City Metro',
    zips: ['10004', '10005', '10006', '10007', '10013', '10038', '10280', '10282']
  },
  {
    name: 'Greenwich Village & SoHo',
    parentCity: 'New York',
    county: 'New York',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7308,
    lon: -73.9973,
    metroName: 'New York City Metro',
    zips: ['10012', '10013', '10014']
  },
  {
    name: 'Chelsea & Flatiron',
    parentCity: 'New York',
    county: 'New York',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7465,
    lon: -74.0014,
    metroName: 'New York City Metro',
    zips: ['10001', '10010', '10011']
  },
  {
    name: 'Upper East Side',
    parentCity: 'New York',
    county: 'New York',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7736,
    lon: -73.9566,
    metroName: 'New York City Metro',
    zips: ['10021', '10028', '10065', '10075', '10128']
  },
  {
    name: 'Upper West Side',
    parentCity: 'New York',
    county: 'New York',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7870,
    lon: -73.9754,
    metroName: 'New York City Metro',
    zips: ['10023', '10024', '10025']
  },
  {
    name: 'Harlem',
    parentCity: 'New York',
    county: 'New York',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.8116,
    lon: -73.9465,
    metroName: 'New York City Metro',
    zips: ['10026', '10027', '10030', '10035', '10037', '10039']
  },
  // Brooklyn Neighborhoods
  {
    name: 'Williamsburg & Greenpoint',
    parentCity: 'New York',
    county: 'Kings',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7144,
    lon: -73.9553,
    metroName: 'New York City Metro',
    zips: ['11211', '11222', '11206', '11249']
  },
  {
    name: 'DUMBO & Brooklyn Heights',
    parentCity: 'New York',
    county: 'Kings',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7033,
    lon: -73.9890,
    metroName: 'New York City Metro',
    zips: ['11201', '11251']
  },
  {
    name: 'Park Slope & Prospect Heights',
    parentCity: 'New York',
    county: 'Kings',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.6710,
    lon: -73.9780,
    metroName: 'New York City Metro',
    zips: ['11215', '11217', '11238']
  },
  // Queens Neighborhoods
  {
    name: 'Astoria & Long Island City',
    parentCity: 'New York',
    county: 'Queens',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7644,
    lon: -73.9235,
    metroName: 'New York City Metro',
    zips: ['11101', '11102', '11103', '11104', '11105', '11106']
  },
  {
    name: 'Flushing & Bayside',
    parentCity: 'New York',
    county: 'Queens',
    state: 'NY',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7675,
    lon: -73.8331,
    metroName: 'New York City Metro',
    zips: ['11354', '11355', '11358', '11360', '11361']
  },

  // =========================================================================
  // ILLINOIS (IL) - Chicago Community Areas & Sub-Markets
  // =========================================================================
  {
    name: 'The Loop',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.8837,
    lon: -87.6324,
    metroName: 'Chicago Metro',
    zips: ['60601', '60602', '60603', '60604', '60605']
  },
  {
    name: 'River North & Streeterville',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.8924,
    lon: -87.6341,
    metroName: 'Chicago Metro',
    zips: ['60611', '60654']
  },
  {
    name: 'West Loop & Fulton Market',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.8839,
    lon: -87.6534,
    metroName: 'Chicago Metro',
    zips: ['60607', '60661']
  },
  {
    name: 'Lincoln Park',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.9214,
    lon: -87.6513,
    metroName: 'Chicago Metro',
    zips: ['60614']
  },
  {
    name: 'Lakeview & Wrigleyville',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.9436,
    lon: -87.6584,
    metroName: 'Chicago Metro',
    zips: ['60657', '60613']
  },
  {
    name: 'Wicker Park & Bucktown',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.9088,
    lon: -87.6774,
    metroName: 'Chicago Metro',
    zips: ['60622', '60647']
  },
  {
    name: 'Logan Square',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.9298,
    lon: -87.7081,
    metroName: 'Chicago Metro',
    zips: ['60647']
  },
  {
    name: 'Hyde Park & Kenwood',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.7943,
    lon: -87.5907,
    metroName: 'Chicago Metro',
    zips: ['60615', '60637']
  },
  {
    name: 'Pilsen & Bridgeport',
    parentCity: 'Chicago',
    county: 'Cook',
    state: 'IL',
    type: 'neighborhood',
    tier: 2,
    lat: 41.8563,
    lon: -87.6563,
    metroName: 'Chicago Metro',
    zips: ['60608', '60616']
  },

  // =========================================================================
  // CALIFORNIA (CA) - Silicon Valley, Bay Area, LA, San Diego, OC
  // =========================================================================
  // Silicon Valley & South Bay
  {
    name: 'East San Jose',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.3262,
    lon: -121.8202,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95116', '95122', '95127', '95148', '95121', '95133']
  },
  {
    name: 'Downtown San Jose',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.3337,
    lon: -121.8907,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95110', '95112', '95113']
  },
  {
    name: 'Willow Glen',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.3055,
    lon: -121.8988,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95125']
  },
  {
    name: 'Alviso',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.4262,
    lon: -121.9761,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95002']
  },
  {
    name: 'West San Jose',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.3089,
    lon: -121.9794,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95117', '95129', '95130']
  },
  {
    name: 'Almaden Valley',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.2144,
    lon: -121.8597,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95120']
  },
  {
    name: 'Evergreen',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.3175,
    lon: -121.7828,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95121', '95148']
  },
  {
    name: 'Rose Garden',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.3290,
    lon: -121.9160,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95126']
  },
  {
    name: 'Cambrian Park',
    parentCity: 'San Jose',
    county: 'Santa Clara',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.2625,
    lon: -121.9292,
    metroName: 'San Jose - Silicon Valley',
    zips: ['95118', '95124']
  },
  // San Francisco
  {
    name: 'Mission District',
    parentCity: 'San Francisco',
    county: 'San Francisco',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.7599,
    lon: -122.4148,
    metroName: 'San Francisco Bay Area',
    zips: ['94110']
  },
  {
    name: 'SoMa (South of Market)',
    parentCity: 'San Francisco',
    county: 'San Francisco',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.7785,
    lon: -122.4056,
    metroName: 'San Francisco Bay Area',
    zips: ['94103', '94107']
  },
  {
    name: 'Marina & Pacific Heights',
    parentCity: 'San Francisco',
    county: 'San Francisco',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.7990,
    lon: -122.4360,
    metroName: 'San Francisco Bay Area',
    zips: ['94115', '94123']
  },
  {
    name: 'Financial District SF',
    parentCity: 'San Francisco',
    county: 'San Francisco',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 37.7946,
    lon: -122.4005,
    metroName: 'San Francisco Bay Area',
    zips: ['94104', '94105', '94111']
  },
  // Los Angeles
  {
    name: 'Downtown Los Angeles',
    parentCity: 'Los Angeles',
    county: 'Los Angeles',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 34.0407,
    lon: -118.2468,
    metroName: 'Greater Los Angeles',
    zips: ['90012', '90013', '90014', '90015', '90017', '90021', '90071']
  },
  {
    name: 'Hollywood',
    parentCity: 'Los Angeles',
    county: 'Los Angeles',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 34.0928,
    lon: -118.3287,
    metroName: 'Greater Los Angeles',
    zips: ['90028', '90038', '90068']
  },
  {
    name: 'Venice & Mar Vista',
    parentCity: 'Los Angeles',
    county: 'Los Angeles',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 33.9850,
    lon: -118.4695,
    metroName: 'Greater Los Angeles',
    zips: ['90291', '90066']
  },
  {
    name: 'Westwood & Century City',
    parentCity: 'Los Angeles',
    county: 'Los Angeles',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 34.0635,
    lon: -118.4455,
    metroName: 'Greater Los Angeles',
    zips: ['90024', '90025', '90067']
  },
  {
    name: 'Silver Lake & Echo Park',
    parentCity: 'Los Angeles',
    county: 'Los Angeles',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 34.0869,
    lon: -118.2702,
    metroName: 'Greater Los Angeles',
    zips: ['90026', '90039']
  },
  {
    name: 'Koreatown LA',
    parentCity: 'Los Angeles',
    county: 'Los Angeles',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 34.0579,
    lon: -118.3005,
    metroName: 'Greater Los Angeles',
    zips: ['90005', '90010', '90020']
  },
  {
    name: 'Sherman Oaks & Studio City',
    parentCity: 'Los Angeles',
    county: 'Los Angeles',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 34.1489,
    lon: -118.4514,
    metroName: 'Greater Los Angeles',
    zips: ['91403', '91423', '91604']
  },
  // San Diego
  {
    name: 'Downtown San Diego & Gaslamp',
    parentCity: 'San Diego',
    county: 'San Diego',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 32.7157,
    lon: -117.1611,
    metroName: 'San Diego Metro',
    zips: ['92101']
  },
  {
    name: 'La Jolla',
    parentCity: 'San Diego',
    county: 'San Diego',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 32.8328,
    lon: -117.2713,
    metroName: 'San Diego Metro',
    zips: ['92037']
  },
  {
    name: 'Pacific Beach & Mission Beach',
    parentCity: 'San Diego',
    county: 'San Diego',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 32.8025,
    lon: -117.2356,
    metroName: 'San Diego Metro',
    zips: ['92109']
  },
  {
    name: 'North Park & Hillcrest',
    parentCity: 'San Diego',
    county: 'San Diego',
    state: 'CA',
    type: 'neighborhood',
    tier: 2,
    lat: 32.7480,
    lon: -117.1296,
    metroName: 'San Diego Metro',
    zips: ['92103', '92104']
  },

  // =========================================================================
  // TEXAS (TX) - Houston, Dallas, Austin, San Antonio
  // =========================================================================
  // Austin
  {
    name: 'Downtown Austin',
    parentCity: 'Austin',
    county: 'Travis',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 30.2672,
    lon: -97.7431,
    metroName: 'Austin Metro',
    zips: ['78701']
  },
  {
    name: 'South Congress (SoCo)',
    parentCity: 'Austin',
    county: 'Travis',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 30.2450,
    lon: -97.7500,
    metroName: 'Austin Metro',
    zips: ['78704']
  },
  {
    name: 'East Austin',
    parentCity: 'Austin',
    county: 'Travis',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 30.2625,
    lon: -97.7125,
    metroName: 'Austin Metro',
    zips: ['78702']
  },
  {
    name: 'Domain & North Burnet',
    parentCity: 'Austin',
    county: 'Travis',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 30.4018,
    lon: -97.7253,
    metroName: 'Austin Metro',
    zips: ['78758', '78759']
  },
  {
    name: 'Mueller',
    parentCity: 'Austin',
    county: 'Travis',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 30.3012,
    lon: -97.7050,
    metroName: 'Austin Metro',
    zips: ['78723']
  },
  {
    name: 'Clarksville & Tarrytown',
    parentCity: 'Austin',
    county: 'Travis',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 30.2880,
    lon: -97.7660,
    metroName: 'Austin Metro',
    zips: ['78703']
  },
  // Houston
  {
    name: 'Downtown Houston',
    parentCity: 'Houston',
    county: 'Harris',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 29.7560,
    lon: -95.3660,
    metroName: 'Houston Metro',
    zips: ['77002', '77010']
  },
  {
    name: 'The Heights',
    parentCity: 'Houston',
    county: 'Harris',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 29.7990,
    lon: -95.3980,
    metroName: 'Houston Metro',
    zips: ['77007', '77008']
  },
  {
    name: 'Montrose & Midtown',
    parentCity: 'Houston',
    county: 'Harris',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 29.7440,
    lon: -95.3900,
    metroName: 'Houston Metro',
    zips: ['77004', '77006']
  },
  {
    name: 'Galleria & Uptown Houston',
    parentCity: 'Houston',
    county: 'Harris',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 29.7520,
    lon: -95.4610,
    metroName: 'Houston Metro',
    zips: ['77056', '77057']
  },
  {
    name: 'River Oaks',
    parentCity: 'Houston',
    county: 'Harris',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 29.7530,
    lon: -95.4210,
    metroName: 'Houston Metro',
    zips: ['77019', '77027']
  },
  // Dallas
  {
    name: 'Downtown Dallas',
    parentCity: 'Dallas',
    county: 'Dallas',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 32.7767,
    lon: -96.7970,
    metroName: 'Dallas-Fort Worth Metro',
    zips: ['75201', '75202']
  },
  {
    name: 'Uptown & Victory Park',
    parentCity: 'Dallas',
    county: 'Dallas',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 32.7980,
    lon: -96.8040,
    metroName: 'Dallas-Fort Worth Metro',
    zips: ['75204', '75219']
  },
  {
    name: 'Deep Ellum & Arts District',
    parentCity: 'Dallas',
    county: 'Dallas',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 32.7840,
    lon: -96.7840,
    metroName: 'Dallas-Fort Worth Metro',
    zips: ['75226']
  },
  {
    name: 'Bishop Arts District',
    parentCity: 'Dallas',
    county: 'Dallas',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 32.7480,
    lon: -96.8280,
    metroName: 'Dallas-Fort Worth Metro',
    zips: ['75208']
  },
  // San Antonio
  {
    name: 'Downtown San Antonio & River Walk',
    parentCity: 'San Antonio',
    county: 'Bexar',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 29.4241,
    lon: -98.4936,
    metroName: 'San Antonio Metro',
    zips: ['78205']
  },
  {
    name: 'Pearl District & Midtown',
    parentCity: 'San Antonio',
    county: 'Bexar',
    state: 'TX',
    type: 'neighborhood',
    tier: 2,
    lat: 29.4420,
    lon: -98.4800,
    metroName: 'San Antonio Metro',
    zips: ['78215']
  },

  // =========================================================================
  // FLORIDA (FL) - Miami, Fort Lauderdale, Palm Beach, Orlando, Tampa
  // =========================================================================
  {
    name: 'Brickell & Downtown Miami',
    parentCity: 'Miami',
    county: 'Miami-Dade',
    state: 'FL',
    type: 'neighborhood',
    tier: 2,
    lat: 25.7617,
    lon: -80.1918,
    metroName: 'Miami - South Florida',
    zips: ['33130', '33131', '33132']
  },
  {
    name: 'South Beach',
    parentCity: 'Miami Beach',
    county: 'Miami-Dade',
    state: 'FL',
    type: 'neighborhood',
    tier: 2,
    lat: 25.7826,
    lon: -80.1341,
    metroName: 'Miami - South Florida',
    zips: ['33139']
  },
  {
    name: 'Wynwood & Design District',
    parentCity: 'Miami',
    county: 'Miami-Dade',
    state: 'FL',
    type: 'neighborhood',
    tier: 2,
    lat: 25.8040,
    lon: -80.1989,
    metroName: 'Miami - South Florida',
    zips: ['33127', '33137']
  },
  {
    name: 'Coconut Grove & Coral Gables',
    parentCity: 'Miami',
    county: 'Miami-Dade',
    state: 'FL',
    type: 'neighborhood',
    tier: 2,
    lat: 25.7170,
    lon: -80.2560,
    metroName: 'Miami - South Florida',
    zips: ['33133', '33134', '33146']
  },
  {
    name: 'Downtown Tampa & Ybor City',
    parentCity: 'Tampa',
    county: 'Hillsborough',
    state: 'FL',
    type: 'neighborhood',
    tier: 2,
    lat: 27.9506,
    lon: -82.4572,
    metroName: 'Tampa Bay',
    zips: ['33602', '33605']
  },
  {
    name: 'Downtown Orlando & Thornton Park',
    parentCity: 'Orlando',
    county: 'Orange',
    state: 'FL',
    type: 'neighborhood',
    tier: 2,
    lat: 28.5383,
    lon: -81.3792,
    metroName: 'Orlando Metro',
    zips: ['32801']
  },

  // =========================================================================
  // WASHINGTON (WA) - Seattle & Eastside
  // =========================================================================
  {
    name: 'Downtown Seattle & Belltown',
    parentCity: 'Seattle',
    county: 'King',
    state: 'WA',
    type: 'neighborhood',
    tier: 2,
    lat: 47.6101,
    lon: -122.3421,
    metroName: 'Seattle Metro',
    zips: ['98101', '98104', '98121']
  },
  {
    name: 'Capitol Hill & First Hill',
    parentCity: 'Seattle',
    county: 'King',
    state: 'WA',
    type: 'neighborhood',
    tier: 2,
    lat: 47.6253,
    lon: -122.3222,
    metroName: 'Seattle Metro',
    zips: ['98102', '98122']
  },
  {
    name: 'South Lake Union (Amazon HQ)',
    parentCity: 'Seattle',
    county: 'King',
    state: 'WA',
    type: 'neighborhood',
    tier: 2,
    lat: 47.6225,
    lon: -122.3370,
    metroName: 'Seattle Metro',
    zips: ['98109']
  },
  {
    name: 'Ballard & Fremont',
    parentCity: 'Seattle',
    county: 'King',
    state: 'WA',
    type: 'neighborhood',
    tier: 2,
    lat: 47.6680,
    lon: -122.3840,
    metroName: 'Seattle Metro',
    zips: ['98103', '98107']
  },
  {
    name: 'Queen Anne',
    parentCity: 'Seattle',
    county: 'King',
    state: 'WA',
    type: 'neighborhood',
    tier: 2,
    lat: 47.6360,
    lon: -122.3570,
    metroName: 'Seattle Metro',
    zips: ['98109', '98119']
  },

  // =========================================================================
  // COLORADO (CO) - Denver Metro
  // =========================================================================
  {
    name: 'LoDo & RiNo Arts District',
    parentCity: 'Denver',
    county: 'Denver',
    state: 'CO',
    type: 'neighborhood',
    tier: 2,
    lat: 39.7562,
    lon: -104.9940,
    metroName: 'Denver Metro',
    zips: ['80202', '80205']
  },
  {
    name: 'Capitol Hill & Cherry Creek',
    parentCity: 'Denver',
    county: 'Denver',
    state: 'CO',
    type: 'neighborhood',
    tier: 2,
    lat: 39.7280,
    lon: -104.9650,
    metroName: 'Denver Metro',
    zips: ['80203', '80206', '80218']
  },
  {
    name: 'Highlands & LoHi',
    parentCity: 'Denver',
    county: 'Denver',
    state: 'CO',
    type: 'neighborhood',
    tier: 2,
    lat: 39.7610,
    lon: -105.0150,
    metroName: 'Denver Metro',
    zips: ['80211']
  },

  // =========================================================================
  // GEORGIA (GA) - Atlanta Metro
  // =========================================================================
  {
    name: 'Midtown Atlanta',
    parentCity: 'Atlanta',
    county: 'Fulton',
    state: 'GA',
    type: 'neighborhood',
    tier: 2,
    lat: 33.7840,
    lon: -84.3830,
    metroName: 'Atlanta Metro',
    zips: ['30308', '30309']
  },
  {
    name: 'Buckhead',
    parentCity: 'Atlanta',
    county: 'Fulton',
    state: 'GA',
    type: 'neighborhood',
    tier: 2,
    lat: 33.8400,
    lon: -84.3800,
    metroName: 'Atlanta Metro',
    zips: ['30305', '30326', '30327', '30342']
  },
  {
    name: 'Downtown Atlanta & Old Fourth Ward',
    parentCity: 'Atlanta',
    county: 'Fulton',
    state: 'GA',
    type: 'neighborhood',
    tier: 2,
    lat: 33.7550,
    lon: -84.3750,
    metroName: 'Atlanta Metro',
    zips: ['30303', '30312']
  },

  // =========================================================================
  // PENNSYLVANIA (PA) - Philadelphia & Pittsburgh
  // =========================================================================
  {
    name: 'Center City Philadelphia & Rittenhouse',
    parentCity: 'Philadelphia',
    county: 'Philadelphia',
    state: 'PA',
    type: 'neighborhood',
    tier: 2,
    lat: 39.9526,
    lon: -75.1652,
    metroName: 'Philadelphia Metro',
    zips: ['19102', '19103', '19106', '19107']
  },
  {
    name: 'Fishtown & Northern Liberties',
    parentCity: 'Philadelphia',
    county: 'Philadelphia',
    state: 'PA',
    type: 'neighborhood',
    tier: 2,
    lat: 39.9710,
    lon: -75.1310,
    metroName: 'Philadelphia Metro',
    zips: ['19123', '19125']
  },
  {
    name: 'University City Philadelphia',
    parentCity: 'Philadelphia',
    county: 'Philadelphia',
    state: 'PA',
    type: 'neighborhood',
    tier: 2,
    lat: 39.9530,
    lon: -75.1930,
    metroName: 'Philadelphia Metro',
    zips: ['19104']
  },
  {
    name: 'Downtown Pittsburgh & Strip District',
    parentCity: 'Pittsburgh',
    county: 'Allegheny',
    state: 'PA',
    type: 'neighborhood',
    tier: 2,
    lat: 40.4406,
    lon: -79.9959,
    metroName: 'Pittsburgh Metro',
    zips: ['15219', '15222']
  },

  // =========================================================================
  // MASSACHUSETTS (MA) - Boston & Cambridge
  // =========================================================================
  {
    name: 'Back Bay & Beacon Hill',
    parentCity: 'Boston',
    county: 'Suffolk',
    state: 'MA',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7308,
    lon: -73.9973,
    lat: 42.3520,
    lon: -71.0770,
    metroName: 'Greater Boston',
    zips: ['02108', '02116']
  },
  {
    name: 'Seaport District & South End',
    parentCity: 'Boston',
    county: 'Suffolk',
    state: 'MA',
    type: 'neighborhood',
    tier: 2,
    lat: 42.3480,
    lon: -71.0450,
    metroName: 'Greater Boston',
    zips: ['02110', '02118']
  },
  {
    name: 'Cambridge (Harvard & Kendall)',
    parentCity: 'Cambridge',
    county: 'Middlesex',
    state: 'MA',
    type: 'neighborhood',
    tier: 2,
    lat: 42.3736,
    lon: -71.1097,
    metroName: 'Greater Boston',
    zips: ['02138', '02139', '02142']
  },

  // =========================================================================
  // DISTRICT OF COLUMBIA (DC)
  // =========================================================================
  {
    name: 'Georgetown & Foggy Bottom',
    parentCity: 'Washington',
    county: 'District of Columbia',
    state: 'DC',
    type: 'neighborhood',
    tier: 2,
    lat: 38.9050,
    lon: -77.0620,
    metroName: 'Washington DC Metro',
    zips: ['20007', '20037']
  },
  {
    name: 'Dupont Circle & Adams Morgan',
    parentCity: 'Washington',
    county: 'District of Columbia',
    state: 'DC',
    type: 'neighborhood',
    tier: 2,
    lat: 38.9150,
    lon: -77.0420,
    metroName: 'Washington DC Metro',
    zips: ['20009', '20036']
  },
  {
    name: 'Capitol Hill DC & Navy Yard',
    parentCity: 'Washington',
    county: 'District of Columbia',
    state: 'DC',
    type: 'neighborhood',
    tier: 2,
    lat: 38.8870,
    lon: -76.9950,
    metroName: 'Washington DC Metro',
    zips: ['20002', '20003']
  },

  // =========================================================================
  // ARIZONA (AZ) - Phoenix & Scottsdale
  // =========================================================================
  {
    name: 'Downtown Phoenix & Midtown',
    parentCity: 'Phoenix',
    county: 'Maricopa',
    state: 'AZ',
    type: 'neighborhood',
    tier: 2,
    lat: 33.4500,
    lon: -112.0740,
    metroName: 'Phoenix Metro',
    zips: ['85003', '85004', '85012']
  },
  {
    name: 'Arcadia & Biltmore',
    parentCity: 'Phoenix',
    county: 'Maricopa',
    state: 'AZ',
    type: 'neighborhood',
    tier: 2,
    lat: 33.5080,
    lon: -111.9850,
    metroName: 'Phoenix Metro',
    zips: ['85016', '85018']
  },
  {
    name: 'Old Town Scottsdale & South Scottsdale',
    parentCity: 'Scottsdale',
    county: 'Maricopa',
    state: 'AZ',
    type: 'neighborhood',
    tier: 2,
    lat: 33.4942,
    lon: -111.9261,
    metroName: 'Phoenix Metro',
    zips: ['85251', '85257']
  },

  // =========================================================================
  // PUERTO RICO (PR) - San Juan Metro Sub-Markets
  // =========================================================================
  {
    name: 'Old San Juan (Viejo San Juan)',
    parentCity: 'San Juan',
    county: 'San Juan',
    state: 'PR',
    type: 'neighborhood',
    tier: 2,
    lat: 18.4655,
    lon: -66.1167,
    metroName: 'San Juan Metro',
    zips: ['00901']
  },
  {
    name: 'Condado & Miramar',
    parentCity: 'San Juan',
    county: 'San Juan',
    state: 'PR',
    type: 'neighborhood',
    tier: 2,
    lat: 18.4550,
    lon: -66.0740,
    metroName: 'San Juan Metro',
    zips: ['00907']
  },
  {
    name: 'Santurce Arts District',
    parentCity: 'San Juan',
    county: 'San Juan',
    state: 'PR',
    type: 'neighborhood',
    tier: 2,
    lat: 18.4480,
    lon: -66.0590,
    metroName: 'San Juan Metro',
    zips: ['00909']
  },
  {
    name: 'Hato Rey (Golden Mile)',
    parentCity: 'San Juan',
    county: 'San Juan',
    state: 'PR',
    type: 'neighborhood',
    tier: 2,
    lat: 18.4230,
    lon: -66.0560,
    metroName: 'San Juan Metro',
    zips: ['00917', '00918']
  },
  {
    name: 'Isla Verde',
    parentCity: 'Carolina',
    county: 'Carolina',
    state: 'PR',
    type: 'neighborhood',
    tier: 2,
    lat: 18.4410,
    lon: -66.0150,
    metroName: 'San Juan Metro',
    zips: ['00979']
  },

  // =========================================================================
  // NORTH CAROLINA (NC) - Charlotte & Triangle
  // =========================================================================
  {
    name: 'Uptown Charlotte & South End',
    parentCity: 'Charlotte',
    county: 'Mecklenburg',
    state: 'NC',
    type: 'neighborhood',
    tier: 2,
    lat: 35.2271,
    lon: -80.8431,
    metroName: 'Charlotte Metro',
    zips: ['28202', '28203']
  },
  {
    name: 'Downtown Raleigh & North Hills',
    parentCity: 'Raleigh',
    county: 'Wake',
    state: 'NC',
    type: 'neighborhood',
    tier: 2,
    lat: 35.7796,
    lon: -78.6382,
    metroName: 'Raleigh-Durham Triangle',
    zips: ['27601', '27609']
  },

  // =========================================================================
  // MICHIGAN (MI) - Detroit Metro
  // =========================================================================
  {
    name: 'Downtown Detroit & Midtown',
    parentCity: 'Detroit',
    county: 'Wayne',
    state: 'MI',
    type: 'neighborhood',
    tier: 2,
    lat: 42.3314,
    lon: -83.0458,
    metroName: 'Metro Detroit',
    zips: ['48226', '48201', '48202']
  },

  // =========================================================================
  // MINNESOTA (MN) - Twin Cities
  // =========================================================================
  {
    name: 'Downtown Minneapolis & North Loop',
    parentCity: 'Minneapolis',
    county: 'Hennepin',
    state: 'MN',
    type: 'neighborhood',
    tier: 2,
    lat: 44.9778,
    lon: -93.2650,
    metroName: 'Minneapolis-St. Paul',
    zips: ['55401', '55402']
  },

  // =========================================================================
  // TENNESSEE (TN) - Nashville & Memphis
  // =========================================================================
  {
    name: 'Downtown Nashville & The Gulch',
    parentCity: 'Nashville',
    county: 'Davidson',
    state: 'TN',
    type: 'neighborhood',
    tier: 2,
    lat: 36.1627,
    lon: -86.7816,
    metroName: 'Nashville Metro',
    zips: ['37201', '37203']
  },
  {
    name: 'East Nashville',
    parentCity: 'Nashville',
    county: 'Davidson',
    state: 'TN',
    type: 'neighborhood',
    tier: 2,
    lat: 36.1770,
    lon: -86.7450,
    metroName: 'Nashville Metro',
    zips: ['37206']
  },

  // =========================================================================
  // OREGON (OR) - Portland
  // =========================================================================
  {
    name: 'Pearl District & Downtown Portland',
    parentCity: 'Portland',
    county: 'Multnomah',
    state: 'OR',
    type: 'neighborhood',
    tier: 2,
    lat: 45.5231,
    lon: -122.6765,
    metroName: 'Portland Metro',
    zips: ['97201', '97204', '97205', '97209']
  },

  // =========================================================================
  // MISSOURI (MO) - St. Louis & Kansas City
  // =========================================================================
  {
    name: 'Downtown St. Louis & Central West End',
    parentCity: 'St. Louis',
    county: 'St. Louis City',
    state: 'MO',
    type: 'neighborhood',
    tier: 2,
    lat: 38.6270,
    lon: -90.1994,
    metroName: 'St. Louis Metro',
    zips: ['63101', '63108']
  },
  {
    name: 'Country Club Plaza & Downtown KC',
    parentCity: 'Kansas City',
    county: 'Jackson',
    state: 'MO',
    type: 'neighborhood',
    tier: 2,
    lat: 39.0997,
    lon: -94.5786,
    metroName: 'Kansas City Metro',
    zips: ['64105', '64111', '64112']
  },

  // =========================================================================
  // NEVADA (NV) - Las Vegas
  // =========================================================================
  {
    name: 'The Las Vegas Strip & Downtown',
    parentCity: 'Las Vegas',
    county: 'Clark',
    state: 'NV',
    type: 'neighborhood',
    tier: 2,
    lat: 36.1147,
    lon: -115.1728,
    metroName: 'Las Vegas Metro',
    zips: ['89101', '89109']
  },
  {
    name: 'Summerlin',
    parentCity: 'Las Vegas',
    county: 'Clark',
    state: 'NV',
    type: 'neighborhood',
    tier: 2,
    lat: 36.1850,
    lon: -115.2950,
    metroName: 'Las Vegas Metro',
    zips: ['89134', '89138', '89144']
  },

  // =========================================================================
  // OHIO (OH) - Columbus, Cleveland, Cincinnati
  // =========================================================================
  {
    name: 'Short North & Downtown Columbus',
    parentCity: 'Columbus',
    county: 'Franklin',
    state: 'OH',
    type: 'neighborhood',
    tier: 2,
    lat: 39.9612,
    lon: -82.9988,
    metroName: 'Columbus Metro',
    zips: ['43215']
  },
  {
    name: 'Downtown Cleveland & Ohio City',
    parentCity: 'Cleveland',
    county: 'Cuyahoga',
    state: 'OH',
    type: 'neighborhood',
    tier: 2,
    lat: 41.4993,
    lon: -81.6944,
    metroName: 'Cleveland Metro',
    zips: ['44113', '44114']
  },
  {
    name: 'Over-the-Rhine & Downtown Cincinnati',
    parentCity: 'Cincinnati',
    county: 'Hamilton',
    state: 'OH',
    type: 'neighborhood',
    tier: 2,
    lat: 39.1031,
    lon: -84.5120,
    metroName: 'Cincinnati Metro',
    zips: ['45202']
  },

  // =========================================================================
  // LOUISIANA (LA) - New Orleans
  // =========================================================================
  {
    name: 'French Quarter & Central Business District',
    parentCity: 'New Orleans',
    county: 'Orleans',
    state: 'LA',
    type: 'neighborhood',
    tier: 2,
    lat: 29.9584,
    lon: -90.0644,
    metroName: 'New Orleans Metro',
    zips: ['70112', '70116', '70130']
  },
  {
    name: 'Garden District & Uptown New Orleans',
    parentCity: 'New Orleans',
    county: 'Orleans',
    state: 'LA',
    type: 'neighborhood',
    tier: 2,
    lat: 29.9280,
    lon: -90.0840,
    metroName: 'New Orleans Metro',
    zips: ['70115', '70118']
  },

  // =========================================================================
  // HAWAII (HI) - Honolulu
  // =========================================================================
  {
    name: 'Waikiki & Ala Moana',
    parentCity: 'Honolulu',
    county: 'Honolulu',
    state: 'HI',
    type: 'neighborhood',
    tier: 2,
    lat: 21.2760,
    lon: -157.8280,
    metroName: 'Honolulu Metro',
    zips: ['96814', '96815']
  },
  {
    name: 'Downtown Honolulu & Kakaako',
    parentCity: 'Honolulu',
    county: 'Honolulu',
    state: 'HI',
    type: 'neighborhood',
    tier: 2,
    lat: 21.3069,
    lon: -157.8583,
    metroName: 'Honolulu Metro',
    zips: ['96813']
  },

  // =========================================================================
  // WISCONSIN (WI) - Milwaukee & Madison
  // =========================================================================
  {
    name: 'Historic Third Ward & Downtown Milwaukee',
    parentCity: 'Milwaukee',
    county: 'Milwaukee',
    state: 'WI',
    type: 'neighborhood',
    tier: 2,
    lat: 43.0389,
    lon: -87.9065,
    metroName: 'Milwaukee Metro',
    zips: ['53202']
  },

  // =========================================================================
  // INDIANA (IN) - Indianapolis
  // =========================================================================
  {
    name: 'Downtown Indianapolis & Mass Ave',
    parentCity: 'Indianapolis',
    county: 'Marion',
    state: 'IN',
    type: 'neighborhood',
    tier: 2,
    lat: 39.7684,
    lon: -86.1581,
    metroName: 'Indianapolis Metro',
    zips: ['46204']
  },

  // =========================================================================
  // MARYLAND & VIRGINIA (MD & VA) - DMV Metro
  // =========================================================================
  {
    name: 'Arlington (Clarendon & Rosslyn)',
    parentCity: 'Arlington',
    county: 'Arlington',
    state: 'VA',
    type: 'neighborhood',
    tier: 2,
    lat: 38.8799,
    lon: -77.1068,
    metroName: 'Washington DC Metro',
    zips: ['22201', '22209']
  },
  {
    name: 'Old Town Alexandria',
    parentCity: 'Alexandria',
    county: 'Alexandria City',
    state: 'VA',
    type: 'neighborhood',
    tier: 2,
    lat: 38.8048,
    lon: -77.0469,
    metroName: 'Washington DC Metro',
    zips: ['22314']
  },
  {
    name: 'Bethesda & Chevy Chase',
    parentCity: 'Bethesda',
    county: 'Montgomery',
    state: 'MD',
    type: 'neighborhood',
    tier: 2,
    lat: 38.9847,
    lon: -77.0947,
    metroName: 'Washington DC Metro',
    zips: ['20814', '20815']
  },
  {
    name: 'Inner Harbor & Fells Point',
    parentCity: 'Baltimore',
    county: 'Baltimore City',
    state: 'MD',
    type: 'neighborhood',
    tier: 2,
    lat: 39.2847,
    lon: -76.6000,
    metroName: 'Baltimore Metro',
    zips: ['21202', '21231']
  },

  // =========================================================================
  // UTAH (UT) - Salt Lake City
  // =========================================================================
  {
    name: 'Downtown Salt Lake City & Sugar House',
    parentCity: 'Salt Lake City',
    county: 'Salt Lake',
    state: 'UT',
    type: 'neighborhood',
    tier: 2,
    lat: 40.7608,
    lon: -111.8910,
    metroName: 'Salt Lake City Metro',
    zips: ['84101', '84106']
  }
];

module.exports = { METRO_NEIGHBORHOODS };
