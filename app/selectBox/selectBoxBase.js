/**
 * Created by gavorhes on 5/13/2016.
 */
/**
 * Created by gavorhes on 5/12/2016.
 */
import makeGuid from '../../src/util/makeGuid';
import provide from '../../src/util/provide';
const nm = provide('ssa.select');


class SelectBoxBase{
    
    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     * @param {contentGenFunc} [contentGen=undefined] 
     */
    constructor(parent, labelContent, contentGen){
        let guidTop = makeGuid();
        let guid = makeGuid();

        let htmlString = `<div id="${guidTop}">`;
        htmlString += `<label for="${guid}">${labelContent}</label>`;

        if (contentGen){
            htmlString += contentGen(guid);
        } else {
            htmlString += `<select id="${guid}"></select>`;
        }
        htmlString += '</div>';

        parent.append(htmlString);

        this._$container = parent.find('#' + guidTop);

        this.$label = this._$container.find('label');

        /**
         *
         * @type {Array<changeListener>}
         * @private
         */
        this._changeListeners = [];
        
        /**
         * reference to the selector box
         * @protected
         * @type {jQuery}
         */
        this._box = parent.find(`#${guid}`);
        
        if (!this._box){
            throw 'the select box was not found';
        }

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
     *
     * @returns {string|number}
     */
    get selectedValue(){
        let theVal = this.box.val();

        if (isNaN(theVal)){
            return theVal
        } else {
            if (theVal.indexOf('.') > -1){
                return parseFloat(theVal)
            } else {
                return parseInt(theVal);
            }
        }
    }
    
    get selectedText(){
        return this.box.find('option:selected').text();
    }

}

nm.SelectBoxBase = SelectBoxBase;

export default SelectBoxBase;
