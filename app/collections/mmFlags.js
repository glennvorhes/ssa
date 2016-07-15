/**
 * Created by gavorhes on 7/15/2016.
 */
import LayerBaseVectorGeoJson from 'webmapsjs/src/layers/LayerBaseVectorGeoJson';
import * as layerStyles from '../layerStyles';
import filterMmFlag from '../filters/filterMmFlag';
import mapPopup from 'webmapsjs/src/olHelpers/mapPopup';


class MmFlags {
    constructor() {
        this.flagLayer1 = new LayerBaseVectorGeoJson('', {zIndex: 6, style: layerStyles.mmFlagStyle, visible: false, name: "MM Rate Flag"});
        this.flagLayer2 = new LayerBaseVectorGeoJson('', {zIndex: 6, style: layerStyles.mmFlagStyle, visible: false, name: "MM AK Flag"});

    }

    /**
     *
     * @param {ol.Map} m
     */
    init(m) {
        m.addLayer(this.flagLayer1.olLayer);
        m.addLayer(this.flagLayer2.olLayer);
        
        filterMmFlag.addChangeCallback(() => {
            this.flagLayer1.visible = filterMmFlag.mmRateOn1;
            this.flagLayer2.visible = filterMmFlag.mmRateOn2;
        });

        mapPopup.addVectorPopup(this.flagLayer1, (props) => {
            return "Rate Flag: " + props['rateFlag'].toFixed(3);
        });

        mapPopup.addVectorPopup(this.flagLayer2, (props) => {
            return "AK Flag: " + props['akFlag'].toFixed(3);
        });
    }

    /**
     * 
     * @param {Corridor} c
     */
    addCorridor(c){
        let feats = c.layer.source.getFeatures();

        for (let f of feats){
            let props = f.getProperties();
            let rate = props['rateFlag'];
            let ak = props['akFlag'];

            if (typeof rate == 'number' && rate > 1){
                this.flagLayer1.source.addFeature(f);
            }

            if (typeof ak == 'number' && ak > 1){
                this.flagLayer2.source.addFeature(f);
            }
        }
    }
}


export default new MmFlags();

