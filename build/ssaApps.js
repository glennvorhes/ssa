/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/10/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create a namespace on the gv object
 * @param {string} namespace to create
 * @returns {object} object representing the namespace
 */
function provide(namespace) {
    "use strict";
    if (typeof window.gv == 'undefined') {
        window.gv = {};
    }
    var parts = namespace.split('.');
    var nameSpace = window.gv;
    for (var i = 0; i < parts.length; i++) {
        var newObject = nameSpace[parts[i]];
        if (typeof newObject == 'undefined') {
            nameSpace[parts[i]] = {};
        }
        nameSpace = nameSpace[parts[i]];
    }
    return nameSpace;
}
provide('util');
window.gv.util.provide = provide;
exports.default = provide;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ol;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var mapPopupCls_1 = __webpack_require__(34);
/**
 * The single popup object catch is that it is common to multimap pages
 * @type {MapPopupCls}
 */
exports.mapPopup = new mapPopupCls_1.default();
exports.default = exports.mapPopup;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('util');
/**
 * guids are used to uniquely identify groups and features
 * @returns {string} a new guid
 */
function makeGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
exports.makeGuid = makeGuid;
nm.makeGuid = makeGuid;
exports.default = makeGuid;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 10/3/2016.
 */
var ol = __webpack_require__(2);
exports.proj4326 = new ol.proj.Projection({ code: 'EPSG:4326' });
exports.proj3857 = new ol.proj.Projection({ code: 'EPSG:3857' });
exports.proj3070 = new ol.proj.Projection({ code: 'EPSG:3070' });


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/12/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var $ = __webpack_require__(1);
var home = $('#site-root').val();
if (window.location.port == '5001') {
    home = 'http://localhost:5004/';
}
var getStartCountiesUrl = home + 'getStartCounties';
var getHighwaysUrl = home + 'getHighways';
var getEndCountiesUrl = home + 'getEndCounties';
var getSegmentsUrl = home + 'getSegments';
var getCorridorUrl = home + 'getCorridor';
var getCrashesUrl = home + 'getCrashes';
var getAllCountiesUrl = home + 'getAllCounties';
var getAllHighwaysForStartEndCountyUrl = home + 'getAllHighwaysForStartEndCounty';
var getCcGeomUrl = home + 'getCcGeom';
var nm = provide_1.default('ssa');
function addMmStnParams(p) {
    var $mm = $('#hidden-mm-version');
    if ($mm.length > 0) {
        p['mm'] = $mm.val();
    }
    var $stn = $('#hidden-stn-version');
    if ($stn.length > 0) {
        p['stn'] = parseInt($stn.val());
    }
}
/**
 * inner function to help ajax
 * @param {string} url - resource url
 * @param {object} [params={}] - get params
 * @param {ajaxCallback} callback - callback function
 */
function _ajaxInner(url, params, callback) {
    "use strict";
    $.get(url, params, callback, 'json').fail(function () {
        var msg = "error getting: " + url + JSON.stringify(params);
        console.warn(msg);
    });
}
/**
 * outer function to help ajax
 * @param {string} url - resource url
 * @param {ajaxCallback} callback - callback function
 * @param {object} [params={}] get params
 * @param {ajaxCallback} [calbackHelper=undefined] - callback helper
 */
function _ajaxHelper(url, callback, params, calbackHelper) {
    "use strict";
    if (params === void 0) { params = {}; }
    params[(Math.random() * 1000000).toFixed()] = (Math.random() * 1000000).toFixed();
    if (typeof calbackHelper == 'function') {
        var newCallback = function (d) {
            d = calbackHelper(d);
            callback(d);
        };
        _ajaxInner(url, params, newCallback);
    }
    else {
        _ajaxInner(url, params, callback);
    }
}
/**
 * sort function for counties
 * @param {Array<object>} d - county object
 * @returns {Array<object>} sorted array of county key val pair objects
 */
var _countySort = function (d) {
    d.sort(function (a, b) {
        if (a['name'] == b['name']) {
            return 0;
        }
        else {
            return a['name'] < b['name'] ? -1 : 1;
        }
    });
    return d;
};
/**
 * static methods to make ajax requests
 */
var AjaxGetters = (function () {
    /**
     * Do not instantiate this class - only static methods
     */
    function AjaxGetters() {
        throw 'this class should not be instantiated';
    }
    /**
     * @static
     * @param {ajaxCallback} callback - callback function
     */
    AjaxGetters.getStartCounties = function (callback) {
        "use strict";
        _ajaxHelper(getStartCountiesUrl, callback, {}, _countySort);
    };
    /**
     * Get the highways based on the start county
     * @param {number} startCountyId - start county id
     * @param {ajaxCallback} callback - callback function
     */
    AjaxGetters.getHighways = function (startCountyId, callback) {
        "use strict";
        var params = { "startCountyId": startCountyId };
        _ajaxHelper(getHighwaysUrl, callback, params);
    };
    /**
     * Get the highways based on the start county
     * @param {string} highwayName - highway name
     * @param {ajaxCallback} callback - callback function
     */
    AjaxGetters.getEndCounties = function (highwayName, callback) {
        "use strict";
        var params = { "highwayName": highwayName };
        _ajaxHelper(getEndCountiesUrl, callback, params, _countySort);
    };
    /**
     * get the segments based on county and route id
     * @param {number} county - county id
     * @param {number} routeId - route id
     * @param {ajaxCallback} callback - callback function
     */
    AjaxGetters.getSegments = function (county, routeId, callback) {
        "use strict";
        var routeIdNum;
        if (typeof routeId == 'string') {
            routeIdNum = parseInt(routeId);
        }
        else {
            routeIdNum = routeId;
        }
        var params = { "routeid": routeIdNum, "county": county };
        addMmStnParams(params);
        // let $mm = $('#hidden-mm-version');
        //
        // if ($mm.length > 0) {
        //     params['mm'] = $mm.val();
        // }
        _ajaxHelper(getSegmentsUrl, callback, params);
    };
    /**
     * get corridor based on start and end pdp id
     * @param {number} startPdp - start pdp id
     * @param {number} endPdp - end pdp id
     * @param {ajaxCallback} callback - callback function
     */
    AjaxGetters.getCorridor = function (startPdp, endPdp, callback) {
        "use strict";
        var params = { "from": startPdp, "to": endPdp };
        addMmStnParams(params);
        // let $mm = $('#hidden-mm-version');
        //
        // if ($mm.length > 0) {
        //     params['mm'] = $mm.val();
        // }
        _ajaxHelper(getCorridorUrl, callback, params);
    };
    /**
     * Get the crash data
     * @param {number} ssaId
     * @param {number} snapshot
     * @param {ajaxCallback} callback - callback function
     */
    AjaxGetters.getCrashes = function (ssaId, snapshot, callback) {
        "use strict";
        var params = {
            'ssaId': ssaId,
            'snapshot': snapshot
        };
        _ajaxHelper(getCrashesUrl, callback, params);
    };
    /**
     * Get all counties as an array
     * @param {ajaxCallback} callback - callback function
     */
    AjaxGetters.getAllCounties = function (callback) {
        "use strict";
        var params = {};
        _ajaxHelper(getAllCountiesUrl, callback, params);
    };
    /**
     * Get highways based on start and end counties
     * @param {number} startCountyId - start county id
     * @param {number} endCountyId - end county id
     * @param {ajaxCallback} callback - callback function
     *
     */
    AjaxGetters.getHwyByStartEndCounty = function (startCountyId, endCountyId, callback) {
        "use strict";
        var params = {
            'startCountyId': startCountyId,
            'endCountyId': endCountyId
        };
        _ajaxHelper(getAllHighwaysForStartEndCountyUrl, callback, params);
    };
    AjaxGetters.getCcGeom = function (ssaId, snapshot, callback) {
        "use strict";
        var params = {
            'ssaId': ssaId,
            'snapshot': snapshot
        };
        _ajaxHelper(getCcGeomUrl, callback, params);
    };
    return AjaxGetters;
}());
exports.AjaxGetters = AjaxGetters;
exports.default = AjaxGetters;
nm.AjaxGetters = AjaxGetters;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/13/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var ol = __webpack_require__(2);
var projections_1 = __webpack_require__(5);
var filterCrash_1 = __webpack_require__(25);
var colorUtil = __webpack_require__(38);
// import filterControllingCritera from '../filters/filterContollingCriteria';
var filterContollingCriteria_1 = __webpack_require__(24);
var filterMmFlag_1 = __webpack_require__(26);
var constants = __webpack_require__(13);
exports.segmentLayer = new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'darkblue', width: 5 })
});
exports.fromSelectionColor = '#48FD14';
exports.toSelectionColor = '#EE0071';
exports.corridorPreviewColor = 'black';
exports.mmRateFlagColor = 'yellow';
exports.mmKabFlagColor = 'orange';
exports.mmBothColor = 'red';
exports.controllingCriteriaColor = constants.controllingCriteriaColor;
/**
 *
 * @type {Array<string>}
 */
var returnedColors = [];
var colorOptions = ['#FF00FF', '#7FFF00', '#FA8072',
    '#FF6347', '#40E0D0', '#ADFF2F', '#6495ED',
    '#FF8C00', '#7FFFD4', '#DA70D6'];
function txtFunc(p) {
    return new ol.style.Text({
        text: p.pdpId.toFixed(),
        scale: 1.5,
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'white'
        })
    });
}
exports.txtFunc = txtFunc;
/**
 * return a random color for styling
 * @returns {string}
 */
function randomColor() {
    "use strict";
    if (returnedColors.length == colorOptions.length) {
        returnedColors = [];
    }
    while (true) {
        var c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        if (returnedColors.indexOf(c) < 0) {
            returnedColors.push(c);
            return c;
        }
    }
}
exports.randomColor = randomColor;
/**
 *
 * @param name
 * @param color
 * @param visible
 * @returns {{minZoom: number, name: *, transform: {dataProjection: string, featureProjection: string}, style: ol.style.Style, visible: *}}
 */
function layerConfigHelper(name, color, visible) {
    "use strict";
    return {
        minZoom: 4,
        name: name,
        transform: { dataProjection: projections_1.proj3857, featureProjection: projections_1.proj3857 },
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 6
            })
        }),
        visible: visible
    };
}
exports.layerConfigHelper = layerConfigHelper;
exports.segNodeStyle = new ol.style.Style({
    image: new ol.style.RegularShape({
        radius: 6,
        points: 4,
        fill: new ol.style.Fill({
            color: 'rgb(0, 0, 0)'
        }),
        stroke: new ol.style.Stroke({ color: 'rgb(0, 0, 0', width: 2 })
    })
});
/**
 *
 * @param  feature - the input feature
 * @returns return style or null
 */
exports.crashPointStyle = function (feature) {
    "use strict";
    var props = feature.getProperties();
    var crashColor = filterCrash_1.default.getCrashColor(props['injSvr']);
    if (!crashColor) {
        return null;
    }
    var crashColorFill = colorUtil.rgbToRgba(crashColor, 0.9);
    return [new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: crashColorFill
                }),
                stroke: new ol.style.Stroke({ color: 'black', width: 1 })
            })
        })];
};
function deficiencyStyle(feature) {
    "use strict";
    var props = feature.getProperties();
    var returnStyles = [];
    var showCc = false;
    for (var _i = 0, _a = filterContollingCriteria_1.default.allValues; _i < _a.length; _i++) {
        var cc = _a[_i];
        if (props[cc] && filterContollingCriteria_1.default.valIsOn(cc)) {
            showCc = true;
            break;
        }
    }
    if (showCc) {
        returnStyles.push(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: exports.controllingCriteriaColor,
                width: 14
            })
        }));
    }
    var rateOrKab = (props.rateFlag >= 1 && filterMmFlag_1.default.mmRateFlagOn) || (props.kabCrshFlag >= 1 && filterMmFlag_1.default.mmKabFlagOn);
    var onlyRate = props.rateFlag >= 1 && filterMmFlag_1.default.mmRateFlagOn;
    var onlyKab = props.kabCrshFlag >= 1 && filterMmFlag_1.default.mmKabFlagOn;
    var rateAndKab = onlyRate && onlyKab;
    var color;
    if (onlyRate) {
        color = exports.mmRateFlagColor;
    }
    if (onlyKab) {
        color = exports.mmKabFlagColor;
    }
    if (rateAndKab) {
        color = exports.mmBothColor;
    }
    if (rateOrKab) {
        returnStyles.push(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 5
            })
        }));
    }
    if (returnStyles.length > 0) {
        return returnStyles;
    }
    else {
        return null;
    }
}
exports.deficiencyStyle = deficiencyStyle;
function deficiencyStyleLabels(feature) {
    "use strict";
    var props = feature.getProperties();
    var returnStyles = [];
    var showCc = false;
    for (var _i = 0, _a = filterContollingCriteria_1.default.allValues; _i < _a.length; _i++) {
        var cc = _a[_i];
        if (props[cc] && filterContollingCriteria_1.default.valIsOn(cc)) {
            showCc = true;
            break;
        }
    }
    if (showCc) {
        returnStyles.push(new ol.style.Style({
            text: txtFunc(props)
        }));
    }
    var rateOrKab = (props.rateFlag >= 1 && filterMmFlag_1.default.mmRateFlagOn) || (props.kabCrshFlag >= 1 && filterMmFlag_1.default.mmKabFlagOn);
    var onlyRate = props.rateFlag >= 1 && filterMmFlag_1.default.mmRateFlagOn;
    var onlyKab = props.kabCrshFlag >= 1 && filterMmFlag_1.default.mmKabFlagOn;
    var rateAndKab = onlyRate && onlyKab;
    if (rateOrKab) {
        returnStyles.push(new ol.style.Style({
            text: txtFunc(props)
        }));
    }
    if (returnStyles.length > 0) {
        return returnStyles;
    }
    else {
        return null;
    }
}
exports.deficiencyStyleLabels = deficiencyStyleLabels;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/2/2015.
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LayerBaseVector_1 = __webpack_require__(29);
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var proj = __webpack_require__(5);
var projections_1 = __webpack_require__(5);
var nm = provide_1.default('layers');
/**
 * The Vector GeoJson Layer
 * @augments LayerBaseVector
 */
var LayerBaseVectorGeoJson = (function (_super) {
    __extends(LayerBaseVectorGeoJson, _super);
    /**
     * @param {string|null} url - resource url, set to '' to make blank layer
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     *
     * @param {object} [options.transform={}] SR transform, set as false for no transform
     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     */
    function LayerBaseVectorGeoJson(url, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        url = typeof url == 'string' ? url : '';
        _this = _super.call(this, url, options) || this;
        _this._geoJsonFormat = new ol.format.GeoJSON();
        _this._transform = options.transform || {};
        _this._transform.dataProjection = _this._transform.dataProjection || proj.proj4326;
        _this._transform.featureProjection = _this._transform.featureProjection || projections_1.proj3857;
        if (_this.autoLoad || _this.visible) {
            _this._load();
        }
        return _this;
    }
    /**
     * add feature collection
     * @param {object} featureCollection - as geojson object
     */
    LayerBaseVectorGeoJson.prototype.addFeatures = function (featureCollection) {
        this.source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection, { dataProjection: this._transform.dataProjection,
            featureProjection: this._transform.featureProjection }));
    };
    /**
     * trigger load features
     * @protected
     * @returns {boolean} if already loaded
     */
    LayerBaseVectorGeoJson.prototype._load = function () {
        var _this = this;
        if (_super.prototype._load.call(this)) {
            return true;
        }
        $.get(this._url, this._params, function (d) {
            _this.addFeatures(d);
            _this.loadCallback(_this);
        }, 'json').fail(function () {
            this._loaded = false;
        });
        return false;
    };
    /**
     * callback function on map move
     * @param {object} d the json response
     * @override
     */
    LayerBaseVectorGeoJson.prototype.mapMoveCallback = function (d) {
        _super.prototype.mapMoveCallback.call(this, d);
        this._source.addFeatures(this._geoJsonFormat.readFeatures(d, { featureProjection: this._transform.featureProjection, dataProjection: this._transform.dataProjection }));
    };
    return LayerBaseVectorGeoJson;
}(LayerBaseVector_1.LayerBaseVector));
exports.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
nm.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
exports.default = LayerBaseVectorGeoJson;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 7/18/2016.
 */
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('util');
/**
 *
 * @param {Array<LayerBaseVector>|Array<ol.layer.Vector>|LayerBaseVector|ol.layer.Vector|*} layers - array of layers or single
 * @returns {ol.Extent|Array<number>|*} - collective extent
 */
function calculateExtent(layers) {
    "use strict";
    var hasExtent = false;
    var minX = 10E100;
    var minY = 10E100;
    var maxX = -10E100;
    var maxY = -10E100;
    for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
        var lyr = layers_1[_i];
        var olLayer = lyr.olLayer || lyr;
        if (olLayer.getSource().getFeatures().length > 0) {
            hasExtent = true;
            var ext = olLayer.getSource().getExtent();
            minX = ext[0] < minX ? ext[0] : minX;
            minY = ext[1] < minY ? ext[1] : minY;
            maxX = ext[2] > maxX ? ext[2] : maxX;
            maxY = ext[3] > maxY ? ext[3] : maxY;
        }
    }
    if (hasExtent) {
        return [minX, minY, maxX, maxY];
    }
    else {
        return undefined;
    }
}
exports.calculateExtent = calculateExtent;
nm.calculateExtent = calculateExtent;
/**
 * given one or an array of layers, fit to the map
 * @param layers - array of layers or single
 * @param  mp - the map to fit
 * @param [zoomOut=undefined] - levels to zoom out after fit
 */
function fitToMap(layers, mp, zoomOut) {
    "use strict";
    var ext = calculateExtent(layers);
    if (typeof ext == 'undefined') {
        return;
    }
    mp.getView().fit(ext, mp.getSize());
    if (typeof zoomOut == 'number') {
        mp.getView().setZoom(mp.getView().getZoom() - zoomOut);
    }
}
exports.fitToMap = fitToMap;
nm.calculateExtent = calculateExtent;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(1);
var crashReportURl = 'https://transportal.cee.wisc.edu/applications/crash-reports/retrieveCrashReport.do?doctnmbr=';
var $showCrashReport = $('#hidden-show-crash-report');
var showCrashReport = false;
if ($showCrashReport) {
    var crashReportVal = $showCrashReport.val();
    if (typeof crashReportVal == 'string' && crashReportVal.toLowerCase().trim() == 'y') {
        showCrashReport = true;
    }
}
exports.mmPopupContent = function (props) {
    var returnHtml = '<table class="mm-popup-table">';
    returnHtml += "<tr><td>PdpId</td><td>" + props['pdpId'] + "</td></tr>";
    returnHtml += "<tr><td>Highway</td><td>" + props['stdName'] + "</td></tr>";
    returnHtml += "<tr><td>Description</td><td>" + (props['rpDesc'] ? props['rpDesc'] : '-') + "</td></tr>";
    returnHtml += "<tr><td>Divided</td><td>" + props['divUnd'] + "</td></tr>";
    returnHtml += "<tr><td>From RP</td><td>" + props['startRp'] + "</td></tr>";
    returnHtml += "<tr><td>To RP</td><td>" + props['endRp'] + "</td></tr>";
    returnHtml += '</table>';
    return returnHtml;
};
var crashProps = [
    'doctnmbr',
    // 'multiflag',
    'accDate',
    'ntfyHour',
    'county',
    'municipality',
    'munitype',
    'onHwyRp',
    'onHwyDir',
    'onStr',
    'athHwy',
    'atStr',
    'intDir',
    'intDis',
    'accdSvr',
    'injSvr',
    'totFatl',
    'toInj',
    'accdType',
    'mnrColl',
    'accdLoc',
    'hwyClass',
    'roadCond',
    'wthrCond',
    'consZone',
    'alcFlag',
    'bikeFlag',
    'cyclFlag',
    'pedFlag',
    'totVeh',
    'lon',
    'lat'
];
function injColor(inj) {
    "use strict";
    var color = {
        'K': 'rgb(255,0,0)',
        'A': 'rgb(255,165,0)',
        'B': 'rgb(255,255,0)',
        'C': 'rgb(153,255,153)',
        'P': 'rgb(141,227,230)'
    }[inj];
    return color || 'rgba(255,255,255,0)';
}
function processVal(v) {
    if (v == null || typeof v == 'undefined') {
        return '';
    }
    else {
        return v;
    }
}
function crashReportDownload(docNum) {
    return "<a class=\"crash-map-download\" title=\"Download Crash Report\" target=\"_blank\" href=\"" + crashReportURl + docNum + "\"></a>";
}
exports.crashPointPopup = function (props) {
    var returnHtml = '<table class="crash-popup-table">';
    for (var i = 0; i < crashProps.length; i++) {
        var p = crashProps[i];
        var v = processVal(props[p]);
        if (i == 0 && showCrashReport) {
            v = "<span style=\"margin-right: 3px\">" + v + "</span>" + crashReportDownload(v);
        }
        returnHtml += "<tr><td>" + p + "&nbsp;&nbsp;</td><td>" + v + "</td></tr>";
    }
    returnHtml += '</table>';
    return returnHtml;
};
/**
 *
 * @param {Array<CrashDataObject>} crashData - array of crash data
 * @returns {string} crash summary table html
 * @private
 */
