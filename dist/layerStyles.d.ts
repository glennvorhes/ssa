/**
 * Created by gavorhes on 5/13/2016.
 */
import ol = require('custom-ol');
import { LayerBaseVectorGeoJsonOptions } from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
export declare const segmentLayer: ol.style.Style;
export declare const fromSelectionColor = "#48FD14";
export declare const toSelectionColor = "#EE0071";
export declare const corridorPreviewColor = "black";
/**
 * return a random color for styling
 * @returns {string}
 */
export declare function randomColor(): string;
/**
 *
 * @param name
 * @param color
 * @param visible
 * @returns {{minZoom: number, name: *, transform: {dataProjection: string, featureProjection: string}, style: ol.style.Style, visible: *}}
 */
export declare function layerConfigHelper(name: string, color: string, visible: boolean): LayerBaseVectorGeoJsonOptions;
export declare const mmPopupContent: (props: Object) => string;
export declare const segNodeStyle: ol.style.Style;
