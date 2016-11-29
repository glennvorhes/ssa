/**
 * Created by gavorhes on 5/11/2016.
 */
"use strict";
var LayerBaseVectorGeoJson_1 = require('webmapsjs/dist/layers/LayerBaseVectorGeoJson');
var makeGuid_1 = require('webmapsjs/dist/util/makeGuid');
var provide_1 = require('webmapsjs/dist/util/provide');
var layerStyles_1 = require('../layerStyles');
var ajaxGetters_1 = require('../ajaxGetters');
var SortedFeatures_1 = require('webmapsjs/dist/olHelpers/SortedFeatures');
var layerStyles = require('../layerStyles');
var ext = require('webmapsjs/dist/olHelpers/extentUtil');
var custom_ol_1 = require('custom-ol');
var nm = provide_1.default('ssa');
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
var Corridor = (function () {
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
    function Corridor(pdpFrom, pdpTo, rpFrom, rpTo, countyStart, countyEnd, highway, routeId, options) {
        if (options === void 0) { options = {}; }
        this.ssaId = -1;
        this.snapshotVersion = -1;
        this.corridorId = -1;
        options.features = options.features ? options.features : undefined;
        options.cancelLoad = typeof options.cancelLoad == 'boolean' ? options.cancelLoad : false;
        this.clientId = makeGuid_1.default();
        if (options.color) {
            this._color = options.color;
        }
        else {
            this._color = layerStyles_1.randomColor();
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
            this.countyStart = parseInt(countyStart);
        }
        else {
            this.countyStart = countyStart;
        }
        if (typeof countyEnd == 'string') {
            this.countyEnd = parseInt(countyEnd);
        }
        else {
            this.countyEnd = countyEnd;
        }
        if (typeof routeId == 'string') {
            this.routeId = parseInt(routeId);
        }
        else {
            this.routeId = routeId;
        }
        this.highway = highway;
        this.rpFrom = rpFrom;
        this.rpTo = rpTo;
        if (typeof routeId != 'number') {
            throw 'route id is not number';
        }
        this._corridorLayer = new LayerBaseVectorGeoJson_1.default('', layerStyles_1.layerConfigHelper(corridorName(this.rpFrom, this.rpTo), this._color, true));
        this.nodeLayer = new LayerBaseVectorGeoJson_1.default('', {
            style: layerStyles.segNodeStyle,
            minZoom: 11,
            zIndex: 3
        });
        if (options.features) {
            this._corridorLayer.source.addFeatures(options.features);
        }
        else if (options.jsonFeatures) {
            this._corridorLayer.addFeatures(options.jsonFeatures);
            this._loaded = true;
            this.sortedFeatures = new SortedFeatures_1.default(this.olLayer.getSource().getFeatures(), 'pdpId');
            this.buildNodes();
        }
        else if (!options.cancelLoad) {
            this.load(options.loadedCallback);
        }
    }
    Corridor.prototype.setDbValues = function (corConfig) {
        this.ssaId = corConfig.ssaId;
        this.snapshotVersion = corConfig.snapshotVersion;
        this.corridorId = corConfig.corridorId;
    };
    /**
     *
     * @param {corridorLoaded} [loadedCallback=function(c){}] - function to call on load
     */
    Corridor.prototype.load = function (loadedCallback) {
        var _this = this;
        loadedCallback = typeof loadedCallback == 'function' ? loadedCallback : function () {
        };
        this._valid = false;
        this._error = '';
        ajaxGetters_1.default.getCorridor(this.pdpFrom, this.pdpTo, function (d) {
            _this._corridorLayer.addFeatures(d);
            if (typeof d['error'] == 'undefined') {
                _this._valid = true;
            }
            else {
                _this._error = d['error'];
            }
            _this._loaded = true;
            _this.sortedFeatures = new SortedFeatures_1.default(_this.olLayer.getSource().getFeatures(), 'pdpId');
            _this.buildNodes();
            loadedCallback(_this);
        });
    };
    Corridor.prototype.buildNodes = function () {
        this.nodeLayer.clear();
        var features = this._corridorLayer.olLayer.getSource().getFeatures();
        for (var i = 0; i < features.length; i++) {
            var coords = features[i].getGeometry()['getCoordinates']();
            if (coords && coords.length > 0) {
                var startPoint = new custom_ol_1.default.geom.Point(coords[0]);
                var endPoint = new custom_ol_1.default.geom.Point(coords[coords.length - 1]);
                this.nodeLayer.olLayer.getSource().addFeature(new custom_ol_1.default.Feature(startPoint));
                this.nodeLayer.olLayer.getSource().addFeature(new custom_ol_1.default.Feature(endPoint));
            }
        }
    };
    /**
     *
     * @returns {Corridor} a copy of the corridor
     */
    Corridor.prototype.clone = function () {
        var c = new Corridor(this.pdpFrom, this.pdpTo, this.rpFrom, this.rpTo, this.countyStart, this.countyEnd, this.highway, this.routeId, { features: this.features });
        c.buildNodes();
        return c;
    };
    /**
     *
     * @param {Corridor} corridor -  the corridor used for updating
     */
    Corridor.prototype.updateCorridor = function (corridor) {
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
    };
    Object.defineProperty(Corridor.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Corridor.prototype, "valid", {
        /**
         *
         * @returns {boolean} if the corridor is loaded, no error on ajax
         */
        get: function () {
            return this._valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Corridor.prototype, "error", {
        /**
         *
         * @returns {string|*} - error message
         */
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Corridor.prototype, "tableHtmlCreate", {
        /**
         * get the html string to build the corridor table row with zoom, edit, and delete buttons
         * @returns {string} - html for the corridor zoom, edit, and delete buttons
         */
        get: function () {
            var outString = "<tr class=\"corridor-tr\">";
            outString += "<td style=\"background-color: " + this._color + "\"></td>";
            outString += "<td>" + corridorName(this.rpFrom, this.rpTo) + "</td>";
            outString += "<td>";
            outString += "<span title=\"Zoom To\" class=\"corridor-zoom\" data-corridor=\"" + this.clientId + "\"></span>";
            outString += "<span title=\"Edit Corridor\"  class=\"corridor-edit\" data-corridor=\"" + this.clientId + "\"></span>";
            outString += "<span title=\"Remove Corridor\"  class=\"corridor-delete\" data-corridor=\"" + this.clientId + "\"></span>";
            outString += "</td>";
            outString += '</tr>';
            return outString;
        },
        enumerable: true,
        configurable: true
    });
    Corridor.prototype.getDataHtml = function (i) {
        var outString = '<div class="corridor-data">';
        outString += "<label>Ssa Id</label>";
        outString += "<input type=\"text\" readonly class=\"corridor-data-ssa-id\" name=\"corridors[" + i + "].id.ssaId\" value=\"" + this.ssaId + "\"><br>";
        outString += "<label>Snapshot version</label>";
        outString += "<input type=\"text\" readonly class=\"corridor-data-snapshot\" name=\"corridors[" + i + "].id.snapshotVersion\" value=\"" + this.snapshotVersion + "\"><br>";
        outString += "<label>Corridor Id</label>";
        outString += "<input type=\"text\" readonly class=\"corridor-data-corridor-id\" name=\"corridors[" + i + "].id.corridorId\" value=\"" + this.corridorId + "\"><br>";
        outString += "<label>Start County</label>";
        outString += "<input type=\"text\" class=\"corridor-data-start-county\" readonly name=\"corridors[" + i + "].startCounty\" value=\"" + this.countyStart + "\"/><br>";
        outString += "<label>End County</label>";
        outString += "<input type=\"text\" class=\"corridor-data-end-county\" readonly name=\"corridors[" + i + "].endCounty\" value=\"" + this.countyEnd + "\"/><br>";
        outString += "<label>Highway</label>";
        outString += "<input type=\"text\" class=\"corridor-data-highway\" readonly name=\"corridors[" + i + "].stdhighway\" value=\"" + this.highway + "\"/><br>";
        outString += "<label>Start Rp</label>";
        outString += "<input type=\"text\" class=\"corridor-data-from-rp\" readonly name=\"corridors[" + i + "].startRp\" value=\"" + this.rpFrom + "\"/><br>";
        outString += "<label>End Rp</label>";
        outString += "<input type=\"text\" class=\"corridor-data-to-rp\" readonly name=\"corridors[" + i + "].endRp\" value=\"" + this.rpTo + "\"/><br>";
        outString += "<label>Start Pdp</label>";
        outString += "<input type=\"text\" class=\"corridor-data-from-pdp\" readonly name=\"corridors[" + i + "].startPdpid\" value=\"" + this.pdpFrom + "\"/><br>";
        outString += "<label>End Pdp</label>";
        outString += "<input type=\"text\" class=\"corridor-data-to-pdp\" readonly name=\"corridors[" + i + "].endPdpid\" value=\"" + this.pdpTo + "\"/><br>";
        outString += "<label>Route Id</label>";
        outString += "<input type=\"text\" class=\"corridor-data-route-id\" readonly name=\"corridors[" + i + "].rdwyRteId\" value=\"" + this.routeId + "\"/><br>";
        outString += "</div>";
        return outString;
    };
    Corridor.prototype.getDataHtmlDisp = function (i) {
        var returnString = this.getDataHtml(i);
        returnString = escapeHtml(returnString);
        returnString = returnString.replace(/&quot;&#x2F;&gt;/g, '&quot;&#x2F;&gt;<br>');
        returnString = returnString.replace(/corridor-data&quot;&gt;/g, 'corridor-data&quot;&gt;<br>');
        return returnString + '<br>';
    };
    Object.defineProperty(Corridor.prototype, "olLayer", {
        /**
         *
         * @returns {ol.layer.Vector|ol.layer.Base} - the OL Vector Layer
         */
        get: function () {
            return this._corridorLayer.olLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Corridor.prototype, "layer", {
        /**
         *
         * @returns {LayerBaseVectorGeoJson} geojson layer
         */
        get: function () {
            return this._corridorLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Corridor.prototype, "visible", {
        /**
         * Getter
         * @returns {boolean} if corridor layer is visible
         */
        get: function () {
            return this._corridorLayer.visible;
        },
        /**
         * Setter
         * @param {boolean} vis if corridor layer is visible
         *
         */
        set: function (vis) {
            this._corridorLayer.visible = vis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Corridor.prototype, "features", {
        /**
         *
         * @returns {Array.<ol.Feature>} an array of ol features
         */
        get: function () {
            return this._corridorLayer.features;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Corridor.prototype, "extent", {
        /**
         *
         * @returns {ol.Extent|undefined} layer extent
         */
        get: function () {
            return ext.calculateExtent(this.layer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Corridor.prototype, "loaded", {
        get: function () {
            return this._loaded;
        },
        enumerable: true,
        configurable: true
    });
    return Corridor;
}());
nm.Corridor = Corridor;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Corridor;
//# sourceMappingURL=Corridor.js.map