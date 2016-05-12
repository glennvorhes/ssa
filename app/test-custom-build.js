/**
 * Created by gavorhes on 4/26/2016.
 */
console.log('here');
console.log(window);
const ol = require('../../../../../node_modules/openlayers/build/ol-custom.js');
console.log(ol);

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  controls: ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  }),
  view: new ol.View({
    center: [0, 0],
    zoom: 4
  })
});