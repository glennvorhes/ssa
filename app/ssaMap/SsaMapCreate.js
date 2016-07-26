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
import CorridorConfig from '../corridor/CorridorConfig';
import Corridor from '../corridor/Corridor';
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

        let _corridorDataContainer = $(`.${corridorDataContainer}, #${corridorDataContainer}`);
        if (_corridorDataContainer.length == 0) {
            throw 'data container not found';
        }

        this.$corridorDataContainer = $(_corridorDataContainer[0]);
        this.$corridorDataContainer.addClass('corridor-data-container');

        this.$sideBar = this.$mainContainer.find('.ssa-map-sidebar');

        this.$sideBar.append('<div>' +
            '<input type="button" value="Add Corridor" class="btn btn-default picker-create-corridor">' +
            '<input type="button" value="Zoom to Extent" class="btn btn-default picker-zoom-extent">' +
            '</div>');

        let pickerGuid = makeGuid();
        this.$sideBar.append(`<div id="${pickerGuid}"></div>`);
        this.pickerCollection = new PickerCollection(pickerGuid, this);


        let corridorsGuid = makeGuid();
        this.$sideBar.append(`<div id="${corridorsGuid}"></div>`);
        this.corridorCollection = new CorridorCollection(corridorsGuid, this);

        this.$createCorridorButton = this.$sideBar.find('.picker-create-corridor');
        this.$zoomExtentButton = this.$sideBar.find('.picker-zoom-extent');

        this.$createCorridorButton.click(() => {
            this.pickerCollection.startPicker();

            this.$createCorridorButton.prop('disabled', true);
        });

        this.$zoomExtentButton.click(() => {
            let ext = this.corridorCollection.fullExtent;
            if (ext) {
                this.mainMap.getView().fit(ext, this.mainMap.getSize());
            }
        });

        let $existingCorridors = $('.' + dataClass || 'corridor-data');
        let loadedCount = 0;


        // parse the data from the hidden input elements
        $existingCorridors.each((n, el) => {
            let conf = new CorridorConfig(el);

            let corridor = new Corridor(
                conf.startPdp, conf.endPdp, conf.startRp, conf.endRp,
                conf.startCounty, conf.endCounty, conf.hgwy, conf.routeId,
                {
                    loadedCallback: (c) => {
                        loadedCount++;
                        //something special when all the corridors have been loaded
                        if (this.corridorCollection.corridorCount == loadedCount) {
                            let ext = this.corridorCollection.fullExtent;

                            if (ext){
                                this.mainMap.getView().fit(ext, this.mainMap.getSize());
                            }
                        }
                    }
                }
            );

            if (n == 0){
                $('#primaryCounty').val(corridor.countyStart);
                 $('#primaryRdwyRteId').val(corridor.routeId);
                
            }


            this.corridorCollection.addCorridorCreate(corridor);
        });
    }
}

nm.SsaMapCreate = SsaMapCreate;
export default SsaMapCreate;

