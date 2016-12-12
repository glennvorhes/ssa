import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import ol from 'custom-ol';
export interface CrashDataObject {
    pdpId: number;
    cumulMile: number;
    accdnmbr: string;
    doctnmbr: string;
    accDate: string;
    ntfyHour: number;
    county: string;
    municipality: string;
    munitype: string;
    onHwyRp: string;
    onHwyDir: string;
    onStr: string;
    athHwy: string;
    atStr: string;
    intDir: string;
    intDis: string;
    accdSvr: string;
    injSvr: string;
    totFatl: number;
    toInj: number;
    accdType: string;
    mnrColl: string;
    accdLoc: string;
    hwyClass: string;
    roadCond: string;
    wthrCond: string;
    consZone: string;
    alcFlag: string;
    bikeFlag: string;
    cyclFlag: string;
    pedFlag: string;
    totVeh: number;
    lon: number;
    lat: number;
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
     * @param m
     * @param ssaId
     * @param snapshot
     */
    init(m: ol.Map, ssaId: number, snapshot: number): void;
    _processCrashData(d: any): void;
    getCrashSummary(pdp: string | number): string;
}
declare var _default: CrashData;
export default _default;
