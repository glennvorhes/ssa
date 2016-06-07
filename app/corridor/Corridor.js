/**
 * Created by gavorhes on 5/11/2016.
 */

import LayerBaseVectorGeoJson from 'webmapsjs/src/layers/LayerBaseVectorGeoJson';
import ol from 'webmapsjs/src/ol/ol';
import makeGuid from 'webmapsjs/src/util/makeGuid';
import provide from 'webmapsjs/src/util/provide';
import {layerConfigHelper, randomColor} from '../layerStyles';
import {getCorridor}  from '../ajaxGetters';
import SortedFeatures from 'webmapsjs/src/olHelpers/SortedFeatures'

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

/**
 *
 * @param {string} fromRp
 * @param {string} toRp
 * @returns {string}
 */
function corridorName(fromRp, toRp){
    "use strict";

    return fromRp.substring(0,7) + ' - ' + toRp.substring(0, 7);
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
     * @param {boolean} [options.cancelLoad=false]
     */
    constructor(pdpFrom, pdpTo, rpFrom, rpTo, countyStart, countyEnd, highway, options) {

        options = options || {};
        options.features = options.features  ? options.features : undefined;

        options.cancelLoad  = typeof options.cancelLoad == 'boolean' ? options.cancelLoad : false;

        this.clientId = makeGuid();
        if (options.color) {
            this._color = options.color;
        } else {
            this._color = randomColor();
        }

        this.databaseId = options.databaseId || undefined;

        this._valid = false;
        this._error = '';
        this._loaded = false;
        /**
         * 
         * @type {SortedFeatures|null}
         */
        this.sortedFeatures = null;

        this.pdpFrom = pdpFrom;
        this.pdpTo = pdpTo;
        this.countyStart = countyStart;
        this.countyEnd = countyEnd;
        this.highway = highway;
        this.rpFrom = rpFrom;
        this.rpTo = rpTo;

        this._corridorLayer = new LayerBaseVectorGeoJson('',
            layerConfigHelper(corridorName(this.rpFrom  ,this.rpTo), this._color, true)
        );

        this.nodeLayer = new LayerBaseVectorGeoJson('', {
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: 'rgba(252, 251, 59, 0.7)'
                    }),
                    stroke: new ol.style.Stroke({color: 'rgb(252, 251, 59', width: 2})
                })
            }),
            minZoom: 10
        });

        if (options.features) {
            this._corridorLayer.source.addFeatures(options.features);
        } else if (!options.cancelLoad) {
            this.load(options.loadedCallback);
        }
    }

    /**
     *
     * @param {corridorLoaded} [loadedCallback=function(c){}]
     */
    load(loadedCallback){
         loadedCallback = typeof loadedCallback == 'function' ? loadedCallback : function (c) {};
        
        this._valid = false;
        this._error = '';

        getCorridor(this.pdpFrom, this.pdpTo, (d) => {
            this._corridorLayer.addFeatures(d);

            if (typeof d['error'] == 'undefined') {
                this._valid = true;
            } else {
                this._error = d['error'];
            }
            this._loaded = true;
            this.sortedFeatures = new SortedFeatures(this.olLayer.getSource().getFeatures(), 'pdpId');

            let features = this._corridorLayer.olLayer.getSource().getFeatures();
            for (let i = 0; i < features.length; i++){
                let coords = features[i].getGeometry()['getCoordinates']();
                if (coords && coords.length > 0){
                    this.nodeLayer.olLayer.getSource().addFeature(new ol.Feature(new ol.geom.Point(coords[0])));

                    if (i == features.length - 1){
                        this.nodeLayer.olLayer.getSource().addFeature(new ol.Feature(new ol.geom.Point(coords[coords.length - 1])));
                    }
                }
            }
            loadedCallback(this);
        });
    }

    /**
     *
     * @returns {Corridor}
     */
    clone(){
        return new Corridor(this.pdpFrom, this.pdpTo, this.rpFrom, this.rpTo,
            this.countyStart, this.countyEnd, this.highway, {features: this.features});
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

        this.layer.name = corridorName(this.rpFrom  ,this.rpTo);

        this.layer.clear();
        this.layer.olLayer.getSource().addFeatures(corridor.features);
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
        outString += `<td>${corridorName(this.rpFrom  ,this.rpTo)}</td>`;
        outString += `<td>`;
        outString += `<span title="Zoom To" class="corridor-zoom" data-corridor="${this.clientId}"></span>`;
        outString += `<span title="Edit Corridor"  class="corridor-edit" data-corridor="${this.clientId}"></span>`;
        outString += `<span title="Remove Corridor"  class="corridor-delete" data-corridor="${this.clientId}"></span>`;
        outString += `</td>`;
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
    
    get loaded(){
        return this._loaded;
    }
}

nm.Corridor = Corridor;

export default Corridor;