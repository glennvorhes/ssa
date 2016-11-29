/// <reference path="../../node_modules/@types/jqueryui/index.d.ts"/>

import SelectCounty from '../selectBox/SelectCounty';
import SelectHighway from '../selectBox/SelectHighway';
import SegmentPicker from '../selectBox/SegmentPicker';
import Corridor from '../corridor/Corridor';
import provide from 'webmapsjs/dist/util/provide';

import * as lyrStyles from '../layerStyles';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import makeGuid from 'webmapsjs/dist/util/makeGuid';
import CorridorCollection from '../collections/CorridorCollection';
import ol from 'custom-ol';
import LayerEsriMapServer from 'webmapsjs/dist/layers/LayerEsriMapServer';

import $ = require("jquery");
import 'jquery-ui';




const nm = provide('ssa');

class PickerCollection {
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
    constructor(parentDiv, theMap) {
        this._map = theMap;

        parentDiv.append('<div>' +
            '<input type="button" value="Add Corridor" class="btn btn-default picker-create-corridor">' +
            '<input type="button" value="Zoom to Extent" class="btn btn-default picker-zoom-extent">' +
            '</div>');

        this.$createCorridorButton = parentDiv.find('.picker-create-corridor');
        this.$zoomExtentButton = parentDiv.find('.picker-zoom-extent');

        let pickerGuid = makeGuid();
        parentDiv.append(`<div id="${pickerGuid}"></div>`);


        this.$containerEl = $('#' + pickerGuid).addClass('picker-collection-container');
        this.$containerEl.append('<div class="picker-collection"><span class="corridor-picker-help" title="Show Help"></span></div>');
        this.$containerEl.append('<input type="button" value="Preview" class="btn btn-default picker-preview">');
        this.$containerEl.append('<input type="button" value="Add" class="btn btn-default picker-add" disabled="disabled">');
        this.$containerEl.append('<input type="button" value="Modify" class="btn btn-default picker-modify" disabled="disabled" style="display: none;">');
        this.$containerEl.append('<input type="button" value="Cancel" class="btn btn-default picker-cancel">');
        this.$innerContainer = this.$containerEl.find('.picker-collection');

        this._dummyCorridor = new Corridor(1, 1, '', '', 1, 1, 'h', -1, {
            cancelLoad: true,
            color: lyrStyles.corridorPreviewColor
        });
        this._dummyCorridor.layer.zIndex = 10;
        this._map.addLayer(this._dummyCorridor.olLayer);

        this._addModifyEnabled = false;

        /**
         *
         * @type {Corridor|undefined}
         * @private
         */
        this._modifyCorridor = undefined;


        this.$btnPickerPreview = this.$containerEl.find('.picker-preview');
        this.$btnPickerAdd = this.$containerEl.find('.picker-add');
        this.$btnPickerModify = this.$containerEl.find('.picker-modify');
        this.$btnPickerCancel = this.$containerEl.find('.picker-cancel');


        this.countyStartSelect = new SelectCounty(this.$innerContainer, "Start County");
        this.countyEndSelect = new SelectCounty(this.$innerContainer, "End County");
        this.highwaySelect = new SelectHighway(this.$innerContainer);

        this._metamanagerSegmentsLayer = new LayerEsriMapServer(
            'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
            {
                minZoom: 7,
                visible: false,
                name: 'Metamanager Segments',
                opacity: 0.4
            });

        this._map.addLayer(this._metamanagerSegmentsLayer.olLayer);

        this.segmentPickerFrom = new SegmentPicker(this, true);
        this.segmentPickerTo = new SegmentPicker(this, false);

        this._map.addLayer(this.segmentPickerFrom.segmentLayer.olLayer);
        this._map.addLayer(this.segmentPickerTo.segmentLayer.olLayer);
        this._map.addLayer(this.segmentPickerFrom.selectionLayer.olLayer);
        this._map.addLayer(this.segmentPickerTo.selectionLayer.olLayer);

        /**
         * 
         * @type {CorridorCollection|undefined}
         */
        this.corridorCollection = undefined;
        this._addHandlers();
        this._helpDialogInit();

    }

