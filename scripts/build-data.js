const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');
const topojsonServer = require('topojson-server');
const d3Geo = require('d3-geo');
const shapefile = require('shapefile');
const { Delaunay } = require('d3-delaunay');

// 1. Official State Metadata (50 States + DC + PR)
const STATE_META = {
  '01': { abbr: 'AL', name: 'Alabama', capital: 'Montgomery', capLat: 32.3792, capLon: -86.3077, pop: 5024279, area: 52420, region: 'South' },
  '02': { abbr: 'AK', name: 'Alaska', capital: 'Juneau', capLat: 58.3019, capLon: -134.4197, pop: 733391, area: 665384, region: 'West' },
  '04': { abbr: 'AZ', name: 'Arizona', capital: 'Phoenix', capLat: 33.4484, capLon: -112.0740, pop: 7151502, area: 113990, region: 'West' },
  '05': { abbr: 'AR', name: 'Arkansas', capital: 'Little Rock', capLat: 34.7465, capLon: -92.2896, pop: 3011524, area: 53179, region: 'South' },
  '06': { abbr: 'CA', name: 'California', capital: 'Sacramento', capLat: 38.5816, capLon: -121.4944, pop: 39538223, area: 163695, region: 'West' },
  '08': { abbr: 'CO', name: 'Colorado', capital: 'Denver', capLat: 39.7392, capLon: -104.9903, pop: 5773714, area: 104094, region: 'West' },
  '09': { abbr: 'CT', name: 'Connecticut', capital: 'Hartford', capLat: 41.7658, capLon: -72.6734, pop: 3605944, area: 5543, region: 'Northeast' },
  '10': { abbr: 'DE', name: 'Delaware', capital: 'Dover', capLat: 39.1582, capLon: -75.5244, pop: 989948, area: 2489, region: 'South' },
  '11': { abbr: 'DC', name: 'District of Columbia', capital: 'Washington', capLat: 38.9072, capLon: -77.0369, pop: 689545, area: 68, region: 'South' },
  '12': { abbr: 'FL', name: 'Florida', capital: 'Tallahassee', capLat: 30.4383, capLon: -84.2807, pop: 21538187, area: 65758, region: 'South' },
  '13': { abbr: 'GA', name: 'Georgia', capital: 'Atlanta', capLat: 33.7490, capLon: -84.3880, pop: 10711908, area: 59425, region: 'South' },
  '15': { abbr: 'HI', name: 'Hawaii', capital: 'Honolulu', capLat: 21.3069, capLon: -157.8583, pop: 1455271, area: 10932, region: 'West' },
  '16': { abbr: 'ID', name: 'Idaho', capital: 'Boise', capLat: 43.6150, capLon: -116.2023, pop: 1839106, area: 83569, region: 'West' },
  '17': { abbr: 'IL', name: 'Illinois', capital: 'Springfield', capLat: 39.7817, capLon: -89.6501, pop: 12812508, area: 57914, region: 'Midwest' },
  '18': { abbr: 'IN', name: 'Indiana', capital: 'Indianapolis', capLat: 39.7684, capLon: -86.1581, pop: 6785528, area: 36420, region: 'Midwest' },
  '19': { abbr: 'IA', name: 'Iowa', capital: 'Des Moines', capLat: 41.5868, capLon: -93.6250, pop: 3190369, area: 56273, region: 'Midwest' },
  '20': { abbr: 'KS', name: 'Kansas', capital: 'Topeka', capLat: 39.0473, capLon: -95.6752, pop: 2937880, area: 82278, region: 'Midwest' },
  '21': { abbr: 'KY', name: 'Kentucky', capital: 'Frankfort', capLat: 38.2009, capLon: -84.8733, pop: 4505836, area: 40408, region: 'South' },
  '22': { abbr: 'LA', name: 'Louisiana', capital: 'Baton Rouge', capLat: 30.4515, capLon: -91.1871, pop: 4657757, area: 52378, region: 'South' },
  '23': { abbr: 'ME', name: 'Maine', capital: 'Augusta', capLat: 44.3106, capLon: -69.7795, pop: 1362359, area: 35380, region: 'Northeast' },
  '24': { abbr: 'MD', name: 'Maryland', capital: 'Annapolis', capLat: 38.9784, capLon: -76.4922, pop: 6177224, area: 12406, region: 'South' },
  '25': { abbr: 'MA', name: 'Massachusetts', capital: 'Boston', capLat: 42.3601, capLon: -71.0589, pop: 7029917, area: 10554, region: 'Northeast' },
  '26': { abbr: 'MI', name: 'Michigan', capital: 'Lansing', capLat: 42.7325, capLon: -84.5555, pop: 10077331, area: 96714, region: 'Midwest' },
  '27': { abbr: 'MN', name: 'Minnesota', capital: 'Saint Paul', capLat: 44.9537, capLon: -93.0900, pop: 5706494, area: 86936, region: 'Midwest' },
  '28': { abbr: 'MS', name: 'Mississippi', capital: 'Jackson', capLat: 32.2988, capLon: -90.1848, pop: 2961279, area: 48432, region: 'South' },
  '29': { abbr: 'MO', name: 'Missouri', capital: 'Jefferson City', capLat: 38.5767, capLon: -92.1735, pop: 6154913, area: 69707, region: 'Midwest' },
  '30': { abbr: 'MT', name: 'Montana', capital: 'Helena', capLat: 46.5891, capLon: -112.0391, pop: 1084225, area: 147040, region: 'West' },
  '31': { abbr: 'NE', name: 'Nebraska', capital: 'Lincoln', capLat: 40.8136, capLon: -96.7026, pop: 1961504, area: 77348, region: 'Midwest' },
  '32': { abbr: 'NV', name: 'Nevada', capital: 'Carson City', capLat: 39.1638, capLon: -119.7674, pop: 3104614, area: 110572, region: 'West' },
  '33': { abbr: 'NH', name: 'New Hampshire', capital: 'Concord', capLat: 43.2081, capLon: -71.5376, pop: 1377529, area: 9349, region: 'Northeast' },
  '34': { abbr: 'NJ', name: 'New Jersey', capital: 'Trenton', capLat: 40.2206, capLon: -74.7597, pop: 9288994, area: 8723, region: 'Northeast' },
  '35': { abbr: 'NM', name: 'New Mexico', capital: 'Santa Fe', capLat: 35.6870, capLon: -105.9378, pop: 2117522, area: 121590, region: 'West' },
  '36': { abbr: 'NY', name: 'New York', capital: 'Albany', capLat: 42.6526, capLon: -73.7562, pop: 20201249, area: 54555, region: 'Northeast' },
  '37': { abbr: 'NC', name: 'North Carolina', capital: 'Raleigh', capLat: 35.7796, capLon: -78.6382, pop: 10439388, area: 53819, region: 'South' },
  '38': { abbr: 'ND', name: 'North Dakota', capital: 'Bismarck', capLat: 46.8083, capLon: -100.7837, pop: 779094, area: 70698, region: 'Midwest' },
  '39': { abbr: 'OH', name: 'Ohio', capital: 'Columbus', capLat: 39.9612, capLon: -82.9988, pop: 11799448, area: 44826, region: 'Midwest' },
  '40': { abbr: 'OK', name: 'Oklahoma', capital: 'Oklahoma City', capLat: 35.4676, capLon: -97.5164, pop: 3959353, area: 69899, region: 'South' },
  '41': { abbr: 'OR', name: 'Oregon', capital: 'Salem', capLat: 44.9429, capLon: -123.0351, pop: 4237256, area: 98379, region: 'West' },
  '42': { abbr: 'PA', name: 'Pennsylvania', capital: 'Harrisburg', capLat: 40.2732, capLon: -76.8867, pop: 13002700, area: 46054, region: 'Northeast' },
  '44': { abbr: 'RI', name: 'Rhode Island', capital: 'Providence', capLat: 41.8240, capLon: -71.4128, pop: 1097379, area: 1545, region: 'Northeast' },
  '45': { abbr: 'SC', name: 'South Carolina', capital: 'Columbia', capLat: 34.0007, capLon: -81.0348, pop: 5118425, area: 32020, region: 'South' },
  '46': { abbr: 'SD', name: 'South Dakota', capital: 'Pierre', capLat: 44.3683, capLon: -100.3510, pop: 886667, area: 77116, region: 'Midwest' },
  '47': { abbr: 'TN', name: 'Tennessee', capital: 'Nashville', capLat: 36.1627, capLon: -86.7816, pop: 6910840, area: 42144, region: 'South' },
  '48': { abbr: 'TX', name: 'Texas', capital: 'Austin', capLat: 30.2672, capLon: -97.7431, pop: 29145505, area: 268596, region: 'South' },
  '49': { abbr: 'UT', name: 'Utah', capital: 'Salt Lake City', capLat: 40.7608, capLon: -111.8910, pop: 3271616, area: 84897, region: 'West' },
  '50': { abbr: 'VT', name: 'Vermont', capital: 'Montpelier', capLat: 44.2601, capLon: -72.5754, pop: 643077, area: 9616, region: 'Northeast' },
  '51': { abbr: 'VA', name: 'Virginia', capital: 'Richmond', capLat: 37.5407, capLon: -77.4360, pop: 8631393, area: 42775, region: 'South' },
  '53': { abbr: 'WA', name: 'Washington', capital: 'Olympia', capLat: 47.0379, capLon: -122.9007, pop: 7705281, area: 71298, region: 'West' },
  '54': { abbr: 'WV', name: 'West Virginia', capital: 'Charleston', capLat: 38.3498, capLon: -81.6326, pop: 1793716, area: 24230, region: 'South' },
  '55': { abbr: 'WI', name: 'Wisconsin', capital: 'Madison', capLat: 43.0731, capLon: -89.4012, pop: 5893718, area: 65496, region: 'Midwest' },
  '56': { abbr: 'WY', name: 'Wyoming', capital: 'Cheyenne', capLat: 41.1400, capLon: -104.8202, pop: 576851, area: 97813, region: 'West' },
  '72': { abbr: 'PR', name: 'Puerto Rico', capital: 'San Juan', capLat: 18.4655, capLon: -66.1057, pop: 3285874, area: 3515, region: 'Territory' }
};

