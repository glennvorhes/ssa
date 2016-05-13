/**
 * Created by gavorhes on 5/12/2016.
 */

import selectBox from '../app/selectBox/SelectBoxBase';
import SelectStartCounty from '../app/selectBox/SelectStartCounty';
import $ from '../src/jquery';

let container = $('#container1');

let g = new selectBox(container, 'my label');
let d = new SelectStartCounty(container, 'start county');



