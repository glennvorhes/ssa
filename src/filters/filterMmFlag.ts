/**
 * Created by gavorhes on 7/14/2016.
 */
import FilterBase from './FilterBase';

export class FilterMmFlag extends FilterBase {

    constructor() {
        super('mm-flags', 'mm-flags-sub', true);
    }

    get mmRateFlagOn() {
        return this.valIsOn('mm-rate-flag');
    }

    get mmKabFlagOn() {
        return this.valIsOn('mm-kab-flag');
    }

}

export default new FilterMmFlag();
