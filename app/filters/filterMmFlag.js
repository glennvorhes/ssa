/**
 * Created by gavorhes on 7/14/2016.
 */
import FilterBase from './FilterBase';

class FilterMmFlag extends FilterBase{
    
    constructor(){
        super('mm-flags', 'mm-flags-sub', false);
    }
}

export default new FilterMmFlag();
