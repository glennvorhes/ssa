import SortedFeatures from 'webmapsjs/dist/olHelpers/SortedFeatures';
import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import SelectBoxBase from 'webmapsjs/dist/domUtil/SelectBoxBase';
import PickerCollection from "../collections/PickerCollection";
export declare class SegmentPicker extends SelectBoxBase {
    _isFrom: boolean;
    _selectedPdpId: number;
    _sortedFeatures: SortedFeatures;
    _segmentLayer: LayerBaseVectorGeoJson;
    _segNodeLayer: LayerBaseVectorGeoJson;
    _segmentSelectionLayer: LayerBaseVectorGeoJson;
    _selectBtnClass: string;
    _selectBtnClassTo: string;
    _pickerColl: PickerCollection;
    _enabled: boolean;
    _layersVisible: boolean;
    /**
     *
     * @param {PickerCollection} pickerColl - picker collection
     * @param {boolean} isFrom - is this the start (from) picker
     */
    constructor(pickerColl: any, isFrom: any);
    /**
     * @param {Array<object>} arr - array of returned objects, implementation defined in derived classes
     */
    _processAjaxResult(arr: any): void;
    /**
     *
     * @param {string|number} county - county id as string or number
     * @param {string|number|null} rteId - routeId
     * @param {number|undefined} [pdpId=undefined] - the pdp id to be set on load
     */
    setCountyAndRoute(county: string | number, rteId: string | number, pdpId?: number): void;
    _setExtent(): void;
    /**
     * @returns {boolean} if enabled
     */
    /**
     *
     * @param {boolean} isEnabled - is enabled
     * @private
     */
    enabled: boolean;
    layersVisible: boolean;
    /**
     *
     * @returns {number|undefined} selected id
     */
    /**
     * set the currently selected pdp id
     * @param {number|undefined} newId - new selected id
     */
    selectedPdpId: number;
    clear(): void;
    /**
     * get the segment layer with the mm segments in the county and route id
     * @returns {LayerBaseVectorGeoJson} - the segment layer
     */
    readonly segmentLayer: LayerBaseVectorGeoJson;
    /**
     * get the selection hayer
     * @returns {LayerBaseVectorGeoJson} the selection layer for this picker
     */
    readonly selectionLayer: LayerBaseVectorGeoJson;
}
export default SegmentPicker;
