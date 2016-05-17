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
 * @type {Array}
 */
let returnedColors = [];
let colorOptions = ['Aquamarine', 'Chartreuse', 'CornflowerBlue', 'Cyan', 'DarkOrange', 'DeepSkyBlue', 'GreenYellow',
    'Salmon', 'Magenta', 'Orchid', 'Turquoise ', 'Tomato'];

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