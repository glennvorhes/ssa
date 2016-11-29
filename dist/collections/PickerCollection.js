/// <reference path="../../node_modules/@types/jqueryui/index.d.ts"/>
"use strict";
var SelectCounty_1 = require('../selectBox/SelectCounty');
var SelectHighway_1 = require('../selectBox/SelectHighway');
var SegmentPicker_1 = require('../selectBox/SegmentPicker');
var Corridor_1 = require('../corridor/Corridor');
var provide_1 = require('webmapsjs/dist/util/provide');
var lyrStyles = require('../layerStyles');
var mapPopup_1 = require('webmapsjs/dist/olHelpers/mapPopup');
var makeGuid_1 = require('webmapsjs/dist/util/makeGuid');
var LayerEsriMapServer_1 = require('webmapsjs/dist/layers/LayerEsriMapServer');
var $ = require("jquery");
require('jquery-ui');
var nm = provide_1.default('ssa');
var PickerCollection = (function () {
    /**
     *
     * @param {jQuery} parentDiv - container div
     * @param {ol.Map} theMap - the main map
     */
    function PickerCollection(parentDiv, theMap) {
        this._map = theMap;
        parentDiv.append('<div>' +
            '<input type="button" value="Add Corridor" class="btn btn-default picker-create-corridor">' +
            '<input type="button" value="Zoom to Extent" class="btn btn-default picker-zoom-extent">' +
            '</div>');
        this.$createCorridorButton = parentDiv.find('.picker-create-corridor');
        this.$zoomExtentButton = parentDiv.find('.picker-zoom-extent');
        var pickerGuid = makeGuid_1.default();
        parentDiv.append("<div id=\"" + pickerGuid + "\"></div>");
        this.$containerEl = $('#' + pickerGuid).addClass('picker-collection-container');
        this.$containerEl.append('<div class="picker-collection"><span class="corridor-picker-help" title="Show Help"></span></div>');
        this.$containerEl.append('<input type="button" value="Preview" class="btn btn-default picker-preview">');
        this.$containerEl.append('<input type="button" value="Add" class="btn btn-default picker-add" disabled="disabled">');
        this.$containerEl.append('<input type="button" value="Modify" class="btn btn-default picker-modify" disabled="disabled" style="display: none;">');
        this.$containerEl.append('<input type="button" value="Cancel" class="btn btn-default picker-cancel">');
        this.$innerContainer = this.$containerEl.find('.picker-collection');
        this._dummyCorridor = new Corridor_1.default(1, 1, '', '', 1, 1, 'h', -1, {
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
        this.countyStartSelect = new SelectCounty_1.default(this.$innerContainer, "Start County");
        this.countyEndSelect = new SelectCounty_1.default(this.$innerContainer, "End County");
        this.highwaySelect = new SelectHighway_1.default(this.$innerContainer);
        this._metamanagerSegmentsLayer = new LayerEsriMapServer_1.default('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer', {
            minZoom: 7,
            visible: false,
            name: 'Metamanager Segments',
            opacity: 0.4
        });
        this._map.addLayer(this._metamanagerSegmentsLayer.olLayer);
        this.segmentPickerFrom = new SegmentPicker_1.default(this, true);
        this.segmentPickerTo = new SegmentPicker_1.default(this, false);
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
    PickerCollection.prototype._addHandlers = function () {
        var _this = this;
        this.$createCorridorButton.click(function () {
            _this.startPicker();
            _this.$createCorridorButton.prop('disabled', true);
        });
        this.$zoomExtentButton.click(function () {
            var ext = _this.corridorCollection.fullExtent;
            if (ext) {
                _this._map.getView().fit(ext, _this._map.getSize());
            }
        });
        this.$btnPickerCancel.click(function () {
            _this.stopPicker();
        });
        this.$btnPickerPreview.click(function () {
            _this.previewCorridor();
        });
        this.$btnPickerAdd.click(function () {
            _this.addCorridor();
        });
        this.$btnPickerModify.click(function () {
            _this.modifyCorridor();
        });
        this.countyStartSelect.addChangeListener(function (v) {
            "use strict";
            _this.highwaySelect.setStartEndCounty(v, _this.countyEndSelect.selectedValue);
            _this.addModifyButtonEnabled = false;
            _this.segmentPickerTo.segmentLayer.visible = !_this.startEndCountySame;
        });
        this.countyEndSelect.addChangeListener(function (v) {
            "use strict";
            _this.highwaySelect.setStartEndCounty(_this.countyStartSelect.selectedValue, v);
            _this.addModifyButtonEnabled = false;
            _this.segmentPickerTo.segmentLayer.visible = !_this.startEndCountySame;
        });
        this.highwaySelect.addChangeListener(function (hwy) {
            "use strict";
            _this.segmentPickerFrom.setCountyAndRoute(_this.countyStartSelect.selectedValue, hwy);
            _this.segmentPickerTo.setCountyAndRoute(_this.countyEndSelect.selectedValue, hwy);
            _this.addModifyButtonEnabled = false;
        });
        this.segmentPickerFrom.addChangeListener(function () {
            _this.addModifyButtonEnabled = false;
        });
        this.segmentPickerTo.addChangeListener(function () {
            _this.addModifyButtonEnabled = false;
        });
    };
    /**
     * Configure the help dialog
     * @private
     */
    PickerCollection.prototype._helpDialogInit = function () {
        var _this = this;
        var helpInfo = 'Corridors are defined by selecting in sequence the start county, highway, and end county ';
        helpInfo += "The reference points are then populated and can be selected either by using the combo box or ";
        helpInfo += "by clicking a segment in the map and clicking select in the resulting popup ";
        helpInfo += "Corridors are defined visually in the pickers as the start segment (green) and end segment (red) ";
        helpInfo += "inclusive of the corridor extents";
        $('body').append("<div class=\"corridor-picker-help-dialog\" title=\"Corridor Selection Help\">" +
            ("<p style=\"text-align: justify\">" + helpInfo + "</p></div>"));
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
        this.$containerEl.find('.corridor-picker-help').click(function () {
            _this.helpDialog.dialog('open');
        });
    };
    PickerCollection.prototype.previewCorridor = function () {
        var _this = this;
        if (!this.segmentPickerFrom.selectedPdpId || !this.segmentPickerTo.selectedPdpId) {
            alert('Select From and To Reference Points');
            return;
        }
        this._map.removeLayer(this._dummyCorridor.layer.olLayer);
        this._map.removeLayer(this._dummyCorridor.nodeLayer.olLayer);
        this._dummyCorridor = new Corridor_1.default(this.segmentPickerFrom.selectedPdpId, this.segmentPickerTo.selectedPdpId, this.segmentPickerFrom.selectedText, this.segmentPickerTo.selectedText, this.countyStartSelect.selectedValue, this.countyEndSelect.selectedValue, this.highwaySelect.selectedText, this.highwaySelect.selectedValue, {
            cancelLoad: true,
            color: lyrStyles.corridorPreviewColor
        });
        this._dummyCorridor.layer.zIndex = 10;
        this._map.addLayer(this._dummyCorridor.layer.olLayer);
        this._map.addLayer(this._dummyCorridor.nodeLayer.olLayer);
        this._dummyCorridor.load(function (c) {
            _this._map.getView().fit(c.extent, _this._map.getSize());
            _this.addModifyButtonEnabled = true;
        });
    };
    /**
     * add a corridor
     */
    PickerCollection.prototype.addCorridor = function () {
        var newCorridor = this._dummyCorridor.clone();
        this.corridorCollection.addCorridorCreate(newCorridor);
        this.segmentPickerTo.segmentLayer.visible = !this.startEndCountySame;
        this.stopPicker();
    };
    PickerCollection.prototype.modifyCorridor = function () {
        this._modifyCorridor.updateCorridor(this._dummyCorridor);
        this.corridorCollection.refreshHtmlCreate();
        this.stopPicker();
    };
    /**
     * Populate the selections based on values from an existing corridor
     * @param {Corridor} [existingCor=undefined] existing corridor if in an edit operation
     */
    PickerCollection.prototype.startPicker = function (existingCor) {
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
            this._map.getView().fit(this._dummyCorridor.extent, this._map.getSize());
        }
        else {
            var $primCounty = $('#primaryCounty');
            var $primRoute = $('#primaryRdwyRteId');
            var primaryCounty = undefined;
            var primaryRouteId = undefined;
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
    };
    PickerCollection.prototype.stopPicker = function () {
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
        mapPopup_1.default.closePopup();
    };
    Object.defineProperty(PickerCollection.prototype, "addModifyButtonEnabled", {
        /**
         * Getter for if an add modify operation is happening {boolean}
         * @returns {boolean} - if the add or modify operation is happening
         */
        get: function () {
            return this._addModifyEnabled;
        },
        /**
         * Setter for if an add modify operation is happening {boolean}
         * @param {boolean} isEnabled - if enabled
         */
        set: function (isEnabled) {
            this._addModifyEnabled = isEnabled;
            this.$btnPickerAdd.prop('disabled', !this.addModifyButtonEnabled);
            this.$btnPickerModify.prop('disabled', !this.addModifyButtonEnabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickerCollection.prototype, "startEndCountySame", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            var isSame = this.countyStartSelect.selectedValue == this.countyEndSelect.selectedValue;
            this.segmentPickerFrom.segmentLayer.name = isSame ? 'Start/End Segments' : 'Start Segment';
            return isSame;
        },
        enumerable: true,
        configurable: true
    });
    return PickerCollection;
}());
nm.PickerCollection = PickerCollection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PickerCollection;
//# sourceMappingURL=PickerCollection.js.map