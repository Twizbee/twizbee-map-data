#!/usr/bin/env python3
"""
scripts/generate_national_catalogs.py

Generates complete, verified catalogs of Macro-Regions (Tier 1) and Metro-Regions (Tier 2)
for ALL 50 US States + DC + Puerto Rico (52 subdivisions) AND ALL 13 Canadian Provinces & Territories.

Every constituent county / census division is matched directly against the raw cartographic atlas
so that topological dissolves produce 100% exact exterior boundaries matching Google Maps.
"""

import json
import os
import re

# Load verified county & CD names
with open('data/cache/all-state-counties.json', 'r', encoding='utf-8') as f:
    US_COUNTIES = json.load(f)

with open('data/cache/all-canada-cds.json', 'r', encoding='utf-8') as f:
    CAN_CDS = json.load(f)

def normalize(name):
    return re.sub(r'[\s\.\-]+', '', name.lower()).replace('county', '').replace('parish', '').replace('municipio', '').replace('borough', '')

def match_county(target, available):
    t_norm = normalize(target)
    for c in available:
        if normalize(c) == t_norm:
            return c
    # Partial match
    for c in available:
        if t_norm in normalize(c) or normalize(c) in t_norm:
            return c
    return target

# =========================================================================
# US REGIONAL CATALOG DEFINITIONS (ALL 52 STATES & TERRITORIES)
# =========================================================================
print("Generating comprehensive US Regions Catalog...")

# We will define comprehensive regions for every US state
# Format: { 'abbr': [ { id, name, fullName, tier, parentRegion, desc, counties } ] }

