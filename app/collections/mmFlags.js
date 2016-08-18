/**
 * Created by gavorhes on 7/15/2016.
 */
import LayerBaseVectorGeoJson from 'webmapsjs/src/layers/LayerBaseVectorGeoJson';
import filterMmFlag from '../filters/filterMmFlag';
import mapPopup from 'webmapsjs/src/olHelpers/mapPopup';
import ol from 'webmapsjs/src/ol/ol';
import $ from 'webmapsjs/src/jquery/jquery';
import SortedFeatures from 'webmapsjs/src/olHelpers/SortedFeatures';
import * as constants from '../constants';


/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
const mmFlagStyle = (feature) => {
    "use strict";

    let props = feature.getProperties();


    let txtFunc = () => {
        let txt = new ol.style.Text(
            {
                text: props['mmId'],
                scale: 1.5,
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: constants.mmFlagColor
                })
            }
        );

        return txt;
    };

    if ((props['rateFlag'] > 1 && filterMmFlag.mmRateFlagOn) || props['kabFlag'] > 1 && filterMmFlag.mmKabFlagOn) {
        return [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: constants.mmFlagColor,
                width: 6
            }),
            text: txtFunc()
        })];
    } else {
        return null;
    }
};

let mmFlagIndex = 0;


class MmFlags {
    constructor() {
        this.flagLayer = new LayerBaseVectorGeoJson('', {
            zIndex: 6,
            style: mmFlagStyle,
            name: "Safety Flags"
        });

        /**
         *
         * @type {SortedFeatures|undefined}
         * @private
         */
        this._sortedFeatures = undefined;

    }

    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     */
    init(m) {
        return;
        m.addLayer(this.flagLayer.olLayer);

        filterMmFlag.addChangeCallback(() => {
            this.flagLayer.refresh();
        });

        mapPopup.addVectorPopup(this.flagLayer, (props) => {
            return "MM ID: " + props['mmId'] + '<br/>' + "Rate Flag: " + props['rateFlag'].toFixed(3) + '<br/>' +
                "KAB Flag: " + props['kabFlag'].toFixed(3);
        });
    }

    /**
     *
     * @param {Corridor} c - the corridor to be added
     */
    addCorridor(c) {
        let feats = c.layer.source.getFeatures();

        let $mmDeficiencyList = $(`#${constants.mmFlagListId}`);

        for (let f of feats) {
            // f.setProperties()
            let props = f.getProperties();
            let rate = props['rateFlag'];
            let kab = props['kabFlag'];

            let triggerRateFlag = typeof rate == 'number' && rate > 1;
            let triggerKabFlag = typeof kab == 'number' && kab > 1;

            if (triggerRateFlag || triggerKabFlag) {
                this.flagLayer.source.addFeature(f);
                mmFlagIndex++;

                f.setProperties({mmId: 'MM' + mmFlagIndex.toFixed()});
                let appendHtml = `<b>MM${mmFlagIndex.toFixed()}</b>:&nbsp;`;
                let flags = [];
                if (triggerRateFlag) {
                    flags.push('Crash Rate');
                }
                if (triggerKabFlag) {
                    flags.push('KAB');
                }

                appendHtml += flags.join(', ');
                $mmDeficiencyList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);
            }
        }
    }

    sortFeatures() {
        this._sortedFeatures = new SortedFeatures(this.flagLayer.features, 'pdpId');


    }

    /**
     * 
     * @param pdpId
     * @returns {ol.Feature|undefined}
     */
    getFeatureById(pdpId){
        return this._sortedFeatures.getFeature(pdpId);
    }
}


export default new MmFlags();
