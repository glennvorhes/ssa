/**
 * Created by gavorhes on 7/14/2016.
 */
import FilterBase from './FilterBase';

export class FilterCrash extends FilterBase {

    constructor() {
        super('filter-crash', 'filter-crash-sub', false);
    }

    /**
     *
     * @param {string} val - the lookup value
     * @returns {string|null} crash color or null if the crash type should be suppressed
     */
    getCrashColor(val) {
        let isActive = super.valIsOn(val);

        if (!isActive) {
            return null;
        }

        let color = {
            'K': 'rgb(255,0,0)',
            'A': 'rgb(255,165,0)',
            'B': 'rgb(255,255,0)',
            'C': 'rgb(153,255,153)',
            'P': 'rgb(0,0,255)'
        }[val];

        return color || 'rgb(128,128,128)';
    }
}

export default new FilterCrash();

