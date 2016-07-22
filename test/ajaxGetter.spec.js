/**
 * Created by gavorhes on 5/12/2016.
 */

import * as ajaxGetters from '../app/AjaxGetters';

ajaxGetters.getStartCounties((d) => {
    "use strict";
    if (!d){
        throw 'could not get start counties';
    }
});

ajaxGetters.getHighways(2, (d) => {
    "use strict";

   if (!d){
        throw 'could not get start counties';
    }
});

ajaxGetters.getEndCounties('US 12 WB', (d) => {
    if (!d){
        throw 'could not get end counties';
    }
});

ajaxGetters.getSegments(13, 'US 12 WB', (d) => {
    "use strict";
   console.log(d);
});

ajaxGetters.getSegments(13, 'I-94 EB', (d) => {
    "use strict";
   console.log(d);
});

ajaxGetters.getSegments(14, 'WIS 175 NB', (d) => {
    "use strict";
   console.log(d);
});
