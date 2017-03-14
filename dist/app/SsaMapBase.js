/**
 * Created by gavorhes on 5/13/2016.
 */
"use strict";
var makeGuid_1 = require("webmapsjs/dist/util/makeGuid");
var provide_1 = require("webmapsjs/dist/util/provide");
var $ = require("jquery");
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
        this.$mainContainer.append("<div id=\"" + this._mapId + "\" class=\"ssa-main-map\"></div>");
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SsaMapBase;
//# sourceMappingURL=SsaMapBase.js.map