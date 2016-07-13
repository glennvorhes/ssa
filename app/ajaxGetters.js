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
 * @callback ajaxCallback
 * @param {object|Array} d - returned data
 */


/**
 *
 * @param {string} url
 * @param {object} [params={}]
 * @param {ajaxCallback} callback
 */
function ajaxInner(url, params, callback) {
    "use strict";
    $.get(url, params, callback, 'json').fail(() => {
        alert("error getting: " + url + JSON.stringify(params));
    });
}

/**
 *
 * @param {string} url
 * @param {ajaxCallback} callback
 * @param {object} [params={}]
 * @param {ajaxCallback} [calbackHelper=undefined]
 */
function ajaxHelper(url, callback, params, calbackHelper) {
    "use strict";
    params = params || {};

    if (typeof calbackHelper == 'function') {
        let newCallback = function (d) {
            d = calbackHelper(d);
            callback(d);
        };
        ajaxInner(url, params, newCallback);
    } else {
        ajaxInner(url, params, callback);
    }
}

let countySort = (d) => {
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
 *
 * @param {ajaxCallback} callback
 */
export function getStartCounties(callback) {
    "use strict";

    ajaxHelper(getStartCountiesUrl, callback, {}, countySort);
}
nm.getStartCounties = getStartCounties;

/**
 * Get the highways based on the start county
 * @param {number} startCountyId
 * @param {ajaxCallback} callback
 */
export function getHighways(startCountyId, callback) {
    "use strict";
    let params = {"startCountyId": startCountyId};

    ajaxHelper(getHighwaysUrl, callback, params);
}
nm.getHighways = getHighways;


/**
 * Get the highways based on the start county
 * @param {string} highwayName
 * @param {ajaxCallback} callback
 */
export function getEndCounties(highwayName, callback) {
    "use strict";
    let params = {"highwayName": highwayName};

    ajaxHelper(getEndCountiesUrl, callback, params, countySort);
}
nm.getEndCounties = getEndCounties;


/**
 *
 * @param {number} county
 * @param {number} routeId
 * @param {ajaxCallback} callback
 */
export function getSegments(county, routeId, callback) {
    "use strict";
    if (typeof routeId == 'string'){
        routeId = parseInt(routeId);
    }

    let params = {"routeid": routeId, "county": county};
    ajaxHelper(getSegmentsUrl, callback, params);
}

nm.getSegments = getSegments;

/**
 *
 * @param {number} startPdp
 * @param {number} endPdp
 * @param {ajaxCallback} callback
 */
export function getCorridor(startPdp, endPdp, callback) {
    "use strict";
    let params = {"from": startPdp, "to": endPdp};

    ajaxHelper(getCorridorUrl, callback, params);
}

nm.getCorridor = getCorridor;

/**
 *
 * @param {ajaxCallback} callback
 */
export function getCrashes(callback) {
    "use strict";
    let params = {};

    ajaxHelper(getCrashesUrl, callback, params);
}

/**
 *
 * @param {ajaxCallback} callback
 */
export function getAllCounties(callback) {
    "use strict";
    let params = {};

    ajaxHelper(getAllCountiesUrl, callback, params);
}


/**
 *
 * @param {number} startCountyId
 * @param {number} endCountyId
 * @param {ajaxCallback} callback
 */
export function getHwyByStartEndCounty(startCountyId, endCountyId, callback) {
    "use strict";

    let params = {
        'startCountyId': startCountyId,
        'endCountyId': endCountyId
    };

    ajaxHelper(getAllHighwaysForStartEndCountyUrl, callback, params);
}
