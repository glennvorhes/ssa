"use strict";
/**
 * Created by gavorhes on 5/16/2016.
 */
var provide_1 = require('webmapsjs/dist/util/provide');
// import * as styles  from '../layerStyles';
var mapPopup_1 = require('webmapsjs/dist/olHelpers/mapPopup');
var calcExtent = require('webmapsjs/dist/olHelpers/extentUtil');
var makeGuid_1 = require('webmapsjs/dist/util/makeGuid');
var CorridorConfig_1 = require('../corridor/CorridorConfig');
var Corridor_1 = require('../corridor/Corridor');
var $ = require('jquery');
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
            var returnHtml = '<table class="mm-popup-table">';
            returnHtml += "<tr><td>PdpId</td><td>" + props['pdpId'] + "</td></tr>";
            returnHtml += "<tr><td>Highway</td><td>" + props['hwyDir'] + "</td></tr>";
            returnHtml += "<tr><td>Description</td><td>" + (props['descrip'] ? props['descrip'] : '-') + "</td></tr>";
            returnHtml += "<tr><td>Divided</td><td>" + (props['divUnd'] == 'D' ? 'Yes' : 'No') + "</td></tr>";
            returnHtml += "<tr><td>From RP</td><td>" + props['pdpFrom'] + "</td></tr>";
            returnHtml += "<tr><td>To RP</td><td>" + props['pdpTo'] + "</td></tr>";
            returnHtml += '</table>';
            return returnHtml;
        };
    }
    /**
     * add a corridor
     * @param {Corridor} c - the corridor to be added
     */
    CorridorCollection.prototype.addCorridorCreate = function (c) {
        this._corridorArray.push(c);
        this._coridorLookup[c.clientId] = c;
        this._map.addLayer(c.olLayer);
        this._map.addLayer(c.nodeLayer.olLayer);
        c.layer.name = corridorName(c.rpFrom, c.rpTo);
        mapPopup_1.default.addVectorPopup(c.layer, this._popupStyle);
        this.refreshHtmlCreate();
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
            return calcExtent.calculateExtent(this._corridorArray);
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
        var $existingCorridors = $('.' + this._dataClass);
        var loadedCount = 0;
        // parse the data from the hidden input elements
        $existingCorridors.each(function (n, el) {
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
                    }
                }
            });
            corridor.setDbValues(conf);
            if (n == 0) {
                $('#primaryCounty').val(corridor.countyStart);
                $('#primaryRdwyRteId').val(corridor.routeId);
            }
            _this.addCorridorCreate(corridor);
        });
    };
    return CorridorCollection;
}());
exports.CorridorCollection = CorridorCollection;
nm.CorridorCollection = CorridorCollection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CorridorCollection;
//# sourceMappingURL=CorridorCollection.js.map