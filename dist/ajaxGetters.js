/**
 * Created by gavorhes on 5/12/2016.
 */
"use strict";
var provide_1 = require('webmapsjs/dist/util/provide');
var $ = require('jquery');
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
        var $mm = $('#hidden-mm-version');
        if ($mm.length > 0) {
            params['mm'] = $mm.val();
        }
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
        var $mm = $('#hidden-mm-version');
        if ($mm.length > 0) {
            params['mm'] = $mm.val();
        }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AjaxGetters;
nm.AjaxGetters = AjaxGetters;
//# sourceMappingURL=ajaxGetters.js.map