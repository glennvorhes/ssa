/**
 * Created by gavorhes on 5/16/2016.
 */
import provide from 'webmapsjs/dist/util/provide';
// import * as styles  from '../layerStyles';
import mapPopup from 'webmapsjs/dist/olHelpers/mapPopup';
import * as calcExtent from 'webmapsjs/dist/olHelpers/extentUtil';
import makeGuid from 'webmapsjs/dist/util/makeGuid';
import CorridorConfig from '../corridor/CorridorConfig';
import Corridor from '../corridor/Corridor';
import {popupCallback} from 'webmapsjs/dist/olHelpers/mapPopupCls'
import ol from 'custom-ol';

import $ = require('jquery');
import {LayerBaseVector} from "webmapsjs/dist/layers/LayerBaseVector";
import {mmPopupContent} from "../layerStyles";
const nm = provide('ssa');

/**
 *
 * @param {string} [rowHtml=''] data row html
 * @returns {string} full table html
 */
function tableContent(rowHtml = '') {
    "use strict";
    rowHtml = typeof  rowHtml == 'string' ? rowHtml : '';

    let tableContent = "<table>";
    tableContent += "<tr>";
    tableContent += '<th></th>';
    tableContent += '<th>Corridors</th>';
    tableContent += '<th></th>';
    tableContent += "</tr>";
    tableContent += rowHtml;
    tableContent += "</table>";

    return tableContent;
}

/**
 *
 * @param {string} fromRp - from reference point
 * @param {string} toRp - to reference point
 * @returns {string} string with abbreviated reference point identifiers separated by a hyphen
 * @private
 */
function corridorName(fromRp, toRp) {
    "use strict";

    return fromRp.substring(0, 7) + ' - ' + toRp.substring(0, 7);
}


export class CorridorCollection {
    $innerContainer: JQuery;
    $corridorDataContainer: JQuery;
    _map: ol.Map;
    _visible: boolean;
    _inCreateModifyOperation: boolean;
    _showPopups: boolean;
    $containerEl: JQuery;

    _corridorArray: Array<Corridor>;
    _coridorLookup: {[s: string]: Corridor};
    _afterChange: Function;
    _dataClass: string;
    _popupStyle: popupCallback;


    /**
     * @param {jQuery} parentDiv - div id inside which to make the collection
     * @param {ol.Map} theMap - the SSA main map
     * @param {string} corridorDataIdOrClass - the corridor data container id or class
     * @param {function} afterChange - function to run after a change has taken place
     * @param {string} [dataClass=corridor-data] - function to run after a change has taken place
     */
    constructor(parentDiv, theMap, corridorDataIdOrClass, afterChange, dataClass) {

        this._dataClass = dataClass ||  'corridor-data';


        this._afterChange = afterChange;

        let _corridorDataContainer = $(`.${corridorDataIdOrClass}, #${corridorDataIdOrClass}`);

        if (_corridorDataContainer.length == 0) {
            throw 'data container not found';
        }

        this.$corridorDataContainer = $(_corridorDataContainer[0]);


        this.$corridorDataContainer.addClass('corridor-data-container');

        this._map = theMap;

        let corridorsGuid = makeGuid();
        parentDiv.append(`<div id="${corridorsGuid}"></div>`);
        this.$containerEl = $('#' + corridorsGuid).addClass('corridor-collection-container');

        let innerHtml = '<div class="corridor-collection">';
        innerHtml += tableContent();
        innerHtml += '</div>';
        this.$containerEl.append(innerHtml);
        this.$innerContainer = this.$containerEl.find('.corridor-collection');
        this._visible = true;
        this._inCreateModifyOperation = false;

        this._showPopups = true;


        /**
         *
         * @type {Array<Corridor>}
         */
        this._corridorArray = [];

        /**
         *
         * @type {{}}
         * @private
         */
        this._coridorLookup = {};

        this._popupStyle = (props): string|boolean => {
            if (!this.showPopups) {
                return false;
            }

            return mmPopupContent(props);
        };
    }


    /**
     * add a corridor
     * @param {Corridor} c - the corridor to be added
     * @param [refreshData=true] c - the corridor to be added
     */
    addCorridorCreate(c: Corridor, refreshData = true) {
        this._corridorArray.push(c);
        this._coridorLookup[c.clientId] = c;
        this._map.addLayer(c.olLayer);
        this._map.addLayer(c.nodeLayer.olLayer);
        c.layer.name = corridorName(c.rpFrom, c.rpTo);
        mapPopup.addVectorPopup(c.layer, this._popupStyle);
        if (refreshData){
            this.refreshHtmlCreate();
        }
    }

