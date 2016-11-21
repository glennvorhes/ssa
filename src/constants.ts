/**
 * Created by gavorhes on 8/17/2016.
 */


export const mmFlagListId = 'mm-deficiency-list';
export const ccListId = 'cc-deficiency-list';
export const pdpDataAttr = 'data-pdp-id';
export const mmFlagColor = '#00FF00';
export const controllingCriteriaColor = '#FFC632';

export const contollingCriteriaLookup = {
    'Design Speed': 'Design Speed',
    'Grade': 'Grade',
    'Lane Width': 'Lane Width',
    'Stopping Sight Distance': 'Stopping Sight Distance',
    'Shoulder Width': 'Shoulder Width',
    'Pavement Cross Slope': 'Pavement Cross Slope',
    'Horizontal Alignment': 'Horizontal Alignment',
    'Vertical Clearance': 'Vertical Clearance',
    'Superelevation': 'Superelevation',
    'Structural Capacity': 'Structural Capacity'
};

export const propNames = ['ccDesignSpeed', 'ccLaneWidth', 'ccShoulderWidth', 'ccHorizontalCurve', 'ccSuperelevation',
        'ccMaximumGrade', 'ccStoppingSight', 'ccCrossSlope', 'ccVerticalClearance', 'ccDesignLoading'];

export const propValues = ['Design Speed', 'Lane Width', 'Shoulder Width', 'Horizontal Alignment', 'Superelevation',
        'Grade', 'Stopping Sight Distance', 'Pavement Cross Slope', 'Vertical Clearance', 'Structural Capacity'];

export const controllingCriteriaProps = {};


for (let i = 0; i < propNames.length; i++){
    controllingCriteriaProps[propNames[i]] = propValues[i];
}

