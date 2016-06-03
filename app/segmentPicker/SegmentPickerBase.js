/**
 * Created by gavorhes on 5/13/2016.
 */

import provide from 'webmapsjs/src/util/provide';
import quickMapMulti from 'webmapsjs/src/olHelpers/quickMapMulti';
import SortedFeatures from 'webmapsjs/src/olHelpers/SortedFeatures';
import LayerBaseVectorGeoJson from 'webmapsjs/src/layers/LayerBaseVectorGeoJson';
import LayerEsriMapServer from 'webmapsjs/src/layers/LayerEsriMapServer';
import SelectBoxBase from '../selectBox/SelectBoxBase';
import ol from 'webmapsjs/src/ol/ol';
import {getSegments} from '../ajaxGetters';
import $ from 'webmapsjs/src/jquery/jquery';
import * as layerStyles from '../layerStyles';
const nm = provide('ssa.select');


class SegmentPickerBase extends SelectBoxBase {

    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     */
    constructor(parent, labelContent) {
        let mapId = undefined;

        function contentGen(guid) {
            mapId = guid + '-map';
            let outString = '';
            outString += `<div style="position: relative;" class="select-picker-map-container">`;
            outString += `  <select id="${guid}"></select>`;
            outString += `  <div class="seg-popup-container">`;
            outString += '    <div>';
            outString += `      <span class="selected-segment-info"></span>`;
            outString += `      <span title="Close" class="container-head-close">X</span>`;
            outString += '    </div>';
            outString += `    <div id="${mapId}" class="rp-picker-map"></div>`;
            outString += '  </div>';
            outString += `</div>`;
            return outString;
        }

        super(parent, labelContent, contentGen);
        /**
         *
         * @type {number|undefined}
         * @private
         */
        this._selectedPdpId = undefined;

        this._visible = false;
        this._mapDivId = mapId;
        this._$mapContainer = this._$container.find('.seg-popup-container');

        this._$container.find('.seg-popup-container').click((evt) => {
            evt.stopPropagation();
        });

        this._$container.find('.container-head-close').click((evt) => {
                this.visible = false;
            }
        );

        this._$segmentInfo = this._$container.find('.selected-segment-info');

        this._$container.find('.select-picker-map-container').click(() => {
            this.visible = true;
        });

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
         * @type {SegmentPickerBase|undefined}
         * @public
         */
        this.otherPicker = undefined;

        /**
         *
         * @type {Map}
         * @private
         */
        this._pickerMap = undefined;

        /**
         * @type MapMoveCls
         * @private
         */
        this._pickerMapMove = undefined;

        /**
         * @type MapPopupCls
         * @private
         */
        this._pickerMapPopup = undefined;


        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @protected
         */
        this._segmentLayer = new LayerBaseVectorGeoJson('',
            {
                minZoom: 7,
                mapMoveObj: this._pickerMapMove,
                name: 'MM Segments',
                transform: {dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857'},
                style: layerStyles.segmentLayer
            }
        );

        this._segmentSelectionLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: layerStyles.segmentSelection
        });

