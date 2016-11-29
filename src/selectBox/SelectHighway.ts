/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectBoxBase from 'webmapsjs/dist/domUtil/SelectBoxBase';
import Ajx from '../ajaxGetters';
import provide from 'webmapsjs/dist/util/provide';
const nm = provide('ssa.select');

export class SelectHighway extends SelectBoxBase {

    /**
     *
     * @param {jQuery} parent - parent element
     */
    constructor(parent) {
        super(parent, "Highway");
    }

    // /**
    //  *
    //  * @param {number} countyId - county id
    //  * @param {string|undefined} [hwy=undefined] - route id for initial selection
    //  */
    // setStartCounty(countyId, hwy) {
    //     hwy = typeof hwy == 'string' ? hwy : undefined;
    //     this.box.html('');
    //     this.box.addClass('refresh').removeClass('refresh');
    //
    //     Ajx.getHighways(countyId, (d) => {
    //         "use strict";
    //
    //         for (let h of d) {
    //             this.box.append(`<option>${h['name']}</option>`);
    //         }
    //         if (d) {
    //             if (hwy) {
    //                 this.box.val(hwy);
    //             } else {
    //                 this.box.trigger('change');
    //
    //             }
    //         }
    //     });
    // }

    /**
     *
     * @param {number|string|null} startId - start county id
     * @param {number|string|null} endId - end county id
     * @param {number|string|null} [routeId=undefined] - route id for selection
     * @param {boolean} [forceTrigger=false] - force change trigger to populate the rp pickers
     */
    setStartEndCounty(startId: number|string, endId: number|string, routeId?: number|string, forceTrigger = false) {

        forceTrigger = typeof forceTrigger == 'boolean' ? forceTrigger : false;

        if (startId == null || startId == undefined || endId == null) {
            return;
        }

        if (typeof routeId == 'number'){
            routeId = (routeId as number).toFixed();
        }
        
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');

        if (typeof startId == 'string') {
            startId = parseInt(startId as string);
        }

        if (typeof endId == 'string') {
            endId = parseInt(endId as string);
        }

        if (typeof routeId == 'string') {
            routeId = parseInt(routeId as string);
        }

        Ajx.getHwyByStartEndCounty(startId as number, endId as number, (d) => {
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
                    this.box.val((routeId as number).toFixed());
                }

                if (!routeId || forceTrigger) {
                    this.box.trigger('change');
                }

                this.box.prop('disabled', false);
            } else {
                this.box.prop('disabled', true);
                this.box.trigger('change');
            }
        });
    }
}

nm.SelectHighway = SelectHighway;
export default SelectHighway;
