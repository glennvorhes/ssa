import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import ol from 'custom-ol';
export interface CrashDataObject {
    cumulMile: number;
    mnrColl: string;
    deer: boolean;
    lon: number;
    lat: number;
    time: string;
    injSvr: string;
    dte: string;
}
export declare class CrashData {
    pointCrashes: LayerBaseVectorGeoJson;
    _crashHtmlLookup: {
        [s: string]: string;
    };
    _crashArrayLookup: {
        [s: string]: Array<CrashDataObject>;
    };
    constructor();
    /**
     *
     * @param {ol.Map} m - the main map
     */
    init(m: ol.Map, ssaId: number, snapshot: number): void;
    _processCrashData(d: any): void;
    getCrashSummary(pdp: any): string;
}
declare var _default: CrashData;
export default _default;
