/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectCounty from './SelectCounty';
import {getStartCounties, getAllCounties} from '../ajaxGetters';
import provide from 'webmapsjs/src/util/provide';
const nm = provide('ssa.select');

class SelectStartCounty extends SelectCounty{

    /**
     *
     * @param {jQuery} parent
     */
    constructor(parent) {
        super(parent, "Start County");
        //
        // getAllCounties((d) => {
        //     for (let c of d) {
        //         this.box.append(`<option value="${c['id']}" ${c['primary'] ? 'selected' : ''}>${c['name']}</option>`)
        //     }
        //     this.box.trigger('change');
        // });
    }
}

nm.SelectStartCounty = SelectStartCounty;
export default SelectStartCounty;