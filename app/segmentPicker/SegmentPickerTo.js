/**
 * Created by gavorhes on 5/13/2016.
 */

import SegmentPickerBase from './SegmentPickerBase';
import * as layerStyles from '../layerStyles';


class SegmentPickerTo extends SegmentPickerBase {
    constructor(parent) {
        super(parent, 'Ref. Point #2');
    }

    processAjaxResult(arr) {

        arr.sort((a, b) => {
            let c = a['properties']['pdpTo'];
            let d = b['properties']['pdpTo'];

            if (c == d) {
                return 0;
            }
            return c < d ? -1 : 1;
        });

        for (let feat of arr) {
            let props = feat['properties'];
            this.box.append(`<option value="${props['pdpId']}">${props['pdpTo']}</option>`);
        }
    }

    /**
     * @returns {ol.style.Style|undefined}
     */
    get selectionStyle() {
        return layerStyles.segmentSelectionStyleTo;
    }

    /**
     * @returns {ol.style.Style}
     */
    get selectionStyleOther() {
        return layerStyles.segmentSelectionStyleFrom;
    }


}

export default SegmentPickerTo;