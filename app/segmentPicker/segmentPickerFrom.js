/**
 * Created by gavorhes on 5/13/2016.
 */

import SegmentPickerBase from './SegmentPickerBase';
import * as layerStyles from '../layerStyles';


class SegmentPickerFrom extends SegmentPickerBase {
    constructor(parent) {
        super(parent, 'Ref. Point #1');
    }

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
     * @returns {ol.style.Style}
     */
    get selectionStyle() {
        return layerStyles.segmentSelectionStyleFrom;
    }

    /**
     * @returns {ol.style.Style}
     */
    get selectionStyleOther() {
        return layerStyles.segmentSelectionStyleTo;
    }
}

export default SegmentPickerFrom;