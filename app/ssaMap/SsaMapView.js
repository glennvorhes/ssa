/**
 * Created by gavorhes on 5/13/2016.
 */


import SsaMapBase from './SsaMapBase';
import provide from '../../src/util/provide';
import CorridorConfig from '../corridor/CorridorConfig';
import Corridor from '../corridor/Corridor';
import * as styles  from '../layerStyles';
import LayerBaseVectorGeoJson from '../../src/layers/LayerBaseVectorGeoJson';
import {getCrashes} from '../ajaxGetters';
import ol from '../../src/ol/ol';

const nm = provide('ssa');

class SsaMapView extends SsaMapBase {

    /**
     *
     * @param {string} divId - container for the map
     * @param {string} [dataClass=corridor-data] - class selector for the corridor data elements
     */
    constructor(divId, dataClass) {
        super(divId);

        dataClass = typeof dataClass == 'string' ? dataClass : 'corridor-data';
        dataClass = '.' + dataClass;

        /**
         *
         * @type {Array<CorridorConfig>}
         */
        let corridorConfigs = [];

        $(dataClass).each((n, el) => {
            corridorConfigs.push(new CorridorConfig(el));
        });

        for (let i = 0; i < corridorConfigs.length; i++) {
            let conf = corridorConfigs[i];

            let corridor = new Corridor(conf.startPdp, conf.endPdp, conf.startRp, conf.endRp,
                conf.startCounty, conf.endCounty, conf.hgwy);

            this.mainMap.addLayer(corridor.olLayer);

            this.mainMapPopup.addVectorPopup(corridor.layer, styles.mmPopupContent);
        }

        this.crashLayer = new LayerBaseVectorGeoJson('', {
            name: 'Crashes',
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 0, 0.7)'
                    }),
                    stroke: new ol.style.Stroke({color: 'red', width: 1})
                })
            }),
            transform: {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}
        });

        this.mainMap.addLayer(this.crashLayer.olLayer);

        getCrashes((d) => {
            this.crashLayer.addFeatures(d);
        });
    }
}

nm.SsaMapView = SsaMapView;
export default SsaMapView;
