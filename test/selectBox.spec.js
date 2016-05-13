/**
 * Created by gavorhes on 5/12/2016.
 */

import SelectStartCounty from '../app/selectBox/SelectStartCounty';
import SelectHighway from '../app/selectBox/SelectHighway';
import SelectEndCounty from '../app/selectBox/SelectEndCounty';
import SegmentPickerFrom from '../app/segmentPicker/SegmentPickerFrom';
import $ from '../src/jquery';

let container = $('#container1');

let selectStartCounty = new SelectStartCounty(container);
let selectHighway = new SelectHighway(container);
let selectEndCounty = new SelectEndCounty(container);
let segmentPickerFrom = new SegmentPickerFrom(container);

selectStartCounty.addChangeListener((v) => {
    "use strict";
    selectHighway.box.html('');
    selectEndCounty.box.html('');
    selectHighway.setStartCounty(parseInt(v));
});

selectHighway.addChangeListener((v) => {
    "use strict";
    selectEndCounty.box.html('');
    selectEndCounty.setHighway(v);
});

selectEndCounty.addChangeListener((v) => {
    "use strict";
    console.log(v);
    console.log(selectHighway.box.val());
    console.log(selectEndCounty.box.val());
});




