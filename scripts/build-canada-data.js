const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');
const d3 = require('d3-geo');
const { Delaunay } = require('d3-delaunay');

const PROVINCE_MAP = {
  '10': { abbr: 'NL', name: 'Newfoundland and Labrador', capital: "St. John's", population: 541000, landAreaSqKm: 405212, region: 'Atlantic' },
  '11': { abbr: 'PE', name: 'Prince Edward Island', capital: 'Charlottetown', population: 176000, landAreaSqKm: 5660, region: 'Atlantic' },
  '12': { abbr: 'NS', name: 'Nova Scotia', capital: 'Halifax', population: 1059000, landAreaSqKm: 55284, region: 'Atlantic' },
  '13': { abbr: 'NB', name: 'New Brunswick', capital: 'Fredericton', population: 835000, landAreaSqKm: 72908, region: 'Atlantic' },
  '24': { abbr: 'QC', name: 'Quebec', capital: 'Quebec City', population: 8900000, landAreaSqKm: 1542056, region: 'Central' },
  '35': { abbr: 'ON', name: 'Ontario', capital: 'Toronto', population: 15600000, landAreaSqKm: 1076395, region: 'Central' },
  '46': { abbr: 'MB', name: 'Manitoba', capital: 'Winnipeg', population: 1450000, landAreaSqKm: 647797, region: 'Prairies' },
  '47': { abbr: 'SK', name: 'Saskatchewan', capital: 'Regina', population: 1220000, landAreaSqKm: 651036, region: 'Prairies' },
  '48': { abbr: 'AB', name: 'Alberta', capital: 'Edmonton', population: 4760000, landAreaSqKm: 661848, region: 'Prairies' },
  '59': { abbr: 'BC', name: 'British Columbia', capital: 'Victoria', population: 5520000, landAreaSqKm: 944735, region: 'Pacific' },
  '60': { abbr: 'YT', name: 'Yukon', capital: 'Whitehorse', population: 45000, landAreaSqKm: 482443, region: 'Northern' },
  '61': { abbr: 'NT', name: 'Northwest Territories', capital: 'Yellowknife', population: 45500, landAreaSqKm: 1346106, region: 'Northern' },
  '62': { abbr: 'NU', name: 'Nunavut', capital: 'Iqaluit', population: 40500, landAreaSqKm: 2093190, region: 'Northern' }
};

