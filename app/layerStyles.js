/**
 * Created by gavorhes on 5/13/2016.
 */
import ol from '../src/ol/ol';

export const segmentLayer = new ol.style.Style({
    stroke: new ol.style.Stroke({color: 'blue', width: 4})
});

export const fromColor = 'yellow';

export const segmentSelection = new ol.style.Style({
    stroke: new ol.style.Stroke({color: fromColor, width: 7})
});

export const toColor = 'orange';

export const segmentSelectionOther = new ol.style.Style({
    stroke: new ol.style.Stroke({color: toColor, width: 7})
});

/**
 *
 * @type {Array<string>}
 */
let returnedColors = [];
let colorOptions = ['#FF00FF', '#7FFF00', '#FA8072',
    '#FF6347', '#40E0D0', '#ADFF2F', '#6495ED',
    '#FF8C00', '#7FFFD4', '#DA70D6'];

/**
 * return a random color for styling
 * @returns {string}
 */
export function randomColor() {
    "use strict";
    if (returnedColors.length == colorOptions.length) {
        returnedColors = [];
    }
    while (true) {
        let c = colorOptions[Math.floor(parseInt(Math.random() * colorOptions.length))];
        if (returnedColors.indexOf(c) < 0) {
            returnedColors.push(c);

            return c;
        }
    }
}

export function layerConfigHelper(name, color, visible) {
    "use strict";

    return {
        minZoom: 4,
        name: name,
        transform: {dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857'},
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 5
            })
        }),
        visible: visible
    };
}

export const mmPopupContent = (props) => {
    let returnHtml = '<table class="mm-popup-table">';
    returnHtml += `<tr><td>PdpId</td><td>${props['pdpId']}</td></tr>`;
    returnHtml += `<tr><td>Hwy</td><td>${props['hwyDir']}</td></tr>`;
    returnHtml += `<tr><td>DivUnd</td><td>${props['divUnd']}</td></tr>`;
    returnHtml += `<tr><td>From</td><td>${props['pdpFrom']}</td></tr>`;
    returnHtml += `<tr><td>To</td><td>${props['pdpTo']}</td></tr>`;
    returnHtml += '</table>';
    return returnHtml;
};