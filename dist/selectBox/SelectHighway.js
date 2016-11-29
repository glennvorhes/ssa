/**
 * Created by gavorhes on 5/12/2016.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectBoxBase_1 = require('webmapsjs/dist/domUtil/SelectBoxBase');
var ajaxGetters_1 = require('../ajaxGetters');
var provide_1 = require('webmapsjs/dist/util/provide');
var nm = provide_1.default('ssa.select');
var SelectHighway = (function (_super) {
    __extends(SelectHighway, _super);
    /**
     *
     * @param {jQuery} parent - parent element
     */
    function SelectHighway(parent) {
        _super.call(this, parent, "Highway");
    }
    // /**
    //  *
    //  * @param {number} countyId - county id
    //  * @param {string|undefined} [hwy=undefined] - route id for initial selection
    //  */
    // setStartCounty(countyId, hwy) {
    //     hwy = typeof hwy == 'string' ? hwy : undefined;
    //     this.box.html('');
    //     this.box.addClass('refresh').removeClass('refresh');
    //
    //     Ajx.getHighways(countyId, (d) => {
    //         "use strict";
    //
    //         for (let h of d) {
    //             this.box.append(`<option>${h['name']}</option>`);
    //         }
    //         if (d) {
    //             if (hwy) {
    //                 this.box.val(hwy);
    //             } else {
    //                 this.box.trigger('change');
    //
    //             }
    //         }
    //     });
    // }
    /**
     *
     * @param {number|string|null} startId - start county id
     * @param {number|string|null} endId - end county id
     * @param {number|string|null} [routeId=undefined] - route id for selection
     * @param {boolean} [forceTrigger=false] - force change trigger to populate the rp pickers
     */
    SelectHighway.prototype.setStartEndCounty = function (startId, endId, routeId, forceTrigger) {
        var _this = this;
        if (forceTrigger === void 0) { forceTrigger = false; }
        forceTrigger = typeof forceTrigger == 'boolean' ? forceTrigger : false;
        if (startId == null || startId == undefined || endId == null) {
            return;
        }
        if (typeof routeId == 'number') {
            routeId = routeId.toFixed();
        }
        this.box.html('');
        this.box.addClass('refresh').removeClass('refresh');
        if (typeof startId == 'string') {
            startId = parseInt(startId);
        }
        if (typeof endId == 'string') {
            endId = parseInt(endId);
        }
        if (typeof routeId == 'string') {
            routeId = parseInt(routeId);
        }
        ajaxGetters_1.default.getHwyByStartEndCounty(startId, endId, function (d) {
            if (d.length > 0) {
                d.sort(function (a, b) {
                    var aName = a['name'];
                    var bName = b['name'];
                    if (aName == bName) {
                        return 0;
                    }
                    else {
                        return aName > bName ? 1 : -1;
                    }
                });
                for (var _i = 0, d_1 = d; _i < d_1.length; _i++) {
                    var c = d_1[_i];
                    _this.box.append("<option value=\"" + c['id'] + "\" " + (c['primary'] ? 'selected' : '') + ">" + c['name'] + "</option>");
                }
                if (routeId) {
                    _this.box.val(routeId.toFixed());
                }
                if (!routeId || forceTrigger) {
                    _this.box.trigger('change');
                }
                _this.box.prop('disabled', false);
            }
            else {
                _this.box.prop('disabled', true);
                _this.box.trigger('change');
            }
        });
    };
    return SelectHighway;
}(SelectBoxBase_1.default));
exports.SelectHighway = SelectHighway;
nm.SelectHighway = SelectHighway;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SelectHighway;
//# sourceMappingURL=SelectHighway.js.map