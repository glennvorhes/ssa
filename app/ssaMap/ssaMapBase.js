/**
 * Created by gavorhes on 5/13/2016.
 */
import $ from '../../src/jquery';
import makeGuid from '../../src/util/makeGuid';
import quickMapMulti from '../../src/olHelpers/quickMapMulti';


class SsaMapBase {
    constructor(divId) {

        /**
         * @type {JQuery|*|jQuery|HTMLElement}
         */
        this.mainContainer = $('#' + divId);
        this.mainContainer.addClass('ssa-map-container');
        let mapId = makeGuid();


        this.mainContainer.append(`<div id="${mapId}" class="ssa-main-map"></div>`);

        let multiMap = quickMapMulti({
            divId: mapId,
            minZoom: 6,
            zoom: 6
        });

        /**
         * @type {ol.Map}
         */
        this.pickerMap = multiMap.map;
        this.pickerMapMove = multiMap.mapMove;
        this.pickerMapPopup = multiMap.mapPopup;
    }

}

export default SsaMapBase;
