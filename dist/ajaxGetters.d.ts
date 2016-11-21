export interface ajaxCallback {
    (inObject: any): any;
}
/**
 * static methods to make ajax requests
 */
export declare class AjaxGetters {
    /**
     * Do not instantiate this class - only static methods
     */
    constructor();
    /**
     * @static
     * @param {ajaxCallback} callback - callback function
     */
    static getStartCounties(callback: ajaxCallback): void;
    /**
     * Get the highways based on the start county
     * @param {number} startCountyId - start county id
     * @param {ajaxCallback} callback - callback function
     */
    static getHighways(startCountyId: number, callback: ajaxCallback): void;
    /**
     * Get the highways based on the start county
     * @param {string} highwayName - highway name
     * @param {ajaxCallback} callback - callback function
     */
    static getEndCounties(highwayName: string, callback: ajaxCallback): void;
    /**
     * get the segments based on county and route id
     * @param {number} county - county id
     * @param {number} routeId - route id
     * @param {ajaxCallback} callback - callback function
     */
    static getSegments(county: number, routeId: string | number, callback: ajaxCallback): void;
    /**
     * get corridor based on start and end pdp id
     * @param {number} startPdp - start pdp id
     * @param {number} endPdp - end pdp id
     * @param {ajaxCallback} callback - callback function
     */
    static getCorridor(startPdp: number, endPdp: number, callback: ajaxCallback): void;
    /**
     * Get the crash data
     * @param {number} ssaId
     * @param {number} snapshot
     * @param {ajaxCallback} callback - callback function
     */
    static getCrashes(ssaId: number, snapshot: number, callback: ajaxCallback): void;
    /**
     * Get all counties as an array
     * @param {ajaxCallback} callback - callback function
     */
    static getAllCounties(callback: ajaxCallback): void;
    /**
     * Get highways based on start and end counties
     * @param {number} startCountyId - start county id
     * @param {number} endCountyId - end county id
     * @param {ajaxCallback} callback - callback function
     *
     */
    static getHwyByStartEndCounty(startCountyId: number, endCountyId: number, callback: ajaxCallback): void;
    static getCcGeom(ssaId: number, snapshot: number, callback: ajaxCallback): void;
}
export default AjaxGetters;
