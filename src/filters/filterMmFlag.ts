/**
 * Created by gavorhes on 7/14/2016.
 */
import FilterBase from './FilterBase';

export class FilterMmFlag extends FilterBase {

    constructor() {
        super('mm-flags', 'mm-flags-sub', true);
    }

    get mmRateFlagOn(): boolean {
        return this.valIsOn('rateFlag');
    }

    get mmKabFlagOn(): boolean {
        return this.valIsOn('kabCrshFlag');
    }

}

export default new FilterMmFlag();
