/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare class FilterBase {
    _topCheck: JQuery;
    _subChecks: JQuery;
    _changeCallbacks: Array<Function>;
    _onValues: Array<string>;
    _allValues: Array<string>;
    /**
     *
     * @param {string} topCheckId - top checkbox id
     * @param {string} otherChecksClass - other checkbox class identifier
     * @param {boolean} defaultOn - is on by default
     */
    constructor(topCheckId: string, otherChecksClass: string, defaultOn: boolean);
    /**
     *
     * @param {function} f - function to call on change
     */
    addChangeCallback(f: any): void;
    /**
     *
     * @param {string} val - the value to check
     * @returns {boolean} - if the property is on
     */
    valIsOn(val: any): boolean;
    /**
     *
     * @param {boolean} isOn - if all are on of off
     * @param {boolean} [fire=true] - if the callbacks should be fired
     * @private
     */
    _setAllOnOff(isOn: any, fire?: boolean): void;
    _fireCallbacks(): void;
    /**
     * array of all values
     * @returns {Array<string>} all values available in the filter
     */
    readonly allValues: Array<string>;
}
export default FilterBase;
