/**
 * Created by gavorhes on 7/15/2016.
 */
import filterMmFlag from '../filters/filterMmFlag';
import mapPopup from 'webmapsjs/src/olHelpers/mapPopup';
import ol from 'webmapsjs/src/ol/ol';
import * as constants from '../constants';
import DeficiencyBase from './_DeficiencyBase';


/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
const mmFlagStyle = (feature) => {
    "use strict";

    let props = feature.getProperties();


    let txtFunc = () => {
        return new ol.style.Text(
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



class MmFlags extends DeficiencyBase {
    constructor() {
        super("Safety Flags", mmFlagStyle, 200, constants.mmFlagListId);
    }

    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     */
    init(m) {
        super.init(m);

        filterMmFlag.addChangeCallback(() => {
            this.deficiencyLayer.refresh();
        });

        mapPopup.addVectorPopup(this.deficiencyLayer, (props) => {
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


        for (let f of feats) {
            let props = f.getProperties();
            let rate = props['rateFlag'];
            let kab = props['kabFlag'];

            let triggerRateFlag = typeof rate == 'number' && rate > 1;
            let triggerKabFlag = typeof kab == 'number' && kab > 1;

            if (triggerRateFlag || triggerKabFlag) {
                this.deficiencyLayer.source.addFeature(f);
                
                this.featureIndex++;

                f.setProperties({mmId: 'MM' + this.featureIndex.toFixed()});
                let appendHtml = `<b>MM${this.featureIndex.toFixed()}</b>:&nbsp;`;
                let flags = [];
                if (triggerRateFlag) {
                    flags.push('Crash Rate');
                }
                if (triggerKabFlag) {
                    flags.push('KAB');
                }

                appendHtml += flags.join(', ');
                this.$summaryList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);
            }
        }
    }

}


export default new MmFlags();
