/**
 * Created by gavorhes on 5/16/2016.
 */
import provide from '../../src/util/provide'
import * as styles  from '../layerStyles';
const nm = provide('ssa');

/**
 *
 * @param {string} [rowHtml='']
 * @returns {string}
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
 * @param {string} fromRp
 * @param {string} toRp
 * @returns {string}
 */
function corridorName(fromRp, toRp){
    "use strict";
    
    return fromRp.substring(0,7) + ' - ' + toRp.substring(0, 7);
}


class CorridorCollection {

    /**
     * @param {string} divId
     * @param {SsaMapCreate|SsaMapBase} ssaMap
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
    }

    /**
     *
     * @param {Corridor} c
     */
    addCorridorCreate(c) {
        this._corridorArray.push(c);
        this._coridorLookup[c.clientId] = c;
        this.ssaMap.mainMap.addLayer(c.olLayer);
        c.layer.name = corridorName(c.rpFrom, c.rpTo);
        


        this.ssaMap.mainMapPopup.addVectorPopup(c.layer, styles.mmPopupContent);

        this.refreshHtmlCreate();
    }


    /**
     *
     * @param {string|Corridor} cor
     */
    removeCorridor(cor) {
        if (!confirm('Confirm Delete Corridor?')) {
            return;
        }

        if (typeof cor == 'string') {
            cor = this._coridorLookup[cor];
        }

        let ix = this._corridorArray.indexOf(cor);
        this._corridorArray.splice(ix, 1);
        delete this._coridorLookup[cor.clientId];
        this.ssaMap.mainMapPopup.removeVectorPopup(cor.layer);
        cor.layer.visible = false;
        cor.layer.source.clear();
        this.ssaMap.mainMap.getView().setZoom( this.ssaMap.mainMap.getView().getZoom() - 1);
        this.ssaMap.mainMap.getView().setZoom( this.ssaMap.mainMap.getView().getZoom() + 1);
        // this.ssaMap.mainMap.removeLayer(cor.layer.olLayer);
        this.refreshHtmlCreate();
    }

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
            _this.ssaMap.pickerCollection.startEditCorridor(cor);
        });

        this.ssaMap.$corridorDataContainer.html('');


        for (let i = 0; i < this._corridorArray.length; i++) {
            let cor = this._corridorArray[i];
            cor.getDataHtml(i);
            cor.getDataHtmlDisp(i);
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
            this.$containerEl.show()
        } else {
            this.$containerEl.hide();
        }
    }


}

nm.CorridorCollection = CorridorCollection;
export default CorridorCollection;