# Interactive SVG GeoMap Plugin

> A zero-dependency, ultra-fast, responsive interactive SVG vector map plugin. Seamlessly zoom from national view into every state, and inspect **Counties**, **Cities**, **Congressional / Polling Districts**, and **Zip Codes** with live search, tooltips, breadcrumbs, inspector side-panel, and standalone SVG exports. Built with pluggable multi-country architecture.

---

## ✨ Features

- 🇺🇸 **Complete National Coverage**: All 50 US States + District of Columbia + Puerto Rico.
- 🔍 **Smooth Animated Zoom & Pan**: Fluid 60fps cubic-bezier animated viewBox interpolation from national view into any state, county, or city. Drag-to-pan and mousewheel focal zoom.
- 🏷️ **Hierarchical Layer Switching**:
  - **Counties**: All 3,142 US counties with FIPS codes, boundaries, hover highlights, and statistics.
  - **Cities**: State capitals (with star pins) and major metropolitan areas with clean badges and collision-safe labels.
  - **Districts**: 118th Congressional Districts (and polling/electoral districts) with boundaries, representative info, and area statistics.
  - **Zip Codes**: Census ZCTA boundaries topologically stitched with shared coincident borders (0 gaps, 0 overlaps) crosswalked directly with their Congressional District (`zccd`).
  - **Regions**: Thumbtack-style hierarchical metro markets (*Silicon Valley*, *East Bay*, *Peninsula*, *Wine Country*, etc.) with dissolved outer boundaries, child city navigation, and customer reach metrics.
- 🧩 **Seamless Topological Stitching**: Coincident zip code borders share exact TopoJSON quantized arcs. Cities and metro regions feature cleanly dissolved continuous perimeters rather than fragmented overlaps.
- 🔎 **Instant Global Autocomplete Search**: Search across all States, Counties, Cities, Districts, Zip Codes, and Metro Regions. Select any result to zoom directly to it and highlight it.
- 🥖 **Interactive Breadcrumbs**: `USA` > `California` > `Los Angeles County` > `90210` with 1-click drill-up navigation.
- 📊 **Collapsible Side Inspector**: Instant drawer panel showing detailed statistics, population, land area, FIPS, district numbers, and copy actions.
- 🎨 **Multiple Visual Themes**: Built-in `Light`, `Dark` (Cyber), and `Emerald` (Mint) palettes, plus custom CSS variable theming.
- ⬇️ **Export Utilities**: One-click export to standalone **SVG** or high-resolution **PNG**.
- 🌍 **Multi-Country Ready**: Modular data provider architecture (`BaseProvider`) allows dropping in Canada, UK, Mexico, or World datasets seamlessly.
- 📦 **Zero Runtime Dependencies**: The core engine is only **26 KB minified** with no external frameworks required. Works in Vanilla JS, React, Vue, Angular, Svelte, or Electron.

---

## 🚀 Quick Start

### 1. Script Tag (Vanilla HTML)

```html
<!-- 1. Include Plugin Stylesheet -->
<link rel="stylesheet" href="dist/interactive-svg-map.css" />

<!-- 2. Container Element -->
<div id="map" style="width: 100%; height: 600px;"></div>

<!-- 3. Optional: Include Offline Data Bundle (or let it lazy-fetch) -->
<script src="dist/usa-all-data.js"></script>

<!-- 4. Include Plugin JS -->
<script src="dist/interactive-svg-map.js"></script>

<script>
  const map = new GeoMap('#map', {
    country: 'usa',
    theme: 'dark',
    activeLayer: 'counties',
    onStateClick: (state) => console.log('State clicked:', state.name),
    onCountyClick: (county) => console.log('County clicked:', county.name),
    onZipClick: (zip) => console.log('Zip clicked:', zip.zip, zip.city)
  });
</script>
```

---

### 2. Modern ES Module / Bundlers (Vite, Webpack, Next.js)

```javascript
import { GeoMap } from 'interactive-svg-map';
import 'interactive-svg-map/dist/interactive-svg-map.css';

const map = new GeoMap('#map', {
  country: 'usa',
  theme: 'light',
  onDistrictClick: (district) => {
    console.log(`District: ${district.name} (${district.shortName})`);
  }
});
```

---

### 3. React Component Example

```jsx
import React, { useEffect, useRef } from 'react';
import { GeoMap } from 'interactive-svg-map';
import 'interactive-svg-map/dist/interactive-svg-map.css';

export function MapWidget({ onStateSelect }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !mapRef.current) {
      mapRef.current = new GeoMap(containerRef.current, {
        country: 'usa',
        theme: 'dark',
        onStateClick: (state) => {
          if (onStateSelect) onStateSelect(state);
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '620px' }} />;
}
```

