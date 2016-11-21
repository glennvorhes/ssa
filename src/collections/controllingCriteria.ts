/**
 * Created by gavorhes on 7/15/2016.
 */
import filterControllingCritera from '../filters/filterContollingCriteria';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import * as constants from '../constants';
import DeficiencyBase from './_DeficiencyBase';
import ol from 'custom-ol';
import {keyValPairs} from 'webmapsjs/dist/util/objectHelpers'


/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
const ccStyle = (feature) => {
    "use strict";

    let props = feature.getProperties();


    let show = false;


    for (let cc of filterControllingCritera._allValues){
        if (props[cc] && filterControllingCritera.valIsOn(cc)){
            show = true;
            break;
        }
    }

    show = true;


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



export class ControllingCriteria extends DeficiencyBase {
    static propNames = ['ccDesignSpeed', 'ccLaneWidth', 'ccShoulderWidth', 'ccHorizontalCurve', 'ccSuperelevation',
        'ccMaximumGrade', 'ccStoppingSight', 'ccCrossSlope', 'ccVerticalClearance', 'ccDesignLoading'];

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
            
            for (let cc of keyValPairs(constants.controllingCriteriaProps)){
                if (props[cc.key]){
                    returnHtml += `<li>${cc.value}</li>`;
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
            let props = f.getProperties();


            let deficiencyList = [];

            for (let f of keyValPairs(constants.controllingCriteriaProps)){
                let ccProps = props[f.key];

                if (ccProps) {
                    deficiencyList.push(f.value)
                }
            }

            if (deficiencyList.length > 0) {
                this.deficiencyLayer.source.addFeature(f);

                this.featureIndex++;

                f.setProperties({ccId: 'CC' + this.featureIndex.toFixed()});


                let appendHtml = `<b>CC${this.featureIndex.toFixed()}</b>:&nbsp;`;
                appendHtml += deficiencyList.join(', ');
                this.$summaryList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);

            }

        }
    }

}


export default new ControllingCriteria();