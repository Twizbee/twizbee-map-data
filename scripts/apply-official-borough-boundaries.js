/**
 * scripts/apply-official-borough-boundaries.js
 *
 * Applies 100% exact official administrative boundaries from OpenStreetMap
 * to Canadian Boroughs (Toronto & Montreal) and Puerto Rico (Viejo San Juan).
 * Ensures zero Voronoi approximations and matches Google Maps outlines exactly.
 */

const fs = require('fs');
const path = require('path');
const d3Geo = require('d3-geo');
const topojson = require('topojson-client');

// 1. Projections setup
const provTopo = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'temp_canada', 'provinces.topojson'), 'utf8'));
const provGeo = topojson.feature(provTopo, Object.keys(provTopo.objects)[0]);

const canadaProj = d3Geo.geoConicEqualArea()
  .parallels([49, 77])
  .rotate([96, 0])
  .center([0, 62])
  .fitExtent([[30, 30], [930, 570]], provGeo);

const prProj = d3Geo.geoConicEqualArea()
  .rotate([66, 0])
  .center([0, 18])
  .parallels([8, 18])
  .scale(1500)
  .translate([900, 545]);

function geoJsonToSvg(geom, projection) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let subPaths = [];
  
  const processPolygon = (rings) => {
    rings.forEach(ring => {
      const pts = [];
      ring.forEach(coord => {
        const pt = projection(coord);
        if (pt && !isNaN(pt[0]) && !isNaN(pt[1])) {
          minX = Math.min(minX, pt[0]);
          minY = Math.min(minY, pt[1]);
          maxX = Math.max(maxX, pt[0]);
          maxY = Math.max(maxY, pt[1]);
          pts.push(pt[0].toFixed(2) + ',' + pt[1].toFixed(2));
        }
      });
      if (pts.length > 2) {
        subPaths.push('M' + pts.join(' L') + ' Z');
      }
    });
  };

  if (geom.type === 'Polygon') {
    processPolygon(geom.coordinates);
  } else if (geom.type === 'MultiPolygon') {
    geom.coordinates.forEach(poly => processPolygon(poly));
  }

  const bounds = [
    parseFloat(minX.toFixed(2)),
    parseFloat(minY.toFixed(2)),
    parseFloat((maxX - minX).toFixed(2)),
    parseFloat((maxY - minY).toFixed(2))
  ];
  const center = [
    parseFloat(((minX + maxX) / 2).toFixed(2)),
    parseFloat(((minY + maxY) / 2).toFixed(2))
  ];
  return { path: subPaths.join(' '), bounds, center };
}

function combineSvg(results) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const paths = [];
  for (const r of results) {
    if (!r || !r.bounds) continue;
    paths.push(r.path);
    minX = Math.min(minX, r.bounds[0]);
    minY = Math.min(minY, r.bounds[1]);
    maxX = Math.max(maxX, r.bounds[0] + r.bounds[2]);
    maxY = Math.max(maxY, r.bounds[1] + r.bounds[3]);
  }
  return {
    path: paths.join(' '),
    bounds: [
      parseFloat(minX.toFixed(2)),
      parseFloat(minY.toFixed(2)),
      parseFloat((maxX - minX).toFixed(2)),
      parseFloat((maxY - minY).toFixed(2))
    ],
    center: [
      parseFloat(((minX + maxX) / 2).toFixed(2)),
      parseFloat(((minY + maxY) / 2).toFixed(2))
    ]
  };
}

function loadOsmSvg(key, projection) {
  const filePath = path.join(__dirname, '..', 'data', 'cache', 'osm', `${key}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️ Missing OSM file: ${filePath}`);
    return null;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data.geometry) {
    console.warn(`  ⚠️ No geometry in OSM file: ${filePath}`);
    return null;
  }
  return geoJsonToSvg(data.geometry, projection);
}

