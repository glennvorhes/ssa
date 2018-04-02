/**
 * Created by gavorhes on 7/13/2016.
 */

// uncomment this to use the example crash data
// import exampleCrashData from './_exampleCrashData';
let exampleCrashData = undefined;

import Ajx from '../ajaxGetters';
import * as objHelp from 'webmapsjs/dist/util/objectHelpers';
import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import filterCrash from '../filters/filterCrash';
import * as colorUtil from 'webmapsjs/dist/util/colors';
import * as proj from 'webmapsjs/dist/olHelpers/projections';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import {crashPointStyle} from '../layerStyles';
import {crashPointPopup} from '../popup';
import {crashInfoHelper} from '../popup';
import iCrashData from './iCrashData';


import ol = require('custom-ol');
import $ = require('jquery');

export class CrashData {
    pointCrashes: LayerBaseVectorGeoJson;
    _crashHtmlLookup: {[s: string]: string};
    _crashArrayLookup: {[s: string]: Array<iCrashData>};

    constructor() {
        this._crashHtmlLookup = {};
        this._crashArrayLookup = {};
        this.pointCrashes = new LayerBaseVectorGeoJson('', {
            name: "Crash Points",
            zIndex: 20,
            minZoom: 10,
            renderOrder: (a: ol.Feature, b: ol.Feature): number => {
                let sevOrder = ['P', 'C', 'B', 'A', 'K'];

                let sevA = a.getProperties()['injSvr'];
                let sevB = b.getProperties()['injSvr'];

                let sevAInd = sevOrder.indexOf(sevA);
                let sevBInd = sevOrder.indexOf(sevB);

                if (sevAInd == sevBInd) {
                    return 0;
                }

                return sevAInd > sevBInd ? 1 : -1;
            }
        });

        this.pointCrashes.style = crashPointStyle;
    }

    /**
     *
     * @param m
     * @param ssaId
     * @param snapshot
     */
    init(m: ol.Map, ssaId: number, snapshot: number) {
        mapPopup.addVectorPopup(this.pointCrashes, crashPointPopup);

        filterCrash.addChangeCallback(() => {
            this.pointCrashes.refresh();
        });

        Ajx.getCrashes(ssaId, snapshot, (d) => {
            this._processCrashData(d);
        });

        m.addLayer(this.pointCrashes.olLayer);
    }

    _processCrashData(d) {

        for (let itm of objHelp.keyValPairs(d)) {

            /**
             *
             * @type {Array.<CrashDataObject>}
             */
            let _crashes = itm.value as iCrashData[];
            let crashes = [] as iCrashData[];

            let addedCrashDocNumbers: string[] = [];

            for (let c of _crashes){
                if (addedCrashDocNumbers.indexOf(c.doctnmbr) > -1){
                    continue;
                }
                addedCrashDocNumbers.push(c.doctnmbr);
                crashes.push(c);
            }


            this._crashHtmlLookup[itm.key] = crashInfoHelper(crashes);
            this._crashArrayLookup[itm.key] = crashes;

            for (let c of crashes) {
                if (!(c.lon && c.lat)) {
                    continue;
                }

                let geom = new ol.geom.Point([c.lon, c.lat] as ol.Coordinate);

                geom.transform(proj.proj4326, proj.proj3857);

                let p = new ol.Feature(geom);
                c['injSvr'] = c['injSvr'] || 'O';
                p.setProperties(c);
                this.pointCrashes.source.addFeature(p);
            }
        }

        // flash a crashes loaded message
        let $crashesLoadMsg = $('.crashes-loaded-msg');

        if ($crashesLoadMsg) {
            $crashesLoadMsg.fadeIn();

            setTimeout(()=> {
                $crashesLoadMsg.fadeOut();
            }, 4000);
        } else {
            console.log('get crashes message element not found');
        }
    }

    getCrashSummary(pdp: string|number) {
        let summ = this._crashHtmlLookup[pdp.toString()];
        return summ || '';
    }
}

export default new CrashData();
