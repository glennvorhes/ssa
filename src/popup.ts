/**
 * Created by glenn on 6/30/2017.
 */
import iCrashData from './collections/iCrashData';

const crashReportURl = 'https://transportal.cee.wisc.edu/applications/crash-reports/retrieveCrashReport.do?doctnmbr=';

export const mmPopupContent = (props: Object) => {

    let returnHtml = '<table class="mm-popup-table">';
    returnHtml += `<tr><td>PdpId</td><td>${props['pdpId']}</td></tr>`;
    returnHtml += `<tr><td>Highway</td><td>${props['stdName']}</td></tr>`;
    returnHtml += `<tr><td>Description</td><td>${props['rpDesc'] ? props['rpDesc'] : '-'}</td></tr>`;
    returnHtml += `<tr><td>Divided</td><td>${props['divUnd']}</td></tr>`;
    returnHtml += `<tr><td>From RP</td><td>${props['startRp']}</td></tr>`;
    returnHtml += `<tr><td>To RP</td><td>${props['endRp']}</td></tr>`;
    returnHtml += '</table>';

    return returnHtml;
};

const crashProps = [
    'doctnmbr',
    // 'multiflag',
    'accDate',
    'ntfyHour',
    'county',
    'municipality',
    'munitype',
    'onHwyRp',
    'onHwyDir',
    'onStr',
    'athHwy',
    'atStr',
    'intDir',
    'intDis',
    'accdSvr',
    'injSvr',
    'totFatl',
    'toInj',
    'accdType',
    'mnrColl',
    'accdLoc',
    'hwyClass',
    'roadCond',
    'wthrCond',
    'consZone',
    'alcFlag',
    'bikeFlag',
    'cyclFlag',
    'pedFlag',
    'totVeh',
    'lon',
    'lat'
];




function injColor(inj: string): string {
    "use strict";

    let color = {
        'K': 'rgb(255,0,0)',
        'A': 'rgb(255,165,0)',
        'B': 'rgb(255,255,0)',
        'C': 'rgb(153,255,153)',
        'P': 'rgb(141,227,230)'
    }[inj];

    return color || 'rgba(255,255,255,0)';
}



function processVal(v) {
    if (v == null || typeof v == 'undefined') {
        return '';
    } else {
        return v;
    }
}


export const crashPointPopup = (props: { [s: string]: any }): string => {
    let returnHtml = '<table class="crash-popup-table">';

    for (let i = 0; i < crashProps.length; i++) {
        let p = crashProps[i];
        let v = processVal(props[p]);

        if (i == 0){
            v = `<a title="Download Crash Report" target="_blank" href="${crashReportURl}${v}">${v}</a>`;
        }

        returnHtml += `<tr><td>${p}</td><td>${v}</td></tr>`;
    }
    returnHtml += '</table>';

    return returnHtml;
};


/**
 *
 * @param {Array<CrashDataObject>} crashData - array of crash data
 * @returns {string} crash summary table html
 * @private
 */
export function crashInfoHelper(crashData: Array<iCrashData>): string {
    "use strict";
    crashData.sort(function (a, b) {
        let dteA = (new Date(a['dte'] + ' ' + a['time'])).getTime();
        let dteB = (new Date(b['dte'] + ' ' + b['time'])).getTime();

        if (dteA == dteB) {
            return 0;
        } else {
            return dteA > dteB ? -1 : 1;
        }
    });

    let returnHtml = '';
    returnHtml += '<ul class="crash-list">';

    let crashSummary = {};

    for (let c of crashData) {

        if (typeof crashSummary[c.injSvr] == 'undefined') {
            crashSummary[c.injSvr] = 1;
        } else {
            crashSummary[c.injSvr]++;
        }


        returnHtml += `<li style="background-color: ${injColor(c.injSvr)};">`;
        returnHtml += `<a title="Download Crash Report" target="_blank" href="${crashReportURl}${c.doctnmbr}"></a>`;
        returnHtml += c.accDate ? c.accDate : '';

        if (c.mnrColl) {
            returnHtml += ', ' + c.mnrColl;
        }

        if (c.injSvr) {
            returnHtml += ', ' + c.injSvr;
        }

        returnHtml += '</li>';
    }
    returnHtml += '</ul>';

    let crashType = {
        'K': 'Fatal',
        'A': 'Incapacitating',
        'B': 'Non-incapacitating',
        'C': 'Possible Injury',
        'P': 'Property Damage'
    };

    let tableContent = '<table class="crash-summary-table">';
    tableContent += `<tr><th colspan="2">Crash Summary</th></tr>`;
    tableContent += `<tr><td>Total</td><td>${crashData.length}</td></tr>`;

    if (crashData.length > 0) {
        for (let k of ['K', 'A', 'B', 'C', 'P']) {
            if (typeof crashSummary[k] != 'undefined') {
                tableContent += `<tr><td>${crashType[k]}</td><td>${crashSummary[k]}</td></tr>`;
            }
        }
    }

    tableContent += '</table>';
    returnHtml = tableContent + returnHtml;

    return returnHtml;
}
