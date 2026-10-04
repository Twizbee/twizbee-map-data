const fs = require('fs');
const path = require('path');
const topojsonServer = require('topojson-server');
const topojsonClient = require('topojson-client');
const d3Geo = require('d3-geo');

/**
 * Thumbtack Geo Regions Extractor & Topological Stitcher
 *
 * Extracts hierarchical regions (Tier 1 Metros -> Tier 2 Sub-markets/Cities -> Tier 3 Zip Codes),
 * decodes Google encoded polylines, corrects winding order, builds shared topological arcs,
 * and projects into Albers USA SVG coordinate system with 2-decimal precision.
 */

// Decode Google polyline string to array of [lng, lat]
function decodePolyline(str) {
  let index = 0, lat = 0, lng = 0;
  const coordinates = [];
  while (index < str.length) {
    let b, shift = 0, result = 0;
    do {
      b = str.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = str.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    coordinates.push([lng * 1e-5, lat * 1e-5]);
  }
  return coordinates;
}

// Ensure ring is closed and outer ring is CCW in GeoJSON standard
function normalizeRing(coords) {
  if (coords.length < 3) return null;
  const ring = coords.map(pt => [pt[0], pt[1]]);
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    ring.push([first[0], first[1]]);
  }
  if (ring.length < 4) return null;

  // Check winding order via spherical area
  try {
    const poly = { type: 'Polygon', coordinates: [ring] };
    const area = d3Geo.geoArea(poly);
    if (area > 2 * Math.PI) {
      ring.reverse();
    }
  } catch (e) {
    // Fallback simple planar area check
    let sum = 0;
    for (let i = 0; i < ring.length - 1; i++) {
      sum += (ring[i+1][0] - ring[i][0]) * (ring[i+1][1] + ring[i][1]);
    }
    if (sum > 0) ring.reverse();
  }

  return ring;
}

// Convert Thumbtack polygon field into valid GeoJSON MultiPolygon coordinates
function parseThumbtackPolygon(polygonField) {
  if (!polygonField || !Array.isArray(polygonField)) return null;
  const multiPolyCoords = [];

  for (const part of polygonField) {
    const polygonRings = [];
    if (Array.isArray(part)) {
      for (const encoded of part) {
        if (typeof encoded === 'string') {
          const rawCoords = decodePolyline(encoded);
          const normalized = normalizeRing(rawCoords);
          if (normalized) polygonRings.push(normalized);
        }
      }
    } else if (typeof part === 'string') {
      const rawCoords = decodePolyline(part);
      const normalized = normalizeRing(rawCoords);
      if (normalized) polygonRings.push(normalized);
    }
    if (polygonRings.length > 0) {
      multiPolyCoords.push(polygonRings);
    }
  }

  if (multiPolyCoords.length === 0) return null;
  return {
    type: 'MultiPolygon',
    coordinates: multiPolyCoords
  };
}

// Format SVG path with 2 decimal places and deduplicate consecutive collinear points
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

