/**
 * Created by gavorhes on 5/17/2016.
 */
"use strict";
var countyLookup_1 = require('../countyLookup');
var $ = require('jquery');
function labelValueHelper(label, val) {
    "use strict";
    var outHtml = '<div class="col-xs-2">';
    outHtml += "<label>" + label + "</label>";
    outHtml += "<input class=\"form-control\" type=\"text\" readonly=\"\" value=\"" + val + "\">";
    outHtml += "</div>";
    return outHtml;
}
var CorridorConfig = (function () {
    /**
     *
     * @param {jQuery|HTMLDivElement|*} inputElement
     */
    function CorridorConfig(inputElement) {
        if (!inputElement.val) {
            inputElement = $(inputElement);
        }
        /**
         *
         * @type {number}
         */
        this.startCounty = parseInt(inputElement.find('.corridor-data-start-county').val());
        /**
         *
         * @type {number}
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
         * @type {number}
         */
        this.startPdp = parseInt(inputElement.find('.corridor-data-from-pdp').val());
        /**
         *
         * @type {number}
         */
        this.endPdp = parseInt(inputElement.find('.corridor-data-to-pdp').val());
        /**
         *
         * @type {number}
         */
        this.routeId = parseInt(inputElement.find('.corridor-data-route-id').val());
    }
    /**
     * @returns {string} bootstrap formatted corridor description
     */
    CorridorConfig.prototype.bootstrapHtml = function (index) {
        index++;
        var outHtml = '<div class="row ssa-corridor-info-row">';
        outHtml += '<div class="col-xs-2">';
        outHtml += "<label>Corridor #" + index + "</label>";
        outHtml += '</div>';
        outHtml += labelValueHelper('Highway', this.hgwy);
        outHtml += labelValueHelper('Start County', countyLookup_1.getCountyById(this.startCounty));
        outHtml += labelValueHelper('End County', countyLookup_1.getCountyById(this.endCounty));
        outHtml += labelValueHelper('Start RP', this.startRp);
        outHtml += labelValueHelper('End RP', this.endRp);
        outHtml += '</div>';
        return outHtml;
    };
    return CorridorConfig;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CorridorConfig;
//# sourceMappingURL=CorridorConfig.js.map