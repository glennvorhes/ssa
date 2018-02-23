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
import * as styles from '../layerStyles'


let hasMmFlag = 'hasMmFlag';
let hasCc = 'hasCc';
let rateFlag = 'rateFlag';
let kabCrshFlag = 'kabCrshFlag';

export class Deficiency extends DeficiencyBase {
    public metaList: string[] = [];
    public deficiencyList: string[] = [];

    constructor() {
        super("Deficiencies", styles.deficiencyStyle, 200, constants.defListId);
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

                let appendHtml = `<span style="font-weight: bold; color: white">${props['pdpId']}</span>:&nbsp;`;

                let defs = [];

                if (triggerRateFlag && triggerKabFlag){
                    defs.push(`<span style="color: ${styles.mmBothColor}">KAB,&nbsp;Crash Rate</span>`);
                } else if (triggerRateFlag) {
                    defs.push(`<span style="color: ${styles.mmRateFlagColor}">Crash Rate</span>`);
                } else if (triggerKabFlag) {
                    defs.push(`<span style="color: ${styles.mmKabFlagColor}">KAB</span>`);
                }

                appendHtml += defs.join(' ');

                if (defs.length > 0){
                    appendHtml += ',&nbsp;';
                }

                if (deficiencyList.length > 0){
                    // console.log(deficiencyList);
                     appendHtml += `<span style="color: ${styles.controllingCriteriaColor}">` +
                         `${deficiencyList.join(',&nbsp;')}</span>`;
                }

                this._summaryListItems.push({
                        pdpId: props['pdpId'],
                        liText: `<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`
                    }
                );


                // this.$summaryList.append(`<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`);
            }


        }
    }
}


export default new Deficiency();
