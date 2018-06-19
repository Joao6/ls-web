angular.module('lifeStories').controller('gameController', function ($location, $scope, $rootScope, userAPI, studentAPI, toast, config, userLogged, iconSideNav, $translate) {

    $scope.callCount = 0
    $scope.associetedCount = 0
    $scope.avaliationCall = 0

    if (userLogged) {
        $rootScope.userLogged = userLogged.data
    }

    $scope.getCallCount = (id) => {
        studentAPI.getCallCount(id).success( data => {
            $scope.callCount = data
        })
    }

    $scope.getAssocietedCount = (id) => {
        studentAPI.getAssocietedCount(id).success( data => {
            $scope.associetedCount = data
        })
    }

    $scope.getAvaliationCall = (id) => {
        studentAPI.getAvaliationCall(id).success( data => {
            $scope.avaliationCall = data
        })
    }

    $scope.getReportCount = (id) => {
        studentAPI.getReportCount(id).success( data => {
            $scope.reports = data
        })
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

    $scope.getCallCount($rootScope.userLogged.id)
    $scope.getAssocietedCount($rootScope.userLogged.id)
    $scope.getAvaliationCall($rootScope.userLogged.id)
    $scope.getReportCount($rootScope.userLogged.id)
})