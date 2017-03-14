/**
 * Created by gavorhes on 5/11/2016.
 */

import {LayerBaseVectorGeoJson} from "webmapsjs/dist/layers/LayerBaseVectorGeoJson";

import makeGuid from 'webmapsjs/dist/util/makeGuid';
import provide from 'webmapsjs/dist/util/provide';
import {layerConfigHelper, randomColor} from '../layerStyles';
import Ajx  from '../ajaxGetters';
import SortedFeatures from 'webmapsjs/dist/olHelpers/SortedFeatures';
import * as layerStyles from '../layerStyles';
import * as ext from 'webmapsjs/dist/olHelpers/extentUtil';
import ol = require('custom-ol');
import CorridorConfig from "./CorridorConfig";


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
 * @param {string} fromRp - from reference point
 * @param {string} toRp - to reference point
 * @returns {string} string with abbreviated reference point identifiers separated by a hyphen
 * @private
 */
function corridorName(fromRp, toRp) {
    "use strict";

    return fromRp.substring(0, 7) + ' - ' + toRp.substring(0, 7);
}

class Corridor {
    _valid: boolean;
    _error: string;
    _loaded: boolean;
    clientId: string;
    _color: string;
    _corridorLayer: LayerBaseVectorGeoJson;
    nodeLayer: LayerBaseVectorGeoJson;

    sortedFeatures: SortedFeatures;

    databaseId: string|number;
    pdpFrom: number;
    pdpTo: number;
    rpFrom: string;
    rpTo: string;
    countyStart: number;
    countyEnd: number;
    highway: string;
    routeId: number;
    ssaId: number = -1;
    snapshotVersion: number = -1;
    corridorId: number = -1;


    /**
     *
     * @param {number} pdpFrom - from segment id
     * @param {number} pdpTo - to segment id
     * @param {string} rpFrom - from reference point
     * @param {string} rpTo - to reference point
     * @param {number|string} countyStart - start county
     * @param {number} countyEnd - end county
     * @param {string} highway - highway text
     * @param {number} routeId - route Id
     * @param {object} [options={}] options
     * @param {corridorLoaded} [options.loadedCallback=function(c){}] function to call on load
     * @param {number|string|undefined|*} [options.databaseId=undefined] - id in the database
     * @param {string} [options.color=randomColor()] - color for this corridor
     * @param {Array<ol.Feature>|undefined} [options.features=undefined] - pre existing features
     * @param {boolean} [options.cancelLoad=false] - don't load in init
     */
    constructor(pdpFrom: number, pdpTo: number,
                rpFrom: string, rpTo: string,
                countyStart: number|string, countyEnd: number|string,
                highway: string, routeId: number|string,
                options: {
                    loadedCallback?: (c: Corridor) => any,
                    databaseId?: number|string,
                    color?: string,
                    features?: Array<ol.Feature>,
                    cancelLoad?: boolean,
                    jsonFeatures?: JSON
                } = {}) {


        options.features = options.features ? options.features : undefined;

        options.cancelLoad = typeof options.cancelLoad == 'boolean' ? options.cancelLoad : false;

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

        if (typeof countyStart == 'string') {
            this.countyStart = parseInt(countyStart as string);
        } else {
            this.countyStart = countyStart as number;
        }

        if (typeof countyEnd == 'string') {
            this.countyEnd = parseInt(countyEnd as string);
        } else {
            this.countyEnd = countyEnd as number;
        }

        if (typeof routeId == 'string') {
            this.routeId = parseInt(routeId as string);
        } else {
            this.routeId = routeId as number;
        }

        this.highway = highway;
        this.rpFrom = rpFrom;
        this.rpTo = rpTo;
        if (typeof  routeId != 'number') {
            throw 'route id is not number';
        }

        this._corridorLayer = new LayerBaseVectorGeoJson('',
            layerConfigHelper(corridorName(this.rpFrom, this.rpTo), this._color, true)
        );

        this.nodeLayer = new LayerBaseVectorGeoJson('', {
            style: layerStyles.segNodeStyle,
            minZoom: 11,
            zIndex: 3
        });

        if (options.features) {
            this._corridorLayer.source.addFeatures(options.features);
        } else if (options.jsonFeatures) {
            this._corridorLayer.addFeatures(options.jsonFeatures);
            this._loaded = true;
            this.sortedFeatures = new SortedFeatures(this.olLayer.getSource().getFeatures(), 'pdpId');

            this.buildNodes();
        } else if (!options.cancelLoad) {
            this.load(options.loadedCallback);
        }
    }

    setDbValues(corConfig: CorridorConfig){
        this.ssaId = corConfig.ssaId;
        this.snapshotVersion = corConfig.snapshotVersion;
        this.corridorId = corConfig.corridorId;
    }

    /**
     *
     * @param {corridorLoaded} [loadedCallback=function(c){}] - function to call on load
     */
    load(loadedCallback) {
        loadedCallback = typeof loadedCallback == 'function' ? loadedCallback : function () {
        };

        this._valid = false;
        this._error = '';

        Ajx.getCorridor(this.pdpFrom, this.pdpTo, (d) => {
            this._corridorLayer.addFeatures(d as JSON);

            if (typeof d['error'] == 'undefined') {
                this._valid = true;
            } else {
                this._error = d['error'];
            }
            this._loaded = true;
            this.sortedFeatures = new SortedFeatures(this.olLayer.getSource().getFeatures(), 'pdpId');

            this.buildNodes();
            loadedCallback(this);
        });
    }

