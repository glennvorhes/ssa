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
import * as styles  from '../layerStyles';
import * as calcExtent from 'webmapsjs/dist/olHelpers/extentUtil';
import crashData from '../collections/crashData';
import mmFlags from '../collections/mmFlags';
import controllingCriteria from '../collections/controllingCriteria';
import * as constants from '../constants';
import ol = require('custom-ol');
import ajx from '../ajaxGetters';
import $ = require('jquery');
import {LayerBaseVector} from "webmapsjs/dist/layers/LayerBaseVector";

const nm = provide('ssa');

const mmPopupContentWithCrash = (props) => {
    "use strict";
    let returnHtml = styles.mmPopupContent(props);

    returnHtml += crashData.getCrashSummary(props['pdpId']);

    return returnHtml;
};

function get_browser() {
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1]||'')};
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

 console.log(get_browser());


export class SsaMapView extends SsaMapBase {
    createdCorridorsLength: number;
    _corridorArray: Corridor[];
    loadedCorridorsLength: number;
    private $getMapButton: JQuery;
    private getMapLinkId: string;
    private _ssaId: number;
    private _snap: number;

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

        this.$getMapButton = $('#download-map-image');

        this.getMapLinkId = 'get-map-link';

        let linkHtml = `<a id="${this.getMapLinkId}" href="#" ` +
            `download="map-image-id-${this._ssaId}-ver-${this._snap}.png" ` +
            `style="display: none"></a>`;

        $('#' + this.mapId).append(linkHtml);

        this.mainMap = quickMap({
            divId: this.mapId,
            minZoom: 6,
            zoom: 6,
            fullScreen: true
        });

        let summaryListHtml = '<div class="segment-index-summary">';
        summaryListHtml += '<div class="segment-index-summary-toggles">';
        summaryListHtml += `<span class="segment-index-summary-toggle segment-index-summary-zoom" title="Zoom To Initial Extent">&#8634;</span>`;
        summaryListHtml += `<span class="segment-index-summary-toggle segment-index-summary-close" title="Hide Legend">&#8598;</span>`;
        summaryListHtml += `<span class="segment-index-summary-toggle segment-index-summary-open" title="Show Legend">&#8600;</span>`;
        summaryListHtml += '</div>';

        summaryListHtml += `<h4 style="color: ${constants.mmFlagColor}">Metamanager Flags</h4>`;
        summaryListHtml += `<ul id="${constants.mmFlagListId}"></ul>`;
        summaryListHtml += `<h4 style="color: ${constants.controllingCriteriaColor}">Controlling Criteria</h4>`;
        summaryListHtml += `<ul id="${constants.ccListId}"></ul>`;


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
                let conf = corridorConfigs[i];
                outHtml += conf.bootstrapHtml(i);

                let corridor = new Corridor(
                    conf.startPdp, conf.endPdp, conf.startRp, conf.endRp,
                    conf.startCounty, conf.endCounty, conf.hgwy, conf.routeId,
                    {
                        color: 'black',
                        jsonFeatures: returnLookup[i.toFixed()],
                    }
                );

                mmFlags.addCorridor(corridor);
                controllingCriteria.addCorridor(corridor);

                this._corridorArray.push(corridor);

                this.mainMap.addLayer(corridor.olLayer);
                this.mainMap.addLayer(corridor.nodeLayer.olLayer);

                this.mainMapPopup.addVectorPopup(corridor.layer, mmPopupContentWithCrash);
            }

            this._afterCorridorLoad();

            $('#' + infoAnchorId).after(outHtml);
        });


        mmFlags.init(this.mainMap);
        controllingCriteria.init(this.mainMap);


        this.$getMapButton.click(() => {
            let mapTarget: HTMLDivElement = this.mainMap.getTargetElement() as HTMLDivElement;

            let originalHeight = mapTarget.style.height;
            let originalWidth = mapTarget.style.width;
            let originalPosition = mapTarget.style.position;
            let originalCenter = this.mainMap.getView().getCenter();
            let originalZoom = this.mainMap.getView().getZoom();

            let mapSize = 2000;
            let mapTimeout = 2000;

            mapTarget.style.height = `${mapSize}px`;
            mapTarget.style.width = `${mapSize}px`;
            mapTarget.style.position = 'absolute';


            this.mainMap.once('postrender', () => {
                this._fitExtent();
                setTimeout(() => {
                    this.mainMap.once('postcompose', (event) => {
                        try {
                            let canvas: HTMLCanvasElement = event['context'].canvas;
                            let linkEl: HTMLAnchorElement = document.getElementById(this.getMapLinkId) as HTMLAnchorElement;
                            linkEl.href = canvas.toDataURL('image/png');
                            linkEl.click();
                            linkEl.href = '#';

                            mapTarget.style.height = originalHeight;
                            mapTarget.style.width = originalWidth;
                            mapTarget.style.position = originalPosition;

                            this.mainMap.updateSize();
                            this.mainMap.getView().setCenter(originalCenter);
                            this.mainMap.getView().setZoom(originalZoom);
                        }
                        catch (ex) {
                            // reportParams['imgData'] = null;
                        }
                    });
                    this.mainMap.renderSync();
                }, mapTimeout);
            });

            this.mainMap.updateSize();
        })
    }

    _afterCorridorLoad() {

        this._fitExtent();

        crashData.init(this.mainMap, this._ssaId, this._snap);
        mmFlags.afterLoad();
        controllingCriteria.afterLoad();
    }

    private _fitExtent() {

        let lyrs: LayerBaseVector[] = [];

        for (let c of this._corridorArray) {
            lyrs.push(c.layer);
        }

        if (lyrs.length > 0) {
            calcExtent.fitToMap(lyrs, this.mainMap);
        }
    }
}

nm.SsaMapView = SsaMapView;
window['SsaMapView'] = SsaMapView;
export default SsaMapView;
