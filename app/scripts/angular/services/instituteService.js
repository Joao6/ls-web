angular.module('lifeStories').service('instituteService', function () {

    this.loadMap = (institute) => {
        require(["esri/Map",
            "esri/views/MapView",
            "esri/Graphic",
            "esri/geometry/Point",
            "esri/geometry/Polyline",
            "esri/geometry/Polygon",
            "esri/symbols/SimpleMarkerSymbol",
            "dojo/domReady!"], function (Map, MapView,
                Graphic, Point, Polyline, Polygon,
                SimpleMarkerSymbol) {

                var map = new Map({
                    basemap: "hybrid"
                });

                view = new MapView({
                    center: [institute.localizacao.longitude, institute.localizacao.latitude],
                    container: "viewDiv",
                    map: map,
                    zoom: 15
                });
            });
        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/Graphic",
            "esri/geometry/Point",
            "esri/geometry/Polyline",
            "esri/geometry/Polygon",
            "esri/symbols/SimpleMarkerSymbol",
            "dojo/domReady!"
        ], function (
            Map, MapView,
            Graphic, Point, Polyline, Polygon,
            SimpleMarkerSymbol
        ) {
                var point = new Point({
                    longitude: institute.localizacao.longitude || -80,
                    latitude: institute.localizacao.latitude || 35
                });

                var markerSymbol = new SimpleMarkerSymbol({
                    color: [226, 119, 40],
                    outline: {// autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 2
                    }
                });
                var pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                });
                view.graphics.add(pointGraphic);
            });
    }
})