/**
 * Created by gavorhes on 5/13/2016.
 */

import SsaMapBase from './SsaMapBase';
import provide from 'webmapsjs/src/util/provide';
import CorridorConfig from '../corridor/CorridorConfig';
import Corridor from '../corridor/Corridor';
import * as styles  from '../layerStyles';
import * as ajx from '../ajaxGetters';
import ol from 'webmapsjs/src/ol/ol';
import {calculateExtent} from '../collections/CorridorCollection';
import * as objHelp from 'webmapsjs/src/util/objectHelpers';
import $ from 'webmapsjs/src/jquery/jquery';

const nm = provide('ssa');

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
        'K': 'red',
        'A': 'orange',
        'B': 'yellow',
        'C': 'lightgreen',
        'P': 'lightblue'
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

    let tableContent = '';

    if (crashData.length > 0) {
        tableContent += `<tr><th colspan="2">Crash Summary</th></tr>`;
        tableContent += `<tr><td>Total</td><td>${crashData.length}</td></tr>`;
        for (let k of ['K', 'A', 'B', 'C', 'P']) {
            if (typeof crashSummary[k] != 'undefined') {
                tableContent += `<tr><td>${crshType[k]}</td><td>${crashSummary[k]}</td></tr>`
            }
        }
    }

    if (tableContent != ''){
        returnHtml = `<table class="crash-summary-table">${tableContent}</table>` + returnHtml;
    }

    return returnHtml;
}

class SsaMapView extends SsaMapBase {

    /**
     *
     * @param {string} divId - container for the map
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     * @param {string} [infoAnchorId=ssa-corridor-info-anchor] - id of element after which to insert the info rows
     */
    constructor(divId, dataClass, infoAnchorId) {
        super(divId);

        dataClass = typeof dataClass == 'string' ? dataClass : 'corridor-data';
        infoAnchorId = typeof infoAnchorId == 'string' ? infoAnchorId : 'ssa-corridor-info-anchor';
        dataClass = '.' + dataClass;

        $(this.mainMap.getTargetElement()).append('<div class="crashes-loaded-msg">Crashes Loaded</div>');

        /**
         *
         * @type {Array<CorridorConfig>}
         */
        let corridorConfigs = [];


        /**
         *
         * @type {Array<Corridor>}
         */
        this._corridorArray = [];

        // parse the data from the hidden input elements
        $(dataClass).each((n, el) => {
            corridorConfigs.push(new CorridorConfig(el));
        });

        this.createdCorridors = corridorConfigs.length;
        this.loadedCorridors = 0;


        let outHtml = '';

        // Create the corridors, triggers feature get
        for (let i = 0; i < corridorConfigs.length; i++) {
            let conf = corridorConfigs[i];
            outHtml += conf.bootstrapHtml(i);

            let corridor = new Corridor(
                conf.startPdp, conf.endPdp, conf.startRp, conf.endRp,
                conf.startCounty, conf.endCounty, conf.hgwy,
                {
                    color: 'black',
                    loadedCallback: () => {
                        this.loadedCorridors++;
                        //something special when all the corridors have been loaded
                        if (this.loadedCorridors == this.createdCorridors) {
                            let ext = calculateExtent(this._corridorArray);
                            if (ext) {
                                this.mainMap.getView().fit(ext, this.mainMap.getSize());
                            }

                            // load the crashes
                            ajx.getCrashes((d) => {
                                // iterate over the pdp ids
                                for (let itm of objHelp.keyValPairs(d)) {
                                    // convert to an int
                                    let pdp = parseInt(itm.key);

                                    // loop over corridors to find which one it is on,
                                    // don't break as there might be multiples
                                    for (let corr of this._corridorArray) {

                                        /**
                                         * try to find the feature by exact match
                                         * @type {ol.Feature|undefined}
                                         */
                                        let theFeature = corr.sortedFeatures.getFeature(pdp, true);

                                        // if found, set the crashes property using a helper function
                                        if (theFeature) {
                                            theFeature.setProperties(
                                                {crashInfo: _crashInfoHelper(/**@type {Array<crashData>} */itm.value)}
                                            );
                                        }
                                    }
                                }

                                // flash a crashes loaded message
                                let $crashesLoadMsg = $('.crashes-loaded-msg');

                                $crashesLoadMsg.fadeIn();

                                setTimeout(()=> {
                                    $crashesLoadMsg.fadeOut();
                                }, 4000);
                            });
                        }
                    }
                }
            );

            this._corridorArray.push(corridor);

            this.mainMap.addLayer(corridor.olLayer);
            this.mainMap.addLayer(corridor.nodeLayer.olLayer);

            this.mainMapPopup.addVectorPopup(corridor.layer, styles.mmPopupContent);
        }

        $('#' + infoAnchorId).after(outHtml);
    }
}

nm.SsaMapView = SsaMapView;
export default SsaMapView;
