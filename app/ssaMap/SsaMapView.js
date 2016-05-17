/**
 * Created by gavorhes on 5/13/2016.
 */


import SsaMapBase from './SsaMapBase';
import provide from '../../src/util/provide';
const nm = provide('ssa');

class SsaMapView extends SsaMapBase{
    
    constructor(divId){
        super(divId);
        // this.$mainContainer.prepend(`<div class="ssa-map-sidebar"></div>`);
        // this.mainMap.updateSize();
    }
}


nm.SsaMapView = SsaMapView;
export default SsaMapView;
