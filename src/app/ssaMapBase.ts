/**
 * Created by gavorhes on 5/13/2016.
 */

import makeGuid from 'webmapsjs/dist/util/makeGuid';
import provide from 'webmapsjs/dist/util/provide';
import {MapPopupCls} from "webmapsjs/dist/olHelpers/mapPopupCls";
import {MapMoveCls} from "webmapsjs/dist/olHelpers/mapMoveCls";
import $ = require('jquery');
const nm = provide('ssa');
import ol from 'custom-ol';


export class SsaMapBase {
    $mainContainer: JQuery;
    _mapId: string;
    mainMapMove: MapMoveCls;
    mainMapPopup: MapPopupCls;
    mainMap: ol.Map;

    constructor(divId: string) {

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
    
    get mapId(): string{
        return this._mapId;
    }

    /**
     * 
     * @returns {JQuery|jQuery|HTMLElement}
     * @protected
     */
    get $mapDiv(): JQuery{
       return $(`#${this.mapId}`); 
    }
}

nm.SsaMapBase = SsaMapBase;
export default SsaMapBase;
