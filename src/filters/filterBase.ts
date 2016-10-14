/**
 * Created by gavorhes on 7/13/2016.
 */

import provide from 'webmapsjs/dist/util/provide';
import $ = require('jquery');
const nm = provide('ssa');

class FilterBase {
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
    constructor(topCheckId: string, otherChecksClass: string, defaultOn: boolean) {
        this._topCheck = $('#' + topCheckId);

        this._subChecks = $('.' + otherChecksClass);

        /**
         *
         * @type {Array<function>}
         * @private
         */
        this._changeCallbacks = [];

        /**
         *
         * @type {Array<string>}
         */
        this._onValues = [];

        /**
         *
         * @type {Array<string>}
         */
        this._allValues = [];

        this._subChecks.each((ix, /** @type {HTMLElement} */ el) => {
            this._allValues.push($(el).val());
        });

        this._topCheck.prop('checked', defaultOn);
        this._setAllOnOff(defaultOn);

        this._topCheck.change(() => {
            this._setAllOnOff(this._topCheck.prop('checked'));
        });

        let __this = this;
        this._subChecks.change(function () {
            let $el = $(this);
            let theVal = $el.val();
            let isChecked = $el.prop('checked');
            let ix = __this._onValues.indexOf(theVal);

            if (isChecked && ix == -1){
                __this._onValues.push(theVal);
            } else if (!isChecked && ix != -1){
                __this._onValues.splice(ix, 1);
            }

            __this._topCheck.prop('checked', __this._onValues.length == __this._allValues.length);

            __this._fireCallbacks();
        });
    }


    /**
     *
     * @param {function} f - function to call on change
     */
    addChangeCallback(f) {
        this._changeCallbacks.push(f);
    }

    /**
     *
     * @param {string} val - the value to check
     * @returns {boolean} - if the property is on
     */
    valIsOn(val){
        return this._onValues.indexOf(val) > -1;
    }



    /**
     *
     * @param {boolean} isOn - if all are on of off
     * @param {boolean} [fire=true] - if the callbacks should be fired
     * @private
     */
    _setAllOnOff(isOn, fire = true) {

        this._subChecks.prop('checked', isOn);
        this._onValues = [];

        if (isOn) {
            for (let v of this._allValues) {
                this._onValues.push(v);
            }
        }

        if (fire) {
            this._fireCallbacks();
        }

    }

    _fireCallbacks() {
        for (let f of this._changeCallbacks) {
            f();
        }
    }

    /**
     * array of all values
     * @returns {Array<string>} all values available in the filter
     */
    get allValues(): Array<string>{
        let outArray = [];
        for (let v of this._allValues){
            outArray.push(v);
        }
        return outArray;
    }
}

nm.FilterBase = FilterBase;
export default FilterBase;

