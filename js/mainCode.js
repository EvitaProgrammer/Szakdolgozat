function main() {
	var checkedValue = null; 
	var inputElements = document.getElementsByClassName('chbox');
	for(var i=0; inputElements[i]; ++i){
		if(inputElements[i].checked){
			checkedValue = inputElements[i].value;
			break;
		}
	}
    //térképre eső pontok ábrázolásához
    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point([2280000, 5800000]),
        name: 'Cica 1',
        population: 4000,
        rainfall: 500
      });
	  
	var iconFeature2 = new ol.Feature({
        geometry: new ol.geom.Point([2100000, 5900000]),
        name: 'Cica 2',
        population: 4000,
        rainfall: 500
      });
	  
	  var iconFeature3 = new ol.Feature({
        geometry: new ol.geom.Point([2200000, 5600000]),
        name: 'cica 3',
        population: 4000,
        rainfall: 500
      });

      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'http://icons.iconarchive.com/icons/iconka/meow/32/cat-grumpy-icon.png'
        }))
      });
	  
	  var iconStyle2 = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'http://icons.iconarchive.com/icons/iconka/meow/32/cat-drunk-icon.png'
        }))
      });
	  
	  var iconStyle3 = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'http://icons.iconarchive.com/icons/iconka/meow/32/cat-hiss-icon.png'
        }))
      });

      iconFeature.setStyle(iconStyle);
	  iconFeature2.setStyle(iconStyle2);
	  iconFeature3.setStyle(iconStyle3);

      var vectorSource = new ol.source.Vector({
        features: [iconFeature, iconFeature2, iconFeature3]
      });

      var vectorLayer = new ol.layer.Vector({
        source: vectorSource
      });

//      var rasterLayer = new ol.layer.Tile({
//        source: new ol.source.TileJSON({
//          url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
//          crossOrigin: ''
//        })
//      });
	var rasterLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
	  
	  var map = new ol.Map({
        layers: [rasterLayer, vectorLayer],
        target: document.getElementById('map'),
        controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: false
            })
        }),
        view: new ol.View({
            center: [2280000, 5860000],
			zoom: 5
        })
    });

    //alsó zoom out gomb
    document.getElementById('zoom-out').onclick = function() {
        var view = map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom - 1);
    };

    //also zoom in gomb
    document.getElementById('zoom-in').onclick = function() {
        var view = map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom + 1);
    };

    //bootstrap tooltip-ek a térképre
    $('.ol-zoom-in, .ol-zoom-out').tooltip({
        placement: 'right'
    });
    $('.ol-rotate-reset, .ol-attribution button[title]').tooltip({
        placement: 'left'
    });

    //a kirajzolás
    var draw; // global so we can remove it later
    function addInteraction() {
        var value = typeSelect.value;
        if (value !== 'None') {
            var geometryFunction, maxPoints;
            if (value === 'Square') {
                value = 'Circle';
                geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
            } else if (value === 'Box') {
                value = 'LineString';
                maxPoints = 2;
                geometryFunction = function(coordinates, geometry) {
                    if (!geometry) {
                        geometry = new ol.geom.Polygon(null);
                    }
                    var start = coordinates[0];
                    var end = coordinates[1];
                    geometry.setCoordinates([
                        [start, [start[0], end[1]], end, [end[0], start[1]], start]
                    ]);
                    return geometry;
                };
            }
            draw = new ol.interaction.Draw({
                source: source,
                type: /** @type {ol.geom.GeometryType} */ (value),
                geometryFunction: geometryFunction,
                maxPoints: maxPoints
            });
            map.addInteraction(draw);
        }
    }

    //a legördülő menüt olvassa ki
    var typeSelect = document.getElementById('type');
    //és ez reagál az új elem kiválasztására onnan
    typeSelect.onchange = function() {
        map.removeInteraction(draw);
        addInteraction();
    };
	
	var element = document.getElementById('popup');

      var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
      });
      map.addOverlay(popup);

      // display popup on click
      map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
              return feature;
            });
        if (feature) {
          var coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          $(element).popover({
            'placement': 'top',
            'html': true,
            'content': feature.get('name')
          });
          $(element).popover('show');
        } else {
          $(element).popover('destroy');
        }
      });

      // change mouse cursor when over marker
      map.on('pointermove', function(e) {
        if (e.dragging) {
          $(element).popover('destroy');
          return;
        }
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
      });

    addInteraction();
    /*source.on('addfeature', function(evt){
        var feature = evt.feature;
        var coords = feature.getGeometry().getCoordinates();
        document.write(coords);
    });*/
}