/// <reference types="jquery" />
/// <reference types="jqueryui" />
/**
 * Created by gavorhes on 5/13/2016.
 */
import SsaMapBase from './SsaMapBase';
import PickerCollection from '../collections/PickerCollection';
import CorridorCollection from '../collections/CorridorCollection';
import 'jquery-ui';
export declare class SsaMapCreate extends SsaMapBase {
    $sideBar: JQuery;
    corridorCollection: CorridorCollection;
    pickerCollection: PickerCollection;
    /**
     *
     * @param {string} divId
     * @param {string} corridorDataContainer
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     */
    constructor(divId: any, corridorDataContainer: any, dataClass: any);
    _afterChange(): void;
}
export default SsaMapCreate;
