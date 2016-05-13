/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectBoxBase from './SelectBoxBase';
import {getStartCounties} from '../ajaxGetters';
import provide from '../../src/util/provide';
const nm = provide('ssa.select');

class SelectStartCounty extends SelectBoxBase{

    /**
     *
     * @param {jQuery} parent
     */
    constructor(parent) {
        super(parent, "Start County");

        getStartCounties((d) => {
            for (let c of d) {
                this.box.append(`<option value="${c['id']}">${c['name']}</option>`)
            }
            this.box.trigger('change');
        })
    }
}

nm.SelectStartCounty = SelectStartCounty;
export default SelectStartCounty;