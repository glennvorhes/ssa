/// <reference path="../../node_modules/@types/jqueryui/index.d.ts" />
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import SelectCounty from '../selectBox/SelectCounty';
import SelectHighway from '../selectBox/SelectHighway';
import SegmentPicker from '../selectBox/SegmentPicker';
import Corridor from '../corridor/Corridor';
import CorridorCollection from '../collections/CorridorCollection';
import ol = require('custom-ol');
import LayerEsriMapServer from 'webmapsjs/dist/layers/LayerEsriMapServer';
import 'jquery-ui';
declare class PickerCollection {
    _map: ol.Map;
    $createCorridorButton: JQuery;
    $innerContainer: JQuery;
    $zoomExtentButton: JQuery;
    $containerEl: JQuery;
    _dummyCorridor: Corridor;
    _modifyCorridor: Corridor;
    $btnPickerPreview: JQuery;
    $btnPickerAdd: JQuery;
    $btnPickerModify: JQuery;
    $btnPickerCancel: JQuery;
    corridorCollection: CorridorCollection;
    _addModifyEnabled: boolean;
    _metamanagerSegmentsLayer: LayerEsriMapServer;
    countyStartSelect: SelectCounty;
    countyEndSelect: SelectCounty;
    highwaySelect: SelectHighway;
    segmentPickerFrom: SegmentPicker;
    segmentPickerTo: SegmentPicker;
    helpDialog: JQuery;
    /**
     *
     * @param {jQuery} parentDiv - container div
     * @param {ol.Map} theMap - the main map
     */
    constructor(parentDiv: any, theMap: any);
    _addHandlers(): void;
    /**
     * Configure the help dialog
     * @private
     */
    _helpDialogInit(): void;
    previewCorridor(): void;
    /**
     * add a corridor
     */
    addCorridor(): void;
    modifyCorridor(): void;
    /**
     * Populate the selections based on values from an existing corridor
     * @param {Corridor} [existingCor=undefined] existing corridor if in an edit operation
     */
    startPicker(existingCor?: Corridor): void;
    stopPicker(): void;
    /**
     * Getter for if an add modify operation is happening {boolean}
     * @returns {boolean} - if the add or modify operation is happening
     */
    /**
     * Setter for if an add modify operation is happening {boolean}
     * @param {boolean} isEnabled - if enabled
     */
    addModifyButtonEnabled: boolean;
    /**
     *
     * @returns {boolean}
     */
    readonly startEndCountySame: boolean;
}
export default PickerCollection;
