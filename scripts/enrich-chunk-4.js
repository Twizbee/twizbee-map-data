/**
 * scripts/enrich-chunk-4.js
 *
 * Granular Macro & Metro Regional Definitions for Chunk 4:
 * Mountain West & Desert Southwest: AZ, CO, NV, UT, NM, ID, MT, WY.
 */

const CHUNK_4_REGIONS = {
  // =========================================================================
  // ARIZONA (AZ)
  // =========================================================================
  'AZ': [
    // Tier 1: Macro-Regions
    {
      id: 'AZ-phoenix-metro',
      name: 'Phoenix Metro',
      fullName: 'Phoenix Metropolitan Area (Valley of the Sun)',
      tier: 1,
      description: 'Fast-growing desert metropolis, semiconductor manufacturing hub (TSMC, Intel), Scottsdale luxury resorts, and vibrant East/West Valley communities.',
      counties: ['Maricopa', 'Pinal']
    },
    {
      id: 'AZ-tucson-southern',
      name: 'Tucson & Southern Arizona',
      fullName: 'Tucson & Southern Arizona (Optics Valley & Sonoran Desert)',
      tier: 1,
      description: 'University of Arizona, international dark-sky astronomy observatories, Davis-Monthan AFB boneyard, Saguaro National Park, and border commerce.',
      counties: ['Pima', 'Cochise', 'Santa Cruz', 'Graham', 'Greenlee']
    },
    {
      id: 'AZ-northern-high-country',
      name: 'Northern Arizona',
      fullName: 'Northern Arizona & High Country (Grand Canyon, Flagstaff & Sedona)',
      tier: 1,
      description: 'Grand Canyon National Park (Seven Natural Wonders of the World), red rock vortexes in Sedona, Northern Arizona University in Flagstaff, and ponderosa pine forests.',
      counties: ['Coconino', 'Yavapai', 'Navajo', 'Apache', 'Gila']
    },
    {
      id: 'AZ-western-colorado-river',
      name: 'Western Arizona',
      fullName: 'Western Arizona & Colorado River Corridor (Yuma & Lake Havasu)',
      tier: 1,
      description: 'Winter salad bowl agriculture capital in Yuma, London Bridge in Lake Havasu City, Hoover Dam recreation, and Colorado River boating.',
      counties: ['Yuma', 'Mohave', 'La Paz']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'AZ-phoenix-maricopa-core',
      name: 'Phoenix & Maricopa Core',
      fullName: 'City of Phoenix & Maricopa County Core',
      tier: 2,
      parentRegion: 'Phoenix Metro',
      description: 'Downtown Phoenix biomedical campus, Roosevelt Row arts, Sky Harbor International Airport, Biltmore financial district, and Camelback Mountain.',
      counties: ['Maricopa']
    },
    {
      id: 'AZ-tucson-pima-core',
      name: 'Tucson & Pima Core',
      fullName: 'Tucson & Pima County Core (Catalina Foothills & Downtown)',
      tier: 2,
      parentRegion: 'Tucson & Southern Arizona',
      description: 'Historic El Presidio district, UNESCO City of Gastronomy culinary corridor, Catalina Foothills resort enclaves, and Raytheon defense systems.',
      counties: ['Pima']
    }
  ],

  // =========================================================================
  // COLORADO (CO)
  // =========================================================================
  'CO': [
    // Tier 1: Macro-Regions
    {
      id: 'CO-front-range',
      name: 'Front Range Corridor',
      fullName: 'Front Range Urban Corridor (Denver, Boulder & Springs)',
      tier: 1,
      description: 'The heavily populated eastern base of the Rocky Mountains where 85% of Colorado\'s population and economy resides.',
      counties: ['Denver', 'Arapahoe', 'Jefferson', 'Adams', 'Douglas', 'Broomfield', 'Boulder', 'Larimer', 'Weld', 'El Paso']
    },
    {
      id: 'CO-greater-denver',
      name: 'Greater Denver Metro',
      fullName: 'Greater Denver Metropolitan Area (Mile High City)',
      tier: 1,
      description: 'One mile above sea level, major aerospace (Lockheed Martin, Ball Aerospace), telecommunications, craft brewing, and energy capital.',
      counties: ['Denver', 'Arapahoe', 'Jefferson', 'Adams', 'Douglas', 'Broomfield']
    },
    {
      id: 'CO-boulder-northern',
      name: 'Boulder & Northern Colorado',
      fullName: 'Boulder & Northern Colorado (Silicon Flatirons, Fort Collins & CSU)',
      tier: 1,
      description: 'University of Colorado Boulder, tech startup ecosystem, National Center for Atmospheric Research (NCAR), Fort Collins craft beer, and Rocky Mountain National Park.',
      counties: ['Boulder', 'Larimer', 'Weld']
    },
    {
      id: 'CO-colorado-springs',
      name: 'Colorado Springs',
      fullName: 'Colorado Springs & Pikes Peak Region (Olympic City USA)',
      tier: 1,
      description: 'US Olympic & Paralympic Training Center, Garden of the Gods, US Air Force Academy, Peterson Space Force Base, and NORAD Cheyenne Mountain.',
      counties: ['El Paso', 'Teller']
    },
    {
      id: 'CO-western-slope-mountains',
      name: 'Western Slope & Mountains',
      fullName: 'Western Slope & Rocky Mountain Resorts (Vail, Aspen & Grand Junction)',
      tier: 1,
      description: 'World-famous ski resorts (Vail, Aspen, Breckenridge, Steamboat, Telluride), Colorado River headwaters, Palisade peach orchards, and red rock canyons.',
      counties: ['Eagle', 'Pitkin', 'Summit', 'Routt', 'Grand', 'Mesa', 'Garfield', 'Gunnison', 'Montrose', 'San Miguel', 'Ouray', 'Delta', 'Rio Blanco', 'Moffat', 'La Plata', 'Montezuma', 'Archuleta', 'San Juan', 'Dolores']
    },
    {
      id: 'CO-pueblo-southern',
      name: 'Pueblo & Southern Colorado',
      fullName: 'Pueblo & Southern Colorado (Steel City & San Luis Valley)',
      tier: 1,
      description: 'Historic steelmaking mills in Pueblo, Arkansas River green chile agriculture, Great Sand Dunes National Park, and historic Hispanic cultural roots.',
      counties: ['Pueblo', 'Fremont', 'Alamosa', 'Rio Grande', 'Conejos', 'Costilla', 'Saguache', 'Huerfano', 'Las Animas', 'Chaffee', 'Custer']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'CO-denver-county-core',
      name: 'Denver County Core',
      fullName: 'City & County of Denver (Downtown, LoDo & RiNo)',
      tier: 2,
      parentRegion: 'Greater Denver Metro',
      description: 'Colorado State Capitol, Lower Downtown (LoDo) historic warehouses, River North (RiNo) art district, Coors Field, and Ball Arena.',
      counties: ['Denver']
    },
    {
      id: 'CO-boulder-county-core',
      name: 'Boulder & Flatirons Core',
      fullName: 'Boulder County & Flatirons Innovation Belt',
      tier: 2,
      parentRegion: 'Boulder & Northern Colorado',
      description: 'Iconic sandstone Flatirons backdrop, Pearl Street pedestrian mall, Google Boulder campus, and federal scientific laboratories (NIST, NOAA).',
      counties: ['Boulder']
    }
  ],

  // =========================================================================
  // NEVADA (NV)
  // =========================================================================
  'NV': [
    // Tier 1: Macro-Regions
    {
      id: 'NV-las-vegas-valley',
      name: 'Las Vegas Valley',
      fullName: 'Las Vegas Valley & Southern Nevada (Entertainment Capital)',
      tier: 1,
      description: 'World\'s premier entertainment and convention destination, iconic Las Vegas Strip mega-resorts, Hoover Dam, Red Rock Canyon, and Lake Mead.',
      counties: ['Clark', 'Nye']
    },
    {
      id: 'NV-reno-tahoe-gateway',
      name: 'Reno-Tahoe & Western NV',
      fullName: 'Reno, Sparks & Lake Tahoe (The Biggest Little City & Sierra Nevada)',
      tier: 1,
      description: 'Lake Tahoe alpine resort clarity, Reno MidTown arts, Tahoe Reno Industrial Center (Tesla Gigafactory, Google, Switch), and state capital Carson City.',
      counties: ['Washoe', 'Carson City', 'Douglas', 'Storey', 'Lyon', 'Churchill']
    },
    {
      id: 'NV-rural-mining-corridor',
      name: 'Rural Nevada & Mining Corridor',
      fullName: 'Rural Nevada & Great Basin (Gold Mining & Loneliest Road)',
      tier: 1,
      description: 'Top gold-producing region in the Americas (Carlin Trend), Great Basin National Park (ancient bristlecone pines), and historic mining boomtowns along US-50.',
      counties: ['Elko', 'Humboldt', 'White Pine', 'Lander', 'Eureka', 'Pershing', 'Mineral', 'Esmeralda', 'Lincoln']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'NV-clark-county-las-vegas-core',
      name: 'Las Vegas & Clark Core',
      fullName: 'Las Vegas & Clark County Core (The Strip, Downtown & Summerlin)',
      tier: 2,
      parentRegion: 'Las Vegas Valley',
      description: 'Bellagio fountains, Fremont Street Experience, Allegiant Stadium (Raiders), Sphere at The Venetian, and master-planned Summerlin.',
      counties: ['Clark']
    },
    {
      id: 'NV-reno-washoe-core',
      name: 'Reno & Washoe County',
      fullName: 'Reno-Sparks Urban Core (Truckee River & University)',
      tier: 2,
      parentRegion: 'Reno-Tahoe & Western NV',
      description: 'Truckee Riverwalk District, University of Nevada Reno (UNR), National Automobile Museum, and Sierra Nevada mountain passes.',
      counties: ['Washoe']
    }
  ],

  // =========================================================================
  // UTAH (UT)
  // =========================================================================
  'UT': [
    // Tier 1: Macro-Regions
    {
      id: 'UT-wasatch-front',
      name: 'Wasatch Front',
      fullName: 'Wasatch Front & Salt Lake Metro (Crossroads of the West)',
      tier: 1,
      description: 'Utah state capitol overlooking Salt Lake Valley, Temple Square, Salt Lake City International Airport hub, and immediate access to world-class ski canyons.',
      counties: ['Salt Lake', 'Davis', 'Tooele', 'Morgan']
    },
    {
      id: 'UT-utah-valley-silicon-slopes',
      name: 'Utah Valley / Silicon Slopes',
      fullName: 'Utah Valley & Silicon Slopes (Provo, Orem & Lehi Tech Hub)',
      tier: 1,
      description: 'One of the fastest-growing tech and SaaS corridors in the country (Adobe, Qualtrics, Ancestry), Brigham Young University (BYU), and Mount Timpanogos.',
      counties: ['Utah', 'Wasatch']
    },
    {
      id: 'UT-northern-utah-ogden-logan',
      name: 'Northern Utah',
      fullName: 'Northern Utah & Bear River (Ogden Aerospace & Cache Valley)',
      tier: 1,
      description: 'Historic 25th Street in Ogden, Hill Air Force Base (largest employer in northern Utah / F-35 maintenance), and Utah State University in Logan.',
      counties: ['Weber', 'Cache', 'Box Elder', 'Rich']
    },
    {
      id: 'UT-southern-red-rock-zion',
      name: 'Southern Utah & Red Rock',
      fullName: 'Southern Utah & The Mighty 5 (Zion, Bryce, Moab & St. George)',
      tier: 1,
      description: 'Zion National Park, Bryce Canyon, Arches, Canyonlands, Capitol Reef, booming year-round resort climate in St. George, and red sandstone arches.',
      counties: ['Washington', 'Iron', 'Kane', 'Garfield', 'Wayne', 'San Juan', 'Grand', 'Emery', 'Carbon', 'Sevier', 'Sanpete', 'Millard', 'Beaver', 'Piute']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'UT-salt-lake-county-core',
      name: 'Salt Lake County Core',
      fullName: 'Salt Lake County & Downtown Core',
      tier: 2,
      parentRegion: 'Wasatch Front',
      description: 'Downtown SLC, Delta Center (Utah Jazz / NHL), University of Utah research park, Sugar House, and Cottonwood Canyons ski access.',
      counties: ['Salt Lake']
    },
    {
      id: 'UT-st-george-washington-core',
      name: 'Greater St. George & Zion',
      fullName: 'St. George Metropolitan Area & Washington County (Red Rock Gateway)',
      tier: 2,
      parentRegion: 'Southern Utah & Red Rock',
      description: 'Fast-growing desert haven, Tuacahn Amphitheatre red cliff theater, Sand Hollow reservoir, championship golf courses, and Zion gateway.',
      counties: ['Washington']
    }
  ],

  // =========================================================================
  // NEW MEXICO (NM)
  // =========================================================================
  'NM': [
    // Tier 1: Macro-Regions
    {
      id: 'NM-central-albuquerque-metro',
      name: 'Central New Mexico',
      fullName: 'Central New Mexico & Greater Albuquerque (Duke City & Sandia)',
      tier: 1,
      description: 'Albuquerque International Balloon Fiesta (largest hot air balloon event in world), Sandia National Laboratories, University of New Mexico, and Sandia Peak Tramway.',
      counties: ['Bernalillo', 'Sandoval', 'Valencia', 'Torrance']
    },
    {
      id: 'NM-northern-santa-fe-taos',
      name: 'Northern New Mexico',
      fullName: 'Northern New Mexico (Santa Fe Historic Capital, Taos & Los Alamos)',
      tier: 1,
      description: 'Oldest state capital in the US (founded 1610), Pueblo Revival architecture, Santa Fe Opera, world-class art galleries on Canyon Road, Los Alamos National Laboratory, and Taos Ski Valley.',
      counties: ['Santa Fe', 'Taos', 'Los Alamos', 'Rio Arriba', 'San Miguel', 'Mora', 'Colfax', 'Union']
    },
    {
      id: 'NM-southern-las-cruces-space',
      name: 'Southern New Mexico',
      fullName: 'Southern New Mexico (Las Cruces, White Sands & Organ Mountains)',
      tier: 1,
      description: 'New Mexico State University in Las Cruces, glistening gypsum dunes at White Sands National Park, White Sands Missile Range, Spaceport America, and green chile capital Hatch.',
      counties: ['Doña Ana', 'Otero', 'Luna', 'Sierra', 'Grant', 'Hidalgo', 'Catron', 'Socorro', 'Lincoln']
    },
    {
      id: 'NM-eastern-permian-oil',
      name: 'Eastern New Mexico',
      fullName: 'Eastern New Mexico & Permian Basin (Carlsbad Caverns & Oil Country)',
      tier: 1,
      description: 'Permian Basin Delaware sub-basin oil and natural gas powerhouse in Hobbs/Carlsbad, Carlsbad Caverns National Park underground limestone chambers, and UFO folklore in Roswell.',
      counties: ['Eddy', 'Lea', 'Chaves', 'Roosevelt', 'Curry', 'Quay', 'Guadalupe', 'De Baca', 'Harding', 'San Juan', 'McKinley', 'Cibola']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'NM-albuquerque-bernalillo-core',
      name: 'Albuquerque & Bernalillo Core',
      fullName: 'Albuquerque Urban Core (Historic Old Town, Nob Hill & Downtown)',
      tier: 2,
      parentRegion: 'Central New Mexico',
      description: 'Historic Old Town plaza dating to 1706, Route 66 neon on Central Avenue / Nob Hill, Petroglyph National Monument, and Kirtland Air Force Base.',
      counties: ['Bernalillo']
    },
    {
      id: 'NM-santa-fe-county-core',
      name: 'Santa Fe Historic Core',
      fullName: 'Santa Fe County & Historic Plaza (The City Different)',
      tier: 2,
      parentRegion: 'Northern New Mexico',
      description: 'Historic Santa Fe Plaza, Palace of the Governors, Georgia O\'Keeffe Museum, Meow Wolf immersive art headquarters, and Santa Fe Railyard.',
      counties: ['Santa Fe']
    }
  ],

  // =========================================================================
  // IDAHO (ID)
  // =========================================================================
  'ID': [
    // Tier 1: Macro-Regions
    {
      id: 'ID-treasure-valley-boise',
      name: 'Treasure Valley',
      fullName: 'Treasure Valley & Greater Boise (City of Trees & Tech Corridor)',
      tier: 1,
      description: 'Idaho state capitol, Boise State University (blue turf Albertsons Stadium), Micron Technology global headquarters, Hewlett-Packard campus, and Boise River Greenbelt.',
      counties: ['Ada', 'Canyon', 'Gem', 'Boise', 'Owyhee', 'Payette', 'Elmore']
    },
    {
      id: 'ID-north-panhandle-coeur-dalene',
      name: 'North Idaho Panhandle',
      fullName: 'North Idaho Panhandle & Coeur d\'Alene (Lakes & Silver Valley)',
      tier: 1,
      description: 'Pristine glacial lakes (Lake Coeur d\'Alene, Lake Pend Oreille), Schweitzer Mountain ski resort in Sandpoint, historic Silver Valley mining, and Bitterroot Mountains.',
      counties: ['Kootenai', 'Bonner', 'Boundary', 'Shoshone', 'Benewah', 'Latah', 'Nez Perce', 'Lewis', 'Clearwater', 'Idaho']
    },
    {
      id: 'ID-magic-valley-twin-falls',
      name: 'Magic Valley & Sun Valley',
      fullName: 'Magic Valley & Wood River Valley (Twin Falls & Sun Valley Resort)',
      tier: 1,
      description: 'Perrine Bridge BASE jumping over Snake River Canyon in Twin Falls, Shoshone Falls ("Niagara of the West"), Chobani world\'s largest yogurt plant, and iconic Sun Valley ski resort.',
      counties: ['Twin Falls', 'Jerome', 'Blaine', 'Cassia', 'Minidoka', 'Gooding', 'Lincoln', 'Camas']
    },
    {
      id: 'ID-eastern-idaho-falls-pocatello',
      name: 'Eastern Idaho',
      fullName: 'Eastern Idaho & Snake River Plain (Idaho Falls & Pocatello)',
      tier: 1,
      description: 'Idaho National Laboratory (nation\'s leading nuclear energy research lab), Idaho State University in Pocatello, famous Idaho Russet potato farmlands, and Grand Teton gateway.',
      counties: ['Bonneville', 'Bannock', 'Bingham', 'Jefferson', 'Madison', 'Fremont', 'Teton', 'Power', 'Caribou', 'Bear Lake', 'Franklin', 'Oneida', 'Clark', 'Lemhi', 'Custer', 'Butte']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'ID-boise-ada-county-core',
      name: 'Boise & Ada County Core',
      fullName: 'City of Boise & Ada County Core (Downtown & Foothills)',
      tier: 2,
      parentRegion: 'Treasure Valley',
      description: 'Basque Block, Downtown Boise 8th Street restaurant corridor, Bogus Basin mountain recreation, and Ridge to Rivers foothills trail system.',
      counties: ['Ada']
    },
    {
      id: 'ID-coeur-dalene-kootenai-core',
      name: 'Coeur d\'Alene & Kootenai',
      fullName: 'Coeur d\'Alene & Kootenai County (Lake Coeur d\'Alene & Resort)',
      tier: 2,
      parentRegion: 'North Idaho Panhandle',
      description: 'Floating green golf course at Coeur d\'Alene Resort, Tubbs Hill lakeside park, Silverwood Theme Park, and scenic Spokane River outlet.',
      counties: ['Kootenai']
    }
  ],

  // =========================================================================
  // MONTANA (MT)
  // =========================================================================
  'MT': [
    // Tier 1: Macro-Regions
    {
      id: 'MT-western-missoula-bitterroot',
      name: 'Western Montana',
      fullName: 'Western Montana & Bitterroot Valley (Missoula & Clark Fork)',
      tier: 1,
      description: 'University of Montana in Missoula ("Garden City"), confluence of five mountain ranges, Bitterroot River fly fishing, craft breweries, and wilderness access.',
      counties: ['Missoula', 'Ravalli', 'Lake', 'Sanders', 'Mineral', 'Granite', 'Powell']
    },
    {
      id: 'MT-gallatin-bozeman-big-sky',
      name: 'Gallatin Valley & Big Sky',
      fullName: 'Gallatin Valley (Bozeman, Big Sky Resort & Yellowstone Gateway)',
      tier: 1,
      description: 'Montana State University in Bozeman, high-tech optics and photonics cluster, world-class skiing at Big Sky Resort, and northern entrance to Yellowstone National Park.',
      counties: ['Gallatin', 'Park', 'Madison']
    },
    {
      id: 'MT-flathead-glacier-kalispell',
      name: 'Flathead Valley & Glacier',
      fullName: 'Flathead Valley & Glacier National Park (Kalispell & Whitefish)',
      tier: 1,
      description: 'Glacier National Park ("Crown of the Continent"), Going-to-the-Sun Road, pristine Flathead Lake (largest natural freshwater lake west of Mississippi), and Whitefish Mountain Resort.',
      counties: ['Flathead', 'Lincoln']
    },
    {
      id: 'MT-yellowstone-billings-metro',
      name: 'Yellowstone Valley & Billings',
      fullName: 'Yellowstone Valley & Billings Metropolitan Area (Magic City)',
      tier: 1,
      description: 'Montana\'s largest city, Rimrocks sandstone formations, major regional medical and financial hub for the northern plains, oil refining, and Little Bighorn battlefield.',
      counties: ['Yellowstone', 'Carbon', 'Stillwater', 'Sweet Grass', 'Musselshell', 'Golden Valley', 'Wheatland']
    },
    {
      id: 'MT-central-capital-helena',
      name: 'Central Montana & Capital',
      fullName: 'Central Montana & Capital Region (Helena & Great Falls)',
      tier: 1,
      description: 'Montana state capitol in Helena, historic Last Chance Gulch gold mining heritage, Great Falls waterfalls on the Missouri River, C.M. Russell Western art museum, and Malmstrom AFB.',
      counties: ['Lewis and Clark', 'Cascade', 'Jefferson', 'Broadwater', 'Meagher', 'Judith Basin', 'Fergus', 'Chouteau', 'Teton', 'Pondera', 'Toole', 'Glacier', 'Liberty', 'Hill', 'Blaine', 'Phillips']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'MT-bozeman-gallatin-core',
      name: 'Bozeman & Gallatin Core',
      fullName: 'Bozeman & Gallatin County Core (Main Street & Tech Hub)',
      tier: 2,
      parentRegion: 'Gallatin Valley & Big Sky',
      description: 'Historic brick Main Street, Museum of the Rockies (world-class Tyrannosaurus rex fossils), Bozeman Yellowstone International Airport, and Bridger Bowl ski area.',
      counties: ['Gallatin']
    },
    {
      id: 'MT-billings-yellowstone-core',
      name: 'Billings & Yellowstone Core',
      fullName: 'Billings Urban Core & Yellowstone County',
      tier: 2,
      parentRegion: 'Yellowstone Valley & Billings',
      description: 'Downtown Billings historic district, Montana\'s only walkable brewery district, Dehler Park baseball, and regional trade crossroads.',
      counties: ['Yellowstone']
    }
  ],

  // =========================================================================
  // WYOMING (WY)
  // =========================================================================
  'WY': [
    // Tier 1: Macro-Regions
    {
      id: 'WY-jackson-hole-yellowstone',
      name: 'Jackson Hole & Yellowstone',
      fullName: 'Jackson Hole, Grand Teton & Yellowstone National Park',
      tier: 1,
      description: 'Yellowstone National Park (first national park in world / Old Faithful geyser), Grand Teton Cathedral Group granite spires, Jackson Hole Mountain Resort, and Federal Reserve Economic Symposium.',
      counties: ['Teton', 'Park', 'Sublette']
    },
    {
      id: 'WY-southeast-cheyenne-capital',
      name: 'Southeast Wyoming',
      fullName: 'Southeast Wyoming & Capital Region (Cheyenne & Laramie / UW)',
      tier: 1,
      description: 'Wyoming state capitol with 24-karat gold dome, Cheyenne Frontier Days ("Daddy of \'em All" rodeo), F.E. Warren Air Force Base (ICBM command), and University of Wyoming in Laramie.',
      counties: ['Laramie', 'Albany', 'Platte', 'Goshen']
    },
    {
      id: 'WY-central-casper-oil-city',
      name: 'Central Wyoming',
      fullName: 'Central Wyoming & Oil City (Casper & North Platte River)',
      tier: 1,
      description: 'Historic wagon train crossroads (Oregon, California, Mormon trails) along the North Platte River in Casper, oil and energy refining, and National Historic Trails Interpretive Center.',
      counties: ['Natrona', 'Converse', 'Fremont', 'Carbon']
    },
    {
      id: 'WY-powder-river-gillette-sheridan',
      name: 'Powder River Basin',
      fullName: 'Powder River Basin & Bighorn Mountains (Gillette & Sheridan)',
      tier: 1,
      description: 'America\'s Energy Capital (Powder River Basin low-sulfur coal and natural gas), Devils Tower National Monument (first US national monument), and historic Bighorn Mountains ranching in Sheridan.',
      counties: ['Campbell', 'Sheridan', 'Johnson', 'Crook', 'Weston', 'Washakie', 'Hot Springs', 'Big Horn', 'Niobrara', 'Lincoln', 'Uinta', 'Sweetwater']
    },

    // Tier 2: Metro & Sub-Regions
    {
      id: 'WY-teton-jackson-core',
      name: 'Jackson & Teton County',
      fullName: 'Town of Jackson & Teton County (Town Square Elk Antler Arches)',
      tier: 2,
      parentRegion: 'Jackson Hole & Yellowstone',
      description: 'Historic Jackson Town Square with four arches made of shed elk antlers, National Elk Refuge, luxury art galleries, and Snake River scenic rafting.',
      counties: ['Teton']
    },
    {
      id: 'WY-cheyenne-laramie-county-core',
      name: 'Cheyenne & Laramie County',
      fullName: 'Cheyenne & Laramie County Core (Capital City & Railroad Heritage)',
      tier: 2,
      parentRegion: 'Southeast Wyoming',
      description: 'Union Pacific Railroad historic depot, Cheyenne Botanic Gardens, Wyoming State Museum, and major regional data center corridor (Microsoft, NCAR supercomputing).',
      counties: ['Laramie']
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHUNK_4_REGIONS };
}
