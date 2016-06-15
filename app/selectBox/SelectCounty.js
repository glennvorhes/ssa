/**
 * Created by gavorhes on 6/14/2016.
 */


import SelectBoxBase from './SelectBoxBase';
import {getStartCounties, getAllCounties} from '../ajaxGetters';
import provide from 'webmapsjs/src/util/provide';
const nm = provide('ssa.select');

class SelectCounty extends SelectBoxBase{

    /**
     *
     * @param {jQuery} parent
     * @param {string} labelContent
     */
    constructor(parent, labelContent) {
        super(parent, labelContent);

        getAllCounties((d) => {
            for (let c of d) {
                this.box.append(`<option value="${c['id']}" ${c['primary'] ? 'selected' : ''}>${c['name']}</option>`)
            }
            this.box.trigger('change');
        });
    }
}

nm.SelectStartCounty = SelectCounty;
export default SelectCounty;