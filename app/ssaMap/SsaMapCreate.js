/**
 * Created by gavorhes on 5/13/2016.
 */


import SsaMapBase from './SsaMapBase';
import makeGuid from '../../src/util/makeGuid';
import PickerCollection from '../collections/PickerCollection';
import CorridorCollection from '../collections/CorridorCollection';
import provide from '../../src/util/provide';
const nm = provide('ssa');


class SsaMapCreate extends SsaMapBase{

    /**
     *
     * @param {string} divId
     * @param {string} corridorDataContainer
     */
    constructor(divId, corridorDataContainer){
        super(divId, corridorDataContainer);
        this.$mainContainer.prepend(`<div class="ssa-map-sidebar"></div>`);
        this.mainMap.updateSize();

        this.$sideBar = this.$mainContainer.find('.ssa-map-sidebar');

        this.$sideBar.append('<div><input type="button" value="Add Corridor" class="btn btn-default picker-create-corridor"></div>');

        let pickerGuid = makeGuid();
        this.$sideBar.append(`<div id="${pickerGuid}"></div>`);
        this.pickerCollection = new PickerCollection(pickerGuid, this);

        
        let corridorsGuid = makeGuid();
        this.$sideBar.append(`<div id="${corridorsGuid}"></div>`);
        this.corridorCollection = new CorridorCollection(corridorsGuid, this);
        
        this.$createCorridorButton = this.$sideBar.find('.picker-create-corridor');

        this.$createCorridorButton.click(() => {
            this.pickerCollection.visible = true;
            this.$createCorridorButton.prop('disabled', true);
            this.corridorCollection.visible = false;
        })
    }
}

nm.SsaMapCreate = SsaMapCreate;
export default SsaMapCreate;

