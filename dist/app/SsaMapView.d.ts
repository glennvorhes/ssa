/**
 * Created by gavorhes on 5/13/2016.
 */
import SsaMapBase from './SsaMapBase';
import Corridor from '../corridor/Corridor';
export declare class SsaMapView extends SsaMapBase {
    createdCorridorsLength: number;
    _corridorArray: Corridor[];
    loadedCorridorsLength: number;
    private _ssaId;
    private _snap;
    /**
     *
     * @param {string} divId - container for the map
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     * @param {string} [infoAnchorId=ssa-corridor-info-anchor] - id of element after which to insert the info rows
     */
    constructor(divId: any, dataClass: any, infoAnchorId: any);
    _afterCorridorLoad(): void;
    private _fitExtent();
}
export default SsaMapView;
