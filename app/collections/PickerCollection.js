/**
 * Created by gavorhes on 5/16/2016.
 */


import SelectStartCounty from '../selectBox/SelectStartCounty';
import SelectHighway from '../selectBox/SelectHighway';
import SelectEndCounty from '../selectBox/SelectEndCounty';
import SegmentPickerFrom from '../segmentPicker/SegmentPickerFrom';
import SegmentPickerTo from '../segmentPicker/SegmentPickerTo';
import Corridor from '../Corridor';
import provide from '../../src/util/provide'
import $ from '../../src/jquery';
const nm = provide('ssa');

class PickerCollection {

    /**
     *
     * @param {string} divId
     * @param {SsaMapCreate} ssaMapCreate
     */
    constructor(divId, ssaMapCreate) {
        this._ssaMapCreate = ssaMapCreate;
        this.$containerEl = $('#' + divId).addClass('picker-collection-container');
        this.$containerEl.append('<div class="picker-collection"></div>');
        this.$containerEl.append('<input type="button" value="Preview" class="btn btn-default picker-preview">');
        this.$containerEl.append('<input type="button" value="Add" class="btn btn-default picker-add" disabled="disabled">');
        this.$containerEl.append('<input type="button" value="Modify" class="btn btn-default picker-modify" disabled="disabled" style="display: none;">');
        this.$containerEl.append('<input type="button" value="Cancel" class="btn btn-default picker-cancel">');
        this.$innerContainer = this.$containerEl.find('.picker-collection');
        this._visible = false;

        /**
         *
         * @type {Corridor|undefined}
         * @private
         */
        this._modifyCorridor = undefined;

        /**
         *
         * @type {Corridor|undefined}
         * @private
         */
        this._modifyCorridorOriginal = undefined;


        /**
         *
         * @type {Corridor|undefined}
         */
        this.previewCorridorObject = undefined;

        this.$btnPickerPreview = this.$containerEl.find('.picker-preview');
        this.$btnPickerAdd = this.$containerEl.find('.picker-add');
        this.$btnPickerModify = this.$containerEl.find('.picker-modify');
        this.$btnPickerCancel = this.$containerEl.find('.picker-cancel');

        this.countyStartSelect = new SelectStartCounty(this.$innerContainer);
        this.highwaySelect = new SelectHighway(this.$innerContainer);
        this.countyEndSelect = new SelectEndCounty(this.$innerContainer);
        this.segmentPickerFrom = new SegmentPickerFrom(this.$innerContainer);
        this.segmentPickerTo = new SegmentPickerTo(this.$innerContainer);

        this.segmentPickerFrom.otherPicker = this.segmentPickerTo;
        this.segmentPickerTo.otherPicker = this.segmentPickerFrom;

        this.$btnPickerCancel.click(() => {
            this.cancel();
        });

        this.$btnPickerPreview.click(() => {
            this.previewCorridor();
        });

        this.$btnPickerAdd.click(() => {
            this.addCorridor();
        });

        this.$btnPickerModify.click(() => {
            this.modifyCorridor();
        });

        this.countyStartSelect.addChangeListener((v) => {
            "use strict";
            // this.highwaySelect.box.html('');
            // this.countyEndSelect.box.html('');
            this.segmentPickerFrom.clear();
            this.segmentPickerTo.clear();
            this.highwaySelect.setStartCounty(parseInt(v));

        });

        this.highwaySelect.addChangeListener((v) => {
            "use strict";
            // this.countyEndSelect.box.html('');
            this.countyEndSelect.setHighway(v);
        });

        this.countyEndSelect.addChangeListener((v) => {
            "use strict";
            let hwy = this.highwaySelect.selectedValue;
            this.segmentPickerFrom.setCountyAndHighway(this.countyStartSelect.selectedValue, hwy);
            this.segmentPickerTo.setCountyAndHighway(v, hwy);
            this.$btnPickerAdd.prop('disabled', true);
        });

        $(document).click((event) => {
            let containerClass = 'select-picker-map-container';
            let evtTarget = $(event.target);

            if (evtTarget.parents('.' + containerClass).length == 0 && !evtTarget.hasClass(containerClass)) {
                this.segmentPickerFrom.visible = false;
                this.segmentPickerTo.visible = false;
            }
        });
    }

