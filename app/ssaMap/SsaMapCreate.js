/**
 * Created by gavorhes on 5/13/2016.
 */

import SsaMapBase from './SsaMapBase';
import * as calcExtent from 'webmapsjs/src/olHelpers/extentUtil';
import quickMap from 'webmapsjs/src/olHelpers/quickMap';
import mapPopup from 'webmapsjs/src/olHelpers/mapPopup';
import makeGuid from 'webmapsjs/src/util/makeGuid';
import PickerCollection from '../collections/PickerCollection';
import CorridorCollection from '../collections/CorridorCollection';

import $ from 'webmapsjs/src/jquery/jquery';
import 'webmapsjs/src/jquery/jquery-ui';
import provide from 'webmapsjs/src/util/provide';
const nm = provide('ssa');


class SsaMapCreate extends SsaMapBase {

    /**
     *
     * @param {string} divId
     * @param {string} corridorDataContainer
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     */
    constructor(divId, corridorDataContainer, dataClass) {
        super(divId);


        this.$mainContainer.prepend(`<div class="ssa-map-sidebar"></div>`);

        /**
         * @type {ol.Map}
         */
        this.mainMap = quickMap({
            divId: this.mapId,
            minZoom: 6,
            zoom: 6,
            fullScreen: true
        });


        /**
         * @type {MapPopupCls}
         */
        this.mainMapPopup = mapPopup;


        this.$sideBar = this.$mainContainer.find('.ssa-map-sidebar');

        let afterChange = () => {
            this._afterChange();
        };

        this.pickerCollection = new PickerCollection(this.$sideBar, this.mainMap);

        let corridorsGuid = makeGuid();
        this.$sideBar.append(`<div id="${corridorsGuid}"></div>`);
        this.corridorCollection = new CorridorCollection(this.$sideBar, this.mainMap, corridorDataContainer, afterChange, dataClass);
        this.pickerCollection.corridorCollection = this.corridorCollection;

        this.corridorCollection.loadExistingCorridors();
    }

    _afterChange() {
        let _this = this;
        
        this.corridorCollection.$innerContainer.find('.corridor-zoom').click(function () {

            let corridorId = $(this).attr('data-corridor');
            let cor = _this.corridorCollection.getCorridorById(corridorId);
            _this.mainMap.getView().fit(cor.extent, _this.mainMap.getSize());
        });

        this.corridorCollection.$innerContainer.find('.corridor-delete').click(function () {
            let corridorId = $(this).attr('data-corridor');
            _this.corridorCollection.removeCorridor(corridorId);
        });

        this.corridorCollection.$innerContainer.find('.corridor-edit').click(function () {
            _this.pickerCollection.$createCorridorButton.prop('disabled', true);
            let corridorId = $(this).attr('data-corridor');
            let cor = _this.corridorCollection.getCorridorById(corridorId);
            _this.pickerCollection.startPicker(cor);
            $(this).closest('.corridor-tr').addClass('corridor-tr-selected');
        });
    }
}

nm.SsaMapCreate = SsaMapCreate;
export default SsaMapCreate;

