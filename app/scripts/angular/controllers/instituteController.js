angular.module('lifeStories').controller('instituteController', function ($scope, $rootScope, userAPI, instituteAPI, instituteService, toast, utils, config, userService, elderlyEdit, userLogged, elderlyList, iconSideNav, $location, linguaList, $translate) {

    $scope.offset = 0
    $scope.count = 0
    $scope.linguaList = []
    $scope.linguaListIdoso = []
    $scope.reportList = []
    $scope.typeReport = ""
    $scope.search = ""

    $scope.currentLanguage = $translate.use();

    $scope.loadLinguas = (language) => {
        if (language == 'pt') {
            $scope.linguas = [{ 'id': 3, 'nome': 'Inglês' },
            { 'id': 6, 'nome': 'Português' },
            { 'id': 2, 'nome': 'Espanhol' },
            { 'id': 18, 'nome': 'Francês' }];
        } else {
            $scope.linguas = [{ 'id': 3, 'nome': 'English' },
            { 'id': 6, 'nome': 'Portuguese' },
            { 'id': 2, 'nome': 'Spanish' },
            { 'id': 18, 'nome': 'French' }];
        }
    }

    $scope.loadLinguas($scope.currentLanguage);

    if (userLogged) {
        $rootScope.userLogged = userLogged.data
    }

    if (linguaList) {
        $scope.linguaList = linguaList.data.entityList
    } else {
        $scope.linguaList = []
    }

    if (elderlyList) {
        $scope.elderlyList = elderlyList.data.entityList
        $scope.count = elderlyList.data.quantidadeTotalObjetos
    } else {
        $scope.elderlyList = []
    }

    if (elderlyEdit) {
        $scope.elderly = elderlyEdit.data
    } else {
        $scope.elderly = {}
    }

    $scope.changeIcon = () => {
        if (iconSideNav) {
            var src = '../images/' + iconSideNav + '-selected.png'
            document.getElementById(iconSideNav).childNodes[1].src = src
            $('#' + iconSideNav).addClass('active-menu')
        }
    }

    $scope.getElderlyList = (name, offset) => {
        instituteAPI.getElderlyList($rootScope.userLogged.id, name, offset).success(data => {
            $scope.elderlyList = data.entityList
            $scope.count = data.quantidadeTotalObjetos
        }).error(err => {
            toast.toastError('Ocorreu um erro ao buscar a lista de tutores.', 4000)
        })
    }

    $scope.updateProfile = (institute) => {
        if (userService.validateInstitute(institute, 'update')) {
            document.getElementById('loading-modal').style.display = 'block'
            instituteAPI.updateInstituteProfile(institute).success(data => {
                $rootScope.userLogged = data
                document.getElementById('loading-modal').style.display = 'none'
                toast.toastSuccess('Dados atualizados com sucesso!', 4000)
                $location.path('/institute/home')
            }).error(err => {
                toast.toastError('Ocorreu um erro ao atualizar os dados!', 4000)
                document.getElementById('loading-modal').style.display = 'none'
            })
        }
    }

    $scope.loadMap = (institute) => {
        instituteService.loadMap(institute)
    }

    $scope.newElderly = (elderly) => {
        elderly.imagem = document.getElementById('urlImageElderly').value
        let code = Math.floor(Date.now() / 1000);
        code = code.toString()
        elderly.codigo = $rootScope.userLogged.id + code.substring(6, code.length);
        elderly.instituicao = $rootScope.userLogged
        if (userService.validateElderly(elderly, 'new')) {
            document.getElementById('loading-modal').style.display = 'block'
            userAPI.newElderly(elderly).success(data => {
                delete $scope.elderly
                $scope.formElderly.$setPristine()
                document.getElementById('loading-modal').style.display = 'none'
                showFeedback('success')
                $scope.initElderly()
            }).error(err => {
                toast.toastError('Ocorreu um erro ao cadastrar este tutor!', 4000)
                document.getElementById('loading-modal').style.display = 'none'
            })
        } else {
            //TODO: preencher dados do idoso corretamente
            toast.toastError('Preencha os dados corretamente', 4000)
        }
    }

    $scope.deleteElderly = (elderly) => {
        elderly.tipo = 'dido'
        instituteAPI.deleteElderly(elderly).success(data => {
            $scope.getElderlyList()
            toast.toastSuccess('Tutor excluído com sucesso!', 4000)
            $('#deleteElderly').modal('hide')
        }).error(err => {
            toast.toastError('Ocorreu um erro ao excluir este tutor.', 4000)
        })
    }

    $scope.updateElderly = (elderly) => {
        elderly.imagem = document.getElementById('img-profile').src
        if (userService.validateElderly(elderly, 'update')) {
            document.getElementById('loading-modal').style.display = 'block'
            instituteAPI.updateElderly(elderly).success(data => {
                //$location.path('/institute/elderlies')
                document.getElementById('loading-modal').style.display = 'none'
                showFeedback('success')
            }).error(err => {
                toast.toastError('Ocorreu um erro ao atualizar os dados.', 4000)
                document.getElementById('loading-modal').style.display = 'none'
            })
        } else {
            //TODO: preencher dados do idoso corretamente
            toast.toastError('Preencha os dados corretamente', 4000)
        }
    }

    $scope.initElderly = () => {
        $scope.elderly = {}
        let code = Math.floor(Date.now() / 1000);
        code = code.toString()
        $scope.elderly.codigo = $rootScope.userLogged.id + code.substring(6, code.length);
        $scope.elderly.instituicao = $rootScope.userLogged
    }

    $scope.addLingua = (lingua) => {
        let index = 0;
        if ($scope.linguaListIdoso.indexOf(lingua) !== -1) {
            $scope.linguaListIdoso.splice($scope.linguaListIdoso.indexOf(lingua), 1);
        } else {
            $scope.linguaListIdoso.push(lingua);
        }
        $scope.elderly.linguaList = $scope.linguaListIdoso
        console.log($scope.elderly)
    }

    $scope.removeError = (id) => {
        $('#' + id).removeClass('has-error')
    }

    function showFeedback(tipo) {
        if (document.getElementById("carregar-lado-esquerdo")) {
            document.getElementById("carregar-lado-esquerdo").style.display = 'none'
        }
        document.getElementById("feedback-register-" + tipo).style.display = 'block'
        var ladoEsquerdo = document.getElementById("feedback-register-" + tipo);
        ladoEsquerdo.id = "carregar-lado-esquerdo";
    }

    $scope.elderlyListIsEmpty = () => {
        return $scope.elderlyList.length < 1
    }

    $scope.pagination = (name, offset, type) => {
        if (type === 'next') {
            $scope.offset += 10
        } else {
            $scope.offset -= 10
        }
        $scope.getElderlyList(name, offset)
    }

    $scope.logout = () => {
        userService.logout()
    }

    $scope.openModal = (modal, elderly) => {
        if (modal === 'modal-upload-img') {
            $('#upload').trigger('click')
        }
        if (elderly) {
            $scope.elderly = elderly
        }
        $('#' + modal).modal()
    }

    $scope.openModalReport = (modal, report) => {
        $scope.report = report
        $('#' + modal).modal()
    }

    $scope.changeLanguage = (language) => {
        $scope.currentLanguage = language;
        $translate.use(language);
        $scope.loadLinguas($scope.currentLanguage);
    }

    $scope.validateLanguage = (idLingua) => {
        var validation = false;
        if ($scope.elderly && $scope.elderly.linguaList) {
            for (var i = 0; i < $scope.elderly.linguaList.length; i++) {
                if (idLingua == $scope.elderly.linguaList[i].id) {
                    validation = true;
                    if ($scope.linguaListIdoso.indexOf($scope.elderly.linguaList[i]) == -1)
                        $scope.linguaListIdoso.push($scope.elderly.linguaList[i])
                    break;
                }
            }
        }
        $('#value').removeAttr("ng-checked")
        $('#value').removeAttr("id")
        return validation;
    }

    $scope.editLingua = (lingua) => {
        let index = 0;
        var isExistent = false;
        for (var i = 0; i < $scope.linguaListIdoso.length; i++) {
            if ($scope.linguaListIdoso[i].id == lingua.id) {
                isExistent = true;
                index = i;
                break;
            }
        }
        if (isExistent) {
            $scope.linguaListIdoso.splice(index, 1);
        } else {
            $scope.linguaListIdoso.push(lingua);
        }
        $scope.elderly.linguaList = $scope.linguaListIdoso
        console.log($scope.elderly)
    }

    $scope.getReportList = (idInstitute, nameTutor, type, offset) => {
        instituteAPI.getReportList(idInstitute, nameTutor, type, offset).success(data => {
            $scope.reportList = data.entityList
            $scope.count = data.quantidadeTotalObjetos
        }).error(err => {
            toast.toastError('Ocorreu um erro ao buscar a lista de denúncias!', 4000)
        })

    }

    $scope.paginationReport = (idInstitute, nameTutor, typeReport, offset, type) => {
        if (type === 'next') {
            $scope.offset += 10
        } else {
            $scope.offset -= 10
        }
        $scope.getReportList(idInstitute, nameTutor, typeReport, offset)
    }

    $scope.reportListIsEmpty = () => {
        return $scope.reportList.length < 1
    }
})