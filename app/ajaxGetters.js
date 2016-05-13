/**
 * Created by gavorhes on 5/12/2016.
 */

import $ from '../src/jquery';
import provide from '../src/util/provide';
const nm = provide('ssa');

const home = '/SSA';
const getStartCountiesUrl = home + '/getStartCounties';
const getHighwaysUrl = home + '/getHighways';
const getEndCountiesUrl = home + '/getEndCounties';
const getSegmentsUrl = home + '/getSegments';

/**
 * @callback ajaxCallback
 * @param {object|Array} d - returned data
 */

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
        $.get(url, params, newCallback, 'json');
    } else {
        $.get(url, params, callback, 'json');
    }
}

let countySort =  (d) => {
        d.sort((a, b) => {
            if (a['name'] == b['name']){
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
 * @param {string} highway
 * @param {ajaxCallback} callback
 */
export function getSegments(county, highway, callback){
    "use strict";
    let params = {"highway": highway, "county": county};
    ajaxHelper(getSegmentsUrl, callback, params);
}

nm.getSegments = getSegments;




