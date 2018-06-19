/*var wsUri = "wss://localhost:8443/ls-api/ws-idoso";

var websocket = new WebSocket(wsUri);

websocket.onopen = function (evt) {

 };

websocket.onclose = function (evt) {
    
};

websocket.onmessage = function (evt) {
    connectionWebRTC(evt);
};

function connectionWebRTC(evt) {
    var peer = new Peer({ host: 'secure-peerjs.herokuapp.com', port: '', path: '/' });

    peer.on('open', function (id) {
        console.log('My peer ID is: ' + id);
        var idRTC = id; 
        var idUser = $('#elderly-id').val();
        var json = '{"idConnection": "' + evt.data + '", "idRTC" : "' + idRTC + '","id":"'+ idUser +'"}';
        console.log(json);
        websocket.send(json); 
    });
}*/