/**
 * Created by gavorhes on 5/16/2016.
 */


import SelectStartCounty from '../selectBox/SelectStartCounty';
import SelectHighway from '../selectBox/SelectHighway';
import SelectEndCounty from '../selectBox/SelectEndCounty';
import SegmentPickerFrom from '../segmentPicker/SegmentPickerFrom';
import SegmentPickerTo from '../segmentPicker/SegmentPickerTo';
import Corridor from '../corridor/Corridor';
import provide from 'webmapsjs/src/util/provide'
import $ from 'webmapsjs/src/jquery/jquery';
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

        this._dummyCorridor = new Corridor(1, 1, '', '', 1, 1, 'h', {cancelLoad: true, color: 'yellow'});
        this._dummyCorridor.layer.zIndex = 10;
        this._ssaMapCreate.mainMap.addLayer(this._dummyCorridor.olLayer);

        this._addModifyEnabled = false;

        /**
         *
         * @type {Corridor|undefined}
         * @private
         */
        this._modifyCorridor = undefined;


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
            this.segmentPickerFrom.clear();
            this.segmentPickerTo.clear();
            this.highwaySelect.setStartCounty(parseInt(v));
            this.addModifyEnabled = false;

        });

        this.highwaySelect.addChangeListener((v) => {
            "use strict";
            // this.countyEndSelect.box.html('');
            this.countyEndSelect.setHighway(v);
            this.addModifyEnabled = false;
        });

        this.countyEndSelect.addChangeListener((v) => {
            "use strict";
            let hwy = this.highwaySelect.selectedValue;
            this.segmentPickerFrom.setCountyAndHighway(this.countyStartSelect.selectedValue, hwy);
            this.segmentPickerTo.setCountyAndHighway(v, hwy);
            this.addModifyEnabled = false;
        });

        this.segmentPickerFrom.addChangeListener((v) => {
            this.addModifyEnabled = false;
        });

        this.segmentPickerTo.addChangeListener((v) => {
            this.addModifyEnabled = false;
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
        this.countyStartSelect.box.val(1).trigger('change');
        this._ssaMapCreate.corridorCollection.visible = true;
        this._dummyCorridor.layer.clear();
        this._modifyCorridor = undefined;
        this._dummyCorridor.nodeLayer.olLayer.getSource().clear();
        this.addModifyEnabled = false;
    }

    previewCorridor() {
        if (!this.segmentPickerFrom.selectedPdpId || !this.segmentPickerTo.selectedPdpId) {
            alert('Select From and To Reference Points');
            return;
        }

        this._ssaMapCreate.mainMap.removeLayer(this._dummyCorridor.layer.olLayer);
        this._ssaMapCreate.mainMap.removeLayer(this._dummyCorridor.nodeLayer.olLayer);
        this._dummyCorridor = new Corridor(
            this.segmentPickerFrom.selectedPdpId,
            this.segmentPickerTo.selectedPdpId,
             this.segmentPickerFrom.selectedText,
            this.segmentPickerTo.selectedText,
            this.countyStartSelect.selectedValue,
            this.countyEndSelect.selectedValue,
            this.highwaySelect.selectedText,
            {
                cancelLoad: true,
                color: 'yellow'
            }
        );
        this._dummyCorridor.layer.olLayer.zIndex = 10;
        this._ssaMapCreate.mainMap.addLayer(this._dummyCorridor.layer.olLayer);
        this._ssaMapCreate.mainMap.addLayer(this._dummyCorridor.nodeLayer.olLayer);

        this._dummyCorridor.load((c) => {
            //TODO better implementation for an early break
            // if (c.valid) {
            //     this._ssaMapCreate.mainMap.getView().fit(c.extent, this._ssaMapCreate.mainMap.getSize());
            //     this.addModifyEnabled = true;
            // } else {
            //     alert(c.error);
            // }
            this._ssaMapCreate.mainMap.getView().fit(c.extent, this._ssaMapCreate.mainMap.getSize());
            this.addModifyEnabled = true;
        });
    }

    addCorridor() {
        this._ssaMapCreate.corridorCollection.addCorridorCreate(this._dummyCorridor.clone());
        this.cancel();
    }

    modifyCorridor() {
        this._modifyCorridor.updateCorridor(this._dummyCorridor);
        this._ssaMapCreate.corridorCollection.refreshHtmlCreate();
        this.cancel();
    }

    /**
     *
     * @param {Corridor} cor
     */
    startEditCorridor(cor) {
        this.visible = true;
        this.$btnPickerAdd.hide();
        this.$btnPickerModify.show();
        this.countyStartSelect.box.val(cor.countyStart);
        this.highwaySelect.setStartCounty(cor.countyStart, cor.highway);
        this.countyEndSelect.setHighway(cor.highway, cor.countyEnd);
        this.segmentPickerFrom.setCountyAndHighway(cor.countyStart, cor.highway, cor.pdpFrom);
        this.segmentPickerTo.setCountyAndHighway(cor.countyEnd, cor.highway, cor.pdpTo);

        this._modifyCorridor = cor;

        this._dummyCorridor.updateCorridor(cor);

        this._ssaMapCreate.mainMap.getView().fit( this._dummyCorridor.extent, this._ssaMapCreate.mainMap.getSize());
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

    /**
     *
     * @returns {boolean}
     */
    get addModifyEnabled(){
        return this._addModifyEnabled;
    }

    /**
     *
     * @param {boolean} isEnabled
     */
    set addModifyEnabled(isEnabled){
        this._addModifyEnabled = isEnabled;
        this.$btnPickerAdd.prop('disabled', !this.addModifyEnabled);
        this.$btnPickerModify.prop('disabled', !this.addModifyEnabled);
    }
}

nm.PickerCollection = PickerCollection;
export default PickerCollection;