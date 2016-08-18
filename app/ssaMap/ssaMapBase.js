/**
 * Created by gavorhes on 5/13/2016.
 */
import $ from 'webmapsjs/src/jquery/jquery';
import makeGuid from 'webmapsjs/src/util/makeGuid';
import provide from 'webmapsjs/src/util/provide';
const nm = provide('ssa');


class SsaMapBase {


    constructor(divId) {

        /**
         * @type {JQuery|*|jQuery|HTMLElement}
         */
        this.$mainContainer = $('#' + divId);
        this.$mainContainer.addClass('ssa-map-container');

        /**
         * 
         * @type {string}
         * @protected
         */
        this._mapId = makeGuid();
        
        this.$mainContainer.append(`<div id="${this._mapId}" class="ssa-main-map"></div>`);
        
        $('.ol-zoom-out').html('&#8211;');

        /**
         * 
         * @type {MapPopupCls|undefined}
         */
        this.mainMapMove = undefined;

        /**
         * 
         * @type {MapPopupCls|undefined}
         */
        this.mainMapPopup = undefined;

        
    }
    
    get mapId(){
        return this._mapId;
    }

    /**
     * 
     * @returns {JQuery|jQuery|HTMLElement}
     * @protected
     */
    get $mapDiv(){
       return $(`#${this.mapId}`); 
    }
}

nm.SsaMapBase = SsaMapBase;
export default SsaMapBase;
