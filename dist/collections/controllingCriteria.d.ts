import DeficiencyBase from './_DeficiencyBase';
export declare class ControllingCriteria extends DeficiencyBase {
    static propNames: string[];
    constructor();
    /**
     * initialize with the map
     * @param {ol.Map} m - the ol map
     */
    init(m: any): void;
    /**
     *
     * @param {Corridor} c - the corridor to be added
     */
    addCorridor(c: any): void;
}
declare var _default: ControllingCriteria;
export default _default;
