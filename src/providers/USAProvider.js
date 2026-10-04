import { BaseProvider } from './BaseProvider.js';

/**
 * USAProvider
 * Handles data loading for the United States map.
 * Supports both pre-bundled memory storage (zero-fetch) and on-demand async fetching.
 */
export class USAProvider extends BaseProvider {
  constructor(options = {}) {
    super('usa', 'United States', '0 0 960 600');
    this.baseUrl = options.dataBaseUrl || './data/usa';
    this.cache = new Map();
    this.statesList = null;
    this.searchIndex = null;

    // Check if offline bundle is already loaded in window
    if (typeof window !== 'undefined' && window.__USA_MAP_DATA__) {
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
      id: 'usa',
      name: 'United States of America',
      abbr: 'USA',
      capital: 'Washington, D.C.',
      subdivisionType: 'State',
      secondaryType: 'County',
      districtType: 'Congressional District',
      postalType: 'ZIP Code',
      defaultViewBox: '0 0 960 600'
    };
  }

  async getStates() {
    if (this.statesList) return this.statesList;

    const tryUrls = [
      `${this.baseUrl}/states.json`,
      '../data/usa/states.json',
      '/data/usa/states.json',
      './data/usa/states.json'
    ];

    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          this.statesList = await res.json();
          return this.statesList;
        }
      } catch (e) {}
    }

    if (typeof window !== 'undefined' && window.__USA_MAP_DATA__) {
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
      } catch (e) {}
    }

    console.warn(`USAProvider: Failed to fetch state data for ${key}`);
    return null;
  }

  async getSearchIndex() {
    if (this.searchIndex) return this.searchIndex;

    const tryUrls = [
      `${this.baseUrl}/search-index.json`,
      '../data/usa/search-index.json',
      '/data/usa/search-index.json',
      './data/usa/search-index.json'
    ];

    for (const url of tryUrls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          this.searchIndex = await res.json();
          return this.searchIndex;
        }
      } catch (e) {}
    }

    if (typeof window !== 'undefined' && window.__USA_MAP_DATA__) {
      this.searchIndex = window.__USA_MAP_DATA__.searchIndex;
      return this.searchIndex;
    }
    return [];
  }
}
