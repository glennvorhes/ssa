/**
 * Created by gavorhes on 7/15/2016.
 */
import filterControllingCritera from '../filters/filterContollingCriteria';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import * as constants from '../constants';
import DeficiencyBase from './_DeficiencyBase';
import ol = require('custom-ol');
import {keyValPairs} from 'webmapsjs/dist/util/objectHelpers'


/**
 *
 * @param {ol.Feature} feature - the input feature
 * @returns {Array<ol.style.Style>|null} - return style or null
 */
const ccStyle = (feature: ol.Feature): ol.style.Style[] => {
    "use strict";

    return null;

    // let props = feature.getProperties();
    //
    // let show = false;
    //
    // for (let cc of filterControllingCritera.allValues) {
    //     if (props[cc] && filterControllingCritera.valIsOn(cc)) {
    //         show = true;
    //         break;
    //     }
    // }
    //
    // let txtFunc = () => {
    //     return new ol.style.Text(
    //         {
    //             text: props['ccId'],
    //             scale: 1.5,
    //             stroke: new ol.style.Stroke({
    //                 color: 'black',
    //                 width: 2
    //             }),
    //             fill: new ol.style.Fill({
    //                 color: constants.controllingCriteriaColor
    //             })
    //         }
    //     );
    // };
    //
    // if (show) {
    //     return [new ol.style.Style({
    //         stroke: new ol.style.Stroke({
    //             color: constants.controllingCriteriaColor,
    //             width: 6
    //         }),
    //         text: txtFunc()
    //     })];
    // } else {
    //     return null;
    // }
};


export class ControllingCriteria extends DeficiencyBase {
    static propNames = ['ccDesignSpeed', 'ccLaneWidth', 'ccShoulderWidth', 'ccHorizontalCurve', 'ccSuperelevation',
        'ccMaximumGrade', 'ccStoppingSight', 'ccCrossSlope', 'ccVerticalClearance', 'ccDesignLoading'];

    constructor() {
        super("Geometric Deficiencies", ccStyle, 201, constants.ccListId);
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

            let returnHtml = '';
            returnHtml += '<ul>';

            for (let cc of keyValPairs(constants.controllingCriteriaProps)) {
                if (props[cc.key]) {
                    returnHtml += `<li>`;
                    returnHtml += cc.value;

                    let subEls = (props[cc.key] as string).split('::');

                    returnHtml += '<ul>';

                    for (let s of subEls) {
                        if (!isNaN(parseInt(s)) || s.trim().length == 0) {
                            continue;
                        }

                        returnHtml += `<li>${s}</li>`;
                    }

                    returnHtml += '</ul>';

                    returnHtml += '</li>';

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

            for (let f of keyValPairs(constants.controllingCriteriaProps)) {
                let ccProps = props[f.key];

                if (ccProps) {
                    deficiencyList.push(f.value)
                }
            }

            if (deficiencyList.length > 0) {
                this.deficiencyLayer.source.addFeature(f);

                f.setProperties({ccId: `${props['pdpId']}`});

                let appendHtml = `<b>${props['pdpId']}</b>:&nbsp;`;
                appendHtml += deficiencyList.join(', ');
                // this.$summaryList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);

                this._summaryListItems.push({
                        pdpId: props['pdpId'],
                        liText: `<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`
                    }
                );

            }

        }
    }

}


// export default new ControllingCriteria();
