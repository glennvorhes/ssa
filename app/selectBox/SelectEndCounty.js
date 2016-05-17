/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectBoxBase from './SelectBoxBase';
import {getEndCounties} from '../ajaxGetters';
import provide from '../../src/util/provide';
const nm = provide('ssa.select');

class SelectEndCounty extends SelectBoxBase{

    /**
     *
     * @param {jQuery} parent
     */
    constructor(parent) {
        super(parent, "End County");
    }

    /**
     * set the county
     * @param {string} hwy
     * @param {number|undefined} [endCounty=undefined}
     */
    setHighway(hwy, endCounty){
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');

        endCounty = typeof endCounty == 'number' ? endCounty : undefined;

        getEndCounties(hwy, (d) => {
            for (let c of d){
                this.box.append(`<option value="${c['id']}">${c['name']}</option>`)
            }
            if (d){
                if (typeof endCounty == 'number'){
                    this.box.val(endCounty.toFixed());
                } else {
                    this.box.trigger('change');
                }
            }
        });
    }
}

nm.SelectEndCounty = SelectEndCounty;
export default SelectEndCounty;