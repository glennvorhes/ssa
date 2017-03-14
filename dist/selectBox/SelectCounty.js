/**
 * Created by gavorhes on 6/14/2016.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectBoxBase_1 = require("webmapsjs/dist/domUtil/SelectBoxBase");
var ajaxGetters_1 = require("../ajaxGetters");
var provide_1 = require("webmapsjs/dist/util/provide");
var nm = provide_1.default('ssa.select');
var SelectCounty = (function (_super) {
    __extends(SelectCounty, _super);
    /**
     *
     * @param {jQuery} parent
     * @param {string} labelContent
     */
    function SelectCounty(parent, labelContent) {
        var _this = _super.call(this, parent, labelContent) || this;
        ajaxGetters_1.default.getAllCounties(function (d) {
            for (var _i = 0, d_1 = d; _i < d_1.length; _i++) {
                var c = d_1[_i];
                _this.box.append("<option value=\"" + c['id'] + "\" " + (c['primary'] ? 'selected' : '') + ">" + c['name'] + "</option>");
            }
            _this.box.trigger('change');
        });
        return _this;
    }
    return SelectCounty;
}(SelectBoxBase_1.default));
exports.SelectCounty = SelectCounty;
nm.SelectStartCounty = SelectCounty;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SelectCounty;
//# sourceMappingURL=SelectCounty.js.map