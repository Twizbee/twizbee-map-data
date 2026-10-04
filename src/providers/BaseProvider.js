/**
 * BaseProvider
 * Abstract base class for multi-country map data providers.
 * To add a new country (e.g., Canada, UK, Mexico, World), extend this class.
 */
export class BaseProvider {
  constructor(id, name, defaultViewBox = '0 0 960 600') {
    this.id = id;
    this.name = name;
    this.defaultViewBox = defaultViewBox;
  }

  /**
   * Returns master metadata for the country.
   */
  async getCountryMeta() {
    throw new Error('getCountryMeta() must be implemented');
  }

  /**
   * Returns list of top-level subdivisions (e.g. States, Provinces).
   */
  async getStates() {
    throw new Error('getStates() must be implemented');
  }

  /**
   * Returns full detailed data for a specific subdivision (counties, cities, districts, zipcodes).
   * @param {string} stateId - e.g. 'CA', 'TX', 'ON'
   */
  async getStateData(stateId) {
    throw new Error('getStateData() must be implemented');
  }

  /**
   * Returns search index entries for autocomplete.
   */
  async getSearchIndex() {
    return [];
  }
}
