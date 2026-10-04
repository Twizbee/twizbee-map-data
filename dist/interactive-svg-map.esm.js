// src/providers/BaseProvider.js
var BaseProvider = class {
  constructor(id, name, defaultViewBox = "0 0 960 600") {
    this.id = id;
    this.name = name;
    this.defaultViewBox = defaultViewBox;
  }
  /**
   * Returns master metadata for the country.
   */
  async getCountryMeta() {
    throw new Error("getCountryMeta() must be implemented");
  }
  /**
   * Returns list of top-level subdivisions (e.g. States, Provinces).
   */
  async getStates() {
    throw new Error("getStates() must be implemented");
  }
  /**
   * Returns full detailed data for a specific subdivision (counties, cities, districts, zipcodes).
   * @param {string} stateId - e.g. 'CA', 'TX', 'ON'
   */
  async getStateData(stateId) {
    throw new Error("getStateData() must be implemented");
  }
  /**
   * Returns search index entries for autocomplete.
   */
  async getSearchIndex() {
    return [];
  }
};

// src/providers/USAProvider.js
var USAProvider = class extends BaseProvider {
  constructor(options = {}) {
    super("usa", "United States", "0 0 960 600");
    this.baseUrl = options.dataBaseUrl || "./data/usa";
    this.cache = /* @__PURE__ */ new Map();
    this.statesList = null;
    this.searchIndex = null;
    if (typeof window !== "undefined" && window.__USA_MAP_DATA__) {
      this.statesList = window.__USA_MAP_DATA__.states;
      this.searchIndex = window.__USA_MAP_DATA__.searchIndex;
      if (window.__USA_MAP_DATA__.stateDetails) {
        for (const [abbr, data] of Object.entries(window.__USA_MAP_DATA__.stateDetails)) {
          this.cache.set(abbr.toUpperCase(), data);
        }
      }
    }
  }
  async getCountryMeta() {
    return {
      id: "usa",
      name: "United States of America",
      abbr: "USA",
      capital: "Washington, D.C.",
      subdivisionType: "State",
      secondaryType: "County",
      districtType: "Congressional District",
      postalType: "ZIP Code",
      defaultViewBox: "0 0 960 600"
    };
  }
  async getStates() {
    if (this.statesList) return this.statesList;
    const tryUrls = [
      `${this.baseUrl}/states.json`,
      "../data/usa/states.json",
      "/data/usa/states.json",
      "./data/usa/states.json"
    ];
    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          this.statesList = await res.json();
          return this.statesList;
        }
      } catch (e) {
      }
    }
    if (typeof window !== "undefined" && window.__USA_MAP_DATA__) {
      this.statesList = window.__USA_MAP_DATA__.states;
      return this.statesList;
    }
    return [];
  }
  async getStateData(abbr) {
    const key = abbr.toUpperCase();
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const tryUrls = [
      `${this.baseUrl}/states/${key}.json`,
      `../data/usa/states/${key}.json`,
      `/data/usa/states/${key}.json`,
      `./data/usa/states/${key}.json`
    ];
    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          this.cache.set(key, data);
          return data;
        }
      } catch (e) {
      }
    }
    console.warn(`USAProvider: Failed to fetch state data for ${key}`);
    return null;
  }
  async getSearchIndex() {
    if (this.searchIndex) return this.searchIndex;
    const tryUrls = [
      `${this.baseUrl}/search-index.json`,
      "../data/usa/search-index.json",
      "/data/usa/search-index.json",
      "./data/usa/search-index.json"
    ];
    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          this.searchIndex = await res.json();
          return this.searchIndex;
        }
      } catch (e) {
      }
    }
    if (typeof window !== "undefined" && window.__USA_MAP_DATA__) {
      this.searchIndex = window.__USA_MAP_DATA__.searchIndex;
      return this.searchIndex;
    }
    return [];
  }
};

// src/providers/CanadaProvider.js
var CanadaProvider = class extends BaseProvider {
  constructor(options = {}) {
    super("canada", "Canada", "0 0 960 600");
    this.baseUrl = options.dataBaseUrl || "./data/canada";
    this.cache = /* @__PURE__ */ new Map();
    this.statesList = null;
    this.searchIndex = null;
    if (typeof window !== "undefined" && window.__CANADA_MAP_DATA__) {
      this.statesList = window.__CANADA_MAP_DATA__.states;
      this.searchIndex = window.__CANADA_MAP_DATA__.searchIndex;
      if (window.__CANADA_MAP_DATA__.stateDetails) {
        for (const [abbr, data] of Object.entries(window.__CANADA_MAP_DATA__.stateDetails)) {
          this.cache.set(abbr.toUpperCase(), data);
        }
      }
    }
  }
  async getCountryMeta() {
    return {
      id: "canada",
      name: "Canada",
      abbr: "CAN",
      flag: "\u{1F1E8}\u{1F1E6}",
      capital: "Ottawa",
      subdivisionType: "Province",
      secondaryType: "Census Division",
      districtType: "Federal Electoral District",
      postalType: "Postal Code (FSA)",
      defaultViewBox: "0 0 960 600"
    };
  }
  async getStates() {
    if (this.statesList) return this.statesList;
    const tryUrls = [
      `${this.baseUrl}/provinces.json`,
      "../data/canada/provinces.json",
      "/data/canada/provinces.json",
      "./data/canada/provinces.json"
    ];
    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          this.statesList = await res.json();
          return this.statesList;
        }
      } catch (e) {
      }
    }
    if (typeof window !== "undefined" && window.__CANADA_MAP_DATA__) {
      this.statesList = window.__CANADA_MAP_DATA__.states;
      return this.statesList;
    }
    return [];
  }
  async getStateData(abbr) {
    const key = abbr.toUpperCase();
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const tryUrls = [
      `${this.baseUrl}/provinces/${key}.json`,
      `../data/canada/provinces/${key}.json`,
      `/data/canada/provinces/${key}.json`,
      `./data/canada/provinces/${key}.json`
    ];
    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          this.cache.set(key, data);
          return data;
        }
      } catch (e) {
      }
    }
    console.warn(`CanadaProvider: Failed to fetch province data for ${key}`);
    return null;
  }
  async getSearchIndex() {
    if (this.searchIndex) return this.searchIndex;
    const tryUrls = [
      `${this.baseUrl}/search-index.json`,
      "../data/canada/search-index.json",
      "/data/canada/search-index.json",
      "./data/canada/search-index.json"
    ];
    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          this.searchIndex = await res.json();
          return this.searchIndex;
        }
      } catch (e) {
      }
    }
    if (typeof window !== "undefined" && window.__CANADA_MAP_DATA__) {
      this.searchIndex = window.__CANADA_MAP_DATA__.searchIndex;
      return this.searchIndex;
    }
    return [];
  }
};

