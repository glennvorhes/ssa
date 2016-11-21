/**
 * Created by gavorhes on 7/13/2016.
 */

// uncomment this to use the example crash data
// import exampleCrashData from './_exampleCrashData';
let exampleCrashData = undefined;

import Ajx from '../AjaxGetters';
import * as objHelp from 'webmapsjs/dist/util/objectHelpers';
import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import filterCrash from '../filters/filterCrash';
import * as colorUtil from 'webmapsjs/dist/util/colors';
import * as proj from 'webmapsjs/dist/olHelpers/projections';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';

import ol from 'custom-ol';
import $ = require('jquery');
/**
 *
 * @param {string} inDate - input date to format
 * @returns {string} formatted date
 */
function _dteStrip(inDate) {
    "use strict";
    let parts = inDate.split('/');
    let m = parts[0];
    let d = parts[1];
    let y = parts[2];

    if (m[0] == '0') {
        m = m.slice(1);
    }

    if (d[0] == '0') {
        d = d.slice(1);
    }
    y = y.slice(2);

    return [m, d, y].join('/');
}

function _timeStrip(tm) {
    "use strict";
    tm = tm.replace(/:\d{2} /, '');
    if (tm[0] == '0') {
        tm = tm.slice(1);
    }

    return tm;
}

function injColor(inj) {
    "use strict";

    let color = {
        'K': 'rgb(255,0,0)',
        'A': 'rgb(255,165,0)',
        'B': 'rgb(255,255,0)',
        'C': 'rgb(153,255,153)',
        'P': 'rgb(141,227,230)'
    }[inj];

    return color || 'rgba(255,255,255,0)';
}


export interface CrashDataObject {
    cumulMile: number;
    mnrColl: string;
    deer: boolean;
    lon: number;
    lat: number;
    time: string;
    injSvr: string;
    dte: string
}

/**
 *
 * @param {Array<CrashDataObject>} crashData - array of crash data
 * @returns {string} crash summary table html
 * @private
 */
function _crashInfoHelper(crashData: Array<CrashDataObject>): string {
    "use strict";
    crashData.sort(function (a, b) {
        let dteA = (new Date(a['dte'] + ' ' + a['time'])).getTime();
        let dteB = (new Date(b['dte'] + ' ' + b['time'])).getTime();

        if (dteA == dteB) {
            return 0;
        } else {
            return dteA > dteB ? -1 : 1;
        }
    });

    let returnHtml = '';
    returnHtml += '<ul class="crash-list">';

    let crashSummary = {};

    for (let c of crashData) {

        if (typeof crashSummary[c.injSvr] == 'undefined') {
            crashSummary[c.injSvr] = 1;
        } else {
            crashSummary[c.injSvr]++;
        }


        returnHtml += `<li style="background-color: ${injColor(c.injSvr)};">`;
        returnHtml += _dteStrip(c.dte);
        if (c.time) {
            returnHtml += ', ' + _timeStrip(c.time);
        }

        if (c.mnrColl) {
            returnHtml += ', ' + c.mnrColl;
        }

        if (c.injSvr) {
            returnHtml += ', ' + c.injSvr;
        }

        returnHtml += '</li>';
    }
    returnHtml += '</ul>';

    let crashType = {
        'K': 'Fatal',
        'A': 'Incapacitating',
        'B': 'Non-incapacitating',
        'C': 'Possible Injury',
        'P': 'Property Damage'
    };

    let tableContent = '<table class="crash-summary-table">';
    tableContent += `<tr><th colspan="2">Crash Summary</th></tr>`;
    tableContent += `<tr><td>Total</td><td>${crashData.length}</td></tr>`;

    if (crashData.length > 0) {
        for (let k of ['K', 'A', 'B', 'C', 'P']) {
            if (typeof crashSummary[k] != 'undefined') {
                tableContent += `<tr><td>${crashType[k]}</td><td>${crashSummary[k]}</td></tr>`;
            }
        }
    }

    tableContent += '</table>';
    returnHtml = tableContent + returnHtml;

    return returnHtml;
}

/**
 *
 * @param  feature - the input feature
 * @returns return style or null
 */
const crashPointStyle = (feature: ol.Feature): ol.style.Style[] => {
    "use strict";

    let props = feature.getProperties();

    let crashColor = filterCrash.getCrashColor(props['injSvr']);
    if (!crashColor) {
        return null;
    }

    let crashColorFill = colorUtil.rgbToRgba(crashColor, 0.6);

    return [new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: crashColorFill
            }),
            stroke: new ol.style.Stroke({color: crashColor, width: 2})
        })
    })];
};


export class CrashData {
    pointCrashes: LayerBaseVectorGeoJson;
    _crashHtmlLookup: {[s: string]: string};
    _crashArrayLookup: {[s: string]: Array<CrashDataObject>};

    constructor() {
        this._crashHtmlLookup = {};
        this._crashArrayLookup = {};
        this.pointCrashes = new LayerBaseVectorGeoJson('', {
            name: "Crash Points",
            zIndex: 204,
            minZoom: 10
        });

        this.pointCrashes.style = crashPointStyle;
    }

    /**
     *
     * @param {ol.Map} m - the main map
     */
    init(m: ol.Map, ssaId: number, snapshot: number) {
        mapPopup.addVectorPopup(this.pointCrashes, (props) => {
            let returnHtml = '<table class="crash-popup-table">';
            returnHtml += `<tr><td>Date</td><td>${props['dte'] + ' ' + props['time']}</td></tr>`;
            returnHtml += `<tr><td>Cuml. Ml.</td><td>${props['cumulMile']}</td></tr>`;
            returnHtml += `<tr><td>Severity</td><td>${props['injSvr']}</td></tr>`;
            returnHtml += `<tr><td>Lat</td><td>${props['lat']}</td></tr>`;
            returnHtml += `<tr><td>Lon</td><td>${props['lon']}</td></tr>`;
            returnHtml += '</table>';

            return returnHtml;
        });

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
            let crashes = itm.value as CrashDataObject[];


            this._crashHtmlLookup[itm.key] = _crashInfoHelper(crashes);
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

    getCrashSummary(pdp) {
        let summ = this._crashHtmlLookup[pdp];

        return summ || '';
    }
}

export default new CrashData();
