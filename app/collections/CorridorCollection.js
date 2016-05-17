/**
 * Created by gavorhes on 5/16/2016.
 */
import provide from '../../src/util/provide'
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
    tableContent += '<th>Corridor</th>';
    tableContent += '<th></th>';
    tableContent += "</tr>";
    tableContent += rowHtml;
    tableContent += "</table>";
    return tableContent;
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
        c.layer.name = c.rpFrom + '-' + c.rpTo;

        this.ssaMap.mainMapPopup.addVectorPopup(c.layer, (props) => {
            let returnHtml = '<table class="mm-popup-table">';
            returnHtml += `<tr><td>PdpId</td><td>${props['pdpId']}</td></tr>`;
            returnHtml += `<tr><td>Hwy</td><td>${props['hwyDir']}</td></tr>`;
            returnHtml += `<tr><td>DivUnd</td><td>${props['divUnd']}</td></tr>`;
            returnHtml += `<tr><td>From</td><td>${props['pdpFrom']}</td></tr>`;
            returnHtml += `<tr><td>To</td><td>${props['pdpTo']}</td></tr>`;
            returnHtml += '</table>';
            return returnHtml;
        });

        this._refreshHtmlCreate();
    }

    /**
     *
     * @param {string} corId
     * @param {Corridor} cor
     */
    updateCorridor(corId, cor) {
        /**
         *
         * @type {Corridor}
         */
        let theCorridor = this._coridorLookup[corId];
        theCorridor.updateCorridor(cor);

        this._refreshHtmlCreate();
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
        this._refreshHtmlCreate();
    }

    _refreshHtmlCreate() {
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

        for (let l of this._corridorArray) {
            l.layer.visible = this.visible;
        }

        if (this.visible) {
            this.$containerEl.show()
        } else {
            this.$containerEl.hide();
        }
    }


}

nm.CorridorCollection = CorridorCollection;
export default CorridorCollection;