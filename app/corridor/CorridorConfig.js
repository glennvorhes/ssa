/**
 * Created by gavorhes on 5/17/2016.
 */


class CorridorConfig {

    /**
     *
     * @param {jQuery|HTMLDivElement|*} inputElement
     */
    constructor(inputElement) {
        
        if (inputElement.constructor.name.toLowerCase().indexOf('html') > -1) {
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
}

export default CorridorConfig;