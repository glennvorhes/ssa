/// <reference types="jquery" />
/// <reference types="jqueryui" />
/**
 * Created by gavorhes on 7/15/2016.
 */
import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import SortedFeatures from 'webmapsjs/dist/olHelpers/SortedFeatures';
import ol = require('custom-ol');
declare class DeficiencyBase {
    _map: ol.Map;
    deficiencyLayer: LayerBaseVectorGeoJson;
    _sortedFeatures: SortedFeatures;
    $summaryList: JQuery;
    _summaryListId: string;
    /**
     *
     * @param {string} layerName - layer name
     * @param {function|object} layerStyle - layer style
     * @param {number} z - z index
     * @param {string} summaryListId - summaryListId
     */
    constructor(layerName: string, layerStyle: ol.style.Style | Array<ol.style.Style> | ol.StyleFunction, z: number, summaryListId: string);
    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     * @abstract
     */
    init(m: ol.Map): void;
    /**
     *
     * @param {Corridor} c - the corridor to be added
     * @abstract
     */
    addCorridor(c: any): void;
    /**
     *
     * @param pdpId
     * @returns {ol.Feature|undefined}
     */
    getFeatureById(pdpId: any): any;
    /**
     * @abstract
     */
    afterLoad(): void;
}
export default DeficiencyBase;
