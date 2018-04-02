/**
 * Created by gavorhes on 5/13/2016.
 */

import ol = require('custom-ol');

import {proj3857} from "webmapsjs/dist/olHelpers/projections";
import {LayerBaseVectorGeoJsonOptions} from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import filterCrash from './filters/filterCrash';
import * as colorUtil from 'webmapsjs/dist/util/colors';
// import filterControllingCritera from '../filters/filterContollingCriteria';
import filterControllingCritera from './filters/filterContollingCriteria';
import filterMmFlag from './filters/filterMmFlag';
import * as constants from './constants';





export const segmentLayer = new ol.style.Style({
    stroke: new ol.style.Stroke({color: 'darkblue', width: 5})
});

export const fromSelectionColor = '#48FD14';
export const toSelectionColor = '#EE0071';
export const corridorPreviewColor = 'black';
export const mmRateFlagColor = 'yellow';
export const mmKabFlagColor = 'orange';
export const mmBothColor = 'red';
export const controllingCriteriaColor = constants.controllingCriteriaColor;

/**
 *
 * @type {Array<string>}
 */
let returnedColors = [];
let colorOptions = ['#FF00FF', '#7FFF00', '#FA8072',
    '#FF6347', '#40E0D0', '#ADFF2F', '#6495ED',
    '#FF8C00', '#7FFFD4', '#DA70D6'];


export interface mmProps {
    mmId?: string;
    pdpId?: number;
    rateFlag: number;
    kabCrshFlag: number
}

export function txtFunc(p: mmProps): ol.style.Text{
    return new ol.style.Text(
        {
            text: p.pdpId.toFixed(),
            scale: 1.5,
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'white'
            })
        }
    );
}

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

    let crashColorFill = colorUtil.rgbToRgba(crashColor, 0.9);

    return [new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: crashColorFill
            }),
            stroke: new ol.style.Stroke({color: 'black', width: 1})
        })
    })];
};

export function deficiencyStyle(feature: ol.Feature): ol.style.Style[] {
    "use strict";

    let props: mmProps = feature.getProperties() as mmProps;

    let returnStyles = [];


    let showCc = false;

    for (let cc of filterControllingCritera.allValues) {
        if (props[cc] && filterControllingCritera.valIsOn(cc)) {
            showCc = true;
            break;
        }
    }

    if (showCc) {
        returnStyles.push(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: controllingCriteriaColor,
                width: 14
            })
        }));
    }

    let rateOrKab = (props.rateFlag >= 1 && filterMmFlag.mmRateFlagOn) || (props.kabCrshFlag >= 1 && filterMmFlag.mmKabFlagOn);
    let onlyRate = props.rateFlag >= 1 && filterMmFlag.mmRateFlagOn;
    let onlyKab = props.kabCrshFlag >= 1 && filterMmFlag.mmKabFlagOn;
    let rateAndKab = onlyRate && onlyKab;

    let color;

    if (onlyRate) {
        color = mmRateFlagColor;
    }

    if (onlyKab) {
        color = mmKabFlagColor;
    }

    if (rateAndKab) {
        color = mmBothColor;
    }

    if (rateOrKab) {

        returnStyles.push(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 5
            })
        }));
    }

    if (returnStyles.length > 0) {
        return returnStyles;
    } else {
        return null
    }
}

export function deficiencyStyleLabels(feature: ol.Feature): ol.style.Style[] {
    "use strict";

    let props: mmProps = feature.getProperties() as mmProps;

    let returnStyles = [];


    let showCc = false;

    for (let cc of filterControllingCritera.allValues) {
        if (props[cc] && filterControllingCritera.valIsOn(cc)) {
            showCc = true;
            break;
        }
    }

    if (showCc) {
        returnStyles.push(new ol.style.Style({
            text: txtFunc(props as mmProps)
        }));
    }

    let rateOrKab = (props.rateFlag >= 1 && filterMmFlag.mmRateFlagOn) || (props.kabCrshFlag >= 1 && filterMmFlag.mmKabFlagOn);
    let onlyRate = props.rateFlag >= 1 && filterMmFlag.mmRateFlagOn;
    let onlyKab = props.kabCrshFlag >= 1 && filterMmFlag.mmKabFlagOn;
    let rateAndKab = onlyRate && onlyKab;

    if (rateOrKab) {
        returnStyles.push(new ol.style.Style({
            text: txtFunc(props as mmProps)
        }));
    }

    if (returnStyles.length > 0) {
        return returnStyles;
    } else {
        return null
    }
}