    /**
     * delete/remove a corridor
     * @param {string|Corridor} cor - the corridor to be removed
     */
    removeCorridor(cor) {
        if (!confirm('Confirm Delete Corridor?')) {
            return;
        }

        if (typeof cor == 'string') {
            cor = this._coridorLookup[cor];
        }

        let ix = this._corridorArray.indexOf(cor);
        mapPopup.removeVectorPopup(cor.layer);
        this._map.removeLayer(cor.olLayer);
        this._map.removeLayer(cor.nodeLayer.olLayer);
        this._corridorArray.splice(ix, 1);
        delete this._coridorLookup[cor.clientId];

        this._map.getView().setZoom(this._map.getView().getZoom() - 1);
        this._map.getView().setZoom(this._map.getView().getZoom() + 1);

        this.refreshHtmlCreate();
    }

    /**
     * refresh the contents of the corridor table and hidden corridor data input elements
     */
    refreshHtmlCreate() {
        this.$innerContainer.html('');

        let rowContent = '';

        for (let c of this._corridorArray) {
            rowContent += c.tableHtmlCreate;
        }

        this.$innerContainer.append(tableContent(rowContent));


        this.$corridorDataContainer.html('');

        for (let i = 0; i < this._corridorArray.length; i++) {
            let cor = this._corridorArray[i];
            this.$corridorDataContainer.append(cor.getDataHtml(i));
        }

        this._afterChange();
    }


    get visible() {
        return this._visible;
    }

    set visible(viz) {
        if (viz == this.visible) {
            return;
        }

        this._visible = viz;

        if (this.visible) {
            this.$containerEl.show();
        } else {
            this.$containerEl.hide();
        }
    }

    get fullExtent(): ol.Extent|Array<number>{
        let lyrs: LayerBaseVector[] = [];

        for (let c of this._corridorArray){
            lyrs.push(c.layer);
        }

        return calcExtent.calculateExtent(lyrs);
    }

    /**
     * if currently in a create or modify operation
     * @returns {boolean} is creating or modifying
     */
    get inCreateModifyOperation() {
        return this._inCreateModifyOperation;
    }

    /**
     * if currently in a create or modify operation
     * @param {boolean} isInCreateModifyOperation - is creating or modifying
     */
    set inCreateModifyOperation(isInCreateModifyOperation) {
        this._inCreateModifyOperation = isInCreateModifyOperation;

        if (this.inCreateModifyOperation) {
            this.$innerContainer.addClass('corridor-collection-create-modify');
        } else {
            this.$innerContainer.removeClass('corridor-collection-create-modify');
        }
    }

    /**
     *
     * @returns {boolean} if the corridor popups should be shown
     */
    get showPopups() {
        return this._showPopups;
    }

    /**
     *
     * @param {boolean} show - if the corridor popups should be shown
     */
    set showPopups(show) {
        this._showPopups = show;
    }

    get corridorCount() {
        return this._corridorArray.length;
    }

    /**
     *
     * @param {string} corId - corridor id
     * @returns {Corridor} the corridor matching the id in the lookup
     */
    getCorridorById(corId) {
        return this._coridorLookup[corId];
    }

    loadExistingCorridors() {

        let loadedCount = 0;

        let existingCorridors = document.getElementsByClassName(this._dataClass);

        // parse the data from the hidden input elements
        for (let n = 0; n < existingCorridors.length; n++) {
            let el = existingCorridors[n];

            let conf = new CorridorConfig(el);


            let corridor = new Corridor(
                conf.startPdp, conf.endPdp, conf.startRp, conf.endRp,
                conf.startCounty, conf.endCounty, conf.hgwy, conf.routeId,
                {
                    loadedCallback: () => {
                        loadedCount++;
                        //something special when all the corridors have been loaded
                        if (this.corridorCount == loadedCount) {
                            let ext = this.fullExtent;

                            if (ext) {
                                this._map.getView().fit(ext as ol.Extent, this._map.getSize());
                            }

                            this.refreshHtmlCreate();
                        }
                    }
                }
            );
            corridor.setDbValues(conf);

            if (n == 0) {
                $('#primaryCounty').val(corridor.countyStart);
                $('#primaryRdwyRteId').val(corridor.routeId);
            }

            this.addCorridorCreate(corridor, false);
        }
    }
}

nm.CorridorCollection = CorridorCollection;

export default CorridorCollection;
