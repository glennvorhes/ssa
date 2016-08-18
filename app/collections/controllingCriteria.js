/**
 * Created by gavorhes on 7/15/2016.
 */
import filterControllingCritera from '../filters/filterContollingCriteria';
import mapPopup from 'webmapsjs/src/olHelpers/mapPopup';
import ol from 'webmapsjs/src/ol/ol';
import * as constants from '../constants';
import DeficiencyBase from './_DeficiencyBase';

const addRandomCcs = true;

/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
const ccStyle = (feature) => {
    "use strict";

    let props = feature.getProperties();


    let show = false;


    for (let cc of filterControllingCritera.allValues()){
        if (props[cc] && filterControllingCritera.valIsOn(cc)){
            show = true;
            break;
        }
    }


    let txtFunc = () => {
        return new ol.style.Text(
            {
                text: props['ccId'],
                scale: 1.5,
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: constants.controllingCriteriaColor
                })
            }
        );
    };

    // if ((props['rateFlag'] > 1 && filterMmFlag.mmRateFlagOn) || props['kabFlag'] > 1 && filterMmFlag.mmKabFlagOn) {
    if (show) {
        return [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: constants.controllingCriteriaColor,
                width: 6
            }),
            text: txtFunc()
        })];
    } else {
        return null;
    }
};



class ControllingCriteria extends DeficiencyBase {
    constructor() {
        super("Controlling Criteria", ccStyle, 201, constants.ccListId);
    }

    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     */
    init(m) {
        super.init(m);

        filterControllingCritera.addChangeCallback(() => {
            this.deficiencyLayer.refresh();
        });

        mapPopup.addVectorPopup(this.deficiencyLayer, (props) => {

            let returnHtml = 'Geometric Deficiencies';
            returnHtml += '<ul>';
            
            for (let cc of filterControllingCritera.allValues()){
                if (props[cc]){
                    returnHtml += `<li>${constants.contollingCriteriaLookup[cc]}</li>`;
                }
            }

            returnHtml += '</ul>';
            
            return returnHtml;
           
        });
    }

    /**
     *
     * @param {Corridor} c - the corridor to be added
     */
    addCorridor(c) {
        let feats = c.layer.source.getFeatures();


        for (let f of feats) {
            // f.setProperties()

            let props = f.getProperties();

            if (Math.random() > 0.85 && addRandomCcs) {
                this.deficiencyLayer.source.addFeature(f);

                this.featureIndex++;

                f.setProperties({ccId: 'CC' + this.featureIndex.toFixed()});

                let deficiencyList = [];

                for (let cc of filterControllingCritera.allValues()){

                    if (Math.random() > 0.85){
                        let tmp = {};
                        tmp[cc] = true;

                        f.setProperties(tmp);
                        deficiencyList.push(constants.contollingCriteriaLookup[cc]);
                    }
                }

                if (deficiencyList.length > 0){
                    let appendHtml = `<b>CC${this.featureIndex.toFixed()}</b>:&nbsp;`;
                    appendHtml += deficiencyList.join(', ');
                    this.$summaryList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);

                }
            }

                //             f.setProperties({mmId: 'MM' + this.featureIndex.toFixed()});
                // let appendHtml = `<b>MM${this.featureIndex.toFixed()}</b>:&nbsp;`;
                // let flags = [];
                // if (triggerRateFlag) {
                //     flags.push('Crash Rate');
                // }
                // if (triggerKabFlag) {
                //     flags.push('KAB');
                // }
                //
                // appendHtml += flags.join(', ');
                // $mmDeficiencyList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);

            // let props = f.getProperties();
            // let rate = props['rateFlag'];
            // let kab = props['kabFlag'];
            //
            // let triggerRateFlag = typeof rate == 'number' && rate > 1;
            // let triggerKabFlag = typeof kab == 'number' && kab > 1;
            //
            // if (triggerRateFlag || triggerKabFlag) {
            //     this.deficiencyLayer.source.addFeature(f);
            //     ccIndex++;
            //
            //     f.setProperties({mmId: 'MM' + mmFlagIndex.toFixed()});
            //     let appendHtml = `<b>MM${mmFlagIndex.toFixed()}</b>:&nbsp;`;
            //     let flags = [];
            //     if (triggerRateFlag) {
            //         flags.push('Crash Rate');
            //     }
            //     if (triggerKabFlag) {
            //         flags.push('KAB');
            //     }
            //
            //     appendHtml += flags.join(', ');
            //     $mmDeficiencyList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);
            // }
        }
    }

    //
    // afterLoad() {
    //     super.afterLoad();
    //
    //     let _this = this;
    //
    //     // $(`#${constants.mmFlagListId} li`).click(function () {
    //     //     let $this = $(this);
    //     //
    //     //     let theFeature = mmFlags.getFeatureById(parseInt($this.attr(constants.pdpDataAttr)));
    //     //
    //     //     _this.mainMap.getView().fit(theFeature.getGeometry().getExtent(), _this.mainMap.getSize());
    //     //     _this.mainMap.getView().setZoom(_this.mainMap.getView().getZoom() - 1);
    //     // });
    //
    // }
}


export default new ControllingCriteria();
