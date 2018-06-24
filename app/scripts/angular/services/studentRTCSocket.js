angular.module('lifeStories').factory('studentRTCSocket', function ($location ,$websocket, $rootScope, config) {

    var wsUri = config.urlSocketRTCStudent;

    var websocket;

    var mediaRecorder;
    var recordedBlobs;

    var idRTC = null;
    var idConnection;
    var peer = null;
    var call = null;


    function init() {
        closeConnection();

        websocket = $websocket(wsUri);
        websocket.onMessage(function (message) {
            onMessage(message);
        });

        websocket.onError(function (error) {

        });
    }

    function onMessage(message) {
        var json = JSON.parse(message.data);
        if (json.flag == "update") {
            connectionWebRTC(json);
        } else if (json.flag == "response") {
            getResponse(json);
        }
    };

    function connectionWebRTC(json) {
        var json = json;

        peer = new Peer({ host: 'secure-peerjs.herokuapp.com', port: '', path: '/' });

        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
            var idRTC = id;
            var jsonSend = '{"idConnection": "' + json.id + '", "idRTC" : "' + idRTC + '","id":"' + $rootScope.userLogged.id + '","idConnectionElderly":"' + $rootScope.CallerElderly.idConexaoSocket + '","flag":"ask"}';
            websocket.send(jsonSend);
        });

        peer.on('error', function (error) {
            console.log('webrtc error : ' + error);
        });
    }

    function getResponse(json) {
        closeConnection();
        if (json.response == 'yes') {
            //analisa resposta caso positivo conecta com idoso
            var remoteVideo = $("#remote-video").get()[0];
            var userVideo = $("#user-video").get()[0];
            console.log(json.idRTC);
            call = peer.call(json.idRTC, $rootScope.streamLocal);
            console.log('chamou')
            startRecording();
            call.on('stream', function (remoteStream) {
                remoteVideo.srcObject = remoteStream;
                console.log('conectou')
            });

            call.on('error', function (error) {
                console.log(error);
            });

            call.on('close', function () {
                $('#modalFeedback').modal()
                //quando o idoso desliga primeiro
                stopRecording();
                closeConnection();
                closeCall();
            });

        } else {
            //caso negativo informa e volta pro mapa
            $location.path("/student/home")
        }
    }

    function closeConnection() {
        if (websocket) {
            websocket.close(true);
        }
    }

    function closeCall() {
        if (peer) {
            peer.destroy();
        }
    }

    function startRecording() {
        /*recordedBlobs = [];
        var options = { mimeType: 'video/webm;codecs=vp9' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not Supported');
            options = { mimeType: 'video/webm;codecs=vp8' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.log(options.mimeType + ' is not Supported');
                options = { mimeType: 'video/webm' };
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    console.log(options.mimeType + ' is not Supported');
                    options = { mimeType: '' };
                }
            }
        }

        try {
            mediaRecorder = new MediaRecorder($rootScope.streamLocal, options);
        } catch (e) {
            console.error('Exception while creating MediaRecorder: ' + e);
            alert('Exception while creating MediaRecorder: '
                + e + '. mimeType: ' + options.mimeType);
            return;
        }
        console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
        mediaRecorder.onstop = handleStop;
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(10); // collect 10ms of data
        console.log('MediaRecorder started', mediaRecorder);*/
    }

    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }

    function handleStop(event) {
        console.log('Recorder stopped: ', event);
    }

    function stopRecording() {
        /*if (mediaRecorder != undefined && mediaRecorder.state != 'inactive') {
            mediaRecorder.stop();
            download();
        }*/
    }

    function download() {
        /*var blob = new Blob(recordedBlobs, { type: 'audio/wav' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'audio.wav';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);*/
    }

    var methods = {
        init,
        closeConnection,
        closeCall,
        stopRecording
    };
    return methods;
})