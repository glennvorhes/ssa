declare class CorridorConfig {
    startCounty: number;
    endCounty: number;
    hgwy: string;
    startRp: string;
    endRp: string;
    startPdp: number;
    endPdp: number;
    routeId: number;
    /**
     *
     * @param {jQuery|HTMLDivElement|*} inputElement
     */
    constructor(inputElement: any);
    /**
     * @returns {string} bootstrap formatted corridor description
     */
    bootstrapHtml(index: any): string;
}
export default CorridorConfig;
