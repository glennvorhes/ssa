/**
 * Created by gavorhes on 5/13/2016.
 */

import ol = require('custom-ol');

import {proj3857} from "webmapsjs/dist/olHelpers/projections";
import {LayerBaseVectorGeoJsonOptions} from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import filterCrash from './filters/filterCrash';
import * as colorUtil from 'webmapsjs/dist/util/colors';



export const segmentLayer = new ol.style.Style({
    stroke: new ol.style.Stroke({color: 'darkblue', width: 5})
});

export const fromSelectionColor = '#48FD14';
export const toSelectionColor = '#EE0071';
export const corridorPreviewColor = 'black';

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
export function randomColor(): string {
    "use strict";
    if (returnedColors.length == colorOptions.length) {
        returnedColors = [];
    }
    while (true) {
        let c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        if (returnedColors.indexOf(c) < 0) {
            returnedColors.push(c);

            return c;
        }
    }
}

/**
 *
 * @param name
 * @param color
 * @param visible
 * @returns {{minZoom: number, name: *, transform: {dataProjection: string, featureProjection: string}, style: ol.style.Style, visible: *}}
 */
export function layerConfigHelper(name: string, color: string, visible: boolean): LayerBaseVectorGeoJsonOptions{
    "use strict";
    return {
        minZoom: 4,
        name: name,
        transform: {dataProjection: proj3857, featureProjection: proj3857},
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 6
            })
        }),
        visible: visible
    };
}


export const segNodeStyle = new ol.style.Style({
    image: new ol.style.RegularShape({
        radius: 6,
        points: 4,
        fill: new ol.style.Fill({
            color: 'rgb(0, 0, 0)'
        }),
        stroke: new ol.style.Stroke({color: 'rgb(0, 0, 0', width: 2})
    })
});


/**
 *
 * @param  feature - the input feature
 * @returns return style or null
 */
export const crashPointStyle = (feature: ol.Feature): ol.style.Style[] => {
    "use strict";

    let props = feature.getProperties();

    let crashColor = filterCrash.getCrashColor(props['injSvr']);
    if (!crashColor) {
        return null;
    }

    let crashColorFill = colorUtil.rgbToRgba(crashColor, 0.6);

    return [new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: crashColorFill
            }),
            stroke: new ol.style.Stroke({color: crashColor, width: 2})
        })
    })];
};
