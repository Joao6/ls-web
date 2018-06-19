/*var view;
var elderlyList = [];

function getElderlyPoints(json, point) {
    var elderlyPoints = new Object();
    elderlyPoints.json = json;
    elderlyPoints.point = point;

    return elderlyPoints;
}

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

    var map = new Map({
        basemap: "hybrid"
    });

    view = new MapView({
        center: [-80, 35],
        container: "viewDiv",
        map: map,
        zoom: 3
    });
});

var wsUri = "wss://localhost:8443/ls-api/ws-estudante";

var websocket = new WebSocket(wsUri);


websocket.onopen = function (evt) {
};

websocket.onclose = function (evt) {
};

websocket.onmessage = function (evt) {
    onMessage(evt);
};
function onMessage(evt) {
    var json = JSON.parse(evt.data);
    //addElderly(json);
    console.log(evt);
}
;

function addElderly(json) {
    if (json.length == undefined) {
        if (json.flag == 'new') {
            createPoint(json);
        } else if (json.flag == 'remove') {
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
            longitude: json.idoso.instituicao.localizacao.longitude,
            latitude: json.idoso.instituicao.localizacao.latitude
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
            Name: 'User'
        };

        var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: lineAtt,
            popupTemplate: {// autocasts as new PopupTemplate()
                title: "{Name}",
                content: "<h1>"+ json.idConexaoSocket +"</h1>"
            }
        });
        view.graphics.add(pointGraphic);
        elderlyList.push(getElderlyPoints(json, pointGraphic));
    });

}

function removePoint(json) {
    var json = json;
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
        for (var i = 0; i < elderlyList.length; i++) {
            if (elderlyList[i].json.idConexaoSocket == json.idConexaoSocket) {
                view.graphics.remove(elderlyList[i].point);
                for (j = i; j < elderlyList.length - 1; j++) {
                    elderlyList[i] = elderlyList[i + 1];
                }
                elderlyList.pop();
            }
        }

    });

}*/
