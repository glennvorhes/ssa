/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectCounty from './SelectCounty';
import {getEndCounties} from '../AjaxGetters';
import provide from 'webmapsjs/src/util/provide';
const nm = provide('ssa.select');

class SelectEndCounty extends SelectCounty {

    /**
     *
     * @param {jQuery} parent
     */
    constructor(parent) {
        super(parent, "End County");

        // getAllCounties((d) => {
        //     for (let c of d) {
        //         this.box.append(`<option value="${c['id']}" ${c['primary'] ? 'selected' : ''}>${c['name']}</option>`)
        //     }
        //     this.box.trigger('change');
        // });
    }

    /**
     * set the county
     * @param {string} hwy
     * @param {number|undefined} [endCounty=undefined}
     */
    setHighway(hwy, endCounty) {
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');

        endCounty = typeof endCounty == 'number' ? endCounty : undefined;

        getEndCounties(hwy, (d) => {
            for (let c of d) {
                this.box.append(`<option value="${c['id']}">${c['name']}</option>`)
            }
            if (d) {
                if (typeof endCounty == 'number') {
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