const MAJOR_CITIES = [
  // Ontario
  { name: 'Toronto', province: 'ON', lat: 43.6532, lon: -79.3832, isCapital: true, pop: 2794356, county: 'Toronto' },
  { name: 'Ottawa', province: 'ON', lat: 45.4215, lon: -75.6972, isCapital: false, isFedCapital: true, pop: 1017449, county: 'Ottawa' },
  { name: 'Mississauga', province: 'ON', lat: 43.5890, lon: -79.6441, isCapital: false, pop: 717961, county: 'Peel' },
  { name: 'Brampton', province: 'ON', lat: 43.7315, lon: -79.7624, isCapital: false, pop: 656480, county: 'Peel' },
  { name: 'Hamilton', province: 'ON', lat: 43.2557, lon: -79.8711, isCapital: false, pop: 569353, county: 'Hamilton' },
  { name: 'London', province: 'ON', lat: 42.9849, lon: -81.2453, isCapital: false, pop: 422324, county: 'Middlesex' },
  { name: 'Markham', province: 'ON', lat: 43.8561, lon: -79.3370, isCapital: false, pop: 338503, county: 'York' },
  { name: 'Vaughan', province: 'ON', lat: 43.8563, lon: -79.5085, isCapital: false, pop: 323103, county: 'York' },
  { name: 'Kitchener', province: 'ON', lat: 43.4516, lon: -80.4925, isCapital: false, pop: 256885, county: 'Waterloo' },
  { name: 'Windsor', province: 'ON', lat: 42.3149, lon: -83.0364, isCapital: false, pop: 229660, county: 'Essex' },
  { name: 'Richmond Hill', province: 'ON', lat: 43.8828, lon: -79.4403, isCapital: false, pop: 202022, county: 'York' },
  { name: 'Oakville', province: 'ON', lat: 43.4675, lon: -79.6877, isCapital: false, pop: 213759, county: 'Halton' },
  { name: 'Burlington', province: 'ON', lat: 43.3255, lon: -79.7990, isCapital: false, pop: 186948, county: 'Halton' },
  { name: 'Oshawa', province: 'ON', lat: 43.8971, lon: -78.8658, isCapital: false, pop: 175383, county: 'Durham' },
  { name: 'Barrie', province: 'ON', lat: 44.3894, lon: -79.6903, isCapital: false, pop: 153040, county: 'Simcoe' },
  { name: 'Guelph', province: 'ON', lat: 43.5448, lon: -80.2482, isCapital: false, pop: 143740, county: 'Wellington' },
  { name: 'Kingston', province: 'ON', lat: 44.2312, lon: -76.4860, isCapital: false, pop: 132491, county: 'Frontenac' },
  { name: 'Sudbury', province: 'ON', lat: 46.4917, lon: -80.9930, isCapital: false, pop: 166004, county: 'Greater Sudbury' },
  { name: 'Thunder Bay', province: 'ON', lat: 48.3809, lon: -89.2477, isCapital: false, pop: 108843, county: 'Thunder Bay' },

  // Quebec
  { name: 'Montreal', province: 'QC', lat: 45.5017, lon: -73.5673, isCapital: false, pop: 1762949, county: 'Montréal' },
  { name: 'Quebec City', province: 'QC', lat: 46.8139, lon: -71.2080, isCapital: true, pop: 549459, county: 'Québec' },
  { name: 'Laval', province: 'QC', lat: 45.6066, lon: -73.7124, isCapital: false, pop: 438366, county: 'Laval' },
  { name: 'Gatineau', province: 'QC', lat: 45.4765, lon: -75.7013, isCapital: false, pop: 291041, county: 'Gatineau' },
  { name: 'Longueuil', province: 'QC', lat: 45.5412, lon: -73.5042, isCapital: false, pop: 254483, county: 'Longueuil' },
  { name: 'Sherbrooke', province: 'QC', lat: 45.4042, lon: -71.8929, isCapital: false, pop: 172950, county: 'Sherbrooke' },
  { name: 'Saguenay', province: 'QC', lat: 48.4279, lon: -71.0688, isCapital: false, pop: 144723, county: 'Le Fjord-du-Saguenay' },
  { name: 'Lévis', province: 'QC', lat: 46.8033, lon: -71.1779, isCapital: false, pop: 149683, county: 'Lévis' },
  { name: 'Trois-Rivières', province: 'QC', lat: 46.3432, lon: -72.5434, isCapital: false, pop: 139163, county: 'Francheville' },
  { name: 'Terrebonne', province: 'QC', lat: 45.7000, lon: -73.6333, isCapital: false, pop: 119944, county: 'Les Moulins' },

  // British Columbia
  { name: 'Vancouver', province: 'BC', lat: 49.2827, lon: -123.1207, isCapital: false, pop: 662248, county: 'Greater Vancouver' },
  { name: 'Victoria', province: 'BC', lat: 48.4284, lon: -123.3656, isCapital: true, pop: 91865, county: 'Capital' },
  { name: 'Surrey', province: 'BC', lat: 49.1913, lon: -122.8490, isCapital: false, pop: 568322, county: 'Greater Vancouver' },
  { name: 'Burnaby', province: 'BC', lat: 49.2488, lon: -122.9805, isCapital: false, pop: 249125, county: 'Greater Vancouver' },
  { name: 'Richmond', province: 'BC', lat: 49.1666, lon: -123.1336, isCapital: false, pop: 209937, county: 'Greater Vancouver' },
  { name: 'Abbotsford', province: 'BC', lat: 49.0504, lon: -122.3045, isCapital: false, pop: 153524, county: 'Fraser Valley' },
  { name: 'Coquitlam', province: 'BC', lat: 49.2838, lon: -122.7932, isCapital: false, pop: 148623, county: 'Greater Vancouver' },
  { name: 'Kelowna', province: 'BC', lat: 49.8880, lon: -119.4960, isCapital: false, pop: 144576, county: 'Central Okanagan' },
  { name: 'Kamloops', province: 'BC', lat: 50.6745, lon: -120.3273, isCapital: false, pop: 97902, county: 'Thompson-Nicola' },
  { name: 'Nanaimo', province: 'BC', lat: 49.1659, lon: -123.9401, isCapital: false, pop: 99863, county: 'Nanaimo' },
  { name: 'Prince George', province: 'BC', lat: 53.9171, lon: -122.7497, isCapital: false, pop: 76708, county: 'Fraser-Fort George' },

  // Alberta
  { name: 'Calgary', province: 'AB', lat: 51.0447, lon: -114.0719, isCapital: false, pop: 1306784, county: 'Division No. 6' },
  { name: 'Edmonton', province: 'AB', lat: 53.5461, lon: -113.4938, isCapital: true, pop: 1010899, county: 'Division No. 11' },
  { name: 'Red Deer', province: 'AB', lat: 52.2681, lon: -113.8112, isCapital: false, pop: 100844, county: 'Division No. 8' },
  { name: 'Lethbridge', province: 'AB', lat: 49.6956, lon: -112.8451, isCapital: false, pop: 98406, county: 'Division No. 2' },
  { name: 'Medicine Hat', province: 'AB', lat: 50.0417, lon: -110.6775, isCapital: false, pop: 63260, county: 'Division No. 1' },
  { name: 'Grande Prairie', province: 'AB', lat: 55.1699, lon: -118.7986, isCapital: false, pop: 63166, county: 'Division No. 19' },
  { name: 'Fort McMurray', province: 'AB', lat: 56.7264, lon: -111.3803, isCapital: false, pop: 68000, county: 'Division No. 16' },

  // Manitoba
  { name: 'Winnipeg', province: 'MB', lat: 49.8951, lon: -97.1384, isCapital: true, pop: 749607, county: 'Division No. 11' },
  { name: 'Brandon', province: 'MB', lat: 49.8485, lon: -99.9501, isCapital: false, pop: 51311, county: 'Division No. 7' },
  { name: 'Steinbach', province: 'MB', lat: 49.5258, lon: -96.6839, isCapital: false, pop: 17806, county: 'Division No. 2' },

  // Saskatchewan
  { name: 'Saskatoon', province: 'SK', lat: 52.1332, lon: -106.6700, isCapital: false, pop: 266141, county: 'Division No. 11' },
  { name: 'Regina', province: 'SK', lat: 50.4452, lon: -104.6189, isCapital: true, pop: 226404, county: 'Division No. 6' },
  { name: 'Prince Albert', province: 'SK', lat: 53.2033, lon: -105.7531, isCapital: false, pop: 35926, county: 'Division No. 15' },
  { name: 'Moose Jaw', province: 'SK', lat: 50.3933, lon: -105.5519, isCapital: false, pop: 33665, county: 'Division No. 7' },

  // Nova Scotia
  { name: 'Halifax', province: 'NS', lat: 44.6488, lon: -63.5752, isCapital: true, pop: 439819, county: 'Halifax' },
  { name: 'Sydney', province: 'NS', lat: 46.1368, lon: -60.1831, isCapital: false, pop: 29904, county: 'Cape Breton' },
  { name: 'Truro', province: 'NS', lat: 45.3647, lon: -63.2800, isCapital: false, pop: 12953, county: 'Colchester' },

  // New Brunswick
  { name: 'Moncton', province: 'NB', lat: 46.0878, lon: -64.7782, isCapital: false, pop: 79470, county: 'Westmorland' },
  { name: 'Saint John', province: 'NB', lat: 45.2733, lon: -66.0633, isCapital: false, pop: 69885, county: 'Saint John' },
  { name: 'Fredericton', province: 'NB', lat: 45.9636, lon: -66.6431, isCapital: true, pop: 63116, county: 'York' },

  // Newfoundland and Labrador
  { name: "St. John's", province: 'NL', lat: 47.5615, lon: -52.7126, isCapital: true, pop: 110525, county: 'Division No. 1' },
  { name: 'Corner Brook', province: 'NL', lat: 48.9500, lon: -57.9500, isCapital: false, pop: 19333, county: 'Division No. 5' },

  // Prince Edward Island
  { name: 'Charlottetown', province: 'PE', lat: 46.2382, lon: -63.1311, isCapital: true, pop: 38809, county: 'Queens' },
  { name: 'Summerside', province: 'PE', lat: 46.3959, lon: -63.7884, isCapital: false, pop: 16001, county: 'Prince' },

  // Territories
  { name: 'Yellowknife', province: 'NT', lat: 62.4540, lon: -114.3718, isCapital: true, pop: 20340, county: 'Region 6' },
  { name: 'Whitehorse', province: 'YT', lat: 60.7212, lon: -135.0568, isCapital: true, pop: 28201, county: 'Yukon' },
  { name: 'Iqaluit', province: 'NU', lat: 63.7467, lon: -68.5170, isCapital: true, pop: 7429, county: 'Baffin' }
];

