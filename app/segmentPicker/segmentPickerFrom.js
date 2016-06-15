/**
 * Created by gavorhes on 5/13/2016.
 */

import SegmentPickerBase from './SegmentPickerBase';
import * as layerStyles from '../layerStyles';

/**
 * The from segment/rp picker
 * @extends SegmentPickerBase
 */
class SegmentPickerFrom extends SegmentPickerBase {

    /**
     *
     * @param {jQuery} parent - parent element as jquery
     */
    constructor(parent) {
        super(parent, 'Ref. Point #1');
    }

    /**
     * @private
     * @param {Array<object>} arr - array of returned objects
     */
    processAjaxResult(arr) {

        arr.sort((a, b) => {
            let c = a['properties']['pdpFrom'];
            let d = b['properties']['pdpFrom'];

            if (c == d) {
                return 0;
            }
            
            return c < d ? -1 : 1;
        });

        for (let feat of arr) {
            let props = feat['properties'];
            this.box.append(`<option value="${props['pdpId']}">${props['pdpFrom']}</option>`);
        }
    }

    /**
     *
     * @returns {ol.style.Style} ol selection style
     */
    get selectionStyle() {
        return layerStyles.segmentSelectionStyleFrom;
    }

    /**
     * @returns {ol.style.Style} ol style for "other" feature
     */
    get selectionStyleOther() {
        return layerStyles.segmentSelectionStyleTo;
    }
}

export default SegmentPickerFrom;
