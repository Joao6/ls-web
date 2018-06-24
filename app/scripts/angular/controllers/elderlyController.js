angular.module('lifeStories').controller('elderlyController', function ($scope, $rootScope, userService, elderlyWebSocket, userLogged, iconSideNav, instituteAPI, userAPI, $translate, toast) {

    if (userLogged) {
        $rootScope.userLogged = userLogged.data
    }

    $scope.report = {}

    $scope.webSocket = elderlyWebSocket;
    $scope.webSocket.init();
    $scope.isConversation = false;

    $scope.updateProfile = (elderly) => {
        elderly.imagem = document.getElementById('img-profile').src
        if (userService.validateElderly(elderly, 'update')) {
            document.getElementById('loading-modal').style.display = 'block'
            instituteAPI.updateElderly(elderly).success(data => {
                document.getElementById('loading-modal').style.display = 'none'
                showFeedback('success')
            }).error(err => {
                toast.toastError('Ocorreu um erro ao atualizar os dados.', 4000)
                document.getElementById('loading-modal').style.display = 'none'
            })
        } else {
            toast.toastError('Preencha os dados corretamente', 4000)
        }
    }

    $scope.logout = () => {
        if(!$scope.isConversation){
            $scope.webSocket.closeCall()
            $scope.webSocket.closeConnetion()
            userService.logout()
        }
    }

    $scope.openModal = (modal) => {
        if (modal === 'modalFeedback') {
            $('#modalReport').modal('hide')
        } else if (modal === 'modaReportFinish') {
            $('#modalFeedback').modal('hide')
        }
        $('#' + modal).modal()
    }

    $scope.accept = () => {
        $scope.webSocket.sendResponse('yes');
        /* document.getElementById('user-video').style.display = 'inline'
        document.getElementById('btn-desligar').style.display = 'block'   */
        $('.call').addClass('call-init')
        $('.call').removeClass('call')
        $scope.isConversation = true
    }

    $scope.decline = () => {
        $scope.webSocket.sendResponse('no');
    }

    $scope.stop = () => {
        $scope.isConversation = false;
        $('#modalFeedback').modal()
        //idoso desliga primeiro
        $scope.webSocket.stopRecording();
        $scope.webSocket.closeCall();
    }

    $scope.saveCall = (call) => {
        $('.modal-backdrop').remove();
        const callReceive = $rootScope.callObj
        callReceive.idosoAvaliacao = $('#pontuacao').val()
        callReceive.usuarioTransmissor = 'idoso'
        callReceive.dataHoraInicio = window.localStorage.getItem('initCall')
        callReceive.datahoraFim = window.localStorage.getItem('finishCall')
        callReceive.duracao = ((callReceive.datahoraFim - callReceive.dataHoraInicio) / 1000) / 60
        document.getElementById('loading-modal').style.display = 'block'
        userAPI.saveCall(callReceive).success(data => {
            document.getElementById('loading-modal').style.display = 'none'
            $('.call-init').addClass('call')
            $('.call').removeClass('call-init')
            $scope.webSocket.init();
        }).error(err => {
            document.getElementById('loading-modal').style.display = 'none'
            console.log("Erro ao salvar a conversa")
            $scope.webSocket.init();
        })
    }

    $scope.saveReport = (report, finish) => {
        $('.modal-backdrop').remove();
        if (report.descricao !== null && report.descricao !== undefined) {
            report.idoso = $rootScope.userLogged
            report.estudante = $rootScope.callStudent.estudante
            report.tipo = 'idoso'
            userAPI.saveReport(report).success(data => {
                toast.toastSuccess('Denúncia realizada com sucesso!', 4000)
                if (finish) {
                    $('#pontuacao').val(0)
                    $scope.saveCall()
                }
            }).error(err => {
                toast.toastError('Ocorreu um erro ao realizar esta denúncia!', 4000)
            })
        } else {
            toast.toastError('Preecha o campo de descrição', 4000)
            if (finish) {
                $('#modalReportFinish').modal()
            } else {
                $('#modalReport').modal()
            }
        }
    }

    $rootScope.userVideo = $("#user-video").get()[0];
    $rootScope.remoteVideo = $("#remote-video").get()[0];

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: true }, handleVideo, errorVideo);
    }

    function handleVideo(stream) {
        $rootScope.userVideo.srcObject = stream;
        $rootScope.streamLocal = stream;
    }

    function errorVideo(err) {
        console.log('Failed to get local stream', err);
    }

    $scope.changeIcon = () => {
        if (iconSideNav) {
            var src = '../images/' + iconSideNav + '-selected.png'
            document.getElementById(iconSideNav).childNodes[1].src = src
            $('#' + iconSideNav).addClass('active-menu')
        }
    }

    $scope.changeLanguage = (language) => {
        $translate.use(language)
    }

    function showFeedback(tipo) {
        if (document.getElementById("carregar-lado-esquerdo")) {
            document.getElementById("carregar-lado-esquerdo").style.display = 'none'
        }
        document.getElementById("feedback-register-" + tipo).style.display = 'block'
        var ladoEsquerdo = document.getElementById("feedback-register-" + tipo);
        ladoEsquerdo.id = "carregar-lado-esquerdo";
    }

})