        this.otherSelectedSegmentLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: layerStyles.segmentSelectionOther
        });

        this._enabled = false;
    }

    /**
     *
     * @private
     */
    _mapInit() {
        let multiMap = quickMapMulti({
            divId: this._mapDivId,
            minZoom: 6,
            zoom: 6,
            baseSwitcher: false
        });
        $('.ol-zoom-out').html('&#8211;');

        this._pickerMap = multiMap.map;
        this._pickerMapMove = multiMap.mapMove;
        this._pickerMapPopup = multiMap.mapPopup;

        let metamanagerSegments = new LayerEsriMapServer(
            'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
            {
                minZoom: 7,
                visible: true,
                name: 'Metamanager Segments',
                opacity: 0.6
            });

        // add the layers to the map
        this._pickerMap.addLayer(metamanagerSegments.olLayer);
        this._pickerMap.addLayer(this._segmentLayer.olLayer);
        this._pickerMap.addLayer(this._segmentSelectionLayer);
        this._pickerMap.addLayer(this.otherSelectedSegmentLayer);

        this._setExtent();

        // configure the popup response function
        this._pickerMapPopup.addVectorPopup(this._segmentLayer, (props) => {
            let returnHtml = '<table class="mm-popup-table">';
            returnHtml += `<tr><td>PdpId</td><td>${props['pdpId']}</td>;`;
            returnHtml += `<td rowspan="5">`;
            returnHtml += `<input type="button" id='${props['pdpId']}' class="select-seg-btn" value="Select"/>`;
            returnHtml += `</td></tr>`;
            returnHtml += `<tr><td>Hwy</td><td>${props['hwyDir']}</td></tr>`;
            returnHtml += `<tr><td>DivUnd</td><td>${props['divUnd']}</td></tr>`;
            returnHtml += `<tr><td>From</td><td>${props['pdpFrom']}</td></tr>`;
            returnHtml += `<tr><td>To</td><td>${props['pdpTo']}</td></tr>`;
            returnHtml += '</table>';
            return returnHtml;
        });

        // add the popup change function to find the select button
        this._pickerMapPopup.addPopupChangedFunction(() => {
            let selectButton = $('.select-seg-btn');
            if (selectButton.length > 0) {
                let _this = this;
                selectButton.click(function () {
                    _this.selectedPdpId = this['id'];
                });
            }
        });
    }

    /**
     * @abstract
     * @param {Array<object>} arr
     */
    processAjaxResult(arr) {
    }

    /**
     *
     * @param {string|number} county
     * @param {string} hwy
     * @param {number|undefined} [pdpId=undefined]
     */
    setCountyAndHighway(county, hwy, pdpId) {
        pdpId = typeof pdpId == 'number' ? pdpId : undefined;

        this.selectedPdpId = undefined;
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');

        if (this._pickerMapPopup) {
            this._pickerMapPopup.closePopup();
        }

        if (typeof county == 'string') {
            county = parseInt(county);
        }

        getSegments(county, hwy, (d) => {
            this._segmentLayer.clear();
            this.processAjaxResult(d['features']);
            if (d['features'].length > 0) {
                this.enabled = true;
                this._segmentLayer.addFeatures(d);
                this._sortedFeatures = new SortedFeatures(this._segmentLayer.source.getFeatures(), 'pdpId');
                this._setExtent();

                if (typeof pdpId == 'number'){
                    // this.box.val(pdpId.toFixed());
                    this.selectedPdpId = pdpId;
                } else {
                    this.box.trigger('change');
                }

            } else {
                this.enabled = false;
            }
        })
    }

    _setExtent() {
        if (this._pickerMap && this._segmentLayer.source.getFeatures().length > 0) {
            this._pickerMap.getView().fit(this._segmentLayer.source.getExtent(), this._pickerMap.getSize());

        } else {
            // console.log('no features');
        }
    }

    /**
     * @returns {boolean}
     */
    get enabled(){
        return this._enabled;
    }

    /**
     *
     * @param {boolean} isEnabled
     * @private
     */
    set enabled(isEnabled){
        this._enabled = isEnabled;
        this.box.prop('disabled', !isEnabled);
    }


    /**
     * get the picker visibility
     * @returns {boolean} is visible
     */
    get visible() {
        return this._visible;
    }

    /**
     * set the picker visibility
     * @param {boolean} vis is visible
     */
    set visible(vis) {
        if (this.visible === vis) {
            return;
        }

        if (vis && this.enabled) {
            this._$mapContainer.show();
            if (!this._pickerMap) {
                this._mapInit();
            }
            if (this.otherPicker){
                this.otherPicker.visible = false;
            }
        } else {
            this._$mapContainer.hide();
            if (this._pickerMapPopup){
                this._pickerMapPopup.closePopup();
            }
        }
        this._visible = vis;

    }

    /**
     *
     * @returns {number|undefined} selected id
     */
    get selectedPdpId() {
        return this._selectedPdpId;
    }

    /**
     *
     * @param {number|undefined} newId - new selected id
     */
    set selectedPdpId(newId) {
        if (this._pickerMapPopup) {
            this._pickerMapPopup.closePopup();
        }

        if (typeof newId == 'string') {
            newId = parseInt(newId);
        }

        if (newId == this._selectedPdpId) {
            return;
        }

        this._selectedPdpId = newId;

        this._segmentSelectionLayer.getSource().clear();
        this.otherPicker.otherSelectedSegmentLayer.getSource().clear();

        if (this._selectedPdpId == undefined) {
            this._$segmentInfo.html('');

        } else {
            this.box.val(this.selectedPdpId);
            let selectedFeature = this._sortedFeatures.getFeature(this.selectedPdpId);

            this._segmentSelectionLayer.getSource().addFeature(selectedFeature);
            this.otherPicker.otherSelectedSegmentLayer.getSource().addFeature(selectedFeature);

            let props = selectedFeature.getProperties();

            this._$segmentInfo.html(`Seg ID: ${props['pdpId']}, Ref. Point ${props['pdpFrom']}-${props['pdpTo']}`);
        }
    }

    clear() {
        this.box.html('');
        this.selectedPdpId = undefined;
        this.visible = false;
    }
}

nm.SegmentPickerBase = SegmentPickerBase;
export default SegmentPickerBase;
