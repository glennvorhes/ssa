/**
 * Created by gavorhes on 5/11/2016.
 */
import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import SortedFeatures from 'webmapsjs/dist/olHelpers/SortedFeatures';
import ol from 'custom-ol';
declare class Corridor {
    _valid: boolean;
    _error: string;
    _loaded: boolean;
    clientId: string;
    _color: string;
    _corridorLayer: LayerBaseVectorGeoJson;
    nodeLayer: LayerBaseVectorGeoJson;
    sortedFeatures: SortedFeatures;
    databaseId: string | number;
    pdpFrom: number;
    pdpTo: number;
    rpFrom: string;
    rpTo: string;
    countyStart: number;
    countyEnd: number;
    highway: string;
    routeId: number;
    guid: string;
    /**
     *
     * @param {number} pdpFrom - from segment id
     * @param {number} pdpTo - to segment id
     * @param {string} rpFrom - from reference point
     * @param {string} rpTo - to reference point
     * @param {number|string} countyStart - start county
     * @param {number} countyEnd - end county
     * @param {string} highway - highway text
     * @param {number} routeId - route Id
     * @param {object} [options={}] options
     * @param {corridorLoaded} [options.loadedCallback=function(c){}] function to call on load
     * @param {number|string|undefined|*} [options.databaseId=undefined] - id in the database
     * @param {string} [options.color=randomColor()] - color for this corridor
     * @param {Array<ol.Feature>|undefined} [options.features=undefined] - pre existing features
     * @param {boolean} [options.cancelLoad=false] - don't load in init
     */
    constructor(pdpFrom: number, pdpTo: number, rpFrom: string, rpTo: string, countyStart: number | string, countyEnd: number | string, highway: string, routeId: number | string, options?: {
        loadedCallback?: (c: Corridor) => any;
        databaseId?: number | string;
        color?: string;
        features?: Array<ol.Feature>;
        cancelLoad?: boolean;
        jsonFeatures?: JSON;
    });
    /**
     *
     * @param {corridorLoaded} [loadedCallback=function(c){}] - function to call on load
     */
    load(loadedCallback: any): void;
    buildNodes(): void;
    /**
     *
     * @returns {Corridor} a copy of the corridor
     */
    clone(): Corridor;
    /**
     *
     * @param {Corridor} corridor -  the corridor used for updating
     */
    updateCorridor(corridor: any): void;
    readonly color: string;
    /**
     *
     * @returns {boolean} if the corridor is loaded, no error on ajax
     */
    readonly valid: boolean;
    /**
     *
     * @returns {string|*} - error message
     */
    readonly error: string;
    /**
     * get the html string to build the corridor table row with zoom, edit, and delete buttons
     * @returns {string} - html for the corridor zoom, edit, and delete buttons
     */
    readonly tableHtmlCreate: string;
    getDataHtml(i: any): string;
    getDataHtmlDisp(i: any): string;
    /**
     *
     * @returns {ol.layer.Vector|ol.layer.Base} - the OL Vector Layer
     */
    readonly olLayer: ol.layer.Vector;
    /**
     *
     * @returns {LayerBaseVectorGeoJson} geojson layer
     */
    readonly layer: LayerBaseVectorGeoJson;
    /**
     * Getter
     * @returns {boolean} if corridor layer is visible
     */
    /**
     * Setter
     * @param {boolean} vis if corridor layer is visible
     *
     */
    visible: boolean;
    /**
     *
     * @returns {Array.<ol.Feature>} an array of ol features
     */
    readonly features: Array<ol.Feature>;
    /**
     *
     * @returns {ol.Extent|undefined} layer extent
     */
    readonly extent: ol.Extent | Array<number>;
    readonly loaded: boolean;
}
export default Corridor;
