/**
 * Created by gavorhes on 5/13/2016.
 */

import provide from 'webmapsjs/dist/util/provide';
import SortedFeatures from 'webmapsjs/dist/olHelpers/SortedFeatures';
import LayerBaseVectorGeoJson from 'webmapsjs/dist/layers/LayerBaseVectorGeoJson';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import SelectBoxBase from 'webmapsjs/dist/domUtil/SelectBoxBase';
import Ajx from '../ajaxGetters';
import * as layerStyles from '../layerStyles';
import {zoomToResolution} from 'webmapsjs/dist/olHelpers/zoomResolutionConvert';
import {proj3857} from 'webmapsjs/dist/olHelpers/projections';

import PickerCollection from "../collections/PickerCollection";
import $ = require('jquery');
import ol = require('custom-ol');

const nm = provide('ssa.select');


export class SegmentPicker extends SelectBoxBase {
    _isFrom: boolean;
    _selectedPdpId: number;
    _sortedFeatures: SortedFeatures;
    _segmentLayer: LayerBaseVectorGeoJson;
    _segNodeLayer: LayerBaseVectorGeoJson;
    _segmentSelectionLayer: LayerBaseVectorGeoJson;
    _selectBtnClass: string;
    _selectBtnClassTo: string;
    _pickerColl: PickerCollection;
    _enabled: boolean;
    _layersVisible: boolean;

    /**
     *
     * @param {PickerCollection} pickerColl - picker collection
     * @param {boolean} isFrom - is this the start (from) picker
     */
    constructor(pickerColl, isFrom) {


        function contentGen(guid) {
            let outString = '';
            outString += `<div style="position: relative;" class="select-picker-map-container">`;
            outString += `<select id="${guid}"></select>`;
            outString += `</div>`;

            return outString;
        }

        super(pickerColl.$innerContainer, isFrom ? 'Ref. Point #1' : 'Ref. Point #2', contentGen);
        this._isFrom = isFrom;
        this._pickerColl = pickerColl;

        /**
         *
         * @type {number|undefined}
         * @private
         */
        this._selectedPdpId = undefined;

        this.addChangeListener((v) => {
            this.selectedPdpId = parseInt(v);
        });

        this._box.keyup(() => {
            if (this.selectedPdpId != parseInt(this.selectedValue.toString())) {
                this._box.trigger('change');
            }
        });

        /**
         *
         * @type {SortedFeatures|undefined}
         * @private
         */
        this._sortedFeatures = undefined;

        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @protected
         */
        this._segmentLayer = new LayerBaseVectorGeoJson('',
            {
                minZoom: 6,
                name: this._isFrom ? 'Start Segment' : 'End Segment',
                transform: {dataProjection: proj3857, featureProjection: proj3857},
                style: layerStyles.segmentLayer,
                visible: false
            }
        );

        this._segNodeLayer = new LayerBaseVectorGeoJson('', {
            style: layerStyles.segNodeStyle,
            minZoom: 11,
            visible: false
        });


        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @private
         */
        this._segmentSelectionLayer = new LayerBaseVectorGeoJson('', {
            style: new ol.style.Style({
                stroke: new ol.style.Stroke(
                    {
                        color: this._isFrom ? layerStyles.fromSelectionColor : layerStyles.toSelectionColor,
                        width: 8
                    }
                )
            }),
            minZoom: 6,
            visible: false,
            zIndex: this._isFrom ? 100 : 101
        });

        this._selectBtnClass = this._isFrom ? "select-seg-btn-from" : "select-seg-btn-to";
        this._selectBtnClassTo = 'select-seg-btn-to';

        mapPopup.addVectorPopup(this._segmentLayer, (props) => {
            let returnHtml = '<table class="mm-popup-table">';
            returnHtml += `<tr><td>PdpId</td><td>${props['pdpId']}</td>;`;
            returnHtml += `<td rowspan="5">`;
            if (this._pickerColl.startEndCountySame) {
                returnHtml += `<input type="button" id='${props['pdpId']}' class="${this._selectBtnClass}" value="Select Start"/>`;
                returnHtml += `<input type="button" id='${props['pdpId']}' class="${this._selectBtnClassTo}" value="Select End"/>`;
            } else {
                returnHtml += `<input type="button" id='${props['pdpId']}' class="${this._selectBtnClass}" value="Select"/>`;
            }
            returnHtml += `</td></tr>`;
            returnHtml += `<tr><td>Hwy</td><td>${props['hwyDir']}</td></tr>`;
            returnHtml += `<tr><td>DivUnd</td><td>${props['divUnd']}</td></tr>`;
            returnHtml += `<tr><td>From</td><td>${props['pdpFrom']}</td></tr>`;
            returnHtml += `<tr><td>To</td><td>${props['pdpTo']}</td></tr>`;
            returnHtml += '</table>';

            return returnHtml;
        });


        // add the popup change function to find the select button
        mapPopup.addPopupChangedFunction(() => {
            let selectButton = $(`.${this._selectBtnClass}`);
            if (selectButton.length > 0) {
                let __this = this;
                selectButton.click(function () {
                    __this.selectedPdpId = this['id'];
                });
            }
        });


        this._enabled = false;
        this._layersVisible = false;

        this._box.click((evt) => {
            evt.stopPropagation();
        });

        this._box.parent('div').click(() => {
            if (this._sortedFeatures == null){
                return;
            }

            let selectedFeature = this._sortedFeatures.getFeature(this.selectedPdpId) as ol.Feature;

            if (selectedFeature == null){
                return;
            }

            mapPopup.map.getView().fit(selectedFeature.getGeometry().getExtent(), mapPopup.map.getSize());
            mapPopup.map.getView().setZoom(mapPopup.map.getView().getZoom() - 2);
        })
    }


