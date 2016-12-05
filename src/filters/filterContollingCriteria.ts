/**
 * Created by gavorhes on 7/14/2016.
 */
import FilterBase from './FilterBase';

export class FilterControllingCriteria extends FilterBase {

    constructor() {
        super('filter-controlling-criteria', 'filter-controlling-criteria-sub', true);
    }


    get ccDesignSpeedOn(): boolean {
        return this.valIsOn('ccDesignSpeed');
    }

    get ccLaneWidthOn(): boolean {
        return this.valIsOn('ccLaneWidth');
    }

    get ccShoulderWidthOn(): boolean {
        return this.valIsOn('ccShoulderWidth');
    }

    get ccHorizontalCurveOn(): boolean {
        return this.valIsOn('ccHorizontalCurve');
    }

    get ccSuperelevationOn(): boolean {
        return this.valIsOn('ccSuperelevation');
    }

    get ccMaximumGradeOn(): boolean {
        return this.valIsOn('ccMaximumGrade');
    }

    get ccStoppingSightOn(): boolean {
        return this.valIsOn('ccStoppingSight');
    }

    get ccCrossSlopeOn(): boolean {
        return this.valIsOn('ccCrossSlope');
    }

    get ccVerticalClearanceOn(): boolean {
        return this.valIsOn('ccVerticalClearance');
    }

    get ccDesignLoadingOn(): boolean {
        return this.valIsOn('ccDesignLoading');
    }
}

export default new FilterControllingCriteria();

