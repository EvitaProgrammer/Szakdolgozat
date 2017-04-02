var OpenStreetMap_wrapper = function() {
  
	/**
	 * Térkép konstruktor.
	 * 
	 * @param {String} target HTML DOM elem id
	 * @param {String} lat kezdeti center lat pozició
	 * @param {String} lng kezdeti center lng pozició
	 * @param {String} zoom kezdeti zoom érték
	 */
	function OpenStreetMap(target, lat, lng, zoom, clickEvent){
		this.clickEvent = clickEvent;
		this.target = target;
		this.lat = lat;
		this.lng = lng;
		this.zoom = zoom;
	}
	
	/**
	 * Térkép inicializálás.
	 */
	OpenStreetMap.prototype.init = function(){		
		this.locations = new Object();	
		/* Init map */
		this.map = new ol.Map({
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				})
			],
			overlays: [],
			target: this.target
		});
		this.map.getView().setCenter(ol.proj.transform([this.lng, this.lat], 'EPSG:4326', 'EPSG:3857'));
		this.map.getView().setZoom(this.zoom);
		
		var self = this;
		this.map.on('click', function(evt) {
			var coordinate = evt.coordinate;
			var feature = self.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
				return feature;
			});
			if (feature) {
				self.clickEvent(feature.get('markerId'));
			}
		});
		
		this.map.on("pointermove", function (evt) {
			var coordinate = evt.coordinate;
			var feature = self.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
				return feature;
			});
			var target = self.map.getTarget();
			var jTarget = typeof target === "string" ? $("#"+target) : $(target);
			if (feature) {
				jTarget.css('cursor', 'pointer').attr('title',feature.get('title'));
			} else {
				jTarget.css('cursor', '').attr('title','');
			}
		});
	}
	
	/**
	 * Térképhez esemény hozzáadása
	 * @param {String} lat
	 * @param {String} lng
	 * @param {String} city
	 * @param {String} content
	 * @param {String} imgColor
	 */
	OpenStreetMap.prototype.addEvent = function(lat, lng, city, content, imgColor){
		if (this.locations[city] === undefined){
			_addMarker(this.map, lat, lng, city, city, imgColor);
			this.locations[city] = [];
		}
		this.locations[city].push(content);
	}
	
	OpenStreetMap.prototype.getEventsToLocation = function(location){
		return this.locations[location];
	}
	
	/**
	 * Marker térképhez adása
	 */
	function _addMarker(map, lat, lng, markerId, title, imgColor){
		map.addLayer(_createMarker(lat, lng, markerId, title, imgColor)); 		
	}
	
	/**
	 * Marker létrehozása.
	 */
	function _createMarker(lat, lng, markerId, title, imgColor){
		var iconFeatures=[
			 new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
				markerId: markerId,
				title: title
			})
		];
		
		var vectorSource = new ol.source.Vector({
			features: iconFeatures
		});
		
		var iconStyle = [new ol.style.Style({
			image: new ol.style.Icon(({			
				anchor: [0.25, 0.25],
				size: [32, 32],
				opacity: 1,
				src: 'img/marker/Button-Blank-' + imgColor + '-icon.png'
			}))
		})];
		

		var vectorLayer = new ol.layer.Vector({
			source: vectorSource,
			style: iconStyle
		});	
		
		return vectorLayer;
	}
	
	
	return {
    OpenStreetMap: OpenStreetMap
  };
}();	