/**
 * Created by gavorhes on 10/4/2016.
 */
import {SsaMapCreate} from './SsaMapCreate';
import {SsaMapView} from './SsaMapView';

declare const glob;

window['SsaMapCreate'] = SsaMapCreate;
window['SsaMapView'] = SsaMapView;

try {
    glob['SsaMapCreate'] = SsaMapCreate;
    glob['SsaMapView'] = SsaMapView;
}
catch (ex) {
    let glob = {};
    glob['SsaMapCreate'] = SsaMapCreate;
    glob['SsaMapView'] = SsaMapView;
}

