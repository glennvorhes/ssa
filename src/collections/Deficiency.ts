/**
 * Created by gavorhes on 7/15/2016.
 */
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import * as constants from '../constants';
import ol = require('custom-ol');
import {keyValPairs} from 'webmapsjs/dist/util/objectHelpers';
import filterControllingCritera from '../filters/filterContollingCriteria';
import filterMmFlag from '../filters/filterMmFlag';

import * as styles from '../layerStyles'
import SortedFeatures from 'webmapsjs/dist/olHelpers/SortedFeatures';
import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';

let hasMmFlag = 'hasMmFlag';
let hasCc = 'hasCc';
let rateFlag = 'rateFlag';
let kabCrshFlag = 'kabCrshFlag';

interface liIdText {
    pdpId: number;
    liText: string;
}

export class Deficiency {

    _map: ol.Map;
    deficiencyLayer: LayerBaseVectorGeoJson;
    deficiencyLayerLabel: LayerBaseVectorGeoJson;
    _sortedFeatures: SortedFeatures;

    $summaryList: JQuery;
    _summaryListId: string;
    _summaryListItems: liIdText[];

    /**
     *
     */
    constructor() {

        this.deficiencyLayer = new LayerBaseVectorGeoJson('', {
            zIndex: 10,
            name: "Deficiencies",
            style: styles.deficiencyStyle
        });

        this.deficiencyLayerLabel = new LayerBaseVectorGeoJson('', {
            zIndex: 50,
            style: styles.deficiencyStyleLabels
        });

        this._summaryListItems = [];
        this._sortedFeatures = undefined;
        this._map = undefined;
        this._summaryListId = constants.defListId;
        this.$summaryList = undefined;
    }

    /**
     * initialize with the map
     * @param  m - the ol map
     * @abstract
     */
    init(m: ol.Map) {
        this._map = m;
        m.addLayer(this.deficiencyLayer.olLayer);
        m.addLayer(this.deficiencyLayerLabel.olLayer);
        this.$summaryList = $(`#${this._summaryListId}`);

        filterMmFlag.addChangeCallback(() => {
            this.deficiencyLayer.refresh();
            this.deficiencyLayerLabel.refresh();
        });

        filterControllingCritera.addChangeCallback(() => {
            this.deficiencyLayer.refresh();
            this.deficiencyLayerLabel.refresh();
        });

        mapPopup.addVectorPopup(this.deficiencyLayer, (props) => {
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
     * @abstract
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
                this.deficiencyLayerLabel.source.addFeature(f);

                let appendHtml = `<span style="font-weight: bold; color: white">${props['pdpId']}</span>:&nbsp;`;

                let defs = [];

                if (triggerRateFlag && triggerKabFlag) {
                    defs.push(`<span style="color: ${styles.mmBothColor}">KAB,&nbsp;Crash Rate</span>`);
                } else if (triggerRateFlag) {
                    defs.push(`<span style="color: ${styles.mmRateFlagColor}">Crash Rate</span>`);
                } else if (triggerKabFlag) {
                    defs.push(`<span style="color: ${styles.mmKabFlagColor}">KAB</span>`);
                }

                appendHtml += defs.join(' ');

                if (defs.length > 0) {
                    appendHtml += ',&nbsp;';
                }

                if (deficiencyList.length > 0) {
                    appendHtml += `<span style="color: ${styles.controllingCriteriaColor}">` +
                        `${deficiencyList.join(',&nbsp;')}</span>`;
                }

                this._summaryListItems.push({
                        pdpId: props['pdpId'],
                        liText: `<li ${constants.pdpDataAttr}="${props['pdpId']}">${appendHtml}</li>`
                    }
                );
            }
        }
    }


    /**
     *
     * @param {number} pdpId
     * @returns {ol.Feature}
     */
    getFeatureById(pdpId: number): ol.Feature {
        return this._sortedFeatures.getFeature(pdpId);
    }

    /**
     * @abstract
     */
    afterLoad() {
        this._sortedFeatures = new SortedFeatures(this.deficiencyLayer.features, 'pdpId');

        let _this = this;

        this._summaryListItems.sort((a, b) => {
            if (a.pdpId == b.pdpId) {
                return 0;
            } else {
                return a.pdpId < b.pdpId ? -1 : 1;
            }
        });

        for (let i of this._summaryListItems) {
            this.$summaryList.append(i.liText);
        }

        this.$summaryList.find('li').click(function () {
            let $this = $(this);

            let theFeature = _this.getFeatureById(parseInt($this.attr(constants.pdpDataAttr)));

            _this._map.getView().fit(theFeature.getGeometry().getExtent(), _this._map.getSize());
            _this._map.getView().setZoom(_this._map.getView().getZoom() - 1);
        });
    }
}


export default new Deficiency();
