/**
 * Created by gavorhes on 5/17/2016.
 */



import {getCountyById} from '../countyLookup';


function labelValueHelper(label, val){
    "use strict";
    let outHtml = '<div class="col-xs-1">';
    outHtml += `<label>${label}</label>`;
    outHtml += `<input class="form-control" type="text" readonly="" value="${val}">`;
    outHtml += `</div>`;
    return outHtml;
}


class CorridorConfig {

    /**
     *
     * @param {jQuery|HTMLDivElement|*} inputElement
     */
    constructor(inputElement) {

        if (!inputElement.val) {
            inputElement = $(inputElement);
        }

        /**
         *
         * @type {Number}
         */
        this.startCounty = parseInt(inputElement.find('.corridor-data-start-county').val());

        /**
         *
         * @type {Number}
         */
        this.endCounty = parseInt(inputElement.find('.corridor-data-end-county').val());

        /**
         *
         * @type {string}
         */
        this.hgwy = inputElement.find('.corridor-data-highway').val();

        /**
         *
         * @type {string}
         */
        this.startRp = inputElement.find('.corridor-data-from-rp').val();

        /**
         *
         * @type {string}
         */
        this.endRp = inputElement.find('.corridor-data-to-rp').val();

        /**
         *
         * @type {Number}
         */
        this.startPdp = parseInt(inputElement.find('.corridor-data-from-pdp').val());

        /**
         *
         * @type {Number}
         */
        this.endPdp = parseInt(inputElement.find('.corridor-data-to-pdp').val());
    }

    /**
     * @returns {string}
     */
    bootstrapHtml(index){
        index++;
        let outHtml = '<div class="row ssa-corridor-info-row">';
        outHtml += '<div class="col-xs-1 col-xs-offset-1">';
        outHtml += `<label>Corridor #${index}</label>`;
        outHtml += '</div>';
        outHtml += labelValueHelper('Highway', this.hgwy);
        outHtml += labelValueHelper('Start County', getCountyById(this.startCounty));
        outHtml += labelValueHelper('End County', getCountyById(this.endCounty));
        outHtml += labelValueHelper('Start RP', this.startRp);
        outHtml += labelValueHelper('End RP', this.endRp);
        outHtml += '</div>';
        return outHtml;

    }
}

export default CorridorConfig;