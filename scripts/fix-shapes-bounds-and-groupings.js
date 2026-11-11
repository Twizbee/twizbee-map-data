const fs = require('fs');
const path = require('path');

const STATES_DIR = path.join(__dirname, '..', 'data', 'usa', 'states');
const STATES_INDEX_PATH = path.join(__dirname, '..', 'data', 'usa', 'states.json');
const SEARCH_INDEX_PATH = path.join(__dirname, '..', 'data', 'usa', 'search-index.json');
const TT_CA_PATH = path.join(__dirname, '..', 'data', 'thumbtack', 'california-regions.json');

function round(val, dec = 3) {
  const f = Math.pow(10, dec);
  return Math.round(val * f) / f;
}

function computePathBBox(d) {
  if (!d || typeof d !== 'string') return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const re = /[ML]\s*(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/gi;
  let m;
  let count = 0;
  while ((m = re.exec(d)) !== null) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    count++;
  }
  if (count === 0 || !Number.isFinite(minX)) return null;
  const w = Math.max(0.01, round(maxX - minX, 3));
  const h = Math.max(0.01, round(maxY - minY, 3));
  return {
    bounds: [round(minX, 3), round(minY, 3), w, h],
    center: [round(minX + w / 2, 2), round(minY + h / 2, 2)]
  };
}

function uspsStateForZip(zip) {
  const z = parseInt(zip, 10);
  if (Number.isNaN(z)) return null;
  const p = Math.floor(z / 100);
  if (zip === '00501' || zip === '00544' || zip === '06390') return 'NY';
  if (p >= 6 && p <= 9) return 'PR';
  if (p >= 10 && p <= 27) return 'MA';
  if (p >= 28 && p <= 29) return 'RI';
  if (p >= 30 && p <= 38) return 'NH';
  if (p >= 39 && p <= 49) return 'ME';
  if (p >= 50 && p <= 59) return 'VT';
  if (p >= 60 && p <= 69) return 'CT';
  if (p >= 70 && p <= 89) return 'NJ';
  if (p >= 100 && p <= 149) return 'NY';
  if (p >= 150 && p <= 196) return 'PA';
  if (p >= 197 && p <= 199) return 'DE';
  if (p === 200 || (p >= 202 && p <= 205) || p === 569) return 'DC';
  if (p === 201 || (p >= 220 && p <= 246)) return 'VA';
  if (p >= 206 && p <= 219) return 'MD';
  if (p >= 247 && p <= 268) return 'WV';
  if (p >= 270 && p <= 289) return 'NC';
  if (p >= 290 && p <= 299) return 'SC';
  if ((p >= 300 && p <= 319) || p === 398 || p === 399) return 'GA';
  if (p >= 320 && p <= 349) return 'FL';
  if (p >= 350 && p <= 369) return 'AL';
  if (p >= 370 && p <= 385) return 'TN';
  if (p >= 386 && p <= 397) return 'MS';
  if (p >= 400 && p <= 427) return 'KY';
  if (p >= 430 && p <= 459) return 'OH';
  if (p >= 460 && p <= 479) return 'IN';
  if (p >= 480 && p <= 499) return 'MI';
  if (p >= 500 && p <= 528) return 'IA';
  if (p >= 530 && p <= 549) return 'WI';
  if (p >= 550 && p <= 567) return 'MN';
  if (p >= 570 && p <= 577) return 'SD';
  if (p >= 580 && p <= 588) return 'ND';
  if (p >= 590 && p <= 599) return 'MT';
  if (p >= 600 && p <= 629) return 'IL';
  if (p >= 630 && p <= 658) return 'MO';
  if (p >= 660 && p <= 679) return 'KS';
  if (p >= 680 && p <= 693) return 'NE';
  if (p >= 700 && p <= 714) return 'LA';
  if (p >= 716 && p <= 729) return 'AR';
  if (p === 733 || (p >= 750 && p <= 799) || p === 885) return 'TX';
  if (p >= 730 && p <= 749) return 'OK';
  if (p >= 800 && p <= 816) return 'CO';
  if (p >= 820 && p <= 831) return 'WY';
  if (p >= 832 && p <= 838) return 'ID';
  if (p >= 840 && p <= 847) return 'UT';
  if (p >= 850 && p <= 865) return 'AZ';
  if (p >= 870 && p <= 884) return 'NM';
  if (p >= 889 && p <= 898) return 'NV';
  if (p >= 900 && p <= 961) return 'CA';
  if (p >= 967 && p <= 968) return 'HI';
  if (p >= 970 && p <= 979) return 'OR';
  if (p >= 980 && p <= 994) return 'WA';
  if (p >= 995 && p <= 999) return 'AK';
  return null;
}

