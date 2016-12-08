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
        this.ssaId = parseInt(inputElement.find('.corridor-data-ssa-id').val());
        this.snapshotVersion = parseInt(inputElement.find('.corridor-data-snapshot').val());
        this.corridorId = parseInt(inputElement.find('.corridor-data-corridor-id').val());
        this.startCounty = parseInt(inputElement.find('.corridor-data-start-county').val());
        this.endCounty = parseInt(inputElement.find('.corridor-data-end-county').val());
        this.hgwy = inputElement.find('.corridor-data-highway').val();
        this.startRp = inputElement.find('.corridor-data-from-rp').val();
        this.endRp = inputElement.find('.corridor-data-to-rp').val();
        this.startPdp = parseInt(inputElement.find('.corridor-data-from-pdp').val());
        this.endPdp = parseInt(inputElement.find('.corridor-data-to-pdp').val());
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
    CorridorConfig.prototype.toString = function () {
        return "CorId " + this.corridorId + " " + this.startRp + " - " + this.endRp;
    };
    return CorridorConfig;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CorridorConfig;
//# sourceMappingURL=CorridorConfig.js.map