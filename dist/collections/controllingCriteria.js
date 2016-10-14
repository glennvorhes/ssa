"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 7/15/2016.
 */
var filterContollingCriteria_1 = require('../filters/filterContollingCriteria');
var mapPopup_1 = require('webmapsjs/dist/olHelpers/mapPopup');
var constants = require('../constants');
var _DeficiencyBase_1 = require('./_DeficiencyBase');
var custom_ol_1 = require('custom-ol');
var addRandomCcs = true;
/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
var ccStyle = function (feature) {
    "use strict";
    var props = feature.getProperties();
    var show = false;
    for (var _i = 0, _a = filterContollingCriteria_1.default.allValues; _i < _a.length; _i++) {
        var cc = _a[_i];
        if (props[cc] && filterContollingCriteria_1.default.valIsOn(cc)) {
            show = true;
            break;
        }
    }
    var txtFunc = function () {
        return new custom_ol_1.default.style.Text({
            text: props['ccId'],
            scale: 1.5,
            stroke: new custom_ol_1.default.style.Stroke({
                color: 'black',
                width: 2
            }),
            fill: new custom_ol_1.default.style.Fill({
                color: constants.controllingCriteriaColor
            })
        });
    };
    // if ((props['rateFlag'] > 1 && filterMmFlag.mmRateFlagOn) || props['kabFlag'] > 1 && filterMmFlag.mmKabFlagOn) {
    if (show) {
        return [new custom_ol_1.default.style.Style({
                stroke: new custom_ol_1.default.style.Stroke({
                    color: constants.controllingCriteriaColor,
                    width: 6
                }),
                text: txtFunc()
            })];
    }
    else {
        return null;
    }
};
var ControllingCriteria = (function (_super) {
    __extends(ControllingCriteria, _super);
    function ControllingCriteria() {
        _super.call(this, "Controlling Criteria", ccStyle, 201, constants.ccListId);
    }
    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     */
    ControllingCriteria.prototype.init = function (m) {
        var _this = this;
        _super.prototype.init.call(this, m);
        filterContollingCriteria_1.default.addChangeCallback(function () {
            _this.deficiencyLayer.refresh();
        });
        mapPopup_1.default.addVectorPopup(this.deficiencyLayer, function (props) {
            var returnHtml = 'Geometric Deficiencies';
            returnHtml += '<ul>';
            for (var _i = 0, _a = filterContollingCriteria_1.default.allValues; _i < _a.length; _i++) {
                var cc = _a[_i];
                if (props[cc]) {
                    returnHtml += "<li>" + constants.contollingCriteriaLookup[cc] + "</li>";
                }
            }
            returnHtml += '</ul>';
            return returnHtml;
        });
    };
    /**
     *
     * @param {Corridor} c - the corridor to be added
     */
    ControllingCriteria.prototype.addCorridor = function (c) {
        var feats = c.layer.source.getFeatures();
        for (var _i = 0, feats_1 = feats; _i < feats_1.length; _i++) {
            var f = feats_1[_i];
            // f.setProperties()
            var props = f.getProperties();
            if (Math.random() > 0.85 && addRandomCcs) {
                this.deficiencyLayer.source.addFeature(f);
                this.featureIndex++;
                f.setProperties({ ccId: 'CC' + this.featureIndex.toFixed() });
                var deficiencyList = [];
                for (var _a = 0, _b = filterContollingCriteria_1.default.allValues; _a < _b.length; _a++) {
                    var cc = _b[_a];
                    if (Math.random() > 0.85) {
                        var tmp = {};
                        tmp[cc] = true;
                        f.setProperties(tmp);
                        deficiencyList.push(constants.contollingCriteriaLookup[cc]);
                    }
                }
                if (deficiencyList.length > 0) {
                    var appendHtml = "<b>CC" + this.featureIndex.toFixed() + "</b>:&nbsp;";
                    appendHtml += deficiencyList.join(', ');
                    this.$summaryList.append("<li " + constants.pdpDataAttr + "=\"" + props['pdpId'] + "\">" + appendHtml + "</li>");
                }
            }
        }
    };
    return ControllingCriteria;
}(_DeficiencyBase_1.default));
exports.ControllingCriteria = ControllingCriteria;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new ControllingCriteria();
//# sourceMappingURL=controllingCriteria.js.map