function normKey(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+(county|parish|borough|census area|municipio)$/i, '')
    .replace(/^sainte\b/, 'ste')
    .replace(/^saint\b/, 'st')
    .replace(/^st\./, 'st')
    .replace(/^ste\./, 'ste')
    .replace(/[^a-z0-9]/g, '');
}

const FIPS_NAME_FIXES = {
  '24510': 'Baltimore City',
  '29510': 'St. Louis City',
  '51760': 'Richmond City',
  '51620': 'Franklin City',
  '51770': 'Roanoke City',
  '51600': 'Fairfax City'
};

function resolveCanonicalCounty(st, rawCounty, zipCode, canonicalCounties) {
  if (!rawCounty) return rawCounty;
  if (canonicalCounties.includes(rawCounty)) return rawCounty;

  // Special historical / split Census county renames
  if (st === 'SD' && rawCounty.toLowerCase() === 'shannon') return 'Oglala Lakota';
  if (st === 'AK') {
    const lc = rawCounty.toLowerCase();
    if (lc === 'wade hampton') return 'Kusilvak';
    if (lc === 'prince wales ketchikan') return 'Prince of Wales-Hyder';
    if (lc === 'skagway hoonah angoon') return zipCode === '99840' ? 'Skagway' : 'Hoonah-Angoon';
    if (lc === 'wrangell petersburg') return zipCode === '99929' ? 'Wrangell' : 'Petersburg';
  }
  if (st === 'VA') {
    const lc = rawCounty.toLowerCase();
    if (lc === 'clifton forge city') return 'Alleghany';
    if (lc === 'bedford city') return 'Bedford';
  }

  // Exact normalized key match (handles St./Saint, DeKalb/De Kalb, DuPage/Du Page, O'Brien/Obrien, Doña Ana/Dona Ana, Mc...)
  const nk = normKey(rawCounty);
  for (const cName of canonicalCounties) {
    if (normKey(cName) === nk) return cName;
  }

  // Virginia independent cities where counties[] omits "City" (e.g. "Norfolk City" -> "Norfolk", while keeping "Charles City" & "James City")
  if (/\s+city$/i.test(rawCounty)) {
    const stripped = rawCounty.replace(/\s+city$/i, '').trim();
    const nkStripped = normKey(stripped);
    for (const cName of canonicalCounties) {
      if (normKey(cName) === nkStripped) return cName;
    }
  }

  return rawCounty;
}

