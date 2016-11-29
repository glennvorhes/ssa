/**
 * Created by gavorhes on 5/13/2016.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SsaMapBase_1 = require('./SsaMapBase');
var quickMap_1 = require('webmapsjs/dist/olHelpers/quickMap');
var mapPopup_1 = require('webmapsjs/dist/olHelpers/mapPopup');
var provide_1 = require('webmapsjs/dist/util/provide');
var CorridorConfig_1 = require('../corridor/CorridorConfig');
var Corridor_1 = require('../corridor/Corridor');
var styles = require('../layerStyles');
var calcExtent = require('webmapsjs/dist/olHelpers/extentUtil');
var crashData_1 = require('../collections/crashData');
var mmFlags_1 = require('../collections/mmFlags');
var controllingCriteria_1 = require('../collections/controllingCriteria');
var constants = require('../constants');
var ajaxGetters_1 = require('../ajaxGetters');
var $ = require('jquery');
var nm = provide_1.default('ssa');
var mmPopupContentWithCrash = function (props) {
    "use strict";
    var returnHtml = styles.mmPopupContent(props);
    returnHtml += crashData_1.default.getCrashSummary(props['pdpId']);
    return returnHtml;
};
var SsaMapView = (function (_super) {
    __extends(SsaMapView, _super);
    /**
     *
     * @param {string} divId - container for the map
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     * @param {string} [infoAnchorId=ssa-corridor-info-anchor] - id of element after which to insert the info rows
     */
    function SsaMapView(divId, dataClass, infoAnchorId) {
        var _this = this;
        _super.call(this, divId);
        this._ssaId = parseInt($('#hidden-ssa-id').val());
        this._snap = parseInt($('#hidden-snapshot-id').val());
        /**
         * @type {ol.Map}
         */
        this.mainMap = quickMap_1.default({
            divId: this.mapId,
            minZoom: 6,
            zoom: 6,
            fullScreen: true
        });
        var summaryListHtml = '<div class="segment-index-summary">';
        summaryListHtml += "<h4 style=\"color: " + constants.mmFlagColor + "\">Metamanager Flags</h4>";
        summaryListHtml += "<ul id=\"" + constants.mmFlagListId + "\"></ul>";
        summaryListHtml += "<h4 style=\"color: " + constants.controllingCriteriaColor + "\">Controlling Criteria</h4>";
        summaryListHtml += "<ul id=\"" + constants.ccListId + "\"></ul>";
        summaryListHtml += '</div>';
        this.$mapDiv.append(summaryListHtml);
        /**
         * @type {MapPopupCls}
         */
        this.mainMapPopup = mapPopup_1.default;
        dataClass = typeof dataClass == 'string' ? dataClass : 'corridor-data';
        infoAnchorId = typeof infoAnchorId == 'string' ? infoAnchorId : 'ssa-corridor-info-anchor';
        dataClass = '.' + dataClass;
        $(this.mainMap.getTargetElement()).append('<div class="crashes-loaded-msg">Crashes Loaded</div>');
        /**
         *
         * @type {Array<CorridorConfig>}
         */
        var corridorConfigs = [];
        /**
         *
         * @type {Array<Corridor>}
         */
        this._corridorArray = [];
        // parse the data from the hidden input elements
        $(dataClass).each(function (n, el) {
            corridorConfigs.push(new CorridorConfig_1.default(el));
        });
        this.createdCorridorsLength = corridorConfigs.length;
        this.loadedCorridorsLength = 0;
        var returnLookup = {};
        var returnArr = [];
        ajaxGetters_1.default.getCcGeom(this._ssaId, this._snap, function (d) {
            for (var _i = 0, _a = d['features']; _i < _a.length; _i++) {
                var f = _a[_i];
                var corId = f['properties']['corridorId'].toFixed();
                if (!returnLookup[corId]) {
                    returnArr.push(corId);
                    returnLookup[corId] = { crs: d['crs'], type: d['type'], features: [] };
                }
                returnLookup[corId].features.push(f);
            }
            var outHtml = '';
            for (var i = 0; i < returnArr.length; i++) {
                var conf = corridorConfigs[i];
                outHtml += conf.bootstrapHtml(i);
                var corridor = new Corridor_1.default(conf.startPdp, conf.endPdp, conf.startRp, conf.endRp, conf.startCounty, conf.endCounty, conf.hgwy, conf.routeId, {
                    color: 'black',
                    jsonFeatures: returnLookup[i.toFixed()],
                });
                mmFlags_1.default.addCorridor(corridor);
                controllingCriteria_1.default.addCorridor(corridor);
                _this._corridorArray.push(corridor);
                _this.mainMap.addLayer(corridor.olLayer);
                _this.mainMap.addLayer(corridor.nodeLayer.olLayer);
                _this.mainMapPopup.addVectorPopup(corridor.layer, mmPopupContentWithCrash);
            }
            _this._afterCorridorLoad();
            $('#' + infoAnchorId).after(outHtml);
        });
        mmFlags_1.default.init(this.mainMap);
        controllingCriteria_1.default.init(this.mainMap);
    }
    SsaMapView.prototype._afterCorridorLoad = function () {
        calcExtent.fitToMap(this._corridorArray, this.mainMap);
        crashData_1.default.init(this.mainMap, this._ssaId, this._snap);
        mmFlags_1.default.afterLoad();
        controllingCriteria_1.default.afterLoad();
    };
    return SsaMapView;
}(SsaMapBase_1.default));
exports.SsaMapView = SsaMapView;
nm.SsaMapView = SsaMapView;
window['SsaMapView'] = SsaMapView;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SsaMapView;
//# sourceMappingURL=SsaMapView.js.map