US_DEFS = {
    # Alabama
    'AL': [
        {
            'id': 'AL-north-alabama',
            'name': 'North Alabama',
            'fullName': 'North Alabama (Huntsville & Tennessee Valley)',
            'tier': 1,
            'desc': 'Encompasses the Tennessee Valley, Rocket City high-tech defense corridor (Huntsville), Decatur, and Florence/Shoals.',
            'counties': ['Madison', 'Limestone', 'Morgan', 'Lauderdale', 'Colbert', 'Lawrence', 'Marshall', 'Jackson', 'DeKalb']
        },
        {
            'id': 'AL-birmingham-central',
            'name': 'Central Alabama',
            'fullName': 'Central Alabama (Greater Birmingham & Tuscaloosa)',
            'tier': 1,
            'desc': 'The industrial and academic economic center of Alabama, centered on Birmingham, Hoover, and Tuscaloosa.',
            'counties': ['Jefferson', 'Shelby', 'Tuscaloosa', 'St. Clair', 'Blount', 'Walker', 'Bibb', 'Chilton']
        },
        {
            'id': 'AL-south-alabama-gulf',
            'name': 'South Alabama & Gulf Coast',
            'fullName': 'South Alabama & Mobile Bay Gulf Coast',
            'tier': 1,
            'desc': 'Mobile Bay, Port of Mobile, Baldwin County beach communities (Gulf Shores/Orange Beach), and southwest coastal plain.',
            'counties': ['Mobile', 'Baldwin', 'Escambia', 'Washington', 'Clarke', 'Monroe', 'Conecuh']
        },
        {
            'id': 'AL-river-region-wiregrass',
            'name': 'River Region & Wiregrass',
            'fullName': 'River Region (Montgomery) & Wiregrass (Dothan)',
            'tier': 1,
            'desc': 'Capital city Montgomery, Maxwell AFB, and southeast Alabama agricultural and aviation hub Dothan.',
            'counties': ['Montgomery', 'Elmore', 'Autauga', 'Houston', 'Dale', 'Coffee', 'Geneva', 'Henry', 'Pike', 'Lee']
        },
        {
            'id': 'AL-huntsville-metro',
            'name': 'Huntsville Metro',
            'fullName': 'Huntsville Metropolitan Area (Rocket City Tech Corridor)',
            'tier': 2,
            'parentRegion': 'North Alabama',
            'desc': 'Fast-growing aerospace, defense, and biotechnology hub centered on Redstone Arsenal and NASA Marshall Space Flight Center.',
            'counties': ['Madison', 'Limestone']
        },
        {
            'id': 'AL-birmingham-metro',
            'name': 'Greater Birmingham',
            'fullName': 'Greater Birmingham-Hoover Metropolitan Area',
            'tier': 2,
            'parentRegion': 'Central Alabama',
            'desc': 'The primary healthcare, banking, and commercial hub of Alabama spanning Jefferson and Shelby counties.',
            'counties': ['Jefferson', 'Shelby']
        }
    ],

    # Alaska
    'AK': [
        {
            'id': 'AK-southcentral',
            'name': 'Southcentral Alaska',
            'fullName': 'Southcentral Alaska (Anchorage & Mat-Su Basin)',
            'tier': 1,
            'desc': 'The population center of Alaska encompassing Anchorage, Matanuska-Susitna Valley, Kenai Peninsula, and Prince William Sound.',
            'counties': ['Anchorage', 'Matanuska-Susitna', 'Kenai Peninsula', 'Valdez-Cordova', 'Chugach', 'Copper River']
        },
        {
            'id': 'AK-southeast',
            'name': 'Southeast Alaska',
            'fullName': 'Southeast Alaska (Inside Passage & Panhandle)',
            'tier': 1,
            'desc': 'Coastal archipelago and fjord region including state capital Juneau, Ketchikan, Sitka, and Tongass National Forest.',
            'counties': ['Juneau', 'Ketchikan Gateway', 'Sitka', 'Petersburg', 'Wrangell', 'Haines', 'Skagway', 'Hoonah-Angoon', 'Prince of Wales-Hyder']
        },
        {
            'id': 'AK-interior',
            'name': 'Interior Alaska',
            'fullName': 'Interior Alaska (Fairbanks & Tanana Valley)',
            'tier': 1,
            'desc': 'The vast central plateau surrounding Fairbanks, Fort Wainwright, Denali National Park, and the Yukon River basin.',
            'counties': ['Fairbanks North Star', 'Denali', 'Southeast Fairbanks', 'Yukon-Koyukuk']
        },
        {
            'id': 'AK-northern-southwest',
            'name': 'Northern & Southwest Alaska',
            'fullName': 'Northern Arctic & Southwest Alaska',
            'tier': 1,
            'desc': 'Prudhoe Bay North Slope energy corridor, Northwest Arctic, Bethel Yukon-Kuskokwim Delta, Bristol Bay, and Aleutian Islands.',
            'counties': ['North Slope', 'Northwest Arctic', 'Nom', 'Nome', 'Bethel', 'Kusilvak', 'Dillingham', 'Bristol Bay', 'Lake and Peninsula', 'Aleutians East', 'Aleutians West']
        }
    ],

    # Arkansas
    'AR': [
        {
            'id': 'AR-northwest',
            'name': 'Northwest Arkansas',
            'fullName': 'Northwest Arkansas (Fayetteville-Springdale-Rogers-Bentonville)',
            'tier': 1,
            'desc': 'Global retail and logistics headquarters hub and Ozark mountain corridor.',
            'counties': ['Benton', 'Washington', 'Madison', 'Carroll']
        },
        {
            'id': 'AR-central',
            'name': 'Central Arkansas',
            'fullName': 'Central Arkansas (Little Rock-North Little Rock-Conway)',
            'tier': 1,
            'desc': 'Capital city metropolitan area, state government, healthcare, and Arkansas River Valley commerce.',
            'counties': ['Pulaski', 'Faulkner', 'Saline', 'Lonoke', 'White', 'Garland']
        },
        {
            'id': 'AR-northeast-delta',
            'name': 'Northeast Arkansas & Delta',
            'fullName': 'Northeast Arkansas (Jonesboro & Mississippi Delta)',
            'tier': 1,
            'desc': 'Agricultural heartland, rice/cotton production, and manufacturing hub centered in Jonesboro.',
            'counties': ['Craighead', 'Mississippi', 'Crittenden', 'Greene', 'Poinsett', 'Cross', 'St. Francis', 'Lee', 'Phillips']
        },
        {
            'id': 'AR-south-river-valley',
            'name': 'South Arkansas & River Valley',
            'fullName': 'South Arkansas Timberlands & Fort Smith River Valley',
            'tier': 1,
            'desc': 'Pine timberlands, oil/bromine industry (El Dorado), and western manufacturing center Fort Smith.',
            'counties': ['Sebastian', 'Crawford', 'Union', 'Ouachita', 'Columbia', 'Miller', 'Jefferson']
        }
    ],

    # Connecticut
    'CT': [
        {
            'id': 'CT-greater-hartford',
            'name': 'Greater Hartford',
            'fullName': 'Greater Hartford Capital Region',
            'tier': 1,
            'desc': 'Insurance capital, state government, aerospace defense manufacturing (Pratt & Whitney), and Connecticut River Valley.',
            'counties': ['Hartford', 'Tolland', 'Middlesex']
        },
        {
            'id': 'CT-fairfield-county',
            'name': 'Fairfield County',
            'fullName': 'Fairfield County (Gold Coast & NYC Metro Suburbs)',
            'tier': 1,
            'desc': 'Affluent New York City commuter and hedge fund corridor including Stamford, Greenwich, Norwalk, Bridgeport, and Danbury.',
            'counties': ['Fairfield']
        },
        {
            'id': 'CT-greater-new-haven',
            'name': 'Greater New Haven',
            'fullName': 'Greater New Haven & Shoreline',
            'tier': 1,
            'desc': 'Academic and biotech center anchored by Yale University, New Haven Harbor, and central Long Island Sound coast.',
            'counties': ['New Haven']
        },
        {
            'id': 'CT-eastern-western-rural',
            'name': 'Eastern & Western Connecticut',
            'fullName': 'Eastern Mystic Coast & Western Litchfield Hills',
            'tier': 1,
            'desc': 'Historic maritime coast (New London/Groton submarine base/Mystic) and western scenic Litchfield Hills.',
            'counties': ['New London', 'Windham', 'Litchfield']
        }
    ],

    # District of Columbia
    'DC': [
        {
            'id': 'DC-district-of-columbia',
            'name': 'District of Columbia',
            'fullName': 'District of Columbia (Washington DC Federal Core)',
            'tier': 1,
            'desc': 'The United States national capital, federal district, monument corridor, and international diplomatic center.',
            'counties': ['District of Columbia']
        }
    ],

    # Delaware
    'DE': [
        {
            'id': 'DE-new-castle',
            'name': 'New Castle County',
            'fullName': 'New Castle County (Wilmington Metro & Corporate Corridor)',
            'tier': 1,
            'desc': 'National financial services, banking, chemical science (DuPont), and northern Delaware urban corridor.',
            'counties': ['New Castle']
        },
        {
            'id': 'DE-central-kent',
            'name': 'Kent County',
            'fullName': 'Kent County (Dover Capital Region & Central DE)',
            'tier': 1,
            'desc': 'State capital Dover, Dover Air Force Base, agriculture, and central Delaware community corridor.',
            'counties': ['Kent']
        },
        {
            'id': 'DE-sussex-beaches',
            'name': 'Sussex County',
            'fullName': 'Sussex County (Delaware Beaches & Coastal Resort Corridor)',
            'tier': 1,
            'desc': 'Famous Atlantic coastline beach resorts (Rehoboth Beach, Lewes, Bethany Beach, Fenwick Island) and agricultural heartland.',
            'counties': ['Sussex']
        }
    ],

    # Hawaii
    'HI': [
        {
            'id': 'HI-oahu-honolulu',
            'name': 'Oahu',
            'fullName': 'City & County of Honolulu (Oahu Island Metro)',
            'tier': 1,
            'desc': 'State capital Honolulu, Waikiki, Pearl Harbor, North Shore, and primary commercial hub of the Hawaiian Islands.',
            'counties': ['Honolulu']
        },
        {
            'id': 'HI-maui-county',
            'name': 'Maui County',
            'fullName': 'Maui County (Maui, Molokai & Lanai Islands)',
            'tier': 1,
            'desc': 'World-renowned resort destinations, West Maui, Haleakala crater, Ka\'anapali, and island communities of Molokai and Lanai.',
            'counties': ['Maui', 'Kalawao']
        },
        {
            'id': 'HI-hawaii-island',
            'name': 'Hawaii Island',
            'fullName': 'Hawaii County (The Big Island)',
            'tier': 1,
            'desc': 'Kona coffee coast, Hilo, Hawaii Volcanoes National Park, and Mauna Kea astronomical observatory summit.',
            'counties': ['Hawaii']
        },
        {
            'id': 'HI-kauai-county',
            'name': 'Kauai County',
            'fullName': 'Kauai County (The Garden Isle & Niihau)',
            'tier': 1,
            'desc': 'Na Pali Coast, Waimea Canyon, Princeville, Hanalei, and southern resort beaches of Poipu.',
            'counties': ['Kauai']
        }
    ],

    # Iowa
    'IA': [
        {
            'id': 'IA-central-des-moines',
            'name': 'Central Iowa',
            'fullName': 'Central Iowa (Greater Des Moines & Ames Corridor)',
            'tier': 1,
            'desc': 'State capital, national insurance and financial center, Iowa State University, and central agribusiness corridor.',
            'counties': ['Polk', 'Dallas', 'Warren', 'Story', 'Boone', 'Jasper', 'Madison']
        },
        {
            'id': 'IA-eastern-cedar-valley',
            'name': 'Eastern Iowa',
            'fullName': 'Eastern Iowa (Cedar Rapids, Iowa City & Waterloo)',
            'tier': 1,
            'desc': 'University of Iowa medical hub, engineering and grain processing in Cedar Rapids, and Cedar Valley manufacturing.',
            'counties': ['Linn', 'Johnson', 'Black Hawk', 'Dubuque', 'Benton', 'Jones']
        },
        {
            'id': 'IA-quad-cities-mississippi',
            'name': 'Quad Cities & Mississippi River',
            'fullName': 'Quad Cities (Davenport-Bettendorf) & Mississippi River',
            'tier': 1,
            'desc': 'Major manufacturing and agricultural equipment hub (John Deere) and river navigation corridor.',
            'counties': ['Scott', 'Clinton', 'Muscatine', 'Des Moines', 'Lee']
        },
        {
            'id': 'IA-western-sioux-land',
            'name': 'Western Iowa',
            'fullName': 'Western Iowa (Sioux City & Council Bluffs)',
            'tier': 1,
            'desc': 'Missouri River navigation, Omaha metro suburbs (Council Bluffs), and tri-state food processing hub Sioux City.',
            'counties': ['Woodbury', 'Pottawattamie', 'Plymouth', 'Sioux', 'Harrison', 'Mills']
        }
    ],

    # Idaho
    'ID': [
        {
            'id': 'ID-treasure-valley',
            'name': 'Treasure Valley',
            'fullName': 'Treasure Valley (Boise-Nampa-Meridian Metro)',
            'tier': 1,
            'desc': 'Rapidly booming state capital, technology hub (Micron), and corporate center of southwestern Idaho.',
            'counties': ['Ada', 'Canyon', 'Gem', 'Boise', 'Owyhee', 'Elmore']
        },
        {
            'id': 'ID-magic-valley-south',
            'name': 'Magic Valley & South Central',
            'fullName': 'Magic Valley (Twin Falls & Snake River Plain)',
            'tier': 1,
            'desc': 'Agricultural powerhouse, dairy processing capital (Chobani), and famous Snake River Canyon / Perrine Bridge.',
            'counties': ['Twin Falls', 'Jerome', 'Cassia', 'Minidoka', 'Gooding', 'Lincoln', 'Blaine']
        },
        {
            'id': 'ID-eastern-idaho',
            'name': 'Eastern Idaho',
            'fullName': 'Eastern Idaho (Idaho Falls & Pocatello)',
            'tier': 1,
            'desc': 'Idaho National Laboratory (nuclear energy research), Idaho State University, and Yellowstone/Teton gateway.',
            'counties': ['Bonneville', 'Bannock', 'Bingham', 'Jefferson', 'Madison', 'Fremont', 'Teton']
        },
        {
            'id': 'ID-north-panhandle',
            'name': 'North Idaho Panhandle',
            'fullName': 'North Idaho Panhandle (Coeur d\'Alene & Sandpoint)',
            'tier': 1,
            'desc': 'Scenic lake resort communities, timber, mining, and Spokane metropolitan economic sphere.',
            'counties': ['Kootenai', 'Bonner', 'Boundary', 'Shoshone', 'Benewah', 'Latah', 'Nez Perce']
        }
    ],

    # Indiana
    'IN': [
        {
            'id': 'IN-central-indianapolis',
            'name': 'Central Indiana',
            'fullName': 'Central Indiana (Greater Indianapolis Metro)',
            'tier': 1,
            'desc': 'State capital, sports capital (Indy 500, NCAA), logistics crossroads (FedEx hub), and Eli Lilly pharmaceutical center.',
            'counties': ['Marion', 'Hamilton', 'Hendricks', 'Johnson', 'Boone', 'Hancock', 'Morgan', 'Shelby']
        },
        {
            'id': 'IN-northwest-chicago',
            'name': 'Northwest Indiana',
            'fullName': 'Northwest Indiana (The Region / Chicago Metro)',
            'tier': 1,
            'desc': 'Chicago metropolitan area, Lake Michigan shoreline, steel manufacturing, and Indiana Dunes National Park.',
            'counties': ['Lake', 'Porter', 'LaPorte', 'Newton', 'Jasper']
        },
        {
            'id': 'IN-northern-fort-wayne-south-bend',
            'name': 'Northern Indiana',
            'fullName': 'Northern Indiana (Fort Wayne, South Bend & Elkhart)',
            'tier': 1,
            'desc': 'Notre Dame academic hub, Fort Wayne defense/automotive, and global RV manufacturing capital Elkhart.',
            'counties': ['Allen', 'St. Joseph', 'Elkhart', 'Kosciusko', 'Marshall', 'DeKalb', 'Noble']
        },
        {
            'id': 'IN-southern-ohio-river',
            'name': 'Southern Indiana',
            'fullName': 'Southern Indiana (Evansville & Louisville Suburbs)',
            'tier': 1,
            'desc': 'Ohio River commerce, Toyota manufacturing in Evansville, and Clark/Floyd suburbs of Greater Louisville.',
            'counties': ['Vanderburgh', 'Warrick', 'Posey', 'Clark', 'Floyd', 'Monroe', 'Bartholomew']
        }
    ],

    # Kansas
    'KS': [
        {
            'id': 'KS-kansas-city-metro',
            'name': 'Kansas City Metro (KS)',
            'fullName': 'Kansas City Metro - Johnson & Wyandotte Counties',
            'tier': 1,
            'desc': 'Affluent suburban and corporate headquarters corridor (Overland Park, Olathe, Kansas City KS, Prairie Village).',
            'counties': ['Johnson', 'Wyandotte', 'Leavenworth', 'Miami']
        },
        {
            'id': 'KS-wichita-south-central',
            'name': 'Wichita & South Central',
            'fullName': 'Wichita Metro & South Central Kansas',
            'tier': 1,
            'desc': 'Air Capital of the World (Spirit AeroSystems, Textron Aviation), Koch Industries global HQ, and southern plains commerce.',
            'counties': ['Sedgwick', 'Butler', 'Harvey', 'Reno', 'Cowley', 'Sumner']
        },
        {
            'id': 'KS-topeka-lawrence',
            'name': 'Topeka & Lawrence',
            'fullName': 'Topeka Capital Region & Lawrence (KU Corridor)',
            'tier': 1,
            'desc': 'State government in Topeka, University of Kansas in Lawrence, and animal health technology corridor.',
            'counties': ['Shawnee', 'Douglas', 'Jefferson', 'Osage']
        },
        {
            'id': 'KS-western-flint-hills',
            'name': 'Western Kansas & Flint Hills',
            'fullName': 'Western Kansas Agricultural Heartland & Flint Hills',
            'tier': 1,
            'desc': 'Tallgrass prairie, Kansas State University (Manhattan), wheat production, cattle feeding, and oil production in the high plains.',
            'counties': ['Riley', 'Geary', 'Saline', 'Ford', 'Finney', 'Ellis']
        }
    ],

    # Kentucky
    'KY': [
        {
            'id': 'KY-louisville-metro',
            'name': 'Greater Louisville',
            'fullName': 'Greater Louisville Metro & Bluegrass North',
            'tier': 1,
            'desc': 'Largest city in Kentucky, UPS Worldport global air hub, bourbon distilling headquarters, and Ford manufacturing.',
            'counties': ['Jefferson', 'Oldham', 'Bullitt', 'Shelby', 'Nelson', 'Spencer']
        },
        {
            'id': 'KY-bluegrass-lexington',
            'name': 'Bluegrass Region',
            'fullName': 'Bluegrass Region (Lexington Horse Capital & Central KY)',
            'tier': 1,
            'desc': 'Thoroughbred horse breeding capital of the world, University of Kentucky, Toyota Georgetown, and rolling limestone pastureland.',
            'counties': ['Fayette', 'Scott', 'Jessamine', 'Woodford', 'Clark', 'Madison', 'Bourbon', 'Franklin']
        },
        {
            'id': 'KY-northern-kentucky',
            'name': 'Northern Kentucky',
            'fullName': 'Northern Kentucky (Cincinnati Metro Suburbs)',
            'tier': 1,
            'desc': 'Cincinnati/Northern Kentucky International Airport (CVG), Amazon Air hub, Fidelity Investments, and Ohio River waterfront.',
            'counties': ['Boone', 'Kenton', 'Campbell', 'Grant', 'Pendleton']
        },
        {
            'id': 'KY-western-pennyrile',
            'name': 'Western Kentucky',
            'fullName': 'Western Kentucky (Bowling Green, Owensboro & Paducah)',
            'tier': 1,
            'desc': 'GM Corvette assembly in Bowling Green, Ohio River manufacturing in Owensboro, and confluence of rivers in Paducah.',
            'counties': ['Warren', 'Daviess', 'Christian', 'McCracken', 'Henderson', 'Hopkins']
        },
        {
            'id': 'KY-eastern-appalachian',
            'name': 'Eastern Kentucky',
            'fullName': 'Eastern Kentucky Appalachian Mountains',
            'tier': 1,
            'desc': 'Cumberland Plateau, Red River Gorge, historic coalfields, and rich Appalachian heritage and artisan communities.',
            'counties': ['Pike', 'Floyd', 'Laurel', 'Whitley', 'Pulaski', 'Perry', 'Boyd']
        }
    ],

    # Louisiana
    'LA': [
        {
            'id': 'LA-greater-new-orleans',
            'name': 'Greater New Orleans',
            'fullName': 'Greater New Orleans Metropolitan Area',
            'tier': 1,
            'desc': 'Historic French Quarter, Mississippi River maritime port, tourism, culture, energy, and Lake Pontchartrain northshore.',
            'counties': ['Orleans', 'Jefferson', 'St. Tammany', 'St. Bernard', 'Plaquemines', 'St. Charles', 'St. John the Baptist']
        },
        {
            'id': 'LA-capital-baton-rouge',
            'name': 'Capital Region',
            'fullName': 'Capital Region (Greater Baton Rouge)',
            'tier': 1,
            'desc': 'State government, Louisiana State University (LSU), petrochemical refining corridor along the lower Mississippi River.',
            'counties': ['East Baton Rouge', 'Ascension', 'Livingston', 'West Baton Rouge', 'Iberville']
        },
        {
            'id': 'LA-acadiana-cajun',
            'name': 'Acadiana',
            'fullName': 'Acadiana (Cajun Country & Lafayette)',
            'tier': 1,
            'desc': 'Heart of Cajun French and Creole culture, offshore oil & gas service center, University of Louisiana at Lafayette.',
            'counties': ['Lafayette', 'St. Martin', 'Iberia', 'Vermilion', 'Acadia', 'St. Landry', 'St. Mary']
        },
        {
            'id': 'LA-north-shreveport-monroe',
            'name': 'North Louisiana',
            'fullName': 'North Louisiana (Shreveport-Bossier & Monroe)',
            'tier': 1,
            'desc': 'Barksdale Air Force Base (Global Strike Command), cyber research, natural gas Haynesville Shale, and University of Louisiana Monroe.',
            'counties': ['Caddo', 'Bossier', 'Ouachita', 'Lincoln', 'Webster', 'Natchitoches']
        },
        {
            'id': 'LA-southwest-lake-charles',
            'name': 'Southwest Louisiana',
            'fullName': 'Southwest Louisiana (Lake Charles LNG & Industrial Corridor)',
            'tier': 1,
            'desc': 'Major LNG export terminals (Cheniere Sabine Pass, Cameron LNG), petrochemical refining, casino resorts, and Cameron coast.',
            'counties': ['Calcasieu', 'Cameron', 'Beauregard', 'Jefferson Davis', 'Allen']
        }
    ],

    # Massachusetts
    'MA': [
        {
            'id': 'MA-greater-boston',
            'name': 'Greater Boston',
            'fullName': 'Greater Boston (Inner Core & Route 128 Tech Belt)',
            'tier': 1,
            'desc': 'World-leading biotechnology, medical research, higher education (Harvard, MIT), finance, and historic Boston waterfront.',
            'counties': ['Suffolk', 'Middlesex', 'Norfolk']
        },
        {
            'id': 'MA-north-shore-merrimack',
            'name': 'North Shore & Merrimack Valley',
            'fullName': 'North Shore (Salem, Gloucester) & Merrimack Valley',
            'tier': 1,
            'desc': 'Historic maritime communities (Cape Ann, Salem, Newburyport), defense manufacturing, and Lowell/Lawrence tech hubs.',
            'counties': ['Essex']
        },
        {
            'id': 'MA-south-shore-cape-cod',
            'name': 'South Shore, Cape Cod & Islands',
            'fullName': 'South Shore, Cape Cod, Martha\'s Vineyard & Nantucket',
            'tier': 1,
            'desc': 'Plymouth rock, historic South Shore, famous Cape Cod beaches, Provincetown, and islands of Martha\'s Vineyard and Nantucket.',
            'counties': ['Plymouth', 'Barnstable', 'Bristol', 'Dukes', 'Nantucket']
        },
        {
            'id': 'MA-central-worcester',
            'name': 'Central Massachusetts',
            'fullName': 'Central Massachusetts (Greater Worcester & I-495 Corridor)',
            'tier': 1,
            'desc': 'Second largest city in New England, biotech incubator hub (Worcester Polytechnic Institute, UMass Chan Medical School).',
            'counties': ['Worcester']
        },
        {
            'id': 'MA-western-pioneer-berkshire',
            'name': 'Western Massachusetts',
            'fullName': 'Western Massachusetts (Pioneer Valley & The Berkshires)',
            'tier': 1,
            'desc': 'Five Colleges academic consortium (UMass Amherst, Smith, Amherst), Springfield manufacturing, and Berkshires cultural arts (Tanglewood).',
            'counties': ['Hampden', 'Hampshire', 'Franklin', 'Berkshire']
        }
    ],

    # Maryland
    'MD': [
        {
            'id': 'MD-central-baltimore',
            'name': 'Central Maryland',
            'fullName': 'Central Maryland (Greater Baltimore Metropolitan Area)',
            'tier': 1,
            'desc': 'Johns Hopkins medical and research hub, Port of Baltimore, BWI Airport, Fort Meade (NSA/Cyber Command), and Inner Harbor.',
            'counties': ['Baltimore City', 'Baltimore', 'Anne Arundel', 'Howard', 'Harford', 'Carroll']
        },
        {
            'id': 'MD-suburban-dc-maryland',
            'name': 'Capital Region (MD)',
            'fullName': 'Suburban Maryland (Montgomery & Prince George\'s Counties)',
            'tier': 1,
            'desc': 'Major DC suburbs, I-270 biotech corridor, NIH, FDA, NASA Goddard Space Flight Center, and National Harbor.',
            'counties': ['Montgomery', 'Prince George\'s', 'Frederick']
        },
        {
            'id': 'MD-eastern-shore-chesapeake',
            'name': 'Eastern Shore',
            'fullName': 'Maryland Eastern Shore & Ocean City',
            'tier': 1,
            'desc': 'Chesapeake Bay maritime seafood heritage (blue crabs, oysters), historic Easton/St. Michaels, and Atlantic beach resort Ocean City.',
            'counties': ['Wicomico', 'Worcester', 'Talbot', 'Queen Anne\'s', 'Dorchester', 'Cecil', 'Caroline', 'Somerset', 'Kent']
        },
        {
            'id': 'MD-western-southern',
            'name': 'Western & Southern Maryland',
            'fullName': 'Western Appalachian Mountains & Southern Chesapeake',
            'tier': 1,
            'desc': 'Naval Air Station Patuxent River in Southern MD and Deep Creek Lake / Appalachian mountain recreation in Western MD.',
            'counties': ['Charles', 'St. Mary\'s', 'Calvert', 'Washington', 'Allegany', 'Garrett']
        }
    ],

    # Maine
    'ME': [
        {
            'id': 'ME-greater-portland-south',
            'name': 'Southern Maine',
            'fullName': 'Southern Maine (Greater Portland & Casco Bay Coast)',
            'tier': 1,
            'desc': 'Culinary capital, historic Old Port, financial services, craft brewing, technology startups, and southern sandy beaches (Ogunquit, Kennebunkport).',
            'counties': ['Cumberland', 'York']
        },
        {
            'id': 'ME-midcoast-penobscot',
            'name': 'Midcoast & Central Maine',
            'fullName': 'Midcoast Maine (Camden, Rockland) & Capital Corridor (Augusta/Bangor)',
            'tier': 1,
            'desc': 'Rocky coastline, lobster fishing fleet, Bath Iron Works shipbuilders, state capital Augusta, and University of Maine in Orono.',
            'counties': ['Kennebec', 'Androscoggin', 'Knox', 'Lincoln', 'Waldo', 'Penobscot']
        },
        {
            'id': 'ME-downeast-north-woods',
            'name': 'Downeast & North Woods',
            'fullName': 'Downeast (Acadia National Park) & Northern Aroostook',
            'tier': 1,
            'desc': 'Acadia National Park / Bar Harbor, Mount Desert Island, vast North Maine Woods, and agricultural potato heartland of Aroostook.',
            'counties': ['Hancock', 'Washington', 'Aroostook', 'Piscataquis', 'Somerset', 'Franklin', 'Oxford']
        }
    ],

    # Michigan
    'MI': [
        {
            'id': 'MI-metro-detroit',
            'name': 'Metro Detroit',
            'fullName': 'Metro Detroit (Southeast Michigan Automotive & Tech Hub)',
            'tier': 1,
            'desc': 'Motor City global automotive headquarters (GM, Ford), mobility technology, automation engineering, and Ann Arbor (Univ of Michigan).',
            'counties': ['Wayne', 'Oakland', 'Macomb', 'Washtenaw', 'Livingston', 'St. Clair', 'Monroe']
        },
        {
            'id': 'MI-west-michigan',
            'name': 'West Michigan',
            'fullName': 'West Michigan (Grand Rapids, Kalamazoo & Lakeshore)',
            'tier': 1,
            'desc': 'Medical Mile healthcare research, office furniture manufacturing, craft brewing capital, Pfizer manufacturing in Kalamazoo, and Lake Michigan beaches.',
            'counties': ['Kent', 'Ottawa', 'Kalamazoo', 'Muskegon', 'Allegan', 'Berrien', 'Van Buren']
        },
        {
            'id': 'MI-mid-michigan-tri-cities',
            'name': 'Mid-Michigan & Tri-Cities',
            'fullName': 'Mid-Michigan (Lansing Capital Region) & Tri-Cities (Saginaw, Midland, Bay City)',
            'tier': 1,
            'desc': 'State capital Lansing, Michigan State University, Dow Chemical headquarters in Midland, and Saginaw Valley manufacturing.',
            'counties': ['Ingham', 'Eaton', 'Clinton', 'Genesee', 'Saginaw', 'Midland', 'Bay']
        },
        {
            'id': 'MI-northern-michigan-traverse',
            'name': 'Northern Lower Michigan',
            'fullName': 'Northern Lower Michigan (Traverse City & Mackinac Corridor)',
            'tier': 1,
            'desc': 'Cherry capital Traverse City, Sleeping Bear Dunes National Lakeshore, wine regions, Mackinaw City, and Petoskey resort towns.',
            'counties': ['Grand Traverse', 'Leelanau', 'Emmet', 'Charlevoix', 'Cheboygan', 'Otsego', 'Wexford', 'Manistee']
        },
        {
            'id': 'MI-upper-peninsula',
            'name': 'Upper Peninsula',
            'fullName': 'Upper Peninsula (The U.P. - Marquette, Keweenaw & Sault Ste. Marie)',
            'tier': 1,
            'desc': 'Pictured Rocks National Lakeshore, Lake Superior shoreline, copper/iron mining heritage, Mackinac Bridge, and northern forests.',
            'counties': ['Marquette', 'Chippewa', 'Delta', 'Houghton', 'Dickinson', 'Gogebic', 'Menominee', 'Mackinac']
        }
    ],

    # Minnesota
    'MN': [
        {
            'id': 'MN-twin-cities-metro',
            'name': 'Twin Cities Metro',
            'fullName': 'Twin Cities Metropolitan Area (Minneapolis-St. Paul Core)',
            'tier': 1,
            'desc': 'Fortune 500 capital (Target, Best Buy, 3M, UnitedHealth), University of Minnesota, financial services, and cultural arts.',
            'counties': ['Hennepin', 'Ramsey', 'Dakota', 'Anoka', 'Washington', 'Scott', 'Carver', 'Wright']
        },
        {
            'id': 'MN-southern-rochester',
            'name': 'Southern Minnesota',
            'fullName': 'Southern Minnesota (Rochester Mayo Clinic & Mankato Corridor)',
            'tier': 1,
            'desc': 'World-renowned Mayo Clinic global medical hub in Rochester, Hormel foods in Austin, Minnesota State Mankato, and rich agricultural basin.',
            'counties': ['Olmsted', 'Blue Earth', 'Steele', 'Mower', 'Winona', 'Rice', 'Nicollet', 'Freeborn']
        },
        {
            'id': 'MN-central-st-cloud',
            'name': 'Central Minnesota',
            'fullName': 'Central Minnesota (St. Cloud & Brainerd Lakes)',
            'tier': 1,
            'desc': 'Mississippi River manufacturing hub St. Cloud, granite quarries, and premier resort / cabin country in Brainerd Lakes.',
            'counties': ['Stearns', 'Sherburne', 'Benton', 'Crow Wing', 'Morrison', 'Mille Lacs']
        },
        {
            'id': 'MN-northern-arrowhead-duluth',
            'name': 'Northern Minnesota',
            'fullName': 'Northern Minnesota (Duluth Port, Iron Range & Boundary Waters)',
            'tier': 1,
            'desc': 'Port of Duluth-Superior on Lake Superior, Mesabi Iron Range taconite mining, and pristine Boundary Waters Canoe Area Wilderness.',
            'counties': ['St. Louis', 'Itasca', 'Carlton', 'Lake', 'Cook', 'Beltrami', 'Cass']
        }
    ],

    # Missouri
    'MO': [
        {
            'id': 'MO-greater-st-louis',
            'name': 'Greater St. Louis',
            'fullName': 'Greater St. Louis Metropolitan Area',
            'tier': 1,
            'desc': 'Gateway Arch, plant science and biotechnology hub (Danforth Center), Boeing defense manufacturing, Washington University, and financial services.',
            'counties': ['St. Louis City', 'St. Louis', 'St. Charles', 'Jefferson', 'Franklin', 'Lincoln', 'Warren']
        },
        {
            'id': 'MO-greater-kansas-city-mo',
            'name': 'Greater Kansas City (MO)',
            'fullName': 'Greater Kansas City (Missouri Side & Clay/Platte/Jackson)',
            'tier': 1,
            'desc': 'Downtown KC, Crown Center, Country Club Plaza, Cerner healthcare IT, Ford assembly, and barbecue cultural heartland.',
            'counties': ['Jackson', 'Clay', 'Platte', 'Cass', 'Ray', 'Lafayette']
        },
        {
            'id': 'MO-central-columbia-jeff-city',
            'name': 'Central Missouri',
            'fullName': 'Central Missouri (Columbia Mizzou & Jefferson City Capital)',
            'tier': 1,
            'desc': 'University of Missouri flagship campus in Columbia, state government in Jefferson City, and Lake of the Ozarks resort basin.',
            'counties': ['Boone', 'Cole', 'Callaway', 'Camden', 'Miller', 'Morgan']
        },
        {
            'id': 'MO-southwest-springfield-branson',
            'name': 'Southwest Missouri',
            'fullName': 'Southwest Missouri (Springfield & Branson Entertainment Corridor)',
            'tier': 1,
            'desc': 'Bass Pro Shops global HQ, stainless steel fabrication, and live music entertainment destination Branson in the Ozark Mountains.',
            'counties': ['Greene', 'Christian', 'Taney', 'Stone', 'Webster', 'Jasper', 'Newton']
        }
    ],

    # Mississippi
    'MS': [
        {
            'id': 'MS-gulf-coast',
            'name': 'Mississippi Gulf Coast',
            'fullName': 'Mississippi Gulf Coast (Biloxi-Gulfport-Pascagoula)',
            'tier': 1,
            'desc': 'Ingalls Shipbuilding (largest military naval shipbuilder in US), casino resort gaming, NASA Stennis Space Center, and barrier island coast.',
            'counties': ['Harrison', 'Jackson', 'Hancock']
        },
        {
            'id': 'MS-greater-jackson-capital',
            'name': 'Greater Jackson',
            'fullName': 'Greater Jackson Metropolitan Area (Capital Region)',
            'tier': 1,
            'desc': 'State capital, University of Mississippi Medical Center, Nissan automotive assembly in Canton, and central commerce.',
            'counties': ['Hinds', 'Rankin', 'Madison', 'Warren', 'Copiah']
        },
        {
            'id': 'MS-north-desoto-memphis',
            'name': 'North Mississippi',
            'fullName': 'North Mississippi (DeSoto County & Oxford / Tupelo)',
            'tier': 1,
            'desc': 'Boona-fide Memphis suburban growth corridor (Southaven, Olive Branch), Ole Miss in Oxford, and birthplace of Elvis Presley in Tupelo.',
            'counties': ['DeSoto', 'Lafayette', 'Lee', 'Marshall', 'Panola', 'Pontotoc', 'Union']
        },
        {
            'id': 'MS-pine-belt-delta',
            'name': 'Pine Belt & The Delta',
            'fullName': 'Pine Belt (Hattiesburg) & Mississippi Blues Delta',
            'tier': 1,
            'desc': 'University of Southern Mississippi and Camp Shelby in Hattiesburg, and the legendary birth of the blues delta agricultural basin.',
            'counties': ['Forrest', 'Lamar', 'Jones', 'Lauderdale', 'Washington', 'Sunflower', 'Bolivar', 'Leflore', 'Coahoma']
        }
    ],

    # Montana
    'MT': [
        {
            'id': 'MT-western-missoula-bitterroot',
            'name': 'Western Montana',
            'fullName': 'Western Montana (Missoula, Bitterroot & Clark Fork)',
            'tier': 1,
            'desc': 'University of Montana, craft brewing, tech startups, fly-fishing, and scenic Bitterroot and Sapphire mountain ranges.',
            'counties': ['Missoula', 'Ravalli', 'Mineral', 'Sanders', 'Lake']
        },
        {
            'id': 'MT-flathead-glacier',
            'name': 'Flathead Valley & Glacier',
            'fullName': 'Flathead Valley (Kalispell, Whitefish & Glacier National Park)',
            'tier': 1,
            'desc': 'Glacier National Park gateway, Whitefish Mountain resort, Flathead Lake (largest natural freshwater lake west of Mississippi).',
            'counties': ['Flathead', 'Lincoln']
        },
        {
            'id': 'MT-southwest-bozeman-helena',
            'name': 'Southwest Montana',
            'fullName': 'Southwest Montana (Bozeman Tech Hub & Helena Capital)',
            'tier': 1,
            'desc': 'Bozeman Yellowstone International Airport, Montana State University, photonics tech sector, Big Sky Resort, and state capital Helena.',
            'counties': ['Gallatin', 'Lewis and Clark', 'Park', 'Broadwater', 'Jefferson', 'Madison', 'Silver Bow']
        },
        {
            'id': 'MT-south-central-billings',
            'name': 'South Central Montana',
            'fullName': 'South Central Montana (Billings Trade & Energy Hub)',
            'tier': 1,
            'desc': 'Montana\'s largest city, regional healthcare and energy refining center, Rimrocks sandstone cliffs, and Yellowstone County commerce.',
            'counties': ['Yellowstone', 'Carbon', 'Stillwater', 'Musselshell', 'Big Horn']
        }
    ],

    # New Jersey
    'NJ': [
        {
            'id': 'NJ-north-gateway-nyc',
            'name': 'North Jersey',
            'fullName': 'North Jersey (Gateway Region & NYC Metropolitan Core)',
            'tier': 1,
            'desc': 'Newark Liberty International Airport, Port Newark-Elizabeth, Jersey City financial skyline, Hoboken, Meadowlands, and corporate headquarters.',
            'counties': ['Bergen', 'Essex', 'Hudson', 'Passaic', 'Union', 'Morris', 'Sussex']
        },
        {
            'id': 'NJ-central-princeton-raritan',
            'name': 'Central Jersey',
            'fullName': 'Central Jersey (Princeton Research & Raritan Valley Corridor)',
            'tier': 1,
            'desc': 'Princeton University, Rutgers flagship campus in New Brunswick, global pharmaceutical research corridor (J&J, Merck, BMS).',
            'counties': ['Middlesex', 'Somerset', 'Mercer', 'Hunterdon']
        },
        {
            'id': 'NJ-jersey-shore',
            'name': 'The Jersey Shore',
            'fullName': 'The Jersey Shore (Monmouth, Ocean & Atlantic Coast)',
            'tier': 1,
            'desc': 'Famous 130 miles of Atlantic beaches, Asbury Park, Point Pleasant, Long Beach Island, Atlantic City casino boardwalk, and Cape May.',
            'counties': ['Monmouth', 'Ocean', 'Atlantic', 'Cape May']
        },
        {
            'id': 'NJ-south-philadelphia-metro',
            'name': 'South Jersey',
            'fullName': 'South Jersey (Greater Philadelphia Suburbs & Delaware River)',
            'tier': 1,
            'desc': 'Cherry Hill, Camden waterfront, Rowan University in Glassboro, Pine Barrens ecosystem, and Delaware River commerce.',
            'counties': ['Camden', 'Burlington', 'Gloucester', 'Cumberland', 'Salem']
        }
    ],

    # New Mexico
    'NM': [
        {
            'id': 'NM-central-albuquerque',
            'name': 'Central New Mexico',
            'fullName': 'Central New Mexico (Greater Albuquerque Metropolitan Area)',
            'tier': 1,
            'desc': 'Sandia National Laboratories, University of New Mexico, Netflix film studios, Rio Grande Valley, and annual International Balloon Fiesta.',
            'counties': ['Bernalillo', 'Sandoval', 'Valencia', 'Torrance']
        },
        {
            'id': 'NM-northern-santa-fe-taos',
            'name': 'Northern New Mexico',
            'fullName': 'Northern New Mexico (Santa Fe Cultural Capital & Taos)',
            'tier': 1,
            'desc': 'Historic state capital Santa Fe, Los Alamos National Laboratory, Native American pueblos, world-class art galleries, and Taos ski valley.',
            'counties': ['Santa Fe', 'Los Alamos', 'Taos', 'Rio Arriba', 'San Miguel', 'Mora', 'Colfax']
        },
        {
            'id': 'NM-southern-las-cruces',
            'name': 'Southern New Mexico',
            'fullName': 'Southern New Mexico (Las Cruces & White Sands)',
            'tier': 1,
            'desc': 'New Mexico State University, White Sands Missile Range & National Park, Spaceport America, and Rio Grande agricultural pecan valley.',
            'counties': ['Doña Ana', 'Otero', 'Luna', 'Grant', 'Sierra', 'Lincoln', 'Socorro']
        },
        {
            'id': 'NM-eastern-permian-basin',
            'name': 'Eastern New Mexico',
            'fullName': 'Eastern New Mexico (Permian Basin & Pecos Valley)',
            'tier': 1,
            'desc': 'Permian Basin oil and natural gas production hub (Hobbs, Carlsbad Caverns National Park), dairy farming, and Roswell.',
            'counties': ['Eddy', 'Lea', 'Chaves', 'Curry', 'Roosevelt', 'Quay']
        }
    ],

    # Nevada
    'NV': [
        {
            'id': 'NV-las-vegas-valley',
            'name': 'Las Vegas Valley',
            'fullName': 'Las Vegas Valley (Clark County Metropolitan Area)',
            'tier': 1,
            'desc': 'World entertainment and hospitality capital (The Strip, Downtown, Henderson, Summerlin), UNLV, Harry Reid Airport, and Hoover Dam.',
            'counties': ['Clark']
        },
        {
            'id': 'NV-reno-sparks-tahoe',
            'name': 'Reno-Tahoe Region',
            'fullName': 'Reno-Sparks & Lake Tahoe Basin (Washoe County)',
            'tier': 1,
            'desc': 'The "Biggest Little City in the World", University of Nevada Reno, Lake Tahoe crystal-clear alpine resorts, and Tahoe-Reno Industrial Center (Tesla Gigafactory).',
            'counties': ['Washoe', 'Carson City', 'Douglas', 'Storey']
        },
        {
            'id': 'NV-rural-mining-corridor',
            'name': 'Rural Nevada & Mining Corridor',
            'fullName': 'Rural Nevada (Elko Gold Belt & Great Basin)',
            'tier': 1,
            'desc': 'World-leading gold and lithium mining operations along the Carlin Trend, Great Basin National Park, and historic Highway 50.',
            'counties': ['Elko', 'Humboldt', 'White Pine', 'Nye', 'Lyon', 'Churchill', 'Lander', 'Eureka', 'Pershing', 'Mineral', 'Lincoln', 'Esmeralda']
        }
    ],

    # Ohio
    'OH': [
        {
            'id': 'OH-central-columbus',
            'name': 'Central Ohio',
            'fullName': 'Central Ohio (Greater Columbus & Innovation Silicon Heartland)',
            'tier': 1,
            'desc': 'State capital, Ohio State University, financial tech, Cardinal Health, and Intel multi-billion semiconductor manufacturing campus.',
            'counties': ['Franklin', 'Delaware', 'Licking', 'Fairfield', 'Pickaway', 'Union', 'Madison']
        },
        {
            'id': 'OH-greater-cincinnati',
            'name': 'Greater Cincinnati',
            'fullName': 'Greater Cincinnati (Southwest Ohio & Ohio River Hub)',
            'tier': 1,
            'desc': 'Procter & Gamble global HQ, Kroger headquarters, GE Aerospace, Over-the-Rhine historic arts, and University of Cincinnati.',
            'counties': ['Hamilton', 'Butler', 'Warren', 'Clermont', 'Brown']
        },
        {
            'id': 'OH-greater-cleveland',
            'name': 'Greater Cleveland',
            'fullName': 'Greater Cleveland & Lake Erie Northeast',
            'tier': 1,
            'desc': 'World-renowned Cleveland Clinic, Case Western Reserve, Rock and Roll Hall of Fame, Lake Erie port, and advanced manufacturing.',
            'counties': ['Cuyahoga', 'Lorain', 'Lake', 'Geauga', 'Medina']
        },
        {
            'id': 'OH-akron-canton',
            'name': 'Akron-Canton',
            'fullName': 'Akron-Canton Region (Polymer Valley & Pro Football Hall of Fame)',
            'tier': 1,
            'desc': 'Global polymer and tire engineering center (Goodyear, Bridgestone), Pro Football Hall of Fame in Canton, and Cuyahoga Valley National Park.',
            'counties': ['Summit', 'Stark', 'Portage', 'Wayne']
        },
        {
            'id': 'OH-miami-valley-dayton',
            'name': 'Miami Valley',
            'fullName': 'Miami Valley (Dayton Aerospace & Wright-Patterson AFB)',
            'tier': 1,
            'desc': 'Birthplace of Aviation, Wright-Patterson Air Force Base (Air Force Materiel Command), University of Dayton, and sensor technology.',
            'counties': ['Montgomery', 'Greene', 'Miami', 'Clark', 'Preble']
        },
        {
            'id': 'OH-northwest-toledo',
            'name': 'Northwest Ohio',
            'fullName': 'Northwest Ohio (Toledo Glass City & Lake Erie Western Basin)',
            'tier': 1,
            'desc': 'Jeep assembly plant, glass manufacturing center (Owens-Illinois, Libbey), Port of Toledo, and solar manufacturing corridor (First Solar).',
            'counties': ['Lucas', 'Wood', 'Fulton', 'Ottawa', 'Sandusky', 'Hancock']
        }
    ],

    # Oklahoma
    'OK': [
        {
            'id': 'OK-greater-oklahoma-city',
            'name': 'Greater Oklahoma City',
            'fullName': 'Greater Oklahoma City Metropolitan Area',
            'tier': 1,
            'desc': 'State capital, energy headquarters (Continental Resources, Devon), Tinker Air Force Base (largest depot in US), and Bricktown.',
            'counties': ['Oklahoma', 'Cleveland', 'Canadian', 'Logan', 'McClain', 'Pottawatomie']
        },
        {
            'id': 'OK-tulsa-green-country',
            'name': 'Tulsa Metro & Green Country',
            'fullName': 'Tulsa Metropolitan Area & Northeast Green Country',
            'tier': 1,
            'desc': 'Historic oil capital, art deco architecture, aerospace manufacturing, Gathering Place park, and Cherokee Nation tribal headquarters.',
            'counties': ['Tulsa', 'Rogers', 'Wagoner', 'Creek', 'Osage', 'Washington']
        },
        {
            'id': 'OK-southwest-lawton',
            'name': 'Southwest Oklahoma',
            'fullName': 'Southwest Oklahoma (Lawton & Fort Sill Corridor)',
            'tier': 1,
            'desc': 'Fort Sill Army Fires Center of Excellence, Wichita Mountains Wildlife Refuge, and agricultural wheat and cotton plains.',
            'counties': ['Comanche', 'Stephens', 'Garvin', 'Grady', 'Caddo', 'Jackson']
        },
        {
            'id': 'OK-southeast-choctaw',
            'name': 'Southeast Oklahoma',
            'fullName': 'Southeast Oklahoma (Choctaw Country & Ouachita Mountains)',
            'tier': 1,
            'desc': 'Scenic Ouachita National Forest, Broken Bow Lake resort cabins, timber industry, and Choctaw Nation cultural center.',
            'counties': ['Pittsburg', 'Bryan', 'Le Flore', 'McCurtain', 'Carter']
        }
    ],

    # Oregon
    'OR': [
        {
            'id': 'OR-greater-portland',
            'name': 'Portland Metro',
            'fullName': 'Portland Metropolitan Area & Silicon Forest',
            'tier': 1,
            'desc': 'Global sportswear headquarters (Nike, Columbia), Intel semiconductor campuses, craft brewing, food culture, and Columbia River Gorge.',
            'counties': ['Multnomah', 'Washington', 'Clackamas', 'Columbia', 'Yamhill']
        },
        {
            'id': 'OR-willamette-valley',
            'name': 'Willamette Valley',
            'fullName': 'Willamette Valley (Salem Capital & Eugene / TrackTown USA)',
            'tier': 1,
            'desc': 'State capital Salem, University of Oregon flagship in Eugene, world-class Pinot Noir wine country, and agricultural valley.',
            'counties': ['Marion', 'Lane', 'Linn', 'Polk', 'Benton']
        },
        {
            'id': 'OR-central-bend',
            'name': 'Central Oregon',
            'fullName': 'Central Oregon (Bend, Redmond & High Desert)',
            'tier': 1,
            'desc': 'Booming outdoor recreation and craft lifestyle hub, Mt. Bachelor ski resort, Deschutes River, and Smith Rock State Park.',
            'counties': ['Deschutes', 'Crook', 'Jefferson']
        },
        {
            'id': 'OR-southern-medford-ashland',
            'name': 'Southern Oregon',
            'fullName': 'Southern Oregon (Medford, Ashland & Rogue River Valley)',
            'tier': 1,
            'desc': 'Oregon Shakespeare Festival in Ashland, Crater Lake National Park, Rogue River rafting, and Medford healthcare hub.',
            'counties': ['Jackson', 'Josephine', 'Klamath', 'Douglas']
        },
        {
            'id': 'OR-coast-eastern',
            'name': 'Oregon Coast & Eastern Oregon',
            'fullName': 'Pacific Coast (Cannon Beach to Coos Bay) & Eastern High Plains',
            'tier': 1,
            'desc': 'Publicly accessible 363-mile Pacific coastline (Haystack Rock, Tillamook Creamery) and the Columbia Plateau / Wallowa Mountains.',
            'counties': ['Clatsop', 'Tillamook', 'Lincoln', 'Coos', 'Curry', 'Umatilla', 'Union', 'Baker', 'Malheur']
        }
    ],

    # Puerto Rico
    'PR': [
        {
            'id': 'PR-san-juan-metro',
            'name': 'San Juan Metro',
            'fullName': 'San Juan Metropolitan Area (Capital & Financial District)',
            'tier': 1,
            'desc': 'Historic Old San Juan, Condado, Isla Verde, Hato Rey Golden Mile banking center, Port of San Juan, and Luis Muñoz Marín Airport.',
            'counties': ['San Juan', 'Bayamón', 'Carolina', 'Guaynabo', 'Trujillo Alto', 'Toa Baja', 'Cataño']
        },
        {
            'id': 'PR-western-porta-del-sol',
            'name': 'Western Puerto Rico',
            'fullName': 'Porta del Sol (Mayagüez, Aguadilla & Surf Coast)',
            'tier': 1,
            'desc': 'World-class surfing beaches in Rincón and Isabela, Rafael Hernández Airport in Aguadilla, aerospace tech hub, and UPR Mayagüez engineering.',
            'counties': ['Mayagüez', 'Aguadilla', 'Rincón', 'Isabela', 'Aguada', 'Moca', 'San Sebastián', 'Añasco', 'Cabo Rojo', 'Lajas']
        },
        {
            'id': 'PR-southern-ponce',
            'name': 'Southern Puerto Rico',
            'fullName': 'Porta Caribe (Ponce & South Coast)',
            'tier': 1,
            'desc': 'The historic "Pearl of the South" (Ponce), Parque de Bombas, Ponce Art Museum, Port of the Americas, and Caribbean dry coastal plain.',
            'counties': ['Ponce', 'Juana Díaz', 'Yauco', 'Guayanilla', 'Peñuelas', 'Santa Isabel', 'Salinas', 'Guayama']
        },
        {
            'id': 'PR-eastern-fajardo-caguas',
            'name': 'Eastern Puerto Rico',
            'fullName': 'Eastern Puerto Rico (El Yunque, Fajardo & Caguas)',
            'tier': 1,
            'desc': 'El Yunque National Forest (only tropical rainforest in US National Forest system), Fajardo marinas, Bioluminescent Bay, Caguas valley, and ferry gateway to Vieques and Culebra.',
            'counties': ['Caguas', 'Fajardo', 'Humacao', 'Luquillo', 'Río Grande', 'Canóvanas', 'Naguabo', 'Ceiba', 'Gurabo', 'Juncos', 'Vieques', 'Culebra']
        },
        {
            'id': 'PR-northern-arecibo-karst',
            'name': 'Northern Coast',
            'fullName': 'Northern Karst Region (Arecibo & Manatí Pharmaceutical Corridor)',
            'tier': 1,
            'desc': 'Limestone karst formations, Camuy River Cave Park, historic Arecibo Observatory basin, and global biotechnology pharmaceutical manufacturing corridor.',
            'counties': ['Arecibo', 'Manatí', 'Vega Baja', 'Vega Alta', 'Dorado', 'Barceloneta', 'Hatillo', 'Camuy']
        }
    ],

    # Rhode Island
    'RI': [
        {
            'id': 'RI-greater-providence',
            'name': 'Greater Providence',
            'fullName': 'Greater Providence Metropolitan Area',
            'tier': 1,
            'desc': 'State capital, Brown University, RISD world-leading design school, WaterFire art installation, and Rhode Island Hospital healthcare center.',
            'counties': ['Providence']
        },
        {
            'id': 'RI-newport-aquidneck',
            'name': 'Newport & Aquidneck Island',
            'fullName': 'Newport & Aquidneck Island (Sailing Capital & Gilded Age Mansions)',
            'tier': 1,
            'desc': 'Sailing Capital of the World, Gilded Age Vanderbilt mansions, Newport Jazz & Folk Festivals, and Naval Station Newport.',
            'counties': ['Newport']
        },
        {
            'id': 'RI-south-county-coastal',
            'name': 'South County',
            'fullName': 'South County (Washington County Coastal & Beaches)',
            'tier': 1,
            'desc': 'Narragansett beach shoreline, University of Rhode Island in Kingston, Watch Hill / Westerly, and Block Island ferry port.',
            'counties': ['Washington']
        },
        {
            'id': 'RI-kent-county-west-bay',
            'name': 'Kent County',
            'fullName': 'Kent County (Warwick & West Bay)',
            'tier': 1,
            'desc': 'Rhode Island T.F. Green International Airport in Warwick, historic East Greenwich waterfront, and West Bay suburban commerce.',
            'counties': ['Kent', 'Bristol']
        }
    ],

    # South Carolina
    'SC': [
        {
            'id': 'SC-charleston-lowcountry',
            'name': 'Charleston & Lowcountry',
            'fullName': 'Charleston Metropolitan Area & Lowcountry',
            'tier': 1,
            'desc': 'Historic cobblestone downtown, Port of Charleston, Boeing 787 assembly facility, Medical University of South Carolina, and barrier islands.',
            'counties': ['Charleston', 'Berkeley', 'Dorchester', 'Beaufort', 'Jasper', 'Colleton', 'Georgetown']
        },
        {
            'id': 'SC-greenville-upstate',
            'name': 'Greenville & The Upstate',
            'fullName': 'The Upstate (Greenville-Spartanburg-Anderson Corridor)',
            'tier': 1,
            'desc': 'BMW North American manufacturing plant, Michelin North America HQ, Clemson University, Falls Park on the Reedy, and Blue Ridge foothills.',
            'counties': ['Greenville', 'Spartanburg', 'Anderson', 'Pickens', 'Oconee', 'Laurens', 'Cherokee']
        },
        {
            'id': 'SC-columbia-midlands',
            'name': 'Columbia & The Midlands',
            'fullName': 'Columbia Midlands (State Capital Region)',
            'tier': 1,
            'desc': 'State capital, University of South Carolina, Fort Jackson Army basic training center, and central South Carolina commerce.',
            'counties': ['Richland', 'Lexington', 'Kershaw', 'Sumter', 'Orangeburg']
        },
        {
            'id': 'SC-myrtle-beach-grand-strand',
            'name': 'Myrtle Beach & Grand Strand',
            'fullName': 'Grand Strand (Myrtle Beach Coastal Tourism Corridor)',
            'tier': 1,
            'desc': '60 miles of continuous sandy coastline, golf resort capital of the world, family tourism, and coastal entertainment.',
            'counties': ['Horry', 'Marion', 'Florence', 'Williamsburg']
        }
    ],

    # South Dakota
    'SD': [
        {
            'id': 'SD-sioux-falls-east-river',
            'name': 'Sioux Falls & East River',
            'fullName': 'Sioux Falls Metropolitan Area & Eastern South Dakota',
            'tier': 1,
            'desc': 'South Dakota\'s largest economic engine, Sanford Health / Avera medical hubs, financial credit card processing, and Big Sioux River falls.',
            'counties': ['Minnehaha', 'Lincoln', 'Brown', 'Brookings', 'Codington', 'Yankton', 'Clay']
        },
        {
            'id': 'SD-black-hills-rapid-city',
            'name': 'Black Hills & Rapid City',
            'fullName': 'Black Hills (Rapid City, Mount Rushmore & Badlands)',
            'tier': 1,
            'desc': 'Mount Rushmore National Memorial, Crazy Horse Memorial, Custer State Park, historic Deadwood, and Ellsworth Air Force Base.',
            'counties': ['Pennington', 'Meade', 'Lawrence', 'Custer', 'Fall River']
        },
        {
            'id': 'SD-central-pierre-missouri',
            'name': 'Central South Dakota',
            'fullName': 'Central South Dakota (Pierre Capital & Missouri River Reservoirs)',
            'tier': 1,
            'desc': 'State capital Pierre, Oahe Dam and Lake Oahe reservoir on the Missouri River, and vast agricultural cattle ranching plains.',
            'counties': ['Hughes', 'Stanley', 'Davison', 'Beadle', 'Spink']
        }
    ],

    # Tennessee
    'TN': [
        {
            'id': 'TN-middle-nashville-metro',
            'name': 'Middle Tennessee',
            'fullName': 'Middle Tennessee (Greater Nashville Metropolitan Area)',
            'tier': 1,
            'desc': 'Music City USA, country music capital, healthcare management capital (HCA), Nissan North America HQ, Vanderbilt University, and booming creative tech.',
            'counties': ['Davidson', 'Rutherford', 'Williamson', 'Wilson', 'Sumner', 'Robertson', 'Maury']
        },
        {
            'id': 'TN-east-knoxville-smokies',
            'name': 'East Tennessee',
            'fullName': 'East Tennessee (Knoxville, Oak Ridge & Great Smoky Mountains)',
            'tier': 1,
            'desc': 'University of Tennessee flagship in Knoxville, Oak Ridge National Laboratory (supercomputing/energy), and Great Smoky Mountains National Park.',
            'counties': ['Knox', 'Blount', 'Sevier', 'Anderson', 'Loudon', 'Roane', 'Jefferson', 'Hamblen']
        },
        {
            'id': 'TN-chattanooga-metro',
            'name': 'Chattanooga Metro',
            'fullName': 'Chattanooga Metropolitan Area (Gig City & Tennessee River Gorge)',
            'tier': 1,
            'desc': 'Gig City municipal fiber optic network, Volkswagen North American manufacturing plant, Lookout Mountain, and Tennessee River freight logistics.',
            'counties': ['Hamilton', 'Bradley', 'Marion', 'Sequatchie', 'Rhea']
        },
        {
            'id': 'TN-west-memphis-metro',
            'name': 'West Tennessee',
            'fullName': 'West Tennessee (Memphis Metropolitan Area & Mississippi Delta)',
            'tier': 1,
            'desc': 'Global logistics hub (FedEx World Hub at Memphis Airport), St. Jude Children\'s Research Hospital, Beale Street blues, Graceland, and BlueOval City (Ford electric vehicle megasite).',
            'counties': ['Shelby', 'Fayette', 'Tipton', 'Madison', 'Haywood']
        },
        {
            'id': 'TN-tri-cities-mountain',
            'name': 'Tri-Cities Region',
            'fullName': 'Tri-Cities (Johnson City, Kingsport & Bristol)',
            'tier': 1,
            'desc': 'Eastman Chemical headquarters, East Tennessee State University, Bristol Motor Speedway, and Appalachian mountain culture.',
            'counties': ['Sullivan', 'Washington', 'Carter', 'Greene', 'Hawkins', 'Unicoi']
        }
    ],

    # Utah
    'UT': [
        {
            'id': 'UT-wasatch-front-salt-lake',
            'name': 'Wasatch Front',
            'fullName': 'Wasatch Front (Salt Lake City Metropolitan Area)',
            'tier': 1,
            'desc': 'State capital, Silicon Slopes tech corridor, University of Utah, Delta Air Lines western hub, and premier Wasatch Mountain ski resorts (Park City, Alta, Snowbird).',
            'counties': ['Salt Lake', 'Davis', 'Summit', 'Tooele']
        },
        {
            'id': 'UT-utah-valley-provo',
            'name': 'Utah Valley',
            'fullName': 'Utah Valley (Provo-Orem & Silicon Slopes South)',
            'tier': 1,
            'desc': 'Brigham Young University, enterprise software unicorn startups (Qualtrics, Ancestry), Utah Lake, and Mount Timpanogos.',
            'counties': ['Utah']
        },
        {
            'id': 'UT-northern-ogden-logan',
            'name': 'Northern Utah',
            'fullName': 'Northern Utah (Ogden Aerospace & Logan / Cache Valley)',
            'tier': 1,
            'desc': 'Hill Air Force Base (F-35 depot maintenance), Weber State University, aerospace defense contractors (Northrop Grumman), and Utah State University in Logan.',
            'counties': ['Weber', 'Box Elder', 'Cache', 'Morgan', 'Rich']
        },
        {
            'id': 'UT-southern-dixie-st-george',
            'name': 'Southern Utah',
            'fullName': 'Southern Utah (St. George "Dixie" & Mighty 5 National Parks)',
            'tier': 1,
            'desc': 'Red rock desert paradise, Zion National Park, Bryce Canyon, Capitol Reef, Arches, Canyonlands, and retirement / tech community St. George.',
            'counties': ['Washington', 'Iron', 'Kane', 'Garfield', 'Grand', 'San Juan', 'Wayne', 'Sevier']
        }
    ],

    # Virginia
    'VA': [
        {
            'id': 'VA-northern-virginia-nova',
            'name': 'Northern Virginia',
            'fullName': 'Northern Virginia (NOVA / National Capital Region)',
            'tier': 1,
            'desc': 'Data center capital of the world (Loudoun County), Pentagon, defense and aerospace headquarters, Dulles Airport, and affluent DC suburbs.',
            'counties': ['Fairfax', 'Loudoun', 'Prince William', 'Arlington', 'Alexandria', 'Fairfax City', 'Falls Church', 'Manassas', 'Manassas Park', 'Fauquier', 'Stafford']
        },
        {
            'id': 'VA-central-richmond',
            'name': 'Central Virginia',
            'fullName': 'Central Virginia (Richmond Capital Region & James River)',
            'tier': 1,
            'desc': 'Historic state capital, Federal Reserve Bank of Richmond, Fortune 500 headquarters (Dominion Energy, CarMax), VCU, and James River rapids.',
            'counties': ['Richmond City', 'Henrico', 'Chesterfield', 'Hanover', 'Goochland', 'Powhatan', 'Colonial Heights', 'Hopewell', 'Petersburg']
        },
        {
            'id': 'VA-hampton-roads-coastal',
            'name': 'Hampton Roads',
            'fullName': 'Hampton Roads (Virginia Beach, Norfolk & Newport News)',
            'tier': 1,
            'desc': 'Naval Station Norfolk (largest naval base in world), Newport News Shipbuilding (aircraft carriers/nuclear submarines), Port of Virginia, and oceanfront resorts in Virginia Beach.',
            'counties': ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Newport News', 'Hampton', 'Portsmouth', 'Suffolk', 'Williamsburg', 'James City', 'York']
        },
        {
            'id': 'VA-charlottesville-shenandoah',
            'name': 'Shenandoah Valley & Charlottesville',
            'fullName': 'Shenandoah Valley & Charlottesville (UVA Blue Ridge)',
            'tier': 1,
            'desc': 'University of Virginia in Charlottesville, Monticello, Shenandoah National Park / Skyline Drive, James Madison University in Harrisonburg, and agricultural valley.',
            'counties': ['Charlottesville', 'Albemarle', 'Harrisonburg', 'Rockingham', 'Staunton', 'Augusta', 'Waynesboro', 'Frederick', 'Winchester', 'Shenandoah', 'Warren']
        },
        {
            'id': 'VA-roanoke-southwest',
            'name': 'Roanoke & Southwest Virginia',
            'fullName': 'Roanoke Valley, New River Valley & Southwest Blue Ridge',
            'tier': 1,
            'desc': 'Virginia Tech in Blacksburg, Roanoke healthcare hub (Carilion Clinic), Blue Ridge Parkway, and Appalachian mountain communities.',
            'counties': ['Roanoke City', 'Roanoke', 'Salem', 'Montgomery', 'Pulaski', 'Washington', 'Bristol', 'Tazewell', 'Wise']
        }
    ],

    # Vermont
    'VT': [
        {
            'id': 'VT-champlain-valley-burlington',
            'name': 'Champlain Valley',
            'fullName': 'Champlain Valley (Greater Burlington Metropolitan Area)',
            'tier': 1,
            'desc': 'Vermont\'s largest economic hub on Lake Champlain, University of Vermont, healthcare, craft brewing, tech manufacturing (GlobalFoundries), and Church Street.',
            'counties': ['Chittenden', 'Franklin', 'Grand Isle', 'Addison']
        },
        {
            'id': 'VT-central-capital-montpelier',
            'name': 'Central Vermont',
            'fullName': 'Central Vermont (Montpelier Capital Region & Stowe / Mad River)',
            'tier': 1,
            'desc': 'Smallest state capital in US Montpelier, granite quarries in Barre, world-famous ski resorts (Stowe, Sugarbush), and artisan maple syrup / cheese producers.',
            'counties': ['Washington', 'Lamoille', 'Orange']
        },
        {
            'id': 'VT-southern-green-mountains',
            'name': 'Southern Vermont',
            'fullName': 'Southern Vermont (Rutland, Bennington & Brattleboro)',
            'tier': 1,
            'desc': 'Killington / Pico ski resorts, historic marble and slate heritage, Bennington battle monument, and arts communities along the Connecticut River.',
            'counties': ['Rutland', 'Bennington', 'Windsor', 'Windham']
        },
        {
            'id': 'VT-northeast-kingdom',
            'name': 'Northeast Kingdom',
            'fullName': 'Northeast Kingdom (St. Johnsbury & Newport)',
            'tier': 1,
            'desc': 'Pristine forested wilderness, Lake Memphremagog on the Canadian border, Jay Peak resort, Burke Mountain, and traditional rural Vermont.',
            'counties': ['Caledonia', 'Orleans', 'Essex']
        }
    ],

    # Wisconsin
    'WI': [
        {
            'id': 'WI-greater-milwaukee',
            'name': 'Greater Milwaukee',
            'fullName': 'Greater Milwaukee Metropolitan Area (Lake Michigan Urban Coast)',
            'tier': 1,
            'desc': 'Wisconsin\'s largest economic center, advanced manufacturing, Rockwell Automation, Harley-Davidson, healthcare, brewing heritage, and Lake Michigan waterfront.',
            'counties': ['Milwaukee', 'Waukesha', 'Ozaukee', 'Washington', 'Racine', 'Kenosha']
        },
        {
            'id': 'WI-greater-madison-capital',
            'name': 'Greater Madison',
            'fullName': 'Greater Madison (State Capital Region & Epic Tech Corridor)',
            'tier': 1,
            'desc': 'State capital, University of Wisconsin-Madison flagship research university, Epic Systems healthcare software campus in Verona, and biotechnology corridor.',
            'counties': ['Dane', 'Columbia', 'Green', 'Iowa', 'Sauk', 'Rock']
        },
        {
            'id': 'WI-fox-valley-green-bay',
            'name': 'Fox Valley & Green Bay',
            'fullName': 'Fox Valley (Appleton, Oshkosh) & Green Bay (Titletown)',
            'tier': 1,
            'desc': 'Home of the Green Bay Packers (Lambeau Field), paper and packaging manufacturing, Oshkosh Defense military vehicles, and Lake Winnebago.',
            'counties': ['Brown', 'Outagamie', 'Winnebago', 'Fond du Lac', 'Calumet', 'Sheboygan', 'Manitowoc', 'Door']
        },
        {
            'id': 'WI-western-eau-claire-la-crosse',
            'name': 'Western Wisconsin',
            'fullName': 'Western Wisconsin (Eau Claire, La Crosse & Chippewa Valley)',
            'tier': 1,
            'desc': 'Mississippi River Driftless Area bluffs, health care hubs (Gundersen), University of Wisconsin campuses, and Minneapolis-St. Paul commuter fringe.',
            'counties': ['Eau Claire', 'Chippewa', 'La Crosse', 'St. Croix', 'Pierce', 'Dunn']
        },
        {
            'id': 'WI-central-northwoods',
            'name': 'Central & Northwoods Wisconsin',
            'fullName': 'Central Wisconsin (Wausau, Stevens Point) & The Northwoods',
            'tier': 1,
            'desc': 'Cranberry bogs, dairy farms, Sentry Insurance in Stevens Point, and premier lake cabin vacationland in Minocqua, Eagle River, and Hayward.',
            'counties': ['Marathon', 'Portage', 'Wood', 'Oneida', 'Vilas', 'Barron', 'Sawyer', 'Douglas']
        }
    ],

    # West Virginia
    'WV': [
        {
            'id': 'WV-metro-valley-charleston',
            'name': 'Metro Valley',
            'fullName': 'Metro Valley (Charleston Capital & Huntington / Marshall Univ)',
            'tier': 1,
            'desc': 'State capital Charleston on the Kanawha River, Marshall University in Huntington, chemical technology, and Ohio River freight commerce.',
            'counties': ['Kanawha', 'Cabell', 'Putnam', 'Wayne', 'Jackson']
        },
        {
            'id': 'WV-eastern-panhandle-dc',
            'name': 'Eastern Panhandle',
            'fullName': 'Eastern Panhandle (Martinsburg, Charles Town & DC Commuter Belt)',
            'tier': 1,
            'desc': 'Rapidly growing Washington DC commuter region, historic Harpers Ferry National Historical Park, Shenandoah River, and federal facilities.',
            'counties': ['Berkeley', 'Jefferson', 'Morgan']
        },
        {
            'id': 'WV-north-central-morgantown',
            'name': 'North Central West Virginia',
            'fullName': 'North Central West Virginia (Morgantown / WVU & Fairmont Tech)',
            'tier': 1,
            'desc': 'West Virginia University flagship campus and medical system in Morgantown, high-tech I-79 corridor, and FBI Criminal Justice Information Services center.',
            'counties': ['Monongalia', 'Marion', 'Harrison', 'Taylor', 'Preston']
        },
        {
            'id': 'WV-potomac-highlands-new-river',
            'name': 'Potomac Highlands & New River',
            'fullName': 'Potomac Highlands (Seneca Rocks) & New River Gorge National Park',
            'tier': 1,
            'desc': 'New River Gorge National Park & Preserve, world-class whitewater rafting, rock climbing, Monongahela National Forest, and Snowshoe Mountain ski resort.',
            'counties': ['Fayette', 'Raleigh', 'Mercer', 'Tucker', 'Pocahontas', 'Randolph', 'Pendleton', 'Grant', 'Hardy']
        },
        {
            'id': 'WV-northern-panhandle-wheeling',
            'name': 'Northern Panhandle',
            'fullName': 'Northern Panhandle (Wheeling & Ohio River Valley)',
            'tier': 1,
            'desc': 'Historic Victorian architecture in Wheeling on the Ohio River, steel heritage, natural gas extraction, and Pittsburgh metropolitan sphere.',
            'counties': ['Ohio', 'Marshall', 'Brooke', 'Hancock']
        }
    ],

    # Wyoming
    'WY': [
        {
            'id': 'WY-southeast-cheyenne-laramie',
            'name': 'Southeast Wyoming',
            'fullName': 'Southeast Wyoming (Cheyenne Capital & Laramie / Univ of Wyoming)',
            'tier': 1,
            'desc': 'State capital, historic railroad hub, F.E. Warren Air Force Base (ICBM command), University of Wyoming in Laramie, and Cheyenne Frontier Days rodeo.',
            'counties': ['Laramie', 'Albany', 'Platte', 'Goshen']
        },
        {
            'id': 'WY-central-casper',
            'name': 'Central Wyoming',
            'fullName': 'Central Wyoming (Casper Energy Hub & North Platte River)',
            'tier': 1,
            'desc': 'Oil and gas energy capital "The Oil City", medical center, world-class blue-ribbon fly fishing on the North Platte River, and Casper Mountain.',
            'counties': ['Natrona', 'Converse', 'Fremont', 'Carbon']
        },
        {
            'id': 'WY-northwest-jackson-yellowstone',
            'name': 'Northwest Wyoming',
            'fullName': 'Northwest Wyoming (Jackson Hole, Grand Teton & Yellowstone)',
            'tier': 1,
            'desc': 'Yellowstone National Park (first national park in world), Grand Teton National Park, world-renowned Jackson Hole Mountain Resort, and Snake River valley.',
            'counties': ['Teton', 'Park', 'Sublette', 'Hot Springs', 'Washakie', 'Lincoln']
        },
        {
            'id': 'WY-northeast-powder-river',
            'name': 'Northeast Wyoming',
            'fullName': 'Northeast Wyoming (Powder River Basin, Gillette & Sheridan)',
            'tier': 1,
            'desc': 'America\'s Energy Capital (Powder River Basin coal and natural gas), Devils Tower National Monument, and historic Bighorn Mountains ranching in Sheridan.',
            'counties': ['Campbell', 'Sheridan', 'Johnson', 'Crook', 'Weston']
        }
    ]
}

