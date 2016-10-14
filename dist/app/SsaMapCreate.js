/**
 * Created by gavorhes on 5/13/2016.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SsaMapBase_1 = require('./SsaMapBase');
var quickMap_1 = require('webmapsjs/dist/olHelpers/quickMap');
var mapPopup_1 = require('webmapsjs/dist/olHelpers/mapPopup');
var makeGuid_1 = require('webmapsjs/dist/util/makeGuid');
var provide_1 = require('webmapsjs/dist/util/provide');
var PickerCollection_1 = require('../collections/PickerCollection');
var CorridorCollection_1 = require('../collections/CorridorCollection');
var $ = require('jquery');
require('jquery-ui');
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
        var _this = this;
        _super.call(this, divId);
        this.$mainContainer.prepend("<div class=\"ssa-map-sidebar\"></div>");
        this.mainMap = quickMap_1.default({
            divId: this.mapId,
            minZoom: 6,
            zoom: 6,
            fullScreen: true
        });
        /**
         * @type {MapPopupCls}
         */
        this.mainMapPopup = mapPopup_1.default;
        this.$sideBar = this.$mainContainer.find('.ssa-map-sidebar');
        var afterChange = function () {
            _this._afterChange();
        };
        this.pickerCollection = new PickerCollection_1.default(this.$sideBar, this.mainMap);
        var corridorsGuid = makeGuid_1.default();
        this.$sideBar.append("<div id=\"" + corridorsGuid + "\"></div>");
        this.corridorCollection = new CorridorCollection_1.default(this.$sideBar, this.mainMap, corridorDataContainer, afterChange, dataClass);
        this.pickerCollection.corridorCollection = this.corridorCollection;
        this.corridorCollection.loadExistingCorridors();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SsaMapCreate;
//# sourceMappingURL=SsaMapCreate.js.map