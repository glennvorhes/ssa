/**
 * Created by gavorhes on 5/13/2016.
 */


import SsaMapBase from './SsaMapBase';
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
     */
    constructor(divId, corridorDataContainer) {
        super(divId);
        this.$mainContainer.prepend(`<div class="ssa-map-sidebar"></div>`);
        this.mainMap.updateSize();

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
            this.pickerCollection.visible = true;
            this.corridorCollection.createModifyOperation = true;
            this.$createCorridorButton.prop('disabled', true);
        });

        this.$zoomExtentButton.click(() => {
            let ext = this.corridorCollection.fullExtent;
            if (ext){
                this.mainMap.getView().fit(ext, this.mainMap.getSize());
            }
        })
    }
}

nm.SsaMapCreate = SsaMapCreate;
export default SsaMapCreate;