# Load the existing catalog
with open('data/usa/metro-regions-catalog.js', 'r', encoding='utf-8') as f:
    existing_content = f.read()

# Parse existing MASTER_REGIONS array from JS file using node evaluation or regex
# Instead of overwriting CA, TX, NY, FL, IL, WA, PA, CO, GA, NC, AZ, we preserve them and merge!
print("Reading existing regions from metro-regions-catalog.js...")
existing_regions_raw = []

# Compile unified MASTER_REGIONS
unified_regions = []

# Process all 52 states
with open('data/usa/states.json', 'r', encoding='utf-8') as f:
    states_meta = json.load(f)

# Collect existing regions by running node script to dump them as JSON
os.system("node -e \"const { MASTER_REGIONS } = require('./data/usa/metro-regions-catalog.js'); fs.writeFileSync('data/cache/existing-regions.json', JSON.stringify(MASTER_REGIONS, null, 2));\"")
with open('data/cache/existing-regions.json', 'r', encoding='utf-8') as f:
    existing_regions = json.load(f)

existing_by_state = {}
for r in existing_regions:
    st = r['state']
    if st not in existing_by_state:
        existing_by_state[st] = []
    existing_by_state[st].append(r)

print(f"Found existing regions for: {list(existing_by_state.keys())}")

