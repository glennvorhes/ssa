/**
 * Created by gavorhes on 7/13/2016.
 */
"use strict";
// uncomment this to use the example crash data
// import exampleCrashData from './_exampleCrashData';
var exampleCrashData = undefined;
var AjaxGetters_1 = require('../AjaxGetters');
var objHelp = require('webmapsjs/dist/util/objectHelpers');
var LayerBaseVectorGeoJson_1 = require('webmapsjs/dist/layers/LayerBaseVectorGeoJson');
var filterCrash_1 = require('../filters/filterCrash');
var colorUtil = require('webmapsjs/dist/util/colors');
var proj = require('webmapsjs/dist/olHelpers/projections');
var mapPopup_1 = require('webmapsjs/dist/olHelpers/mapPopup');
var custom_ol_1 = require('custom-ol');
var $ = require('jquery');
/**
 *
 * @param {string} inDate - input date to format
 * @returns {string} formatted date
 */
function _dteStrip(inDate) {
    "use strict";
    var parts = inDate.split('/');
    var m = parts[0];
    var d = parts[1];
    var y = parts[2];
    if (m[0] == '0') {
        m = m.slice(1);
    }
    if (d[0] == '0') {
        d = d.slice(1);
    }
    y = y.slice(2);
    return [m, d, y].join('/');
}
function _timeStrip(tm) {
    "use strict";
    tm = tm.replace(/:\d{2} /, '');
    if (tm[0] == '0') {
        tm = tm.slice(1);
    }
    return tm;
}
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
/**
 *
 * @param {Array<CrashDataObject>} crashData - array of crash data
 * @returns {string} crash summary table html
 * @private
 */
function _crashInfoHelper(crashData) {
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
        returnHtml += _dteStrip(c.dte);
        if (c.time) {
            returnHtml += ', ' + _timeStrip(c.time);
        }
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
/**
 *
 * @param  feature - the input feature
 * @returns return style or null
 */
var crashPointStyle = function (feature) {
    "use strict";
    var props = feature.getProperties();
    var crashColor = filterCrash_1.default.getCrashColor(props['injSvr']);
    if (!crashColor) {
        return null;
    }
    var crashColorFill = colorUtil.rgbToRgba(crashColor, 0.6);
    return [new custom_ol_1.default.style.Style({
            image: new custom_ol_1.default.style.Circle({
                radius: 6,
                fill: new custom_ol_1.default.style.Fill({
                    color: crashColorFill
                }),
                stroke: new custom_ol_1.default.style.Stroke({ color: crashColor, width: 2 })
            })
        })];
};
var CrashData = (function () {
    function CrashData() {
        this._crashHtmlLookup = {};
        this._crashArrayLookup = {};
        this.pointCrashes = new LayerBaseVectorGeoJson_1.default('', {
            name: "Crash Points",
            zIndex: 204,
            minZoom: 10
        });
        this.pointCrashes.style = crashPointStyle;
    }
    /**
     *
     * @param {ol.Map} m - the main map
     */
    CrashData.prototype.init = function (m) {
        var _this = this;
        mapPopup_1.default.addVectorPopup(this.pointCrashes, function (props) {
            var returnHtml = '<table class="crash-popup-table">';
            returnHtml += "<tr><td>Date</td><td>" + (props['dte'] + ' ' + props['time']) + "</td></tr>";
            returnHtml += "<tr><td>Cuml. Ml.</td><td>" + props['cumulMile'] + "</td></tr>";
            returnHtml += "<tr><td>Severity</td><td>" + props['injSvr'] + "</td></tr>";
            returnHtml += "<tr><td>Lat</td><td>" + props['lat'] + "</td></tr>";
            returnHtml += "<tr><td>Lon</td><td>" + props['lon'] + "</td></tr>";
            returnHtml += '</table>';
            return returnHtml;
        });
        filterCrash_1.default.addChangeCallback(function () {
            _this.pointCrashes.refresh();
        });
        AjaxGetters_1.default.getCrashes(function (d) {
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
            var crashes = itm.value;
            this._crashHtmlLookup[itm.key] = _crashInfoHelper(crashes);
            this._crashArrayLookup[itm.key] = crashes;
            for (var _b = 0, crashes_1 = crashes; _b < crashes_1.length; _b++) {
                var c = crashes_1[_b];
                if (!(c.lon && c.lat)) {
                    continue;
                }
                var geom = new custom_ol_1.default.geom.Point([c.lon, c.lat]);
                geom.transform(proj.proj4326, proj.proj3857);
                var p = new custom_ol_1.default.Feature(geom);
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
        var summ = this._crashHtmlLookup[pdp];
        return summ || '';
    };
    return CrashData;
}());
exports.CrashData = CrashData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new CrashData();
//# sourceMappingURL=crashData.js.map