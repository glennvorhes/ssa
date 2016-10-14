/**
 * Created by gavorhes on 5/13/2016.
 */
"use strict";
var custom_ol_1 = require('custom-ol');
var projections_1 = require("webmapsjs/dist/olHelpers/projections");
exports.segmentLayer = new custom_ol_1.default.style.Style({
    stroke: new custom_ol_1.default.style.Stroke({ color: 'darkblue', width: 5 })
});
exports.fromSelectionColor = '#48FD14';
exports.toSelectionColor = '#EE0071';
exports.corridorPreviewColor = 'black';
/**
 *
 * @type {Array<string>}
 */
var returnedColors = [];
var colorOptions = ['#FF00FF', '#7FFF00', '#FA8072',
    '#FF6347', '#40E0D0', '#ADFF2F', '#6495ED',
    '#FF8C00', '#7FFFD4', '#DA70D6'];
/**
 * return a random color for styling
 * @returns {string}
 */
function randomColor() {
    "use strict";
    if (returnedColors.length == colorOptions.length) {
        returnedColors = [];
    }
    while (true) {
        var c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        if (returnedColors.indexOf(c) < 0) {
            returnedColors.push(c);
            return c;
        }
    }
}
exports.randomColor = randomColor;
/**
 *
 * @param name
 * @param color
 * @param visible
 * @returns {{minZoom: number, name: *, transform: {dataProjection: string, featureProjection: string}, style: ol.style.Style, visible: *}}
 */
function layerConfigHelper(name, color, visible) {
    "use strict";
    return {
        minZoom: 4,
        name: name,
        transform: { dataProjection: projections_1.proj3857, featureProjection: projections_1.proj3857 },
        style: new custom_ol_1.default.style.Style({
            stroke: new custom_ol_1.default.style.Stroke({
                color: color,
                width: 6
            })
        }),
        visible: visible
    };
}
exports.layerConfigHelper = layerConfigHelper;
exports.mmPopupContent = function (props) {
    var returnHtml = '<table class="mm-popup-table">';
    returnHtml += "<tr><td>PdpId</td><td>" + props['pdpId'] + "</td></tr>";
    returnHtml += "<tr><td>Highway</td><td>" + props['hwyDir'] + "</td></tr>";
    returnHtml += "<tr><td>Description</td><td>" + (props['descrip'] ? props['descrip'] : '-') + "</td></tr>";
    returnHtml += "<tr><td>Divided</td><td>" + (props['divUnd'] == 'D' ? 'Yes' : 'No') + "</td></tr>";
    returnHtml += "<tr><td>From RP</td><td>" + props['pdpFrom'] + "</td></tr>";
    returnHtml += "<tr><td>To RP</td><td>" + props['pdpTo'] + "</td></tr>";
    returnHtml += '</table>';
    return returnHtml;
};
exports.segNodeStyle = new custom_ol_1.default.style.Style({
    image: new custom_ol_1.default.style.RegularShape({
        radius: 6,
        points: 4,
        fill: new custom_ol_1.default.style.Fill({
            color: 'rgb(0, 0, 0)'
        }),
        stroke: new custom_ol_1.default.style.Stroke({ color: 'rgb(0, 0, 0', width: 2 })
    })
});
//# sourceMappingURL=layerStyles.js.map