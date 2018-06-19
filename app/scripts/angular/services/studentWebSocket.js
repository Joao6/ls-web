angular.module('lifeStories').factory('studentWebSocket', function ($websocket, esriLoader, $rootScope, config) {

    var view = null;
    var websocket = null;

    function getElderlyPoints(json, point) {
        var elderlyPoints = new Object();
        elderlyPoints.json = json;
        elderlyPoints.point = point;

        return elderlyPoints;
    }

    function loadMap() {
        var wsUri = config.urlSocketStudent;
        closeConnection();
        if ($rootScope.elderlyList) {
            deletePoints();

        }
        $rootScope.elderlyList = [];

        websocket = $websocket(wsUri);

        websocket.onMessage(function (message) {
            var json = JSON.parse(message.data);
            addElderly(json);
        });

        websocket.onError(function (error) {
            console.log(error);
        });

        esriLoader.require(["esri/Map",
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
                    basemap: "streets"
                });

                var latitude = $rootScope.latitude || -80;
                var longitude = $rootScope.longitude || 35;
                view = new MapView({
                    center: [latitude, longitude],
                    container: "viewDiv",
                    map: map,
                    zoom: 3
                });
            });
    }

    function addElderly(json) {
        console.log('json recebido');
        console.log(json);
        if (json.length == undefined) {
            var vinculo = false;
            $rootScope.vinculoList.forEach(function (vinculo) {
                if (json.idoso.id === vinculo.idoso.id) {
                    vinculo = true
                    //break;
                }
            });
            if (json.flag == 'new') {
                $('#' + json.idoso.id).css('border', '3px solid #0de20d')
                createPoint(json);
            } else if (json.flag == 'remove') {
                $('#' + json.idoso.id).css('border', '3px solid #3a3a3a')
                removePoint(json);
            }
        } else if (json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                createPoint(json[i]);
            }
        }
    }

    function createPoint(json) {
        var json = json;
        esriLoader.require([
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
                    longitude: json.idoso.instituicao.localizacao.longitude || -80,
                    latitude: json.idoso.instituicao.localizacao.latitude || 35
                });

                var markerSymbol = new SimpleMarkerSymbol({
                    color: [226, 119, 40],
                    outline: {// autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 2
                    }
                });
                var id = json.idConexaoSocket;
                var lineAtt = {
                    Name: 'Users'
                };

                var html = '<h1><b>' + json.idoso.nome + '</b> de ' + json.idoso.instituicao.nome + '</h1>' + '<button class="btn-azul" onclick="callElderly(' + json.idoso.id + ')">Ligar para ele</button>';

                var pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                    attributes: lineAtt,
                    popupTemplate: {// autocasts as new PopupTemplate()
                        //title: "{Name}",
                        content: html
                    }
                });

                var pointAdd = true;
                if ($rootScope.lingua) {
                    pointAdd = false;
                    for (var i = 0; i < json.idoso.linguaList.length; i++) {
                        if ($rootScope.lingua == json.idoso.linguaList[i].id) {
                            pointAdd = true;
                            break;
                        }
                    }
                }
                if (pointAdd) {
                    view.graphics.add(pointGraphic);
                }

                var isAdded = false;
                for (var i = 0; i < $rootScope.elderlyList.length; i++) {
                    if ($rootScope.elderlyList[i].json.idoso.id == json.idoso.id) {
                        isAdded = true;
                        if ($rootScope.elderlyList[i].json.idConexaoSocket != json.idConexaoSocket) {
                            $rootScope.elderlyList[i].json = json;
                        }
                        break;
                    }
                }
                if (!isAdded) {
                    $rootScope.elderlyList.push(getElderlyPoints(json, pointGraphic));
                }
            });

    }

    function removePoint(json) {
        var json = json;
        esriLoader.require([
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
                for (var i = 0; i < $rootScope.elderlyList.length; i++) {
                    if ($rootScope.elderlyList[i].json.idConexaoSocket == json.idConexaoSocket) {
                        view.graphics.remove($rootScope.elderlyList[i].point);
                        for (j = i; j < $rootScope.elderlyList.length - 1; j++) {
                            $rootScope.elderlyList[i] = $rootScope.elderlyList[i + 1];
                        }
                        $rootScope.elderlyList.pop();
                    }
                }

            });

    }

    function closeConnection() {
        if (websocket != null) {
            websocket.close(true);

        }
    }

    function deletePoints() {
        esriLoader.require([
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
                for (var i = 0; i < $rootScope.elderlyList.length; i++) {
                    view.graphics.remove($rootScope.elderlyList[i].point);
                }

            });
    }

    function renewPoints(elderly) {
        var json = elderly;
        esriLoader.require([
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
                    longitude: json.idoso.instituicao.localizacao.longitude || -80,
                    latitude: json.idoso.instituicao.localizacao.latitude || 35
                });

                var markerSymbol = new SimpleMarkerSymbol({
                    color: [226, 119, 40],
                    outline: {// autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 2
                    }
                });
                var id = json.idConexaoSocket;
                var lineAtt = {
                    Name: 'Users'
                };

                var html = '<h1>' + json.idoso.nome + '</h1><button onclick="callElderly(' + json.idoso.id + ')">chamar</button>';

                var pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                    attributes: lineAtt,
                    popupTemplate: {// autocasts as new PopupTemplate()
                        title: "{Name}",
                        content: html
                    }
                });

                view.graphics.add(pointGraphic);

                for (var i = 0; i < $rootScope.elderlyList.length; i++) {
                    if ($rootScope.elderlyList[i].json.idoso.id == json.idoso.id) {
                        $rootScope.elderlyList[i].point = pointGraphic;
                        break;
                    }
                }
            });
    }

    function renewMap(idLingua) {
        deletePoints();
        for (var i = 0; i < $rootScope.elderlyList.length; i++) {
            for (var j = 0; j < $rootScope.elderlyList[i].json.idoso.linguaList.length; j++) {
                if ($rootScope.elderlyList[i].json.idoso.linguaList[j].id == idLingua) {
                    renewPoints($rootScope.elderlyList[i].json);
                    break;
                }
            }
        }
    }

    var methods = {
        closeConnection,
        loadMap,
        renewMap
    };
    return methods;
})