angular.module('lifeStories').controller('studentController', function ($location, $scope, $rootScope, userService, userAPI, studentService, studentAPI, studentWebSocket, toast, config, userLogged, iconSideNav, $translate) {

    $scope.url = location.hash;
    $scope.linguaList = [];
    $rootScope.lingua = null;
    $scope.linguaId;
    $scope.vinculoList = []

    if (userLogged) {
        $rootScope.userLogged = userLogged.data
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.$apply(function () {
                $rootScope.latitude = position.coords.latitude;
                $rootScope.longitude = position.coords.longitude;
            });
        });
    } else {
        //navegador não compativel
    }

    if ($scope.url == "#/student/home") {
        $scope.webSocket = studentWebSocket;
        $scope.webSocket.loadMap();
        studentAPI.linguaList().success(data => {
            $scope.linguaList = data.entityList;
        }).error(err => {
            toast.toastError('Ocorreu um erro ao buscar a lista de línguas =(', 4000)
        })
    }

    $scope.getElderly = () => {
        if ($scope.linguaId != null && $scope.linguaId > 0) {
            $rootScope.lingua = $scope.linguaId;
            $scope.webSocket.renewMap($rootScope.lingua);
        }
    }

    $scope.getVinculoList = () => {
        studentAPI.getVinculoList($rootScope.userLogged.id).success(data => {
            $scope.vinculoList = data.entityList
            $rootScope.vinculoList = data.entityList
            $scope.count = data.quantidadeTotalObjetos
        }).error(err => {

        })
    }

    $scope.changeIcon = () => {
        if (iconSideNav) {
            var src = '../images/' + iconSideNav + '-selected.png'
            document.getElementById(iconSideNav).childNodes[1].src = src
            $('#' + iconSideNav).addClass('active-menu')
        }
    }


    $scope.callElderly = (id) => {
        for (var i = 0; i < $rootScope.elderlyList.length; i++) {
            if (id === $rootScope.elderlyList[i].json.idoso.id) {
                $rootScope.CallerElderly = $rootScope.elderlyList[i].json;
                window.localStorage.setItem('idElderlyCall', id)
                break;
            }
        }
        $scope.webSocket.closeConnection();
    }

    $scope.callElderlyVinculo = (id) => {
        $('.modal-backdrop').remove();
        for (var i = 0; i < $rootScope.elderlyList.length; i++) {
            if (id === $rootScope.elderlyList[i].json.idoso.id) {
                $rootScope.CallerElderly = $rootScope.elderlyList[i].json;
                window.localStorage.setItem('idElderlyCall', id)
                break;
            }
        }
        $scope.webSocket.closeConnection();
        $location.path("/student/call")
    }

    $scope.openModal = (modal, elderly) => {
        if (elderly) {
            $scope.elderlyProposeCall = elderly
        }
        if(modal === "callPropose"){
            let border = $('#' + elderly.id).attr("style")
            if(border.indexOf("58, 58, 58") !== -1 || border.indexOf("#3a3a3a") !== -1){
                toast.toastError('Tutor offline no momento!', 3000)
            }else{
                $('#' + modal).modal()
            }
        }else{
            $('#' + modal).modal()
        }
    }

    $scope.getStudentProfile = () => {
        userAPI.getUserById($rootScope.userLogged.id).success(data => {
            $scope.student = data
        }).error(err => {
            toast.toastError('Ocorreu um erro ao atualizar os dados =(', 4000)
        })
    }

    $scope.updateStudentProfile = (student) => {
        if (userService.validateStudent(student, 'update')) {
            document.getElementById('loading-modal').style.display = 'block'
            student.imagem = document.getElementById('img-profile').src
            studentAPI.updateStudentProfile(student).success(data => {
                $rootScope.userLogged = data
                document.getElementById('loading-modal').style.display = 'none'
                showFeedback('success')
                /* $location.path('/student/home')
                toast.toastSuccess('Dados atualizados com sucesso =)', 4000) */
            }).error(err => {
                document.getElementById('loading-modal').style.display = 'none'
                toast.toastError('Ocorreu um erro ao atualizar os dados =(', 4000)
            })
        } else {
            toast.toastWarning('Preencha os campos corretamente!', 4000)
        }
    }

    function showFeedback(tipo) {
        if (document.getElementById("carregar-lado-esquerdo")) {
            document.getElementById("carregar-lado-esquerdo").style.display = 'none'
        }
        document.getElementById("feedback-register-" + tipo).style.display = 'block'
        var ladoEsquerdo = document.getElementById("feedback-register-" + tipo);
        ladoEsquerdo.id = "carregar-lado-esquerdo";
    }

    $scope.logout = () => {
        if ($scope.webSocket) {
            $scope.webSocket.closeConnection();
        }
        userService.logout()
    }

    $scope.changeLanguage = (language) => {
        $translate.use(language)
    }
    
    $scope.popoverIsVisible = false;
    $scope.showPopover = function () {
        $scope.popoverIsVisible = true;
    };

    $scope.hidePopover = function () {
        $scope.popoverIsVisible = false;
    };

    var checkStatus = function () {
        $rootScope.elderlyList.forEach(function (elderlyOnline) {
            $scope.vinculoList.forEach(function (vinculo) {
                if (elderlyOnline.json.idoso.id === vinculo.idoso.id) {
                    $('#' + vinculo.idoso.id).css('border', '3px solid #0de20d')
                    //break;
                }
            });
        });
    }
    setTimeout(checkStatus, 3000);
})