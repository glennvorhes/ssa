/**
 * Created by gavorhes on 5/13/2016.
 */

import SsaMapBase from './SsaMapBase';
import quickMap from 'webmapsjs/dist/olHelpers/quickMap';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import mapMove from 'webmapsjs/dist/olHelpers/mapMove';
import provide from 'webmapsjs/dist/util/provide';
import CorridorConfig from '../corridor/CorridorConfig';
import Corridor from '../corridor/Corridor';
import * as styles from '../layerStyles';
import * as calcExtent from 'webmapsjs/dist/olHelpers/extentUtil';
import crashData from '../collections/crashData';
import {mapToBase64, iMapToBase64Options} from 'webmapsjs/dist/olHelpers/mapToBase64';


import deficiency from '../collections/Deficiency';
import * as constants from '../constants';
import ol = require('custom-ol');
import ajx from '../ajaxGetters';
import $ = require('jquery');
import {LayerBaseVector} from "webmapsjs/dist/layers/LayerBaseVector";
import {mmPopupContent} from '../popup';
import {get_browser} from 'webmapsjs/dist/util/get_browser';

// import controllingCriteria from '../collections/controllingCriteria';
// import mmFlags from '../collections/mmFlags';

const nm = provide('ssa');

const mmPopupContentWithCrash = (props) => {
    "use strict";

    let returnHtml = '';
    returnHtml += crashData.getCrashSummary(props['pdpId']);
    returnHtml += mmPopupContent(props);
    return returnHtml;
};


export class SsaMapView extends SsaMapBase {
    createdCorridorsLength: number;
    _corridorArray: Corridor[];
    loadedCorridorsLength: number;
    // private $getMapButton: JQuery;
    private getMapLinkId: string;
    private _ssaId: number;
    private _snap: number;
    private mapImageName: string;