    cancel() {
        this.$btnPickerAdd.show();
        this.$btnPickerModify.hide();
        this.$btnPickerModify.prop('disabled', true);
        this.visible = false;
        this._ssaMapCreate.$createCorridorButton.prop('disabled', false);


        if (this.previewCorridorObject) {
            this._ssaMapCreate.mainMap.removeLayer(this.previewCorridorObject.olLayer);
            this.previewCorridorObject = undefined;
        }

        if (this._modifyCorridor) {
            this._ssaMapCreate.mainMap.removeLayer(this._modifyCorridor.layer.olLayer);
            this._modifyCorridor = undefined;
        }

        this.countyStartSelect.box.val(1).trigger('change');
        this._ssaMapCreate.corridorCollection.visible = true;
    }

    previewCorridor() {
        if (!this.segmentPickerFrom.selectedPdpId || !this.segmentPickerTo.selectedPdpId) {
            alert('Select From and To Reference Points');
        }

        let cor = new Corridor(
            this.segmentPickerFrom.selectedPdpId,
            this.segmentPickerTo.selectedPdpId,
            this.segmentPickerFrom.selectedText,
            this.segmentPickerTo.selectedText,
            this.countyStartSelect.selectedValue,
            this.countyEndSelect.selectedValue,
            this.highwaySelect.selectedText, {
                loadedCallback: (c) => {
                    if (c.valid) {
                        if (this._modifyCorridor) {
                            this._modifyCorridor.updateCorridor(c);
                        } else {
                            this.previewCorridorObject = c;
                            this._ssaMapCreate.mainMap.addLayer(c.olLayer);
                        }

                        this._ssaMapCreate.mainMap.getView().fit(c.extent, this._ssaMapCreate.mainMap.getSize());
                        this.$btnPickerAdd.prop('disabled', false);
                        this.$btnPickerModify.prop('disabled', false);
                    } else {
                        this.previewCorridorObject = undefined;
                        alert(c.error);
                    }
                }
            }
        );
    }

    addCorridor() {
        
        this._ssaMapCreate.corridorCollection.addCorridorCreate(this.previewCorridorObject);
        this.cancel();
    }

    modifyCorridor() {
        this._ssaMapCreate.corridorCollection.updateCorridor(this._modifyCorridorOriginal.clientId, this._modifyCorridor);
        this.cancel();
    }

    /**
     *
     * @param {Corridor} cor
     */
    startEditCorridor(cor) {

        this._ssaMapCreate.corridorCollection.visible = false;
        this.visible = true;
        this.$btnPickerAdd.hide();
        this.$btnPickerModify.show();
        this.countyStartSelect.box.val(cor.countyStart.toFixed());
        this.highwaySelect.setStartCounty(cor.countyStart, cor.highway);
        this.countyEndSelect.setHighway(cor.highway, cor.countyEnd);
        this.segmentPickerFrom.setCountyAndHighway(cor.countyStart, cor.highway, cor.pdpFrom);
        this.segmentPickerTo.setCountyAndHighway(cor.countyEnd, cor.highway, cor.pdpTo);

        this._modifyCorridorOriginal = cor;

        this._modifyCorridor = new Corridor(cor.pdpFrom, cor.pdpTo, cor.rpFrom, cor.rpTo,
            cor.countyStart, cor.countyEnd, cor.highway, {color: cor.color, features: cor.features}
        );

        this._ssaMapCreate.mainMap.addLayer(this._modifyCorridor.layer.olLayer);
        this._ssaMapCreate.mainMap.getView().fit(cor.extent, this._ssaMapCreate.mainMap.getSize());
    }

    get visible() {
        return this._visible;
    }

    set visible(viz) {
        this._visible = viz;

        if (this.visible) {
            this.$containerEl.show();
        } else {
            this.$containerEl.hide();
        }

    }
}

nm.PickerCollection = PickerCollection;
export default PickerCollection;