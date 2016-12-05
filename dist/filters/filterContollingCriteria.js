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
    Object.defineProperty(FilterControllingCriteria.prototype, "ccDesignSpeedOn", {
        get: function () {
            return this.valIsOn('ccDesignSpeed');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccLaneWidthOn", {
        get: function () {
            return this.valIsOn('ccLaneWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccShoulderWidthOn", {
        get: function () {
            return this.valIsOn('ccShoulderWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccHorizontalCurveOn", {
        get: function () {
            return this.valIsOn('ccHorizontalCurve');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccSuperelevationOn", {
        get: function () {
            return this.valIsOn('ccSuperelevation');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccMaximumGradeOn", {
        get: function () {
            return this.valIsOn('ccMaximumGrade');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccStoppingSightOn", {
        get: function () {
            return this.valIsOn('ccStoppingSight');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccCrossSlopeOn", {
        get: function () {
            return this.valIsOn('ccCrossSlope');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccVerticalClearanceOn", {
        get: function () {
            return this.valIsOn('ccVerticalClearance');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterControllingCriteria.prototype, "ccDesignLoadingOn", {
        get: function () {
            return this.valIsOn('ccDesignLoading');
        },
        enumerable: true,
        configurable: true
    });
    return FilterControllingCriteria;
}(FilterBase_1.default));
exports.FilterControllingCriteria = FilterControllingCriteria;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new FilterControllingCriteria();
//# sourceMappingURL=filterContollingCriteria.js.map