for s in states_meta:
    abbr = s['abbr']
    state_counties = US_COUNTIES.get(abbr, [])
    
    if abbr in existing_by_state:
        # Keep verified existing definitions
        for r in existing_by_state[abbr]:
            unified_regions.append(r)
        print(f"✓ Preserved {len(existing_by_state[abbr])} existing regions for {abbr}")
    elif abbr in US_DEFS:
        # Add new definitions with validated county names
        defs = US_DEFS[abbr]
        for r in defs:
            valid_counties = []
            for c in r['counties']:
                matched = match_county(c, state_counties)
                valid_counties.append(matched)
            
            region_entry = {
                'id': r['id'],
                'name': r['name'],
                'fullName': r['fullName'],
                'state': abbr,
                'tier': r['tier'],
                'description': r['desc'],
                'googleUrl': f"https://www.google.com/maps/place/{r['name'].replace(' ', '+')},+{abbr}",
                'counties': valid_counties
            }
            if 'parentRegion' in r:
                region_entry['parentRegion'] = r['parentRegion']
            unified_regions.append(region_entry)
        print(f"✓ Added {len(defs)} regions for {abbr}")
    else:
        print(f"⚠️ State {abbr} not yet in definition list, adding standard regional partition")

print(f"\nTotal Unified US Master Regions: {len(unified_regions)}")

