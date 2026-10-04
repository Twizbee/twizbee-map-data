const fs = require('fs');
const path = require('path');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');

/**
 * Enrich Canada Federal Electoral Districts:
 * 1. Links all Federal Electoral Districts (Ridings) to member Postal FSAs
 * 2. Links Ridings to member Census Divisions
 * 3. Calculates land area in sq km
 * 4. Updates province JSON files, provinces.json, and search-index.json
 * 5. Rebuilds dist/canada-all-data.js
 */

function round(val, decimals = 2) {
  const f = Math.pow(10, decimals);
  return Math.round(val * f) / f;
}

async function main() {
  console.log('🍁 Starting Canada Federal Electoral District & FSA Enrichment...');

  const provDir = path.join(__dirname, '..', 'data', 'canada', 'provinces');
  const provFiles = fs.readdirSync(provDir).filter(f => f.endsWith('.json')).sort();

  let totalDistrictsUpdated = 0;
  let totalFsasMapped = 0;

  for (const pf of provFiles) {
    const abbr = pf.replace('.json', '');
    const provPath = path.join(provDir, pf);
    const provData = JSON.parse(fs.readFileSync(provPath, 'utf8'));

    const fsas = provData.zipcodes || [];
    const divisions = provData.counties || [];
    const districts = provData.districts || [];

    if (districts.length === 0) continue;

    for (const dist of districts) {
      const db = dist.bounds;
      const [dx, dy, dw, dh] = db;
      const dMinX = dx;
      const dMaxX = dx + dw;
      const dMinY = dy;
      const dMaxY = dy + dh;

      // Find member FSAs
      const memberFsas = fsas.filter(fsa => {
        const cx = fsa.center ? fsa.center[0] : (fsa.bounds[0] + fsa.bounds[2] / 2);
        const cy = fsa.center ? fsa.center[1] : (fsa.bounds[1] + fsa.bounds[3] / 2);
        // Direct containment in bounding box
        if (cx >= dMinX && cx <= dMaxX && cy >= dMinY && cy <= dMaxY) return true;
        // Bounding box intersection if FSA has bounds
        const fb = fsa.bounds;
        if (fb) {
          const overlap = !(fb[0] > dMaxX || fb[0] + fb[2] < dMinX || fb[1] > dMaxY || fb[1] + fb[3] < dMinY);
          if (overlap) {
            // Check center distance
            const distCenter = Math.hypot(cx - (dMinX + dw / 2), cy - (dMinY + dh / 2));
            if (distCenter < Math.max(dw, dh) * 0.75) return true;
          }
        }
        return false;
      });

      // Find member Census Divisions
      const memberDivisions = new Set();
      divisions.forEach(cd => {
        const cb = cd.bounds;
        if (!cb) return;
        const overlap = !(cb[0] > dMaxX || cb[0] + cb[2] < dMinX || cb[1] > dMaxY || cb[1] + cb[3] < dMinY);
        if (overlap) {
          memberDivisions.add(cd.name);
        }
      });

      // If no FSAs matched bounding box, find closest FSA
      let finalFsaList = memberFsas.map(f => f.zip).sort();
      if (finalFsaList.length === 0 && fsas.length > 0) {
        const dcx = dist.center ? dist.center[0] : (dMinX + dw / 2);
        const dcy = dist.center ? dist.center[1] : (dMinY + dh / 2);
        const sorted = fsas.map(f => {
          const cx = f.center ? f.center[0] : (f.bounds[0] + f.bounds[2] / 2);
          const cy = f.center ? f.center[1] : (f.bounds[1] + f.bounds[3] / 2);
          return { fsa: f.zip, dist: Math.hypot(cx - dcx, cy - dcy) };
        }).sort((a, b) => a.dist - b.dist);
        if (sorted[0]) finalFsaList.push(sorted[0].fsa);
      }

      dist.zips = finalFsaList;
      dist.zipCount = finalFsaList.length;
      dist.counties = Array.from(memberDivisions).sort();

      // Land area estimate in sq km: Canadian Albers projection scaling factor (~ 1 SVG unit ~ 15-20 km depending on lat)
      // Approximate land area in sq km based on district bounds
      const approxAreaSqKm = round(dw * dh * 280, 1);
      dist.landAreaSqKm = approxAreaSqKm;

      totalDistrictsUpdated++;
      totalFsasMapped += finalFsaList.length;
    }

    provData.districts = districts;
    provData.districtsCount = districts.length;
    fs.writeFileSync(provPath, JSON.stringify(provData, null, 2), 'utf8');
    process.stdout.write(`✓ ${abbr} `);
  }

  console.log(`\n✓ Updated ${totalDistrictsUpdated} Federal Ridings across Canada`);

  // Update provinces.json
  const provMaster = [];
  for (const pf of provFiles) {
    const pData = JSON.parse(fs.readFileSync(path.join(provDir, pf), 'utf8'));
    provMaster.push({
      abbr: pData.abbr,
      name: pData.name,
      pruid: pData.pruid,
      capital: pData.capital,
      population: pData.population,
      landAreaSqKm: pData.landAreaSqKm,
      path: pData.path,
      bounds: pData.bounds,
      viewBox: pData.viewBox,
      center: pData.center,
      countiesCount: pData.countiesCount || pData.counties?.length || 0,
      districtsCount: pData.districtsCount || pData.districts?.length || 0,
      citiesCount: pData.citiesCount || pData.cities?.length || 0,
      zipCodesCount: pData.zipCodesCount || pData.zipcodes?.length || 0
    });
  }
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'canada', 'provinces.json'), JSON.stringify(provMaster, null, 2), 'utf8');
  console.log(`✓ Updated data/canada/provinces.json`);

  // Update Canada Search Index
  console.log('🔄 Rebuilding Canada search index...');
  const searchIndex = [];

  for (const p of provMaster) {
    searchIndex.push({
      type: 'state',
      id: p.abbr,
      name: `${p.name} (${p.abbr})`,
      abbr: p.abbr,
      capital: p.capital,
      center: p.center,
      bounds: p.bounds
    });
  }

  for (const pf of provFiles) {
    const provData = JSON.parse(fs.readFileSync(path.join(provDir, pf), 'utf8'));

    (provData.counties || []).forEach(c => {
      searchIndex.push({
        type: 'county',
        id: c.id,
        name: `${c.name}, ${provData.abbr}`,
        countyName: c.name,
        state: provData.abbr,
        bounds: c.bounds
      });
    });

    (provData.districts || []).forEach(d => {
      searchIndex.push({
        type: 'district',
        id: d.id,
        shortName: d.shortName,
        name: `${d.name} (${d.shortName})`,
        state: provData.abbr,
        zipCount: d.zipCount,
        zips: d.zips,
        counties: d.counties,
        bounds: d.bounds
      });
    });

    (provData.cities || []).forEach(c => {
      searchIndex.push({
        type: 'city',
        id: c.id,
        name: `${c.name}, ${provData.abbr}`,
        cityName: c.name,
        state: provData.abbr,
        county: c.county || '',
        isCapital: !!c.isCapital,
        zipCount: c.zipCount || (c.zips ? c.zips.length : 1),
        zips: c.zips || [],
        bounds: c.bounds,
        center: c.center
      });
    });

    (provData.zipcodes || []).forEach(z => {
      searchIndex.push({
        type: 'zip',
        id: z.zip,
        name: `${z.zip} - ${z.city || 'Area'}, ${provData.abbr}`,
        zip: z.zip,
        city: z.city || '',
        county: z.county || '',
        state: provData.abbr,
        lat: z.lat,
        lon: z.lon,
        bounds: z.bounds
      });
    });
  }

  fs.writeFileSync(path.join(__dirname, '..', 'data', 'canada', 'search-index.json'), JSON.stringify(searchIndex), 'utf8');
  console.log(`✓ Saved ${searchIndex.length.toLocaleString()} Canadian searchable entities`);

  // Re-build dist/canada-all-data.js bundle
  console.log('📦 Rebuilding dist/canada-all-data.js bundle...');
  const canadaBundle = {
    provinces: provMaster,
    searchIndex: searchIndex,
    provinceData: {}
  };
  for (const pf of provFiles) {
    const abbr = pf.replace('.json', '');
    canadaBundle.provinceData[abbr] = JSON.parse(fs.readFileSync(path.join(provDir, pf), 'utf8'));
  }
  const jsContent = `window.__CANADA_MAP_DATA__ = ${JSON.stringify(canadaBundle)};\n`;
  fs.writeFileSync(path.join(__dirname, '..', 'dist', 'canada-all-data.js'), jsContent, 'utf8');
  console.log(`✓ Rebuilt dist/canada-all-data.js (${(Buffer.byteLength(jsContent) / (1024 * 1024)).toFixed(2)} MB)`);

  console.log('✅ Canada Federal Electoral District Enrichment complete!');
}

main().catch(err => {
  console.error('❌ Pipeline failed:', err);
  process.exit(1);
});
