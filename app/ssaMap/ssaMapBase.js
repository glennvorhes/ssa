/**
 * Created by gavorhes on 5/13/2016.
 */
import $ from '../../src/jquery';
import makeGuid from '../../src/util/makeGuid';
import quickMapMulti from '../../src/olHelpers/quickMapMulti';
import provide from '../../src/util/provide';
const nm = provide('ssa');


class SsaMapBase {

    
    constructor(divId, corridorDataContainer) {
        
        let _corridorDataContainer = $(`.${corridorDataContainer}, #${corridorDataContainer}`);
        if (_corridorDataContainer.length == 0){
            throw 'data container not found';
        }
        
        this.$corridorDataContainer = $(_corridorDataContainer[0]);

        this.$corridorDataContainer.addClass('corridor-data-container');

        /**
         * @type {JQuery|*|jQuery|HTMLElement}
         */
        this.$mainContainer = $('#' + divId);
        this.$mainContainer.addClass('ssa-map-container');
        let mapId = makeGuid();


        this.$mainContainer.append(`<div id="${mapId}" class="ssa-main-map"></div>`);

        let multiMap = quickMapMulti({
            divId: mapId,
            minZoom: 6,
            zoom: 6
        });

        /**
         * @type {ol.Map}
         */
        this.mainMap = multiMap.map;
        this.mainMapMove = multiMap.mapMove;

        /**
         * @type {MapPopupCls}
         */
        this.mainMapPopup = multiMap.mapPopup;
    }

    addCorridorByPickers(){
        
    }

}

nm.SsaMapBase = SsaMapBase;
export default SsaMapBase;