    _addHandlers() {
        this.$createCorridorButton.click(() => {
            this.startPicker();
            this.$createCorridorButton.prop('disabled', true);
        });

        this.$zoomExtentButton.click(() => {
            let ext = this.corridorCollection.fullExtent;
            if (ext) {
                this._map.getView().fit(ext as ol.Extent, this._map.getSize());
            }
        });

        this.$btnPickerCancel.click(() => {
            this.stopPicker();
        });

        this.$btnPickerPreview.click(() => {
            this.previewCorridor();
        });

        this.$btnPickerAdd.click(() => {
            this.addCorridor();
        });

        this.$btnPickerModify.click(() => {
            this.modifyCorridor();
        });


        this.countyStartSelect.addChangeListener((v) => {
            "use strict";

            this.highwaySelect.setStartEndCounty(v, this.countyEndSelect.selectedValue);
            this.addModifyButtonEnabled = false;
            this.segmentPickerTo.segmentLayer.visible = !this.startEndCountySame;
        });
        

        this.countyEndSelect.addChangeListener((v) => {
            "use strict";
            this.highwaySelect.setStartEndCounty(this.countyStartSelect.selectedValue, v);
            this.addModifyButtonEnabled = false;
            this.segmentPickerTo.segmentLayer.visible = !this.startEndCountySame;
        });

        this.highwaySelect.addChangeListener((hwy) => {
            "use strict";
            this.segmentPickerFrom.setCountyAndRoute(this.countyStartSelect.selectedValue, hwy);
            this.segmentPickerTo.setCountyAndRoute(this.countyEndSelect.selectedValue, hwy);
            this.addModifyButtonEnabled = false;
        });

        this.segmentPickerFrom.addChangeListener(() => {
            this.addModifyButtonEnabled = false;
        });

        this.segmentPickerTo.addChangeListener(() => {
            this.addModifyButtonEnabled = false;
        });

    }

    /**
     * Configure the help dialog
     * @private
     */
    _helpDialogInit() {
        let helpInfo = 'Corridors are defined by selecting in sequence the start county, highway, and end county ';
        helpInfo += "The reference points are then populated and can be selected either by using the combo box or ";
        helpInfo += "by clicking a segment in the map and clicking select in the resulting popup ";
        helpInfo += "Corridors are defined visually in the pickers as the start segment (green) and end segment (red) ";
        helpInfo += "inclusive of the corridor extents";

        $('body').append(`<div class="corridor-picker-help-dialog" title="Corridor Selection Help">` +
            `<p style="text-align: justify">${helpInfo}</p></div>`);


        this.helpDialog = $(".corridor-picker-help-dialog");

        this.helpDialog.dialog({
            modal: true,
            autoOpen: false,
            height: 450,
            width: 650,
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });

        this.$containerEl.find('.corridor-picker-help').click(() => {
            this.helpDialog.dialog('open');
        });
    }


    previewCorridor() {
        if (!this.segmentPickerFrom.selectedPdpId || !this.segmentPickerTo.selectedPdpId) {
            alert('Select From and To Reference Points');

            return;
        }

        this._map.removeLayer(this._dummyCorridor.layer.olLayer);
        this._map.removeLayer(this._dummyCorridor.nodeLayer.olLayer);
        this._dummyCorridor = new Corridor(
            this.segmentPickerFrom.selectedPdpId,
            this.segmentPickerTo.selectedPdpId,
            this.segmentPickerFrom.selectedText,
            this.segmentPickerTo.selectedText,
            this.countyStartSelect.selectedValue,
            this.countyEndSelect.selectedValue,
            this.highwaySelect.selectedText,
            this.highwaySelect.selectedValue,
            {
                cancelLoad: true,
                color: lyrStyles.corridorPreviewColor
            }
        );


        this._dummyCorridor.layer.zIndex = 10;
        this._map.addLayer(this._dummyCorridor.layer.olLayer);
        this._map.addLayer(this._dummyCorridor.nodeLayer.olLayer);

        this._dummyCorridor.load((c) => {
            this._map.getView().fit(c.extent, this._map.getSize());
            this.addModifyButtonEnabled = true;

        });
    }

    /**
     * add a corridor
     */
    addCorridor() {
        let newCorridor = this._dummyCorridor.clone();
        this.corridorCollection.addCorridorCreate(newCorridor);
        this.segmentPickerTo.segmentLayer.visible = !this.startEndCountySame;
        this.stopPicker();
    }

    modifyCorridor() {
        this._modifyCorridor.updateCorridor(this._dummyCorridor);
        this.corridorCollection.refreshHtmlCreate();
        this.stopPicker();
    }

