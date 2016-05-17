/**
 * Created by gavorhes on 5/11/2016.
 */

import LayerBaseVectorGeoJson from '../../src/layers/LayerBaseVectorGeoJson';
import ol from '../../src/ol/ol';
import makeGuid from '../../src/util/makeGuid';
import provide from '../../src/util/provide';
import {layerConfigHelper, randomColor} from '../layerStyles';
import {getCorridor}  from '../ajaxGetters';
const nm = provide('ssa');


function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        }[s];
    });
}


class Corridor {

    /**
     *
     * @param {number} pdpFrom from reference point
     * @param {number} pdpTo from reference point
     * @param {string} rpFrom from reference point
     * @param {string} rpTo to reference point
     * @param {number} countyStart start county
     * @param {number} countyEnd end county
     * @param {string} highway route
     * @param {object} [options={}]
     * @param {corridorLoaded} [options.loadedCallback=function(c){}]
     * @param {number|string|undefined|*} [options.databaseId=undefined]
     * @param {string} [options.color=randomColor()]
     * @param {Array<ol.Feature>|undefined} [options.features=undefined]
     */
    constructor(pdpFrom, pdpTo, rpFrom, rpTo, countyStart, countyEnd, highway, options) {

        options = options || {};
        options.features = options.features && options.constructor.name == 'Array' ? options.features : undefined;
        options.loadedCallback = typeof options.loadedCallback == 'function' ? options.loadedCallback : function (c) {
        };

        this.clientId = makeGuid();
        if (options.color) {
            this._color = options.color;
        } else {
            this._color = randomColor();
        }

        this.databaseId = options.databaseId || undefined;

        this._valid = false;
        this._error = '';

        this.pdpFrom = pdpFrom;
        this.pdpTo = pdpTo;
        this.countyStart = countyStart;
        this.countyEnd = countyEnd;
        this.highway = highway;
        this.rpFrom = rpFrom;
        this.rpTo = rpTo;

        this._corridorLayer = new LayerBaseVectorGeoJson('',
            layerConfigHelper(this.rpFrom + ' - ' + this.rpTo, this._color, true)
        );

        if (options.features) {
            this._corridorLayer.source.addFeatures(options.features);
            options.loadedCallback(this);
        } else {
            getCorridor(pdpFrom, pdpTo, (d) => {
                this._corridorLayer.addFeatures(d);

                if (typeof d['error'] == 'undefined') {
                    this._valid = true;
                } else {
                    this._error = d['error'];
                }
                options.loadedCallback(this);
            });
        }
    }

    /**
     *
     * @param {Corridor} corridor
     */
    updateCorridor(corridor) {

        this.pdpFrom = corridor.pdpFrom;
        this.pdpTo = corridor.pdpTo;
        this.countyStart = corridor.countyStart;
        this.countyEnd = corridor.countyEnd;
        this.highway = corridor.highway;
        this.rpFrom = corridor.rpFrom;
        this.rpTo = corridor.rpTo;

        this.layer.name = this.rpFrom + '-' + this.rpTo;

        this.layer.clear();
        for (let f of corridor.features) {
            this.layer.source.addFeature(f.clone());
        }
    }

    get color() {
        return this._color;
    }

    /**
     *
     * @returns {boolean}
     */
    get valid() {
        return this._valid;
    }

    /**
     *
     * @returns {string|*}
     */
    get error() {
        return this._error;
    }

    /**
     *
     * @returns {string}
     */
    get tableHtmlCreate() {
        let outString = `<tr class="corridor-tr">`;
        outString += `<td style="background-color: ${this._color}"></td>`;
        outString += `<td>${this.rpFrom} - ${this.rpTo}</td>`;
        outString += `<td>`;
        outString += `<span title="Zoom To" class="corridor-zoom" data-corridor="${this.clientId}"></span>`;
        outString += `<span title="Edit Corridor"  class="corridor-edit" data-corridor="${this.clientId}"></span>`;
        outString += `<span title="Remove Corridor"  class="corridor-delete" data-corridor="${this.clientId}"></span>`;
        outString += `</td>`;
        outString += '</tr>';

        return outString;
    }

    getTableHtml() {
        let outString = `<tr id="${this.clientId}" class="corridor-tr" style="background-color: ${this._color}">`;
        outString += `<td>${this.countyStart}</td>`;
        outString += `<td>${this.countyEnd}</td>`;
        outString += `<td>${this.highway}</td>`;
        outString += `<td>${this.rpFrom}</td>`;
        outString += `<td>${this.rpTo}</td>`;
        outString += '</tr>';

        return outString;
    }

    getDataHtml(i) {
        let outString = '<div class="corridor-data">';
        // outString += `<input type="hidden" class="corridor-data-database-id" name="corridors[${i}].corridorId" value="${this.databaseId}"/>`;
        outString += `<input type="hidden" class="corridor-data-start-county" name="corridors[${i}].startCounty" value="${this.countyStart}"/>`;
        outString += `<input type="hidden" class="corridor-data-end-county" name="corridors[${i}].endCounty" value="${this.countyEnd}"/>`;
        outString += `<input type="hidden" class="corridor-data-highway" name="corridors[${i}].highway" value="${this.highway}"/>`;
        outString += `<input type="hidden" class="corridor-data-from-rp" name="corridors[${i}].startRp" value="${this.rpFrom}"/>`;
        outString += `<input type="hidden" class="corridor-data-to-rp" name="corridors[${i}].endRp" value="${this.rpTo}"/>`;
        outString += `<input type="hidden" class="corridor-data-from-pdp" name="corridors[${i}].startPdp" value="${this.pdpFrom}"/>`;
        outString += `<input type="hidden" class="corridor-data-to-pdp" name="corridors[${i}].endPdp" value="${this.pdpTo}"/>`;
        outString += `</div>`;

        return outString;
    }

    getDataHtmlDisp(i) {
        let returnString = this.getDataHtml(i);
        returnString = escapeHtml(returnString);
        returnString = returnString.replace(/&quot;&#x2F;&gt;/g, '&quot;&#x2F;&gt;<br>');
        returnString = returnString.replace(/corridor-data&quot;&gt;/g, 'corridor-data&quot;&gt;<br>');

        return returnString + '<br>';
    }

    /**
     *
     * @returns {ol.layer.Vector|*}
     */
    get olLayer() {
        return this._corridorLayer.olLayer;

    }

    /**
     *
     * @returns {LayerBaseVectorGeoJson}
     */
    get layer() {
        return this._corridorLayer;
    }


    /**
     *
     * @returns {boolean} if corridor layer is visible
     */
    get visible() {
        return this._corridorLayer.visible;
    }

    /**
     *
     * @param {boolean} vis if corridor layer is visible
     */
    set visible(vis) {
        this._corridorLayer.visible = vis;
    }

    /**
     *
     * @returns {Array.<ol.Feature>} an array of ol features
     */
    get features() {
        return this._corridorLayer.features;
    }

    /**
     *
     * @returns {ol.Extent|undefined}
     */
    get extent() {
        if (this._corridorLayer.source.getFeatures().length > 0) {
            return this._corridorLayer.source.getExtent();
        } else {
            return undefined;
        }
    }
}

nm.Corridor = Corridor;

export default Corridor;