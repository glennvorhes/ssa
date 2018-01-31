/**
 * Created by gavorhes on 7/15/2016.
 */
import filterMmFlag from '../filters/filterMmFlag';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import * as constants from '../constants';
import DeficiencyBase from './_DeficiencyBase';
import ol = require('custom-ol');


/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
const mmFlagStyle = (feature: ol.Feature): Array<ol.style.Style> => {
    "use strict";
    return null;

    // let props = feature.getProperties();
    //
    // let txtFunc = () => {
    //     return new ol.style.Text(
    //         {
    //             text: props['mmId'],
    //             scale: 1.5,
    //             stroke: new ol.style.Stroke({
    //                 color: 'black',
    //                 width: 2
    //             }),
    //             fill: new ol.style.Fill({
    //                 color: constants.mmFlagColor
    //             })
    //         }
    //     );
    //
    // };
    //
    //
    // if ((props['rateFlag'] >= 1 && filterMmFlag.mmRateFlagOn) || props['kabCrshFlag'] >= 1 && filterMmFlag.mmKabFlagOn) {
    //     return [new ol.style.Style({
    //         stroke: new ol.style.Stroke({
    //             color: constants.mmFlagColor,
    //             width: 6
    //         }),
    //         text: txtFunc()
    //     })];
    // } else {
    //     return null;
    // }
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

            let rates = [];

            if (props['rateFlag'] != null){
                rates.push(`Rate Flag: ${props['rateFlag'].toFixed(4)}`);
            }

            if (props['kabCrshFlag'] != null){
                rates.push(`KAB Flag: ${props['kabCrshFlag'].toFixed(4)}`);
            }

            return `MM ID: ${props['mmId']}<br/>${rates.join('<br>')}`;
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

            let triggerRateFlag = props['rateFlag'] >= 1;
            let triggerKabFlag =props['kabCrshFlag'] >= 1;

            if (props['rateFlag'] >= 1 || props['kabCrshFlag'] >= 1) {

                this.deficiencyLayer.source.addFeature(f);

                f.setProperties({mmId: `${props['pdpId']}`});
                let appendHtml = `<b>${props['pdpId']}</b>:&nbsp;`;
                let flags = [];
                if (triggerRateFlag) {
                    flags.push('Crash Rate');
                }
                if (triggerKabFlag) {
                    flags.push('KAB');
                }

                appendHtml += flags.join(', ');

                this._summaryListItems.push({
                    pdpId: props['pdpId'],
                    liText: `<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`}
                    );


                // this.$summaryList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);
            }
        }
    }

}


// export default new MmFlags();
