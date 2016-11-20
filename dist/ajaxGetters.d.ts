export interface ajaxCallback {
    (inObject: any[] | Object): any;
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
    static getStartCounties(callback: any): void;
    /**
     * Get the highways based on the start county
     * @param {number} startCountyId - start county id
     * @param {ajaxCallback} callback - callback function
     */
    static getHighways(startCountyId: any, callback: any): void;
    /**
     * Get the highways based on the start county
     * @param {string} highwayName - highway name
     * @param {ajaxCallback} callback - callback function
     */
    static getEndCounties(highwayName: any, callback: any): void;
    /**
     * get the segments based on county and route id
     * @param {number} county - county id
     * @param {number} routeId - route id
     * @param {ajaxCallback} callback - callback function
     */
    static getSegments(county: any, routeId: any, callback: any): void;
    /**
     * get corridor based on start and end pdp id
     * @param {number} startPdp - start pdp id
     * @param {number} endPdp - end pdp id
     * @param {ajaxCallback} callback - callback function
     */
    static getCorridor(startPdp: any, endPdp: any, callback: any): void;
    /**
     * Get the crash data
     * @param {ajaxCallback} callback - callback function
     */
    static getCrashes(callback: any): void;
    /**
     * Get all counties as an array
     * @param {ajaxCallback} callback - callback function
     */
    static getAllCounties(callback: any): void;
    /**
     * Get highways based on start and end counties
     * @param {number} startCountyId - start county id
     * @param {number} endCountyId - end county id
     * @param {ajaxCallback} callback - callback function
     *
     */
    static getHwyByStartEndCounty(startCountyId: any, endCountyId: any, callback: any): void;
    static getCcGeom(ssaId: number, snapshot: number, callback: any): void;
}
export default AjaxGetters;