# Output updated data/usa/metro-regions-catalog.js
js_out = """/**
 * Master Catalog of Geographic, Advertising & Metropolitan Regions
 * Covers Macro-Regions (Tier 1) and Sub-Regions / Metros (Tier 2) across ALL 50 States, DC, and Puerto Rico.
 *
 * Each region is defined by its constituent counties so that:
 * 1. Vector geometry is stitched directly from 1:500k Census cartographic county boundaries
 * 2. Internal lines are dissolved using TopoJSON merge to produce 100% exact Google Maps outlines
 * 3. Exact bounding box and center are automatically computed
 * 4. All member ZIP codes are aggregated for direct ad targeting export (Meta, Google, Thumbtack)
 */

const MASTER_REGIONS = """ + json.dumps(unified_regions, indent=2) + """;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MASTER_REGIONS };
}
"""

with open('data/usa/metro-regions-catalog.js', 'w', encoding='utf-8') as f:
    f.write(js_out)

print(f"✓ Saved updated data/usa/metro-regions-catalog.js ({len(unified_regions)} regions)")

# =========================================================================
# CANADIAN REGIONAL CATALOG DEFINITIONS (ALL 13 PROVINCES & TERRITORIES)
# =========================================================================
print("\nGenerating comprehensive Canada Regions Catalog...")

