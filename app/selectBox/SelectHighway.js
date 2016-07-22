/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectBoxBase from './SelectBoxBase';
import Ajx from '../AjaxGetters';
import provide from 'webmapsjs/src/util/provide';
const nm = provide('ssa.select');

class SelectHighway extends SelectBoxBase {

    /**
     *
     * @param {jQuery} parent - parent element
     */
    constructor(parent) {
        super(parent, "Highway");
    }

    /**
     *
     * @param {number} countyId - county id
     * @param {string|undefined} [hwy=undefined] - route id for initial selection
     */
    setStartCounty(countyId, hwy) {
        hwy = typeof hwy == 'string' ? hwy : undefined;
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');

        Ajx.getHighways(countyId, (d) => {
            "use strict";

            for (let h of d) {
                this.box.append(`<option>${h['name']}</option>`);
            }
            if (d) {
                if (hwy) {
                    this.box.val(hwy);
                } else {
                    this.box.trigger('change');

                }
            }
        });
    }

    /**
     *
     * @param {number|string|null} startId - start county id
     * @param {number|string|null} endId - end county id
     * @param {number|string|null} [routeId=undefined] - route id for selection
     */
    setStartEndCounty(startId, endId, routeId) {

        if (startId == null || startId == undefined || endId == null) {
            return;
        }

        if (typeof routeId == 'number'){
            routeId = routeId.toFixed();
        }
        
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');

        if (typeof startId == 'string') {
            startId = parseInt(startId);
        }

        if (typeof endId == 'string') {
            endId = parseInt(endId);
        }

        if (typeof routeId == 'string') {
            routeId = parseInt(routeId);
        }

        Ajx.getHwyByStartEndCounty(startId, endId, (d) => {
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
                    this.box.append(`<option value="${c['id']}" ${c['primary'] ? 'selected' : ''}>${c['name']}</option>`);
                }

                if (routeId) {
                    this.box.val(routeId.toFixed());
                } else {
                    this.box.trigger('change');
                }
                this.box.prop('disabled', false);
            } else {
                this.box.prop('disabled', true);
                this.box.trigger('change');
                console.log(this.box.val());
            }

        });
    }
}

nm.SelectHighway = SelectHighway;
export default SelectHighway;
