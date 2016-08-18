/**
 * Created by gavorhes on 5/13/2016.
 */

import SsaMapBase from './SsaMapBase';
import quickMap from 'webmapsjs/src/olHelpers/quickMap';
import mapPopup from 'webmapsjs/src/olHelpers/mapPopup';
import mapMove from 'webmapsjs/src/olHelpers/mapMove';
import provide from 'webmapsjs/src/util/provide';
import CorridorConfig from '../corridor/CorridorConfig';
import Corridor from '../corridor/Corridor';
import * as styles  from '../layerStyles';
import ol from 'webmapsjs/src/ol/ol';
import * as calcExtent from 'webmapsjs/src/olHelpers/extentUtil';
import $ from 'webmapsjs/src/jquery/jquery';
import crashData from '../collections/crashData';
import mmFlags from '../collections/mmFlags';
import controllingCriteria from '../collections/controllingCriteria';
import * as constants from '../constants';

const nm = provide('ssa');


export const mmPopupContent = (props) => {

    let returnHtml = '<table class="mm-popup-table">';
    returnHtml += `<tr><td>PdpId</td><td>${props['pdpId']}</td></tr>`;
    returnHtml += `<tr><td>Highway</td><td>${props['hwyDir']}</td></tr>`;
    returnHtml += `<tr><td>Description</td><td>${props['descrip'] ? props['descrip']: '-'}</td></tr>`;
    returnHtml += `<tr><td>Divided</td><td>${props['divUnd'] == 'D' ? 'Yes' : 'No'}</td></tr>`;
    returnHtml += `<tr><td>From RP</td><td>${props['pdpFrom']}</td></tr>`;
    returnHtml += `<tr><td>To RP</td><td>${props['pdpTo']}</td></tr>`;
    returnHtml += '</table>';
    if (props['crashInfo']){
        returnHtml += props['crashInfo'];
    }

    return returnHtml;
};

const mmPopupContentWithCrash = (props) => {
    "use strict";
    let returnHtml = styles.mmPopupContent(props);

    returnHtml += crashData.getCrashSummary(props['pdpId']);
    
    return returnHtml;
};


class SsaMapView extends SsaMapBase {

    /**
     *
     * @param {string} divId - container for the map
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     * @param {string} [infoAnchorId=ssa-corridor-info-anchor] - id of element after which to insert the info rows
     */
    constructor(divId, dataClass, infoAnchorId) {
        super(divId);

        /**
         * @type {ol.Map}
         */
        this.mainMap = quickMap({
            divId: this.mapId,
            minZoom: 6,
            zoom: 6,
            fullScreen: true
        });
        return;


        /**
         * @type {MapPopupCls}
         */
        this.mainMapPopup = mapPopup;

        dataClass = typeof dataClass == 'string' ? dataClass : 'corridor-data';
        infoAnchorId = typeof infoAnchorId == 'string' ? infoAnchorId : 'ssa-corridor-info-anchor';
        dataClass = '.' + dataClass;

        $(this.mainMap.getTargetElement()).append('<div class="crashes-loaded-msg">Crashes Loaded</div>');

        /**
         *
         * @type {Array<CorridorConfig>}
         */
        let corridorConfigs = [];
        
        /**
         *
         * @type {Array<Corridor>}
         */
        this._corridorArray = [];

        // parse the data from the hidden input elements
        $(dataClass).each((n, el) => {
            corridorConfigs.push(new CorridorConfig(el));
        });

        this.createdCorridorsLength = corridorConfigs.length;
        this.loadedCorridorsLength = 0;
        
        let outHtml = '';

        // Create the corridors, triggers feature get
        for (let i = 0; i < corridorConfigs.length; i++) {
            let conf = corridorConfigs[i];
            outHtml += conf.bootstrapHtml(i);

            let corridor = new Corridor(
                conf.startPdp, conf.endPdp, conf.startRp, conf.endRp,
                conf.startCounty, conf.endCounty, conf.hgwy, conf.routeId,
                {
                    color: 'black',
                    loadedCallback: (c) => {
                        this.loadedCorridorsLength++;
                        mmFlags.addCorridor(c);
                        //something special when all the corridors have been loaded
                        if (this.loadedCorridorsLength == this.createdCorridorsLength) {
                            this._afterCorridorLoad();
                        }

                    }
                }
            );


            this._corridorArray.push(corridor);

            this.mainMap.addLayer(corridor.olLayer);
            this.mainMap.addLayer(corridor.nodeLayer.olLayer);

            this.mainMapPopup.addVectorPopup(corridor.layer, mmPopupContentWithCrash);
        }

        $('#' + infoAnchorId).after(outHtml);

        crashData.init(this.mainMap);
        mmFlags.init(this.mainMap);

    }

    _afterCorridorLoad(){
        calcExtent.fitToMap(this._corridorArray, this.mainMap);
        mmFlags.sortFeatures();
        let _this = this;
        
        $(`#${constants.mmFlagListId} li`).click(function(){
            let $this = $(this);

            let theFeature = mmFlags.getFeatureById(parseInt($this.attr(constants.pdpDataAttr)));

            _this.mainMap.getView().fit(theFeature.getGeometry().getExtent(), _this.mainMap.getSize());
            _this.mainMap.getView().setZoom(_this.mainMap.getView().getZoom() - 1);
        });
    }
}

nm.SsaMapView = SsaMapView;
export default SsaMapView;