    /**
     * Populate the selections based on values from an existing corridor
     * @param {Corridor} [existingCor=undefined] existing corridor if in an edit operation
     */
    startPicker(existingCor?: Corridor) {
        this.corridorCollection.inCreateModifyOperation = true;
        this.$containerEl.show();
        this.segmentPickerFrom.layersVisible = true;
        this.segmentPickerTo.layersVisible = true;
        this._metamanagerSegmentsLayer.visible = true;
        this.corridorCollection.showPopups = false;


        if (existingCor) {
            this.$btnPickerAdd.hide();
            this.$btnPickerModify.show();
            this.countyStartSelect.box.val(existingCor.countyStart);
            this.countyEndSelect.box.val(existingCor.countyEnd);
            this.highwaySelect.setStartEndCounty(existingCor.countyStart, existingCor.countyEnd, existingCor.routeId);

            this.segmentPickerFrom.setCountyAndRoute(existingCor.countyStart, existingCor.routeId, existingCor.pdpFrom);
            this.segmentPickerTo.setCountyAndRoute(existingCor.countyEnd, existingCor.routeId, existingCor.pdpTo);

            this._modifyCorridor = existingCor;
            this._dummyCorridor.updateCorridor(existingCor);
            this._map.getView().fit(this._dummyCorridor.extent as ol.Extent, this._map.getSize());
        } else {
            let $primCounty = $('#primaryCounty');
            let $primRoute = $('#primaryRdwyRteId');
            let primaryCounty = undefined;
            let primaryRouteId = undefined;

            if ($primCounty.length > 0) {
                primaryCounty = $primCounty.val().length > 0 ? parseInt($primCounty.val()) : undefined;
            }

            if ($primRoute.length > 0) {
                primaryRouteId = $primRoute.val().length > 0 ? parseInt($primRoute.val()) : undefined;
            }

            if (primaryCounty) {
                this.countyStartSelect.box.val(primaryCounty);
                this.countyEndSelect.box.val(primaryCounty);
                this.highwaySelect.setStartEndCounty(primaryCounty, primaryCounty, primaryRouteId, true);
            }

            this.$btnPickerAdd.show();
            this.$btnPickerModify.hide();
        }
    }

    stopPicker() {
        this.corridorCollection.showPopups = true;
        this.$btnPickerAdd.show();
        this.$btnPickerModify.hide();
        this.$btnPickerModify.prop('disabled', true);
        this.$containerEl.hide();
        this.$createCorridorButton.prop('disabled', false);
        // this.countyStartSelect.box.val(1).trigger('change');
        this.corridorCollection.visible = true;
        this._dummyCorridor.layer.clear();
        this._modifyCorridor = undefined;
        this._dummyCorridor.nodeLayer.olLayer.getSource().clear();
        this.addModifyButtonEnabled = false;
        this.corridorCollection.inCreateModifyOperation = false;
        $('.corridor-tr-selected').removeClass('corridor-tr-selected');
        this.segmentPickerFrom.layersVisible = false;
        this.segmentPickerTo.layersVisible = false;
        this._metamanagerSegmentsLayer.visible = false;
        mapPopup.closePopup();
    }


    /**
     * Getter for if an add modify operation is happening {boolean}
     * @returns {boolean} - if the add or modify operation is happening
     */
    get addModifyButtonEnabled() {
        return this._addModifyEnabled;
    }

    /**
     * Setter for if an add modify operation is happening {boolean}
     * @param {boolean} isEnabled - if enabled
     */
    set addModifyButtonEnabled(isEnabled) {
        this._addModifyEnabled = isEnabled;
        this.$btnPickerAdd.prop('disabled', !this.addModifyButtonEnabled);
        this.$btnPickerModify.prop('disabled', !this.addModifyButtonEnabled);
    }

    /**
     *
     * @returns {boolean}
     */
    get startEndCountySame(){
        let isSame = this.countyStartSelect.selectedValue == this.countyEndSelect.selectedValue;

        this.segmentPickerFrom.segmentLayer.name = isSame ? 'Start/End Segments' : 'Start Segment';

        return isSame;
    }

    // /**
    //  *
    //  * @param {boolean} isSame
    //  */
    // set startEndCountySame(isSame){
    //     console.log(isSame);
    //
    //     // this.segmentPickerTo.
    // }
    //
    // get toRefPointLayerVisible(){
    //     return this.segmentPickerTo.layersVisible
    // }
}

nm.PickerCollection = PickerCollection;
export default PickerCollection;
