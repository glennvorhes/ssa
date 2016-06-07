/**
 * Created by gavorhes on 5/16/2016.
 */
import provide from 'webmapsjs/src/util/provide'
import * as styles  from '../layerStyles';
const nm = provide('ssa');


/**
 *
 * @param {Array<Corridor>} corArray
 * @returns {*}
 * @static
 */
export function calculateExtent(corArray) {
    let hasExtent = false;

    let minX = 10E100;
    let minY = 10E100;
    let maxX = -10E100;
    let maxY = -10E100;

    for (let c of corArray) {
        if (c.olLayer.getSource().getFeatures().length > 0) {
            hasExtent = true;
            let ext = c.olLayer.getSource().getExtent();
            minX = ext[0] < minX ? ext[0] : minX;
            minY = ext[1] < minY ? ext[1] : minY;
            maxX = ext[2] > maxX ? ext[2] : maxX;
            maxY = ext[3] > maxY ? ext[3] : maxY;
        }
    }

    if (hasExtent) {
        return [minX, minY, maxX, maxY];
    } else {
        return undefined;
    }
}
nm.calculateExtent = calculateExtent;



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
function corridorName(fromRp, toRp) {
    "use strict";

    return fromRp.substring(0, 7) + ' - ' + toRp.substring(0, 7);
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
        this.ssaMap.mainMap.addLayer(c.nodeLayer.olLayer);
        console.log(c.nodeLayer.olLayer);
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
        this.ssaMap.mainMapPopup.removeVectorPopup(cor.layer);
        this.ssaMap.mainMap.removeLayer(cor.olLayer);
        this.ssaMap.mainMap.removeLayer(cor.nodeLayer.olLayer);
        this._corridorArray.splice(ix, 1);
        delete this._coridorLookup[cor.clientId];

        // cor.layer.visible = false;
        // cor.layer.source.clear();
        //

        this.ssaMap.mainMap.getView().setZoom(this.ssaMap.mainMap.getView().getZoom() - 1);
        this.ssaMap.mainMap.getView().setZoom(this.ssaMap.mainMap.getView().getZoom() + 1);
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
            // cor.getDataHtmlDisp(i);
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

    get fullExtent() {
        return calculateExtent(this._corridorArray);
    }

}

nm.CorridorCollection = CorridorCollection;
export default CorridorCollection;


   