"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 7/14/2016.
 */
var FilterBase_1 = require("./FilterBase");
var FilterCrash = (function (_super) {
    __extends(FilterCrash, _super);
    function FilterCrash() {
        return _super.call(this, 'filter-crash', 'filter-crash-sub', false) || this;
    }
    /**
     *
     * @param {string} val - the lookup value
     * @returns {string|null} crash color or null if the crash type should be suppressed
     */
    FilterCrash.prototype.getCrashColor = function (val) {
        var isActive = _super.prototype.valIsOn.call(this, val);
        if (!isActive) {
            return null;
        }
        var color = {
            'K': 'rgb(255,0,0)',
            'A': 'rgb(255,165,0)',
            'B': 'rgb(255,255,0)',
            'C': 'rgb(153,255,153)',
            'P': 'rgb(0,0,255)'
        }[val];
        return color || 'rgb(128,128,128)';
    };
    return FilterCrash;
}(FilterBase_1.default));
exports.FilterCrash = FilterCrash;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new FilterCrash();
//# sourceMappingURL=filterCrash.js.map