// src/core/GeoMap.js
var GeoMap = class {
  constructor(target, options = {}) {
    this.target = typeof target === "string" ? document.querySelector(target) : target;
    if (!this.target) {
      throw new Error(`GeoMap: Target element "${target}" not found.`);
    }
    this.options = Object.assign({
      country: "usa",
      theme: "dark",
      // 'light' | 'dark' | 'emerald'
      activeLayer: "counties",
      // 'counties' | 'cities' | 'districts' | 'zipcodes' | 'all'
      dataBaseUrl: "./data/usa",
      canadaDataBaseUrl: "./data/canada",
      enablePanZoom: true,
      enableSearch: true,
      enableBreadcrumbs: true,
      enableInspector: true,
      enableControls: true,
      animationDuration: 550,
      onStateClick: null,
      onCountyClick: null,
      onCityClick: null,
      onDistrictClick: null,
      onZipClick: null,
      onZoom: null,
      onLayerChange: null
    }, options);
    this.providers = /* @__PURE__ */ new Map();
    this.registerCountry("usa", new USAProvider({ dataBaseUrl: this.options.dataBaseUrl }));
    this.registerCountry("canada", new CanadaProvider({ dataBaseUrl: this.options.canadaDataBaseUrl }));
    this.activeCountryId = this.options.country;
    this.currentLevel = "country";
    this.activeState = null;
    this.activeEntity = null;
    this.activeLayer = this.options.activeLayer;
    this.targetAudience = /* @__PURE__ */ new Map();
    this.activeAudienceTab = "thumbtack";
    this.defaultViewBox = { x: 0, y: 0, w: 960, h: 600 };
    this.currentViewBox = { ...this.defaultViewBox };
    this.animatingViewBox = null;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.viewBoxStart = { ...this.defaultViewBox };
    this.searchIndex = [];
    this._initDOM();
    this._attachEvents();
    this.loadCountry(this.activeCountryId);
  }
  registerCountry(id, provider) {
    this.providers.set(id.toLowerCase(), provider);
  }
  async loadCountry(countryId) {
    const provider = this.providers.get(countryId.toLowerCase());
    if (!provider) {
      console.error(`GeoMap: No provider registered for country "${countryId}"`);
      return;
    }
    this.activeCountryId = countryId.toLowerCase();
    this.activeProvider = provider;
    this._showLoading(true);
    try {
      const meta = await provider.getCountryMeta();
      this.countryMeta = meta;
      const vbParts = (meta.defaultViewBox || "0 0 960 600").split(" ").map(Number);
      this.defaultViewBox = { x: vbParts[0], y: vbParts[1], w: vbParts[2], h: vbParts[3] };
      this.currentViewBox = { ...this.defaultViewBox };
      if (this.layerPillsEl) {
        const secLabel = this.countryMeta?.secondaryType === "Census Division" ? "Divisions" : "Counties";
        const distLabel = this.countryMeta?.districtType === "Federal Electoral District" ? "Ridings" : "Districts";
        const postLabel = this.countryMeta?.postalType?.includes("FSA") ? "FSAs" : "Zip Codes";
        const secPill = this.layerPillsEl.querySelector('[data-layer="counties"]');
        const distPill = this.layerPillsEl.querySelector('[data-layer="districts"]');
        const postPill = this.layerPillsEl.querySelector('[data-layer="zipcodes"]');
        if (secPill) secPill.textContent = `\u{1F3F7}\uFE0F ${secLabel}`;
        if (distPill) distPill.textContent = `\u{1F5F3}\uFE0F ${distLabel}`;
        if (postPill) postPill.textContent = `\u{1F4EE} ${postLabel}`;
      }
      this.states = await provider.getStates();
      this.searchIndex = await provider.getSearchIndex();
      this._renderNationalView();
      this._updateBreadcrumbs();
    } catch (e) {
      console.error("GeoMap: Failed to load country", e);
    } finally {
      this._showLoading(false);
    }
  }
  async setCountry(countryId) {
    this._cleanupCityMode();
    await this.loadCountry(countryId);
  }
  /* -------------------------------------------------------------
   * DOM Initializer
   * ------------------------------------------------------------- */
  _initDOM() {
    this.target.innerHTML = "";
    this.container = document.createElement("div");
    this.container.className = `geomap-container theme-${this.options.theme}`;
    this.topbar = document.createElement("div");
    this.topbar.className = "geomap-topbar";
    this.breadcrumbsEl = document.createElement("div");
    this.breadcrumbsEl.className = "geomap-breadcrumbs";
    this.topbar.appendChild(this.breadcrumbsEl);
    if (this.options.enableSearch) {
      this.searchWrapper = document.createElement("div");
      this.searchWrapper.className = "geomap-search-wrapper";
      this.searchWrapper.innerHTML = `
        <span class="geomap-search-icon">\u{1F50D}</span>
        <input type="text" class="geomap-search-input" placeholder="Search state, county, city, district, zip..." autocomplete="off" />
        <button class="geomap-search-clear">\u2715</button>
        <div class="geomap-search-results"></div>
      `;
      this.searchInput = this.searchWrapper.querySelector(".geomap-search-input");
      this.searchResults = this.searchWrapper.querySelector(".geomap-search-results");
      this.searchClear = this.searchWrapper.querySelector(".geomap-search-clear");
      this.topbar.appendChild(this.searchWrapper);
    }
    this.layerPillsEl = document.createElement("div");
    this.layerPillsEl.className = "geomap-layer-pills";
    this.layerPillsEl.innerHTML = `
      <button class="geomap-pill ${this.activeLayer === "counties" ? "active" : ""}" data-layer="counties">\u{1F3F7}\uFE0F Counties</button>
      <button class="geomap-pill ${this.activeLayer === "cities" ? "active" : ""}" data-layer="cities">\u{1F3D9}\uFE0F Cities</button>
      <button class="geomap-pill ${this.activeLayer === "regions" ? "active" : ""}" data-layer="regions">\u{1F5FA}\uFE0F Regions</button>
      <button class="geomap-pill ${this.activeLayer === "districts" ? "active" : ""}" data-layer="districts">\u{1F5F3}\uFE0F Districts</button>
      <button class="geomap-pill ${this.activeLayer === "zipcodes" ? "active" : ""}" data-layer="zipcodes">\u{1F4EE} Zip Codes</button>
      <button class="geomap-pill ${this.activeLayer === "all" ? "active" : ""}" data-layer="all">\u{1F441}\uFE0F All</button>
    `;
    this.topbar.appendChild(this.layerPillsEl);
    this.container.appendChild(this.topbar);
    this.viewport = document.createElement("div");
    this.viewport.className = "geomap-viewport";
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("class", "geomap-svg");
    this.svg.setAttribute("viewBox", `${this.defaultViewBox.x} ${this.defaultViewBox.y} ${this.defaultViewBox.w} ${this.defaultViewBox.h}`);
    this.svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.viewport.appendChild(this.svg);
    this.tooltip = document.createElement("div");
    this.tooltip.className = "geomap-tooltip";
    this.viewport.appendChild(this.tooltip);
    if (this.options.enableControls) {
      this.controlsEl = document.createElement("div");
      this.controlsEl.className = "geomap-floating-controls";
      this.controlsEl.innerHTML = `
        <button class="geomap-control-btn" data-action="zoom-in" title="Zoom In">+</button>
        <button class="geomap-control-btn" data-action="zoom-out" title="Zoom Out">\u2212</button>
        <button class="geomap-control-btn" data-action="reset" title="Reset View">\u27F2</button>
        <button class="geomap-control-btn" data-action="theme" title="Toggle Theme">\u{1F313}</button>
        <button class="geomap-control-btn" data-action="export-svg" title="Export SVG">\u2B07</button>
      `;
      this.viewport.appendChild(this.controlsEl);
    }
    if (this.options.enableInspector) {
      this.inspector = document.createElement("div");
      this.inspector.className = "geomap-inspector hidden";
      this.viewport.appendChild(this.inspector);
    }
    this.loadingEl = document.createElement("div");
    this.loadingEl.className = "geomap-loading";
    this.loadingEl.innerHTML = '<div class="geomap-spinner"></div>';
    this.viewport.appendChild(this.loadingEl);
    this.audienceBtn = document.createElement("button");
    this.audienceBtn.className = "geomap-audience-btn";
    this.audienceBtn.innerHTML = `\u{1F3AF} Target Audience <span class="geomap-audience-badge">0</span>`;
    this.viewport.appendChild(this.audienceBtn);
    this.audienceModal = document.createElement("div");
    this.audienceModal.className = "geomap-modal-backdrop";
    this.viewport.appendChild(this.audienceModal);
    this.container.appendChild(this.viewport);
    this.target.appendChild(this.container);
  }
  /* -------------------------------------------------------------
   * Rendering: National View
   * ------------------------------------------------------------- */
  _renderNationalView() {
    this.currentLevel = "country";
    this.activeState = null;
    this.activeEntity = null;
    this._hideInspector();
    this.svg.innerHTML = `
      <defs>
        <filter id="geomap-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.2" />
        </filter>
      </defs>
      <g id="geomap-national-layer" class="national-layer">
        ${this.states.filter((s) => s.path).map((s) => `
          <path id="state-${s.abbr}" class="state-path" data-abbr="${s.abbr}" data-name="${s.name}" data-capital="${s.capital}" data-pop="${s.population}" d="${s.path}" vector-effect="non-scaling-stroke">
            <title>${s.name}</title>
          </path>
        `).join("")}
      </g>
      <g id="geomap-labels-layer" class="labels-layer">
        ${this.states.filter((s) => s.center && s.center[0] > 0 && !["DC", "RI", "DE", "MD", "PE"].includes(s.abbr)).map((s) => `
          <text class="state-label" x="${s.center[0]}" y="${s.center[1] + 3}">${s.abbr}</text>
        `).join("")}
      </g>
      <g id="layer-highlights"></g>
    `;
    this._animateViewBox(this.defaultViewBox);
    this._updateBreadcrumbs();
  }
  /* -------------------------------------------------------------
   * Rendering: State Level (Drilldown View)
   * ------------------------------------------------------------- */
  async zoomToState(abbr, options = {}) {
    abbr = abbr.toUpperCase();
    const stateMeta = this.states.find((s) => s.abbr === abbr);
    if (!stateMeta) return;
    this._cleanupCityMode();
    this._showLoading(true);
    const stateData = await this.activeProvider.getStateData(abbr);
    this._showLoading(false);
    if (!stateData) {
      console.warn(`GeoMap: Could not load details for ${abbr}`);
      return;
    }
    this.currentLevel = "state";
    this.activeState = stateData;
    this.activeEntity = { type: "state", ...stateData };
    const padding = 15;
    const b = stateData.bounds;
    const targetVb = {
      x: b[0] - padding,
      y: b[1] - padding,
      w: b[2] + padding * 2,
      h: b[3] + padding * 2
    };
    const scaleFactor = Math.max(0.12, targetVb.w / 960);
    const cityFont = Math.max(2, (6.5 * scaleFactor).toFixed(1));
    const capFont = Math.max(2.5, (8 * scaleFactor).toFixed(1));
    const cityR = Math.max(1.2, (2.8 * scaleFactor).toFixed(1));
    const haloWidth = Math.max(0.6, (1.2 * scaleFactor).toFixed(1));
    this.svg.innerHTML = `
      <!-- State Base Outline -->
      <path id="state-bg-${abbr}" class="state-bg" d="${stateData.path}" vector-effect="non-scaling-stroke" />

      <!-- Layer: Counties -->
      <g id="layer-counties" class="layer-counties" style="display: ${["counties", "all"].includes(this.activeLayer) ? "block" : "none"}">
        ${stateData.counties.map((c) => `
          <path id="county-${c.id}" class="county-path" data-id="${c.id}" data-name="${c.name}" data-state="${abbr}" d="${c.path}" vector-effect="non-scaling-stroke">
            <title>${c.name} County</title>
          </path>
        `).join("")}
      </g>

      <!-- Layer: Congressional Districts -->
      <g id="layer-districts" class="layer-districts" style="display: ${["districts", "all"].includes(this.activeLayer) ? "block" : "none"}">
        ${stateData.districts.map((d) => `
          <path id="district-${d.id}" class="district-path" data-id="${d.id}" data-name="${d.name}" data-short="${d.shortName}" d="${d.path}" vector-effect="non-scaling-stroke">
            <title>${d.name}</title>
          </path>
        `).join("")}
      </g>

      <!-- Layer: Zip Codes -->
      <g id="layer-zipcodes" class="layer-zipcodes" style="display: ${["zipcodes", "all"].includes(this.activeLayer) ? "block" : "none"}">
        ${stateData.zipcodes.map((z) => {
      let scaleCls = "";
      if (z.bounds && z.bounds.length >= 4) {
        const maxDim = Math.max(z.bounds[2], z.bounds[3]);
        if (maxDim < 0.6) scaleCls = " zip-scale-xs";
        else if (maxDim < 1.5) scaleCls = " zip-scale-sm";
        else if (maxDim < 3.5) scaleCls = " zip-scale-md";
        else if (maxDim < 8) scaleCls = " zip-scale-lg";
        else scaleCls = " zip-scale-xl";
      }
      return `
          <path id="zip-${z.zip}" class="zipcode-path${scaleCls}" data-zip="${z.zip}" data-city="${z.city || ""}" data-county="${z.county || ""}" data-district="${z.district || ""}" d="${z.path}" vector-effect="non-scaling-stroke">
            <title>ZIP ${z.zip} (${z.city || ""}) ${z.district ? "\u2022 " + z.district : ""}</title>
          </path>
        `;
    }).join("")}
      </g>

      <!-- Layer: Stitched City Boundaries -->
      <g id="layer-city-stitched" class="layer-city-stitched"></g>

      <!-- Layer: Regions (Thumbtack Mapped Metros) -->
      <g id="layer-regions" class="layer-regions" style="display: ${["regions", "all"].includes(this.activeLayer) ? "block" : "none"}">
        ${(stateData.regions || []).map((r) => `
          <path id="region-${r.id}" class="region-path" data-id="${r.id}" data-name="${r.name}" data-reach="${r.monthlyReach || 0}" data-cities="${r.citiesCount || 0}" data-zips="${r.zipCount || 0}" d="${r.path}" vector-effect="non-scaling-stroke">
            <title>${r.name} (${r.citiesCount || 0} Cities \u2022 ${r.zipCount || 0} ZIPs)</title>
          </path>
        `).join("")}
      </g>

      <!-- Layer: Cities & Capitals (Official Outlines Only - No Marker Circles or Large Text Labels) -->
      <g id="layer-cities" class="layer-cities" style="display: ${["cities", "all"].includes(this.activeLayer) ? "block" : "none"}">
        <g class="city-boundaries-sublayer">
          ${(stateData.cities || []).filter((c) => c.path || c.stitchedPath).map((c) => `
            <path class="city-boundary-path" id="city-path-${c.id || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}" data-id="${c.id || ""}" data-name="${c.name}" d="${c.path || c.stitchedPath}" vector-effect="non-scaling-stroke">
              <title>${c.name}${c.county ? " (" + c.county + " Co.)" : ""} \u2022 ${c.zipCount || 1} ZIPs</title>
            </path>
          `).join("")}
        </g>
      </g>

      <!-- Dynamic Highlight Pin Container -->
      <g id="layer-highlights"></g>
    `;
    if (!options.skipAnimation) {
      this._animateViewBox(targetVb);
    } else {
      this.currentViewBox = targetVb;
      this.svg.setAttribute("viewBox", `${targetVb.x} ${targetVb.y} ${targetVb.w} ${targetVb.h}`);
    }
    this._updateBreadcrumbs();
    if (!options.skipInspector) {
      const subType = this.countryMeta?.subdivisionType || "State";
      const secType = this.countryMeta?.secondaryType === "Census Division" ? "Census Divisions" : "Counties";
      const distType = this.countryMeta?.districtType === "Federal Electoral District" ? "Federal Ridings" : "Cong. Districts";
      const postType = this.countryMeta?.postalType?.includes("FSA") ? "FSAs Mapped" : "Zip Codes Mapped";
      const areaVal = stateData.landAreaSqMi ? `${stateData.landAreaSqMi.toLocaleString()} sq mi` : stateData.landAreaSqKm ? `${stateData.landAreaSqKm.toLocaleString()} sq km` : "N/A";
      this._showInspector({
        title: `${stateData.name} (${stateData.abbr})`,
        subtitle: `Capital: ${stateData.capital}`,
        type: subType,
        stats: [
          { label: "Population", value: stateData.population ? stateData.population.toLocaleString() : "N/A" },
          { label: "Land Area", value: areaVal },
          { label: secType, value: stateData.countiesCount },
          { label: distType, value: stateData.districtsCount },
          { label: postType, value: stateData.zipCodesCount },
          { label: "Cities Cataloged", value: stateData.citiesCount },
          { label: "Region", value: stateData.region }
        ]
      });
      if (typeof this.options.onStateClick === "function") {
        this.options.onStateClick(stateData);
      }
    }
  }
  /* -------------------------------------------------------------
   * Specific Entity Zoom
   * ------------------------------------------------------------- */
  async zoomToCounty(fipsOrName) {
    let query = String(fipsOrName || "").trim();
    if (!query) return;
    const unaccent = (str) => (str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    let targetState = null;
    if (query.includes(",")) {
      const parts = query.split(",");
      targetState = parts[parts.length - 1].trim().toUpperCase().slice(0, 2);
      query = parts[0].trim();
    }
    const cleanQuery = query.replace(/\s+(county|municipio|division|parish)$/i, "").trim();
    const cleanNorm = unaccent(cleanQuery);
    const match = this.searchIndex.find((s) => s.type === "county" && (s.id === query || unaccent(s.countyName || s.name || "").replace(/\s+(county|municipio|division|parish)$/i, "").trim() === cleanNorm || unaccent(s.name || "").toLowerCase() === cleanNorm) && (!targetState || s.state === targetState));
    if (match) targetState = match.state;
    if (targetState && (!this.activeState || this.activeState.abbr !== targetState)) {
      await this.zoomToState(targetState, { skipAnimation: true, skipInspector: true });
    }
    if (!this.activeState || !this.activeState.counties) return;
    const county = this.activeState.counties.find(
      (c) => c.id === query || unaccent(c.name || "").replace(/\s+(county|municipio|division|parish)$/i, "").trim() === cleanNorm || unaccent(c.name || "").toLowerCase() === cleanNorm
    );
    if (county) {
      this._cleanupCityMode();
      this.currentLevel = "county";
      this.activeEntity = { type: "county", ...county };
      this.setLayer("counties");
      this._highlightElement(`#county-${county.id}`, "county-path");
      const b = county.bounds;
      const padX = Math.max(6, b[2] * 0.35);
      const padY = Math.max(6, b[3] * 0.35);
      const targetW = b[2] + padX * 2;
      const targetH = Math.max(targetW / 1.6, b[3] + padY * 2);
      const finalW = targetH * 1.6;
      const cx = county.center ? county.center[0] : b[0] + b[2] / 2;
      const cy = county.center ? county.center[1] : b[1] + b[3] / 2;
      const isCan = this.activeCountryId === "canada";
      const isPR = this.activeState?.abbr === "PR";
      const cLabel = isPR ? `${county.name} Municipio` : isCan ? county.name : county.name.toLowerCase().includes("county") ? county.name : `${county.name} Co.`;
      this._renderBeacon(cx, cy, "county", cLabel, finalW);
      await this._animateViewBox({
        x: cx - finalW / 2,
        y: cy - targetH / 2,
        w: finalW,
        h: targetH
      });
      this._updateBreadcrumbs();
      const cTitle = isPR ? `${county.name} Municipio` : county.name.toLowerCase().includes("county") || county.name.toLowerCase().includes("division") ? county.name : `${county.name} County`;
      const rawCountyName = county.name.toLowerCase().replace(/\s+county$/i, "").replace(/\s+municipio$/i, "").trim();
      const countyZips = (this.activeState.zipcodes || []).filter(
        (z) => z.county && z.county.toLowerCase().replace(/\s+county$/i, "").replace(/\s+municipio$/i, "").trim() === rawCountyName
      );
      this.activeEntity.zips = countyZips.map((z) => z.zip);
      const countyCities = (this.activeState.cities || []).filter(
        (c) => c.county && c.county.toLowerCase().replace(/\s+county$/i, "").replace(/\s+municipio$/i, "").trim() === rawCountyName || countyZips.some((z) => z.city && z.city.toLowerCase() === c.name.toLowerCase())
      );
      let extraCountyHtml = "";
      if (countyCities.length > 0) {
        const topCities = countyCities.slice(0, 16);
        extraCountyHtml += `
          <div class="geomap-stat-row" style="flex-direction:column;align-items:flex-start;gap:6px;margin-top:8px;">
            <span class="geomap-stat-label">Included Places (${countyCities.length}):</span>
            <div style="display:flex;flex-wrap:wrap;gap:4px;max-height:85px;overflow-y:auto;">
              ${topCities.map((c) => `<button class="geomap-link-btn" data-action="inspect-city" data-val="${c.name}" style="font-size:11px;padding:2px 6px;border-radius:4px;background:rgba(6,182,212,0.12);color:var(--geomap-accent);border:1px solid rgba(6,182,212,0.3);cursor:pointer;">${c.name}</button>`).join("")}
              ${countyCities.length > 16 ? `<span style="font-size:10px;color:var(--geomap-text-muted);align-self:center;">+${countyCities.length - 16} more</span>` : ""}
            </div>
          </div>
        `;
      }
      if (countyZips.length > 0) {
        const topZips = countyZips.slice(0, 24);
        extraCountyHtml += `
          <div class="geomap-stat-row" style="flex-direction:column;align-items:flex-start;gap:6px;margin-top:6px;">
            <span class="geomap-stat-label">${isCan ? "Postal FSAs" : "ZIP Codes"} (${countyZips.length}):</span>
            <div class="geomap-zip-pill-container" style="display:flex;flex-wrap:wrap;gap:4px;max-height:85px;overflow-y:auto;">
              ${topZips.map((z) => `<button class="geomap-zip-pill" data-zip="${z.zip}">${z.zip}</button>`).join("")}
              ${countyZips.length > 24 ? `<span style="font-size:10px;color:var(--geomap-text-muted);align-self:center;">+${countyZips.length - 24} more</span>` : ""}
            </div>
          </div>
        `;
      }
      const areaVal = county.landAreaSqMi ? `${county.landAreaSqMi.toLocaleString()} sq mi` : county.landAreaSqKm ? `${county.landAreaSqKm.toLocaleString()} sq km` : "N/A";
      this._showInspector({
        title: cTitle,
        subtitle: isPR ? "Commonwealth of Puerto Rico" : `${this.countryMeta?.subdivisionType || "State"}: ${this.activeState.name}`,
        type: isPR ? "Municipio" : this.countryMeta?.secondaryType || "County",
        stats: [
          { label: isCan ? "CD UID" : "FIPS Code", value: county.id },
          { label: isPR ? "Jurisdiction" : this.countryMeta?.subdivisionType || "State", value: `${this.activeState.name} (${this.activeState.abbr})` },
          { label: "Exact Land Area", value: areaVal },
          { label: "Member Places", value: countyCities.length ? `${countyCities.length} Mapped` : "N/A" },
          { label: isCan ? "Postal FSAs" : "ZIP Codes", value: countyZips.length ? `${countyZips.length} Mapped` : "N/A" },
          { label: "Center (SVG)", value: `${cx.toFixed(1)}, ${cy.toFixed(1)}` }
        ],
        extraHtml: extraCountyHtml
      });
      if (typeof this.options.onCountyClick === "function") {
        this.options.onCountyClick(county);
      }
    }
  }
  async zoomToDistrict(districtId) {
    let targetState = districtId.split("-")[0];
    if (targetState && (!this.activeState || this.activeState.abbr !== targetState)) {
      await this.zoomToState(targetState, { skipAnimation: true, skipInspector: true });
    }
    if (!this.activeState) return;
    const district = this.activeState.districts.find((d) => d.id === districtId || d.shortName === districtId);
    if (district) {
      this._cleanupCityMode();
      this.currentLevel = "district";
      this.activeEntity = { type: "district", ...district };
      this.setLayer("districts");
      this._highlightElement(`#district-${district.id}`, "district-path");
      const pad = 12;
      const b = district.bounds;
      const targetW = b[2] + pad * 2;
      const targetH = Math.max(targetW / 1.6, b[3] + pad * 2);
      const finalW = targetH * 1.6;
      const cx = district.center ? district.center[0] : b[0] + b[2] / 2;
      const cy = district.center ? district.center[1] : b[1] + b[3] / 2;
      this._renderBeacon(cx, cy, "district", district.shortName, finalW);
      await this._animateViewBox({
        x: cx - finalW / 2,
        y: cy - targetH / 2,
        w: finalW,
        h: targetH
      });
      this._updateBreadcrumbs();
      const isCan = this.activeCountryId === "canada";
      const postLabel = isCan ? "Postal FSAs" : "ZIP Codes";
      const postSingular = isCan ? "FSA" : "ZIP";
      const secLabel = isCan ? "Census Divisions" : "Counties";
      const distType = this.countryMeta?.districtType || (isCan ? "Federal Electoral District" : "Congressional District");
      let extraDistHtml = "";
      if (district.counties && district.counties.length > 0) {
        extraDistHtml += `
          <div class="geomap-stat-row" style="flex-direction:column;align-items:flex-start;gap:6px;margin-top:8px;">
            <span class="geomap-stat-label">Member ${secLabel} (${district.counties.length}):</span>
            <div style="display:flex;flex-wrap:wrap;gap:4px;max-height:65px;overflow-y:auto;">
              ${district.counties.map((c) => `<button class="geomap-link-btn" data-action="inspect-county" data-val="${c}" style="font-size:11px;padding:2px 6px;border-radius:4px;background:rgba(234,67,53,0.1);color:#ea4335;border:1px solid rgba(234,67,53,0.3);cursor:pointer;">${c}</button>`).join("")}
            </div>
          </div>
        `;
      }
      if (district.zips && district.zips.length > 0) {
        const topZips = district.zips.slice(0, 30);
        extraDistHtml += `
          <div class="geomap-stat-row" style="flex-direction:column;align-items:flex-start;gap:6px;margin-top:6px;">
            <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
              <span class="geomap-stat-label">Member ${postLabel} (${district.zips.length}):</span>
              <button class="geomap-action-btn" data-action="copy-zips" data-zips="${district.zips.join(",")}" style="font-size:10px;padding:3px 7px;cursor:pointer;border-radius:4px;background:#ea4335;color:#fff;border:none;font-weight:600;display:inline-flex;align-items:center;gap:3px;">\u{1F4CB} Copy ${district.zips.length} ${postSingular}s</button>
            </div>
            <div class="geomap-zip-pill-container" style="display:flex;flex-wrap:wrap;gap:4px;max-height:85px;overflow-y:auto;">
              ${topZips.map((z) => `<button class="geomap-zip-pill" data-zip="${z}">${z}</button>`).join("")}
              ${district.zips.length > 30 ? `<span style="font-size:10px;color:var(--geomap-text-muted);align-self:center;">+${district.zips.length - 30} more</span>` : ""}
            </div>
          </div>
        `;
      }
      const areaVal = district.landAreaSqMi ? `${district.landAreaSqMi.toLocaleString()} sq mi` : district.landAreaSqKm ? `${district.landAreaSqKm.toLocaleString()} sq km` : "N/A";
      this._showInspector({
        id: district.id,
        title: district.name,
        subtitle: isCan ? `Federal Riding \u2022 ${district.shortName || district.id}` : `118th US Congress \u2022 ${district.shortName}`,
        type: distType,
        stats: [
          { label: "District Code", value: district.shortName || district.id },
          { label: this.countryMeta?.subdivisionType || (isCan ? "Province" : "State"), value: this.activeState.name },
          { label: "Exact Land Area", value: areaVal },
          { label: `Member ${postSingular}s`, value: district.zips ? `${district.zips.length} Mapped` : "N/A" },
          { label: `${secLabel} Covered`, value: district.counties ? `${district.counties.length} ${secLabel}` : "N/A" }
        ],
        extraHtml: extraDistHtml
      });
      if (typeof this.options.onDistrictClick === "function") {
        this.options.onDistrictClick(district);
      }
    }
  }
  async zoomToZip(zipCode) {
    const rawZip = String(zipCode || "").trim();
    const padded = /^\d{1,5}$/.test(rawZip) ? rawZip.padStart(5, "0") : rawZip.toUpperCase();
    let targetState = null;
    let match = this.searchIndex.find((s) => s.type === "zip" && s.zip.toUpperCase() === padded);
    if (match) targetState = match.state;
    if (targetState && (!this.activeState || this.activeState.abbr !== targetState)) {
      await this.zoomToState(targetState, { skipAnimation: true, skipInspector: true });
    }
    if (!this.activeState) return;
    const zipItem = this.activeState.zipcodes.find((z) => z.zip === padded);
    const cityName = zipItem ? zipItem.city : match ? match.city : "Area";
    const countyName = (zipItem ? zipItem.county : match?.county) || "";
    const districtName = (zipItem ? zipItem.district : match?.district) || "";
    let cx = 0, cy = 0;
    let b = null;
    if (zipItem) {
      b = zipItem.bounds;
      cx = zipItem.center ? zipItem.center[0] : zipItem.x !== void 0 ? zipItem.x : b[0] + b[2] / 2;
      cy = zipItem.center ? zipItem.center[1] : zipItem.y !== void 0 ? zipItem.y : b[1] + b[3] / 2;
    } else if (match && match.x !== void 0) {
      cx = match.x;
      cy = match.y;
      b = match.bounds || [cx - 2, cy - 2, 4, 4];
    } else {
      cx = this.activeState.center[0];
      cy = this.activeState.center[1];
      b = [cx - 10, cy - 10, 20, 20];
    }
    const cityObj = this.activeState.cities?.find((c) => c.name.toLowerCase() === cityName.toLowerCase() || c.zips?.includes(padded)) || this.activeState.subregions?.find((s) => s.name.toLowerCase() === cityName.toLowerCase() || s.zips?.includes(padded));
    this.currentLevel = "zip";
    this.activeEntity = {
      type: "zip",
      id: padded,
      name: `ZIP ${padded}`,
      zip: padded,
      city: cityName,
      cityName,
      metroName: cityObj?.metroName || "",
      parentCity: cityObj?.parentCity || "",
      county: countyName || cityObj?.county || "",
      district: districtName,
      state: this.activeState.abbr,
      lat: zipItem?.lat || match?.lat,
      lon: zipItem?.lon || match?.lon,
      x: cx,
      y: cy
    };
    this._cleanupCityMode();
    this.setLayer("zipcodes");
    if (zipItem) {
      this._highlightElement(`#zip-${zipItem.zip}`, "zipcode-path");
    }
    const bw = Math.max(0.08, b[2]);
    const bh = Math.max(0.08, b[3]);
    const padX = Math.max(0.2, bw * 0.45);
    const padY = Math.max(0.2, bh * 0.45);
    let targetW = bw + padX * 2;
    let targetH = targetW / 1.6;
    if (targetH < bh + padY * 2) {
      targetH = bh + padY * 2;
      targetW = targetH * 1.6;
    }
    const isCan = this.activeCountryId === "canada";
    const postPrefix = isCan ? "FSA" : "ZIP";
    const postType = this.countryMeta?.postalType || "Postal Code";
    const secType = this.countryMeta?.secondaryType || "County";
    const distType = this.countryMeta?.districtType || "Congressional District";
    const subType = this.countryMeta?.subdivisionType || "State";
    this._renderBeacon(cx, cy, "zip", `${postPrefix} ${padded}`, targetW);
    await this._animateViewBox({
      x: cx - targetW / 2,
      y: cy - targetH / 2,
      w: targetW,
      h: targetH
    });
    this._updateBreadcrumbs();
    this._showInspector({
      title: `${postPrefix} ${padded}`,
      subtitle: `${cityName}, ${this.activeState.abbr}`,
      type: postType,
      stats: [
        { label: "City", value: cityName ? `<button class="geomap-link-btn" data-action="inspect-city" data-val="${cityName}">${cityName}</button>` : "N/A" },
        { label: secType, value: countyName ? `<button class="geomap-link-btn" data-action="inspect-county" data-val="${countyName}">${countyName}</button>` : "N/A" },
        { label: subType, value: `${this.activeState.name} (${this.activeState.abbr})` },
        { label: distType, value: districtName ? `<button class="geomap-link-btn" data-action="inspect-district" data-val="${districtName}">${districtName}</button>` : "N/A" },
        { label: "Coordinates", value: zipItem?.lat || match?.lat ? `${(zipItem?.lat || match?.lat).toFixed(4)}, ${(zipItem?.lon || match?.lon).toFixed(4)}` : "Mapped" }
      ]
    });
    if (typeof this.options.onZipClick === "function") {
      this.options.onZipClick(this.activeEntity);
    }
  }
  async zoomToCity(cityNameOrId) {
    let query = String(cityNameOrId || "").trim();
    if (!query) return;
    const unaccent = (str) => (str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    const originalQuery = query;
    const origQueryNorm = unaccent(query);
    const origQuerySlug = origQueryNorm.replace(/\s+/g, "-");
    let targetCity = null;
    let targetStateAbbr = null;
    let specifiedState = null;
    const commaParts = query.split(",");
    if (commaParts.length > 1) {
      specifiedState = commaParts[commaParts.length - 1].trim().toUpperCase().slice(0, 2);
      query = commaParts[0].trim();
    } else if (query.includes("-") && query.length > 3) {
      const dashParts = query.split("-");
      if (dashParts[0].length === 2 && /^[A-Za-z]{2}$/.test(dashParts[0])) {
        specifiedState = dashParts[0].toUpperCase();
        query = dashParts.slice(1).join(" ").trim();
      }
    }
    const qNorm = unaccent(query);
    const qSlug = qNorm.replace(/\s+/g, "-");
    const matchesCity = (c) => {
      if (!c) return false;
      const cId = (c.id || "").toLowerCase();
      const cNameNorm = unaccent(c.name || "");
      const cCityNorm = unaccent(c.cityName || "");
      const cleanCName = cNameNorm.replace(/\s*\([^)]*\)/g, "").trim();
      const cleanCCity = cCityNorm.replace(/\s*\([^)]*\)/g, "").trim();
      return cId === originalQuery.toLowerCase() || cId === origQuerySlug || cId === qSlug || specifiedState && cId === `${specifiedState.toLowerCase()}-${qSlug}` || cNameNorm === qNorm || cCityNorm === qNorm || cleanCName === qNorm || cleanCCity === qNorm || cNameNorm.replace(/\s+/g, "-") === qSlug;
    };
    if (this.activeState && (!specifiedState || specifiedState === this.activeState.abbr)) {
      targetCity = this.activeState.cities && this.activeState.cities.find(matchesCity) || this.activeState.subregions && this.activeState.subregions.find(matchesCity) || this.activeState.allCities && this.activeState.allCities.find(matchesCity);
      if (targetCity) {
        targetStateAbbr = this.activeState.abbr;
      }
    }
    if (!targetCity) {
      let candidates = this.searchIndex.filter((s) => (s.type === "city" || s.type === "subregion" || s.type === "neighborhood" || s.type === "borough" || s.type === "cdp") && (matchesCity(s) || unaccent(s.name || "").startsWith(qNorm + ",") || unaccent(s.cityName || "").startsWith(qNorm) || unaccent(s.name || "").includes(qNorm)));
      if (specifiedState) {
        candidates = candidates.filter((c) => (c.state || c.province) === specifiedState);
      }
      if (candidates.length > 0) {
        candidates.sort((a, b2) => {
          const aExact = unaccent(a.cityName || a.name) === qNorm;
          const bExact = unaccent(b2.cityName || b2.name) === qNorm;
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
          const aSt = a.state || a.province;
          const bSt = b2.state || b2.province;
          if (this.activeState && aSt === this.activeState.abbr) return -1;
          if (this.activeState && bSt === this.activeState.abbr) return 1;
          if (a.isCapital && !b2.isCapital) return -1;
          if (!a.isCapital && b2.isCapital) return 1;
          return (b2.zipCount || 0) - (a.zipCount || 0);
        });
        const best = candidates[0];
        targetStateAbbr = best.state || best.province;
        targetCity = best;
      }
    }
    if (!targetCity || !targetStateAbbr) return;
    if (!this.activeState || this.activeState.abbr !== targetStateAbbr) {
      await this.zoomToState(targetStateAbbr, { skipAnimation: true, skipInspector: true });
    }
    if (!this.activeState) return;
    const fullCity = this.activeState.cities && this.activeState.cities.find(matchesCity) || this.activeState.subregions && this.activeState.subregions.find(matchesCity) || this.activeState.allCities && this.activeState.allCities.find(matchesCity) || targetCity;
    const cName = fullCity.cityName || fullCity.name;
    const cityZips = this.activeState.zipcodes ? this.activeState.zipcodes.filter((z) => {
      if (fullCity.zips && fullCity.zips.length > 0) {
        return fullCity.zips.includes(z.zip);
      }
      return z.city && unaccent(z.city) === unaccent(cName);
    }) : [];
    let stitchedPath = fullCity.path || fullCity.stitchedPath || "";
    let b = fullCity.bounds;
    let minX, minY, cityW, cityH;
    if (b && b.length === 4) {
      minX = b[0];
      minY = b[1];
      cityW = b[2];
      cityH = b[3];
    } else if (cityZips.length > 0) {
      minX = Math.min(...cityZips.map((z) => z.bounds[0]));
      minY = Math.min(...cityZips.map((z) => z.bounds[1]));
      const maxX = Math.max(...cityZips.map((z) => z.bounds[0] + z.bounds[2]));
      const maxY = Math.max(...cityZips.map((z) => z.bounds[1] + z.bounds[3]));
      cityW = Math.max(0.5, maxX - minX);
      cityH = Math.max(0.5, maxY - minY);
    } else {
      minX = (fullCity.x || fullCity.center?.[0] || 100) - 2;
      minY = (fullCity.y || fullCity.center?.[1] || 100) - 2;
      cityW = 4;
      cityH = 4;
    }
    if (!stitchedPath && cityZips.length > 0) {
      stitchedPath = cityZips.map((z) => z.path).join(" ");
    }
    const cx = fullCity.center ? fullCity.center[0] : minX + cityW / 2;
    const cy = fullCity.center ? fullCity.center[1] : minY + cityH / 2;
    this.currentLevel = "city";
    this.activeEntity = {
      id: fullCity.id || `${this.activeState.abbr}-${cName.toLowerCase().replace(/\s+/g, "-")}`,
      type: fullCity.tier === 2 ? "subregion" : "city",
      name: cName,
      fullName: fullCity.fullName || cName,
      cityName: cName,
      state: this.activeState.abbr,
      county: fullCity.county || (cityZips[0]?.county || ""),
      metroName: fullCity.metroName || "",
      metroId: fullCity.metroId || fullCity.parentPk || "",
      parentCity: fullCity.parentCity || "",
      isCapital: fullCity.isCapital,
      landAreaSqMi: fullCity.landAreaSqMi,
      landAreaSqKm: fullCity.landAreaSqKm,
      zipCount: cityZips.length || fullCity.zipCount || (fullCity.zips ? fullCity.zips.length : 1),
      zips: cityZips.length > 0 ? cityZips.map((z) => z.zip) : fullCity.zips || [],
      bounds: [minX, minY, cityW, cityH],
      stitchedPath,
      x: cx,
      y: cy,
      lat: fullCity.lat || cityZips[0]?.lat,
      lon: fullCity.lon || cityZips[0]?.lon
    };
    this.container.classList.add("city-mode");
    const zipLayer = this.svg.querySelector("#layer-zipcodes");
    if (zipLayer) zipLayer.style.display = "block";
    const cityZipSet = new Set(this.activeEntity.zips);
    this.svg.querySelectorAll(".zipcode-path").forEach((el) => {
      el.classList.toggle("in-active-city", cityZipSet.has(el.dataset.zip));
    });
    let stitchedLayer = this.svg.querySelector("#layer-city-stitched");
    if (!stitchedLayer) {
      stitchedLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
      stitchedLayer.id = "layer-city-stitched";
      stitchedLayer.className.baseVal = "layer-city-stitched";
      const citiesLayer = this.svg.querySelector("#layer-cities");
      if (citiesLayer && citiesLayer.parentNode) {
        citiesLayer.parentNode.insertBefore(stitchedLayer, citiesLayer);
      } else {
        this.svg.appendChild(stitchedLayer);
      }
    }
    if (stitchedPath) {
      stitchedLayer.innerHTML = `
        <path class="city-stitched-boundary" d="${stitchedPath}" vector-effect="non-scaling-stroke">
          <title>${cName} (${this.activeEntity.zipCount} ZIP Codes \u2022 City Limits)</title>
        </path>
      `;
    } else {
      stitchedLayer.innerHTML = "";
    }
    if (fullCity.id) {
      this._highlightElement(`#city-${fullCity.id}`, "city-boundary-path");
      this._highlightElement(`#city-path-${fullCity.id}`, "city-boundary-path");
    }
    const bw = Math.max(0.2, cityW);
    const bh = Math.max(0.2, cityH);
    const padX = Math.max(0.2, bw * 0.45);
    const padY = Math.max(0.2, bh * 0.45);
    let targetW = bw + padX * 2;
    let targetH = targetW / 1.6;
    if (targetH < bh + padY * 2) {
      targetH = bh + padY * 2;
      targetW = targetH * 1.6;
    }
    const isCan = this.activeCountryId === "canada";
    const postLabel = isCan ? "FSAs" : "ZIPs";
    const subType = this.countryMeta?.subdivisionType || "State";
    const secType = this.countryMeta?.secondaryType || "County";
    this._renderBeacon(cx, cy, "city", `${cName} (${this.activeEntity.zipCount} ${postLabel})`, targetW);
    await this._animateViewBox({
      x: cx - targetW / 2,
      y: cy - targetH / 2,
      w: targetW,
      h: targetH
    });
    this._updateBreadcrumbs();
    const displayZips = this.activeEntity.zips || [];
    let zipPillsHtml = "";
    if (displayZips.length > 0) {
      const showCount = Math.min(24, displayZips.length);
      zipPillsHtml = `
        <div class="geomap-stat-row" style="flex-direction:column;align-items:flex-start;gap:6px;">
          <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
            <span class="geomap-stat-label">${isCan ? "Postal FSAs" : "ZIP Codes"} (${displayZips.length}):</span>
            <button class="geomap-action-btn" data-action="copy-zips" data-zips="${displayZips.join(",")}" style="font-size:10px;padding:3px 7px;cursor:pointer;border-radius:4px;background:#ea4335;color:#fff;border:none;font-weight:600;display:inline-flex;align-items:center;gap:3px;">\u{1F4CB} Copy ${displayZips.length} ZIPs</button>
          </div>
          <div class="geomap-zip-pill-container" style="display:flex;flex-wrap:wrap;gap:4px;max-height:85px;overflow-y:auto;">
            ${displayZips.slice(0, showCount).map((z) => `<button class="geomap-zip-pill" data-zip="${z}">${z}</button>`).join("")}
            ${displayZips.length > showCount ? `<span style="font-size:10px;color:var(--geomap-text-muted);align-self:center;">+${displayZips.length - showCount} more</span>` : ""}
          </div>
        </div>
      `;
    }
    const metroRow = this.activeEntity.metroName ? {
      label: "Parent Metro",
      value: `<button class="geomap-link-btn" data-action="inspect-region" data-val="${this.activeEntity.metroName}">${this.activeEntity.metroName}</button>`
    } : null;
    const parentCityRow = fullCity.parentCity ? {
      label: "Parent City",
      value: `<button class="geomap-link-btn" data-action="inspect-city" data-val="${fullCity.parentCity}">${fullCity.parentCity}</button>`
    } : null;
    const areaRow = fullCity.landAreaSqMi ? {
      label: "Exact Land Area",
      value: `${fullCity.landAreaSqMi.toLocaleString()} sq mi`
    } : null;
    const isPR = this.activeState?.abbr === "PR";
    const isBorough = fullCity.type === "borough";
    const isNeighborhood = fullCity.type === "neighborhood";
    const isCdp = fullCity.isCdp;
    const typeLabel = isBorough ? "Borough / Sector" : isNeighborhood ? "Sub-locality / Neighborhood" : isCdp ? "Census Designated Place (CDP)" : fullCity.isCapital ? `${subType} Capital \u2605` : fullCity.isFedCapital ? "National Capital \u{1F3DB}\uFE0F" : isPR ? "Municipio Limits" : "Incorporated City Limits";
    let subTitleText = isPR ? `Puerto Rico Municipio Limits` : `${this.activeState.name} City Limits`;
    if (fullCity.isCapital) subTitleText = isPR ? `Territory Capital \u2605 \u2022 Municipio Limits` : `${subType} Capital \u2605 \u2022 City Limits`;
    else if (isBorough) subTitleText = `${fullCity.parentCity || "Metro"}, ${this.activeState.abbr} \u2022 Official Borough / Sector`;
    else if (isNeighborhood) subTitleText = `${fullCity.parentCity || "City"}, ${this.activeState.abbr} \u2022 Neighborhood / Submarket`;
    else if (isCdp) subTitleText = `${this.activeEntity.county || this.activeState.name} \u2022 Census Designated Place`;
    else if (this.activeEntity.metroName) subTitleText = `${this.activeEntity.metroName} Metro \u2022 City Limits`;
    let sisterCitiesCandidates = (this.activeState.cities || []).filter(
      (c) => c.name.toLowerCase() !== cName.toLowerCase() && !c.isCdp && c.county && this.activeEntity.county && c.county.toLowerCase() === this.activeEntity.county.toLowerCase()
    );
    if (isPR || sisterCitiesCandidates.length < 3) {
      sisterCitiesCandidates = (this.activeState.cities || []).filter(
        (c) => c.name.toLowerCase() !== cName.toLowerCase() && !c.isCdp
      );
    }
    const sisterCities = sisterCitiesCandidates.map((c) => {
      const cCenter = c.center || (c.bounds ? [c.bounds[0] + c.bounds[2] / 2, c.bounds[1] + c.bounds[3] / 2] : [0, 0]);
      const dist = Math.hypot(cCenter[0] - cx, cCenter[1] - cy);
      return { ...c, _dist: dist };
    }).sort((a, b2) => a._dist - b2._dist).slice(0, 8);
    let sisterHtml = "";
    if (sisterCities.length > 0) {
      const sisterGroupLabel = isPR ? "Neighboring Municipios (PR)" : `Adjacent / Sister Markets (${this.activeEntity.county} Co.)`;
      sisterHtml = `
        <div class="geomap-stat-row" style="flex-direction:column;align-items:flex-start;gap:6px;margin-top:8px;">
          <span class="geomap-stat-label">${sisterGroupLabel}:</span>
          <div class="geomap-sister-container">
            ${sisterCities.map((sc) => `<button class="geomap-sister-pill" data-action="inspect-city" data-val="${sc.name}">${sc.name}</button>`).join("")}
          </div>
        </div>
      `;
    }
    const matchDist = (this.activeState.districts || []).find(
      (d) => d.zips && this.activeEntity.zips && this.activeEntity.zips.some((z) => d.zips.includes(z)) || d.counties && this.activeEntity.county && d.counties.includes(this.activeEntity.county)
    );
    const distType = this.countryMeta?.districtType || (isCan ? "Federal Riding" : "Cong. District");
    const stratHtml = `
      <div class="geomap-strat-tree">
        <div class="geomap-strat-header">
          <span>Market Stratification</span>
          <span style="font-size:9px;color:#38bdf8;">Hierarchy Level 1-6</span>
        </div>
        <div class="geomap-strat-step"><span class="geomap-strat-badge strat-state">${subType}</span><span class="geomap-strat-label">${this.activeState.name} (${this.activeState.abbr})</span></div>
        ${this.activeEntity.metroName ? `<div class="geomap-strat-step"><span class="geomap-strat-badge strat-metro">Metro</span><button class="geomap-link-btn" data-action="inspect-region" data-val="${this.activeEntity.metroName}">${this.activeEntity.metroName}</button></div>` : ""}
        ${this.activeEntity.county ? `<div class="geomap-strat-step"><span class="geomap-strat-badge strat-county">${secType}</span><button class="geomap-link-btn" data-action="inspect-county" data-val="${this.activeEntity.county}">${this.activeEntity.county}</button></div>` : ""}
        ${matchDist ? `<div class="geomap-strat-step"><span class="geomap-strat-badge strat-district">${distType}</span><button class="geomap-link-btn" data-action="inspect-district" data-val="${matchDist.id}">${matchDist.shortName || matchDist.name}</button></div>` : ""}
        <div class="geomap-strat-step"><span class="geomap-strat-badge strat-place">Place</span><span class="geomap-strat-label">${fullCity.fullName || cName}</span></div>
        <div class="geomap-strat-step"><span class="geomap-strat-badge strat-zip">Postal</span><span class="geomap-strat-label">${this.activeEntity.zipCount} ${isCan ? "FSAs" : "ZIPs"} (${displayZips.slice(0, 3).join(", ")}${displayZips.length > 3 ? "..." : ""})</span></div>
      </div>
    `;
    this._showInspector({
      id: fullCity.id || this.activeEntity.id,
      title: fullCity.fullName || cName,
      subtitle: subTitleText,
      type: isNeighborhood ? "Neighborhood" : isCdp ? "CDP" : "City",
      stats: [
        { label: subType, value: `${this.activeState.name} (${this.activeState.abbr})` },
        metroRow,
        parentCityRow,
        { label: `Primary ${secType}`, value: this.activeEntity.county ? `<button class="geomap-link-btn" data-action="inspect-county" data-val="${this.activeEntity.county}">${this.activeEntity.county}</button>` : "N/A" },
        { label: "Type", value: typeLabel },
        areaRow,
        { label: isCan ? "Postal FSAs" : "Zip Codes", value: `${this.activeEntity.zipCount} Mapped` },
        { label: "Coordinates", value: this.activeEntity.lat && this.activeEntity.lon ? `${this.activeEntity.lat.toFixed(4)}, ${this.activeEntity.lon.toFixed(4)}` : `${cx.toFixed(1)}, ${cy.toFixed(1)}` }
      ].filter(Boolean),
      extraHtml: zipPillsHtml + stratHtml + sisterHtml
    });
    if (typeof this.options.onCityClick === "function") {
      this.options.onCityClick(this.activeEntity);
    }
  }
  async zoomToRegion(regionIdOrName) {
    let query = String(regionIdOrName || "").trim();
    if (!query) return;
    let targetRegion = null;
    let targetStateAbbr = this.activeCountryId === "canada" ? "ON" : "CA";
    if (this.activeState && this.activeState.regions) {
      targetRegion = this.activeState.regions.find(
        (r) => r.id === query || r.name.toLowerCase() === query.toLowerCase() || r.fullName && r.fullName.toLowerCase() === query.toLowerCase() || r.name.toLowerCase().includes(query.toLowerCase()) || r.fullName && r.fullName.toLowerCase().includes(query.toLowerCase())
      );
      if (targetRegion) targetStateAbbr = this.activeState.abbr;
    }
    if (!targetRegion) {
      const qLower = query.toLowerCase();
      const match = this.searchIndex.find((s) => s.type === "region" && (s.id === query || s.name.toLowerCase().includes(qLower) || s.fullName && s.fullName.toLowerCase().includes(qLower) || s.keywords && s.keywords.toLowerCase().includes(qLower)));
      if (match) {
        targetStateAbbr = match.state || match.province || (this.activeCountryId === "canada" ? "ON" : "CA");
        await this.zoomToState(targetStateAbbr, { skipAnimation: true, skipInspector: true });
        if (this.activeState && this.activeState.regions) {
          targetRegion = this.activeState.regions.find(
            (r) => r.id === match.id || r.name.toLowerCase() === match.name.toLowerCase() || r.name.toLowerCase().includes(qLower) || r.fullName && r.fullName.toLowerCase().includes(qLower)
          );
        }
      }
    }
    if (!targetRegion) return;
    this._cleanupCityMode();
    this.currentLevel = "region";
    const regZips = targetRegion.zips || (targetRegion.cities ? [].concat(...targetRegion.cities.map((c) => c.zips || [])) : []);
    this.activeEntity = {
      type: "region",
      ...targetRegion,
      zips: regZips,
      state: targetRegion.state || targetRegion.province || this.activeState.abbr
    };
    const isCan = this.activeCountryId === "canada";
    const subType = this.countryMeta?.subdivisionType || (isCan ? "Province" : "State");
    const postLabel = isCan ? "FSAs" : "ZIPs";
    const secLabel = isCan ? "Census Divisions" : "Counties";
    const constituentDivisions = targetRegion.counties || targetRegion.censusDivisions || [];
    this.container.classList.add("city-mode");
    const zipLayer = this.svg.querySelector("#layer-zipcodes");
    if (zipLayer) zipLayer.style.display = "block";
    const regZipSet = new Set(regZips);
    this.svg.querySelectorAll(".zipcode-path").forEach((el) => {
      el.classList.toggle("in-active-city", regZipSet.has(el.dataset.zip));
    });
    let stitchedLayer = this.svg.querySelector("#layer-city-stitched");
    if (!stitchedLayer) {
      stitchedLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
      stitchedLayer.id = "layer-city-stitched";
      stitchedLayer.className.baseVal = "layer-city-stitched";
      const regionsLayer = this.svg.querySelector("#layer-regions");
      if (regionsLayer && regionsLayer.parentNode) {
        regionsLayer.parentNode.insertBefore(stitchedLayer, regionsLayer);
      } else {
        this.svg.appendChild(stitchedLayer);
      }
    }
    const regionPath = targetRegion.stitchedPath || targetRegion.path;
    if (regionPath) {
      stitchedLayer.innerHTML = `
        <path class="city-stitched-boundary" d="${regionPath}" vector-effect="non-scaling-stroke">
          <title>${targetRegion.fullName || targetRegion.name} (${regZips.length} ${postLabel} \u2022 Regional Boundary)</title>
        </path>
      `;
    }
    this._highlightElement(`#region-${targetRegion.id}`, "region-path");
    const b = targetRegion.bounds;
    const pad = Math.max(b[2], b[3]) * 0.12;
    const targetW = Math.max(b[2] + pad * 2, 8);
    const targetH = Math.max(targetW / 1.6, b[3] + pad * 2);
    const finalW = targetH * 1.6;
    const cx = targetRegion.center ? targetRegion.center[0] : b[0] + b[2] / 2;
    const cy = targetRegion.center ? targetRegion.center[1] : b[1] + b[3] / 2;
    await this._animateViewBox({
      x: cx - finalW / 2,
      y: cy - targetH / 2,
      w: finalW,
      h: targetH
    });
    this._updateBreadcrumbs();
    const isMacro = targetRegion.tier === 1;
    const regionTypeLabel = isMacro ? "Macro-Region" : "Metro Sub-Region";
    const stratHtml = `
      <div class="geomap-strat-tree" style="margin-top:10px;">
        <div class="geomap-strat-header">
          <span>Regional Stratification</span>
          <span style="font-size:9px;color:#38bdf8;">${isMacro ? "Tier 1 Macro" : "Tier 2 Metro"}</span>
        </div>
        <div class="geomap-strat-step"><span class="geomap-strat-badge strat-state">${subType}</span><span class="geomap-strat-label">${this.activeState.name} (${this.activeState.abbr})</span></div>
        ${targetRegion.parentRegion ? `<div class="geomap-strat-step"><span class="geomap-strat-badge strat-metro">Parent</span><button class="geomap-link-btn" data-action="inspect-region" data-val="${targetRegion.parentRegion}">${targetRegion.parentRegion}</button></div>` : ""}
        <div class="geomap-strat-step"><span class="geomap-strat-badge strat-place">${isMacro ? "Macro" : "Metro"}</span><span class="geomap-strat-label">${targetRegion.name}</span></div>
        <div class="geomap-strat-step"><span class="geomap-strat-badge strat-zip">${postLabel}</span><span class="geomap-strat-label">${regZips.length} Aggregated Postal Codes</span></div>
      </div>
    `;
    const countiesHtml = constituentDivisions && constituentDivisions.length > 0 ? `
      <div class="geomap-stat-row" style="flex-direction:column;align-items:flex-start;gap:6px;margin-top:10px;">
        <span class="geomap-stat-label">Constituent ${secLabel} (${constituentDivisions.length}):</span>
        <div class="geomap-sister-container">
          ${constituentDivisions.map((c) => `<button class="geomap-sister-pill" data-action="inspect-county" data-val="${c}">${c}</button>`).join("")}
        </div>
      </div>
    ` : "";
    const googleLinkHtml = targetRegion.googleUrl ? `
      <div style="margin-top:10px;">
        <a href="${targetRegion.googleUrl}" target="_blank" rel="noopener" class="geomap-btn geomap-btn-secondary" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;padding:5px 10px;font-size:11px;font-weight:600;border-radius:6px;background:rgba(234,67,53,0.1);color:#ea4335;border:1px solid rgba(234,67,53,0.3);">
          \u{1F4CD} Official Boundary on Google Maps \u2197
        </a>
      </div>
    ` : "";
    const citiesListHtml = targetRegion.cities && targetRegion.cities.length > 0 ? `
      <div class="geomap-hierarchy-header" style="margin-top:12px;">Included Cities & Places (${targetRegion.cities.length})</div>
      <div class="geomap-hierarchy-list" style="max-height:160px;overflow-y:auto;">
        ${targetRegion.cities.slice(0, 30).map((c) => `
          <div class="geomap-hierarchy-item" data-action="zoom-city-item" data-val="${c.name}">
            <span>${c.name}</span>
            <div>
              <span class="geomap-demand-badge low">${c.zipCount || 1} ${postLabel}</span>
            </div>
          </div>
        `).join("")}
        ${targetRegion.cities.length > 30 ? `<div style="font-size:10px;color:#94a3b8;padding:4px 8px;text-align:center;">+ ${targetRegion.cities.length - 30} more cities in region</div>` : ""}
      </div>
    ` : "";
    this._showInspector({
      id: targetRegion.id,
      title: targetRegion.fullName || targetRegion.name,
      subtitle: `${regionTypeLabel} \u2022 ${this.activeState.name}`,
      type: regionTypeLabel,
      stats: [
        { label: subType, value: `${this.activeState.name} (${this.activeState.abbr})` },
        { label: "Classification", value: `${regionTypeLabel} (${isMacro ? "Macro Area" : "Metro Area"})` },
        { label: `Constituent ${secLabel}`, value: `${constituentDivisions.length} ${secLabel}` },
        { label: "Included Cities / Places", value: `${targetRegion.citiesCount || (targetRegion.cities ? targetRegion.cities.length : 0)} Cities` },
        { label: `Aggregated ${postLabel}`, value: `${regZips.length} ${postLabel}` },
        { label: "Description", value: targetRegion.description || "Geographic marketing region." }
      ],
      extraHtml: stratHtml + countiesHtml + googleLinkHtml + citiesListHtml
    });
    if (typeof this.options.onRegionClick === "function") {
      this.options.onRegionClick(targetRegion);
    }
  }
  _renderBeacon(cx, cy, type, labelText, targetW) {
    const hlContainer = this.svg.querySelector("#layer-highlights");
    if (!hlContainer) return;
    hlContainer.innerHTML = "";
  }
  _cleanupCityMode() {
    if (this.container) {
      this.container.classList.remove("city-mode");
    }
    if (this.svg) {
      this.svg.querySelectorAll(".zipcode-path.in-active-city").forEach((el) => {
        el.classList.remove("in-active-city");
      });
      const stitchedLayer = this.svg.querySelector("#layer-city-stitched");
      if (stitchedLayer) {
        stitchedLayer.innerHTML = "";
      }
    }
  }
  resetView() {
    this._cleanupCityMode();
    this._renderNationalView();
  }
  /* -------------------------------------------------------------
   * Layer Switching
   * ------------------------------------------------------------- */
  setLayer(layerName) {
    this.activeLayer = layerName;
    const layers = ["counties", "cities", "regions", "districts", "zipcodes"];
    for (const l of layers) {
      const el = this.svg.querySelector(`#layer-${l}`);
      if (el) {
        el.style.display = layerName === "all" || layerName === l ? "block" : "none";
      }
    }
    const pills = this.layerPillsEl.querySelectorAll(".geomap-pill");
    pills.forEach((p) => {
      p.classList.toggle("active", p.dataset.layer === layerName);
    });
    if (typeof this.options.onLayerChange === "function") {
      this.options.onLayerChange(layerName);
    }
  }
  /* -------------------------------------------------------------
   * Animated ViewBox Interpolation (60fps Ease-Out)
   * ------------------------------------------------------------- */
  _animateViewBox(target) {
    if (this.animatingViewBox) {
      cancelAnimationFrame(this.animatingViewBox);
    }
    return new Promise((resolve) => {
      const start = { ...this.currentViewBox };
      const startTime = performance.now();
      const duration = this.options.animationDuration;
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = easeOutCubic(progress);
        this.currentViewBox = {
          x: start.x + (target.x - start.x) * ease,
          y: start.y + (target.y - start.y) * ease,
          w: start.w + (target.w - start.w) * ease,
          h: start.h + (target.h - start.h) * ease
        };
        this.svg.setAttribute("viewBox", `${this.currentViewBox.x} ${this.currentViewBox.y} ${this.currentViewBox.w} ${this.currentViewBox.h}`);
        if (progress < 1) {
          this.animatingViewBox = requestAnimationFrame(step);
        } else {
          this.animatingViewBox = null;
          if (typeof this.options.onZoom === "function") {
            this.options.onZoom(this.currentLevel, this.activeEntity);
          }
          resolve(this.currentViewBox);
        }
      };
      this.animatingViewBox = requestAnimationFrame(step);
    });
  }
  /* -------------------------------------------------------------
   * Breadcrumbs Management
   * ------------------------------------------------------------- */
  _updateBreadcrumbs() {
    if (!this.options.enableBreadcrumbs) return;
    const flag = this.countryMeta?.flag || (this.activeCountryId === "canada" ? "\u{1F1E8}\u{1F1E6}" : "\u{1F1FA}\u{1F1F8}");
    const cName = this.countryMeta?.abbr || this.countryMeta?.name || "USA";
    let html = `<span class="geomap-crumb ${this.currentLevel === "country" ? "active" : ""}" data-crumb="country">${flag} ${cName}</span>`;
    if (this.activeState) {
      html += `<span class="geomap-crumb-sep">\u203A</span>
               <span class="geomap-crumb ${this.currentLevel === "state" ? "active" : ""}" data-crumb="state">${this.activeState.name}</span>`;
    }
    if (this.activeEntity && this.activeEntity.type !== "state") {
      const e = this.activeEntity;
      let label = e.name || e.id;
      if (e.type === "zip") {
        const pfx = this.activeCountryId === "canada" ? "FSA" : "ZIP";
        label = `${pfx} ${e.zip}`;
      } else if (e.type === "region") {
        label = e.tier === 1 || e.name.toLowerCase().includes("area") || e.name.toLowerCase().includes("valley") || e.name.toLowerCase().includes("metro") || e.name.toLowerCase().includes("region") || e.name.toLowerCase().includes("california") ? e.name : `${e.name} Region`;
      } else if (e.type === "city" || e.type === "subregion" || e.type === "neighborhood" || e.type === "borough" || e.type === "cdp") {
        label = `${e.cityName || e.name}`;
      } else if (e.type === "county") {
        label = e.name.toLowerCase().includes("county") || e.name.toLowerCase().includes("division") || e.name.toLowerCase().includes("region") ? e.name : `${e.name} County`;
      } else if (e.type === "district") {
        label = e.shortName || e.name;
      }
      if (e.metroName && e.type !== "region") {
        html += `<span class="geomap-crumb-sep">\u203A</span>
                 <span class="geomap-crumb" data-crumb="region" data-val="${e.metroName}">${e.metroName}</span>`;
      }
      if (e.type === "zip" && e.city) {
        html += `<span class="geomap-crumb-sep">\u203A</span>
                 <span class="geomap-crumb" data-crumb="city" data-val="${e.city}">${e.city}</span>`;
      }
      html += `<span class="geomap-crumb-sep">\u203A</span>
               <span class="geomap-crumb active">${label}</span>`;
    }
    this.breadcrumbsEl.innerHTML = html;
  }
  /* -------------------------------------------------------------
   * Inspector Drawer
   * ------------------------------------------------------------- */
  _showInspector(data) {
    if (!this.options.enableInspector || !this.inspector) return;
    let statsHtml = "";
    if (data.stats) {
      statsHtml = data.stats.map((s) => `
        <div class="geomap-stat-row">
          <span class="geomap-stat-label">${s.label}</span>
          <span class="geomap-stat-val">${s.value}</span>
        </div>
      `).join("");
    }
    if (data.extraHtml) {
      statsHtml += data.extraHtml;
    }
    const entityId = data.id || this.activeEntity?.id || this.activeEntity?.name;
    const inAudience = entityId ? this.targetAudience.has(entityId) || this.activeEntity?.id && this.targetAudience.has(this.activeEntity.id) || this.activeEntity?.name && this.targetAudience.has(this.activeEntity.name) : false;
    const canAddToAudience = this.activeEntity && (this.activeEntity.zips && this.activeEntity.zips.length > 0 || this.activeEntity.zip);
    this.inspector.innerHTML = `
      <div class="geomap-inspector-header">
        <div>
          <div class="geomap-inspector-title">${data.title}</div>
          <div style="font-size:11px;color:var(--geomap-text-muted);">${data.subtitle || ""}</div>
        </div>
        <button class="geomap-inspector-close">\u2715</button>
      </div>
      <div class="geomap-inspector-body">
        <span class="geomap-item-type type-${data.type.toLowerCase().replace(/\s+/g, "")}">${data.type}</span>
        <div class="geomap-stats-list">${statsHtml}</div>
        <div class="geomap-inspector-actions">
          ${canAddToAudience ? `<button class="geomap-btn ${inAudience ? "geomap-btn-active" : "geomap-btn-primary"}" data-action="toggle-audience">\u{1F3AF} ${inAudience ? "\u2713 In Audience (Remove)" : "\uFF0B Add to Ad Audience"}</button>` : ""}
          <button class="geomap-btn" data-action="reset-zoom">Reset View</button>
          <button class="geomap-btn" data-action="copy-id">Copy Info</button>
        </div>
      </div>
    `;
    this.inspector.classList.remove("hidden");
    this.inspector.querySelector(".geomap-inspector-close").onclick = () => this._hideInspector();
    this.inspector.querySelector('[data-action="reset-zoom"]').onclick = () => this.resetView();
    this.inspector.querySelector('[data-action="copy-id"]').onclick = () => {
      const text = `${data.title} (${data.subtitle || ""})`;
      navigator.clipboard?.writeText(text);
      alert(`Copied "${text}" to clipboard!`);
    };
    this.inspector.onclick = (e) => {
      const audToggle = e.target.closest('[data-action="toggle-audience"]');
      if (audToggle && this.activeEntity) {
        this.toggleAudience(this.activeEntity);
        const eid = this.activeEntity.id || this.activeEntity.name || data.id;
        const nowIn = this.targetAudience.has(eid) || this.activeEntity.name && this.targetAudience.has(this.activeEntity.name) || this.activeEntity.id && this.targetAudience.has(this.activeEntity.id) || data.id && this.targetAudience.has(data.id);
        audToggle.className = `geomap-btn ${nowIn ? "geomap-btn-active" : "geomap-btn-primary"}`;
        audToggle.innerHTML = `\u{1F3AF} ${nowIn ? "\u2713 In Audience (Remove)" : "\uFF0B Add to Ad Audience"}`;
        return;
      }
      const copyZipsBtn = e.target.closest('[data-action="copy-zips"]');
      if (copyZipsBtn && copyZipsBtn.dataset.zips) {
        const text = copyZipsBtn.dataset.zips;
        navigator.clipboard?.writeText(text);
        const originalText = copyZipsBtn.innerHTML;
        copyZipsBtn.innerHTML = "\u2713 Copied!";
        copyZipsBtn.style.background = "#16a34a";
        setTimeout(() => {
          copyZipsBtn.innerHTML = originalText;
          copyZipsBtn.style.background = "#ea4335";
        }, 2e3);
        return;
      }
      const hierarchyItem = e.target.closest(".geomap-hierarchy-item");
      if (hierarchyItem) {
        this.zoomToCity(hierarchyItem.dataset.val);
        return;
      }
      const linkBtn = e.target.closest(".geomap-link-btn, .geomap-sister-pill");
      if (linkBtn) {
        const act = linkBtn.dataset.action;
        const val = linkBtn.dataset.val;
        if (act === "inspect-city") this.zoomToCity(val);
        else if (act === "inspect-county") this.zoomToCounty(val);
        else if (act === "inspect-district") this.zoomToDistrict(val);
        else if (act === "inspect-region") this.zoomToRegion(val);
        return;
      }
      const zipPill = e.target.closest(".geomap-zip-pill");
      if (zipPill) {
        this.zoomToZip(zipPill.dataset.zip);
        return;
      }
    };
  }
  _hideInspector() {
    if (this.inspector) {
      this.inspector.classList.add("hidden");
    }
  }
  _highlightElement(selector, className) {
    this.svg.querySelectorAll(".selected").forEach((el) => el.classList.remove("selected"));
    const target = this.svg.querySelector(selector);
    if (target) {
      target.classList.add("selected");
      if (className) target.classList.add(className);
      if (target.parentNode) {
        target.parentNode.appendChild(target);
      }
    }
  }
  /* -------------------------------------------------------------
   * Event Handlers
   * ------------------------------------------------------------- */
  _attachEvents() {
    this.svg.addEventListener("click", (e) => {
      const stateEl = e.target.closest(".state-path");
      if (stateEl) {
        this.zoomToState(stateEl.dataset.abbr);
        return;
      }
      const regEl = e.target.closest(".region-path");
      if (regEl) {
        this.zoomToRegion(regEl.dataset.id || regEl.dataset.name);
        return;
      }
      const countyEl = e.target.closest(".county-path");
      if (countyEl) {
        this.zoomToCounty(countyEl.dataset.id);
        return;
      }
      const districtEl = e.target.closest(".district-path");
      if (districtEl) {
        this.zoomToDistrict(districtEl.dataset.id);
        return;
      }
      const zipEl = e.target.closest(".zipcode-path");
      if (zipEl) {
        this.zoomToZip(zipEl.dataset.zip);
        return;
      }
      const cityPathEl = e.target.closest(".city-boundary-path");
      if (cityPathEl) {
        this.zoomToCity(cityPathEl.dataset.id || cityPathEl.dataset.name);
        return;
      }
    });
    this.svg.addEventListener("mousemove", (e) => {
      const stateEl = e.target.closest(".state-path");
      const regEl = e.target.closest(".region-path");
      const countyEl = e.target.closest(".county-path");
      const districtEl = e.target.closest(".district-path");
      const zipEl = e.target.closest(".zipcode-path");
      const cityPathEl = e.target.closest(".city-boundary-path");
      let title = "", sub = "", badge = "";
      if (cityPathEl) {
        title = cityPathEl.dataset.name;
        sub = `City Limits \u2022 ${this.activeState?.name || ""}`;
        badge = "City Limits";
        badge = "City";
      } else if (zipEl) {
        const isCan = this.activeCountryId === "canada";
        title = `${isCan ? "FSA" : "ZIP"} ${zipEl.dataset.zip}`;
        sub = `${zipEl.dataset.city || ""} ${zipEl.dataset.district ? "\u2022 " + zipEl.dataset.district : ""}`;
        badge = isCan ? "Postal FSA" : "Zip Code";
      } else if (regEl) {
        title = regEl.dataset.name;
        sub = `Metro Region \u2022 ${regEl.dataset.cities || 0} Cities \u2022 ${regEl.dataset.zips || 0} ZIPs`;
        badge = "Metro Region";
      } else if (districtEl) {
        title = districtEl.dataset.name;
        sub = this.activeCountryId === "canada" ? "Federal Electoral District" : "118th Congressional District";
        badge = "District";
      } else if (countyEl) {
        const isCan = this.activeCountryId === "canada";
        title = countyEl.dataset.name.toLowerCase().includes("county") || countyEl.dataset.name.toLowerCase().includes("division") ? countyEl.dataset.name : `${countyEl.dataset.name} County`;
        sub = isCan ? `Code: ${countyEl.dataset.id}` : `FIPS: ${countyEl.dataset.id}`;
        badge = isCan ? "Census Div." : "County";
      } else if (stateEl) {
        title = stateEl.dataset.name;
        sub = `Capital: ${stateEl.dataset.capital} \u2022 Pop: ${Number(stateEl.dataset.pop).toLocaleString()}`;
        badge = this.countryMeta?.subdivisionType || "State";
      }
      if (title) {
        const rect = this.viewport.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.tooltip.innerHTML = `
          <div class="geomap-tooltip-title">${title}</div>
          <div class="geomap-tooltip-sub">${sub}</div>
          <span class="geomap-tooltip-badge">${badge}</span>
        `;
        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
        this.tooltip.classList.add("visible");
      } else {
        this.tooltip.classList.remove("visible");
      }
    });
    this.svg.addEventListener("mouseleave", () => {
      this.tooltip.classList.remove("visible");
    });
    this.breadcrumbsEl.addEventListener("click", (e) => {
      const crumb = e.target.closest(".geomap-crumb");
      if (!crumb) return;
      if (crumb.dataset.crumb === "country") {
        this.resetView();
      } else if (crumb.dataset.crumb === "state" && this.activeState) {
        this.zoomToState(this.activeState.abbr);
      } else if (crumb.dataset.crumb === "region" && crumb.dataset.val) {
        this.zoomToRegion(crumb.dataset.val);
      } else if (crumb.dataset.crumb === "city" && crumb.dataset.val) {
        this.zoomToCity(crumb.dataset.val);
      }
    });
    this.layerPillsEl.addEventListener("click", (e) => {
      const pill = e.target.closest(".geomap-pill");
      if (!pill) return;
      this.setLayer(pill.dataset.layer);
    });
    if (this.controlsEl) {
      this.controlsEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".geomap-control-btn");
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === "zoom-in") {
          this._zoomByFactor(0.75);
        } else if (action === "zoom-out") {
          this._zoomByFactor(1.33);
        } else if (action === "reset") {
          this.resetView();
        } else if (action === "theme") {
          this._toggleTheme();
        } else if (action === "export-svg") {
          this.exportSVG();
        }
      });
    }
    if (this.options.enablePanZoom) {
      this.viewport.addEventListener("mousedown", (e) => {
        if (e.target.closest(".geomap-floating-controls") || e.target.closest(".geomap-inspector") || e.target.closest(".geomap-search-results")) return;
        this.isDragging = true;
        this.dragStart = { x: e.clientX, y: e.clientY };
        this.viewBoxStart = { ...this.currentViewBox };
        this.viewport.classList.add("panning");
      });
      window.addEventListener("mousemove", (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        const scaleX = this.viewBoxStart.w / this.viewport.clientWidth;
        const scaleY = this.viewBoxStart.h / this.viewport.clientHeight;
        this.currentViewBox.x = this.viewBoxStart.x - dx * scaleX;
        this.currentViewBox.y = this.viewBoxStart.y - dy * scaleY;
        this.svg.setAttribute("viewBox", `${this.currentViewBox.x} ${this.currentViewBox.y} ${this.currentViewBox.w} ${this.currentViewBox.h}`);
      });
      window.addEventListener("mouseup", () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.viewport.classList.remove("panning");
        }
      });
      this.viewport.addEventListener("wheel", (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 0.9 : 1.1;
        this._zoomAtPoint(e.clientX, e.clientY, factor);
      }, { passive: false });
      let touchStartDist = 0;
      let touchStartCenter = { x: 0, y: 0 };
      this.viewport.addEventListener("touchstart", (e) => {
        if (e.target.closest(".geomap-floating-controls") || e.target.closest(".geomap-inspector") || e.target.closest(".geomap-search-results")) return;
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          this.viewBoxStart = { ...this.currentViewBox };
        } else if (e.touches.length === 2) {
          this.isDragging = false;
          const t1 = e.touches[0];
          const t2 = e.touches[1];
          touchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
          touchStartCenter = {
            x: (t1.clientX + t2.clientX) / 2,
            y: (t1.clientY + t2.clientY) / 2
          };
        }
      }, { passive: false });
      window.addEventListener("touchmove", (e) => {
        if (this.isDragging && e.touches.length === 1) {
          e.preventDefault();
          const dx = e.touches[0].clientX - this.dragStart.x;
          const dy = e.touches[0].clientY - this.dragStart.y;
          const scaleX = this.viewBoxStart.w / this.viewport.clientWidth;
          const scaleY = this.viewBoxStart.h / this.viewport.clientHeight;
          this.currentViewBox.x = this.viewBoxStart.x - dx * scaleX;
          this.currentViewBox.y = this.viewBoxStart.y - dy * scaleY;
          this.svg.setAttribute("viewBox", `${this.currentViewBox.x} ${this.currentViewBox.y} ${this.currentViewBox.w} ${this.currentViewBox.h}`);
        } else if (e.touches.length === 2 && touchStartDist > 0) {
          e.preventDefault();
          const t1 = e.touches[0];
          const t2 = e.touches[1];
          const newDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
          const factor = touchStartDist / Math.max(10, newDist);
          this._zoomAtPoint(touchStartCenter.x, touchStartCenter.y, factor);
        }
      }, { passive: false });
      window.addEventListener("touchend", () => {
        this.isDragging = false;
        touchStartDist = 0;
      });
    }
    if (this.options.enableSearch && this.searchInput) {
      this.searchInput.addEventListener("input", () => this._handleSearchInput());
      this.searchClear.addEventListener("click", () => {
        this.searchInput.value = "";
        this.searchResults.style.display = "none";
        this.searchClear.style.display = "none";
      });
      this.searchResults.addEventListener("click", (e) => {
        const item = e.target.closest(".geomap-search-item");
        if (!item) return;
        this._handleSearchResultClick(item);
      });
      document.addEventListener("click", (e) => {
        if (!this.searchWrapper.contains(e.target)) {
          this.searchResults.style.display = "none";
        }
      });
    }
    if (this.audienceBtn) {
      this.audienceBtn.addEventListener("click", () => this._openAudienceModal());
    }
    if (this.audienceModal) {
      this.audienceModal.addEventListener("click", (e) => {
        if (e.target === this.audienceModal || e.target.closest(".geomap-modal-close")) {
          this._closeAudienceModal();
        }
      });
    }
  }
  _zoomByFactor(factor) {
    const cx = this.currentViewBox.x + this.currentViewBox.w / 2;
    const cy = this.currentViewBox.y + this.currentViewBox.h / 2;
    const newW = this.currentViewBox.w * factor;
    const newH = this.currentViewBox.h * factor;
    this._animateViewBox({
      x: cx - newW / 2,
      y: cy - newH / 2,
      w: newW,
      h: newH
    });
  }
  _zoomAtPoint(clientX, clientY, factor) {
    const rect = this.viewport.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    const svgX = this.currentViewBox.x + mouseX / rect.width * this.currentViewBox.w;
    const svgY = this.currentViewBox.y + mouseY / rect.height * this.currentViewBox.h;
    const newW = this.currentViewBox.w * factor;
    const newH = this.currentViewBox.h * factor;
    this.currentViewBox.x = svgX - mouseX / rect.width * newW;
    this.currentViewBox.y = svgY - mouseY / rect.height * newH;
    this.currentViewBox.w = newW;
    this.currentViewBox.h = newH;
    this.svg.setAttribute("viewBox", `${this.currentViewBox.x} ${this.currentViewBox.y} ${this.currentViewBox.w} ${this.currentViewBox.h}`);
  }
  _toggleTheme() {
    const themes = ["light", "dark", "emerald"];
    const currentIdx = themes.indexOf(this.options.theme);
    const nextTheme = themes[(currentIdx + 1) % themes.length];
    this.setTheme(nextTheme);
  }
  setTheme(themeName) {
    this.options.theme = themeName;
    this.container.className = `geomap-container theme-${themeName}`;
  }
  /* -------------------------------------------------------------
   * Live Search Engine
   * ------------------------------------------------------------- */
  _handleSearchInput() {
    const q = this.searchInput.value.trim().toLowerCase();
    this.searchClear.style.display = q ? "block" : "none";
    if (!q || q.length < 2) {
      this.searchResults.style.display = "none";
      return;
    }
    const unaccent = (str) => (str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const qNorm = unaccent(q);
    const tokens = q.split(/[,\s]+/).filter((t) => t.length > 0);
    const normTokens = tokens.map((t) => unaccent(t));
    const stateToken = tokens.find((t) => t.length === 2 && /^[a-z]{2}$/.test(t))?.toUpperCase();
    const mainTokens = tokens.filter((t) => t.toUpperCase() !== stateToken);
    const mainQ = unaccent(mainTokens.join(" "));
    const scoredMatches = [];
    for (const item of this.searchIndex) {
      const itemState = (item.state || item.abbr || "").toUpperCase();
      if (stateToken && itemState && itemState !== stateToken) {
        continue;
      }
      const nameLower = (item.name || "").toLowerCase();
      const nameNorm = unaccent(item.name || "");
      const cityNorm = unaccent(item.cityName || "");
      const countyNorm = unaccent(item.county || "");
      const metroNorm = unaccent(item.metroName || "");
      const zipNorm = unaccent(item.zip || "");
      const searchStr = `${nameNorm} ${cityNorm} ${countyNorm} ${metroNorm} ${itemState.toLowerCase()} ${zipNorm}`;
      let matchesAll = true;
      for (const t of normTokens) {
        if (!searchStr.includes(t)) {
          matchesAll = false;
          break;
        }
      }
      if (!matchesAll) continue;
      let score = 0;
      if (nameNorm === qNorm) score += 100;
      else if (nameNorm.startsWith(qNorm)) score += 50;
      else if (nameNorm.includes(qNorm)) score += 25;
      if (mainQ) {
        if (nameNorm === mainQ) score += 80;
        else if (nameNorm.startsWith(mainQ)) score += 40;
        else if (nameNorm.includes(mainQ)) score += 20;
      }
      if (item.type === "city" || item.type === "neighborhood" || item.type === "borough" || item.type === "cdp" || item.type === "subregion") score += 12;
      else if (item.type === "county") score += 11;
      else if (item.type === "district") score += 10.5;
      else if (item.type === "region") score += 10;
      else if (item.type === "state") score += 9;
      else if (item.type === "zip") score += 6;
      scoredMatches.push({ item, score });
    }
    scoredMatches.sort((a, b) => b.score - a.score);
    const matches = scoredMatches.slice(0, 20).map((s) => s.item);
    if (matches.length === 0) {
      this.searchResults.innerHTML = '<div style="padding:10px;font-size:12px;color:var(--geomap-text-muted);">No matching places found</div>';
      this.searchResults.style.display = "block";
      return;
    }
    this.searchResults.innerHTML = matches.map((m) => {
      let displayName = m.name;
      let context = m.state || m.abbr || "";
      const isPR = m.state === "PR" || m.abbr === "PR";
      if (m.type === "county" && !displayName.toLowerCase().includes("county") && !displayName.toLowerCase().includes("municipio") && !displayName.toLowerCase().includes("division")) {
        displayName = isPR ? `${displayName} Municipio` : `${displayName} County`;
      }
      if ((m.type === "city" || m.type === "neighborhood" || m.type === "borough" || m.type === "cdp" || m.type === "subregion") && m.county) {
        context = isPR ? `${m.county} Municipio, ${context}` : `${m.county} Co., ${context}`;
      }
      return `
        <div class="geomap-search-item" data-type="${m.type}" data-id="${m.id}" data-state="${m.state || m.abbr || ""}">
          <div style="display:flex;flex-direction:column;gap:2px;">
            <span style="font-weight:600;font-size:13px;">${displayName}</span>
            <span style="font-size:10px;color:var(--geomap-text-muted);">${context}</span>
          </div>
          <span class="geomap-item-type type-${m.type}">${m.type}</span>
        </div>
      `;
    }).join("");
    this.searchResults.style.display = "block";
  }
  async _handleSearchResultClick(item) {
    const type = item.dataset.type;
    const id = item.dataset.id;
    const state = item.dataset.state;
    this.searchResults.style.display = "none";
    this.searchInput.value = "";
    if (type === "state") {
      await this.zoomToState(id);
    } else if (type === "region") {
      await this.zoomToRegion(id);
    } else if (type === "county") {
      await this.zoomToCounty(id);
    } else if (type === "district") {
      await this.zoomToDistrict(id);
    } else if (type === "zip") {
      await this.zoomToZip(id);
    } else if (type === "city" || type === "subregion" || type === "neighborhood" || type === "borough" || type === "cdp") {
      const match = this.searchIndex.find((s) => (s.type === "city" || s.type === "subregion" || s.type === "neighborhood" || s.type === "borough" || s.type === "cdp") && s.id === id);
      if (match) await this.zoomToCity(match.id || match.cityName || match.name);
    }
  }
  /* -------------------------------------------------------------
   * Ad Targeting & Audience Basket Manager
   * ------------------------------------------------------------- */
  toggleAudience(entity) {
    if (!entity) return;
    const eid = entity.id || entity.name;
    const isPresent = this.targetAudience.has(eid) || entity.name && this.targetAudience.has(entity.name) || entity.id && this.targetAudience.has(entity.id);
    if (isPresent) {
      this.targetAudience.delete(eid);
      if (entity.name) this.targetAudience.delete(entity.name);
      if (entity.id) this.targetAudience.delete(entity.id);
    } else {
      this.targetAudience.set(eid, {
        id: eid,
        name: entity.fullName || entity.name,
        cityName: entity.cityName || entity.name,
        type: entity.type || "city",
        state: entity.state || this.activeState?.abbr || "",
        county: entity.county || "",
        district: entity.district || "",
        metroName: entity.metroName || "",
        landAreaSqMi: entity.landAreaSqMi,
        landAreaSqKm: entity.landAreaSqKm,
        zips: entity.zips ? [...entity.zips] : entity.zip ? [entity.zip] : []
      });
    }
    this._updateAudienceUI();
  }
  addToAudience(entity) {
    if (!entity) return;
    const eid = entity.id || entity.name;
    if (!this.targetAudience.has(eid)) {
      this.toggleAudience(entity);
    }
  }
  removeFromAudience(entityId) {
    if (this.targetAudience.has(entityId)) {
      this.targetAudience.delete(entityId);
      this._updateAudienceUI();
      if (this.audienceModal && this.audienceModal.classList.contains("visible")) {
        this._renderAudienceModalContent();
      }
    }
  }
  clearAudience() {
    this.targetAudience.clear();
    this._updateAudienceUI();
    if (this.audienceModal && this.audienceModal.classList.contains("visible")) {
      this._renderAudienceModalContent();
    }
  }
  _updateAudienceUI() {
    const isCan = this.activeCountryId === "canada";
    const postLabel = isCan ? "FSAs" : "ZIPs";
    const allZips = /* @__PURE__ */ new Set();
    for (const r of this.targetAudience.values()) {
      (r.zips || []).forEach((z) => allZips.add(z));
    }
    if (this.audienceBtn) {
      this.audienceBtn.innerHTML = `\u{1F3AF} Target Audience <span class="geomap-audience-badge">${this.targetAudience.size}</span> <span style="font-size:10px;color:#94a3b8;margin-left:4px;">(${allZips.size} ${postLabel})</span>`;
    }
    if (this.inspector && this.activeEntity) {
      const eid = this.activeEntity.id || this.activeEntity.name;
      const inAudience = this.targetAudience.has(eid) || this.activeEntity.name && this.targetAudience.has(this.activeEntity.name) || this.activeEntity.id && this.targetAudience.has(this.activeEntity.id);
      const audBtn = this.inspector.querySelector('[data-action="toggle-audience"]');
      if (audBtn) {
        audBtn.className = `geomap-btn ${inAudience ? "geomap-btn-active" : "geomap-btn-primary"}`;
        audBtn.innerHTML = `\u{1F3AF} ${inAudience ? "\u2713 In Audience (Remove)" : "\uFF0B Add to Ad Audience"}`;
      }
    }
    this.svg.querySelectorAll(".zipcode-path").forEach((el) => {
      const zip = el.dataset.zip;
      el.classList.toggle("in-audience-target", allZips.has(zip));
    });
  }
  _openAudienceModal() {
    if (!this.audienceModal) return;
    this._renderAudienceModalContent();
    this.audienceModal.classList.add("visible");
  }
  _closeAudienceModal() {
    if (!this.audienceModal) return;
    this.audienceModal.classList.remove("visible");
  }
  _renderAudienceModalContent() {
    if (!this.audienceModal) return;
    const isCan = this.activeCountryId === "canada";
    const postLabel = isCan ? "Postal FSAs" : "ZIP Codes";
    const postSingular = isCan ? "FSA" : "ZIP";
    const countryCode = isCan ? "CA" : "US";
    const audienceList = Array.from(this.targetAudience.values());
    const allZips = Array.from(new Set(audienceList.flatMap((r) => r.zips || []))).sort();
    let totalAreaSqMi = 0;
    audienceList.forEach((r) => {
      if (r.landAreaSqMi) totalAreaSqMi += r.landAreaSqMi;
      else if (r.landAreaSqKm) totalAreaSqMi += r.landAreaSqKm * 0.386102;
    });
    const thumbtackStr = allZips.join(", ");
    const metaJsonStr = JSON.stringify({
      targeting: {
        geo_locations: {
          countries: [countryCode],
          zips: allZips.map((z) => ({ key: z, country: countryCode }))
        }
      }
    }, null, 2);
    const googleAdsStr = `Location, Location Type, Status
` + allZips.map((z) => `${z}, Postal Code, Active`).join("\n");
    let activeContent = "";
    if (this.activeAudienceTab === "thumbtack") {
      activeContent = `
        <div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">Comma-separated ${postSingular}s for Thumbtack Pro "Travel areas / Lead preferences":</div>
        <div class="geomap-export-code" id="export-code-box">${thumbtackStr || "No locations added to audience yet."}</div>
      `;
    } else if (this.activeAudienceTab === "meta") {
      activeContent = `
        <div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">Meta Marketing API / Ads Manager Geo-Location JSON:</div>
        <div class="geomap-export-code" id="export-code-box">${metaJsonStr}</div>
      `;
    } else if (this.activeAudienceTab === "google") {
      activeContent = `
        <div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">Google Ads Editor CSV Location Import:</div>
        <div class="geomap-export-code" id="export-code-box">${googleAdsStr}</div>
      `;
    } else {
      activeContent = `
        <div style="max-height:160px;overflow-y:auto;border:1px solid #334155;border-radius:8px;">
          <table style="width:100%;font-size:11px;border-collapse:collapse;text-align:left;">
            <thead>
              <tr style="background:#0f172a;color:#94a3b8;border-bottom:1px solid #334155;">
                <th style="padding:6px 10px;">Market</th>
                <th style="padding:6px 10px;">Type</th>
                <th style="padding:6px 10px;">County</th>
                <th style="padding:6px 10px;">State</th>
                <th style="padding:6px 10px;">${postSingular}s</th>
              </tr>
            </thead>
            <tbody>
              ${audienceList.map((r) => `
                <tr style="border-bottom:1px solid rgba(51,65,85,0.5);">
                  <td style="padding:6px 10px;font-weight:600;color:#f8fafc;">${r.name}</td>
                  <td style="padding:6px 10px;color:#94a3b8;text-transform:capitalize;">${r.type}</td>
                  <td style="padding:6px 10px;color:#94a3b8;">${r.county || "-"}</td>
                  <td style="padding:6px 10px;color:#38bdf8;">${r.state}</td>
                  <td style="padding:6px 10px;color:#4ade80;">${r.zips?.length || 1}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }
    this.audienceModal.innerHTML = `
      <div class="geomap-audience-modal">
        <div class="geomap-modal-header">
          <div class="geomap-modal-title">
            <span>\u{1F3AF} Ad Targeting Hub & Audience Builder</span>
          </div>
          <button class="geomap-modal-close">\u2715</button>
        </div>
        <div class="geomap-modal-body">
          <div style="display:flex;justify-content:space-between;align-items:center;background:#0f172a;padding:12px 14px;border-radius:8px;border:1px solid #334155;">
            <div>
              <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;">Total Stratified Audience</div>
              <div style="font-size:18px;font-weight:800;color:#38bdf8;">${allZips.length} ${postLabel} Mapped</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;">Included Markets</div>
              <div style="font-size:18px;font-weight:800;color:#4ade80;">${audienceList.length} Selected</div>
            </div>
          </div>

          <div>
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin-bottom:6px;">Market Footprint:</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;max-height:80px;overflow-y:auto;">
              ${audienceList.length > 0 ? audienceList.map((r) => `
                <div class="audience-region-chip">
                  <span>${r.name} (${r.zips?.length || 1} ${postSingular}s)</span>
                  <span class="audience-region-remove" data-id="${r.id}">\u2715</span>
                </div>
              `).join("") : '<span style="font-size:12px;color:#64748b;font-style:italic;">No markets added yet. Click "\uFF0B Add to Ad Audience" on any city, district, or region.</span>'}
            </div>
          </div>

          <!-- Export Format Tabs -->
          <div class="geomap-export-tabs">
            <button class="geomap-export-tab ${this.activeAudienceTab === "thumbtack" ? "active" : ""}" data-tab="thumbtack">Thumbtack Pro</button>
            <button class="geomap-export-tab ${this.activeAudienceTab === "meta" ? "active" : ""}" data-tab="meta">Meta / Facebook Ads</button>
            <button class="geomap-export-tab ${this.activeAudienceTab === "google" ? "active" : ""}" data-tab="google">Google Ads</button>
            <button class="geomap-export-tab ${this.activeAudienceTab === "table" ? "active" : ""}" data-tab="table">Breakdown Table</button>
          </div>

          <div id="geomap-export-content-container">
            ${activeContent}
          </div>
        </div>
        <div class="geomap-modal-footer">
          <div style="display:flex;gap:8px;">
            <button class="geomap-btn geomap-btn-primary" id="btn-copy-audience-export">\u{1F4CB} Copy to Clipboard</button>
            <button class="geomap-btn" id="btn-download-audience-csv">\u{1F4BE} Download CSV</button>
          </div>
          <button class="geomap-btn" id="btn-clear-audience" style="color:#ef4444;border-color:rgba(239,68,68,0.4);">Clear All</button>
        </div>
      </div>
    `;
    this.audienceModal.querySelectorAll(".geomap-export-tab").forEach((tab) => {
      tab.onclick = () => {
        this.activeAudienceTab = tab.dataset.tab;
        this._renderAudienceModalContent();
      };
    });
    this.audienceModal.querySelectorAll(".audience-region-remove").forEach((rm) => {
      rm.onclick = () => {
        this.removeFromAudience(rm.dataset.id);
      };
    });
    const copyBtn = this.audienceModal.querySelector("#btn-copy-audience-export");
    if (copyBtn) {
      copyBtn.onclick = () => {
        let textToCopy = "";
        if (this.activeAudienceTab === "thumbtack") textToCopy = thumbtackStr;
        else if (this.activeAudienceTab === "meta") textToCopy = metaJsonStr;
        else if (this.activeAudienceTab === "google") textToCopy = googleAdsStr;
        else textToCopy = allZips.join("\n");
        navigator.clipboard?.writeText(textToCopy);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = "\u2713 Copied to Clipboard!";
        copyBtn.style.background = "#16a34a";
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.background = "";
        }, 2e3);
      };
    }
    const csvBtn = this.audienceModal.querySelector("#btn-download-audience-csv");
    if (csvBtn) {
      csvBtn.onclick = () => this._downloadAudienceCsv(audienceList, allZips);
    }
    const clearBtn = this.audienceModal.querySelector("#btn-clear-audience");
    if (clearBtn) {
      clearBtn.onclick = () => this.clearAudience();
    }
  }
  _downloadAudienceCsv(audienceList, allZips) {
    const isCan = this.activeCountryId === "canada";
    const postSingular = isCan ? "FSA" : "ZIP";
    let csv = `Market Name,Type,County,State,${postSingular} Count,${postSingular}s
`;
    audienceList.forEach((r) => {
      csv += `"${r.name}","${r.type}","${r.county || ""}","${r.state}",${r.zips?.length || 1},"${(r.zips || []).join(" ")}"
`;
    });
    csv += `
All Deduplicated ${postSingular}s (${allZips.length}):
${allZips.join("\n")}
`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ad_targeting_audience_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  /* -------------------------------------------------------------
   * Export Utilities
   * ------------------------------------------------------------- */
  exportSVG() {
    const svgClone = this.svg.cloneNode(true);
    svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `geomap-${this.activeCountryId}-${this.activeState ? this.activeState.abbr : "national"}-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  exportPNG(scale = 2) {
    const svgClone = this.svg.cloneNode(true);
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = this.svg.clientWidth * scale;
      canvas.height = this.svg.clientHeight * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `geomap-${this.activeCountryId}-${this.activeState ? this.activeState.abbr : "national"}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = url;
  }
  _showLoading(show) {
    if (this.loadingEl) {
      this.loadingEl.classList.toggle("visible", show);
    }
  }
  destroy() {
    this.target.innerHTML = "";
  }
};

// src/index.js
var index_default = GeoMap;
export {
  BaseProvider,
  CanadaProvider,
  GeoMap,
  USAProvider,
  index_default as default
};
//# sourceMappingURL=interactive-svg-map.esm.js.map