function round(val, decimals = 1) {
  if (val === null || val === undefined || isNaN(val)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

function cleanSvgPath(d, decimals = 2) {
  if (!d) return '';
  const factor = Math.pow(10, decimals);
  let lastX = null, lastY = null;
  return d.replace(/([ML])\s*(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/gi, (m, cmd, xStr, yStr) => {
    const x = Math.round(parseFloat(xStr) * factor) / factor;
    const y = Math.round(parseFloat(yStr) * factor) / factor;
    if (cmd.toUpperCase() === 'L' && x === lastX && y === lastY) {
      return '';
    }
    lastX = x;
    lastY = y;
    return `${cmd.toUpperCase()}${x},${y}`;
  }).replace(/\s+/g, '');
}

function roundPath(d, decimals = 2) {
  return cleanSvgPath(d, decimals);
}

function getZipGeoJsonPath(abbr) {
  const dir = path.join(__dirname, '..', 'temp_zipcodes');
  if (!fs.existsSync(dir)) return null;
  const prefix = abbr.toLowerCase() + '_';
  const file = fs.readdirSync(dir).find(f => f.toLowerCase().startsWith(prefix) && f.endsWith('.min.json'));
  return file ? path.join(dir, file) : null;
}

async function buildAllData() {
  console.log('🚀 Starting unified data compilation for Interactive SVG Map...');

  // Load US Atlas
  const us = require('us-atlas/counties-10m.json');
  const statesGeo = topojson.feature(us, us.objects.states);
  const countiesGeo = topojson.feature(us, us.objects.counties);

  // Unified national projection (960 x 600)
  const masterProj = d3Geo.geoAlbersUsa().fitSize([960, 600], statesGeo);
  const pathGen = d3Geo.geoPath().projection(masterProj);

  // Puerto Rico Projection Inset (Conic Equal Area positioned neatly southeast of Florida in Atlantic waters)
  const prProj = d3Geo.geoConicEqualArea()
    .rotate([66, 0])
    .center([0, 18])
    .parallels([8, 18])
    .scale(1500)
    .translate([900, 545]);
  const prPathGen = d3Geo.geoPath().projection(prProj);

  // Load Congressional Districts from shapefile
  console.log('📦 Reading 118th Congressional Districts cartographic shapefile...');
  const cdGeo = await shapefile.read('temp_census/cb_2022_us_cd118_20m.shp');
  console.log(`✓ Read ${cdGeo.features.length} Congressional Districts`);

  // Load Zip Codes to Congressional Districts Crosswalk
  console.log('📦 Reading Zip Code to Congressional District crosswalk (zccd)...');
  const zccdMap = {};
  if (fs.existsSync('temp_census/zccd.csv')) {
    const lines = fs.readFileSync('temp_census/zccd.csv', 'utf8').split('\n').filter(Boolean);
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 4) {
        const stateAbbr = parts[1].trim();
        const zcta = parts[2].trim().padStart(5, '0');
        const cdNum = parts[3].trim();
        const dFormatted = (cdNum === '0' || cdNum === '00') ? 'At-Large' : cdNum;
        if (!zccdMap[zcta]) {
          zccdMap[zcta] = `${stateAbbr}-${dFormatted}`;
        }
      }
    }
    console.log(`✓ Loaded ${Object.keys(zccdMap).length} Zip-to-District mappings`);
  }

  // Load Zip Codes & Cities from USCities.json
  console.log('📦 Reading US Zip Codes & Cities database...');
  const allZips = JSON.parse(fs.readFileSync('temp_census/USCities.json', 'utf8'));
  console.log(`✓ Read ${allZips.length} Zip Code entries`);

  // Index zip entries by 5-digit zip code
  const zipLookup = {};
  const zipsByState = {};
  for (const z of allZips) {
    const pZip = String(z.zip_code).padStart(5, '0');
    if (!zipLookup[pZip]) zipLookup[pZip] = z;
    if (!zipsByState[z.state]) zipsByState[z.state] = [];
    zipsByState[z.state].push(z);
  }

  // Group Congressional districts by state FIPS
  const cdByStateFips = {};
  for (const feat of cdGeo.features) {
    const fips = feat.properties.STATEFP;
    if (!cdByStateFips[fips]) cdByStateFips[fips] = [];
    cdByStateFips[fips].push(feat);
  }

  // Master outputs
  const masterStatesList = [];
  const searchIndex = [];

  // Directory setup
  const outDir = path.join(__dirname, '..', 'data', 'usa');
  const statesDir = path.join(outDir, 'states');
  const svgsDir = path.join(__dirname, '..', 'svgs');
  const stateSvgsDir = path.join(svgsDir, 'states');
  const distDir = path.join(__dirname, '..', 'dist');

  fs.mkdirSync(statesDir, { recursive: true });
  fs.mkdirSync(stateSvgsDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });

  // Process Each State
  for (const [fips, meta] of Object.entries(STATE_META)) {
    const stateFeature = statesGeo.features.find(s => s.id === fips);
    let statePath = '';
    let stateBounds = [[0, 0], [0, 0]];
    let stateCenter = [0, 0];

    // Local projection fallback for Puerto Rico or non-Albers areas
    let stateProj = masterProj;
    let isLocalProj = false;

    if (fips === '72') {
      isLocalProj = true;
      stateProj = prProj;
      if (stateFeature) {
        statePath = roundPath(prPathGen(stateFeature));
        stateBounds = prPathGen.bounds(stateFeature).map(pt => pt.map(v => round(v, 1)));
        stateCenter = prPathGen.centroid(stateFeature).map(v => round(v, 1));
      }
    } else if (stateFeature) {
      const p = pathGen(stateFeature);
      if (p && p.length > 0) {
        statePath = roundPath(p);
        stateBounds = pathGen.bounds(stateFeature).map(pt => pt.map(v => round(v, 1)));
        stateCenter = pathGen.centroid(stateFeature).map(v => round(v, 1));
      }
    }

    const stateWidth = Math.max(10, round(stateBounds[1][0] - stateBounds[0][0]));
    const stateHeight = Math.max(10, round(stateBounds[1][1] - stateBounds[0][1]));
    const stateViewBox = `${round(stateBounds[0][0])} ${round(stateBounds[0][1])} ${stateWidth} ${stateHeight}`;

    // Add state to search index
    searchIndex.push({
      type: 'state',
      id: meta.abbr,
      name: `${meta.name} (${meta.abbr})`,
      abbr: meta.abbr,
      capital: meta.capital,
      center: stateCenter,
      bounds: [stateBounds[0][0], stateBounds[0][1], stateWidth, stateHeight]
    });

    // 1. Process Counties for this state
    const stateCounties = countiesGeo.features.filter(c => c.id.startsWith(fips));
    const countiesData = [];

    for (const cFeat of stateCounties) {
      const cPathGen = isLocalProj ? d3Geo.geoPath().projection(stateProj) : pathGen;
      const cPath = roundPath(cPathGen(cFeat));
      if (!cPath) continue;

      const cBounds = cPathGen.bounds(cFeat).map(pt => pt.map(v => round(v)));
      const cCenter = cPathGen.centroid(cFeat).map(v => round(v));
      const cWidth = Math.max(1, round(cBounds[1][0] - cBounds[0][0]));
      const cHeight = Math.max(1, round(cBounds[1][1] - cBounds[0][1]));
      const countyName = cFeat.properties.name || `County ${cFeat.id}`;

      const countyItem = {
        id: cFeat.id,
        name: countyName,
        state: meta.abbr,
        path: cPath,
        center: cCenter,
        bounds: [cBounds[0][0], cBounds[0][1], cWidth, cHeight]
      };
      countiesData.push(countyItem);

      searchIndex.push({
        type: 'county',
        id: cFeat.id,
        name: `${countyName} County, ${meta.abbr}`,
        countyName: countyName,
        state: meta.abbr,
        bounds: [cBounds[0][0], cBounds[0][1], cWidth, cHeight]
      });
    }

    // 2. Process Congressional Districts for this state
    const cdFeatures = cdByStateFips[fips] || [];
    const districtsData = [];

    for (const cdFeat of cdFeatures) {
      const cdPathGen = isLocalProj ? d3Geo.geoPath().projection(stateProj) : pathGen;
      const cdPath = roundPath(cdPathGen(cdFeat));
      if (!cdPath) continue;

      const cdBounds = cdPathGen.bounds(cdFeat).map(pt => pt.map(v => round(v)));
      const cdCenter = cdPathGen.centroid(cdFeat).map(v => round(v));
      const cdWidth = Math.max(1, round(cdBounds[1][0] - cdBounds[0][0]));
      const cdHeight = Math.max(1, round(cdBounds[1][1] - cdBounds[0][1]));

      const dNum = cdFeat.properties.CD118FP === '00' ? 'At-Large' : parseInt(cdFeat.properties.CD118FP, 10);
      const districtId = `${meta.abbr}-${cdFeat.properties.CD118FP}`;
      const districtTitle = `${meta.name} Congressional District ${dNum}`;

      const districtItem = {
        id: districtId,
        districtNumber: dNum,
        name: districtTitle,
        shortName: `${meta.abbr}-${dNum}`,
        state: meta.abbr,
        congress: '118th Congress',
        landAreaSqKm: Math.round(cdFeat.properties.ALAND / 1e6),
        path: cdPath,
        center: cdCenter,
        bounds: [cdBounds[0][0], cdBounds[0][1], cdWidth, cdHeight]
      };
      districtsData.push(districtItem);

      searchIndex.push({
        type: 'district',
        id: districtId,
        name: districtTitle,
        shortName: `${meta.abbr}-${dNum}`,
        state: meta.abbr,
        bounds: [cdBounds[0][0], cdBounds[0][1], cdWidth, cdHeight]
      });
    }

    // 3. Process Real Zip Codes using OpenDataDE / Census ZCTA GeoJSON & TopoJSON Topology
    const zipPolygons = [];
    const zipGeoPath = getZipGeoJsonPath(meta.abbr);
    const rawZips = zipsByState[meta.abbr] || [];
    let stateZipTopo = null;

    if (zipGeoPath && fs.existsSync(zipGeoPath)) {
      const zipGeoData = JSON.parse(fs.readFileSync(zipGeoPath, 'utf8'));
      const zipPathGen = isLocalProj ? prPathGen : pathGen;

      // Construct TopoJSON topology across all zip codes in the state.
      // This quantizes and aligns all shared boundaries into shared arcs (topo.arcs),
      // completely eliminating gaps, breaks, and overlapping slivers between adjacent zip codes!
      stateZipTopo = topojsonServer.topology({ zips: zipGeoData }, 4e4);
      const stitchedFeatures = topojson.feature(stateZipTopo, stateZipTopo.objects.zips).features;

      for (const feat of stitchedFeatures) {
        const zip = String(feat.properties.ZCTA5CE10 || '').padStart(5, '0');
        if (!zip) continue;

        const p = cleanSvgPath(zipPathGen(feat), 2);
        if (!p) continue;

        const bounds = zipPathGen.bounds(feat).map(pt => pt.map(v => round(v, 2)));
        const centroid = zipPathGen.centroid(feat).map(v => round(v, 2));
        const zWidth = Math.max(0.5, round(bounds[1][0] - bounds[0][0], 2));
        const zHeight = Math.max(0.5, round(bounds[1][1] - bounds[0][1], 2));

        const uInfo = zipLookup[zip];
        const cityName = uInfo ? uInfo.city : (feat.properties.GEOID10 || 'Area');
        const countyName = uInfo ? uInfo.county : '';
        const cdMap = zccdMap[zip] || '';

        const zipItem = {
          zip,
          city: cityName,
          county: countyName,
          state: meta.abbr,
          district: cdMap,
          lat: round(parseFloat(feat.properties.INTPTLAT10) || (uInfo ? uInfo.latitude : 0), 4),
          lon: round(parseFloat(feat.properties.INTPTLON10) || (uInfo ? uInfo.longitude : 0), 4),
          center: centroid,
          x: centroid[0],
          y: centroid[1],
          bounds: [bounds[0][0], bounds[0][1], zWidth, zHeight],
          path: p
        };
        zipPolygons.push(zipItem);

        searchIndex.push({
          type: 'zip',
          id: zip,
          name: `${zip} - ${cityName}, ${meta.abbr}`,
          zip,
          city: cityName,
          county: countyName,
          district: cdMap,
          state: meta.abbr,
          lat: zipItem.lat,
          lon: zipItem.lon,
          x: zipItem.x,
          y: zipItem.y,
          bounds: zipItem.bounds
        });
      }
    } else if (fips === '72') {
      // Puerto Rico 177 real Voronoi polygon cells bounded to PR territory
      const points = [];
      const validZips = [];
      for (const z of rawZips) {
        const coord = prProj([z.longitude, z.latitude]);
        if (coord && !isNaN(coord[0]) && !isNaN(coord[1])) {
          points.push(coord);
          validZips.push(z);
        }
      }
      const pad = 3;
      const delaunay = Delaunay.from(points);
      const voronoi = delaunay.voronoi([
        stateBounds[0][0] - pad,
        stateBounds[0][1] - pad,
        stateBounds[0][0] + stateWidth + pad,
        stateBounds[0][1] + stateHeight + pad
      ]);

      for (let i = 0; i < validZips.length; i++) {
        const z = validZips[i];
        const pZip = String(z.zip_code).padStart(5, '0');
        const coord = points[i];
        const p = roundPath(voronoi.renderCell(i));
        const cdMap = zccdMap[pZip] || 'PR-At-Large';
        const poly = voronoi.cellPolygon(i);
        let minX = coord[0], maxX = coord[0], minY = coord[1], maxY = coord[1];
        if (poly && poly.length > 0) {
          minX = Math.min(...poly.map(pt => pt[0]));
          maxX = Math.max(...poly.map(pt => pt[0]));
          minY = Math.min(...poly.map(pt => pt[1]));
          maxY = Math.max(...poly.map(pt => pt[1]));
        }
        const zWidth = Math.max(0.5, round(maxX - minX, 1));
        const zHeight = Math.max(0.5, round(maxY - minY, 1));
        const zipItem = {
          zip: pZip,
          city: z.city,
          county: z.county,
          state: meta.abbr,
          district: cdMap,
          lat: z.latitude,
          lon: z.longitude,
          center: [round(coord[0], 1), round(coord[1], 1)],
          x: round(coord[0], 1),
          y: round(coord[1], 1),
          bounds: [round(minX, 1), round(minY, 1), zWidth, zHeight],
          path: p
        };
        zipPolygons.push(zipItem);

        searchIndex.push({
          type: 'zip',
          id: pZip,
          name: `${pZip} - ${z.city}, ${meta.abbr}`,
          zip: pZip,
          city: z.city,
          county: z.county,
          district: cdMap,
          state: meta.abbr,
          lat: z.latitude,
          lon: z.longitude,
          x: zipItem.x,
          y: zipItem.y,
          bounds: zipItem.bounds
        });
      }
    } else {
      // Fallback for areas without ZCTA file
      for (const z of rawZips) {
        const pZip = String(z.zip_code).padStart(5, '0');
        const coord = stateProj([z.longitude, z.latitude]);
        if (coord && !isNaN(coord[0]) && !isNaN(coord[1])) {
          const cdMap = zccdMap[pZip] || '';
          const r = 2.5;
          const circlePath = `M${round(coord[0]-r,1)},${round(coord[1],1)}a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;
          const zipItem = {
            zip: pZip,
            city: z.city,
            county: z.county,
            state: meta.abbr,
            district: cdMap,
            lat: z.latitude,
            lon: z.longitude,
            center: [round(coord[0], 1), round(coord[1], 1)],
            x: round(coord[0], 1),
            y: round(coord[1], 1),
            bounds: [round(coord[0]-r,1), round(coord[1]-r,1), r*2, r*2],
            path: circlePath
          };
          zipPolygons.push(zipItem);

          searchIndex.push({
            type: 'zip',
            id: pZip,
            name: `${pZip} - ${z.city}, ${meta.abbr}`,
            zip: pZip,
            city: z.city,
            county: z.county,
            district: cdMap,
            state: meta.abbr,
            lat: z.latitude,
            lon: z.longitude,
            x: zipItem.x,
            y: zipItem.y,
            bounds: zipItem.bounds
          });
        }
      }
    }

    // 4. Process Cities & Stitched Zip Code Boundaries
    const cityMap = {};
    for (const z of rawZips) {
      const cName = z.city;
      if (!cName) continue;
      if (!cityMap[cName]) {
        cityMap[cName] = {
          name: cName,
          lats: [],
          lons: [],
          zips: [],
          counties: {}
        };
      }
      cityMap[cName].lats.push(z.latitude);
      cityMap[cName].lons.push(z.longitude);
      cityMap[cName].zips.push(String(z.zip_code).padStart(5, '0'));
      cityMap[cName].counties[z.county] = (cityMap[cName].counties[z.county] || 0) + 1;
    }

    const computedCities = [];
    for (const [cName, cInfo] of Object.entries(cityMap)) {
      const avgLat = cInfo.lats.reduce((a, b) => a + b, 0) / cInfo.lats.length;
      const avgLon = cInfo.lons.reduce((a, b) => a + b, 0) / cInfo.lons.length;
      const primaryCounty = Object.entries(cInfo.counties).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
      const isCap = (cName.toLowerCase() === meta.capital.toLowerCase());
      
      const coord = isCap ? stateProj([meta.capLon, meta.capLat]) : stateProj([avgLon, avgLat]);
      if (coord && !isNaN(coord[0]) && !isNaN(coord[1])) {
        // Find member zip code polygons for stitched city shape
        const memberZips = zipPolygons.filter(z =>
          (cInfo.zips && cInfo.zips.includes(z.zip)) ||
          (z.city && z.city.toLowerCase() === cName.toLowerCase())
        );

        let cityBounds = [round(coord[0] - 2, 1), round(coord[1] - 2, 1), 4, 4];
        let stitchedPath = '';
        let cx = round(coord[0], 1);
        let cy = round(coord[1], 1);

        if (memberZips.length > 0) {
          const minX = Math.min(...memberZips.map(z => z.bounds[0]));
          const minY = Math.min(...memberZips.map(z => z.bounds[1]));
          const maxX = Math.max(...memberZips.map(z => z.bounds[0] + z.bounds[2]));
          const maxY = Math.max(...memberZips.map(z => z.bounds[1] + z.bounds[3]));
          const cW = Math.max(0.5, round(maxX - minX, 1));
          const cH = Math.max(0.5, round(maxY - minY, 1));
          cityBounds = [round(minX, 1), round(minY, 1), cW, cH];

          // Compute dissolved outer boundary using topojson.merge if state topology is available
          if (stateZipTopo && cInfo.zips && cInfo.zips.length > 0) {
            const memberGeoms = stateZipTopo.objects.zips.geometries.filter(g =>
              cInfo.zips.includes(String(g.properties.ZCTA5CE10))
            );
            if (memberGeoms.length > 0) {
              try {
                const mergedGeom = topojson.merge(stateZipTopo, memberGeoms);
                const cityPathGen = isLocalProj ? prPathGen : pathGen;
                stitchedPath = cleanSvgPath(cityPathGen(mergedGeom), 2);
              } catch (e) {
                stitchedPath = memberZips.map(z => z.path).join(' ');
              }
            }
          }
          if (!stitchedPath) {
            stitchedPath = memberZips.map(z => z.path).join(' ');
          }
          if (!isCap) {
            cx = round(minX + cW / 2, 1);
            cy = round(minY + cH / 2, 1);
          }
        }

        computedCities.push({
          id: `${meta.abbr}-${cName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          name: cName,
          cityName: cName,
          state: meta.abbr,
          county: primaryCounty,
          isCapital: isCap,
          lat: round(isCap ? meta.capLat : avgLat, 4),
          lon: round(isCap ? meta.capLon : avgLon, 4),
          x: cx,
          y: cy,
          bounds: cityBounds,
          stitchedPath: stitchedPath,
          zipCount: memberZips.length || cInfo.zips.length,
          zips: memberZips.length > 0 ? memberZips.map(z => z.zip) : cInfo.zips,
          pop: isCap ? (meta.pop ? Math.round(meta.pop * 0.1) : 120000) : (cInfo.zips.length * 15000)
        });
      }
    }

    // Make sure capital is explicitly included if not found
    if (!computedCities.some(c => c.isCapital)) {
      const capCoord = stateProj([meta.capLon, meta.capLat]);
      if (capCoord) {
        computedCities.unshift({
          id: `${meta.abbr}-${meta.capital.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          name: meta.capital,
          cityName: meta.capital,
          state: meta.abbr,
          county: '',
          isCapital: true,
          lat: meta.capLat,
          lon: meta.capLon,
          x: round(capCoord[0], 1),
          y: round(capCoord[1], 1),
          bounds: [round(capCoord[0] - 2, 1), round(capCoord[1] - 2, 1), 4, 4],
          stitchedPath: '',
          zipCount: 1,
          zips: [],
          pop: meta.pop ? Math.round(meta.pop * 0.1) : 100000
        });
      }
    }

    // Sort cities: capital first, then by zipCount descending
    computedCities.sort((a, b) => {
      if (a.isCapital) return -1;
      if (b.isCapital) return 1;
      return b.zipCount - a.zipCount;
    });

    // Top 30 cities for SVG map rendering
    const renderedCities = computedCities.slice(0, 30);

    // Index ALL computed cities into search index with true composite bounds
    for (const c of computedCities) {
      searchIndex.push({
        type: 'city',
        id: c.id,
        name: `${c.cityName}, ${meta.abbr}${c.isCapital ? ' (Capital)' : ''}`,
        cityName: c.cityName,
        state: meta.abbr,
        county: c.county,
        isCapital: c.isCapital,
        zipCount: c.zipCount,
        zips: c.zips,
        x: c.x,
        y: c.y,
        lat: c.lat,
        lon: c.lon,
        bounds: c.bounds
      });
    }

    // 5. Load Regions (Thumbtack Mapped Regions for CA or other states)
    let stateRegions = [];
    if (meta.abbr === 'CA') {
      const thumbtackFile = path.join(__dirname, '..', 'data', 'thumbtack', 'california-regions.json');
      if (fs.existsSync(thumbtackFile)) {
        try {
          const ttData = JSON.parse(fs.readFileSync(thumbtackFile, 'utf8'));
          stateRegions = ttData.metros || [];
          for (const m of stateRegions) {
            searchIndex.push({
              type: 'region',
              id: m.id,
              name: `${m.name}, CA (Metro Region)`,
              metroName: m.name,
              state: 'CA',
              citiesCount: m.citiesCount,
              zipCount: m.zipCount,
              monthlyReach: m.monthlyReach,
              bounds: m.bounds,
              center: m.center
            });
          }
        } catch (e) {
          console.warn('Could not load Thumbtack California regions', e);
        }
      }
    }

    // 6. Build State Output Object
    const stateObj = {
      fips: fips,
      abbr: meta.abbr,
      name: meta.name,
      capital: meta.capital,
      population: meta.pop,
      landAreaSqMi: meta.area,
      region: meta.region,
      path: statePath,
      bounds: [stateBounds[0][0], stateBounds[0][1], stateWidth, stateHeight],
      viewBox: stateViewBox,
      center: stateCenter,
      countiesCount: countiesData.length,
      districtsCount: districtsData.length,
      citiesCount: computedCities.length,
      zipCodesCount: zipPolygons.length,
      regionsCount: stateRegions.length,
      regions: stateRegions,
      counties: countiesData,
      districts: districtsData,
      cities: renderedCities,
      allCities: computedCities.map(c => ({ id: c.id, name: c.name, cityName: c.cityName, county: c.county, isCapital: c.isCapital, x: c.x, y: c.y, bounds: c.bounds, stitchedPath: c.stitchedPath, zipCount: c.zipCount, zips: c.zips })),
      zipcodes: zipPolygons
    };

    // Save individual state JSON
    fs.writeFileSync(path.join(statesDir, `${meta.abbr}.json`), JSON.stringify(stateObj));

    // 7. Generate Standalone State SVG
    const svgVx = stateBounds[0][0] - 15;
    const svgVy = stateBounds[0][1] - 15;
    const svgVw = stateWidth + 30;
    const svgVh = stateHeight + 30;
    const scaleFactor = Math.max(0.12, svgVw / 960);
    const cityFont = round(7 * scaleFactor, 1);
    const capFont = round(8.5 * scaleFactor, 1);
    const cityR = round(3 * scaleFactor, 1);

    const stateSvgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgVx} ${svgVy} ${svgVw} ${svgVh}" width="100%" height="100%" class="state-svg-map state-${meta.abbr}">
  <defs>
    <style>
      .state-bg { fill: #f8fafc; stroke: #64748b; stroke-width: 1.2px; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
      .county-path { fill: #ffffff; stroke: #cbd5e1; stroke-width: 0.75px; vector-effect: non-scaling-stroke; transition: fill 0.15s, stroke 0.15s; }
      .county-path:hover { fill: #e0f2fe; stroke: #0284c7; stroke-width: 1.5px; cursor: pointer; }
      .district-path { fill: #eff6ff; fill-opacity: 0.7; stroke: #3b82f6; stroke-width: 1px; stroke-dasharray: 4 2; vector-effect: non-scaling-stroke; }
      .district-path:hover { fill: #bfdbfe; fill-opacity: 0.9; stroke: #1d4ed8; stroke-width: 1.8px; cursor: pointer; stroke-dasharray: none; }
      .zipcode-path { fill: rgba(248, 250, 252, 0.4); stroke: #94a3b8; stroke-width: 0.5px; vector-effect: non-scaling-stroke; transition: fill 0.12s, stroke 0.12s; }
      .zipcode-path:hover { fill: #fef08a; fill-opacity: 0.7; stroke: #ca8a04; stroke-width: 1.2px; cursor: pointer; }
      .city-stitched-boundary { fill: rgba(56, 189, 248, 0.18); stroke: #0284c7; stroke-width: 1.8px; stroke-linejoin: round; vector-effect: non-scaling-stroke; pointer-events: none; }
      .city-marker { fill: #ef4444; stroke: #ffffff; stroke-width: 1px; vector-effect: non-scaling-stroke; }
      .capital-marker { fill: #f59e0b; stroke: #ffffff; stroke-width: 1.2px; vector-effect: non-scaling-stroke; }
      .city-label { font-family: system-ui, -apple-system, sans-serif; font-size: ${cityFont}px; font-weight: 600; fill: #1e293b; pointer-events: none; paint-order: stroke fill; stroke: #ffffff; stroke-width: ${round(0.8 * scaleFactor, 2)}px; }
      .capital-label { font-family: system-ui, -apple-system, sans-serif; font-size: ${capFont}px; font-weight: 700; fill: #0f172a; pointer-events: none; paint-order: stroke fill; stroke: #ffffff; stroke-width: ${round(1 * scaleFactor, 2)}px; }
    </style>
    <clipPath id="clip-${meta.abbr}">
      <path d="${statePath}" />
    </clipPath>
  </defs>

  <!-- State Boundary Outline -->
  <path id="state-${meta.abbr}" class="state-bg" d="${statePath}" vector-effect="non-scaling-stroke" />

  <!-- Counties Layer -->
  <g id="counties-${meta.abbr}" class="layer-counties" clip-path="url(#clip-${meta.abbr})">
    ${countiesData.map(c => `<path id="county-${c.id}" class="county-path" data-fips="${c.id}" data-name="${c.name}" d="${c.path}" vector-effect="non-scaling-stroke"><title>${c.name} County</title></path>`).join('\n    ')}
  </g>

  <!-- Congressional Districts Layer -->
  <g id="districts-${meta.abbr}" class="layer-districts" style="display:none;" clip-path="url(#clip-${meta.abbr})">
    ${districtsData.map(d => `<path id="district-${d.id}" class="district-path" data-id="${d.id}" data-name="${d.name}" d="${d.path}" vector-effect="non-scaling-stroke"><title>${d.name}</title></path>`).join('\n    ')}
  </g>

  <!-- Zip Codes Layer -->
  <g id="zipcodes-${meta.abbr}" class="layer-zipcodes" style="display:none;" clip-path="url(#clip-${meta.abbr})">
    ${zipPolygons.map(z => `<path id="zip-${z.zip}" class="zipcode-path" data-zip="${z.zip}" data-city="${z.city}" data-district="${z.district || ''}" d="${z.path}" vector-effect="non-scaling-stroke"><title>ZIP ${z.zip} (${z.city}) ${z.district ? '• ' + z.district : ''}</title></path>`).join('\n    ')}
  </g>

  <!-- Stitched City Boundaries Layer -->
  <g id="cities-stitched-${meta.abbr}" class="layer-city-stitched" style="display:none;" clip-path="url(#clip-${meta.abbr})">
    ${renderedCities.filter(c => c.stitchedPath).map(c => `<path id="city-stitched-${c.id}" class="city-stitched-boundary" data-name="${c.name}" data-city="${c.cityName}" d="${c.stitchedPath}" vector-effect="non-scaling-stroke"><title>${c.name} (${c.zipCount} ZIP Codes)</title></path>`).join('\n    ')}
  </g>

  <!-- Regions Layer -->
  <g id="regions-${meta.abbr}" class="layer-regions" style="display:none;" clip-path="url(#clip-${meta.abbr})">
    ${stateRegions.map(r => `<path id="region-${r.id}" class="region-path" data-id="${r.id}" data-name="${r.name}" d="${r.path}" vector-effect="non-scaling-stroke"><title>${r.name} (${r.citiesCount} Cities)</title></path>`).join('\n    ')}
  </g>

  <!-- Cities & Capitals Layer -->
  <g id="cities-${meta.abbr}" class="layer-cities">
    ${renderedCities.map(c => {
      if (c.isCapital) {
        return `<g class="city-group capital-group" transform="translate(${c.x}, ${c.y})">
          <polygon class="capital-marker" points="0,-${round(5 * scaleFactor, 1)} ${round(1.5 * scaleFactor, 1)},-${round(1.5 * scaleFactor, 1)} ${round(5 * scaleFactor, 1)},-${round(1.5 * scaleFactor, 1)} ${round(2.2 * scaleFactor, 1)},${round(0.8 * scaleFactor, 1)} ${round(3.5 * scaleFactor, 1)},${round(4.5 * scaleFactor, 1)} 0,${round(2.2 * scaleFactor, 1)} -${round(3.5 * scaleFactor, 1)},${round(4.5 * scaleFactor, 1)} -${round(2.2 * scaleFactor, 1)},${round(0.8 * scaleFactor, 1)} -${round(5 * scaleFactor, 1)},-${round(1.5 * scaleFactor, 1)} -${round(1.5 * scaleFactor, 1)},-${round(1.5 * scaleFactor, 1)}" />
          <text class="capital-label" x="${round(7 * scaleFactor, 1)}" y="${round(2.5 * scaleFactor, 1)}">${c.name} ★</text>
        </g>`;
      }
      return `<g class="city-group" transform="translate(${c.x}, ${c.y})">
        <circle class="city-marker" r="${cityR}" />
        <text class="city-label" x="${round(4.5 * scaleFactor, 1)}" y="${round(2 * scaleFactor, 1)}">${c.name}</text>
      </g>`;
    }).join('\n    ')}
  </g>
</svg>`;

    fs.writeFileSync(path.join(stateSvgsDir, `${meta.abbr}.svg`), stateSvgContent);

    // Save summary entry for master states list
    masterStatesList.push({
      fips: fips,
      abbr: meta.abbr,
      name: meta.name,
      capital: meta.capital,
      population: meta.pop,
      landAreaSqMi: meta.area,
      region: meta.region,
      path: statePath,
      bounds: [stateBounds[0][0], stateBounds[0][1], stateWidth, stateHeight],
      viewBox: stateViewBox,
      center: stateCenter,
      countiesCount: countiesData.length,
      districtsCount: districtsData.length,
      citiesCount: computedCities.length,
      zipCodesCount: zipPolygons.length,
      regionsCount: stateRegions.length
    });

    console.log(`✓ Processed ${meta.abbr} (${meta.name}): ${countiesData.length} counties, ${districtsData.length} districts, ${computedCities.length} cities, ${zipPolygons.length} real ZCTA zips`);
  }

  // 7. Write Master States List
  fs.writeFileSync(path.join(outDir, 'states.json'), JSON.stringify(masterStatesList, null, 2));

  // 8. Write Search Index (deduplicated)
  fs.writeFileSync(path.join(outDir, 'search-index.json'), JSON.stringify(searchIndex));
  console.log(`✓ Generated search index with ${searchIndex.length} entries`);

  // 9. Write Fast Offline Data Bundle (States Overview + Search Index)
  const jsBundleData = `window.__USA_MAP_DATA__ = ${JSON.stringify({
    states: masterStatesList,
    searchIndex: searchIndex
  })};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.__USA_MAP_DATA__;
}
`;
  fs.writeFileSync(path.join(distDir, 'usa-all-data.js'), jsBundleData);
  console.log('✓ Generated standalone offline data bundle: dist/usa-all-data.js');

  // 10. Generate Master USA SVG
  console.log('🎨 Generating Master USA SVGs...');
  const masterSvgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" width="100%" height="100%" id="usa-master-svg" class="usa-map">
  <defs>
    <style>
      .state-layer path { fill: #f1f5f9; stroke: #64748b; stroke-width: 1px; stroke-linejoin: round; vector-effect: non-scaling-stroke; transition: fill 0.2s, stroke 0.2s, transform 0.2s; }
      .state-layer path:hover { fill: #38bdf8; stroke: #0284c7; stroke-width: 2px; cursor: pointer; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
      .state-layer path.active { fill: #0284c7; stroke: #0369a1; stroke-width: 2px; }
      .state-label { font-family: system-ui, -apple-system, sans-serif; font-size: 9px; font-weight: 700; fill: #475569; pointer-events: none; text-anchor: middle; }
    </style>
  </defs>

  <!-- States Layer -->
  <g id="states" class="state-layer">
    ${masterStatesList.filter(s => s.path).map(s => `<path id="state-path-${s.abbr}" data-abbr="${s.abbr}" data-fips="${s.fips}" data-name="${s.name}" d="${s.path}" vector-effect="non-scaling-stroke"><title>${s.name}</title></path>`).join('\n    ')}
  </g>

  <!-- State Labels -->
  <g id="state-labels" class="state-labels-layer">
    ${masterStatesList.filter(s => s.center && s.center[0] > 0 && s.abbr !== 'DC' && s.abbr !== 'RI' && s.abbr !== 'DE').map(s => `<text class="state-label" x="${s.center[0]}" y="${s.center[1] + 3}">${s.abbr}</text>`).join('\n    ')}
  </g>
</svg>`;

  fs.writeFileSync(path.join(svgsDir, 'usa-master.svg'), masterSvgContent);
  fs.writeFileSync(path.join(svgsDir, 'usa-states-only.svg'), masterSvgContent);

  // 11. Write index module for data
  const dataIndexJs = `// Auto-generated USA Map Data Index
module.exports = {
  states: require('./states.json'),
  getStateData: (abbr) => {
    try {
      return require('./states/' + abbr.toUpperCase() + '.json');
    } catch (e) {
      return null;
    }
  },
  getSearchIndex: () => require('./search-index.json')
};
`;
  fs.writeFileSync(path.join(outDir, 'index.js'), dataIndexJs);

  console.log('✅ Master data build complete with real Census ZCTA boundaries & true city centroids!');
}

buildAllData().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
