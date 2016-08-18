/**
 * Created by gavorhes on 5/12/2016.
 */

import $ from 'webmapsjs/src/jquery/jquery';
import provide from 'webmapsjs/src/util/provide';
const nm = provide('ssa');

const home = $('#site-root').val();
const getStartCountiesUrl = home + 'getStartCounties';
const getHighwaysUrl = home + 'getHighways';
const getEndCountiesUrl = home + 'getEndCounties';
const getSegmentsUrl = home + 'getSegments';
const getCorridorUrl = home + 'getCorridor';
const getCrashesUrl = home + 'getCrashes';
const getAllCountiesUrl = home + 'getAllCounties';
const getAllHighwaysForStartEndCountyUrl = home + 'getAllHighwaysForStartEndCounty';




/**
 * inner function to help ajax
 * @param {string} url - resource url
 * @param {object} [params={}] - get params
 * @param {ajaxCallback} callback - callback function
 */
function _ajaxInner(url, params, callback) {
    "use strict";
    $.get(url, params, callback, 'json').fail(() => {
        let msg = "error getting: " + url + JSON.stringify(params);
        console.warn(msg);
        // alert("error getting: " + url + JSON.stringify(params));
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
    params = params || {};

    if (typeof calbackHelper == 'function') {
        let newCallback = function (d) {
            d = calbackHelper(d);
            callback(d);
        };
        _ajaxInner(url, params, newCallback);
    } else {
        _ajaxInner(url, params, callback);
    }
}

/**
 * sort function for counties
 * @param {Array<object>} d - county object
 * @returns {Array<object>} sorted array of county key val pair objects
 */
let _countySort = (d) => {
    d.sort((a, b) => {
        if (a['name'] == b['name']) {
            return 0;
        } else {
            return a['name'] < b['name'] ? -1 : 1;
        }
    });
    
    return d;
};

/**
 * static methods to make ajax requests
 */
class AjaxGetters {

    /**
     * Do not instantiate this class - only static methods
     */
    constructor(){
        throw 'this class should not be instantiated';
    }



    /**
     * @static
     * @param {ajaxCallback} callback - callback function
     */
    static getStartCounties(callback) {
        "use strict";

        _ajaxHelper(getStartCountiesUrl, callback, {}, _countySort);
    }

    /**
     * Get the highways based on the start county
     * @param {number} startCountyId - start county id
     * @param {ajaxCallback} callback - callback function
     */
    static getHighways(startCountyId, callback) {
        "use strict";
        let params = {"startCountyId": startCountyId};

        _ajaxHelper(getHighwaysUrl, callback, params);
    }


    /**
     * Get the highways based on the start county
     * @param {string} highwayName - highway name
     * @param {ajaxCallback} callback - callback function
     */
    static getEndCounties(highwayName, callback) {
        "use strict";
        let params = {"highwayName": highwayName};

        _ajaxHelper(getEndCountiesUrl, callback, params, _countySort);
    }


    /**
     * get the segments based on county and route id
     * @param {number} county - county id
     * @param {number} routeId - route id
     * @param {ajaxCallback} callback - callback function
     */
    static getSegments(county, routeId, callback) {
        "use strict";
        if (typeof routeId == 'string') {
            routeId = parseInt(routeId);
        }

        let params = {"routeid": routeId, "county": county};
        _ajaxHelper(getSegmentsUrl, callback, params);
    }


    /**
     * get corridor based on start and end pdp id
     * @param {number} startPdp - start pdp id
     * @param {number} endPdp - end pdp id
     * @param {ajaxCallback} callback - callback function
     */
    static getCorridor(startPdp, endPdp, callback) {
        "use strict";
        let params = {"from": startPdp, "to": endPdp};

        _ajaxHelper(getCorridorUrl, callback, params);
    }


    /**
     * Get the crash data
     * @param {ajaxCallback} callback - callback function
     */
    static getCrashes(callback) {
        "use strict";
        let params = {};

        _ajaxHelper(getCrashesUrl, callback, params);
    }

    /**
     * Get all counties as an array
     * @param {ajaxCallback} callback - callback function
     */
    static getAllCounties(callback) {
        "use strict";
        let params = {};

        _ajaxHelper(getAllCountiesUrl, callback, params);
    }


    /**
     * Get highways based on start and end counties
     * @param {number} startCountyId - start county id
     * @param {number} endCountyId - end county id
     * @param {ajaxCallback} callback - callback function
     *
     */
    static getHwyByStartEndCounty(startCountyId, endCountyId, callback) {
        "use strict";

        let params = {
            'startCountyId': startCountyId,
            'endCountyId': endCountyId
        };

        _ajaxHelper(getAllHighwaysForStartEndCountyUrl, callback, params);
    }

}

export default AjaxGetters;
nm.AjaxGetters = AjaxGetters;
