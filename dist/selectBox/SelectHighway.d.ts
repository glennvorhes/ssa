/**
 * Created by gavorhes on 5/12/2016.
 */
import SelectBoxBase from 'webmapsjs/dist/domUtil/SelectBoxBase';
export declare class SelectHighway extends SelectBoxBase {
    /**
     *
     * @param {jQuery} parent - parent element
     */
    constructor(parent: any);
    /**
     *
     * @param {number|string|null} startId - start county id
     * @param {number|string|null} endId - end county id
     * @param {number|string|null} [routeId=undefined] - route id for selection
     * @param {boolean} [forceTrigger=false] - force change trigger to populate the rp pickers
     */
    setStartEndCounty(startId: number | string, endId: number | string, routeId?: number | string, forceTrigger?: boolean): void;
}
export default SelectHighway;