function round(val, decimals = 1) {
  if (val === null || val === undefined || isNaN(val)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

async function extractThumbtackRegions(inputFile, outputDir) {
  console.log(`🚀 Extracting Thumbtack mapped regions from ${inputFile}...`);

  if (!fs.existsSync(inputFile)) {
    console.error(`File not found: ${inputFile}`);
    process.exit(1);
  }

  const rawAreas = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  console.log(`✓ Read ${rawAreas.length} raw geo areas from Thumbtack`);

  // Load projection matching National Map Albers USA
  const us = require('us-atlas/counties-10m.json');
  const statesGeo = topojsonClient.feature(us, us.objects.states);
  const masterProj = d3Geo.geoAlbersUsa().fitSize([960, 600], statesGeo);
  const pathGen = d3Geo.geoPath().projection(masterProj);

  // Group by Tier Level
  const tier1Raw = rawAreas.filter(a => a.tier_level === 1);
  const tier2Raw = rawAreas.filter(a => a.tier_level === 2);
  console.log(`✓ Found ${tier1Raw.length} Tier-1 Macro Metros and ${tier2Raw.length} Tier-2 Cities/Subregions`);

  // Map Tier 2 by geo_pk and by parent_pk
  const tier2ById = new Map();
  const tier2ByParent = new Map();
  const allZipFeatures = [];
  const zipById = new Map();

  for (const t2 of tier2Raw) {
    tier2ById.set(t2.geo_pk, t2);
    if (t2.parent_pk) {
      if (!tier2ByParent.has(t2.parent_pk)) tier2ByParent.set(t2.parent_pk, []);
      tier2ByParent.get(t2.parent_pk).push(t2);
    }

    // Extract zip code targeting
    if (t2.zip_code_targeting && Array.isArray(t2.zip_code_targeting)) {
      for (const z of t2.zip_code_targeting) {
        if (!z.code || !z.polygon) continue;
        const geom = parseThumbtackPolygon(z.polygon);
        if (!geom) continue;
        if (!zipById.has(z.code)) {
          const zipFeat = {
            type: 'Feature',
            properties: {
              code: z.code,
              city: t2.name,
              state: t2.state,
              parentPk: t2.geo_pk,
              metroPk: t2.parent_pk
            },
            geometry: geom
          };
          zipById.set(z.code, zipFeat);
          allZipFeatures.push(zipFeat);
        }
      }
    }
  }

  console.log(`✓ Parsed ${allZipFeatures.length} unique Zip Code polygons from Tier-2 areas`);

  // Build TopoJSON topology across all zip codes for seamless boundary snapping
  console.log('⚡ Building shared TopoJSON mesh across all extracted zip codes...');
  const zipCollection = { type: 'FeatureCollection', features: allZipFeatures };
  const zipTopo = topojsonServer.topology({ zips: zipCollection }, 4e4);
  const stitchedZipFeatures = topojsonClient.feature(zipTopo, zipTopo.objects.zips).features;
  console.log(`✓ Stitched ${stitchedZipFeatures.length} zip codes into ${zipTopo.arcs.length} shared topological arcs`);

  // Index stitched zip codes by 5-digit code
  const stitchedZipMap = new Map();
  for (const feat of stitchedZipFeatures) {
    const code = feat.properties.code;
    const pathStr = cleanSvgPath(pathGen(feat), 2);
    const bounds = pathGen.bounds(feat).map(pt => pt.map(v => round(v, 2)));
    const centroid = pathGen.centroid(feat).map(v => round(v, 2));
    const w = Math.max(0.2, round(bounds[1][0] - bounds[0][0], 2));
    const h = Math.max(0.2, round(bounds[1][1] - bounds[0][1], 2));

    stitchedZipMap.set(code, {
      code,
      city: feat.properties.city,
      state: feat.properties.state,
      parentPk: feat.properties.parentPk,
      metroPk: feat.properties.metroPk,
      center: centroid,
      bounds: [bounds[0][0], bounds[0][1], w, h],
      path: pathStr
    });
  }

  // Process Tier-2 Subregions / Cities
  const processedTier2 = [];
  for (const t2 of tier2Raw) {
    const geom = parseThumbtackPolygon(t2.polygon);
    let pathStr = '';
    let bounds = [[0,0],[0,0]];
    let center = [0,0];

    if (geom) {
      pathStr = cleanSvgPath(pathGen(geom), 2);
      bounds = pathGen.bounds(geom).map(pt => pt.map(v => round(v, 2)));
      center = pathGen.centroid(geom).map(v => round(v, 2));
    } else {
      // Fallback: project center coordinates
      const pt = masterProj([parseFloat(t2.lng), parseFloat(t2.lat)]);
      if (pt) {
        center = [round(pt[0], 2), round(pt[1], 2)];
        bounds = [[center[0] - 2, center[1] - 2], [center[0] + 2, center[1] + 2]];
      }
    }

    const w = Math.max(0.5, round(bounds[1][0] - bounds[0][0], 2));
    const h = Math.max(0.5, round(bounds[1][1] - bounds[0][1], 2));

    const childZips = (t2.children_zip_codes || []).map(code => stitchedZipMap.get(code)).filter(Boolean);

    processedTier2.push({
      id: t2.geo_pk,
      name: t2.name,
      state: t2.state,
      tier: 2,
      parentPk: t2.parent_pk,
      distanceMiles: t2.distance ? round(t2.distance, 1) : null,
      monthlyReach: t2.monthly_reach || 0,
      description: t2.description || '',
      isHighDemand: !!t2.is_high_demand,
      isLowCompetition: !!t2.is_low_competition,
      selectState: t2.select_state || 'unselected',
      center,
      bounds: [bounds[0][0], bounds[0][1], w, h],
      path: pathStr,
      zipCount: childZips.length,
      zips: (t2.children_zip_codes || [])
    });
  }

  // Process Tier-1 Macro Metros
  const processedTier1 = [];
  for (const t1 of tier1Raw) {
    const geom = parseThumbtackPolygon(t1.polygon);
    let pathStr = '';
    let bounds = [[0,0],[0,0]];
    let center = [0,0];

    if (geom) {
      pathStr = cleanSvgPath(pathGen(geom), 2);
      bounds = pathGen.bounds(geom).map(pt => pt.map(v => round(v, 2)));
      center = pathGen.centroid(geom).map(v => round(v, 2));
    } else {
      const pt = masterProj([parseFloat(t1.lng), parseFloat(t1.lat)]);
      if (pt) {
        center = [round(pt[0], 2), round(pt[1], 2)];
        bounds = [[center[0] - 5, center[1] - 5], [center[0] + 5, center[1] + 5]];
      }
    }

    const w = Math.max(1, round(bounds[1][0] - bounds[0][0], 2));
    const h = Math.max(1, round(bounds[1][1] - bounds[0][1], 2));

    // Get child Tier-2 areas
    const childCities = processedTier2.filter(c => c.parentPk === t1.geo_pk || (t1.children_geo_pk && t1.children_geo_pk.includes(c.id)));
    const allChildZips = [...new Set(childCities.flatMap(c => c.zips))];

    processedTier1.push({
      id: t1.geo_pk,
      name: t1.name,
      state: t1.state,
      tier: 1,
      description: t1.description || '',
      monthlyReach: t1.monthly_reach || 0,
      isHighDemand: !!t1.is_high_demand,
      selectState: t1.select_state || 'partial',
      center,
      bounds: [bounds[0][0], bounds[0][1], w, h],
      path: pathStr,
      citiesCount: childCities.length,
      zipCount: allChildZips.length,
      cities: childCities.map(c => ({
        id: c.id,
        name: c.name,
        monthlyReach: c.monthlyReach,
        isHighDemand: c.isHighDemand,
        zipCount: c.zipCount,
        zips: c.zips,
        bounds: c.bounds,
        center: c.center
      }))
    });
  }

  // Sort Tier 1: highest citiesCount descending
  processedTier1.sort((a, b) => b.citiesCount - a.citiesCount);

  // Output directories
  fs.mkdirSync(outputDir, { recursive: true });

  const finalOutput = {
    metadata: {
      source: 'Thumbtack Travel Areas & Geo Targeting Preferences',
      extractedAt: new Date().toISOString(),
      macroMetrosCount: processedTier1.length,
      subregionsCount: processedTier2.length,
      zipCodesCount: stitchedZipFeatures.length,
      state: 'CA'
    },
    metros: processedTier1,
    subregions: processedTier2,
    zipcodes: Array.from(stitchedZipMap.values())
  };

  const outFile = path.join(outputDir, 'california-regions.json');
  fs.writeFileSync(outFile, JSON.stringify(finalOutput, null, 2));
  console.log(`✅ Saved processed Thumbtack California regions to ${outFile}`);

  // Summary file for lightweight embedding
  const summaryFile = path.join(outputDir, 'regions-summary.json');
  fs.writeFileSync(summaryFile, JSON.stringify(processedTier1, null, 2));
  console.log(`✅ Saved regions summary to ${summaryFile}`);

  return finalOutput;
}

if (require.main === module) {
  const inputFile = process.argv[2] || path.join(__dirname, '..', 'temp_thumbtack_geo_areas.json');
  const outputDir = process.argv[3] || path.join(__dirname, '..', 'data', 'thumbtack');
  extractThumbtackRegions(inputFile, outputDir).catch(err => {
    console.error('Extraction failed:', err);
    process.exit(1);
  });
}

module.exports = { extractThumbtackRegions, decodePolyline, parseThumbtackPolygon, cleanSvgPath };
