angular.module('lifeStories').factory('elderlyWebSocket', function ($websocket, $rootScope, config) {

    var wsUri = config.urlSocketElderly;

    var websocket = null;
    var peer = null;

    var mediaRecorder;
    var recordedBlobs;

    function init() {
        closeConnetion();

        websocket = $websocket(wsUri);

        websocket.onMessage(function (message) {
            var json = JSON.parse(message.data);
            if (json.flag == "update") {
                update(json);
            } else if (json.flag == "ask") {
                askElderly(json);
            }

        });

        websocket.onError(function (error) {

        });
    }

    function askElderly(json) {
        $("#name-student").html("");
        $("#name-student").append("O estudante <b>" + json.estudante.nome + "</b> deseja conversar com você!");
        $('#modalCall').modal()
        console.log(json);
        $rootScope.callStudent = json;
        var callObj = { estudante: json.estudante, idoso: $rootScope.userLogged };
        $rootScope.callObj = callObj
    }

    function update(evt) {
        var json = '{"idConnection": "' + evt.id + '", "idRTC" : "' + 0 + '","id":"' + $rootScope.userLogged.id + '","flag":"update"}';
        console.log(json);
        websocket.send(json);
    }

    function connectionWebRTC(evt) {
        var response = evt;
        var remoteVideo = $("#remote-video").get()[0];

        peer = new Peer({ host: 'secure-peerjs.herokuapp.com', port: '', path: '/' });

        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
            var idRTC = id;
            var jsonResponse = '{"idConexaoSocketStudent":"' + $rootScope.callStudent.idConexaoSocket + '","idRTC":"' + idRTC + '","response":"' + response + '","flag":"response"}';
            websocket.send(jsonResponse);
        });
        peer.on('call', function (call) {
            closeConnetion();
            window.localStorage.setItem('initCall', Date.now())
            startRecording();
            call.answer($rootScope.streamLocal); // Answer the call with an A/V stream.
            call.on('stream', function (remoteStream) {
                console.log("evt ", evt)
                remoteVideo.src = window.URL.createObjectURL(remoteStream);
            });
            call.on('close', function () {
                //quando o estudante desliga
                window.localStorage.setItem('finishCall', Date.now())
                $('#modalFeedback').modal()
                stopRecording();
                if (peer) {
                    websocket.close(true);
                    peer.destroy();
                }
                init();
            });

            call.on('error', function (error) {
                console.log(error);
            });
        });

        peer.on('error', function (error) {
            console.log('webrtc error : ' + error);
        });

    }

    function closeConnetion() {
        if (websocket) {
            websocket.close(true);
        }
    }

    function sendResponse(response) {
        //enviar resposta para estudante por meio do proprio websocket flag: response
        //se resposta positiva sair do socket e quando acabar conversa voltar pro socket
        if (response == 'yes') {
            connectionWebRTC(response);
        } else {
            var jsonResponse = '{"idConexaoSocketStudent":"' + $rootScope.callStudent.idConexaoSocket + '","response":"' + response + '","flag":"response"}';
            websocket.send(jsonResponse);
        }
    }

    function closeCall() {
        //peer.disconnect(true);
        if (peer) {
            peer.destroy();
        }
    }

    function startRecording() {
        recordedBlobs = [];
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
        console.log('MediaRecorder started', mediaRecorder);
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
        if (mediaRecorder != undefined && mediaRecorder.state != 'inactive') {
            mediaRecorder.stop();
            download();
        }
    }

    function download() {
        var blob = new Blob(recordedBlobs, { type: 'audio/wav' });
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
        }, 100);
    }


    var methods = {
        init,
        closeConnetion,
        sendResponse,
        closeCall,
        stopRecording
    };

    return methods;
})