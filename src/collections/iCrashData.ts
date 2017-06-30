/**
 * Created by glenn on 6/30/2017.
 */

interface CrashDataObject {
    pdpId: number;
    cumulMile: number;
    accdnmbr: string;

    doctnmbr: string;
    // multiflag: string;
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

export default CrashDataObject;