---

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|---|---|---|---|
| `country` | `string` | `'usa'` | Country code to load (`'usa'`, or custom registered provider) |
| `theme` | `string` | `'light'` | Theme palette: `'light'`, `'dark'`, `'emerald'` |
| `activeLayer` | `string` | `'counties'` | Active sub-layer in state view: `'counties'`, `'cities'`, `'districts'`, `'zipcodes'`, `'all'` |
| `dataBaseUrl` | `string` | `'./data/usa'` | Base URL path where state JSON files reside |
| `enablePanZoom` | `boolean` | `true` | Enables mouse drag panning and mousewheel focal zoom |
| `enableSearch` | `boolean` | `true` | Enables live autocomplete search bar |
| `enableBreadcrumbs` | `boolean` | `true` | Enables top breadcrumb navigation |
| `enableInspector` | `boolean` | `true` | Enables slide-out side inspector panel |
| `enableControls` | `boolean` | `true` | Enables floating zoom and export buttons |
| `animationDuration` | `number` | `550` | Duration (ms) of smooth zoom transitions |
| `onStateClick` | `function` | `null` | Callback when a state is clicked |
| `onCountyClick` | `function` | `null` | Callback when a county is clicked |
| `onCityClick` | `function` | `null` | Callback when a city pin is clicked |
| `onDistrictClick` | `function` | `null` | Callback when a congressional district is clicked |
| `onZipClick` | `function` | `null` | Callback when a zip code area is clicked |
| `onZoom` | `function` | `null` | Callback when zoom transition completes |
| `onLayerChange` | `function` | `null` | Callback when active layer changes |

---

## 🛠️ Public Methods

```javascript
// Programmatic Navigation
map.zoomToState('CA');           // Zoom to state by 2-letter abbreviation
map.zoomToCounty('06075');        // Zoom to county by FIPS (or name: "San Francisco")
map.zoomToDistrict('CA-12');      // Zoom to Congressional District
map.zoomToRegion('San Jose - Silicon Valley'); // Zoom to Thumbtack Metro Region
map.zoomToCity('Austin');         // Zoom to City
map.zoomToZip('90210');           // Zoom to Zip Code
map.resetView();                  // Zoom back out to national country view

// Layer Management
map.setLayer('regions');          // Switch layer: 'counties' | 'cities' | 'districts' | 'zipcodes' | 'regions' | 'all'

// Theming
map.setTheme('dark');             // 'light' | 'dark' | 'emerald'

// Exporting
map.exportSVG();                  // Download standalone SVG of current view
map.exportPNG(2);                 // Download 2x resolution raster PNG

// Cleanup
map.destroy();                    // Remove event listeners and clear container
```

---

## 📂 Pre-Built Standalone SVGs

If you only need standalone, self-contained SVG files to use in Illustrator, Figma, or as static SVG web assets:

- **Master National SVG**: `svgs/usa-master.svg`
- **States Outline SVG**: `svgs/usa-states-only.svg`
- **50 Standalone State SVGs**: Located in `svgs/states/<ABBR>.svg`
  - Examples: `svgs/states/CA.svg`, `svgs/states/TX.svg`, `svgs/states/NY.svg`, `svgs/states/FL.svg`
  - Each state SVG file contains:
    - State boundary outline
    - County vector paths `<g id="counties-[ABBR]">`
    - Congressional district vector paths `<g id="districts-[ABBR]">`
    - Zip Code polygons `<g id="zipcodes-[ABBR]">`
    - City & Capital pins `<g id="cities-[ABBR]">`

---

## 🌍 Adding Additional Countries (Multi-Country Architecture)

Both **United States** (52 states & territories) and **Canada** (10 provinces, 3 territories, 293 census divisions, 338 federal ridings, and 1,657 postal FSAs) are built-in out of the box!

To switch countries at runtime:
```javascript
// Instant country switching
await map.setCountry('canada');
await map.setCountry('usa');
```

To add any additional country (e.g. Mexico, UK, Australia, Germany, or World):
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

// Register with map:
map.registerCountry('mexico', new MexicoProvider());
await map.setCountry('mexico');
```

For complete constructor options, methods, event signatures, and styling guides, see the [API Documentation (API.md)](./API.md).

---

## 🖥️ Live Demos

- **Multi-Country Showcase (USA & Canada):** `demo/index.html`
- **Canada Showcase:** `demo/canada-demo.html`
- **React Component Integration:** `demo/react-demo.html`
- **Vanilla Minimal Setup:** `demo/vanilla.html`

---

## 📜 License

MIT License. Free to use in commercial and personal applications.
Geometries derived from US Census Bureau TIGER/Line and Statistics Canada open cartographic files.

