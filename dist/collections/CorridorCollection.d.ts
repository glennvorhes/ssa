/// <reference types="jquery" />
/// <reference types="jqueryui" />
import Corridor from '../corridor/Corridor';
import { popupCallback } from 'webmapsjs/dist/olHelpers/mapPopupCls';
import ol from 'custom-ol';
export declare class CorridorCollection {
    $innerContainer: JQuery;
    $corridorDataContainer: JQuery;
    _map: ol.Map;
    _visible: boolean;
    _inCreateModifyOperation: boolean;
    _showPopups: boolean;
    $containerEl: JQuery;
    _corridorArray: Array<Corridor>;
    _coridorLookup: {
        [s: string]: Corridor;
    };
    _afterChange: Function;
    _dataClass: string;
    _popupStyle: popupCallback;
    /**
     * @param {jQuery} parentDiv - div id inside which to make the collection
     * @param {ol.Map} theMap - the SSA main map
     * @param {string} corridorDataIdOrClass - the corridor data container id or class
     * @param {function} afterChange - function to run after a change has taken place
     * @param {string} [dataClass=corridor-data] - function to run after a change has taken place
     */
    constructor(parentDiv: any, theMap: any, corridorDataIdOrClass: any, afterChange: any, dataClass: any);
    /**
     * add a corridor
     * @param {Corridor} c - the corridor to be added
     * @param [refreshData=true] c - the corridor to be added
     */
    addCorridorCreate(c: Corridor, refreshData?: boolean): void;
    /**
     * delete/remove a corridor
     * @param {string|Corridor} cor - the corridor to be removed
     */
    removeCorridor(cor: any): void;
    /**
     * refresh the contents of the corridor table and hidden corridor data input elements
     */
    refreshHtmlCreate(): void;
    visible: boolean;
    readonly fullExtent: ol.Extent | Array<number>;
    /**
     * if currently in a create or modify operation
     * @returns {boolean} is creating or modifying
     */
    /**
     * if currently in a create or modify operation
     * @param {boolean} isInCreateModifyOperation - is creating or modifying
     */
    inCreateModifyOperation: boolean;
    /**
     *
     * @returns {boolean} if the corridor popups should be shown
     */
    /**
     *
     * @param {boolean} show - if the corridor popups should be shown
     */
    showPopups: boolean;
    readonly corridorCount: number;
    /**
     *
     * @param {string} corId - corridor id
     * @returns {Corridor} the corridor matching the id in the lookup
     */
    getCorridorById(corId: any): Corridor;
    loadExistingCorridors(): void;
}
export default CorridorCollection;
