/**
 * Created by gavorhes on 5/13/2016.
 */


import SsaMapBase from './SsaMapBase';

class SsaMapCreate extends SsaMapBase{
    
    constructor(divId){
        super(divId);
        this.mainContainer.prepend(`<div class="ssa-map-sidebar"></div>`);
        this.pickerMap.updateSize();
    }
}

export default SsaMapCreate;