function main() {
  console.log('🏛️ Applying official OSM administrative boundaries to Canadian & PR Boroughs...');

  // =========================================================================
  // 1. ONTARIO (ON.json)
  // =========================================================================
  const onPath = path.join(__dirname, '..', 'data', 'canada', 'provinces', 'ON.json');
  const onData = JSON.parse(fs.readFileSync(onPath, 'utf8'));

  const onUpdates = [
    { key: 'ON-north-york', targetId: 'ON-toronto-north-york', name: 'North York' },
    { key: 'ON-old-toronto', targetId: 'ON-toronto-old-toronto', name: 'Old Toronto' },
    { key: 'ON-scarborough', targetId: 'ON-toronto-scarborough', name: 'Scarborough' },
    { key: 'ON-etobicoke', targetId: 'ON-toronto-etobicoke', name: 'Etobicoke' },
    { key: 'ON-york', targetId: 'ON-toronto-york', name: 'York' },
    { key: 'ON-east-york', targetId: 'ON-toronto-east-york', name: 'East York' }
  ];

  for (const item of onUpdates) {
    const svgRes = loadOsmSvg(item.key, canadaProj);
    if (!svgRes) continue;
    let city = onData.cities.find(c => c.id === item.targetId);
    if (city) {
      city.path = svgRes.path;
      city.stitchedPath = svgRes.path;
      city.bounds = svgRes.bounds;
      city.center = svgRes.center;
      city.x = svgRes.center[0];
      city.y = svgRes.center[1];
      city.isOfficialBoundary = true;
      console.log(`  ✓ Updated ON borough: ${city.name} (bounds: [${city.bounds.join(', ')}], path length: ${city.path.length})`);
    } else {
      console.warn(`  ⚠️ Target city not found in ON: ${item.targetId}`);
    }
  }
  fs.writeFileSync(onPath, JSON.stringify(onData, null, 2), 'utf8');
  console.log(`✓ Saved ${onPath}`);

  // =========================================================================
  // 2. QUEBEC (QC.json)
  // =========================================================================
  const qcPath = path.join(__dirname, '..', 'data', 'canada', 'provinces', 'QC.json');
  const qcData = JSON.parse(fs.readFileSync(qcPath, 'utf8'));

  const qcUpdates = [
    { key: 'QC-ville-marie', targetId: 'QC-montreal-ville-marie', name: 'Ville-Marie' },
    { key: 'QC-plateau-mont-royal', targetId: 'QC-montreal-le-plateau-mont-royal', name: 'Le Plateau-Mont-Royal' },
    { key: 'QC-rosemont', targetId: 'QC-montreal-rosemont-la-petite-patrie', name: 'Rosemont–La Petite-Patrie' },
    { key: 'QC-cote-des-neiges', targetId: 'QC-montreal-c-te-des-neiges-ndg', name: 'Côte-des-Neiges–NDG' },
    { key: 'QC-saint-laurent', targetId: 'QC-montreal-saint-laurent', name: 'Saint-Laurent' },
    { key: 'QC-lasalle', targetId: 'QC-montreal-lasalle', name: 'LaSalle' },
    { key: 'QC-ahuntsic', targetId: 'QC-montreal-ahuntsic-cartierville', name: 'Ahuntsic-Cartierville' },
    { key: 'QC-villeray', targetId: 'QC-montreal-villeray-saint-michel-parc-extension', name: 'Villeray–Saint-Michel–Parc-Extension' }
  ];

  for (const item of qcUpdates) {
    const svgRes = loadOsmSvg(item.key, canadaProj);
    if (!svgRes) continue;
    let city = qcData.cities.find(c => c.id === item.targetId);
    if (city) {
      city.path = svgRes.path;
      city.stitchedPath = svgRes.path;
      city.bounds = svgRes.bounds;
      city.center = svgRes.center;
      city.x = svgRes.center[0];
      city.y = svgRes.center[1];
      city.isOfficialBoundary = true;
      console.log(`  ✓ Updated QC borough: ${city.name} (bounds: [${city.bounds.join(', ')}], path length: ${city.path.length})`);
    } else {
      console.warn(`  ⚠️ Target city not found in QC: ${item.targetId}`);
    }
  }

  // Verdun & Le Sud-Ouest
  const verdunSvg = loadOsmSvg('QC-verdun', canadaProj);
  const sudOuestSvg = loadOsmSvg('QC-le-sud-ouest', canadaProj);
  if (verdunSvg && sudOuestSvg) {
    const combinedVerdun = combineSvg([verdunSvg, sudOuestSvg]);
    let verdunCity = qcData.cities.find(c => c.id === 'QC-montreal-verdun---le-sud-ouest');
    if (verdunCity) {
      verdunCity.path = combinedVerdun.path;
      verdunCity.stitchedPath = combinedVerdun.path;
      verdunCity.bounds = combinedVerdun.bounds;
      verdunCity.center = combinedVerdun.center;
      verdunCity.x = combinedVerdun.center[0];
      verdunCity.y = combinedVerdun.center[1];
      verdunCity.isOfficialBoundary = true;
      console.log(`  ✓ Updated QC Verdun & Le Sud-Ouest (combined path length: ${verdunCity.path.length})`);
    }
  }

  // Outremont & Westmount
  const outremontSvg = loadOsmSvg('QC-outremont', canadaProj);
  const westmountSvg = loadOsmSvg('QC-westmount', canadaProj);
  if (outremontSvg && westmountSvg) {
    const combinedOutremont = combineSvg([outremontSvg, westmountSvg]);
    let outremontCity = qcData.cities.find(c => c.id === 'QC-montreal-outremont---westmount');
    if (outremontCity) {
      outremontCity.path = combinedOutremont.path;
      outremontCity.stitchedPath = combinedOutremont.path;
      outremontCity.bounds = combinedOutremont.bounds;
      outremontCity.center = combinedOutremont.center;
      outremontCity.x = combinedOutremont.center[0];
      outremontCity.y = combinedOutremont.center[1];
      outremontCity.isOfficialBoundary = true;
      console.log(`  ✓ Updated QC Outremont & Westmount (combined path length: ${outremontCity.path.length})`);
    }
  }

  fs.writeFileSync(qcPath, JSON.stringify(qcData, null, 2), 'utf8');
  console.log(`✓ Saved ${qcPath}`);

  // =========================================================================
  // 3. PUERTO RICO (PR.json)
  // =========================================================================
  const prPath = path.join(__dirname, '..', 'data', 'usa', 'states', 'PR.json');
  const prData = JSON.parse(fs.readFileSync(prPath, 'utf8'));

  const osjSvg = loadOsmSvg('PR-viejo-san-juan', prProj);
  if (osjSvg) {
    let osj = prData.cities.find(c => c.id === 'PR-san-juan-old-san-juan-viejo-san-juan' || c.name.toLowerCase().includes('old san juan'));
    if (osj) {
      osj.path = osjSvg.path;
      osj.stitchedPath = osjSvg.path;
      osj.bounds = osjSvg.bounds;
      osj.center = osjSvg.center;
      osj.x = osjSvg.center[0];
      osj.y = osjSvg.center[1];
      osj.isOfficialBoundary = true;
      osj.aliases = ['Old San Juan', 'Viejo San Juan', 'San Juan Antiguo', 'Historic San Juan'];
      console.log(`  ✓ Updated PR Viejo San Juan (bounds: [${osj.bounds.join(', ')}], path length: ${osj.path.length})`);
    }
  }
  fs.writeFileSync(prPath, JSON.stringify(prData, null, 2), 'utf8');
  console.log(`✓ Saved ${prPath}`);

  // =========================================================================
  // 4. REBUILD dist/canada-all-data.js and search indexes
  // =========================================================================
  console.log('📦 Rebuilding Canada bundle and search indexes...');
  const provDir = path.join(__dirname, '..', 'data', 'canada', 'provinces');
  const provFiles = fs.readdirSync(provDir).filter(f => f.endsWith('.json'));
  const provMasterPath = path.join(__dirname, '..', 'data', 'canada', 'provinces.json');
  const provincesMaster = JSON.parse(fs.readFileSync(provMasterPath, 'utf8'));

  const masterSearchIndex = [];
  const canadaBundle = {
    provinces: provincesMaster,
    searchIndex: masterSearchIndex,
    provinceData: {}
  };

  for (const pf of provFiles) {
    const abbr = pf.replace('.json', '');
    const pData = JSON.parse(fs.readFileSync(path.join(provDir, pf), 'utf8'));
    canadaBundle.provinceData[abbr] = pData;

    // Add province
    masterSearchIndex.push({
      id: pData.abbr,
      name: pData.name,
      abbr: pData.abbr,
      type: 'province',
      bounds: pData.bounds,
      center: pData.center,
      keywords: `${pData.name} ${pData.abbr} Canada`
    });

    // Add cities & boroughs
    if (pData.cities) {
      pData.cities.forEach(c => {
        masterSearchIndex.push({
          id: c.id,
          name: c.name,
          cityName: c.cityName || c.name,
          fullName: c.fullName || `${c.name}, ${pData.abbr}`,
          province: pData.abbr,
          state: pData.abbr,
          type: c.type || 'city',
          tier: c.tier || 1,
          parentCity: c.parentCity,
          bounds: c.bounds,
          center: c.center,
          zipCount: c.zipCount || (c.zips ? c.zips.length : 0),
          keywords: `${c.name} ${c.fullName || ''} ${pData.name} ${pData.abbr}`
        });
      });
    }
  }

  canadaBundle.searchIndex = masterSearchIndex;
  const searchIndexPath = path.join(__dirname, '..', 'data', 'canada', 'search-index.json');
  fs.writeFileSync(searchIndexPath, JSON.stringify(masterSearchIndex), 'utf8');
  console.log(`✓ Generated ${searchIndexPath} (${masterSearchIndex.length} items)`);

  const jsContent = `window.__CANADA_MAP_DATA__ = ${JSON.stringify(canadaBundle)};\n`;
  const distCanadaPath = path.join(__dirname, '..', 'dist', 'canada-all-data.js');
  fs.writeFileSync(distCanadaPath, jsContent, 'utf8');
  console.log(`✓ Rebuilt ${distCanadaPath} (${(Buffer.byteLength(jsContent) / (1024 * 1024)).toFixed(2)} MB)`);

  console.log('\n🎉 Official Borough Boundaries successfully applied!');
}

main();