    buildNodes() {
        this.nodeLayer.clear();
        let features = this._corridorLayer.olLayer.getSource().getFeatures();
        for (let i = 0; i < features.length; i++) {
            let coords = features[i].getGeometry()['getCoordinates']();
            if (coords && coords.length > 0) {
                let startPoint = new ol.geom.Point(coords[0]);
                let endPoint = new ol.geom.Point(coords[coords.length - 1]);
                this.nodeLayer.olLayer.getSource().addFeature(new ol.Feature(startPoint));
                this.nodeLayer.olLayer.getSource().addFeature(new ol.Feature(endPoint));
            }
        }
    }

    /**
     *
     * @returns {Corridor} a copy of the corridor
     */
    clone() {
        let c = new Corridor(this.pdpFrom, this.pdpTo, this.rpFrom, this.rpTo,
            this.countyStart, this.countyEnd, this.highway, this.routeId, {features: this.features});
        c.buildNodes();

        return c;
    }

    /**
     *
     * @param {Corridor} corridor -  the corridor used for updating
     */
    updateCorridor(corridor) {

        this.pdpFrom = corridor.pdpFrom;
        this.pdpTo = corridor.pdpTo;
        this.countyStart = corridor.countyStart;
        this.countyEnd = corridor.countyEnd;
        this.highway = corridor.highway;
        this.rpFrom = corridor.rpFrom;
        this.rpTo = corridor.rpTo;
        this.routeId = corridor.routeId;

        this.layer.name = corridorName(this.rpFrom, this.rpTo);

        this.layer.clear();
        this.layer.olLayer.getSource().addFeatures(corridor.features);
        this.buildNodes();
    }

    get color() {
        return this._color;
    }

    /**
     *
     * @returns {boolean} if the corridor is loaded, no error on ajax
     */
    get valid() {
        return this._valid;
    }

    /**
     *
     * @returns {string|*} - error message
     */
    get error() {
        return this._error;
    }

    /**
     * get the html string to build the corridor table row with zoom, edit, and delete buttons
     * @returns {string} - html for the corridor zoom, edit, and delete buttons
     */
    get tableHtmlCreate() {
        let outString = `<tr class="corridor-tr">`;
        outString += `<td style="background-color: ${this._color}"></td>`;
        outString += `<td>${corridorName(this.rpFrom, this.rpTo)}</td>`;
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
        outString += `<label>Ssa Id</label>`;
        outString += `<input type="text" readonly class="corridor-data-ssa-id" name="corridors[${i}].id.ssaId" value="${this.ssaId }"><br>`;
        outString += `<label>Snapshot version</label>`;
        outString += `<input type="text" readonly class="corridor-data-snapshot" name="corridors[${i}].id.snapshotVersion" value="${this.snapshotVersion }"><br>`;
        outString += `<label>Corridor Id</label>`;
        outString += `<input type="text" readonly class="corridor-data-corridor-id" name="corridors[${i}].id.corridorId" value="${this.corridorId }"><br>`;
        outString += `<label>Start County</label>`;
        outString += `<input type="text" class="corridor-data-start-county" readonly name="corridors[${i}].startCounty" value="${this.countyStart}"/><br>`;
        outString += `<label>End County</label>`;
        outString += `<input type="text" class="corridor-data-end-county" readonly name="corridors[${i}].endCounty" value="${this.countyEnd}"/><br>`;
        outString += `<label>Highway</label>`;
        outString += `<input type="text" class="corridor-data-highway" readonly name="corridors[${i}].stdhighway" value="${this.highway}"/><br>`;
        outString += `<label>Start Rp</label>`;
        outString += `<input type="text" class="corridor-data-from-rp" readonly name="corridors[${i}].startRp" value="${this.rpFrom}"/><br>`;
        outString += `<label>End Rp</label>`;
        outString += `<input type="text" class="corridor-data-to-rp" readonly name="corridors[${i}].endRp" value="${this.rpTo}"/><br>`;
        outString += `<label>Route Id</label>`;
        outString += `<input type="text" class="corridor-data-route-id" readonly name="corridors[${i}].rdwyRteId" value="${this.routeId}"/><br>`;
        outString += `<label>Start Pdp</label>`;
        outString += `<input type="text" class="corridor-data-from-pdp" readonly value="${this.pdpFrom}"/><br>`;
        outString += `<label>End Pdp</label>`;
        outString += `<input type="text" class="corridor-data-to-pdp" readonly value="${this.pdpTo}"/><br>`;

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
     * @returns {ol.layer.Vector|ol.layer.Base} - the OL Vector Layer
     */
    get olLayer(): ol.layer.Vector {
        return this._corridorLayer.olLayer;
    }


    /**
     *
     * @returns {LayerBaseVectorGeoJson} geojson layer
     */
    get layer(): LayerBaseVectorGeoJson {
        return this._corridorLayer;
    }


    /**
     * Getter
     * @returns {boolean} if corridor layer is visible
     */
    get visible(): boolean {
        return this._corridorLayer.visible;
    }

    /**
     * Setter
     * @param {boolean} vis if corridor layer is visible
     *
     */
    set visible(vis: boolean) {
        this._corridorLayer.visible = vis;
    }

    /**
     *
     * @returns {Array.<ol.Feature>} an array of ol features
     */
    get features(): Array<ol.Feature> {
        return this._corridorLayer.features;
    }

    /**
     *
     * @returns {ol.Extent|undefined} layer extent
     */
    get extent(): ol.Extent|Array<number> {
        return ext.calculateExtent([this.layer]);
    }

    get loaded(): boolean {
        return this._loaded;
    }
}

nm.Corridor = Corridor;

export default Corridor;