function crashInfoHelper(crashData) {
    "use strict";
    crashData.sort(function (a, b) {
        var dteA = (new Date(a['dte'] + ' ' + a['time'])).getTime();
        var dteB = (new Date(b['dte'] + ' ' + b['time'])).getTime();
        if (dteA == dteB) {
            return 0;
        }
        else {
            return dteA > dteB ? -1 : 1;
        }
    });
    var returnHtml = '';
    returnHtml += '<ul class="crash-list">';
    var crashSummary = {};
    for (var _i = 0, crashData_1 = crashData; _i < crashData_1.length; _i++) {
        var c = crashData_1[_i];
        if (typeof crashSummary[c.injSvr] == 'undefined') {
            crashSummary[c.injSvr] = 1;
        }
        else {
            crashSummary[c.injSvr]++;
        }
        returnHtml += "<li style=\"background-color: " + injColor(c.injSvr) + ";\">";
        if (showCrashReport) {
            returnHtml += crashReportDownload(c.doctnmbr);
        }
        returnHtml += c.accDate ? c.accDate : '';
        if (c.mnrColl) {
            returnHtml += ', ' + c.mnrColl;
        }
        if (c.injSvr) {
            returnHtml += ', ' + c.injSvr;
        }
        returnHtml += '</li>';
    }
    returnHtml += '</ul>';
    var crashType = {
        'K': 'Fatal',
        'A': 'Incapacitating',
        'B': 'Non-incapacitating',
        'C': 'Possible Injury',
        'P': 'Property Damage'
    };
    var tableContent = '<table class="crash-summary-table">';
    tableContent += "<tr><th colspan=\"2\">Crash Summary</th></tr>";
    tableContent += "<tr><td>Total</td><td>" + crashData.length + "</td></tr>";
    if (crashData.length > 0) {
        for (var _a = 0, _b = ['K', 'A', 'B', 'C', 'P']; _a < _b.length; _a++) {
            var k = _b[_a];
            if (typeof crashSummary[k] != 'undefined') {
                tableContent += "<tr><td>" + crashType[k] + "</td><td>" + crashSummary[k] + "</td></tr>";
            }
        }
    }
    tableContent += '</table>';
    returnHtml = tableContent + returnHtml;
    return returnHtml;
}
exports.crashInfoHelper = crashInfoHelper;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/13/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var makeGuid_1 = __webpack_require__(4);
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('domUtil');
var SelectBoxBase = (function () {
    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     * @param {contentGenerator} [contentGen=undefined]
     */
    function SelectBoxBase(parent, labelContent, contentGen) {
        var _this = this;
        var guidTop = makeGuid_1.default();
        var guid = makeGuid_1.default();
        var htmlString = "<div id=\"" + guidTop + "\">";
        htmlString += "<label for=\"" + guid + "\">" + labelContent + "</label>";
        if (contentGen) {
            htmlString += contentGen(guid);
        }
        else {
            htmlString += "<select id=\"" + guid + "\"></select>";
        }
        htmlString += '</div>';
        parent.append(htmlString);
        this._$container = parent.find('#' + guidTop);
        this.$label = this._$container.find('label');
        /**
         *
         * @type {Array<selectChangeCallback>}
         * @private
         */
        this._changeListeners = [];
        this._box = parent.find("#" + guid);
        if (!this._box) {
            throw 'the select box was not found';
        }
        this._box.change(function () {
            _this.changed();
        });
    }
    Object.defineProperty(SelectBoxBase.prototype, "box", {
        /**
         *
         * @returns {jQuery}
         */
        get: function () {
            return this._box;
        },
        enumerable: true,
        configurable: true
    });
    SelectBoxBase.prototype.changed = function () {
        var v = this._box.val();
        for (var _i = 0, _a = this._changeListeners; _i < _a.length; _i++) {
            var f = _a[_i];
            f(v);
        }
    };
    /**
     *
     * @param {selectChangeCallback} func
     */
    SelectBoxBase.prototype.addChangeListener = function (func) {
        this._changeListeners.push(func);
    };
    Object.defineProperty(SelectBoxBase.prototype, "selectedValue", {
        get: function () {
            var theVal = this.box.val();
            if (theVal == null || typeof theVal == 'undefined') {
                return null;
            }
            else if (isNaN(theVal)) {
                return theVal;
            }
            else {
                if (theVal.indexOf('.') > -1) {
                    return parseFloat(theVal);
                }
                else {
                    return parseInt(theVal);
                }
            }
        },
        /**
         *
         * @param {string|number} v
         */
        set: function (v) {
            this.box.val(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectBoxBase.prototype, "selectedText", {
        get: function () {
            return this.box.find('option:selected').text();
        },
        enumerable: true,
        configurable: true
    });
    return SelectBoxBase;
}());
exports.SelectBoxBase = SelectBoxBase;
nm.SelectBoxBase = SelectBoxBase;
exports.default = SelectBoxBase;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 12/23/2015.
 */
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('olHelpers');
/**
 * take an array of features and sort by a given property name
 */
var SortedFeatures = (function () {
    /**
     *
     * @param {Array<ol.Feature>} features array of ol features
     * @param {string} propertyName - the property name to use for lookup
     */
    function SortedFeatures(features, propertyName) {
        this.sortedFeatures = features;
        this.propertyName = propertyName;
        if (this.sortedFeatures.length > 0) {
            this._propertyType = typeof this.sortedFeatures[0].getProperties()[this.propertyName];
            var __this_1 = this;
            this.sortedFeatures.sort(function (a, b) {
                if (__this_1._propertyType == 'number') {
                    var aMinusB = a['getProperties']()[__this_1.propertyName] - b['getProperties']()[__this_1.propertyName];
                    if (aMinusB == 0) {
                        return 0;
                    }
                    else {
                        return aMinusB > 0 ? 1 : -1;
                    }
                }
                else if (__this_1._propertyType == 'string') {
                    var propA = a['getProperties']()[__this_1.propertyName] || '';
                    var propB = b['getProperties']()[__this_1.propertyName] || '';
                    propA = propA.toString().trim();
                    propB = propB.toString().trim();
                    if (propA == propB) {
                        return 0;
                    }
                    else {
                        return propA > propB ? 1 : 0;
                    }
                }
            });
        }
    }
    /**
     * recursive search to find the value
     * @param {number|string} propertyValue - the property value to search for
     * @param {boolean} [exactMatch=false] if only an exact match should be returned
     * @param {Array} [sortedFeatures=this.sortedFeatures] - the candidate features
     * @returns {ol.Feature|undefined} the feature matching the lookup
     */
    SortedFeatures.prototype.getFeature = function (propertyValue, exactMatch, sortedFeatures) {
        if (exactMatch === void 0) { exactMatch = false; }
        if (typeof sortedFeatures == 'undefined') {
            sortedFeatures = this.sortedFeatures;
        }
        if (sortedFeatures.length == 0) {
            return undefined;
        }
        if (sortedFeatures.length == 1) {
            if (exactMatch) {
                if (sortedFeatures[0].getProperties()[this.propertyName] == propertyValue) {
                    return sortedFeatures[0];
                }
                else {
                    return undefined;
                }
            }
            else {
                return sortedFeatures[0];
            }
        }
        var lowProp = sortedFeatures[0].getProperties()[this.propertyName];
        var highProp = sortedFeatures[sortedFeatures.length - 1].getProperties()[this.propertyName];
        if (exactMatch) {
            if (lowProp == propertyValue) {
                return sortedFeatures[0];
            }
            else if (propertyValue < lowProp) {
                return undefined;
            }
            else if (highProp == propertyValue) {
                return sortedFeatures[sortedFeatures.length - 1];
            }
            else if (propertyValue > highProp) {
                return undefined;
            }
        }
        else {
            if (propertyValue <= lowProp) {
                return sortedFeatures[0];
            }
            else if (propertyValue >= highProp) {
                return sortedFeatures[sortedFeatures.length - 1];
            }
        }
        var midIndex = Math.floor(sortedFeatures.length / 2);
        var midFeature = sortedFeatures[midIndex];
        var midProperty = midFeature.getProperties()[this.propertyName];
        if (midProperty === propertyValue) {
            return midFeature;
        }
        if (propertyValue < midProperty) {
            return this.getFeature(propertyValue, exactMatch, sortedFeatures.slice(0, midIndex));
        }
        else {
            return this.getFeature(propertyValue, exactMatch, sortedFeatures.slice(midIndex));
        }
    };
    return SortedFeatures;
}());
exports.SortedFeatures = SortedFeatures;
nm.SortedFeatures = SortedFeatures;
exports.default = SortedFeatures;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 8/17/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
exports.mmFlagListId = 'mm-deficiency-list';
exports.ccListId = 'cc-deficiency-list';
exports.pdpDataAttr = 'data-pdp-id';
exports.mmFlagColor = '#00FF00';
exports.controllingCriteriaColor = '#00FF00';
exports.defListId = 'deficiency-list';
exports.defColor = 'white';
// export const contollingCriteriaLookup = {
//     'ccDesignSpeed': 'Design Speed',
//     'Grade': 'Grade',
//     'Lane Width': 'Lane Width',
//     'Stopping Sight Distance': 'Stopping Sight Distance',
//     'Shoulder Width': 'Shoulder Width',
//     'Pavement Cross Slope': 'Pavement Cross Slope',
//     'Horizontal Alignment': 'Horizontal Alignment',
//     'Vertical Clearance': 'Vertical Clearance',
//     'Superelevation': 'Superelevation',
//     'Structural Capacity': 'Structural Capacity'
// };
exports.propNames = ['ccDesignSpeed', 'ccLaneWidth', 'ccShoulderWidth', 'ccHorizontalCurve', 'ccSuperelevation',
    'ccMaximumGrade', 'ccStoppingSight', 'ccCrossSlope', 'ccVerticalClearance', 'ccDesignLoading'];
exports.propValues = ['Design Speed', 'Lane Width', 'Shoulder Width', 'Horizontal Alignment', 'Superelevation',
    'Grade', 'Stopping Sight Distance', 'Pavement Cross Slope', 'Vertical Clearance', 'Structural Capacity'];
exports.controllingCriteriaProps = {};
for (var i = 0; i < exports.propNames.length; i++) {
    exports.controllingCriteriaProps[exports.propNames[i]] = exports.propValues[i];
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/11/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var LayerBaseVectorGeoJson_1 = __webpack_require__(8);
var makeGuid_1 = __webpack_require__(4);
var provide_1 = __webpack_require__(0);
var layerStyles_1 = __webpack_require__(7);
var ajaxGetters_1 = __webpack_require__(6);
var SortedFeatures_1 = __webpack_require__(12);
var layerStyles = __webpack_require__(7);
var ext = __webpack_require__(9);
var ol = __webpack_require__(2);
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
        var corName = corridorName(this.rpFrom, this.rpTo);
        if (typeof options.idx === 'number') {
            corName = "Corridor #" + options.idx;
        }
        this._corridorLayer = new LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson('', layerStyles_1.layerConfigHelper(corName, this._color, true));
        this.nodeLayer = new LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson('', {
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
                var startPoint = new ol.geom.Point(coords[0]);
                var endPoint = new ol.geom.Point(coords[coords.length - 1]);
                this.nodeLayer.olLayer.getSource().addFeature(new ol.Feature(startPoint));
                this.nodeLayer.olLayer.getSource().addFeature(new ol.Feature(endPoint));
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
        outString += "<label>Route Id</label>";
        outString += "<input type=\"text\" class=\"corridor-data-route-id\" readonly name=\"corridors[" + i + "].rdwyRteId\" value=\"" + this.routeId + "\"/><br>";
        outString += "<label>Start Pdp</label>";
        outString += "<input type=\"text\" class=\"corridor-data-from-pdp\" readonly value=\"" + this.pdpFrom + "\"/><br>";
        outString += "<label>End Pdp</label>";
        outString += "<input type=\"text\" class=\"corridor-data-to-pdp\" readonly value=\"" + this.pdpTo + "\"/><br>";
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
            return ext.calculateExtent([this.layer]);
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
exports.default = Corridor;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 7/13/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var $ = __webpack_require__(1);
var nm = provide_1.default('ssa');
var FilterBase = (function () {
    /**
     *
     * @param {string} topCheckId - top checkbox id
     * @param {string} otherChecksClass - other checkbox class identifier
     * @param {boolean} defaultOn - is on by default
     */
    function FilterBase(topCheckId, otherChecksClass, defaultOn) {
        var _this = this;
        this._topCheck = $('#' + topCheckId);
        this._subChecks = $('.' + otherChecksClass);
        /**
         *
         * @type {Array<function>}
         * @private
         */
        this._changeCallbacks = [];
        /**
         *
         * @type {Array<string>}
         */
        this._onValues = [];
        /**
         *
         * @type {Array<string>}
         */
        this._allValues = [];
        this._subChecks.each(function (ix, /** @type {HTMLElement} */ el) {
            _this._allValues.push($(el).val());
        });
        this._topCheck.prop('checked', defaultOn);
        this._setAllOnOff(defaultOn);
        this._topCheck.change(function () {
            _this._setAllOnOff(_this._topCheck.prop('checked'));
        });
        var __this = this;
        this._subChecks.change(function () {
            var $el = $(this);
            var theVal = $el.val();
            var isChecked = $el.prop('checked');
            var ix = __this._onValues.indexOf(theVal);
            if (isChecked && ix == -1) {
                __this._onValues.push(theVal);
            }
            else if (!isChecked && ix != -1) {
                __this._onValues.splice(ix, 1);
            }
            __this._topCheck.prop('checked', __this._onValues.length == __this._allValues.length);
            __this._fireCallbacks();
        });
    }
    /**
     *
     * @param {function} f - function to call on change
     */
    FilterBase.prototype.addChangeCallback = function (f) {
        this._changeCallbacks.push(f);
    };
    /**
     *
     * @param {string} val - the value to check
     * @returns {boolean} - if the property is on
     */
    FilterBase.prototype.valIsOn = function (val) {
        return this._onValues.indexOf(val) > -1;
    };
    /**
     *
     * @param {boolean} isOn - if all are on of off
     * @param {boolean} [fire=true] - if the callbacks should be fired
     * @private
     */
    FilterBase.prototype._setAllOnOff = function (isOn, fire) {
        if (fire === void 0) { fire = true; }
        this._subChecks.prop('checked', isOn);
        this._onValues = [];
        if (isOn) {
            for (var _i = 0, _a = this._allValues; _i < _a.length; _i++) {
                var v = _a[_i];
                this._onValues.push(v);
            }
        }
        if (fire) {
            this._fireCallbacks();
        }
    };
    FilterBase.prototype._fireCallbacks = function () {
        for (var _i = 0, _a = this._changeCallbacks; _i < _a.length; _i++) {
            var f = _a[_i];
            f();
        }
    };
    Object.defineProperty(FilterBase.prototype, "allValues", {
        /**
         * array of all values
         * @returns {Array<string>} all values available in the filter
         */
        get: function () {
            var outArray = [];
            for (var _i = 0, _a = this._allValues; _i < _a.length; _i++) {
                var v = _a[_i];
                outArray.push(v);
            }
            return outArray;
        },
        enumerable: true,
        configurable: true
    });
    return FilterBase;
}());
nm.FilterBase = FilterBase;
exports.default = FilterBase;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zoomResolutionConvert = __webpack_require__(37);
var provide_1 = __webpack_require__(0);
var makeGuid_1 = __webpack_require__(4);
var $ = __webpack_require__(1);
var nm = provide_1.default('layers');
/**
 * The base layer class
 * @abstract
 */
var LayerBase = (function () {
    /**
     * The base layer for all others
     * @param {string} url - url for source
     * @param {object} options - config
     * @param {string} [options.id=makeGuid()] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] - the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] - the z index for the layer
     * @param {function} [options.loadCallback] - function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] - if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] - if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent=undefined] - additional content to add to the legend
     */
    function LayerBase(url, options) {
        if (options === void 0) { options = {}; }
        options = options || {};
        if (typeof url !== 'string') {
            throw 'Invalid URL';
        }
        this._url = url;
        this._params = typeof options.params == 'object' ? options.params : {};
        this._legendCollapse = typeof options.legendCollapse == 'boolean' ? options.legendCollapse : false;
        this._legendCheckbox = typeof options.legendCheckbox == 'boolean' ? options.legendCheckbox : true;
        this.id = options.id || makeGuid_1.default();
        this._name = options.name || 'Unnamed Layer';
        this.animate = false;
        this._opacity = typeof options.opacity == 'number' ? options.opacity : 1;
        if (this._opacity > 1) {
            this._opacity = 1;
        }
        else if (this._opacity < 0) {
            this._opacity = 0;
        }
        this._visible = typeof options.visible === 'boolean' ? options.visible : true;
        this._source = undefined;
        /**
         *
         * @protected
         */
        this._olLayer = undefined;
        this._loaded = false;
        this._maxResolution = zoomResolutionConvert.zoomToResolution(options.minZoom);
        if (typeof this._maxResolution !== 'undefined') {
            this._maxResolution += 0.00001;
        }
        this._minResolution = zoomResolutionConvert.zoomToResolution(options.maxZoom);
        this._minZoom = typeof options.minZoom == 'number' ? options.minZoom : undefined;
        this._maxZoom = typeof options.maxZoom == 'number' ? options.maxZoom : undefined;
        this._zIndex = typeof options.zIndex == 'number' ? options.zIndex : 0;
        this.loadCallback = typeof options.loadCallback == 'function' ? options.loadCallback : function () {
        };
        this._legendContent = '';
        if (this._legendCheckbox) {
            this._legendContent += "<input type=\"checkbox\" " + (this.visible ? 'checked' : '') + " " +
                ("class=\"legend-check\" id=\"" + this.id + "-legend-layer-check\"><span></span>");
            this._legendContent += "<label for=\"" + this.id + "-legend-layer-check\" class=\"legend-layer-name\">" + this.name + "</label>";
        }
        else {
            this._legendContent += "<label class=\"legend-layer-name\">" + this.name + "</label>";
        }
        this._$legendDiv = null;
        this._applyCollapseCalled = false;
        this._addLegendContent(typeof options.legendContent === 'string' ? options.legendContent : undefined);
    }
    /**
     * base load function, sets _loaded = true if it is not already
     * @protected
     * @returns {boolean} if already loaded
     */
    LayerBase.prototype._load = function () {
        if (this.loaded == true) {
            return true;
        }
        else {
            this._loaded = true;
            return false;
        }
    };
    /**
     * Get the legend html, be sure to only add to the DOM once
     * @returns {string} html for layer wrapped in a div
     */
    LayerBase.prototype.getLegendDiv = function () {
        return "<div class=\"legend-layer-div\" id=\"" + this.id + "-legend-layer-div\">" + this._legendContent + "</div>";
    };
    /**
     *
     * @param additionalContent - additional content to add to legend
     * @private
     */
    LayerBase.prototype._addLegendContent = function (additionalContent) {
        if (additionalContent === void 0) { additionalContent = ''; }
        var addCollapse = additionalContent.indexOf('<ul>') > -1;
        if (addCollapse) {
            additionalContent = '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>' + additionalContent;
        }
        this._legendContent += additionalContent;
        this._$legendDiv = $("#" + this.id + "-legend-layer-div");
        if (this._$legendDiv.length > 0) {
            this._$legendDiv.append(additionalContent);
            this.applyCollapse();
        }
    };
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=] - additonal content to add
     */
    LayerBase.prototype.addLegendContent = function (additionalContent) {
        this._addLegendContent(additionalContent);
    };
    LayerBase.prototype.applyCollapse = function () {
        if (this._applyCollapseCalled) {
            console.log('collapse already applied');
            return undefined;
        }
        this._$legendDiv = $("#" + this.id + "-legend-layer-div");
        if (this._$legendDiv.length > 0) {
            var $expander = this._$legendDiv.find('.legend-items-expander');
            if ($expander.length > 0) {
                this._applyCollapseCalled = true;
                $expander.click(function () {
                    var $this = $(this);
                    $this.siblings('ul').slideToggle();
                    if ($this.hasClass('legend-layer-group-collapsed')) {
                        $this.removeClass('legend-layer-group-collapsed');
                        $this.html('&#9660;');
                    }
                    else {
                        $this.addClass('legend-layer-group-collapsed');
                        $this.html('&#9654;');
                    }
                });
                if (this._legendCollapse) {
                    $expander.trigger('click');
                }
            }
        }
    };
    /**
     * trick to refresh the layer
     */
    LayerBase.prototype.refresh = function () {
        if (this.source) {
            this.source.refresh();
        }
    };
    Object.defineProperty(LayerBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (newId) {
            this._id = newId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "animate", {
        get: function () {
            return this._animate;
        },
        set: function (animate) {
            this._animate = animate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "legendContent", {
        /**
         * get the legend content
         * @type {string}
         */
        get: function () {
            return this._legendContent;
        },
        /**
         * set the legend content directly
         * @param {string} newVal - new content
         * @protected
         */
        set: function (newVal) {
            this._legendContent = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "params", {
        /**
         * get the map get params
         * @type {object}
         */
        get: function () {
            return this._params;
        },
        /**
         * set the map get params
         * @param {object} newParams - new get params
         * @protected
         */
        set: function (newParams) {
            this._params = newParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "minResolution", {
        /**
         * get the minimum resolution
         * @type {number|*}
         */
        get: function () {
            return this._minResolution;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "maxResolution", {
        /**
         * get the maximum resolution
         * @type {number|*}
         */
        get: function () {
            return this._maxResolution;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "minZoom", {
        /**
         * get min zoom
         * @type {number|*}
         */
        get: function () {
            return this._minZoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "maxZoom", {
        /**
         * get max zoom
         * @type {number|*}
         */
        get: function () {
            return this._maxZoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "url", {
        /**
         * get the url
         * @type {string}
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "visible", {
        /**
         * Get the layer visibility
         * @type {boolean}
         */
        get: function () {
            return this._visible;
        },
        /**
         * set the visibility
         * @param visibility
         */
        set: function (visibility) {
            this.setVisible(visibility);
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.setVisible = function (visibility) {
        this._visible = visibility;
        if (this.olLayer) {
            this.olLayer.setVisible(this._visible);
            if (visibility && !this._loaded) {
                this._load();
            }
        }
    };
    Object.defineProperty(LayerBase.prototype, "opacity", {
        /**
         * Get the layer opacity
         * @type {number}
         */
        get: function () {
            return this._opacity;
        },
        /**
         * Set the layer opacity
         * @param {number} opacity - layer opacity
         */
        set: function (opacity) {
            this._opacity = opacity;
            if (this.olLayer) {
                this.olLayer.setOpacity(this._opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "name", {
        /**
         * Get the layer name
         * @type {string}
         */
        get: function () {
            return this._name;
        },
        /**
         * set the layer name
         * @param {string} newName - the new name
         */
        set: function (newName) {
            this._name = newName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "loaded", {
        /**
         * Check if the layer is loaded
         * @type {boolean}
         */
        get: function () {
            return this._loaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "source", {
        /**
         * get the layer source
         * @type {*}
         */
        get: function () {
            return this.getSource();
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.getSource = function () {
        return this._source;
    };
    Object.defineProperty(LayerBase.prototype, "zIndex", {
        /**
         * get the z index
         */
        get: function () {
            return this._zIndex;
        },
        /**
         * set the z index
         */
        set: function (newZ) {
            this._zIndex = newZ;
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.setZIndex = function (newZ) {
    };
    Object.defineProperty(LayerBase.prototype, "olLayer", {
        /**
         * the the ol layer
         */
        get: function () {
            return this.getOlLayer();
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.getOlLayer = function () {
        return this._olLayer;
    };
    return LayerBase;
}());
exports.LayerBase = LayerBase;
nm.LayerBase = LayerBase;
exports.default = LayerBase;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 12/8/2015.
 */
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('olHelpers');
/**
 * base interaction
 */
var MapInteractionBase = (function () {
    /**
     * map interaction base
     * @param subtype - the interaction subtype
     */
    function MapInteractionBase(subtype) {
        this._map = null;
        this._initialized = false;
        this._subtype = subtype;
    }
    /**
     * base initializer, returns true for already initialized
     * @param theMap - the ol Map
     * @returns true for already initialized
     */
    MapInteractionBase.prototype.init = function (theMap) {
        if (!this._initialized) {
            this._map = theMap;
            this._initialized = true;
        }
    };
    Object.defineProperty(MapInteractionBase.prototype, "map", {
        /**
         * get reference to the ol map object
         * @returns {ol.Map} the map object
         */
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInteractionBase.prototype, "initialized", {
        /**
         * get if is initialized
         * @returns {boolean} is initialized
         */
        get: function () {
            return this._initialized;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check the initialization status and throw exception if not valid yet
     * @protected
     */
    MapInteractionBase.prototype._checkInit = function () {
        if (!this.initialized) {
            var msg = this._subtype + " object not initialized";
            alert(msg);
            console.log(msg);
            throw msg;
        }
    };
    /**
     * Check the initialization status and throw exception if not valid yet
     */
    MapInteractionBase.prototype.checkInit = function () {
        this._checkInit();
    };
    return MapInteractionBase;
}());
exports.MapInteractionBase = MapInteractionBase;
nm.MapInteractionBase = MapInteractionBase;
exports.default = MapInteractionBase;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var mapMoveCls_1 = __webpack_require__(33);
/**
 * The single map move object catch is that it is common to multimap pages
 * @type {MapMoveCls}
 */
exports.mapMove = new mapMoveCls_1.default();
exports.default = exports.mapMove;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/15/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var quickMapBase_1 = __webpack_require__(36);
var provide_1 = __webpack_require__(0);
var mapMove_1 = __webpack_require__(18);
var mapPopup_1 = __webpack_require__(3);
var nm = provide_1.default('olHelpers');
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param {object} [options={}] config options
 * @param {string} [options.divId=map] map div id
 * @param {object} [options.center={}] center config object
 * @param {number} [options.center.x=-10018378] center x, web mercator x or lon
 * @param {number} [options.center.y=5574910] center y, web mercator y or lat
 * @param {number} [options.zoom=7] zoom level
 * @param {number} [options.minZoom=undefined] min zoom
 * @param {number} [options.maxZoom=undefined] max zoom
 * @param {boolean} [options.baseSwitcher=true] if add base map switcher
 * @param {boolean} [options.fullScreen=false] if add base map switcher
 * @returns {ol.Map} the ol map
 */
function quickMap(options) {
    if (options === void 0) { options = {}; }
    var m = quickMapBase_1.quickMapBase(options);
    mapMove_1.default.init(m);
    mapPopup_1.default.init(m);
    return m;
}
exports.quickMap = quickMap;
nm.quickMap = quickMap;
exports.default = quickMap;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('util.checkDefined');
/**
 * check if the input is undefined or null
 * @param input - input pointer
 * @returns true undefined or null
 */
function undefinedOrNull(input) {
    "use strict";
    return (typeof input === 'undefined' || input === null);
}
exports.undefinedOrNull = undefinedOrNull;
nm.undefinedOrNull = undefinedOrNull;
/**
 * check if the input is defined and not null
 * @param input - input pointer
 * @returns true defined and not null
 */
function definedAndNotNull(input) {
    "use strict";
    return !(undefinedOrNull(input));
}
exports.definedAndNotNull = definedAndNotNull;
nm.definedAndNotNull = definedAndNotNull;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 6/7/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('util');
/**
 * iterate over the key value pairs of an object
 * @example for (let x:KeyValuePair of keyValPairs(object)){..}
 * @param {object} obj - the input object
 * @returns {Array<keyVals>} - array of key value pairs
 */
function keyValPairs(obj) {
    var outArray = [];
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        outArray.push({ 'key': key, 'value': obj[key] });
    }
    outArray.sort(function (a, b) {
        "use strict";
        return a > b ? 1 : -1;
    });
    return outArray;
}
exports.keyValPairs = keyValPairs;
nm.keyValPairs = keyValPairs;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/13/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var makeGuid_1 = __webpack_require__(4);
var provide_1 = __webpack_require__(0);
var $ = __webpack_require__(1);
var nm = provide_1.default('ssa');
var SsaMapBase = (function () {
    function SsaMapBase(divId) {
        /**
         * @type {JQuery|*|jQuery|HTMLElement}
         */
        this.$mainContainer = $('#' + divId);
        this.$mainContainer.addClass('ssa-map-container');
        /**
         *
         * @type {string}
         * @protected
         */
        this._mapId = makeGuid_1.default();
        var mapDivHtml = "<div id=\"" + this._mapId + "\" class=\"ssa-main-map\">";
        mapDivHtml += "<div class=\"map-canvas-overlay\">";
        mapDivHtml += "<div>";
        mapDivHtml += "<h3>Generating Map Image</h3>";
        mapDivHtml += "</div>";
        mapDivHtml += "</div>";
        mapDivHtml += "</div>";
        this.$mainContainer.append(mapDivHtml);
        $('.ol-zoom-out').html('&#8211;');
        /**
         *
         * @type {MapPopupCls|undefined}
         */
        this.mainMapMove = undefined;
        /**
         *
         * @type {MapPopupCls|undefined}
         */
        this.mainMapPopup = undefined;
    }
    Object.defineProperty(SsaMapBase.prototype, "mapId", {
        get: function () {
            return this._mapId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SsaMapBase.prototype, "$mapDiv", {
        /**
         *
         * @returns {JQuery|jQuery|HTMLElement}
         * @protected
         */
        get: function () {
            return $("#" + this.mapId);
        },
        enumerable: true,
        configurable: true
    });
    return SsaMapBase;
}());
exports.SsaMapBase = SsaMapBase;
nm.SsaMapBase = SsaMapBase;
exports.default = SsaMapBase;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/17/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var countyLookup_1 = __webpack_require__(43);
var $ = __webpack_require__(1);
function labelValueHelper(label, val) {
    "use strict";
    var outHtml = '<div class="col-xs-2">';
    outHtml += "<label>" + label + "</label>";
    outHtml += "<input class=\"form-control\" type=\"text\" readonly=\"\" value=\"" + val + "\">";
    outHtml += "</div>";
    return outHtml;
}
var CorridorConfig = (function () {
    /**
     *
     * @param {jQuery|HTMLDivElement|*} inputElement
     */
    function CorridorConfig(inputElement) {
        if (!inputElement.val) {
            inputElement = $(inputElement);
        }
        this.ssaId = parseInt(inputElement.find('.corridor-data-ssa-id').val());
        this.snapshotVersion = parseInt(inputElement.find('.corridor-data-snapshot').val());
        this.corridorId = parseInt(inputElement.find('.corridor-data-corridor-id').val());
        this.startCounty = parseInt(inputElement.find('.corridor-data-start-county').val());
        this.endCounty = parseInt(inputElement.find('.corridor-data-end-county').val());
        this.hgwy = inputElement.find('.corridor-data-highway').val();
        this.startRp = inputElement.find('.corridor-data-from-rp').val();
        this.endRp = inputElement.find('.corridor-data-to-rp').val();
        this.startPdp = parseInt(inputElement.find('.corridor-data-from-pdp').val());
        this.endPdp = parseInt(inputElement.find('.corridor-data-to-pdp').val());
        this.routeId = parseInt(inputElement.find('.corridor-data-route-id').val());
    }
    /**
     * @returns {string} bootstrap formatted corridor description
     */
    CorridorConfig.prototype.bootstrapHtml = function (index) {
        index++;
        var outHtml = '<div class="row ssa-corridor-info-row">';
        outHtml += '<div class="col-xs-2">';
        outHtml += "<label>Corridor #" + index + "</label>";
        outHtml += '</div>';
        outHtml += labelValueHelper('Highway', this.hgwy);
        outHtml += labelValueHelper('Start County', countyLookup_1.getCountyById(this.startCounty));
        outHtml += labelValueHelper('End County', countyLookup_1.getCountyById(this.endCounty));
        outHtml += labelValueHelper('Start RP', this.startRp);
        outHtml += labelValueHelper('End RP', this.endRp);
        outHtml += '</div>';
        return outHtml;
    };
    CorridorConfig.prototype.toString = function () {
        return "CorId " + this.corridorId + " " + this.startRp + " - " + this.endRp;
    };
    return CorridorConfig;
}());
exports.default = CorridorConfig;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 7/14/2016.
 */
var FilterBase_1 = __webpack_require__(15);
var FilterControllingCriteria = (function (_super) {
    __extends(FilterControllingCriteria, _super);
    function FilterControllingCriteria() {
        return _super.call(this, 'filter-controlling-criteria', 'filter-controlling-criteria-sub', true) || this;
    }
    Object.defineProperty(FilterControllingCriteria.prototype, "ccDesignSpeedOn", {
        get: function () {
            return this.valIsOn('ccDesignSpeed');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccLaneWidthOn", {
        get: function () {
            return this.valIsOn('ccLaneWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccShoulderWidthOn", {
        get: function () {
            return this.valIsOn('ccShoulderWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccHorizontalCurveOn", {
        get: function () {
            return this.valIsOn('ccHorizontalCurve');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccSuperelevationOn", {
        get: function () {
            return this.valIsOn('ccSuperelevation');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccMaximumGradeOn", {
        get: function () {
            return this.valIsOn('ccMaximumGrade');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccStoppingSightOn", {
        get: function () {
            return this.valIsOn('ccStoppingSight');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccCrossSlopeOn", {
        get: function () {
            return this.valIsOn('ccCrossSlope');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccVerticalClearanceOn", {
        get: function () {
            return this.valIsOn('ccVerticalClearance');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccDesignLoadingOn", {
        get: function () {
            return this.valIsOn('ccDesignLoading');
        },
        enumerable: true,
        configurable: true
    });
    return FilterControllingCriteria;
}(FilterBase_1.default));
exports.FilterControllingCriteria = FilterControllingCriteria;
exports.default = new FilterControllingCriteria();


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 7/14/2016.
 */
var FilterBase_1 = __webpack_require__(15);
exports.kColor = 'rgb(255,0,0)';
exports.aColor = 'rgb(255,165,0)';
exports.bColor = 'rgb(255,255,0)';
exports.cColor = 'rgb(153,255,153)';
exports.oColor = 'rgb(0,0,255)';
var FilterCrash = (function (_super) {
    __extends(FilterCrash, _super);
    function FilterCrash() {
        return _super.call(this, 'filter-crash', 'filter-crash-sub', false) || this;
    }
    /**
     *
     * @param {string} val - the lookup value
     * @returns {string|null} crash color or null if the crash type should be suppressed
     */
    FilterCrash.prototype.getCrashColor = function (val) {
        var isActive = _super.prototype.valIsOn.call(this, val);
        if (!isActive) {
            return null;
        }
        var color = {
            'K': exports.kColor,
            'A': exports.aColor,
            'B': exports.bColor,
            'C': exports.cColor,
            'P': exports.oColor
        }[val];
        return color || 'rgb(128,128,128)';
    };
    return FilterCrash;
}(FilterBase_1.default));
exports.FilterCrash = FilterCrash;
exports.default = new FilterCrash();


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 7/14/2016.
 */
var FilterBase_1 = __webpack_require__(15);
var FilterMmFlag = (function (_super) {
    __extends(FilterMmFlag, _super);
    function FilterMmFlag() {
        return _super.call(this, 'mm-flags', 'mm-flags-sub', true) || this;
    }
    Object.defineProperty(FilterMmFlag.prototype, "mmRateFlagOn", {
        get: function () {
            return this.valIsOn('rateFlag');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMmFlag.prototype, "mmKabFlagOn", {
        get: function () {
            return this.valIsOn('kabCrshFlag');
        },
        enumerable: true,
        configurable: true
    });
    return FilterMmFlag;
}(FilterBase_1.default));
exports.FilterMmFlag = FilterMmFlag;
exports.default = new FilterMmFlag();


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/13/2016.
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SsaMapBase_1 = __webpack_require__(22);
var quickMap_1 = __webpack_require__(19);
var mapPopup_1 = __webpack_require__(3);
var makeGuid_1 = __webpack_require__(4);
var provide_1 = __webpack_require__(0);
var PickerCollection_1 = __webpack_require__(41);
var CorridorCollection_1 = __webpack_require__(39);
var $ = __webpack_require__(1);
__webpack_require__(1);
var nm = provide_1.default('ssa');
var SsaMapCreate = (function (_super) {
    __extends(SsaMapCreate, _super);
    /**
     *
     * @param {string} divId
     * @param {string} corridorDataContainer
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     */
    function SsaMapCreate(divId, corridorDataContainer, dataClass) {
        var _this = _super.call(this, divId) || this;
        _this.$mainContainer.prepend("<div class=\"ssa-map-sidebar\"></div>");
        _this.mainMap = quickMap_1.default({
            divId: _this.mapId,
            minZoom: 6,
            zoom: 6,
            fullScreen: true,
            addGeocode: true
        });
        _this.mainMapPopup = mapPopup_1.mapPopup;
        _this.$sideBar = _this.$mainContainer.find('.ssa-map-sidebar');
        var afterChange = function () {
            _this._afterChange();
        };
        _this.pickerCollection = new PickerCollection_1.default(_this.$sideBar, _this.mainMap);
        var corridorsGuid = makeGuid_1.default();
        _this.$sideBar.append("<div id=\"" + corridorsGuid + "\"></div>");
        _this.corridorCollection = new CorridorCollection_1.default(_this.$sideBar, _this.mainMap, corridorDataContainer, afterChange, dataClass);
        _this.pickerCollection.corridorCollection = _this.corridorCollection;
        _this.corridorCollection.loadExistingCorridors();
        return _this;
    }
    SsaMapCreate.prototype._afterChange = function () {
        var __this = this;
        this.corridorCollection.$innerContainer.find('.corridor-zoom').click(function () {
            var corridorId = $(this).attr('data-corridor');
            var cor = __this.corridorCollection.getCorridorById(corridorId);
            __this.mainMap.getView().fit(cor.extent, __this.mainMap.getSize());
        });
        this.corridorCollection.$innerContainer.find('.corridor-delete').click(function () {
            var corridorId = $(this).attr('data-corridor');
            __this.corridorCollection.removeCorridor(corridorId);
        });
        this.corridorCollection.$innerContainer.find('.corridor-edit').click(function () {
            __this.pickerCollection.$createCorridorButton.prop('disabled', true);
            var corridorId = $(this).attr('data-corridor');
            var cor = __this.corridorCollection.getCorridorById(corridorId);
            __this.pickerCollection.startPicker(cor);
            $(this).closest('.corridor-tr').addClass('corridor-tr-selected');
        });
    };
    return SsaMapCreate;
}(SsaMapBase_1.default));
exports.SsaMapCreate = SsaMapCreate;
nm.SsaMapCreate = SsaMapCreate;
window['SsaMapCreate'] = SsaMapCreate;
exports.default = SsaMapCreate;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/13/2016.
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SsaMapBase_1 = __webpack_require__(22);
var quickMap_1 = __webpack_require__(19);
var mapPopup_1 = __webpack_require__(3);
var provide_1 = __webpack_require__(0);
var CorridorConfig_1 = __webpack_require__(23);
var Corridor_1 = __webpack_require__(14);
var calcExtent = __webpack_require__(9);
var crashData_1 = __webpack_require__(42);
var mapToBase64_1 = __webpack_require__(35);
var Deficiency_1 = __webpack_require__(40);
var constants = __webpack_require__(13);
var ajaxGetters_1 = __webpack_require__(6);
var $ = __webpack_require__(1);
var popup_1 = __webpack_require__(10);
// import controllingCriteria from '../collections/controllingCriteria';
// import mmFlags from '../collections/mmFlags';
var nm = provide_1.default('ssa');
var mmPopupContentWithCrash = function (props) {
    "use strict";
    var returnHtml = '';
    returnHtml += crashData_1.default.getCrashSummary(props['pdpId']);
    returnHtml += popup_1.mmPopupContent(props);
    return returnHtml;
};
var SsaMapView = (function (_super) {
    __extends(SsaMapView, _super);
    /**
     *
     * @param {string} divId - container for the map
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     * @param {string} [infoAnchorId=ssa-corridor-info-anchor] - id of element after which to insert the info rows
     */
    function SsaMapView(divId, dataClass, infoAnchorId) {
        var _this = _super.call(this, divId) || this;
        _this._ssaId = parseInt($('#hidden-ssa-id').val());
        _this._snap = parseInt($('#hidden-snapshot-id').val());
        _this.getMapLinkId = 'get-map-link';
        _this.mapImageName = "map-image-id-" + _this._ssaId + "-ver-" + _this._snap + ".png";
        var linkHtml = "<a id=\"" + _this.getMapLinkId + "\" href=\"#\" " +
            ("download=\"" + _this.mapImageName + "\" ") +
            "style=\"display: none\"></a>";
        $('#' + _this.mapId).append(linkHtml);
        _this.mainMap = quickMap_1.default({
            divId: _this.mapId,
            minZoom: 6,
            zoom: 6,
            fullScreen: true,
            addGeocode: true
        });
        var summaryListHtml = '<div class="segment-index-summary">';
        summaryListHtml += '<div class="segment-index-summary-toggles">';
        summaryListHtml += "<span class=\"segment-index-summary-toggle segment-index-summary-zoom\" title=\"Zoom To Initial Extent\">&#8634;</span>";
        summaryListHtml += "<span class=\"segment-index-summary-toggle segment-index-summary-close\" title=\"Hide Legend\">&#8598;</span>";
        summaryListHtml += "<span class=\"segment-index-summary-toggle segment-index-summary-open\" title=\"Show Legend\">&#8600;</span>";
        summaryListHtml += '</div>';
        // summaryListHtml += `<h4 style="color: ${constants.mmFlagColor}">Metamanager Flags</h4>`;
        // summaryListHtml += `<ul id="${constants.mmFlagListId}"></ul>`;
        // summaryListHtml += `<h4 style="color: ${constants.controllingCriteriaColor}">Controlling Criteria</h4>`;
        // summaryListHtml += `<ul id="${constants.ccListId}"></ul>`;
        summaryListHtml += "<h4 style=\"color: " + constants.defColor + "; font-size: large\">Flags and Deficiencies</h4>";
        summaryListHtml += "<ul id=\"" + constants.defListId + "\"></ul>";
        summaryListHtml += '</div>';
        _this.$mapDiv.append(summaryListHtml);
        var $legendDiv = _this.$mapDiv.find('.segment-index-summary');
        var $closeButton = $legendDiv.find('.segment-index-summary-close');
        var $openButton = $legendDiv.find('.segment-index-summary-open');
        var $zoomExtent = $legendDiv.find('.segment-index-summary-zoom');
        $openButton.hide();
        var hideShowWorking = false;
        var originalWidth = $legendDiv.width();
        var originalMinHeight = $legendDiv.css('min-height');
        var originalPadding = $legendDiv.css('padding');
        $closeButton.click(function () {
            if (hideShowWorking) {
                return;
            }
            hideShowWorking = true;
            $legendDiv.find('ul, h3, h4, h5').fadeOut(100, function () {
                $legendDiv.css('padding', '2px');
                $legendDiv.width('auto');
                $legendDiv.css('min-height', 'auto');
                $closeButton.hide();
                $openButton.show();
                hideShowWorking = false;
            });
        });
        $openButton.click(function () {
            if (hideShowWorking) {
                return;
            }
            hideShowWorking = true;
            $legendDiv.css('padding', originalPadding);
            $legendDiv.width(originalWidth);
            $legendDiv.css('min-height', originalMinHeight);
            $legendDiv.find('ul, h3, h4, h5').fadeIn(100, function () {
                $closeButton.show();
                $openButton.hide();
                hideShowWorking = false;
            });
        });
        $zoomExtent.click(function () {
            _this._fitExtent();
        });
        _this.mainMapPopup = mapPopup_1.default;
        dataClass = typeof dataClass == 'string' ? dataClass : 'corridor-data';
        infoAnchorId = typeof infoAnchorId == 'string' ? infoAnchorId : 'ssa-corridor-info-anchor';
        dataClass = '.' + dataClass;
        $(_this.mainMap.getTargetElement()).append('<div class="crashes-loaded-msg">Crashes Loaded</div>');
        /**
         *
         * @type {Array<CorridorConfig>}
         */
        var corridorConfigs = [];
        /**
         *
         * @type {Array<Corridor>}
         */
        _this._corridorArray = [];
        // parse the data from the hidden input elements
        $(dataClass).each(function (n, el) {
            corridorConfigs.push(new CorridorConfig_1.default(el));
        });
        _this.createdCorridorsLength = corridorConfigs.length;
        _this.loadedCorridorsLength = 0;
        var returnLookup = {};
        var returnArr = [];
        ajaxGetters_1.default.getCcGeom(_this._ssaId, _this._snap, function (d) {
            for (var _i = 0, _a = d['features']; _i < _a.length; _i++) {
                var f = _a[_i];
                var corId = f['properties']['corridorId'].toFixed();
                if (!returnLookup[corId]) {
                    returnArr.push(corId);
                    returnLookup[corId] = { crs: d['crs'], type: d['type'], features: [] };
                }
                returnLookup[corId].features.push(f);
            }
            var outHtml = '';
            for (var i = 0; i < returnArr.length; i++) {
                var conf = corridorConfigs[i];
                outHtml += conf.bootstrapHtml(i);
                var corridor = new Corridor_1.default(conf.startPdp, conf.endPdp, conf.startRp, conf.endRp, conf.startCounty, conf.endCounty, conf.hgwy, conf.routeId, {
                    color: 'black',
                    jsonFeatures: returnLookup[i.toFixed()],
                    idx: i + 1
                });
                // mmFlags.addCorridor(corridor);
                // controllingCriteria.addCorridor(corridor);
                Deficiency_1.default.addCorridor(corridor);
                _this._corridorArray.push(corridor);
                _this.mainMap.addLayer(corridor.olLayer);
                _this.mainMap.addLayer(corridor.nodeLayer.olLayer);
                _this.mainMapPopup.addVectorPopup(corridor.layer, mmPopupContentWithCrash);
            }
            _this._afterCorridorLoad();
            $('#' + infoAnchorId).after(outHtml);
        });
        // mmFlags.init(this.mainMap);
        // controllingCriteria.init(this.mainMap);
        Deficiency_1.default.init(_this.mainMap);
        return _this;
    }
    SsaMapView.prototype.getMapData = function (callback, options) {
        options = options || {};
        options.delay = typeof options.delay === 'number' ? options.delay : 2000;
        options.layers = this._fitExtent();
        mapToBase64_1.mapToBase64(this.mainMap, callback, options);
    };
    SsaMapView.prototype._afterCorridorLoad = function () {
        this._fitExtent();
        crashData_1.default.init(this.mainMap, this._ssaId, this._snap);
        // mmFlags.afterLoad();
        // controllingCriteria.afterLoad();
        Deficiency_1.default.afterLoad();
    };
    SsaMapView.prototype._fitExtent = function () {
        var lyrs = [];
        for (var _i = 0, _a = this._corridorArray; _i < _a.length; _i++) {
            var c = _a[_i];
            lyrs.push(c.layer);
        }
        if (lyrs.length > 0) {
            calcExtent.fitToMap(lyrs, this.mainMap);
        }
        return lyrs;
    };
    return SsaMapView;
}(SsaMapBase_1.default));
exports.SsaMapView = SsaMapView;
nm.SsaMapView = SsaMapView;
window['SsaMapView'] = SsaMapView;
exports.default = SsaMapView;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LayerBase_1 = __webpack_require__(16);
var mapMove_1 = __webpack_require__(18);
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var nm = provide_1.default('layers');
/**
 * The Vector layer base
 * @augments LayerBase
 * @abstract
 */
var LayerBaseVector = (function (_super) {
    __extends(LayerBaseVector, _super);
    /**
     * The base vector layer
     * @param {string} url - pass an empty string to prevent default load and add from a json source
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     */
    function LayerBaseVector(url, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, url, options) || this;
        options = options;
        //prevent regular load if no url has been provided
        if (_this.url.trim() == '') {
            _this._loaded = true;
        }
        _this._style = typeof options.style == 'undefined' ? undefined : options.style;
        if (_this.visible) {
            _this._autoLoad = true;
        }
        else {
            _this._autoLoad = (typeof options['autoLoad'] == 'boolean' ? options['autoLoad'] : false);
        }
        _this._onDemand = typeof options.onDemand == 'boolean' ? options.onDemand : false;
        _this._onDemandDelay = typeof options.onDemandDelay == 'number' ? options.onDemandDelay : 300;
        if (options.mapMoveObj) {
            _this._mapMove = options.mapMoveObj;
        }
        else {
            _this._mapMove = _this._onDemand ? mapMove_1.default : undefined;
        }
        _this._mapMoveMakeGetParams = typeof options.mapMoveMakeGetParams == 'function' ? options.mapMoveMakeGetParams :
            function () { return {}; };
        if (_this._onDemand) {
            _this._loaded = true;
            _this._mapMoveParams = {};
            _this._mapMove.checkInit();
            _this._mapMove.addVectorLayer(_this);
        }
        _this._source = new ol.source.Vector();
        _this._olLayer = new ol.layer.Vector({
            source: _this._source,
            visible: _this.visible,
            style: _this.style,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution,
            renderOrder: options.renderOrder
        });
        _this.olLayer.setZIndex(_this._zIndex);
        _this._projectionMap = null;
        _this._projection4326 = new ol.proj.Projection({ code: "EPSG:4326" });
        _this._olLayer.setOpacity(_this.opacity);
        return _this;
    }
    /**
     * dummy to be overridden
     * @param {object} featureCollection - geojson or esrijson object
     */
    LayerBaseVector.prototype.addFeatures = function (featureCollection) {
        console.log('Layer vector base addFeatures is a placeholder and does nothing');
    };
    /**
     * Before call to map move callback, can prevent call by returning false
     * @param {number} zoom - zoom level
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     * @returns {boolean} if the call should proceed
     */
    LayerBaseVector.prototype.mapMoveBefore = function (zoom, evtType) {
        if (this.minZoom !== undefined) {
            if (zoom < this.minZoom) {
                return false;
            }
        }
        if (this.maxZoom !== undefined) {
            if (zoom > this.maxZoom) {
                return false;
            }
        }
        return this.visible;
    };
    /**
     * callback to generate the parameters passed in the get request
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     */
    LayerBaseVector.prototype.mapMoveMakeGetParams = function (extent, zoomLevel) {
        this._mapMoveParams = {};
        $.extend(this._mapMoveParams, this.params);
        $.extend(this._mapMoveParams, this._mapMoveMakeGetParams(this, extent, zoomLevel));
    };
    /**
     * callback function on map move
     * @param {object} d - the json response
     */
    LayerBaseVector.prototype.mapMoveCallback = function (d) {
        if (this.source) {
            this._source.clear();
        }
    };
    /**
     * clear features in the layer
     */
    LayerBaseVector.prototype.clear = function () {
        if (this._source) {
            this._source.clear();
        }
    };
    Object.defineProperty(LayerBaseVector.prototype, "onDemandDelay", {
        /**
         * get on demand delay in miliseconds
         */
        get: function () {
            return this._onDemandDelay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "autoLoad", {
        /**
         * get if the layer is autoloaded
         */
        get: function () {
            return this._autoLoad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "style", {
        /**
         * get the style definition
         */
        get: function () {
            return this._style;
        },
        /**
         * set the style
         * @param style - the style or function
         */
        set: function (style) {
            this._style = style;
            this.olLayer.setStyle(this._style);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "mapCrs", {
        /**
         * get the map CRS if it is defined by the map move object
         */
        get: function () {
            return this.mapProj == null ? null : this.mapProj.getCode();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "mapProj", {
        get: function () {
            if (this._projectionMap != null) {
                return this._projectionMap;
            }
            if (this._mapMove) {
                this._projectionMap = this._mapMove.map.getView().getProjection();
                return this._projectionMap;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "mapMove", {
        /**
         * get the map move object
         * @type {MapMoveCls|*}
         */
        get: function () {
            return this._mapMove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "mapMoveParams", {
        /**
         * map move params
         * @type {object}
         */
        get: function () {
            return this._mapMoveParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        /**
         * Set the layer visibility
         * @type {boolean}
         * @override
         */
        set: function (visibility) {
            _super.prototype.setVisible.call(this, visibility);
            if (this._onDemand) {
                this.mapMove.triggerLyrLoad(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "source", {
        /**
         * get the layer vector source
         * @override
         */
        get: function () {
            return this.getSource();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "features", {
        /**
         * array of ol features
         */
        get: function () {
            return this.source.getFeatures();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseVector.prototype, "olLayer", {
        /**
         *
         */
        get: function () {
            return _super.prototype.getOlLayer.call(this);
        },
        enumerable: true,
        configurable: true
    });
    LayerBaseVector.prototype.setZIndex = function (newZ) {
        this.olLayer.setZIndex(newZ);
    };
    return LayerBaseVector;
}(LayerBase_1.LayerBase));
exports.LayerBaseVector = LayerBaseVector;
nm.LayerBaseVector = LayerBaseVector;
exports.default = LayerBaseVector;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 12/7/2015.
 */
var LayerBase_1 = __webpack_require__(16);
var esriToOl = __webpack_require__(31);
var mapPopup_1 = __webpack_require__(3);
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var nm = provide_1.default('layers');
/**
 * Helper to return the url to the service on the production server
 * @param {string} folder
 * @param {string} service
 * @returns {string}
 */
function makeServiceUrl(folder, service) {
    return "https://transportal.cee.wisc.edu/applications/arcgis2/rest/services/" + folder + "/" + service + "/MapServer";
}
exports.makeServiceUrl = makeServiceUrl;
function localCacheUrl(folder, service) {
    var loc = window.location.href;
    var url = "/mapserver/" + folder + "/" + service;
    if (loc.indexOf('transportal.cee.wisc.edu') > -1) {
        if (loc.toLowerCase().indexOf('webmapsstage') > -1) {
            url = 'https://transportal.cee.wisc.edu/gis/webmapsstage' + url;
        }
        else {
            url = 'https://transportal.cee.wisc.edu/gis/webmaps' + url;
        }
    }
    return url;
}
exports.localCacheUrl = localCacheUrl;
/**
 * esri mapserver layer
 * @augments LayerBase
 */
var LayerEsriMapServer = (function (_super) {
    __extends(LayerEsriMapServer, _super);
    /**
     * The base layer for all others
     * @param {string} url - resource url
     * @param {object} [options] - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     * @param {boolean} [options.addPopup=false] if a popup should be added
     * @param {undefined|Array<number>} [options.showLayers=undefined] if a popup should be added
     */
    function LayerEsriMapServer(url, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, url, options) || this;
        _this._source = new ol.source.TileArcGISRest({
            url: _this.url == '' ? undefined : _this.url,
            params: typeof options.showLayers == 'undefined' ? undefined : { layers: 'show:' + options.showLayers.join(',') }
        });
        _this._showLayers = options.showLayers || [];
        _this._olLayer = new ol.layer.Tile({
            source: _this._source,
            visible: _this.visible,
            opacity: _this.opacity,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution
        });
        _this._olLayer.setZIndex(_this._zIndex);
        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;
        _this._esriFormat = new ol.format.EsriJSON();
        _this._popupRequest = null;
        options.getLegend = typeof options.getLegend === 'boolean' ? options.getLegend : true;
        if (options.getLegend) {
            _this.addLegendContent();
        }
        if (options.addPopup) {
            mapPopup_1.default.addMapServicePopup(_this);
        }
        return _this;
    }
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    LayerEsriMapServer.prototype.addLegendContent = function (additionalContent) {
        var _this = this;
        var urlCopy = this.url;
        if (urlCopy[urlCopy.length - 1] !== '/') {
            urlCopy += '/';
        }
        urlCopy += 'legend?f=pjson&callback=?';
        $.get(urlCopy, {}, function (d) {
            var newHtml = esriToOl.makeMapServiceLegend(d, _this._showLayers);
            _super.prototype.addLegendContent.call(_this, newHtml);
        }, 'json');
    };
    LayerEsriMapServer.prototype.getPopupInfo = function (queryParams) {
        if (!this.visible) {
            return;
        }
        var urlCopy = this.url;
        if (urlCopy[urlCopy.length - 1] != '/') {
            urlCopy += '/';
        }
        urlCopy += 'identify?callback=?';
        var __this = this;
        if (this._popupRequest != null) {
            this._popupRequest.abort();
        }
        this._popupRequest = $.get(urlCopy, queryParams, function (d) {
            for (var _i = 0, _a = d['results']; _i < _a.length; _i++) {
                var r = _a[_i];
                var popupHtml = '<table class="esri-popup-table">';
                for (var a in r['attributes']) {
                    if (r['attributes'].hasOwnProperty(a)) {
                        var attrVal = r['attributes'][a];
                        if (attrVal == null || attrVal.toString().toLowerCase() == 'null') {
                            continue;
                        }
                        var attr = a;
                        if (attr.length > 14) {
                            attr = attr.slice(0, 11) + '...';
                        }
                        popupHtml += "<tr><td>" + attr + "</td><td>" + attrVal + "</td></tr>";
                    }
                }
                popupHtml += '</table>';
                mapPopup_1.default.addMapServicePopupContent(__this._esriFormat.readFeature(r), __this, popupHtml, r['layerName']);
            }
        }, 'json');
        this._popupRequest.always(function () {
            __this._popupRequest = null;
        });
    };
    Object.defineProperty(LayerEsriMapServer.prototype, "source", {
        /**
         *
         * @returns {ol.source.TileArcGISRest} the vector source
         */
        get: function () {
            return _super.prototype.getSource.call(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerEsriMapServer.prototype, "olLayer", {
        /**
         *
         * @returns the ol layer
         */
        get: function () {
            return _super.prototype.getOlLayer.call(this);
        },
        enumerable: true,
        configurable: true
    });
    return LayerEsriMapServer;
}(LayerBase_1.LayerBase));
exports.LayerEsriMapServer = LayerEsriMapServer;
nm.LayerEsriMapServer = LayerEsriMapServer;
exports.default = LayerEsriMapServer;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 1/4/2016.
 */
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var nm = provide_1.default('olHelpers.esriToOlStyle');
/**
 *
 * @param {Array<number>} colorArray - input color array
 * @param {number} opacity - the opacity 0 to 1
 * @returns {string} rgba string
 * @private
 */
function _colorArrayToRgba(colorArray, opacity) {
    "use strict";
    return "rgba(" + colorArray[0] + "," + colorArray[1] + "," + colorArray[2] + "," + opacity + ")";
}
/**
 * escape html charcters
 * @param {string} str - input string
 * @returns {string} escaped string
 */
function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
nm.htmlEscape = htmlEscape;
var CommonSymbol = (function () {
    /**
     *
     * @param symbolObj
     * @param {number} opacity
     */
    function CommonSymbol(symbolObj, opacity) {
        this.symbolObj = symbolObj;
        this.opacity = opacity;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
    return CommonSymbol;
}());
var PointSymbol = (function (_super) {
    __extends(PointSymbol, _super);
    function PointSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj.type) {
            case 'esriSMS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var outerColor = _colorArrayToRgba(_this.symbolObj.outline.color, _this.opacity);
                var outlineWidth = _this.symbolObj.outline.width;
                var radius = _this.symbolObj.size;
                _this.olStyle = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: radius,
                        fill: new ol.style.Fill({
                            color: innerColor
                        }),
                        stroke: new ol.style.Stroke({ color: outerColor, width: outlineWidth })
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" style=\"color: " + innerColor + "\">&#9679;</span>";
                break;
            case 'esriPMS':
                _this.olStyle = new ol.style.Style({
                    image: new ol.style.Icon({ src: "data:image/png;base64," + _this.symbolObj['imageData'] })
                });
                _this.legendHtml = "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + _this.symbolObj['imageData'] + "\">";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Point symbol does not handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return PointSymbol;
}(CommonSymbol));
var LineSymbol = (function (_super) {
    __extends(LineSymbol, _super);
    function LineSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj.type) {
            case 'esriSLS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var lineWidth = _this.symbolObj.width;
                _this.olStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: innerColor,
                        //lineDash: [4],
                        width: lineWidth
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" ";
                _this.legendHtml += "style=\"";
                _this.legendHtml += "background-color: " + innerColor + ";";
                _this.legendHtml += "width: 40px;";
                _this.legendHtml += "height: 4px;";
                _this.legendHtml += "position: relative;";
                _this.legendHtml += "display: inline-block;";
                _this.legendHtml += "top: -1px;";
                _this.legendHtml += "\"></span>";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Line symbol does not handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return LineSymbol;
}(CommonSymbol));
var PolygonSymbol = (function (_super) {
    __extends(PolygonSymbol, _super);
    function PolygonSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj['type']) {
            case 'esriSFS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var outerColor = _colorArrayToRgba(_this.symbolObj.outline.color, _this.opacity);
                var outlineWidth = _this.symbolObj.outline.width;
                _this.olStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new ol.style.Fill({
                        color: innerColor
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" ";
                _this.legendHtml += "style=\"";
                _this.legendHtml += "background-color: " + innerColor + ";";
                _this.legendHtml += "border: solid " + outerColor + " 1px;";
                _this.legendHtml += "width: 40px;";
                _this.legendHtml += "height: 9px;";
                _this.legendHtml += "position: relative;";
                _this.legendHtml += "display: inline-block;";
                _this.legendHtml += "top: 2px;";
                _this.legendHtml += "\"></span>";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Polygon symbol does handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return PolygonSymbol;
}(CommonSymbol));
var SymbolGenerator = (function () {
    function SymbolGenerator(esriResponse) {
        this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
        this.renderer = esriResponse.drawingInfo.renderer;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
    return SymbolGenerator;
}());
var SingleSymbol = (function (_super) {
    __extends(SingleSymbol, _super);
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the symbol class to use
     */
    function SingleSymbol(esriResponse, SymbolClass) {
        var _this = _super.call(this, esriResponse) || this;
        _this.symbol = _this.renderer.symbol;
        var symbolObj = new SymbolClass(_this.symbol, _this.opacity);
        _this.olStyle = symbolObj.olStyle;
        _this.legendHtml = symbolObj.legendHtml;
        return _this;
    }
    return SingleSymbol;
}(SymbolGenerator));
var UniqueValueSymbol = (function (_super) {
    __extends(UniqueValueSymbol, _super);
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the Symbol class definition
     */
    function UniqueValueSymbol(esriResponse, SymbolClass) {
        var _this = _super.call(this, esriResponse) || this;
        _this.uniqueValueInfos = _this.renderer.uniqueValueInfos;
        _this.propertyName = _this.renderer.field1;
        _this.defaultSymbol = _this.renderer.defaultSymbol;
        if (_this.defaultSymbol) {
            var symbolObj = new SymbolClass(_this.defaultSymbol, _this.opacity);
            _this.defaultStyle = symbolObj.olStyle;
            _this.defaultLabelHtml = "<span class=\"legend-layer-subitem\">" + htmlEscape(_this.renderer['defaultLabel']) + "</span>" + symbolObj.legendHtml;
        }
        else {
            _this.defaultStyle = undefined;
            _this.defaultLabelHtml = 'other';
        }
        _this.valueArray = [];
        _this.labelArray = [];
        _this.legendArray = [];
        _this.propertyStyleLookup = {};
        for (var _i = 0, _a = _this.uniqueValueInfos; _i < _a.length; _i++) {
            var uniqueVal = _a[_i];
            _this.labelArray.push(uniqueVal['label']);
            _this.valueArray.push(uniqueVal['value']);
            var uniqueSym = new SymbolClass(uniqueVal.symbol, _this.opacity);
            _this.legendArray.push("<span class=\"legend-layer-subitem\">" + htmlEscape(uniqueVal['label']) + "</span>" + uniqueSym.legendHtml);
            _this.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
        }
        _this.olStyle = function (feature) {
            var checkProperties = feature.getProperties();
            var checkProperty = checkProperties[_this.propertyName];
            if (_this.propertyStyleLookup[checkProperty] !== undefined) {
                return [_this.propertyStyleLookup[checkProperty]];
            }
            else {
                return [_this.defaultStyle];
            }
        };
        if (_this.defaultLabelHtml !== null) {
            _this.legendArray.push(_this.defaultLabelHtml);
        }
        _this.legendHtml = '<ul>';
        for (var _b = 0, _c = _this.legendArray; _b < _c.length; _b++) {
            var h = _c[_b];
            _this.legendHtml += "<li>" + h + "</li>";
        }
        _this.legendHtml += '</ul>';
        return _this;
    }
    return UniqueValueSymbol;
}(SymbolGenerator));
function makeFeatureServiceLegendAndSymbol(esriResponse) {
    "use strict";
    var renderer = esriResponse.drawingInfo.renderer;
    var symbolLegendOut = null;
    switch (renderer.type) {
        case 'simple':
            switch (esriResponse.geometryType) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new SingleSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new SingleSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new SingleSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse.geometryType + ' not handled');
            }
            break;
        case 'uniqueValue':
            switch (esriResponse.geometryType) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse['geometryType'] + ' not handled');
            }
            break;
        default:
            alert('not handled renderer type: ' + renderer['type']);
    }
    if (symbolLegendOut == null) {
        return { style: undefined, legend: '' };
    }
    else {
        return { style: symbolLegendOut.olStyle, legend: symbolLegendOut.legendHtml };
    }
}
exports.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
nm.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
/**
 *
 * @param {object} lyrObject - the layer as defined in the response
 * @param {boolean} [skipLayerNameAndExpander=false] use only icons
 * @returns {string} legend html
 */
function mapServiceLegendItem(lyrObject, skipLayerNameAndExpander) {
    if (skipLayerNameAndExpander === void 0) { skipLayerNameAndExpander = false; }
    skipLayerNameAndExpander = typeof skipLayerNameAndExpander == 'boolean' ? skipLayerNameAndExpander : false;
    var layerName = lyrObject['layerName'];
    var legendItems = lyrObject['legend'];
    var legendHtml = '';
    if (!skipLayerNameAndExpander) {
        legendHtml += "<span class=\"legend-layer-subitem\">" + layerName + "</span>";
    }
    if (legendItems.length == 1) {
        legendHtml = "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + legendItems[0]['imageData'] + "\">";
    }
    else {
        if (!skipLayerNameAndExpander) {
            legendHtml += '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>';
        }
        legendHtml += '<ul>';
        for (var i = 0; i < legendItems.length; i++) {
            legendHtml += "<li>";
            legendHtml += "<span class=\"legend-layer-subitem\">" + htmlEscape(legendItems[i]['label']) + "</span>";
            legendHtml += "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + legendItems[i]['imageData'] + "\">";
            legendHtml += "</li>";
        }
        legendHtml += '</ul>';
    }
    if (!skipLayerNameAndExpander) {
        legendHtml = "<span class=\"legend-layer-subitem\">" + layerName + "</span>" + legendHtml;
    }
    return legendHtml;
}
/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @param  showLayers - limited number of layers to show in map service
 * @returns {string} legend content
 */
function makeMapServiceLegend(esriResponse, showLayers) {
    "use strict";
    if (showLayers === void 0) { showLayers = []; }
    var newLegendHtml = '';
    var layers = esriResponse['layers'];
    if (layers.length == 1) {
        newLegendHtml += mapServiceLegendItem(layers[0], true);
    }
    else {
        newLegendHtml += '<ul>';
        for (var i = 0; i < layers.length; i++) {
            if (showLayers.length > 0 && showLayers.indexOf(i) < 0) {
                continue;
            }
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }
    return newLegendHtml;
}
exports.makeMapServiceLegend = makeMapServiceLegend;
nm.makeMapServiceLegend = makeMapServiceLegend;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(1);
var makeGuid_1 = __webpack_require__(4);
var ol = __webpack_require__(2);
var projections_1 = __webpack_require__(5);
var invalidClass = 'geocoder-invalid';
var geocoderLoadingClass = 'geocoder-loading';
// let testAddress = '65 7th Street, Prairie du Sac, WI';
var Geocode = (function () {
    function Geocode(mapDiv, map) {
        var _this = this;
        var inputGuid = makeGuid_1.makeGuid();
        var buttonGuid = makeGuid_1.makeGuid();
        this.map = map;
        this.indicationLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 12,
                    fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.5)' }),
                    stroke: new ol.style.Stroke({ color: 'red', width: 1 })
                })
            })
        });
        this.map.addLayer(this.indicationLayer);
        $(mapDiv).append('<div class="geocoder-el">' +
            ("<input type=\"text\" id=\"" + inputGuid + "\">") +
            ("<button id=\"" + buttonGuid + "\">Search</button>") +
            '</div>');
        this.theButton = document.getElementById(buttonGuid);
        this.theInput = document.getElementById(inputGuid);
        this.reset();
        var $theButton = $(this.theButton);
        var $theInput = $(this.theInput);
        $theButton.click(function (evt) {
            evt.preventDefault();
            $theButton.addClass(geocoderLoadingClass);
            _this.theButton.disabled = true;
            _this.indicationLayer.getSource().clear();
            $.get("https://geocode.xyz/" + _this.theInput.value + "?geoit=json", {}, function (d) {
                var lat = parseFloat(d['latt']);
                var lon = parseFloat(d['longt']);
                if ((lat == 0 && lon == 0) || d['error']) {
                    $theInput.addClass(invalidClass);
                    _this.theInput.title = 'Specified Location Invalid';
                    _this.theButton.title = 'Specified Location Invalid';
                }
                else {
                    var v = _this.map.getView();
                    var p = new ol.geom.Point([lon, lat]);
                    var feat = new ol.Feature(p);
                    _this.indicationLayer.getSource().addFeature(feat);
                    p.transform(projections_1.proj4326, projections_1.proj3857);
                    v.setCenter(p.getCoordinates());
                    v.setZoom(13);
                }
                $theButton.removeClass(geocoderLoadingClass);
                _this.theButton.disabled = false;
            }, 'json');
        });
        $(this.theInput).keyup(function (evt) {
            evt.preventDefault();
            _this.theButton.disabled = _this.theInput.value.length == 0;
            $theInput.removeClass(invalidClass);
            _this.theInput.title = '';
            _this.theButton.title = '';
            if (!_this.theButton.disabled && evt.keyCode == 13) {
                $theButton.click();
            }
        });
    }
    Geocode.prototype.reset = function () {
        this.theButton.disabled = true;
        this.theInput.value = '';
    };
    return Geocode;
}());
exports.Geocode = Geocode;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mapInteractionBase_1 = __webpack_require__(17);
var checkDefined = __webpack_require__(20);
var provide_1 = __webpack_require__(0);
var makeGuid_1 = __webpack_require__(4);
var $ = __webpack_require__(1);
var nm = provide_1.default('olHelpers');
/**
 * assists with map move interactions, trigger callback functions
 * @augments MapInteractionBase
 */
var MapMoveCls = (function (_super) {
    __extends(MapMoveCls, _super);
    /**
     * constructor called implicitly
     */
    function MapMoveCls() {
        var _this = _super.call(this, 'map move') || this;
        _this._arrLyrRequest = [];
        _this._arrLyrTimeout = [];
        _this._arrLayer = [];
        _this._lookupLayer = {};
        _this._mapMoveCallbacks = [];
        _this._mapMoveCallbacksLookup = {};
        _this._mapMoveCallbackDelays = [];
        _this._mapMoveCallbackContext = [];
        _this._mapMoveCallbackTimeout = [];
        _this._mapExtent = undefined;
        _this._zoomLevel = undefined;
        return _this;
    }
    /**
     * initialize the map move object
     * @param theMap - the ol map
     */
    MapMoveCls.prototype.init = function (theMap) {
        var _this = this;
        _super.prototype.init.call(this, theMap);
        this.map.getView().on(['change:center', 'change:resolution'], function (e) {
            _this._updateMapExtent();
            // trigger the layer updates
            for (var i = 0; i < _this._arrLayer.length; i++) {
                _this.triggerLyrLoad(_this._arrLayer[i], i, e.type);
            }
            // trigger the map callbacks
            for (var i = 0; i < _this._mapMoveCallbacks.length; i++) {
                _this.triggerMoveCallback(i, e.type);
            }
        });
    };
    MapMoveCls.prototype._updateMapExtent = function () {
        var theView = this.map.getView();
        this._zoomLevel = theView.getZoom();
        var extentArray = theView.calculateExtent(this.map.getSize());
        this._mapExtent = {
            minX: extentArray[0],
            minY: extentArray[1],
            maxX: extentArray[2],
            maxY: extentArray[3]
        };
    };
    Object.defineProperty(MapMoveCls.prototype, "mapExtent", {
        /**
         * return the map extent
         */
        get: function () {
            if (!this._mapExtent) {
                this._updateMapExtent();
            }
            return this._mapExtent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Trigger the layer load
     * @param lyr the layer being acted on
     * @param index index of the layer
     * @param eventType the event triggering the load, as 'change:center' or 'change:resolution'
     */
    MapMoveCls.prototype.triggerLyrLoad = function (lyr, index, eventType) {
        if (checkDefined.undefinedOrNull(lyr) && checkDefined.undefinedOrNull(index)) {
            throw 'need to define lyr or index';
        }
        else if (checkDefined.definedAndNotNull(lyr) && checkDefined.undefinedOrNull(index)) {
            index = this._arrLayer.indexOf(lyr);
        }
        else if (checkDefined.undefinedOrNull(lyr) && checkDefined.definedAndNotNull(index)) {
            lyr = this._arrLayer[index];
        }
        // clear the timeout
        if (this._arrLyrTimeout[index] != null) {
            clearTimeout(this._arrLyrTimeout[index]);
            this._arrLyrTimeout[index] = null;
        }
        // abort if necessary and clear the request
        if (this._arrLyrRequest[index] != null && this._arrLyrRequest[index] != 4) {
            this._arrLyrRequest[index].abort();
            this._arrLyrRequest[index] = null;
        }
        // dummy callback used if before load returns false
        var callbackFunc = function () { };
        if (lyr.mapMoveBefore(this._zoomLevel, eventType)) {
            lyr.mapMoveMakeGetParams(this._mapExtent, this._zoomLevel);
            var __this_1 = this;
            callbackFunc = function () {
                function innerFunction(theLayer, theIndex) {
                    var _innerThis = this;
                    this._arrLyrRequest[theIndex] = $.get(theLayer.url, theLayer.mapMoveParams, function (d) {
                        /**
                         * @type {LayerBaseVector}
                         */
                        theLayer.mapMoveCallback(d);
                        theLayer.loadCallback();
                    }, 'json').fail(function (jqXHR) {
                        if (jqXHR.statusText != 'abort') {
                            console.log('failed');
                            console.log(theLayer.url);
                            console.log(theLayer.mapMoveParams);
                        }
                    }).always(function () {
                        _innerThis._arrLyrTimeout[theIndex] = null;
                        _innerThis._arrLyrRequest[theIndex] = null;
                    });
                }
                innerFunction.call(__this_1, lyr, index);
            };
        }
        else {
            lyr.clear();
        }
        this._arrLyrTimeout[index] = setTimeout(callbackFunc, lyr.onDemandDelay);
    };
    /**
     * trigger the map move call back at the given index
     * @param ind - the index of the layer
     * @param eventType=undefined the event triggering the load as 'change:center' or 'change:resolution'
     * @param functionId=undefined the function id used to reference the added callback function
     */
    MapMoveCls.prototype.triggerMoveCallback = function (ind, eventType, functionId) {
        if (typeof ind == 'undefined' && typeof functionId == 'undefined') {
            throw 'either the function index or the id must be defined';
        }
        if (typeof ind !== 'number') {
            ind = this._mapMoveCallbacks.indexOf(this._mapMoveCallbacksLookup[functionId]);
        }
        if (ind < 0) {
            console.log('function not found');
            return;
        }
        // clear the timeout
        if (this._mapMoveCallbackTimeout[ind] != null) {
            clearTimeout(this._mapMoveCallbackTimeout[ind]);
            this._mapMoveCallbackTimeout[ind] = null;
        }
        var ctx = this._mapMoveCallbackContext[ind];
        var theFunc = this._mapMoveCallbacks[ind];
        var __this = this;
        var f = function () {
            if (ctx !== null) {
                theFunc.call(ctx, __this._mapExtent, __this._zoomLevel, eventType);
            }
            else {
                theFunc(__this._mapExtent, __this._zoomLevel, eventType);
            }
        };
        this._mapMoveCallbackTimeout[ind] = setTimeout(f, this._mapMoveCallbackDelays[ind]);
    };
    /**
     * Add a layer to the interaction
     * @param  lyr - layer to add
     * @param triggerOnAdd - if the layer should be loaded on add
     */
    MapMoveCls.prototype.addVectorLayer = function (lyr, triggerOnAdd) {
        if (triggerOnAdd === void 0) { triggerOnAdd = true; }
        if (this._arrLayer.indexOf(lyr) > -1) {
            console.log('already added ' + lyr.name + ' to map move');
            return;
        }
        this._checkInit();
        this._arrLyrRequest.push(null);
        this._arrLyrTimeout.push(null);
        this._arrLayer.push(lyr);
        this._lookupLayer[lyr.id] = lyr;
        triggerOnAdd = typeof triggerOnAdd == 'boolean' ? triggerOnAdd : true;
        if (triggerOnAdd) {
            if (this._mapExtent === undefined) {
                this._updateMapExtent();
            }
            this.triggerLyrLoad(lyr, this._arrLayer.length - 1);
        }
    };
    /**
     * add a callback to the map move event
     * @param func - callback function
     * @param context - the context to use for this function
     * @param delay=50 the delay before call load
     * @param triggerOnAdd if the layer should be loaded on add to mapMove
     * @param functionId optional id to reference the function later for outside triggering
     */
    MapMoveCls.prototype.addCallback = function (func, context, delay, triggerOnAdd, functionId) {
        if (this._mapMoveCallbacks.indexOf(func) > -1) {
            console.log('this function already added to map move');
            return;
        }
        this._checkInit();
        if (!functionId) {
            functionId = makeGuid_1.default();
        }
        this._mapMoveCallbacks.push(func);
        this._mapMoveCallbacksLookup[functionId] = func;
        this._mapMoveCallbackDelays.push(typeof delay == 'number' ? delay : 50);
        this._mapMoveCallbackContext.push(checkDefined.definedAndNotNull(context) ? context : null);
        this._mapMoveCallbackTimeout.push(null);
        triggerOnAdd = typeof triggerOnAdd == 'boolean' ? triggerOnAdd : true;
        if (triggerOnAdd) {
            if (this._mapExtent === undefined) {
                this._updateMapExtent();
            }
            this.triggerMoveCallback(this._mapMoveCallbacks.length - 1);
        }
    };
    return MapMoveCls;
}(mapInteractionBase_1.default));
exports.MapMoveCls = MapMoveCls;
nm.MapMoveCls = MapMoveCls;
exports.default = MapMoveCls;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mapInteractionBase_1 = __webpack_require__(17);
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var nm = provide_1.default('olHelpers');
var FeatureLayerProperties = (function () {
    /**
     *
     * @param feature the feature
     * @param layer - the layer in the popup
     * @param layerIndex - index of the layer
     * @param selectionLayer - the ol selection layer
     * @param [esriLayerName=undefined] - esri layer name
     */
    function FeatureLayerProperties(feature, layer, layerIndex, selectionLayer, esriLayerName) {
        this.feature = feature;
        this.layer = layer;
        this.layerIndex = layerIndex;
        this.selectionLayer = selectionLayer;
        this.popupContent = '';
        this.esriLayerName = typeof esriLayerName == 'string' ? esriLayerName : undefined;
    }
    Object.defineProperty(FeatureLayerProperties.prototype, "layerName", {
        get: function () {
            if (typeof this.esriLayerName == 'string') {
                return this.esriLayerName;
            }
            else {
                return this.layer.name;
            }
        },
        enumerable: true,
        configurable: true
    });
    return FeatureLayerProperties;
}());
exports.FeatureLayerProperties = FeatureLayerProperties;
/**
 * map popup class
 * @augments MapInteractionBase
 */
var MapPopupCls = (function (_super) {
    __extends(MapPopupCls, _super);
    /**
     * Definition for openlayers style function
     * @callback olStyleFunction
     * &param feature the openlayers vector feature
     * $param
     */
    /**
     * map popup constructor
     */
    function MapPopupCls() {
        var _this = _super.call(this, 'map popup') || this;
        _this._arrPopupLayerIds = [];
        _this._arrPopupLayerNames = [];
        _this._arrPopupLayers = [];
        _this._arrPopupOlLayers = [];
        _this._arrPopupContentFunction = [];
        _this._$popupContainer = undefined;
        _this._$popupContent = undefined;
        _this._$popupCloser = undefined;
        _this._popupOverlay = undefined;
        _this._selectionLayers = [];
        _this._selectionLayerLookup = {};
        _this._mapClickFunctions = [];
        //let a = function($jqueryContent){console.log($jqueryContent)};
        //this._popupChangedLookup = {'a': a};
        _this._popupChangedFunctions = [];
        _this._esriMapServiceLayers = [];
        _this._popupOpen = false;
        _this._popupCoordinate = null;
        _this._passThroughLayerFeatureArray = [];
        _this._currentPopupIndex = -1;
        _this._popupContentLength = 0;
        return _this;
    }
    /**
     * map popup initialization
     * @param {ol.Map} theMap - the ol map
     */
    MapPopupCls.prototype.init = function (theMap) {
        var _this = this;
        _super.prototype.init.call(this, theMap);
        var $map;
        var target = this.map.getTarget();
        if (typeof target == 'string') {
            $map = $('#' + target);
        }
        else {
            $map = $(target);
        }
        $map.append('<div class="ol-popup">' +
            '<span class="ol-popup-closer">X</span>' +
            '<div class="popup-content"></div>' +
            '</div>');
        this._$popupContainer = $map.find('.ol-popup');
        this._$popupContent = $map.find('.popup-content');
        this._$popupCloser = $map.find('.ol-popup-closer');
        var _ease = function (n) {
            return ol.easing.inAndOut(n);
        };
        this._popupOverlay = new ol.Overlay({
            element: this._$popupContainer[0],
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
                source: theMap.getView().getCenter(),
                easing: _ease
            }
        });
        this._map.addOverlay(this._popupOverlay);
        this._$popupCloser.click(function (evt) {
            _this.closePopup();
        });
        // display popup on click
        this._map.on('singleclick', function (evt) {
            _this.closePopup();
            _this._popupCoordinate = evt['coordinate'];
            // esri map service layers
            if (_this._esriMapServiceLayers.length > 0) {
                var queryParams = {
                    geometry: evt['coordinate'].join(','),
                    geometryType: 'esriGeometryPoint',
                    layers: 'all',
                    sr: _this._map.getView().getProjection().getCode().split(':')[1],
                    mapExtent: _this._map.getView().calculateExtent(_this._map.getSize()).join(','),
                    imageDisplay: _this._map.getSize().join(',') + ',96',
                    returnGeometry: true,
                    tolerance: 15,
                    f: 'pjson'
                };
                for (var _i = 0, _a = _this._esriMapServiceLayers; _i < _a.length; _i++) {
                    var l = _a[_i];
                    l.getPopupInfo(queryParams);
                }
            }
            var layerFeatureObjectArray = _this._featuresAtPixel(evt['pixel']);
            _this._passThroughLayerFeatureArray = [];
            _this._currentPopupIndex = -1;
            for (var i = 0; i < layerFeatureObjectArray.length; i++) {
                var featObj = layerFeatureObjectArray[i];
                var props = featObj.feature.getProperties();
                var popupContentResponse = _this._arrPopupContentFunction[featObj.layerIndex](props, _this._$popupContent);
                //skip if return was false
                if (popupContentResponse === false) {
                    //continue;
                }
                else if (typeof popupContentResponse == 'string') {
                    featObj.popupContent = popupContentResponse;
                    _this._passThroughLayerFeatureArray.push(featObj);
                }
                else {
                    featObj.selectionLayer.getSource().addFeature(featObj.feature);
                }
            }
            _this._popupContentLength = _this._passThroughLayerFeatureArray.length;
            _this._currentPopupIndex = -1;
            var popupHtml = '<div class="ol-popup-nav">';
            popupHtml += '<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>';
            popupHtml += '<span class="next-popup ol-popup-nav-arrow">&#9654;</span>';
            popupHtml += "<span class=\"current-popup-item-number\" style=\"font-weight: bold;\"></span>";
            popupHtml += "<span>&nbsp;of&nbsp;</span>";
            popupHtml += "<span class=\"popup-content-length\" style=\"font-weight: bold;\">" + _this._popupContentLength + "</span>";
            popupHtml += "<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>";
            popupHtml += "<span class=\"current-popup-layer-name\"></span>";
            popupHtml += '</div>';
            popupHtml += '<div class="ol-popup-inner">';
            popupHtml += '</div>';
            _this._$popupContent.html(popupHtml);
            _this._$popupContent.find('.previous-popup').click(function () {
                if (_this._popupContentLength == 1) {
                    return;
                }
                if (_this._currentPopupIndex == 0) {
                    _this._currentPopupIndex = _this._popupContentLength - 1;
                }
                else {
                    _this._currentPopupIndex--;
                }
                _this._triggerFeatSelect();
            });
            var nextPopup = _this._$popupContent.find('.next-popup');
            nextPopup.click(function () {
                if (_this._popupContentLength == 1 && _this._currentPopupIndex > -1) {
                    return;
                }
                if (_this._currentPopupIndex == _this._popupContentLength - 1) {
                    _this._currentPopupIndex = 0;
                }
                else {
                    _this._currentPopupIndex++;
                }
                _this._triggerFeatSelect();
            });
            if (_this._popupContentLength > 0) {
                nextPopup.trigger('click');
                _this._popupOverlay.setPosition(_this._popupCoordinate);
                _this._$popupContent.scrollTop(0);
                _this._popupOpen = true;
            }
        });
        //change mouse cursor when over marker
        this._map.on('pointermove', function (evt) {
            if (evt['dragging']) {
                return;
            }
            var pixel = _this.map.getEventPixel(evt['originalEvent']);
            var hit = _this.map.hasFeatureAtPixel(pixel, function (lyrCandidate) {
                for (var _i = 0, _a = _this._arrPopupOlLayers; _i < _a.length; _i++) {
                    var olLayer = _a[_i];
                    if (lyrCandidate == olLayer) {
                        return true;
                    }
                }
                return false;
            });
            var mapElement = _this.map.getTargetElement();
            mapElement.style.cursor = hit ? 'pointer' : '';
        });
        return true;
    };
    /**
     * helper to select features
     * @private
     */
    MapPopupCls.prototype._triggerFeatSelect = function () {
        var $currentPopupItemNumber = this._$popupContent.find('.current-popup-item-number');
        var $innerPopup = this._$popupContent.find('.ol-popup-inner');
        var $layerNameSpan = this._$popupContent.find('.current-popup-layer-name');
        this.clearSelection();
        var lyrFeatObj = this._passThroughLayerFeatureArray[this._currentPopupIndex];
        $currentPopupItemNumber.html((this._currentPopupIndex + 1).toFixed());
        $layerNameSpan.html(lyrFeatObj.layerName);
        $innerPopup.html(lyrFeatObj.popupContent);
        lyrFeatObj.selectionLayer.getSource().addFeature(lyrFeatObj.feature);
        for (var _i = 0, _a = this._popupChangedFunctions; _i < _a.length; _i++) {
            var f = _a[_i];
            f(this._$popupContent);
        }
    };
    /**
     *
     * @param feature - the ol feature
     * @param {LayerEsriMapServer} lyr - the map server layer
     * @param {string} popupContent - popup content
     * @param {string} esriName - esri layer name
     */
    MapPopupCls.prototype.addMapServicePopupContent = function (feature, lyr, popupContent, esriName) {
        var featLayerObject = new FeatureLayerProperties(feature, lyr, this._popupContentLength, this._selectionLayerLookup[lyr.id], esriName);
        featLayerObject.popupContent = popupContent;
        this._passThroughLayerFeatureArray.push(featLayerObject);
        this._popupContentLength++;
        $('.popup-content-length').html(this._popupContentLength.toFixed());
        if (!this._popupOpen) {
            this._$popupContent.find('.next-popup').trigger('click');
            this._popupOverlay.setPosition(this._popupCoordinate);
            this._$popupContent.scrollTop(0);
            this._popupOpen = true;
        }
    };
    /**
     *
     * @param  pixel - the ol pixel
     * @returns  feature layer properties
     * @private
     */
    MapPopupCls.prototype._featuresAtPixel = function (pixel) {
        var _this = this;
        var layerFeatureObjectArray = [];
        this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
            var lyrIndex = _this._arrPopupOlLayers.indexOf(layer);
            if (lyrIndex > -1) {
                layerFeatureObjectArray.push(new FeatureLayerProperties(feature, _this._arrPopupLayers[lyrIndex], lyrIndex, _this._selectionLayers[lyrIndex]));
            }
        });
        return layerFeatureObjectArray;
    };
    MapPopupCls.prototype.closePopup = function () {
        this._checkInit();
        this._popupOpen = false;
        this._popupOverlay.setPosition(undefined);
        this._$popupCloser[0].blur();
        this.clearSelection();
        this._$popupContent.html('');
        return false;
    };
    ;
    /**
     *
     * @param chgFunction - popup change function
     */
    MapPopupCls.prototype.addPopupChangedFunction = function (chgFunction) {
        this._popupChangedFunctions.push(chgFunction);
    };
    /**
     *
     * @param {LayerBase|*} lyr - the layer being acted on
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns  the new selection layer
     * @private
     */
    MapPopupCls.prototype._addPopupLayer = function (lyr, selectionStyle) {
        this._checkInit();
        selectionStyle = selectionStyle || {};
        selectionStyle.color = selectionStyle.color || 'rgba(255,170,0,0.5)';
        selectionStyle.width = selectionStyle.width || 10;
        var theStyle;
        if (selectionStyle.olStyle) {
            theStyle = selectionStyle.olStyle;
        }
        else {
            theStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: selectionStyle.color,
                    width: selectionStyle.width
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({ color: selectionStyle.color }),
                    stroke: new ol.style.Stroke({ color: selectionStyle.color, width: 1 })
                }),
                fill: new ol.style.Fill({
                    color: selectionStyle.color
                })
            });
        }
        var selectionLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: theStyle
        });
        selectionLayer.setZIndex(100);
        this._selectionLayers.push(selectionLayer);
        this._selectionLayerLookup[lyr.id] = selectionLayer;
        this.map.addLayer(selectionLayer);
        return selectionLayer;
    };
    /**
     * Add popup to the map
     * @param {LayerBase|*} lyr The layer that the popup with act on
     * @param {popupCallback} popupContentFunction - popup content function that makes popup info
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    MapPopupCls.prototype.addVectorPopup = function (lyr, popupContentFunction, selectionStyle) {
        var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
        this._arrPopupLayerIds.push(lyr.id);
        this._arrPopupLayerNames.push(lyr.name);
        this._arrPopupLayers.push(lyr);
        this._arrPopupOlLayers.push(lyr.olLayer);
        this._arrPopupContentFunction.push(popupContentFunction);
        return selectionLayer;
    };
    ;
    /**
     *
     * @param {LayerBase} lyr - layer
     */
    MapPopupCls.prototype.removeVectorPopup = function (lyr) {
        var idx = this._arrPopupLayerIds.indexOf(lyr.id);
        if (idx > -1) {
            this._arrPopupLayerIds.splice(idx, 1);
            this._arrPopupLayerNames.splice(idx, 1);
            this._arrPopupLayers.splice(idx, 1);
            this._arrPopupOlLayers.splice(idx, 1);
            this._arrPopupContentFunction.splice(idx, 1);
            this._selectionLayers.splice(idx, 1);
            delete this._selectionLayerLookup[lyr.id];
        }
    };
    /**
     *
     * @param {LayerEsriMapServer} lyr - map server layer
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    MapPopupCls.prototype.addMapServicePopup = function (lyr, selectionStyle) {
        var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
        this._esriMapServiceLayers.push(lyr);
        return selectionLayer;
    };
    MapPopupCls.prototype.clearSelection = function () {
        this._checkInit();
        for (var i = 0; i < this._selectionLayers.length; i++) {
            this._selectionLayers[i].getSource().clear();
        }
        for (var _i = 0, _a = this._mapClickFunctions; _i < _a.length; _i++) {
            var f = _a[_i];
            f();
        }
    };
    ;
    /**
     * Add a function to be called when the map is clicked but before any popups are implemented
     * @param {function} func - the map click function
     */
    MapPopupCls.prototype.addMapClickFunction = function (func) {
        this._mapClickFunctions.push(func);
    };
    return MapPopupCls;
}(mapInteractionBase_1.default));
exports.MapPopupCls = MapPopupCls;
nm.MapPopupCls = MapPopupCls;
exports.default = MapPopupCls;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var extentUtil_1 = __webpack_require__(9);
/**
 *
 * @param {ol.Map} map
 * @param {(imgData) => string} callback
 * @param {iMapToBase64Options} options
 * @returns {any}
 */
function mapToBase64(map, callback, options) {
    options = options || {};
    if (typeof options.delay === 'number') {
        //pass
    }
    else if (options.layers || options.resize) {
        options.delay = 2000;
    }
    else {
        options.delay = 1;
    }
    var mapTarget = map.getTargetElement();
    var originalHeight = mapTarget.style.height;
    var originalWidth = mapTarget.style.width;
    var originalPosition = mapTarget.style.position;
    var originalCenter = map.getView().getCenter();
    var originalZoom = map.getView().getZoom();
    // let mapTimeout = 1;
    if (options.resize) {
        mapTarget.style.height = options.resize.height + "px";
        mapTarget.style.width = options.resize.width + "px";
        mapTarget.style.position = 'absolute';
        map.updateSize();
    }
    map.once('postrender', function () {
        if (options.layers) {
            extentUtil_1.fitToMap(options.layers, map);
        }
        setTimeout(function () {
            map.once('postcompose', function (event) {
                try {
                    var canvas = event['context'].canvas;
                    var imgData = canvas.toDataURL('image/png');
                    callback(imgData);
                }
                catch (ex) {
                    // reportParams['imgData'] = null;
                }
                finally {
                    if (options.resize) {
                        mapTarget.style.height = originalHeight;
                        mapTarget.style.width = originalWidth;
                        mapTarget.style.position = originalPosition;
                        map.updateSize();
                        map.getView().setCenter(originalCenter);
                        map.getView().setZoom(originalZoom);
                    }
                    if (options.layers) {
                        extentUtil_1.fitToMap(options.layers, map);
                    }
                }
            });
            map.renderSync();
        }, options.delay);
    });
    map.updateSize();
}
exports.mapToBase64 = mapToBase64;
exports.default = mapToBase64;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/15/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var geocode_1 = __webpack_require__(32);
var nm = provide_1.default('olHelpers');
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param [options={}] config options
 * @param [options.divId=map] map div id
 * @param [options.center={}] center config object
 * @param [options.center.x=-10018378] center x, web mercator x or lon
 * @param [options.center.y=5574910] center y, web mercator y or lat
 * @param [options.zoom=7] zoom level
 * @param [options.minZoom=undefined] min zoom
 * @param [options.maxZoom=undefined] max zoom
 * @param [options.baseSwitcher=true] if add base map switcher
 * @param [options.fullScreen=false] if add base map switcher
 * @returns the ol map
 */
function quickMapBase(options) {
    if (options === void 0) { options = {}; }
    options.divId = options.divId || 'map';
    options.center = options.center || { x: -10018378, y: 5574910 };
    options.zoom = typeof options.zoom == 'number' ? options.zoom : 7;
    options.baseSwitcher = typeof options.baseSwitcher == 'boolean' ? options.baseSwitcher : true;
    options.fullScreen = typeof options.fullScreen == 'boolean' ? options.fullScreen : false;
    options.addGeocode = options.addGeocode || false;
    var $mapDiv = $('#' + options.divId);
    $mapDiv.css('position', 'relative');
    var osmLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
    // let satLayer = new ol.layer.Tile({visible: false, source: new ol.source.MapQuest({layer: 'sat'})});
    var osmCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAADQ1NDk5OURFREtLS1FHSFlZWGJRVGJiYWdmZWxsbHRmaXBpanN0c3V0dHp5eX5+fIVzd4F3eeV0jud5juZ8k4aHhomHhoyGh5eGj5OVlJiVlZiYl5qZmJydnKOTlaKZmqKdnaOioaqqqKuzsbOvrrSysLa3tbW4uLm6ub27ub+/vbGXwbCZwbCgxLKlxrOqyLStybO3yrSxyrWzzbW2y7a1zbK4y7W6zbW8y760yrTAzbTFzrPKzrLOzrTJzrTOzr7CwbXC0LXK0LTO0L3I0bPQz7TQz7PS0bXQ0LnR0brW1bzT0r7U077V1Lzc2dqNqteUsdyXscaquuOHneaGmueHnOeJnuiBleiKn+eNoOiOoOWUpOiRo+iSpeiUpeqYpumaqOmdrPSynemgruSqtOmisOmlsuuqtequuOW1vOuxu+uxvOq1ve+xvPK0pvW3o/W5pfO5qvS7qfCwvMOuwc2/wNenxNyyzNe/0Nq31Nq51dy72Oy3wOu4wOu+xey4wO+6xO2+xfTAr/TCsvfFtPHLvvTJuMPDwMfHxcXKyc3DxMvFyMvLyM3PzcDV08DV1MTX1cbY1s7X1sjZ1sra2Mnd3M7b2c7c2tfH1tnB1t7F2d7M29fX1tLY1tDd2tHe3NTf3NnS19rZ1tva2Nnf3t3d28rh3tXg3Nnh3tzj393k39ni4N7k4N7n5uXDyOfLz+zAxu3CyOzEyezKzeDJ3eLM3uvP0u3P0ePf2+7R0u7Q1u/U0+7U1ezc0+7a2e/d2+3f3vbFzvLOwfHN0PPQw/TUx/LWyvLYzPDQ1fPe0ubc4vve4uHh3+nh3+/h2u/h3vHj2vHl3uHm4eTn4uDp5ebo4+Xo5ODq6ebq6OTv6+nl4+/j4O7l4e7n5ujp4+np5Ozq5e7s5urt6O7t6Orw6u7x6u3x7vPj5PDl4fDo4vDq5fDt5vDu6PDv7PTv6fDx6vHx7fH17fXw6fXy7fb07/bz8fT18vn38vr39fr48/r59Pr6+P3++//+/gAAALNTSk0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAFNElEQVRIS1VVCZxVUxi/9l0UIUT2bMnY43bVI2c0Y01kSWIaS0j2JEtkN41piomZrPPKQ2aQ7JKImOZlnm2493TJzDufuU1Zi+v/fee+mZ//793vnPOd7zvfes5zDBEZkBBjAcIjb+Iiotqgdhat8AMK0vl7/R9N7GiWtshqIr+EZ5gYKibyUsXY1l/mfFpssvUlWQ0FkU3gy4+RB/+kwYcO8pRSnldcOU/r2lAHARSwk2ORgEmOdC1EsuRiYSqMPwwroMIraZk5V2fYJQjCKfZrRmh3gSAZi2i4b7wSylWu8EqZwS59JkFUaW96JbNSc+CEUmt4rorwuZmWdDaoc+uZETuQlTCU5xYzR7muUnVUVo+BcRhre/VwUpasgJwhH7JkYIYA0sNxhmCwUK+lw6vCKBZehw01dEiyw4Q4aE0Z4ahDhKaFQsGnJ2BgqKoTBsNjFy0SlW6whRAZTdm8DBJmkBZhDi1j4xJQBk6ywrWUTymaCxac8lROcdauRGzQSNtA7EHUYhXyEwhhgjFUqRuO+rauhF1awFpzCsmwUbjIFBR0u1bKtyGpulW/H/cVVzkyGaIWTIR9pFAV6GK2gPMXMX8gPk9zzxXgI1kimcAltEYr+cjio1imlKpEa9rOipLm+p+CZ6Bw//qd1/f/O+GwMxbSLpyoZEcwkyh2jIks+3hmdd2jWUw4scxNysnHxU7nSspTRcJjCZGL3IsjsYJMMg5mwgx7gaIOLBFCogAgBBoNa9w+DE6I+Bs7FTgwwrJbHjWDgpYo2KwtBTcYEDuloC9geQw+k2RGnPGpTaOlq7AS+YICUz4DZVaX2TiNDhuYfTtY4geLi0IoCm3XccwM9hx4kU28StQEljDs3ZEpFGA+8dKzLmV9ymIwF5FOGn2GdJM8KLHDJbXyiYVMG9MRTLiXGGg2QKaxM3khPSRrwM9zEIardxU2w/EiA0gOeYKHzDR0V7/QGV3lKIA9ktrDArxO3gdA+k6SKoBiVwcm7NjZb9+Hnztg282TuHVZ9LOISFNt9MgyCetZVczSxnyDbl17Penq6mqpg1IhRaEO2aVLUO4/r17H8tTv6f13h71dduvZI3Y+uMdWksNSauLovJw5hsqiPIUvt0ku7/iBeUR3sksmomYWtRbAjbiLfv2lX9/V7LVG4uYnUZXhQ7f2OPCZEx9wrYWTcePEQqPEML8pl4mMdr/jlXlvHiRiJ2+MSTFY4TTSYStuvz2R/JXh+PPeGXm055J+3/YDWuNu3R3DArPutyg0ZgykMVDU9Ndm22+wYalr2rse48CnsTIFcMn73vfhNrktx1EUcZnPv6ah3Yy5cDTRdBEoGoBeah71dqFyjZDJLkWk3N3v4uuktssjWpzciMPxQeHj8nMKzcGuB0tAyzFhdCKOYWv4HwOQVwIxLG99a6uvH3sJCyO3h+k4EZ+G7+xj5f4XXksoaGrdMRzSc8ARA8+cdOuk2x6fffNNt5x+Ro1omPlrT/CQDlcNlpx4NBIWXhkx7Y3Zp3ofNR7Uv89Om/beW0TLIynHv3vs1VsOFpSWSXvfuPUf9BrRFyxgXdHoKJnQFegPOovvzz59ntrzye240ig8UQ3lDI2VqwagrKIQcLXNFL3wglN2OHdBQ6/vI3kENDVBwRb3k1XtczFbjWn4EzMYi7CF3129+JTYuRSdrGuS92g5dpqn6qXoJQs5xmL8p+Wt4hLbt0mx2OLNZR2bbPy8zJNQGFM/f/CfXZekRYFjGCWjIJpM+WiCzGBPWHhoyaAsjRT/B2Gy5yzYJkwUAAAAAElFTkSuQmCC')";
    var aerialCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQALBgIMDQgOBwQOEQcTBwUSCwoVDAwdBw8ZDgUREwYUGAYZFQYZGgkTFQoVGQsZFAwZHBMeDhIbFBEbHAwWIA4bIREcIQ4hCQwjFw4lHBgkDB8sDxUiExIiGhAoGxohFRshGRorHQcrKQsiIQwmKgooJA0pKQ81Jw8yLRMiIxImKxUrJREuKhslJB0rIhooKRUuMBMyLhkwJhozKh48LxUzMRM9MBwzMiUvFCMtGiMwEiwzFCgzHDI+GSIsISkvJSQxIiM2LiY5Jic+Lyk0JSo0Ky49JSs9KSU1NSM7NCs2NS8+NDM1JzU9Ljg7IDJCHS1DLSNAMitCMSxIOjREITZLIDZJKDlFIjpFKztKJT1LKzJBMzpHMD1JMjpKPD1RKjlQNC1DQj5QQEA8MEJGJkBKJUJNK0lLLEJMMkVMPEpONENSLUdZL0pTLkpaLkRUMkRSPEVZMktUM0pVOklZMklZNEpcNU1ZMk1ZNUxfMk5dNkxcOVFUM1RUOFJbNVFZOVNYPVFdOVJdPFVaOVVaPVVdOlVdPVpaNlpdO0phN01hOlBiN1NhPFNoP1piPWFbPmRjPENOQEtPSURTQkJVS0xVQk1VSkxbQkxcS0heUVFXRFRcQlJfTFxeQlpeS05lQk1kSFRjQVRjSlZpQ1tkQlxlSlxpRF1rSVVnUVtlU1llXF9tU1xoXlxwSl9ramRfQmJlQ2FhSWFlSWFlTmVlSWRmTGFoQWFpRWFsRmVpRWVtRmNsSmtlRGpqRmpsS2BmWGRsUmFrW2ptUmZyR2RxTGpxTWVyU2RyW2d5V2tzUmt0WW15VG15WXFuTHNtVnFxTXF4T3h0TnJzUnJ1XHJ4VXN6Wnp0VHx1W315VXp8XGR0YGx0YHVzZXJ0aHR9ZXV+aHl9YHOCXXqBXXeCYHyCY3iEaHyIYn+JaXqKcYB5WIN6Y4SCXoCDZIGEaYCIZoOLa4iCaImJbIOOdYuMco6OeIuVcpOKbZKPc5aQb5eXe5ufg6KjhAAAAAAAAAAAAAAAAOGCeQgAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAH80lEQVRISy1WbXQUVxm+6wqnk3Zmpxl2FG2EGg92C8GDlWptVTwa+uF3xcKmDfFzCUzDsJNsunXipglJXJbrtJWmwZNSnHD3jojRgUIm2UumIZ0JZ7JByrALbMWW0IBW8aRa4+cf76TeX3Nm3uc+z/s+7/vugl4r/aMTrT4e1pPTqnnmJNn5AyUzRnrRle/qE33dsvrBtAQVoxtpZNK3zSzYjUjviWO2Ag+R77dl7W36n/1Ep9KBPG/S+Py0PkjU/gPKQGqwTHryiWYFAXSvMairsio7SjyNsnCzh0qKImV9/7mhfHQZx2yN1O+7rXUm33MUPaboOkAJHaoIdXfJj2xWeyD8jMFEXkvIu5qzpU988gWB5zl+GS+sFe55trEVPdWZB2miq8bBVkNFO2R0qnrfkiXhcJhtDNXE6tbW97/s9O9/7ZfVhx86/CwrROpfvvxboMqeLsuqPr1j44qEwDNMOBximUiYoU8sw7BC/a7T72uEnyJDlGxZ9KcglZRyuqqrv/tSZErgOI4NgRBTIw9EmHAoFGZZnp6aGaJ2GTxfxYs8kKVUQh7WB5hQeC3LsUxoxVKW14l3BX2WcoUYPiZyLLe8teZ+iuT4GGhvV5KpKWkpyzxEr2MZgQ1xdRjfRBoH+2k6lIHjKTHPPBo8CSJISqqq4wGGOcWylIGlgvgNX1Gd8vF5f+IUIwb30ng+Gg2QfBRIMvy0jG8SVkYo4N0zvUXVRztbJ/L6xL7lUZEXBEHkuZqlS6gEAUgKJurnhFtfpACOYd8b/hVbJPqwi44a6KA0sPVjIi/SIyxb3u8KlAJ0S8jRVgrlW+nVHPdrhiXCxu42d86ByksDc80P3MkJFBFQ8Ho1lQegpWJRWFGsDsRwwv7pIyvuQW0ZkrX6NDVFbqcvaQI8vbyqzt5AARrsbKx5yhQEGs+wPO56bOK+0rcwMrOKkpUbZWYxV04UeZZv/cBKFhRL6Qdv9y4LfEDA7/thg7tTmv1a5/GnO0wl0dQg80wglZaHUmxRvjwAHOfyN0mxrpqLUpcjsK3NHYMo4R1o6eho2ZyIb2FoeOC3ILK8kZ2HQMOuWywGXUkJBCeTbYFS0+ym1h2/6UgmvnrvKYZZtIEXGf75C2cIAp5LHNd71x7uPoTjakrWH9e3KFpaatjUvJUysFw0KrLMYMW2lTg4PeUQx6kJEALvxXEmCdVyPLHtCSjBhc01XCjIgafxou+PE6KC1dhxSCwoBCc+N4P3btM84pmdSSjJnjO/nvY4LQfVyz5/I+v6IwjUOMjy+MVCxIbKupTJaEktp7cTKU42Pvjh2m/8cSpC6aPsaX/MHSuUQLVVsIa4RUTs/r/BVAexNdjdnsNG7j/rV93xheLMzKnFrPeTEQchCyCcKb25aAIn7lrAertrZwyNXM8N6zfWrFo3d2SmOEcF83x/r+OOFgrAHYWF7cELjhV7UQo/6WAIUVl9JFl8a//HZ66VpbY3I9QKZqPru77lA+iOWAIr0hKxHCmmr0othSyeIl5y3qt4xT8gSNrKEZozs8Els67rgsLOZ+ygzwMfbtNhobfgzpEyGnz7htPtzUi6PuOoj7K0WF/MXiUFxwGajRD1hjYXHXI9p406qOyinp5/tiWcDHY0jIu4n64Qfq7kliB2gemag9QbOia0PbbDMbd43SHuvxFxrAocxins7MX5Kqbe1QixKBxoV4//PfAgGCu+Rlm4SvZizyDH+0reDHp92iO0BuX3bCfItl0PEwvYLqpwXG2MHlGsQ4S8pMJZv1JGmHiEoHQDdOjwmVlEP/nE9ADKjI8xLI0OOGITfy0SbeG/C2jKUDGSlDhM9I3IpK9iup6XnbRNC7yqueNsJCCIiXzdQhnaGN+46umnEdy5U5UbUJ48LFM9GkJo8BdDOiAZ7ZIQbKhYLMqvhU2wmNxjEAsS2AI7y4nWF64duePbk7YV3zvAVLEMD9AxJRNa3KDUibV7DjnkuprMEYjScFNcaR2ceP2u9R/5k1052Ryme5phAFRswlHjAudiP4dOy7CaxLgdJh9vUlU1702/+LPa1U9fvPi9qlA4XEUBJc3dFlpsR457IDl1iPqLp7o81NQgyV19iYU38uTiv975Pd3SiwQcsGjx+v4/6fl5T7EOOMTCtpbKxfemsQq/3olQZcminADAAI0cuGLHaHOFxbuGvRk/Z9u7CULqoVR6NE0yx1avj30oRhc/jWUoIALGxkz0dg1Dl9iaI7LqOOXKsXJFwjiuEAi70Jra2nW1PL08zLBhZsMABpW5csI7TPfew9ipFKcn5k1i+1KyCWKjC3W/8dF1d666+RaabBVTFTHacjoojBNDh0NDxk+IPTlwfqJkWpbnpFHXIbLbmpxEQ3ff/Z0g/mauXsoln9wDRjy/NHsQFw3P6vWuTJ43/+FZrk2cvAFRipCKdfD9y2+pjRj78s0KdCUDKJvdV91ChngV38T20TM+gghjpJaPlpFr2xbEz5g4A/NGt5rNwdwmYGeeeMXBSLHHUIc+6RsojRH9VTUm3/mLf/64b470XvoxoTKhlMBQ2jMEzo2PjxdGMppmn1RM24bWFJqaQv4BcuJa2Sam7Zokq1ldCsz06NCBHrhwqVQYpfFj42NZexz1EW9SR/kT58nEeQKJb2fPXjjp0u/YUkwHEgLeOnf2nOuf1TRTM02CLKLTPy60/x1CCztqn7Ev+BdsC3m+30decQvW/wBNTwU+CfUQAQAAAABJRU5ErkJggg==')";
    if (options.baseSwitcher) {
        //  let switcherContent = '<div class="base-map-switcher" title="Toggle Base Layer" style="';
        //  switcherContent += 'position: absolute; top: 70px; left: 4px; border: solid black 1px; ';
        //  switcherContent += `height: 50px; width: 50px; z-index: 10; border-radius: 4px; background: ${aerialCss};`;
        //  switcherContent += '"></div>';
        //  $mapDiv.append(switcherContent);
        //
        // $mapDiv.find('.base-map-switcher').click(function() {
        //      "use strict";
        //      osmLayer.setVisible(!osmLayer.getVisible());
        //      satLayer.setVisible(!satLayer.getVisible());
        //
        //      if (osmLayer.getVisible()){
        //          $(this).css('background', aerialCss);
        //      } else {
        //          $(this).css('background', osmCss);
        //      }
        //  });
    }
    if (options.zoom < 0 || options.zoom > 28) {
        throw 'zoom out of range';
    }
    if (options.center.x >= -180 && options.center.x <= 180 && options.center.y >= -90 && options.center.y <= 90) {
        var p = new ol.geom.Point([options.center.x, options.center.y]);
        new ol.proj.Projection({ code: "EPSG:4326" });
        p.transform(new ol.proj.Projection({ code: "EPSG:4326" }), new ol.proj.Projection({ code: "EPSG:3857" }));
        var coordinates = p.getCoordinates();
        options.center.x = coordinates[0];
        options.center.y = coordinates[1];
    }
    var controls = ol.control.defaults({
        attributionOptions: { collapsible: false }
    });
    var view = new ol.View({
        center: [options.center.x, options.center.y],
        zoom: options.zoom,
        minZoom: options.minZoom,
        maxZoom: options.maxZoom
    });
    var map = new ol.Map({
        layers: [osmLayer],
        target: options.divId,
        controls: controls,
        view: view
    });
    if (options.fullScreen) {
        map.addControl(new ol.control.FullScreen({}));
    }
    if (options.addGeocode) {
        new geocode_1.Geocode(document.getElementById(options.divId), map);
    }
    return map;
}
exports.quickMapBase = quickMapBase;
nm.quickMapBase = quickMapBase;
exports.default = quickMapBase;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/14/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('olHelpers.zoomResolutionConvert');
var _zoomResLookup = [
    156543.03392804097,
    78271.51696402048,
    39135.75848201024,
    19567.87924100512,
    9783.93962050256,
    4891.96981025128,
    2445.98490512564,
    1222.99245256282,
    611.49622628141,
    305.748113140705,
    152.8740565703525,
    76.43702828517625,
    38.21851414258813,
    19.109257071294063,
    9.554628535647032,
    4.777314267823516,
    2.388657133911758,
    1.194328566955879,
    0.5971642834779395,
    0.29858214173896974,
    0.14929107086948487,
    0.07464553543474244,
    0.03732276771737122,
    0.01866138385868561,
    0.009330691929342804,
    0.004665345964671402,
    0.002332672982335701,
    0.0011663364911678506,
    0.0005831682455839253 //28
];
/**
 * Get the resolution given the zoom level
 * @param {number} zoomLevel - the zoom level
 * @returns {number|*} the map resolution
 */
function zoomToResolution(zoomLevel) {
    "use strict";
    if (typeof zoomLevel == 'number') {
        if (zoomLevel % 1 === 0 && zoomLevel >= 0 && zoomLevel <= 28) {
            return _zoomResLookup[zoomLevel];
        }
        else {
            console.log("invalid zoom level provided: " + zoomLevel);
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
exports.zoomToResolution = zoomToResolution;
nm.zoomToResolution = zoomToResolution;
/**
 * Get resolution from the zoom level
 * @param {number} resolution - the resolution
 * @returns {number|*} the zoom level
 */
function resolutionToZoom(resolution) {
    for (var i = 0; i < _zoomResLookup.length; i++) {
        if (resolution >= _zoomResLookup[i]) {
            return i;
        }
    }
    return 0;
}
exports.resolutionToZoom = resolutionToZoom;
nm.resolutionToZoom = resolutionToZoom;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 11/3/2015.
 */
var provide_1 = __webpack_require__(0);
var chk = __webpack_require__(20);
var nm = provide_1.default('util.colors');
/**
 * helper function to convert to hex
 * @param {number|string} x - the number to convert to hex
 * @returns {string} number as hex
 * @private
 */
function _hex(x) {
    var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    if (isNaN(x)) {
        return "00";
    }
    else {
        var m = x;
        return hexDigits[(m - m % 16) / 16] + hexDigits[m % 16];
    }
    // return isNaN(x as number) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
/**
 * converts an RGB string to hex
 * @param {string} rgb - rgb color
 * @returns {string} rbg as hex
 */
function rgb2hex(rgb) {
    var rgb1 = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return ("#" + _hex(rgb1[1]) + _hex(rgb1[2]) + _hex(rgb1[3])).toUpperCase();
}
exports.rgb2hex = rgb2hex;
nm.rgb2hex = rgb2hex;
/**
 * Convert hex string to RGB or RGBA string
 * @param {string} hexString - hex color string
 * @param {number} [alphaVal=undefined] Alpha value
 * @returns {string} - rgb or rgba color
 */
function hexAlphaToRgbOrRgba(hexString, alphaVal) {
    hexString = ((hexString.charAt(0) == "#") ? hexString.substring(1, 7) : hexString);
    var r = parseInt(hexString.substring(0, 2), 16).toString() || '0';
    var g = parseInt(hexString.substring(2, 4), 16).toString() || '0';
    var b = parseInt(hexString.substring(4, 6), 16).toString() || '0';
    if (alphaVal) {
        return "rgba(" + r + "," + g + "," + b + "," + alphaVal + ")";
    }
    else {
        return "rgba(" + r + "," + g + "," + b + ")";
    }
}
exports.hexAlphaToRgbOrRgba = hexAlphaToRgbOrRgba;
nm.hexAlphaToRgbOrRgba = hexAlphaToRgbOrRgba;
/**
 * adds alpha value to rgb string 'rgb(r, b, g)', returns 'rgba(r, g, b, a)'
 * @param {string} rgb - rgb color
 * @param {number} alpha - alpha value 0 to 1
 * @returns {string} rgba color
 */
function rgbToRgba(rgb, alpha) {
    var pieces = rgb.split(',');
    pieces[0] = pieces[0].replace('rgb', 'rgba');
    pieces[2] = pieces[2].replace(')', '');
    pieces.push(' ' + alpha.toFixed(1) + ')');
    return pieces.join(',');
}
exports.rgbToRgba = rgbToRgba;
nm.rgbToRgba = rgbToRgba;
/**
 * @typedef {function} colorLookupByNumber
 * @param {number} num - the number to use to retrieve the color
 * @returns {string} rgb color
 */
/**
 * Make a blue green red gradient
 * @param {number} minVal - minimum value
 * @param {number} maxVal - maximum value
 * @param {boolean} flipColors - if the colors should be flipped
 * @returns {colorLookupByNumber} color lookup function
 */
function makeBlueGreenRedGradient(minVal, maxVal, flipColors) {
    if (flipColors === void 0) { flipColors = false; }
    if (typeof flipColors != "boolean") {
        flipColors = false;
    }
    return function (theVal) {
        var r, g, b;
        var ratio;
        if (chk.undefinedOrNull(theVal)) {
            return 'rgb(100,100,100)';
        }
        var percent = (theVal - minVal) / (maxVal - minVal);
        if (flipColors == true) {
            percent = 1 - percent;
        }
        if (percent >= 1) {
            r = 255;
            g = 0;
            b = 0;
        }
        else if (percent <= 0) {
            r = 0;
            g = 0;
            b = 255;
        }
        else if (percent < .25) {
            // green up, blue constant
            r = 0;
            g = Math.floor(255 * percent / 0.25);
            b = 255;
        }
        else if (percent < 0.50) {
            //blue down, green constant
            ratio = (percent - 0.25) / 0.25;
            r = 0;
            g = 255;
            b = 255 - Math.floor(255 * ratio);
        }
        else if (percent < 0.75) {
            // red up, green constant
            ratio = (percent - 0.5) / 0.25;
            r = Math.floor(255 * ratio);
            g = 255;
            b = 0;
        }
        else {
            // green down, red constant
            ratio = (percent - 0.75) / 0.25;
            r = 255;
            g = 255 - Math.floor(255 * ratio);
            b = 0;
        }
        r = r.toFixed();
        g = g.toFixed();
        b = b.toFixed();
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
}
exports.makeBlueGreenRedGradient = makeBlueGreenRedGradient;
nm.makeBlueGreenRedGradient = makeBlueGreenRedGradient;
/**
 * Create a function that will return colors based on a gradient
 * @param {number} median - median value
 * @param {number} stdDev - standard deviation
 * @param {boolean} flipColors - if the colors should be flipped
 * @returns {colorLookupByNumber} color lookup function
 */
function makeBlueGreenRedGradientZScore(median, stdDev, flipColors) {
    if (flipColors === void 0) { flipColors = false; }
    var grd = makeBlueGreenRedGradient(-2.5, 2.5, flipColors);
    return function (theVal) {
        var zScore;
        if (theVal == null) {
            zScore = null;
        }
        else {
            zScore = (theVal - median) / stdDev;
        }
        return grd(zScore);
    };
}
exports.makeBlueGreenRedGradientZScore = makeBlueGreenRedGradientZScore;
nm.makeBlueGreenRedGradientZScore = makeBlueGreenRedGradientZScore;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 5/16/2016.
 */
var provide_1 = __webpack_require__(0);
// import * as styles  from '../layerStyles';
var mapPopup_1 = __webpack_require__(3);
var calcExtent = __webpack_require__(9);
var makeGuid_1 = __webpack_require__(4);
var CorridorConfig_1 = __webpack_require__(23);
var Corridor_1 = __webpack_require__(14);
var $ = __webpack_require__(1);
var popup_1 = __webpack_require__(10);
var nm = provide_1.default('ssa');
/**
 *
 * @param {string} [rowHtml=''] data row html
 * @returns {string} full table html
 */
function tableContent(rowHtml) {
    "use strict";
    if (rowHtml === void 0) { rowHtml = ''; }
    rowHtml = typeof rowHtml == 'string' ? rowHtml : '';
    var tableContent = "<table>";
    tableContent += "<tr>";
    tableContent += '<th></th>';
    tableContent += '<th>Corridors</th>';
    tableContent += '<th></th>';
    tableContent += "</tr>";
    tableContent += rowHtml;
    tableContent += "</table>";
    return tableContent;
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
var CorridorCollection = (function () {
    /**
     * @param {jQuery} parentDiv - div id inside which to make the collection
     * @param {ol.Map} theMap - the SSA main map
     * @param {string} corridorDataIdOrClass - the corridor data container id or class
     * @param {function} afterChange - function to run after a change has taken place
     * @param {string} [dataClass=corridor-data] - function to run after a change has taken place
     */
    function CorridorCollection(parentDiv, theMap, corridorDataIdOrClass, afterChange, dataClass) {
        var _this = this;
        this._dataClass = dataClass || 'corridor-data';
        this._afterChange = afterChange;
        var _corridorDataContainer = $("." + corridorDataIdOrClass + ", #" + corridorDataIdOrClass);
        if (_corridorDataContainer.length == 0) {
            throw 'data container not found';
        }
        this.$corridorDataContainer = $(_corridorDataContainer[0]);
        this.$corridorDataContainer.addClass('corridor-data-container');
        this._map = theMap;
        var corridorsGuid = makeGuid_1.default();
        parentDiv.append("<div id=\"" + corridorsGuid + "\"></div>");
        this.$containerEl = $('#' + corridorsGuid).addClass('corridor-collection-container');
        var innerHtml = '<div class="corridor-collection">';
        innerHtml += tableContent();
        innerHtml += '</div>';
        this.$containerEl.append(innerHtml);
        this.$innerContainer = this.$containerEl.find('.corridor-collection');
        this._visible = true;
        this._inCreateModifyOperation = false;
        this._showPopups = true;
        /**
         *
         * @type {Array<Corridor>}
         */
        this._corridorArray = [];
        /**
         *
         * @type {{}}
         * @private
         */
        this._coridorLookup = {};
        this._popupStyle = function (props) {
            if (!_this.showPopups) {
                return false;
            }
            return popup_1.mmPopupContent(props);
        };
    }
    /**
     * add a corridor
     * @param {Corridor} c - the corridor to be added
     * @param [refreshData=true] c - the corridor to be added
     */
    CorridorCollection.prototype.addCorridorCreate = function (c, refreshData) {
        if (refreshData === void 0) { refreshData = true; }
        this._corridorArray.push(c);
        this._coridorLookup[c.clientId] = c;
        this._map.addLayer(c.olLayer);
        this._map.addLayer(c.nodeLayer.olLayer);
        c.layer.name = corridorName(c.rpFrom, c.rpTo);
        mapPopup_1.default.addVectorPopup(c.layer, this._popupStyle);
        if (refreshData) {
            this.refreshHtmlCreate();
        }
    };
    /**
     * delete/remove a corridor
     * @param {string|Corridor} cor - the corridor to be removed
     */
    CorridorCollection.prototype.removeCorridor = function (cor) {
        if (!confirm('Confirm Delete Corridor?')) {
            return;
        }
        if (typeof cor == 'string') {
            cor = this._coridorLookup[cor];
        }
        var ix = this._corridorArray.indexOf(cor);
        mapPopup_1.default.removeVectorPopup(cor.layer);
        this._map.removeLayer(cor.olLayer);
        this._map.removeLayer(cor.nodeLayer.olLayer);
        this._corridorArray.splice(ix, 1);
        delete this._coridorLookup[cor.clientId];
        this._map.getView().setZoom(this._map.getView().getZoom() - 1);
        this._map.getView().setZoom(this._map.getView().getZoom() + 1);
        this.refreshHtmlCreate();
    };
    /**
     * refresh the contents of the corridor table and hidden corridor data input elements
     */
    CorridorCollection.prototype.refreshHtmlCreate = function () {
        this.$innerContainer.html('');
        var rowContent = '';
        for (var _i = 0, _a = this._corridorArray; _i < _a.length; _i++) {
            var c = _a[_i];
            rowContent += c.tableHtmlCreate;
        }
        this.$innerContainer.append(tableContent(rowContent));
        this.$corridorDataContainer.html('');
        for (var i = 0; i < this._corridorArray.length; i++) {
            var cor = this._corridorArray[i];
            this.$corridorDataContainer.append(cor.getDataHtml(i));
        }
        this._afterChange();
    };
    Object.defineProperty(CorridorCollection.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (viz) {
            if (viz == this.visible) {
                return;
            }
            this._visible = viz;
            if (this.visible) {
                this.$containerEl.show();
            }
            else {
                this.$containerEl.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CorridorCollection.prototype, "fullExtent", {
        get: function () {
            var lyrs = [];
            for (var _i = 0, _a = this._corridorArray; _i < _a.length; _i++) {
                var c = _a[_i];
                lyrs.push(c.layer);
            }
            return calcExtent.calculateExtent(lyrs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CorridorCollection.prototype, "inCreateModifyOperation", {
        /**
         * if currently in a create or modify operation
         * @returns {boolean} is creating or modifying
         */
        get: function () {
            return this._inCreateModifyOperation;
        },
        /**
         * if currently in a create or modify operation
         * @param {boolean} isInCreateModifyOperation - is creating or modifying
         */
        set: function (isInCreateModifyOperation) {
            this._inCreateModifyOperation = isInCreateModifyOperation;
            if (this.inCreateModifyOperation) {
                this.$innerContainer.addClass('corridor-collection-create-modify');
            }
            else {
                this.$innerContainer.removeClass('corridor-collection-create-modify');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CorridorCollection.prototype, "showPopups", {
        /**
         *
         * @returns {boolean} if the corridor popups should be shown
         */
        get: function () {
            return this._showPopups;
        },
        /**
         *
         * @param {boolean} show - if the corridor popups should be shown
         */
        set: function (show) {
            this._showPopups = show;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CorridorCollection.prototype, "corridorCount", {
        get: function () {
            return this._corridorArray.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param {string} corId - corridor id
     * @returns {Corridor} the corridor matching the id in the lookup
     */
    CorridorCollection.prototype.getCorridorById = function (corId) {
        return this._coridorLookup[corId];
    };
    CorridorCollection.prototype.loadExistingCorridors = function () {
        var _this = this;
        var loadedCount = 0;
        var existingCorridors = document.getElementsByClassName(this._dataClass);
        // parse the data from the hidden input elements
        for (var n = 0; n < existingCorridors.length; n++) {
            var el = existingCorridors[n];
            var conf = new CorridorConfig_1.default(el);
            var corridor = new Corridor_1.default(conf.startPdp, conf.endPdp, conf.startRp, conf.endRp, conf.startCounty, conf.endCounty, conf.hgwy, conf.routeId, {
                loadedCallback: function () {
                    loadedCount++;
                    //something special when all the corridors have been loaded
                    if (_this.corridorCount == loadedCount) {
                        var ext = _this.fullExtent;
                        if (ext) {
                            _this._map.getView().fit(ext, _this._map.getSize());
                        }
                        _this.refreshHtmlCreate();
                    }
                }
            });
            corridor.setDbValues(conf);
            if (n == 0) {
                $('#primaryCounty').val(corridor.countyStart);
                $('#primaryRdwyRteId').val(corridor.routeId);
            }
            this.addCorridorCreate(corridor, false);
        }
    };
    return CorridorCollection;
}());
exports.CorridorCollection = CorridorCollection;
nm.CorridorCollection = CorridorCollection;
exports.default = CorridorCollection;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 7/15/2016.
 */
var mapPopup_1 = __webpack_require__(3);
var constants = __webpack_require__(13);
var objectHelpers_1 = __webpack_require__(21);
var filterContollingCriteria_1 = __webpack_require__(24);
var filterMmFlag_1 = __webpack_require__(26);
var styles = __webpack_require__(7);
var SortedFeatures_1 = __webpack_require__(12);
var LayerBaseVectorGeoJson_1 = __webpack_require__(8);
var hasMmFlag = 'hasMmFlag';
var hasCc = 'hasCc';
var rateFlag = 'rateFlag';
var kabCrshFlag = 'kabCrshFlag';
var Deficiency = (function () {
    /**
     *
     */
    function Deficiency() {
        this.deficiencyLayer = new LayerBaseVectorGeoJson_1.default('', {
            zIndex: 10,
            name: "Deficiencies",
            style: styles.deficiencyStyle
        });
        this.deficiencyLayerLabel = new LayerBaseVectorGeoJson_1.default('', {
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
    Deficiency.prototype.init = function (m) {
        var _this = this;
        this._map = m;
        m.addLayer(this.deficiencyLayer.olLayer);
        m.addLayer(this.deficiencyLayerLabel.olLayer);
        this.$summaryList = $("#" + this._summaryListId);
        filterMmFlag_1.default.addChangeCallback(function () {
            _this.deficiencyLayer.refresh();
            _this.deficiencyLayerLabel.refresh();
        });
        filterContollingCriteria_1.default.addChangeCallback(function () {
            _this.deficiencyLayer.refresh();
            _this.deficiencyLayerLabel.refresh();
        });
        mapPopup_1.default.addVectorPopup(this.deficiencyLayer, function (props) {
            var returnHtml = "PDP ID: " + props['pdpId'] + "<br/>";
            var rates = [];
            if (props['rateFlag'] != null) {
                rates.push("Rate Flag: " + props['rateFlag'].toFixed(4));
            }
            if (props['kabCrshFlag'] != null) {
                rates.push("KAB Flag: " + props['kabCrshFlag'].toFixed(4));
            }
            if (rates.length > 0) {
                returnHtml += 'Metamanager<ul>';
                for (var _i = 0, rates_1 = rates; _i < rates_1.length; _i++) {
                    var m_1 = rates_1[_i];
                    returnHtml += "<li>" + m_1 + "</li>";
                }
                returnHtml += '</ul>';
            }
            var ccs = [];
            for (var _a = 0, _b = objectHelpers_1.keyValPairs(constants.controllingCriteriaProps); _a < _b.length; _a++) {
                var cc = _b[_a];
                if (props[cc.key]) {
                    var newCc = "<li>";
                    newCc += cc.value;
                    var subEls = props[cc.key].split('::');
                    newCc += '<ul>';
                    for (var _c = 0, subEls_1 = subEls; _c < subEls_1.length; _c++) {
                        var s = subEls_1[_c];
                        if (!isNaN(parseInt(s)) || s.trim().length == 0) {
                            continue;
                        }
                        newCc += "<li>" + s + "</li>";
                    }
                    newCc += '</ul>';
                    newCc += '</li>';
                    ccs.push(newCc);
                }
            }
            if (ccs.length > 0) {
                returnHtml += "Geometric Deficiencies<ul>";
                for (var _d = 0, ccs_1 = ccs; _d < ccs_1.length; _d++) {
                    var c = ccs_1[_d];
                    returnHtml += c;
                }
                returnHtml += '</ul>';
            }
            return returnHtml;
        });
    };
    /**
     *
     * @param {Corridor} c - the corridor to be added
     * @abstract
     */
    Deficiency.prototype.addCorridor = function (c) {
        var feats = c.layer.source.getFeatures();
        for (var _i = 0, feats_1 = feats; _i < feats_1.length; _i++) {
            var f = feats_1[_i];
            var props = f.getProperties();
            var triggerRateFlag = props['rateFlag'] >= 1;
            var triggerKabFlag = props['kabCrshFlag'] >= 1;
            var deficiencyList = [];
            for (var _a = 0, _b = objectHelpers_1.keyValPairs(constants.controllingCriteriaProps); _a < _b.length; _a++) {
                var f_1 = _b[_a];
                var ccProps = props[f_1.key];
                if (ccProps) {
                    deficiencyList.push(f_1.value);
                }
            }
            if (triggerRateFlag || triggerKabFlag || deficiencyList.length > 0) {
                this.deficiencyLayer.source.addFeature(f);
                this.deficiencyLayerLabel.source.addFeature(f);
                var appendHtml = "<span style=\"font-weight: bold; color: white\">" + props['pdpId'] + "</span>:&nbsp;";
                var defs = [];
                if (triggerRateFlag && triggerKabFlag) {
                    defs.push("<span style=\"color: " + styles.mmBothColor + "\">KAB,&nbsp;Crash Rate</span>");
                }
                else if (triggerRateFlag) {
                    defs.push("<span style=\"color: " + styles.mmRateFlagColor + "\">Crash Rate</span>");
                }
                else if (triggerKabFlag) {
                    defs.push("<span style=\"color: " + styles.mmKabFlagColor + "\">KAB</span>");
                }
                appendHtml += defs.join(' ');
                if (defs.length > 0) {
                    appendHtml += ',&nbsp;';
                }
                if (deficiencyList.length > 0) {
                    appendHtml += "<span style=\"color: " + styles.controllingCriteriaColor + "\">" +
                        (deficiencyList.join(',&nbsp;') + "</span>");
                }
                this._summaryListItems.push({
                    pdpId: props['pdpId'],
                    liText: "<li " + constants.pdpDataAttr + "=\"" + props['pdpId'] + "\">" + appendHtml + "</li>"
                });
            }
        }
    };
    /**
     *
     * @param {number} pdpId
     * @returns {ol.Feature}
     */
    Deficiency.prototype.getFeatureById = function (pdpId) {
        return this._sortedFeatures.getFeature(pdpId);
    };
    /**
     * @abstract
     */
    Deficiency.prototype.afterLoad = function () {
        this._sortedFeatures = new SortedFeatures_1.default(this.deficiencyLayer.features, 'pdpId');
        var _this = this;
        this._summaryListItems.sort(function (a, b) {
            if (a.pdpId == b.pdpId) {
                return 0;
            }
            else {
                return a.pdpId < b.pdpId ? -1 : 1;
            }
        });
        for (var _i = 0, _a = this._summaryListItems; _i < _a.length; _i++) {
            var i = _a[_i];
            this.$summaryList.append(i.liText);
        }
        this.$summaryList.find('li').click(function () {
            var $this = $(this);
            var theFeature = _this.getFeatureById(parseInt($this.attr(constants.pdpDataAttr)));
            _this._map.getView().fit(theFeature.getGeometry().getExtent(), _this._map.getSize());
            _this._map.getView().setZoom(_this._map.getView().getZoom() - 1);
        });
    };
    return Deficiency;
}());
exports.Deficiency = Deficiency;
exports.default = new Deficiency();


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//
var SelectCounty_1 = __webpack_require__(45);
var SelectHighway_1 = __webpack_require__(46);
var SegmentPicker_1 = __webpack_require__(44);
var Corridor_1 = __webpack_require__(14);
var provide_1 = __webpack_require__(0);
var lyrStyles = __webpack_require__(7);
var mapPopup_1 = __webpack_require__(3);
var makeGuid_1 = __webpack_require__(4);
var LayerEsriMapServer_1 = __webpack_require__(30);
var $ = __webpack_require__(1);
__webpack_require__(1);
var nm = provide_1.default('ssa');
var PickerCollection = (function () {
    /**
     *
     * @param {jQuery} parentDiv - container div
     * @param {ol.Map} theMap - the main map
     */
    function PickerCollection(parentDiv, theMap) {
        this._map = theMap;
        parentDiv.append('<div>' +
            '<input type="button" value="Add Corridor" class="btn btn-default picker-create-corridor">' +
            '<input type="button" value="Zoom to Extent" class="btn btn-default picker-zoom-extent">' +
            '</div>');
        this.$createCorridorButton = parentDiv.find('.picker-create-corridor');
        this.$zoomExtentButton = parentDiv.find('.picker-zoom-extent');
        var pickerGuid = makeGuid_1.default();
        parentDiv.append("<div id=\"" + pickerGuid + "\"></div>");
        this.$containerEl = $('#' + pickerGuid).addClass('picker-collection-container');
        this.$containerEl.append('<div class="picker-collection"><span class="corridor-picker-help" title="Show Help"></span></div>');
        // this.$containerEl.append('<input type="button" value="Preview" class="btn btn-default picker-preview">');
        this.$containerEl.append('<input type="button" value="Add" class="btn btn-default picker-add">');
        this.$containerEl.append('<input type="button" value="Modify" class="btn btn-default picker-modify" style="display: none;">');
        this.$containerEl.append('<input type="button" value="Cancel" class="btn btn-default picker-cancel">');
        this.$innerContainer = this.$containerEl.find('.picker-collection');
        this._dummyCorridor = new Corridor_1.default(1, 1, '', '', 1, 1, 'h', -1, {
            cancelLoad: true,
            color: lyrStyles.corridorPreviewColor
        });
        this._dummyCorridor.layer.zIndex = 10;
        this._map.addLayer(this._dummyCorridor.olLayer);
        this._addModifyEnabled = false;
        /**
         *
         * @type {Corridor|undefined}
         * @private
         */
        this._modifyCorridor = undefined;
        // this.$btnPickerPreview = this.$containerEl.find('.picker-preview');
        this.$btnPickerAdd = this.$containerEl.find('.picker-add');
        this.$btnPickerModify = this.$containerEl.find('.picker-modify');
        this.$btnPickerCancel = this.$containerEl.find('.picker-cancel');
        this.countyStartSelect = new SelectCounty_1.default(this.$innerContainer, "Start County");
        this.countyEndSelect = new SelectCounty_1.default(this.$innerContainer, "End County");
        this.highwaySelect = new SelectHighway_1.default(this.$innerContainer);
        this._metamanagerSegmentsLayer = new LayerEsriMapServer_1.default('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer', {
            minZoom: 7,
            visible: false,
            name: 'Metamanager Segments',
            opacity: 0.4
        });
        this._map.addLayer(this._metamanagerSegmentsLayer.olLayer);
        this.segmentPickerFrom = new SegmentPicker_1.default(this, true);
        this.segmentPickerTo = new SegmentPicker_1.default(this, false);
        this._map.addLayer(this.segmentPickerFrom.segmentLayer.olLayer);
        this._map.addLayer(this.segmentPickerTo.segmentLayer.olLayer);
        this._map.addLayer(this.segmentPickerFrom.selectionLayer.olLayer);
        this._map.addLayer(this.segmentPickerTo.selectionLayer.olLayer);
        /**
         *
         * @type {CorridorCollection|undefined}
         */
        this.corridorCollection = undefined;
        this._addHandlers();
        this._helpDialogInit();
    }
    PickerCollection.prototype._addHandlers = function () {
        var _this = this;
        this.$createCorridorButton.click(function () {
            _this.startPicker();
            _this.$createCorridorButton.prop('disabled', true);
        });
        this.$zoomExtentButton.click(function () {
            var ext = _this.corridorCollection.fullExtent;
            if (ext) {
                _this._map.getView().fit(ext, _this._map.getSize());
            }
        });
        this.$btnPickerCancel.click(function () {
            _this.stopPicker();
        });
        // this.$btnPickerPreview.click(() => {
        //     this.previewCorridor(()=> {});
        //     // this.addCorridor();
        // });
        this.$btnPickerAdd.click(function () {
            _this.previewCorridor(_this.addCorridor);
            // this.addCorridor();
        });
        this.$btnPickerModify.click(function () {
            _this.previewCorridor(_this.modifyCorridor);
        });
        this.countyStartSelect.addChangeListener(function (v) {
            "use strict";
            _this.highwaySelect.setStartEndCounty(v, _this.countyEndSelect.selectedValue);
            _this.addModifyButtonEnabled = false;
            _this.segmentPickerTo.segmentLayer.visible = !_this.startEndCountySame;
        });
        this.countyEndSelect.addChangeListener(function (v) {
            "use strict";
            _this.highwaySelect.setStartEndCounty(_this.countyStartSelect.selectedValue, v);
            _this.addModifyButtonEnabled = false;
            _this.segmentPickerTo.segmentLayer.visible = !_this.startEndCountySame;
        });
        this.highwaySelect.addChangeListener(function (hwy) {
            "use strict";
            _this.segmentPickerFrom.setCountyAndRoute(_this.countyStartSelect.selectedValue, hwy);
            _this.segmentPickerTo.setCountyAndRoute(_this.countyEndSelect.selectedValue, hwy);
            _this.addModifyButtonEnabled = false;
        });
        this.segmentPickerFrom.addChangeListener(function () {
            _this.addModifyButtonEnabled = false;
        });
        this.segmentPickerTo.addChangeListener(function () {
            _this.addModifyButtonEnabled = false;
        });
    };
    /**
     * Configure the help dialog
     * @private
     */
    PickerCollection.prototype._helpDialogInit = function () {
        var _this = this;
        var helpInfo = 'Corridors are defined by selecting in sequence the start county, highway, and end county ';
        helpInfo += "The reference points are then populated and can be selected either by using the combo box or ";
        helpInfo += "by clicking a segment in the map and clicking select in the resulting popup ";
        helpInfo += "Corridors are defined visually in the pickers as the start segment (green) and end segment (red) ";
        helpInfo += "inclusive of the corridor extents";
        $('body').append("<div class=\"corridor-picker-help-dialog\" title=\"Corridor Selection Help\">" +
            ("<p style=\"text-align: justify\">" + helpInfo + "</p></div>"));
        this.helpDialog = $(".corridor-picker-help-dialog");
        this.helpDialog.dialog({
            modal: true,
            autoOpen: false,
            height: 450,
            width: 650,
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
        this.$containerEl.find('.corridor-picker-help').click(function () {
            _this.helpDialog.dialog('open');
        });
    };
    PickerCollection.prototype.previewCorridor = function (callback) {
        var _this = this;
        if (!this.segmentPickerFrom.selectedPdpId || !this.segmentPickerTo.selectedPdpId) {
            alert('Select From and To Reference Points');
            return;
        }
        this._map.removeLayer(this._dummyCorridor.layer.olLayer);
        this._map.removeLayer(this._dummyCorridor.nodeLayer.olLayer);
        this._dummyCorridor = new Corridor_1.default(this.segmentPickerFrom.selectedPdpId, this.segmentPickerTo.selectedPdpId, this.segmentPickerFrom.selectedText, this.segmentPickerTo.selectedText, this.countyStartSelect.selectedValue, this.countyEndSelect.selectedValue, this.highwaySelect.selectedText, this.highwaySelect.selectedValue, {
            cancelLoad: true,
            color: lyrStyles.corridorPreviewColor
        });
        this._dummyCorridor.layer.zIndex = 10;
        this._map.addLayer(this._dummyCorridor.layer.olLayer);
        this._map.addLayer(this._dummyCorridor.nodeLayer.olLayer);
        this._dummyCorridor.load(function (c) {
            _this._map.getView().fit(c.extent, _this._map.getSize());
            _this.addModifyButtonEnabled = true;
            callback.call(_this);
        });
    };
    /**
     * add a corridor
     */
    PickerCollection.prototype.addCorridor = function () {
        var newCorridor = this._dummyCorridor.clone();
        this.corridorCollection.addCorridorCreate(newCorridor);
        this.segmentPickerTo.segmentLayer.visible = !this.startEndCountySame;
        this.stopPicker();
    };
    PickerCollection.prototype.modifyCorridor = function () {
        this._modifyCorridor.updateCorridor(this._dummyCorridor);
        this.corridorCollection.refreshHtmlCreate();
        this.stopPicker();
    };
    /**
     * Populate the selections based on values from an existing corridor
     * @param {Corridor} [existingCor=undefined] existing corridor if in an edit operation
     */
    PickerCollection.prototype.startPicker = function (existingCor) {
        this.corridorCollection.inCreateModifyOperation = true;
        this.$containerEl.show();
        this.segmentPickerFrom.layersVisible = true;
        this.segmentPickerTo.layersVisible = true;
        this._metamanagerSegmentsLayer.visible = true;
        this.corridorCollection.showPopups = false;
        if (existingCor) {
            this.$btnPickerAdd.hide();
            this.$btnPickerModify.show();
            this.countyStartSelect.box.val(existingCor.countyStart);
            this.countyEndSelect.box.val(existingCor.countyEnd);
            this.highwaySelect.setStartEndCounty(existingCor.countyStart, existingCor.countyEnd, existingCor.routeId);
            this.segmentPickerFrom.setCountyAndRoute(existingCor.countyStart, existingCor.routeId, existingCor.pdpFrom);
            this.segmentPickerTo.setCountyAndRoute(existingCor.countyEnd, existingCor.routeId, existingCor.pdpTo);
            this._modifyCorridor = existingCor;
            this._dummyCorridor.updateCorridor(existingCor);
            this._map.getView().fit(this._dummyCorridor.extent, this._map.getSize());
        }
        else {
            var $primCounty = $('#primaryCounty');
            var $primRoute = $('#primaryRdwyRteId');
            var primaryCounty = undefined;
            var primaryRouteId = undefined;
            if ($primCounty.length > 0) {
                primaryCounty = $primCounty.val().length > 0 ? parseInt($primCounty.val()) : undefined;
            }
            if ($primRoute.length > 0) {
                primaryRouteId = $primRoute.val().length > 0 ? parseInt($primRoute.val()) : undefined;
            }
            if (primaryCounty) {
                this.countyStartSelect.box.val(primaryCounty);
                this.countyEndSelect.box.val(primaryCounty);
                this.highwaySelect.setStartEndCounty(primaryCounty, primaryCounty, primaryRouteId, true);
            }
            this.$btnPickerAdd.show();
            this.$btnPickerModify.hide();
        }
    };
    PickerCollection.prototype.stopPicker = function () {
        this.corridorCollection.showPopups = true;
        this.$btnPickerAdd.show();
        this.$btnPickerModify.hide();
        // this.$btnPickerModify.prop('disabled', true);
        this.$containerEl.hide();
        this.$createCorridorButton.prop('disabled', false);
        // this.countyStartSelect.box.val(1).trigger('change');
        this.corridorCollection.visible = true;
        this._dummyCorridor.layer.clear();
        this._modifyCorridor = undefined;
        this._dummyCorridor.nodeLayer.olLayer.getSource().clear();
        this.addModifyButtonEnabled = false;
        this.corridorCollection.inCreateModifyOperation = false;
        $('.corridor-tr-selected').removeClass('corridor-tr-selected');
        this.segmentPickerFrom.layersVisible = false;
        this.segmentPickerTo.layersVisible = false;
        this._metamanagerSegmentsLayer.visible = false;
        mapPopup_1.default.closePopup();
    };
    Object.defineProperty(PickerCollection.prototype, "addModifyButtonEnabled", {
        /**
         * Getter for if an add modify operation is happening {boolean}
         * @returns {boolean} - if the add or modify operation is happening
         */
        get: function () {
            return this._addModifyEnabled;
        },
        /**
         * Setter for if an add modify operation is happening {boolean}
         * @param {boolean} isEnabled - if enabled
         */
        set: function (isEnabled) {
            this._addModifyEnabled = isEnabled;
            // this.$btnPickerAdd.prop('disabled', !this.addModifyButtonEnabled);
            // this.$btnPickerModify.prop('disabled', !this.addModifyButtonEnabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickerCollection.prototype, "startEndCountySame", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            var isSame = this.countyStartSelect.selectedValue == this.countyEndSelect.selectedValue;
            this.segmentPickerFrom.segmentLayer.name = isSame ? 'Start/End Segments' : 'Start Segment';
            return isSame;
        },
        enumerable: true,
        configurable: true
    });
    return PickerCollection;
}());
nm.PickerCollection = PickerCollection;
exports.default = PickerCollection;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 7/13/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
// uncomment this to use the example crash data
// import exampleCrashData from './_exampleCrashData';
var exampleCrashData = undefined;
var ajaxGetters_1 = __webpack_require__(6);
var objHelp = __webpack_require__(21);
var LayerBaseVectorGeoJson_1 = __webpack_require__(8);
var filterCrash_1 = __webpack_require__(25);
var proj = __webpack_require__(5);
var mapPopup_1 = __webpack_require__(3);
var layerStyles_1 = __webpack_require__(7);
var popup_1 = __webpack_require__(10);
var popup_2 = __webpack_require__(10);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var CrashData = (function () {
    function CrashData() {
        this._crashHtmlLookup = {};
        this._crashArrayLookup = {};
        this.pointCrashes = new LayerBaseVectorGeoJson_1.default('', {
            name: "Crash Points",
            zIndex: 20,
            minZoom: 10,
            renderOrder: function (a, b) {
                var sevOrder = ['P', 'C', 'B', 'A', 'K'];
                var sevA = a.getProperties()['injSvr'];
                var sevB = b.getProperties()['injSvr'];
                var sevAInd = sevOrder.indexOf(sevA);
                var sevBInd = sevOrder.indexOf(sevB);
                if (sevAInd == sevBInd) {
                    return 0;
                }
                return sevAInd > sevBInd ? 1 : -1;
            }
        });
        this.pointCrashes.style = layerStyles_1.crashPointStyle;
    }
    /**
     *
     * @param m
     * @param ssaId
     * @param snapshot
     */
    CrashData.prototype.init = function (m, ssaId, snapshot) {
        var _this = this;
        mapPopup_1.default.addVectorPopup(this.pointCrashes, popup_1.crashPointPopup);
        filterCrash_1.default.addChangeCallback(function () {
            _this.pointCrashes.refresh();
        });
        ajaxGetters_1.default.getCrashes(ssaId, snapshot, function (d) {
            _this._processCrashData(d);
        });
        m.addLayer(this.pointCrashes.olLayer);
    };
    CrashData.prototype._processCrashData = function (d) {
        for (var _i = 0, _a = objHelp.keyValPairs(d); _i < _a.length; _i++) {
            var itm = _a[_i];
            /**
             *
             * @type {Array.<CrashDataObject>}
             */
            var _crashes = itm.value;
            var crashes = [];
            var addedCrashDocNumbers = [];
            for (var _b = 0, _crashes_1 = _crashes; _b < _crashes_1.length; _b++) {
                var c = _crashes_1[_b];
                if (addedCrashDocNumbers.indexOf(c.doctnmbr) > -1) {
                    continue;
                }
                addedCrashDocNumbers.push(c.doctnmbr);
                crashes.push(c);
            }
            this._crashHtmlLookup[itm.key] = popup_2.crashInfoHelper(crashes);
            this._crashArrayLookup[itm.key] = crashes;
            for (var _c = 0, crashes_1 = crashes; _c < crashes_1.length; _c++) {
                var c = crashes_1[_c];
                if (!(c.lon && c.lat)) {
                    continue;
                }
                var geom = new ol.geom.Point([c.lon, c.lat]);
                geom.transform(proj.proj4326, proj.proj3857);
                var p = new ol.Feature(geom);
                c['injSvr'] = c['injSvr'] || 'O';
                p.setProperties(c);
                this.pointCrashes.source.addFeature(p);
            }
        }
        // flash a crashes loaded message
        var $crashesLoadMsg = $('.crashes-loaded-msg');
        if ($crashesLoadMsg) {
            $crashesLoadMsg.fadeIn();
            setTimeout(function () {
                $crashesLoadMsg.fadeOut();
            }, 4000);
        }
        else {
            console.log('get crashes message element not found');
        }
    };
    CrashData.prototype.getCrashSummary = function (pdp) {
        var summ = this._crashHtmlLookup[pdp.toString()];
        return summ || '';
    };
    return CrashData;
}());
exports.CrashData = CrashData;
exports.default = new CrashData();


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 5/17/2016.
 */
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('ssa');
exports.countyLookup = {
    "1": "Adams",
    "2": "Ashland",
    "3": "Barron",
    "4": "Bayfield",
    "5": "Brown",
    "6": "Buffalo",
    "7": "Burnett",
    "8": "Calumet",
    "9": "Chippewa",
    "10": "Clark",
    "11": "Columbia",
    "12": "Crawford",
    "13": "Dane",
    "14": "Dodge",
    "15": "Door",
    "16": "Douglas",
    "17": "Dunn",
    "18": "Eau Claire",
    "19": "Florence",
    "20": "Fond du Lac",
    "21": "Forest",
    "22": "Grant",
    "23": "Green",
    "24": "Green Lake",
    "25": "Iowa",
    "26": "Iron",
    "27": "Jackson",
    "28": "Jefferson",
    "29": "Juneau",
    "30": "Kenosha",
    "31": "Kewaunee",
    "32": "La Crosse",
    "33": "Lafayette",
    "34": "Langlade",
    "35": "Lincoln",
    "36": "Manitowoc",
    "37": "Marathon",
    "38": "Marinette",
    "39": "Marquette",
    "40": "Milwaukee",
    "41": "Monroe",
    "42": "Oconto",
    "43": "Oneida",
    "44": "Outagamie",
    "45": "Ozaukee",
    "46": "Pepin",
    "47": "Pierce",
    "48": "Polk",
    "49": "Portage",
    "50": "Price",
    "51": "Racine",
    "52": "Richland",
    "53": "Rock",
    "54": "Rusk",
    "55": "Saint Croix",
    "56": "Sauk",
    "57": "Sawyer",
    "58": "Shawano",
    "59": "Sheboygan",
    "60": "Taylor",
    "61": "Trempealeau",
    "62": "Vernon",
    "63": "Vilas",
    "64": "Walworth",
    "65": "Washburn",
    "66": "Washington",
    "67": "Waukesha",
    "68": "Waupaca",
    "69": "Waushara",
    "70": "Winnebago",
    "71": "Wood",
    "73": "Menominee"
};
nm.countyLookup = exports.countyLookup;
/**
 *
 * @param {string|number} countyId
 * @returns {string}
 */
function getCountyById(countyId) {
    "use strict";
    if (typeof countyId == 'number') {
        countyId = countyId.toFixed();
    }
    return exports.countyLookup[countyId];
}
exports.getCountyById = getCountyById;
nm.getCountyById = getCountyById;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/13/2016.
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var SortedFeatures_1 = __webpack_require__(12);
var LayerBaseVectorGeoJson_1 = __webpack_require__(8);
var mapPopup_1 = __webpack_require__(3);
var SelectBoxBase_1 = __webpack_require__(11);
var ajaxGetters_1 = __webpack_require__(6);
var layerStyles = __webpack_require__(7);
var projections_1 = __webpack_require__(5);
var $ = __webpack_require__(1);
var ol = __webpack_require__(2);
var nm = provide_1.default('ssa.select');
var SegmentPicker = (function (_super) {
    __extends(SegmentPicker, _super);
    /**
     *
     * @param {PickerCollection} pickerColl - picker collection
     * @param {boolean} isFrom - is this the start (from) picker
     */
    function SegmentPicker(pickerColl, isFrom) {
        var _this = this;
        function contentGen(guid) {
            var outString = '';
            outString += "<div style=\"position: relative;\" class=\"select-picker-map-container\">";
            outString += "<select id=\"" + guid + "\"></select>";
            outString += "</div>";
            return outString;
        }
        _this = _super.call(this, pickerColl.$innerContainer, isFrom ? 'Ref. Point #1' : 'Ref. Point #2', contentGen) || this;
        _this._isFrom = isFrom;
        _this._pickerColl = pickerColl;
        /**
         *
         * @type {number|undefined}
         * @private
         */
        _this._selectedPdpId = undefined;
        _this.addChangeListener(function (v) {
            _this.selectedPdpId = parseInt(v);
        });
        _this._box.keyup(function () {
            if (_this.selectedPdpId != parseInt(_this.selectedValue.toString())) {
                _this._box.trigger('change');
            }
        });
        /**
         *
         * @type {SortedFeatures|undefined}
         * @private
         */
        _this._sortedFeatures = undefined;
        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @protected
         */
        _this._segmentLayer = new LayerBaseVectorGeoJson_1.default('', {
            minZoom: 6,
            name: _this._isFrom ? 'Start Segment' : 'End Segment',
            transform: { dataProjection: projections_1.proj3857, featureProjection: projections_1.proj3857 },
            style: layerStyles.segmentLayer,
            visible: false
        });
        _this._segNodeLayer = new LayerBaseVectorGeoJson_1.default('', {
            style: layerStyles.segNodeStyle,
            minZoom: 11,
            visible: false
        });
        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @private
         */
        _this._segmentSelectionLayer = new LayerBaseVectorGeoJson_1.default('', {
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: _this._isFrom ? layerStyles.fromSelectionColor : layerStyles.toSelectionColor,
                    width: 8
                })
            }),
            minZoom: 6,
            visible: false,
            zIndex: _this._isFrom ? 100 : 101
        });
        _this._selectBtnClass = _this._isFrom ? "select-seg-btn-from" : "select-seg-btn-to";
        _this._selectBtnClassTo = 'select-seg-btn-to';
        mapPopup_1.default.addVectorPopup(_this._segmentLayer, function (props) {
            console.log(props);
            var returnHtml = '<table class="mm-popup-table">';
            returnHtml += "<tr><td>PdpId</td><td>" + props['pdpId'] + "</td>;";
            returnHtml += "<td rowspan=\"5\">";
            if (_this._pickerColl.startEndCountySame) {
                returnHtml += "<input type=\"button\" id='" + props['pdpId'] + "' class=\"" + _this._selectBtnClass + "\" value=\"Select Start\"/>";
                returnHtml += "<input type=\"button\" id='" + props['pdpId'] + "' class=\"" + _this._selectBtnClassTo + "\" value=\"Select End\"/>";
            }
            else {
                returnHtml += "<input type=\"button\" id='" + props['pdpId'] + "' class=\"" + _this._selectBtnClass + "\" value=\"Select\"/>";
            }
            returnHtml += "</td></tr>";
            returnHtml += "<tr><td>Hwy</td><td>" + props['stdName'] + "</td></tr>";
            returnHtml += "<tr><td>DivUnd</td><td>" + props['divUnd'] + "</td></tr>";
            returnHtml += "<tr><td>From</td><td>" + props['startRp'] + "</td></tr>";
            returnHtml += "<tr><td>To</td><td>" + props['endRp'] + "</td></tr>";
            returnHtml += '</table>';
            return returnHtml;
        });
        // add the popup change function to find the select button
        mapPopup_1.default.addPopupChangedFunction(function () {
            var selectButton = $("." + _this._selectBtnClass);
            if (selectButton.length > 0) {
                var __this_1 = _this;
                selectButton.click(function () {
                    __this_1.selectedPdpId = this['id'];
                });
            }
        });
        _this._enabled = false;
        _this._layersVisible = false;
        _this._box.click(function (evt) {
            evt.stopPropagation();
        });
        _this._box.parent('div').click(function () {
            if (_this._sortedFeatures == null) {
                return;
            }
            var selectedFeature = _this._sortedFeatures.getFeature(_this.selectedPdpId);
            if (selectedFeature == null) {
                return;
            }
            mapPopup_1.default.map.getView().fit(selectedFeature.getGeometry().getExtent(), mapPopup_1.default.map.getSize());
            mapPopup_1.default.map.getView().setZoom(mapPopup_1.default.map.getView().getZoom() - 2);
        });
        return _this;
    }
    /**
     * @param {Array<object>} arr - array of returned objects, implementation defined in derived classes
     */
    SegmentPicker.prototype._processAjaxResult = function (arr) {
        var _this = this;
        arr.sort(function (a, b) {
            var c = _this._isFrom ? a['properties']['startRp'] : a['properties']['endRp'];
            var d = _this._isFrom ? b['properties']['startRp'] : b['properties']['endRp'];
            if (c == d) {
                return 0;
            }
            return c < d ? -1 : 1;
        });
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var feat = arr_1[_i];
            var props = feat['properties'];
            if (this._isFrom) {
                this._box.append("<option value=\"" + props['pdpId'] + "\">" + props['startRp'] + "</option>");
            }
            else {
                this._box.append("<option value=\"" + props['pdpId'] + "\">" + props['endRp'] + "</option>");
            }
        }
    };
    /**
     *
     * @param {string|number} county - county id as string or number
     * @param {string|number|null} rteId - routeId
     * @param {number|undefined} [pdpId=undefined] - the pdp id to be set on load
     */
    SegmentPicker.prototype.setCountyAndRoute = function (county, rteId, pdpId) {
        var _this = this;
        pdpId = typeof pdpId == 'number' ? pdpId : undefined;
        this.selectedPdpId = undefined;
        this._box.html('');
        this._box.addClass('refresh').removeClass('refresh');
        if (mapPopup_1.default) {
            mapPopup_1.default.closePopup();
        }
        if (typeof county == 'string') {
            county = parseInt(county);
        }
        if (rteId == null) {
            this.enabled = false;
            return;
        }
        if (typeof rteId == 'string') {
            rteId = parseInt(rteId);
        }
        ajaxGetters_1.default.getSegments(county, rteId, function (d) {
            _this._segmentLayer.clear();
            _this._segNodeLayer.clear();
            _this._processAjaxResult(d['features']);
            if (d['features'].length > 0) {
                _this.enabled = true;
                _this._segmentLayer.addFeatures(d);
                var feats = _this._segmentLayer.source.getFeatures();
                _this._sortedFeatures = new SortedFeatures_1.default(feats, 'pdpId');
                _this._setExtent();
                if (typeof pdpId == 'number') {
                    // this._box.val(pdpId.toFixed());
                    _this.selectedPdpId = pdpId;
                }
                else {
                    _this._box.trigger('change');
                }
                for (var i = 0; i < feats.length; i++) {
                    var coords = feats[i].getGeometry()['getCoordinates']();
                    if (coords.length > 0) {
                        var startPoint = new ol.geom.Point(coords[0]);
                        var endPoint = new ol.geom.Point(coords[coords.length - 1]);
                        _this._segNodeLayer.source.addFeature(new ol.Feature(startPoint));
                        _this._segNodeLayer.source.addFeature(new ol.Feature(endPoint));
                    }
                }
            }
            else {
                _this.enabled = false;
            }
        });
    };
    SegmentPicker.prototype._setExtent = function () {
    };
    Object.defineProperty(SegmentPicker.prototype, "enabled", {
        /**
         * @returns {boolean} if enabled
         */
        get: function () {
            return this._enabled;
        },
        /**
         *
         * @param {boolean} isEnabled - is enabled
         * @private
         */
        set: function (isEnabled) {
            this._enabled = isEnabled;
            this._box.prop('disabled', !isEnabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentPicker.prototype, "layersVisible", {
        get: function () {
            return this._layersVisible;
        },
        set: function (lyrsVisible) {
            this._layersVisible = lyrsVisible;
            if (this._isFrom) {
                this.segmentLayer.visible = this.layersVisible;
                this._segNodeLayer.visible = this.layersVisible;
            }
            else {
                this.segmentLayer.visible = this.layersVisible && !this._pickerColl.startEndCountySame;
                this._segNodeLayer.visible = this.layersVisible && !this._pickerColl.startEndCountySame;
            }
            this.selectionLayer.visible = this.layersVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentPicker.prototype, "selectedPdpId", {
        /**
         *
         * @returns {number|undefined} selected id
         */
        get: function () {
            return this._selectedPdpId;
        },
        /**
         * set the currently selected pdp id
         * @param {number|undefined} newId - new selected id
         */
        set: function (newId) {
            if (mapPopup_1.default) {
                mapPopup_1.default.closePopup();
            }
            if (typeof newId == 'string') {
                newId = parseInt(newId);
            }
            if (newId == this._selectedPdpId) {
                return;
            }
            this._selectedPdpId = newId;
            this.selectionLayer.source.clear();
            if (this._selectedPdpId != undefined) {
                this._box.val(this.selectedPdpId);
                var selectedFeature = this._sortedFeatures.getFeature(this.selectedPdpId);
                this.selectionLayer.source.addFeature(selectedFeature);
            }
        },
        enumerable: true,
        configurable: true
    });
    SegmentPicker.prototype.clear = function () {
        this._box.html('');
        this.selectedPdpId = undefined;
    };
    Object.defineProperty(SegmentPicker.prototype, "segmentLayer", {
        /**
         * get the segment layer with the mm segments in the county and route id
         * @returns {LayerBaseVectorGeoJson} - the segment layer
         */
        get: function () {
            return this._segmentLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentPicker.prototype, "selectionLayer", {
        /**
         * get the selection hayer
         * @returns {LayerBaseVectorGeoJson} the selection layer for this picker
         */
        get: function () {
            return this._segmentSelectionLayer;
        },
        enumerable: true,
        configurable: true
    });
    return SegmentPicker;
}(SelectBoxBase_1.default));
exports.SegmentPicker = SegmentPicker;
nm.SegmentPicker = SegmentPicker;
exports.default = SegmentPicker;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 6/14/2016.
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SelectBoxBase_1 = __webpack_require__(11);
var ajaxGetters_1 = __webpack_require__(6);
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('ssa.select');
var SelectCounty = (function (_super) {
    __extends(SelectCounty, _super);
    /**
     *
     * @param {jQuery} parent
     * @param {string} labelContent
     */
    function SelectCounty(parent, labelContent) {
        var _this = _super.call(this, parent, labelContent) || this;
        ajaxGetters_1.default.getAllCounties(function (d) {
            for (var _i = 0, d_1 = d; _i < d_1.length; _i++) {
                var c = d_1[_i];
                _this.box.append("<option value=\"" + c['id'] + "\" " + (c['primary'] ? 'selected' : '') + ">" + c['name'] + "</option>");
            }
            _this.box.trigger('change');
        });
        return _this;
    }
    return SelectCounty;
}(SelectBoxBase_1.default));
exports.SelectCounty = SelectCounty;
nm.SelectStartCounty = SelectCounty;
exports.default = SelectCounty;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 5/12/2016.
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SelectBoxBase_1 = __webpack_require__(11);
var ajaxGetters_1 = __webpack_require__(6);
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('ssa.select');
var SelectHighway = (function (_super) {
    __extends(SelectHighway, _super);
    /**
     *
     * @param {jQuery} parent - parent element
     */
    function SelectHighway(parent) {
        return _super.call(this, parent, "Highway") || this;
    }
    // /**
    //  *
    //  * @param {number} countyId - county id
    //  * @param {string|undefined} [hwy=undefined] - route id for initial selection
    //  */
    // setStartCounty(countyId, hwy) {
    //     hwy = typeof hwy == 'string' ? hwy : undefined;
    //     this.box.html('');
    //     this.box.addClass('refresh').removeClass('refresh');
    //
    //     Ajx.getHighways(countyId, (d) => {
    //         "use strict";
    //
    //         for (let h of d) {
    //             this.box.append(`<option>${h['name']}</option>`);
    //         }
    //         if (d) {
    //             if (hwy) {
    //                 this.box.val(hwy);
    //             } else {
    //                 this.box.trigger('change');
    //
    //             }
    //         }
    //     });
    // }
    /**
     *
     * @param {number|string|null} startId - start county id
     * @param {number|string|null} endId - end county id
     * @param {number|string|null} [routeId=undefined] - route id for selection
     * @param {boolean} [forceTrigger=false] - force change trigger to populate the rp pickers
     */
    SelectHighway.prototype.setStartEndCounty = function (startId, endId, routeId, forceTrigger) {
        var _this = this;
        if (forceTrigger === void 0) { forceTrigger = false; }
        forceTrigger = typeof forceTrigger == 'boolean' ? forceTrigger : false;
        if (startId == null || startId == undefined || endId == null) {
            return;
        }
        if (typeof routeId == 'number') {
            routeId = routeId.toFixed();
        }
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');
        if (typeof startId == 'string') {
            startId = parseInt(startId);
        }
        if (typeof endId == 'string') {
            endId = parseInt(endId);
        }
        if (typeof routeId == 'string') {
            routeId = parseInt(routeId);
        }
        ajaxGetters_1.default.getHwyByStartEndCounty(startId, endId, function (d) {
            if (d.length > 0) {
                d.sort(function (a, b) {
                    var aName = a['name'];
                    var bName = b['name'];
                    if (aName == bName) {
                        return 0;
                    }
                    else {
                        return aName > bName ? 1 : -1;
                    }
                });
                for (var _i = 0, d_1 = d; _i < d_1.length; _i++) {
                    var c = d_1[_i];
                    _this.box.append("<option value=\"" + c['id'] + "\" " + (c['primary'] ? 'selected' : '') + ">" + c['name'] + "</option>");
                }
                if (routeId) {
                    _this.box.val(routeId.toFixed());
                }
                if (!routeId || forceTrigger) {
                    _this.box.trigger('change');
                }
                _this.box.prop('disabled', false);
            }
            else {
                _this.box.prop('disabled', true);
                _this.box.trigger('change');
            }
        });
    };
    return SelectHighway;
}(SelectBoxBase_1.default));
exports.SelectHighway = SelectHighway;
nm.SelectHighway = SelectHighway;
exports.default = SelectHighway;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 10/4/2016.
 */
var SsaMapCreate_1 = __webpack_require__(27);
var SsaMapView_1 = __webpack_require__(28);
window['SsaMapCreate'] = SsaMapCreate_1.SsaMapCreate;
window['SsaMapView'] = SsaMapView_1.SsaMapView;
try {
    glob['SsaMapCreate'] = SsaMapCreate_1.SsaMapCreate;
    glob['SsaMapView'] = SsaMapView_1.SsaMapView;
}
catch (ex) {
    var glob_1 = {};
    glob_1['SsaMapCreate'] = SsaMapCreate_1.SsaMapCreate;
    glob_1['SsaMapView'] = SsaMapView_1.SsaMapView;
}


/***/ })
/******/ ]);
//# sourceMappingURL=ssaApps.js.map