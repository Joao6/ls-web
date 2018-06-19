angular.module('lifeStories').controller('callController', function ($location, $scope, $rootScope, userService, userAPI, studentAPI, toast, config, userLogged, iconSideNav, $translate) {

    $scope.offset = 0
    $scope.count = 0
    $scope.reportList = []
    $scope.callList = []
    $scope.typeReport = ""
    $scope.search = ""

    if (userLogged) {
        $rootScope.userLogged = userLogged.data
    }

    $scope.openModalReport = (modal, report) => {
        $scope.report = report
        $('#' + modal).modal()
    }

    $scope.getCallList = (idStudent, nameElderly, offset) => {
        studentAPI.getCallList(idStudent, nameElderly, offset).success(data => {
            $scope.callList = data.entityList
            $scope.count = data.quantidadeTotalObjetos
        }).error(err => {
            toast.toastError('Ocorreu um erro ao buscar a lista de conversas!', 4000)
        })
    }

    $scope.getReportList = (idStudent, nameTutor, type, offset) => {
        studentAPI.getReportList(idStudent, nameTutor, type, offset).success(data => {
            $scope.reportList = data.entityList
            $scope.count = data.quantidadeTotalObjetos
        }).error(err => {
            toast.toastError('Ocorreu um erro ao buscar a lista de denúncias!', 4000)
        })

    }

    $scope.paginationReport = (idStudent, nameTutor, typeReport, offset, type) => {
        if (type === 'next') {
            $scope.offset += 10
        } else {
            $scope.offset -= 10
        }
        $scope.getReportList(idStudent, nameTutor, typeReport, offset)
    }

    $scope.paginationCall = (idStudent, nameElderly, offset, type) => {
        if (type === 'next') {
            $scope.offset += 10
        } else {
            $scope.offset -= 10
        }
        $scope.getCallList(idStudent, nameElderly, offset)
    }

    $scope.changeIcon = () => {
        if (iconSideNav) {
            var src = '../images/' + iconSideNav + '-selected.png'
            document.getElementById(iconSideNav).childNodes[1].src = src
            $('#' + iconSideNav).addClass('active-menu')
        }
    }

    $scope.reportListIsEmpty = () => {
        return $scope.reportList.length < 1
    }

    $scope.callListIsEmpty = () => {
        return $scope.callList.length < 1
    }

    $scope.changeLanguage = (language) => {
        $translate.use(language)
    }

    $scope.logout = () => {
        userService.logout()
    }
})