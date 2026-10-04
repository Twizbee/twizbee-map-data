import { BaseProvider } from './BaseProvider.js';

/**
 * CanadaProvider
 * Handles data loading for the Canada map.
 * Supports both pre-bundled memory storage (zero-fetch) and on-demand async fetching.
 * Features 10 Provinces, 3 Territories, 293 Census Divisions, 338 Federal Electoral Districts,
 * 1,657 Forward Sortation Areas (Postal FSAs), and stitched major Canadian cities.
 */
export class CanadaProvider extends BaseProvider {
  constructor(options = {}) {
    super('canada', 'Canada', '0 0 960 600');
    this.baseUrl = options.dataBaseUrl || './data/canada';
    this.cache = new Map();
    this.statesList = null;
    this.searchIndex = null;

    // Check if offline bundle is already loaded in window
    if (typeof window !== 'undefined' && window.__CANADA_MAP_DATA__) {
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
      id: 'canada',
      name: 'Canada',
      abbr: 'CAN',
      flag: '🇨🇦',
      capital: 'Ottawa',
      subdivisionType: 'Province',
      secondaryType: 'Census Division',
      districtType: 'Federal Electoral District',
      postalType: 'Postal Code (FSA)',
      defaultViewBox: '0 0 960 600'
    };
  }

  async getStates() {
    if (this.statesList) return this.statesList;

    const tryUrls = [
      `${this.baseUrl}/provinces.json`,
      '../data/canada/provinces.json',
      '/data/canada/provinces.json',
      './data/canada/provinces.json'
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

    if (typeof window !== 'undefined' && window.__CANADA_MAP_DATA__) {
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
      } catch (e) {}
    }

    console.warn(`CanadaProvider: Failed to fetch province data for ${key}`);
    return null;
  }

  async getSearchIndex() {
    if (this.searchIndex) return this.searchIndex;

    const tryUrls = [
      `${this.baseUrl}/search-index.json`,
      '../data/canada/search-index.json',
      '/data/canada/search-index.json',
      './data/canada/search-index.json'
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

    if (typeof window !== 'undefined' && window.__CANADA_MAP_DATA__) {
      this.searchIndex = window.__CANADA_MAP_DATA__.searchIndex;
      return this.searchIndex;
    }
    return [];
  }
}
