/**
 * Created by gavorhes on 7/15/2016.
 */
import filterMmFlag from '../filters/filterMmFlag';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import * as constants from '../constants';
import DeficiencyBase from './_DeficiencyBase';
import ol from 'custom-ol';


/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
const mmFlagStyle = (feature: ol.Feature): Array<ol.style.Style> => {
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

    if ((props['crashFlag'] == 'Y' && filterMmFlag.mmRateFlagOn) || props['kabrateflag'] == 'Y' && filterMmFlag.mmKabFlagOn) {
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



export class MmFlags extends DeficiencyBase {
    constructor() {
        super("Safety Flags", mmFlagStyle, 200, constants.mmFlagListId);
    }

    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     */
    init(m: ol.Map) {
        super.init(m);

        filterMmFlag.addChangeCallback(() => {
            this.deficiencyLayer.refresh();
        });

        mapPopup.addVectorPopup(this.deficiencyLayer, (props) => {
            return `MM ID: ${props['mmId']}<br/>Rate Flag: ${props['crashFlag']}<br/>KAB Flag: ${props['kabrateflag']}`;
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
            let triggerRateFlag = props['crashFlag'] == 'Y';
            let triggerKabFlag = props['kabrateflag'] == 'Y';

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
