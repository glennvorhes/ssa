(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStartCounties = getStartCounties;
exports.getHighways = getHighways;
exports.getEndCounties = getEndCounties;
exports.getSegments = getSegments;
exports.getCorridor = getCorridor;
exports.getCrashes = getCrashes;

var _jquery = require('../src/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _provide = require('../src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by gavorhes on 5/12/2016.
 */

var nm = (0, _provide2.default)('ssa');

var home = '/SSA';
var getStartCountiesUrl = home + '/getStartCounties';
var getHighwaysUrl = home + '/getHighways';
var getEndCountiesUrl = home + '/getEndCounties';
var getSegmentsUrl = home + '/getSegments';
var getCorridorUrl = home + '/getCorridor';
var getCrashesUrl = home + '/getCrashes';

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

    _jquery2.default.get(url, params, callback, 'json').fail(function () {
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
        var newCallback = function newCallback(d) {
            d = calbackHelper(d);
            callback(d);
        };
        ajaxInner(url, params, newCallback);
    } else {
        ajaxInner(url, params, callback);
    }
}

var countySort = function countySort(d) {
    d.sort(function (a, b) {
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
function getStartCounties(callback) {
    "use strict";

    ajaxHelper(getStartCountiesUrl, callback, {}, countySort);
}
nm.getStartCounties = getStartCounties;

/**
 * Get the highways based on the start county
 * @param {number} startCountyId
 * @param {ajaxCallback} callback
 */
function getHighways(startCountyId, callback) {
    "use strict";

    var params = { "startCountyId": startCountyId };

    ajaxHelper(getHighwaysUrl, callback, params);
}
nm.getHighways = getHighways;

/**
 * Get the highways based on the start county
 * @param {string} highwayName
 * @param {ajaxCallback} callback
 */
function getEndCounties(highwayName, callback) {
    "use strict";

    var params = { "highwayName": highwayName };

    ajaxHelper(getEndCountiesUrl, callback, params, countySort);
}
nm.getEndCounties = getEndCounties;

/**
 *
 * @param {number} county
 * @param {string} highway
 * @param {ajaxCallback} callback
 */
function getSegments(county, highway, callback) {
    "use strict";

    var params = { "highway": highway, "county": county };
    ajaxHelper(getSegmentsUrl, callback, params);
}

nm.getSegments = getSegments;

/**
 *
 * @param {number} startPdp
 * @param {number} endPdp
 * @param {ajaxCallback} callback
 */
function getCorridor(startPdp, endPdp, callback) {
    "use strict";

    var params = { "from": startPdp, "to": endPdp };

    ajaxHelper(getCorridorUrl, callback, params);
}

nm.getCorridor = getCorridor;

/**
 *
 * @param {ajaxCallback} callback
 */
function getCrashes(callback) {
    "use strict";

    var params = {};

    ajaxHelper(getCrashesUrl, callback, params);
}

},{"../src/jquery":15,"../src/util/provide":35}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 5/16/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _SelectStartCounty = require('../selectBox/SelectStartCounty');

var _SelectStartCounty2 = _interopRequireDefault(_SelectStartCounty);

var _SelectHighway = require('../selectBox/SelectHighway');

var _SelectHighway2 = _interopRequireDefault(_SelectHighway);

var _SelectEndCounty = require('../selectBox/SelectEndCounty');

var _SelectEndCounty2 = _interopRequireDefault(_SelectEndCounty);

var _SegmentPickerFrom = require('../segmentPicker/SegmentPickerFrom');

var _SegmentPickerFrom2 = _interopRequireDefault(_SegmentPickerFrom);

var _SegmentPickerTo = require('../segmentPicker/SegmentPickerTo');

var _SegmentPickerTo2 = _interopRequireDefault(_SegmentPickerTo);

var _Corridor = require('../corridor/Corridor');

var _Corridor2 = _interopRequireDefault(_Corridor);

var _provide = require('../../src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _jquery = require('../../src/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('ssa');

var PickerCollection = function () {

    /**
     *
     * @param {string} divId
     * @param {SsaMapCreate} ssaMapCreate
     */

    function PickerCollection(divId, ssaMapCreate) {
        var _this = this;

        _classCallCheck(this, PickerCollection);

        this._ssaMapCreate = ssaMapCreate;
        this.$containerEl = (0, _jquery2.default)('#' + divId).addClass('picker-collection-container');
        this.$containerEl.append('<div class="picker-collection"></div>');
        this.$containerEl.append('<input type="button" value="Preview" class="btn btn-default picker-preview">');
        this.$containerEl.append('<input type="button" value="Add" class="btn btn-default picker-add" disabled="disabled">');
        this.$containerEl.append('<input type="button" value="Modify" class="btn btn-default picker-modify" disabled="disabled" style="display: none;">');
        this.$containerEl.append('<input type="button" value="Cancel" class="btn btn-default picker-cancel">');
        this.$innerContainer = this.$containerEl.find('.picker-collection');
        this._visible = false;

        /**
         *
         * @type {Corridor|undefined}
         * @private
         */
        this._modifyCorridor = undefined;

        /**
         *
         * @type {Corridor|undefined}
         * @private
         */
        this._modifyCorridorOriginal = undefined;

        /**
         *
         * @type {Corridor|undefined}
         */
        this.previewCorridorObject = undefined;

        this.$btnPickerPreview = this.$containerEl.find('.picker-preview');
        this.$btnPickerAdd = this.$containerEl.find('.picker-add');
        this.$btnPickerModify = this.$containerEl.find('.picker-modify');
        this.$btnPickerCancel = this.$containerEl.find('.picker-cancel');

        this.countyStartSelect = new _SelectStartCounty2.default(this.$innerContainer);
        this.highwaySelect = new _SelectHighway2.default(this.$innerContainer);
        this.countyEndSelect = new _SelectEndCounty2.default(this.$innerContainer);
        this.segmentPickerFrom = new _SegmentPickerFrom2.default(this.$innerContainer);
        this.segmentPickerTo = new _SegmentPickerTo2.default(this.$innerContainer);

        this.segmentPickerFrom.otherPicker = this.segmentPickerTo;
        this.segmentPickerTo.otherPicker = this.segmentPickerFrom;

        this.$btnPickerCancel.click(function () {
            _this.cancel();
        });

        this.$btnPickerPreview.click(function () {
            _this.saveCorridor();
        });

        this.$btnPickerAdd.click(function () {
            _this.addCorridor();
        });

        this.$btnPickerModify.click(function () {
            _this.modifyCorridor();
        });

        this.countyStartSelect.addChangeListener(function (v) {
            "use strict";
            // this.highwaySelect.box.html('');
            // this.countyEndSelect.box.html('');

            _this.segmentPickerFrom.clear();
            _this.segmentPickerTo.clear();
            _this.highwaySelect.setStartCounty(parseInt(v));
        });

        this.highwaySelect.addChangeListener(function (v) {
            "use strict";
            // this.countyEndSelect.box.html('');

            _this.countyEndSelect.setHighway(v);
        });

        this.countyEndSelect.addChangeListener(function (v) {
            "use strict";

            var hwy = _this.highwaySelect.selectedValue;
            _this.segmentPickerFrom.setCountyAndHighway(_this.countyStartSelect.selectedValue, hwy);
            _this.segmentPickerTo.setCountyAndHighway(v, hwy);
            _this.$btnPickerAdd.prop('disabled', true);
        });

        (0, _jquery2.default)(document).click(function (event) {
            var containerClass = 'select-picker-map-container';
            var evtTarget = (0, _jquery2.default)(event.target);

            if (evtTarget.parents('.' + containerClass).length == 0 && !evtTarget.hasClass(containerClass)) {
                _this.segmentPickerFrom.visible = false;
                _this.segmentPickerTo.visible = false;
            }
        });
    }

    _createClass(PickerCollection, [{
        key: 'cancel',
        value: function cancel() {
            this.$btnPickerAdd.show();
            this.$btnPickerModify.hide();
            this.$btnPickerModify.prop('disabled', true);
            this.visible = false;
            this._ssaMapCreate.$createCorridorButton.prop('disabled', false);

            if (this.previewCorridorObject) {
                this._ssaMapCreate.mainMap.removeLayer(this.previewCorridorObject.olLayer);
                this.previewCorridorObject = undefined;
            }

            if (this._modifyCorridor) {
                this._ssaMapCreate.mainMap.removeLayer(this._modifyCorridor.layer.olLayer);
                this._modifyCorridor = undefined;
            }

            this.countyStartSelect.box.val(1).trigger('change');
            this._ssaMapCreate.corridorCollection.visible = true;
        }
    }, {
        key: 'previewCorridor',
        value: function previewCorridor() {
            var _this2 = this;

            if (!this.segmentPickerFrom.selectedPdpId || !this.segmentPickerTo.selectedPdpId) {
                alert('Select From and To Reference Points');
            }

            var cor = new _Corridor2.default(this.segmentPickerFrom.selectedPdpId, this.segmentPickerTo.selectedPdpId, this.segmentPickerFrom.selectedText, this.segmentPickerTo.selectedText, this.countyStartSelect.selectedValue, this.countyEndSelect.selectedValue, this.highwaySelect.selectedText, {
                loadedCallback: function loadedCallback(c) {
                    if (c.valid) {
                        if (_this2._modifyCorridor) {
                            _this2._modifyCorridor.updateCorridor(c);
                        } else {
                            _this2.previewCorridorObject = c;
                            _this2._ssaMapCreate.mainMap.addLayer(c.olLayer);
                        }

                        _this2._ssaMapCreate.mainMap.getView().fit(c.extent, _this2._ssaMapCreate.mainMap.getSize());
                        _this2.$btnPickerAdd.prop('disabled', false);
                        _this2.$btnPickerModify.prop('disabled', false);
                    } else {
                        _this2.previewCorridorObject = undefined;
                        alert(c.error);
                    }
                }
            });
        }
    }, {
        key: 'addCorridor',
        value: function addCorridor() {

            this._ssaMapCreate.corridorCollection.addCorridorCreate(this.previewCorridorObject);
            this.cancel();
        }
    }, {
        key: 'modifyCorridor',
        value: function modifyCorridor() {
            this._ssaMapCreate.corridorCollection.updateCorridor(this._modifyCorridorOriginal.clientId, this._modifyCorridor);
            this.cancel();
        }

        /**
         *
         * @param {Corridor} cor
         */

    }, {
        key: 'startEditCorridor',
        value: function startEditCorridor(cor) {

            this._ssaMapCreate.corridorCollection.visible = false;
            this.visible = true;
            this.$btnPickerAdd.hide();
            this.$btnPickerModify.show();
            this.countyStartSelect.box.val(cor.countyStart.toFixed());
            this.highwaySelect.setStartCounty(cor.countyStart, cor.highway);
            this.countyEndSelect.setHighway(cor.highway, cor.countyEnd);
            this.segmentPickerFrom.setCountyAndHighway(cor.countyStart, cor.highway, cor.pdpFrom);
            this.segmentPickerTo.setCountyAndHighway(cor.countyEnd, cor.highway, cor.pdpTo);

            this._modifyCorridorOriginal = cor;

            this._modifyCorridor = new _Corridor2.default(cor.pdpFrom, cor.pdpTo, cor.rpFrom, cor.rpTo, cor.countyStart, cor.countyEnd, cor.highway, { color: cor.color, features: cor.features });

            this._ssaMapCreate.mainMap.addLayer(this._modifyCorridor.layer.olLayer);
            this._ssaMapCreate.mainMap.getView().fit(cor.extent, this._ssaMapCreate.mainMap.getSize());
        }
    }, {
        key: 'visible',
        get: function get() {
            return this._visible;
        },
        set: function set(viz) {
            this._visible = viz;

            if (this.visible) {
                this.$containerEl.show();
            } else {
                this.$containerEl.hide();
            }
        }
    }]);

    return PickerCollection;
}();

nm.PickerCollection = PickerCollection;
exports.default = PickerCollection;

},{"../../src/jquery":15,"../../src/util/provide":35,"../corridor/Corridor":3,"../segmentPicker/SegmentPickerFrom":6,"../segmentPicker/SegmentPickerTo":7,"../selectBox/SelectEndCounty":9,"../selectBox/SelectHighway":10,"../selectBox/SelectStartCounty":11}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 5/11/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _LayerBaseVectorGeoJson = require('../../src/layers/LayerBaseVectorGeoJson');

var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

var _ol = require('../../src/ol/ol');

var _ol2 = _interopRequireDefault(_ol);

var _makeGuid = require('../../src/util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

var _provide = require('../../src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _layerStyles = require('../layerStyles');

var _ajaxGetters = require('../ajaxGetters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('ssa');

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

var Corridor = function () {

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
     */

    function Corridor(pdpFrom, pdpTo, rpFrom, rpTo, countyStart, countyEnd, highway, options) {
        var _this = this;

        _classCallCheck(this, Corridor);

        options = options || {};
        options.features = options.features && options.constructor.name == 'Array' ? options.features : undefined;
        options.loadedCallback = typeof options.loadedCallback == 'function' ? options.loadedCallback : function (c) {};

        this.clientId = (0, _makeGuid2.default)();
        if (options.color) {
            this._color = options.color;
        } else {
            this._color = (0, _layerStyles.randomColor)();
        }

        this.databaseId = options.databaseId || undefined;

        this._valid = false;
        this._error = '';

        this.pdpFrom = pdpFrom;
        this.pdpTo = pdpTo;
        this.countyStart = countyStart;
        this.countyEnd = countyEnd;
        this.highway = highway;
        this.rpFrom = rpFrom;
        this.rpTo = rpTo;

        this._corridorLayer = new _LayerBaseVectorGeoJson2.default('', (0, _layerStyles.layerConfigHelper)(this.rpFrom + ' - ' + this.rpTo, this._color, true));

        if (options.features) {
            this._corridorLayer.source.addFeatures(options.features);
            options.loadedCallback(this);
        } else {
            (0, _ajaxGetters.getCorridor)(pdpFrom, pdpTo, function (d) {
                _this._corridorLayer.addFeatures(d);

                if (typeof d['error'] == 'undefined') {
                    _this._valid = true;
                } else {
                    _this._error = d['error'];
                }
                options.loadedCallback(_this);
            });
        }
    }

    /**
     *
     * @param {Corridor} corridor
     */


    _createClass(Corridor, [{
        key: 'updateCorridor',
        value: function updateCorridor(corridor) {

            this.pdpFrom = corridor.pdpFrom;
            this.pdpTo = corridor.pdpTo;
            this.countyStart = corridor.countyStart;
            this.countyEnd = corridor.countyEnd;
            this.highway = corridor.highway;
            this.rpFrom = corridor.rpFrom;
            this.rpTo = corridor.rpTo;

            this.layer.name = this.rpFrom + '-' + this.rpTo;

            this.layer.clear();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = corridor.features[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var f = _step.value;

                    this.layer.source.addFeature(f.clone());
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'getTableHtml',
        value: function getTableHtml() {
            var outString = '<tr id="' + this.clientId + '" class="corridor-tr" style="background-color: ' + this._color + '">';
            outString += '<td>' + this.countyStart + '</td>';
            outString += '<td>' + this.countyEnd + '</td>';
            outString += '<td>' + this.highway + '</td>';
            outString += '<td>' + this.rpFrom + '</td>';
            outString += '<td>' + this.rpTo + '</td>';
            outString += '</tr>';

            return outString;
        }
    }, {
        key: 'getDataHtml',
        value: function getDataHtml(i) {
            var outString = '<div class="corridor-data">';
            // outString += `<input type="hidden" class="corridor-data-database-id" name="corridors[${i}].corridorId" value="${this.databaseId}"/>`;
            outString += '<input type="hidden" class="corridor-data-start-county" name="corridors[' + i + '].startCounty" value="' + this.countyStart + '"/>';
            outString += '<input type="hidden" class="corridor-data-end-county" name="corridors[' + i + '].endCounty" value="' + this.countyEnd + '"/>';
            outString += '<input type="hidden" class="corridor-data-highway" name="corridors[' + i + '].highway" value="' + this.highway + '"/>';
            outString += '<input type="hidden" class="corridor-data-from-rp" name="corridors[' + i + '].startRp" value="' + this.rpFrom + '"/>';
            outString += '<input type="hidden" class="corridor-data-to-rp" name="corridors[' + i + '].endRp" value="' + this.rpTo + '"/>';
            outString += '<input type="hidden" class="corridor-data-from-pdp" name="corridors[' + i + '].startPdp" value="' + this.pdpFrom + '"/>';
            outString += '<input type="hidden" class="corridor-data-to-pdp" name="corridors[' + i + '].endPdp" value="' + this.pdpTo + '"/>';
            outString += '</div>';

            return outString;
        }
    }, {
        key: 'getDataHtmlDisp',
        value: function getDataHtmlDisp(i) {
            var returnString = this.getDataHtml(i);
            returnString = escapeHtml(returnString);
            returnString = returnString.replace(/&quot;&#x2F;&gt;/g, '&quot;&#x2F;&gt;<br>');
            returnString = returnString.replace(/corridor-data&quot;&gt;/g, 'corridor-data&quot;&gt;<br>');

            return returnString + '<br>';
        }

        /**
         *
         * @returns {ol.layer.Vector|*}
         */

    }, {
        key: 'color',
        get: function get() {
            return this._color;
        }

        /**
         *
         * @returns {boolean}
         */

    }, {
        key: 'valid',
        get: function get() {
            return this._valid;
        }

        /**
         *
         * @returns {string|*}
         */

    }, {
        key: 'error',
        get: function get() {
            return this._error;
        }

        /**
         *
         * @returns {string}
         */

    }, {
        key: 'tableHtmlCreate',
        get: function get() {
            var outString = '<tr class="corridor-tr">';
            outString += '<td style="background-color: ' + this._color + '"></td>';
            outString += '<td>' + this.rpFrom + ' - ' + this.rpTo + '</td>';
            outString += '<td>';
            outString += '<span title="Zoom To" class="corridor-zoom" data-corridor="' + this.clientId + '"></span>';
            outString += '<span title="Edit Corridor"  class="corridor-edit" data-corridor="' + this.clientId + '"></span>';
            outString += '<span title="Remove Corridor"  class="corridor-delete" data-corridor="' + this.clientId + '"></span>';
            outString += '</td>';
            outString += '</tr>';

            return outString;
        }
    }, {
        key: 'olLayer',
        get: function get() {
            return this._corridorLayer.olLayer;
        }

        /**
         *
         * @returns {LayerBaseVectorGeoJson}
         */

    }, {
        key: 'layer',
        get: function get() {
            return this._corridorLayer;
        }

        /**
         *
         * @returns {boolean} if corridor layer is visible
         */

    }, {
        key: 'visible',
        get: function get() {
            return this._corridorLayer.visible;
        }

        /**
         *
         * @param {boolean} vis if corridor layer is visible
         */
        ,
        set: function set(vis) {
            this._corridorLayer.visible = vis;
        }

        /**
         *
         * @returns {Array.<ol.Feature>} an array of ol features
         */

    }, {
        key: 'features',
        get: function get() {
            return this._corridorLayer.features;
        }

        /**
         *
         * @returns {ol.Extent|undefined}
         */

    }, {
        key: 'extent',
        get: function get() {
            if (this._corridorLayer.source.getFeatures().length > 0) {
                return this._corridorLayer.source.getExtent();
            } else {
                return undefined;
            }
        }
    }]);

    return Corridor;
}();

nm.Corridor = Corridor;

exports.default = Corridor;

},{"../../src/layers/LayerBaseVectorGeoJson":18,"../../src/ol/ol":32,"../../src/util/makeGuid":34,"../../src/util/provide":35,"../ajaxGetters":1,"../layerStyles":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mmPopupContent = exports.segmentSelectionOther = exports.toColor = exports.segmentSelection = exports.fromColor = exports.segmentLayer = undefined;
exports.randomColor = randomColor;
exports.layerConfigHelper = layerConfigHelper;

var _ol = require('../src/ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var segmentLayer = exports.segmentLayer = new _ol2.default.style.Style({
    stroke: new _ol2.default.style.Stroke({ color: 'blue', width: 4 })
}); /**
     * Created by gavorhes on 5/13/2016.
     */


var fromColor = exports.fromColor = 'yellow';

var segmentSelection = exports.segmentSelection = new _ol2.default.style.Style({
    stroke: new _ol2.default.style.Stroke({ color: fromColor, width: 7 })
});

var toColor = exports.toColor = 'orange';

var segmentSelectionOther = exports.segmentSelectionOther = new _ol2.default.style.Style({
    stroke: new _ol2.default.style.Stroke({ color: toColor, width: 7 })
});

/**
 *
 * @type {Array<string>}
 */
var returnedColors = [];
var colorOptions = ['#FF00FF', '#7FFF00', '#FA8072', '#FF6347', '#40E0D0', '#ADFF2F', '#6495ED', '#FF8C00', '#7FFFD4', '#DA70D6'];

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
        var c = colorOptions[Math.floor(parseInt(Math.random() * colorOptions.length))];
        if (returnedColors.indexOf(c) < 0) {
            returnedColors.push(c);

            return c;
        }
    }
}

function layerConfigHelper(name, color, visible) {
    "use strict";

    return {
        minZoom: 4,
        name: name,
        transform: { dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857' },
        style: new _ol2.default.style.Style({
            stroke: new _ol2.default.style.Stroke({
                color: color,
                width: 5
            })
        }),
        visible: visible
    };
}

var mmPopupContent = exports.mmPopupContent = function mmPopupContent(props) {
    var returnHtml = '<table class="mm-popup-table">';
    returnHtml += '<tr><td>PdpId</td><td>' + props['pdpId'] + '</td></tr>';
    returnHtml += '<tr><td>Hwy</td><td>' + props['hwyDir'] + '</td></tr>';
    returnHtml += '<tr><td>DivUnd</td><td>' + props['divUnd'] + '</td></tr>';
    returnHtml += '<tr><td>From</td><td>' + props['pdpFrom'] + '</td></tr>';
    returnHtml += '<tr><td>To</td><td>' + props['pdpTo'] + '</td></tr>';
    returnHtml += '</table>';
    return returnHtml;
};

},{"../src/ol/ol":32}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provide = require('../../src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _quickMapMulti = require('../../src/olHelpers/quickMapMulti');

var _quickMapMulti2 = _interopRequireDefault(_quickMapMulti);

var _SortedFeatures = require('../../src/olHelpers/SortedFeatures');

var _SortedFeatures2 = _interopRequireDefault(_SortedFeatures);

var _LayerBaseVectorGeoJson = require('../../src/layers/LayerBaseVectorGeoJson');

var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

var _LayerEsriMapServer = require('../../src/layers/LayerEsriMapServer');

var _LayerEsriMapServer2 = _interopRequireDefault(_LayerEsriMapServer);

var _SelectBoxBase2 = require('../selectBox/SelectBoxBase');

var _SelectBoxBase3 = _interopRequireDefault(_SelectBoxBase2);

var _ol = require('../../src/ol/ol');

var _ol2 = _interopRequireDefault(_ol);

var _ajaxGetters = require('../ajaxGetters');

var _jquery = require('../../src/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _layerStyles = require('../layerStyles');

var layerStyles = _interopRequireWildcard(_layerStyles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 5/13/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('ssa.select');

var SegmentPickerBase = function (_SelectBoxBase) {
    _inherits(SegmentPickerBase, _SelectBoxBase);

    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     */

    function SegmentPickerBase(parent, labelContent) {
        _classCallCheck(this, SegmentPickerBase);

        var mapId = undefined;

        function contentGen(guid) {
            mapId = guid + '-map';
            var outString = '';
            outString += '<div style="position: relative;" class="select-picker-map-container">';
            outString += '  <select id="' + guid + '"></select>';
            outString += '  <div class="seg-popup-container">';
            outString += '    <div>';
            outString += '      <span class="selected-segment-info"></span>';
            outString += '      <span title="Close" class="container-head-close">X</span>';
            outString += '    </div>';
            outString += '    <div id="' + mapId + '" class="rp-picker-map"></div>';
            outString += '  </div>';
            outString += '</div>';
            return outString;
        }

        /**
         *
         * @type {number|undefined}
         * @private
         */

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentPickerBase).call(this, parent, labelContent, contentGen));

        _this2._selectedPdpId = undefined;

        _this2._visible = false;
        _this2._mapDivId = mapId;
        _this2._$mapContainer = _this2._$container.find('.seg-popup-container');

        _this2._$container.find('.seg-popup-container').click(function (evt) {
            evt.stopPropagation();
        });

        _this2._$container.find('.container-head-close').click(function (evt) {
            _this2.visible = false;
        });

        _this2._$segmentInfo = _this2._$container.find('.selected-segment-info');

        _this2._$container.find('.select-picker-map-container').click(function () {
            _this2.visible = true;
        });

        _this2.addChangeListener(function (v) {
            _this2.selectedPdpId = parseInt(v);
        });

        _this2.box.keyup(function () {
            if (_this2.selectedPdpId != parseInt(_this2.selectedValue)) {
                _this2.box.trigger('change');
            }
        });

        /**
         *
         * @type {SortedFeatures|undefined}
         * @private
         */
        _this2._sortedFeatures = undefined;

        /**
         *
         * @type {SegmentPickerBase|undefined}
         * @public
         */
        _this2.otherPicker = undefined;

        /**
         *
         * @type {Map}
         * @private
         */
        _this2._pickerMap = undefined;

        /**
         * @type MapMoveCls
         * @private
         */
        _this2._pickerMapMove = undefined;

        /**
         * @type MapPopupCls
         * @private
         */
        _this2._pickerMapPopup = undefined;

        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @protected
         */
        _this2._segmentLayer = new _LayerBaseVectorGeoJson2.default('', {
            minZoom: 7,
            mapMoveObj: _this2._pickerMapMove,
            name: 'MM Segments',
            transform: { dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857' },
            style: layerStyles.segmentLayer
        });

        _this2._segmentSelectionLayer = new _ol2.default.layer.Vector({
            source: new _ol2.default.source.Vector(),
            style: layerStyles.segmentSelection
        });

        _this2.otherSelectedSegmentLayer = new _ol2.default.layer.Vector({
            source: new _ol2.default.source.Vector(),
            style: layerStyles.segmentSelectionOther
        });

        _this2._enabled = false;
        return _this2;
    }

    /**
     *
     * @private
     */


    _createClass(SegmentPickerBase, [{
        key: '_mapInit',
        value: function _mapInit() {
            var _this3 = this;

            var multiMap = (0, _quickMapMulti2.default)({
                divId: this._mapDivId,
                minZoom: 6,
                zoom: 6,
                baseSwitcher: false
            });

            this._pickerMap = multiMap.map;
            this._pickerMapMove = multiMap.mapMove;
            this._pickerMapPopup = multiMap.mapPopup;

            var metamanagerSegments = new _LayerEsriMapServer2.default('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer', {
                minZoom: 7,
                visible: true,
                name: 'Metamanager Segments',
                opacity: 0.6
            });

            // add the layers to the map
            this._pickerMap.addLayer(metamanagerSegments.olLayer);
            this._pickerMap.addLayer(this._segmentLayer.olLayer);
            this._pickerMap.addLayer(this._segmentSelectionLayer);
            this._pickerMap.addLayer(this.otherSelectedSegmentLayer);

            this._setExtent();

            // configure the popup response function
            this._pickerMapPopup.addVectorPopup(this._segmentLayer, function (props) {
                var returnHtml = '<table class="mm-popup-table">';
                returnHtml += '<tr><td>PdpId</td><td>' + props['pdpId'] + '</td>;';
                returnHtml += '<td rowspan="5">';
                returnHtml += '<input type="button" id=\'' + props['pdpId'] + '\' class="select-seg-btn" value="Select"/>';
                returnHtml += '</td></tr>';
                returnHtml += '<tr><td>Hwy</td><td>' + props['hwyDir'] + '</td></tr>';
                returnHtml += '<tr><td>DivUnd</td><td>' + props['divUnd'] + '</td></tr>';
                returnHtml += '<tr><td>From</td><td>' + props['pdpFrom'] + '</td></tr>';
                returnHtml += '<tr><td>To</td><td>' + props['pdpTo'] + '</td></tr>';
                returnHtml += '</table>';
                return returnHtml;
            });

            // add the popup change function to find the select button
            this._pickerMapPopup.addPopupChangedFunction(function () {
                var selectButton = (0, _jquery2.default)('.select-seg-btn');
                if (selectButton.length > 0) {
                    (function () {
                        var _this = _this3;
                        selectButton.click(function () {
                            _this.selectedPdpId = this['id'];
                        });
                    })();
                }
            });
        }

        /**
         * @abstract
         * @param {Array<object>} arr
         */

    }, {
        key: 'processAjaxResult',
        value: function processAjaxResult(arr) {}

        /**
         *
         * @param {string|number} county
         * @param {string} hwy
         * @param {number|undefined} [pdpId=undefined]
         */

    }, {
        key: 'setCountyAndHighway',
        value: function setCountyAndHighway(county, hwy, pdpId) {
            var _this4 = this;

            pdpId = typeof pdpId == 'number' ? pdpId : undefined;

            this.selectedPdpId = undefined;
            this.box.html('');
            this.box.addClass('refresh').removeClass('refresh');

            if (this._pickerMapPopup) {
                this._pickerMapPopup.closePopup();
            }

            if (typeof county == 'string') {
                county = parseInt(county);
            }

            (0, _ajaxGetters.getSegments)(county, hwy, function (d) {
                _this4._segmentLayer.clear();
                _this4.processAjaxResult(d['features']);
                if (d['features'].length > 0) {
                    _this4.enabled = true;
                    _this4._segmentLayer.addFeatures(d);
                    _this4._sortedFeatures = new _SortedFeatures2.default(_this4._segmentLayer.source.getFeatures(), 'pdpId');
                    _this4._setExtent();

                    if (typeof pdpId == 'number') {
                        // this.box.val(pdpId.toFixed());
                        _this4.selectedPdpId = pdpId;
                    } else {
                        _this4.box.trigger('change');
                    }
                } else {
                    _this4.enabled = false;
                }
            });
        }
    }, {
        key: '_setExtent',
        value: function _setExtent() {
            if (this._pickerMap && this._segmentLayer.source.getFeatures().length > 0) {
                this._pickerMap.getView().fit(this._segmentLayer.source.getExtent(), this._pickerMap.getSize());
            } else {
                // console.log('no features');
            }
        }

        /**
         * @returns {boolean}
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.box.html('');
            this.selectedPdpId = undefined;
            this.visible = false;
        }
    }, {
        key: 'enabled',
        get: function get() {
            return this._enabled;
        }

        /**
         *
         * @param {boolean} isEnabled
         * @private
         */
        ,
        set: function set(isEnabled) {
            this._enabled = isEnabled;
            this.box.prop('disabled', !isEnabled);
        }

        /**
         * get the picker visibility
         * @returns {boolean} is visible
         */

    }, {
        key: 'visible',
        get: function get() {
            return this._visible;
        }

        /**
         * set the picker visibility
         * @param {boolean} vis is visible
         */
        ,
        set: function set(vis) {
            if (this.visible === vis) {
                return;
            }

            if (vis && this.enabled) {
                this._$mapContainer.show();
                if (!this._pickerMap) {
                    this._mapInit();
                }
                if (this.otherPicker) {
                    this.otherPicker.visible = false;
                }
            } else {
                this._$mapContainer.hide();
                if (this._pickerMapPopup) {
                    this._pickerMapPopup.closePopup();
                }
            }
            this._visible = vis;
        }

        /**
         *
         * @returns {number|undefined} selected id
         */

    }, {
        key: 'selectedPdpId',
        get: function get() {
            return this._selectedPdpId;
        }

        /**
         *
         * @param {number|undefined} newId - new selected id
         */
        ,
        set: function set(newId) {
            if (this._pickerMapPopup) {
                this._pickerMapPopup.closePopup();
            }

            if (typeof newId == 'string') {
                newId = parseInt(newId);
            }

            if (newId == this._selectedPdpId) {
                return;
            }

            this._selectedPdpId = newId;

            this._segmentSelectionLayer.getSource().clear();
            this.otherPicker.otherSelectedSegmentLayer.getSource().clear();

            if (this._selectedPdpId == undefined) {
                this._$segmentInfo.html('');
            } else {
                this.box.val(this.selectedPdpId);
                var selectedFeature = this._sortedFeatures.getFeature(this.selectedPdpId);

                this._segmentSelectionLayer.getSource().addFeature(selectedFeature);
                this.otherPicker.otherSelectedSegmentLayer.getSource().addFeature(selectedFeature);

                var props = selectedFeature.getProperties();

                this._$segmentInfo.html('Seg ID: ' + props['pdpId'] + ', Ref. Point ' + props['pdpFrom'] + '-' + props['pdpTo']);
            }
        }
    }]);

    return SegmentPickerBase;
}(_SelectBoxBase3.default);

nm.SegmentPickerBase = SegmentPickerBase;
exports.default = SegmentPickerBase;

},{"../../src/jquery":15,"../../src/layers/LayerBaseVectorGeoJson":18,"../../src/layers/LayerEsriMapServer":19,"../../src/ol/ol":32,"../../src/olHelpers/SortedFeatures":20,"../../src/olHelpers/quickMapMulti":29,"../../src/util/provide":35,"../ajaxGetters":1,"../layerStyles":4,"../selectBox/SelectBoxBase":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SegmentPickerBase2 = require('./SegmentPickerBase');

var _SegmentPickerBase3 = _interopRequireDefault(_SegmentPickerBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 5/13/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SegmentPickerFrom = function (_SegmentPickerBase) {
    _inherits(SegmentPickerFrom, _SegmentPickerBase);

    function SegmentPickerFrom(parent) {
        _classCallCheck(this, SegmentPickerFrom);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentPickerFrom).call(this, parent, 'Ref. Point #1'));
    }

    _createClass(SegmentPickerFrom, [{
        key: 'processAjaxResult',
        value: function processAjaxResult(arr) {

            arr.sort(function (a, b) {
                var c = a['properties']['pdpFrom'];
                var d = b['properties']['pdpFrom'];

                if (c == d) {
                    return 0;
                }
                return c < d ? -1 : 1;
            });

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var feat = _step.value;

                    var props = feat['properties'];
                    this.box.append('<option value="' + props['pdpId'] + '">' + props['pdpFrom'] + '</option>');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return SegmentPickerFrom;
}(_SegmentPickerBase3.default);

exports.default = SegmentPickerFrom;

},{"./SegmentPickerBase":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SegmentPickerBase2 = require('./SegmentPickerBase');

var _SegmentPickerBase3 = _interopRequireDefault(_SegmentPickerBase2);

var _layerStyles = require('../layerStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 5/13/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SegmentPickerTo = function (_SegmentPickerBase) {
    _inherits(SegmentPickerTo, _SegmentPickerBase);

    function SegmentPickerTo(parent) {
        _classCallCheck(this, SegmentPickerTo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentPickerTo).call(this, parent, 'Ref. Point #2'));
    }

    _createClass(SegmentPickerTo, [{
        key: 'processAjaxResult',
        value: function processAjaxResult(arr) {

            arr.sort(function (a, b) {
                var c = a['properties']['pdpTo'];
                var d = b['properties']['pdpTo'];

                if (c == d) {
                    return 0;
                }
                return c < d ? -1 : 1;
            });

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var feat = _step.value;

                    var props = feat['properties'];
                    this.box.append('<option value="' + props['pdpId'] + '">' + props['pdpTo'] + '</option>');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return SegmentPickerTo;
}(_SegmentPickerBase3.default);

exports.default = SegmentPickerTo;

},{"../layerStyles":4,"./SegmentPickerBase":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 5/13/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/**
 * Created by gavorhes on 5/12/2016.
 */


var _makeGuid = require('../../src/util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

var _provide = require('../../src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('ssa.select');

var SelectBoxBase = function () {

    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     * @param {contentGenFunc} [contentGen=undefined] 
     */

    function SelectBoxBase(parent, labelContent, contentGen) {
        var _this = this;

        _classCallCheck(this, SelectBoxBase);

        var guidTop = (0, _makeGuid2.default)();
        var guid = (0, _makeGuid2.default)();

        var htmlString = '<div id="' + guidTop + '">';
        htmlString += '<label for="' + guid + '">' + labelContent + '</label>';

        if (contentGen) {
            htmlString += contentGen(guid);
        } else {
            htmlString += '<select id="' + guid + '"></select>';
        }
        htmlString += '</div>';

        parent.append(htmlString);

        this._$container = parent.find('#' + guidTop);

        this.$label = this._$container.find('label');

        /**
         *
         * @type {Array<changeListener>}
         * @private
         */
        this._changeListeners = [];

        /**
         * reference to the selector box
         * @protected
         * @type {jQuery}
         */
        this._box = parent.find('#' + guid);

        if (!this._box) {
            throw 'the select box was not found';
        }

        this._box.change(function () {
            _this.changed();
        });
    }

    /**
     * 
     * @returns {jQuery}
     */


    _createClass(SelectBoxBase, [{
        key: 'changed',
        value: function changed() {
            var v = this._box.val();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._changeListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var f = _step.value;

                    f(v);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         *
         * @param {changeListener} func
         */

    }, {
        key: 'addChangeListener',
        value: function addChangeListener(func) {
            this._changeListeners.push(func);
        }

        /**
         *
         * @returns {string|number}
         */

    }, {
        key: 'box',
        get: function get() {
            return this._box;
        }
    }, {
        key: 'selectedValue',
        get: function get() {
            var theVal = this.box.val();

            if (isNaN(theVal)) {
                return theVal;
            } else {
                if (theVal.indexOf('.') > -1) {
                    return parseFloat(theVal);
                } else {
                    return parseInt(theVal);
                }
            }
        }
    }, {
        key: 'selectedText',
        get: function get() {
            return this.box.find('option:selected').text();
        }
    }]);

    return SelectBoxBase;
}();

nm.SelectBoxBase = SelectBoxBase;

exports.default = SelectBoxBase;

},{"../../src/util/makeGuid":34,"../../src/util/provide":35}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SelectBoxBase2 = require('./SelectBoxBase');

var _SelectBoxBase3 = _interopRequireDefault(_SelectBoxBase2);

var _ajaxGetters = require('../ajaxGetters');

var _provide = require('../../src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 5/12/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('ssa.select');

var SelectEndCounty = function (_SelectBoxBase) {
    _inherits(SelectEndCounty, _SelectBoxBase);

    /**
     *
     * @param {jQuery} parent
     */

    function SelectEndCounty(parent) {
        _classCallCheck(this, SelectEndCounty);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectEndCounty).call(this, parent, "End County"));
    }

    /**
     * set the county
     * @param {string} hwy
     * @param {number|undefined} [endCounty=undefined}
     */


    _createClass(SelectEndCounty, [{
        key: 'setHighway',
        value: function setHighway(hwy, endCounty) {
            var _this2 = this;

            this.box.html('');
            this.box.addClass('refresh').removeClass('refresh');

            endCounty = typeof endCounty == 'number' ? endCounty : undefined;

            (0, _ajaxGetters.getEndCounties)(hwy, function (d) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = d[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var c = _step.value;

                        _this2.box.append('<option value="' + c['id'] + '">' + c['name'] + '</option>');
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (d) {
                    if (typeof endCounty == 'number') {
                        _this2.box.val(endCounty.toFixed());
                    } else {
                        _this2.box.trigger('change');
                    }
                }
            });
        }
    }]);

    return SelectEndCounty;
}(_SelectBoxBase3.default);

nm.SelectEndCounty = SelectEndCounty;
exports.default = SelectEndCounty;

},{"../../src/util/provide":35,"../ajaxGetters":1,"./SelectBoxBase":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SelectBoxBase2 = require('./SelectBoxBase');

var _SelectBoxBase3 = _interopRequireDefault(_SelectBoxBase2);

var _ajaxGetters = require('../ajaxGetters');

var _provide = require('../../src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 5/12/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('ssa.select');

var SelectHighway = function (_SelectBoxBase) {
    _inherits(SelectHighway, _SelectBoxBase);

    /**
     *
     * @param {jQuery} parent
     */

    function SelectHighway(parent) {
        _classCallCheck(this, SelectHighway);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectHighway).call(this, parent, "Highway"));
    }

    /**
     *
     * @param {number} countyId
     * @param {string|undefined} [hwy=undefined]
     */


    _createClass(SelectHighway, [{
        key: 'setStartCounty',
        value: function setStartCounty(countyId, hwy) {
            var _this2 = this;

            hwy = typeof hwy == 'string' ? hwy : undefined;
            this.box.html('');
            this.box.addClass('refresh').removeClass('refresh');

            (0, _ajaxGetters.getHighways)(countyId, function (d) {
                "use strict";

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = d[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var h = _step.value;

                        _this2.box.append('<option>' + h['name'] + '</option>');
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (d) {
                    if (hwy) {
                        _this2.box.val(hwy);
                    } else {
                        _this2.box.trigger('change');
                    }
                }
            });
        }
    }]);

    return SelectHighway;
}(_SelectBoxBase3.default);

nm.SelectHighway = SelectHighway;
exports.default = SelectHighway;

},{"../../src/util/provide":35,"../ajaxGetters":1,"./SelectBoxBase":8}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SelectBoxBase2 = require('./SelectBoxBase');

var _SelectBoxBase3 = _interopRequireDefault(_SelectBoxBase2);

var _ajaxGetters = require('../ajaxGetters');

var _provide = require('../../src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 5/12/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('ssa.select');

var SelectStartCounty = function (_SelectBoxBase) {
    _inherits(SelectStartCounty, _SelectBoxBase);

    /**
     *
     * @param {jQuery} parent
     */

    function SelectStartCounty(parent) {
        _classCallCheck(this, SelectStartCounty);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectStartCounty).call(this, parent, "Start County"));

        (0, _ajaxGetters.getStartCounties)(function (d) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = d[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var c = _step.value;

                    _this.box.append('<option value="' + c['id'] + '">' + c['name'] + '</option>');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            _this.box.trigger('change');
        });
        return _this;
    }

    return SelectStartCounty;
}(_SelectBoxBase3.default);

nm.SelectStartCounty = SelectStartCounty;
exports.default = SelectStartCounty;

},{"../../src/util/provide":35,"../ajaxGetters":1,"./SelectBoxBase":8}],12:[function(require,module,exports){
(function (process,global){
!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var c="function"==typeof require&&require;if(!u&&c)return c(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var a=n[o]={exports:{}};t[o][0].call(a.exports,function(n){var r=t[o][1][n];return s(r?r:n)},a,a.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(t,n,r){(function(n){"use strict";function define(t,n,e){t[n]||Object[r](t,n,{writable:!0,configurable:!0,value:e})}if(t(296),t(2),t(3),n._babelPolyfill)throw new Error("only one instance of babel-polyfill is allowed");n._babelPolyfill=!0;var r="defineProperty";define(String.prototype,"padLeft","".padStart),define(String.prototype,"padRight","".padEnd),"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(t){[][t]&&define(Array,t,Function.call.bind([][t]))})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2,296:296,3:3}],2:[function(t,n,r){n.exports=t(297)},{297:297}],3:[function(t,n,r){t(121),n.exports=t(24).RegExp.escape},{121:121,24:24}],4:[function(t,n,r){n.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},{}],5:[function(t,n,r){var e=t(19);n.exports=function(t,n){if("number"!=typeof t&&"Number"!=e(t))throw TypeError(n);return+t}},{19:19}],6:[function(t,n,r){var e=t(118)("unscopables"),i=Array.prototype;void 0==i[e]&&t(41)(i,e,{}),n.exports=function(t){i[e][t]=!0}},{118:118,41:41}],7:[function(t,n,r){n.exports=function(t,n,r,e){if(!(t instanceof n)||void 0!==e&&e in t)throw TypeError(r+": incorrect invocation!");return t}},{}],8:[function(t,n,r){var e=t(50);n.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},{50:50}],9:[function(t,n,r){"use strict";var e=t(110),i=t(106),o=t(109);n.exports=[].copyWithin||function copyWithin(t,n){var r=e(this),u=o(r.length),c=i(t,u),f=i(n,u),a=arguments.length>2?arguments[2]:void 0,s=Math.min((void 0===a?u:i(a,u))-f,u-c),l=1;for(c>f&&f+s>c&&(l=-1,f+=s-1,c+=s-1);s-- >0;)f in r?r[c]=r[f]:delete r[c],c+=l,f+=l;return r}},{106:106,109:109,110:110}],10:[function(t,n,r){"use strict";var e=t(110),i=t(106),o=t(109);n.exports=function fill(t){for(var n=e(this),r=o(n.length),u=arguments.length,c=i(u>1?arguments[1]:void 0,r),f=u>2?arguments[2]:void 0,a=void 0===f?r:i(f,r);a>c;)n[c++]=t;return n}},{106:106,109:109,110:110}],11:[function(t,n,r){var e=t(38);n.exports=function(t,n){var r=[];return e(t,!1,r.push,r,n),r}},{38:38}],12:[function(t,n,r){var e=t(108),i=t(109),o=t(106);n.exports=function(t){return function(n,r,u){var c,f=e(n),a=i(f.length),s=o(u,a);if(t&&r!=r){for(;a>s;)if(c=f[s++],c!=c)return!0}else for(;a>s;s++)if((t||s in f)&&f[s]===r)return t||s||0;return!t&&-1}}},{106:106,108:108,109:109}],13:[function(t,n,r){var e=t(26),i=t(46),o=t(110),u=t(109),c=t(16);n.exports=function(t,n){var r=1==t,f=2==t,a=3==t,s=4==t,l=6==t,h=5==t||l,v=n||c;return function(n,c,p){for(var d,y,g=o(n),x=i(g),m=e(c,p,3),b=u(x.length),w=0,S=r?v(n,b):f?v(n,0):void 0;b>w;w++)if((h||w in x)&&(d=x[w],y=m(d,w,g),t))if(r)S[w]=y;else if(y)switch(t){case 3:return!0;case 5:return d;case 6:return w;case 2:S.push(d)}else if(s)return!1;return l?-1:a||s?s:S}}},{109:109,110:110,16:16,26:26,46:46}],14:[function(t,n,r){var e=t(4),i=t(110),o=t(46),u=t(109);n.exports=function(t,n,r,c,f){e(n);var a=i(t),s=o(a),l=u(a.length),h=f?l-1:0,v=f?-1:1;if(2>r)for(;;){if(h in s){c=s[h],h+=v;break}if(h+=v,f?0>h:h>=l)throw TypeError("Reduce of empty array with no initial value")}for(;f?h>=0:l>h;h+=v)h in s&&(c=n(c,s[h],h,a));return c}},{109:109,110:110,4:4,46:46}],15:[function(t,n,r){var e=t(50),i=t(48),o=t(118)("species");n.exports=function(t){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)||(n=void 0),e(n)&&(n=n[o],null===n&&(n=void 0))),void 0===n?Array:n}},{118:118,48:48,50:50}],16:[function(t,n,r){var e=t(15);n.exports=function(t,n){return new(e(t))(n)}},{15:15}],17:[function(t,n,r){"use strict";var e=t(4),i=t(50),o=t(45),u=[].slice,c={},f=function(t,n,r){if(!(n in c)){for(var e=[],i=0;n>i;i++)e[i]="a["+i+"]";c[n]=Function("F,a","return new F("+e.join(",")+")")}return c[n](t,r)};n.exports=Function.bind||function bind(t){var n=e(this),r=u.call(arguments,1),c=function(){var e=r.concat(u.call(arguments));return this instanceof c?f(n,e.length,e):o(n,e,t)};return i(n.prototype)&&(c.prototype=n.prototype),c}},{4:4,45:45,50:50}],18:[function(t,n,r){var e=t(19),i=t(118)("toStringTag"),o="Arguments"==e(function(){return arguments}()),u=function(t,n){try{return t[n]}catch(r){}};n.exports=function(t){var n,r,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=u(n=Object(t),i))?r:o?e(n):"Object"==(c=e(n))&&"function"==typeof n.callee?"Arguments":c}},{118:118,19:19}],19:[function(t,n,r){var e={}.toString;n.exports=function(t){return e.call(t).slice(8,-1)}},{}],20:[function(t,n,r){"use strict";var e=t(68).f,i=t(67),o=(t(41),t(87)),u=t(26),c=t(7),f=t(28),a=t(38),s=t(54),l=t(56),h=t(92),v=t(29),p=t(63).fastKey,d=v?"_s":"size",y=function(t,n){var r,e=p(n);if("F"!==e)return t._i[e];for(r=t._f;r;r=r.n)if(r.k==n)return r};n.exports={getConstructor:function(t,n,r,s){var l=t(function(t,e){c(t,l,n,"_i"),t._i=i(null),t._f=void 0,t._l=void 0,t[d]=0,void 0!=e&&a(e,r,t[s],t)});return o(l.prototype,{clear:function clear(){for(var t=this,n=t._i,r=t._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete n[r.i];t._f=t._l=void 0,t[d]=0},"delete":function(t){var n=this,r=y(n,t);if(r){var e=r.n,i=r.p;delete n._i[r.i],r.r=!0,i&&(i.n=e),e&&(e.p=i),n._f==r&&(n._f=e),n._l==r&&(n._l=i),n[d]--}return!!r},forEach:function forEach(t){c(this,l,"forEach");for(var n,r=u(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function has(t){return!!y(this,t)}}),v&&e(l.prototype,"size",{get:function(){return f(this[d])}}),l},def:function(t,n,r){var e,i,o=y(t,n);return o?o.v=r:(t._l=o={i:i=p(n,!0),k:n,v:r,p:e=t._l,n:void 0,r:!1},t._f||(t._f=o),e&&(e.n=o),t[d]++,"F"!==i&&(t._i[i]=o)),t},getEntry:y,setStrong:function(t,n,r){s(t,n,function(t,n){this._t=t,this._k=n,this._l=void 0},function(){for(var t=this,n=t._k,r=t._l;r&&r.r;)r=r.p;return t._t&&(t._l=r=r?r.n:t._t._f)?"keys"==n?l(0,r.k):"values"==n?l(0,r.v):l(0,[r.k,r.v]):(t._t=void 0,l(1))},r?"entries":"values",!r,!0),h(n)}}},{26:26,28:28,29:29,38:38,41:41,54:54,56:56,63:63,67:67,68:68,7:7,87:87,92:92}],21:[function(t,n,r){var e=t(18),i=t(11);n.exports=function(t){return function toJSON(){if(e(this)!=t)throw TypeError(t+"#toJSON isn't generic");return i(this)}}},{11:11,18:18}],22:[function(t,n,r){"use strict";var e=t(87),i=t(63).getWeak,o=t(8),u=t(50),c=t(7),f=t(38),a=t(13),s=t(40),l=a(5),h=a(6),v=0,p=function(t){return t._l||(t._l=new d)},d=function(){this.a=[]},y=function(t,n){return l(t.a,function(t){return t[0]===n})};d.prototype={get:function(t){var n=y(this,t);return n?n[1]:void 0},has:function(t){return!!y(this,t)},set:function(t,n){var r=y(this,t);r?r[1]=n:this.a.push([t,n])},"delete":function(t){var n=h(this.a,function(n){return n[0]===t});return~n&&this.a.splice(n,1),!!~n}},n.exports={getConstructor:function(t,n,r,o){var a=t(function(t,e){c(t,a,n,"_i"),t._i=v++,t._l=void 0,void 0!=e&&f(e,r,t[o],t)});return e(a.prototype,{"delete":function(t){if(!u(t))return!1;var n=i(t);return n===!0?p(this)["delete"](t):n&&s(n,this._i)&&delete n[this._i]},has:function has(t){if(!u(t))return!1;var n=i(t);return n===!0?p(this).has(t):n&&s(n,this._i)}}),a},def:function(t,n,r){var e=i(o(n),!0);return e===!0?p(t).set(n,r):e[t._i]=r,t},ufstore:p}},{13:13,38:38,40:40,50:50,63:63,7:7,8:8,87:87}],23:[function(t,n,r){"use strict";var e=t(39),i=t(33),o=t(88),u=t(87),c=t(63),f=t(38),a=t(7),s=t(50),l=t(35),h=t(55),v=t(93),p=t(44);n.exports=function(t,n,r,d,y,g){var x=e[t],m=x,b=y?"set":"add",w=m&&m.prototype,S={},_=function(t){var n=w[t];o(w,t,"delete"==t?function(t){return g&&!s(t)?!1:n.call(this,0===t?0:t)}:"has"==t?function has(t){return g&&!s(t)?!1:n.call(this,0===t?0:t)}:"get"==t?function get(t){return g&&!s(t)?void 0:n.call(this,0===t?0:t)}:"add"==t?function add(t){return n.call(this,0===t?0:t),this}:function set(t,r){return n.call(this,0===t?0:t,r),this})};if("function"==typeof m&&(g||w.forEach&&!l(function(){(new m).entries().next()}))){var E=new m,O=E[b](g?{}:-0,1)!=E,F=l(function(){E.has(1)}),P=h(function(t){new m(t)}),M=!g&&l(function(){for(var t=new m,n=5;n--;)t[b](n,n);return!t.has(-0)});P||(m=n(function(n,r){a(n,m,t);var e=p(new x,n,m);return void 0!=r&&f(r,y,e[b],e),e}),m.prototype=w,w.constructor=m),(F||M)&&(_("delete"),_("has"),y&&_("get")),(M||O)&&_(b),g&&w.clear&&delete w.clear}else m=d.getConstructor(n,t,y,b),u(m.prototype,r),c.NEED=!0;return v(m,t),S[t]=m,i(i.G+i.W+i.F*(m!=x),S),g||d.setStrong(m,t,y),m}},{33:33,35:35,38:38,39:39,44:44,50:50,55:55,63:63,7:7,87:87,88:88,93:93}],24:[function(t,n,r){var e=n.exports={version:"2.3.0"};"number"==typeof __e&&(__e=e)},{}],25:[function(t,n,r){"use strict";var e=t(68),i=t(86);n.exports=function(t,n,r){n in t?e.f(t,n,i(0,r)):t[n]=r}},{68:68,86:86}],26:[function(t,n,r){var e=t(4);n.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,i){return t.call(n,r,e,i)}}return function(){return t.apply(n,arguments)}}},{4:4}],27:[function(t,n,r){"use strict";var e=t(8),i=t(111),o="number";n.exports=function(t){if("string"!==t&&t!==o&&"default"!==t)throw TypeError("Incorrect hint");return i(e(this),t!=o)}},{111:111,8:8}],28:[function(t,n,r){n.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},{}],29:[function(t,n,r){n.exports=!t(35)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{35:35}],30:[function(t,n,r){var e=t(50),i=t(39).document,o=e(i)&&e(i.createElement);n.exports=function(t){return o?i.createElement(t):{}}},{39:39,50:50}],31:[function(t,n,r){n.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],32:[function(t,n,r){var e=t(77),i=t(74),o=t(78);n.exports=function(t){var n=e(t),r=i.f;if(r)for(var u,c=r(t),f=o.f,a=0;c.length>a;)f.call(t,u=c[a++])&&n.push(u);return n}},{74:74,77:77,78:78}],33:[function(t,n,r){var e=t(39),i=t(24),o=t(41),u=t(88),c=t(26),f="prototype",a=function(t,n,r){var s,l,h,v,p=t&a.F,d=t&a.G,y=t&a.S,g=t&a.P,x=t&a.B,m=d?e:y?e[n]||(e[n]={}):(e[n]||{})[f],b=d?i:i[n]||(i[n]={}),w=b[f]||(b[f]={});d&&(r=n);for(s in r)l=!p&&m&&void 0!==m[s],h=(l?m:r)[s],v=x&&l?c(h,e):g&&"function"==typeof h?c(Function.call,h):h,m&&u(m,s,h,t&a.U),b[s]!=h&&o(b,s,v),g&&w[s]!=h&&(w[s]=h)};e.core=i,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,n.exports=a},{24:24,26:26,39:39,41:41,88:88}],34:[function(t,n,r){var e=t(118)("match");n.exports=function(t){var n=/./;try{"/./"[t](n)}catch(r){try{return n[e]=!1,!"/./"[t](n)}catch(i){}}return!0}},{118:118}],35:[function(t,n,r){n.exports=function(t){try{return!!t()}catch(n){return!0}}},{}],36:[function(t,n,r){"use strict";var e=t(41),i=t(88),o=t(35),u=t(28),c=t(118);n.exports=function(t,n,r){var f=c(t),a=r(u,f,""[t]),s=a[0],l=a[1];o(function(){var n={};return n[f]=function(){return 7},7!=""[t](n)})&&(i(String.prototype,t,s),e(RegExp.prototype,f,2==n?function(t,n){return l.call(t,this,n)}:function(t){return l.call(t,this)}))}},{118:118,28:28,35:35,41:41,88:88}],37:[function(t,n,r){"use strict";var e=t(8);n.exports=function(){var t=e(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},{8:8}],38:[function(t,n,r){var e=t(26),i=t(52),o=t(47),u=t(8),c=t(109),f=t(119);n.exports=function(t,n,r,a,s){var l,h,v,p=s?function(){return t}:f(t),d=e(r,a,n?2:1),y=0;if("function"!=typeof p)throw TypeError(t+" is not iterable!");if(o(p))for(l=c(t.length);l>y;y++)n?d(u(h=t[y])[0],h[1]):d(t[y]);else for(v=p.call(t);!(h=v.next()).done;)i(v,d,h.value,n)}},{109:109,119:119,26:26,47:47,52:52,8:8}],39:[function(t,n,r){var e=n.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},{}],40:[function(t,n,r){var e={}.hasOwnProperty;n.exports=function(t,n){return e.call(t,n)}},{}],41:[function(t,n,r){var e=t(68),i=t(86);n.exports=t(29)?function(t,n,r){return e.f(t,n,i(1,r))}:function(t,n,r){return t[n]=r,t}},{29:29,68:68,86:86}],42:[function(t,n,r){n.exports=t(39).document&&document.documentElement},{39:39}],43:[function(t,n,r){n.exports=!t(29)&&!t(35)(function(){return 7!=Object.defineProperty(t(30)("div"),"a",{get:function(){return 7}}).a})},{29:29,30:30,35:35}],44:[function(t,n,r){var e=t(50),i=t(91).set;n.exports=function(t,n,r){var o,u=n.constructor;return u!==r&&"function"==typeof u&&(o=u.prototype)!==r.prototype&&e(o)&&i&&i(t,o),t}},{50:50,91:91}],45:[function(t,n,r){n.exports=function(t,n,r){var e=void 0===r;switch(n.length){case 0:return e?t():t.call(r);case 1:return e?t(n[0]):t.call(r,n[0]);case 2:return e?t(n[0],n[1]):t.call(r,n[0],n[1]);case 3:return e?t(n[0],n[1],n[2]):t.call(r,n[0],n[1],n[2]);case 4:return e?t(n[0],n[1],n[2],n[3]):t.call(r,n[0],n[1],n[2],n[3])}return t.apply(r,n)}},{}],46:[function(t,n,r){var e=t(19);n.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},{19:19}],47:[function(t,n,r){var e=t(57),i=t(118)("iterator"),o=Array.prototype;n.exports=function(t){return void 0!==t&&(e.Array===t||o[i]===t)}},{118:118,57:57}],48:[function(t,n,r){var e=t(19);n.exports=Array.isArray||function isArray(t){return"Array"==e(t)}},{19:19}],49:[function(t,n,r){var e=t(50),i=Math.floor;n.exports=function isInteger(t){return!e(t)&&isFinite(t)&&i(t)===t}},{50:50}],50:[function(t,n,r){n.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},{}],51:[function(t,n,r){var e=t(50),i=t(19),o=t(118)("match");n.exports=function(t){var n;return e(t)&&(void 0!==(n=t[o])?!!n:"RegExp"==i(t))}},{118:118,19:19,50:50}],52:[function(t,n,r){var e=t(8);n.exports=function(t,n,r,i){try{return i?n(e(r)[0],r[1]):n(r)}catch(o){var u=t["return"];throw void 0!==u&&e(u.call(t)),o}}},{8:8}],53:[function(t,n,r){"use strict";var e=t(67),i=t(86),o=t(93),u={};t(41)(u,t(118)("iterator"),function(){return this}),n.exports=function(t,n,r){t.prototype=e(u,{next:i(1,r)}),o(t,n+" Iterator")}},{118:118,41:41,67:67,86:86,93:93}],54:[function(t,n,r){"use strict";var e=t(59),i=t(33),o=t(88),u=t(41),c=t(40),f=t(57),a=t(53),s=t(93),l=t(75),h=t(118)("iterator"),v=!([].keys&&"next"in[].keys()),p="@@iterator",d="keys",y="values",g=function(){return this};n.exports=function(t,n,r,x,m,b,w){a(r,n,x);var S,_,E,O=function(t){if(!v&&t in A)return A[t];switch(t){case d:return function keys(){return new r(this,t)};case y:return function values(){return new r(this,t)}}return function entries(){return new r(this,t)}},F=n+" Iterator",P=m==y,M=!1,A=t.prototype,I=A[h]||A[p]||m&&A[m],j=I||O(m),N=m?P?O("entries"):j:void 0,k="Array"==n?A.entries||I:I;if(k&&(E=l(k.call(new t)),E!==Object.prototype&&(s(E,F,!0),e||c(E,h)||u(E,h,g))),P&&I&&I.name!==y&&(M=!0,j=function values(){return I.call(this)}),e&&!w||!v&&!M&&A[h]||u(A,h,j),f[n]=j,f[F]=g,m)if(S={values:P?j:O(y),keys:b?j:O(d),entries:N},w)for(_ in S)_ in A||o(A,_,S[_]);else i(i.P+i.F*(v||M),n,S);return S}},{118:118,33:33,40:40,41:41,53:53,57:57,59:59,75:75,88:88,93:93}],55:[function(t,n,r){var e=t(118)("iterator"),i=!1;try{var o=[7][e]();o["return"]=function(){i=!0},Array.from(o,function(){throw 2})}catch(u){}n.exports=function(t,n){if(!n&&!i)return!1;var r=!1;try{var o=[7],u=o[e]();u.next=function(){return{done:r=!0}},o[e]=function(){return u},t(o)}catch(c){}return r}},{118:118}],56:[function(t,n,r){n.exports=function(t,n){return{value:n,done:!!t}}},{}],57:[function(t,n,r){n.exports={}},{}],58:[function(t,n,r){var e=t(77),i=t(108);n.exports=function(t,n){for(var r,o=i(t),u=e(o),c=u.length,f=0;c>f;)if(o[r=u[f++]]===n)return r}},{108:108,77:77}],59:[function(t,n,r){n.exports=!1},{}],60:[function(t,n,r){var e=Math.expm1;n.exports=!e||e(10)>22025.465794806718||e(10)<22025.465794806718||-2e-17!=e(-2e-17)?function expm1(t){return 0==(t=+t)?t:t>-1e-6&&1e-6>t?t+t*t/2:Math.exp(t)-1}:e},{}],61:[function(t,n,r){n.exports=Math.log1p||function log1p(t){return(t=+t)>-1e-8&&1e-8>t?t-t*t/2:Math.log(1+t)}},{}],62:[function(t,n,r){n.exports=Math.sign||function sign(t){return 0==(t=+t)||t!=t?t:0>t?-1:1}},{}],63:[function(t,n,r){var e=t(115)("meta"),i=t(50),o=t(40),u=t(68).f,c=0,f=Object.isExtensible||function(){return!0},a=!t(35)(function(){return f(Object.preventExtensions({}))}),s=function(t){u(t,e,{value:{i:"O"+ ++c,w:{}}})},l=function(t,n){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,e)){if(!f(t))return"F";if(!n)return"E";s(t)}return t[e].i},h=function(t,n){if(!o(t,e)){if(!f(t))return!0;if(!n)return!1;s(t)}return t[e].w},v=function(t){return a&&p.NEED&&f(t)&&!o(t,e)&&s(t),t},p=n.exports={KEY:e,NEED:!1,fastKey:l,getWeak:h,onFreeze:v}},{115:115,35:35,40:40,50:50,68:68}],64:[function(t,n,r){var e=t(151),i=t(33),o=t(95)("metadata"),u=o.store||(o.store=new(t(257))),c=function(t,n,r){var i=u.get(t);if(!i){if(!r)return;u.set(t,i=new e)}var o=i.get(n);if(!o){if(!r)return;i.set(n,o=new e)}return o},f=function(t,n,r){var e=c(n,r,!1);return void 0===e?!1:e.has(t)},a=function(t,n,r){var e=c(n,r,!1);return void 0===e?void 0:e.get(t)},s=function(t,n,r,e){c(r,e,!0).set(t,n)},l=function(t,n){var r=c(t,n,!1),e=[];return r&&r.forEach(function(t,n){e.push(n)}),e},h=function(t){return void 0===t||"symbol"==typeof t?t:String(t)},v=function(t){i(i.S,"Reflect",t)};n.exports={store:u,map:c,has:f,get:a,set:s,keys:l,key:h,exp:v}},{151:151,257:257,33:33,95:95}],65:[function(t,n,r){var e=t(39),i=t(105).set,o=e.MutationObserver||e.WebKitMutationObserver,u=e.process,c=e.Promise,f="process"==t(19)(u);n.exports=function(){var t,n,r,a=function(){var e,i;for(f&&(e=u.domain)&&e.exit();t;){i=t.fn,t=t.next;try{i()}catch(o){throw t?r():n=void 0,o}}n=void 0,e&&e.enter()};if(f)r=function(){u.nextTick(a)};else if(o){var s=!0,l=document.createTextNode("");new o(a).observe(l,{characterData:!0}),r=function(){l.data=s=!s}}else if(c&&c.resolve){var h=c.resolve();r=function(){h.then(a)}}else r=function(){i.call(e,a)};return function(e){var i={fn:e,next:void 0};n&&(n.next=i),t||(t=i,r()),n=i}}},{105:105,19:19,39:39}],66:[function(t,n,r){"use strict";var e=t(77),i=t(74),o=t(78),u=t(110),c=t(46),f=Object.assign;n.exports=!f||t(35)(function(){var t={},n={},r=Symbol(),e="abcdefghijklmnopqrst";return t[r]=7,e.split("").forEach(function(t){n[t]=t}),7!=f({},t)[r]||Object.keys(f({},n)).join("")!=e})?function assign(t,n){for(var r=u(t),f=arguments.length,a=1,s=i.f,l=o.f;f>a;)for(var h,v=c(arguments[a++]),p=s?e(v).concat(s(v)):e(v),d=p.length,y=0;d>y;)l.call(v,h=p[y++])&&(r[h]=v[h]);return r}:f},{110:110,35:35,46:46,74:74,77:77,78:78}],67:[function(t,n,r){var e=t(8),i=t(69),o=t(31),u=t(94)("IE_PROTO"),c=function(){},f="prototype",a=function(){var n,r=t(30)("iframe"),e=o.length,i=">";for(r.style.display="none",t(42).appendChild(r),r.src="javascript:",n=r.contentWindow.document,n.open(),n.write("<script>document.F=Object</script"+i),n.close(),a=n.F;e--;)delete a[f][o[e]];return a()};n.exports=Object.create||function create(t,n){var r;return null!==t?(c[f]=e(t),r=new c,c[f]=null,r[u]=t):r=a(),void 0===n?r:i(r,n)}},{30:30,31:31,42:42,69:69,8:8,94:94}],68:[function(t,n,r){var e=t(8),i=t(43),o=t(111),u=Object.defineProperty;r.f=t(29)?Object.defineProperty:function defineProperty(t,n,r){if(e(t),n=o(n,!0),e(r),i)try{return u(t,n,r)}catch(c){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[n]=r.value),t}},{111:111,29:29,43:43,8:8}],69:[function(t,n,r){var e=t(68),i=t(8),o=t(77);n.exports=t(29)?Object.defineProperties:function defineProperties(t,n){i(t);for(var r,u=o(n),c=u.length,f=0;c>f;)e.f(t,r=u[f++],n[r]);return t}},{29:29,68:68,77:77,8:8}],70:[function(t,n,r){n.exports=t(59)||!t(35)(function(){var n=Math.random();__defineSetter__.call(null,n,function(){}),delete t(39)[n]})},{35:35,39:39,59:59}],71:[function(t,n,r){var e=t(78),i=t(86),o=t(108),u=t(111),c=t(40),f=t(43),a=Object.getOwnPropertyDescriptor;r.f=t(29)?a:function getOwnPropertyDescriptor(t,n){if(t=o(t),n=u(n,!0),f)try{return a(t,n)}catch(r){}return c(t,n)?i(!e.f.call(t,n),t[n]):void 0}},{108:108,111:111,29:29,40:40,43:43,78:78,86:86}],72:[function(t,n,r){var e=t(108),i=t(73).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(n){return u.slice()}};n.exports.f=function getOwnPropertyNames(t){return u&&"[object Window]"==o.call(t)?c(t):i(e(t))}},{108:108,73:73}],73:[function(t,n,r){var e=t(76),i=t(31).concat("length","prototype");r.f=Object.getOwnPropertyNames||function getOwnPropertyNames(t){return e(t,i)}},{31:31,76:76}],74:[function(t,n,r){r.f=Object.getOwnPropertySymbols},{}],75:[function(t,n,r){var e=t(40),i=t(110),o=t(94)("IE_PROTO"),u=Object.prototype;n.exports=Object.getPrototypeOf||function(t){return t=i(t),e(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},{110:110,40:40,94:94}],76:[function(t,n,r){var e=t(40),i=t(108),o=t(12)(!1),u=t(94)("IE_PROTO");n.exports=function(t,n){var r,c=i(t),f=0,a=[];for(r in c)r!=u&&e(c,r)&&a.push(r);for(;n.length>f;)e(c,r=n[f++])&&(~o(a,r)||a.push(r));return a}},{108:108,12:12,40:40,94:94}],77:[function(t,n,r){var e=t(76),i=t(31);n.exports=Object.keys||function keys(t){return e(t,i)}},{31:31,76:76}],78:[function(t,n,r){r.f={}.propertyIsEnumerable},{}],79:[function(t,n,r){var e=t(33),i=t(24),o=t(35);n.exports=function(t,n){var r=(i.Object||{})[t]||Object[t],u={};u[t]=n(r),e(e.S+e.F*o(function(){r(1)}),"Object",u)}},{24:24,33:33,35:35}],80:[function(t,n,r){var e=t(77),i=t(108),o=t(78).f;n.exports=function(t){return function(n){for(var r,u=i(n),c=e(u),f=c.length,a=0,s=[];f>a;)o.call(u,r=c[a++])&&s.push(t?[r,u[r]]:u[r]);return s}}},{108:108,77:77,78:78}],81:[function(t,n,r){var e=t(73),i=t(74),o=t(8),u=t(39).Reflect;n.exports=u&&u.ownKeys||function ownKeys(t){var n=e.f(o(t)),r=i.f;return r?n.concat(r(t)):n}},{39:39,73:73,74:74,8:8}],82:[function(t,n,r){var e=t(39).parseFloat,i=t(103).trim;n.exports=1/e(t(104)+"-0")!==-(1/0)?function parseFloat(t){var n=i(String(t),3),r=e(n);return 0===r&&"-"==n.charAt(0)?-0:r}:e},{103:103,104:104,39:39}],83:[function(t,n,r){var e=t(39).parseInt,i=t(103).trim,o=t(104),u=/^[\-+]?0[xX]/;n.exports=8!==e(o+"08")||22!==e(o+"0x16")?function parseInt(t,n){var r=i(String(t),3);return e(r,n>>>0||(u.test(r)?16:10))}:e},{103:103,104:104,39:39}],84:[function(t,n,r){"use strict";var e=t(85),i=t(45),o=t(4);n.exports=function(){for(var t=o(this),n=arguments.length,r=Array(n),u=0,c=e._,f=!1;n>u;)(r[u]=arguments[u++])===c&&(f=!0);return function(){var e,o=this,u=arguments.length,a=0,s=0;if(!f&&!u)return i(t,r,o);if(e=r.slice(),f)for(;n>a;a++)e[a]===c&&(e[a]=arguments[s++]);for(;u>s;)e.push(arguments[s++]);return i(t,e,o)}}},{4:4,45:45,85:85}],85:[function(t,n,r){n.exports=t(39)},{39:39}],86:[function(t,n,r){n.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},{}],87:[function(t,n,r){var e=t(88);n.exports=function(t,n,r){for(var i in n)e(t,i,n[i],r);return t}},{88:88}],88:[function(t,n,r){var e=t(39),i=t(41),o=t(40),u=t(115)("src"),c="toString",f=Function[c],a=(""+f).split(c);t(24).inspectSource=function(t){return f.call(t)},(n.exports=function(t,n,r,c){var f="function"==typeof r;f&&(o(r,"name")||i(r,"name",n)),t[n]!==r&&(f&&(o(r,u)||i(r,u,t[n]?""+t[n]:a.join(String(n)))),t===e?t[n]=r:c?t[n]?t[n]=r:i(t,n,r):(delete t[n],i(t,n,r)))})(Function.prototype,c,function toString(){return"function"==typeof this&&this[u]||f.call(this)})},{115:115,24:24,39:39,40:40,41:41}],89:[function(t,n,r){n.exports=function(t,n){var r=n===Object(n)?function(t){return n[t]}:n;return function(n){return String(n).replace(t,r)}}},{}],90:[function(t,n,r){n.exports=Object.is||function is(t,n){return t===n?0!==t||1/t===1/n:t!=t&&n!=n}},{}],91:[function(t,n,r){var e=t(50),i=t(8),o=function(t,n){if(i(t),!e(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};n.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(n,r,e){try{e=t(26)(Function.call,t(71).f(Object.prototype,"__proto__").set,2),e(n,[]),r=!(n instanceof Array)}catch(i){r=!0}return function setPrototypeOf(t,n){return o(t,n),r?t.__proto__=n:e(t,n),t}}({},!1):void 0),check:o}},{26:26,50:50,71:71,8:8}],92:[function(t,n,r){"use strict";var e=t(39),i=t(68),o=t(29),u=t(118)("species");n.exports=function(t){var n=e[t];o&&n&&!n[u]&&i.f(n,u,{configurable:!0,get:function(){return this}})}},{118:118,29:29,39:39,68:68}],93:[function(t,n,r){var e=t(68).f,i=t(40),o=t(118)("toStringTag");n.exports=function(t,n,r){t&&!i(t=r?t:t.prototype,o)&&e(t,o,{configurable:!0,value:n})}},{118:118,40:40,68:68}],94:[function(t,n,r){var e=t(95)("keys"),i=t(115);n.exports=function(t){return e[t]||(e[t]=i(t))}},{115:115,95:95}],95:[function(t,n,r){var e=t(39),i="__core-js_shared__",o=e[i]||(e[i]={});n.exports=function(t){return o[t]||(o[t]={})}},{39:39}],96:[function(t,n,r){var e=t(8),i=t(4),o=t(118)("species");n.exports=function(t,n){var r,u=e(t).constructor;return void 0===u||void 0==(r=e(u)[o])?n:i(r)}},{118:118,4:4,8:8}],97:[function(t,n,r){var e=t(35);n.exports=function(t,n){return!!t&&e(function(){n?t.call(null,function(){},1):t.call(null)})}},{35:35}],98:[function(t,n,r){var e=t(107),i=t(28);n.exports=function(t){return function(n,r){var o,u,c=String(i(n)),f=e(r),a=c.length;return 0>f||f>=a?t?"":void 0:(o=c.charCodeAt(f),55296>o||o>56319||f+1===a||(u=c.charCodeAt(f+1))<56320||u>57343?t?c.charAt(f):o:t?c.slice(f,f+2):(o-55296<<10)+(u-56320)+65536)}}},{107:107,28:28}],99:[function(t,n,r){var e=t(51),i=t(28);n.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(i(t))}},{28:28,51:51}],100:[function(t,n,r){var e=t(33),i=t(35),o=t(28),u=/"/g,c=function(t,n,r,e){var i=String(o(t)),c="<"+n;return""!==r&&(c+=" "+r+'="'+String(e).replace(u,"&quot;")+'"'),c+">"+i+"</"+n+">"};n.exports=function(t,n){var r={};r[t]=n(c),e(e.P+e.F*i(function(){var n=""[t]('"');return n!==n.toLowerCase()||n.split('"').length>3}),"String",r)}},{28:28,33:33,35:35}],101:[function(t,n,r){var e=t(109),i=t(102),o=t(28);n.exports=function(t,n,r,u){var c=String(o(t)),f=c.length,a=void 0===r?" ":String(r),s=e(n);if(f>=s||""==a)return c;var l=s-f,h=i.call(a,Math.ceil(l/a.length));return h.length>l&&(h=h.slice(0,l)),u?h+c:c+h}},{102:102,109:109,28:28}],102:[function(t,n,r){"use strict";var e=t(107),i=t(28);n.exports=function repeat(t){var n=String(i(this)),r="",o=e(t);if(0>o||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(n+=n))1&o&&(r+=n);return r}},{107:107,28:28}],103:[function(t,n,r){var e=t(33),i=t(28),o=t(35),u=t(104),c="["+u+"]",f="​",a=RegExp("^"+c+c+"*"),s=RegExp(c+c+"*$"),l=function(t,n,r){var i={},c=o(function(){return!!u[t]()||f[t]()!=f}),a=i[t]=c?n(h):u[t];r&&(i[r]=a),e(e.P+e.F*c,"String",i)},h=l.trim=function(t,n){return t=String(i(t)),1&n&&(t=t.replace(a,"")),2&n&&(t=t.replace(s,"")),t};n.exports=l},{104:104,28:28,33:33,35:35}],104:[function(t,n,r){n.exports="	\n\x0B\f\r   ᠎             　\u2028\u2029\ufeff"},{}],105:[function(t,n,r){var e,i,o,u=t(26),c=t(45),f=t(42),a=t(30),s=t(39),l=s.process,h=s.setImmediate,v=s.clearImmediate,p=s.MessageChannel,d=0,y={},g="onreadystatechange",x=function(){var t=+this;if(y.hasOwnProperty(t)){var n=y[t];delete y[t],n()}},m=function(t){x.call(t.data)};h&&v||(h=function setImmediate(t){for(var n=[],r=1;arguments.length>r;)n.push(arguments[r++]);return y[++d]=function(){c("function"==typeof t?t:Function(t),n)},e(d),d},v=function clearImmediate(t){delete y[t]},"process"==t(19)(l)?e=function(t){l.nextTick(u(x,t,1))}:p?(i=new p,o=i.port2,i.port1.onmessage=m,e=u(o.postMessage,o,1)):s.addEventListener&&"function"==typeof postMessage&&!s.importScripts?(e=function(t){s.postMessage(t+"","*")},s.addEventListener("message",m,!1)):e=g in a("script")?function(t){f.appendChild(a("script"))[g]=function(){f.removeChild(this),x.call(t)}}:function(t){setTimeout(u(x,t,1),0)}),n.exports={set:h,clear:v}},{19:19,26:26,30:30,39:39,42:42,45:45}],106:[function(t,n,r){var e=t(107),i=Math.max,o=Math.min;n.exports=function(t,n){return t=e(t),0>t?i(t+n,0):o(t,n)}},{107:107}],107:[function(t,n,r){var e=Math.ceil,i=Math.floor;n.exports=function(t){return isNaN(t=+t)?0:(t>0?i:e)(t)}},{}],108:[function(t,n,r){var e=t(46),i=t(28);n.exports=function(t){return e(i(t))}},{28:28,46:46}],109:[function(t,n,r){var e=t(107),i=Math.min;n.exports=function(t){return t>0?i(e(t),9007199254740991):0}},{107:107}],110:[function(t,n,r){var e=t(28);n.exports=function(t){return Object(e(t))}},{28:28}],111:[function(t,n,r){var e=t(50);n.exports=function(t,n){if(!e(t))return t;var r,i;if(n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;if("function"==typeof(r=t.valueOf)&&!e(i=r.call(t)))return i;if(!n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},{50:50}],112:[function(t,n,r){"use strict";if(t(29)){var e=t(59),i=t(39),o=t(35),u=t(33),c=t(114),f=t(113),a=t(26),s=t(7),l=t(86),h=t(41),v=t(87),p=(t(49),t(107)),d=t(109),y=t(106),g=t(111),x=t(40),m=t(90),b=t(18),w=t(50),S=t(110),_=t(47),E=t(67),O=t(75),F=t(73).f,P=(t(120),t(119)),M=t(115),A=t(118),I=t(13),j=t(12),N=t(96),k=t(132),R=t(57),T=t(55),L=t(92),C=t(10),U=t(9),D=t(68),G=t(71),W=D.f,B=G.f,V=i.RangeError,z=i.TypeError,J=i.Uint8Array,K="ArrayBuffer",Y="Shared"+K,q="BYTES_PER_ELEMENT",X="prototype",$=Array[X],H=f.ArrayBuffer,Z=f.DataView,Q=I(0),tt=I(2),nt=I(3),rt=I(4),et=I(5),it=I(6),ot=j(!0),ut=j(!1),ct=k.values,ft=k.keys,at=k.entries,st=$.lastIndexOf,lt=$.reduce,ht=$.reduceRight,vt=$.join,pt=$.sort,dt=$.slice,yt=$.toString,gt=$.toLocaleString,xt=A("iterator"),mt=A("toStringTag"),bt=M("typed_constructor"),wt=M("def_constructor"),St=c.CONSTR,_t=c.TYPED,Et=c.VIEW,Ot="Wrong length!",Ft=I(1,function(t,n){return Nt(N(t,t[wt]),n)}),Pt=o(function(){return 1===new J(new Uint16Array([1]).buffer)[0]}),Mt=!!J&&!!J[X].set&&o(function(){new J(1).set({})}),At=function(t,n){if(void 0===t)throw z(Ot);var r=+t,e=d(t);if(n&&!m(r,e))throw V(Ot);return e},It=function(t,n){var r=p(t);if(0>r||r%n)throw V("Wrong offset!");return r},jt=function(t){if(w(t)&&_t in t)return t;throw z(t+" is not a typed array!")},Nt=function(t,n){if(!(w(t)&&bt in t))throw z("It is not a typed array constructor!");return new t(n)},kt=function(t,n){return Rt(N(t,t[wt]),n)},Rt=function(t,n){for(var r=0,e=n.length,i=Nt(t,e);e>r;)i[r]=n[r++];return i},Tt=function(t,n,r){W(t,n,{get:function(){return this._d[r]}})},Lt=function from(t){var n,r,e,i,o,u,c=S(t),f=arguments.length,s=f>1?arguments[1]:void 0,l=void 0!==s,h=P(c);if(void 0!=h&&!_(h)){for(u=h.call(c),e=[],n=0;!(o=u.next()).done;n++)e.push(o.value);c=e}for(l&&f>2&&(s=a(s,arguments[2],2)),n=0,r=d(c.length),i=Nt(this,r);r>n;n++)i[n]=l?s(c[n],n):c[n];return i},Ct=function of(){for(var t=0,n=arguments.length,r=Nt(this,n);n>t;)r[t]=arguments[t++];return r},Ut=!!J&&o(function(){gt.call(new J(1))}),Dt=function toLocaleString(){return gt.apply(Ut?dt.call(jt(this)):jt(this),arguments)},Gt={copyWithin:function copyWithin(t,n){return U.call(jt(this),t,n,arguments.length>2?arguments[2]:void 0)},every:function every(t){return rt(jt(this),t,arguments.length>1?arguments[1]:void 0)},fill:function fill(t){return C.apply(jt(this),arguments)},filter:function filter(t){return kt(this,tt(jt(this),t,arguments.length>1?arguments[1]:void 0))},find:function find(t){return et(jt(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function findIndex(t){
return it(jt(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function forEach(t){Q(jt(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function indexOf(t){return ut(jt(this),t,arguments.length>1?arguments[1]:void 0)},includes:function includes(t){return ot(jt(this),t,arguments.length>1?arguments[1]:void 0)},join:function join(t){return vt.apply(jt(this),arguments)},lastIndexOf:function lastIndexOf(t){return st.apply(jt(this),arguments)},map:function map(t){return Ft(jt(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function reduce(t){return lt.apply(jt(this),arguments)},reduceRight:function reduceRight(t){return ht.apply(jt(this),arguments)},reverse:function reverse(){for(var t,n=this,r=jt(n).length,e=Math.floor(r/2),i=0;e>i;)t=n[i],n[i++]=n[--r],n[r]=t;return n},some:function some(t){return nt(jt(this),t,arguments.length>1?arguments[1]:void 0)},sort:function sort(t){return pt.call(jt(this),t)},subarray:function subarray(t,n){var r=jt(this),e=r.length,i=y(t,e);return new(N(r,r[wt]))(r.buffer,r.byteOffset+i*r.BYTES_PER_ELEMENT,d((void 0===n?e:y(n,e))-i))}},Wt=function slice(t,n){return kt(this,dt.call(jt(this),t,n))},Bt=function set(t){jt(this);var n=It(arguments[1],1),r=this.length,e=S(t),i=d(e.length),o=0;if(i+n>r)throw V(Ot);for(;i>o;)this[n+o]=e[o++]},Vt={entries:function entries(){return at.call(jt(this))},keys:function keys(){return ft.call(jt(this))},values:function values(){return ct.call(jt(this))}},zt=function(t,n){return w(t)&&t[_t]&&"symbol"!=typeof n&&n in t&&String(+n)==String(n)},Jt=function getOwnPropertyDescriptor(t,n){return zt(t,n=g(n,!0))?l(2,t[n]):B(t,n)},Kt=function defineProperty(t,n,r){return!(zt(t,n=g(n,!0))&&w(r)&&x(r,"value"))||x(r,"get")||x(r,"set")||r.configurable||x(r,"writable")&&!r.writable||x(r,"enumerable")&&!r.enumerable?W(t,n,r):(t[n]=r.value,t)};St||(G.f=Jt,D.f=Kt),u(u.S+u.F*!St,"Object",{getOwnPropertyDescriptor:Jt,defineProperty:Kt}),o(function(){yt.call({})})&&(yt=gt=function toString(){return vt.call(this)});var Yt=v({},Gt);v(Yt,Vt),h(Yt,xt,Vt.values),v(Yt,{slice:Wt,set:Bt,constructor:function(){},toString:yt,toLocaleString:Dt}),Tt(Yt,"buffer","b"),Tt(Yt,"byteOffset","o"),Tt(Yt,"byteLength","l"),Tt(Yt,"length","e"),W(Yt,mt,{get:function(){return this[_t]}}),n.exports=function(t,n,r,f){f=!!f;var a=t+(f?"Clamped":"")+"Array",l="Uint8Array"!=a,v="get"+t,p="set"+t,y=i[a],g=y||{},x=y&&O(y),m=!y||!c.ABV,S={},_=y&&y[X],P=function(t,r){var e=t._d;return e.v[v](r*n+e.o,Pt)},M=function(t,r,e){var i=t._d;f&&(e=(e=Math.round(e))<0?0:e>255?255:255&e),i.v[p](r*n+i.o,e,Pt)},A=function(t,n){W(t,n,{get:function(){return P(this,n)},set:function(t){return M(this,n,t)},enumerable:!0})};m?(y=r(function(t,r,e,i){s(t,y,a,"_d");var o,u,c,f,l=0,v=0;if(w(r)){if(!(r instanceof H||(f=b(r))==K||f==Y))return _t in r?Rt(y,r):Lt.call(y,r);o=r,v=It(e,n);var p=r.byteLength;if(void 0===i){if(p%n)throw V(Ot);if(u=p-v,0>u)throw V(Ot)}else if(u=d(i)*n,u+v>p)throw V(Ot);c=u/n}else c=At(r,!0),u=c*n,o=new H(u);for(h(t,"_d",{b:o,o:v,l:u,e:c,v:new Z(o)});c>l;)A(t,l++)}),_=y[X]=E(Yt),h(_,"constructor",y)):T(function(t){new y(null),new y(t)},!0)||(y=r(function(t,r,e,i){s(t,y,a);var o;return w(r)?r instanceof H||(o=b(r))==K||o==Y?void 0!==i?new g(r,It(e,n),i):void 0!==e?new g(r,It(e,n)):new g(r):_t in r?Rt(y,r):Lt.call(y,r):new g(At(r,l))}),Q(x!==Function.prototype?F(g).concat(F(x)):F(g),function(t){t in y||h(y,t,g[t])}),y[X]=_,e||(_.constructor=y));var I=_[xt],j=!!I&&("values"==I.name||void 0==I.name),N=Vt.values;h(y,bt,!0),h(_,_t,a),h(_,Et,!0),h(_,wt,y),(f?new y(1)[mt]==a:mt in _)||W(_,mt,{get:function(){return a}}),S[a]=y,u(u.G+u.W+u.F*(y!=g),S),u(u.S,a,{BYTES_PER_ELEMENT:n,from:Lt,of:Ct}),q in _||h(_,q,n),u(u.P,a,Gt),L(a),u(u.P+u.F*Mt,a,{set:Bt}),u(u.P+u.F*!j,a,Vt),u(u.P+u.F*(_.toString!=yt),a,{toString:yt}),u(u.P+u.F*o(function(){new y(1).slice()}),a,{slice:Wt}),u(u.P+u.F*(o(function(){return[1,2].toLocaleString()!=new y([1,2]).toLocaleString()})||!o(function(){_.toLocaleString.call([1,2])})),a,{toLocaleString:Dt}),R[a]=j?I:N,e||j||h(_,xt,N)}}else n.exports=function(){}},{10:10,106:106,107:107,109:109,110:110,111:111,113:113,114:114,115:115,118:118,119:119,12:12,120:120,13:13,132:132,18:18,26:26,29:29,33:33,35:35,39:39,40:40,41:41,47:47,49:49,50:50,55:55,57:57,59:59,67:67,68:68,7:7,71:71,73:73,75:75,86:86,87:87,9:9,90:90,92:92,96:96}],113:[function(t,n,r){"use strict";var e=t(39),i=t(29),o=t(59),u=t(114),c=t(41),f=t(87),a=t(35),s=t(7),l=t(107),h=t(109),v=t(73).f,p=t(68).f,d=t(10),y=t(93),g="ArrayBuffer",x="DataView",m="prototype",b="Wrong length!",w="Wrong index!",S=e[g],_=e[x],E=e.Math,O=(e.parseInt,e.RangeError),F=e.Infinity,P=S,M=E.abs,A=E.pow,I=(E.min,E.floor),j=E.log,N=E.LN2,k="buffer",R="byteLength",T="byteOffset",L=i?"_b":k,C=i?"_l":R,U=i?"_o":T,D=function(t,n,r){var e,i,o,u=Array(r),c=8*r-n-1,f=(1<<c)-1,a=f>>1,s=23===n?A(2,-24)-A(2,-77):0,l=0,h=0>t||0===t&&0>1/t?1:0;for(t=M(t),t!=t||t===F?(i=t!=t?1:0,e=f):(e=I(j(t)/N),t*(o=A(2,-e))<1&&(e--,o*=2),t+=e+a>=1?s/o:s*A(2,1-a),t*o>=2&&(e++,o/=2),e+a>=f?(i=0,e=f):e+a>=1?(i=(t*o-1)*A(2,n),e+=a):(i=t*A(2,a-1)*A(2,n),e=0));n>=8;u[l++]=255&i,i/=256,n-=8);for(e=e<<n|i,c+=n;c>0;u[l++]=255&e,e/=256,c-=8);return u[--l]|=128*h,u},G=function(t,n,r){var e,i=8*r-n-1,o=(1<<i)-1,u=o>>1,c=i-7,f=r-1,a=t[f--],s=127&a;for(a>>=7;c>0;s=256*s+t[f],f--,c-=8);for(e=s&(1<<-c)-1,s>>=-c,c+=n;c>0;e=256*e+t[f],f--,c-=8);if(0===s)s=1-u;else{if(s===o)return e?NaN:a?-F:F;e+=A(2,n),s-=u}return(a?-1:1)*e*A(2,s-n)},W=function(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]},B=function(t){return[255&t]},V=function(t){return[255&t,t>>8&255]},z=function(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]},J=function(t){return D(t,52,8)},K=function(t){return D(t,23,4)},Y=function(t,n,r){p(t[m],n,{get:function(){return this[r]}})},q=function(t,n,r,e){var i=+r,o=l(i);if(i!=o||0>o||o+n>t[C])throw O(w);var u=t[L]._b,c=o+t[U],f=u.slice(c,c+n);return e?f:f.reverse()},X=function(t,n,r,e,i,o){var u=+r,c=l(u);if(u!=c||0>c||c+n>t[C])throw O(w);for(var f=t[L]._b,a=c+t[U],s=e(+i),h=0;n>h;h++)f[a+h]=s[o?h:n-h-1]},$=function(t,n){s(t,S,g);var r=+n,e=h(r);if(r!=e)throw O(b);return e};if(u.ABV){if(!a(function(){new S})||!a(function(){new S(.5)})){S=function ArrayBuffer(t){return new P($(this,t))};for(var H,Z=S[m]=P[m],Q=v(P),tt=0;Q.length>tt;)(H=Q[tt++])in S||c(S,H,P[H]);o||(Z.constructor=S)}var nt=new _(new S(2)),rt=_[m].setInt8;nt.setInt8(0,2147483648),nt.setInt8(1,2147483649),!nt.getInt8(0)&&nt.getInt8(1)||f(_[m],{setInt8:function setInt8(t,n){rt.call(this,t,n<<24>>24)},setUint8:function setUint8(t,n){rt.call(this,t,n<<24>>24)}},!0)}else S=function ArrayBuffer(t){var n=$(this,t);this._b=d.call(Array(n),0),this[C]=n},_=function DataView(t,n,r){s(this,_,x),s(t,S,x);var e=t[C],i=l(n);if(0>i||i>e)throw O("Wrong offset!");if(r=void 0===r?e-i:h(r),i+r>e)throw O(b);this[L]=t,this[U]=i,this[C]=r},i&&(Y(S,R,"_l"),Y(_,k,"_b"),Y(_,R,"_l"),Y(_,T,"_o")),f(_[m],{getInt8:function getInt8(t){return q(this,1,t)[0]<<24>>24},getUint8:function getUint8(t){return q(this,1,t)[0]},getInt16:function getInt16(t){var n=q(this,2,t,arguments[1]);return(n[1]<<8|n[0])<<16>>16},getUint16:function getUint16(t){var n=q(this,2,t,arguments[1]);return n[1]<<8|n[0]},getInt32:function getInt32(t){return W(q(this,4,t,arguments[1]))},getUint32:function getUint32(t){return W(q(this,4,t,arguments[1]))>>>0},getFloat32:function getFloat32(t){return G(q(this,4,t,arguments[1]),23,4)},getFloat64:function getFloat64(t){return G(q(this,8,t,arguments[1]),52,8)},setInt8:function setInt8(t,n){X(this,1,t,B,n)},setUint8:function setUint8(t,n){X(this,1,t,B,n)},setInt16:function setInt16(t,n){X(this,2,t,V,n,arguments[2])},setUint16:function setUint16(t,n){X(this,2,t,V,n,arguments[2])},setInt32:function setInt32(t,n){X(this,4,t,z,n,arguments[2])},setUint32:function setUint32(t,n){X(this,4,t,z,n,arguments[2])},setFloat32:function setFloat32(t,n){X(this,4,t,K,n,arguments[2])},setFloat64:function setFloat64(t,n){X(this,8,t,J,n,arguments[2])}});y(S,g),y(_,x),c(_[m],u.VIEW,!0),r[g]=S,r[x]=_},{10:10,107:107,109:109,114:114,29:29,35:35,39:39,41:41,59:59,68:68,7:7,73:73,87:87,93:93}],114:[function(t,n,r){for(var e,i=t(39),o=t(41),u=t(115),c=u("typed_array"),f=u("view"),a=!(!i.ArrayBuffer||!i.DataView),s=a,l=0,h=9,v="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");h>l;)(e=i[v[l++]])?(o(e.prototype,c,!0),o(e.prototype,f,!0)):s=!1;n.exports={ABV:a,CONSTR:s,TYPED:c,VIEW:f}},{115:115,39:39,41:41}],115:[function(t,n,r){var e=0,i=Math.random();n.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+i).toString(36))}},{}],116:[function(t,n,r){var e=t(39),i=t(24),o=t(59),u=t(117),c=t(68).f;n.exports=function(t){var n=i.Symbol||(i.Symbol=o?{}:e.Symbol||{});"_"==t.charAt(0)||t in n||c(n,t,{value:u.f(t)})}},{117:117,24:24,39:39,59:59,68:68}],117:[function(t,n,r){r.f=t(118)},{118:118}],118:[function(t,n,r){var e=t(95)("wks"),i=t(115),o=t(39).Symbol,u="function"==typeof o,c=n.exports=function(t){return e[t]||(e[t]=u&&o[t]||(u?o:i)("Symbol."+t))};c.store=e},{115:115,39:39,95:95}],119:[function(t,n,r){var e=t(18),i=t(118)("iterator"),o=t(57);n.exports=t(24).getIteratorMethod=function(t){return void 0!=t?t[i]||t["@@iterator"]||o[e(t)]:void 0}},{118:118,18:18,24:24,57:57}],120:[function(t,n,r){var e=t(18),i=t(118)("iterator"),o=t(57);n.exports=t(24).isIterable=function(t){var n=Object(t);return void 0!==n[i]||"@@iterator"in n||o.hasOwnProperty(e(n))}},{118:118,18:18,24:24,57:57}],121:[function(t,n,r){var e=t(33),i=t(89)(/[\\^$*+?.()|[\]{}]/g,"\\$&");e(e.S,"RegExp",{escape:function escape(t){return i(t)}})},{33:33,89:89}],122:[function(t,n,r){var e=t(33);e(e.P,"Array",{copyWithin:t(9)}),t(6)("copyWithin")},{33:33,6:6,9:9}],123:[function(t,n,r){"use strict";var e=t(33),i=t(13)(4);e(e.P+e.F*!t(97)([].every,!0),"Array",{every:function every(t){return i(this,t,arguments[1])}})},{13:13,33:33,97:97}],124:[function(t,n,r){var e=t(33);e(e.P,"Array",{fill:t(10)}),t(6)("fill")},{10:10,33:33,6:6}],125:[function(t,n,r){"use strict";var e=t(33),i=t(13)(2);e(e.P+e.F*!t(97)([].filter,!0),"Array",{filter:function filter(t){return i(this,t,arguments[1])}})},{13:13,33:33,97:97}],126:[function(t,n,r){"use strict";var e=t(33),i=t(13)(6),o="findIndex",u=!0;o in[]&&Array(1)[o](function(){u=!1}),e(e.P+e.F*u,"Array",{findIndex:function findIndex(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(6)(o)},{13:13,33:33,6:6}],127:[function(t,n,r){"use strict";var e=t(33),i=t(13)(5),o="find",u=!0;o in[]&&Array(1)[o](function(){u=!1}),e(e.P+e.F*u,"Array",{find:function find(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(6)(o)},{13:13,33:33,6:6}],128:[function(t,n,r){"use strict";var e=t(33),i=t(13)(0),o=t(97)([].forEach,!0);e(e.P+e.F*!o,"Array",{forEach:function forEach(t){return i(this,t,arguments[1])}})},{13:13,33:33,97:97}],129:[function(t,n,r){"use strict";var e=t(26),i=t(33),o=t(110),u=t(52),c=t(47),f=t(109),a=t(25),s=t(119);i(i.S+i.F*!t(55)(function(t){Array.from(t)}),"Array",{from:function from(t){var n,r,i,l,h=o(t),v="function"==typeof this?this:Array,p=arguments.length,d=p>1?arguments[1]:void 0,y=void 0!==d,g=0,x=s(h);if(y&&(d=e(d,p>2?arguments[2]:void 0,2)),void 0==x||v==Array&&c(x))for(n=f(h.length),r=new v(n);n>g;g++)a(r,g,y?d(h[g],g):h[g]);else for(l=x.call(h),r=new v;!(i=l.next()).done;g++)a(r,g,y?u(l,d,[i.value,g],!0):i.value);return r.length=g,r}})},{109:109,110:110,119:119,25:25,26:26,33:33,47:47,52:52,55:55}],130:[function(t,n,r){"use strict";var e=t(33),i=t(12)(!1),o=[].indexOf,u=!!o&&1/[1].indexOf(1,-0)<0;e(e.P+e.F*(u||!t(97)(o)),"Array",{indexOf:function indexOf(t){return u?o.apply(this,arguments)||0:i(this,t,arguments[1])}})},{12:12,33:33,97:97}],131:[function(t,n,r){var e=t(33);e(e.S,"Array",{isArray:t(48)})},{33:33,48:48}],132:[function(t,n,r){"use strict";var e=t(6),i=t(56),o=t(57),u=t(108);n.exports=t(54)(Array,"Array",function(t,n){this._t=u(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,i(1)):"keys"==n?i(0,r):"values"==n?i(0,t[r]):i(0,[r,t[r]])},"values"),o.Arguments=o.Array,e("keys"),e("values"),e("entries")},{108:108,54:54,56:56,57:57,6:6}],133:[function(t,n,r){"use strict";var e=t(33),i=t(108),o=[].join;e(e.P+e.F*(t(46)!=Object||!t(97)(o)),"Array",{join:function join(t){return o.call(i(this),void 0===t?",":t)}})},{108:108,33:33,46:46,97:97}],134:[function(t,n,r){"use strict";var e=t(33),i=t(108),o=t(107),u=t(109),c=[].lastIndexOf,f=!!c&&1/[1].lastIndexOf(1,-0)<0;e(e.P+e.F*(f||!t(97)(c)),"Array",{lastIndexOf:function lastIndexOf(t){if(f)return c.apply(this,arguments)||0;var n=i(this),r=u(n.length),e=r-1;for(arguments.length>1&&(e=Math.min(e,o(arguments[1]))),0>e&&(e=r+e);e>=0;e--)if(e in n&&n[e]===t)return e||0;return-1}})},{107:107,108:108,109:109,33:33,97:97}],135:[function(t,n,r){"use strict";var e=t(33),i=t(13)(1);e(e.P+e.F*!t(97)([].map,!0),"Array",{map:function map(t){return i(this,t,arguments[1])}})},{13:13,33:33,97:97}],136:[function(t,n,r){"use strict";var e=t(33),i=t(25);e(e.S+e.F*t(35)(function(){function F(){}return!(Array.of.call(F)instanceof F)}),"Array",{of:function of(){for(var t=0,n=arguments.length,r=new("function"==typeof this?this:Array)(n);n>t;)i(r,t,arguments[t++]);return r.length=n,r}})},{25:25,33:33,35:35}],137:[function(t,n,r){"use strict";var e=t(33),i=t(14);e(e.P+e.F*!t(97)([].reduceRight,!0),"Array",{reduceRight:function reduceRight(t){return i(this,t,arguments.length,arguments[1],!0)}})},{14:14,33:33,97:97}],138:[function(t,n,r){"use strict";var e=t(33),i=t(14);e(e.P+e.F*!t(97)([].reduce,!0),"Array",{reduce:function reduce(t){return i(this,t,arguments.length,arguments[1],!1)}})},{14:14,33:33,97:97}],139:[function(t,n,r){"use strict";var e=t(33),i=t(42),o=t(19),u=t(106),c=t(109),f=[].slice;e(e.P+e.F*t(35)(function(){i&&f.call(i)}),"Array",{slice:function slice(t,n){var r=c(this.length),e=o(this);if(n=void 0===n?r:n,"Array"==e)return f.call(this,t,n);for(var i=u(t,r),a=u(n,r),s=c(a-i),l=Array(s),h=0;s>h;h++)l[h]="String"==e?this.charAt(i+h):this[i+h];return l}})},{106:106,109:109,19:19,33:33,35:35,42:42}],140:[function(t,n,r){"use strict";var e=t(33),i=t(13)(3);e(e.P+e.F*!t(97)([].some,!0),"Array",{some:function some(t){return i(this,t,arguments[1])}})},{13:13,33:33,97:97}],141:[function(t,n,r){"use strict";var e=t(33),i=t(4),o=t(110),u=t(35),c=[].sort,f=[1,2,3];e(e.P+e.F*(u(function(){f.sort(void 0)})||!u(function(){f.sort(null)})||!t(97)(c)),"Array",{sort:function sort(t){return void 0===t?c.call(o(this)):c.call(o(this),i(t))}})},{110:110,33:33,35:35,4:4,97:97}],142:[function(t,n,r){t(92)("Array")},{92:92}],143:[function(t,n,r){var e=t(33);e(e.S,"Date",{now:function(){return(new Date).getTime()}})},{33:33}],144:[function(t,n,r){"use strict";var e=t(33),i=t(35),o=Date.prototype.getTime,u=function(t){return t>9?t:"0"+t};e(e.P+e.F*(i(function(){return"0385-07-25T07:06:39.999Z"!=new Date(-5e13-1).toISOString()})||!i(function(){new Date(NaN).toISOString()})),"Date",{toISOString:function toISOString(){if(!isFinite(o.call(this)))throw RangeError("Invalid time value");var t=this,n=t.getUTCFullYear(),r=t.getUTCMilliseconds(),e=0>n?"-":n>9999?"+":"";return e+("00000"+Math.abs(n)).slice(e?-6:-4)+"-"+u(t.getUTCMonth()+1)+"-"+u(t.getUTCDate())+"T"+u(t.getUTCHours())+":"+u(t.getUTCMinutes())+":"+u(t.getUTCSeconds())+"."+(r>99?r:"0"+u(r))+"Z"}})},{33:33,35:35}],145:[function(t,n,r){"use strict";var e=t(33),i=t(110),o=t(111);e(e.P+e.F*t(35)(function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})}),"Date",{toJSON:function toJSON(t){var n=i(this),r=o(n);return"number"!=typeof r||isFinite(r)?n.toISOString():null}})},{110:110,111:111,33:33,35:35}],146:[function(t,n,r){var e=t(118)("toPrimitive"),i=Date.prototype;e in i||t(41)(i,e,t(27))},{118:118,27:27,41:41}],147:[function(t,n,r){var e=Date.prototype,i="Invalid Date",o="toString",u=e[o],c=e.getTime;new Date(NaN)+""!=i&&t(88)(e,o,function toString(){var t=c.call(this);return t===t?u.call(this):i})},{88:88}],148:[function(t,n,r){var e=t(33);e(e.P,"Function",{bind:t(17)})},{17:17,33:33}],149:[function(t,n,r){"use strict";var e=t(50),i=t(75),o=t(118)("hasInstance"),u=Function.prototype;o in u||t(68).f(u,o,{value:function(t){if("function"!=typeof this||!e(t))return!1;if(!e(this.prototype))return t instanceof this;for(;t=i(t);)if(this.prototype===t)return!0;return!1}})},{118:118,50:50,68:68,75:75}],150:[function(t,n,r){var e=t(68).f,i=t(86),o=t(40),u=Function.prototype,c=/^\s*function ([^ (]*)/,f="name",a=Object.isExtensible||function(){return!0};f in u||t(29)&&e(u,f,{configurable:!0,get:function(){try{var t=this,n=(""+t).match(c)[1];return o(t,f)||!a(t)||e(t,f,i(5,n)),n}catch(r){return""}}})},{29:29,40:40,68:68,86:86}],151:[function(t,n,r){"use strict";var e=t(20);n.exports=t(23)("Map",function(t){return function Map(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function get(t){var n=e.getEntry(this,t);return n&&n.v},set:function set(t,n){return e.def(this,0===t?0:t,n)}},e,!0)},{20:20,23:23}],152:[function(t,n,r){var e=t(33),i=t(61),o=Math.sqrt,u=Math.acosh;e(e.S+e.F*!(u&&710==Math.floor(u(Number.MAX_VALUE))&&u(1/0)==1/0),"Math",{acosh:function acosh(t){return(t=+t)<1?NaN:t>94906265.62425156?Math.log(t)+Math.LN2:i(t-1+o(t-1)*o(t+1))}})},{33:33,61:61}],153:[function(t,n,r){function asinh(t){return isFinite(t=+t)&&0!=t?0>t?-asinh(-t):Math.log(t+Math.sqrt(t*t+1)):t}var e=t(33),i=Math.asinh;e(e.S+e.F*!(i&&1/i(0)>0),"Math",{asinh:asinh})},{33:33}],154:[function(t,n,r){var e=t(33),i=Math.atanh;e(e.S+e.F*!(i&&1/i(-0)<0),"Math",{atanh:function atanh(t){return 0==(t=+t)?t:Math.log((1+t)/(1-t))/2}})},{33:33}],155:[function(t,n,r){var e=t(33),i=t(62);e(e.S,"Math",{cbrt:function cbrt(t){return i(t=+t)*Math.pow(Math.abs(t),1/3)}})},{33:33,62:62}],156:[function(t,n,r){var e=t(33);e(e.S,"Math",{clz32:function clz32(t){return(t>>>=0)?31-Math.floor(Math.log(t+.5)*Math.LOG2E):32}})},{33:33}],157:[function(t,n,r){var e=t(33),i=Math.exp;e(e.S,"Math",{cosh:function cosh(t){return(i(t=+t)+i(-t))/2}})},{33:33}],158:[function(t,n,r){var e=t(33),i=t(60);e(e.S+e.F*(i!=Math.expm1),"Math",{expm1:i})},{33:33,60:60}],159:[function(t,n,r){var e=t(33),i=t(62),o=Math.pow,u=o(2,-52),c=o(2,-23),f=o(2,127)*(2-c),a=o(2,-126),s=function(t){return t+1/u-1/u};e(e.S,"Math",{fround:function fround(t){var n,r,e=Math.abs(t),o=i(t);return a>e?o*s(e/a/c)*a*c:(n=(1+c/u)*e,r=n-(n-e),r>f||r!=r?o*(1/0):o*r)}})},{33:33,62:62}],160:[function(t,n,r){var e=t(33),i=Math.abs;e(e.S,"Math",{hypot:function hypot(t,n){for(var r,e,o=0,u=0,c=arguments.length,f=0;c>u;)r=i(arguments[u++]),r>f?(e=f/r,o=o*e*e+1,f=r):r>0?(e=r/f,o+=e*e):o+=r;return f===1/0?1/0:f*Math.sqrt(o)}})},{33:33}],161:[function(t,n,r){var e=t(33),i=Math.imul;e(e.S+e.F*t(35)(function(){return-5!=i(4294967295,5)||2!=i.length}),"Math",{imul:function imul(t,n){var r=65535,e=+t,i=+n,o=r&e,u=r&i;return 0|o*u+((r&e>>>16)*u+o*(r&i>>>16)<<16>>>0)}})},{33:33,35:35}],162:[function(t,n,r){var e=t(33);e(e.S,"Math",{log10:function log10(t){return Math.log(t)/Math.LN10}})},{33:33}],163:[function(t,n,r){var e=t(33);e(e.S,"Math",{log1p:t(61)})},{33:33,61:61}],164:[function(t,n,r){var e=t(33);e(e.S,"Math",{log2:function log2(t){return Math.log(t)/Math.LN2}})},{33:33}],165:[function(t,n,r){var e=t(33);e(e.S,"Math",{sign:t(62)})},{33:33,62:62}],166:[function(t,n,r){var e=t(33),i=t(60),o=Math.exp;e(e.S+e.F*t(35)(function(){return-2e-17!=!Math.sinh(-2e-17)}),"Math",{sinh:function sinh(t){return Math.abs(t=+t)<1?(i(t)-i(-t))/2:(o(t-1)-o(-t-1))*(Math.E/2)}})},{33:33,35:35,60:60}],167:[function(t,n,r){var e=t(33),i=t(60),o=Math.exp;e(e.S,"Math",{tanh:function tanh(t){var n=i(t=+t),r=i(-t);return n==1/0?1:r==1/0?-1:(n-r)/(o(t)+o(-t))}})},{33:33,60:60}],168:[function(t,n,r){var e=t(33);e(e.S,"Math",{trunc:function trunc(t){return(t>0?Math.floor:Math.ceil)(t)}})},{33:33}],169:[function(t,n,r){"use strict";var e=t(39),i=t(40),o=t(19),u=t(44),c=t(111),f=t(35),a=t(73).f,s=t(71).f,l=t(68).f,h=t(103).trim,v="Number",p=e[v],d=p,y=p.prototype,g=o(t(67)(y))==v,x="trim"in String.prototype,m=function(t){var n=c(t,!1);if("string"==typeof n&&n.length>2){n=x?n.trim():h(n,3);var r,e,i,o=n.charCodeAt(0);if(43===o||45===o){if(r=n.charCodeAt(2),88===r||120===r)return NaN}else if(48===o){switch(n.charCodeAt(1)){case 66:case 98:e=2,i=49;break;case 79:case 111:e=8,i=55;break;default:return+n}for(var u,f=n.slice(2),a=0,s=f.length;s>a;a++)if(u=f.charCodeAt(a),48>u||u>i)return NaN;return parseInt(f,e)}}return+n};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function Number(t){var n=arguments.length<1?0:t,r=this;return r instanceof p&&(g?f(function(){y.valueOf.call(r)}):o(r)!=v)?u(new d(m(n)),r,p):m(n)};for(var b,w=t(29)?a(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;w.length>S;S++)i(d,b=w[S])&&!i(p,b)&&l(p,b,s(d,b));p.prototype=y,y.constructor=p,t(88)(e,v,p)}},{103:103,111:111,19:19,29:29,35:35,39:39,40:40,44:44,67:67,68:68,71:71,73:73,88:88}],170:[function(t,n,r){var e=t(33);e(e.S,"Number",{EPSILON:Math.pow(2,-52)})},{33:33}],171:[function(t,n,r){var e=t(33),i=t(39).isFinite;e(e.S,"Number",{isFinite:function isFinite(t){return"number"==typeof t&&i(t)}})},{33:33,39:39}],172:[function(t,n,r){var e=t(33);e(e.S,"Number",{isInteger:t(49)})},{33:33,49:49}],173:[function(t,n,r){var e=t(33);e(e.S,"Number",{isNaN:function isNaN(t){return t!=t}})},{33:33}],174:[function(t,n,r){var e=t(33),i=t(49),o=Math.abs;e(e.S,"Number",{isSafeInteger:function isSafeInteger(t){return i(t)&&o(t)<=9007199254740991}})},{33:33,49:49}],175:[function(t,n,r){var e=t(33);e(e.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},{33:33}],176:[function(t,n,r){var e=t(33);e(e.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},{33:33}],177:[function(t,n,r){var e=t(33),i=t(82);e(e.S+e.F*(Number.parseFloat!=i),"Number",{parseFloat:i})},{33:33,82:82}],178:[function(t,n,r){var e=t(33),i=t(83);e(e.S+e.F*(Number.parseInt!=i),"Number",{parseInt:i})},{33:33,83:83}],179:[function(t,n,r){"use strict";var e=t(33),i=(t(7),t(107)),o=t(5),u=t(102),c=1..toFixed,f=Math.floor,a=[0,0,0,0,0,0],s="Number.toFixed: incorrect invocation!",l="0",h=function(t,n){for(var r=-1,e=n;++r<6;)e+=t*a[r],a[r]=e%1e7,e=f(e/1e7)},v=function(t){for(var n=6,r=0;--n>=0;)r+=a[n],a[n]=f(r/t),r=r%t*1e7},p=function(){for(var t=6,n="";--t>=0;)if(""!==n||0===t||0!==a[t]){var r=String(a[t]);n=""===n?r:n+u.call(l,7-r.length)+r}return n},d=function(t,n,r){return 0===n?r:n%2===1?d(t,n-1,r*t):d(t*t,n/2,r)},y=function(t){for(var n=0,r=t;r>=4096;)n+=12,r/=4096;for(;r>=2;)n+=1,r/=2;return n};e(e.P+e.F*(!!c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==0xde0b6b3a7640080.toFixed(0))||!t(35)(function(){c.call({})})),"Number",{toFixed:function toFixed(t){var n,r,e,c,f=o(this,s),a=i(t),g="",x=l;if(0>a||a>20)throw RangeError(s);if(f!=f)return"NaN";if(-1e21>=f||f>=1e21)return String(f);if(0>f&&(g="-",f=-f),f>1e-21)if(n=y(f*d(2,69,1))-69,r=0>n?f*d(2,-n,1):f/d(2,n,1),r*=4503599627370496,n=52-n,n>0){for(h(0,r),e=a;e>=7;)h(1e7,0),e-=7;for(h(d(10,e,1),0),e=n-1;e>=23;)v(1<<23),e-=23;v(1<<e),h(1,1),v(2),x=p()}else h(0,r),h(1<<-n,0),x=p()+u.call(l,a);return a>0?(c=x.length,x=g+(a>=c?"0."+u.call(l,a-c)+x:x.slice(0,c-a)+"."+x.slice(c-a))):x=g+x,x}})},{102:102,107:107,33:33,35:35,5:5,7:7}],180:[function(t,n,r){"use strict";var e=t(33),i=t(35),o=t(5),u=1..toPrecision;e(e.P+e.F*(i(function(){return"1"!==u.call(1,void 0)})||!i(function(){u.call({})})),"Number",{toPrecision:function toPrecision(t){var n=o(this,"Number#toPrecision: incorrect invocation!");return void 0===t?u.call(n):u.call(n,t)}})},{33:33,35:35,5:5}],181:[function(t,n,r){var e=t(33);e(e.S+e.F,"Object",{assign:t(66)})},{33:33,66:66}],182:[function(t,n,r){var e=t(33);e(e.S,"Object",{create:t(67)})},{33:33,67:67}],183:[function(t,n,r){var e=t(33);e(e.S+e.F*!t(29),"Object",{defineProperties:t(69)})},{29:29,33:33,69:69}],184:[function(t,n,r){var e=t(33);e(e.S+e.F*!t(29),"Object",{defineProperty:t(68).f})},{29:29,33:33,68:68}],185:[function(t,n,r){var e=t(50),i=t(63).onFreeze;t(79)("freeze",function(t){return function freeze(n){return t&&e(n)?t(i(n)):n}})},{50:50,63:63,79:79}],186:[function(t,n,r){var e=t(108),i=t(71).f;t(79)("getOwnPropertyDescriptor",function(){return function getOwnPropertyDescriptor(t,n){return i(e(t),n)}})},{108:108,71:71,79:79}],187:[function(t,n,r){t(79)("getOwnPropertyNames",function(){return t(72).f})},{72:72,79:79}],188:[function(t,n,r){var e=t(110),i=t(75);t(79)("getPrototypeOf",function(){return function getPrototypeOf(t){return i(e(t))}})},{110:110,75:75,79:79}],189:[function(t,n,r){var e=t(50);t(79)("isExtensible",function(t){return function isExtensible(n){return e(n)?t?t(n):!0:!1}})},{50:50,79:79}],190:[function(t,n,r){var e=t(50);t(79)("isFrozen",function(t){return function isFrozen(n){return e(n)?t?t(n):!1:!0}})},{50:50,79:79}],191:[function(t,n,r){var e=t(50);t(79)("isSealed",function(t){return function isSealed(n){return e(n)?t?t(n):!1:!0}})},{50:50,79:79}],192:[function(t,n,r){var e=t(33);e(e.S,"Object",{is:t(90)})},{33:33,90:90}],193:[function(t,n,r){var e=t(110),i=t(77);t(79)("keys",function(){return function keys(t){return i(e(t))}})},{110:110,77:77,79:79}],194:[function(t,n,r){var e=t(50),i=t(63).onFreeze;t(79)("preventExtensions",function(t){return function preventExtensions(n){return t&&e(n)?t(i(n)):n}})},{50:50,63:63,79:79}],195:[function(t,n,r){var e=t(50),i=t(63).onFreeze;t(79)("seal",function(t){return function seal(n){return t&&e(n)?t(i(n)):n}})},{50:50,63:63,79:79}],196:[function(t,n,r){var e=t(33);e(e.S,"Object",{setPrototypeOf:t(91).set})},{33:33,91:91}],197:[function(t,n,r){"use strict";var e=t(18),i={};i[t(118)("toStringTag")]="z",i+""!="[object z]"&&t(88)(Object.prototype,"toString",function toString(){return"[object "+e(this)+"]"},!0)},{118:118,18:18,88:88}],198:[function(t,n,r){var e=t(33),i=t(82);e(e.G+e.F*(parseFloat!=i),{parseFloat:i})},{33:33,82:82}],199:[function(t,n,r){var e=t(33),i=t(83);e(e.G+e.F*(parseInt!=i),{parseInt:i})},{33:33,83:83}],200:[function(t,n,r){"use strict";var e,i,o,u=t(59),c=t(39),f=t(26),a=t(18),s=t(33),l=t(50),h=(t(8),t(4)),v=t(7),p=t(38),d=(t(91).set,t(96)),y=t(105).set,g=t(65)(),x="Promise",m=c.TypeError,b=c.process,w=c[x],b=c.process,S="process"==a(b),_=function(){},E=!!function(){try{var n=w.resolve(1),r=(n.constructor={})[t(118)("species")]=function(t){t(_,_)};return(S||"function"==typeof PromiseRejectionEvent)&&n.then(_)instanceof r}catch(e){}}(),O=function(t,n){return t===n||t===w&&n===o},F=function(t){var n;return l(t)&&"function"==typeof(n=t.then)?n:!1},P=function(t){return O(w,t)?new M(t):new i(t)},M=i=function(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw m("Bad Promise constructor");n=t,r=e}),this.resolve=h(n),this.reject=h(r)},A=function(t){try{t()}catch(n){return{error:n}}},I=function(t,n){if(!t._n){t._n=!0;var r=t._c;g(function(){for(var e=t._v,i=1==t._s,o=0,u=function(n){var r,o,u=i?n.ok:n.fail,c=n.resolve,f=n.reject,a=n.domain;try{u?(i||(2==t._h&&k(t),t._h=1),u===!0?r=e:(a&&a.enter(),r=u(e),a&&a.exit()),r===n.promise?f(m("Promise-chain cycle")):(o=F(r))?o.call(r,c,f):c(r)):f(e)}catch(s){f(s)}};r.length>o;)u(r[o++]);t._c=[],t._n=!1,n&&!t._h&&j(t)})}},j=function(t){y.call(c,function(){var n,r,e,i=t._v;if(N(t)&&(n=A(function(){S?b.emit("unhandledRejection",i,t):(r=c.onunhandledrejection)?r({promise:t,reason:i}):(e=c.console)&&e.error&&e.error("Unhandled promise rejection",i)}),t._h=S||N(t)?2:1),t._a=void 0,n)throw n.error})},N=function(t){if(1==t._h)return!1;for(var n,r=t._a||t._c,e=0;r.length>e;)if(n=r[e++],n.fail||!N(n.promise))return!1;return!0},k=function(t){y.call(c,function(){var n;S?b.emit("rejectionHandled",t):(n=c.onrejectionhandled)&&n({promise:t,reason:t._v})})},R=function(t){var n=this;n._d||(n._d=!0,n=n._w||n,n._v=t,n._s=2,n._a||(n._a=n._c.slice()),I(n,!0))},T=function(t){var n,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw m("Promise can't be resolved itself");(n=F(t))?g(function(){var e={_w:r,_d:!1};try{n.call(t,f(T,e,1),f(R,e,1))}catch(i){R.call(e,i)}}):(r._v=t,r._s=1,I(r,!1))}catch(e){R.call({_w:r,_d:!1},e)}}};E||(w=function Promise(t){v(this,w,x,"_h"),h(t),e.call(this);try{t(f(T,this,1),f(R,this,1))}catch(n){R.call(this,n)}},e=function Promise(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},e.prototype=t(87)(w.prototype,{then:function then(t,n){var r=P(d(this,w));return r.ok="function"==typeof t?t:!0,r.fail="function"==typeof n&&n,r.domain=S?b.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&I(this,!1),r.promise},"catch":function(t){return this.then(void 0,t)}}),M=function(){var t=new e;this.promise=t,this.resolve=f(T,t,1),this.reject=f(R,t,1)}),s(s.G+s.W+s.F*!E,{Promise:w}),t(93)(w,x),t(92)(x),o=t(24)[x],s(s.S+s.F*!E,x,{reject:function reject(t){var n=P(this),r=n.reject;return r(t),n.promise}}),s(s.S+s.F*(u||!E),x,{resolve:function resolve(t){if(t instanceof w&&O(t.constructor,this))return t;var n=P(this),r=n.resolve;return r(t),n.promise}}),s(s.S+s.F*!(E&&t(55)(function(t){w.all(t)["catch"](_)})),x,{all:function all(t){var n=this,r=P(n),e=r.resolve,i=r.reject,o=A(function(){var r=[],o=0,u=1;p(t,!1,function(t){var c=o++,f=!1;r.push(void 0),u++,n.resolve(t).then(function(t){f||(f=!0,r[c]=t,--u||e(r))},i)}),--u||e(r)});return o&&i(o.error),r.promise},race:function race(t){var n=this,r=P(n),e=r.reject,i=A(function(){p(t,!1,function(t){n.resolve(t).then(r.resolve,e)})});return i&&e(i.error),r.promise}})},{105:105,118:118,18:18,24:24,26:26,33:33,38:38,39:39,4:4,50:50,55:55,59:59,65:65,7:7,8:8,87:87,91:91,92:92,93:93,96:96}],201:[function(t,n,r){var e=t(33),i=Function.apply;e(e.S,"Reflect",{apply:function apply(t,n,r){return i.call(t,n,r)}})},{33:33}],202:[function(t,n,r){var e=t(33),i=t(67),o=t(4),u=t(8),c=t(50),f=t(17);e(e.S+e.F*t(35)(function(){function F(){}return!(Reflect.construct(function(){},[],F)instanceof F)}),"Reflect",{construct:function construct(t,n){o(t);var r=arguments.length<3?t:o(arguments[2]);if(t==r){if(void 0!=n)switch(u(n).length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3])}var e=[null];return e.push.apply(e,n),new(f.apply(t,e))}var a=r.prototype,s=i(c(a)?a:Object.prototype),l=Function.apply.call(t,s,n);return c(l)?l:s}})},{17:17,33:33,35:35,4:4,50:50,67:67,8:8}],203:[function(t,n,r){var e=t(68),i=t(33),o=t(8),u=t(111);i(i.S+i.F*t(35)(function(){Reflect.defineProperty(e.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function defineProperty(t,n,r){o(t),n=u(n,!0),o(r);try{return e.f(t,n,r),!0}catch(i){return!1}}})},{111:111,33:33,35:35,68:68,8:8}],204:[function(t,n,r){var e=t(33),i=t(71).f,o=t(8);e(e.S,"Reflect",{deleteProperty:function deleteProperty(t,n){var r=i(o(t),n);return r&&!r.configurable?!1:delete t[n]}})},{33:33,71:71,8:8}],205:[function(t,n,r){"use strict";var e=t(33),i=t(8),o=function(t){this._t=i(t),this._i=0;var n,r=this._k=[];for(n in t)r.push(n)};t(53)(o,"Object",function(){var t,n=this,r=n._k;do if(n._i>=r.length)return{value:void 0,done:!0};while(!((t=r[n._i++])in n._t));return{value:t,done:!1}}),e(e.S,"Reflect",{enumerate:function enumerate(t){return new o(t)}})},{33:33,53:53,8:8}],206:[function(t,n,r){var e=t(71),i=t(33),o=t(8);i(i.S,"Reflect",{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(t,n){return e.f(o(t),n)}})},{33:33,71:71,8:8}],207:[function(t,n,r){var e=t(33),i=t(75),o=t(8);e(e.S,"Reflect",{getPrototypeOf:function getPrototypeOf(t){return i(o(t))}})},{33:33,75:75,8:8}],208:[function(t,n,r){function get(t,n){var r,u,a=arguments.length<3?t:arguments[2];return f(t)===a?t[n]:(r=e.f(t,n))?o(r,"value")?r.value:void 0!==r.get?r.get.call(a):void 0:c(u=i(t))?get(u,n,a):void 0}var e=t(71),i=t(75),o=t(40),u=t(33),c=t(50),f=t(8);u(u.S,"Reflect",{get:get})},{33:33,40:40,50:50,71:71,
75:75,8:8}],209:[function(t,n,r){var e=t(33);e(e.S,"Reflect",{has:function has(t,n){return n in t}})},{33:33}],210:[function(t,n,r){var e=t(33),i=t(8),o=Object.isExtensible;e(e.S,"Reflect",{isExtensible:function isExtensible(t){return i(t),o?o(t):!0}})},{33:33,8:8}],211:[function(t,n,r){var e=t(33);e(e.S,"Reflect",{ownKeys:t(81)})},{33:33,81:81}],212:[function(t,n,r){var e=t(33),i=t(8),o=Object.preventExtensions;e(e.S,"Reflect",{preventExtensions:function preventExtensions(t){i(t);try{return o&&o(t),!0}catch(n){return!1}}})},{33:33,8:8}],213:[function(t,n,r){var e=t(33),i=t(91);i&&e(e.S,"Reflect",{setPrototypeOf:function setPrototypeOf(t,n){i.check(t,n);try{return i.set(t,n),!0}catch(r){return!1}}})},{33:33,91:91}],214:[function(t,n,r){function set(t,n,r){var c,l,h=arguments.length<4?t:arguments[3],v=i.f(a(t),n);if(!v){if(s(l=o(t)))return set(l,n,r,h);v=f(0)}return u(v,"value")?v.writable!==!1&&s(h)?(c=i.f(h,n)||f(0),c.value=r,e.f(h,n,c),!0):!1:void 0===v.set?!1:(v.set.call(h,r),!0)}var e=t(68),i=t(71),o=t(75),u=t(40),c=t(33),f=t(86),a=t(8),s=t(50);c(c.S,"Reflect",{set:set})},{33:33,40:40,50:50,68:68,71:71,75:75,8:8,86:86}],215:[function(t,n,r){var e=t(39),i=t(44),o=t(68).f,u=t(73).f,c=t(51),f=t(37),a=e.RegExp,s=a,l=a.prototype,h=/a/g,v=/a/g,p=new a(h)!==h;if(t(29)&&(!p||t(35)(function(){return v[t(118)("match")]=!1,a(h)!=h||a(v)==v||"/a/i"!=a(h,"i")}))){a=function RegExp(t,n){var r=this instanceof a,e=c(t),o=void 0===n;return!r&&e&&t.constructor===a&&o?t:i(p?new s(e&&!o?t.source:t,n):s((e=t instanceof a)?t.source:t,e&&o?f.call(t):n),r?this:l,a)};for(var d=(function(t){t in a||o(a,t,{configurable:!0,get:function(){return s[t]},set:function(n){s[t]=n}})}),y=u(s),g=0;y.length>g;)d(y[g++]);l.constructor=a,a.prototype=l,t(88)(e,"RegExp",a)}t(92)("RegExp")},{118:118,29:29,35:35,37:37,39:39,44:44,51:51,68:68,73:73,88:88,92:92}],216:[function(t,n,r){t(29)&&"g"!=/./g.flags&&t(68).f(RegExp.prototype,"flags",{configurable:!0,get:t(37)})},{29:29,37:37,68:68}],217:[function(t,n,r){t(36)("match",1,function(t,n,r){return[function match(r){"use strict";var e=t(this),i=void 0==r?void 0:r[n];return void 0!==i?i.call(r,e):new RegExp(r)[n](String(e))},r]})},{36:36}],218:[function(t,n,r){t(36)("replace",2,function(t,n,r){return[function replace(e,i){"use strict";var o=t(this),u=void 0==e?void 0:e[n];return void 0!==u?u.call(e,o,i):r.call(String(o),e,i)},r]})},{36:36}],219:[function(t,n,r){t(36)("search",1,function(t,n,r){return[function search(r){"use strict";var e=t(this),i=void 0==r?void 0:r[n];return void 0!==i?i.call(r,e):new RegExp(r)[n](String(e))},r]})},{36:36}],220:[function(t,n,r){t(36)("split",2,function(n,r,e){"use strict";var i=t(51),o=e,u=[].push,c="split",f="length",a="lastIndex";if("c"=="abbc"[c](/(b)*/)[1]||4!="test"[c](/(?:)/,-1)[f]||2!="ab"[c](/(?:ab)*/)[f]||4!="."[c](/(.?)(.?)/)[f]||"."[c](/()()/)[f]>1||""[c](/.?/)[f]){var s=void 0===/()??/.exec("")[1];e=function(t,n){var r=String(this);if(void 0===t&&0===n)return[];if(!i(t))return o.call(r,t,n);var e,c,l,h,v,p=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),y=0,g=void 0===n?4294967295:n>>>0,x=new RegExp(t.source,d+"g");for(s||(e=new RegExp("^"+x.source+"$(?!\\s)",d));(c=x.exec(r))&&(l=c.index+c[0][f],!(l>y&&(p.push(r.slice(y,c.index)),!s&&c[f]>1&&c[0].replace(e,function(){for(v=1;v<arguments[f]-2;v++)void 0===arguments[v]&&(c[v]=void 0)}),c[f]>1&&c.index<r[f]&&u.apply(p,c.slice(1)),h=c[0][f],y=l,p[f]>=g)));)x[a]===c.index&&x[a]++;return y===r[f]?!h&&x.test("")||p.push(""):p.push(r.slice(y)),p[f]>g?p.slice(0,g):p}}else"0"[c](void 0,0)[f]&&(e=function(t,n){return void 0===t&&0===n?[]:o.call(this,t,n)});return[function split(t,i){var o=n(this),u=void 0==t?void 0:t[r];return void 0!==u?u.call(t,o,i):e.call(String(o),t,i)},e]})},{36:36,51:51}],221:[function(t,n,r){"use strict";t(216);var e=t(8),i=t(37),o=t(29),u="toString",c=/./[u],f=function(n){t(88)(RegExp.prototype,u,n,!0)};t(35)(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?f(function toString(){var t=e(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?i.call(t):void 0)}):c.name!=u&&f(function toString(){return c.call(this)})},{216:216,29:29,35:35,37:37,8:8,88:88}],222:[function(t,n,r){"use strict";var e=t(20);n.exports=t(23)("Set",function(t){return function Set(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function add(t){return e.def(this,t=0===t?0:t,t)}},e)},{20:20,23:23}],223:[function(t,n,r){"use strict";t(100)("anchor",function(t){return function anchor(n){return t(this,"a","name",n)}})},{100:100}],224:[function(t,n,r){"use strict";t(100)("big",function(t){return function big(){return t(this,"big","","")}})},{100:100}],225:[function(t,n,r){"use strict";t(100)("blink",function(t){return function blink(){return t(this,"blink","","")}})},{100:100}],226:[function(t,n,r){"use strict";t(100)("bold",function(t){return function bold(){return t(this,"b","","")}})},{100:100}],227:[function(t,n,r){"use strict";var e=t(33),i=t(98)(!1);e(e.P,"String",{codePointAt:function codePointAt(t){return i(this,t)}})},{33:33,98:98}],228:[function(t,n,r){"use strict";var e=t(33),i=t(109),o=t(99),u="endsWith",c=""[u];e(e.P+e.F*t(34)(u),"String",{endsWith:function endsWith(t){var n=o(this,t,u),r=arguments.length>1?arguments[1]:void 0,e=i(n.length),f=void 0===r?e:Math.min(i(r),e),a=String(t);return c?c.call(n,a,f):n.slice(f-a.length,f)===a}})},{109:109,33:33,34:34,99:99}],229:[function(t,n,r){"use strict";t(100)("fixed",function(t){return function fixed(){return t(this,"tt","","")}})},{100:100}],230:[function(t,n,r){"use strict";t(100)("fontcolor",function(t){return function fontcolor(n){return t(this,"font","color",n)}})},{100:100}],231:[function(t,n,r){"use strict";t(100)("fontsize",function(t){return function fontsize(n){return t(this,"font","size",n)}})},{100:100}],232:[function(t,n,r){var e=t(33),i=t(106),o=String.fromCharCode,u=String.fromCodePoint;e(e.S+e.F*(!!u&&1!=u.length),"String",{fromCodePoint:function fromCodePoint(t){for(var n,r=[],e=arguments.length,u=0;e>u;){if(n=+arguments[u++],i(n,1114111)!==n)throw RangeError(n+" is not a valid code point");r.push(65536>n?o(n):o(((n-=65536)>>10)+55296,n%1024+56320))}return r.join("")}})},{106:106,33:33}],233:[function(t,n,r){"use strict";var e=t(33),i=t(99),o="includes";e(e.P+e.F*t(34)(o),"String",{includes:function includes(t){return!!~i(this,t,o).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},{33:33,34:34,99:99}],234:[function(t,n,r){"use strict";t(100)("italics",function(t){return function italics(){return t(this,"i","","")}})},{100:100}],235:[function(t,n,r){"use strict";var e=t(98)(!0);t(54)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,r=this._i;return r>=n.length?{value:void 0,done:!0}:(t=e(n,r),this._i+=t.length,{value:t,done:!1})})},{54:54,98:98}],236:[function(t,n,r){"use strict";t(100)("link",function(t){return function link(n){return t(this,"a","href",n)}})},{100:100}],237:[function(t,n,r){var e=t(33),i=t(108),o=t(109);e(e.S,"String",{raw:function raw(t){for(var n=i(t.raw),r=o(n.length),e=arguments.length,u=[],c=0;r>c;)u.push(String(n[c++])),e>c&&u.push(String(arguments[c]));return u.join("")}})},{108:108,109:109,33:33}],238:[function(t,n,r){var e=t(33);e(e.P,"String",{repeat:t(102)})},{102:102,33:33}],239:[function(t,n,r){"use strict";t(100)("small",function(t){return function small(){return t(this,"small","","")}})},{100:100}],240:[function(t,n,r){"use strict";var e=t(33),i=t(109),o=t(99),u="startsWith",c=""[u];e(e.P+e.F*t(34)(u),"String",{startsWith:function startsWith(t){var n=o(this,t,u),r=i(Math.min(arguments.length>1?arguments[1]:void 0,n.length)),e=String(t);return c?c.call(n,e,r):n.slice(r,r+e.length)===e}})},{109:109,33:33,34:34,99:99}],241:[function(t,n,r){"use strict";t(100)("strike",function(t){return function strike(){return t(this,"strike","","")}})},{100:100}],242:[function(t,n,r){"use strict";t(100)("sub",function(t){return function sub(){return t(this,"sub","","")}})},{100:100}],243:[function(t,n,r){"use strict";t(100)("sup",function(t){return function sup(){return t(this,"sup","","")}})},{100:100}],244:[function(t,n,r){"use strict";t(103)("trim",function(t){return function trim(){return t(this,3)}})},{103:103}],245:[function(t,n,r){"use strict";var e=t(39),i=t(40),o=t(29),u=t(33),c=t(88),f=t(63).KEY,a=t(35),s=t(95),l=t(93),h=t(115),v=t(118),p=t(117),d=t(116),y=t(58),g=t(32),x=t(48),m=t(8),b=t(108),w=t(111),S=t(86),_=t(67),E=t(72),O=t(71),F=t(68),P=t(77),M=O.f,A=F.f,I=E.f,j=e.Symbol,N=e.JSON,k=N&&N.stringify,R="prototype",T=v("_hidden"),L=v("toPrimitive"),C={}.propertyIsEnumerable,U=s("symbol-registry"),D=s("symbols"),G=Object[R],W="function"==typeof j,B=e.QObject,V=!B||!B[R]||!B[R].findChild,z=o&&a(function(){return 7!=_(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(t,n,r){var e=M(G,n);e&&delete G[n],A(t,n,r),e&&t!==G&&A(G,n,e)}:A,J=function(t){var n=D[t]=_(j[R]);return n._k=t,n},K=W&&"symbol"==typeof j.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof j},Y=function defineProperty(t,n,r){return m(t),n=w(n,!0),m(r),i(D,n)?(r.enumerable?(i(t,T)&&t[T][n]&&(t[T][n]=!1),r=_(r,{enumerable:S(0,!1)})):(i(t,T)||A(t,T,S(1,{})),t[T][n]=!0),z(t,n,r)):A(t,n,r)},q=function defineProperties(t,n){m(t);for(var r,e=g(n=b(n)),i=0,o=e.length;o>i;)Y(t,r=e[i++],n[r]);return t},X=function create(t,n){return void 0===n?_(t):q(_(t),n)},$=function propertyIsEnumerable(t){var n=C.call(this,t=w(t,!0));return n||!i(this,t)||!i(D,t)||i(this,T)&&this[T][t]?n:!0},H=function getOwnPropertyDescriptor(t,n){var r=M(t=b(t),n=w(n,!0));return!r||!i(D,n)||i(t,T)&&t[T][n]||(r.enumerable=!0),r},Z=function getOwnPropertyNames(t){for(var n,r=I(b(t)),e=[],o=0;r.length>o;)i(D,n=r[o++])||n==T||n==f||e.push(n);return e},Q=function getOwnPropertySymbols(t){for(var n,r=I(b(t)),e=[],o=0;r.length>o;)i(D,n=r[o++])&&e.push(D[n]);return e};W||(j=function Symbol(){if(this instanceof j)throw TypeError("Symbol is not a constructor!");var t=h(arguments.length>0?arguments[0]:void 0);return o&&V&&z(G,t,{configurable:!0,set:function(n){i(this,T)&&i(this[T],t)&&(this[T][t]=!1),z(this,t,S(1,n))}}),J(t)},c(j[R],"toString",function toString(){return this._k}),O.f=H,F.f=Y,t(73).f=E.f=Z,t(78).f=$,t(74).f=Q,o&&!t(59)&&c(G,"propertyIsEnumerable",$,!0),p.f=function(t){return J(v(t))}),u(u.G+u.W+u.F*!W,{Symbol:j});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;tt.length>nt;)v(tt[nt++]);for(var tt=P(v.store),nt=0;tt.length>nt;)d(tt[nt++]);u(u.S+u.F*!W,"Symbol",{"for":function(t){return i(U,t+="")?U[t]:U[t]=j(t)},keyFor:function keyFor(t){if(K(t))return y(U,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),u(u.S+u.F*!W,"Object",{create:X,defineProperty:Y,defineProperties:q,getOwnPropertyDescriptor:H,getOwnPropertyNames:Z,getOwnPropertySymbols:Q}),N&&u(u.S+u.F*(!W||a(function(){var t=j();return"[null]"!=k([t])||"{}"!=k({a:t})||"{}"!=k(Object(t))})),"JSON",{stringify:function stringify(t){if(void 0!==t&&!K(t)){for(var n,r,e=[t],i=1;arguments.length>i;)e.push(arguments[i++]);return n=e[1],"function"==typeof n&&(r=n),!r&&x(n)||(n=function(t,n){return r&&(n=r.call(this,t,n)),K(n)?void 0:n}),e[1]=n,k.apply(N,e)}}}),j[R][L]||t(41)(j[R],L,j[R].valueOf),l(j,"Symbol"),l(Math,"Math",!0),l(e.JSON,"JSON",!0)},{108:108,111:111,115:115,116:116,117:117,118:118,29:29,32:32,33:33,35:35,39:39,40:40,41:41,48:48,58:58,59:59,63:63,67:67,68:68,71:71,72:72,73:73,74:74,77:77,78:78,8:8,86:86,88:88,93:93,95:95}],246:[function(t,n,r){"use strict";var e=t(33),i=t(114),o=t(113),u=t(8),c=t(106),f=t(109),a=t(50),s=(t(118)("typed_array"),t(39).ArrayBuffer),l=t(96),h=o.ArrayBuffer,v=o.DataView,p=i.ABV&&s.isView,d=h.prototype.slice,y=i.VIEW,g="ArrayBuffer";e(e.G+e.W+e.F*(s!==h),{ArrayBuffer:h}),e(e.S+e.F*!i.CONSTR,g,{isView:function isView(t){return p&&p(t)||a(t)&&y in t}}),e(e.P+e.U+e.F*t(35)(function(){return!new h(2).slice(1,void 0).byteLength}),g,{slice:function slice(t,n){if(void 0!==d&&void 0===n)return d.call(u(this),t);for(var r=u(this).byteLength,e=c(t,r),i=c(void 0===n?r:n,r),o=new(l(this,h))(f(i-e)),a=new v(this),s=new v(o),p=0;i>e;)s.setUint8(p++,a.getUint8(e++));return o}}),t(92)(g)},{106:106,109:109,113:113,114:114,118:118,33:33,35:35,39:39,50:50,8:8,92:92,96:96}],247:[function(t,n,r){var e=t(33);e(e.G+e.W+e.F*!t(114).ABV,{DataView:t(113).DataView})},{113:113,114:114,33:33}],248:[function(t,n,r){t(112)("Float32",4,function(t){return function Float32Array(n,r,e){return t(this,n,r,e)}})},{112:112}],249:[function(t,n,r){t(112)("Float64",8,function(t){return function Float64Array(n,r,e){return t(this,n,r,e)}})},{112:112}],250:[function(t,n,r){t(112)("Int16",2,function(t){return function Int16Array(n,r,e){return t(this,n,r,e)}})},{112:112}],251:[function(t,n,r){t(112)("Int32",4,function(t){return function Int32Array(n,r,e){return t(this,n,r,e)}})},{112:112}],252:[function(t,n,r){t(112)("Int8",1,function(t){return function Int8Array(n,r,e){return t(this,n,r,e)}})},{112:112}],253:[function(t,n,r){t(112)("Uint16",2,function(t){return function Uint16Array(n,r,e){return t(this,n,r,e)}})},{112:112}],254:[function(t,n,r){t(112)("Uint32",4,function(t){return function Uint32Array(n,r,e){return t(this,n,r,e)}})},{112:112}],255:[function(t,n,r){t(112)("Uint8",1,function(t){return function Uint8Array(n,r,e){return t(this,n,r,e)}})},{112:112}],256:[function(t,n,r){t(112)("Uint8",1,function(t){return function Uint8ClampedArray(n,r,e){return t(this,n,r,e)}},!0)},{112:112}],257:[function(t,n,r){"use strict";var e,i=t(13)(0),o=t(88),u=t(63),c=t(66),f=t(22),a=t(50),s=(t(40),u.getWeak),l=Object.isExtensible,h=f.ufstore,v={},p=function(t){return function WeakMap(){return t(this,arguments.length>0?arguments[0]:void 0)}},d={get:function get(t){if(a(t)){var n=s(t);return n===!0?h(this).get(t):n?n[this._i]:void 0}},set:function set(t,n){return f.def(this,t,n)}},y=n.exports=t(23)("WeakMap",p,d,f,!0,!0);7!=(new y).set((Object.freeze||Object)(v),7).get(v)&&(e=f.getConstructor(p),c(e.prototype,d),u.NEED=!0,i(["delete","has","get","set"],function(t){var n=y.prototype,r=n[t];o(n,t,function(n,i){if(a(n)&&!l(n)){this._f||(this._f=new e);var o=this._f[t](n,i);return"set"==t?this:o}return r.call(this,n,i)})}))},{13:13,22:22,23:23,40:40,50:50,63:63,66:66,88:88}],258:[function(t,n,r){"use strict";var e=t(22);t(23)("WeakSet",function(t){return function WeakSet(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function add(t){return e.def(this,t,!0)}},e,!1,!0)},{22:22,23:23}],259:[function(t,n,r){"use strict";var e=t(33),i=t(12)(!0);e(e.P,"Array",{includes:function includes(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(6)("includes")},{12:12,33:33,6:6}],260:[function(t,n,r){var e=t(33),i=t(65)(),o=t(39).process,u="process"==t(19)(o);e(e.G,{asap:function asap(t){var n=u&&o.domain;i(n?n.bind(t):t)}})},{19:19,33:33,39:39,65:65}],261:[function(t,n,r){var e=t(33),i=t(19);e(e.S,"Error",{isError:function isError(t){return"Error"===i(t)}})},{19:19,33:33}],262:[function(t,n,r){var e=t(33);e(e.P+e.R,"Map",{toJSON:t(21)("Map")})},{21:21,33:33}],263:[function(t,n,r){var e=t(33);e(e.S,"Math",{iaddh:function iaddh(t,n,r,e){var i=t>>>0,o=n>>>0,u=r>>>0;return o+(e>>>0)+((i&u|(i|u)&~(i+u>>>0))>>>31)|0}})},{33:33}],264:[function(t,n,r){var e=t(33);e(e.S,"Math",{imulh:function imulh(t,n){var r=65535,e=+t,i=+n,o=e&r,u=i&r,c=e>>16,f=i>>16,a=(c*u>>>0)+(o*u>>>16);return c*f+(a>>16)+((o*f>>>0)+(a&r)>>16)}})},{33:33}],265:[function(t,n,r){var e=t(33);e(e.S,"Math",{isubh:function isubh(t,n,r,e){var i=t>>>0,o=n>>>0,u=r>>>0;return o-(e>>>0)-((~i&u|~(i^u)&i-u>>>0)>>>31)|0}})},{33:33}],266:[function(t,n,r){var e=t(33);e(e.S,"Math",{umulh:function umulh(t,n){var r=65535,e=+t,i=+n,o=e&r,u=i&r,c=e>>>16,f=i>>>16,a=(c*u>>>0)+(o*u>>>16);return c*f+(a>>>16)+((o*f>>>0)+(a&r)>>>16)}})},{33:33}],267:[function(t,n,r){"use strict";var e=t(33),i=t(110),o=t(4),u=t(68);t(29)&&e(e.P+t(70),"Object",{__defineGetter__:function __defineGetter__(t,n){u.f(i(this),t,{get:o(n),enumerable:!0,configurable:!0})}})},{110:110,29:29,33:33,4:4,68:68,70:70}],268:[function(t,n,r){"use strict";var e=t(33),i=t(110),o=t(4),u=t(68);t(29)&&e(e.P+t(70),"Object",{__defineSetter__:function __defineSetter__(t,n){u.f(i(this),t,{set:o(n),enumerable:!0,configurable:!0})}})},{110:110,29:29,33:33,4:4,68:68,70:70}],269:[function(t,n,r){var e=t(33),i=t(80)(!0);e(e.S,"Object",{entries:function entries(t){return i(t)}})},{33:33,80:80}],270:[function(t,n,r){var e=t(33),i=t(81),o=t(108),u=t(71),c=t(25);e(e.S,"Object",{getOwnPropertyDescriptors:function getOwnPropertyDescriptors(t){for(var n,r=o(t),e=u.f,f=i(r),a={},s=0;f.length>s;)c(a,n=f[s++],e(r,n));return a}})},{108:108,25:25,33:33,71:71,81:81}],271:[function(t,n,r){"use strict";var e=t(33),i=t(110),o=t(111),u=t(75),c=t(71).f;t(29)&&e(e.P+t(70),"Object",{__lookupGetter__:function __lookupGetter__(t){var n,r=i(this),e=o(t,!0);do if(n=c(r,e))return n.get;while(r=u(r))}})},{110:110,111:111,29:29,33:33,70:70,71:71,75:75}],272:[function(t,n,r){"use strict";var e=t(33),i=t(110),o=t(111),u=t(75),c=t(71).f;t(29)&&e(e.P+t(70),"Object",{__lookupSetter__:function __lookupSetter__(t){var n,r=i(this),e=o(t,!0);do if(n=c(r,e))return n.set;while(r=u(r))}})},{110:110,111:111,29:29,33:33,70:70,71:71,75:75}],273:[function(t,n,r){var e=t(33),i=t(80)(!1);e(e.S,"Object",{values:function values(t){return i(t)}})},{33:33,80:80}],274:[function(t,n,r){var e=t(64),i=t(8),o=e.key,u=e.set;e.exp({defineMetadata:function defineMetadata(t,n,r,e){u(t,n,i(r),o(e))}})},{64:64,8:8}],275:[function(t,n,r){var e=t(64),i=t(8),o=e.key,u=e.map,c=e.store;e.exp({deleteMetadata:function deleteMetadata(t,n){var r=arguments.length<3?void 0:o(arguments[2]),e=u(i(n),r,!1);if(void 0===e||!e["delete"](t))return!1;if(e.size)return!0;var f=c.get(n);return f["delete"](r),!!f.size||c["delete"](n)}})},{64:64,8:8}],276:[function(t,n,r){var e=t(222),i=t(11),o=t(64),u=t(8),c=t(75),f=o.keys,a=o.key,s=function(t,n){var r=f(t,n),o=c(t);if(null===o)return r;var u=s(o,n);return u.length?r.length?i(new e(r.concat(u))):u:r};o.exp({getMetadataKeys:function getMetadataKeys(t){return s(u(t),arguments.length<2?void 0:a(arguments[1]))}})},{11:11,222:222,64:64,75:75,8:8}],277:[function(t,n,r){var e=t(64),i=t(8),o=t(75),u=e.has,c=e.get,f=e.key,a=function(t,n,r){var e=u(t,n,r);if(e)return c(t,n,r);var i=o(n);return null!==i?a(t,i,r):void 0};e.exp({getMetadata:function getMetadata(t,n){return a(t,i(n),arguments.length<3?void 0:f(arguments[2]))}})},{64:64,75:75,8:8}],278:[function(t,n,r){var e=t(64),i=t(8),o=e.keys,u=e.key;e.exp({getOwnMetadataKeys:function getOwnMetadataKeys(t){return o(i(t),arguments.length<2?void 0:u(arguments[1]))}})},{64:64,8:8}],279:[function(t,n,r){var e=t(64),i=t(8),o=e.get,u=e.key;e.exp({getOwnMetadata:function getOwnMetadata(t,n){return o(t,i(n),arguments.length<3?void 0:u(arguments[2]))}})},{64:64,8:8}],280:[function(t,n,r){var e=t(64),i=t(8),o=t(75),u=e.has,c=e.key,f=function(t,n,r){var e=u(t,n,r);if(e)return!0;var i=o(n);return null!==i?f(t,i,r):!1};e.exp({hasMetadata:function hasMetadata(t,n){return f(t,i(n),arguments.length<3?void 0:c(arguments[2]))}})},{64:64,75:75,8:8}],281:[function(t,n,r){var e=t(64),i=t(8),o=e.has,u=e.key;e.exp({hasOwnMetadata:function hasOwnMetadata(t,n){return o(t,i(n),arguments.length<3?void 0:u(arguments[2]))}})},{64:64,8:8}],282:[function(t,n,r){var e=t(64),i=t(8),o=t(4),u=e.key,c=e.set;e.exp({metadata:function metadata(t,n){return function decorator(r,e){c(t,n,(void 0!==e?i:o)(r),u(e))}}})},{4:4,64:64,8:8}],283:[function(t,n,r){var e=t(33);e(e.P+e.R,"Set",{toJSON:t(21)("Set")})},{21:21,33:33}],284:[function(t,n,r){"use strict";var e=t(33),i=t(98)(!0);e(e.P,"String",{at:function at(t){return i(this,t)}})},{33:33,98:98}],285:[function(t,n,r){"use strict";var e=t(33),i=t(28),o=t(109),u=t(51),c=t(37),f=RegExp.prototype,a=function(t,n){this._r=t,this._s=n};t(53)(a,"RegExp String",function next(){var t=this._r.exec(this._s);return{value:t,done:null===t}}),e(e.P,"String",{matchAll:function matchAll(t){if(i(this),!u(t))throw TypeError(t+" is not a regexp!");var n=String(this),r="flags"in f?String(t.flags):c.call(t),e=new RegExp(t.source,~r.indexOf("g")?r:"g"+r);return e.lastIndex=o(t.lastIndex),new a(e,n)}})},{109:109,28:28,33:33,37:37,51:51,53:53}],286:[function(t,n,r){"use strict";var e=t(33),i=t(101);e(e.P,"String",{padEnd:function padEnd(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!1)}})},{101:101,33:33}],287:[function(t,n,r){"use strict";var e=t(33),i=t(101);e(e.P,"String",{padStart:function padStart(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},{101:101,33:33}],288:[function(t,n,r){"use strict";t(103)("trimLeft",function(t){return function trimLeft(){return t(this,1)}},"trimStart")},{103:103}],289:[function(t,n,r){"use strict";t(103)("trimRight",function(t){return function trimRight(){return t(this,2)}},"trimEnd")},{103:103}],290:[function(t,n,r){t(116)("asyncIterator")},{116:116}],291:[function(t,n,r){t(116)("observable")},{116:116}],292:[function(t,n,r){var e=t(33);e(e.S,"System",{global:t(39)})},{33:33,39:39}],293:[function(t,n,r){for(var e=t(132),i=t(88),o=t(39),u=t(41),c=t(57),f=t(118),a=f("iterator"),s=f("toStringTag"),l=c.Array,h=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],v=0;5>v;v++){var p,d=h[v],y=o[d],g=y&&y.prototype;if(g){g[a]||u(g,a,l),g[s]||u(g,s,d),c[d]=l;for(p in e)g[p]||i(g,p,e[p],!0)}}},{118:118,132:132,39:39,41:41,57:57,88:88}],294:[function(t,n,r){var e=t(33),i=t(105);e(e.G+e.B,{setImmediate:i.set,clearImmediate:i.clear})},{105:105,33:33}],295:[function(t,n,r){var e=t(39),i=t(33),o=t(45),u=t(84),c=e.navigator,f=!!c&&/MSIE .\./.test(c.userAgent),a=function(t){return f?function(n,r){return t(o(u,[].slice.call(arguments,2),"function"==typeof n?n:Function(n)),r)}:t};i(i.G+i.B+i.F*f,{setTimeout:a(e.setTimeout),setInterval:a(e.setInterval)})},{33:33,39:39,45:45,84:84}],296:[function(t,n,r){t(245),t(182),t(184),t(183),t(186),t(188),t(193),t(187),t(185),t(195),t(194),t(190),t(191),t(189),t(181),t(192),t(196),t(197),t(148),t(150),t(149),t(199),t(198),t(169),t(179),t(180),t(170),t(171),t(172),t(173),t(174),t(175),t(176),t(177),t(178),t(152),t(153),t(154),t(155),t(156),t(157),t(158),t(159),t(160),t(161),t(162),t(163),t(164),t(165),t(166),t(167),t(168),t(232),t(237),t(244),t(235),t(227),t(228),t(233),t(238),t(240),t(223),t(224),t(225),t(226),t(229),t(230),t(231),t(234),t(236),t(239),t(241),t(242),t(243),t(143),t(145),t(144),t(147),t(146),t(131),t(129),t(136),t(133),t(139),t(141),t(128),t(135),t(125),t(140),t(123),t(138),t(137),t(130),t(134),t(122),t(124),t(127),t(126),t(142),t(132),t(215),t(221),t(216),t(217),t(218),t(219),t(220),t(200),t(151),t(222),t(257),t(258),t(246),t(247),t(252),t(255),t(256),t(250),t(253),t(251),t(254),t(248),t(249),t(201),t(202),t(203),t(204),t(205),t(208),t(206),t(207),t(209),t(210),t(211),t(212),t(214),t(213),t(259),t(284),t(287),t(286),t(288),t(289),t(285),t(290),t(291),t(270),t(273),t(269),t(267),t(268),t(271),t(272),t(262),t(283),t(292),t(261),t(263),t(265),t(264),t(266),t(274),t(275),t(277),t(276),t(279),t(278),t(280),t(281),t(282),t(260),t(295),t(294),t(293),n.exports=t(24)},{122:122,123:123,124:124,125:125,126:126,127:127,128:128,129:129,130:130,131:131,132:132,133:133,134:134,135:135,136:136,137:137,138:138,139:139,140:140,141:141,142:142,143:143,144:144,145:145,146:146,147:147,148:148,149:149,150:150,151:151,152:152,153:153,154:154,155:155,156:156,157:157,158:158,159:159,160:160,161:161,162:162,163:163,164:164,165:165,166:166,167:167,168:168,169:169,170:170,171:171,172:172,173:173,174:174,175:175,176:176,177:177,178:178,179:179,180:180,181:181,182:182,183:183,184:184,185:185,186:186,187:187,188:188,189:189,190:190,191:191,192:192,193:193,194:194,195:195,196:196,197:197,198:198,199:199,200:200,201:201,202:202,203:203,204:204,205:205,206:206,207:207,208:208,209:209,210:210,211:211,212:212,213:213,214:214,215:215,216:216,217:217,218:218,219:219,220:220,221:221,222:222,223:223,224:224,225:225,226:226,227:227,228:228,229:229,230:230,231:231,232:232,233:233,234:234,235:235,236:236,237:237,238:238,239:239,24:24,240:240,241:241,242:242,243:243,244:244,245:245,246:246,247:247,248:248,249:249,250:250,251:251,252:252,253:253,254:254,255:255,256:256,257:257,258:258,259:259,260:260,261:261,262:262,263:263,264:264,265:265,266:266,267:267,268:268,269:269,270:270,271:271,272:272,273:273,274:274,275:275,276:276,277:277,278:278,279:279,280:280,281:281,282:282,283:283,284:284,285:285,286:286,287:287,288:288,289:289,290:290,291:291,292:292,293:293,294:294,295:295}],297:[function(t,n,r){(function(t){!function(t){"use strict";function wrap(t,n,r,e){var i=Object.create((n||Generator).prototype),o=new Context(e||[]);return i._invoke=makeInvokeMethod(t,r,o),i}function tryCatch(t,n,r){try{return{type:"normal",arg:t.call(n,r)}}catch(e){return{type:"throw",arg:e}}}function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}function defineIteratorMethods(t){["next","throw","return"].forEach(function(n){t[n]=function(t){return this._invoke(n,t)}})}function AwaitArgument(t){this.arg=t}function AsyncIterator(t){function invoke(n,i){var o=t[n](i),u=o.value;return u instanceof AwaitArgument?Promise.resolve(u.arg).then(r,e):Promise.resolve(u).then(function(t){return o.value=t,o})}function enqueue(t,r){function callInvokeWithMethodAndArg(){return invoke(t,r)}return n=n?n.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):new Promise(function(t){t(callInvokeWithMethodAndArg())})}"object"==typeof process&&process.domain&&(invoke=process.domain.bind(invoke));var n,r=invoke.bind(t,"next"),e=invoke.bind(t,"throw");invoke.bind(t,"return");this._invoke=enqueue}function makeInvokeMethod(t,n,e){var i=c;return function invoke(o,u){if(i===a)throw new Error("Generator is already running");if(i===s){if("throw"===o)throw u;return doneResult()}for(;;){var h=e.delegate;if(h){if("return"===o||"throw"===o&&h.iterator[o]===r){e.delegate=null;var v=h.iterator["return"];if(v){var p=tryCatch(v,h.iterator,u);if("throw"===p.type){o="throw",u=p.arg;continue}}if("return"===o)continue}var p=tryCatch(h.iterator[o],h.iterator,u);if("throw"===p.type){e.delegate=null,o="throw",u=p.arg;continue}o="next",u=r;var d=p.arg;if(!d.done)return i=f,d;e[h.resultName]=d.value,e.next=h.nextLoc,e.delegate=null}if("next"===o)e._sent=u,i===f?e.sent=u:e.sent=r;else if("throw"===o){if(i===c)throw i=s,u;e.dispatchException(u)&&(o="next",u=r)}else"return"===o&&e.abrupt("return",u);i=a;var p=tryCatch(t,n,e);if("normal"===p.type){i=e.done?s:f;var d={value:p.arg,done:e.done};if(p.arg!==l)return d;e.delegate&&"next"===o&&(u=r)}else"throw"===p.type&&(i=s,o="throw",u=p.arg)}}}function pushTryEntry(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function resetTryEntry(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function Context(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(pushTryEntry,this),this.reset(!0)}function values(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,u=function next(){for(;++o<t.length;)if(e.call(t,o))return next.value=t[o],next.done=!1,next;return next.value=r,next.done=!0,next};return u.next=u}}return{next:doneResult}}function doneResult(){return{value:r,done:!0}}var r,e=Object.prototype.hasOwnProperty,i="function"==typeof Symbol&&Symbol.iterator||"@@iterator",o="object"==typeof n,u=t.regeneratorRuntime;if(u)return void(o&&(n.exports=u));u=t.regeneratorRuntime=o?n.exports:{},u.wrap=wrap;var c="suspendedStart",f="suspendedYield",a="executing",s="completed",l={},h=GeneratorFunctionPrototype.prototype=Generator.prototype;GeneratorFunction.prototype=h.constructor=GeneratorFunctionPrototype,GeneratorFunctionPrototype.constructor=GeneratorFunction,GeneratorFunction.displayName="GeneratorFunction",u.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return n?n===GeneratorFunction||"GeneratorFunction"===(n.displayName||n.name):!1},u.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,GeneratorFunctionPrototype):t.__proto__=GeneratorFunctionPrototype,t.prototype=Object.create(h),t},u.awrap=function(t){return new AwaitArgument(t)},defineIteratorMethods(AsyncIterator.prototype),u.async=function(t,n,r,e){var i=new AsyncIterator(wrap(t,n,r,e));return u.isGeneratorFunction(n)?i:i.next().then(function(t){return t.done?t.value:i.next()})},defineIteratorMethods(h),h[i]=function(){return this},h.toString=function(){return"[object Generator]"},u.keys=function(t){var n=[];for(var r in t)n.push(r);return n.reverse(),function next(){for(;n.length;){var r=n.pop();if(r in t)return next.value=r,next.done=!1,next}return next.done=!0,next}},u.values=values,Context.prototype={constructor:Context,reset:function(t){if(this.prev=0,this.next=0,this.sent=r,this.done=!1,this.delegate=null,this.tryEntries.forEach(resetTryEntry),!t)for(var n in this)"t"===n.charAt(0)&&e.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],n=t.completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(t){function handle(r,e){return o.type="throw",o.arg=t,n.next=r,!!e}if(this.done)throw t;for(var n=this,r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],o=i.completion;if("root"===i.tryLoc)return handle("end");if(i.tryLoc<=this.prev){var u=e.call(i,"catchLoc"),c=e.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0);if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&e.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=n&&n<=o.finallyLoc&&(o=null);var u=o?o.completion:{};return u.type=t,u.arg=n,o?this.next=o.finallyLoc:this.complete(u),l},complete:function(t,n){if("throw"===t.type)throw t.arg;"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=t.arg,this.next="end"):"normal"===t.type&&n&&(this.next=n)},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),l}},"catch":function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc===t){var e=r.completion;if("throw"===e.type){var i=e.arg;resetTryEntry(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:values(t),resultName:n,nextLoc:r},l}}}("object"==typeof t?t:"object"==typeof window?window:"object"==typeof self?self:this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":14}],13:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-04-05T19:26Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],14:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],15:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by gavorhes on 5/3/2016.
 */
global.jQuery = require('jquery');

exports.default = global.jQuery;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"jquery":13}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _makeGuid = require('../util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

var _zoomResolutionConvert = require('../olHelpers/zoomResolutionConvert');

var zoomResolutionConvert = _interopRequireWildcard(_zoomResolutionConvert);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('layers');

/**
 * The base layer class
 * @abstract
 */

var LayerBase = function () {
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
        _classCallCheck(this, LayerBase);

        options = options || {};

        if (typeof url !== 'string') {
            throw 'Invalid URL';
        }
        this._url = url;

        this._params = _typeof(options.params) == 'object' ? options.params : {};
        this._legendCollapse = typeof options.legendCollapse == 'boolean' ? options.legendCollapse : false;
        this._legendCheckbox = typeof options.legendCheckbox == 'boolean' ? options.legendCheckbox : true;

        this.id = options.id || (0, _makeGuid2.default)();
        this._name = options.name || 'Unnamed Layer';
        this.animate = false;
        this._opacity = typeof options.opacity == 'number' ? options.opacity : 1;

        if (this._opacity > 1) {
            this._opacity = 1;
        } else if (this._opacity < 0) {
            this._opacity = 0;
        }

        this._visible = typeof options.visible === 'boolean' ? options.visible : true;

        this._source = undefined;
        this.olLayer = undefined;
        this._loaded = false;

        this._maxResolution = zoomResolutionConvert.zoomToResolution(options.minZoom);
        if (typeof this._maxResolution !== 'undefined') {
            this._maxResolution += 0.00001;
        }
        this._minResolution = zoomResolutionConvert.zoomToResolution(options.maxZoom);

        this._minZoom = typeof options.minZoom == 'number' ? options.minZoom : undefined;
        this._maxZoom = typeof options.maxZoom == 'number' ? options.maxZoom : undefined;
        this._zIndex = typeof options.zIndex == 'number' ? options.zIndex : 0;

        this.loadCallback = typeof options.loadCallback == 'function' ? options.loadCallback : function () {};

        this._legendContent = '';

        if (this._legendCheckbox) {
            this._legendContent += '<input type="checkbox" ' + (this.visible ? 'checked' : '') + ' ' + ('class="legend-check" id="' + this.id + '-legend-layer-check"><span></span>');
            this._legendContent += '<label for="' + this.id + '-legend-layer-check" class="legend-layer-name">' + this.name + '</label>';
        } else {
            this._legendContent += '<label class="legend-layer-name">' + this.name + '</label>';
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


    _createClass(LayerBase, [{
        key: '_load',
        value: function _load() {
            if (this.loaded == true) {
                return true;
            } else {
                this._loaded = true;

                return false;
            }
        }

        /**
         * Get the legend html, be sure to only add to the DOM once
         * @returns {string} html for layer wrapped in a div
         */

    }, {
        key: 'getLegendDiv',
        value: function getLegendDiv() {
            return '<div class="legend-layer-div" id="' + this.id + '-legend-layer-div">' + this._legendContent + '</div>';
        }

        /**
         *
         * @param {string|undefined} additionalContent - additional content to add to legend
         * @private
         */

    }, {
        key: '_addLegendContent',
        value: function _addLegendContent(additionalContent) {
            additionalContent = typeof additionalContent == 'string' ? additionalContent : '';

            var addCollapse = additionalContent.indexOf('<ul>') > -1;

            if (addCollapse) {
                additionalContent = '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>' + additionalContent;
            }

            this._legendContent += additionalContent;

            this._$legendDiv = (0, _jquery2.default)('#' + this.id + '-legend-layer-div');

            if (this._$legendDiv.length > 0) {
                this._$legendDiv.append(additionalContent);
                this.applyCollapse();
            }
        }

        /**
         * add additional content to the legend
         * @param {string} [additionalContent=] - additonal content to add
         */

    }, {
        key: 'addLegendContent',
        value: function addLegendContent(additionalContent) {
            this._addLegendContent(additionalContent);
        }
    }, {
        key: 'applyCollapse',
        value: function applyCollapse() {
            if (this._applyCollapseCalled) {
                console.log('collapse already applied');

                return undefined;
            }

            this._$legendDiv = (0, _jquery2.default)('#' + this.id + '-legend-layer-div');

            if (this._$legendDiv.length > 0) {

                var $expander = this._$legendDiv.find('.legend-items-expander');

                if ($expander.length > 0) {
                    this._applyCollapseCalled = true;

                    $expander.click(function () {
                        var $this = (0, _jquery2.default)(this);

                        $this.siblings('ul').slideToggle();

                        if ($this.hasClass('legend-layer-group-collapsed')) {
                            $this.removeClass('legend-layer-group-collapsed');
                            $this.html('&#9660;');
                        } else {
                            $this.addClass('legend-layer-group-collapsed');
                            $this.html('&#9654;');
                        }
                    });

                    if (this._legendCollapse) {
                        $expander.trigger('click');
                    }
                }
            }
        }

        /**
         * trick to refresh the layer
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.source) {
                this.source.refresh();
                //let src = this.source;
                //this.olLayer.setSource(undefined);
                //this.olLayer.setSource(src);
            }
        }

        /**
         * get the legend content
         * @type {string}
         */

    }, {
        key: 'legendContent',
        get: function get() {
            return this._legendContent;
        }

        /**
         * set the legend content directly
         * @param {string} newVal - new content
         * @protected
         */
        ,
        set: function set(newVal) {
            this._legendContent = newVal;
        }

        /**
         * get the map get params
         * @type {object}
         */

    }, {
        key: 'params',
        get: function get() {
            return this._params;
        }

        /**
         * set the map get params
         * @param {object} newParams - new get params
         * @protected
         */
        ,
        set: function set(newParams) {
            this._params = newParams;
        }

        /**
         * get the minimum resolution
         * @type {number|*}
         */

    }, {
        key: 'minResolution',
        get: function get() {
            return this._minResolution;
        }

        /**
         * get the maximum resolution
         * @type {number|*}
         */

    }, {
        key: 'maxResolution',
        get: function get() {
            return this._maxResolution;
        }

        /**
         * get min zoom
         * @type {number|*}
         */

    }, {
        key: 'minZoom',
        get: function get() {
            return this._minZoom;
        }

        /**
         * get max zoom
         * @type {number|*}
         */

    }, {
        key: 'maxZoom',
        get: function get() {
            return this._maxZoom;
        }

        /**
         * get the url
         * @type {string}
         */

    }, {
        key: 'url',
        get: function get() {
            return this._url;
        }

        /**
         * Get the layer visibility
         * @type {boolean}
         */

    }, {
        key: 'visible',
        get: function get() {
            return this._visible;
        }

        /**
         * Set the layer visibility
         * @param {boolean} visibility - layer visibility
         */
        ,
        set: function set(visibility) {
            this._visible = visibility;
            if (this.olLayer) {
                this.olLayer.setVisible(this._visible);
                if (visibility && !this._loaded) {
                    this._load();
                }
            }
        }

        /**
         * Get the layer opacity
         * @type {number}
         */

    }, {
        key: 'opacity',
        get: function get() {
            return this._opacity;
        }

        /**
         * Set the layer opacity
         * @param {number} opacity - layer opacity
         */
        ,
        set: function set(opacity) {
            this._opacity = opacity;
            if (this.olLayer) {
                this.olLayer.setOpacity(this._opacity);
            }
        }

        /**
         * Get the layer name
         * @type {string}
         */

    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }

        /**
         * set the layer name
         * @param {string} newName - the new name
         */
        ,
        set: function set(newName) {
            this._name = newName;
        }

        /**
         * Check if the layer is loaded
         * @type {boolean}
         */

    }, {
        key: 'loaded',
        get: function get() {
            return this._loaded;
        }

        /**
         * get the layer source
         * @type {*}
         */

    }, {
        key: 'source',
        get: function get() {
            return this._source;
        }

        /**
         * get the z index
         * @type {number}
         */

    }, {
        key: 'zIndex',
        get: function get() {
            return this._zIndex;
        }

        /**
         * set the z index
         * @param {number} newZ - new Z index
         */
        ,
        set: function set(newZ) {
            this._zIndex = newZ;
            this.olLayer.setZIndex(this.zIndex);
        }
    }]);

    return LayerBase;
}();

nm.LayerBase = LayerBase;
exports.default = LayerBase;

},{"../jquery":15,"../olHelpers/zoomResolutionConvert":30,"../util/makeGuid":34,"../util/provide":35}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBase2 = require('./LayerBase');

var _LayerBase3 = _interopRequireDefault(_LayerBase2);

var _mapMove = require('../olHelpers/mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nm = (0, _provide2.default)('layers');

/**
 * The make mapMoveGetParams function takes the extent and the zoom level
 * context is 'this' object, probably want to do something with this.mapMoveParams
 * @callback mapMoveMakeGetParams
 * @param {LayerBaseVector} lyr
 * @param {object} extent
 * @param {number} extent.minX
 * @param {number} extent.minY
 * @param {number} extent.maxX
 * @param {number} extent.maxY
 * @param {number} zoomLevel
 */

/**
 * The Vector layer base
 * @augments LayerBase
 * @abstract
 */

var LayerBaseVector = function (_LayerBase) {
    _inherits(LayerBaseVector, _LayerBase);

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
        _classCallCheck(this, LayerBaseVector);

        //prevent regular load if no url has been provided

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerBaseVector).call(this, url, options));

        if (_this.url.trim() == '') {
            _this._loaded = true;
        }

        _this._style = typeof options.style == 'undefined' ? undefined : options.style;

        if (_this.visible) {
            _this._autoLoad = true;
        } else {
            _this._autoLoad = typeof options['autoLoad'] == 'boolean' ? options['autoLoad'] : false;
        }

        _this._onDemand = typeof options.onDemand == 'boolean' ? options.onDemand : false;
        _this._onDemandDelay = typeof options.onDemandDelay == 'number' ? options.onDemandDelay : 300;

        if (options.mapMoveObj) {
            _this._mapMove = options.mapMoveObj;
        } else {
            _this._mapMove = _this._onDemand ? _mapMove2.default : undefined;
        }

        _this._mapMoveMakeGetParams = typeof options.mapMoveMakeGetParams == 'function' ? options.mapMoveMakeGetParams : function (lyr, extent, zoomLevel) {
            return {};
        };

        if (_this._onDemand) {
            _this._loaded = true;
            _this._mapMoveParams = {};
            _this._mapMove.checkInit();
            _this._mapMove.addVectorLayer(_this);
        }

        _this._source = new _ol2.default.source.Vector();
        _this.olLayer = new _ol2.default.layer.Vector({
            source: _this._source,
            visible: _this.visible,
            style: _this.style,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution,
            zIndex: _this._zIndex
        });
        return _this;
    }

    /**
     * dummy to be overridden
     * @param {object} featureCollection - geojson or esrijson object
     */


    _createClass(LayerBaseVector, [{
        key: 'addFeatures',
        value: function addFeatures(featureCollection) {
            console.log('Layer vector base addFeatures is a placeholder and does nothing');
        }

        /**
         * Before call to map move callback, can prevent call by returning false
         * @param {number} zoom - zoom level
         * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
         * @returns {boolean} if the call should proceed
         */

    }, {
        key: 'mapMoveBefore',
        value: function mapMoveBefore(zoom, evtType) {
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
        }

        /**
         * callback to generate the parameters passed in the get request
         * @param {object} extent - extent object
         * @param {number} extent.minX - minX
         * @param {number} extent.minY - minY
         * @param {number} extent.maxX - maxX
         * @param {number} extent.maxY - maxY
         * @param {number} zoomLevel - zoom level
         */

    }, {
        key: 'mapMoveMakeGetParams',
        value: function mapMoveMakeGetParams(extent, zoomLevel) {
            this._mapMoveParams = {};
            _jquery2.default.extend(this._mapMoveParams, this.params);
            _jquery2.default.extend(this._mapMoveParams, this._mapMoveMakeGetParams(this, extent, zoomLevel));
        }

        /**
         * callback function on map move
         * @param {object} d - the json response
         */

    }, {
        key: 'mapMoveCallback',
        value: function mapMoveCallback(d) {
            if (this.source) {
                this._source.clear();
            }
        }

        /**
         * clear features in the layer
         */

    }, {
        key: 'clear',
        value: function clear() {
            if (this._source) {
                this._source.clear();
            }
        }

        /**
         * get on demand delay in miliseconds
         * @type {number|*}
         */

    }, {
        key: 'onDemandDelay',
        get: function get() {
            return this._onDemandDelay;
        }

        /**
         * get if the layer is autoloaded
         * @type {boolean}
         */

    }, {
        key: 'autoLoad',
        get: function get() {
            return this._autoLoad;
        }

        /**
         * get the style definition
         * @type {ol.Style|styleFunc}
         */

    }, {
        key: 'style',
        get: function get() {
            return this._style;
        }

        /**
         * set the style
         * @param {ol.Style|styleFunc} style - the style or function
         */
        ,
        set: function set(style) {
            this._style = style;
            this.olLayer.setStyle(this._style);
        }

        /**
         * get the map CRS if it is defined by the map move object
         * @type {string|*}
         */

    }, {
        key: 'mapCrs',
        get: function get() {
            if (this._mapMove) {
                return this._mapMove.map.getView().getProjection().getCode();
            } else {
                return undefined;
            }
        }

        /**
         * get the map move object
         * @type {MapMove|*}
         */

    }, {
        key: 'mapMove',
        get: function get() {
            return this._mapMove;
        }

        /**
         * map move params
         * @type {object}
         */

    }, {
        key: 'mapMoveParams',
        get: function get() {
            return this._mapMoveParams;
        }

        /**
         * Set the layer visibility
         * @type {boolean}
         * @override
         */

    }, {
        key: 'visible',
        set: function set(visibility) {
            _set(Object.getPrototypeOf(LayerBaseVector.prototype), 'visible', visibility, this);

            if (this._onDemand) {
                this.mapMove.triggerLyrLoad(this);
            }
        }

        /**
         * get the layer vector source
         * @override
         * @type {ol.source.Vector}
         */

    }, {
        key: 'source',
        get: function get() {
            return _get(Object.getPrototypeOf(LayerBaseVector.prototype), 'source', this);
        }

        /**
         * array of ol features
         * @type {Array.<ol.Feature>}
         */

    }, {
        key: 'features',
        get: function get() {
            return this.source.getFeatures();
        }
    }]);

    return LayerBaseVector;
}(_LayerBase3.default);

nm.LayerBaseVector = LayerBaseVector;
exports.default = LayerBaseVector;

},{"../jquery":15,"../ol/ol":32,"../olHelpers/mapMove":23,"../util/provide":35,"./LayerBase":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBaseVector2 = require('./LayerBaseVector');

var _LayerBaseVector3 = _interopRequireDefault(_LayerBaseVector2);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 11/2/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('layers');

/**
 * The Vector GeoJson Layer
 * @augments LayerBaseVector
 */

var LayerBaseVectorGeoJson = function (_LayerBaseVector) {
    _inherits(LayerBaseVectorGeoJson, _LayerBaseVector);

    /**
     * @param {string|undefined|null} url - resource url, set to '' to make blank layer
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
        _classCallCheck(this, LayerBaseVectorGeoJson);

        url = typeof url == 'string' ? url : '';

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerBaseVectorGeoJson).call(this, url, options));

        _this._geoJsonFormat = new _ol2.default.format.GeoJSON();

        _this._transform = options.transform || {};
        _this._transform.dataProjection = _this._transform.dataProjection || "EPSG:4326";
        _this._transform.featureProjection = _this._transform.featureProjection || "EPSG:3857";

        if (_this.autoLoad || _this.visible) {
            _this._load();
        }
        return _this;
    }

    /**
     * add feature collection
     * @param {object} featureCollection - as geojson object
     */


    _createClass(LayerBaseVectorGeoJson, [{
        key: 'addFeatures',
        value: function addFeatures(featureCollection) {
            if (this._transform.dataProjection == 'EPSG:3857' && this._transform.featureProjection == 'EPSG:3857') {
                this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection));
            } else {
                this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection, this._transform));
            }
        }

        /**
         * trigger load features
         * @protected
         * @returns {boolean} if already loaded
         */

    }, {
        key: '_load',
        value: function _load() {
            var _this2 = this;

            if (_get(Object.getPrototypeOf(LayerBaseVectorGeoJson.prototype), '_load', this).call(this)) {
                return true;
            }

            _jquery2.default.get(this._url, this._params, function (d) {
                _this2.addFeatures(d);
                _this2.loadCallback(_this2);
            }, 'json').fail(function () {
                this._loaded = false;
            });

            return false;
        }

        /**
         * callback function on map move
         * @param {object} d the json response
         * @override
         */

    }, {
        key: 'mapMoveCallback',
        value: function mapMoveCallback(d) {
            _get(Object.getPrototypeOf(LayerBaseVectorGeoJson.prototype), 'mapMoveCallback', this).call(this, d);
            this._source.addFeatures(this._geoJsonFormat.readFeatures(d, this._transform));
        }
    }]);

    return LayerBaseVectorGeoJson;
}(_LayerBaseVector3.default);

nm.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
exports.default = LayerBaseVectorGeoJson;

},{"../jquery":15,"../ol/ol":32,"../util/provide":35,"./LayerBaseVector":17}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBase2 = require('./LayerBase');

var _LayerBase3 = _interopRequireDefault(_LayerBase2);

var _esriToOlStyle = require('../olHelpers/esriToOlStyle');

var esriToOl = _interopRequireWildcard(_esriToOlStyle);

var _mapPopup = require('../olHelpers/mapPopup');

var _mapPopup2 = _interopRequireDefault(_mapPopup);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 12/7/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var nm = (0, _provide2.default)('layers');

/**
 * esri mapserver layer
 * @augments LayerBase
 */

var LayerEsriMapServer = function (_LayerBase) {
    _inherits(LayerEsriMapServer, _LayerBase);

    /**
     * The base layer for all others
     * @param {string} url - resource url
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
     * @param {boolean} [options.addPopup=false] if a popup should be added
     */

    function LayerEsriMapServer(url, options) {
        _classCallCheck(this, LayerEsriMapServer);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerEsriMapServer).call(this, url, options));

        _this2._source = new _ol2.default.source.TileArcGISRest({ url: _this2.url == '' ? undefined : _this2.url });

        _this2.olLayer = new _ol2.default.layer.Tile({
            source: _this2._source,
            visible: _this2.visible,
            opacity: _this2.opacity,
            minResolution: _this2._minResolution,
            maxResolution: _this2._maxResolution,
            zIndex: _this2._zIndex
        });

        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;

        _this2._esriFormat = new _ol2.default.format.EsriJSON();
        _this2._popupRequest = null;

        _this2.addLegendContent();

        if (options.addPopup) {
            _mapPopup2.default.addMapServicePopup(_this2);
        }
        return _this2;
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */


    _createClass(LayerEsriMapServer, [{
        key: 'addLegendContent',
        value: function addLegendContent(additionalContent) {
            var urlCopy = this.url;

            if (urlCopy[urlCopy.length - 1] !== '/') {
                urlCopy += '/';
            }

            urlCopy += 'legend?f=pjson&callback=?';

            var _this = this;
            var superAddLegend = _get(Object.getPrototypeOf(LayerEsriMapServer.prototype), 'addLegendContent', this);

            _jquery2.default.get(urlCopy, {}, function (d) {
                var newHtml = esriToOl.makeMapServiceLegend(d);
                superAddLegend.call(_this, newHtml);
            }, 'json');
        }
    }, {
        key: 'getPopupInfo',
        value: function getPopupInfo(queryParams) {
            if (!this.visible) {
                return;
            }

            var urlCopy = this.url;

            if (urlCopy[urlCopy.length - 1] != '/') {
                urlCopy += '/';
            }

            urlCopy += 'identify?callback=?';

            var _this = this;

            if (this._popupRequest != null) {
                this._popupRequest.abort();
            }

            this._popupRequest = _jquery2.default.get(urlCopy, queryParams, function (d) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = d['results'][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var r = _step.value;


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

                                popupHtml += '<tr><td>' + attr + '</td><td>' + attrVal + '</td></tr>';
                            }
                        }

                        popupHtml += '</table>';

                        _mapPopup2.default.addMapServicePopupContent(_this._esriFormat.readFeature(r), _this, popupHtml, r['layerName']);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }, 'json').always(function () {
                _this._popupRequest = null;
            });
        }

        /**
         * overwrite the base load
         * @protected
         */

    }, {
        key: '_load',
        value: function _load() {}

        /**
         *
         * @returns {ol.source.TileArcGISRest} the vector source
         */

    }, {
        key: 'source',
        get: function get() {
            return _get(Object.getPrototypeOf(LayerEsriMapServer.prototype), 'source', this);
        }
    }]);

    return LayerEsriMapServer;
}(_LayerBase3.default);

nm.LayerEsriMapServer = LayerEsriMapServer;
exports.default = LayerEsriMapServer;

},{"../jquery":15,"../ol/ol":32,"../olHelpers/esriToOlStyle":21,"../olHelpers/mapPopup":25,"../util/provide":35,"./LayerBase":16}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 12/23/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('olHelpers');

/**
 * take an array of features and sort by a given property name
 */

var SortedFeatures = function () {

    /**
     *
     * @param {Array<ol.Feature>} features array of ol features
     * @param {string} propertyName - the property name to use for lookup
     */

    function SortedFeatures(features, propertyName) {
        var _this2 = this;

        _classCallCheck(this, SortedFeatures);

        this.sortedFeatures = features;
        this.propertyName = propertyName;

        if (this.sortedFeatures.length > 0) {
            (function () {
                _this2._propertyType = _typeof(_this2.sortedFeatures[0].getProperties()[_this2.propertyName]);

                var _this = _this2;
                _this2.sortedFeatures.sort(function (a, b) {
                    if (_this._propertyType == 'number') {
                        return a['getProperties']()[_this.propertyName] - b['getProperties']()[_this.propertyName];
                    } else if (_this._propertyType == 'string') {
                        return a['getProperties']()[_this.propertyName] > b['getProperties']()[_this.propertyName];
                    }
                });
            })();
        }
    }

    /**
     * recursive search to find the value
     * @param {number|string} propertyValue - the property value to search for
     * @param {boolean} [exactMatch=false] if only an exact match should be returned
     * @param {Array} [sortedFeatures=this.sortedFeatures] - the candidate features
     * @returns {ol.Feature|undefined} the feature matching the lookup
     */


    _createClass(SortedFeatures, [{
        key: 'getFeature',
        value: function getFeature(propertyValue, exactMatch, sortedFeatures) {
            if (typeof sortedFeatures == 'undefined') {
                sortedFeatures = this.sortedFeatures;
            }

            if (typeof exactMatch !== 'boolean') {
                exactMatch = false;
            }

            if (sortedFeatures.length == 0) {
                return undefined;
            }

            if (sortedFeatures.length == 1) {
                if (exactMatch) {
                    if (sortedFeatures[0].getProperties()[this.propertyName] == propertyValue) {
                        return sortedFeatures[0];
                    } else {
                        return undefined;
                    }
                } else {
                    return sortedFeatures[0];
                }
            }

            var lowProp = sortedFeatures[0].getProperties()[this.propertyName];
            var highProp = sortedFeatures[sortedFeatures.length - 1].getProperties()[this.propertyName];

            if (exactMatch) {
                if (lowProp == propertyValue) {
                    return sortedFeatures[0];
                } else if (propertyValue < lowProp) {
                    return undefined;
                } else if (highProp == propertyValue) {
                    return sortedFeatures[sortedFeatures.length - 1];
                } else if (propertyValue > highProp) {
                    return undefined;
                }
            } else {
                if (propertyValue <= lowProp) {
                    return sortedFeatures[0];
                } else if (propertyValue >= highProp) {
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
            } else {
                return this.getFeature(propertyValue, exactMatch, sortedFeatures.slice(midIndex));
            }
        }
    }]);

    return SortedFeatures;
}();

nm.SortedFeatures = SortedFeatures;
exports.default = SortedFeatures;

},{"../util/provide":35}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
exports.makeMapServiceLegend = makeMapServiceLegend;

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by gavorhes on 1/4/2016.
                                                                                                                                                           */


var nm = (0, _provide2.default)('olHelpers.esriToOlStyle');

/**
 * This callback is displayed as part of the Requester class.
 * @callback styleFunc
 * @param {ol.Feature} feat - openlayers feature
 * @param {number} resolution - map resolution
 */

/**
 *
 * @param {Array<number>} colorArray - input color array
 * @param {number} opacity - the opacity 0 to 1
 * @returns {string} rgba string
 * @private
 */
function _colorArrayToRgba(colorArray, opacity) {
    "use strict";

    return 'rgba(' + colorArray[0] + ',' + colorArray[1] + ',' + colorArray[2] + ',' + opacity + ')';
}

/**
 * escape html charcters
 * @param {string} str - input string
 * @returns {string} escaped string
 */
function htmlEscape(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

nm.htmlEscape = htmlEscape;

var CommonSymbol =

/**
 * 
 * @param symbolObj
 * @param {number} opacity
 */
function CommonSymbol(symbolObj, opacity) {
    _classCallCheck(this, CommonSymbol);

    this.symbolObj = symbolObj;
    this.opacity = opacity;
    this.olStyle = undefined;
    this.legendHtml = '';
};

var PointSymbol = function (_CommonSymbol) {
    _inherits(PointSymbol, _CommonSymbol);

    function PointSymbol(symbolObj, opacity) {
        _classCallCheck(this, PointSymbol);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PointSymbol).call(this, symbolObj, opacity));

        switch (_this2.symbolObj['type']) {
            case 'esriSMS':
                var innerColor = _colorArrayToRgba(_this2.symbolObj.color, _this2.opacity);
                var outerColor = _colorArrayToRgba(_this2.symbolObj.outline.color, _this2.opacity);
                var outlineWidth = _this2.symbolObj.outline.width;
                var radius = _this2.symbolObj.size;

                _this2.olStyle = new _ol2.default.style.Style({
                    image: new _ol2.default.style.Circle({
                        radius: radius,
                        fill: new _ol2.default.style.Fill({
                            color: innerColor
                        }),
                        stroke: new _ol2.default.style.Stroke({ color: outerColor, width: outlineWidth })
                    })
                });
                _this2.legendHtml = '<span class="legend-layer-icon" style="color: ' + innerColor + '">&#9679;</span>';
                break;
            case 'esriPMS':
                _this2.olStyle = new _ol2.default.style.Style({
                    image: new _ol2.default.style.Icon({ src: 'data:image/png;base64,' + _this2.symbolObj['imageData'] })
                });
                _this2.legendHtml = '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + _this2.symbolObj['imageData'] + '">';
                break;
            default:
                console.log(_this2.symbolObj);
                alert('Point symbol does not handle symbol type: ' + _this2.symbolObj['type']);
        }
        return _this2;
    }

    return PointSymbol;
}(CommonSymbol);

var LineSymbol = function (_CommonSymbol2) {
    _inherits(LineSymbol, _CommonSymbol2);

    function LineSymbol(symbolObj, opacity) {
        _classCallCheck(this, LineSymbol);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(LineSymbol).call(this, symbolObj, opacity));

        switch (_this3.symbolObj['type']) {
            case 'esriSLS':
                var innerColor = _colorArrayToRgba(_this3.symbolObj.color, _this3.opacity);
                var lineWidth = _this3.symbolObj.width;

                _this3.olStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: innerColor,
                        //lineDash: [4],
                        width: lineWidth
                    })
                });

                _this3.legendHtml = '<span class="legend-layer-icon" ';
                _this3.legendHtml += 'style="';
                _this3.legendHtml += 'background-color: ' + innerColor + ';';
                _this3.legendHtml += 'width: 40px;';
                _this3.legendHtml += 'height: 4px;';
                _this3.legendHtml += 'position: relative;';
                _this3.legendHtml += 'display: inline-block;';
                _this3.legendHtml += 'top: -1px;';
                _this3.legendHtml += '"></span>';
                break;
            default:
                console.log(_this3.symbolObj);
                alert('Line symbol does not handle symbol type: ' + _this3.symbolObj['type']);
        }
        return _this3;
    }

    return LineSymbol;
}(CommonSymbol);

var PolygonSymbol = function (_CommonSymbol3) {
    _inherits(PolygonSymbol, _CommonSymbol3);

    function PolygonSymbol(symbolObj, opacity) {
        _classCallCheck(this, PolygonSymbol);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(PolygonSymbol).call(this, symbolObj, opacity));

        switch (_this4.symbolObj['type']) {
            case 'esriSFS':
                var innerColor = _colorArrayToRgba(_this4.symbolObj.color, _this4.opacity);
                var outerColor = _colorArrayToRgba(_this4.symbolObj.outline.color, _this4.opacity);
                var outlineWidth = _this4.symbolObj.outline.width;

                _this4.olStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new _ol2.default.style.Fill({
                        color: innerColor
                    })
                });

                _this4.legendHtml = '<span class="legend-layer-icon" ';
                _this4.legendHtml += 'style="';
                _this4.legendHtml += 'background-color: ' + innerColor + ';';
                _this4.legendHtml += 'border: solid ' + outerColor + ' 1px;';
                _this4.legendHtml += 'width: 40px;';
                _this4.legendHtml += 'height: 9px;';
                _this4.legendHtml += 'position: relative;';
                _this4.legendHtml += 'display: inline-block;';
                _this4.legendHtml += 'top: 2px;';
                _this4.legendHtml += '"></span>';
                break;

            default:
                console.log(_this4.symbolObj);
                alert('Polygon symbol does handle symbol type: ' + _this4.symbolObj['type']);
        }
        return _this4;
    }

    return PolygonSymbol;
}(CommonSymbol);

var SymbolGenerator = function SymbolGenerator(esriResponse) {
    _classCallCheck(this, SymbolGenerator);

    this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
    this.renderer = esriResponse['drawingInfo']['renderer'];
    this.olStyle = undefined;
    this.legendHtml = '';
};

var SingleSymbol = function (_SymbolGenerator) {
    _inherits(SingleSymbol, _SymbolGenerator);

    /**
     *
     * @param {object} esriResponse - layer info
     * @param {Constructor|*} SymbolClass - the symbol class to use
     */

    function SingleSymbol(esriResponse, SymbolClass) {
        _classCallCheck(this, SingleSymbol);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(SingleSymbol).call(this, esriResponse));

        _this5.symbol = _this5.renderer['symbol'];
        var symbolObj = new SymbolClass(_this5.symbol, _this5.opacity);
        _this5.olStyle = symbolObj.olStyle;
        _this5.legendHtml = symbolObj.legendHtml;
        return _this5;
    }

    return SingleSymbol;
}(SymbolGenerator);

var UniqueValueSymbol = function (_SymbolGenerator2) {
    _inherits(UniqueValueSymbol, _SymbolGenerator2);

    /**
     *
     * @param {object} esriResponse - layer info
     * @param {Constructor|*} SymbolClass - the Symbol class definition
     */

    function UniqueValueSymbol(esriResponse, SymbolClass) {
        _classCallCheck(this, UniqueValueSymbol);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(UniqueValueSymbol).call(this, esriResponse));

        _this6.uniqueValueInfos = _this6.renderer['uniqueValueInfos'];
        _this6.propertyName = _this6.renderer['field1'];
        _this6.defaultSymbol = _this6.renderer['defaultSymbol'];

        if (_this6.defaultSymbol) {
            var symbolObj = new SymbolClass(_this6.defaultSymbol, _this6.opacity);
            _this6.defaultStyle = symbolObj.olStyle;
            _this6.defaultLabelHtml = '<span class="legend-layer-subitem">' + htmlEscape(_this6.renderer['defaultLabel']) + '</span>' + symbolObj.legendHtml;
        } else {
            _this6.defaultStyle = undefined;
            _this6.defaultLabelHtml = 'other';
        }

        _this6.valueArray = [];
        _this6.labelArray = [];
        _this6.legendArray = [];
        _this6.propertyStyleLookup = {};

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _this6.uniqueValueInfos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var uniqueVal = _step.value;

                _this6.labelArray.push(uniqueVal['label']);
                _this6.valueArray.push(uniqueVal['value']);
                var uniqueSym = new SymbolClass(uniqueVal.symbol, _this6.opacity);
                _this6.legendArray.push('<span class="legend-layer-subitem">' + htmlEscape(uniqueVal['label']) + '</span>' + uniqueSym.legendHtml);
                _this6.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var _this = _this6;

        _this6.olStyle = function (feature, resolution) {
            var checkProperties = feature.getProperties();
            var checkProperty = checkProperties[_this.propertyName];

            var returnValue = void 0;
            if (_this.propertyStyleLookup[checkProperty] !== undefined) {
                returnValue = [_this.propertyStyleLookup[checkProperty]];
            } else {
                returnValue = [_this.defaultStyle];
            }

            return returnValue;
        };

        if (_this6.defaultLabelHtml !== null) {
            _this6.legendArray.push(_this6.defaultLabelHtml);
        }

        _this6.legendHtml = '<ul>';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = _this6.legendArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var h = _step2.value;

                _this6.legendHtml += '<li>' + h + '</li>';
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        _this6.legendHtml += '</ul>';
        return _this6;
    }

    return UniqueValueSymbol;
}(SymbolGenerator);

/**
 * style and legend object
 * @typedef {object} styleAndLegend
 * @property {styleFunc} style - style function
 * @property {string} legend - legend content
 */

/**
 *
 * @param {object} esriResponse - layer info
 * @returns {styleAndLegend} style and legend object
 */


function makeFeatureServiceLegendAndSymbol(esriResponse) {
    "use strict";

    var renderer = esriResponse['drawingInfo']['renderer'];
    var symbolLegendOut = null;

    switch (renderer['type']) {
        case 'simple':
            switch (esriResponse['geometryType']) {
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
                    alert(esriResponse['geometryType'] + ' not handled');
            }
            break;
        case 'uniqueValue':
            switch (esriResponse['geometryType']) {
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
    } else {
        return { style: symbolLegendOut.olStyle, legend: symbolLegendOut.legendHtml };
    }
}

nm.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;

/**
 *
 * @param {object} lyrObject - the layer as defined in the response
 * @param {boolean} [iconsOnly=false] use only icons
 * @returns {string} legend html
 */
function mapServiceLegendItem(lyrObject, iconsOnly) {

    iconsOnly = typeof iconsOnly == 'boolean' ? iconsOnly : false;
    var layerName = lyrObject['layerName'];
    var legendItems = lyrObject['legend'];
    var legendHtml = '';

    if (legendItems.length == 1) {
        legendHtml = '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + legendItems[0]['imageData'] + '">';
    } else {
        legendHtml += '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span><ul>';
        for (var i = 0; i < legendItems.length; i++) {
            legendHtml += '<li>';
            legendHtml += '<span class="legend-layer-subitem">' + htmlEscape(legendItems[i]['label']) + '</span>';
            legendHtml += '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + legendItems[i]['imageData'] + '">';
            legendHtml += '</li>';
        }
        legendHtml += '</ul>';
    }

    if (!iconsOnly) {
        legendHtml = '<span class="legend-layer-subitem">' + layerName + '</span>' + legendHtml;
    }

    return legendHtml;
}

/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @returns {string} legend content
 */
function makeMapServiceLegend(esriResponse) {
    "use strict";

    var newLegendHtml = '';

    var layers = esriResponse['layers'];

    if (layers.length == 1) {
        newLegendHtml += mapServiceLegendItem(layers[0], true);
    } else {
        newLegendHtml += '<ul>';
        for (var i = 0; i < layers.length; i++) {
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }

    return newLegendHtml;
}

nm.makeMapServiceLegend = makeMapServiceLegend;

},{"../ol/ol":32,"../util/provide":35}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 12/8/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('olHelpers');

/**
 * base interaction
 */

var MapInteractionBase = function () {

    /**
     * map interaction base
     * @param {string} subtype - the interaction subtype
     */

    function MapInteractionBase(subtype) {
        _classCallCheck(this, MapInteractionBase);

        this._map = undefined;
        this._initialized = false;
        this._subtype = subtype;
    }

    /**
     * base initializer, returns true for already initialized
     * @param {ol.Map} theMap - the ol Map
     * @returns {boolean} true for already initialized
     */


    _createClass(MapInteractionBase, [{
        key: 'init',
        value: function init(theMap) {
            if (!this._initialized) {
                this._map = theMap;
                this._initialized = true;

                return false;
            }

            return true;
        }

        /**
         * get reference to the ol map object
         * @returns {ol.Map} the map object
         */

    }, {
        key: '_checkInit',


        /**
         * Check the initialization status and throw exception if not valid yet
         * @protected
         */
        value: function _checkInit() {
            if (!this.initialized) {
                var msg = this._subtype + ' object not initialized';
                alert(msg);
                console.log(msg);
                throw msg;
            }
        }

        /**
         * Check the initialization status and throw exception if not valid yet
         */

    }, {
        key: 'checkInit',
        value: function checkInit() {
            this._checkInit();
        }
    }, {
        key: 'map',
        get: function get() {
            return this._map;
        }

        /**
         * get if is initialized
         * @returns {boolean} is initialized
         */

    }, {
        key: 'initialized',
        get: function get() {
            return this._initialized;
        }
    }]);

    return MapInteractionBase;
}();

nm.MapInteractionBase = MapInteractionBase;
exports.default = MapInteractionBase;

},{"../util/provide":35}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapMoveCls = require('./mapMoveCls');

var _mapMoveCls2 = _interopRequireDefault(_mapMoveCls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The single map move object catch is that it is common to multimap pages
 * @type {MapMoveCls}
 */
exports.default = new _mapMoveCls2.default(); /**
                                               * Created by gavorhes on 11/3/2015.
                                               */

},{"./mapMoveCls":24}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _mapInteractionBase = require('./mapInteractionBase');

var _mapInteractionBase2 = _interopRequireDefault(_mapInteractionBase);

var _checkDefined = require('../util/checkDefined');

var checkDefined = _interopRequireWildcard(_checkDefined);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _makeGuid = require('../util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 11/3/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('olHelpers');

/**
 * assists with map move interactions, trigger callback functions
 * @augments MapInteractionBase
 */

var MapMoveCls = function (_MapInteractionBase) {
    _inherits(MapMoveCls, _MapInteractionBase);

    /**
     * constructor called implicitly
     */

    function MapMoveCls() {
        _classCallCheck(this, MapMoveCls);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MapMoveCls).call(this, 'map move'));

        _this2._arrLyrRequest = [];
        _this2._arrLyrTimeout = [];
        _this2._arrLayer = [];
        _this2._lookupLayer = {};

        _this2._mapMoveCallbacks = [];
        _this2._mapMoveCallbacksLookup = {};
        _this2._mapMoveCallbackDelays = [];
        _this2._mapMoveCallbackContext = [];
        _this2._mapMoveCallbackTimeout = [];

        _this2._mapExtent = undefined;
        _this2._zoomLevel = undefined;
        return _this2;
    }

    /**
     * initialize the map move object
     * @param {ol.Map} theMap - the ol map
     */


    _createClass(MapMoveCls, [{
        key: 'init',
        value: function init(theMap) {
            if (_get(Object.getPrototypeOf(MapMoveCls.prototype), 'init', this).call(this, theMap)) {
                return;
            }

            var _this = this;

            this.map.getView().on(['change:center', 'change:resolution'], function (e) {

                _this._updateMapExtent();

                // trigger the layer updates
                for (var i = 0; i < _this._arrLayer.length; i++) {
                    _this.triggerLyrLoad(_this._arrLayer[i], i, e.type);
                }

                // trigger the map callbacks
                for (var _i = 0; _i < _this._mapMoveCallbacks.length; _i++) {
                    _this.triggerMoveCallback(_i, e.type);
                }
            });
        }
    }, {
        key: '_updateMapExtent',
        value: function _updateMapExtent() {
            var theView = this.map.getView();
            this._zoomLevel = theView.getZoom();

            var extentArray = theView.calculateExtent(this.map.getSize());

            this._mapExtent = {
                minX: extentArray[0],
                minY: extentArray[1],
                maxX: extentArray[2],
                maxY: extentArray[3]
            };
        }

        /**
         * return the map extent
         */

    }, {
        key: 'triggerLyrLoad',


        /**
         * Trigger the layer load
         * @param {LayerBaseVector|*} lyr - the layer being acted on
         * @param {number} [index=undefined] - index of the layer
         * @param {string|*} [eventType=undefined] the event triggering the load, as 'change:center' or 'change:resolution'
         */
        value: function triggerLyrLoad(lyr, index, eventType) {
            var _this3 = this;

            if (checkDefined.undefinedOrNull(lyr) && checkDefined.undefinedOrNull(index)) {
                throw 'need to define lyr or index';
            } else if (checkDefined.definedAndNotNull(lyr) && checkDefined.undefinedOrNull(index)) {
                index = this._arrLayer.indexOf(lyr);
            } else if (checkDefined.undefinedOrNull(lyr) && checkDefined.definedAndNotNull(index)) {
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
            var callbackFunc = function callbackFunc() {};

            if (lyr.mapMoveBefore(this._zoomLevel, eventType)) {
                (function () {
                    lyr.mapMoveMakeGetParams(_this3._mapExtent, _this3._zoomLevel);

                    var _this = _this3;

                    callbackFunc = function callbackFunc() {
                        function innerFunction(theLayer, theIndex) {
                            var _innerThis = this;
                            this._arrLyrRequest[theIndex] = _jquery2.default.get(theLayer.url, theLayer.mapMoveParams, function (d) {
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
                        innerFunction.call(_this, lyr, index);
                    };
                })();
            } else {
                lyr.clear();
            }
            this._arrLyrTimeout[index] = setTimeout(callbackFunc, lyr.onDemandDelay);
        }

        /**
         * trigger the map move call back at the given index
         * @param {number} ind - the index of the layer
         * @param {string|*} [eventType=undefined] the event triggering the load as 'change:center' or 'change:resolution'
         * @param {string} [functionId=undefined] the function id used to reference the added callback function
         */

    }, {
        key: 'triggerMoveCallback',
        value: function triggerMoveCallback(ind, eventType, functionId) {

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

            var _this = this;

            var f = function f() {
                if (ctx !== null) {
                    theFunc.call(ctx, _this._mapExtent, _this._zoomLevel, eventType);
                } else {
                    theFunc(_this._mapExtent, _this._zoomLevel, eventType);
                }
            };

            this._mapMoveCallbackTimeout[ind] = setTimeout(f, this._mapMoveCallbackDelays[ind]);
        }

        /**
         * Add a layer to the interaction
         * @param {LayerBaseVector|*} lyr - layer to add
         * @param {boolean} [triggerOnAdd=true] - if the layer should be loaded on add
         */

    }, {
        key: 'addVectorLayer',
        value: function addVectorLayer(lyr, triggerOnAdd) {
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
        }

        /**
         * This callback is displayed as a global member.
         * @callback mapMoveCallbackFunction
         * @param {object} extent - extent object
         * @param {number} extent.minX - minX
         * @param {number} extent.minY - minY
         * @param {number} extent.maxX - maxX
         * @param {number} extent.maxY - maxY
         * @param {number} zoomLevel - zoom level
         * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
         */

        /**
         * add a callback to the map move event
         * @param {mapMoveCallbackFunction} func - callback function
         * @param {*} context - the context to use for this function
         * @param {number} [delay=50] the delay before call load
         * @param {boolean} [triggerOnAdd=true] if the layer should be loaded on add to mapMove
         * @param {string} [functionId=undefined] optional id to reference the function later for outside triggering
         */

    }, {
        key: 'addCallback',
        value: function addCallback(func, context, delay, triggerOnAdd, functionId) {

            if (this._mapMoveCallbacks.indexOf(func) > -1) {
                console.log('this function already added to map move');

                return;
            }
            this._checkInit();
            if (!functionId) {
                functionId = (0, _makeGuid2.default)();
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
        }
    }, {
        key: 'mapExtent',
        get: function get() {
            if (!this._mapExtent) {
                this._updateMapExtent();
            }

            return this._mapExtent;
        }
    }]);

    return MapMoveCls;
}(_mapInteractionBase2.default);

nm.MapMoveCls = MapMoveCls;
exports.default = MapMoveCls;

},{"../jquery":15,"../util/checkDefined":33,"../util/makeGuid":34,"../util/provide":35,"./mapInteractionBase":22}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapPopupCls = require('./mapPopupCls');

var _mapPopupCls2 = _interopRequireDefault(_mapPopupCls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The single popup object catch is that it is common to multimap pages
 * @type {MapPopupCls}
 */
exports.default = new _mapPopupCls2.default(); /**
                                                * Created by gavorhes on 11/3/2015.
                                                */

},{"./mapPopupCls":26}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 11/3/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _mapInteractionBase = require('./mapInteractionBase');

var _mapInteractionBase2 = _interopRequireDefault(_mapInteractionBase);

var _propertiesZoomStyle = require('../olHelpers/propertiesZoomStyle');

var _propertiesZoomStyle2 = _interopRequireDefault(_propertiesZoomStyle);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('olHelpers');

var _FeatureLayerProperties = function () {

    /**
     *
     * @param {ol.Feature} feature the feature
     * @param {LayerBaseVector|*} layer - the layer in the popup
     * @param {number} layerIndex - index of the layer
     * @param {ol.layer.Vector} selectionLayer - the ol selection layer
     * @param {string} [esriLayerName=undefined] - esri layer name
     */

    function _FeatureLayerProperties(feature, layer, layerIndex, selectionLayer, esriLayerName) {
        _classCallCheck(this, _FeatureLayerProperties);

        this.feature = feature;
        this.layer = layer;
        this.layerIndex = layerIndex;
        this.selectionLayer = selectionLayer;
        this.popupContent = '';
        this.esriLayerName = typeof esriLayerName == 'string' ? esriLayerName : undefined;
    }

    _createClass(_FeatureLayerProperties, [{
        key: 'layerName',
        get: function get() {
            if (typeof this.esriLayerName == 'string') {
                return this.esriLayerName;
            } else {
                return this.layer.name;
            }
        }
    }]);

    return _FeatureLayerProperties;
}();

/**
 * map popup class
 * @augments MapInteractionBase
 */


var MapPopupCls = function (_MapInteractionBase) {
    _inherits(MapPopupCls, _MapInteractionBase);

    /**
     * Definition for openlayers style function
     * @callback olStyleFunction
     * &param feature the openlayers vector feature
     * $param
     */

    /**
     * Definition for popup changed callback functions
     * @callback popupChangedFunction
     * @param $popContent jquery reference to the popup content
     */

    /**
     * map popup constructor
     */

    function MapPopupCls() {
        _classCallCheck(this, MapPopupCls);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapPopupCls).call(this, 'map popup'));

        _this._arrPopupLayerIds = [];
        _this._arrPopupLayerNames = [];
        /**
         *
         * @type {Array<LayerBaseVector>}
         * @private
         */
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
        /**
         *
         * @type {Array<LayerEsriMapServer>}
         * @private
         */
        _this._esriMapServiceLayers = [];

        _this._popupOpen = false;
        _this._popupCoordinate = null;

        /**
         *
         * @type {Array.<_FeatureLayerProperties>}
         */
        _this._passThroughLayerFeatureArray = [];

        _this._currentPopupIndex = -1;
        _this._popupContentLength = 0;

        return _this;
    }

    /**
     * map popup initialization
     * @param {ol.Map} theMap - the ol map
     */


    _createClass(MapPopupCls, [{
        key: 'init',
        value: function init(theMap) {
            var _this2 = this;

            if (_get(Object.getPrototypeOf(MapPopupCls.prototype), 'init', this).call(this, theMap)) {
                return;
            }
            var $map = (0, _jquery2.default)('#' + this.map.getTarget());

            $map.append('<div class="ol-popup">' + '<a href="#" class="ol-popup-closer"></a>' + '<div class="popup-content"></div>' + '</div>');

            this._$popupContainer = $map.find('.ol-popup');
            this._$popupContent = $map.find('.popup-content');
            this._$popupCloser = $map.find('.ol-popup-closer');

            this._popupOverlay = new _ol2.default.Overlay({
                element: this._$popupContainer[0],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });

            this._map.addOverlay(this._popupOverlay);

            this._$popupCloser.click(function () {
                _this2.closePopup();
            });

            // display popup on click
            this._map.on('singleclick', function (evt) {
                _this2.closePopup();
                _this2._popupCoordinate = evt.coordinate;

                if (_this2._esriMapServiceLayers.length > 0) {
                    var queryParams = {
                        geometry: evt.coordinate.join(','),
                        geometryType: 'esriGeometryPoint',
                        layers: 'all',
                        sr: _this2._map.getView().getProjection().getCode().split(':')[1],
                        mapExtent: _this2._map.getView().calculateExtent(_this2._map.getSize()).join(','),
                        imageDisplay: _this2._map.getSize().join(',') + ',96',
                        returnGeometry: true,
                        tolerance: 15,
                        f: 'pjson'
                    };

                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this2._esriMapServiceLayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var l = _step.value;

                            l.getPopupInfo(queryParams, _this2._selectionLayerLookup[l.id]);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }

                var layerFeatureObjectArray = _this2._featuresAtPixel(evt.pixel);

                /**
                 *
                 * @type {Array.<_FeatureLayerProperties>}
                 */
                _this2._passThroughLayerFeatureArray = [];
                _this2._currentPopupIndex = -1;

                for (var i = 0; i < layerFeatureObjectArray.length; i++) {
                    var featObj = layerFeatureObjectArray[i];

                    var props = featObj.feature.getProperties();

                    var popupContentResponse = _this2._arrPopupContentFunction[featObj.layerIndex](props, _this2._$popupContent);

                    //skip if return was false
                    if (popupContentResponse === false) {
                        //continue;
                    } else if (typeof popupContentResponse == 'string') {
                            featObj.popupContent = popupContentResponse;
                            _this2._passThroughLayerFeatureArray.push(featObj);
                        } else {
                            featObj.selectionLayer.getSource().addFeature(featObj.feature);
                        }
                }

                _this2._popupContentLength = _this2._passThroughLayerFeatureArray.length;

                _this2._currentPopupIndex = -1;

                var popupHtml = '<div class="ol-popup-nav">';
                popupHtml += '<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>';
                popupHtml += '<span class="next-popup ol-popup-nav-arrow">&#9654;</span>';
                popupHtml += '<span class="current-popup-item-number" style="font-weight: bold;"></span>';
                popupHtml += '<span>&nbsp;of&nbsp;</span>';
                popupHtml += '<span class="popup-content-length" style="font-weight: bold;">' + _this2._popupContentLength + '</span>';
                popupHtml += '<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                popupHtml += '<span class="current-popup-layer-name"></span>';
                popupHtml += '</div>';
                popupHtml += '<div class="ol-popup-inner">';

                popupHtml += '</div>';

                _this2._$popupContent.html(popupHtml);

                _this2._$popupContent.find('.previous-popup').click(function () {
                    if (_this2._popupContentLength == 1) {
                        return;
                    }

                    if (_this2._currentPopupIndex == 0) {
                        _this2._currentPopupIndex = _this2._popupContentLength - 1;
                    } else {
                        _this2._currentPopupIndex--;
                    }
                    _this2._triggerFeatSelect();
                });

                var nextPopup = _this2._$popupContent.find('.next-popup');

                nextPopup.click(function () {
                    if (_this2._popupContentLength == 1 && _this2._currentPopupIndex > -1) {
                        return;
                    }

                    if (_this2._currentPopupIndex == _this2._popupContentLength - 1) {
                        _this2._currentPopupIndex = 0;
                    } else {
                        _this2._currentPopupIndex++;
                    }
                    _this2._triggerFeatSelect();
                });

                if (_this2._popupContentLength > 0) {
                    nextPopup.trigger('click');
                    _this2._popupOverlay.setPosition(_this2._popupCoordinate);
                    _this2._$popupContent.scrollTop(0);
                    _this2._popupOpen = true;
                }
            });

            //change mouse cursor when over marker
            this._map.on('pointermove', function (e) {
                if (e.dragging) {
                    return;
                }
                var pixel = _this2.map.getEventPixel(e.originalEvent);
                var hit = _this2.map.hasFeatureAtPixel(pixel, function (lyrCandidate) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = _this2._arrPopupOlLayers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var olLayer = _step2.value;

                            if (lyrCandidate == olLayer) {
                                return true;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    return false;
                });
                _this2.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
            });
        }

        /**
         * helper to select features
         * @private
         */

    }, {
        key: '_triggerFeatSelect',
        value: function _triggerFeatSelect() {
            var $currentPopupItemNumber = this._$popupContent.find('.current-popup-item-number');
            var $innerPopup = this._$popupContent.find('.ol-popup-inner');
            var $layerNameSpan = this._$popupContent.find('.current-popup-layer-name');
            this.clearSelection();
            var lyrFeatObj = this._passThroughLayerFeatureArray[this._currentPopupIndex];
            $currentPopupItemNumber.html((this._currentPopupIndex + 1).toFixed());
            $layerNameSpan.html(lyrFeatObj.layerName);
            $innerPopup.html(lyrFeatObj.popupContent);
            lyrFeatObj.selectionLayer.getSource().addFeature(lyrFeatObj.feature);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._popupChangedFunctions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var f = _step3.value;

                    f(this._$popupContent);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }

        /**
         *
         * @param {ol.Feature} feature - the ol feature
         * @param {LayerEsriMapServer} lyr - the map server layer
         * @param {string} popupContent - popup content
         * @param {string} esriName - esri layer name
         */

    }, {
        key: 'addMapServicePopupContent',
        value: function addMapServicePopupContent(feature, lyr, popupContent, esriName) {

            var featLayerObject = new _FeatureLayerProperties(feature, lyr, this._popupContentLength, this._selectionLayerLookup[lyr.id], esriName);
            featLayerObject.popupContent = popupContent;

            this._passThroughLayerFeatureArray.push(featLayerObject);
            this._popupContentLength++;

            (0, _jquery2.default)('.popup-content-length').html(this._popupContentLength.toFixed());

            if (!this._popupOpen) {
                this._$popupContent.find('.next-popup').trigger('click');

                this._popupOverlay.setPosition(this._popupCoordinate);
                this._$popupContent.scrollTop(0);
                this._popupOpen = true;
            }
        }

        /**
         *
         * @param {ol.Pixel} pixel - the ol pixel
         * @returns {Array.<_FeatureLayerProperties>} - feature layer properties
         * @private
         */

    }, {
        key: '_featuresAtPixel',
        value: function _featuresAtPixel(pixel) {
            var _this3 = this;

            var layerFeatureObjectArray = [];
            this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                var lyrIndex = _this3._arrPopupOlLayers.indexOf(layer);

                if (lyrIndex > -1) {
                    layerFeatureObjectArray.push(new _FeatureLayerProperties(feature, _this3._arrPopupLayers[lyrIndex], lyrIndex, _this3._selectionLayers[lyrIndex]));
                }
            });

            return layerFeatureObjectArray;
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this._checkInit();
            this._popupOpen = false;
            this._popupOverlay.setPosition(undefined);
            this._$popupCloser[0].blur();
            this.clearSelection();
            this._$popupContent.html('');

            return false;
        }
    }, {
        key: 'addPopupChangedFunction',


        /**
         *
         * @param {popupChangedFunction} chgFunction - popup change function
         */
        value: function addPopupChangedFunction(chgFunction) {
            this._popupChangedFunctions.push(chgFunction);
        }

        /**
         *
         * @param {LayerBase|*} lyr - the layer being acted on
         * @param {object} [selectionStyle={}] the selection style configuration
         * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
         * @param {number} [selectionStyle.width=10] the selection width for linear features
         * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
         * @returns {ol.layer.Vector} the new selection layer
         * @private
         */

    }, {
        key: '_addPopupLayer',
        value: function _addPopupLayer(lyr, selectionStyle) {
            this._checkInit();

            selectionStyle = selectionStyle || {};
            selectionStyle.color = selectionStyle.color || 'rgba(255,170,0,0.5)';
            selectionStyle.width = selectionStyle.width || 10;

            var theStyle = void 0;

            if (selectionStyle.olStyle) {
                theStyle = selectionStyle.olStyle;
            } else {
                theStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: selectionStyle.color,
                        width: selectionStyle.width
                    }),
                    image: new _ol2.default.style.Circle({
                        radius: 7,
                        fill: new _ol2.default.style.Fill({ color: selectionStyle.color }),
                        stroke: new _ol2.default.style.Stroke({ color: selectionStyle.color, width: 1 })
                    }),
                    fill: new _ol2.default.style.Fill({
                        color: selectionStyle.color
                    })
                });
            }

            var selectionLayer = new _ol2.default.layer.Vector({
                source: new _ol2.default.source.Vector(),
                style: theStyle,
                zIndex: 100
            });

            this._selectionLayers.push(selectionLayer);
            this._selectionLayerLookup[lyr.id] = selectionLayer;
            this.map.addLayer(selectionLayer);

            return selectionLayer;
        }

        /**
         * The popup callback function
         * @callback popupCallback
         * @param {object} featureProperties - the feature properties
         * @param {jQuery} jqRef reference to the div content to do some async stuff inside the div
         * @returns {string} the html content to be added to the popup
         */

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

    }, {
        key: 'addVectorPopup',
        value: function addVectorPopup(lyr, popupContentFunction, selectionStyle) {
            var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
            this._arrPopupLayerIds.push(lyr.id);
            this._arrPopupLayerNames.push(lyr.name);
            this._arrPopupLayers.push(lyr);
            this._arrPopupOlLayers.push(lyr.olLayer);
            this._arrPopupContentFunction.push(popupContentFunction);

            return selectionLayer;
        }
    }, {
        key: 'removeVectorPopup',


        /**
         *
         * @param {LayerBase} lyr - layer
         */
        value: function removeVectorPopup(lyr) {
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
        }

        /**
         *
         * @param {LayerEsriMapServer} lyr - map server layer
         * @param {object} [selectionStyle={}] the selection style configuration
         * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
         * @param {number} [selectionStyle.width=10] the selection width for linear features
         * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
         * @returns {object} a reference to the ol selection layer
         */

    }, {
        key: 'addMapServicePopup',
        value: function addMapServicePopup(lyr, selectionStyle) {
            var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
            this._esriMapServiceLayers.push(lyr);

            return selectionLayer;
        }
    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            this._checkInit();
            for (var i = 0; i < this._selectionLayers.length; i++) {
                this._selectionLayers[i].getSource().clear();
            }
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this._mapClickFunctions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var f = _step4.value;

                    f();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'addMapClickFunction',


        /**
         * Add a function to be called when the map is clicked but before any popups are implemented
         * @param {function} func - the map click function
         */
        value: function addMapClickFunction(func) {
            this._mapClickFunctions.push(func);
        }
    }]);

    return MapPopupCls;
}(_mapInteractionBase2.default);

nm.MapPopupCls = MapPopupCls;
exports.default = MapPopupCls;

},{"../jquery":15,"../ol/ol":32,"../olHelpers/propertiesZoomStyle":27,"../util/provide":35,"./mapInteractionBase":22}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _zoomResolutionConvert = require('./zoomResolutionConvert');

var zoomResolutionConvert = _interopRequireWildcard(_zoomResolutionConvert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by gavorhes on 12/14/2015.
 */

var nm = (0, _provide2.default)('olHelpers');

/**
 * A style function based on properties and zoom level, wraps normal feature, resolution function
 * @callback propertiesZoomStyle
 * @param {object} properties the feature properties
 * @param {number} zoom level
 *
 */

/**
 * wrapper to define a style function by properties and zoom level
 * @param {propertiesZoomStyle|*} styleFunc - style function
 * @returns {function|*} new function
 */
function propertiesZoomStyle(styleFunc) {
    if (styleFunc == undefined) {
        return undefined;
    }

    return function (feature, resolution) {
        styleFunc(feature.getProperties(), zoomResolutionConvert.resolutionToZoom(resolution));
    };
}

nm.propertiesZoomStyle = propertiesZoomStyle;
exports.default = propertiesZoomStyle;

},{"../util/provide":35,"./zoomResolutionConvert":30}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _mapMove = require('./mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

var _mapPopup = require('./mapPopup');

var _mapPopup2 = _interopRequireDefault(_mapPopup);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('olHelpers');

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
 * @returns {ol.Map} the ol map
 */
/**
 * Created by gavorhes on 3/25/2016.
 */

/**
 * Created by gavorhes on 12/15/2015.
 */

function quickMapBase(options) {
    options = options || {};
    options.divId = options.divId || 'map';
    options.center = options.center || {};
    options.center.x = typeof options.center.x == 'number' ? options.center.x : -10018378;
    options.center.y = typeof options.center.y == 'number' ? options.center.y : 5574910;
    options.zoom = typeof options.zoom == 'number' ? options.zoom : 7;
    options.baseSwitcher = typeof options.baseSwitcher == 'boolean' ? options.baseSwitcher : true;

    var $mapDiv = (0, _jquery2.default)('#' + options.divId);
    $mapDiv.css('position', 'relative');

    var osmLayer = new _ol2.default.layer.Tile({ source: new _ol2.default.source.OSM() });
    var satLayer = new _ol2.default.layer.Tile({ visible: false, source: new _ol2.default.source.MapQuest({ layer: 'sat' }) });

    var osmCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAADQ1NDk5OURFREtLS1FHSFlZWGJRVGJiYWdmZWxsbHRmaXBpanN0c3V0dHp5eX5+fIVzd4F3eeV0jud5juZ8k4aHhomHhoyGh5eGj5OVlJiVlZiYl5qZmJydnKOTlaKZmqKdnaOioaqqqKuzsbOvrrSysLa3tbW4uLm6ub27ub+/vbGXwbCZwbCgxLKlxrOqyLStybO3yrSxyrWzzbW2y7a1zbK4y7W6zbW8y760yrTAzbTFzrPKzrLOzrTJzrTOzr7CwbXC0LXK0LTO0L3I0bPQz7TQz7PS0bXQ0LnR0brW1bzT0r7U077V1Lzc2dqNqteUsdyXscaquuOHneaGmueHnOeJnuiBleiKn+eNoOiOoOWUpOiRo+iSpeiUpeqYpumaqOmdrPSynemgruSqtOmisOmlsuuqtequuOW1vOuxu+uxvOq1ve+xvPK0pvW3o/W5pfO5qvS7qfCwvMOuwc2/wNenxNyyzNe/0Nq31Nq51dy72Oy3wOu4wOu+xey4wO+6xO2+xfTAr/TCsvfFtPHLvvTJuMPDwMfHxcXKyc3DxMvFyMvLyM3PzcDV08DV1MTX1cbY1s7X1sjZ1sra2Mnd3M7b2c7c2tfH1tnB1t7F2d7M29fX1tLY1tDd2tHe3NTf3NnS19rZ1tva2Nnf3t3d28rh3tXg3Nnh3tzj393k39ni4N7k4N7n5uXDyOfLz+zAxu3CyOzEyezKzeDJ3eLM3uvP0u3P0ePf2+7R0u7Q1u/U0+7U1ezc0+7a2e/d2+3f3vbFzvLOwfHN0PPQw/TUx/LWyvLYzPDQ1fPe0ubc4vve4uHh3+nh3+/h2u/h3vHj2vHl3uHm4eTn4uDp5ebo4+Xo5ODq6ebq6OTv6+nl4+/j4O7l4e7n5ujp4+np5Ozq5e7s5urt6O7t6Orw6u7x6u3x7vPj5PDl4fDo4vDq5fDt5vDu6PDv7PTv6fDx6vHx7fH17fXw6fXy7fb07/bz8fT18vn38vr39fr48/r59Pr6+P3++//+/gAAALNTSk0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAFNElEQVRIS1VVCZxVUxi/9l0UIUT2bMnY43bVI2c0Y01kSWIaS0j2JEtkN41piomZrPPKQ2aQ7JKImOZlnm2493TJzDufuU1Zi+v/fee+mZ//793vnPOd7zvfes5zDBEZkBBjAcIjb+Iiotqgdhat8AMK0vl7/R9N7GiWtshqIr+EZ5gYKibyUsXY1l/mfFpssvUlWQ0FkU3gy4+RB/+kwYcO8pRSnldcOU/r2lAHARSwk2ORgEmOdC1EsuRiYSqMPwwroMIraZk5V2fYJQjCKfZrRmh3gSAZi2i4b7wSylWu8EqZwS59JkFUaW96JbNSc+CEUmt4rorwuZmWdDaoc+uZETuQlTCU5xYzR7muUnVUVo+BcRhre/VwUpasgJwhH7JkYIYA0sNxhmCwUK+lw6vCKBZehw01dEiyw4Q4aE0Z4ahDhKaFQsGnJ2BgqKoTBsNjFy0SlW6whRAZTdm8DBJmkBZhDi1j4xJQBk6ywrWUTymaCxac8lROcdauRGzQSNtA7EHUYhXyEwhhgjFUqRuO+rauhF1awFpzCsmwUbjIFBR0u1bKtyGpulW/H/cVVzkyGaIWTIR9pFAV6GK2gPMXMX8gPk9zzxXgI1kimcAltEYr+cjio1imlKpEa9rOipLm+p+CZ6Bw//qd1/f/O+GwMxbSLpyoZEcwkyh2jIks+3hmdd2jWUw4scxNysnHxU7nSspTRcJjCZGL3IsjsYJMMg5mwgx7gaIOLBFCogAgBBoNa9w+DE6I+Bs7FTgwwrJbHjWDgpYo2KwtBTcYEDuloC9geQw+k2RGnPGpTaOlq7AS+YICUz4DZVaX2TiNDhuYfTtY4geLi0IoCm3XccwM9hx4kU28StQEljDs3ZEpFGA+8dKzLmV9ymIwF5FOGn2GdJM8KLHDJbXyiYVMG9MRTLiXGGg2QKaxM3khPSRrwM9zEIardxU2w/EiA0gOeYKHzDR0V7/QGV3lKIA9ktrDArxO3gdA+k6SKoBiVwcm7NjZb9+Hnztg282TuHVZ9LOISFNt9MgyCetZVczSxnyDbl17Penq6mqpg1IhRaEO2aVLUO4/r17H8tTv6f13h71dduvZI3Y+uMdWksNSauLovJw5hsqiPIUvt0ku7/iBeUR3sksmomYWtRbAjbiLfv2lX9/V7LVG4uYnUZXhQ7f2OPCZEx9wrYWTcePEQqPEML8pl4mMdr/jlXlvHiRiJ2+MSTFY4TTSYStuvz2R/JXh+PPeGXm055J+3/YDWuNu3R3DArPutyg0ZgykMVDU9Ndm22+wYalr2rse48CnsTIFcMn73vfhNrktx1EUcZnPv6ah3Yy5cDTRdBEoGoBeah71dqFyjZDJLkWk3N3v4uuktssjWpzciMPxQeHj8nMKzcGuB0tAyzFhdCKOYWv4HwOQVwIxLG99a6uvH3sJCyO3h+k4EZ+G7+xj5f4XXksoaGrdMRzSc8ARA8+cdOuk2x6fffNNt5x+Ro1omPlrT/CQDlcNlpx4NBIWXhkx7Y3Zp3ofNR7Uv89Om/beW0TLIynHv3vs1VsOFpSWSXvfuPUf9BrRFyxgXdHoKJnQFegPOovvzz59ntrzye240ig8UQ3lDI2VqwagrKIQcLXNFL3wglN2OHdBQ6/vI3kENDVBwRb3k1XtczFbjWn4EzMYi7CF3129+JTYuRSdrGuS92g5dpqn6qXoJQs5xmL8p+Wt4hLbt0mx2OLNZR2bbPy8zJNQGFM/f/CfXZekRYFjGCWjIJpM+WiCzGBPWHhoyaAsjRT/B2Gy5yzYJkwUAAAAAElFTkSuQmCC')";
    var aerialCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQALBgIMDQgOBwQOEQcTBwUSCwoVDAwdBw8ZDgUREwYUGAYZFQYZGgkTFQoVGQsZFAwZHBMeDhIbFBEbHAwWIA4bIREcIQ4hCQwjFw4lHBgkDB8sDxUiExIiGhAoGxohFRshGRorHQcrKQsiIQwmKgooJA0pKQ81Jw8yLRMiIxImKxUrJREuKhslJB0rIhooKRUuMBMyLhkwJhozKh48LxUzMRM9MBwzMiUvFCMtGiMwEiwzFCgzHDI+GSIsISkvJSQxIiM2LiY5Jic+Lyk0JSo0Ky49JSs9KSU1NSM7NCs2NS8+NDM1JzU9Ljg7IDJCHS1DLSNAMitCMSxIOjREITZLIDZJKDlFIjpFKztKJT1LKzJBMzpHMD1JMjpKPD1RKjlQNC1DQj5QQEA8MEJGJkBKJUJNK0lLLEJMMkVMPEpONENSLUdZL0pTLkpaLkRUMkRSPEVZMktUM0pVOklZMklZNEpcNU1ZMk1ZNUxfMk5dNkxcOVFUM1RUOFJbNVFZOVNYPVFdOVJdPFVaOVVaPVVdOlVdPVpaNlpdO0phN01hOlBiN1NhPFNoP1piPWFbPmRjPENOQEtPSURTQkJVS0xVQk1VSkxbQkxcS0heUVFXRFRcQlJfTFxeQlpeS05lQk1kSFRjQVRjSlZpQ1tkQlxlSlxpRF1rSVVnUVtlU1llXF9tU1xoXlxwSl9ramRfQmJlQ2FhSWFlSWFlTmVlSWRmTGFoQWFpRWFsRmVpRWVtRmNsSmtlRGpqRmpsS2BmWGRsUmFrW2ptUmZyR2RxTGpxTWVyU2RyW2d5V2tzUmt0WW15VG15WXFuTHNtVnFxTXF4T3h0TnJzUnJ1XHJ4VXN6Wnp0VHx1W315VXp8XGR0YGx0YHVzZXJ0aHR9ZXV+aHl9YHOCXXqBXXeCYHyCY3iEaHyIYn+JaXqKcYB5WIN6Y4SCXoCDZIGEaYCIZoOLa4iCaImJbIOOdYuMco6OeIuVcpOKbZKPc5aQb5eXe5ufg6KjhAAAAAAAAAAAAAAAAOGCeQgAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAH80lEQVRISy1WbXQUVxm+6wqnk3Zmpxl2FG2EGg92C8GDlWptVTwa+uF3xcKmDfFzCUzDsJNsunXipglJXJbrtJWmwZNSnHD3jojRgUIm2UumIZ0JZ7JByrALbMWW0IBW8aRa4+cf76TeX3Nm3uc+z/s+7/vugl4r/aMTrT4e1pPTqnnmJNn5AyUzRnrRle/qE33dsvrBtAQVoxtpZNK3zSzYjUjviWO2Ag+R77dl7W36n/1Ep9KBPG/S+Py0PkjU/gPKQGqwTHryiWYFAXSvMairsio7SjyNsnCzh0qKImV9/7mhfHQZx2yN1O+7rXUm33MUPaboOkAJHaoIdXfJj2xWeyD8jMFEXkvIu5qzpU988gWB5zl+GS+sFe55trEVPdWZB2miq8bBVkNFO2R0qnrfkiXhcJhtDNXE6tbW97/s9O9/7ZfVhx86/CwrROpfvvxboMqeLsuqPr1j44qEwDNMOBximUiYoU8sw7BC/a7T72uEnyJDlGxZ9KcglZRyuqqrv/tSZErgOI4NgRBTIw9EmHAoFGZZnp6aGaJ2GTxfxYs8kKVUQh7WB5hQeC3LsUxoxVKW14l3BX2WcoUYPiZyLLe8teZ+iuT4GGhvV5KpKWkpyzxEr2MZgQ1xdRjfRBoH+2k6lIHjKTHPPBo8CSJISqqq4wGGOcWylIGlgvgNX1Gd8vF5f+IUIwb30ng+Gg2QfBRIMvy0jG8SVkYo4N0zvUXVRztbJ/L6xL7lUZEXBEHkuZqlS6gEAUgKJurnhFtfpACOYd8b/hVbJPqwi44a6KA0sPVjIi/SIyxb3u8KlAJ0S8jRVgrlW+nVHPdrhiXCxu42d86ByksDc80P3MkJFBFQ8Ho1lQegpWJRWFGsDsRwwv7pIyvuQW0ZkrX6NDVFbqcvaQI8vbyqzt5AARrsbKx5yhQEGs+wPO56bOK+0rcwMrOKkpUbZWYxV04UeZZv/cBKFhRL6Qdv9y4LfEDA7/thg7tTmv1a5/GnO0wl0dQg80wglZaHUmxRvjwAHOfyN0mxrpqLUpcjsK3NHYMo4R1o6eho2ZyIb2FoeOC3ILK8kZ2HQMOuWywGXUkJBCeTbYFS0+ym1h2/6UgmvnrvKYZZtIEXGf75C2cIAp5LHNd71x7uPoTjakrWH9e3KFpaatjUvJUysFw0KrLMYMW2lTg4PeUQx6kJEALvxXEmCdVyPLHtCSjBhc01XCjIgafxou+PE6KC1dhxSCwoBCc+N4P3btM84pmdSSjJnjO/nvY4LQfVyz5/I+v6IwjUOMjy+MVCxIbKupTJaEktp7cTKU42Pvjh2m/8cSpC6aPsaX/MHSuUQLVVsIa4RUTs/r/BVAexNdjdnsNG7j/rV93xheLMzKnFrPeTEQchCyCcKb25aAIn7lrAertrZwyNXM8N6zfWrFo3d2SmOEcF83x/r+OOFgrAHYWF7cELjhV7UQo/6WAIUVl9JFl8a//HZ66VpbY3I9QKZqPru77lA+iOWAIr0hKxHCmmr0othSyeIl5y3qt4xT8gSNrKEZozs8Els67rgsLOZ+ygzwMfbtNhobfgzpEyGnz7htPtzUi6PuOoj7K0WF/MXiUFxwGajRD1hjYXHXI9p406qOyinp5/tiWcDHY0jIu4n64Qfq7kliB2gemag9QbOia0PbbDMbd43SHuvxFxrAocxins7MX5Kqbe1QixKBxoV4//PfAgGCu+Rlm4SvZizyDH+0reDHp92iO0BuX3bCfItl0PEwvYLqpwXG2MHlGsQ4S8pMJZv1JGmHiEoHQDdOjwmVlEP/nE9ADKjI8xLI0OOGITfy0SbeG/C2jKUDGSlDhM9I3IpK9iup6XnbRNC7yqueNsJCCIiXzdQhnaGN+46umnEdy5U5UbUJ48LFM9GkJo8BdDOiAZ7ZIQbKhYLMqvhU2wmNxjEAsS2AI7y4nWF64duePbk7YV3zvAVLEMD9AxJRNa3KDUibV7DjnkuprMEYjScFNcaR2ceP2u9R/5k1052Ryme5phAFRswlHjAudiP4dOy7CaxLgdJh9vUlU1702/+LPa1U9fvPi9qlA4XEUBJc3dFlpsR457IDl1iPqLp7o81NQgyV19iYU38uTiv975Pd3SiwQcsGjx+v4/6fl5T7EOOMTCtpbKxfemsQq/3olQZcminADAAI0cuGLHaHOFxbuGvRk/Z9u7CULqoVR6NE0yx1avj30oRhc/jWUoIALGxkz0dg1Dl9iaI7LqOOXKsXJFwjiuEAi70Jra2nW1PL08zLBhZsMABpW5csI7TPfew9ipFKcn5k1i+1KyCWKjC3W/8dF1d666+RaabBVTFTHacjoojBNDh0NDxk+IPTlwfqJkWpbnpFHXIbLbmpxEQ3ff/Z0g/mauXsoln9wDRjy/NHsQFw3P6vWuTJ43/+FZrk2cvAFRipCKdfD9y2+pjRj78s0KdCUDKJvdV91ChngV38T20TM+gghjpJaPlpFr2xbEz5g4A/NGt5rNwdwmYGeeeMXBSLHHUIc+6RsojRH9VTUm3/mLf/64b470XvoxoTKhlMBQ2jMEzo2PjxdGMppmn1RM24bWFJqaQv4BcuJa2Sam7Zokq1ldCsz06NCBHrhwqVQYpfFj42NZexz1EW9SR/kT58nEeQKJb2fPXjjp0u/YUkwHEgLeOnf2nOuf1TRTM02CLKLTPy60/x1CCztqn7Ev+BdsC3m+30decQvW/wBNTwU+CfUQAQAAAABJRU5ErkJggg==')";

    if (options.baseSwitcher) {
        var switcherContent = '<div class="base-map-switcher" title="Toggle Base Layer" style="';
        switcherContent += 'position: absolute; top: 70px; left: 4px; border: solid black 1px; ';
        switcherContent += 'height: 50px; width: 50px; z-index: 10; border-radius: 4px; background: ' + aerialCss + ';';
        switcherContent += '"></div>';
        $mapDiv.append(switcherContent);

        $mapDiv.find('.base-map-switcher').click(function () {
            "use strict";

            osmLayer.setVisible(!osmLayer.getVisible());
            satLayer.setVisible(!satLayer.getVisible());

            if (osmLayer.getVisible()) {
                (0, _jquery2.default)(this).css('background', aerialCss);
            } else {
                (0, _jquery2.default)(this).css('background', osmCss);
            }
        });
    }

    if (options.zoom < 0 || options.zoom > 28) {
        throw 'zoom out of range';
    }

    if (options.center.x >= -180 && options.center.x <= 180 && options.center.y >= -90 && options.center.y <= 90) {
        var p = new _ol2.default.geom.Point([options.center.x, options.center.y]);
        p.transform("EPSG:4326", "EPSG:3857");
        var coordinates = p.getCoordinates();
        options.center.x = coordinates[0];
        options.center.y = coordinates[1];
    }

    return new _ol2.default.Map({
        layers: [osmLayer, satLayer],
        target: options.divId,
        controls: _ol2.default.control.defaults({
            attributionOptions: { collapsible: false }
        }),
        view: new _ol2.default.View({
            center: [options.center.x, options.center.y],
            zoom: options.zoom,
            minZoom: options.minZoom,
            maxZoom: options.maxZoom
        })
    });
}

nm.quickMapBase = quickMapBase;
exports.default = quickMapBase;

},{"../jquery":15,"../ol/ol":32,"../util/provide":35,"./mapMove":23,"./mapPopup":25}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _quickMapBase = require('./quickMapBase');

var _quickMapBase2 = _interopRequireDefault(_quickMapBase);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _mapMoveCls = require('./mapMoveCls');

var _mapMoveCls2 = _interopRequireDefault(_mapMoveCls);

var _mapPopupCls = require('./mapPopupCls');

var _mapPopupCls2 = _interopRequireDefault(_mapPopupCls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by gavorhes on 12/15/2015.
 */

var nm = (0, _provide2.default)('olHelpers');

/**
 * @typedef {object} quickMapMultiReturn
 * @property {ol.Map} map The X Coordinate
 * @property {MapMoveCls} mapMove The Y Coordinate
 * @property {MapPopupCls} mapPopup The Y Coordinate
 */

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
 * @returns {quickMapMultiReturn} return map, map move, and map popup objects
 */
function quickMapMulti(options) {
  var m = (0, _quickMapBase2.default)(options);
  var mov = new _mapMoveCls2.default();
  var pop = new _mapPopupCls2.default();
  mov.init(m);
  pop.init(m);

  return { map: m, mapMove: mov, mapPopup: pop };
}

nm.quickMapMulti = quickMapMulti;
exports.default = quickMapMulti;

},{"../util/provide":35,"./mapMoveCls":24,"./mapPopupCls":26,"./quickMapBase":28}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.zoomToResolution = zoomToResolution;
exports.resolutionToZoom = resolutionToZoom;

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('olHelpers.zoomResolutionConvert'); /**
                                                                     * Created by gavorhes on 12/14/2015.
                                                                     */

var _zoomResLookup = [156543.03392804097, //0
78271.51696402048, //1
39135.75848201024, //2
19567.87924100512, //3
9783.93962050256, //4
4891.96981025128, //5
2445.98490512564, //6
1222.99245256282, //7
611.49622628141, //8
305.748113140705, //9
152.8740565703525, //10
76.43702828517625, //11
38.21851414258813, //12
19.109257071294063, //13
9.554628535647032, //14
4.777314267823516, //15
2.388657133911758, //16
1.194328566955879, //17
0.5971642834779395, //18
0.29858214173896974, //19
0.14929107086948487, //20
0.07464553543474244, //21
0.03732276771737122, //22
0.01866138385868561, //23
0.009330691929342804, //24
0.004665345964671402, //25
0.002332672982335701, //26
0.0011663364911678506, //27
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
        } else {
            console.log('invalid zoom level provided: ' + zoomLevel);

            return undefined;
        }
    } else {
        return undefined;
    }
}
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

nm.resolutionToZoom = resolutionToZoom;

},{"../util/provide":35}],31:[function(require,module,exports){
// OpenLayers 3. See http://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ol = factory();
  }
}(this, function () {
  var OPENLAYERS = {};
  var p,x=this;function F(b,c,d){b=b.split(".");d=d||x;b[0]in d||!d.execScript||d.execScript("var "+b[0]);for(var e;b.length&&(e=b.shift());)b.length||void 0===c?d[e]?d=d[e]:d=d[e]={}:d[e]=c}function aa(b){b.ua=function(){return b.Ac?b.Ac:b.Ac=new b}}
function ba(b){var c=typeof b;if("object"==c)if(b){if(b instanceof Array)return"array";if(b instanceof Object)return c;var d=Object.prototype.toString.call(b);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof b.length&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof b.call)return"object";return c}function ca(b){var c=ba(b);return"array"==c||"object"==c&&"number"==typeof b.length}function da(b){return"string"==typeof b}function ea(b){return"number"==typeof b}function ga(b){return"function"==ba(b)}function ha(b){var c=typeof b;return"object"==c&&null!=b||"function"==c}function I(b){return b[ia]||(b[ia]=++ja)}var ia="closure_uid_"+(1E9*Math.random()>>>0),ja=0;function ka(b,c,d){return b.call.apply(b.bind,arguments)}
function la(b,c,d){if(!b)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,e);return b.apply(c,d)}}return function(){return b.apply(c,arguments)}}function ma(b,c,d){ma=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ka:la;return ma.apply(null,arguments)}
function na(b,c){var d=Array.prototype.slice.call(arguments,1);return function(){var c=d.slice();c.push.apply(c,arguments);return b.apply(this,c)}}function M(b,c){function d(){}d.prototype=c.prototype;b.$=c.prototype;b.prototype=new d;b.prototype.constructor=b;b.Ve=function(b,d,g){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return c.prototype[d].apply(b,h)}};var oa;function pa(){};var ra;var sa=String.prototype.trim?function(b){return b.trim()}:function(b){return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function ta(b){if(!ua.test(b))return b;-1!=b.indexOf("&")&&(b=b.replace(va,"&amp;"));-1!=b.indexOf("<")&&(b=b.replace(wa,"&lt;"));-1!=b.indexOf(">")&&(b=b.replace(xa,"&gt;"));-1!=b.indexOf('"')&&(b=b.replace(ya,"&quot;"));-1!=b.indexOf("'")&&(b=b.replace(za,"&#39;"));-1!=b.indexOf("\x00")&&(b=b.replace(Aa,"&#0;"));return b}var va=/&/g,wa=/</g,xa=/>/g,ya=/"/g,za=/'/g,Aa=/\x00/g,ua=/[\x00&<>"']/;
function Ba(b,c){return b<c?-1:b>c?1:0};function Ca(b,c,d){return Math.min(Math.max(b,c),d)}var Da=function(){var b;"cosh"in Math?b=Math.cosh:b=function(b){b=Math.exp(b);return(b+1/b)/2};return b}();function Ea(b,c){var d=b%c;return 0>d*c?d+c:d};function Fa(b){return function(c){if(c)return[Ca(c[0],b[0],b[2]),Ca(c[1],b[1],b[3])]}}function Ga(b){return b};function Ha(b,c){return b>c?1:b<c?-1:0}function Ia(b,c,d){var e=b.length;if(b[0]<=c)return 0;if(!(c<=b[e-1]))if(0<d)for(d=1;d<e;++d){if(b[d]<c)return d-1}else if(0>d)for(d=1;d<e;++d){if(b[d]<=c)return d}else for(d=1;d<e;++d){if(b[d]==c)return d;if(b[d]<c)return b[d-1]-c<c-b[d]?d-1:d}return e-1}function Ja(b){return b.reduce(function(b,d){return Array.isArray(d)?b.concat(Ja(d)):b.concat(d)},[])}function Ka(b,c){var d,e=ca(c)?c:[c],f=e.length;for(d=0;d<f;d++)b[b.length]=e[d]}
function La(b,c){var d=b.indexOf(c),e=-1<d;e&&b.splice(d,1);return e}function Ma(b,c){var d=b.length;if(d!==c.length)return!1;for(var e=0;e<d;e++)if(b[e]!==c[e])return!1;return!0}function Na(b){var c=Oa,d=b.length,e=Array(b.length),f;for(f=0;f<d;f++)e[f]={index:f,value:b[f]};e.sort(function(b,d){return c(b.value,d.value)||b.index-d.index});for(f=0;f<b.length;f++)b[f]=e[f].value};function Pa(b){return function(c,d,e){if(void 0!==c)return c=Ia(b,c,e),c=Ca(c+d,0,b.length-1),b[c]}}function Qa(b,c,d){return function(e,f,g){if(void 0!==e)return e=Math.max(Math.floor(Math.log(c/e)/Math.log(b)+(0<g?0:0>g?1:.5))+f,0),void 0!==d&&(e=Math.min(e,d)),c/Math.pow(b,e)}};function Ra(b){if(void 0!==b)return 0}function Sa(b,c){if(void 0!==b)return b+c}function Ta(b){var c=2*Math.PI/b;return function(b,e){if(void 0!==b)return b=Math.floor((b+e)/c+.5)*c}}function Ua(){var b=5*Math.PI/180;return function(c,d){if(void 0!==c)return Math.abs(c+d)<=b?0:c+d}};function Va(b,c,d){this.center=b;this.resolution=c;this.rotation=d};var Wa="function"===typeof Object.assign?Object.assign:function(b,c){if(void 0===b||null===b)throw new TypeError("Cannot convert undefined or null to object");for(var d=Object(b),e=1,f=arguments.length;e<f;++e){var g=arguments[e];if(void 0!==g&&null!==g)for(var h in g)g.hasOwnProperty(h)&&(d[h]=g[h])}return d};function Ya(b){for(var c in b)delete b[c]}function Za(b){var c=[],d;for(d in b)c.push(b[d]);return c}function $a(b){for(var c in b)return!1;return!c};var ab="olm_"+(1E4*Math.random()|0);function bb(b){function c(c){var e=b.listener,f=b.hc||b.target;b.kc&&N(b);return e.call(f,c)}return b.ic=c}function cb(b,c,d,e){for(var f,g=0,h=b.length;g<h;++g)if(f=b[g],f.listener===c&&f.hc===d)return e&&(f.deleteIndex=g),f}function db(b,c){var d=b[ab];return d?d[c]:void 0}function eb(b){var c=b[ab];c||(c=b[ab]={});return c}
function fb(b,c){var d=db(b,c);if(d){for(var e=0,f=d.length;e<f;++e)b.removeEventListener(c,d[e].ic),Ya(d[e]);d.length=0;if(d=b[ab])delete d[c],0===Object.keys(d).length&&delete b[ab]}}function Q(b,c,d,e,f){var g=eb(b),h=g[c];h||(h=g[c]=[]);(g=cb(h,d,e,!1))?f||(g.kc=!1):(g={hc:e,kc:!!f,listener:d,target:b,type:c},b.addEventListener(c,bb(g)),h.push(g));return g}function gb(b,c,d,e){(b=db(b,c))&&(d=cb(b,d,e,!0))&&N(d)}
function N(b){if(b&&b.target){b.target.removeEventListener(b.type,b.ic);var c=db(b.target,b.type);if(c){var d="deleteIndex"in b?b.deleteIndex:c.indexOf(b);-1!==d&&c.splice(d,1);0===c.length&&fb(b.target,b.type)}Ya(b)}}function hb(b){var c=eb(b),d;for(d in c)fb(b,d)};function ib(){}ib.prototype.ja=!1;function jb(b){b.ja||(b.ja=!0,b.J())}ib.prototype.J=pa;function R(b,c){this.type=b;this.target=c||null}R.prototype.preventDefault=R.prototype.stopPropagation=function(){this.we=!0};function kb(b){b.stopPropagation()}function lb(b){b.preventDefault()};function mb(){this.H={};this.A={}}M(mb,ib);mb.prototype.addEventListener=function(b,c){var d=this.A[b];d||(d=this.A[b]=[]);-1===d.indexOf(c)&&d.push(c)};function S(b,c){var d="string"===typeof c?new R(c):c,e=d.type;d.target=b;var f=b.A[e],g;if(f){e in b.H||(b.H[e]=0);for(var h=0,k=f.length;h<k;++h)if(!1===f[h].call(b,d)||d.we){g=!1;break}d=b.H[e];for(delete b.H[e];d--;)b.removeEventListener(e,pa);return g}}mb.prototype.J=function(){hb(this)};
function nb(b,c){return c?c in b.A:0<Object.keys(b.A).length}mb.prototype.removeEventListener=function(b,c){var d=this.A[b];if(d){var e=d.indexOf(c);b in this.H?(d[e]=pa,++this.H[b]):(d.splice(e,1),0===d.length&&delete this.A[b])}};function ob(){mb.call(this);this.f=0}M(ob,mb);ob.prototype.v=function(){++this.f;S(this,"change")};ob.prototype.ba=function(b,c,d){if(Array.isArray(b)){for(var e=b.length,f=Array(e),g=0;g<e;++g)f[g]=Q(this,b[g],c,d);return f}return Q(this,b,c,d)};function pb(b,c,d){R.call(this,b);this.key=c;this.oldValue=d}M(pb,R);function T(b){ob.call(this);I(this);this.K={};void 0!==b&&this.l(b)}M(T,ob);var qb={};function rb(b){return qb.hasOwnProperty(b)?qb[b]:qb[b]="change:"+b}T.prototype.get=function(b){var c;this.K.hasOwnProperty(b)&&(c=this.K[b]);return c};T.prototype.za=function(){return Wa({},this.K)};T.prototype.set=function(b,c,d){d?this.K[b]=c:(d=this.K[b],this.K[b]=c,d!==c&&(c=rb(b),S(this,new pb(c,b,d)),S(this,new pb("propertychange",b,d))))};
T.prototype.l=function(b,c){for(var d in b)this.set(d,b[d],c)};function sb(b,c,d){void 0===d&&(d=[0,0]);d[0]=b[0]*c+.5|0;d[1]=b[1]*c+.5|0;return d}function tb(b,c){if(Array.isArray(b))return b;void 0===c?c=[b,b]:(c[0]=b,c[1]=b);return c};function ub(b,c){b[0]+=c[0];b[1]+=c[1]}function vb(b,c){var d=Math.cos(c),e=Math.sin(c),f=b[1]*d+b[0]*e;b[0]=b[0]*d-b[1]*e;b[1]=f};function wb(b){this.length=b.length||b;for(var c=0;c<this.length;c++)this[c]=b[c]||0}wb.prototype.BYTES_PER_ELEMENT=4;wb.prototype.set=function(b,c){c=c||0;for(var d=0;d<b.length&&c+d<this.length;d++)this[c+d]=b[d]};wb.prototype.toString=Array.prototype.join;"undefined"==typeof Float32Array&&(wb.BYTES_PER_ELEMENT=4,wb.prototype.BYTES_PER_ELEMENT=wb.prototype.BYTES_PER_ELEMENT,wb.prototype.set=wb.prototype.set,wb.prototype.toString=wb.prototype.toString,F("Float32Array",wb,void 0));function xb(b){this.length=b.length||b;for(var c=0;c<this.length;c++)this[c]=b[c]||0}xb.prototype.BYTES_PER_ELEMENT=8;xb.prototype.set=function(b,c){c=c||0;for(var d=0;d<b.length&&c+d<this.length;d++)this[c+d]=b[d]};xb.prototype.toString=Array.prototype.join;if("undefined"==typeof Float64Array){try{xb.BYTES_PER_ELEMENT=8}catch(b){}xb.prototype.BYTES_PER_ELEMENT=xb.prototype.BYTES_PER_ELEMENT;xb.prototype.set=xb.prototype.set;xb.prototype.toString=xb.prototype.toString;F("Float64Array",xb,void 0)};function yb(b,c,d,e,f){b[0]=c;b[1]=d;b[2]=e;b[3]=f};function zb(){var b=Array(16);Ab(b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);return b}function Bb(){var b=Array(16);Ab(b,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return b}function Ab(b,c,d,e,f,g,h,k,l,m,n,q,r,u,w,y,z){b[0]=c;b[1]=d;b[2]=e;b[3]=f;b[4]=g;b[5]=h;b[6]=k;b[7]=l;b[8]=m;b[9]=n;b[10]=q;b[11]=r;b[12]=u;b[13]=w;b[14]=y;b[15]=z}
function Cb(b,c){b[0]=c[0];b[1]=c[1];b[2]=c[2];b[3]=c[3];b[4]=c[4];b[5]=c[5];b[6]=c[6];b[7]=c[7];b[8]=c[8];b[9]=c[9];b[10]=c[10];b[11]=c[11];b[12]=c[12];b[13]=c[13];b[14]=c[14];b[15]=c[15]}function Db(b){b[0]=1;b[1]=0;b[2]=0;b[3]=0;b[4]=0;b[5]=1;b[6]=0;b[7]=0;b[8]=0;b[9]=0;b[10]=1;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1}
function Eb(b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],k=b[5],l=b[6],m=b[7],n=b[8],q=b[9],r=b[10],u=b[11],w=b[12],y=b[13],z=b[14],D=b[15],t=d*k-e*h,v=d*l-f*h,B=d*m-g*h,E=e*l-f*k,C=e*m-g*k,G=f*m-g*l,J=n*y-q*w,A=n*z-r*w,H=n*D-u*w,O=q*z-r*y,P=q*D-u*y,L=r*D-u*z,K=t*L-v*P+B*O+E*H-C*A+G*J;0!=K&&(K=1/K,c[0]=(k*L-l*P+m*O)*K,c[1]=(-e*L+f*P-g*O)*K,c[2]=(y*G-z*C+D*E)*K,c[3]=(-q*G+r*C-u*E)*K,c[4]=(-h*L+l*H-m*A)*K,c[5]=(d*L-f*H+g*A)*K,c[6]=(-w*G+z*B-D*v)*K,c[7]=(n*G-r*B+u*v)*K,c[8]=(h*P-k*H+m*J)*K,c[9]=(-d*P+
e*H-g*J)*K,c[10]=(w*C-y*B+D*t)*K,c[11]=(-n*C+q*B-u*t)*K,c[12]=(-h*O+k*A-l*J)*K,c[13]=(d*O-e*A+f*J)*K,c[14]=(-w*E+y*v-z*t)*K,c[15]=(n*E-q*v+r*t)*K)}function Fb(b,c,d){var e=b[1]*c+b[5]*d+0*b[9]+b[13],f=b[2]*c+b[6]*d+0*b[10]+b[14],g=b[3]*c+b[7]*d+0*b[11]+b[15];b[12]=b[0]*c+b[4]*d+0*b[8]+b[12];b[13]=e;b[14]=f;b[15]=g}function Gb(b,c,d){Ab(b,b[0]*c,b[1]*c,b[2]*c,b[3]*c,b[4]*d,b[5]*d,b[6]*d,b[7]*d,1*b[8],1*b[9],1*b[10],1*b[11],b[12],b[13],b[14],b[15])}
function Hb(b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],k=b[5],l=b[6],m=b[7],n=Math.cos(c),q=Math.sin(c);b[0]=d*n+h*q;b[1]=e*n+k*q;b[2]=f*n+l*q;b[3]=g*n+m*q;b[4]=d*-q+h*n;b[5]=e*-q+k*n;b[6]=f*-q+l*n;b[7]=g*-q+m*n}new Float64Array(3);new Float64Array(3);new Float64Array(4);new Float64Array(4);new Float64Array(4);new Float64Array(16);function Ib(b){for(var c=Jb(),d=0,e=b.length;d<e;++d)Kb(c,b[d]);return c}function Lb(b,c,d){return d?(d[0]=b[0]-c,d[1]=b[1]-c,d[2]=b[2]+c,d[3]=b[3]+c,d):[b[0]-c,b[1]-c,b[2]+c,b[3]+c]}function Mb(b,c){return c?(c[0]=b[0],c[1]=b[1],c[2]=b[2],c[3]=b[3],c):b.slice()}function Nb(b,c){return b[0]<=c[0]&&c[2]<=b[2]&&b[1]<=c[1]&&c[3]<=b[3]}function Jb(){return[Infinity,Infinity,-Infinity,-Infinity]}function Ob(b,c,d,e,f){return f?(f[0]=b,f[1]=c,f[2]=d,f[3]=e,f):[b,c,d,e]}
function Pb(b){return Ob(Infinity,Infinity,-Infinity,-Infinity,b)}function Qb(b,c){var d=b[0],e=b[1];return Ob(d,e,d,e,c)}function Rb(b,c){return b[0]==c[0]&&b[2]==c[2]&&b[1]==c[1]&&b[3]==c[3]}function Sb(b,c){c[0]<b[0]&&(b[0]=c[0]);c[2]>b[2]&&(b[2]=c[2]);c[1]<b[1]&&(b[1]=c[1]);c[3]>b[3]&&(b[3]=c[3])}function Kb(b,c){c[0]<b[0]&&(b[0]=c[0]);c[0]>b[2]&&(b[2]=c[0]);c[1]<b[1]&&(b[1]=c[1]);c[1]>b[3]&&(b[3]=c[1])}
function Tb(b,c,d,e,f){for(;d<e;d+=f){var g=b,h=c[d],k=c[d+1];g[0]=Math.min(g[0],h);g[1]=Math.min(g[1],k);g[2]=Math.max(g[2],h);g[3]=Math.max(g[3],k)}return b}function Ub(b){var c=0;b[2]<b[0]||b[3]<b[1]||(c=Vb(b)*Wb(b));return c}function Xb(b){return[b[0],b[1]]}function Yb(b){return[(b[0]+b[2])/2,(b[1]+b[3])/2]}
function Zb(b,c,d,e){var f=c*e[0]/2;e=c*e[1]/2;c=Math.cos(d);var g=Math.sin(d);d=f*c;f*=g;c*=e;var h=e*g,k=b[0],l=b[1];b=k-d+h;e=k-d-h;g=k+d-h;d=k+d+h;var h=l-f-c,k=l-f+c,m=l+f+c,f=l+f-c;return Ob(Math.min(b,e,g,d),Math.min(h,k,m,f),Math.max(b,e,g,d),Math.max(h,k,m,f),void 0)}function Wb(b){return b[3]-b[1]}function $b(b,c){var d=Jb();ac(b,c)&&(d[0]=b[0]>c[0]?b[0]:c[0],d[1]=b[1]>c[1]?b[1]:c[1],d[2]=b[2]<c[2]?b[2]:c[2],d[3]=b[3]<c[3]?b[3]:c[3]);return d}function bc(b){return[b[0],b[3]]}
function Vb(b){return b[2]-b[0]}function ac(b,c){return b[0]<=c[2]&&b[2]>=c[0]&&b[1]<=c[3]&&b[3]>=c[1]};function cc(){return!0}function dc(){return!1};/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function ec(b){this.radius=b}function fc(b,c){var d=b[1]*Math.PI/180,e=c[1]*Math.PI/180,f=(e-d)/2,g=(c[0]-b[0])*Math.PI/180/2,d=Math.sin(f)*Math.sin(f)+Math.sin(g)*Math.sin(g)*Math.cos(d)*Math.cos(e);return 2*gc.radius*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))}
ec.prototype.offset=function(b,c,d){var e=b[1]*Math.PI/180;c/=this.radius;var f=Math.asin(Math.sin(e)*Math.cos(c)+Math.cos(e)*Math.sin(c)*Math.cos(d));return[180*(b[0]*Math.PI/180+Math.atan2(Math.sin(d)*Math.sin(c)*Math.cos(e),Math.cos(c)-Math.sin(e)*Math.sin(f)))/Math.PI,180*f/Math.PI]};var gc=new ec(6370997);var hc={};hc.degrees=2*Math.PI*gc.radius/360;hc.ft=.3048;hc.m=1;hc["us-ft"]=1200/3937;
function ic(b){this.qa=b.code;this.b=b.units;this.h=void 0!==b.extent?b.extent:null;this.f=void 0!==b.global?b.global:!1;this.a=!(!this.f||!this.h);this.i=void 0!==b.getPointResolution?b.getPointResolution:this.j;this.c=null;this.g=b.metersPerUnit;var c=jc,d=b.code,e=kc||x.proj4;if("function"==typeof e&&void 0===c[d]){var f=e.defs(d);if(void 0!==f){void 0===b.metersPerUnit&&(this.g=f.to_meter);void 0===b.units&&(this.b=f.units);var g,h;for(g in c)if(b=e.defs(g),void 0!==b)if(c=lc(g),b===f)mc([c,this]);
else{h=e(g,d);b=h.forward;h=h.inverse;var c=lc(c),k=lc(this);nc(c,k,oc(b));nc(k,c,oc(h))}}}}ic.prototype.l=function(){return this.qa};ic.prototype.C=function(){return this.h};function pc(b){return b.g||hc[b.b]}ic.prototype.j=function(b,c){if("degrees"==this.b)return b;var d=qc(this,lc("EPSG:4326")),e=[c[0]-b/2,c[1],c[0]+b/2,c[1],c[0],c[1]-b/2,c[0],c[1]+b/2],e=d(e,e,2),d=(fc(e.slice(0,2),e.slice(2,4))+fc(e.slice(4,6),e.slice(6,8)))/2,e=pc(this);void 0!==e&&(d/=e);return d};
ic.prototype.getPointResolution=function(b,c){return this.i(b,c)};var jc={},rc={},kc=null;function mc(b){sc(b);b.forEach(function(c){b.forEach(function(b){c!==b&&nc(c,b,tc)})})}function uc(b){jc[b.qa]=b;nc(b,b,tc)}function sc(b){var c=[];b.forEach(function(b){c.push(uc(b))})}function vc(b){return b?"string"===typeof b?lc(b):b:lc("EPSG:3857")}function nc(b,c,d){b=b.qa;c=c.qa;b in rc||(rc[b]={});rc[b][c]=d}
function oc(b){return function(c,d,e){var f=c.length;e=void 0!==e?e:2;d=void 0!==d?d:Array(f);var g,h;for(h=0;h<f;h+=e)for(g=b([c[h],c[h+1]]),d[h]=g[0],d[h+1]=g[1],g=e-1;2<=g;--g)d[h+g]=c[h+g];return d}}function lc(b){var c;if(b instanceof ic)c=b;else if("string"===typeof b){c=jc[b];var d=kc||x.proj4;void 0===c&&"function"==typeof d&&void 0!==d.defs(b)&&(c=new ic({code:b}),uc(c))}else c=null;return c}function wc(b,c){if(b===c)return!0;var d=b.b===c.b;return b.qa===c.qa?d:qc(b,c)===tc&&d}
function xc(b,c){var d=lc(b),e=lc(c);return qc(d,e)}function qc(b,c){var d=b.qa,e=c.qa,f;d in rc&&e in rc[d]&&(f=rc[d][e]);void 0===f&&(f=yc);return f}function yc(b,c){if(void 0!==c&&b!==c){for(var d=0,e=b.length;d<e;++d)c[d]=b[d];b=c}return b}function tc(b,c){var d;if(void 0!==c){d=0;for(var e=b.length;d<e;++d)c[d]=b[d];d=c}else d=b.slice();return d};function zc(){T.call(this);this.u=Jb();this.w=-1;this.h={};this.s=this.i=0}M(zc,T);zc.prototype.C=function(b){this.w!=this.f&&(this.u=this.ib(this.u),this.w=this.f);var c=this.u;b?(b[0]=c[0],b[1]=c[1],b[2]=c[2],b[3]=c[3]):b=c;return b};zc.prototype.o=function(b,c){this.Db(xc(b,c));return this};function Ac(b,c,d,e,f,g){var h=f[0],k=f[1],l=f[4],m=f[5],n=f[12];f=f[13];for(var q=g?g:[],r=0;c<d;c+=e){var u=b[c],w=b[c+1];q[r++]=h*u+l*w+n;q[r++]=k*u+m*w+f}g&&q.length!=r&&(q.length=r);return q};function Bc(){zc.call(this);this.g="XY";this.b=2;this.a=null}M(Bc,zc);function Cc(b){if("XY"==b)return 2;if("XYZ"==b||"XYM"==b)return 3;if("XYZM"==b)return 4}p=Bc.prototype;p.ib=function(b){var c=this.a,d=this.a.length,e=this.b;b=Pb(b);return Tb(b,c,0,d,e)};
p.Nb=function(b){this.s!=this.f&&(Ya(this.h),this.i=0,this.s=this.f);if(0>b||0!==this.i&&b<=this.i)return this;var c=b.toString();if(this.h.hasOwnProperty(c))return this.h[c];var d=this.Ma(b);if(d.a.length<this.a.length)return this.h[c]=d;this.i=b;return this};p.Ma=function(){return this};function U(b,c,d){b.b=Cc(c);b.g=c;b.a=d}function Dc(b,c,d,e){if(c)d=Cc(c);else{for(c=0;c<e;++c){if(0===d.length){b.g="XY";b.b=2;return}d=d[0]}d=d.length;c=2==d?"XY":3==d?"XYZ":4==d?"XYZM":void 0}b.g=c;b.b=d}
p.Db=function(b){this.a&&(b(this.a,this.a,this.b),this.v())};p.rotate=function(b,c){var d=this.a;if(d){for(var e=d.length,f=this.b,g=d?d:[],h=Math.cos(b),k=Math.sin(b),l=c[0],m=c[1],n=0,q=0;q<e;q+=f){var r=d[q]-l,u=d[q+1]-m;g[n++]=l+r*h-u*k;g[n++]=m+r*k+u*h;for(r=q+2;r<q+f;++r)g[n++]=d[r]}d&&g.length!=n&&(g.length=n);this.v()}};function Ec(b,c){var d=0,e,f;e=0;for(f=c.length;e<f;++e)b[d++]=c[e];return d}function Fc(b,c,d,e){var f,g;f=0;for(g=d.length;f<g;++f){var h=d[f],k;for(k=0;k<e;++k)b[c++]=h[k]}return c}function Gc(b,c,d,e,f){f=f?f:[];var g=0,h,k;h=0;for(k=d.length;h<k;++h)c=Fc(b,c,d[h],e),f[g++]=c;f.length=g;return f};function Hc(b,c,d,e,f){f=void 0!==f?f:[];for(var g=0;c<d;c+=e)f[g++]=b.slice(c,c+e);f.length=g;return f}function Ic(b,c,d,e,f){f=void 0!==f?f:[];var g=0,h,k;h=0;for(k=d.length;h<k;++h){var l=d[h];f[g++]=Hc(b,c,l,e,f[g]);c=l}f.length=g;return f};function Jc(b,c,d,e,f,g,h){var k=(d-c)/e;if(3>k){for(;c<d;c+=e)g[h++]=b[c],g[h++]=b[c+1];return h}var l=Array(k);l[0]=1;l[k-1]=1;d=[c,d-e];for(var m=0,n;0<d.length;){var q=d.pop(),r=d.pop(),u=0,w=b[r],y=b[r+1],z=b[q],D=b[q+1];for(n=r+e;n<q;n+=e){var t,v=b[n];t=b[n+1];var B=w,E=y,C=z-B,G=D-E;if(0!==C||0!==G){var J=((v-B)*C+(t-E)*G)/(C*C+G*G);1<J?(B=z,E=D):0<J&&(B+=C*J,E+=G*J)}v=B-v;t=E-t;t=v*v+t*t;t>u&&(m=n,u=t)}u>f&&(l[(m-c)/e]=1,r+e<m&&d.push(r,m),m+e<q&&d.push(m,q))}for(n=0;n<k;++n)l[n]&&(g[h++]=
b[c+n*e],g[h++]=b[c+n*e+1]);return h}
function Kc(b,c,d,e,f,g,h,k){var l,m;l=0;for(m=d.length;l<m;++l){var n=d[l];a:{var q=b,r=n,u=e,w=f,y=g;if(c!=r){var z=w*Math.round(q[c]/w),D=w*Math.round(q[c+1]/w);c+=u;y[h++]=z;y[h++]=D;var t=void 0,v=void 0;do if(t=w*Math.round(q[c]/w),v=w*Math.round(q[c+1]/w),c+=u,c==r){y[h++]=t;y[h++]=v;break a}while(t==z&&v==D);for(;c<r;){var B,E;B=w*Math.round(q[c]/w);E=w*Math.round(q[c+1]/w);c+=u;if(B!=t||E!=v){var C=t-z,G=v-D,J=B-z,A=E-D;C*A==G*J&&(0>C&&J<C||C==J||0<C&&J>C)&&(0>G&&A<G||G==A||0<G&&A>G)||(y[h++]=
t,y[h++]=v,z=t,D=v);t=B;v=E}}y[h++]=t;y[h++]=v}}k.push(h);c=n}return h};function Lc(b,c){Bc.call(this);this.W(b,c)}M(Lc,Bc);p=Lc.prototype;p.clone=function(){var b=new Lc(null);U(b,this.g,this.a.slice());b.v();return b};p.ra=function(){return Hc(this.a,0,this.a.length,this.b)};p.Ma=function(b){var c=[];c.length=Jc(this.a,0,this.a.length,this.b,b,c,0);b=new Lc(null);U(b,"XY",c);b.v();return b};p.U=function(){return"LinearRing"};p.W=function(b,c){b?(Dc(this,c,b,1),this.a||(this.a=[]),this.a.length=Fc(this.a,0,b,this.b)):U(this,"XY",null);this.v()};function Mc(b,c){Bc.call(this);this.W(b,c)}M(Mc,Bc);p=Mc.prototype;p.clone=function(){var b=new Mc(null);U(b,this.g,this.a.slice());b.v();return b};p.ra=function(){return this.a?this.a.slice():[]};p.ib=function(b){return Qb(this.a,b)};p.U=function(){return"Point"};p.W=function(b,c){b?(Dc(this,c,b,0),this.a||(this.a=[]),this.a.length=Ec(this.a,b)):U(this,"XY",null);this.v()};function Nc(b,c,d,e,f,g){for(var h=!1,k=b[d-e],l=b[d-e+1];c<d;c+=e){var m=b[c],n=b[c+1];l>g!=n>g&&f<(m-k)*(g-l)/(n-l)+k&&(h=!h);k=m;l=n}return h};function Oc(b,c,d,e,f,g,h){var k,l,m,n,q,r=f[g+1],u=[],w=d[0];m=b[w-e];q=b[w-e+1];for(k=c;k<w;k+=e){n=b[k];l=b[k+1];if(r<=q&&l<=r||q<=r&&r<=l)m=(r-q)/(l-q)*(n-m)+m,u.push(m);m=n;q=l}w=NaN;q=-Infinity;u.sort(Ha);m=u[0];k=1;for(l=u.length;k<l;++k){n=u[k];var y=Math.abs(n-m);if(y>q){m=(m+n)/2;var z;a:if(0!==d.length&&Nc(b,c,d[0],e,m,r)){var D=z=void 0;z=1;for(D=d.length;z<D;++z)if(Nc(b,d[z-1],d[z],e,m,r)){z=!1;break a}z=!0}else z=!1;z&&(w=m,q=y)}m=n}isNaN(w)&&(w=f[g]);return h?(h.push(w,r),h):[w,r]}
;function Pc(b,c,d,e){for(var f=0,g=b[d-e],h=b[d-e+1];c<d;c+=e)var k=b[c],l=b[c+1],f=f+(k-g)*(l+h),g=k,h=l;return 0<f}function Qc(b,c,d,e){var f=0;e=void 0!==e?e:!1;var g,h;g=0;for(h=c.length;g<h;++g){var k=c[g],f=Pc(b,f,k,d);if(0===g){if(e&&f||!e&&!f)return!1}else if(e&&!f||!e&&f)return!1;f=k}return!0}
function Rc(b,c,d,e,f){f=void 0!==f?f:!1;var g,h;g=0;for(h=d.length;g<h;++g){var k=d[g],l=Pc(b,c,k,e);if(0===g?f&&l||!f&&!l:f&&!l||!f&&l)for(var l=b,m=k,n=e;c<m-n;){var q;for(q=0;q<n;++q){var r=l[c+q];l[c+q]=l[m-n+q];l[m-n+q]=r}c+=n;m-=n}c=k}return c}function Sc(b,c,d,e){var f=0,g,h;g=0;for(h=c.length;g<h;++g)f=Rc(b,f,c[g],d,e);return f};function Tc(b,c){Bc.call(this);this.c=[];this.B=-1;this.D=null;this.G=-1;this.j=null;this.W(b,c)}M(Tc,Bc);p=Tc.prototype;p.clone=function(){var b=new Tc(null);Uc(b,this.g,this.a.slice(),this.c.slice());return b};p.ra=function(b){var c;void 0!==b?(c=Vc(this).slice(),Rc(c,0,this.c,this.b,b)):c=this.a;return Ic(c,0,this.c,this.b)};p.$a=function(){return this.c};function Wc(b){if(b.B!=b.f){var c=Yb(b.C());b.D=Oc(Vc(b),0,b.c,b.b,c,0);b.B=b.f}return b.D}
function Vc(b){if(b.G!=b.f){var c=b.a;Qc(c,b.c,b.b)?b.j=c:(b.j=c.slice(),b.j.length=Rc(b.j,0,b.c,b.b));b.G=b.f}return b.j}p.Ma=function(b){var c=[],d=[];c.length=Kc(this.a,0,this.c,this.b,Math.sqrt(b),c,0,d);b=new Tc(null);Uc(b,"XY",c,d);return b};p.U=function(){return"Polygon"};p.W=function(b,c){if(b){Dc(this,c,b,2);this.a||(this.a=[]);var d=Gc(this.a,0,b,this.b,this.c);this.a.length=0===d.length?0:d[d.length-1];this.v()}else Uc(this,"XY",null,this.c)};function Uc(b,c,d,e){U(b,c,d);b.c=e;b.v()};function V(b){T.call(this);b=b||{};this.g=[0,0];var c={};c.center=void 0!==b.center?b.center:null;this.h=vc(b.projection);var d,e,f,g=void 0!==b.minZoom?b.minZoom:0;d=void 0!==b.maxZoom?b.maxZoom:28;var h=void 0!==b.zoomFactor?b.zoomFactor:2;if(void 0!==b.resolutions)d=b.resolutions,e=d[0],f=d[d.length-1],d=Pa(d);else{e=vc(b.projection);f=e.C();var k=(f?Math.max(Vb(f),Wb(f)):360*hc.degrees/pc(e))/256/Math.pow(2,0),l=k/Math.pow(2,28);e=b.maxResolution;void 0!==e?g=0:e=k/Math.pow(h,g);f=b.minResolution;
void 0===f&&(f=void 0!==b.maxZoom?void 0!==b.maxResolution?e/Math.pow(h,d):k/Math.pow(h,d):l);d=g+Math.floor(Math.log(e/f)/Math.log(h));f=e/Math.pow(h,d-g);d=Qa(h,e,d-g)}this.b=e;this.i=f;this.c=g;g=void 0!==b.extent?Fa(b.extent):Ga;(void 0!==b.enableRotation?b.enableRotation:1)?(e=b.constrainRotation,e=void 0===e||!0===e?Ua():!1===e?Sa:ea(e)?Ta(e):Sa):e=Ra;this.a=new Va(g,d,e);void 0!==b.resolution?c.resolution=b.resolution:void 0!==b.zoom&&(c.resolution=this.constrainResolution(this.b,b.zoom-this.c));
c.rotation=void 0!==b.rotation?b.rotation:0;this.l(c)}M(V,T);p=V.prototype;p.constrainResolution=function(b,c,d){return this.a.resolution(b,c||0,d||0)};p.constrainRotation=function(b,c){return this.a.rotation(b,c||0)};p.ia=function(){return this.get("center")};p.jc=function(b){var c=this.ia(),d=this.I(),e=this.Y();return Zb(c,d,e,b)};p.ke=function(){return this.h};p.I=function(){return this.get("resolution")};function Xc(b,c){return Math.max(Vb(b)/c[0],Wb(b)/c[1])}p.Y=function(){return this.get("rotation")};
p.N=function(){var b=this.ia(),c=this.h,d=this.I(),e=this.Y();return{center:[Math.round(b[0]/d)*d,Math.round(b[1]/d)*d],projection:void 0!==c?c:null,resolution:d,rotation:e}};p.vd=function(){var b,c=this.I();if(void 0!==c){var d,e=0;do{d=this.constrainResolution(this.b,e);if(d==c){b=e;break}++e}while(d>this.i)}return void 0!==b?this.c+b:b};
p.md=function(b,c,d){if(!(b instanceof Bc)){var e=b[0],f=b[1],g=b[2],h=b[3],e=[e,f,e,h,g,h,g,f,e,f],f=new Tc(null);Uc(f,"XY",e,[e.length]);b=f}e=d||{};d=void 0!==e.padding?e.padding:[0,0,0,0];var h=void 0!==e.constrainResolution?e.constrainResolution:!0,f=void 0!==e.nearest?e.nearest:!1,k;void 0!==e.minResolution?k=e.minResolution:void 0!==e.maxZoom?k=this.constrainResolution(this.b,e.maxZoom-this.c,0):k=0;var l=b.a,g=this.Y(),e=Math.cos(-g),g=Math.sin(-g),m=Infinity,n=Infinity,q=-Infinity,r=-Infinity;
b=b.b;for(var u=0,w=l.length;u<w;u+=b)var y=l[u]*e-l[u+1]*g,z=l[u]*g+l[u+1]*e,m=Math.min(m,y),n=Math.min(n,z),q=Math.max(q,y),r=Math.max(r,z);c=Xc([m,n,q,r],[c[0]-d[1]-d[3],c[1]-d[0]-d[2]]);c=isNaN(c)?k:Math.max(c,k);h&&(k=this.constrainResolution(c,0,0),!f&&k<c&&(k=this.constrainResolution(k,-1,0)),c=k);Yc(this,c);g=-g;k=(m+q)/2+(d[1]-d[3])/2*c;c=(n+r)/2+(d[0]-d[2])/2*c;this.oa([k*e-c*g,c*e+k*g])};
p.rotate=function(b,c){if(void 0!==c){var d,e=this.ia();void 0!==e&&(d=[e[0]-c[0],e[1]-c[1]],vb(d,b-this.Y()),ub(d,c));this.oa(d)}this.set("rotation",b)};p.oa=function(b){this.set("center",b)};function Zc(b,c){b.g[1]+=c}function Yc(b,c){b.set("resolution",c)}p.De=function(b){b=this.constrainResolution(this.b,b-this.c,0);Yc(this,b)};function $c(b){return 1-Math.pow(1-b,3)}function ad(b){return 3*b*b-2*b*b*b}function bd(b){return b};function cd(b){var c=b.source,d=b.start?b.start:Date.now(),e=c[0],f=c[1],g=void 0!==b.duration?b.duration:1E3,h=b.easing?b.easing:ad;return function(b,c){if(c.time<d)return c.animate=!0,c.viewHints[0]+=1,!0;if(c.time<d+g){var m=1-h((c.time-d)/g),n=e-c.viewState.center[0],q=f-c.viewState.center[1];c.animate=!0;c.viewState.center[0]+=m*n;c.viewState.center[1]+=m*q;c.viewHints[0]+=1;return!0}return!1}}
function dd(b){var c=b.rotation?b.rotation:0,d=b.start?b.start:Date.now(),e=void 0!==b.duration?b.duration:1E3,f=b.easing?b.easing:ad,g=b.anchor?b.anchor:null;return function(b,k){if(k.time<d)return k.animate=!0,k.viewHints[0]+=1,!0;if(k.time<d+e){var l=1-f((k.time-d)/e),l=(c-k.viewState.rotation)*l;k.animate=!0;k.viewState.rotation+=l;if(g){var m=k.viewState.center;m[0]-=g[0];m[1]-=g[1];vb(m,l);ub(m,g)}k.viewHints[0]+=1;return!0}return!1}}
function ed(b){var c=b.resolution,d=b.start?b.start:Date.now(),e=void 0!==b.duration?b.duration:1E3,f=b.easing?b.easing:ad;return function(b,h){if(h.time<d)return h.animate=!0,h.viewHints[0]+=1,!0;if(h.time<d+e){var k=1-f((h.time-d)/e),l=c-h.viewState.resolution;h.animate=!0;h.viewState.resolution+=k*l;h.viewHints[0]+=1;return!0}return!1}};function fd(b,c,d,e){this.a=b;this.f=c;this.b=d;this.c=e}function gd(b,c,d){return b.a<=c&&c<=b.f&&b.b<=d&&d<=b.c}function hd(b,c){return b.a==c.a&&b.b==c.b&&b.f==c.f&&b.c==c.c}fd.prototype.ha=function(){return this.f-this.a+1};function id(b,c){return b.a<=c.f&&b.f>=c.a&&b.b<=c.c&&b.c>=c.b};function jd(b){this.b=b.html;this.a=b.tileRanges?b.tileRanges:null};function kd(b,c,d){R.call(this,b,d);this.element=c}M(kd,R);function ld(b){T.call(this);this.a=b?b:[];md(this)}M(ld,T);p=ld.prototype;p.clear=function(){for(;0<this.get("length");)this.pop()};function nd(b,c,d){b.a.forEach(c,d)}p.item=function(b){return this.a[b]};p.pop=function(){return od(this,this.get("length")-1)};p.push=function(b){var c=this.a.length;this.a.splice(c,0,b);md(this);S(this,new kd("add",b,this));return c};
p.remove=function(b){var c=this.a,d,e;d=0;for(e=c.length;d<e;++d)if(c[d]===b)return od(this,d)};function od(b,c){var d=b.a[c];b.a.splice(c,1);md(b);S(b,new kd("remove",d,b));return d}function md(b){b.set("length",b.a.length)};function pd(b,c){Array.prototype.forEach.call(b,c,void 0)}function qd(b){var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];return d}return[]}function rd(b,c,d){return 2>=arguments.length?Array.prototype.slice.call(b,c):Array.prototype.slice.call(b,c,d)};var sd=/^#(?:[0-9a-f]{3}){1,2}$/i,td=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i,ud=/^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;function vd(b){if("string"!==typeof b){var c=b[0];c!=(c|0)&&(c=c+.5|0);var d=b[1];d!=(d|0)&&(d=d+.5|0);var e=b[2];e!=(e|0)&&(e=e+.5|0);b="rgba("+c+","+d+","+e+","+(void 0===b[3]?1:b[3])+")"}return b}
var xd=function(){var b={},c=0;return function(d){var e;if(b.hasOwnProperty(d))e=b[d];else{if(1024<=c){e=0;for(var f in b)0===(e++&3)&&(delete b[f],--c)}var g,h;sd.exec(d)?(h=3==d.length-1?1:2,e=parseInt(d.substr(1+0*h,h),16),f=parseInt(d.substr(1+1*h,h),16),g=parseInt(d.substr(1+2*h,h),16),1==h&&(e=(e<<4)+e,f=(f<<4)+f,g=(g<<4)+g),e=[e,f,g,1]):(h=ud.exec(d))?(e=Number(h[1]),f=Number(h[2]),g=Number(h[3]),h=Number(h[4]),e=[e,f,g,h],e=wd(e,e)):(h=td.exec(d))?(e=Number(h[1]),f=Number(h[2]),g=Number(h[3]),
e=[e,f,g,1],e=wd(e,e)):e=void 0;b[d]=e;++c}return e}}();function wd(b,c){var d=c||[];d[0]=Ca(b[0]+.5|0,0,255);d[1]=Ca(b[1]+.5|0,0,255);d[2]=Ca(b[2]+.5|0,0,255);d[3]=Ca(b[3],0,1);return d};function yd(b){return"string"===typeof b||b instanceof CanvasPattern||b instanceof CanvasGradient?b:vd(b)};var zd;a:{var Ad=x.navigator;if(Ad){var Bd=Ad.userAgent;if(Bd){zd=Bd;break a}}zd=""}function W(b){return-1!=zd.indexOf(b)};function Cd(b,c){for(var d in b)c.call(void 0,b[d],d,b)}var Dd="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ed(b,c){for(var d,e,f=1;f<arguments.length;f++){e=arguments[f];for(d in e)b[d]=e[d];for(var g=0;g<Dd.length;g++)d=Dd[g],Object.prototype.hasOwnProperty.call(e,d)&&(b[d]=e[d])}};var Fd=W("Opera")||W("OPR"),Gd=W("Trident")||W("MSIE"),Hd=W("Edge"),Id=W("Gecko")&&!(-1!=zd.toLowerCase().indexOf("webkit")&&!W("Edge"))&&!(W("Trident")||W("MSIE"))&&!W("Edge"),Jd=-1!=zd.toLowerCase().indexOf("webkit")&&!W("Edge");function Kd(){var b=x.document;return b?b.documentMode:void 0}var Ld;
a:{var Md="",Nd=function(){var b=zd;if(Id)return/rv\:([^\);]+)(\)|;)/.exec(b);if(Hd)return/Edge\/([\d\.]+)/.exec(b);if(Gd)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(b);if(Jd)return/WebKit\/(\S+)/.exec(b);if(Fd)return/(?:Version)[ \/]?(\S+)/.exec(b)}();Nd&&(Md=Nd?Nd[1]:"");if(Gd){var Od=Kd();if(null!=Od&&Od>parseFloat(Md)){Ld=String(Od);break a}}Ld=Md}var Pd={};
function Qd(b){var c;if(!(c=Pd[b])){c=0;for(var d=sa(String(Ld)).split("."),e=sa(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",k=e[g]||"",l=RegExp("(\\d*)(\\D*)","g"),m=RegExp("(\\d*)(\\D*)","g");do{var n=l.exec(h)||["","",""],q=m.exec(k)||["","",""];if(0==n[0].length&&0==q[0].length)break;c=Ba(0==n[1].length?0:parseInt(n[1],10),0==q[1].length?0:parseInt(q[1],10))||Ba(0==n[2].length,0==q[2].length)||Ba(n[2],q[2])}while(0==c)}c=Pd[b]=0<=c}return c}
var Rd=x.document,Sd=Rd&&Gd?Kd()||("CSS1Compat"==Rd.compatMode?parseInt(Ld,10):5):void 0;var Td=!Gd||9<=Number(Sd);!Id&&!Gd||Gd&&9<=Number(Sd)||Id&&Qd("1.9.1");Gd&&Qd("9");function Ud(b,c){this.x=void 0!==b?b:0;this.y=void 0!==c?c:0}p=Ud.prototype;p.clone=function(){return new Ud(this.x,this.y)};p.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};p.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};p.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};p.scale=function(b,c){var d=ea(c)?c:b;this.x*=b;this.y*=d;return this};function Vd(b,c){this.width=b;this.height=c}p=Vd.prototype;p.clone=function(){return new Vd(this.width,this.height)};p.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};p.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};p.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};p.scale=function(b,c){var d=ea(c)?c:b;this.width*=b;this.height*=d;return this};function Wd(b){return b?new Xd(Yd(b)):ra||(ra=new Xd)}function Zd(b){var c=document;return da(b)?c.getElementById(b):b}function $d(b,c){Cd(c,function(c,e){"style"==e?b.style.cssText=c:"class"==e?b.className=c:"for"==e?b.htmlFor=c:ae.hasOwnProperty(e)?b.setAttribute(ae[e],c):0==e.lastIndexOf("aria-",0)||0==e.lastIndexOf("data-",0)?b.setAttribute(e,c):b[e]=c})}
var ae={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function be(b,c,d){var e=arguments,f=document,g=e[0],h=e[1];if(!Td&&h&&(h.name||h.type)){g=["<",g];h.name&&g.push(' name="',ta(h.name),'"');if(h.type){g.push(' type="',ta(h.type),'"');var k={};Ed(k,h);delete k.type;h=k}g.push(">");g=g.join("")}g=f.createElement(g);h&&(da(h)?g.className=h:"array"==ba(h)?g.className=h.join(" "):$d(g,h));2<e.length&&ce(f,g,e);return g}
function ce(b,c,d){function e(d){d&&c.appendChild(da(d)?b.createTextNode(d):d)}for(var f=2;f<d.length;f++){var g=d[f];!ca(g)||ha(g)&&0<g.nodeType?e(g):pd(de(g)?qd(g):g,e)}}function ee(b){for(var c;c=b.firstChild;)b.removeChild(c)}function fe(b,c,d){b.insertBefore(c,b.childNodes[d]||null)}function ge(b){b&&b.parentNode&&b.parentNode.removeChild(b)}
function he(b,c){if(!b||!c)return!1;if(b.contains&&1==c.nodeType)return b==c||b.contains(c);if("undefined"!=typeof b.compareDocumentPosition)return b==c||!!(b.compareDocumentPosition(c)&16);for(;c&&b!=c;)c=c.parentNode;return c==b}function Yd(b){return 9==b.nodeType?b:b.ownerDocument||b.document}function de(b){if(b&&"number"==typeof b.length){if(ha(b))return"function"==typeof b.item||"string"==typeof b.item;if(ga(b))return"function"==typeof b.item}return!1}
function Xd(b){this.a=b||x.document||document}Xd.prototype.appendChild=function(b,c){b.appendChild(c)};function ie(b,c,d,e){this.top=b;this.right=c;this.bottom=d;this.left=e}p=ie.prototype;p.ha=function(){return this.right-this.left};p.clone=function(){return new ie(this.top,this.right,this.bottom,this.left)};p.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};
p.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};p.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};p.scale=function(b,c){var d=ea(c)?c:b;this.left*=b;this.right*=b;this.top*=d;this.bottom*=d;return this};function je(b,c){var d=Yd(b);return d.defaultView&&d.defaultView.getComputedStyle&&(d=d.defaultView.getComputedStyle(b,null))?d[c]||d.getPropertyValue(c)||"":""}function ke(b){var c;try{c=b.getBoundingClientRect()}catch(d){return{left:0,top:0,right:0,bottom:0}}Gd&&b.ownerDocument.body&&(b=b.ownerDocument,c.left-=b.documentElement.clientLeft+b.body.clientLeft,c.top-=b.documentElement.clientTop+b.body.clientTop);return c}
function le(b){var c=me;if("none"!=(je(b,"display")||(b.currentStyle?b.currentStyle.display:null)||b.style&&b.style.display))return c(b);var d=b.style,e=d.display,f=d.visibility,g=d.position;d.visibility="hidden";d.position="absolute";d.display="inline";b=c(b);d.display=e;d.position=g;d.visibility=f;return b}function me(b){var c=b.offsetWidth,d=b.offsetHeight,e=Jd&&!c&&!d;return(void 0===c||e)&&b.getBoundingClientRect?(b=ke(b),new Vd(b.right-b.left,b.bottom-b.top)):new Vd(c,d)}
function ne(b,c){b.style.display=c?"":"none"}function oe(b,c,d,e){if(/^\d+px?$/.test(c))return parseInt(c,10);var f=b.style[d],g=b.runtimeStyle[d];b.runtimeStyle[d]=b.currentStyle[d];b.style[d]=c;c=b.style[e];b.style[d]=f;b.runtimeStyle[d]=g;return c}function pe(b,c){var d=b.currentStyle?b.currentStyle[c]:null;return d?oe(b,d,"left","pixelLeft"):0}var qe={thin:2,medium:4,thick:6};
function re(b,c){if("none"==(b.currentStyle?b.currentStyle[c+"Style"]:null))return 0;var d=b.currentStyle?b.currentStyle[c+"Width"]:null;return d in qe?qe[d]:oe(b,d,"left","pixelLeft")};function se(b,c,d){R.call(this,b);this.map=c;this.frameState=void 0!==d?d:null}M(se,R);function te(b){T.call(this);this.element=b.element?b.element:null;this.g=this.B=null;this.i=[];this.render=b.render?b.render:pa;b.target&&(this.B=Zd(b.target))}M(te,T);te.prototype.J=function(){ge(this.element);te.$.J.call(this)};te.prototype.setMap=function(b){this.g&&ge(this.element);for(var c=0,d=this.i.length;c<d;++c)N(this.i[c]);this.i.length=0;if(this.g=b)(this.B?this.B:b.j).appendChild(this.element),this.render!==pa&&this.i.push(Q(b,"postrender",this.render,this)),b.render()};function ue(){this.f=0;this.c={};this.b=this.a=null}p=ue.prototype;p.clear=function(){this.f=0;this.c={};this.b=this.a=null};function ve(b,c){return b.c.hasOwnProperty(c)}function we(b,c){for(var d=b.a;d;)c.call(void 0,d.Ia,d.Qb,b),d=d.ma}p.get=function(b){b=this.c[b];if(b===this.b)return b.Ia;b===this.a?(this.a=this.a.ma,this.a.Qa=null):(b.ma.Qa=b.Qa,b.Qa.ma=b.ma);b.ma=null;b.Qa=this.b;this.b=this.b.ma=b;return b.Ia};
p.pop=function(){var b=this.a;delete this.c[b.Qb];b.ma&&(b.ma.Qa=null);this.a=b.ma;this.a||(this.b=null);--this.f;return b.Ia};p.replace=function(b,c){this.get(b);this.c[b].Ia=c};p.set=function(b,c){var d={Qb:b,ma:null,Qa:this.b,Ia:c};this.b?this.b.ma=d:this.a=d;this.b=d;this.c[b]=d;++this.f};function xe(b){ue.call(this);this.g=void 0!==b?b:2048}M(xe,ue);function ye(b){return b.f>b.g}function ze(b,c){for(var d,e;ye(b);){d=b.a.Ia;e=d.L[0].toString();var f;if(f=e in c)d=d.L,f=gd(c[e],d[1],d[2]);if(f)break;else jb(b.pop())}};function Ae(b,c){mb.call(this);this.L=b;this.state=c;this.a=null;this.key=""}M(Ae,mb);function Be(b){S(b,"change")}Ae.prototype.getKey=function(){return I(this).toString()};Ae.prototype.N=function(){return this.state};function Ce(b){T.call(this);this.c=lc(b.projection);this.i=De(b.attributions);this.w=b.logo;this.B=void 0!==b.state?b.state:"ready";this.j=void 0!==b.wrapX?b.wrapX:!1}M(Ce,T);function De(b){if("string"===typeof b)return[new jd({html:b})];if(b instanceof jd)return[b];if(Array.isArray(b)){for(var c=b.length,d=Array(c),e=0;e<c;e++){var f=b[e];d[e]="string"===typeof f?new jd({html:f}):f}return d}return null}Ce.prototype.N=function(){return this.B};Ce.prototype.wa=function(){this.v()};function Ee(b){this.minZoom=void 0!==b.minZoom?b.minZoom:0;this.b=b.resolutions;this.maxZoom=this.b.length-1;this.f=void 0!==b.origin?b.origin:null;this.g=null;void 0!==b.origins&&(this.g=b.origins);var c=b.extent;void 0===c||this.f||this.g||(this.f=bc(c));this.h=null;void 0!==b.tileSizes&&(this.h=b.tileSizes);this.l=void 0!==b.tileSize?b.tileSize:this.h?null:256;this.i=void 0!==c?c:null;this.a=null;void 0!==b.sizes?this.a=b.sizes.map(function(b){return new fd(Math.min(0,b[0]),Math.max(b[0]-1,-1),
Math.min(0,b[1]),Math.max(b[1]-1,-1))},this):c&&Fe(this,c);this.c=[0,0]}var Ge=[0,0,0];function He(b,c,d,e,f){f=Ie(b,c,f);for(c=c[0]-1;c>=b.minZoom;){if(d.call(null,c,Je(b,f,c,e)))return!0;--c}return!1}Ee.prototype.C=function(){return this.i};Ee.prototype.ka=function(b){return this.f?this.f:this.g[b]};Ee.prototype.I=function(b){return this.b[b]};Ee.prototype.Mb=function(){return this.b};function Ke(b,c,d,e){return c[0]<b.maxZoom?(e=Ie(b,c,e),Je(b,e,c[0]+1,d)):null}
function Le(b,c,d,e){Me(b,c[0],c[1],d,!1,Ge);var f=Ge[1],g=Ge[2];Me(b,c[2],c[3],d,!0,Ge);b=Ge[1];c=Ge[2];void 0!==e?(e.a=f,e.f=b,e.b=g,e.c=c):e=new fd(f,b,g,c);return e}function Je(b,c,d,e){d=b.I(d);return Le(b,c,d,e)}function Ne(b,c){var d=b.ka(c[0]),e=b.I(c[0]),f=tb(Oe(b,c[0]),b.c);return[d[0]+(c[1]+.5)*f[0]*e,d[1]+(c[2]+.5)*f[1]*e]}function Ie(b,c,d){var e=b.ka(c[0]),f=b.I(c[0]);b=tb(Oe(b,c[0]),b.c);var g=e[0]+c[1]*b[0]*f;c=e[1]+c[2]*b[1]*f;return Ob(g,c,g+b[0]*f,c+b[1]*f,d)}
function Me(b,c,d,e,f,g){var h=Pe(b,e),k=e/b.I(h),l=b.ka(h);b=tb(Oe(b,h),b.c);c=k*Math.floor((c-l[0])/e+(f?.5:0))/b[0];d=k*Math.floor((d-l[1])/e+(f?0:.5))/b[1];f?(c=Math.ceil(c)-1,d=Math.ceil(d)-1):(c=Math.floor(c),d=Math.floor(d));f=c;void 0!==g?(g[0]=h,g[1]=f,g[2]=d):g=[h,f,d];return g}function Qe(b,c,d){d=b.I(d);return Me(b,c[0],c[1],d,!1,void 0)}function Oe(b,c){return b.l?b.l:b.h[c]}function Pe(b,c){var d=Ia(b.b,c,0);return Ca(d,b.minZoom,b.maxZoom)}
function Fe(b,c){for(var d=b.b.length,e=Array(d),f=b.minZoom;f<d;++f)e[f]=Je(b,c,f);b.a=e}function Re(b){var c=b.c;if(!c){var c=Se(b),d=Te(c,void 0,void 0),c=new Ee({extent:c,origin:bc(c),resolutions:d,tileSize:void 0});b.c=c}return c}function Te(b,c,d){c=void 0!==c?c:42;var e=Wb(b);b=Vb(b);d=tb(void 0!==d?d:256);d=Math.max(b/d[0],e/d[1]);c+=1;e=Array(c);for(b=0;b<c;++b)e[b]=d/Math.pow(2,b);return e}function Se(b){b=lc(b);var c=b.C();c||(b=180*hc.degrees/pc(b),c=Ob(-b,-b,b,b));return c};function Ue(b){Ce.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,projection:b.projection,state:b.state,wrapX:b.wrapX});this.G=void 0!==b.opaque?b.opaque:!1;this.X=void 0!==b.tilePixelRatio?b.tilePixelRatio:1;this.tileGrid=void 0!==b.tileGrid?b.tileGrid:null;this.a=new xe(b.cacheSize);this.h=[0,0]}M(Ue,Ce);p=Ue.prototype;p.Qc=function(){return ye(this.a)};p.Rc=function(b,c){var d=this.bb(b);d&&ze(d,c)};
function Ve(b,c,d,e,f){c=b.bb(c);if(!c)return!1;for(var g=!0,h,k,l=e.a;l<=e.f;++l)for(var m=e.b;m<=e.c;++m)h=b.lb(d,l,m),k=!1,ve(c,h)&&(h=c.get(h),(k=2===h.N())&&(k=!1!==f(h))),k||(g=!1);return g}p.kb=function(){return 0};p.lb=function(b,c,d){return b+"/"+c+"/"+d};p.Lb=function(){return this.G};p.Mb=function(){return this.tileGrid.Mb()};p.la=function(b){return this.tileGrid?this.tileGrid:Re(b)};p.bb=function(b){var c=this.c;return c&&!wc(c,b)?null:this.a};p.mb=function(){return this.X};
function We(b,c,d,e){e=b.la(e);d=b.mb(d);c=tb(Oe(e,c),b.h);return 1==d?c:sb(c,d,b.h)}function Xe(b,c,d){var e=void 0!==d?d:b.c;d=b.la(e);if(b.j&&e.f){var f=c;c=f[0];b=Ne(d,f);var e=Se(e),g=b[0],h=b[1];e[0]<=g&&g<=e[2]&&e[1]<=h&&h<=e[3]?c=f:(f=Vb(e),b[0]+=f*Math.ceil((e[0]-b[0])/f),c=Qe(d,b,c))}e=c[0];b=c[1];f=c[2];d=d.minZoom>e||e>d.maxZoom?!1:(d=(g=d.C())?Je(d,g,e):d.a?d.a[e]:null)?gd(d,b,f):!0;return d?c:null}p.wa=function(){this.a.clear();this.v()};p.Yc=pa;
function Ye(b,c){R.call(this,b);this.tile=c}M(Ye,R);function Ze(b){b=b?b:{};this.s=document.createElement("UL");this.j=document.createElement("LI");this.s.appendChild(this.j);ne(this.j,!1);this.c=void 0!==b.collapsed?b.collapsed:!0;this.h=void 0!==b.collapsible?b.collapsible:!0;this.h||(this.c=!1);var c=void 0!==b.className?b.className:"ol-attribution",d=void 0!==b.tipLabel?b.tipLabel:"Attributions",e=void 0!==b.collapseLabel?b.collapseLabel:"\u00bb";this.u="string"===typeof e?be("SPAN",{},e):e;e=void 0!==b.label?b.label:"i";this.w="string"===typeof e?
be("SPAN",{},e):e;d=be("BUTTON",{type:"button",title:d},this.h&&!this.c?this.u:this.w);Q(d,"click",this.G,this);c=be("DIV",c+" ol-unselectable ol-control"+(this.c&&this.h?" ol-collapsed":"")+(this.h?"":" ol-uncollapsible"),this.s,d);te.call(this,{element:c,render:b.render?b.render:$e,target:b.target});this.o=!0;this.b={};this.a={};this.D={}}M(Ze,te);
function $e(b){if(b=b.frameState){var c,d,e,f,g,h,k,l,m,n,q,r=b.layerStatesArray,u=Wa({},b.attributions),w={},y=b.viewState.projection;d=0;for(c=r.length;d<c;d++)if(h=r[d].layer.V())if(n=I(h).toString(),m=h.i)for(e=0,f=m.length;e<f;e++)if(k=m[e],l=I(k).toString(),!(l in u)){if(g=b.usedTiles[n]){var z=h.la(y);a:{q=k;var D=y;if(q.a){var t=void 0,v=void 0,B=void 0,E=void 0;for(E in g)if(E in q.a)for(var B=g[E],C,t=0,v=q.a[E].length;t<v;++t){C=q.a[E][t];if(id(C,B)){q=!0;break a}var G=Je(z,Se(D),parseInt(E,
10)),J=G.ha();if(B.a<G.a||B.f>G.f)if(id(C,new fd(Ea(B.a,J),Ea(B.f,J),B.b,B.c))||B.ha()>J&&id(C,G)){q=!0;break a}}q=!1}else q=!0}}else q=!1;q?(l in w&&delete w[l],u[l]=k):w[l]=k}c=[u,w];d=c[0];c=c[1];for(var A in this.b)A in d?(this.a[A]||(ne(this.b[A],!0),this.a[A]=!0),delete d[A]):A in c?(this.a[A]&&(ne(this.b[A],!1),delete this.a[A]),delete c[A]):(ge(this.b[A]),delete this.b[A],delete this.a[A]);for(A in d)e=document.createElement("LI"),e.innerHTML=d[A].b,this.s.appendChild(e),this.b[A]=e,this.a[A]=
!0;for(A in c)e=document.createElement("LI"),e.innerHTML=c[A].b,ne(e,!1),this.s.appendChild(e),this.b[A]=e;A=!$a(this.a)||!$a(b.logos);this.o!=A&&(ne(this.element,A),this.o=A);A&&$a(this.a)?this.element.classList.add("ol-logo-only"):this.element.classList.remove("ol-logo-only");var H;b=b.logos;A=this.D;for(H in A)H in b||(ge(A[H]),delete A[H]);for(var O in b)O in A||(H=new Image,H.src=O,d=b[O],""===d?d=H:(d=be("A",{href:d}),d.appendChild(H)),this.j.appendChild(d),A[O]=d);ne(this.j,!$a(b))}else this.o&&
(ne(this.element,!1),this.o=!1)}Ze.prototype.G=function(b){b.preventDefault();this.element.classList.toggle("ol-collapsed");if(this.c){b=this.w;var c=b.parentNode;c&&c.replaceChild(this.u,b)}else b=this.u,(c=b.parentNode)&&c.replaceChild(this.w,b);this.c=!this.c};function af(b){b=b?b:{};var c=void 0!==b.className?b.className:"ol-rotate",d=void 0!==b.label?b.label:"\u21e7";this.a=null;"string"===typeof d?this.a=be("SPAN","ol-compass",d):(this.a=d,this.a.classList.add(this.a,"ol-compass"));d=be("BUTTON",{"class":c+"-reset",type:"button",title:b.tipLabel?b.tipLabel:"Reset rotation"},this.a);Q(d,"click",af.prototype.o,this);c=be("DIV",c+" ol-unselectable ol-control",d);d=b.render?b.render:bf;this.c=b.resetNorth?b.resetNorth:void 0;te.call(this,{element:c,render:d,
target:b.target});this.h=void 0!==b.duration?b.duration:250;this.b=void 0!==b.autoHide?b.autoHide:!0;this.j=void 0;this.b&&this.element.classList.add("ol-hidden")}M(af,te);af.prototype.o=function(b){b.preventDefault();if(void 0!==this.c)this.c();else{b=this.g;var c=b.O();if(c){var d=c.Y();void 0!==d&&(0<this.h&&(d%=2*Math.PI,d<-Math.PI&&(d+=2*Math.PI),d>Math.PI&&(d-=2*Math.PI),b.fa(dd({rotation:d,duration:this.h,easing:$c}))),c.set("rotation",0))}}};
function bf(b){if(b=b.frameState){b=b.viewState.rotation;if(b!=this.j){var c="rotate("+b+"rad)";if(this.b){var d=this.element.classList.contains("ol-hidden");d||0!==b?d&&0!==b&&this.element.classList.remove("ol-hidden"):this.element.classList.add("ol-hidden")}this.a.style.msTransform=c;this.a.style.webkitTransform=c;this.a.style.transform=c}this.j=b}};function cf(b){b=b?b:{};var c=void 0!==b.className?b.className:"ol-zoom",d=void 0!==b.delta?b.delta:1,e=void 0!==b.zoomOutLabel?b.zoomOutLabel:"\u2212",f=void 0!==b.zoomOutTipLabel?b.zoomOutTipLabel:"Zoom out",g=be("BUTTON",{"class":c+"-in",type:"button",title:void 0!==b.zoomInTipLabel?b.zoomInTipLabel:"Zoom in"},void 0!==b.zoomInLabel?b.zoomInLabel:"+");Q(g,"click",na(cf.prototype.b,d),this);e=be("BUTTON",{"class":c+"-out",type:"button",title:f},e);Q(e,"click",na(cf.prototype.b,-d),this);c=be("DIV",
c+" ol-unselectable ol-control",g,e);te.call(this,{element:c,target:b.target});this.a=void 0!==b.duration?b.duration:250}M(cf,te);cf.prototype.b=function(b,c){c.preventDefault();var d=this.g,e=d.O();if(e){var f=e.I();f&&(0<this.a&&d.fa(ed({resolution:f,duration:this.a,easing:$c})),d=e.constrainResolution(f,b),Yc(e,d))}};function df(b){b=b?b:{};var c=new ld;(void 0!==b.zoom?b.zoom:1)&&c.push(new cf(b.zoomOptions));(void 0!==b.rotate?b.rotate:1)&&c.push(new af(b.rotateOptions));(void 0!==b.attribution?b.attribution:1)&&c.push(new Ze(b.attributionOptions));return c};var ef;
function ff(){var b=x.MessageChannel;"undefined"===typeof b&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!W("Presto")&&(b=function(){var b=document.createElement("IFRAME");b.style.display="none";b.src="";document.documentElement.appendChild(b);var c=b.contentWindow,b=c.document;b.open();b.write("");b.close();var d="callImmediate"+Math.random(),e="file:"==c.location.protocol?"*":c.location.protocol+"//"+c.location.host,b=ma(function(b){if(("*"==e||b.origin==e)&&b.data==
d)this.port1.onmessage()},this);c.addEventListener("message",b,!1);this.port1={};this.port2={postMessage:function(){c.postMessage(d,e)}}});if("undefined"!==typeof b&&!W("Trident")&&!W("MSIE")){var c=new b,d={},e=d;c.port1.onmessage=function(){if(void 0!==d.next){d=d.next;var b=d.lc;d.lc=null;b()}};return function(b){e.next={lc:b};e=e.next;c.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(b){var c=document.createElement("SCRIPT");
c.onreadystatechange=function(){c.onreadystatechange=null;c.parentNode.removeChild(c);c=null;b();b=null};document.documentElement.appendChild(c)}:function(b){x.setTimeout(b,0)}};function gf(b,c,d){R.call(this,b);this.a=c;b=d?d:{};this.buttons=hf(b);this.pressure=jf(b,this.buttons);this.bubbles="bubbles"in b?b.bubbles:!1;this.cancelable="cancelable"in b?b.cancelable:!1;this.view="view"in b?b.view:null;this.detail="detail"in b?b.detail:null;this.screenX="screenX"in b?b.screenX:0;this.screenY="screenY"in b?b.screenY:0;this.clientX="clientX"in b?b.clientX:0;this.clientY="clientY"in b?b.clientY:0;this.button="button"in b?b.button:0;this.relatedTarget="relatedTarget"in b?b.relatedTarget:
null;this.pointerId="pointerId"in b?b.pointerId:0;this.width="width"in b?b.width:0;this.height="height"in b?b.height:0;this.pointerType="pointerType"in b?b.pointerType:"";this.isPrimary="isPrimary"in b?b.isPrimary:!1;c.preventDefault&&(this.preventDefault=function(){c.preventDefault()})}M(gf,R);function hf(b){if(b.buttons||kf)b=b.buttons;else switch(b.which){case 1:b=1;break;case 2:b=4;break;case 3:b=2;break;default:b=0}return b}function jf(b,c){var d=0;b.pressure?d=b.pressure:d=c?.5:0;return d}
var kf=!1;try{kf=1===(new MouseEvent("click",{buttons:1})).buttons}catch(b){};function lf(b,c){var d=document.createElement("CANVAS");b&&(d.width=b);c&&(d.height=c);return d.getContext("2d")}
var mf=function(){var b;return function(){if(void 0===b){var c=document.createElement("P"),d,e={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(c);for(var f in e)f in c.style&&(c.style[f]="translate(1px,1px)",d=x.getComputedStyle(c).getPropertyValue(e[f]));document.body.removeChild(c);b=d&&"none"!==d}return b}}(),nf=function(){var b;return function(){if(void 0===b){var c=document.createElement("P"),
d,e={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(c);for(var f in e)f in c.style&&(c.style[f]="translate3d(1px,1px,1px)",d=x.getComputedStyle(c).getPropertyValue(e[f]));document.body.removeChild(c);b=d&&"none"!==d}return b}}();
function of(b,c){var d=b.style;d.WebkitTransform=c;d.MozTransform=c;d.a=c;d.msTransform=c;d.transform=c;Gd&&Qd("9.0")&&(b.style.transformOrigin="0 0")}function pf(b,c){var d;if(nf()){var e=Array(16);for(d=0;16>d;++d)e[d]=c[d].toFixed(6);of(b,"matrix3d("+e.join(",")+")")}else if(mf()){var e=[c[0],c[1],c[4],c[5],c[12],c[13]],f=Array(6);for(d=0;6>d;++d)f[d]=e[d].toFixed(6);of(b,"matrix("+f.join(",")+")")}else b.style.left=Math.round(c[12])+"px",b.style.top=Math.round(c[13])+"px"};var qf=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function rf(b,c){var d,e,f=qf.length;for(e=0;e<f;++e)try{if(d=b.getContext(qf[e],c))return d}catch(g){}return null};var sf,tf="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"",uf=-1!==tf.indexOf("firefox"),vf=-1!==tf.indexOf("safari")&&-1===tf.indexOf("chrom"),wf=-1!==tf.indexOf("macintosh"),xf=x.devicePixelRatio||1,yf=!1,zf=function(){if(!("HTMLCanvasElement"in x))return!1;try{var b=lf();return b?(void 0!==b.setLineDash&&(yf=!0),!0):!1}catch(c){return!1}}(),Af="ontouchstart"in x,Bf="PointerEvent"in x,Cf=!!x.navigator.msPointerEnabled,Df=!1,Ef=[];
if("WebGLRenderingContext"in x)try{var Ff=rf(document.createElement("CANVAS"),{failIfMajorPerformanceCaveat:!0});Ff&&(Df=!0,Ef=Ff.getSupportedExtensions())}catch(b){}sf=Df;oa=Ef;function Gf(b,c){this.a=b;this.g=c};function Hf(b){Gf.call(this,b,{mousedown:this.Ud,mousemove:this.Vd,mouseup:this.Yd,mouseover:this.Xd,mouseout:this.Wd});this.b=b.b;this.f=[]}M(Hf,Gf);function If(b,c){for(var d=b.f,e=c.clientX,f=c.clientY,g=0,h=d.length,k;g<h&&(k=d[g]);g++){var l=Math.abs(f-k[1]);if(25>=Math.abs(e-k[0])&&25>=l)return!0}return!1}function Jf(b){var c=Kf(b,b),d=c.preventDefault;c.preventDefault=function(){b.preventDefault();d()};c.pointerId=1;c.isPrimary=!0;c.pointerType="mouse";return c}p=Hf.prototype;
p.Ud=function(b){if(!If(this,b)){if((1).toString()in this.b){var c=Jf(b);Lf(this.a,Mf,c,b);delete this.b[(1).toString()]}c=Jf(b);this.b[(1).toString()]=b;Lf(this.a,Nf,c,b)}};p.Vd=function(b){if(!If(this,b)){var c=Jf(b);Lf(this.a,Of,c,b)}};p.Yd=function(b){if(!If(this,b)){var c=this.b[(1).toString()];c&&c.button===b.button&&(c=Jf(b),Lf(this.a,Pf,c,b),delete this.b[(1).toString()])}};p.Xd=function(b){if(!If(this,b)){var c=Jf(b);Qf(this.a,c,b)}};
p.Wd=function(b){if(!If(this,b)){var c=Jf(b);Rf(this.a,c,b)}};function Sf(b){Gf.call(this,b,{MSPointerDown:this.ce,MSPointerMove:this.de,MSPointerUp:this.ge,MSPointerOut:this.ee,MSPointerOver:this.fe,MSPointerCancel:this.be,MSGotPointerCapture:this.$d,MSLostPointerCapture:this.ae});this.b=b.b;this.f=["","unavailable","touch","pen","mouse"]}M(Sf,Gf);function Tf(b,c){var d=c;ea(c.pointerType)&&(d=Kf(c,c),d.pointerType=b.f[c.pointerType]);return d}p=Sf.prototype;p.ce=function(b){this.b[b.pointerId.toString()]=b;var c=Tf(this,b);Lf(this.a,Nf,c,b)};
p.de=function(b){var c=Tf(this,b);Lf(this.a,Of,c,b)};p.ge=function(b){var c=Tf(this,b);Lf(this.a,Pf,c,b);delete this.b[b.pointerId.toString()]};p.ee=function(b){var c=Tf(this,b);Rf(this.a,c,b)};p.fe=function(b){var c=Tf(this,b);Qf(this.a,c,b)};p.be=function(b){var c=Tf(this,b);Lf(this.a,Mf,c,b);delete this.b[b.pointerId.toString()]};p.ae=function(b){S(this.a,new gf("lostpointercapture",b,b))};p.$d=function(b){S(this.a,new gf("gotpointercapture",b,b))};function Uf(b){Gf.call(this,b,{pointerdown:this.re,pointermove:this.se,pointerup:this.ve,pointerout:this.te,pointerover:this.ue,pointercancel:this.qe,gotpointercapture:this.wd,lostpointercapture:this.Td})}M(Uf,Gf);p=Uf.prototype;p.re=function(b){Vf(this.a,b)};p.se=function(b){Vf(this.a,b)};p.ve=function(b){Vf(this.a,b)};p.te=function(b){Vf(this.a,b)};p.ue=function(b){Vf(this.a,b)};p.qe=function(b){Vf(this.a,b)};p.Td=function(b){Vf(this.a,b)};p.wd=function(b){Vf(this.a,b)};function Wf(b,c){Gf.call(this,b,{touchstart:this.He,touchmove:this.Ge,touchend:this.Fe,touchcancel:this.Ee});this.b=b.b;this.l=c;this.f=void 0;this.h=0;this.c=void 0}M(Wf,Gf);p=Wf.prototype;p.Vc=function(){this.h=0;this.c=void 0};
function Xf(b,c,d){c=Kf(c,d);c.pointerId=d.identifier+2;c.bubbles=!0;c.cancelable=!0;c.detail=b.h;c.button=0;c.buttons=1;c.width=d.webkitRadiusX||d.radiusX||0;c.height=d.webkitRadiusY||d.radiusY||0;c.pressure=d.webkitForce||d.force||.5;c.isPrimary=b.f===d.identifier;c.pointerType="touch";c.clientX=d.clientX;c.clientY=d.clientY;c.screenX=d.screenX;c.screenY=d.screenY;return c}
function Yf(b,c,d){function e(){c.preventDefault()}var f=Array.prototype.slice.call(c.changedTouches),g=f.length,h,k;for(h=0;h<g;++h)k=Xf(b,c,f[h]),k.preventDefault=e,d.call(b,c,k)}
p.He=function(b){var c=b.touches,d=Object.keys(this.b),e=d.length;if(e>=c.length){var f=[],g,h,k;for(g=0;g<e;++g){h=d[g];k=this.b[h];var l;if(!(l=1==h))a:{l=c.length;for(var m=void 0,n=0;n<l;n++)if(m=c[n],m.identifier===h-2){l=!0;break a}l=!1}l||f.push(k.out)}for(g=0;g<f.length;++g)this.Eb(b,f[g])}c=b.changedTouches[0];d=Object.keys(this.b).length;if(0===d||1===d&&(1).toString()in this.b)this.f=c.identifier,void 0!==this.c&&x.clearTimeout(this.c);Zf(this,b);this.h++;Yf(this,b,this.pe)};
p.pe=function(b,c){this.b[c.pointerId]={target:c.target,out:c,Sc:c.target};var d=this.a;c.bubbles=!0;Lf(d,$f,c,b);d=this.a;c.bubbles=!1;Lf(d,ag,c,b);Lf(this.a,Nf,c,b)};p.Ge=function(b){b.preventDefault();Yf(this,b,this.Zd)};p.Zd=function(b,c){var d=this.b[c.pointerId];if(d){var e=d.out,f=d.Sc;Lf(this.a,Of,c,b);e&&f!==c.target&&(e.relatedTarget=c.target,c.relatedTarget=f,e.target=f,c.target?(Rf(this.a,e,b),Qf(this.a,c,b)):(c.target=f,c.relatedTarget=null,this.Eb(b,c)));d.out=c;d.Sc=c.target}};
p.Fe=function(b){Zf(this,b);Yf(this,b,this.Ie)};p.Ie=function(b,c){Lf(this.a,Pf,c,b);this.a.out(c,b);var d=this.a;c.bubbles=!1;Lf(d,bg,c,b);delete this.b[c.pointerId];c.isPrimary&&(this.f=void 0,this.c=x.setTimeout(this.Vc.bind(this),200))};p.Ee=function(b){Yf(this,b,this.Eb)};p.Eb=function(b,c){Lf(this.a,Mf,c,b);this.a.out(c,b);var d=this.a;c.bubbles=!1;Lf(d,bg,c,b);delete this.b[c.pointerId];c.isPrimary&&(this.f=void 0,this.c=x.setTimeout(this.Vc.bind(this),200))};
function Zf(b,c){var d=b.l.f,e=c.changedTouches[0];if(b.f===e.identifier){var f=[e.clientX,e.clientY];d.push(f);x.setTimeout(function(){La(d,f)},2500)}};function cg(b){mb.call(this);this.g=b;this.b={};this.c={};this.a=[];Bf?dg(this,new Uf(this)):Cf?dg(this,new Sf(this)):(b=new Hf(this),dg(this,b),Af&&dg(this,new Wf(this,b)));b=this.a.length;for(var c,d=0;d<b;d++)c=this.a[d],eg(this,Object.keys(c.g))}M(cg,mb);function dg(b,c){var d=Object.keys(c.g);d&&(d.forEach(function(b){var d=c.g[b];d&&(this.c[b]=d.bind(c))},b),b.a.push(c))}cg.prototype.f=function(b){var c=this.c[b.type];c&&c(b)};
function eg(b,c){c.forEach(function(b){Q(this.g,b,this.f,this)},b)}function fg(b,c){c.forEach(function(b){gb(this.g,b,this.f,this)},b)}function Kf(b,c){for(var d={},e,f=0,g=gg.length;f<g;f++)e=gg[f][0],d[e]=b[e]||c[e]||gg[f][1];return d}cg.prototype.out=function(b,c){b.bubbles=!0;Lf(this,hg,b,c)};function Rf(b,c,d){b.out(c,d);var e=c.relatedTarget;e&&he(c.target,e)||(c.bubbles=!1,Lf(b,bg,c,d))}
function Qf(b,c,d){c.bubbles=!0;Lf(b,$f,c,d);var e=c.relatedTarget;e&&he(c.target,e)||(c.bubbles=!1,Lf(b,ag,c,d))}function Lf(b,c,d,e){S(b,new gf(c,e,d))}function Vf(b,c){S(b,new gf(c.type,c,c))}cg.prototype.J=function(){for(var b=this.a.length,c,d=0;d<b;d++)c=this.a[d],fg(this,Object.keys(c.g));cg.$.J.call(this)};
var Of="pointermove",Nf="pointerdown",Pf="pointerup",$f="pointerover",hg="pointerout",ag="pointerenter",bg="pointerleave",Mf="pointercancel",gg=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",
!1],["type",""],["target",null],["currentTarget",null],["which",0]];function ig(b,c,d,e,f){se.call(this,b,c,f);this.originalEvent=d;this.pixel=c.vc(d);this.coordinate=c.ta(this.pixel);this.dragging=void 0!==e?e:!1}M(ig,se);ig.prototype.preventDefault=function(){ig.$.preventDefault.call(this);this.originalEvent.preventDefault()};ig.prototype.stopPropagation=function(){ig.$.stopPropagation.call(this);this.originalEvent.stopPropagation()};function jg(b,c,d,e,f){ig.call(this,b,c,d.a,e,f);this.a=d}M(jg,ig);
function kg(b){mb.call(this);this.f=b;this.h=0;this.l=!1;this.c=[];this.b=null;b=this.f.a;this.s=0;this.o={};this.g=new cg(b);this.a=null;this.i=Q(this.g,Nf,this.Id,this);this.j=Q(this.g,Of,this.xe,this)}M(kg,mb);function lg(b,c){var d;d=new jg(mg,b.f,c);S(b,d);0!==b.h?(x.clearTimeout(b.h),b.h=0,d=new jg(ng,b.f,c),S(b,d)):b.h=x.setTimeout(function(){this.h=0;var b=new jg(og,this.f,c);S(this,b)}.bind(b),250)}
function pg(b,c){c.type==qg||c.type==rg?delete b.o[c.pointerId]:c.type==sg&&(b.o[c.pointerId]=!0);b.s=Object.keys(b.o).length}p=kg.prototype;p.zc=function(b){pg(this,b);var c=new jg(qg,this.f,b);S(this,c);!this.l&&0===b.button&&lg(this,this.b);0===this.s&&(this.c.forEach(N),this.c.length=0,this.l=!1,this.b=null,jb(this.a),this.a=null)};
p.Id=function(b){pg(this,b);var c=new jg(sg,this.f,b);S(this,c);this.b=b;0===this.c.length&&(this.a=new cg(document),this.c.push(Q(this.a,tg,this.je,this),Q(this.a,qg,this.zc,this),Q(this.g,rg,this.zc,this)))};p.je=function(b){if(b.clientX!=this.b.clientX||b.clientY!=this.b.clientY){this.l=!0;var c=new jg(ug,this.f,b,this.l);S(this,c)}b.preventDefault()};p.xe=function(b){S(this,new jg(b.type,this.f,b,!(!this.b||b.clientX==this.b.clientX&&b.clientY==this.b.clientY)))};
p.J=function(){this.j&&(N(this.j),this.j=null);this.i&&(N(this.i),this.i=null);this.c.forEach(N);this.c.length=0;this.a&&(jb(this.a),this.a=null);this.g&&(jb(this.g),this.g=null);kg.$.J.call(this)};var og="singleclick",mg="click",ng="dblclick",ug="pointerdrag",tg="pointermove",sg="pointerdown",qg="pointerup",rg="pointercancel",vg={Ue:og,Je:mg,Ke:ng,Ne:ug,Qe:tg,Me:sg,Te:qg,Se:"pointerover",Re:"pointerout",Oe:"pointerenter",Pe:"pointerleave",Le:rg};function wg(b){T.call(this);var c=Wa({},b);c.opacity=void 0!==b.opacity?b.opacity:1;c.visible=void 0!==b.visible?b.visible:!0;c.zIndex=void 0!==b.zIndex?b.zIndex:0;c.maxResolution=void 0!==b.maxResolution?b.maxResolution:Infinity;c.minResolution=void 0!==b.minResolution?b.minResolution:0;this.l(c)}M(wg,T);
function xg(b){var c=b.Tb(),d=b.Ob(),e=b.cb(),f=b.C(),g=b.Ub(),h=b.get("maxResolution"),k=b.get("minResolution");return{layer:b,opacity:Ca(c,0,1),Zb:d,visible:e,eb:!0,extent:f,zIndex:g,maxResolution:h,minResolution:Math.max(k,0)}}p=wg.prototype;p.C=function(){return this.get("extent")};p.Tb=function(){return this.get("opacity")};p.cb=function(){return this.get("visible")};p.Ub=function(){return this.get("zIndex")};p.Fc=function(b){this.set("opacity",b)};p.Gc=function(b){this.set("visible",b)};
p.Hc=function(b){this.set("zIndex",b)};function yg(){};function zg(b,c,d,e,f,g){R.call(this,b,c);this.vectorContext=d;this.frameState=e;this.context=f;this.glContext=g}M(zg,R);function Ag(b){var c=Wa({},b);delete c.source;wg.call(this,c);this.h=this.c=this.b=null;b.map&&this.setMap(b.map);Q(this,rb("source"),this.Nd,this);this.Yb(b.source?b.source:null)}M(Ag,wg);function Bg(b,c){return b.visible&&c>=b.minResolution&&c<b.maxResolution}p=Ag.prototype;p.Kb=function(b){b=b?b:[];b.push(xg(this));return b};p.V=function(){return this.get("source")||null};p.Ob=function(){var b=this.V();return b?b.N():"undefined"};p.le=function(){this.v()};
p.Nd=function(){this.h&&(N(this.h),this.h=null);var b=this.V();b&&(this.h=Q(b,"change",this.le,this));this.v()};p.setMap=function(b){this.b&&(N(this.b),this.b=null);b||this.v();this.c&&(N(this.c),this.c=null);b&&(this.b=Q(b,"precompose",function(b){var d=xg(this);d.eb=!1;d.zIndex=Infinity;b.frameState.layerStatesArray.push(d);b.frameState.layerStates[I(this)]=d},this),this.c=Q(this,"change",b.render,b),this.v())};p.Yb=function(b){this.set("source",b)};function Cg(b,c,d,e,f,g,h,k){Db(b);0===c&&0===d||Fb(b,c,d);1==e&&1==f||Gb(b,e,f);0!==g&&Hb(b,g);0===h&&0===k||Fb(b,h,k);return b}function Dg(b,c){return b[0]==c[0]&&b[1]==c[1]&&b[4]==c[4]&&b[5]==c[5]&&b[12]==c[12]&&b[13]==c[13]}function Eg(b,c,d){var e=b[1],f=b[5],g=b[13],h=c[0];c=c[1];d[0]=b[0]*h+b[4]*c+b[12];d[1]=e*h+f*c+g;return d};function Fg(b){ob.call(this);this.a=b}M(Fg,ob);Fg.prototype.fb=pa;Fg.prototype.Ic=dc;Fg.prototype.l=function(b,c,d){return function(e,f){return Ve(b,c,e,f,function(b){d[e]||(d[e]={});d[e][b.L.toString()]=b})}};function Gg(b){var c=b.a;c.cb()&&"ready"==c.Ob()&&b.v()}function Hg(b,c){c.Qc()&&b.postRenderFunctions.push(na(function(b,c,f){c=I(b).toString();b.Rc(f.viewState.projection,f.usedTiles[c])},c))}function Ig(b,c){if(c){var d,e,f;e=0;for(f=c.length;e<f;++e)d=c[e],b[I(d).toString()]=d}}
function Jg(b,c){var d=c.w;void 0!==d&&("string"===typeof d?b.logos[d]="":ha(d)&&(b.logos[d.src]=d.href))}function Kg(b,c,d,e){c=I(c).toString();d=d.toString();c in b?d in b[c]?(b=b[c][d],e.a<b.a&&(b.a=e.a),e.f>b.f&&(b.f=e.f),e.b<b.b&&(b.b=e.b),e.c>b.c&&(b.c=e.c)):b[c][d]=e:(b[c]={},b[c][d]=e)}function Lg(b,c,d){return[c*(Math.round(b[0]/c)+d[0]%2/2),c*(Math.round(b[1]/c)+d[1]%2/2)]}
function Mg(b,c,d,e,f,g,h,k,l,m){var n=I(c).toString();n in b.wantedTiles||(b.wantedTiles[n]={});var q=b.wantedTiles[n];b=b.tileQueue;var r=d.minZoom,u,w,y,z,D,t;for(t=h;t>=r;--t)for(w=Je(d,g,t,w),y=d.I(t),z=w.a;z<=w.f;++z)for(D=w.b;D<=w.c;++D)h-t<=k?(u=Ng(c,t,z,D,e,f),0==u.N()&&(q[u.L.toString()]=!0,u.getKey()in b.f||b.c([u,n,Ne(d,u.L),y])),void 0!==l&&l.call(m,u)):c.Yc(t,z,D,f)};function Og(b){this.l=b.opacity;this.i=b.rotateWithView;this.H=b.rotation;this.gb=b.scale;this.u=b.snapToPixel}Og.prototype.Y=function(){return this.H};function Pg(b){b=b||{};this.g=void 0!==b.anchor?b.anchor:[.5,.5];this.c=null;this.b=void 0!==b.anchorOrigin?b.anchorOrigin:"top-left";this.j=void 0!==b.anchorXUnits?b.anchorXUnits:"fraction";this.A=void 0!==b.anchorYUnits?b.anchorYUnits:"fraction";var c=void 0!==b.crossOrigin?b.crossOrigin:null,d=void 0!==b.img?b.img:null,e=void 0!==b.imgSize?b.imgSize:null,f=b.src;void 0!==f&&0!==f.length||!d||(f=d.src||I(d).toString());var g=void 0!==b.src?0:2,h;void 0!==b.color?(h=b.color,h=Array.isArray(h)?h:
xd(h)):h=null;var k=Qg.ua(),l=k.get(f,c,h);l||(l=new Rg(d,f,e,c,g,h),k.set(f,c,h,l));this.a=l;this.s=void 0!==b.offset?b.offset:[0,0];this.f=void 0!==b.offsetOrigin?b.offsetOrigin:"top-left";this.h=null;this.o=void 0!==b.size?b.size:null;Og.call(this,{opacity:void 0!==b.opacity?b.opacity:1,rotation:void 0!==b.rotation?b.rotation:0,scale:void 0!==b.scale?b.scale:1,snapToPixel:void 0!==b.snapToPixel?b.snapToPixel:!0,rotateWithView:void 0!==b.rotateWithView?b.rotateWithView:!1})}M(Pg,Og);p=Pg.prototype;
p.jb=function(){if(this.c)return this.c;var b=this.g,c=this.Pa();if("fraction"==this.j||"fraction"==this.A){if(!c)return null;b=this.g.slice();"fraction"==this.j&&(b[0]*=c[0]);"fraction"==this.A&&(b[1]*=c[1])}if("top-left"!=this.b){if(!c)return null;b===this.g&&(b=this.g.slice());if("top-right"==this.b||"bottom-right"==this.b)b[0]=-b[0]+c[0];if("bottom-left"==this.b||"bottom-right"==this.b)b[1]=-b[1]+c[1]}return this.c=b};p.T=function(b){return this.a.T(b)};p.wc=function(){return this.a.b};p.rb=function(){return this.a.f};
p.Wb=function(){var b=this.a;if(!b.l)if(b.i){var c=b.b[0],d=b.b[1],e=lf(c,d);e.fillRect(0,0,c,d);b.l=e.canvas}else b.l=b.a;return b.l};p.ka=function(){if(this.h)return this.h;var b=this.s;if("top-left"!=this.f){var c=this.Pa(),d=this.a.b;if(!c||!d)return null;b=b.slice();if("top-right"==this.f||"bottom-right"==this.f)b[0]=d[0]-c[0]-b[0];if("bottom-left"==this.f||"bottom-right"==this.f)b[1]=d[1]-c[1]-b[1]}return this.h=b};p.Pa=function(){return this.o?this.o:this.a.b};
p.Bc=function(b,c){return Q(this.a,"change",b,c)};p.load=function(){this.a.load()};p.Xc=function(b,c){gb(this.a,"change",b,c)};function Rg(b,c,d,e,f,g){mb.call(this);this.l=null;this.a=b?b:new Image;null!==e&&(this.a.crossOrigin=e);this.c=g?document.createElement("CANVAS"):null;this.h=g;this.g=null;this.f=f;this.b=d;this.o=c;this.i=!1;2==this.f&&Sg(this)}M(Rg,mb);function Sg(b){var c=lf(1,1);try{c.drawImage(b.a,0,0),c.getImageData(0,0,1,1)}catch(d){b.i=!0}}
Rg.prototype.j=function(){this.f=3;this.g.forEach(N);this.g=null;S(this,"change")};
Rg.prototype.s=function(){this.f=2;this.b&&(this.a.width=this.b[0],this.a.height=this.b[1]);this.b=[this.a.width,this.a.height];this.g.forEach(N);this.g=null;Sg(this);if(!this.i&&null!==this.h){this.c.width=this.a.width;this.c.height=this.a.height;var b=this.c.getContext("2d");b.drawImage(this.a,0,0);for(var c=b.getImageData(0,0,this.a.width,this.a.height),d=c.data,e=this.h[0]/255,f=this.h[1]/255,g=this.h[2]/255,h=0,k=d.length;h<k;h+=4)d[h]*=e,d[h+1]*=f,d[h+2]*=g;b.putImageData(c,0,0)}S(this,"change")};
Rg.prototype.T=function(){return this.c?this.c:this.a};Rg.prototype.load=function(){if(0==this.f){this.f=1;this.g=[Q(this.a,"error",this.j,this,!0),Q(this.a,"load",this.s,this,!0)];try{this.a.src=this.o}catch(b){this.j()}}};function Qg(){this.a={};this.b=0}aa(Qg);Qg.prototype.clear=function(){this.a={};this.b=0};Qg.prototype.get=function(b,c,d){b=c+":"+b+":"+(d?vd(d):"null");return b in this.a?this.a[b]:null};Qg.prototype.set=function(b,c,d,e){this.a[c+":"+b+":"+(d?vd(d):"null")]=e;++this.b};function Tg(b,c){this.h=c;this.f={};this.A={}}M(Tg,ib);function Ug(b){var c=b.viewState,d=b.coordinateToPixelMatrix;Cg(d,b.size[0]/2,b.size[1]/2,1/c.resolution,-1/c.resolution,-c.rotation,-c.center[0],-c.center[1]);Eb(d,b.pixelToCoordinateMatrix)}p=Tg.prototype;p.J=function(){for(var b in this.f)jb(this.f[b])};function Vg(){var b=Qg.ua();if(32<b.b){var c=0,d,e;for(d in b.a)e=b.a[d],0!==(c++&3)||nb(e)||(delete b.a[d],--b.b)}}
p.Vb=function(b,c,d,e,f,g){function h(b,f){var g=I(b).toString(),h=c.layerStates[I(f)].eb;if(!(g in c.skippedFeatureUids)||h)return d.call(e,b,h?f:null)}var k,l=c.viewState,m=l.resolution,n=l.projection,l=b;if(n.a){var n=n.C(),q=Vb(n),r=b[0];if(r<n[0]||r>n[2])l=[r+q*Math.ceil((n[0]-r)/q),b[1]]}n=c.layerStatesArray;for(q=n.length-1;0<=q;--q){var u=n[q],r=u.layer;if(Bg(u,m)&&f.call(g,r)&&(u=Wg(this,r),r.V()&&(k=u.fb(r.V().j?l:b,c,h,e)),k))return k}};
p.Jc=function(b,c,d,e){return void 0!==this.Vb(b,c,cc,this,d,e)};function Wg(b,c){var d=I(c).toString();if(d in b.f)return b.f[d];var e=b.Ib(c);b.f[d]=e;b.A[d]=Q(e,"change",b.Cd,b);return e}p.Cd=function(){this.h.render()};p.sb=pa;p.Ae=function(b,c){for(var d in this.f)if(!(c&&d in c.layerStates)){var e=d,f=this.f[e];delete this.f[e];N(this.A[e]);delete this.A[e];jb(f)}};function Xg(b,c){for(var d in b.f)if(!(d in c.layerStates)){c.postRenderFunctions.push(b.Ae.bind(b));break}}
function Oa(b,c){return b.zIndex-c.zIndex};function Yg(b,c){this.j=b;this.l=c;this.a=[];this.b=[];this.f={}}Yg.prototype.clear=function(){this.a.length=0;this.b.length=0;Ya(this.f)};function Zg(b){var c=b.a,d=b.b,e=c[0];1==c.length?(c.length=0,d.length=0):(c[0]=c.pop(),d[0]=d.pop(),$g(b,0));c=b.l(e);delete b.f[c];return e}Yg.prototype.c=function(b){var c=this.j(b);return Infinity!=c?(this.a.push(b),this.b.push(c),this.f[this.l(b)]=!0,ah(this,0,this.a.length-1),!0):!1};
function $g(b,c){for(var d=b.a,e=b.b,f=d.length,g=d[c],h=e[c],k=c;c<f>>1;){var l=2*c+1,m=2*c+2,l=m<f&&e[m]<e[l]?m:l;d[c]=d[l];e[c]=e[l];c=l}d[c]=g;e[c]=h;ah(b,k,c)}function ah(b,c,d){var e=b.a;b=b.b;for(var f=e[d],g=b[d];d>c;){var h=d-1>>1;if(b[h]>g)e[d]=e[h],b[d]=b[h],d=h;else break}e[d]=f;b[d]=g}function bh(b){var c=b.j,d=b.a,e=b.b,f=0,g=d.length,h,k,l;for(k=0;k<g;++k)h=d[k],l=c(h),Infinity==l?delete b.f[b.l(h)]:(e[f]=l,d[f++]=h);d.length=f;e.length=f;for(c=(b.a.length>>1)-1;0<=c;c--)$g(b,c)};function ch(b,c){Yg.call(this,function(c){return b.apply(null,c)},function(b){return b[0].getKey()});this.A=c;this.h=0;this.g={}}M(ch,Yg);ch.prototype.c=function(b){var c=ch.$.c.call(this,b);c&&Q(b[0],"change",this.i,this);return c};ch.prototype.i=function(b){b=b.target;var c=b.N();if(2===c||3===c||4===c||5===c)gb(b,"change",this.i,this),b=b.getKey(),b in this.g&&(delete this.g[b],--this.h),this.A()};function dh(){this.a=[];this.b=this.f=0}function eh(b,c){var d=b.b,e=.05-d,f=Math.log(.05/b.b)/-.005;return cd({source:c,duration:f,easing:function(b){return d*(Math.exp(-.005*b*f)-1)/e}})};function fh(b){T.call(this);this.S=null;this.set("active",!0);this.handleEvent=b.handleEvent}M(fh,T);fh.prototype.setMap=function(b){this.S=b};function gh(b,c,d,e,f){if(void 0!==d){var g=c.Y(),h=c.ia();void 0!==g&&h&&f&&0<f&&(b.fa(dd({rotation:g,duration:f,easing:$c})),e&&b.fa(cd({source:h,duration:f,easing:$c})));c.rotate(d,e)}}function hh(b,c,d,e,f){var g=c.I();d=c.constrainResolution(g,d,0);ih(b,c,d,e,f)}
function ih(b,c,d,e,f){if(d){var g=c.I(),h=c.ia();void 0!==g&&h&&d!==g&&f&&0<f&&(b.fa(ed({resolution:g,duration:f,easing:$c})),e&&b.fa(cd({source:h,duration:f,easing:$c})));if(e){var k;b=c.ia();f=c.I();void 0!==b&&void 0!==f&&(k=[e[0]-d*(e[0]-b[0])/f,e[1]-d*(e[1]-b[1])/f]);c.oa(k)}Yc(c,d)}};function jh(b){b=b?b:{};this.a=b.delta?b.delta:1;fh.call(this,{handleEvent:kh});this.b=void 0!==b.duration?b.duration:250}M(jh,fh);function kh(b){var c=!1,d=b.originalEvent;if(b.type==ng){var c=b.map,e=b.coordinate,d=d.shiftKey?-this.a:this.a,f=c.O();hh(c,f,d,e,this.b);b.preventDefault();c=!0}return!c};function lh(b){b=b.originalEvent;return b.altKey&&!(b.metaKey||b.ctrlKey)&&b.shiftKey}function mh(b){b=b.originalEvent;return 0==b.button&&!(Jd&&wf&&b.ctrlKey)}function nh(b){b=b.originalEvent;return!b.altKey&&!(b.metaKey||b.ctrlKey)&&!b.shiftKey}function oh(b){b=b.originalEvent;return!b.altKey&&!(b.metaKey||b.ctrlKey)&&b.shiftKey}function ph(b){b=b.originalEvent.target.tagName;return"INPUT"!==b&&"SELECT"!==b&&"TEXTAREA"!==b}function qh(b){return"mouse"==b.a.pointerType};function rh(b){b=b?b:{};fh.call(this,{handleEvent:b.handleEvent?b.handleEvent:sh});this.vb=b.handleDownEvent?b.handleDownEvent:dc;this.wb=b.handleDragEvent?b.handleDragEvent:pa;this.xb=b.handleMoveEvent?b.handleMoveEvent:pa;this.yb=b.handleUpEvent?b.handleUpEvent:dc;this.s=!1;this.G={};this.c=[]}M(rh,fh);function th(b){for(var c=b.length,d=0,e=0,f=0;f<c;f++)d+=b[f].clientX,e+=b[f].clientY;return[d/c,e/c]}
function sh(b){if(!(b instanceof jg))return!0;var c=!1,d=b.type;if(d===sg||d===ug||d===qg)d=b.a,b.type==qg?delete this.G[d.pointerId]:b.type==sg?this.G[d.pointerId]=d:d.pointerId in this.G&&(this.G[d.pointerId]=d),this.c=Za(this.G);this.s&&(b.type==ug?this.wb(b):b.type==qg&&(this.s=this.yb(b)));b.type==sg?(this.s=b=this.vb(b),c=this.w(b)):b.type==tg&&this.xb(b);return!c}rh.prototype.w=function(b){return b};function uh(b){rh.call(this,{handleDownEvent:vh,handleDragEvent:wh,handleUpEvent:xh});b=b?b:{};this.a=b.kinetic;this.b=this.g=null;this.i=b.condition?b.condition:nh;this.h=!1}M(uh,rh);function wh(b){var c=th(this.c);this.a&&this.a.a.push(c[0],c[1],Date.now());if(this.b){var d=this.b[0]-c[0],e=c[1]-this.b[1];b=b.map;var f=b.O(),g=f.N(),e=d=[d,e],h=g.resolution;e[0]*=h;e[1]*=h;vb(d,g.rotation);ub(d,g.center);d=f.a.center(d);b.render();f.oa(d)}this.b=c}
function xh(b){b=b.map;var c=b.O();if(0===this.c.length){var d;if(d=!this.h&&this.a)if(d=this.a,6>d.a.length)d=!1;else{var e=Date.now()-100,f=d.a.length-3;if(d.a[f+2]<e)d=!1;else{for(var g=f-3;0<g&&d.a[g+2]>e;)g-=3;var e=d.a[f+2]-d.a[g+2],h=d.a[f]-d.a[g],f=d.a[f+1]-d.a[g+1];d.f=Math.atan2(f,h);d.b=Math.sqrt(h*h+f*f)/e;d=.05<d.b}}d&&(d=(.05-this.a.b)/-.005,f=this.a.f,g=c.ia(),this.g=eh(this.a,g),b.fa(this.g),g=yh(b,g),d=b.ta([g[0]-d*Math.cos(f),g[1]-d*Math.sin(f)]),d=c.a.center(d),c.oa(d));Zc(c,-1);
b.render();return!1}this.b=null;return!0}function vh(b){if(0<this.c.length&&this.i(b)){var c=b.map,d=c.O();this.b=null;this.s||Zc(d,1);c.render();this.g&&La(c.w,this.g)&&(d.oa(b.frameState.viewState.center),this.g=null);this.a&&(b=this.a,b.a.length=0,b.f=0,b.b=0);this.h=1<this.c.length;return!0}return!1}uh.prototype.w=dc;function zh(b){b=b?b:{};rh.call(this,{handleDownEvent:Ah,handleDragEvent:Bh,handleUpEvent:Ch});this.b=b.condition?b.condition:lh;this.a=void 0;this.g=void 0!==b.duration?b.duration:250}M(zh,rh);function Bh(b){if(qh(b)){var c=b.map,d=c.Oa();b=b.pixel;d=Math.atan2(d[1]/2-b[1],b[0]-d[0]/2);if(void 0!==this.a){b=d-this.a;var e=c.O(),f=e.Y();c.render();gh(c,e,f-b)}this.a=d}}
function Ch(b){if(!qh(b))return!0;b=b.map;var c=b.O();Zc(c,-1);var d=c.Y(),e=this.g,d=c.constrainRotation(d,0);gh(b,c,d,void 0,e);return!1}function Ah(b){return qh(b)&&mh(b)&&this.b(b)?(b=b.map,Zc(b.O(),1),b.render(),this.a=void 0,!0):!1}zh.prototype.w=dc;function Dh(b){this.c=null;this.b=document.createElement("div");this.b.style.position="absolute";this.b.className="ol-box "+b;this.f=this.g=this.a=null}M(Dh,ib);Dh.prototype.J=function(){this.setMap(null)};function Eh(b){var c=b.g,d=b.f;b=b.b.style;b.left=Math.min(c[0],d[0])+"px";b.top=Math.min(c[1],d[1])+"px";b.width=Math.abs(d[0]-c[0])+"px";b.height=Math.abs(d[1]-c[1])+"px"}
Dh.prototype.setMap=function(b){if(this.a){this.a.o.removeChild(this.b);var c=this.b.style;c.left=c.top=c.width=c.height="inherit"}(this.a=b)&&this.a.o.appendChild(this.b)};function Fh(b){var c=b.g,d=b.f,c=[c,[c[0],d[1]],d,[d[0],c[1]]].map(b.a.ta,b.a);c[4]=c[0].slice();b.c?b.c.W([c]):b.c=new Tc([c])}Dh.prototype.M=function(){return this.c};function Gh(b,c,d){R.call(this,b);this.coordinate=c;this.mapBrowserEvent=d}M(Gh,R);function Hh(b){rh.call(this,{handleDownEvent:Ih,handleDragEvent:Jh,handleUpEvent:Kh});b=b?b:{};this.a=new Dh(b.className||"ol-dragbox");this.b=null;this.j=b.condition?b.condition:cc;this.i=b.boxEndCondition?b.boxEndCondition:Lh}M(Hh,rh);function Lh(b,c,d){b=d[0]-c[0];c=d[1]-c[1];return 64<=b*b+c*c}
function Jh(b){if(qh(b)){var c=this.a,d=b.pixel;c.g=this.b;c.f=d;Fh(c);Eh(c);S(this,new Gh("boxdrag",b.coordinate,b))}}Hh.prototype.M=function(){return this.a.M()};Hh.prototype.h=pa;function Kh(b){if(!qh(b))return!0;this.a.setMap(null);this.i(b,this.b,b.pixel)&&(this.h(b),S(this,new Gh("boxend",b.coordinate,b)));return!1}
function Ih(b){if(qh(b)&&mh(b)&&this.j(b)){this.b=b.pixel;this.a.setMap(b.map);var c=this.a,d=this.b;c.g=this.b;c.f=d;Fh(c);Eh(c);S(this,new Gh("boxstart",b.coordinate,b));return!0}return!1};function Mh(b){b=b?b:{};var c=b.condition?b.condition:oh;this.g=void 0!==b.duration?b.duration:200;this.o=void 0!==b.out?b.out:!1;Hh.call(this,{condition:c,className:b.className||"ol-dragzoom"})}M(Mh,Hh);
Mh.prototype.h=function(){var b=this.S,c=b.O(),d=b.Oa(),e=this.M().C();if(this.o){var f=c.jc(d),e=[yh(b,Xb(e)),yh(b,[e[2],e[3]])],g=Pb(void 0),h,k;h=0;for(k=e.length;h<k;++h)Kb(g,e[h]);g=1/Xc(g,d);e=(f[2]-f[0])/2*(g-1);g=(f[3]-f[1])/2*(g-1);f[0]-=e;f[2]+=e;f[1]-=g;f[3]+=g;e=f}d=c.constrainResolution(Xc(e,d));f=c.I();g=c.ia();b.fa(ed({resolution:f,duration:this.g,easing:$c}));b.fa(cd({source:g,duration:this.g,easing:$c}));c.oa(Yb(e));Yc(c,d)};function Nh(b){fh.call(this,{handleEvent:Oh});b=b||{};this.a=function(b){return nh.call(this,b)&&ph.call(this,b)};this.b=void 0!==b.condition?b.condition:this.a;this.c=void 0!==b.duration?b.duration:100;this.g=void 0!==b.pixelDelta?b.pixelDelta:128}M(Nh,fh);
function Oh(b){var c=!1;if("keydown"==b.type){var d=b.originalEvent.keyCode;if(this.b(b)&&(40==d||37==d||39==d||38==d)){var e=b.map,c=e.O(),f=c.I()*this.g,g=0,h=0;40==d?h=-f:37==d?g=-f:39==d?g=f:h=f;d=[g,h];vb(d,c.Y());f=this.c;if(g=c.ia())f&&0<f&&e.fa(cd({source:g,duration:f,easing:bd})),e=c.a.center([g[0]+d[0],g[1]+d[1]]),c.oa(e);b.preventDefault();c=!0}}return!c};function Ph(b){fh.call(this,{handleEvent:Qh});b=b?b:{};this.b=b.condition?b.condition:ph;this.a=b.delta?b.delta:1;this.c=void 0!==b.duration?b.duration:100}M(Ph,fh);function Qh(b){var c=!1;if("keydown"==b.type||"keypress"==b.type){var d=b.originalEvent.charCode;if(this.b(b)&&(43==d||45==d)){c=b.map;d=43==d?this.a:-this.a;c.render();var e=c.O();hh(c,e,d,void 0,this.c);b.preventDefault();c=!0}}return!c};function Rh(b){fh.call(this,{handleEvent:Sh});b=b||{};this.a=0;this.i=void 0!==b.duration?b.duration:250;this.j=void 0!==b.useAnchor?b.useAnchor:!0;this.c=null;this.g=this.b=void 0}M(Rh,fh);
function Sh(b){var c=!1;if("wheel"==b.type||"mousewheel"==b.type){var c=b.map,d=b.originalEvent;this.j&&(this.c=b.coordinate);var e;"wheel"==b.type?(e=d.deltaY,uf&&d.deltaMode===x.WheelEvent.DOM_DELTA_PIXEL&&(e/=xf),d.deltaMode===x.WheelEvent.DOM_DELTA_LINE&&(e*=40)):"mousewheel"==b.type&&(e=-d.wheelDeltaY,vf&&(e/=3));this.a+=e;void 0===this.b&&(this.b=Date.now());e=Math.max(80-(Date.now()-this.b),0);x.clearTimeout(this.g);this.g=x.setTimeout(this.h.bind(this,c),e);b.preventDefault();c=!0}return!c}
Rh.prototype.h=function(b){var c=Ca(this.a,-1,1),d=b.O();b.render();hh(b,d,-c,this.c,this.i);this.a=0;this.c=null;this.g=this.b=void 0};function Th(b){rh.call(this,{handleDownEvent:Uh,handleDragEvent:Vh,handleUpEvent:Wh});b=b||{};this.b=null;this.g=void 0;this.a=!1;this.h=0;this.j=void 0!==b.threshold?b.threshold:.3;this.i=void 0!==b.duration?b.duration:250}M(Th,rh);
function Vh(b){var c=0,d=this.c[0],e=this.c[1],d=Math.atan2(e.clientY-d.clientY,e.clientX-d.clientX);void 0!==this.g&&(c=d-this.g,this.h+=c,!this.a&&Math.abs(this.h)>this.j&&(this.a=!0));this.g=d;b=b.map;d=b.a.getBoundingClientRect();e=th(this.c);e[0]-=d.left;e[1]-=d.top;this.b=b.ta(e);this.a&&(d=b.O(),e=d.Y(),b.render(),gh(b,d,e+c,this.b))}
function Wh(b){if(2>this.c.length){b=b.map;var c=b.O();Zc(c,-1);if(this.a){var d=c.Y(),e=this.b,f=this.i,d=c.constrainRotation(d,0);gh(b,c,d,e,f)}return!1}return!0}function Uh(b){return 2<=this.c.length?(b=b.map,this.b=null,this.g=void 0,this.a=!1,this.h=0,this.s||Zc(b.O(),1),b.render(),!0):!1}Th.prototype.w=dc;function Xh(b){rh.call(this,{handleDownEvent:Yh,handleDragEvent:Zh,handleUpEvent:$h});b=b?b:{};this.b=null;this.h=void 0!==b.duration?b.duration:400;this.a=void 0;this.g=1}M(Xh,rh);function Zh(b){var c=1,d=this.c[0],e=this.c[1],f=d.clientX-e.clientX,d=d.clientY-e.clientY,f=Math.sqrt(f*f+d*d);void 0!==this.a&&(c=this.a/f);this.a=f;1!=c&&(this.g=c);b=b.map;var f=b.O(),d=f.I(),e=b.a.getBoundingClientRect(),g=th(this.c);g[0]-=e.left;g[1]-=e.top;this.b=b.ta(g);b.render();ih(b,f,d*c,this.b)}
function $h(b){if(2>this.c.length){b=b.map;var c=b.O();Zc(c,-1);var d=c.I(),e=this.b,f=this.h,d=c.constrainResolution(d,0,this.g-1);ih(b,c,d,e,f);return!1}return!0}function Yh(b){return 2<=this.c.length?(b=b.map,this.b=null,this.a=void 0,this.g=1,this.s||Zc(b.O(),1),b.render(),!0):!1}Xh.prototype.w=dc;function ai(b){var c=b||{};b=Wa({},c);delete b.layers;c=c.layers;wg.call(this,b);this.b=[];this.a={};Q(this,rb("layers"),this.Ed,this);c?Array.isArray(c)&&(c=new ld(c.slice())):c=new ld;this.set("layers",c)}M(ai,wg);p=ai.prototype;p.ob=function(){this.cb()&&this.v()};
p.Ed=function(){this.b.forEach(N);this.b.length=0;var b=this.get("layers");this.b.push(Q(b,"add",this.Dd,this),Q(b,"remove",this.Fd,this));for(var c in this.a)this.a[c].forEach(N);Ya(this.a);var b=b.a,d,e;c=0;for(d=b.length;c<d;c++)e=b[c],this.a[I(e).toString()]=[Q(e,"propertychange",this.ob,this),Q(e,"change",this.ob,this)];this.v()};p.Dd=function(b){b=b.element;var c=I(b).toString();this.a[c]=[Q(b,"propertychange",this.ob,this),Q(b,"change",this.ob,this)];this.v()};
p.Fd=function(b){b=I(b.element).toString();this.a[b].forEach(N);delete this.a[b];this.v()};p.Kb=function(b){var c=void 0!==b?b:[],d=c.length;nd(this.get("layers"),function(b){b.Kb(c)});b=xg(this);var e,f;for(e=c.length;d<e;d++)f=c[d],f.opacity*=b.opacity,f.visible=f.visible&&b.visible,f.maxResolution=Math.min(f.maxResolution,b.maxResolution),f.minResolution=Math.max(f.minResolution,b.minResolution),void 0!==b.extent&&(f.extent=void 0!==f.extent?$b(f.extent,b.extent):b.extent);return c};p.Ob=function(){return"ready"};function bi(b){ic.call(this,{code:b,units:"m",extent:ci,global:!0,worldExtent:di})}M(bi,ic);bi.prototype.getPointResolution=function(b,c){return b/Da(c[1]/6378137)};var ei=6378137*Math.PI,ci=[-ei,-ei,ei,ei],di=[-180,-85,180,85],fi="EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(b){return new bi(b)});
function gi(b,c,d){var e=b.length;d=1<d?d:2;void 0===c&&(2<d?c=b.slice():c=Array(e));for(var f=0;f<e;f+=d)c[f]=6378137*Math.PI*b[f]/180,c[f+1]=6378137*Math.log(Math.tan(Math.PI*(b[f+1]+90)/360));return c}function hi(b,c,d){var e=b.length;d=1<d?d:2;void 0===c&&(2<d?c=b.slice():c=Array(e));for(var f=0;f<e;f+=d)c[f]=180*b[f]/(6378137*Math.PI),c[f+1]=360*Math.atan(Math.exp(b[f+1]/6378137))/Math.PI-90;return c};var ii=new ec(6378137);function ji(b,c){ic.call(this,{code:b,units:"degrees",extent:ki,axisOrientation:c,global:!0,metersPerUnit:li,worldExtent:ki})}M(ji,ic);ji.prototype.getPointResolution=function(b){return b};
var ki=[-180,-90,180,90],li=Math.PI*ii.radius/180,mi=[new ji("CRS:84"),new ji("EPSG:4326","neu"),new ji("urn:ogc:def:crs:EPSG::4326","neu"),new ji("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new ji("urn:ogc:def:crs:OGC:1.3:CRS84"),new ji("urn:ogc:def:crs:OGC:2:84"),new ji("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new ji("urn:x-ogc:def:crs:EPSG:4326","neu")];function X(b){b=b?b:{};var c=Wa({},b);delete c.preload;delete c.useInterimTilesOnError;Ag.call(this,c);this.set("preload",void 0!==b.preload?b.preload:0);this.set("useInterimTilesOnError",void 0!==b.useInterimTilesOnError?b.useInterimTilesOnError:!0)}M(X,Ag);function ni(b){return b.get("useInterimTilesOnError")};var oi=[0,0,0,1],pi=[],qi=[0,0,0,1];function ri(b,c,d,e){0!==c&&(b.translate(d,e),b.rotate(c),b.translate(-d,-e))};function si(b){b=b||{};this.a=void 0!==b.color?b.color:null;this.b=void 0}si.prototype.ga=function(){return this.a};function ti(){this.b=-1};function ui(){this.b=-1;this.b=64;this.a=Array(4);this.g=Array(this.b);this.c=this.f=0;this.a[0]=1732584193;this.a[1]=4023233417;this.a[2]=2562383102;this.a[3]=271733878;this.c=this.f=0}M(ui,ti);
function vi(b,c,d){d||(d=0);var e=Array(16);if(da(c))for(var f=0;16>f;++f)e[f]=c.charCodeAt(d++)|c.charCodeAt(d++)<<8|c.charCodeAt(d++)<<16|c.charCodeAt(d++)<<24;else for(f=0;16>f;++f)e[f]=c[d++]|c[d++]<<8|c[d++]<<16|c[d++]<<24;c=b.a[0];d=b.a[1];var f=b.a[2],g=b.a[3],h=0,h=c+(g^d&(f^g))+e[0]+3614090360&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[1]+3905402710&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[2]+606105819&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^
c))+e[3]+3250441966&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[4]+4118548399&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[5]+1200080426&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[6]+2821735955&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[7]+4249261313&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[8]+1770035416&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[9]+2336552879&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+
(d^g&(c^d))+e[10]+4294925233&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[11]+2304563134&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[12]+1804603682&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[13]+4254626195&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[14]+2792965006&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[15]+1236535329&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(f^g&(d^f))+e[1]+4129170786&4294967295;c=d+(h<<5&4294967295|
h>>>27);h=g+(d^f&(c^d))+e[6]+3225465664&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[11]+643717713&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[0]+3921069994&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(f^g&(d^f))+e[5]+3593408605&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[10]+38016083&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[15]+3634488961&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[4]+3889429448&4294967295;d=f+(h<<20&4294967295|
h>>>12);h=c+(f^g&(d^f))+e[9]+568446438&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[14]+3275163606&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[3]+4107603335&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[8]+1163531501&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(f^g&(d^f))+e[13]+2850285829&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[2]+4243563512&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[7]+1735328473&4294967295;f=g+(h<<14&4294967295|
h>>>18);h=d+(g^c&(f^g))+e[12]+2368359562&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(d^f^g)+e[5]+4294588738&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[8]+2272392833&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[11]+1839030562&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[14]+4259657740&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[1]+2763975236&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[4]+1272893353&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^
c^d)+e[7]+4139469664&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[10]+3200236656&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[13]+681279174&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[0]+3936430074&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[3]+3572445317&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[6]+76029189&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[9]+3654602809&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[12]+3873151461&4294967295;
g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[15]+530742520&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[2]+3299628645&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(f^(d|~g))+e[0]+4096336452&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[7]+1126891415&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[14]+2878612391&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[5]+4237533241&4294967295;d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[12]+1700485571&4294967295;c=d+
(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[3]+2399980690&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[10]+4293915773&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[1]+2240044497&4294967295;d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[8]+1873313359&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[15]+4264355552&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[6]+2734768916&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[13]+1309151649&4294967295;
d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[4]+4149444226&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[11]+3174756917&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[2]+718787259&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[9]+3951481745&4294967295;b.a[0]=b.a[0]+c&4294967295;b.a[1]=b.a[1]+(f+(h<<21&4294967295|h>>>11))&4294967295;b.a[2]=b.a[2]+f&4294967295;b.a[3]=b.a[3]+g&4294967295}
function wi(b,c){var d;void 0===d&&(d=c.length);for(var e=d-b.b,f=b.g,g=b.f,h=0;h<d;){if(0==g)for(;h<=e;)vi(b,c,h),h+=b.b;if(da(c))for(;h<d;){if(f[g++]=c.charCodeAt(h++),g==b.b){vi(b,f);g=0;break}}else for(;h<d;)if(f[g++]=c[h++],g==b.b){vi(b,f);g=0;break}}b.f=g;b.c+=d};function xi(b){b=b||{};this.f=void 0!==b.color?b.color:null;this.Da=b.lineCap;this.a=void 0!==b.lineDash?b.lineDash:null;this.Ea=b.lineJoin;this.Fa=b.miterLimit;this.c=b.width;this.b=void 0}xi.prototype.ga=function(){return this.f};xi.prototype.getLineDash=function(){return this.a};xi.prototype.ha=function(){return this.c};function yi(b){b=b||{};this.h=this.a=this.g=null;this.f=void 0!==b.fill?b.fill:null;this.b=void 0!==b.stroke?b.stroke:null;this.c=b.radius;this.o=[0,0];this.j=this.s=this.A=null;var c=b.atlasManager,d,e=null,f,g=0;this.b&&(f=vd(this.b.ga()),g=this.b.ha(),void 0===g&&(g=1),e=this.b.getLineDash(),yf||(e=null));var h=2*(this.c+g)+1;f={strokeStyle:f,Wc:g,size:h,lineDash:e};if(void 0===c)this.a=document.createElement("CANVAS"),this.a.height=h,this.a.width=h,d=h=this.a.width,c=this.a.getContext("2d"),this.tc(f,
c,0,0),this.f?this.h=this.a:(c=this.h=document.createElement("CANVAS"),c.height=f.size,c.width=f.size,c=c.getContext("2d"),this.oc(f,c,0,0));else{h=Math.round(h);(e=!this.f)&&(d=this.oc.bind(this,f));if(this.b){g=this.b;if(void 0===g.b){var k="s"+(g.f?vd(g.f):"-")+","+(void 0!==g.Da?g.Da.toString():"-")+","+(g.a?g.a.toString():"-")+","+(void 0!==g.Ea?g.Ea:"-")+","+(void 0!==g.Fa?g.Fa.toString():"-")+","+(void 0!==g.c?g.c.toString():"-"),l=new ui;wi(l,k);var m=Array((56>l.f?l.b:2*l.b)-l.f);m[0]=128;
for(k=1;k<m.length-8;++k)m[k]=0;for(var n=8*l.c,k=m.length-8;k<m.length;++k)m[k]=n&255,n/=256;wi(l,m);m=Array(16);for(k=n=0;4>k;++k)for(var q=0;32>q;q+=8)m[n++]=l.a[k]>>>q&255;if(8192>=m.length)l=String.fromCharCode.apply(null,m);else for(l="",k=0;k<m.length;k+=8192)l+=String.fromCharCode.apply(null,rd(m,k,k+8192));g.b=l}g=g.b}else g="-";this.f?(l=this.f,void 0===l.b&&(l.b=l.a instanceof CanvasPattern||l.a instanceof CanvasGradient?I(l.a).toString():"f"+(l.a?vd(l.a):"-")),l=l.b):l="-";this.g&&g==
this.g[1]&&l==this.g[2]&&this.c==this.g[3]||(this.g=["c"+g+l+(void 0!==this.c?this.c.toString():"-"),g,l,this.c]);f=c.add(this.g[0],h,h,this.tc.bind(this,f),d);this.a=f.image;this.o=[f.offsetX,f.offsetY];d=f.image.width;e?this.h=f.Xe:this.h=this.a}this.A=[h/2,h/2];this.s=[h,h];this.j=[d,d];Og.call(this,{opacity:1,rotateWithView:!1,rotation:0,scale:1,snapToPixel:void 0!==b.snapToPixel?b.snapToPixel:!0})}M(yi,Og);p=yi.prototype;p.jb=function(){return this.A};p.Ka=function(){return this.f};p.Wb=function(){return this.h};
p.T=function(){return this.a};p.rb=function(){return 2};p.wc=function(){return this.j};p.ka=function(){return this.o};p.Pa=function(){return this.s};p.va=function(){return this.b};p.Bc=pa;p.load=pa;p.Xc=pa;p.tc=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();c.arc(b.size/2,b.size/2,this.c,0,2*Math.PI,!0);this.f&&(c.fillStyle=yd(this.f.ga()),c.fill());this.b&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Wc,b.lineDash&&c.setLineDash(b.lineDash),c.stroke());c.closePath()};
p.oc=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();c.arc(b.size/2,b.size/2,this.c,0,2*Math.PI,!0);c.fillStyle=vd(oi);c.fill();this.b&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Wc,b.lineDash&&c.setLineDash(b.lineDash),c.stroke());c.closePath()};function zi(b){b=b||{};this.f=null;this.b=Ai;void 0!==b.geometry&&Bi(this,b.geometry);this.c=void 0!==b.fill?b.fill:null;this.g=void 0!==b.image?b.image:null;this.h=void 0!==b.stroke?b.stroke:null;this.sa=void 0!==b.text?b.text:null;this.a=b.zIndex}zi.prototype.M=function(){return this.f};zi.prototype.Ka=function(){return this.c};zi.prototype.T=function(){return this.g};zi.prototype.va=function(){return this.h};
function Bi(b,c){ga(c)?b.b=c:"string"===typeof c?b.b=function(b){return b.get(c)}:c?void 0!==c&&(b.b=function(){return c}):b.b=Ai;b.f=c}function Ci(b){if(!ga(b)){var c;c=Array.isArray(b)?b:[b];b=function(){return c}}return b}var Di=null;function Ei(){if(!Di){var b=new si({color:"rgba(255,255,255,0.4)"}),c=new xi({color:"#3399CC",width:1.25});Di=[new zi({image:new yi({fill:b,stroke:c,radius:5}),fill:b,stroke:c})]}return Di}
function Fi(){var b={},c=[255,255,255,1],d=[0,153,255,1];b.Polygon=[new zi({fill:new si({color:[255,255,255,.5]})})];b.MultiPolygon=b.Polygon;b.LineString=[new zi({stroke:new xi({color:c,width:5})}),new zi({stroke:new xi({color:d,width:3})})];b.MultiLineString=b.LineString;b.Circle=b.Polygon.concat(b.LineString);b.Point=[new zi({image:new yi({radius:6,fill:new si({color:d}),stroke:new xi({color:c,width:1.5})}),zIndex:Infinity})];b.MultiPoint=b.Point;b.GeometryCollection=b.Polygon.concat(b.LineString,
b.Point);return b}function Ai(b){return b.M()};function Y(b){b=b?b:{};var c=Wa({},b);delete c.style;delete c.renderBuffer;delete c.updateWhileAnimating;delete c.updateWhileInteracting;Ag.call(this,c);this.a=void 0!==b.renderBuffer?b.renderBuffer:100;this.o=null;this.g=void 0;this.s(b.style);this.i=void 0!==b.updateWhileAnimating?b.updateWhileAnimating:!1;this.j=void 0!==b.updateWhileInteracting?b.updateWhileInteracting:!1}M(Y,Ag);Y.prototype.s=function(b){this.o=void 0!==b?b:Ei;this.g=null===b?void 0:Ci(this.o);this.v()};function Gi(b,c,d,e,f){this.c=b;this.u=c;this.l=d;this.w=e;this.Ja=f;this.g=this.a=this.b=this.X=this.ba=this.S=null;this.aa=this.ja=this.o=this.D=this.K=this.B=0;this.ea=!1;this.h=this.na=0;this.za=!1;this.G=0;this.f="";this.j=this.H=this.Aa=this.pa=0;this.P=this.A=this.i=null;this.s=[];this.Ba=zb()}M(Gi,yg);
function Hi(b,c,d){if(b.g){c=Ac(c,0,d,2,b.w,b.s);d=b.c;var e=b.Ba,f=d.globalAlpha;1!=b.o&&(d.globalAlpha=f*b.o);var g=b.na;b.ea&&(g+=b.Ja);var h,k;h=0;for(k=c.length;h<k;h+=2){var l=c[h]-b.B,m=c[h+1]-b.K;b.za&&(l=Math.round(l),m=Math.round(m));if(0!==g||1!=b.h){var n=l+b.B,q=m+b.K;Cg(e,n,q,b.h,b.h,g,-n,-q);d.setTransform(e[0],e[1],e[4],e[5],e[12],e[13])}d.drawImage(b.g,b.ja,b.aa,b.G,b.D,l,m,b.G,b.D)}0===g&&1==b.h||d.setTransform(1,0,0,1,0,0);1!=b.o&&(d.globalAlpha=f)}}
function Ii(b,c,d,e){var f=0;if(b.P&&""!==b.f){b.i&&Ji(b,b.i);b.A&&Ki(b,b.A);var g=b.P,h=b.c,k=b.X;k?(k.font!=g.font&&(k.font=h.font=g.font),k.textAlign!=g.textAlign&&(k.textAlign=h.textAlign=g.textAlign),k.textBaseline!=g.textBaseline&&(k.textBaseline=h.textBaseline=g.textBaseline)):(h.font=g.font,h.textAlign=g.textAlign,h.textBaseline=g.textBaseline,b.X={font:g.font,textAlign:g.textAlign,textBaseline:g.textBaseline});c=Ac(c,f,d,e,b.w,b.s);for(g=b.c;f<d;f+=e){h=c[f]+b.pa;k=c[f+1]+b.Aa;if(0!==b.H||
1!=b.j){var l=Cg(b.Ba,h,k,b.j,b.j,b.H,-h,-k);g.setTransform(l[0],l[1],l[4],l[5],l[12],l[13])}b.A&&g.strokeText(b.f,h,k);b.i&&g.fillText(b.f,h,k)}0===b.H&&1==b.j||g.setTransform(1,0,0,1,0,0)}}function Li(b,c,d,e,f,g){var h=b.c;b=Ac(c,d,e,f,b.w,b.s);h.moveTo(b[0],b[1]);c=b.length;g&&(c-=2);for(d=2;d<c;d+=2)h.lineTo(b[d],b[d+1]);g&&h.closePath();return e}function Mi(b,c,d,e,f){var g,h;g=0;for(h=e.length;g<h;++g)d=Li(b,c,d,e[g],f,!0);return d}p=Gi.prototype;
p.nc=function(b){if(ac(this.l,b.C())){if(this.b||this.a){this.b&&Ji(this,this.b);this.a&&Ki(this,this.a);var c;c=this.w;var d=this.s,e=b.a;c=e?Ac(e,0,e.length,b.b,c,d):null;d=c[2]-c[0];e=c[3]-c[1];d=Math.sqrt(d*d+e*e);e=this.c;e.beginPath();e.arc(c[0],c[1],d,0,2*Math.PI);this.b&&e.fill();this.a&&e.stroke()}""!==this.f&&Ii(this,b.a.slice(0,b.b),2,2)}};p.Za=function(b){var c=b.a;b=b.b;this.g&&Hi(this,c,c.length);""!==this.f&&Ii(this,c,c.length,b)};
p.Ya=function(b){var c=b.a;b=b.b;this.g&&Hi(this,c,c.length);""!==this.f&&Ii(this,c,c.length,b)};p.pc=function(b){if(ac(this.l,b.C())){if(this.a){Ki(this,this.a);var c=this.c,d=b.a;c.beginPath();Li(this,d,0,d.length,b.b,!1);c.stroke()}""!==this.f&&(b=Ni(b),Ii(this,b,2,2))}};
p.qc=function(b){var c=b.C();if(ac(this.l,c)){if(this.a){Ki(this,this.a);var c=this.c,d=b.a,e=0,f=b.$a(),g=b.b;c.beginPath();var h,k;h=0;for(k=f.length;h<k;++h)e=Li(this,d,e,f[h],g,!1);c.stroke()}""!==this.f&&(b=Oi(b),Ii(this,b,b.length,2))}};p.sc=function(b){if(ac(this.l,b.C())){if(this.a||this.b){this.b&&Ji(this,this.b);this.a&&Ki(this,this.a);var c=this.c;c.beginPath();Mi(this,Vc(b),0,b.$a(),b.b);this.b&&c.fill();this.a&&c.stroke()}""!==this.f&&(b=Wc(b),Ii(this,b,2,2))}};
p.rc=function(b){if(ac(this.l,b.C())){if(this.a||this.b){this.b&&Ji(this,this.b);this.a&&Ki(this,this.a);var c=this.c,d=Pi(b),e=0,f=b.c,g=b.b,h,k;h=0;for(k=f.length;h<k;++h){var l=f[h];c.beginPath();e=Mi(this,d,e,l,g);this.b&&c.fill();this.a&&c.stroke()}}""!==this.f&&(b=Qi(b),Ii(this,b,b.length,2))}};function Ji(b,c){var d=b.c,e=b.S;e?e.fillStyle!=c.fillStyle&&(e.fillStyle=d.fillStyle=c.fillStyle):(d.fillStyle=c.fillStyle,b.S={fillStyle:c.fillStyle})}
function Ki(b,c){var d=b.c,e=b.ba;e?(e.lineCap!=c.lineCap&&(e.lineCap=d.lineCap=c.lineCap),yf&&!Ma(e.lineDash,c.lineDash)&&d.setLineDash(e.lineDash=c.lineDash),e.lineJoin!=c.lineJoin&&(e.lineJoin=d.lineJoin=c.lineJoin),e.lineWidth!=c.lineWidth&&(e.lineWidth=d.lineWidth=c.lineWidth),e.miterLimit!=c.miterLimit&&(e.miterLimit=d.miterLimit=c.miterLimit),e.strokeStyle!=c.strokeStyle&&(e.strokeStyle=d.strokeStyle=c.strokeStyle)):(d.lineCap=c.lineCap,yf&&d.setLineDash(c.lineDash),d.lineJoin=c.lineJoin,d.lineWidth=
c.lineWidth,d.miterLimit=c.miterLimit,d.strokeStyle=c.strokeStyle,b.ba={lineCap:c.lineCap,lineDash:c.lineDash,lineJoin:c.lineJoin,lineWidth:c.lineWidth,miterLimit:c.miterLimit,strokeStyle:c.strokeStyle})}
p.Ga=function(b,c){if(b){var d=b.ga();this.b={fillStyle:yd(d?d:oi)}}else this.b=null;if(c){var d=c.ga(),e=c.Da,f=c.getLineDash(),g=c.Ea,h=c.ha(),k=c.Fa;this.a={lineCap:void 0!==e?e:"round",lineDash:f?f:pi,lineJoin:void 0!==g?g:"round",lineWidth:this.u*(void 0!==h?h:1),miterLimit:void 0!==k?k:10,strokeStyle:vd(d?d:qi)}}else this.a=null};
p.Ha=function(b){if(b){var c=b.jb(),d=b.T(1),e=b.ka(),f=b.Pa();this.B=c[0];this.K=c[1];this.D=f[1];this.g=d;this.o=b.l;this.ja=e[0];this.aa=e[1];this.ea=b.i;this.na=b.Y();this.h=b.gb;this.za=b.u;this.G=f[0]}else this.g=null};
p.xa=function(b){if(b){var c=b.Ka();c?(c=c.ga(),this.i={fillStyle:yd(c?c:oi)}):this.i=null;var d=b.va();if(d){var c=d.ga(),e=d.Da,f=d.getLineDash(),g=d.Ea,h=d.ha(),d=d.Fa;this.A={lineCap:void 0!==e?e:"round",lineDash:f?f:pi,lineJoin:void 0!==g?g:"round",lineWidth:void 0!==h?h:1,miterLimit:void 0!==d?d:10,strokeStyle:vd(c?c:qi)}}else this.A=null;var c=b.pd(),e=b.qd(),f=b.rd(),g=b.Y(),h=b.gb,d=b.sa,k=b.sd();b=b.td();this.P={font:void 0!==c?c:"10px sans-serif",textAlign:void 0!==k?k:"center",textBaseline:void 0!==
b?b:"middle"};this.f=void 0!==d?d:"";this.pa=void 0!==e?this.u*e:0;this.Aa=void 0!==f?this.u*f:0;this.H=void 0!==g?g:0;this.j=this.u*(void 0!==h?h:1)}else this.f=""};function Ri(b){Fg.call(this,b);this.K=zb()}M(Ri,Fg);
Ri.prototype.g=function(b,c,d){Si(this,"precompose",d,b,void 0);var e=this.T();if(e){var f=c.extent,g=void 0!==f;if(g){var h=b.pixelRatio,k=b.size[0]*h,l=b.size[1]*h,m=b.viewState.rotation,n=bc(f),q=[f[2],f[3]],r=[f[2],f[1]],f=Xb(f);Eg(b.coordinateToPixelMatrix,n,n);Eg(b.coordinateToPixelMatrix,q,q);Eg(b.coordinateToPixelMatrix,r,r);Eg(b.coordinateToPixelMatrix,f,f);d.save();ri(d,-m,k/2,l/2);d.beginPath();d.moveTo(n[0]*h,n[1]*h);d.lineTo(q[0]*h,q[1]*h);d.lineTo(r[0]*h,r[1]*h);d.lineTo(f[0]*h,f[1]*
h);d.clip();ri(d,m,k/2,l/2)}h=this.D;k=d.globalAlpha;d.globalAlpha=c.opacity;d.drawImage(e,0,0,+e.width,+e.height,Math.round(h[12]),Math.round(h[13]),Math.round(e.width*h[0]),Math.round(e.height*h[5]));d.globalAlpha=k;g&&d.restore()}Si(this,"postcompose",d,b,void 0)};
function Si(b,c,d,e,f){var g=b.a;if(nb(g,c)){var h=e.size[0]*e.pixelRatio,k=e.size[1]*e.pixelRatio,l=e.viewState.rotation;ri(d,-l,h/2,k/2);b=void 0!==f?f:Ti(b,e,0);b=new Gi(d,e.pixelRatio,e.extent,b,e.viewState.rotation);S(g,new zg(c,g,b,e,d,null));ri(d,l,h/2,k/2)}}function Ti(b,c,d){var e=c.viewState,f=c.pixelRatio;return Cg(b.K,f*c.size[0]/2,f*c.size[1]/2,f/e.resolution,-f/e.resolution,-e.rotation,-e.center[0]+d,-e.center[1])};var Ui=["Polygon","LineString","Image","Text"];function Vi(b,c,d){this.aa=b;this.P=c;this.c=null;this.g=0;this.resolution=d;this.D=this.K=null;this.b=[];this.coordinates=[];this.ba=zb();this.a=[];this.S=[];this.X=zb();this.ja=zb()}M(Vi,yg);
function Wi(b,c,d,e,f,g){var h=b.coordinates.length,k=b.Jb(),l=[c[d],c[d+1]],m=[NaN,NaN],n=!0,q,r,u;for(q=d+f;q<e;q+=f){m[0]=c[q];m[1]=c[q+1];u=k[1];var w=k[2],y=k[3],z=m[0],D=m[1],t=0;z<k[0]?t=t|16:z>w&&(t=t|4);D<u?t|=8:D>y&&(t|=2);0===t&&(t=1);u=t;u!==r?(n&&(b.coordinates[h++]=l[0],b.coordinates[h++]=l[1]),b.coordinates[h++]=m[0],b.coordinates[h++]=m[1],n=!1):1===u?(b.coordinates[h++]=m[0],b.coordinates[h++]=m[1],n=!1):n=!0;l[0]=m[0];l[1]=m[1];r=u}q===d+f&&(b.coordinates[h++]=l[0],b.coordinates[h++]=
l[1]);g&&(b.coordinates[h++]=c[d],b.coordinates[h++]=c[d+1]);return h}function Xi(b,c){b.K=[0,c,0];b.b.push(b.K);b.D=[0,c,0];b.a.push(b.D)}
function Yi(b,c,d,e,f,g,h,k,l){var m;Dg(e,b.ba)?m=b.S:(m=Ac(b.coordinates,0,b.coordinates.length,2,e,b.S),Cb(b.ba,e));e=!$a(g);var n=0,q=h.length,r=0,u,w=b.X;b=b.ja;for(var y,z,D,t;n<q;){var v=h[n],B,E,C,G;switch(v[0]){case 0:r=v[1];e&&g[I(r).toString()]||!r.M()?n=v[2]:void 0===l||ac(l,r.M().C())?++n:n=v[2];break;case 1:c.beginPath();++n;break;case 2:r=v[1];u=m[r];v=m[r+1];D=m[r+2]-u;r=m[r+3]-v;c.arc(u,v,Math.sqrt(D*D+r*r),0,2*Math.PI,!0);++n;break;case 3:c.closePath();++n;break;case 4:r=v[1];u=v[2];
B=v[3];C=v[4]*d;var J=v[5]*d,A=v[6];E=v[7];var H=v[8],O=v[9];D=v[11];t=v[12];var P=v[13],L=v[14];for(v[10]&&(D+=f);r<u;r+=2){v=m[r]-C;G=m[r+1]-J;P&&(v=Math.round(v),G=Math.round(G));if(1!=t||0!==D){var K=v+C,fa=G+J;Cg(w,K,fa,t,t,D,-K,-fa);c.transform(w[0],w[1],w[4],w[5],w[12],w[13])}K=c.globalAlpha;1!=E&&(c.globalAlpha=K*E);var fa=L+H>B.width?B.width-H:L,qa=A+O>B.height?B.height-O:A;c.drawImage(B,H,O,fa,qa,v,G,fa*d,qa*d);1!=E&&(c.globalAlpha=K);if(1!=t||0!==D)Eb(w,b),c.transform(b[0],b[1],b[4],b[5],
b[12],b[13])}++n;break;case 5:r=v[1];u=v[2];C=v[3];J=v[4]*d;A=v[5]*d;D=v[6];t=v[7]*d;B=v[8];for(E=v[9];r<u;r+=2){v=m[r]+J;G=m[r+1]+A;if(1!=t||0!==D)Cg(w,v,G,t,t,D,-v,-G),c.transform(w[0],w[1],w[4],w[5],w[12],w[13]);H=C.split("\n");O=H.length;1<O?(P=Math.round(1.5*c.measureText("M").width),G-=(O-1)/2*P):P=0;for(L=0;L<O;L++)K=H[L],E&&c.strokeText(K,v,G),B&&c.fillText(K,v,G),G+=P;if(1!=t||0!==D)Eb(w,b),c.transform(b[0],b[1],b[4],b[5],b[12],b[13])}++n;break;case 6:if(void 0!==k&&(r=v[1],r=k(r)))return r;
++n;break;case 7:c.fill();++n;break;case 8:r=v[1];u=v[2];v=m[r];G=m[r+1];D=v+.5|0;t=G+.5|0;if(D!==y||t!==z)c.moveTo(v,G),y=D,z=t;for(r+=2;r<u;r+=2)if(v=m[r],G=m[r+1],D=v+.5|0,t=G+.5|0,D!==y||t!==z)c.lineTo(v,G),y=D,z=t;++n;break;case 9:c.fillStyle=v[1];++n;break;case 10:y=void 0!==v[7]?v[7]:!0;z=v[2];c.strokeStyle=v[1];c.lineWidth=y?z*d:z;c.lineCap=v[3];c.lineJoin=v[4];c.miterLimit=v[5];yf&&c.setLineDash(v[6]);z=y=NaN;++n;break;case 11:c.font=v[1];c.textAlign=v[2];c.textBaseline=v[3];++n;break;case 12:c.stroke();
++n;break;default:++n}}}function Zi(b){var c=b.a;c.reverse();var d,e=c.length,f,g,h=-1;for(d=0;d<e;++d)if(f=c[d],g=f[0],6==g)h=d;else if(0==g){f[2]=d;f=b.a;for(g=d;h<g;){var k=f[h];f[h]=f[g];f[g]=k;++h;--g}h=-1}}function $i(b,c){b.K[2]=b.b.length;b.K=null;b.D[2]=b.a.length;b.D=null;var d=[6,c];b.b.push(d);b.a.push(d)}Vi.prototype.qb=pa;Vi.prototype.Jb=function(){return this.P};
function aj(b,c,d){Vi.call(this,b,c,d);this.i=this.G=null;this.B=this.w=this.H=this.u=this.s=this.o=this.A=this.j=this.l=this.h=this.f=void 0}M(aj,Vi);aj.prototype.Za=function(b,c){if(this.i){Xi(this,c);var d=b.a,e=this.coordinates.length,d=Wi(this,d,0,d.length,b.b,!1);this.b.push([4,e,d,this.i,this.f,this.h,this.l,this.j,this.A,this.o,this.s,this.u,this.H,this.w,this.B]);this.a.push([4,e,d,this.G,this.f,this.h,this.l,this.j,this.A,this.o,this.s,this.u,this.H,this.w,this.B]);$i(this,c)}};
aj.prototype.Ya=function(b,c){if(this.i){Xi(this,c);var d=b.a,e=this.coordinates.length,d=Wi(this,d,0,d.length,b.b,!1);this.b.push([4,e,d,this.i,this.f,this.h,this.l,this.j,this.A,this.o,this.s,this.u,this.H,this.w,this.B]);this.a.push([4,e,d,this.G,this.f,this.h,this.l,this.j,this.A,this.o,this.s,this.u,this.H,this.w,this.B]);$i(this,c)}};aj.prototype.qb=function(){Zi(this);this.h=this.f=void 0;this.i=this.G=null;this.B=this.w=this.u=this.s=this.o=this.A=this.j=this.H=this.l=void 0};
aj.prototype.Ha=function(b){var c=b.jb(),d=b.Pa(),e=b.Wb(1),f=b.T(1),g=b.ka();this.f=c[0];this.h=c[1];this.G=e;this.i=f;this.l=d[1];this.j=b.l;this.A=g[0];this.o=g[1];this.s=b.i;this.u=b.Y();this.H=b.gb;this.w=b.u;this.B=d[0]};function bj(b,c,d){Vi.call(this,b,c,d);this.f={Xa:void 0,Sa:void 0,Ta:null,Ua:void 0,Va:void 0,Wa:void 0,Rb:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}M(bj,Vi);
function cj(b,c,d,e,f){var g=b.coordinates.length;c=Wi(b,c,d,e,f,!1);g=[8,g,c];b.b.push(g);b.a.push(g);return e}p=bj.prototype;p.Jb=function(){this.c||(this.c=Mb(this.P),0<this.g&&Lb(this.c,this.resolution*(this.g+1)/2,this.c));return this.c};
function dj(b){var c=b.f,d=c.strokeStyle,e=c.lineCap,f=c.lineDash,g=c.lineJoin,h=c.lineWidth,k=c.miterLimit;c.Xa==d&&c.Sa==e&&Ma(c.Ta,f)&&c.Ua==g&&c.Va==h&&c.Wa==k||(c.Rb!=b.coordinates.length&&(b.b.push([12]),c.Rb=b.coordinates.length),b.b.push([10,d,h,e,g,k,f],[1]),c.Xa=d,c.Sa=e,c.Ta=f,c.Ua=g,c.Va=h,c.Wa=k)}
p.pc=function(b,c){var d=this.f,e=d.lineWidth;void 0!==d.strokeStyle&&void 0!==e&&(dj(this),Xi(this,c),this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash],[1]),d=b.a,cj(this,d,0,d.length,b.b),this.a.push([12]),$i(this,c))};
p.qc=function(b,c){var d=this.f,e=d.lineWidth;if(void 0!==d.strokeStyle&&void 0!==e){dj(this);Xi(this,c);this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash],[1]);var d=b.$a(),e=b.a,f=b.b,g=0,h,k;h=0;for(k=d.length;h<k;++h)g=cj(this,e,g,d[h],f);this.a.push([12]);$i(this,c)}};p.qb=function(){this.f.Rb!=this.coordinates.length&&this.b.push([12]);Zi(this);this.f=null};
p.Ga=function(b,c){var d=c.ga();this.f.strokeStyle=vd(d?d:qi);d=c.Da;this.f.lineCap=void 0!==d?d:"round";d=c.getLineDash();this.f.lineDash=d?d:pi;d=c.Ea;this.f.lineJoin=void 0!==d?d:"round";d=c.ha();this.f.lineWidth=void 0!==d?d:1;d=c.Fa;this.f.miterLimit=void 0!==d?d:10;this.f.lineWidth>this.g&&(this.g=this.f.lineWidth,this.c=null)};
function ej(b,c,d){Vi.call(this,b,c,d);this.f={mc:void 0,Xa:void 0,Sa:void 0,Ta:null,Ua:void 0,Va:void 0,Wa:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}M(ej,Vi);
function fj(b,c,d,e,f){var g=b.f,h=[1];b.b.push(h);b.a.push(h);var k,h=0;for(k=e.length;h<k;++h){var l=e[h],m=b.coordinates.length;d=Wi(b,c,d,l,f,!0);d=[8,m,d];m=[3];b.b.push(d,m);b.a.push(d,m);d=l}c=[7];b.a.push(c);void 0!==g.fillStyle&&b.b.push(c);void 0!==g.strokeStyle&&(g=[12],b.b.push(g),b.a.push(g));return d}p=ej.prototype;
p.nc=function(b,c){var d=this.f,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e){gj(this);Xi(this,c);this.a.push([9,vd(oi)]);void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var f=b.a,e=this.coordinates.length;Wi(this,f,0,f.length,b.b,!1);f=[1];e=[2,e];this.b.push(f,e);this.a.push(f,e);e=[7];this.a.push(e);void 0!==d.fillStyle&&this.b.push(e);void 0!==d.strokeStyle&&(d=[12],this.b.push(d),this.a.push(d));$i(this,c)}};
p.sc=function(b,c){var d=this.f,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e)gj(this),Xi(this,c),this.a.push([9,vd(oi)]),void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]),d=b.$a(),e=Vc(b),fj(this,e,0,d,b.b),$i(this,c)};
p.rc=function(b,c){var d=this.f,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e){gj(this);Xi(this,c);this.a.push([9,vd(oi)]);void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var d=b.c,e=Pi(b),f=b.b,g=0,h,k;h=0;for(k=d.length;h<k;++h)g=fj(this,e,g,d[h],f);$i(this,c)}};p.qb=function(){Zi(this);this.f=null;var b=this.aa;if(0!==b){var c=this.coordinates,d,e;d=0;for(e=c.length;d<e;++d)c[d]=b*Math.round(c[d]/b)}};
p.Jb=function(){this.c||(this.c=Mb(this.P),0<this.g&&Lb(this.c,this.resolution*(this.g+1)/2,this.c));return this.c};
p.Ga=function(b,c){var d=this.f;if(b){var e=b.ga();d.fillStyle=yd(e?e:oi)}else d.fillStyle=void 0;c?(e=c.ga(),d.strokeStyle=vd(e?e:qi),e=c.Da,d.lineCap=void 0!==e?e:"round",e=c.getLineDash(),d.lineDash=e?e.slice():pi,e=c.Ea,d.lineJoin=void 0!==e?e:"round",e=c.ha(),d.lineWidth=void 0!==e?e:1,e=c.Fa,d.miterLimit=void 0!==e?e:10,d.lineWidth>this.g&&(this.g=d.lineWidth,this.c=null)):(d.strokeStyle=void 0,d.lineCap=void 0,d.lineDash=null,d.lineJoin=void 0,d.lineWidth=void 0,d.miterLimit=void 0)};
function gj(b){var c=b.f,d=c.fillStyle,e=c.strokeStyle,f=c.lineCap,g=c.lineDash,h=c.lineJoin,k=c.lineWidth,l=c.miterLimit;void 0!==d&&c.mc!=d&&(b.b.push([9,d]),c.mc=c.fillStyle);void 0===e||c.Xa==e&&c.Sa==f&&c.Ta==g&&c.Ua==h&&c.Va==k&&c.Wa==l||(b.b.push([10,e,k,f,h,l,g]),c.Xa=e,c.Sa=f,c.Ta=g,c.Ua=h,c.Va=k,c.Wa=l)}function hj(b,c,d){Vi.call(this,b,c,d);this.w=this.H=this.u=null;this.i="";this.s=this.o=this.A=this.j=0;this.l=this.h=this.f=null}M(hj,Vi);
function ij(b,c,d,e,f){if(""!==b.i&&b.l&&(b.f||b.h)){if(b.f){var g=b.f,h=b.u;if(!h||h.fillStyle!=g.fillStyle){var k=[9,g.fillStyle];b.b.push(k);b.a.push(k);h?h.fillStyle=g.fillStyle:b.u={fillStyle:g.fillStyle}}}b.h&&(g=b.h,h=b.H,h&&h.lineCap==g.lineCap&&h.lineDash==g.lineDash&&h.lineJoin==g.lineJoin&&h.lineWidth==g.lineWidth&&h.miterLimit==g.miterLimit&&h.strokeStyle==g.strokeStyle||(k=[10,g.strokeStyle,g.lineWidth,g.lineCap,g.lineJoin,g.miterLimit,g.lineDash,!1],b.b.push(k),b.a.push(k),h?(h.lineCap=
g.lineCap,h.lineDash=g.lineDash,h.lineJoin=g.lineJoin,h.lineWidth=g.lineWidth,h.miterLimit=g.miterLimit,h.strokeStyle=g.strokeStyle):b.H={lineCap:g.lineCap,lineDash:g.lineDash,lineJoin:g.lineJoin,lineWidth:g.lineWidth,miterLimit:g.miterLimit,strokeStyle:g.strokeStyle}));g=b.l;h=b.w;h&&h.font==g.font&&h.textAlign==g.textAlign&&h.textBaseline==g.textBaseline||(k=[11,g.font,g.textAlign,g.textBaseline],b.b.push(k),b.a.push(k),h?(h.font=g.font,h.textAlign=g.textAlign,h.textBaseline=g.textBaseline):b.w=
{font:g.font,textAlign:g.textAlign,textBaseline:g.textBaseline});Xi(b,f);g=b.coordinates.length;c=Wi(b,c,0,d,e,!1);c=[5,g,c,b.i,b.j,b.A,b.o,b.s,!!b.f,!!b.h];b.b.push(c);b.a.push(c);$i(b,f)}}
hj.prototype.xa=function(b){if(b){var c=b.Ka();c?(c=c.ga(),c=yd(c?c:oi),this.f?this.f.fillStyle=c:this.f={fillStyle:c}):this.f=null;var d=b.va();if(d){var c=d.ga(),e=d.Da,f=d.getLineDash(),g=d.Ea,h=d.ha(),d=d.Fa,e=void 0!==e?e:"round",f=f?f.slice():pi,g=void 0!==g?g:"round",h=void 0!==h?h:1,d=void 0!==d?d:10,c=vd(c?c:qi);if(this.h){var k=this.h;k.lineCap=e;k.lineDash=f;k.lineJoin=g;k.lineWidth=h;k.miterLimit=d;k.strokeStyle=c}else this.h={lineCap:e,lineDash:f,lineJoin:g,lineWidth:h,miterLimit:d,strokeStyle:c}}else this.h=
null;var l=b.pd(),c=b.qd(),e=b.rd(),f=b.Y(),h=b.gb,d=b.sa,g=b.sd(),k=b.td();b=void 0!==l?l:"10px sans-serif";g=void 0!==g?g:"center";k=void 0!==k?k:"middle";this.l?(l=this.l,l.font=b,l.textAlign=g,l.textBaseline=k):this.l={font:b,textAlign:g,textBaseline:k};this.i=void 0!==d?d:"";this.j=void 0!==c?c:0;this.A=void 0!==e?e:0;this.o=void 0!==f?f:0;this.s=void 0!==h?h:1}else this.i=""};function jj(b,c,d,e){this.o=b;this.h=c;this.A=d;this.l=e;this.b={};this.i=lf(1,1);this.j=zb()}
function kj(b){for(var c in b.b){var d=b.b[c],e;for(e in d)d[e].qb()}}jj.prototype.g=function(b,c,d,e,f){var g=this.j;Cg(g,.5,.5,1/c,-1/c,-d,-b[0],-b[1]);var h=this.i;h.clearRect(0,0,1,1);var k;void 0!==this.l&&(k=Jb(),Kb(k,b),Lb(k,c*this.l,k));return lj(this,h,g,d,e,function(b){if(0<h.getImageData(0,0,1,1).data[3]){if(b=f(b))return b;h.clearRect(0,0,1,1)}},k)};
jj.prototype.a=function(b,c){var d=void 0!==b?b.toString():"0",e=this.b[d];void 0===e&&(e={},this.b[d]=e);d=e[c];void 0===d&&(d=new mj[c](this.o,this.h,this.A),e[c]=d);return d};jj.prototype.c=function(){return $a(this.b)};
jj.prototype.f=function(b,c,d,e,f,g){var h=Object.keys(this.b).map(Number);h.sort(Ha);if(!1!==g){var k=this.h;g=k[0];var l=k[1],m=k[2],k=k[3];g=[g,l,g,k,m,k,m,l];Ac(g,0,8,2,d,g);b.save();b.beginPath();b.moveTo(g[0],g[1]);b.lineTo(g[2],g[3]);b.lineTo(g[4],g[5]);b.lineTo(g[6],g[7]);b.closePath();b.clip()}var n,q;g=0;for(l=h.length;g<l;++g)for(n=this.b[h[g].toString()],m=0,k=Ui.length;m<k;++m)q=n[Ui[m]],void 0!==q&&Yi(q,b,c,d,e,f,q.b,void 0);b.restore()};
function lj(b,c,d,e,f,g,h){var k=Object.keys(b.b).map(Number);k.sort(function(b,c){return c-b});var l,m,n,q,r;l=0;for(m=k.length;l<m;++l)for(q=b.b[k[l].toString()],n=Ui.length-1;0<=n;--n)if(r=q[Ui[n]],void 0!==r&&(r=Yi(r,c,1,d,e,f,r.a,g,h)))return r}var mj={Image:aj,LineString:bj,Polygon:ej,Text:hj};function nj(b,c){return I(b)-I(c)}function oj(b,c){var d=.5*b/c;return d*d}function pj(b,c,d,e,f,g){var h=!1,k,l;if(k=d.T())l=k.rb(),2==l||3==l?k.Xc(f,g):(0==l&&k.load(),k.Bc(f,g),h=!0);if(f=(0,d.b)(c))e=f.Nb(e),(0,qj[e.U()])(b,e,d,c);return h}
var qj={Point:function(b,c,d,e){var f=d.T();if(f){if(2!=f.rb())return;var g=b.a(d.a,"Image");g.Ha(f);g.Za(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),ij(b,c.a,2,2,e)},LineString:function(b,c,d,e){var f=d.va();if(f){var g=b.a(d.a,"LineString");g.Ga(null,f);g.pc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),ij(b,Ni(c),2,2,e)},Polygon:function(b,c,d,e){var f=d.Ka(),g=d.va();if(f||g){var h=b.a(d.a,"Polygon");h.Ga(f,g);h.sc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),ij(b,Wc(c),2,2,e)},MultiPoint:function(b,c,d,
e){var f=d.T();if(f){if(2!=f.rb())return;var g=b.a(d.a,"Image");g.Ha(f);g.Ya(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),d=c.a,ij(b,d,d.length,c.b,e)},MultiLineString:function(b,c,d,e){var f=d.va();if(f){var g=b.a(d.a,"LineString");g.Ga(null,f);g.qc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),c=Oi(c),ij(b,c,c.length,2,e)},MultiPolygon:function(b,c,d,e){var f=d.Ka(),g=d.va();if(g||f){var h=b.a(d.a,"Polygon");h.Ga(f,g);h.rc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),c=Qi(c),ij(b,c,c.length,2,e)},GeometryCollection:function(b,
c,d,e){c=c.a;var f,g;f=0;for(g=c.length;f<g;++f)(0,qj[c[f].U()])(b,c[f],d,e)},Circle:function(b,c,d,e){var f=d.Ka(),g=d.va();if(f||g){var h=b.a(d.a,"Polygon");h.Ga(f,g);h.nc(c,e)}if(f=d.sa)b=b.a(d.a,"Text"),b.xa(f),ij(b,c.a.slice(0,c.b),2,2,e)}};var rj=!((W("Chrome")||W("CriOS"))&&!W("Opera")&&!W("OPR")&&!W("Edge"))||W("iPhone")&&!W("iPod")&&!W("iPad")||W("iPad")||W("iPod");function sj(b,c,d,e){b=d-b;c=e-c;var f=Math.sqrt(b*b+c*c);return[Math.round(d+b/f),Math.round(e+c/f)]}
function tj(b,c,d,e,f,g,h,k,l,m,n){var q=lf(Math.round(d*b),Math.round(d*c));if(0===l.length)return q.canvas;q.scale(d,d);var r=Jb();l.forEach(function(b){Sb(r,b.extent)});var u=lf(Math.round(d*Vb(r)/e),Math.round(d*Wb(r)/e)),w=d/e;l.forEach(function(b){u.drawImage(b.image,m,m,b.image.width-2*m,b.image.height-2*m,(b.extent[0]-r[0])*w,-(b.extent[3]-r[3])*w,Vb(b.extent)*w,Wb(b.extent)*w)});var y=bc(h);k.c.forEach(function(b){var c=b.source,f=b.target,h=c[1][0],k=c[1][1],l=c[2][0],m=c[2][1];b=(f[0][0]-
y[0])/g;var w=-(f[0][1]-y[1])/g,n=(f[1][0]-y[0])/g,A=-(f[1][1]-y[1])/g,H=(f[2][0]-y[0])/g,O=-(f[2][1]-y[1])/g,f=c[0][0],c=c[0][1],h=h-f,k=k-c,l=l-f,m=m-c;a:{h=[[h,k,0,0,n-b],[l,m,0,0,H-b],[0,0,h,k,A-w],[0,0,l,m,O-w]];k=h.length;for(l=0;l<k;l++){for(var m=l,P=Math.abs(h[l][l]),L=l+1;L<k;L++){var K=Math.abs(h[L][l]);K>P&&(P=K,m=L)}if(0===P){h=null;break a}P=h[m];h[m]=h[l];h[l]=P;for(m=l+1;m<k;m++)for(P=-h[m][l]/h[l][l],L=l;L<k+1;L++)h[m][L]=l==L?0:h[m][L]+P*h[l][L]}l=Array(k);for(m=k-1;0<=m;m--)for(l[m]=
h[m][k]/h[m][m],P=m-1;0<=P;P--)h[P][k]-=h[P][m]*l[m];h=l}h&&(q.save(),q.beginPath(),rj?(l=(b+n+H)/3,m=(w+A+O)/3,k=sj(l,m,b,w),n=sj(l,m,n,A),H=sj(l,m,H,O),q.moveTo(k[0],k[1]),q.lineTo(n[0],n[1]),q.lineTo(H[0],H[1])):(q.moveTo(b,w),q.lineTo(n,A),q.lineTo(H,O)),q.closePath(),q.clip(),q.transform(h[0],h[2],h[1],h[3],b,w),q.translate(r[0]-f,r[3]-c),q.scale(e/d,-e/d),q.drawImage(u.canvas,0,0),q.restore())});n&&(q.save(),q.strokeStyle="black",q.lineWidth=1,k.c.forEach(function(b){var c=b.target;b=(c[0][0]-
y[0])/g;var d=-(c[0][1]-y[1])/g,e=(c[1][0]-y[0])/g,f=-(c[1][1]-y[1])/g,h=(c[2][0]-y[0])/g,c=-(c[2][1]-y[1])/g;q.beginPath();q.moveTo(b,d);q.lineTo(e,f);q.lineTo(h,c);q.closePath();q.stroke()}),q.restore());return q.canvas};function uj(b,c,d,e,f){this.f=b;this.g=c;var g={},h=xc(this.g,this.f);this.b=function(b){var c=b[0]+"/"+b[1];g[c]||(g[c]=h(b));return g[c]};this.h=e;this.A=f*f;this.c=[];this.i=!1;this.j=this.f.a&&!!e&&!!this.f.C()&&Vb(e)==Vb(this.f.C());this.a=this.f.C()?Vb(this.f.C()):null;this.l=this.g.C()?Vb(this.g.C()):null;b=bc(d);c=[d[2],d[3]];e=[d[2],d[1]];d=Xb(d);f=this.b(b);var k=this.b(c),l=this.b(e),m=this.b(d);vj(this,b,c,e,d,f,k,l,m,10);if(this.i){var n=Infinity;this.c.forEach(function(b){n=Math.min(n,
b.source[0][0],b.source[1][0],b.source[2][0])});this.c.forEach(function(b){if(Math.max(b.source[0][0],b.source[1][0],b.source[2][0])-n>this.a/2){var c=[[b.source[0][0],b.source[0][1]],[b.source[1][0],b.source[1][1]],[b.source[2][0],b.source[2][1]]];c[0][0]-n>this.a/2&&(c[0][0]-=this.a);c[1][0]-n>this.a/2&&(c[1][0]-=this.a);c[2][0]-n>this.a/2&&(c[2][0]-=this.a);Math.max(c[0][0],c[1][0],c[2][0])-Math.min(c[0][0],c[1][0],c[2][0])<this.a/2&&(b.source=c)}},this)}g={}}
function vj(b,c,d,e,f,g,h,k,l,m){var n=Ib([g,h,k,l]),q=b.a?Vb(n)/b.a:null,r=b.f.a&&.5<q&&1>q,u=!1;if(0<m){if(b.g.f&&b.l)var w=Ib([c,d,e,f]),u=u|.25<Vb(w)/b.l;!r&&b.f.f&&q&&(u|=.25<q)}if(u||!b.h||ac(n,b.h)){if(!(u||isFinite(g[0])&&isFinite(g[1])&&isFinite(h[0])&&isFinite(h[1])&&isFinite(k[0])&&isFinite(k[1])&&isFinite(l[0])&&isFinite(l[1])))if(0<m)u=!0;else return;if(0<m&&(u||(q=b.b([(c[0]+e[0])/2,(c[1]+e[1])/2]),n=r?(Ea(g[0],b.a)+Ea(k[0],b.a))/2-Ea(q[0],b.a):(g[0]+k[0])/2-q[0],q=(g[1]+k[1])/2-q[1],
u=n*n+q*q>b.A),u)){Math.abs(c[0]-e[0])<=Math.abs(c[1]-e[1])?(r=[(d[0]+e[0])/2,(d[1]+e[1])/2],n=b.b(r),q=[(f[0]+c[0])/2,(f[1]+c[1])/2],u=b.b(q),vj(b,c,d,r,q,g,h,n,u,m-1),vj(b,q,r,e,f,u,n,k,l,m-1)):(r=[(c[0]+d[0])/2,(c[1]+d[1])/2],n=b.b(r),q=[(e[0]+f[0])/2,(e[1]+f[1])/2],u=b.b(q),vj(b,c,r,q,f,g,n,u,l,m-1),vj(b,r,d,e,q,n,h,k,u,m-1));return}if(r){if(!b.j)return;b.i=!0}b.c.push({source:[g,k,l],target:[c,e,f]});b.c.push({source:[g,h,k],target:[c,d,e]})}}
function wj(b){var c=Jb();b.c.forEach(function(b){b=b.source;Kb(c,b[0]);Kb(c,b[1]);Kb(c,b[2])});return c};function xj(b){T.call(this);this.g=void 0;this.a="geometry";this.h=null;this.c=void 0;this.b=null;Q(this,rb(this.a),this.nb,this);void 0!==b&&(b instanceof zc||!b?yj(this,b):this.l(b))}M(xj,T);p=xj.prototype;p.clone=function(){var b=new xj(this.za());zj(b,this.a);var c=this.M();c&&yj(b,c.clone());if(c=this.h)b.h=c,b.c=c?Aj(c):void 0,b.v();return b};p.M=function(){return this.get(this.a)};p.La=function(){return this.g};p.yd=function(){this.v()};
p.nb=function(){this.b&&(N(this.b),this.b=null);var b=this.M();b&&(this.b=Q(b,"change",this.yd,this));this.v()};function yj(b,c){b.set(b.a,c)}function zj(b,c){gb(b,rb(b.a),b.nb,b);b.a=c;Q(b,rb(b.a),b.nb,b);b.nb()}function Aj(b){if(!ga(b)){var c;c=Array.isArray(b)?b:[b];b=function(){return c}}return b};function Bj(b,c,d){return function(e,f,g){var h=new XMLHttpRequest;h.open("GET",ga(b)?b(e,f,g):b,!0);"arraybuffer"==c.U()&&(h.responseType="arraybuffer");h.onload=function(){if(200<=h.status&&300>h.status){var b=c.U(),e;"json"==b||"text"==b?e=h.responseText:"xml"==b?(e=h.responseXML,e||(b=h.responseText,e=(new DOMParser).parseFromString(b,"application/xml"))):"arraybuffer"==b&&(e=h.response);e&&d.call(this,c.b(e,{featureProjection:g}),c.f(Cj(e)))}}.bind(this);h.send()}}
function Dj(b,c){return Bj(b,c,function(b){this.Cb(b)})};function Ej(){return[[-Infinity,-Infinity,Infinity,Infinity]]};var Fj;
(function(){var b={uc:{}};(function(){function c(b,d){if(!(this instanceof c))return new c(b,d);this.Ab=Math.max(4,b||9);this.ec=Math.max(2,Math.ceil(.4*this.Ab));d&&this.ed(d);this.clear()}function d(b,c){b.bbox=e(b,0,b.children.length,c)}function e(b,c,d,e){for(var g=[Infinity,Infinity,-Infinity,-Infinity],h;c<d;c++)h=b.children[c],f(g,b.Z?e(h):h.bbox);return g}function f(b,c){b[0]=Math.min(b[0],c[0]);b[1]=Math.min(b[1],c[1]);b[2]=Math.max(b[2],c[2]);b[3]=Math.max(b[3],c[3])}function g(b,c){return b.bbox[0]-
c.bbox[0]}function h(b,c){return b.bbox[1]-c.bbox[1]}function k(b){return(b[2]-b[0])*(b[3]-b[1])}function l(b){return b[2]-b[0]+(b[3]-b[1])}function m(b,c){return b[0]<=c[0]&&b[1]<=c[1]&&c[2]<=b[2]&&c[3]<=b[3]}function n(b,c){return c[0]<=b[2]&&c[1]<=b[3]&&c[2]>=b[0]&&c[3]>=b[1]}function q(b,c,d,e,f){for(var g=[c,d],h;g.length;)d=g.pop(),c=g.pop(),d-c<=e||(h=c+Math.ceil((d-c)/e/2)*e,r(b,c,d,h,f),g.push(c,h,h,d))}function r(b,c,d,e,f){for(var g,h,k,l,m;d>c;){600<d-c&&(g=d-c+1,h=e-c+1,k=Math.log(g),
l=.5*Math.exp(2*k/3),m=.5*Math.sqrt(k*l*(g-l)/g)*(0>h-g/2?-1:1),k=Math.max(c,Math.floor(e-h*l/g+m)),h=Math.min(d,Math.floor(e+(g-h)*l/g+m)),r(b,k,h,e,f));g=b[e];h=c;l=d;u(b,c,e);for(0<f(b[d],g)&&u(b,c,d);h<l;){u(b,h,l);h++;for(l--;0>f(b[h],g);)h++;for(;0<f(b[l],g);)l--}0===f(b[c],g)?u(b,c,l):(l++,u(b,l,d));l<=e&&(c=l+1);e<=l&&(d=l-1)}}function u(b,c,d){var e=b[c];b[c]=b[d];b[d]=e}c.prototype={all:function(){return this.ac(this.data,[])},search:function(b){var c=this.data,d=[],e=this.da;if(!n(b,c.bbox))return d;
for(var f=[],g,h,k,l;c;){g=0;for(h=c.children.length;g<h;g++)k=c.children[g],l=c.Z?e(k):k.bbox,n(b,l)&&(c.Z?d.push(k):m(b,l)?this.ac(k,d):f.push(k));c=f.pop()}return d},load:function(b){if(!b||!b.length)return this;if(b.length<this.ec){for(var c=0,d=b.length;c<d;c++)this.Ca(b[c]);return this}b=this.cc(b.slice(),0,b.length-1,0);this.data.children.length?this.data.height===b.height?this.fc(this.data,b):(this.data.height<b.height&&(c=this.data,this.data=b,b=c),this.dc(b,this.data.height-b.height-1,!0)):
this.data=b;return this},Ca:function(b){b&&this.dc(b,this.data.height-1);return this},clear:function(){this.data={children:[],height:1,bbox:[Infinity,Infinity,-Infinity,-Infinity],Z:!0};return this},remove:function(b){if(!b)return this;for(var c=this.data,d=this.da(b),e=[],f=[],g,h,k,l;c||e.length;){c||(c=e.pop(),h=e[e.length-1],g=f.pop(),l=!0);if(c.Z&&(k=c.children.indexOf(b),-1!==k)){c.children.splice(k,1);e.push(c);this.dd(e);break}l||c.Z||!m(c.bbox,d)?h?(g++,c=h.children[g],l=!1):c=null:(e.push(c),
f.push(g),g=0,h=c,c=c.children[0])}return this},da:function(b){return b},Gb:function(b,c){return b[0]-c[0]},Hb:function(b,c){return b[1]-c[1]},toJSON:function(){return this.data},ac:function(b,c){for(var d=[];b;)b.Z?c.push.apply(c,b.children):d.push.apply(d,b.children),b=d.pop();return c},cc:function(b,c,e,f){var g=e-c+1,h=this.Ab,k;if(g<=h)return k={children:b.slice(c,e+1),height:1,bbox:null,Z:!0},d(k,this.da),k;f||(f=Math.ceil(Math.log(g)/Math.log(h)),h=Math.ceil(g/Math.pow(h,f-1)));k={children:[],
height:f,bbox:null,Z:!1};var g=Math.ceil(g/h),h=g*Math.ceil(Math.sqrt(h)),l,m,n;for(q(b,c,e,h,this.Gb);c<=e;c+=h)for(m=Math.min(c+h-1,e),q(b,c,m,g,this.Hb),l=c;l<=m;l+=g)n=Math.min(l+g-1,m),k.children.push(this.cc(b,l,n,f-1));d(k,this.da);return k},cd:function(b,c,d,e){for(var f,g,h,l,m,n,q,r;;){e.push(c);if(c.Z||e.length-1===d)break;q=r=Infinity;f=0;for(g=c.children.length;f<g;f++)h=c.children[f],m=k(h.bbox),n=h.bbox,n=(Math.max(n[2],b[2])-Math.min(n[0],b[0]))*(Math.max(n[3],b[3])-Math.min(n[1],
b[1]))-m,n<r?(r=n,q=m<q?m:q,l=h):n===r&&m<q&&(q=m,l=h);c=l}return c},dc:function(b,c,d){var e=this.da;d=d?b.bbox:e(b);var e=[],g=this.cd(d,this.data,c,e);g.children.push(b);for(f(g.bbox,d);0<=c;)if(e[c].children.length>this.Ab)this.fd(e,c),c--;else break;this.$c(d,e,c)},fd:function(b,c){var e=b[c],f=e.children.length,g=this.ec;this.ad(e,g,f);f=this.bd(e,g,f);f={children:e.children.splice(f,e.children.length-f),height:e.height,bbox:null,Z:!1};e.Z&&(f.Z=!0);d(e,this.da);d(f,this.da);c?b[c-1].children.push(f):
this.fc(e,f)},fc:function(b,c){this.data={children:[b,c],height:b.height+1,bbox:null,Z:!1};d(this.data,this.da)},bd:function(b,c,d){var f,g,h,l,m,n,q;m=n=Infinity;for(f=c;f<=d-c;f++)g=e(b,0,f,this.da),h=e(b,f,d,this.da),l=Math.max(0,Math.min(g[2],h[2])-Math.max(g[0],h[0]))*Math.max(0,Math.min(g[3],h[3])-Math.max(g[1],h[1])),g=k(g)+k(h),l<m?(m=l,q=f,n=g<n?g:n):l===m&&g<n&&(n=g,q=f);return q},ad:function(b,c,d){var e=b.Z?this.Gb:g,f=b.Z?this.Hb:h,k=this.bc(b,c,d,e);c=this.bc(b,c,d,f);k<c&&b.children.sort(e)},
bc:function(b,c,d,g){b.children.sort(g);g=this.da;var h=e(b,0,c,g),k=e(b,d-c,d,g),m=l(h)+l(k),n,q;for(n=c;n<d-c;n++)q=b.children[n],f(h,b.Z?g(q):q.bbox),m+=l(h);for(n=d-c-1;n>=c;n--)q=b.children[n],f(k,b.Z?g(q):q.bbox),m+=l(k);return m},$c:function(b,c,d){for(;0<=d;d--)f(c[d].bbox,b)},dd:function(b){for(var c=b.length-1,e;0<=c;c--)0===b[c].children.length?0<c?(e=b[c-1].children,e.splice(e.indexOf(b[c]),1)):this.clear():d(b[c],this.da)},ed:function(b){var c=["return a"," - b",";"];this.Gb=new Function("a",
"b",c.join(b[0]));this.Hb=new Function("a","b",c.join(b[1]));this.da=new Function("a","return [a"+b.join(", a")+"];")}};"undefined"!==typeof b?b.uc=c:"undefined"!==typeof self?self.a=c:window.a=c})();Fj=b.uc})();function Gj(b){this.a=Fj(b);this.b={}}p=Gj.prototype;p.Ca=function(b,c){var d=[b[0],b[1],b[2],b[3],c];this.a.Ca(d);this.b[I(c)]=d};p.load=function(b,c){for(var d=Array(c.length),e=0,f=c.length;e<f;e++){var g=b[e],h=c[e],g=[g[0],g[1],g[2],g[3],h];d[e]=g;this.b[I(h)]=g}this.a.load(d)};p.remove=function(b){b=I(b);var c=this.b[b];delete this.b[b];return null!==this.a.remove(c)};function Hj(b){return b.a.all().map(function(b){return b[4]})}
function Ij(b,c){return b.a.search(c).map(function(b){return b[4]})}function Jj(b,c,d,e){return Kj(Ij(b,c),d,e)}function Kj(b,c,d){for(var e,f=0,g=b.length;f<g&&!(e=c.call(d,b[f]));f++);return e}p.clear=function(){this.a.clear();this.b={}};p.C=function(){return this.a.data.bbox};function Lj(b){b=b||{};Ce.call(this,{attributions:b.attributions,logo:b.logo,projection:void 0,state:"ready",wrapX:void 0!==b.wrapX?b.wrapX:!0});this.o=pa;this.D=b.format;this.u=b.url;void 0!==b.loader?this.o=b.loader:void 0!==this.u&&(this.o=Dj(this.u,this.D));this.G=void 0!==b.strategy?b.strategy:Ej;var c=void 0!==b.useSpatialIndex?b.useSpatialIndex:!0;this.R=c?new Gj:null;this.s=new Gj;this.ca={};this.b={};this.g={};this.h={};this.a=null;var d,e;b.features instanceof ld?(d=b.features,e=d.a):Array.isArray(b.features)&&
(e=b.features);c||void 0!==d||(d=new ld(e));void 0!==e&&Mj(this,e);void 0!==d&&Nj(this,d)}M(Lj,Ce);p=Lj.prototype;p.Bb=function(b){var c=I(b).toString();if(Oj(this,c,b)){Pj(this,c,b);var d=b.M();d?(c=d.C(),this.R&&this.R.Ca(c,b)):this.ca[c]=b;S(this,new Qj("addfeature",b))}this.v()};function Pj(b,c,d){b.h[c]=[Q(d,"change",b.xc,b),Q(d,"propertychange",b.xc,b)]}function Oj(b,c,d){var e=!0,f=d.La();void 0!==f?f.toString()in b.b?e=!1:b.b[f.toString()]=d:b.g[c]=d;return e}p.Cb=function(b){Mj(this,b);this.v()};
function Mj(b,c){var d,e,f,g,h=[],k=[],l=[];e=0;for(f=c.length;e<f;e++)g=c[e],d=I(g).toString(),Oj(b,d,g)&&k.push(g);e=0;for(f=k.length;e<f;e++){g=k[e];d=I(g).toString();Pj(b,d,g);var m=g.M();m?(d=m.C(),h.push(d),l.push(g)):b.ca[d]=g}b.R&&b.R.load(h,l);e=0;for(f=k.length;e<f;e++)S(b,new Qj("addfeature",k[e]))}
function Nj(b,c){var d=!1;Q(b,"addfeature",function(b){d||(d=!0,c.push(b.feature),d=!1)});Q(b,"removefeature",function(b){d||(d=!0,c.remove(b.feature),d=!1)});Q(c,"add",function(b){d||(b=b.element,d=!0,this.Bb(b),d=!1)},b);Q(c,"remove",function(b){if(!d){b=b.element;d=!0;var c=I(b).toString();c in this.ca?delete this.ca[c]:this.R&&this.R.remove(b);this.Xb(b);this.v();d=!1}},b);b.a=c}
p.clear=function(b){if(b){for(var c in this.h)this.h[c].forEach(N);this.a||(this.h={},this.b={},this.g={})}else if(this.R){b=this.Xb;Kj(Hj(this.R),b,this);for(var d in this.ca)this.Xb(this.ca[d])}this.a&&this.a.clear();this.R&&this.R.clear();this.s.clear();this.ca={};S(this,new Qj("clear"));this.v()};p.nd=function(b,c){if(this.R)return Kj(Hj(this.R),b,c);if(this.a)return nd(this.a,b,c)};function Rj(b,c,d,e){b.R?Jj(b.R,c,d,e):b.a&&nd(b.a,d,e)}
p.oe=function(){var b;this.a?b=this.a.a:this.R&&(b=Hj(this.R),$a(this.ca)||Ka(b,Za(this.ca)));return b};p.C=function(){return this.R.C()};
p.xc=function(b){b=b.target;var c=I(b).toString(),d=b.M();if(d)if(d=d.C(),c in this.ca)delete this.ca[c],this.R&&this.R.Ca(d,b);else{if(this.R){var e=this.R,f=I(b);Rb(e.b[f].slice(0,4),d)||(e.remove(b),e.Ca(d,b))}}else c in this.ca||(this.R&&this.R.remove(b),this.ca[c]=b);d=b.La();void 0!==d?(d=d.toString(),c in this.g?(delete this.g[c],this.b[d]=b):this.b[d]!==b&&(Sj(this,b),this.b[d]=b)):c in this.g||(Sj(this,b),this.g[c]=b);this.v();S(this,new Qj("changefeature",b))};
function Tj(b,c,d,e){var f=b.s;c=b.G(c,d);var g,h;g=0;for(h=c.length;g<h;++g){var k=c[g];Jj(f,k,function(b){return Nb(b.extent,k)})||(b.o.call(b,k,d,e),f.Ca(k,{extent:k.slice()}))}}p.Xb=function(b){var c=I(b).toString();this.h[c].forEach(N);delete this.h[c];var d=b.La();void 0!==d?delete this.b[d.toString()]:delete this.g[c];S(this,new Qj("removefeature",b))};function Sj(b,c){for(var d in b.b)if(b.b[d]===c){delete b.b[d];break}}function Qj(b,c){R.call(this,b);this.feature=c}M(Qj,R);function Uj(b){Ri.call(this,b);this.c=lf();this.b=null;this.j=Jb();this.h=zb()}M(Uj,Ri);
Uj.prototype.g=function(b,c,d){var e=b.pixelRatio,f=b.viewState,g=f.center,h=f.projection,k=f.rotation,l=b.size,m=Math.round(e*l[0]/2),n=Math.round(e*l[1]/2),q=e/f.resolution,r=this.a,u=r.V(),w=u.kb(h),f=Ti(this,b,0);Si(this,"precompose",d,b,f);var l=d,r=nb(r,"render"),y,z,D,t;if(k||r){l=this.c;y=l.canvas;D=u.mb(e)/e;var v=d.canvas.width*D;z=d.canvas.height*D;t=Math.round(Math.sqrt(v*v+z*z));y.width!=t?y.width=y.height=t:l.clearRect(0,0,t,t);y=(t-v)/2/D;z=(t-z)/2/D;q*=D;m=Math.round(D*(m+y));n=Math.round(D*
(n+z))}v=l.globalAlpha;l.globalAlpha=c.opacity;var B=u.la(h),E=this.b,C;c=u.Lb(h)&&1==c.opacity;c||(E.reverse(),C=[]);for(var G=0,J=E.length;G<J;++G){var A=E[G],H=A.L,O=Ie(B,H,this.j),P=H[0],L=Xb(Ie(B,Qe(B,g,P))),H=Math.round(Vb(O)*q),K=Math.round(Wb(O)*q),fa=Math.round((O[0]-L[0])*q/H)*H+m+Math.round((L[0]-g[0])*q),O=Math.round((L[1]-O[3])*q/K)*K+n+Math.round((g[1]-L[1])*q);if(!c){L=[fa,O,fa+H,O+K];l.save();for(var qa=0,Ql=C.length;qa<Ql;++qa){var Xa=C[qa];ac(L,Xa)&&(l.beginPath(),l.moveTo(L[0],
L[1]),l.lineTo(L[0],L[3]),l.lineTo(L[2],L[3]),l.lineTo(L[2],L[1]),l.moveTo(Xa[0],Xa[1]),l.lineTo(Xa[2],Xa[1]),l.lineTo(Xa[2],Xa[3]),l.lineTo(Xa[0],Xa[3]),l.closePath(),l.clip())}C.push(L)}P=We(u,P,e,h);l.drawImage(A.T(),w,w,P[0],P[1],fa,O,H,K);c||l.restore()}r&&(e=y-m/D+m,h=z-n/D+n,g=Cg(this.h,t/2-e,t/2-h,q,-q,-k,-g[0]+e/q,-g[1]-h/q),Si(this,"render",l,b,g));(k||r)&&d.drawImage(l.canvas,-Math.round(y),-Math.round(z),t/D,t/D);l.globalAlpha=v;Si(this,"postcompose",d,b,f)};
Uj.prototype.i=function(b,c){function d(b){b=b.N();return 2==b||4==b||3==b&&!u}var e=b.pixelRatio,f=b.viewState,g=f.projection,h=this.a,k=h.V(),l=k.la(g),m=Pe(l,f.resolution),n=l.I(m),q=f.center;n==f.resolution?(q=Lg(q,n,b.size),f=Zb(q,n,f.rotation,b.size)):f=b.extent;void 0!==c.extent&&(f=$b(f,c.extent));if(f[2]<f[0]||f[3]<f[1])return!1;n=Le(l,f,n);q={};q[m]={};var r=this.l(k,g,q),u=ni(h),w=Jb(),y=new fd(0,0,0,0),z,D,t,v;for(t=n.a;t<=n.f;++t)for(v=n.b;v<=n.c;++v)z=Ng(k,m,t,v,e,g),!d(z)&&z.a&&(z=
z.a),d(z)?q[m][z.L.toString()]=z:(D=He(l,z.L,r,y,w),D||(z=Ke(l,z.L,y,w))&&r(m+1,z));r=Object.keys(q).map(Number);r.sort(Ha);var w=[],B,y=0;for(t=r.length;y<t;++y)for(B in z=r[y],v=q[z],v)z=v[B],2==z.N()&&w.push(z);this.b=w;Kg(b.usedTiles,k,m,n);Mg(b,k,l,e,g,f,m,h.get("preload"));Hg(b,k);Jg(b,k);return!0};function Vj(b){Ri.call(this,b);this.b=!1;this.w=-1;this.u=NaN;this.j=Jb();this.c=this.o=null;this.h=lf()}M(Vj,Ri);
Vj.prototype.g=function(b,c,d){var e=b.extent,f=b.pixelRatio,g=c.eb?b.skippedFeatureUids:{},h=b.viewState,k=h.projection,h=h.rotation,l=k.C(),m=this.a.V(),n=Ti(this,b,0);Si(this,"precompose",d,b,n);var q=this.c;if(q&&!q.c()){var r;nb(this.a,"render")?(this.h.canvas.width=d.canvas.width,this.h.canvas.height=d.canvas.height,r=this.h):r=d;var u=r.globalAlpha;r.globalAlpha=c.opacity;c=b.size[0]*f;var w=b.size[1]*f;ri(r,-h,c/2,w/2);q.f(r,f,n,h,g);if(m.j&&k.a&&!Nb(l,e)){for(var k=e[0],m=Vb(l),y=0;k<l[0];)--y,
n=m*y,n=Ti(this,b,n),q.f(r,f,n,h,g),k+=m;y=0;for(k=e[2];k>l[2];)++y,n=m*y,n=Ti(this,b,n),q.f(r,f,n,h,g),k-=m;n=Ti(this,b,0)}ri(r,h,c/2,w/2);r!=d&&(Si(this,"render",r,b,n),d.drawImage(r.canvas,0,0));r.globalAlpha=u}Si(this,"postcompose",d,b,n)};Vj.prototype.fb=function(b,c,d,e){if(this.c){var f=this.a,g={};return this.c.g(b,c.viewState.resolution,c.viewState.rotation,{},function(b){var c=I(b).toString();if(!(c in g))return g[c]=!0,d.call(e,b,f)})}};Vj.prototype.B=function(){Gg(this)};
Vj.prototype.i=function(b){function c(b){var c,e=b.c;e?c=e.call(b,m):(e=d.g)&&(c=e(b,m));if(c){if(c){e=!1;if(Array.isArray(c))for(var f=0,g=c.length;f<g;++f)e=pj(r,b,c[f],oj(m,n),this.B,this)||e;else e=pj(r,b,c,oj(m,n),this.B,this)||e;b=e}else b=!1;this.b=this.b||b}}var d=this.a,e=d.V();Ig(b.attributions,e.i);Jg(b,e);var f=b.viewHints[0],g=b.viewHints[1],h=d.i,k=d.j;if(!this.b&&!h&&f||!k&&g)return!0;var l=b.extent,k=b.viewState,f=k.projection,m=k.resolution,n=b.pixelRatio,g=d.f,q=d.a,h=d.get("renderOrder");
void 0===h&&(h=nj);l=Lb(l,q*m);q=k.projection.C();e.j&&k.projection.a&&!Nb(q,b.extent)&&(b=Math.max(Vb(l)/2,Vb(q)),l[0]=q[0]-b,l[2]=q[2]+b);if(!this.b&&this.u==m&&this.w==g&&this.o==h&&Nb(this.j,l))return!0;this.c=null;this.b=!1;var r=new jj(.5*m/n,l,m,d.a);Tj(e,l,m,f);if(h){var u=[];Rj(e,l,function(b){u.push(b)},this);u.sort(h);u.forEach(c,this)}else Rj(e,l,c,this);kj(r);this.u=m;this.w=g;this.o=h;this.j=l;this.c=r;return!0};function Wj(b,c){var d=/\{z\}/g,e=/\{x\}/g,f=/\{y\}/g,g=/\{-y\}/g;return function(h){if(h)return b.replace(d,h[0].toString()).replace(e,h[1].toString()).replace(f,function(){return(-h[2]-1).toString()}).replace(g,function(){var b=c.a?c.a[h[0]]:null;return(b.c-b.b+1+h[2]).toString()})}}function Xj(b,c){for(var d=b.length,e=Array(d),f=0;f<d;++f)e[f]=Wj(b[f],c);return Yj(e)}function Yj(b){return 1===b.length?b[0]:function(c,d,e){if(c)return b[Ea((c[1]<<c[0])+c[2],b.length)](c,d,e)}}function Zj(){};function ak(b){Ue.call(this,{attributions:b.attributions,cacheSize:b.cacheSize,extent:b.extent,logo:b.logo,opaque:b.opaque,projection:b.projection,state:b.state,tileGrid:b.tileGrid,tilePixelRatio:b.tilePixelRatio,wrapX:b.wrapX});this.tileLoadFunction=b.tileLoadFunction;this.tileUrlFunction=this.g?this.g.bind(this):Zj;this.urls=null;if(b.urls){var c=b.urls;this.urls=c;bk(this,this.g?this.g.bind(this):Xj(c,this.tileGrid))}else b.url&&this.s(b.url);b.tileUrlFunction&&bk(this,b.tileUrlFunction)}
M(ak,Ue);ak.prototype.D=function(b){b=b.target;switch(b.N()){case 1:S(this,new Ye("tileloadstart",b));break;case 2:S(this,new Ye("tileloadend",b));break;case 3:S(this,new Ye("tileloaderror",b))}};function bk(b,c){b.a.clear();b.tileUrlFunction=c;b.v()}
ak.prototype.s=function(b){var c=[],d=/\{(\d)-(\d)\}/.exec(b)||/\{([a-z])-([a-z])\}/.exec(b);if(d){var e=d[2].charCodeAt(0),f;for(f=d[1].charCodeAt(0);f<=e;++f)c.push(b.replace(d[0],String.fromCharCode(f)))}else c.push(b);b=this.urls=c;bk(this,this.g?this.g.bind(this):Xj(b,this.tileGrid))};ak.prototype.Yc=function(b,c,d){b=this.lb(b,c,d);ve(this.a,b)&&this.a.get(b)};function ck(b,c){Tg.call(this,0,c);this.c=lf();lf();this.a=this.c.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";fe(b,this.a,0);this.b=!0;this.g=zb()}M(ck,Tg);ck.prototype.Ib=function(b){return b instanceof X?new Uj(b):b instanceof Y?new Vj(b):null};
function dk(b,c,d){var e=b.h,f=b.c;if(nb(e,c)){var g=d.extent,h=d.pixelRatio,k=d.viewState.rotation,l=d.pixelRatio,m=d.viewState,n=m.resolution;b=Cg(b.g,b.a.width/2,b.a.height/2,l/n,-l/n,-m.rotation,-m.center[0],-m.center[1]);g=new Gi(f,h,g,b,k);S(e,new zg(c,e,g,d,f,null))}}ck.prototype.U=function(){return"canvas"};
ck.prototype.sb=function(b){if(b){var c=this.c,d=b.pixelRatio,e=Math.round(b.size[0]*d),d=Math.round(b.size[1]*d);this.a.width!=e||this.a.height!=d?(this.a.width=e,this.a.height=d):c.clearRect(0,0,e,d);var f=b.viewState.rotation;Ug(b);dk(this,"precompose",b);var g=b.layerStatesArray;Na(g);ri(c,f,e/2,d/2);var h=b.viewState.resolution,k,l,m,n;k=0;for(l=g.length;k<l;++k)n=g[k],m=n.layer,m=Wg(this,m),Bg(n,h)&&"ready"==n.Zb&&m.i(b,n)&&m.g(b,n,c);ri(c,-f,e/2,d/2);dk(this,"postcompose",b);this.b||(ne(this.a,
!0),this.b=!0);Xg(this,b);b.postRenderFunctions.push(Vg)}else this.b&&(ne(this.a,!1),this.b=!1)};function ek(b,c){Fg.call(this,b);this.target=c}M(ek,Fg);ek.prototype.Fb=pa;ek.prototype.Kc=pa;function fk(b){var c=document.createElement("DIV");c.style.position="absolute";ek.call(this,b,c);this.c=!0;this.h=1;this.g=0;this.b={}}M(fk,ek);fk.prototype.Fb=function(){ee(this.target);this.g=0};
fk.prototype.Lc=function(b,c){if(!c.visible)return this.c&&(ne(this.target,!1),this.c=!1),!0;var d=b.pixelRatio,e=b.viewState,f=e.projection,g=this.a,h=g.V(),k=h.la(f),l=h.kb(f),m=Pe(k,e.resolution),n=k.I(m),q=e.center,r;n==e.resolution?(q=Lg(q,n,b.size),r=Zb(q,n,e.rotation,b.size)):r=b.extent;void 0!==c.extent&&(r=$b(r,c.extent));var n=Le(k,r,n),u={};u[m]={};var w=this.l(h,f,u),y=ni(g),z=Jb(),D=new fd(0,0,0,0),t,v,B,E;for(B=n.a;B<=n.f;++B)for(E=n.b;E<=n.c;++E)t=Ng(h,m,B,E,d,f),v=t.N(),v=2==v||4==
v||3==v&&!y,!v&&t.a&&(t=t.a),v=t.N(),2==v?u[m][t.L.toString()]=t:4==v||3==v&&!y||(v=He(k,t.L,w,D,z),v||(t=Ke(k,t.L,D,z))&&w(m+1,t));var C;if(this.g!=h.f){for(C in this.b)y=this.b[+C],ge(y.target);this.b={};this.g=h.f}z=Object.keys(u).map(Number);z.sort(Ha);var w={},G;B=0;for(E=z.length;B<E;++B){C=z[B];C in this.b?y=this.b[C]:(y=Qe(k,q,C),y=new gk(k,y),w[C]=!0,this.b[C]=y);C=u[C];for(G in C){t=y;v=C[G];var J=l,A=v.L,H=A[0],O=A[1],P=A[2],A=A.toString();if(!(A in t.b)){var H=tb(Oe(t.g,H),t.i),L=v.T(t),
K=L.style;K.maxWidth="none";var fa=void 0,qa=void 0;0<J?(fa=document.createElement("DIV"),qa=fa.style,qa.overflow="hidden",qa.width=H[0]+"px",qa.height=H[1]+"px",K.position="absolute",K.left=-J+"px",K.top=-J+"px",K.width=H[0]+2*J+"px",K.height=H[1]+2*J+"px",fa.appendChild(L)):(K.width=H[0]+"px",K.height=H[1]+"px",fa=L,qa=K);qa.position="absolute";qa.left=(O-t.f[1])*H[0]+"px";qa.top=(t.f[2]-P)*H[1]+"px";t.a||(t.a=document.createDocumentFragment());t.a.appendChild(fa);t.b[A]=v}}y.a&&(y.target.appendChild(y.a),
y.a=null)}l=Object.keys(this.b).map(Number);l.sort(Ha);B=zb();G=0;for(z=l.length;G<z;++G)if(C=l[G],y=this.b[C],C in u)if(t=y.I(),E=y.ka(),Cg(B,b.size[0]/2,b.size[1]/2,t/e.resolution,t/e.resolution,e.rotation,(E[0]-q[0])/t,(q[1]-E[1])/t),y.setTransform(B),C in w){for(--C;0<=C;--C)if(C in this.b){E=this.b[C].target;E.parentNode&&E.parentNode.insertBefore(y.target,E.nextSibling);break}0>C&&fe(this.target,y.target,0)}else{if(!b.viewHints[0]&&!b.viewHints[1]){v=Je(y.g,r,y.f[0],D);C=[];t=E=void 0;for(t in y.b)E=
y.b[t],J=E.L,gd(v,J[1],J[2])||C.push(E);J=v=void 0;v=0;for(J=C.length;v<J;++v)E=C[v],t=E.L.toString(),ge(E.T(y)),delete y.b[t]}}else ge(y.target),delete this.b[C];c.opacity!=this.h&&(this.h=this.target.style.opacity=c.opacity);c.visible&&!this.c&&(ne(this.target,!0),this.c=!0);Kg(b.usedTiles,h,m,n);Mg(b,h,k,d,f,r,m,g.get("preload"));Hg(b,h);Jg(b,h);return!0};
function gk(b,c){this.target=document.createElement("DIV");this.target.style.position="absolute";this.target.style.width="100%";this.target.style.height="100%";this.g=b;this.f=c;this.h=bc(Ie(b,c));this.l=b.I(c[0]);this.b={};this.a=null;this.c=Bb();this.i=[0,0]}gk.prototype.ka=function(){return this.h};gk.prototype.I=function(){return this.l};gk.prototype.setTransform=function(b){Dg(b,this.c)||(pf(this.target,b),Cb(this.c,b))};function hk(b){this.g=lf();var c=this.g.canvas;c.style.maxWidth="none";c.style.position="absolute";ek.call(this,b,c);this.b=!1;this.h=-1;this.o=NaN;this.i=Jb();this.c=this.j=null;this.w=zb();this.u=zb()}M(hk,ek);p=hk.prototype;p.Fb=function(){var b=this.g.canvas;b.width=b.width;this.h=0};
p.Kc=function(b,c){var d=b.viewState,e=d.center,f=d.rotation,g=d.resolution,d=b.pixelRatio,h=b.size[0],k=b.size[1],l=h*d,m=k*d,e=Cg(this.w,d*h/2,d*k/2,d/g,-d/g,-f,-e[0],-e[1]),g=this.g;g.canvas.width=l;g.canvas.height=m;h=Cg(this.u,0,0,1/d,1/d,0,-(l-h)/2*d,-(m-k)/2*d);pf(g.canvas,h);ik(this,"precompose",b,e);(h=this.c)&&!h.c()&&(g.globalAlpha=c.opacity,h.f(g,d,e,f,c.eb?b.skippedFeatureUids:{}),ik(this,"render",b,e));ik(this,"postcompose",b,e)};
function ik(b,c,d,e){var f=b.g;b=b.a;nb(b,c)&&(e=new Gi(f,d.pixelRatio,d.extent,e,d.viewState.rotation),S(b,new zg(c,b,e,d,f,null)))}p.fb=function(b,c,d,e){if(this.c){var f=this.a,g={};return this.c.g(b,c.viewState.resolution,c.viewState.rotation,{},function(b){var c=I(b).toString();if(!(c in g))return g[c]=!0,d.call(e,b,f)})}};p.Mc=function(){Gg(this)};
p.Lc=function(b){function c(b){var c,e=b.c;e?c=e.call(b,l):(e=d.g)&&(c=e(b,l));if(c){if(c){e=!1;if(Array.isArray(c))for(var f=0,g=c.length;f<g;++f)e=pj(n,b,c[f],oj(l,m),this.Mc,this)||e;else e=pj(n,b,c,oj(l,m),this.Mc,this)||e;b=e}else b=!1;this.b=this.b||b}}var d=this.a,e=d.V();Ig(b.attributions,e.i);Jg(b,e);var f=b.viewHints[0],g=b.viewHints[1],h=d.i,k=d.j;if(!this.b&&!h&&f||!k&&g)return!0;var g=b.extent,h=b.viewState,f=h.projection,l=h.resolution,m=b.pixelRatio;b=d.f;k=d.a;h=d.get("renderOrder");
void 0===h&&(h=nj);g=Lb(g,k*l);if(!this.b&&this.o==l&&this.h==b&&this.j==h&&Nb(this.i,g))return!0;this.c=null;this.b=!1;var n=new jj(.5*l/m,g,l,d.a);Tj(e,g,l,f);if(h){var q=[];Rj(e,g,function(b){q.push(b)},this);q.sort(h);q.forEach(c,this)}else Rj(e,g,c,this);kj(n);this.o=l;this.h=b;this.j=h;this.i=g;this.c=n;return!0};function jk(b,c){Tg.call(this,0,c);this.c=lf();var d=this.c.canvas;d.style.position="absolute";d.style.width="100%";d.style.height="100%";d.className="ol-unselectable";fe(b,d,0);this.g=zb();this.a=document.createElement("DIV");this.a.className="ol-unselectable";d=this.a.style;d.position="absolute";d.width="100%";d.height="100%";Q(this.a,"touchstart",lb);fe(b,this.a,0);this.b=!0}M(jk,Tg);jk.prototype.J=function(){ge(this.a);jk.$.J.call(this)};
jk.prototype.Ib=function(b){if(b instanceof X)b=new fk(b);else if(b instanceof Y)b=new hk(b);else return null;return b};function kk(b,c,d){var e=b.h;if(nb(e,c)){var f=d.extent,g=d.pixelRatio,h=d.viewState,k=h.rotation,l=b.c,m=l.canvas;Cg(b.g,m.width/2,m.height/2,g/h.resolution,-g/h.resolution,-h.rotation,-h.center[0],-h.center[1]);b=new Gi(l,g,f,b.g,k);S(e,new zg(c,e,b,d,l,null))}}jk.prototype.U=function(){return"dom"};
jk.prototype.sb=function(b){if(b){var c=this.h;if(nb(c,"precompose")||nb(c,"postcompose")){var c=this.c.canvas,d=b.pixelRatio;c.width=b.size[0]*d;c.height=b.size[1]*d}kk(this,"precompose",b);c=b.layerStatesArray;Na(c);var d=b.viewState.resolution,e,f,g,h;e=0;for(f=c.length;e<f;++e)h=c[e],g=h.layer,g=Wg(this,g),fe(this.a,g.target,e),Bg(h,d)&&"ready"==h.Zb?g.Lc(b,h)&&g.Kc(b,h):g.Fb();var c=b.layerStates,k;for(k in this.f)k in c||(g=this.f[k],ge(g.target));this.b||(ne(this.a,!0),this.b=!0);Ug(b);Xg(this,
b);b.postRenderFunctions.push(Vg);kk(this,"postcompose",b)}else this.b&&(ne(this.a,!1),this.b=!1)};function lk(b){this.a=b}function mk(b){this.a=b}M(mk,lk);mk.prototype.U=function(){return 35632};function nk(b){this.a=b}M(nk,lk);nk.prototype.U=function(){return 35633};function ok(){this.a="precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}M(ok,mk);aa(ok);
function pk(){this.a="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"}M(pk,nk);aa(pk);
function qk(b,c){this.i=b.getUniformLocation(c,"j");this.j=b.getUniformLocation(c,"i");this.h=b.getUniformLocation(c,"k");this.l=b.getUniformLocation(c,"h");this.a=b.getAttribLocation(c,"e");this.b=b.getAttribLocation(c,"f");this.c=b.getAttribLocation(c,"c");this.f=b.getAttribLocation(c,"g");this.g=b.getAttribLocation(c,"d")};function rk(b){this.a=void 0!==b?b:[]};function sk(b,c){this.A=b;this.a=c;this.b={};this.g={};this.c={};this.i=this.j=this.h=this.l=null;(this.f=0<=oa.indexOf("OES_element_index_uint"))&&c.getExtension("OES_element_index_uint");Q(this.A,"webglcontextlost",this.o,this);Q(this.A,"webglcontextrestored",this.s,this)}M(sk,ib);
function tk(b,c,d){var e=b.a,f=d.a,g=String(I(d));if(g in b.b)e.bindBuffer(c,b.b[g].buffer);else{var h=e.createBuffer();e.bindBuffer(c,h);var k;34962==c?k=new Float32Array(f):34963==c&&(k=b.f?new Uint32Array(f):new Uint16Array(f));e.bufferData(c,k,35044);b.b[g]={We:d,buffer:h}}}function uk(b,c){var d=b.a,e=String(I(c)),f=b.b[e];d.isContextLost()||d.deleteBuffer(f.buffer);delete b.b[e]}
sk.prototype.J=function(){hb(this.A);var b=this.a;if(!b.isContextLost()){for(var c in this.b)b.deleteBuffer(this.b[c].buffer);for(c in this.c)b.deleteProgram(this.c[c]);for(c in this.g)b.deleteShader(this.g[c]);b.deleteFramebuffer(this.h);b.deleteRenderbuffer(this.i);b.deleteTexture(this.j)}};
function vk(b){if(!b.h){var c=b.a,d=c.createFramebuffer();c.bindFramebuffer(c.FRAMEBUFFER,d);var e=wk(c,1,1),f=c.createRenderbuffer();c.bindRenderbuffer(c.RENDERBUFFER,f);c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_COMPONENT16,1,1);c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,e,0);c.framebufferRenderbuffer(c.FRAMEBUFFER,c.DEPTH_ATTACHMENT,c.RENDERBUFFER,f);c.bindTexture(c.TEXTURE_2D,null);c.bindRenderbuffer(c.RENDERBUFFER,null);c.bindFramebuffer(c.FRAMEBUFFER,null);b.h=d;
b.j=e;b.i=f}return b.h}function xk(b,c){var d=String(I(c));if(d in b.g)return b.g[d];var e=b.a,f=e.createShader(c.U());e.shaderSource(f,c.a);e.compileShader(f);return b.g[d]=f}function yk(b,c,d){var e=I(c)+"/"+I(d);if(e in b.c)return b.c[e];var f=b.a,g=f.createProgram();f.attachShader(g,xk(b,c));f.attachShader(g,xk(b,d));f.linkProgram(g);return b.c[e]=g}sk.prototype.o=function(){Ya(this.b);Ya(this.g);Ya(this.c);this.i=this.j=this.h=this.l=null};sk.prototype.s=function(){};
function zk(b,c){if(c==b.l)return!1;b.a.useProgram(c);b.l=c;return!0}function Ak(b,c,d){var e=b.createTexture();b.bindTexture(b.TEXTURE_2D,e);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR);void 0!==c&&b.texParameteri(3553,10242,c);void 0!==d&&b.texParameteri(3553,10243,d);return e}function wk(b,c,d){var e=Ak(b,void 0,void 0);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,c,d,0,b.RGBA,b.UNSIGNED_BYTE,null);return e};function Bk(b,c){this.H=this.u=void 0;this.j=Yb(c);this.s=[];this.h=[];this.B=void 0;this.g=[];this.c=[];this.D=this.K=void 0;this.b=[];this.w=this.i=null;this.G=void 0;this.na=Bb();this.za=Bb();this.S=this.P=void 0;this.pa=Bb();this.ja=this.X=this.ba=void 0;this.ea=[];this.l=[];this.a=[];this.o=null;this.f=[];this.A=[];this.aa=void 0}M(Bk,yg);
function Ck(b,c){var d=b.o,e=b.i,f=b.ea,g=b.l,h=c.a;return function(){if(!h.isContextLost()){var b,l;b=0;for(l=f.length;b<l;++b)h.deleteTexture(f[b]);b=0;for(l=g.length;b<l;++b)h.deleteTexture(g[b])}uk(c,d);uk(c,e)}}
function Dk(b,c,d,e){var f=b.u,g=b.H,h=b.B,k=b.K,l=b.D,m=b.G,n=b.P,q=b.S,r=b.ba?1:0,u=b.X,w=b.ja,y=b.aa,z=Math.cos(u),u=Math.sin(u),D=b.b.length,t=b.a.length,v,B,E,C,G,J;for(v=0;v<d;v+=e)G=c[v]-b.j[0],J=c[v+1]-b.j[1],B=t/8,E=-w*f,C=-w*(h-g),b.a[t++]=G,b.a[t++]=J,b.a[t++]=E*z-C*u,b.a[t++]=E*u+C*z,b.a[t++]=n/l,b.a[t++]=(q+h)/k,b.a[t++]=m,b.a[t++]=r,E=w*(y-f),C=-w*(h-g),b.a[t++]=G,b.a[t++]=J,b.a[t++]=E*z-C*u,b.a[t++]=E*u+C*z,b.a[t++]=(n+y)/l,b.a[t++]=(q+h)/k,b.a[t++]=m,b.a[t++]=r,E=w*(y-f),C=w*g,b.a[t++]=
G,b.a[t++]=J,b.a[t++]=E*z-C*u,b.a[t++]=E*u+C*z,b.a[t++]=(n+y)/l,b.a[t++]=q/k,b.a[t++]=m,b.a[t++]=r,E=-w*f,C=w*g,b.a[t++]=G,b.a[t++]=J,b.a[t++]=E*z-C*u,b.a[t++]=E*u+C*z,b.a[t++]=n/l,b.a[t++]=q/k,b.a[t++]=m,b.a[t++]=r,b.b[D++]=B,b.b[D++]=B+1,b.b[D++]=B+2,b.b[D++]=B,b.b[D++]=B+2,b.b[D++]=B+3}Bk.prototype.Ya=function(b,c){this.f.push(this.b.length);this.A.push(c);var d=b.a;Dk(this,d,d.length,b.b)};Bk.prototype.Za=function(b,c){this.f.push(this.b.length);this.A.push(c);var d=b.a;Dk(this,d,d.length,b.b)};
function Ek(b,c){var d=c.a;b.s.push(b.b.length);b.h.push(b.b.length);b.o=new rk(b.a);tk(c,34962,b.o);b.i=new rk(b.b);tk(c,34963,b.i);var e={};Fk(b.ea,b.g,e,d);Fk(b.l,b.c,e,d);b.u=void 0;b.H=void 0;b.B=void 0;b.g=null;b.c=null;b.K=void 0;b.D=void 0;b.b=null;b.G=void 0;b.P=void 0;b.S=void 0;b.ba=void 0;b.X=void 0;b.ja=void 0;b.a=null;b.aa=void 0}
function Fk(b,c,d,e){var f,g,h,k,l=c.length;for(k=0;k<l;++k){g=c[k];h=I(g).toString();if(h in d)f=d[h];else{f=e;var m=Ak(f,33071,33071);f.texImage2D(f.TEXTURE_2D,0,f.RGBA,f.RGBA,f.UNSIGNED_BYTE,g);f=m;d[h]=f}b[k]=f}}
function Gk(b,c,d,e,f,g,h,k,l,m,n){var q=c.a;tk(c,34962,b.o);tk(c,34963,b.i);var r=ok.ua(),u=pk.ua(),u=yk(c,r,u);b.w?r=b.w:(r=new qk(q,u),b.w=r);zk(c,u);q.enableVertexAttribArray(r.c);q.vertexAttribPointer(r.c,2,5126,!1,32,0);q.enableVertexAttribArray(r.a);q.vertexAttribPointer(r.a,2,5126,!1,32,8);q.enableVertexAttribArray(r.g);q.vertexAttribPointer(r.g,2,5126,!1,32,16);q.enableVertexAttribArray(r.b);q.vertexAttribPointer(r.b,1,5126,!1,32,24);q.enableVertexAttribArray(r.f);q.vertexAttribPointer(r.f,
1,5126,!1,32,28);u=b.pa;Cg(u,0,0,2/(e*g[0]),2/(e*g[1]),-f,-(d[0]-b.j[0]),-(d[1]-b.j[1]));d=b.za;e=2/g[0];g=2/g[1];Db(d);d[0]=e;d[5]=g;d[10]=1;d[15]=1;g=b.na;Db(g);0!==f&&Hb(g,-f);q.uniformMatrix4fv(r.l,!1,u);q.uniformMatrix4fv(r.j,!1,d);q.uniformMatrix4fv(r.i,!1,g);q.uniform1f(r.h,h);var w;if(void 0===l)Hk(b,q,c,k,b.ea,b.s);else{if(m)a:{f=c.f?5125:5123;c=c.f?4:2;g=b.f.length-1;for(h=b.l.length-1;0<=h;--h)for(q.bindTexture(3553,b.l[h]),m=0<h?b.h[h-1]:0,u=b.h[h];0<=g&&b.f[g]>=m;){w=b.f[g];d=b.A[g];
e=I(d).toString();if(void 0===k[e]&&d.M()&&(void 0===n||ac(n,d.M().C()))&&(q.clear(q.COLOR_BUFFER_BIT|q.DEPTH_BUFFER_BIT),q.drawElements(4,u-w,f,w*c),u=l(d))){b=u;break a}u=w;g--}b=void 0}else q.clear(q.COLOR_BUFFER_BIT|q.DEPTH_BUFFER_BIT),Hk(b,q,c,k,b.l,b.h),b=(b=l(null))?b:void 0;w=b}q.disableVertexAttribArray(r.c);q.disableVertexAttribArray(r.a);q.disableVertexAttribArray(r.g);q.disableVertexAttribArray(r.b);q.disableVertexAttribArray(r.f);return w}
function Hk(b,c,d,e,f,g){var h=d.f?5125:5123;d=d.f?4:2;if($a(e)){var k;b=0;e=f.length;for(k=0;b<e;++b){c.bindTexture(3553,f[b]);var l=g[b];c.drawElements(4,l-k,h,k*d);k=l}}else{k=0;var m,l=0;for(m=f.length;l<m;++l){c.bindTexture(3553,f[l]);for(var n=0<l?g[l-1]:0,q=g[l],r=n;k<b.f.length&&b.f[k]<=q;){var u=I(b.A[k]).toString();void 0!==e[u]?(r!==n&&c.drawElements(4,n-r,h,r*d),n=r=k===b.f.length-1?q:b.f[k+1]):n=k===b.f.length-1?q:b.f[k+1];k++}r!==n&&c.drawElements(4,n-r,h,r*d)}}}
Bk.prototype.Ha=function(b){var c=b.jb(),d=b.T(1),e=b.wc(),f=b.Wb(1),g=b.l,h=b.ka(),k=b.i,l=b.Y(),m=b.Pa();b=b.gb;var n;0===this.g.length?this.g.push(d):(n=this.g[this.g.length-1],I(n)!=I(d)&&(this.s.push(this.b.length),this.g.push(d)));0===this.c.length?this.c.push(f):(n=this.c[this.c.length-1],I(n)!=I(f)&&(this.h.push(this.b.length),this.c.push(f)));this.u=c[0];this.H=c[1];this.B=m[1];this.K=e[1];this.D=e[0];this.G=g;this.P=h[0];this.S=h[1];this.X=l;this.ba=k;this.ja=b;this.aa=m[0]};
function Ik(b,c,d){this.l=c;this.i=b;this.h=d;this.b={}}function Jk(b,c){var d=[],e;for(e in b.b)d.push(Ck(b.b[e],c));return function(){for(var b=d.length,c,e=0;e<b;e++)c=d[e].apply(this,arguments);return c}}function Kk(b,c){for(var d in b.b)Ek(b.b[d],c)}Ik.prototype.a=function(b,c){var d=this.b[c];void 0===d&&(d=new Lk[c](this.i,this.l),this.b[c]=d);return d};Ik.prototype.c=function(){return $a(this.b)};
Ik.prototype.f=function(b,c,d,e,f,g,h,k){var l,m;g=0;for(l=Ui.length;g<l;++g)m=this.b[Ui[g]],void 0!==m&&Gk(m,b,c,d,e,f,h,k,void 0,!1)};function Mk(b,c,d,e,f,g,h,k,l,m){var n=Nk,q,r;for(q=Ui.length-1;0<=q;--q)if(r=b.b[Ui[q]],void 0!==r&&(r=Gk(r,c,d,e,f,n,g,h,k,l,m)))return r}
Ik.prototype.g=function(b,c,d,e,f,g,h,k,l,m){var n=c.a;n.bindFramebuffer(n.FRAMEBUFFER,vk(c));var q;void 0!==this.h&&(q=Lb(Qb(b),e*this.h));return Mk(this,c,b,e,f,k,l,function(b){var c=new Uint8Array(4);n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,c);if(0<c[3]&&(b=m(b)))return b},!0,q)};function Ok(b,c,d,e,f,g,h){var k=d.a;k.bindFramebuffer(k.FRAMEBUFFER,vk(d));return void 0!==Mk(b,d,c,e,f,g,h,function(){var b=new Uint8Array(4);k.readPixels(0,0,1,1,k.RGBA,k.UNSIGNED_BYTE,b);return 0<b[3]},!1)}
var Lk={Image:Bk},Nk=[1,1];function Pk(b,c,d,e,f,g){this.a=b;this.f=c;this.c=g;this.l=f;this.h=e;this.g=d;this.b=null}M(Pk,yg);Pk.prototype.Za=function(b,c){var d=this.a,e=(new Ik(1,this.c)).a(0,"Image");e.Ha(this.b);e.Za(b,c);Ek(e,d);Gk(e,this.a,this.f,this.g,this.h,this.l,1,{},void 0,!1);Ck(e,d)()};Pk.prototype.Ya=function(b,c){var d=this.a,e=(new Ik(1,this.c)).a(0,"Image");e.Ha(this.b);e.Ya(b,c);Ek(e,d);Gk(e,this.a,this.f,this.g,this.h,this.l,1,{},void 0,!1);Ck(e,d)()};Pk.prototype.Ha=function(b){this.b=b};function Qk(){this.a="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"}M(Qk,mk);aa(Qk);function Rk(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}M(Rk,nk);aa(Rk);
function Sk(b,c){this.f=b.getUniformLocation(c,"f");this.c=b.getUniformLocation(c,"e");this.h=b.getUniformLocation(c,"d");this.g=b.getUniformLocation(c,"g");this.a=b.getAttribLocation(c,"b");this.b=b.getAttribLocation(c,"c")};function Tk(b,c){Fg.call(this,c);this.c=b;this.G=new rk([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.i=this.ya=null;this.j=void 0;this.D=zb();this.P=Bb();this.o=null}M(Tk,Fg);
function Uk(b,c,d){var e=b.c.c;if(void 0===b.j||b.j!=d){c.postRenderFunctions.push(na(function(b,c,d){b.isContextLost()||(b.deleteFramebuffer(c),b.deleteTexture(d))},e,b.i,b.ya));c=wk(e,d,d);var f=e.createFramebuffer();e.bindFramebuffer(36160,f);e.framebufferTexture2D(36160,36064,3553,c,0);b.ya=c;b.i=f;b.j=d}else e.bindFramebuffer(36160,b.i)}
Tk.prototype.Nc=function(b,c,d){Vk(this,"precompose",d,b);tk(d,34962,this.G);var e=d.a,f=Qk.ua(),g=Rk.ua(),f=yk(d,f,g);this.o?g=this.o:this.o=g=new Sk(e,f);zk(d,f)&&(e.enableVertexAttribArray(g.a),e.vertexAttribPointer(g.a,2,5126,!1,16,0),e.enableVertexAttribArray(g.b),e.vertexAttribPointer(g.b,2,5126,!1,16,8),e.uniform1i(g.g,0));e.uniformMatrix4fv(g.h,!1,this.D);e.uniformMatrix4fv(g.c,!1,this.P);e.uniform1f(g.f,c.opacity);e.bindTexture(3553,this.ya);e.drawArrays(5,0,4);Vk(this,"postcompose",d,b)};
function Vk(b,c,d,e){b=b.a;if(nb(b,c)){var f=e.viewState;S(b,new zg(c,b,new Pk(d,f.center,f.resolution,f.rotation,e.size,e.extent),e,null,d))}}Tk.prototype.s=function(){this.i=this.ya=null;this.j=void 0};function Wk(){this.a="precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"}M(Wk,mk);aa(Wk);function Xk(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"}M(Xk,nk);aa(Xk);function Yk(b,c){this.f=b.getUniformLocation(c,"e");this.c=b.getUniformLocation(c,"d");this.a=b.getAttribLocation(c,"b");this.b=b.getAttribLocation(c,"c")};function Zk(b,c){Tk.call(this,b,c);this.B=Wk.ua();this.S=Xk.ua();this.b=null;this.w=new rk([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.u=this.g=null;this.h=-1;this.K=[0,0]}M(Zk,Tk);Zk.prototype.J=function(){uk(this.c.g,this.w);Zk.$.J.call(this)};Zk.prototype.l=function(b,c,d){var e=this.c;return function(f,g){return Ve(b,c,f,g,function(b){var c=ve(e.b,b.getKey());c&&(d[f]||(d[f]={}),d[f][b.L.toString()]=b);return c})}};Zk.prototype.s=function(){Zk.$.s.call(this);this.b=null};
Zk.prototype.Oc=function(b,c,d){var e=this.c,f=d.a,g=b.viewState,h=g.projection,k=this.a,l=k.V(),m=l.la(h),n=Pe(m,g.resolution),q=m.I(n),r=We(l,n,b.pixelRatio,h),u=r[0]/tb(Oe(m,n),this.K)[0],w=q/u,y=l.kb(h),z=g.center,D;q==g.resolution?(z=Lg(z,q,b.size),D=Zb(z,q,g.rotation,b.size)):D=b.extent;q=Le(m,D,q);if(this.g&&hd(this.g,q)&&this.h==l.f)w=this.u;else{var t=[q.ha(),q.c-q.b+1],v=Math.pow(2,Math.ceil(Math.log(Math.max(t[0]*r[0],t[1]*r[1]))/Math.LN2)),t=w*v,B=m.ka(n),E=B[0]+q.a*r[0]*w,w=B[1]+q.b*
r[1]*w,w=[E,w,E+t,w+t];Uk(this,b,v);f.viewport(0,0,v,v);f.clearColor(0,0,0,0);f.clear(16384);f.disable(3042);v=yk(d,this.B,this.S);zk(d,v);this.b||(this.b=new Yk(f,v));tk(d,34962,this.w);f.enableVertexAttribArray(this.b.a);f.vertexAttribPointer(this.b.a,2,5126,!1,16,0);f.enableVertexAttribArray(this.b.b);f.vertexAttribPointer(this.b.b,2,5126,!1,16,8);f.uniform1i(this.b.f,0);d={};d[n]={};var C=this.l(l,h,d),G=ni(k),v=!0,E=Jb(),J=new fd(0,0,0,0),A,H,O;for(H=q.a;H<=q.f;++H)for(O=q.b;O<=q.c;++O){B=Ng(l,
n,H,O,u,h);if(void 0!==c.extent&&(A=Ie(m,B.L,E),!ac(A,c.extent)))continue;A=B.N();A=2==A||4==A||3==A&&!G;!A&&B.a&&(B=B.a);A=B.N();if(2==A){if(ve(e.b,B.getKey())){d[n][B.L.toString()]=B;continue}}else if(4==A||3==A&&!G)continue;v=!1;A=He(m,B.L,C,J,E);A||(B=Ke(m,B.L,J,E))&&C(n+1,B)}c=Object.keys(d).map(Number);c.sort(Ha);for(var C=new Float32Array(4),P,L,K,G=0,J=c.length;G<J;++G)for(P in L=d[c[G]],L)B=L[P],A=Ie(m,B.L,E),H=2*(A[2]-A[0])/t,O=2*(A[3]-A[1])/t,K=2*(A[0]-w[0])/t-1,A=2*(A[1]-w[1])/t-1,yb(C,
H,O,K,A),f.uniform4fv(this.b.c,C),$k(e,B,r,y*u),f.drawArrays(5,0,4);v?(this.g=q,this.u=w,this.h=l.f):(this.u=this.g=null,this.h=-1,b.animate=!0)}Kg(b.usedTiles,l,n,q);var fa=e.i;Mg(b,l,m,u,h,D,n,k.get("preload"),function(b){var c;(c=2!=b.N()||ve(e.b,b.getKey()))||(c=b.getKey()in fa.f);c||fa.c([b,Ne(m,b.L),m.I(b.L[0]),r,y*u])},this);Hg(b,l);Jg(b,l);f=this.D;Db(f);Fb(f,(z[0]-w[0])/(w[2]-w[0]),(z[1]-w[1])/(w[3]-w[1]));0!==g.rotation&&Hb(f,g.rotation);Gb(f,b.size[0]*g.resolution/(w[2]-w[0]),b.size[1]*
g.resolution/(w[3]-w[1]));Fb(f,-.5,-.5);return!0};function al(b,c){Tk.call(this,b,c);this.h=!1;this.K=-1;this.B=NaN;this.u=Jb();this.g=this.b=this.w=null}M(al,Tk);p=al.prototype;p.Nc=function(b,c,d){this.g=c;var e=b.viewState,f=this.b;f&&!f.c()&&f.f(d,e.center,e.resolution,e.rotation,b.size,b.pixelRatio,c.opacity,c.eb?b.skippedFeatureUids:{})};p.J=function(){var b=this.b;b&&(Jk(b,this.c.g)(),this.b=null);al.$.J.call(this)};
p.fb=function(b,c,d,e){if(this.b&&this.g){var f=c.viewState,g=this.a,h={};return this.b.g(b,this.c.g,f.center,f.resolution,f.rotation,c.size,c.pixelRatio,this.g.opacity,{},function(b){var c=I(b).toString();if(!(c in h))return h[c]=!0,d.call(e,b,g)})}};p.Ic=function(b,c){if(this.b&&this.g){var d=c.viewState;return Ok(this.b,b,this.c.g,d.resolution,d.rotation,this.g.opacity,c.skippedFeatureUids)}return!1};p.Pc=function(){Gg(this)};
p.Oc=function(b,c,d){function e(b){var c,d=b.c;d?c=d.call(b,m):(d=f.g)&&(c=d(b,m));if(c){if(c){d=!1;if(Array.isArray(c))for(var e=0,g=c.length;e<g;++e)d=pj(r,b,c[e],oj(m,n),this.Pc,this)||d;else d=pj(r,b,c,oj(m,n),this.Pc,this)||d;b=d}else b=!1;this.h=this.h||b}}var f=this.a;c=f.V();Ig(b.attributions,c.i);Jg(b,c);var g=b.viewHints[0],h=b.viewHints[1],k=f.i,l=f.j;if(!this.h&&!k&&g||!l&&h)return!0;var h=b.extent,k=b.viewState,g=k.projection,m=k.resolution,n=b.pixelRatio,k=f.f,q=f.a,l=f.get("renderOrder");
void 0===l&&(l=nj);h=Lb(h,q*m);if(!this.h&&this.B==m&&this.K==k&&this.w==l&&Nb(this.u,h))return!0;this.b&&b.postRenderFunctions.push(Jk(this.b,d));this.h=!1;var r=new Ik(.5*m/n,h,f.a);Tj(c,h,m,g);if(l){var u=[];Rj(c,h,function(b){u.push(b)},this);u.sort(l);u.forEach(e,this)}else Rj(c,h,e,this);Kk(r,d);this.B=m;this.K=k;this.w=l;this.u=h;this.b=r;return!0};function bl(b,c){Tg.call(this,0,c);this.a=document.createElement("CANVAS");this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";fe(b,this.a,0);this.s=this.u=0;this.H=lf();this.j=!0;this.c=rf(this.a,{antialias:!0,depth:!1,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!0});this.g=new sk(this.a,this.c);Q(this.a,"webglcontextlost",this.me,this);Q(this.a,"webglcontextrestored",this.ne,this);this.b=new ue;this.o=null;this.i=new Yg(function(b){var c=
b[1];b=b[2];var f=c[0]-this.o[0],c=c[1]-this.o[1];return 65536*Math.log(b)+Math.sqrt(f*f+c*c)/b}.bind(this),function(b){return b[0].getKey()});this.w=function(){if(0!==this.i.a.length){bh(this.i);var b=Zg(this.i);$k(this,b[0],b[3],b[4])}return!1}.bind(this);this.l=0;cl(this)}M(bl,Tg);
function $k(b,c,d,e){var f=b.c,g=c.getKey();if(ve(b.b,g))b=b.b.get(g),f.bindTexture(3553,b.ya),9729!=b.Cc&&(f.texParameteri(3553,10240,9729),b.Cc=9729),9729!=b.Dc&&(f.texParameteri(3553,10240,9729),b.Dc=9729);else{var h=f.createTexture();f.bindTexture(3553,h);if(0<e){var k=b.H.canvas,l=b.H;b.u!==d[0]||b.s!==d[1]?(k.width=d[0],k.height=d[1],b.u=d[0],b.s=d[1]):l.clearRect(0,0,d[0],d[1]);l.drawImage(c.T(),e,e,d[0],d[1],0,0,d[0],d[1]);f.texImage2D(3553,0,6408,6408,5121,k)}else f.texImage2D(3553,0,6408,
6408,5121,c.T());f.texParameteri(3553,10240,9729);f.texParameteri(3553,10241,9729);f.texParameteri(3553,10242,33071);f.texParameteri(3553,10243,33071);b.b.set(g,{ya:h,Cc:9729,Dc:9729})}}p=bl.prototype;p.Ib=function(b){return b instanceof X?new Zk(this,b):b instanceof Y?new al(this,b):null};function dl(b,c,d){var e=b.h;if(nb(e,c)){b=b.g;var f=d.viewState;S(e,new zg(c,e,new Pk(b,f.center,f.resolution,f.rotation,d.size,d.extent),d,null,b))}}
p.J=function(){var b=this.c;b.isContextLost()||we(this.b,function(c){c&&b.deleteTexture(c.ya)});jb(this.g);bl.$.J.call(this)};p.ld=function(b,c){for(var d=this.c,e;1024<this.b.f-this.l;){if(e=this.b.a.Ia)d.deleteTexture(e.ya);else if(+this.b.a.Qb==c.index)break;else--this.l;this.b.pop()}};p.U=function(){return"webgl"};p.me=function(b){b.preventDefault();this.b.clear();this.l=0;b=this.f;for(var c in b)b[c].s()};p.ne=function(){cl(this);this.h.render()};
function cl(b){b=b.c;b.activeTexture(33984);b.blendFuncSeparate(770,771,1,771);b.disable(2884);b.disable(2929);b.disable(3089);b.disable(2960)}
p.sb=function(b){var c=this.g,d=this.c;if(d.isContextLost())return!1;if(!b)return this.j&&(ne(this.a,!1),this.j=!1),!1;this.o=b.focus;this.b.set((-b.index).toString(),null);++this.l;dl(this,"precompose",b);var e=[],f=b.layerStatesArray;Na(f);var g=b.viewState.resolution,h,k,l,m;h=0;for(k=f.length;h<k;++h)m=f[h],Bg(m,g)&&"ready"==m.Zb&&(l=Wg(this,m.layer),l.Oc(b,m,c)&&e.push(m));f=b.size[0]*b.pixelRatio;g=b.size[1]*b.pixelRatio;if(this.a.width!=f||this.a.height!=g)this.a.width=f,this.a.height=g;d.bindFramebuffer(36160,
null);d.clearColor(0,0,0,0);d.clear(16384);d.enable(3042);d.viewport(0,0,this.a.width,this.a.height);h=0;for(k=e.length;h<k;++h)m=e[h],l=Wg(this,m.layer),l.Nc(b,m,c);this.j||(ne(this.a,!0),this.j=!0);Ug(b);1024<this.b.f-this.l&&b.postRenderFunctions.push(this.ld.bind(this));0!==this.i.a.length&&(b.postRenderFunctions.push(this.w),b.animate=!0);dl(this,"postcompose",b);Xg(this,b);b.postRenderFunctions.push(Vg)};
p.Vb=function(b,c,d,e,f,g){var h;if(this.c.isContextLost())return!1;var k=c.viewState,l=c.layerStatesArray,m;for(m=l.length-1;0<=m;--m){h=l[m];var n=h.layer;if(Bg(h,k.resolution)&&f.call(g,n)&&(h=Wg(this,n).fb(b,c,d,e)))return h}};p.Jc=function(b,c,d,e){var f=!1;if(this.c.isContextLost())return!1;var g=c.viewState,h=c.layerStatesArray,k;for(k=h.length-1;0<=k;--k){var l=h[k],m=l.layer;if(Bg(l,g.resolution)&&d.call(e,m)&&(f=Wg(this,m).Ic(b,c)))return!0}return f};var el=["canvas","webgl","dom"];
function Z(b){T.call(this);var c=fl(b);this.Ja=void 0!==b.loadTilesWhileAnimating?b.loadTilesWhileAnimating:!1;this.vb=void 0!==b.loadTilesWhileInteracting?b.loadTilesWhileInteracting:!1;this.xb=void 0!==b.pixelRatio?b.pixelRatio:xf;this.wb=c.logos;this.pa=function(){this.h=void 0;this.Be.call(this,Date.now())}.bind(this);this.Aa=zb();this.yb=zb();this.Ba=0;this.b=null;this.ea=Jb();this.s=this.D=null;this.a=document.createElement("DIV");this.a.className="ol-viewport"+(Af?" ol-touch":"");this.a.style.position=
"relative";this.a.style.overflow="hidden";this.a.style.width="100%";this.a.style.height="100%";this.a.style.msTouchAction="none";this.a.style.touchAction="none";this.o=document.createElement("DIV");this.o.className="ol-overlaycontainer";this.a.appendChild(this.o);this.j=document.createElement("DIV");this.j.className="ol-overlaycontainer-stopevent";b=["click","dblclick","mousedown","touchstart","mspointerdown",sg,"mousewheel","wheel"];for(var d=0,e=b.length;d<e;++d)Q(this.j,b[d],kb);this.a.appendChild(this.j);
this.X=new kg(this);for(var f in vg)Q(this.X,vg[f],this.yc,this);this.S=c.keyboardEventTarget;this.i=null;Q(this.a,"wheel",this.Na,this);Q(this.a,"mousewheel",this.Na,this);this.G=c.controls;this.g=c.interactions;this.u=c.overlays;this.Tc={};this.B=new c.Ce(this.a,this);this.P=null;this.w=[];this.aa=[];this.na=new ch(this.ud.bind(this),this.Pd.bind(this));this.zb={};Q(this,rb("layergroup"),this.zd,this);Q(this,rb("view"),this.Qd,this);Q(this,rb("size"),this.Md,this);Q(this,rb("target"),this.Od,this);
this.l(c.values);nd(this.G,function(b){b.setMap(this)},this);Q(this.G,"add",function(b){b.element.setMap(this)},this);Q(this.G,"remove",function(b){b.element.setMap(null)},this);nd(this.g,function(b){b.setMap(this)},this);Q(this.g,"add",function(b){b.element.setMap(this)},this);Q(this.g,"remove",function(b){b.element.setMap(null)},this);nd(this.u,this.gc,this);Q(this.u,"add",function(b){this.gc(b.element)},this);Q(this.u,"remove",function(b){var c=b.element.La();void 0!==c&&delete this.Tc[c.toString()];
b.element.setMap(null)},this)}M(Z,T);p=Z.prototype;p.hd=function(b){this.g.push(b)};p.jd=function(b){gl(this).get("layers").push(b)};p.kd=function(b){this.u.push(b)};p.gc=function(b){var c=b.La();void 0!==c&&(this.Tc[c.toString()]=b);b.setMap(this)};p.fa=function(b){this.render();Array.prototype.push.apply(this.w,arguments)};
p.J=function(){jb(this.X);jb(this.B);gb(this.a,"wheel",this.Na,this);gb(this.a,"mousewheel",this.Na,this);void 0!==this.c&&(x.removeEventListener("resize",this.c,!1),this.c=void 0);this.h&&(x.cancelAnimationFrame(this.h),this.h=void 0);this.set("target",null);Z.$.J.call(this)};p.od=function(b,c,d,e,f){if(this.b)return b=this.ta(b),this.B.Vb(b,this.b,c,void 0!==d?d:null,void 0!==e?e:cc,void 0!==f?f:null)};
p.Sd=function(b,c,d){if(!this.b)return!1;b=this.ta(b);return this.B.Jc(b,this.b,void 0!==c?c:cc,void 0!==d?d:null)};p.vc=function(b){var c=this.a.getBoundingClientRect();b=b.changedTouches?b.changedTouches[0]:b;return[b.clientX-c.left,b.clientY-c.top]};p.Sb=function(){return this.get("target")};p.ab=function(){var b=this.Sb();return void 0!==b?Zd(b):null};p.ta=function(b){var c=this.b;return c?(b=b.slice(),Eg(c.pixelToCoordinateMatrix,b,b)):null};function gl(b){return b.get("layergroup")}
function yh(b,c){var d=b.b;if(d){var e=c.slice(0,2);return Eg(d.coordinateToPixelMatrix,e,e)}return null}p.Oa=function(){return this.get("size")};p.O=function(){return this.get("view")};p.ud=function(b,c,d,e){var f=this.b;if(!(f&&c in f.wantedTiles&&f.wantedTiles[c][b.L.toString()]))return Infinity;b=d[0]-f.focus[0];d=d[1]-f.focus[1];return 65536*Math.log(e)+Math.sqrt(b*b+d*d)/e};p.Na=function(b,c){var d=new ig(c||b.type,this,b);this.yc(d)};
p.yc=function(b){if(this.b){this.P=b.coordinate;b.frameState=this.b;var c=this.g.a,d;if(!1!==S(this,b))for(d=c.length-1;0<=d;d--){var e=c[d];if(e.get("active")&&!e.handleEvent(b))break}}};
p.Ld=function(){var b=this.b,c=this.na;if(0!==c.a.length){var d=16,e=d;if(b){var f=b.viewHints;f[0]&&(d=this.Ja?8:0,e=2);f[1]&&(d=this.vb?8:0,e=2)}if(c.h<d){bh(c);for(var f=0,g,h;c.h<d&&f<e&&0<c.a.length;)g=Zg(c)[0],h=g.getKey(),0!==g.N()||h in c.g||(c.g[h]=!0,++c.h,++f,g.load())}}c=this.aa;d=0;for(e=c.length;d<e;++d)c[d](this,b);c.length=0};p.Md=function(){this.render()};
p.Od=function(){var b;this.Sb()&&(b=this.ab());if(this.i){for(var c=0,d=this.i.length;c<d;++c)N(this.i[c]);this.i=null}b?(b.appendChild(this.a),b=this.S?this.S:b,this.i=[Q(b,"keydown",this.Na,this),Q(b,"keypress",this.Na,this)],this.c||(this.c=this.$b.bind(this),x.addEventListener("resize",this.c,!1))):(ge(this.a),void 0!==this.c&&(x.removeEventListener("resize",this.c,!1),this.c=void 0));this.$b()};p.Pd=function(){this.render()};p.Rd=function(){this.render()};
p.Qd=function(){this.D&&(N(this.D),this.D=null);var b=this.O();b&&(this.D=Q(b,"propertychange",this.Rd,this));this.render()};p.Ad=function(){this.render()};p.Bd=function(){this.render()};p.zd=function(){this.s&&(this.s.forEach(N),this.s=null);var b=gl(this);b&&(this.s=[Q(b,"propertychange",this.Bd,this),Q(b,"change",this.Ad,this)]);this.render()};p.render=function(){void 0===this.h&&(this.h=x.requestAnimationFrame(this.pa))};p.ye=function(b){return this.g.remove(b)};p.ze=function(b){return gl(this).get("layers").remove(b)};
p.Be=function(b){var c,d,e,f=this.Oa(),g=this.O(),h=null;if(c=void 0!==f&&0<f[0]&&0<f[1]&&g)c=!!g.ia()&&void 0!==g.I();if(c){var h=g.g.slice(),k=gl(this).Kb(),l={};c=0;for(d=k.length;c<d;++c)l[I(k[c].layer)]=k[c];e=g.N();h={animate:!1,attributions:{},coordinateToPixelMatrix:this.Aa,extent:null,focus:this.P?this.P:e.center,index:this.Ba++,layerStates:l,layerStatesArray:k,logos:Wa({},this.wb),pixelRatio:this.xb,pixelToCoordinateMatrix:this.yb,postRenderFunctions:[],size:f,skippedFeatureUids:this.zb,
tileQueue:this.na,time:b,usedTiles:{},viewState:e,viewHints:h,wantedTiles:{}}}if(h){b=this.w;c=f=0;for(d=b.length;c<d;++c)g=b[c],g(this,h)&&(b[f++]=g);b.length=f;h.extent=Zb(e.center,e.resolution,e.rotation,h.size)}this.b=h;this.B.sb(h);h&&(h.animate&&this.render(),Array.prototype.push.apply(this.aa,h.postRenderFunctions),0!==this.w.length||h.viewHints[0]||h.viewHints[1]||Rb(h.extent,this.ea)||(S(this,new se("moveend",this,h)),Mb(h.extent,this.ea)));S(this,new se("postrender",this,h));c=e=this.Ld;
this&&(c=ma(e,this));!ga(x.setImmediate)||x.Window&&x.Window.prototype&&!W("Edge")&&x.Window.prototype.setImmediate==x.setImmediate?(ef||(ef=ff()),ef(c)):x.setImmediate(c)};
p.$b=function(){var b=this.ab();if(b){var c=Yd(b),d=Gd&&b.currentStyle,e;if(e=d)Wd(c),e=!0;if(e&&"auto"!=d.width&&"auto"!=d.height&&!d.boxSizing)c=oe(b,d.width,"width","pixelWidth"),b=oe(b,d.height,"height","pixelHeight"),b=new Vd(c,b);else{d=new Vd(b.offsetWidth,b.offsetHeight);if(Gd){c=pe(b,"paddingLeft");e=pe(b,"paddingRight");var f=pe(b,"paddingTop"),g=pe(b,"paddingBottom"),c=new ie(f,e,g,c)}else c=je(b,"paddingLeft"),e=je(b,"paddingRight"),f=je(b,"paddingTop"),g=je(b,"paddingBottom"),c=new ie(parseFloat(f),
parseFloat(e),parseFloat(g),parseFloat(c));!Gd||9<=Number(Sd)?(e=je(b,"borderLeftWidth"),f=je(b,"borderRightWidth"),g=je(b,"borderTopWidth"),b=je(b,"borderBottomWidth"),b=new ie(parseFloat(g),parseFloat(f),parseFloat(b),parseFloat(e))):(e=re(b,"borderLeft"),f=re(b,"borderRight"),g=re(b,"borderTop"),b=re(b,"borderBottom"),b=new ie(g,f,b,e));b=new Vd(d.width-b.left-c.left-c.right-b.right,d.height-b.top-c.top-c.bottom-b.bottom)}this.set("size",[b.width,b.height])}else this.set("size",void 0)};
function fl(b){var c=null;void 0!==b.keyboardEventTarget&&(c="string"===typeof b.keyboardEventTarget?document.getElementById(b.keyboardEventTarget):b.keyboardEventTarget);var d={},e={};if(void 0===b.logo||"boolean"===typeof b.logo&&b.logo)e["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]=
"http://openlayers.org/";else{var f=b.logo;"string"===typeof f?e[f]="":ha(f)&&(e[f.src]=f.href)}f=b.layers instanceof ai?b.layers:new ai({layers:b.layers});d.layergroup=f;d.target=b.target;d.view=void 0!==b.view?b.view:new V;var f=Tg,g;void 0!==b.renderer?Array.isArray(b.renderer)?g=b.renderer:"string"===typeof b.renderer&&(g=[b.renderer]):g=el;var h,k;h=0;for(k=g.length;h<k;++h){var l=g[h];if("canvas"==l){if(zf){f=ck;break}}else if("dom"==l){f=jk;break}else if("webgl"==l&&sf){f=bl;break}}var m;void 0!==
b.controls?m=Array.isArray(b.controls)?new ld(b.controls.slice()):b.controls:m=df();if(void 0!==b.interactions)g=Array.isArray(b.interactions)?new ld(b.interactions.slice()):b.interactions;else{g={};h=new ld;k=new dh;(void 0!==g.altShiftDragRotate?g.altShiftDragRotate:1)&&h.push(new zh);(void 0!==g.doubleClickZoom?g.doubleClickZoom:1)&&h.push(new jh({delta:g.zoomDelta,duration:g.zoomDuration}));(void 0!==g.dragPan?g.dragPan:1)&&h.push(new uh({kinetic:k}));(void 0!==g.pinchRotate?g.pinchRotate:1)&&
h.push(new Th);(void 0!==g.pinchZoom?g.pinchZoom:1)&&h.push(new Xh({duration:g.zoomDuration}));if(void 0!==g.keyboard?g.keyboard:1)h.push(new Nh),h.push(new Ph({delta:g.zoomDelta,duration:g.zoomDuration}));(void 0!==g.mouseWheelZoom?g.mouseWheelZoom:1)&&h.push(new Rh({duration:g.zoomDuration}));(void 0!==g.shiftDragZoom?g.shiftDragZoom:1)&&h.push(new Mh({duration:g.zoomDuration}));g=h}b=void 0!==b.overlays?Array.isArray(b.overlays)?new ld(b.overlays.slice()):b.overlays:new ld;return{controls:m,interactions:g,
keyboardEventTarget:c,logos:e,overlays:b,Ce:f,values:d}}mc(fi);mc(mi);mi.forEach(function(b){fi.forEach(function(c){nc(b,c,gi);nc(c,b,hi)})});function hl(b){T.call(this);this.j=b.id;this.i=void 0!==b.insertFirst?b.insertFirst:!0;this.o=void 0!==b.stopEvent?b.stopEvent:!0;this.b=document.createElement("DIV");this.b.className="ol-overlay-container";this.b.style.position="absolute";this.autoPan=void 0!==b.autoPan?b.autoPan:!1;this.g=void 0!==b.autoPanAnimation?b.autoPanAnimation:{};this.h=void 0!==b.autoPanMargin?b.autoPanMargin:20;this.a={hb:"",pb:"",tb:"",ub:"",visible:!0};this.c=null;Q(this,rb("element"),this.xd,this);Q(this,rb("map"),
this.Gd,this);Q(this,rb("offset"),this.Hd,this);Q(this,rb("position"),this.Jd,this);Q(this,rb("positioning"),this.Kd,this);void 0!==b.element&&this.set("element",b.element);this.set("offset",void 0!==b.offset?b.offset:[0,0]);this.set("positioning",void 0!==b.positioning?b.positioning:"top-left");void 0!==b.position&&this.Ec(b.position)}M(hl,T);p=hl.prototype;p.La=function(){return this.j};p.xd=function(){ee(this.b);var b=this.get("element");b&&this.b.appendChild(b)};
p.Gd=function(){this.c&&(ge(this.b),N(this.c),this.c=null);var b=this.get("map");b&&(this.c=Q(b,"postrender",this.render,this),il(this),b=this.o?b.j:b.o,this.i?fe(b,this.b,0):b.appendChild(this.b))};p.render=function(){il(this)};p.Hd=function(){il(this)};
p.Jd=function(){il(this);if(void 0!==this.get("position")&&this.autoPan){var b=this.get("map");if(void 0!==b&&b.ab()){var c=jl(b.ab(),b.Oa()),d=this.get("element"),e=d.offsetWidth,f=d.currentStyle||x.getComputedStyle(d),e=e+(parseInt(f.marginLeft,10)+parseInt(f.marginRight,10)),f=d.offsetHeight,g=d.currentStyle||x.getComputedStyle(d),f=f+(parseInt(g.marginTop,10)+parseInt(g.marginBottom,10)),h=jl(d,[e,f]),d=this.h;Nb(c,h)||(e=h[0]-c[0],f=c[2]-h[2],g=h[1]-c[1],h=c[3]-h[3],c=[0,0],0>e?c[0]=e-d:0>f&&
(c[0]=Math.abs(f)+d),0>g?c[1]=g-d:0>h&&(c[1]=Math.abs(h)+d),0===c[0]&&0===c[1])||(d=b.O().ia(),e=yh(b,d),c=[e[0]+c[0],e[1]+c[1]],this.g&&(this.g.source=d,b.fa(cd(this.g))),b.O().oa(b.ta(c)))}}};p.Kd=function(){il(this)};p.setMap=function(b){this.set("map",b)};p.Ec=function(b){this.set("position",b)};
function jl(b,c){var d=Yd(b),e=new Ud(0,0),f;f=d?Yd(d):document;var g;(g=!Gd||9<=Number(Sd))||(Wd(f),g=!0);b!=(g?f.documentElement:f.body)&&(f=ke(b),g=Wd(d).a,d=g.scrollingElement?g.scrollingElement:Jd?g.body||g.documentElement:g.documentElement,g=g.parentWindow||g.defaultView,d=Gd&&Qd("10")&&g.pageYOffset!=d.scrollTop?new Ud(d.scrollLeft,d.scrollTop):new Ud(g.pageXOffset||d.scrollLeft,g.pageYOffset||d.scrollTop),e.x=f.left+d.x,e.y=f.top+d.y);return[e.x,e.y,e.x+c[0],e.y+c[1]]}
function kl(b,c){b.a.visible!==c&&(ne(b.b,c),b.a.visible=c)}
function il(b){var c=b.get("map"),d=b.get("position");if(void 0!==c&&c.b&&void 0!==d){var d=yh(c,d),e=c.Oa(),c=b.b.style,f=b.get("offset"),g=b.get("positioning"),h=f[0],f=f[1];if("bottom-right"==g||"center-right"==g||"top-right"==g)""!==b.a.pb&&(b.a.pb=c.left=""),h=Math.round(e[0]-d[0]-h)+"px",b.a.tb!=h&&(b.a.tb=c.right=h);else{""!==b.a.tb&&(b.a.tb=c.right="");if("bottom-center"==g||"center-center"==g||"top-center"==g)h-=le(b.b).width/2;h=Math.round(d[0]+h)+"px";b.a.pb!=h&&(b.a.pb=c.left=h)}if("bottom-left"==
g||"bottom-center"==g||"bottom-right"==g)""!==b.a.ub&&(b.a.ub=c.top=""),d=Math.round(e[1]-d[1]-f)+"px",b.a.hb!=d&&(b.a.hb=c.bottom=d);else{""!==b.a.hb&&(b.a.hb=c.bottom="");if("center-left"==g||"center-center"==g||"center-right"==g)f-=le(b.b).height/2;d=Math.round(d[1]+f)+"px";b.a.ub!=d&&(b.a.ub=c.top=d)}kl(b,!0)}else kl(b,!1)};function ll(){this.defaultDataProjection=null}function ml(b,c,d){var e;d&&(e={dataProjection:d.dataProjection?d.dataProjection:b.f(Cj(c)),featureProjection:d.featureProjection});var f;e&&(f={featureProjection:e.featureProjection,dataProjection:e.dataProjection?e.dataProjection:b.defaultDataProjection,rightHanded:e.rightHanded},e.decimals&&(f.decimals=e.decimals));return f}
function nl(b,c){var d=c?lc(c.featureProjection):null,e=c?lc(c.dataProjection):null;if(d&&e&&!wc(d,e))if(b instanceof zc)d=b.o(e,d);else{e=xc(e,d);d=[b[0],b[1],b[0],b[3],b[2],b[1],b[2],b[3]];e(d,d,2);var f=[d[0],d[2],d[4],d[6]],g=[d[1],d[3],d[5],d[7]],d=Math.min.apply(null,f),e=Math.min.apply(null,g),f=Math.max.apply(null,f),g=Math.max.apply(null,g),d=Ob(d,e,f,g,void 0)}else d=b;return d};function pl(){this.defaultDataProjection=null}M(pl,ll);function Cj(b){return ha(b)?b:"string"===typeof b?(b=JSON.parse(b))?b:null:null}pl.prototype.U=function(){return"json"};pl.prototype.g=function(b,c){return this.a(Cj(b),ml(this,b,c))};pl.prototype.b=function(b,c){return this.h(Cj(b),ml(this,b,c))};function ql(b,c,d,e,f){var g=NaN,h=NaN,k=(d-c)/e;if(0!==k)if(1==k)g=b[c],h=b[c+1];else if(2==k)g=.5*b[c]+.5*b[c+e],h=.5*b[c+1]+.5*b[c+e+1];else{var h=b[c],k=b[c+1],l=0,g=[0],m;for(m=c+e;m<d;m+=e){var n=b[m],q=b[m+1],l=l+Math.sqrt((n-h)*(n-h)+(q-k)*(q-k));g.push(l);h=n;k=q}d=.5*l;l=0;m=g.length;for(n=!1;l<m;)h=l+(m-l>>1),k=+Ha(g[h],d),0>k?l=h+1:(m=h,n=!k);h=n?l:~l;0>h?(d=(d-g[-h-2])/(g[-h-1]-g[-h-2]),c+=(-h-2)*e,g=b[c],g=g+d*(b[c+e]-g),h=b[c+1],h=h+d*(b[c+e+1]-h)):(g=b[c+h*e],h=b[c+h*e+1])}return f?
(f[0]=g,f[1]=h,f):[g,h]};function rl(b,c){Bc.call(this);this.c=null;this.j=-1;this.W(b,c)}M(rl,Bc);p=rl.prototype;p.clone=function(){var b=new rl(null);U(b,this.g,this.a.slice());b.v();return b};p.ra=function(){return Hc(this.a,0,this.a.length,this.b)};function Ni(b){if(b.j!=b.f){var c;c=ql(b.a,0,b.a.length,b.b,b.c);b.c=c;b.j=b.f}return b.c}p.Ma=function(b){var c=[];c.length=Jc(this.a,0,this.a.length,this.b,b,c,0);b=new rl(null);U(b,"XY",c);b.v();return b};p.U=function(){return"LineString"};
p.W=function(b,c){b?(Dc(this,c,b,1),this.a||(this.a=[]),this.a.length=Fc(this.a,0,b,this.b)):U(this,"XY",null);this.v()};function sl(b,c){Bc.call(this);this.c=[];this.W(b,c)}M(sl,Bc);p=sl.prototype;p.clone=function(){var b=new sl(null),c=this.c.slice();U(b,this.g,this.a.slice());b.c=c;b.v();return b};p.ra=function(){return Ic(this.a,0,this.c,this.b)};p.$a=function(){return this.c};function Oi(b){var c=[],d=b.a,e=0,f=b.c;b=b.b;var g,h;g=0;for(h=f.length;g<h;++g){var k=f[g],e=ql(d,e,k,b);Ka(c,e);e=k}return c}
p.Ma=function(b){var c=[],d=[],e=this.a,f=this.c,g=this.b,h=0,k=0,l,m;l=0;for(m=f.length;l<m;++l){var n=f[l],k=Jc(e,h,n,g,b,c,k);d.push(k);h=n}c.length=k;b=new sl(null);U(b,"XY",c);b.c=d;b.v();return b};p.U=function(){return"MultiLineString"};p.W=function(b,c){if(b){Dc(this,c,b,2);this.a||(this.a=[]);var d=Gc(this.a,0,b,this.b,this.c);this.a.length=0===d.length?0:d[d.length-1]}else d=this.c,U(this,"XY",null),this.c=d;this.v()};function tl(b,c){Bc.call(this);this.W(b,c)}M(tl,Bc);tl.prototype.clone=function(){var b=new tl(null);U(b,this.g,this.a.slice());b.v();return b};tl.prototype.ra=function(){return Hc(this.a,0,this.a.length,this.b)};tl.prototype.U=function(){return"MultiPoint"};tl.prototype.W=function(b,c){b?(Dc(this,c,b,1),this.a||(this.a=[]),this.a.length=Fc(this.a,0,b,this.b)):U(this,"XY",null);this.v()};function ul(b,c){Bc.call(this);this.c=[];this.B=-1;this.D=null;this.G=-1;this.j=null;this.W(b,c)}M(ul,Bc);p=ul.prototype;p.clone=function(){for(var b=new ul(null),c=this.c.length,d=Array(c),e=0;e<c;++e)d[e]=this.c[e].slice();U(b,this.g,this.a.slice());b.c=d;b.v();return b};p.ra=function(b){var c;void 0!==b?(c=Pi(this).slice(),Sc(c,this.c,this.b,b)):c=this.a;b=c;c=this.c;var d=this.b,e=0,f=[],g=0,h,k;h=0;for(k=c.length;h<k;++h){var l=c[h];f[g++]=Ic(b,e,l,d,f[g]);e=l[l.length-1]}f.length=g;return f};
function Qi(b){if(b.B!=b.f){var c=b.a,d=b.c,e=b.b,f=0,g=[],h,k,l=Jb();h=0;for(k=d.length;h<k;++h){var m=d[h],l=c,n=m[0],q=e,r=Pb(void 0),l=Tb(r,l,f,n,q);g.push((l[0]+l[2])/2,(l[1]+l[3])/2);f=m[m.length-1]}c=Pi(b);d=b.c;e=b.b;h=0;k=[];m=0;for(l=d.length;m<l;++m)f=d[m],k=Oc(c,h,f,e,g,2*m,k),h=f[f.length-1];b.D=k;b.B=b.f}return b.D}
function Pi(b){if(b.G!=b.f){var c=b.a,d;a:{d=b.c;var e,f;e=0;for(f=d.length;e<f;++e)if(!Qc(c,d[e],b.b,void 0)){d=!1;break a}d=!0}d?b.j=c:(b.j=c.slice(),b.j.length=Sc(b.j,b.c,b.b));b.G=b.f}return b.j}p.Ma=function(b){var c=[],d=[],e=this.a,f=this.c,g=this.b;b=Math.sqrt(b);var h=0,k=0,l,m;l=0;for(m=f.length;l<m;++l){var n=f[l],q=[],k=Kc(e,h,n,g,b,c,k,q);d.push(q);h=n[n.length-1]}c.length=k;e=new ul(null);U(e,"XY",c);e.c=d;e.v();return e};p.U=function(){return"MultiPolygon"};
p.W=function(b,c){if(b){Dc(this,c,b,3);this.a||(this.a=[]);var d=this.a,e=this.b,f=this.c,g=0,f=f?f:[],h=0,k,l;k=0;for(l=b.length;k<l;++k)g=Gc(d,g,b[k],e,f[h]),f[h++]=g,g=g[g.length-1];f.length=h;0===f.length?this.a.length=0:(d=f[f.length-1],this.a.length=0===d.length?0:d[d.length-1])}else d=this.c,U(this,"XY",null),this.c=d;this.v()};function vl(b){b=b?b:{};this.defaultDataProjection=null;this.c=b.geometryName}M(vl,pl);function wl(b){var c="XY";!0===b.hasZ&&!0===b.hasM?c="XYZM":!0===b.hasZ?c="XYZ":!0===b.hasM&&(c="XYM");return c}
var xl={Point:function(b){return void 0!==b.m&&void 0!==b.z?new Mc([b.x,b.y,b.z,b.m],"XYZM"):void 0!==b.z?new Mc([b.x,b.y,b.z],"XYZ"):void 0!==b.m?new Mc([b.x,b.y,b.m],"XYM"):new Mc([b.x,b.y])},LineString:function(b){return new rl(b.paths[0],wl(b))},Polygon:function(b){return new Tc(b.rings,wl(b))},MultiPoint:function(b){return new tl(b.points,wl(b))},MultiLineString:function(b){return new sl(b.paths,wl(b))},MultiPolygon:function(b){return new ul(b.rings,wl(b))}};
vl.prototype.a=function(b,c){var d;if(d=b.geometry){var e;if(ea(d.x)&&ea(d.y))e="Point";else if(d.points)e="MultiPoint";else if(d.paths)e=1===d.paths.length?"LineString":"MultiLineString";else if(d.rings){var f=d.rings,g=wl(d),h=[];e=[];var k,l;k=0;for(l=f.length;k<l;++k){var m=Ja(f[k]);Pc(m,0,m.length,g.length)?h.push([f[k]]):e.push(f[k])}for(;e.length;){f=e.shift();g=!1;for(k=h.length-1;0<=k;k--)if(Nb((new Lc(h[k][0])).C(),(new Lc(f)).C())){h[k].push(f);g=!0;break}g||h.push([f.reverse()])}d=Wa({},
d);1===h.length?(e="Polygon",d.rings=h[0]):(e="MultiPolygon",d.rings=h)}d=nl((0,xl[e])(d),c)}else d=null;h=new xj;this.c&&zj(h,this.c);yj(h,d);c&&c.Pb&&b.attributes[c.Pb]&&(h.g=b.attributes[c.Pb],h.v());b.attributes&&h.l(b.attributes);return h};vl.prototype.h=function(b,c){var d=c?c:{};if(b.features){var e=[],f=b.features,g,h;d.Pb=b.objectIdFieldName;g=0;for(h=f.length;g<h;++g)e.push(this.a(f[g],d));return e}return[this.a(b,d)]};
vl.prototype.f=function(b){return b.spatialReference&&b.spatialReference.wkid?lc("EPSG:"+b.spatialReference.wkid):null};function yl(b){zc.call(this);this.a=b?b:null;zl(this)}M(yl,zc);function Al(b){var c,d;if(b.a)for(c=0,d=b.a.length;c<d;++c)gb(b.a[c],"change",b.v,b)}function zl(b){var c,d;if(b.a)for(c=0,d=b.a.length;c<d;++c)Q(b.a[c],"change",b.v,b)}p=yl.prototype;p.clone=function(){var b=new yl(null),c=this.a,d=[],e,f;e=0;for(f=c.length;e<f;++e)d.push(c[e].clone());Al(b);b.a=d;zl(b);b.v();return b};p.ib=function(b){Pb(b);for(var c=this.a,d=0,e=c.length;d<e;++d)Sb(b,c[d].C());return b};
p.Nb=function(b){this.s!=this.f&&(Ya(this.h),this.i=0,this.s=this.f);if(0>b||0!==this.i&&b<this.i)return this;var c=b.toString();if(this.h.hasOwnProperty(c))return this.h[c];var d=[],e=this.a,f=!1,g,h;g=0;for(h=e.length;g<h;++g){var k=e[g],l=k.Nb(b);d.push(l);l!==k&&(f=!0)}if(f)return b=new yl(null),Al(b),b.a=d,zl(b),b.v(),this.h[c]=b;this.i=b;return this};p.U=function(){return"GeometryCollection"};p.rotate=function(b,c){for(var d=this.a,e=0,f=d.length;e<f;++e)d[e].rotate(b,c);this.v()};
p.Db=function(b){var c=this.a,d,e;d=0;for(e=c.length;d<e;++d)c[d].Db(b);this.v()};p.J=function(){Al(this);yl.$.J.call(this)};function Bl(b){b=b?b:{};this.defaultDataProjection=null;this.defaultDataProjection=lc(b.defaultDataProjection?b.defaultDataProjection:"EPSG:4326");this.c=b.geometryName}M(Bl,pl);function Cl(b,c){return b?nl((0,Dl[b.type])(b),c):null}
var Dl={Point:function(b){return new Mc(b.coordinates)},LineString:function(b){return new rl(b.coordinates)},Polygon:function(b){return new Tc(b.coordinates)},MultiPoint:function(b){return new tl(b.coordinates)},MultiLineString:function(b){return new sl(b.coordinates)},MultiPolygon:function(b){return new ul(b.coordinates)},GeometryCollection:function(b,c){var d=b.geometries.map(function(b){return Cl(b,c)});return new yl(d)}};
Bl.prototype.a=function(b,c){var d=Cl(b.geometry,c),e=new xj;this.c&&zj(e,this.c);yj(e,d);void 0!==b.id&&(e.g=b.id,e.v());b.properties&&e.l(b.properties);return e};Bl.prototype.h=function(b,c){if("Feature"==b.type)return[this.a(b,c)];if("FeatureCollection"==b.type){var d=[],e=b.features,f,g;f=0;for(g=e.length;f<g;++f)d.push(this.a(e[f],c));return d}return[]};Bl.prototype.f=function(b){return(b=b.crs)?"name"==b.type?lc(b.properties.name):"EPSG"==b.type?lc("EPSG:"+b.properties.code):null:this.defaultDataProjection};function El(b,c,d){if("array"==ba(c))for(var e=0;e<c.length;e++)El(b,String(c[e]),d);else null!=c&&d.push("&",b,""===c?"":"=",encodeURIComponent(String(c)))};function Fl(b,c,d){Bc.call(this);Gl(this,b,c?c:0,d)}M(Fl,Bc);Fl.prototype.clone=function(){var b=new Fl(null);U(b,this.g,this.a.slice());b.v();return b};Fl.prototype.ib=function(b){var c=this.a,d=c[this.b]-c[0];return Ob(c[0]-d,c[1]-d,c[0]+d,c[1]+d,b)};Fl.prototype.U=function(){return"Circle"};function Gl(b,c,d,e){if(c){Dc(b,e,c,0);b.a||(b.a=[]);e=b.a;c=Ec(e,c);e[c++]=e[0]+d;var f;d=1;for(f=b.b;d<f;++d)e[c++]=e[d];e.length=c}else U(b,"XY",null);b.v()};function Hl(b,c,d,e,f){Ae.call(this,b,c);this.g=d;this.b=new Image;null!==e&&(this.b.crossOrigin=e);this.f={};this.c=null;this.h=f}M(Hl,Ae);p=Hl.prototype;p.J=function(){1==this.state&&Il(this);this.a&&jb(this.a);this.state=5;Be(this);Hl.$.J.call(this)};p.T=function(b){if(void 0!==b){var c=I(b);if(c in this.f)return this.f[c];b=$a(this.f)?this.b:this.b.cloneNode(!1);return this.f[c]=b}return this.b};p.getKey=function(){return this.g};p.he=function(){this.state=3;Il(this);Be(this)};
p.ie=function(){this.state=this.b.naturalWidth&&this.b.naturalHeight?2:4;Il(this);Be(this)};p.load=function(){0==this.state&&(this.state=1,Be(this),this.c=[Q(this.b,"error",this.he,this,!0),Q(this.b,"load",this.ie,this,!0)],this.h(this,this.g))};function Il(b){b.c.forEach(N);b.c=null};function Jl(b,c){R.call(this,b);this.feature=c}M(Jl,R);
function Kl(b){rh.call(this,{handleDownEvent:Ll,handleEvent:Ml,handleUpEvent:Nl});this.P=null;this.o=!1;this.Ba=b.source?b.source:null;this.pa=b.features?b.features:null;this.Zc=b.snapTolerance?b.snapTolerance:12;this.D=b.type;this.b=Ol(this.D);this.na=b.minPoints?b.minPoints:this.b===Pl?3:2;this.ea=b.maxPoints?b.maxPoints:Infinity;var c=b.geometryFunction;if(!c)if("Circle"===this.D)c=function(b,c){var d=c?c:new Fl([NaN,NaN]),h=b[0],k=b[1],l=h[0]-k[0],h=h[1]-k[1];Gl(d,b[0],Math.sqrt(l*l+h*h));return d};
else{var d,c=this.b;c===Rl?d=Mc:c===Sl?d=rl:c===Pl&&(d=Tc);c=function(b,c){var g=c;g?g.W(b):g=new d(b);return g}}this.u=c;this.B=this.i=this.a=this.j=this.g=this.h=null;this.gd=b.clickTolerance?b.clickTolerance*b.clickTolerance:36;this.X=new Y({source:new Lj({useSpatialIndex:!1,wrapX:b.wrapX?b.wrapX:!1}),style:b.style?b.style:Tl()});this.Aa=b.geometryName;this.zb=b.condition?b.condition:nh;this.aa=b.freehandCondition?b.freehandCondition:oh;Q(this,rb("active"),this.Ja,this)}M(Kl,rh);
function Tl(){var b=Fi();return function(c){return b[c.M().U()]}}Kl.prototype.setMap=function(b){Kl.$.setMap.call(this,b);this.Ja()};function Ml(b){this.b!==Sl&&this.b!==Pl||!this.aa(b)||(this.o=!0);var c=!this.o;this.o&&b.type===ug?(Ul(this,b),c=!1):b.type===tg?c=Vl(this,b):b.type===ng&&(c=!1);return sh.call(this,b)&&c}function Ll(b){return this.zb(b)?(this.P=b.pixel,!0):this.o?(this.P=b.pixel,this.h||Wl(this,b),!0):!1}
function Nl(b){this.o=!1;var c=this.P,d=b.pixel,e=c[0]-d[0],c=c[1]-d[1],d=!0;e*e+c*c<=this.gd&&(Vl(this,b),this.h?this.b===Xl?Yl(this):Zl(this,b)?Yl(this):Ul(this,b):(Wl(this,b),this.b===Rl&&Yl(this)),d=!1);return d}
function Vl(b,c){if(b.h){var d=c.coordinate,e=b.g.M(),f;b.b===Rl?f=b.a:b.b===Pl?(f=b.a[0],f=f[f.length-1],Zl(b,c)&&(d=b.h.slice())):(f=b.a,f=f[f.length-1]);f[0]=d[0];f[1]=d[1];b.u(b.a,e);b.j&&b.j.M().W(d);e instanceof Tc&&b.b!==Pl?(b.i||(b.i=new xj(new rl(null))),0>=e.c.length?e=null:(d=new Lc(null),U(d,e.g,e.a.slice(0,e.c[0])),d.v(),e=d),d=b.i.M(),U(d,e.g,e.a),d.v()):b.B&&(d=b.i.M(),d.W(b.B));$l(b)}else e=c.coordinate.slice(),b.j?b.j.M().W(e):(b.j=new xj(new Mc(e)),$l(b));return!0}
function Zl(b,c){var d=!1;if(b.g){var e=!1,f=[b.h];b.b===Sl?e=b.a.length>b.na:b.b===Pl&&(e=b.a[0].length>b.na,f=[b.a[0][0],b.a[0][b.a[0].length-2]]);if(e)for(var e=c.map,g=0,h=f.length;g<h;g++){var k=f[g],l=yh(e,k),m=c.pixel,d=m[0]-l[0],l=m[1]-l[1],m=b.o&&b.aa(c)?1:b.Zc;if(d=Math.sqrt(d*d+l*l)<=m){b.h=k;break}}}return d}
function Wl(b,c){var d=c.coordinate;b.h=d;b.b===Rl?b.a=d.slice():b.b===Pl?(b.a=[[d.slice(),d.slice()]],b.B=b.a[0]):(b.a=[d.slice(),d.slice()],b.b===Xl&&(b.B=b.a));b.B&&(b.i=new xj(new rl(b.B)));d=b.u(b.a);b.g=new xj;b.Aa&&zj(b.g,b.Aa);yj(b.g,d);$l(b);S(b,new Jl("drawstart",b.g))}
function Ul(b,c){var d=c.coordinate,e=b.g.M(),f,g;if(b.b===Sl)b.h=d.slice(),g=b.a,g.push(d.slice()),f=g.length>b.ea,b.u(g,e);else if(b.b===Pl){g=b.a[0];g.push(d.slice());if(f=g.length>b.ea)b.h=g[0];b.u(b.a,e)}$l(b);f&&Yl(b)}
function Yl(b){var c=am(b),d=b.a,e=c.M();b.b===Sl?(d.pop(),b.u(d,e)):b.b===Pl&&(d[0].pop(),d[0].push(d[0][0]),b.u(d,e));"MultiPoint"===b.D?yj(c,new tl([d])):"MultiLineString"===b.D?yj(c,new sl([d])):"MultiPolygon"===b.D&&yj(c,new ul([d]));S(b,new Jl("drawend",c));b.pa&&b.pa.push(c);b.Ba&&b.Ba.Bb(c)}function am(b){b.h=null;var c=b.g;c&&(b.g=null,b.j=null,b.i=null,b.X.V().clear(!0));return c}Kl.prototype.w=dc;
function $l(b){var c=[];b.g&&c.push(b.g);b.i&&c.push(b.i);b.j&&c.push(b.j);b=b.X.V();b.clear(!0);b.Cb(c)}Kl.prototype.Ja=function(){var b=this.S,c=this.get("active");b&&c||am(this);this.X.setMap(c?b:null)};function Ol(b){var c;"Point"===b||"MultiPoint"===b?c=Rl:"LineString"===b||"MultiLineString"===b?c=Sl:"Polygon"===b||"MultiPolygon"===b?c=Pl:"Circle"===b&&(c=Xl);return c}var Rl="Point",Sl="LineString",Pl="Polygon",Xl="Circle";function bm(b,c,d,e,f,g,h,k,l,m,n){Ae.call(this,f,0);this.u=void 0!==n?n:!1;this.s=h;this.o=k;this.c=null;this.f={};this.g=c;this.l=e;this.i=g?g:f;this.b=[];this.Ra=null;this.h=0;g=Ie(e,this.i);k=this.l.C();f=this.g.C();g=k?$b(g,k):g;if(0===Ub(g))this.state=4;else if((k=b.C())&&(f?f=$b(f,k):f=k),k=e.I(this.i[0]),n=Yb(g),e=xc(d,b)(n,void 0,n.length),k=d.getPointResolution(k,n),n=pc(d),void 0!==n&&(k*=n),n=pc(b),void 0!==n&&(k/=n),e=b.getPointResolution(k,e)/k,isFinite(e)&&0<e&&(k/=e),e=k,!isFinite(e)||
0>=e)this.state=4;else if(this.j=new uj(b,d,g,f,e*(void 0!==m?m:.5)),0===this.j.c.length)this.state=4;else if(this.h=Pe(c,e),d=wj(this.j),f&&(b.a?(d[1]=Ca(d[1],f[1],f[3]),d[3]=Ca(d[3],f[1],f[3])):d=$b(d,f)),Ub(d))if(b=Je(c,d,this.h),100>b.ha()*(b.c-b.b+1)){for(c=b.a;c<=b.f;c++)for(d=b.b;d<=b.c;d++)(m=l(this.h,c,d,h))&&this.b.push(m);0===this.b.length&&(this.state=4)}else this.state=3;else this.state=4}M(bm,Ae);bm.prototype.J=function(){1==this.state&&(this.Ra.forEach(N),this.Ra=null);bm.$.J.call(this)};
bm.prototype.T=function(b){if(void 0!==b){var c=I(b);if(c in this.f)return this.f[c];b=$a(this.f)?this.c:this.c.cloneNode(!1);return this.f[c]=b}return this.c};
bm.prototype.Uc=function(){var b=[];this.b.forEach(function(c){c&&2==c.N()&&b.push({extent:Ie(this.g,c.L),image:c.T()})},this);this.b.length=0;if(0===b.length)this.state=3;else{var c=this.i[0],d=Oe(this.l,c),e=ea(d)?d:d[0],d=ea(d)?d:d[1],c=this.l.I(c),f=this.g.I(this.h),g=Ie(this.l,this.i);this.c=tj(e,d,this.s,f,this.g.C(),c,g,this.j,b,this.o,this.u);this.state=2}Be(this)};
bm.prototype.load=function(){if(0==this.state){this.state=1;Be(this);var b=0;this.Ra=[];this.b.forEach(function(c){var d=c.N();if(0==d||1==d){b++;var e;e=Q(c,"change",function(){var d=c.N();if(2==d||3==d||4==d)N(e),b--,0===b&&(this.Ra.forEach(N),this.Ra=null,this.Uc())},this);this.Ra.push(e)}},this);this.b.forEach(function(b){0==b.N()&&b.load()});0===b&&x.setTimeout(this.Uc.bind(this),0)}};function cm(b){ak.call(this,{attributions:b.attributions,cacheSize:b.cacheSize,extent:b.extent,logo:b.logo,opaque:b.opaque,projection:b.projection,state:b.state,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction?b.tileLoadFunction:dm,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:b.tileUrlFunction,url:b.url,urls:b.urls,wrapX:b.wrapX});this.crossOrigin=void 0!==b.crossOrigin?b.crossOrigin:null;this.tileClass=void 0!==b.tileClass?b.tileClass:Hl;this.b={};this.o={};this.S=b.reprojectionErrorThreshold}
M(cm,ak);p=cm.prototype;p.Qc=function(){if(ye(this.a))return!0;for(var b in this.b)if(ye(this.b[b]))return!0;return!1};p.Rc=function(b,c){var d=this.bb(b);ze(this.a,this.a==d?c:{});for(var e in this.b){var f=this.b[e];ze(f,f==d?c:{})}};p.kb=function(){return 0};p.Lb=function(b){return this.c&&b&&!wc(this.c,b)?!1:cm.$.Lb.call(this,b)};p.la=function(b){var c=this.c;return!this.tileGrid||c&&!wc(c,b)?(c=I(b).toString(),c in this.o||(this.o[c]=Re(b)),this.o[c]):this.tileGrid};
p.bb=function(b){var c=this.c;if(!c||wc(c,b))return this.a;b=I(b).toString();b in this.b||(this.b[b]=new xe);return this.b[b]};function em(b,c,d,e,f,g){c=[c,d,e];f=(d=Xe(b,c,g))?b.tileUrlFunction(d,f,g):void 0;f=new b.tileClass(c,void 0!==f?0:4,void 0!==f?f:"",b.crossOrigin,b.tileLoadFunction);f.key="";Q(f,"change",b.D,b);return f}
function Ng(b,c,d,e,f,g){if(b.c&&g&&!wc(b.c,g)){var h=b.bb(g);d=[c,d,e];c=b.lb.apply(b,d);if(ve(h,c))return h.get(c);var k=b.c;e=b.la(k);var l=b.la(g),m=Xe(b,d,g);b=new bm(k,e,g,l,d,m,b.mb(f),0,function(b,c,d,e){return fm(this,b,c,d,e,k)}.bind(b),b.S,!1);h.set(c,b);return b}return fm(b,c,d,e,f,g)}
function fm(b,c,d,e,f,g){var h=null,k=b.lb(c,d,e);if(ve(b.a,k)){if(h=b.a.get(k),""!=h.key){var l=h;h.a&&""==h.a.key?(h=h.a,2==l.N()&&(h.a=l)):(h=em(b,c,d,e,f,g),2==l.N()?h.a=l:l.a&&2==l.a.N()&&(h.a=l.a,l.a=null));h.a&&(h.a.a=null);b.a.replace(k,h)}}else h=em(b,c,d,e,f,g),b.a.set(k,h);return h}function dm(b,c){b.T().src=c};function gm(b){var c=void 0!==b.projection?b.projection:"EPSG:3857",d;if(void 0!==b.tileGrid)d=b.tileGrid;else{d={extent:Se(c),maxZoom:b.maxZoom,minZoom:b.minZoom,tileSize:b.tileSize};var e={};Wa(e,void 0!==d?d:{});void 0===e.extent&&(e.extent=lc("EPSG:3857").C());e.resolutions=Te(e.extent,e.maxZoom,e.tileSize);delete e.maxZoom;d=new Ee(e)}cm.call(this,{attributions:b.attributions,cacheSize:b.cacheSize,crossOrigin:b.crossOrigin,logo:b.logo,opaque:b.opaque,projection:c,reprojectionErrorThreshold:b.reprojectionErrorThreshold,
tileGrid:d,tileLoadFunction:b.tileLoadFunction,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:b.tileUrlFunction,url:b.url,urls:b.urls,wrapX:void 0!==b.wrapX?b.wrapX:!0})}M(gm,cm);function hm(b){b=b||{};var c;void 0!==b.attributions?c=b.attributions:c=[im];gm.call(this,{attributions:c,cacheSize:b.cacheSize,crossOrigin:void 0!==b.crossOrigin?b.crossOrigin:"anonymous",opaque:void 0!==b.opaque?b.opaque:!0,maxZoom:void 0!==b.maxZoom?b.maxZoom:19,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileLoadFunction:b.tileLoadFunction,url:void 0!==b.url?b.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",wrapX:b.wrapX})}M(hm,gm);var im=new jd({html:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});function jm(b){b=b||{};var c=km[b.layer];this.u=b.layer;gm.call(this,{attributions:c.attributions,cacheSize:b.cacheSize,crossOrigin:"anonymous",logo:"https://developer.mapquest.com/content/osm/mq_logo.png",maxZoom:c.maxZoom,reprojectionErrorThreshold:b.reprojectionErrorThreshold,opaque:c.opaque,tileLoadFunction:b.tileLoadFunction,url:void 0!==b.url?b.url:"https://otile{1-4}-s.mqcdn.com/tiles/1.0.0/"+this.u+"/{z}/{x}/{y}.jpg"})}M(jm,gm);
var lm=new jd({html:'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a>'}),km={osm:{maxZoom:19,opaque:!0,attributions:[lm,im]},sat:{maxZoom:18,opaque:!0,attributions:[lm,new jd({html:"Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency"})]},hyb:{maxZoom:18,opaque:!1,attributions:[lm,im]}};function mm(b){b=b||{};cm.call(this,{attributions:b.attributions,cacheSize:b.cacheSize,crossOrigin:b.crossOrigin,logo:b.logo,projection:b.projection,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction,url:b.url,urls:b.urls,wrapX:void 0!==b.wrapX?b.wrapX:!0});this.P=b.params||{};this.u=Jb()}M(mm,cm);mm.prototype.mb=function(b){return b};
mm.prototype.g=function(b,c,d){var e=this.tileGrid;e||(e=this.la(d));if(!(e.Mb().length<=b[0])){var f=Ie(e,b,this.u),g=tb(Oe(e,b[0]),this.h);1!=c&&(g=sb(g,c,this.h));e={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};Wa(e,this.P);var h;var k=this.urls;if(k){d=d.qa.split(":").pop();e.SIZE=g[0]+","+g[1];e.BBOX=f.join(",");e.BBOXSR=d;e.IMAGESR=d;e.DPI=Math.round(e.DPI?e.DPI*c:90*c);b=[(1==k.length?k[0]:k[Ea((b[1]<<b[0])+b[2],k.length)]).replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,
"ImageServer/exportImage")];for(h in e)El(h,e[h],b);b[1]&&(h=b[0],c=h.indexOf("#"),0<=c&&(b.push(h.substr(c)),b[0]=h=h.substr(0,c)),c=h.indexOf("?"),0>c?b[1]="?":c==h.length-1&&(b[1]=void 0));h=b.join("")}else h=void 0;return h}};F("ol.format.GeoJSON",Bl,OPENLAYERS);Bl.prototype.readFeatures=Bl.prototype.b;Bl.prototype.readFeature=Bl.prototype.g;F("ol.format.EsriJSON",vl,OPENLAYERS);vl.prototype.readFeatures=vl.prototype.b;vl.prototype.readFeature=vl.prototype.g;F("ol.style.Style",zi,OPENLAYERS);F("ol.style.Circle",yi,OPENLAYERS);F("ol.style.Fill",si,OPENLAYERS);F("ol.style.Stroke",xi,OPENLAYERS);F("ol.style.Icon",Pg,OPENLAYERS);F("ol.View",V,OPENLAYERS);V.prototype.on=V.prototype.ba;V.prototype.getZoom=V.prototype.vd;
V.prototype.setZoom=V.prototype.De;V.prototype.getCenter=V.prototype.ia;V.prototype.setCenter=V.prototype.oa;V.prototype.calculateExtent=V.prototype.jc;V.prototype.getProjection=V.prototype.ke;V.prototype.fit=V.prototype.md;F("ol.control.defaults",df,OPENLAYERS);F("ol.layer.Tile",X,OPENLAYERS);X.prototype.getVisible=X.prototype.cb;X.prototype.setVisible=X.prototype.Gc;X.prototype.getZIndex=X.prototype.Ub;X.prototype.setZIndex=X.prototype.Hc;X.prototype.getOpacity=X.prototype.Tb;
X.prototype.setOpacity=X.prototype.Fc;X.prototype.getSource=X.prototype.V;X.prototype.setSource=X.prototype.Yb;F("ol.layer.Vector",Y,OPENLAYERS);Y.prototype.getVisible=Y.prototype.cb;Y.prototype.setVisible=Y.prototype.Gc;Y.prototype.getSource=Y.prototype.V;Y.prototype.setStyle=Y.prototype.s;Y.prototype.getZIndex=Y.prototype.Ub;Y.prototype.setZIndex=Y.prototype.Hc;Y.prototype.getOpacity=Y.prototype.Tb;Y.prototype.setOpacity=Y.prototype.Fc;Y.prototype.getSource=Y.prototype.V;Y.prototype.setSource=Y.prototype.Yb;
F("ol.source.OSM",hm,OPENLAYERS);hm.prototype.refresh=hm.prototype.wa;F("ol.source.MapQuest",jm,OPENLAYERS);jm.prototype.refresh=jm.prototype.wa;F("ol.source.XYZ",gm,OPENLAYERS);gm.prototype.refresh=gm.prototype.wa;gm.prototype.setUrl=gm.prototype.s;gm.prototype.refresh=gm.prototype.wa;F("ol.Map",Z,OPENLAYERS);Z.prototype.on=Z.prototype.ba;Z.prototype.getTarget=Z.prototype.Sb;Z.prototype.getTargetElement=Z.prototype.ab;Z.prototype.getView=Z.prototype.O;Z.prototype.addOverlay=Z.prototype.kd;
Z.prototype.addLayer=Z.prototype.jd;Z.prototype.removeLayer=Z.prototype.ze;Z.prototype.getEventPixel=Z.prototype.vc;Z.prototype.hasFeatureAtPixel=Z.prototype.Sd;Z.prototype.getSize=Z.prototype.Oa;Z.prototype.updateSize=Z.prototype.$b;Z.prototype.forEachFeatureAtPixel=Z.prototype.od;Z.prototype.addInteraction=Z.prototype.hd;Z.prototype.removeInteraction=Z.prototype.ye;Z.prototype.beforeRender=Z.prototype.fa;F("ol.source.Vector",Lj,OPENLAYERS);Lj.prototype.getFeatures=Lj.prototype.oe;
Lj.prototype.getExtent=Lj.prototype.C;Lj.prototype.refresh=Lj.prototype.wa;Lj.prototype.addFeatures=Lj.prototype.Cb;Lj.prototype.addFeature=Lj.prototype.Bb;Lj.prototype.clear=Lj.prototype.clear;Lj.prototype.forEachFeature=Lj.prototype.nd;Lj.prototype.refresh=Lj.prototype.wa;F("ol.source.TileArcGISRest",mm,OPENLAYERS);mm.prototype.refresh=mm.prototype.wa;F("ol.Overlay",hl,OPENLAYERS);hl.prototype.setPosition=hl.prototype.Ec;F("ol.Feature",xj,OPENLAYERS);xj.prototype.getProperties=xj.prototype.za;
xj.prototype.setProperties=xj.prototype.l;xj.prototype.getGeometry=xj.prototype.M;F("ol.geom.Point",Mc,OPENLAYERS);Mc.prototype.transform=Mc.prototype.o;Mc.prototype.getCoordinates=Mc.prototype.ra;Mc.prototype.getExtent=Mc.prototype.C;F("ol.geom.Polygon",Tc,OPENLAYERS);Tc.prototype.getCoordinates=Tc.prototype.ra;Tc.prototype.getExtent=Tc.prototype.C;Tc.prototype.transform=Tc.prototype.o;F("ol.geom.LineString",rl,OPENLAYERS);rl.prototype.getCoordinates=rl.prototype.ra;rl.prototype.getExtent=rl.prototype.C;
rl.prototype.transform=rl.prototype.o;F("ol.proj.Projection",ic,OPENLAYERS);ic.prototype.getCode=ic.prototype.l;F("ol.interaction.Draw",Kl,OPENLAYERS);Kl.prototype.on=Kl.prototype.ba;F("ol.animation.pan",cd,OPENLAYERS);
  return OPENLAYERS.ol;
}));


},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ol = require('./ol-build');

exports.default = ol;

},{"./ol-build":31}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.undefinedOrNull = undefinedOrNull;
exports.definedAndNotNull = definedAndNotNull;

var _provide = require('./provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('util.checkDefined');

/**
 * check if the input is undefined or null
 * @param {*} input - input pointer
 * @returns {boolean} true undefined or null
 */
/**
 * Created by gavorhes on 12/11/2015.
 */
function undefinedOrNull(input) {
    "use strict";

    return typeof input === 'undefined' || input === null;
}

nm.undefinedOrNull = undefinedOrNull;

/**
 * check if the input is defined and not null
 * @param {*} input - input pointer
 * @returns {boolean} true defined and not null
 */
function definedAndNotNull(input) {
    "use strict";

    return !undefinedOrNull(input);
}

nm.definedAndNotNull = definedAndNotNull;

},{"./provide":35}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _provide = require('./provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('util');

/**
 * guids are used to uniquely identify groups and features
 * @returns {string} a new guid
 */
/**
 * Created by gavorhes on 11/3/2015.
 */

function makeGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}
nm.makeGuid = makeGuid;
exports.default = makeGuid;

},{"./provide":35}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by gavorhes on 12/10/2015.
 */

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

},{}],36:[function(require,module,exports){
'use strict';

var _PickerCollection = require('../app/collections/PickerCollection');

var _PickerCollection2 = _interopRequireDefault(_PickerCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by gavorhes on 5/12/2016.
 */

require('babel-polyfill/dist/polyfill.min');


new _PickerCollection2.default('container1');

},{"../app/collections/PickerCollection":2,"babel-polyfill/dist/polyfill.min":12}]},{},[36])


//# sourceMappingURL=selectBox.js.map
