import DeficiencyBase from './_DeficiencyBase';
import ol = require('custom-ol');
export declare class MmFlags extends DeficiencyBase {
    constructor();
    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     */
    init(m: ol.Map): void;
    /**
     *
     * @param {Corridor} c - the corridor to be added
     */
    addCorridor(c: any): void;
}
declare var _default: MmFlags;
export default _default;
