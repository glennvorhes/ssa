/**
 * Created by gavorhes on 5/13/2016.
 */
import $ from 'webmapsjs/src/jquery/jquery';
import makeGuid from 'webmapsjs/src/util/makeGuid';
import quickMapMulti from 'webmapsjs/src/olHelpers/quickMapMulti';
import provide from 'webmapsjs/src/util/provide';
const nm = provide('ssa');


class SsaMapBase {

    
    constructor(divId) {
        
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
            zoom: 6,
            fullScreen: true
        });
        
        $('.ol-zoom-out').html('&#8211;');


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
