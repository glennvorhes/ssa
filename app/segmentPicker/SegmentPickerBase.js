/**
 * Created by gavorhes on 5/13/2016.
 */

/**
 * Created by gavorhes on 5/13/2016.
 */
/**
 * Created by gavorhes on 5/12/2016.
 */
import makeGuid from '../../src/util/makeGuid';
import provide from '../../src/util/provide';
const nm = provide('ssa.select');


class SegmentPickerBase{

    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     */
    constructor(parent, labelContent){
        let guid = makeGuid();

        
        let htmlString = '<div>';
        htmlString += `<label for="${guid}">${labelContent}</label>`;
        htmlString += `<div><select id="${guid}"></select></div>`;
        htmlString += `<div class="rp-popup-container"></div>`;
        htmlString += '</div>';

        parent.append(htmlString);

        /**
         *
         * @type {Array<changeListener>}
         * @private
         */
        this._changeListeners = [];
        
        this._box = parent.find(`#${guid}`);

        this._box.change(() => {
            this.changed();
        })
    }

    /**
     * 
     * @returns {jQuery}
     */
    get box(){
        return this._box;
    }

    changed(){
        let v = this._box.val();
        
        for (let f of this._changeListeners){
            f(v);
        }
    }

    /**
     *
     * @param {changeListener} func
     */
    addChangeListener(func){
        this._changeListeners.push(func);
    }
    
        /**
     * get the picker visibility
     * @returns {boolean} is visible
     */
    get visible() {
        return this._visible;
    }

    /**
     * set the picker visibility
     * @param {boolean} vis is visible
     */
    set visible(vis) {
        if (this.visible === vis) {
            return;
        }
        if (vis) {
            this._$mapContainer.show();
            this._closeOtherPickers();
        } else {
            this._$mapContainer.hide();
            this._pickerMapPopup.closePopup();
        }
        this._visible = vis;
    }
}

nm.SegmentPickerBase = SegmentPickerBase;

export default SegmentPickerBase;
