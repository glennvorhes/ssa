/**
 * Created by gavorhes on 7/13/2016.
 */


import {getCrashes}  from './ajaxGetters';
import exampleCrashData from './exampleCrashData';
import $ from 'webmapsjs/src/jquery/jquery';
import * as objHelp from 'webmapsjs/src/util/objectHelpers';
import LayerBaseVectorGeoJson from 'webmapsjs/src/layers/LayerBaseVectorGeoJson';
import ol from 'webmapsjs/src/ol/ol';
import filterCrash from './filters/filterCrash';
import filterControllingCriteria from './filters/filterContollingCriteria';
import filterMmFlag from './filters/filterMmFlag';
import * as colorUtil from 'webmapsjs/src/util/colors';
import mapPopup from 'webmapsjs/src/olHelpers/mapPopup';

/**
 *
 * @param {string} inDate
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


/**
 *
 * @param {Array<crashData>} crashData
 * @private
 */
function _crashInfoHelper(crashData) {
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

    for (let /**@type {crashData} */ c of crashData) {

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

    let crshType = {
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
                tableContent += `<tr><td>${crshType[k]}</td><td>${crashSummary[k]}</td></tr>`;
            }
        }
    }

    tableContent += '</table>';
    returnHtml = tableContent + returnHtml;

    return returnHtml;
}

/**
 *
 * @param {ol.Feature} feature
 * @param {number} res
 * @returns {*[]}
 */
const crashPointStyle = (feature, res) => {
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


class CrashData {
    constructor() {

        this._crashHtmlLookup = {};
        this._crashArrayLookup = {};
        this.pointCrashes = new LayerBaseVectorGeoJson('', {name: "Crash Points", zIndex: 4, style: crashPointStyle});


    }

    init() {
        mapPopup.addVectorPopup(this.pointCrashes, (props) => {
            console.log(props);

            return 'Inj Sev' + props['injSvr'];
        });

        filterCrash.addChangeCallback(() => {
           this.pointCrashes.refresh();
        });

        this._processCrashData(exampleCrashData);
        // // load the crashes
        // getCrashes((d) => {
        //     this._processCrashData(d);

        // });
    }

    _processCrashData(d) {

        for (let itm of objHelp.keyValPairs(d)) {

            /**
             *
             * @type {Array.<crashData>}
             */
            let crashes = itm.value;


            this._crashHtmlLookup[itm.key] = _crashInfoHelper(crashes);
            this._crashArrayLookup[itm.key] = crashes;

            for (let c of crashes) {


                if (!(c.lon && c.lat)) {
                    continue;
                }

                let geom = new ol.geom.Point([c.lon, c.lat]);

                geom.transform('EPSG:4326', 'EPSG:3857');

                let p = new ol.Feature(geom);
                c['injSvr'] = c['injSvr'] || 'O';
                p.setProperties(c);
                this.pointCrashes.source.addFeature(p);
            }

            //     // convert to an int
            //     let pdp = parseInt(itm.key);
            //
            //     // loop over corridors to find which one it is on,
            //     // don't break as there might be multiples
            //     for (let corr of this._corridorArray) {
            //
            //         /**
            //          * try to find the feature by exact match
            //          * @type {ol.Feature|undefined}
            //          */
            //         let theFeature = corr.sortedFeatures.getFeature(pdp, true);
            //
            //         // if found, set the crashes property using a helper function
            //         if (theFeature) {
            //             theFeature.setProperties(
            //                 {crashInfo: _crashInfoHelper(/**@type {Array<crashData>} */itm.value)}
            //             );
            //         }
            //     }
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


