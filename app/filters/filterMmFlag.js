/**
 * Created by gavorhes on 7/14/2016.
 */
import FilterBase from './FilterBase';

class FilterMmFlag extends FilterBase{
    
    constructor(){
        super('mm-flags', 'mm-flags-sub', false);
    }
    
    get mmRateOn1(){
        return this.valIsOn('mm-rate-1');
    }

    get mmRateOn2(){
        return this.valIsOn('mm-rate-2');
    }
}

export default new FilterMmFlag();
