/**
 * Created by gavorhes on 5/12/2016.
 */
import makeGuid from '../../src/util/makeGuid';
import provide from '../../src/util/provide';
const nm = provide('ssa.select');

/**
 * change callback
 *
 * @callback changeListener
 * @param {number|string} val - the new value
 */

class SelectBoxBase{

    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     */
    constructor(parent, labelContent){
        let guid = makeGuid();
        
        
        let htmlString = '<div>';
        htmlString += `<label for="${guid}">${labelContent}</label>`;
        htmlString += `<select id="${guid}"></select>`;
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
     * @protected
     */
    get box(){
        return this._box;
    }

    changed(){
        console.log(this._box.val());

    }

    /**
     *
     * @param {changeListener} func
     */
    addChangeListener(func){
        this._changeListeners.push(func);
        this._changeListeners[0]()
    }
}

nm.SelectBoxBase = SelectBoxBase;

export default SelectBoxBase;