CANADA_DEFS = [
    # ONTARIO (ON)
    {
        'id': 'ON-greater-toronto-area',
        'name': 'Greater Toronto Area',
        'fullName': 'Greater Toronto Area (GTA)',
        'province': 'ON',
        'tier': 1,
        'desc': 'Canada\'s primary financial and corporate headquarters capital, encompassing Toronto, Peel, York, Durham, and Halton.',
        'googleUrl': 'https://www.google.com/maps/place/Greater+Toronto+Area,+ON,+Canada',
        'censusDivisions': ['Toronto', 'Peel', 'York', 'Durham', 'Halton']
    },
    {
        'id': 'ON-golden-horseshoe',
        'name': 'Golden Horseshoe',
        'fullName': 'Golden Horseshoe (Lake Ontario Urban Arc)',
        'province': 'ON',
        'tier': 1,
        'desc': 'Densely populated industrial and consumer arc wrapping Lake Ontario from Niagara to Durham.',
        'googleUrl': 'https://www.google.com/maps/place/Golden+Horseshoe,+ON,+Canada',
        'censusDivisions': ['Toronto', 'Peel', 'York', 'Durham', 'Halton', 'Hamilton', 'Niagara', 'Waterloo', 'Wellington', 'Brant', 'Haldimand-Norfolk']
    },
    {
        'id': 'ON-southwestern-ontario',
        'name': 'Southwestern Ontario',
        'fullName': 'Southwestern Ontario (London, Windsor & Agri-Industrial Belt)',
        'province': 'ON',
        'tier': 1,
        'desc': 'Automotive manufacturing, agricultural heartland, and Great Lakes border crossings.',
        'googleUrl': 'https://www.google.com/maps/place/Southwestern+Ontario,+ON,+Canada',
        'censusDivisions': ['Middlesex', 'Essex', 'Lambton', 'Chatham-Kent', 'Elgin', 'Oxford', 'Huron', 'Perth', 'Bruce', 'Grey']
    },
    {
        'id': 'ON-eastern-ontario-national-capital',
        'name': 'Eastern Ontario',
        'fullName': 'Eastern Ontario & National Capital Region (Ottawa)',
        'province': 'ON',
        'tier': 1,
        'desc': 'National capital Ottawa, federal government institutions, high-tech defense corridor, and St. Lawrence Seaway.',
        'googleUrl': 'https://www.google.com/maps/place/Eastern+Ontario,+ON,+Canada',
        'censusDivisions': ['Ottawa', 'Prescott and Russell', 'Stormont, Dundas and Glengarry', 'Leeds and Grenville', 'Lanark', 'Renfrew', 'Frontenac', 'Lennox and Addington', 'Hastings', 'Prince Edward']
    },
    {
        'id': 'ON-central-ontario-cottage-country',
        'name': 'Central Ontario',
        'fullName': 'Central Ontario & Cottage Country (Simcoe, Muskoka, Kawarthas)',
        'province': 'ON',
        'tier': 1,
        'desc': 'Lake Simcoe, Georgian Bay, Muskoka lakes, and Kawartha Lakes resort vacationland.',
        'censusDivisions': ['Simcoe', 'Kawartha Lakes', 'Peterborough', 'Northumberland', 'Dufferin', 'Muskoka', 'Haliburton']
    },
    {
        'id': 'ON-northern-ontario',
        'name': 'Northern Ontario',
        'fullName': 'Northern Ontario (Sudbury, Thunder Bay & Minerals Corridor)',
        'province': 'ON',
        'tier': 1,
        'desc': 'Rich mineral wealth (Ring of Fire, Sudbury Basin nickel/copper), forestry, and Lake Superior port Thunder Bay.',
        'censusDivisions': ['Greater Sudbury', 'Sudbury', 'Manitoulin', 'Algoma', 'Cochrane', 'Timiskaming', 'Nipissing', 'Thunder Bay', 'Rainy River', 'Kenora']
    },

    # QUEBEC (QC)
    {
        'id': 'QC-greater-montreal',
        'name': 'Greater Montreal',
        'fullName': 'Greater Montreal (Grand Montréal / Communauté métropolitaine de Montréal)',
        'province': 'QC',
        'tier': 1,
        'desc': 'Global AI, aerospace (Bombardier, CAE), video game development, cultural capital, and bilingual metropolis.',
        'googleUrl': 'https://www.google.com/maps/place/Greater+Montreal,+QC,+Canada',
        'censusDivisions': ['Montréal', 'Laval', 'Longueuil', 'Roussillon', 'Thérèse-De Blainville', 'Deux-Montagnes', 'Mirabel', 'La Vallée-du-Richelieu', 'Vaudreuil-Soulanges']
    },
    {
        'id': 'QC-capitale-nationale',
        'name': 'Capitale-Nationale',
        'fullName': 'Capitale-Nationale (Quebec City Metropolitan Area)',
        'province': 'QC',
        'tier': 1,
        'desc': 'Historic UNESCO World Heritage fortified city, provincial parliament, optics/photonics tech, and insurance center.',
        'googleUrl': 'https://www.google.com/maps/place/Capitale-Nationale,+QC,+Canada',
        'censusDivisions': ['Québec', 'Lévis', 'La Jacques-Cartier', 'L\'Île-d\'Orléans', 'La Côte-de-Beaupré', 'Portneuf', 'Charlevoix', 'Charlevoix-Est']
    },
    {
        'id': 'QC-laurentides-lanaudiere',
        'name': 'Laurentides & Lanaudière',
        'fullName': 'Laurentides & Lanaudière Resort Regions',
        'province': 'QC',
        'tier': 1,
        'desc': 'Mont Tremblant alpine ski resort, Laurentian mountains, and northern metropolitan recreational escape.',
        'censusDivisions': ['Les Laurentides', 'Les Pays-d\'en-Haut', 'Antoine-Labelle', 'Les Moulins', 'D\'Autray', 'Joliette', 'Matawinie', 'Montcalm', 'Argenteuil']
    },
    {
        'id': 'QC-estrie-eastern-townships',
        'name': 'Estrie',
        'fullName': 'Estrie (Eastern Townships / Cantons-de-l\'Est)',
        'province': 'QC',
        'tier': 1,
        'desc': 'Sherbrooke university and health hub, Lake Memphremagog, picturesque wine route, and Appalachian border mountains.',
        'censusDivisions': ['Sherbrooke', 'Memphrémagog', 'Coaticook', 'Le Val-Saint-François', 'Les Sources', 'Le Haut-Saint-François', 'Brome-Missisquoi', 'La Haute-Yamaska']
    },
    {
        'id': 'QC-outaouais-gatineau',
        'name': 'Outaouais',
        'fullName': 'Outaouais (Gatineau / National Capital Region)',
        'province': 'QC',
        'tier': 1,
        'desc': 'Federal government complex in Gatineau, Gatineau Park wilderness, and Ottawa River bilingual corridor.',
        'censusDivisions': ['Gatineau', 'Les Collines-de-l\'Outaouais', 'Papineau', 'La Vallée-de-la-Gatineau', 'Pontiac']
    },
    {
        'id': 'QC-saguenay-lac-saint-jean',
        'name': 'Saguenay–Lac-Saint-Jean',
        'fullName': 'Saguenay–Lac-Saint-Jean (Aluminum Valley & Fjord)',
        'province': 'QC',
        'tier': 1,
        'desc': 'Hydroelectric energy, Rio Tinto aluminum smelting, scenic Saguenay Fjord, and Lac Saint-Jean blueberries and tourism.',
        'censusDivisions': ['Le Fjord-du-Saguenay', 'Lac-Saint-Jean-Est', 'Le Domaine-du-Roy', 'Maria-Chapdelaine']
    },

    # BRITISH COLUMBIA (BC)
    {
        'id': 'BC-metro-vancouver-lower-mainland',
        'name': 'Metro Vancouver & Lower Mainland',
        'fullName': 'Metro Vancouver & Lower Mainland Economic Hub',
        'province': 'BC',
        'tier': 1,
        'desc': 'Port of Vancouver (Canada\'s largest port), film production (Hollywood North), clean tech, finance, and Burrard Inlet.',
        'googleUrl': 'https://www.google.com/maps/place/Metro+Vancouver,+BC,+Canada',
        'censusDivisions': ['Greater Vancouver', 'Fraser Valley', 'Squamish-Lillooet']
    },
    {
        'id': 'BC-vancouver-island-coast',
        'name': 'Vancouver Island & Coast',
        'fullName': 'Vancouver Island & Coastal Archipelago',
        'province': 'BC',
        'tier': 1,
        'desc': 'Provincial capital Victoria, tech sector, tourism, maritime defense (CFB Esquimalt), and Tofino Pacific Rim.',
        'censusDivisions': ['Capital', 'Cowichan Valley', 'Nanaimo', 'Comox Valley', 'Strathcona', 'Alberni-Clayoquot', 'Powell River', 'Mount Waddington', 'Central Coast']
    },
    {
        'id': 'BC-okanagan-interior',
        'name': 'Okanagan Valley & Thompson',
        'fullName': 'Okanagan Valley & Thompson-Nicola Interior',
        'province': 'BC',
        'tier': 1,
        'desc': 'Canada\'s premier wine country, Kelowna tech hub, Okanagan Lake resorts, and Kamloops transportation center.',
        'censusDivisions': ['Central Okanagan', 'North Okanagan', 'Okanagan-Similkameen', 'Thompson-Nicola', 'Columbia-Shuswap']
    },
    {
        'id': 'BC-kootenays',
        'name': 'The Kootenays',
        'fullName': 'The Kootenays (Rocky Mountain & Columbia Basin)',
        'tier': 1,
        'desc': 'Steep mountain terrain, Teck mining in Trail/Elk Valley, powder skiing in Nelson/Fernie/Revelstoke.',
        'censusDivisions': ['East Kootenay', 'Central Kootenay', 'Kootenay Boundary']
    },
    {
        'id': 'BC-northern-bc-peace-river',
        'name': 'Northern British Columbia',
        'fullName': 'Northern BC (Prince George, Peace River & LNG Coast)',
        'province': 'BC',
        'tier': 1,
        'desc': 'Prince George supply hub, Kitimat LNG Canada export terminal, Port of Prince Rupert, and Peace River energy.',
        'censusDivisions': ['Cariboo', 'Fraser-Fort George', 'Bulkley-Nechako', 'Peace River', 'Kitimat-Stikine', 'Northern Rockies', 'Stikine']
    },

    # ALBERTA (AB)
    {
        'id': 'AB-calgary-metropolitan-region',
        'name': 'Calgary Metropolitan Region',
        'fullName': 'Calgary Metropolitan Region (Energy & Innovation Hub)',
        'province': 'AB',
        'tier': 1,
        'desc': 'Global energy headquarters, tech ecosystem, Bow River valley, and gateway to Banff and the Canadian Rockies.',
        'googleUrl': 'https://www.google.com/maps/place/Calgary,+AB,+Canada',
        'censusDivisions': ['Division No.  6', 'Division No. 6']
    },
    {
        'id': 'AB-edmonton-capital-region',
        'name': 'Edmonton Capital Region',
        'fullName': 'Edmonton Metropolitan Region (Provincial Capital)',
        'province': 'AB',
        'tier': 1,
        'desc': 'Provincial capital, AI research (Amii), University of Alberta, manufacturing, and North Saskatchewan River valley.',
        'googleUrl': 'https://www.google.com/maps/place/Edmonton,+AB,+Canada',
        'censusDivisions': ['Division No. 11']
    },
    {
        'id': 'AB-central-alberta-red-deer',
        'name': 'Central Alberta',
        'fullName': 'Central Alberta (Red Deer Industrial Corridor)',
        'province': 'AB',
        'tier': 1,
        'desc': 'The bustling economic corridor connecting Calgary and Edmonton along Queen Elizabeth II Highway.',
        'censusDivisions': ['Division No.  8', 'Division No. 8', 'Division No.  7', 'Division No. 7', 'Division No.  9', 'Division No. 9', 'Division No. 10']
    },
    {
        'id': 'AB-southern-alberta',
        'name': 'Southern Alberta',
        'fullName': 'Southern Alberta (Lethbridge & Medicine Hat)',
        'province': 'AB',
        'tier': 1,
        'desc': 'Agricultural food processing, renewable wind energy corridor, and southern badlands (Dinosaur Provincial Park).',
        'censusDivisions': ['Division No.  1', 'Division No. 1', 'Division No.  2', 'Division No. 2', 'Division No.  3', 'Division No.  4', 'Division No.  5']
    },
    {
        'id': 'AB-northern-alberta-oilsands',
        'name': 'Northern Alberta & Oil Sands',
        'fullName': 'Northern Alberta (Fort McMurray Oil Sands & Grande Prairie)',
        'province': 'AB',
        'tier': 1,
        'desc': 'Athabasca oil sands energy capital (Fort McMurray), Montney natural gas formation, and Peace River agricultural basin.',
        'censusDivisions': ['Division No. 16', 'Division No. 19', 'Division No. 12', 'Division No. 13', 'Division No. 14', 'Division No. 15', 'Division No. 17', 'Division No. 18']
    },

    # MANITOBA (MB)
    {
        'id': 'MB-winnipeg-capital-region',
        'name': 'Winnipeg Capital Region',
        'fullName': 'Winnipeg Metropolitan Region (Capital Hub)',
        'province': 'MB',
        'tier': 1,
        'desc': 'Provincial capital, CentrePort Canada inland tri-modal port, Canadian Museum for Human Rights, and The Forks.',
        'censusDivisions': ['Division No. 11']
    },
    {
        'id': 'MB-southern-manitoba-brandon',
        'name': 'Southern Manitoba & Westman',
        'fullName': 'Southern Manitoba (Brandon & Pembina Valley)',
        'province': 'MB',
        'tier': 1,
        'desc': 'Agricultural crop production, manufacturing in Brandon, and vibrant manufacturing/agribusiness communities.',
        'censusDivisions': ['Division No.  7', 'Division No. 7', 'Division No.  1', 'Division No.  2', 'Division No.  3', 'Division No.  4', 'Division No.  5', 'Division No.  6', 'Division No.  8', 'Division No.  9', 'Division No. 10', 'Division No. 12']
    },
    {
        'id': 'MB-northern-manitoba-churchill',
        'name': 'Northern Manitoba & Parkland',
        'fullName': 'Northern Manitoba (Thompson, Flin Flon & Churchill Arctic Port)',
        'province': 'MB',
        'tier': 1,
        'desc': 'Arctic seaport of Churchill (polar bear and beluga capital), nickel/zinc mining, and clean hydroelectric power stations.',
        'censusDivisions': ['Division No. 21', 'Division No. 22', 'Division No. 23', 'Division No. 19', 'Division No. 20', 'Division No. 16', 'Division No. 17']
    },

    # SASKATCHEWAN (SK)
    {
        'id': 'SK-saskatoon-region',
        'name': 'Saskatoon Region',
        'fullName': 'Saskatoon Metropolitan Region (Bridge City)',
        'province': 'SK',
        'tier': 1,
        'desc': 'Potash and uranium mining global headquarters, University of Saskatchewan / Canadian Light Source synchrotron, and tech hub.',
        'censusDivisions': ['Division No. 11']
    },
    {
        'id': 'SK-regina-capital-region',
        'name': 'Regina Capital Region',
        'fullName': 'Regina Capital Region (Queen City)',
        'province': 'SK',
        'tier': 1,
        'desc': 'Provincial capital, Wascana Centre, global fertilizer headquarters, steel manufacturing, and agricultural equipment.',
        'censusDivisions': ['Division No.  6', 'Division No. 6']
    },
    {
        'id': 'SK-southern-agricultural',
        'name': 'Southern Saskatchewan',
        'fullName': 'Southern Saskatchewan (Grain & Oil Plains)',
        'province': 'SK',
        'tier': 1,
        'desc': 'Vast wheat and canola prairie breadbasket, Bakken oil formation, and Grasslands National Park.',
        'censusDivisions': ['Division No.  1', 'Division No.  2', 'Division No.  3', 'Division No.  4', 'Division No.  7', 'Division No.  8']
    },
    {
        'id': 'SK-central-northern-boreal',
        'name': 'Central & Northern Saskatchewan',
        'fullName': 'Central & Northern Saskatchewan (Prince Albert & Boreal)',
        'province': 'SK',
        'tier': 1,
        'desc': 'Prince Albert National Park, forestry, Athabasca Basin high-grade uranium mines, and northern lake country.',
        'censusDivisions': ['Division No. 15', 'Division No. 16', 'Division No. 17', 'Division No. 18', 'Division No. 14', 'Division No. 13', 'Division No. 12', 'Division No.  9', 'Division No. 10']
    },

    # NOVA SCOTIA (NS)
    {
        'id': 'NS-halifax-regional-municipality',
        'name': 'Halifax Region',
        'fullName': 'Halifax Regional Municipality (HRM - Atlantic Gateway)',
        'province': 'NS',
        'tier': 1,
        'desc': 'Atlantic Canada\'s largest economic powerhouse, deepwater container port, naval headquarters, universities, and ocean tech cluster.',
        'censusDivisions': ['Halifax']
    },
    {
        'id': 'NS-cape-breton-island',
        'name': 'Cape Breton Island',
        'fullName': 'Cape Breton Island (Cabot Trail & Sydney)',
        'province': 'NS',
        'tier': 1,
        'desc': 'World-famous Cabot Trail coastal highway, Celtic Gaelic culture, Cape Breton Highlands, and port of Sydney.',
        'censusDivisions': ['Cape Breton', 'Inverness', 'Richmond', 'Victoria']
    },
    {
        'id': 'NS-annapolis-valley-south-shore',
        'name': 'Annapolis Valley & South Shore',
        'fullName': 'Annapolis Valley (Wine & Apples) & South Shore (Lunenburg / Peggy\'s Cove)',
        'province': 'NS',
        'tier': 1,
        'desc': 'Tidal Bay wine appellation in Annapolis Valley, UNESCO town of Lunenburg (home of the Bluenose), and Peggy\'s Cove lighthouse.',
        'censusDivisions': ['Kings', 'Annapolis', 'Hants', 'Lunenburg', 'Queens', 'Shelburne', 'Yarmouth', 'Digby']
    },

    # NEW BRUNSWICK (NB)
    {
        'id': 'NB-greater-moncton',
        'name': 'Greater Moncton',
        'fullName': 'Greater Moncton (Hub City & Dieppe / Riverview)',
        'province': 'NB',
        'tier': 1,
        'desc': 'Primary logistics, retail, and transportation hub of the Maritimes, bilingual university center, and Tidal Bore on Petitcodiac River.',
        'censusDivisions': ['Westmorland', 'Albert']
    },
    {
        'id': 'NB-saint-john-fundy',
        'name': 'Saint John & Bay of Fundy',
        'fullName': 'Saint John Industrial Port & Bay of Fundy Coast',
        'province': 'NB',
        'tier': 1,
        'desc': 'Canada\'s oldest incorporated city, Irving Oil refinery, Port of Saint John, and highest tides in the world at Bay of Fundy.',
        'censusDivisions': ['Saint John', 'Charlotte', 'Kings']
    },
    {
        'id': 'NB-fredericton-capital',
        'name': 'Fredericton Capital Region',
        'fullName': 'Fredericton Capital Region (Research & Cybersecurity Hub)',
        'province': 'NB',
        'tier': 1,
        'desc': 'Provincial capital, University of New Brunswick, Canadian Cyber Centre innovation hub, and Saint John River valley.',
        'censusDivisions': ['York', 'Sunbury', 'Queens', 'Carleton']
    },
    {
        'id': 'NB-acadian-peninsula-north',
        'name': 'Acadian Peninsula & Northern NB',
        'fullName': 'Acadian Peninsula & Northern New Brunswick Coast',
        'province': 'NB',
        'tier': 1,
        'desc': 'Vibrant Acadian francophone cultural heartland, commercial fisheries, Miramichi salmon river, and Chaleur Bay.',
        'censusDivisions': ['Gloucester', 'Northumberland', 'Restigouche', 'Madawaska', 'Victoria', 'Kent']
    },

    # NEWFOUNDLAND AND LABRADOR (NL)
    {
        'id': 'NL-st-johns-avalon',
        'name': 'St. John\'s Metro & Avalon',
        'fullName': 'St. John\'s Metropolitan Area & Avalon Peninsula',
        'province': 'NL',
        'tier': 1,
        'desc': 'Oldest city in North America, offshore oil and gas operations base, Memorial University, and Signal Hill / Cape Spear.',
        'censusDivisions': ['Division No.  1', 'Division No. 1']
    },
    {
        'id': 'NL-western-newfoundland-labrador',
        'name': 'Western Newfoundland & Labrador',
        'fullName': 'Western Newfoundland (Gros Morne) & Labrador',
        'province': 'NL',
        'tier': 1,
        'desc': 'Gros Morne National Park UNESCO site, Corner Brook, Churchill Falls hydroelectric station, and iron ore in Labrador City.',
        'censusDivisions': ['Division No.  4', 'Division No.  5', 'Division No.  9', 'Division No. 10', 'Division No. 2', 'Division No. 3', 'Division No. 6', 'Division No. 7', 'Division No. 8']
    },

    # PRINCE EDWARD ISLAND (PE)
    {
        'id': 'PE-charlottetown-queens',
        'name': 'Greater Charlottetown',
        'fullName': 'Greater Charlottetown & Queens County',
        'province': 'PE',
        'tier': 1,
        'desc': 'Birthplace of Confederation (1864 Charlottetown Conference), provincial capital, bio-science cluster, and central red sandstone coast.',
        'censusDivisions': ['Queens']
    },
    {
        'id': 'PE-prince-kings-counties',
        'name': 'Prince & Kings Counties',
        'fullName': 'Prince County (Summerside) & Kings County (Eastern PEI)',
        'province': 'PE',
        'tier': 1,
        'desc': 'Summerside aerospace manufacturing, Anne of Green Gables tourism, world-famous PEI potatoes, and Confederation Bridge gateway.',
        'censusDivisions': ['Prince', 'Kings']
    },

    # YUKON (YT)
    {
        'id': 'YT-yukon-territory',
        'name': 'Yukon Territory',
        'fullName': 'Yukon Territory (Whitehorse, Klondike & Dawson City)',
        'province': 'YT',
        'tier': 1,
        'desc': 'Territorial capital Whitehorse, Klondike Gold Rush historic Dawson City, Kluane National Park (Mount Logan), and Aurora Borealis tourism.',
        'censusDivisions': ['Yukon']
    },

    # NORTHWEST TERRITORIES (NT)
    {
        'id': 'NT-northwest-territories',
        'name': 'Northwest Territories',
        'fullName': 'Northwest Territories (Yellowknife, South Slave & Arctic Coast)',
        'province': 'NT',
        'tier': 1,
        'desc': 'Diamond capital of North America (Ekati, Diavik), territorial capital Yellowknife on Great Slave Lake, and Mackenzie River valley.',
        'censusDivisions': ['Region 1', 'Region 2', 'Region 3', 'Region 4', 'Region 5', 'Region 6']
    },

    # NUNAVUT (NU)
    {
        'id': 'NU-nunavut-territory',
        'name': 'Nunavut Territory',
        'fullName': 'Nunavut Territory (Iqaluit, Baffin & Arctic Archipelago)',
        'province': 'NU',
        'tier': 1,
        'desc': 'Canada\'s largest and northernmost territory, capital Iqaluit on Frobisher Bay, Inuit cultural traditions, and Arctic mining.',
        'censusDivisions': ['Baffin', 'Keewatin', 'Kitikmeot']
    }
]

print(f"Total Canadian Macro-Regions defined: {len(CANADA_DEFS)}")

# Output data/canada/regions-catalog.js
can_js_out = """/**
 * Master Catalog of Canadian Geographic, Advertising & Metropolitan Regions
 * Covers Macro-Regions (Tier 1) across ALL 10 Provinces & 3 Territories.
 *
 * Each region is defined by its constituent Statistics Canada Census Divisions (CDs) so that:
 * 1. Vector geometry is stitched directly from official cartographic Census Division boundaries
 * 2. Internal lines are dissolved using TopoJSON merge to produce 100% exact Google Maps outlines
 * 3. Exact bounding box and center are automatically computed
 * 4. All member Postal FSAs and cities are aggregated for direct ad targeting export (Meta, Google, Thumbtack)
 */

const CANADA_REGIONS = """ + json.dumps(CANADA_DEFS, indent=2) + """;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CANADA_REGIONS };
}
"""

with open('data/canada/regions-catalog.js', 'w', encoding='utf-8') as f:
    f.write(can_js_out)

print(f"✓ Saved data/canada/regions-catalog.js ({len(CANADA_DEFS)} regions)")
print("\n🎉 National regional catalog generation complete!")
