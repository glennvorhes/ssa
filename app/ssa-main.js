/**
 * Created by gavorhes on 3/23/2016.
 */

import '../app/ssa-corridor-picker';
import $ from '../src/jquery';


(function () {
    "use strict";
    var ssaPicker = $('#corridor-picker').ssaCorridorPicker();

    var cor1 = new gv['ssa'].Corridor('012W314M000', '012W310P000', 'DANE', 'DANE', 'US 12 WB', null, 1);
    var cor2 = new gv['ssa'].Corridor('051N067P000', '051N070F000', 'DANE', 'DANE', 'US 51 NB', null, 2);
    var cor3 = new gv['ssa'].Corridor('039N256 000', '039N259 000', 'DANE', 'DANE', 'I-39 NB', null, 3);
    var cor4 = new gv['ssa'].Corridor('018E148M000', '018E151M000', 'DANE', 'DANE', 'US 18 EB', null, 4);
    var cor5 = new gv['ssa'].Corridor('090W098M000', '090W094M000', 'SAUK', 'SAUK', 'I-90 WB', null, 5);
    ssaPicker._addCorridor(cor1);
    ssaPicker._addCorridor(cor2);
    ssaPicker._addCorridor(cor3);
    ssaPicker._addCorridor(cor4);
    ssaPicker._addCorridor(cor5);
    ssaPicker._refreshTable();
})();
