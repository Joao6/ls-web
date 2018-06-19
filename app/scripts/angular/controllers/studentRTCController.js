angular.module('lifeStories').controller('studentRTCController', function ($rootScope, $scope, studentRTCSocket, userLogged, userAPI, $translate, toast, $location) {

    if (userLogged) {
        $rootScope.userLogged = userLogged.data
    }

    $scope.report = {}

    $scope.webSocket = studentRTCSocket;

    $scope.webSocket.init();

    var userVideo = $("#user-video").get()[0];
    var remoteVideo = $("#remote-video").get()[0];

    $scope.stop = () => {
        $('#modalFeedback').modal()
        //quando o estudante desliga primeiro
        $scope.webSocket.closeCall();
        $scope.webSocket.stopRecording();
    }

    $scope.saveCall = (call) => {
        $('.modal-backdrop').remove();
        const callReceive = {}
        callReceive.estudante = $rootScope.userLogged
        callReceive.idoso = { id: window.localStorage.getItem('idElderlyCall') }
        callReceive.estudanteAvaliacao = $('#pontuacao').val()
        callReceive.usuarioTransmissor = 'estudante'
        document.getElementById('loading-modal').style.display = 'block'
        userAPI.saveCall(callReceive).success(data => {
            document.getElementById('loading-modal').style.display = 'none'
            $location.path('/student/home')
            $('.call').addClass('call')
            $('.call').removeClass('call-init')
        }).error(err => {
            document.getElementById('loading-modal').style.display = 'none'
            console.log("Erro ao salvar a conversa")
        })
    }

    $scope.saveReport = (report, finish) => {
        $('.modal-backdrop').remove();
        if (report.descricao !== null && report.descricao !== undefined) {
            report.idoso = { 'id': window.localStorage.getItem('idElderlyCall') }
            report.estudante = $rootScope.userLogged
            report.tipo = 'estudante'
            userAPI.saveReport(report).success(data => {
                toast.toastSuccess('Denúncia realizada com sucesso!', 4000)
                if(finish){
                    $('#pontuacao').val(0)
                    $scope.saveCall()
                }
            }).error(err => {
                toast.toastError('Ocorreu um erro ao realizar esta denúncia!', 4000)
            })
        }else{
            toast.toastError('Preecha o campo de descrição', 4000)
            if(finish){
                $('#modalReportFinish').modal()
            }else{
                $('#modalReport').modal()
            }
        }        
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: true }, handleVideo, errorVideo);
    }

    function handleVideo(stream) {
        userVideo.src = window.URL.createObjectURL(stream);
        $rootScope.streamLocal = stream;
    }

    function errorVideo(err) {
        console.log('Failed to get local stream', err);
    }

    $scope.logout = () => {
        //$scope.webSocket.closeCall();
        //$scope.webSocket.closeConnection();
        //userService.logout()
    }

    $scope.changeLanguage = (language) => {
        $translate.use(language)
    }

    $scope.openModal = (modal) => {
        if (modal === 'modalFeedback') {
            $('#modalReport').modal('hide')
        } else if (modal === 'modaReportFinish') {
            $('#modalFeedback').modal('hide')
        }
        $('#' + modal).modal()
    }
})