/**
 * Created by gavorhes on 5/13/2016.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provide_1 = require('webmapsjs/dist/util/provide');
var SortedFeatures_1 = require('webmapsjs/dist/olHelpers/SortedFeatures');
var LayerBaseVectorGeoJson_1 = require('webmapsjs/dist/layers/LayerBaseVectorGeoJson');
var mapPopup_1 = require('webmapsjs/dist/olHelpers/mapPopup');
var SelectBoxBase_1 = require('webmapsjs/dist/domUtil/SelectBoxBase');
var ajaxGetters_1 = require('../ajaxGetters');
var layerStyles = require('../layerStyles');
var custom_ol_1 = require('custom-ol');
var $ = require('jquery');
var nm = provide_1.default('ssa.select');
var SegmentPicker = (function (_super) {
    __extends(SegmentPicker, _super);
    /**
     *
     * @param {PickerCollection} pickerColl - picker collection
     * @param {boolean} isFrom - is this the start (from) picker
     */
    function SegmentPicker(pickerColl, isFrom) {
        var _this = this;
        function contentGen(guid) {
            var outString = '';
            outString += "<div style=\"position: relative;\" class=\"select-picker-map-container\">";
            outString += "<select id=\"" + guid + "\"></select>";
            outString += "</div>";
            return outString;
        }
        _super.call(this, pickerColl.$innerContainer, isFrom ? 'Ref. Point #1' : 'Ref. Point #2', contentGen);
        this._isFrom = isFrom;
        this._pickerColl = pickerColl;
        /**
         *
         * @type {number|undefined}
         * @private
         */
        this._selectedPdpId = undefined;
        this.addChangeListener(function (v) {
            _this.selectedPdpId = parseInt(v);
        });
        this._box.keyup(function () {
            if (_this.selectedPdpId != parseInt(_this.selectedValue.toString())) {
                _this._box.trigger('change');
            }
        });
        /**
         *
         * @type {SortedFeatures|undefined}
         * @private
         */
        this._sortedFeatures = undefined;
        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @protected
         */
        this._segmentLayer = new LayerBaseVectorGeoJson_1.default('', {
            minZoom: 6,
            name: this._isFrom ? 'Start Segment' : 'End Segment',
            transform: { dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857' },
            style: layerStyles.segmentLayer,
            visible: false
        });
        this._segNodeLayer = new LayerBaseVectorGeoJson_1.default('', {
            style: layerStyles.segNodeStyle,
            minZoom: 11,
            visible: false
        });
        // /**
        //  *
        //  * @type {ol.layer.Vector}
        //  * @private
        //  */
        // this._segmentSelectionLayer = new ol.layer.Vector({
        //     source: new ol.source.Vector(),
        //     style: this._isFrom ? layerStyles.segmentSelectionStyleFrom : layerStyles.segmentSelectionStyleTo,
        //     zIndex: 100,
        //     visible: false
        // });
        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @private
         */
        this._segmentSelectionLayer = new LayerBaseVectorGeoJson_1.default('', {
            style: new custom_ol_1.default.style.Style({
                stroke: new custom_ol_1.default.style.Stroke({
                    color: this._isFrom ? layerStyles.fromSelectionColor : layerStyles.toSelectionColor,
                    width: 8
                })
            }),
            minZoom: 6,
            visible: false,
            zIndex: this._isFrom ? 100 : 101
        });
        this._selectBtnClass = this._isFrom ? "select-seg-btn-from" : "select-seg-btn-to";
        this._selectBtnClassTo = 'select-seg-btn-to';
        mapPopup_1.default.addVectorPopup(this._segmentLayer, function (props) {
            var returnHtml = '<table class="mm-popup-table">';
            returnHtml += "<tr><td>PdpId</td><td>" + props['pdpId'] + "</td>;";
            returnHtml += "<td rowspan=\"5\">";
            if (_this._pickerColl.startEndCountySame) {
                returnHtml += "<input type=\"button\" id='" + props['pdpId'] + "' class=\"" + _this._selectBtnClass + "\" value=\"Select Start\"/>";
                returnHtml += "<input type=\"button\" id='" + props['pdpId'] + "' class=\"" + _this._selectBtnClassTo + "\" value=\"Select End\"/>";
            }
            else {
                returnHtml += "<input type=\"button\" id='" + props['pdpId'] + "' class=\"" + _this._selectBtnClass + "\" value=\"Select\"/>";
            }
            returnHtml += "</td></tr>";
            returnHtml += "<tr><td>Hwy</td><td>" + props['hwyDir'] + "</td></tr>";
            returnHtml += "<tr><td>DivUnd</td><td>" + props['divUnd'] + "</td></tr>";
            returnHtml += "<tr><td>From</td><td>" + props['pdpFrom'] + "</td></tr>";
            returnHtml += "<tr><td>To</td><td>" + props['pdpTo'] + "</td></tr>";
            returnHtml += '</table>';
            return returnHtml;
        });
        // add the popup change function to find the select button
        mapPopup_1.default.addPopupChangedFunction(function () {
            var selectButton = $("." + _this._selectBtnClass);
            if (selectButton.length > 0) {
                var __this_1 = _this;
                selectButton.click(function () {
                    __this_1.selectedPdpId = this['id'];
                });
            }
        });
        this._enabled = false;
        this._layersVisible = false;
    }
    /**
     * @param {Array<object>} arr - array of returned objects, implementation defined in derived classes
     */
    SegmentPicker.prototype._processAjaxResult = function (arr) {
        var _this = this;
        arr.sort(function (a, b) {
            var c = _this._isFrom ? a['properties']['pdpFrom'] : a['properties']['pdpTo'];
            var d = _this._isFrom ? b['properties']['pdpFrom'] : b['properties']['pdpTo'];
            if (c == d) {
                return 0;
            }
            return c < d ? -1 : 1;
        });
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var feat = arr_1[_i];
            var props = feat['properties'];
            if (this._isFrom) {
                this._box.append("<option value=\"" + props['pdpId'] + "\">" + props['pdpFrom'] + "</option>");
            }
            else {
                this._box.append("<option value=\"" + props['pdpId'] + "\">" + props['pdpTo'] + "</option>");
            }
        }
    };
    /**
     *
     * @param {string|number} county - county id as string or number
     * @param {string|number|null} rteId - routeId
     * @param {number|undefined} [pdpId=undefined] - the pdp id to be set on load
     */
    SegmentPicker.prototype.setCountyAndRoute = function (county, rteId, pdpId) {
        var _this = this;
        pdpId = typeof pdpId == 'number' ? pdpId : undefined;
        this.selectedPdpId = undefined;
        this._box.html('');
        this._box.addClass('refresh').removeClass('refresh');
        if (mapPopup_1.default) {
            mapPopup_1.default.closePopup();
        }
        if (typeof county == 'string') {
            county = parseInt(county);
        }
        if (rteId == null) {
            this.enabled = false;
            return;
        }
        if (typeof rteId == 'string') {
            rteId = parseInt(rteId);
        }
        ajaxGetters_1.default.getSegments(county, rteId, function (d) {
            _this._segmentLayer.clear();
            _this._segNodeLayer.clear();
            _this._processAjaxResult(d['features']);
            if (d['features'].length > 0) {
                _this.enabled = true;
                _this._segmentLayer.addFeatures(d);
                var feats = _this._segmentLayer.source.getFeatures();
                _this._sortedFeatures = new SortedFeatures_1.default(feats, 'pdpId');
                _this._setExtent();
                if (typeof pdpId == 'number') {
                    // this._box.val(pdpId.toFixed());
                    _this.selectedPdpId = pdpId;
                }
                else {
                    _this._box.trigger('change');
                }
                for (var i = 0; i < feats.length; i++) {
                    var coords = feats[i].getGeometry()['getCoordinates']();
                    if (coords.length > 0) {
                        var startPoint = new custom_ol_1.default.geom.Point(coords[0]);
                        var endPoint = new custom_ol_1.default.geom.Point(coords[coords.length - 1]);
                        _this._segNodeLayer.source.addFeature(new custom_ol_1.default.Feature(startPoint));
                        _this._segNodeLayer.source.addFeature(new custom_ol_1.default.Feature(endPoint));
                    }
                }
            }
            else {
                _this.enabled = false;
            }
        });
    };
    SegmentPicker.prototype._setExtent = function () {
    };
    Object.defineProperty(SegmentPicker.prototype, "enabled", {
        /**
         * @returns {boolean} if enabled
         */
        get: function () {
            return this._enabled;
        },
        /**
         *
         * @param {boolean} isEnabled - is enabled
         * @private
         */
        set: function (isEnabled) {
            this._enabled = isEnabled;
            this._box.prop('disabled', !isEnabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentPicker.prototype, "layersVisible", {
        get: function () {
            return this._layersVisible;
        },
        set: function (lyrsVisible) {
            this._layersVisible = lyrsVisible;
            if (this._isFrom) {
                this.segmentLayer.visible = this.layersVisible;
                this._segNodeLayer.visible = this.layersVisible;
            }
            else {
                this.segmentLayer.visible = this.layersVisible && !this._pickerColl.startEndCountySame;
                this._segNodeLayer.visible = this.layersVisible && !this._pickerColl.startEndCountySame;
            }
            this.selectionLayer.visible = this.layersVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentPicker.prototype, "selectedPdpId", {
        /**
         *
         * @returns {number|undefined} selected id
         */
        get: function () {
            return this._selectedPdpId;
        },
        /**
         * set the currently selected pdp id
         * @param {number|undefined} newId - new selected id
         */
        set: function (newId) {
            if (mapPopup_1.default) {
                mapPopup_1.default.closePopup();
            }
            if (typeof newId == 'string') {
                newId = parseInt(newId);
            }
            if (newId == this._selectedPdpId) {
                return;
            }
            this._selectedPdpId = newId;
            this.selectionLayer.source.clear();
            if (this._selectedPdpId != undefined) {
                this._box.val(this.selectedPdpId);
                var selectedFeature = this._sortedFeatures.getFeature(this.selectedPdpId);
                this.selectionLayer.source.addFeature(selectedFeature);
            }
        },
        enumerable: true,
        configurable: true
    });
    SegmentPicker.prototype.clear = function () {
        this._box.html('');
        this.selectedPdpId = undefined;
    };
    Object.defineProperty(SegmentPicker.prototype, "segmentLayer", {
        /**
         * get the segment layer with the mm segments in the county and route id
         * @returns {LayerBaseVectorGeoJson} - the segment layer
         */
        get: function () {
            return this._segmentLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentPicker.prototype, "selectionLayer", {
        /**
         * get the selection hayer
         * @returns {LayerBaseVectorGeoJson} the selection layer for this picker
         */
        get: function () {
            return this._segmentSelectionLayer;
        },
        enumerable: true,
        configurable: true
    });
    return SegmentPicker;
}(SelectBoxBase_1.default));
exports.SegmentPicker = SegmentPicker;
nm.SegmentPicker = SegmentPicker;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SegmentPicker;
//# sourceMappingURL=SegmentPicker.js.map