function main() {
  const files = fs.readdirSync(STATES_DIR).filter(f => f.endsWith('.json')).sort();
  const stateMap = new Map();
  const stateZipsSet = new Map();

  for (const f of files) {
    const st = f.replace('.json', '');
    const data = JSON.parse(fs.readFileSync(path.join(STATES_DIR, f), 'utf8'));
    stateMap.set(st, data);
    stateZipsSet.set(st, new Set((data.zipcodes || []).map(z => z.zip)));
  }

  let removedCrossBorderZips = 0;
  let unclampedZips = 0;
  let normalizedCountyCount = 0;
  let updatedRegionsCount = 0;

  const updatedZipMeta = new Map(); // `${st}|${zip}` -> zipObj
  const removedStateZipPairs = new Set(); // `${st}|${zip}`

  // Load Thumbtack CA reference for exact CA region metadata sync
  const ttCa = fs.existsSync(TT_CA_PATH) ? JSON.parse(fs.readFileSync(TT_CA_PATH, 'utf8')) : null;
  const ttMetroByName = new Map();
  if (ttCa && Array.isArray(ttCa.metros)) {
    for (const m of ttCa.metros) ttMetroByName.set(m.name.toLowerCase(), m);
  }

  for (const [st, data] of stateMap.entries()) {
    // 1. Disambiguate independent cities in counties[]
    for (const co of (data.counties || [])) {
      if (FIPS_NAME_FIXES[co.id]) {
        co.name = FIPS_NAME_FIXES[co.id];
      }
      const bb = computePathBBox(co.path);
      if (bb) {
        co.bounds = bb.bounds;
      }
    }

    const canonicalCounties = (data.counties || []).map(c => c.name);

    // 2. Remove cross-border duplicate ZIPs that belong to another state AND already exist in that true state
    const filteredZips = [];
    for (const z of (data.zipcodes || [])) {
      const trueSt = uspsStateForZip(z.zip);
      if (trueSt && trueSt !== st && stateZipsSet.get(trueSt) && stateZipsSet.get(trueSt).has(z.zip)) {
        removedCrossBorderZips++;
        removedStateZipPairs.add(`${st}|${z.zip}`);
        continue;
      }

      // Fix SFO 94128 city name in CA
      if (st === 'CA' && z.zip === '94128') {
        z.city = 'San Francisco International Airport';
      }

      // Normalize county spelling to canonical state county name
      const fixedCounty = resolveCanonicalCounty(st, z.county, z.zip, canonicalCounties);
      if (fixedCounty !== z.county) {
        z.county = fixedCounty;
        normalizedCountyCount++;
      }

      // Recompute exact unclamped SVG path bounds (fixes all 0.5-clamped urban ZIPs)
      const bb = computePathBBox(z.path);
      if (bb) {
        if (z.bounds && z.bounds[2] === 0.5 && z.bounds[3] === 0.5 && (bb.bounds[2] < 0.49 || bb.bounds[3] < 0.49)) {
          unclampedZips++;
        }
        z.bounds = bb.bounds;
        if (z.center) z.center = bb.center;
      }

      filteredZips.push(z);
      updatedZipMeta.set(`${st}|${z.zip}`, z);
    }

    data.zipcodes = filteredZips;
    data.zipCodesCount = filteredZips.length;
    const validZipSet = new Set(filteredZips.map(z => z.zip));

    // 3. Clean cities[], normalize city counties, recompute city bounds, and fix 94128 in CA
    for (const c of (data.cities || [])) {
      if (Array.isArray(c.zips)) {
        c.zips = c.zips.filter(z => validZipSet.has(z));
        if (st === 'CA' && c.name === 'San Francisco') {
          c.zips = c.zips.filter(z => z !== '94128');
        }
        c.zipCount = c.zips.length;
      }
      if (c.county) {
        c.county = resolveCanonicalCounty(st, c.county, (c.zips && c.zips[0]) || '', canonicalCounties);
      }
      const bb = computePathBBox(c.path || c.stitchedPath);
      if (bb) c.bounds = bb.bounds;
    }

    // Ensure San Francisco International Airport exists in CA cities[] if 94128 is present
    if (st === 'CA' && validZipSet.has('94128')) {
      const sfoZip = filteredZips.find(z => z.zip === '94128');
      const existingSfo = (data.cities || []).find(c => c.name === 'San Francisco International Airport');
      if (!existingSfo && sfoZip) {
        data.cities.push({
          id: 'CA-san-francisco-international-airport',
          name: 'San Francisco International Airport',
          fullName: 'San Francisco International Airport, CA',
          county: 'San Mateo',
          state: 'CA',
          zips: ['94128'],
          zipCount: 1,
          lat: sfoZip.lat,
          lon: sfoZip.lon,
          center: sfoZip.center || [round(sfoZip.bounds[0] + sfoZip.bounds[2] / 2, 2), round(sfoZip.bounds[1] + sfoZip.bounds[3] / 2, 2)],
          bounds: sfoZip.bounds,
          path: sfoZip.path
        });
        data.citiesCount = data.cities.length;
      }
    }

    // 4. Clean districts[] zips & bounds
    for (const d of (data.districts || [])) {
      if (Array.isArray(d.zips)) {
        d.zips = d.zips.filter(z => validZipSet.has(z));
      }
      if (Array.isArray(d.counties)) {
        d.counties = [...new Set(d.counties.map(cn => resolveCanonicalCounty(st, cn, '', canonicalCounties)).filter(cn => canonicalCounties.includes(cn)))];
      }
      const bb = computePathBBox(d.path);
      if (bb) d.bounds = bb.bounds;
    }

    // 5. Roll up regions[].zips from regions[].cities[].zips (and sync CA Thumbtack metros)
    for (const r of (data.regions || [])) {
      if (st === 'CA') {
        const ttMatch = ttMetroByName.get((r.name || '').toLowerCase());
        if (ttMatch && Array.isArray(ttMatch.cities)) {
          r.cities = ttMatch.cities.map(tc => ({
            ...tc,
            zips: (tc.zips || []).filter(z => validZipSet.has(z))
          })).filter(tc => tc.zips.length > 0);
        }
      }

      const regZipSet = new Set();
      if (Array.isArray(r.zips)) {
        for (const z of r.zips) {
          if (validZipSet.has(z)) regZipSet.add(z);
        }
      }
      if (Array.isArray(r.cities)) {
        for (const rc of r.cities) {
          if (Array.isArray(rc.zips)) {
            rc.zips = rc.zips.filter(z => validZipSet.has(z));
            for (const z of rc.zips) regZipSet.add(z);
          }
        }
      }
      const mergedZips = [...regZipSet];
      if (!r.zips || r.zips.length !== mergedZips.length) {
        updatedRegionsCount++;
      }
      r.zips = mergedZips;
      r.zipCount = mergedZips.length;
      if (Array.isArray(r.cities)) {
        r.citiesCount = r.cities.length;
      }
      const bb = computePathBBox(r.path || r.stitchedPath);
      if (bb) r.bounds = bb.bounds;
    }

    fs.writeFileSync(path.join(STATES_DIR, `${st}.json`), JSON.stringify(data));
  }

  // 6. Sync data/usa/states.json counts
  if (fs.existsSync(STATES_INDEX_PATH)) {
    const statesIdx = JSON.parse(fs.readFileSync(STATES_INDEX_PATH, 'utf8'));
    const list = Array.isArray(statesIdx) ? statesIdx : (statesIdx.states || []);
    for (const item of list) {
      const d = stateMap.get(item.abbr);
      if (d) {
        item.zipCodesCount = d.zipCodesCount;
        item.citiesCount = d.citiesCount;
        item.countiesCount = d.counties.length;
      }
    }
    fs.writeFileSync(STATES_INDEX_PATH, JSON.stringify(statesIdx));
  }

  // 7. Sync data/usa/search-index.json (remove cross-border dupes, update bounds, county names, and 94128)
  if (fs.existsSync(SEARCH_INDEX_PATH)) {
    const searchIdx = JSON.parse(fs.readFileSync(SEARCH_INDEX_PATH, 'utf8'));
    const cleanedIdx = [];
    for (const entry of searchIdx) {
      if (entry.type === 'zip' && entry.state && entry.zip) {
        const key = `${entry.state}|${entry.zip}`;
        if (removedStateZipPairs.has(key)) continue;
        const zObj = updatedZipMeta.get(key);
        if (zObj) {
          entry.city = zObj.city;
          entry.county = zObj.county;
          entry.bounds = zObj.bounds;
          if (entry.state === 'CA' && entry.zip === '94128') {
            entry.name = '94128 - San Francisco International Airport, CA';
          }
        }
      } else if (entry.type === 'county' && entry.id && FIPS_NAME_FIXES[entry.id]) {
        entry.name = `${FIPS_NAME_FIXES[entry.id]}, ${entry.state}`;
        entry.countyName = FIPS_NAME_FIXES[entry.id];
      }
      cleanedIdx.push(entry);
    }
    fs.writeFileSync(SEARCH_INDEX_PATH, JSON.stringify(cleanedIdx));
  }

  console.log(JSON.stringify({
    statesProcessed: stateMap.size,
    removedCrossBorderZips,
    unclampedZips,
    normalizedCountyCount,
    updatedRegionsCount
  }, null, 2));
}

main();
