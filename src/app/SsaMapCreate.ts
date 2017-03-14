/**
 * Created by gavorhes on 5/13/2016.
 */

import SsaMapBase from './SsaMapBase';
import * as calcExtent from 'webmapsjs/dist/olHelpers/extentUtil';
import quickMap from 'webmapsjs/dist/olHelpers/quickMap';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import makeGuid from 'webmapsjs/dist/util/makeGuid';

import provide from 'webmapsjs/dist/util/provide';

import PickerCollection from '../collections/PickerCollection';
import CorridorCollection from '../collections/CorridorCollection';
import ol = require('custom-ol');

import $ = require('jquery');
import 'jquery-ui';

const nm = provide('ssa');


export class SsaMapCreate extends SsaMapBase {
    $sideBar: JQuery;
    corridorCollection: CorridorCollection;
    pickerCollection: PickerCollection;

    /**
     *
     * @param {string} divId
     * @param {string} corridorDataContainer
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     */
    constructor(divId, corridorDataContainer, dataClass) {
        super(divId);


        this.$mainContainer.prepend(`<div class="ssa-map-sidebar"></div>`);

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
        let __this = this;
        
        this.corridorCollection.$innerContainer.find('.corridor-zoom').click(function () {

            let corridorId = $(this).attr('data-corridor');
            let cor = __this.corridorCollection.getCorridorById(corridorId);
            __this.mainMap.getView().fit(cor.extent as ol.Extent, __this.mainMap.getSize());
        });

        this.corridorCollection.$innerContainer.find('.corridor-delete').click(function () {
            let corridorId = $(this).attr('data-corridor');
            __this.corridorCollection.removeCorridor(corridorId);
        });

        this.corridorCollection.$innerContainer.find('.corridor-edit').click(function () {
            __this.pickerCollection.$createCorridorButton.prop('disabled', true);
            let corridorId = $(this).attr('data-corridor');
            let cor = __this.corridorCollection.getCorridorById(corridorId);
            __this.pickerCollection.startPicker(cor);
            $(this).closest('.corridor-tr').addClass('corridor-tr-selected');
        });
    }
}

nm.SsaMapCreate = SsaMapCreate;
window['SsaMapCreate'] = SsaMapCreate;
export default SsaMapCreate;

