/**
 * Created by gavorhes on 7/14/2016.
 */
import FilterBase from './FilterBase';
export declare class FilterControllingCriteria extends FilterBase {
    constructor();
    readonly ccDesignSpeedOn: boolean;
    readonly ccLaneWidthOn: boolean;
    readonly ccShoulderWidthOn: boolean;
    readonly ccHorizontalCurveOn: boolean;
    readonly ccSuperelevationOn: boolean;
    readonly ccMaximumGradeOn: boolean;
    readonly ccStoppingSightOn: boolean;
    readonly ccCrossSlopeOn: boolean;
    readonly ccVerticalClearanceOn: boolean;
    readonly ccDesignLoadingOn: boolean;
}
declare var _default: FilterControllingCriteria;
export default _default;
