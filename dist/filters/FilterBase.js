/**
 * Created by gavorhes on 7/13/2016.
 */
"use strict";
var provide_1 = require('webmapsjs/dist/util/provide');
var $ = require('jquery');
var nm = provide_1.default('ssa');
var FilterBase = (function () {
    /**
     *
     * @param {string} topCheckId - top checkbox id
     * @param {string} otherChecksClass - other checkbox class identifier
     * @param {boolean} defaultOn - is on by default
     */
    function FilterBase(topCheckId, otherChecksClass, defaultOn) {
        var _this = this;
        this._topCheck = $('#' + topCheckId);
        this._subChecks = $('.' + otherChecksClass);
        /**
         *
         * @type {Array<function>}
         * @private
         */
        this._changeCallbacks = [];
        /**
         *
         * @type {Array<string>}
         */
        this._onValues = [];
        /**
         *
         * @type {Array<string>}
         */
        this._allValues = [];
        this._subChecks.each(function (ix, /** @type {HTMLElement} */ el) {
            _this._allValues.push($(el).val());
        });
        this._topCheck.prop('checked', defaultOn);
        this._setAllOnOff(defaultOn);
        this._topCheck.change(function () {
            _this._setAllOnOff(_this._topCheck.prop('checked'));
        });
        var __this = this;
        this._subChecks.change(function () {
            var $el = $(this);
            var theVal = $el.val();
            var isChecked = $el.prop('checked');
            var ix = __this._onValues.indexOf(theVal);
            if (isChecked && ix == -1) {
                __this._onValues.push(theVal);
            }
            else if (!isChecked && ix != -1) {
                __this._onValues.splice(ix, 1);
            }
            __this._topCheck.prop('checked', __this._onValues.length == __this._allValues.length);
            __this._fireCallbacks();
        });
    }
    /**
     *
     * @param {function} f - function to call on change
     */
    FilterBase.prototype.addChangeCallback = function (f) {
        this._changeCallbacks.push(f);
    };
    /**
     *
     * @param {string} val - the value to check
     * @returns {boolean} - if the property is on
     */
    FilterBase.prototype.valIsOn = function (val) {
        return this._onValues.indexOf(val) > -1;
    };
    /**
     *
     * @param {boolean} isOn - if all are on of off
     * @param {boolean} [fire=true] - if the callbacks should be fired
     * @private
     */
    FilterBase.prototype._setAllOnOff = function (isOn, fire) {
        if (fire === void 0) { fire = true; }
        this._subChecks.prop('checked', isOn);
        this._onValues = [];
        if (isOn) {
            for (var _i = 0, _a = this._allValues; _i < _a.length; _i++) {
                var v = _a[_i];
                this._onValues.push(v);
            }
        }
        if (fire) {
            this._fireCallbacks();
        }
    };
    FilterBase.prototype._fireCallbacks = function () {
        for (var _i = 0, _a = this._changeCallbacks; _i < _a.length; _i++) {
            var f = _a[_i];
            f();
        }
    };
    Object.defineProperty(FilterBase.prototype, "allValues", {
        /**
         * array of all values
         * @returns {Array<string>} all values available in the filter
         */
        get: function () {
            var outArray = [];
            for (var _i = 0, _a = this._allValues; _i < _a.length; _i++) {
                var v = _a[_i];
                outArray.push(v);
            }
            return outArray;
        },
        enumerable: true,
        configurable: true
    });
    return FilterBase;
}());
nm.FilterBase = FilterBase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FilterBase;
//# sourceMappingURL=FilterBase.js.map