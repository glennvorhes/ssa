/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectBoxBase from './SelectBoxBase';
import {getHighways} from '../ajaxGetters';
import provide from '../../src/util/provide';
const nm = provide('ssa.select');

class SelectHighway extends SelectBoxBase {

    /**
     *
     * @param {jQuery} parent
     */
    constructor(parent) {
        super(parent, "Highway");
    }

    /**
     *
     * @param {number} countyId
     * @param {string|undefined} [hwy=undefined]
     */
    setStartCounty(countyId, hwy) {
        hwy = typeof hwy == 'string' ? hwy : undefined;
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');
        
        getHighways(countyId, (d) => {
            "use strict";
            
            for (let h of d){
                this.box.append(`<option>${h['name']}</option>`);
            }
            if (d) {
                if (hwy){
                    this.box.val(hwy)
                } else {
                    this.box.trigger('change');
                    
                }
            }
        });
    }
}

nm.SelectHighway = SelectHighway;
export default SelectHighway;