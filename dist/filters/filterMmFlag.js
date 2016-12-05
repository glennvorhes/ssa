"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 7/14/2016.
 */
var FilterBase_1 = require('./FilterBase');
var FilterMmFlag = (function (_super) {
    __extends(FilterMmFlag, _super);
    function FilterMmFlag() {
        _super.call(this, 'mm-flags', 'mm-flags-sub', true);
    }
    Object.defineProperty(FilterMmFlag.prototype, "mmRateFlagOn", {
        get: function () {
            return this.valIsOn('rateFlag');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMmFlag.prototype, "mmKabFlagOn", {
        get: function () {
            return this.valIsOn('kabCrshFlag');
        },
        enumerable: true,
        configurable: true
    });
    return FilterMmFlag;
}(FilterBase_1.default));
exports.FilterMmFlag = FilterMmFlag;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new FilterMmFlag();
//# sourceMappingURL=filterMmFlag.js.map