# Interactive SVG GeoMap Plugin — API Reference & Developer Guide

`interactive-svg-map` is a high-performance, standalone, zero-runtime-dependency vector map plugin designed for seamless integration into web applications, dashboards, GIS viewers, and analytical tools. It provides fluid 60fps vector zooming from national overviews down into subdivisions, secondary divisions (counties/census divisions), electoral ridings/districts, composite stitched cities, and postal codes/FSAs.

---

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Constructor Options](#constructor-options)
3. [Core Navigation & Zoom API](#core-navigation--zoom-api)
4. [Layer & Theme Control API](#layer--theme-control-api)
5. [Export Utilities](#export-utilities)
6. [Event Callbacks](#event-callbacks)
7. [Multi-Country Architecture (`BaseProvider`)](#multi-country-architecture-baseprovider)
8. [Stitched City Composite Geometry](#stitched-city-composite-geometry)
9. [CSS Styling & Theme Variables](#css-styling--theme-variables)
10. [Framework Integration Examples](#framework-integration-examples)

---

## Installation & Setup

### 1. Script Tag (Vanilla JS / IIFE)
```html
<!-- Plugin Stylesheet -->
<link rel="stylesheet" href="dist/interactive-svg-map.min.css">

<!-- Optional Offline Pre-bundled Datasets (zero network requests) -->
<script src="dist/usa-all-data.js"></script>
<script src="dist/canada-all-data.js"></script>

<!-- Core Plugin -->
<script src="dist/interactive-svg-map.min.js"></script>

<div id="map-container" style="width: 100%; height: 600px;"></div>

<script>
  const map = new GeoMap('#map-container', {
    country: 'usa', // or 'canada'
    theme: 'dark'
  });
</script>
```

### 2. ES Module / Modern Bundler (Vite, Webpack, Next.js, Rollup)
```javascript
import GeoMap, { USAProvider, CanadaProvider, BaseProvider } from 'interactive-svg-map';
import 'interactive-svg-map/dist/interactive-svg-map.css';

const map = new GeoMap(document.getElementById('map-container'), {
  country: 'usa',
  theme: 'emerald'
});
```

---

## Constructor Options

```typescript
const map = new GeoMap(target: string | HTMLElement, options?: GeoMapOptions);
```

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `country` | `string` | `'usa'` | Initial active country ID (`'usa'` or `'canada'`). |
| `theme` | `string` | `'dark'` | UI theme: `'dark'`, `'light'`, or `'emerald'`. |
| `activeLayer` | `string` | `'counties'` | Active drilldown layer: `'counties'`, `'cities'`, `'districts'`, `'zipcodes'`, or `'all'`. |
| `dataBaseUrl` | `string` | `'./data/usa'` | Base URL path for loading USA JSON files. |
| `canadaDataBaseUrl` | `string` | `'./data/canada'` | Base URL path for loading Canada JSON files. |
| `enablePanZoom` | `boolean` | `true` | Enables click-drag panning and mousewheel/pinch zoom. |
| `enableSearch` | `boolean` | `true` | Enables fuzzy autocomplete search input in the top bar. |
| `enableBreadcrumbs` | `boolean` | `true` | Enables hierarchical breadcrumb trail (`Country › State › City/Zip`). |
| `enableInspector` | `boolean` | `true` | Enables the sliding side inspector drawer for detailed statistics. |
| `enableControls` | `boolean` | `true` | Enables floating `+`, `−`, `⟲`, `🌓`, `⬇` map control buttons. |
| `animationDuration` | `number` | `550` | Ease-out cubic viewBox transition duration in milliseconds. |

---

## Core Navigation & Zoom API

### `map.zoomToState(abbr: string): Promise<void>`
Drills down into a specific state or province (e.g. `'CA'`, `'TX'`, `'NY'`, `'PR'`, `'ON'`, `'BC'`). Computes bounding box framing, loads all sub-layers (counties, districts, zipcodes, cities), and updates the inspector.

```javascript
await map.zoomToState('TX'); // Smooth zoom into Texas
```

### `map.zoomToCity(cityNameOrId: string): Promise<void>`
Zooms directly into a city. If the city contains member zip codes or FSAs, dynamically activates **City Mode**:
- Stitches member postal polygons into a unified composite `<path class="city-stitched-boundary">`.
- Highlights member zip codes and dims exterior non-member zip codes.
- Frames the viewBox to the exact composite bounds with a 1.6 aspect ratio.
- Renders an animated pulse beacon above the city centroid.

```javascript
await map.zoomToCity('Austin, TX');
await map.zoomToCity('Toronto, ON');
```

### `map.zoomToZip(zipCode: string): Promise<void>`
Zooms to an exact 5-digit US ZIP Code or 3-character Canadian Forward Sortation Area (FSA).
- Auto-switches state/province if needed.
- Focuses and highlights the postal polygon boundary.
- Spawns a concentric animated radar target beacon.

```javascript
await map.zoomToZip('90210'); // Beverly Hills, CA
await map.zoomToZip('M5V');   // Downtown Toronto, ON
```

### `map.zoomToCounty(fipsOrName: string): Promise<void>`
Zooms to a county or census division by FIPS code, Census Division UID, or name.

```javascript
await map.zoomToCounty('48453'); // Travis County, TX
await map.zoomToCounty('Miami-Dade');
```

### `map.zoomToDistrict(districtId: string): Promise<void>`
Zooms to a Congressional District or Federal Electoral Riding.

```javascript
await map.zoomToDistrict('NY-14'); // Alexandria Ocasio-Cortez's district
await map.zoomToDistrict('QC-24054'); // Outremont, QC Riding
```

### `map.zoomToRegion(regionIdOrName: string): Promise<void>`
Zooms directly into a market or metropolitan region (e.g. Thumbtack Mapped Regions such as `'San Jose - Silicon Valley'`, `'Peninsula'`, `'East Bay'`, `'Wine Country'`).
- Automatically switches to the corresponding state if needed.
- Computes dissolved outer boundary from member subregions/cities.
- Frames the viewBox with optimal padding.
- Renders an animated pulse beacon above the region centroid.
- Displays full hierarchical breakdown in the Inspector drawer (including clickable child cities, monthly reach estimates, and customer demand badges).

```javascript
await map.zoomToRegion('San Jose - Silicon Valley');
```

### `map.resetView(): void`
Resets zoom level back to the national overview, cleans up city mode, and clears active entity beacons.

```javascript
map.resetView();
```

---

## Layer & Theme Control API

### `map.setLayer(layerName: string): void`
Toggles active vector display layer:
- `'counties'`: County / Census Division boundary polygons.
- `'cities'`: City center dots, capital stars, and labels.
- `'districts'`: Congressional district / Federal riding polygons.
- `'zipcodes'`: Census ZCTA / Postal FSA polygons.
- `'regions'`: Metro market / regional boundaries (e.g. Thumbtack Mapped Regions).
- `'all'`: Displays all layers simultaneously.

```javascript
map.setLayer('regions');
map.setLayer('zipcodes');
```

### `map.setTheme(themeName: string): void`
Switches color palette:
- `'dark'`: Slate/cyan modern cyber aesthetic.
- `'light'`: High-contrast editorial print aesthetic.
- `'emerald'`: Deep forest green and mint aesthetic.

```javascript
map.setTheme('emerald');
```

---

## Export Utilities

### `map.exportSVG(): void`
Instantly exports the active SVG DOM tree (including active layers, beacons, and viewBox) as a standalone `.svg` vector file downloaded to the user's browser.

```javascript
map.exportSVG();
```

### `map.exportPNG(scale?: number): void`
Renders the active SVG into an offscreen HTML5 `<canvas>` at high resolution (default `scale = 2` for 2x Retina quality) and triggers a PNG image download.

```javascript
map.exportPNG(3); // 3x ultra-high-resolution PNG export
```

---

## Event Callbacks

Register custom listeners via the constructor options:

```javascript
const map = new GeoMap('#map-container', {
  onStateClick: (state) => {
    console.log('State clicked:', state.name, state.abbr, state.population);
  },
  onCountyClick: (county) => {
    console.log('County clicked:', county.name, county.id);
  },
  onCityClick: (city) => {
    console.log('City clicked:', city.name, 'Zips count:', city.zipCount);
  },
  onDistrictClick: (district) => {
    console.log('District clicked:', district.name, district.shortName);
  },
  onZipClick: (zip) => {
    console.log('Postal code clicked:', zip.zip, zip.city, zip.county);
  },
  onZoom: (level, entity) => {
    console.log('Zoomed to level:', level, entity);
  },
  onLayerChange: (layer) => {
    console.log('Layer switched to:', layer);
  }
});
```

---

## Multi-Country Architecture (`BaseProvider`)

The plugin uses an extensible **Provider Pattern**. To add any new country (e.g. Mexico, United Kingdom, France, Australia), subclass `BaseProvider` and register it:

```javascript
import { BaseProvider } from 'interactive-svg-map';

class MexicoProvider extends BaseProvider {
  constructor(options = {}) {
    super('mexico', 'Mexico', '0 0 960 600');
    this.baseUrl = options.dataBaseUrl || './data/mexico';
  }

  async getCountryMeta() {
    return {
      id: 'mexico',
      name: 'Mexico',
      abbr: 'MEX',
      flag: '🇲🇽',
      capital: 'Mexico City',
      subdivisionType: 'State',
      secondaryType: 'Municipality',
      districtType: 'Electoral District',
      postalType: 'Código Postal',
      defaultViewBox: '0 0 960 600'
    };
  }

  async getStates() {
    const res = await fetch(`${this.baseUrl}/states.json`);
    return res.json();
  }

  async getStateData(abbr) {
    const res = await fetch(`${this.baseUrl}/states/${abbr.toUpperCase()}.json`);
    return res.json();
  }

  async getSearchIndex() {
    const res = await fetch(`${this.baseUrl}/search-index.json`);
    return res.json();
  }
}

// Register and switch:
map.registerCountry('mexico', new MexicoProvider());
await map.setCountry('mexico');
```

### Switching Countries at Runtime

```javascript
// Switch between built-in USA and Canada
await map.setCountry('canada');
await map.setCountry('usa');
```

---

## Stitched City Composite Geometry

When drilling into a city, traditional maps only render a single circle marker. `interactive-svg-map` aggregates all Census ZCTA / Postal FSA polygons belonging to the metropolitan area into a composite MultiPolygon `<path class="city-stitched-boundary" d="...">`:

```html
<!-- Inside SVG #layer-city-stitched -->
<path class="city-stitched-boundary" d="M480.9,471.2 L... Z M482.1,469.8 L... Z" vector-effect="non-scaling-stroke">
  <title>Austin (44 Stitched ZIP Codes)</title>
</path>
```

- **Exterior Dimming:** Non-member postal codes fade to 22% opacity (`.geomap-container.city-mode .zipcode-path:not(.in-active-city)`).
- **Interactive Pills:** The inspector provides clickable pills for all member zip codes.
- **Bounds Framing:** ViewBox smoothly animates to the bounding box of the composite geometry.

---

## Thumbtack Mapped Regions & Extractor

The plugin supports hierarchical metro market regions structured identically to Thumbtack's regional segmentation:
- **Tier 1 (Metro / Macro Market)**: e.g. *"San Jose - Silicon Valley"*, *"East Bay"*, *"Peninsula"*, *"Wine Country"*, *"Sacramento Area"*.
- **Tier 2 (Subregion / City)**: e.g. *"San Jose"*, *"Santa Clara"*, *"Sunnyvale"*, *"Mountain View"*, *"Palo Alto"*.
- **Tier 3 (Zip Codes)**: The underlying Census ZCTA postal boundaries forming each city.

### Standalone Extractor Tool
Use `scripts/extract-thumbtack-regions.js` to extract, decode, and stitch mapped regions directly from any Thumbtack travel areas preferences session:

```bash
# Run extractor
node scripts/extract-thumbtack-regions.js [input_json] [output_json]
```

#### What the Extractor Does:
1. **Google Polyline Decoding**: Decodes encoded coordinate polylines into GeoJSON polygons with high 5-decimal precision.
2. **RFC 7946 Winding Order Enforcement**: Automatically checks spherical polygon area via `d3-geo`. If an exterior ring is clockwise (representing the entire planet outside the polygon), it reverses vertices to enforce CCW winding.
3. **TopoJSON Topology Stitching**: Unifies shared borders between subregions and zip codes into single shared arcs, eliminating gaps and overlapping boundary slivers.
4. **Dissolved Outer Perimeters**: Computes seamless dissolved exterior boundaries for macro markets using `topojsonClient.merge`.

---

## CSS Styling & Theme Variables

All visual styling is controlled through CSS Custom Properties, making the map completely themeable without touching JavaScript:

```css
.geomap-container.my-custom-theme {
  --geomap-bg: #0b0f19;
  --geomap-card-bg: #151d30;
  --geomap-border: #1e293b;
  --geomap-text: #f1f5f9;
  --geomap-text-muted: #64748b;
  --geomap-accent: #6366f1;
  --geomap-state-fill: #1e293b;
  --geomap-state-stroke: #475569;
  --geomap-state-hover: #312e81;
  --geomap-county-fill: #1e293b;
  --geomap-county-stroke: #334155;
  --geomap-district-stroke: #f59e0b;
  --geomap-zip-fill: #0f172a;
  --geomap-zip-stroke: #0284c7;
}
```

### Non-Scaling Stroke Guarantee
All border lines employ `vector-effect: non-scaling-stroke;`. Regardless of whether you are viewing the entire continent or zoomed 100x into a single neighborhood block, boundary lines remain crisp hairline borders (0.5px to 1.5px physical screen pixels).

---

## Framework Integration Examples

### React Component (`GeoMap.jsx`)

```jsx
import React, { useEffect, useRef } from 'react';
import GeoMap from 'interactive-svg-map';
import 'interactive-svg-map/dist/interactive-svg-map.css';

export function MapWidget({ country = 'usa', theme = 'dark', onSelectEntity }) {
  const containerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapInstanceRef.current = new GeoMap(containerRef.current, {
      country,
      theme,
      onStateClick: (state) => onSelectEntity?.('state', state),
      onCityClick: (city) => onSelectEntity?.('city', city),
      onZipClick: (zip) => onSelectEntity?.('zip', zip)
    });

    return () => {
      mapInstanceRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCountry(country);
    }
  }, [country]);

  return <div ref={containerRef} style={{ width: '100%', height: '650px' }} />;
}
```

---

## License & Attribution

Distributed under the **MIT License**.
Boundary geometries derived from official US Census Bureau TIGER/Line files and Statistics Canada cartographic files.
