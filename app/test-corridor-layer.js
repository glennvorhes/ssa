/**
 * Created by gavorhes on 4/27/2016.
 */

import quickMap from '../../../../static/js/olHelpers/quickMap';

import LayerBaseVectorEsri from  '../../../../static/js/layers/LayerBaseVectorEsri';


let map = quickMap({center: {x: -85.413, y: 43.29320}, zoom: 6, minZoom: 3, maxZoom: 19});


let coordinationLayer = new LayerBaseVectorEsri(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/GlrtocCoordination/MapServer/0',
    {
        id: "coordLayer",
        visible: true,
        //autoLoad: false,
        name: 'Coordination',
        useEsriStyle: true
    }
);

let specialEventsLayer = new LayerBaseVectorEsri(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/GLRTOC_WZ_SE/MapServer/2',
    {
        where: `1=1`,
        //where: '1=1',
        name: "Special Events",
        id: 'special-event-points',
        minZoom: 1,
        maxZoom: 13,
        useEsriStyle: true
    }
);

let workZoneSegLayer = new LayerBaseVectorEsri(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/GLRTOC_WZ_SE/MapServer/1',
    {
        where: `1=1`,
        name: "Work Zone Segments",
        useEsriStyle: true,
        id: 'work-zone-segments',
        minZoom: 1,
        maxZoom: 13
    }
);

map.addLayer(coordinationLayer.olLayer);
map.addLayer(specialEventsLayer.olLayer);
map.addLayer(workZoneSegLayer.olLayer);

glob.workLayer = workZoneSegLayer;
glob.eventLayer = specialEventsLayer;

//setTimeout(function () {
//    "use strict";
//    coordinationLayer.visible = true;
//}, 3000);



  //
  //console.log(objPaths);
  //
  //var type;
  //if (goog.isNumber(object.x) && goog.isNumber(object.y)) {
  //  type = ol.geom.GeometryType.POINT;
  //} else if (objPoints) {
  //  type = ol.geom.GeometryType.MULTI_POINT;
  //} else if (objPaths) {
  //  if (objPaths.length === 1) {
  //    type = ol.geom.GeometryType.LINE_STRING;
  //  } else {
  //    type = ol.geom.GeometryType.MULTI_LINE_STRING;
  //  }
  //} else if (objRings) {
  //  var layout = ol.format.EsriJSON.getGeometryLayout_(object);
  //  var rings = ol.format.EsriJSON.convertRings_(objRings, layout);
  //  object = /** @type {EsriJSONGeometry} */(ol.object.assign({}, object));
  //  if (rings.length === 1) {
  //    type = ol.geom.GeometryType.POLYGON;
  //    object.rings = rings[0];
  //  } else {
  //    type = ol.geom.GeometryType.MULTI_POLYGON;
  //    object.rings = rings;
  //  }
  //}
  //console.log(type);