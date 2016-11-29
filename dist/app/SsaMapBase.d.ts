/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { MapPopupCls } from "webmapsjs/dist/olHelpers/mapPopupCls";
import { MapMoveCls } from "webmapsjs/dist/olHelpers/mapMoveCls";
import ol from 'custom-ol';
export declare class SsaMapBase {
    $mainContainer: JQuery;
    _mapId: string;
    mainMapMove: MapMoveCls;
    mainMapPopup: MapPopupCls;
    mainMap: ol.Map;
    constructor(divId: string);
    readonly mapId: string;
    /**
     *
     * @returns {JQuery|jQuery|HTMLElement}
     * @protected
     */
    readonly $mapDiv: JQuery;
}
export default SsaMapBase;
