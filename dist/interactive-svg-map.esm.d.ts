/**
 * TypeScript definitions for interactive-svg-map
 */

export interface GeoMapOptions {
  /** Country identifier, defaults to 'usa'. 'usa' | 'canada' or custom registered id */
  country?: string;
  /** UI Color Theme: 'dark' | 'light' | 'emerald' */
  theme?: 'dark' | 'light' | 'emerald' | string;
  /** Initial active drilldown layer: 'counties' | 'cities' | 'districts' | 'zipcodes' | 'all' */
  activeLayer?: 'counties' | 'cities' | 'districts' | 'zipcodes' | 'all';
  /** Base URL for USA JSON dataset, defaults to './data/usa' */
  dataBaseUrl?: string;
  /** Base URL for Canada JSON dataset, defaults to './data/canada' */
  canadaDataBaseUrl?: string;
  /** Enable mouse drag panning and wheel/pinch zooming */
  enablePanZoom?: boolean;
  /** Enable autocomplete search box in the top bar */
  enableSearch?: boolean;
  /** Enable hierarchical breadcrumb navigation path */
  enableBreadcrumbs?: boolean;
  /** Enable side detail inspector drawer */
  enableInspector?: boolean;
  /** Enable floating zoom/theme/export control buttons */
  enableControls?: boolean;
  /** Duration of zoom interpolation animation in milliseconds (defaults to 550) */
  animationDuration?: number;

  /** Event callback triggered when a state/province is clicked or drilled into */
  onStateClick?: (state: StateData) => void;
  /** Event callback triggered when a county/census division is clicked or focused */
  onCountyClick?: (county: CountyData) => void;
  /** Event callback triggered when a city is clicked or focused */
  onCityClick?: (city: CityData) => void;
  /** Event callback triggered when a district/riding is clicked or focused */
  onDistrictClick?: (district: DistrictData) => void;
  /** Event callback triggered when a zip code/FSA is clicked or focused */
  onZipClick?: (zip: ZipData) => void;
  /** Event callback triggered when map zooms to a new level */
  onZoom?: (level: 'country' | 'state' | 'county' | 'district' | 'zip' | 'city', entity?: any) => void;
  /** Event callback triggered when active layer changes */
  onLayerChange?: (layer: string) => void;
}

export interface CountryMeta {
  id: string;
  name: string;
  abbr: string;
  flag?: string;
  capital: string;
  subdivisionType: string;
  secondaryType: string;
  districtType: string;
  postalType: string;
  defaultViewBox: string;
}

export interface StateData {
  abbr: string;
  name: string;
  capital: string;
  population?: number;
  landAreaSqMi?: number;
  landAreaSqKm?: number;
  region?: string;
  center: [number, number];
  bounds: [number, number, number, number];
  path: string;
  countiesCount?: number;
  districtsCount?: number;
  zipCodesCount?: number;
  citiesCount?: number;
  counties?: CountyData[];
  districts?: DistrictData[];
  zipcodes?: ZipData[];
  cities?: CityData[];
}

export interface CountyData {
  id: string;
  name: string;
  type?: string;
  bounds: [number, number, number, number];
  center: [number, number];
  path: string;
}

export interface DistrictData {
  id: string;
  name: string;
  shortName: string;
  congress?: number;
  feduid?: number;
  bounds: [number, number, number, number];
  center: [number, number];
  path: string;
  landAreaSqKm?: number;
}

export interface ZipData {
  zip: string;
  city?: string;
  county?: string;
  district?: string;
  state?: string;
  lat?: number;
  lon?: number;
  bounds: [number, number, number, number];
  center?: [number, number];
  x?: number;
  y?: number;
  path: string;
}

export interface CityData {
  name: string;
  cityName?: string;
  x: number;
  y: number;
  isCapital: boolean;
  isFedCapital?: boolean;
  county?: string;
  state?: string;
  lat?: number;
  lon?: number;
  bounds: [number, number, number, number];
  stitchedPath?: string;
  zipCount?: number;
  zips?: string[];
}

export interface SearchIndexEntry {
  type: 'state' | 'county' | 'district' | 'zip' | 'city';
  id: string;
  name: string;
  state?: string;
  abbr?: string;
  zip?: string;
  countyName?: string;
  shortName?: string;
  cityName?: string;
}

export declare class BaseProvider {
  id: string;
  name: string;
  defaultViewBox: string;
  constructor(id: string, name: string, defaultViewBox?: string);
  getCountryMeta(): Promise<CountryMeta>;
  getStates(): Promise<StateData[]>;
  getStateData(stateId: string): Promise<StateData | null>;
  getSearchIndex(): Promise<SearchIndexEntry[]>;
}

export declare class USAProvider extends BaseProvider {
  constructor(options?: { dataBaseUrl?: string });
  getCountryMeta(): Promise<CountryMeta>;
  getStates(): Promise<StateData[]>;
  getStateData(abbr: string): Promise<StateData | null>;
  getSearchIndex(): Promise<SearchIndexEntry[]>;
}

export declare class CanadaProvider extends BaseProvider {
  constructor(options?: { dataBaseUrl?: string });
  getCountryMeta(): Promise<CountryMeta>;
  getStates(): Promise<StateData[]>;
  getStateData(abbr: string): Promise<StateData | null>;
  getSearchIndex(): Promise<SearchIndexEntry[]>;
}

export declare class GeoMap {
  target: HTMLElement;
  options: GeoMapOptions;
  activeCountryId: string;
  currentLevel: 'country' | 'state' | 'county' | 'district' | 'zip' | 'city';
  activeState: StateData | null;
  activeEntity: any;
  activeLayer: string;

  constructor(target: string | HTMLElement, options?: GeoMapOptions);

  registerCountry(id: string, provider: BaseProvider): void;
  loadCountry(countryId: string): Promise<void>;
  setCountry(countryId: string): Promise<void>;

  zoomToState(abbr: string): Promise<void>;
  zoomToCounty(fipsOrName: string): Promise<void>;
  zoomToDistrict(districtId: string): Promise<void>;
  zoomToZip(zipCode: string): Promise<void>;
  zoomToCity(cityNameOrId: string): Promise<void>;

  setLayer(layerName: 'counties' | 'cities' | 'districts' | 'zipcodes' | 'all'): void;
  setTheme(themeName: 'light' | 'dark' | 'emerald' | string): void;
  resetView(): void;

  exportSVG(): void;
  exportPNG(scale?: number): void;

  destroy(): void;
}

export default GeoMap;