    /**
     * @param {Array<object>} arr - array of returned objects, implementation defined in derived classes
     */
    _processAjaxResult(arr) {

        arr.sort((a, b) => {
            let c = this._isFrom ? a['properties']['startRp'] : a['properties']['endRp'];
            let d = this._isFrom ? b['properties']['startRp'] : b['properties']['endRp'];

            if (c == d) {
                return 0;
            }

            return c < d ? -1 : 1;
        });

        for (let feat of arr) {
            let props = feat['properties'];
            if (this._isFrom) {
                this._box.append(`<option value="${props['pdpId']}">${props['startRp']}</option>`);

            } else {
                this._box.append(`<option value="${props['pdpId']}">${props['endRp']}</option>`);
            }
        }
    }

    /**
     *
     * @param {string|number} county - county id as string or number
     * @param {string|number|null} rteId - routeId
     * @param {number|undefined} [pdpId=undefined] - the pdp id to be set on load
     */
    setCountyAndRoute(county: string|number, rteId: string|number, pdpId?: number) {
        pdpId = typeof pdpId == 'number' ? pdpId : undefined;

        this.selectedPdpId = undefined;
        this._box.html('');
        this._box.addClass('refresh').removeClass('refresh');

        if (mapPopup) {
            mapPopup.closePopup();
        }

        if (typeof county == 'string') {
            county = parseInt(county as string);
        }

        if (rteId == null) {
            this.enabled = false;

            return;
        }

        if (typeof rteId == 'string') {
            rteId = parseInt(rteId as string);
        }

        Ajx.getSegments(county as number, rteId, (d) => {
                this._segmentLayer.clear();
                this._segNodeLayer.clear();
                this._processAjaxResult(d['features']);

                if (d['features'].length > 0) {
                    this.enabled = true;
                    this._segmentLayer.addFeatures(d);
                    let feats = this._segmentLayer.source.getFeatures();
                    this._sortedFeatures = new SortedFeatures(feats, 'pdpId');
                    this._setExtent();

                    if (typeof pdpId == 'number') {
                        // this._box.val(pdpId.toFixed());
                        this.selectedPdpId = pdpId;
                    } else {
                        this._box.trigger('change');
                    }

                    for (let i = 0; i < feats.length; i++) {
                        let coords = feats[i].getGeometry()['getCoordinates']();
                        if (coords.length > 0) {
                            let startPoint = new ol.geom.Point(coords[0]);
                            let endPoint = new ol.geom.Point(coords[coords.length - 1]);
                            this._segNodeLayer.source.addFeature(new ol.Feature(startPoint));
                            this._segNodeLayer.source.addFeature(new ol.Feature(endPoint));
                        }
                    }
                } else {
                    this.enabled = false;
                }
            }
        );
    }

    _setExtent() {

    }

    /**
     * @returns {boolean} if enabled
     */
    get enabled() {
        return this._enabled;
    }

    /**
     *
     * @param {boolean} isEnabled - is enabled
     * @private
     */
    set enabled(isEnabled) {
        this._enabled = isEnabled;
        this._box.prop('disabled', !isEnabled);
    }

    get layersVisible() {
        return this._layersVisible;
    }

    set layersVisible(lyrsVisible) {
        this._layersVisible = lyrsVisible;
        if (this._isFrom) {
            this.segmentLayer.visible = this.layersVisible;
            this._segNodeLayer.visible = this.layersVisible;
        } else {
            this.segmentLayer.visible = this.layersVisible && !this._pickerColl.startEndCountySame;
            this._segNodeLayer.visible = this.layersVisible && !this._pickerColl.startEndCountySame;
        }

        this.selectionLayer.visible = this.layersVisible;
    }

    /**
     *
     * @returns {number|undefined} selected id
     */
    get selectedPdpId() {
        return this._selectedPdpId;
    }

    /**
     * set the currently selected pdp id
     * @param {number|undefined} newId - new selected id
     */
    set selectedPdpId(newId) {
        if (mapPopup) {
            mapPopup.closePopup();
        }

        if (typeof newId == 'string') {
            newId = parseInt(newId);
        }

        if (newId == this._selectedPdpId) {
            return;
        }

        this._selectedPdpId = newId;
        this.selectionLayer.source.clear();

        if (this._selectedPdpId != undefined) {
            this._box.val(this.selectedPdpId);
            let selectedFeature = this._sortedFeatures.getFeature(this.selectedPdpId);

            this.selectionLayer.source.addFeature(selectedFeature);
        }
    }

    clear() {
        this._box.html('');
        this.selectedPdpId = undefined;
    }

    /**
     * get the segment layer with the mm segments in the county and route id
     * @returns {LayerBaseVectorGeoJson} - the segment layer
     */
    get segmentLayer() {
        return this._segmentLayer;
    }

    /**
     * get the selection hayer
     * @returns {LayerBaseVectorGeoJson} the selection layer for this picker
     */
    get selectionLayer() {
        return this._segmentSelectionLayer;
    }
}

nm.SegmentPicker = SegmentPicker;
export default SegmentPicker;
