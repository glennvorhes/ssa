/**
 * Created by gavorhes on 5/16/2016.
 */


import SelectStartCounty from '../selectBox/SelectStartCounty';
import SelectHighway from '../selectBox/SelectHighway';
import SelectEndCounty from '../selectBox/SelectEndCounty';
import SegmentPickerFrom from '../segmentPicker/SegmentPickerFrom';
import SegmentPickerTo from '../segmentPicker/SegmentPickerTo';
import Corridor from '../corridor/Corridor';
import provide from 'webmapsjs/src/util/provide';
import $ from 'webmapsjs/src/jquery/jquery';
import * as lyrStyles from '../layerStyles';
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
        this.$containerEl.append('<div class="picker-collection"><span class="corridor-picker-help" title="Show Help"></span></div>');
        this.$containerEl.append('<input type="button" value="Preview" class="btn btn-default picker-preview">');
        this.$containerEl.append('<input type="button" value="Add" class="btn btn-default picker-add" disabled="disabled">');
        this.$containerEl.append('<input type="button" value="Modify" class="btn btn-default picker-modify" disabled="disabled" style="display: none;">');
        this.$containerEl.append('<input type="button" value="Cancel" class="btn btn-default picker-cancel">');
        this.$innerContainer = this.$containerEl.find('.picker-collection');
        this._visible = false;

        this._dummyCorridor = new Corridor(1, 1, '', '', 1, 1, 'h', -1, {
            cancelLoad: true,
            color: lyrStyles.corridorPreviewColor
        });
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
        this.countyEndSelect = new SelectEndCounty(this.$innerContainer);
        this.highwaySelect = new SelectHighway(this.$innerContainer);

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

            this.highwaySelect.setStartEndCounty(v, this.countyEndSelect.selectedValue);
            this.addModifyEnabled = false;
        });

        this.countyEndSelect.addChangeListener((v) => {
            "use strict";
            this.highwaySelect.setStartEndCounty(this.countyStartSelect.selectedValue, v);
            this.addModifyEnabled = false;
        });

        this.highwaySelect.addChangeListener((hwy) => {
            "use strict";
            this.segmentPickerFrom.setCountyAndRoute(this.countyStartSelect.selectedValue, hwy);
            this.segmentPickerTo.setCountyAndRoute(this.countyEndSelect.selectedValue, hwy);
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

        let helpInfo = 'Corridors are defined by selecting in sequence the start county, highway, and end county ';
        helpInfo += "The reference points are then populated and can be selected either by using the combo box or ";
        helpInfo += "by clicking a segment in the map and clicking select in the resulting popup ";
        helpInfo += "Corridors are defined visually in the pickers as the start segment (green) and end segment (red) ";
        helpInfo += "inclusive of the corridor extents";

        $('body').append(`<div class="corridor-picker-help-dialog" title="Corridor Selection Help">` +
            `<p style="text-align: justify">${helpInfo}</p></div>`);


        this.helpDialog = $(".corridor-picker-help-dialog");

        this.helpDialog.dialog({
            modal: true,
            autoOpen: false,
            height: 450,
            width: 650,
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });

        this.$containerEl.find('.corridor-picker-help').click(() => {
            this.helpDialog.dialog('open');
        });
    }

    cancel() {
        this.$btnPickerAdd.show();
        this.$btnPickerModify.hide();
        this.$btnPickerModify.prop('disabled', true);
        this.visible = false;
        this._ssaMapCreate.$createCorridorButton.prop('disabled', false);
        // this.countyStartSelect.box.val(1).trigger('change');
        this._ssaMapCreate.corridorCollection.visible = true;
        this._dummyCorridor.layer.clear();
        this._modifyCorridor = undefined;
        this._dummyCorridor.nodeLayer.olLayer.getSource().clear();
        this.addModifyEnabled = false;
        this._ssaMapCreate.corridorCollection.createModifyOperation = false;
        $('.corridor-tr-selected').removeClass('corridor-tr-selected');
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
            this.highwaySelect.selectedValue,
            {
                cancelLoad: true,
                color: lyrStyles.corridorPreviewColor
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
     * Populate the selections based on values from an existing corridor
     * @param {Corridor} cor - existing corridor
     */
    startEditCorridor(cor) {
        this.visible = true;
        this.$btnPickerAdd.hide();
        this.$btnPickerModify.show();
        this.countyStartSelect.box.val(cor.countyStart);
        this.countyEndSelect.box.val(cor.countyEnd);
        this.highwaySelect.setStartEndCounty(cor.countyStart, cor.countyEnd, cor.routeId);
        
        this.segmentPickerFrom.setCountyAndRoute(cor.countyStart, cor.routeId, cor.pdpFrom);
        this.segmentPickerTo.setCountyAndRoute(cor.countyEnd, cor.routeId, cor.pdpTo);

        this._modifyCorridor = cor;

        this._dummyCorridor.updateCorridor(cor);

        this._ssaMapCreate.mainMap.getView().fit(this._dummyCorridor.extent, this._ssaMapCreate.mainMap.getSize());
        this._ssaMapCreate.corridorCollection.createModifyOperation = true;
    }

    /**
     * Getter for if the collection is visible {boolean}
     * @returns {boolean} - if visible
     */
    get visible() {
        return this._visible;
    }

    /**
     * Setter for if the collection is visible {boolean}
     * @param {boolean} viz - if visible
     */
    set visible(viz) {
        this._visible = viz;

        if (this.visible) {
            this.$containerEl.show();
        } else {
            this.$containerEl.hide();
        }
    }

    /**
     * Getter for if an add modify operation is happening {boolean}
     * @returns {boolean} - if the add or modify operation is happening
     */
    get addModifyEnabled() {
        return this._addModifyEnabled;
    }

    /**
     * Setter for if an add modify operation is happening {boolean}
     * @param {boolean} isEnabled - if enabled
     */
    set addModifyEnabled(isEnabled) {
        this._addModifyEnabled = isEnabled;
        this.$btnPickerAdd.prop('disabled', !this.addModifyEnabled);
        this.$btnPickerModify.prop('disabled', !this.addModifyEnabled);
    }
}

nm.PickerCollection = PickerCollection;
export default PickerCollection;
