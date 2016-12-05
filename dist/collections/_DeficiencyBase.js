"use strict";
/**
 * Created by gavorhes on 7/15/2016.
 */
var LayerBaseVectorGeoJson_1 = require('webmapsjs/dist/layers/LayerBaseVectorGeoJson');
var SortedFeatures_1 = require('webmapsjs/dist/olHelpers/SortedFeatures');
var constants = require('../constants');
var $ = require('jquery');
var DeficiencyBase = (function () {
    /**
     *
     * @param {string} layerName - layer name
     * @param {function|object} layerStyle - layer style
     * @param {number} z - z index
     * @param {string} summaryListId - summaryListId
     */
    function DeficiencyBase(layerName, layerStyle, z, summaryListId) {
        this.deficiencyLayer = new LayerBaseVectorGeoJson_1.default('', {
            zIndex: z,
            name: layerName
        });
        this.deficiencyLayer.style = layerStyle;
        /**
         *
         * @type {SortedFeatures|undefined}
         * @private
         */
        this._sortedFeatures = undefined;
        /**
         *
         * @type {ol.Map|undefined}
         * @private
         */
        this._map = undefined;
        this._summaryListId = summaryListId;
        /**
         *
         * @type {jQuery|undefined}
         * @private
         */
        this.$summaryList = undefined;
    }
    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     * @abstract
     */
    DeficiencyBase.prototype.init = function (m) {
        this._map = m;
        m.addLayer(this.deficiencyLayer.olLayer);
        this.$summaryList = $("#" + this._summaryListId);
    };
    /**
     *
     * @param {Corridor} c - the corridor to be added
     * @abstract
     */
    DeficiencyBase.prototype.addCorridor = function (c) {
        // let feats = c.layer.source.getFeatures();
        //
        // let $mmDeficiencyList = $(`#${constants.mmFlagListId}`);
        //
        // for (let f of feats) {
        //     // f.setProperties()
        //     let props = f.getProperties();
        //     let rate = props['rateFlag'];
        //     let kab = props['kabFlag'];
        //
        //     let triggerRateFlag = typeof rate == 'number' && rate > 1;
        //     let triggerKabFlag = typeof kab == 'number' && kab > 1;
        //
        //     if (triggerRateFlag || triggerKabFlag) {
        //         this.deficiencyLayer.source.addFeature(f);
        //         mmFlagIndex++;
        //
        //         f.setProperties({mmId: 'MM' + mmFlagIndex.toFixed()});
        //         let appendHtml = `<b>MM${mmFlagIndex.toFixed()}</b>:&nbsp;`;
        //         let flags = [];
        //         if (triggerRateFlag) {
        //             flags.push('Crash Rate');
        //         }
        //         if (triggerKabFlag) {
        //             flags.push('KAB');
        //         }
        //
        //         appendHtml += flags.join(', ');
        //         $mmDeficiencyList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);
        //     }
        // }
    };
    /**
     *
     * @param pdpId
     * @returns {ol.Feature|undefined}
     */
    DeficiencyBase.prototype.getFeatureById = function (pdpId) {
        return this._sortedFeatures.getFeature(pdpId);
    };
    /**
     * @abstract
     */
    DeficiencyBase.prototype.afterLoad = function () {
        this._sortedFeatures = new SortedFeatures_1.default(this.deficiencyLayer.features, 'pdpId');
        var _this = this;
        this.$summaryList.find('li').click(function () {
            var $this = $(this);
            var theFeature = _this.getFeatureById(parseInt($this.attr(constants.pdpDataAttr)));
            _this._map.getView().fit(theFeature.getGeometry().getExtent(), _this._map.getSize());
            _this._map.getView().setZoom(_this._map.getView().getZoom() - 1);
        });
    };
    return DeficiencyBase;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeficiencyBase;
//# sourceMappingURL=_DeficiencyBase.js.map