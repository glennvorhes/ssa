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
var FilterControllingCriteria = (function (_super) {
    __extends(FilterControllingCriteria, _super);
    function FilterControllingCriteria() {
        _super.call(this, 'filter-controlling-criteria', 'filter-controlling-criteria-sub', true);
    }
    return FilterControllingCriteria;
}(FilterBase_1.default));
exports.FilterControllingCriteria = FilterControllingCriteria;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new FilterControllingCriteria();
//# sourceMappingURL=filterContollingCriteria.js.map