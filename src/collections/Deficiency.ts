/**
 * Created by gavorhes on 7/15/2016.
 */
import filterMmFlag from '../filters/filterMmFlag';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import * as constants from '../constants';
import DeficiencyBase from './_DeficiencyBase';
import ol = require('custom-ol');
import {keyValPairs} from 'webmapsjs/dist/util/objectHelpers';
import filterControllingCritera from '../filters/filterContollingCriteria';


let hasMmFlag = 'hasMmFlag';
let hasCc = 'hasCc';
let rateFlag = 'rateFlag';
let kabCrshFlag = 'kabCrshFlag';

interface mmProps {
    mmId?: string;
    pdpId?: number;
    rateFlag: number;
    kabCrshFlag: number
}

let txtFunc = (p: mmProps) => {
    return new ol.style.Text(
        {
            text: p.pdpId.toFixed(),
            scale: 1.5,
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'white'
            })
        }
    );
};

/**
 *
 * @param feature - the input feature
 * @returns return style or null
 */
const deficiencyStyle = (feature: ol.Feature): Array<ol.style.Style> => {
    "use strict";

    let props: mmProps = feature.getProperties() as mmProps;

    let returnStyles = [];


    let showCc = false;

    for (let cc of filterControllingCritera.allValues) {
        if (props[cc] && filterControllingCritera.valIsOn(cc)) {
            showCc = true;
            break;
        }
    }

    if (showCc) {
        returnStyles.push(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: constants.controllingCriteriaColor,
                width: 13
            }),
            text: txtFunc(props as mmProps)
        }));
    }

    if ((props.rateFlag >= 1 && filterMmFlag.mmRateFlagOn) || props.kabCrshFlag >= 1 && filterMmFlag.mmKabFlagOn) {
        returnStyles.push(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: constants.mmFlagColor,
                width: 5
            }),
            text: txtFunc(props as mmProps)
        }));
    }

    if (returnStyles.length > 0) {
        return returnStyles;
    } else {
        return null
    }

};


export class Deficiency extends DeficiencyBase {
    public metaList: string[] = [];
    public deficiencyList: string[] = [];

    constructor() {
        super("Deficiencies", deficiencyStyle, 200, constants.mmFlagListId);
    }

    /**
     * initialize with the map
     * @param  m - the ol map
     */
    init(m: ol.Map) {
        super.init(m);

        filterMmFlag.addChangeCallback(() => {
            this.deficiencyLayer.refresh();
        });

        filterControllingCritera.addChangeCallback(() => {
            this.deficiencyLayer.refresh();
        });

        mapPopup.addVectorPopup(this.deficiencyLayer, (props) => {
            // console.log(props);

            let returnHtml = `PDP ID: ${props['pdpId']}<br/>`;

            let rates = [];

            if (props['rateFlag'] != null) {
                rates.push(`Rate Flag: ${props['rateFlag'].toFixed(4)}`);
            }

            if (props['kabCrshFlag'] != null) {
                rates.push(`KAB Flag: ${props['kabCrshFlag'].toFixed(4)}`);
            }

            if (rates.length > 0) {
                returnHtml += 'Metamanager<ul>';
                for (let m of rates) {
                    returnHtml += `<li>${m}</li>`
                }
                returnHtml += '</ul>'
            }

            let ccs = [];

            for (let cc of keyValPairs(constants.controllingCriteriaProps)) {
                if (props[cc.key]) {
                    let newCc = `<li>`;
                    newCc += cc.value;

                    let subEls = (props[cc.key] as string).split('::');

                    newCc += '<ul>';

                    for (let s of subEls) {
                        if (!isNaN(parseInt(s)) || s.trim().length == 0) {
                            continue;
                        }
                        newCc += `<li>${s}</li>`;
                    }

                    newCc += '</ul>';

                    newCc += '</li>';
                    ccs.push(newCc)
                }
            }

            if (ccs.length > 0) {
                returnHtml += "Geometric Deficiencies<ul>";

                for (let c of ccs) {
                    returnHtml += c;
                }

                returnHtml += '</ul>'
            }
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

            let triggerRateFlag = props['rateFlag'] >= 1;
            let triggerKabFlag = props['kabCrshFlag'] >= 1;

            let deficiencyList = [];

            for (let f of keyValPairs(constants.controllingCriteriaProps)) {
                let ccProps = props[f.key];

                if (ccProps) {
                    deficiencyList.push(f.value)
                }
            }

            if (triggerRateFlag || triggerKabFlag || deficiencyList.length > 0) {
                this.deficiencyLayer.source.addFeature(f);
            }
        }
    }
}


export default new Deficiency();
