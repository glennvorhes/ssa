/**
 * Created by gavorhes on 7/14/2016.
 */
import FilterBase from './FilterBase';
export declare class FilterCrash extends FilterBase {
    constructor();
    /**
     *
     * @param {string} val - the lookup value
     * @returns {string|null} crash color or null if the crash type should be suppressed
     */
    getCrashColor(val: any): any;
}
declare var _default: FilterCrash;
export default _default;