    /**
     *
     * @param {string} divId - container for the map
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     * @param {string} [infoAnchorId=ssa-corridor-info-anchor] - id of element after which to insert the info rows
     */
    constructor(divId, dataClass, infoAnchorId) {
        super(divId);
        this._ssaId = parseInt($('#hidden-ssa-id').val());
        this._snap = parseInt($('#hidden-snapshot-id').val());

        this.getMapLinkId = 'get-map-link';
        this.mapImageName = `map-image-id-${this._ssaId}-ver-${this._snap}.png`;

        let linkHtml = `<a id="${this.getMapLinkId}" href="#" ` +
            `download="${this.mapImageName}" ` +
            `style="display: none"></a>`;

        $('#' + this.mapId).append(linkHtml);

        this.mainMap = quickMap({
            divId: this.mapId,
            minZoom: 6,
            zoom: 6,
            fullScreen: true,
            addGeocode: true
        });


        let summaryListHtml = '<div class="segment-index-summary">';
        summaryListHtml += '<div class="segment-index-summary-toggles">';
        summaryListHtml += `<span class="segment-index-summary-toggle segment-index-summary-zoom" title="Zoom To Initial Extent">&#8634;</span>`;
        summaryListHtml += `<span class="segment-index-summary-toggle segment-index-summary-close" title="Hide Legend">&#8598;</span>`;
        summaryListHtml += `<span class="segment-index-summary-toggle segment-index-summary-open" title="Show Legend">&#8600;</span>`;
        summaryListHtml += '</div>';

        // summaryListHtml += `<h4 style="color: ${constants.mmFlagColor}">Metamanager Flags</h4>`;
        // summaryListHtml += `<ul id="${constants.mmFlagListId}"></ul>`;
        // summaryListHtml += `<h4 style="color: ${constants.controllingCriteriaColor}">Controlling Criteria</h4>`;
        // summaryListHtml += `<ul id="${constants.ccListId}"></ul>`;

        summaryListHtml += `<h4 style="color: ${constants.defColor}; font-size: large">Flags and Deficiencies</h4>`;
        summaryListHtml += `<ul id="${constants.defListId}"></ul>`;

        summaryListHtml += '</div>';
        this.$mapDiv.append(summaryListHtml);

        let $legendDiv = this.$mapDiv.find('.segment-index-summary');
        let $closeButton = $legendDiv.find('.segment-index-summary-close');
        let $openButton = $legendDiv.find('.segment-index-summary-open');
        let $zoomExtent = $legendDiv.find('.segment-index-summary-zoom');

        $openButton.hide();

        let hideShowWorking = false;
        let originalWidth = $legendDiv.width();
        let originalMinHeight = $legendDiv.css('min-height') as string;
        let originalPadding = $legendDiv.css('padding') as string;

        $closeButton.click(() => {
            if (hideShowWorking) {
                return;
            }
            hideShowWorking = true;

            $legendDiv.find('ul, h3, h4, h5').fadeOut(100, () => {
                $legendDiv.css('padding', '2px');
                $legendDiv.width('auto');
                $legendDiv.css('min-height', 'auto');

                $closeButton.hide();
                $openButton.show();
                hideShowWorking = false;
            });
        });

        $openButton.click(() => {
            if (hideShowWorking) {
                return;
            }
            hideShowWorking = true;

            $legendDiv.css('padding', originalPadding);
            $legendDiv.width(originalWidth);
            $legendDiv.css('min-height', originalMinHeight);

            $legendDiv.find('ul, h3, h4, h5').fadeIn(100, () => {
                $closeButton.show();
                $openButton.hide();
                hideShowWorking = false;
            });
        });

        $zoomExtent.click(() => {
            this._fitExtent();
        });


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
            console.log(el);
            corridorConfigs.push(new CorridorConfig(el));
        });

        this.createdCorridorsLength = corridorConfigs.length;
        this.loadedCorridorsLength = 0;

        let returnLookup = {};
        let returnArr = [];

        ajx.getCcGeom(this._ssaId, this._snap, (d) => {
            for (let f of d['features']) {
                let corId = f['properties']['corridorId'].toFixed();

                if (!returnLookup[corId]) {
                    returnArr.push(corId);
                    returnLookup[corId] = {crs: d['crs'], type: d['type'], features: []};
                }

                returnLookup[corId].features.push(f);
            }

            let outHtml = '';

            for (let i = 0; i < returnArr.length; i++) {
                console.log(i);
                let conf = corridorConfigs[i];
                outHtml += conf.bootstrapHtml(i);

                let corridor = new Corridor(
                    conf.startPdp, conf.endPdp, conf.startRp, conf.endRp,
                    conf.startCounty, conf.endCounty, conf.hgwy, conf.routeId,
                    {
                        color: 'black',
                        jsonFeatures: returnLookup[i.toFixed()],
                        idx: i + 1
                    }
                );

                // mmFlags.addCorridor(corridor);
                // controllingCriteria.addCorridor(corridor);

                deficiency.addCorridor(corridor);

                this._corridorArray.push(corridor);

                this.mainMap.addLayer(corridor.olLayer);
                this.mainMap.addLayer(corridor.nodeLayer.olLayer);

                this.mainMapPopup.addVectorPopup(corridor.layer, mmPopupContentWithCrash);
            }

            this._afterCorridorLoad();

            $('#' + infoAnchorId).after(outHtml);
        });


        // mmFlags.init(this.mainMap);
        // controllingCriteria.init(this.mainMap);

        deficiency.init(this.mainMap);
    }

    public getMapData(callback: (imgData: string) => any, options: iMapToBase64Options) {
        options = options || {};
        options.delay = typeof options.delay === 'number'? options.delay: 2000;
        options.layers = this._fitExtent();
        mapToBase64(this.mainMap, callback, options);
    }

    _afterCorridorLoad() {

        this._fitExtent();

        crashData.init(this.mainMap, this._ssaId, this._snap);

        // mmFlags.afterLoad();
        // controllingCriteria.afterLoad();

        deficiency.afterLoad()
    }

    private _fitExtent(): LayerBaseVector[] {

        let lyrs: LayerBaseVector[] = [];

        for (let c of this._corridorArray) {
            lyrs.push(c.layer);
        }

        if (lyrs.length > 0) {
            calcExtent.fitToMap(lyrs, this.mainMap);
        }

        return lyrs;
    }
}

nm.SsaMapView = SsaMapView;
window['SsaMapView'] = SsaMapView;
export default SsaMapView;
