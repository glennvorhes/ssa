/**
 * Created by gavorhes on 5/16/2016.
 */
import provide from 'webmapsjs/src/util/provide';
import * as styles  from '../layerStyles';
import $ from 'webmapsjs/src/jquery/jquery';
import * as calcExtent from 'webmapsjs/src/olHelpers/extentUtil';

const nm = provide('ssa');

/**
 *
 * @param {string} [rowHtml=''] data row html
 * @returns {string} full table html
 */
function tableContent(rowHtml) {
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


class CorridorCollection {

    /**
     * @param {string} divId - div id inside which to make the collection
     * @param {SsaMapCreate|SsaMapBase} ssaMap - the SSA map object
     */
    constructor(divId, ssaMap) {

        this.ssaMap = ssaMap;
        this.$containerEl = $('#' + divId).addClass('corridor-collection-container');
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

        this._popupStyle = (props) => {
            if (!this.showPopups){
                return false;
            }

            let returnHtml = '<table class="mm-popup-table">';
            returnHtml += `<tr><td>PdpId</td><td>${props['pdpId']}</td></tr>`;
            returnHtml += `<tr><td>Highway</td><td>${props['hwyDir']}</td></tr>`;
            returnHtml += `<tr><td>Description</td><td>${props['descrip'] ? props['descrip'] : '-'}</td></tr>`;
            returnHtml += `<tr><td>Divided</td><td>${props['divUnd'] == 'D' ? 'Yes' : 'No'}</td></tr>`;
            returnHtml += `<tr><td>From RP</td><td>${props['pdpFrom']}</td></tr>`;
            returnHtml += `<tr><td>To RP</td><td>${props['pdpTo']}</td></tr>`;
            returnHtml += '</table>';

            return returnHtml;
        };
    }

    
    /**
     * add a corridor
     * @param {Corridor} c - the corridor to be added
     */
    addCorridorCreate(c) {
        this._corridorArray.push(c);
        this._coridorLookup[c.clientId] = c;
        this.ssaMap.mainMap.addLayer(c.olLayer);
        this.ssaMap.mainMap.addLayer(c.nodeLayer.olLayer);
        c.layer.name = corridorName(c.rpFrom, c.rpTo);
        this.ssaMap.mainMapPopup.addVectorPopup(c.layer, this._popupStyle);
        this.refreshHtmlCreate();
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
        this.ssaMap.mainMapPopup.removeVectorPopup(cor.layer);
        this.ssaMap.mainMap.removeLayer(cor.olLayer);
        this.ssaMap.mainMap.removeLayer(cor.nodeLayer.olLayer);
        this._corridorArray.splice(ix, 1);
        delete this._coridorLookup[cor.clientId];

        this.ssaMap.mainMap.getView().setZoom(this.ssaMap.mainMap.getView().getZoom() - 1);
        this.ssaMap.mainMap.getView().setZoom(this.ssaMap.mainMap.getView().getZoom() + 1);

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

        let _this = this;

        this.$innerContainer.find('.corridor-zoom').click(function () {

            let corridorId = $(this).attr('data-corridor');
            let cor = _this._coridorLookup[corridorId];
            _this.ssaMap.mainMap.getView().fit(cor.extent, _this.ssaMap.mainMap.getSize());
        });

        this.$innerContainer.find('.corridor-delete').click(function () {

            let corridorId = $(this).attr('data-corridor');
            _this.removeCorridor(corridorId);
        });

        this.$innerContainer.find('.corridor-edit').click(function () {
            _this.ssaMap.$createCorridorButton.prop('disabled', true);
            let corridorId = $(this).attr('data-corridor');
            let cor = _this._coridorLookup[corridorId];
            _this.ssaMap.pickerCollection.startPicker(cor);
            $(this).closest('.corridor-tr').addClass('corridor-tr-selected');
        });

        this.ssaMap.$corridorDataContainer.html('');


        for (let i = 0; i < this._corridorArray.length; i++) {
            let cor = this._corridorArray[i];
            cor.getDataHtml(i);
            this.ssaMap.$corridorDataContainer.append(cor.getDataHtml(i));
        }
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

    get fullExtent() {
        return calcExtent.calculateExtent(this._corridorArray);
    }

    /**
     * if currently in a create or modify operation
     * @returns {boolean} is creating or modifying
     */
    get inCreateModifyOperation(){
        return this._inCreateModifyOperation;
    }

    /**
     * if currently in a create or modify operation
     * @param {boolean} isInCreateModifyOperation - is creating or modifying
     */
    set inCreateModifyOperation(isInCreateModifyOperation){
        this._inCreateModifyOperation = isInCreateModifyOperation;

        if (this._inCreateModifyOperation){
            this.$innerContainer.addClass('corridor-collection-create-modify');
        } else {
            this.$innerContainer.removeClass('corridor-collection-create-modify');
        }
    }

    /**
     *
     * @returns {boolean} if the corridor popups should be shown
     */
    get showPopups(){
        return this._showPopups;
    }

    /**
     *
     * @param {boolean} show - if the corridor popups should be shown
     */
    set showPopups(show){
        this._showPopups = show;
    }
    
    get corridorCount(){
        return this._corridorArray.length;
    }
}

nm.CorridorCollection = CorridorCollection;
export default CorridorCollection;
