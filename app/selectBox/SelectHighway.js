/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectBoxBase from './SelectBoxBase';
import {getHighways, getHwyByStartEndCounty} from '../ajaxGetters';
import provide from 'webmapsjs/src/util/provide';
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

            for (let h of d) {
                this.box.append(`<option>${h['name']}</option>`);
            }
            if (d) {
                if (hwy) {
                    this.box.val(hwy)
                } else {
                    this.box.trigger('change');

                }
            }
        });
    }

    /**
     *
     * @param {number|string|null} startId
     * @param {number|string|null} endId
     * @param {string|undefined} hwy
     */
    setStartEndCounty(startId, endId, hwy) {
        if (startId == null || startId == undefined || endId == null || endId == undefined) {
            return;
        }

        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');

        if (typeof startId == 'string') {
            startId = parseInt(startId);
        }

        if (typeof endId == 'string') {
            endId = parseInt(endId);
        }

        getHwyByStartEndCounty(startId, endId, (d) => {
            if (d.length > 0) {

                d.sort((a, b) => {
                    let aName = a['name'];
                    let bName = b['name'];

                    if (aName == bName) {

                        return 0;
                    } else {

                        return aName > bName ? 1 : -1;
                    }
                });
                
                for (let c of d) {
                    // this.box.append(`<option value="${c['id']}" ${c['primary'] ? 'selected' : ''}>${c['name']}</option>`);
                    this.box.append(`<option value="${c['name']}" ${c['primary'] ? 'selected' : ''}>${c['name']}</option>`);
                }

                if (hwy) {
                    this.box.val(hwy)
                } else {
                    this.box.trigger('change');
                }

            } else {
                this.box.prop('disabled', d.length == 0);
            }


        });
    }
}

nm.SelectHighway = SelectHighway;
export default SelectHighway;