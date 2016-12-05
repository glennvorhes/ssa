/**
 * Created by gavorhes on 7/15/2016.
 */
import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import filterMmFlag from '../filters/filterMmFlag';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';

import SortedFeatures from 'webmapsjs/dist/olHelpers/SortedFeatures';
import * as constants from '../constants';
import ol from 'custom-ol';
import $ = require('jquery');


class DeficiencyBase {
    _map: ol.Map;
    deficiencyLayer: LayerBaseVectorGeoJson;
    _sortedFeatures: SortedFeatures;

    $summaryList: JQuery;
    _summaryListId: string;

    /**
     *
     * @param {string} layerName - layer name
     * @param {function|object} layerStyle - layer style
     * @param {number} z - z index
     * @param {string} summaryListId - summaryListId
     */
    constructor(layerName: string,
                layerStyle: ol.style.Style|Array<ol.style.Style>|ol.StyleFunction,
                z: number,
                summaryListId: string) {
        this.deficiencyLayer = new LayerBaseVectorGeoJson('', {
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
    init(m: ol.Map) {
        this._map = m;
        m.addLayer(this.deficiencyLayer.olLayer);
        this.$summaryList = $(`#${this._summaryListId}`);
    }

    /**
     *
     * @param {Corridor} c - the corridor to be added
     * @abstract
     */
    addCorridor(c) {
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
    }


    /**
     *
     * @param pdpId
     * @returns {ol.Feature|undefined}
     */
    getFeatureById(pdpId) {
        return this._sortedFeatures.getFeature(pdpId);
    }

    /**
     * @abstract
     */
    afterLoad() {
        this._sortedFeatures = new SortedFeatures(this.deficiencyLayer.features, 'pdpId');

        let _this = this;

        this.$summaryList.find('li').click(function () {
            let $this = $(this);

            let theFeature = _this.getFeatureById(parseInt($this.attr(constants.pdpDataAttr)));

            _this._map.getView().fit(theFeature.getGeometry().getExtent(), _this._map.getSize());
            _this._map.getView().setZoom(_this._map.getView().getZoom() - 1);
        });


    }


}


export default DeficiencyBase;
