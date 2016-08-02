/**
 * Created by gavorhes on 5/13/2016.
 */

import provide from 'webmapsjs/src/util/provide';
import SortedFeatures from 'webmapsjs/src/olHelpers/SortedFeatures';
import LayerBaseVectorGeoJson from 'webmapsjs/src/layers/LayerBaseVectorGeoJson';
import mapPopup from 'webmapsjs/src/olHelpers/mapPopup';
import SelectBoxBase from 'webmapsjs/src/domUtil/SelectBoxBase';
import ol from 'webmapsjs/src/ol/ol';
import Ajx from '../AjaxGetters';
import $ from 'webmapsjs/src/jquery/jquery';
import * as layerStyles from '../layerStyles';
import zoomToResolution from 'webmapsjs/src/olHelpers/zoomResolutionConvert';
const nm = provide('ssa.select');


class SegmentPicker extends SelectBoxBase {

    /**
     *
     * @param {jQuery} parent - parent container
     * @param {boolean} isFrom - is this the start (from) picker
     */
    constructor(parent, isFrom) {
        let mapId = undefined;

        function contentGen(guid) {
            mapId = guid + '-map';
            let outString = '';
            outString += `<div style="position: relative;" class="select-picker-map-container">`;
            outString += `<select id="${guid}"></select>`;
            outString += `</div>`;

            return outString;
        }

        super(parent, isFrom ? 'Ref. Point #1' : 'Ref. Point #2', contentGen);
        this._isFrom = isFrom;

        /**
         *
         * @type {number|undefined}
         * @private
         */
        this._selectedPdpId = undefined;

        this.addChangeListener((v) => {
            this.selectedPdpId = parseInt(v);
        });

        this.box.keyup(() => {
            if (this.selectedPdpId != parseInt(this.selectedValue)) {
                this.box.trigger('change');
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
                minZoom: 7,
                name: this._isFrom ? 'Start Segment' : 'End Segment',
                transform: {dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857'},
                style: layerStyles.segmentLayer,
                visible: false
            }
        );

        this._segNodeLayer = new LayerBaseVectorGeoJson('', {
            style: layerStyles.segNodeStyle,
            minZoom: 11,
            visible: false
        });

        // /**
        //  *
        //  * @type {ol.layer.Vector}
        //  * @private
        //  */
        // this._segmentSelectionLayer = new ol.layer.Vector({
        //     source: new ol.source.Vector(),
        //     style: this._isFrom ? layerStyles.segmentSelectionStyleFrom : layerStyles.segmentSelectionStyleTo,
        //     zIndex: 100,
        //     visible: false
        // });

        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @private
         */
        this._segmentSelectionLayer = new LayerBaseVectorGeoJson('', {
            style: this._isFrom ? layerStyles.segmentSelectionStyleFrom : layerStyles.segmentSelectionStyleTo,
            minZoom: 7,
            visible: false,
            zIndex: 100
        });

        this._selectBtnClass = this._isFrom ? "select-seg-btn-from" : "select-seg-btn-to";

        mapPopup.addVectorPopup(this._segmentLayer, (props) => {
            let returnHtml = '<table class="mm-popup-table">';
            returnHtml += `<tr><td>PdpId</td><td>${props['pdpId']}</td>;`;
            returnHtml += `<td rowspan="5">`;
            returnHtml += `<input type="button" id='${props['pdpId']}' class="${this._selectBtnClass}" value="Select"/>`;
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
                let _this = this;
                selectButton.click(function () {
                    _this.selectedPdpId = this['id'];
                });
            }
        });


        this._enabled = false;
        this._layersVisible = false;
    }


    /**
     * @param {Array<object>} arr - array of returned objects, implementation defined in derived classes
     */
    _processAjaxResult(arr) {

        arr.sort((a, b) => {
            let c = this._isFrom ? a['properties']['pdpFrom'] : a['properties']['pdpTo'];
            let d = this._isFrom ? b['properties']['pdpFrom'] : b['properties']['pdpTo'];

            if (c == d) {
                return 0;
            }

            return c < d ? -1 : 1;
        });

        for (let feat of arr) {
            let props = feat['properties'];
            if (this._isFrom) {
                this.box.append(`<option value="${props['pdpId']}">${props['pdpFrom']}</option>`);

            } else {
                this.box.append(`<option value="${props['pdpId']}">${props['pdpTo']}</option>`);
            }
        }
    }

    /**
     *
     * @param {string|number} county - county id as string or number
     * @param {string|number|null} rteId - routeId
     * @param {number|undefined} [pdpId=undefined] - the pdp id to be set on load
     */
    setCountyAndRoute(county, rteId, pdpId) {
        pdpId = typeof pdpId == 'number' ? pdpId : undefined;

        this.selectedPdpId = undefined;
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');

        if (mapPopup) {
            mapPopup.closePopup();
        }

        if (typeof county == 'string') {
            county = parseInt(county);
        }

        if (rteId == null) {
            this.enabled = false;

            return;
        }

        if (typeof rteId == 'string') {
            rteId = parseInt(rteId);
        }

        Ajx.getSegments(county, rteId, (d) => {
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
                        // this.box.val(pdpId.toFixed());
                        this.selectedPdpId = pdpId;
                    } else {
                        this.box.trigger('change');
                    }

                    for (let i = 0; i < feats.length; i++) {
                        let coords = feats[i].getGeometry()['getCoordinates']();
                        if (coords.length > 0) {
                            this._segNodeLayer.source.addFeature(new ol.Feature(new ol.geom.Point(coords[0])));
                            this._segNodeLayer.source.addFeature(new ol.Feature(new ol.geom.Point(coords[coords.length - 1])));
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
        this.box.prop('disabled', !isEnabled);
    }

    get layersVisible() {
        return this._layersVisible;
    }

    set layersVisible(lyrsVisible) {
        this._layersVisible = lyrsVisible;
        this.segmentLayer.visible = this.layersVisible;
        this._segNodeLayer.visible = this.layersVisible;
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
            this.box.val(this.selectedPdpId);
            let selectedFeature = this._sortedFeatures.getFeature(this.selectedPdpId);

            this.selectionLayer.source.addFeature(selectedFeature);
        }
    }

    clear() {
        this.box.html('');
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
