/**
 * Created by gavorhes on 5/13/2016.
 */
import ol from 'custom-ol';
import { LayerBaseVectorGeoJsonOptions } from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
export declare const segmentLayer: ol.style.Style;
export declare const fromSelectionColor: string;
export declare const toSelectionColor: string;
export declare const corridorPreviewColor: string;
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
export declare const mmPopupContent: (props: {
    [s: string]: string | number;
}) => string;
export declare const segNodeStyle: ol.style.Style;
