/**
 * Created by gavorhes on 5/12/2016.
 */


import provide from 'webmapsjs/dist/util/provide';
import $ = require('jquery');

let home = $('#site-root').val();

if (window.location.port == '5001'){
    home ='http://localhost:5004/'
}

const getStartCountiesUrl = home + 'getStartCounties';
const getHighwaysUrl = home + 'getHighways';
const getEndCountiesUrl = home + 'getEndCounties';
const getSegmentsUrl = home + 'getSegments';
const getCorridorUrl = home + 'getCorridor';
const getCrashesUrl = home + 'getCrashes';
const getAllCountiesUrl = home + 'getAllCounties';
const getAllHighwaysForStartEndCountyUrl = home + 'getAllHighwaysForStartEndCounty';
const getCcGeomUrl = home + 'getCcGeom';
const nm = provide('ssa');


export interface ajaxCallback{
    (inObject) : any
}


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
    });
}

/**
 * outer function to help ajax
 * @param {string} url - resource url
 * @param {ajaxCallback} callback - callback function
 * @param {object} [params={}] get params
 * @param {ajaxCallback} [calbackHelper=undefined] - callback helper
 */
function _ajaxHelper(url: string, callback: ajaxCallback, params:Object = {}, calbackHelper? : ajaxCallback) {
    "use strict";

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
export class AjaxGetters {

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
    public static getStartCounties(callback: ajaxCallback) {
        "use strict";

        _ajaxHelper(getStartCountiesUrl, callback, {}, _countySort);
    }

    /**
     * Get the highways based on the start county
     * @param {number} startCountyId - start county id
     * @param {ajaxCallback} callback - callback function
     */
    public static getHighways(startCountyId: number, callback: ajaxCallback) {
        "use strict";
        let params = {"startCountyId": startCountyId};

        _ajaxHelper(getHighwaysUrl, callback, params);
    }


    /**
     * Get the highways based on the start county
     * @param {string} highwayName - highway name
     * @param {ajaxCallback} callback - callback function
     */
    public static getEndCounties(highwayName: string, callback: ajaxCallback) {
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
    public static getSegments(county: number, routeId: string|number, callback: ajaxCallback) {
        "use strict";

        let routeIdNum;
        if (typeof routeId == 'string') {
            routeIdNum = parseInt(routeId as string);
        } else {
            routeIdNum = routeId;
        }

        let params = {"routeid": routeIdNum, "county": county};
        _ajaxHelper(getSegmentsUrl, callback, params);
    }


    /**
     * get corridor based on start and end pdp id
     * @param {number} startPdp - start pdp id
     * @param {number} endPdp - end pdp id
     * @param {ajaxCallback} callback - callback function
     */
    public static getCorridor(startPdp: number, endPdp: number,  callback: ajaxCallback) {
        "use strict";
        let params = {"from": startPdp, "to": endPdp};

        _ajaxHelper(getCorridorUrl, callback, params);
    }


    /**
     * Get the crash data
     * @param {number} ssaId
     * @param {number} snapshot
     * @param {ajaxCallback} callback - callback function
     */
    public static getCrashes(ssaId: number, snapshot: number, callback: ajaxCallback){
        "use strict";

        let params = {
            'ssaId': ssaId,
            'snapshot': snapshot
        };

        _ajaxHelper(getCrashesUrl, callback, params);
    }

    /**
     * Get all counties as an array
     * @param {ajaxCallback} callback - callback function
     */
    public static getAllCounties(callback: ajaxCallback) {
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
    public static getHwyByStartEndCounty(startCountyId: number, endCountyId: number, callback: ajaxCallback) {
        "use strict";

        let params = {
            'startCountyId': startCountyId,
            'endCountyId': endCountyId
        };

        _ajaxHelper(getAllHighwaysForStartEndCountyUrl, callback, params);
    }

    public static getCcGeom(ssaId: number, snapshot: number, callback: ajaxCallback){
        "use strict";

        let params = {
            'ssaId': ssaId,
            'snapshot': snapshot
        };

        _ajaxHelper(getCcGeomUrl, callback, params);
    }
}

export default AjaxGetters;
nm.AjaxGetters = AjaxGetters;
