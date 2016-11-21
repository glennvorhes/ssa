"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 7/15/2016.
 */
var filterMmFlag_1 = require('../filters/filterMmFlag');
var mapPopup_1 = require('webmapsjs/dist/olHelpers/mapPopup');
var constants = require('../constants');
var _DeficiencyBase_1 = require('./_DeficiencyBase');
var custom_ol_1 = require('custom-ol');
/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
var mmFlagStyle = function (feature) {
    "use strict";
    var props = feature.getProperties();
    var txtFunc = function () {
        return new custom_ol_1.default.style.Text({
            text: props['mmId'],
            scale: 1.5,
            stroke: new custom_ol_1.default.style.Stroke({
                color: 'black',
                width: 2
            }),
            fill: new custom_ol_1.default.style.Fill({
                color: constants.mmFlagColor
            })
        });
    };
    if ((props['crashFlag'] == 'Y' && filterMmFlag_1.default.mmRateFlagOn) || props['kabrateflag'] == 'Y' && filterMmFlag_1.default.mmKabFlagOn) {
        return [new custom_ol_1.default.style.Style({
                stroke: new custom_ol_1.default.style.Stroke({
                    color: constants.mmFlagColor,
                    width: 6
                }),
                text: txtFunc()
            })];
    }
    else {
        return null;
    }
};
var MmFlags = (function (_super) {
    __extends(MmFlags, _super);
    function MmFlags() {
        _super.call(this, "Safety Flags", mmFlagStyle, 200, constants.mmFlagListId);
    }
    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     */
    MmFlags.prototype.init = function (m) {
        var _this = this;
        _super.prototype.init.call(this, m);
        filterMmFlag_1.default.addChangeCallback(function () {
            _this.deficiencyLayer.refresh();
        });
        mapPopup_1.default.addVectorPopup(this.deficiencyLayer, function (props) {
            return "MM ID: " + props['mmId'] + "<br/>Rate Flag: " + props['crashFlag'] + "<br/>KAB Flag: " + props['kabrateflag'];
        });
    };
    /**
     *
     * @param {Corridor} c - the corridor to be added
     */
    MmFlags.prototype.addCorridor = function (c) {
        var feats = c.layer.source.getFeatures();
        for (var _i = 0, feats_1 = feats; _i < feats_1.length; _i++) {
            var f = feats_1[_i];
            var props = f.getProperties();
            var triggerRateFlag = props['crashFlag'] == 'Y';
            var triggerKabFlag = props['kabrateflag'] == 'Y';
            if (triggerRateFlag || triggerKabFlag) {
                this.deficiencyLayer.source.addFeature(f);
                this.featureIndex++;
                f.setProperties({ mmId: 'MM' + this.featureIndex.toFixed() });
                var appendHtml = "<b>MM" + this.featureIndex.toFixed() + "</b>:&nbsp;";
                var flags = [];
                if (triggerRateFlag) {
                    flags.push('Crash Rate');
                }
                if (triggerKabFlag) {
                    flags.push('KAB');
                }
                appendHtml += flags.join(', ');
                this.$summaryList.append("<li " + constants.pdpDataAttr + "=\"" + props['pdpId'] + "\">" + appendHtml + "</li>");
            }
        }
    };
    return MmFlags;
}(_DeficiencyBase_1.default));
exports.MmFlags = MmFlags;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new MmFlags();
//# sourceMappingURL=mmFlags.js.map