async function run() {
  console.log('🚀 Building Canada Map Data Pipeline...');

  const outDataDir = path.join(__dirname, '..', 'data', 'canada');
  const outProvDir = path.join(outDataDir, 'provinces');
  const outSvgsDir = path.join(__dirname, '..', 'svgs', 'canada');
  fs.mkdirSync(outProvDir, { recursive: true });
  fs.mkdirSync(outSvgsDir, { recursive: true });

  // 1. Load Geometries
  const provTopo = JSON.parse(fs.readFileSync('temp_canada/provinces.topojson', 'utf8'));
  const provGeo = topojson.feature(provTopo, Object.keys(provTopo.objects)[0]);

  const cdTopo = JSON.parse(fs.readFileSync('temp_canada/census_divisions.topojson', 'utf8'));
  const cdGeo = topojson.feature(cdTopo, Object.keys(cdTopo.objects)[0]);

  const fedTopo = JSON.parse(fs.readFileSync('temp_canada/federal_electoral_districts.topojson', 'utf8'));
  const fedGeo = topojson.feature(fedTopo, Object.keys(fedTopo.objects)[0]);

  // Load Postal FSAs from GeoNames
  const postalLines = fs.readFileSync('temp_canada/postal/CA.txt', 'utf8').trim().split('\n');
  const fsaList = [];
  postalLines.forEach(line => {
    const parts = line.split('\t');
    if (parts.length >= 11) {
      const fsa = parts[1].trim();
      const place = parts[2].trim();
      const province = parts[4].trim();
      const county = parts[5].trim();
      const lat = parseFloat(parts[9]);
      const lon = parseFloat(parts[10]);
      if (fsa && !isNaN(lat) && !isNaN(lon)) {
        fsaList.push({ fsa, place, province, county, lat, lon });
      }
    }
  });
  console.log(`✓ Loaded ${fsaList.length} Canadian Postal FSAs`);

  // 2. Setup Canada Projection
  const projection = d3.geoConicEqualArea()
    .parallels([49, 77])
    .rotate([96, 0])
    .center([0, 62])
    .fitExtent([[30, 30], [930, 570]], provGeo);

  const pathGen = d3.geoPath().projection(projection);

  // 3. Process Provinces Master List
  const provincesMaster = [];
  const searchIndex = [];
  const provinceDetails = {};

  for (const f of provGeo.features) {
    const pruid = String(f.properties.pruid);
    const meta = PROVINCE_MAP[pruid];
    if (!meta) continue;

    const pathData = pathGen(f);
    const rawBounds = pathGen.bounds(f);
    const minX = Math.round(rawBounds[0][0] * 10) / 10;
    const minY = Math.round(rawBounds[0][1] * 10) / 10;
    const maxX = Math.round(rawBounds[1][0] * 10) / 10;
    const maxY = Math.round(rawBounds[1][1] * 10) / 10;
    const w = Math.round((maxX - minX) * 10) / 10;
    const h = Math.round((maxY - minY) * 10) / 10;

    let center = pathGen.centroid(f);
    if (!center || isNaN(center[0])) {
      center = [minX + w / 2, minY + h / 2];
    } else {
      center = [Math.round(center[0] * 10) / 10, Math.round(center[1] * 10) / 10];
    }

    const provObj = {
      abbr: meta.abbr,
      name: meta.name,
      pruid: pruid,
      capital: meta.capital,
      population: meta.population,
      landAreaSqKm: meta.landAreaSqKm,
      region: meta.region,
      center: center,
      bounds: [minX, minY, w, h],
      path: pathData
    };

    provincesMaster.push(provObj);

    searchIndex.push({
      type: 'state',
      id: meta.abbr,
      abbr: meta.abbr,
      name: meta.name,
      capital: meta.capital,
      population: meta.population
    });
  }

  // Sort master list alphabetically by abbreviation
  provincesMaster.sort((a, b) => a.abbr.localeCompare(b.abbr));
  fs.writeFileSync(path.join(outDataDir, 'provinces.json'), JSON.stringify(provincesMaster, null, 2));
  console.log(`✓ Generated data/canada/provinces.json (${provincesMaster.length} provinces & territories)`);

  // 4. Process Detailed Subdivisions per Province
  for (const prov of provincesMaster) {
    const pruid = prov.pruid;
    const abbr = prov.abbr;

    // A. Census Divisions (Counties)
    const provCDs = cdGeo.features.filter(f => String(f.properties.pruid) === pruid);
    const counties = [];
    for (const cd of provCDs) {
      const p = pathGen(cd);
      if (!p) continue;
      const b = pathGen.bounds(cd);
      const c = pathGen.centroid(cd);
      const bMinX = Math.round(b[0][0] * 10) / 10;
      const bMinY = Math.round(b[0][1] * 10) / 10;
      const bW = Math.round((b[1][0] - b[0][0]) * 10) / 10;
      const bH = Math.round((b[1][1] - b[0][1]) * 10) / 10;
      const cdName = (cd.properties.cdname || `Division ${cd.properties.cduid}`).replace(/\s+/g, ' ').trim();
      const cdId = String(cd.properties.cduid);

      counties.push({
        id: cdId,
        name: cdName,
        type: cd.properties.cdtype || 'CD',
        bounds: [bMinX, bMinY, bW, bH],
        center: [Math.round(c[0] * 10) / 10, Math.round(c[1] * 10) / 10],
        path: p
      });

      searchIndex.push({
        type: 'county',
        id: cdId,
        countyName: cdName,
        name: `${cdName}, ${abbr}`,
        state: abbr
      });
    }

    // B. Federal Electoral Districts (Ridings / Districts)
    const provFEDs = fedGeo.features.filter(f => String(f.properties.pruid) === pruid);
    const districts = [];
    for (const fed of provFEDs) {
      const p = pathGen(fed);
      if (!p) continue;
      const b = pathGen.bounds(fed);
      const c = pathGen.centroid(fed);
      const bMinX = Math.round(b[0][0] * 10) / 10;
      const bMinY = Math.round(b[0][1] * 10) / 10;
      const bW = Math.round((b[1][0] - b[0][0]) * 10) / 10;
      const bH = Math.round((b[1][1] - b[0][1]) * 10) / 10;
      const fedName = (fed.properties.fedname || `District ${fed.properties.feduid}`).replace(/\s+/g, ' ').trim();
      const fedId = `${abbr}-${fed.properties.feduid}`;

      districts.push({
        id: fedId,
        name: fedName,
        shortName: fedName,
        feduid: fed.properties.feduid,
        bounds: [bMinX, bMinY, bW, bH],
        center: [Math.round(c[0] * 10) / 10, Math.round(c[1] * 10) / 10],
        path: p
      });

      searchIndex.push({
        type: 'district',
        id: fedId,
        shortName: fedName,
        name: `${fedName} (${abbr})`,
        state: abbr
      });
    }

    // C. Postal Codes / FSAs (Voronoi Polygons)
    const provFSAs = fsaList.filter(item => item.province === abbr);
    const validFsaPoints = [];
    provFSAs.forEach(item => {
      const pt = projection([item.lon, item.lat]);
      if (pt && !isNaN(pt[0]) && !isNaN(pt[1])) {
        validFsaPoints.push({
          ...item,
          x: Math.round(pt[0] * 10) / 10,
          y: Math.round(pt[1] * 10) / 10
        });
      }
    });

    const zipcodes = [];
    if (validFsaPoints.length > 0) {
      const pad = 10;
      const b = prov.bounds;
      const bbox = [b[0] - pad, b[1] - pad, b[0] + b[2] + pad, b[1] + b[3] + pad];

      if (validFsaPoints.length === 1) {
        const item = validFsaPoints[0];
        const pStr = `M${b[0]},${b[1]} H${b[0]+b[2]} V${b[1]+b[3]} H${b[0]} Z`;
        zipcodes.push({
          zip: item.fsa,
          city: item.place,
          county: item.county,
          lat: item.lat,
          lon: item.lon,
          bounds: b,
          center: [item.x, item.y],
          path: pStr
        });
      } else {
        const delaunay = Delaunay.from(validFsaPoints.map(p => [p.x, p.y]));
        const voronoi = delaunay.voronoi(bbox);

        validFsaPoints.forEach((item, idx) => {
          const poly = voronoi.cellPolygon(idx);
          let pStr = '';
          let bMinX = item.x - 3, bMinY = item.y - 3, bW = 6, bH = 6;
          if (poly && poly.length > 2) {
            pStr = 'M' + poly.map(pt => `${Math.round(pt[0]*10)/10},${Math.round(pt[1]*10)/10}`).join(' L') + ' Z';
            const xs = poly.map(pt => pt[0]);
            const ys = poly.map(pt => pt[1]);
            bMinX = Math.round(Math.min(...xs)*10)/10;
            bMinY = Math.round(Math.min(...ys)*10)/10;
            bW = Math.round((Math.max(...xs) - bMinX)*10)/10;
            bH = Math.round((Math.max(...ys) - bMinY)*10)/10;
          } else {
            pStr = `M${item.x-2},${item.y-2} h4 v4 h-4 Z`;
          }

          zipcodes.push({
            zip: item.fsa,
            city: item.place,
            county: item.county,
            lat: item.lat,
            lon: item.lon,
            bounds: [bMinX, bMinY, bW, bH],
            center: [item.x, item.y],
            path: pStr
          });
        });
      }
    }

    zipcodes.forEach(z => {
      searchIndex.push({
        type: 'zip',
        id: z.zip,
        zip: z.zip,
        name: `FSA ${z.zip} (${z.city || ''})`,
        city: z.city,
        county: z.county,
        state: abbr,
        lat: z.lat,
        lon: z.lon,
        x: z.center[0],
        y: z.center[1],
        bounds: z.bounds
      });
    });

    // D. Cities Cataloged & Stitched Geometries
    const provCities = MAJOR_CITIES.filter(c => c.province === abbr);
    const cities = [];

    provCities.forEach(city => {
      const pt = projection([city.lon, city.lat]);
      if (!pt || isNaN(pt[0])) return;
      const cx = Math.round(pt[0] * 10) / 10;
      const cy = Math.round(pt[1] * 10) / 10;

      // Find member FSAs for this city
      const memberZips = zipcodes.filter(z =>
        (z.city && z.city.toLowerCase().includes(city.name.toLowerCase())) ||
        (z.county && city.county && z.county.toLowerCase().includes(city.county.toLowerCase())) ||
        Math.hypot(z.center[0] - cx, z.center[1] - cy) < 15
      );

      let stitchedPath = '';
      let cityBounds = [cx - 4, cy - 4, 8, 8];

      if (memberZips.length > 0) {
        stitchedPath = memberZips.map(z => z.path).join(' ');
        const minX = Math.min(...memberZips.map(z => z.bounds[0]));
        const minY = Math.min(...memberZips.map(z => z.bounds[1]));
        const maxX = Math.max(...memberZips.map(z => z.bounds[0] + z.bounds[2]));
        const maxY = Math.max(...memberZips.map(z => z.bounds[1] + z.bounds[3]));
        cityBounds = [
          Math.round(minX * 10) / 10,
          Math.round(minY * 10) / 10,
          Math.round(Math.max(0.5, maxX - minX) * 10) / 10,
          Math.round(Math.max(0.5, maxY - minY) * 10) / 10
        ];
      }

      const cityObj = {
        name: city.name,
        cityName: city.name,
        x: cx,
        y: cy,
        isCapital: !!city.isCapital,
        isFedCapital: !!city.isFedCapital,
        pop: city.pop,
        county: city.county,
        lat: city.lat,
        lon: city.lon,
        bounds: cityBounds,
        stitchedPath: stitchedPath,
        zipCount: memberZips.length || 1,
        zips: memberZips.map(z => z.zip)
      };

      cities.push(cityObj);

      searchIndex.push({
        type: 'city',
        id: `${abbr}-${city.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: `${city.name}, ${abbr}`,
        cityName: city.name,
        state: abbr,
        county: city.county,
        isCapital: city.isCapital,
        x: cx,
        y: cy,
        lat: city.lat,
        lon: city.lon,
        bounds: cityBounds,
        zipCount: memberZips.length || 1,
        zips: memberZips.map(z => z.zip)
      });
    });

    const fullProvData = {
      ...prov,
      countiesCount: counties.length,
      districtsCount: districts.length,
      zipCodesCount: zipcodes.length,
      citiesCount: cities.length,
      counties,
      districts,
      zipcodes,
      cities
    };

    provinceDetails[abbr] = fullProvData;
    fs.writeFileSync(path.join(outProvDir, `${abbr}.json`), JSON.stringify(fullProvData));

    // Also write standalone SVG file for this province
    const svgStr = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${prov.bounds[0]-10} ${prov.bounds[1]-10} ${prov.bounds[2]+20} ${prov.bounds[3]+20}" width="100%" height="100%">
  <defs>
    <clipPath id="clip-${abbr}">
      <path d="${prov.path}" />
    </clipPath>
  </defs>
  <path id="prov-base-${abbr}" class="state-bg" d="${prov.path}" vector-effect="non-scaling-stroke" fill="var(--geomap-state-fill, #1e293b)" stroke="var(--geomap-state-stroke, #38bdf8)" stroke-width="1.2" />
  <g id="counties-${abbr}" class="layer-counties" clip-path="url(#clip-${abbr})">
    ${counties.map(c => `<path id="county-${c.id}" class="county-path" data-id="${c.id}" data-name="${c.name}" d="${c.path}" vector-effect="non-scaling-stroke" />`).join('\n    ')}
  </g>
  <g id="districts-${abbr}" class="layer-districts" clip-path="url(#clip-${abbr})" style="display:none;">
    ${districts.map(d => `<path id="district-${d.id}" class="district-path" data-id="${d.id}" data-name="${d.name}" d="${d.path}" vector-effect="non-scaling-stroke" />`).join('\n    ')}
  </g>
  <g id="zipcodes-${abbr}" class="layer-zipcodes" clip-path="url(#clip-${abbr})" style="display:none;">
    ${zipcodes.map(z => `<path id="zip-${z.zip}" class="zipcode-path" data-zip="${z.zip}" data-city="${z.city || ''}" d="${z.path}" vector-effect="non-scaling-stroke" />`).join('\n    ')}
  </g>
  <g id="cities-stitched-${abbr}" class="layer-city-stitched" clip-path="url(#clip-${abbr})"></g>
  <g id="cities-${abbr}" class="layer-cities">
    ${cities.map(c => `
      <g class="city-group ${c.isCapital ? 'capital-group' : ''}" data-name="${c.name}" transform="translate(${c.x}, ${c.y})">
        <circle class="city-marker" r="${c.isCapital ? 3.5 : 2.5}" fill="${c.isCapital ? '#f59e0b' : '#38bdf8'}" stroke="#ffffff" stroke-width="1" />
        <text class="city-label" x="4" y="3" font-size="7" fill="#f8fafc">${c.name}${c.isCapital ? ' ★' : ''}</text>
      </g>
    `).join('')}
  </g>
</svg>`;
    fs.writeFileSync(path.join(outSvgsDir, `${abbr}.svg`), svgStr);
  }

  // Save Canada Search Index
  fs.writeFileSync(path.join(outDataDir, 'search-index.json'), JSON.stringify(searchIndex));
  console.log(`✓ Generated data/canada/search-index.json (${searchIndex.length} searchable entries)`);

  // Generate National Canada SVG
  const natSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" width="100%" height="100%">
  <defs>
    <filter id="geomap-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.2" />
    </filter>
  </defs>
  <g id="geomap-national-layer" class="national-layer">
    ${provincesMaster.map(p => `
      <path id="state-${p.abbr}" class="state-path" data-abbr="${p.abbr}" data-name="${p.name}" data-capital="${p.capital}" data-pop="${p.population}" d="${p.path}" vector-effect="non-scaling-stroke">
        <title>${p.name}</title>
      </path>
    `).join('\n    ')}
  </g>
  <g id="geomap-labels-layer" class="labels-layer">
    ${provincesMaster.filter(p => !['PE'].includes(p.abbr)).map(p => `
      <text class="state-label" x="${p.center[0]}" y="${p.center[1] + 3}">${p.abbr}</text>
    `).join('\n    ')}
  </g>
</svg>`;
  fs.writeFileSync(path.join(outSvgsDir, 'canada.svg'), natSvg);

  // Generate Offline Pre-bundled Canada Data Script
  const distDir = path.join(__dirname, '..', 'dist');
  fs.mkdirSync(distDir, { recursive: true });
  const canadaBundleContent = `/**
 * Pre-bundled offline map data for Canada.
 * Generated automatically by build-canada-data.js.
 */
(function() {
  var data = {
    states: ${JSON.stringify(provincesMaster)},
    searchIndex: ${JSON.stringify(searchIndex)},
    stateDetails: ${JSON.stringify(provinceDetails)}
  };
  if (typeof window !== 'undefined') {
    window.__CANADA_MAP_DATA__ = data;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = data;
  }
})();
`;
  fs.writeFileSync(path.join(distDir, 'canada-all-data.js'), canadaBundleContent);
  console.log(`✓ Generated dist/canada-all-data.js (Offline Pre-bundled Bundle)`);

  console.log('🇨🇦 Canada Map Data Pipeline Completed Successfully!');
}

run().catch(err => {
  console.error('Error running Canada data pipeline:', err);
  process.exit(1);
});
