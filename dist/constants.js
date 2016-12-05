/**
 * Created by gavorhes on 8/17/2016.
 */
"use strict";
exports.mmFlagListId = 'mm-deficiency-list';
exports.ccListId = 'cc-deficiency-list';
exports.pdpDataAttr = 'data-pdp-id';
exports.mmFlagColor = '#00FF00';
exports.controllingCriteriaColor = '#FFC632';
// export const contollingCriteriaLookup = {
//     'ccDesignSpeed': 'Design Speed',
//     'Grade': 'Grade',
//     'Lane Width': 'Lane Width',
//     'Stopping Sight Distance': 'Stopping Sight Distance',
//     'Shoulder Width': 'Shoulder Width',
//     'Pavement Cross Slope': 'Pavement Cross Slope',
//     'Horizontal Alignment': 'Horizontal Alignment',
//     'Vertical Clearance': 'Vertical Clearance',
//     'Superelevation': 'Superelevation',
//     'Structural Capacity': 'Structural Capacity'
// };
exports.propNames = ['ccDesignSpeed', 'ccLaneWidth', 'ccShoulderWidth', 'ccHorizontalCurve', 'ccSuperelevation',
    'ccMaximumGrade', 'ccStoppingSight', 'ccCrossSlope', 'ccVerticalClearance', 'ccDesignLoading'];
exports.propValues = ['Design Speed', 'Lane Width', 'Shoulder Width', 'Horizontal Alignment', 'Superelevation',
    'Grade', 'Stopping Sight Distance', 'Pavement Cross Slope', 'Vertical Clearance', 'Structural Capacity'];
exports.controllingCriteriaProps = {};
for (var i = 0; i < exports.propNames.length; i++) {
    exports.controllingCriteriaProps[exports.propNames[i]] = exports.propValues[i];
}
//# sourceMappingURL=constants.js.map