'use strict'
angular.module('lifeStories')
    .controller('languageController', function ($scope, userAPI, userService, $rootScope, userLogged, toast, iconSideNav, linguaList, $translate) {

        $scope.offset = 0
        $scope.count = 0
        $scope.lingua = {}

        if (userLogged) {
            $rootScope.userLogged = userLogged.data
        }

        if (linguaList) {
            $scope.linguaList = linguaList.data.entityList
            $scope.count = linguaList.data.quantidadeTotalObjetos
        } else {
            $scope.linguaList = []
        }

        $scope.changeIcon = () => {
            if (iconSideNav) {
                var src = '../images/' + iconSideNav + '-selected.png'
                document.getElementById(iconSideNav).childNodes[1].src = src
                $('#' + iconSideNav).addClass('active-menu')
            }
        }

        $scope.getLinguas = (name, offset) => {
            userAPI.getLinguaList(name, offset).success(data => {
                $scope.linguaList = data.entityList
                $scope.count = data.quantidadeTotalObjetos
            }).error(err => {
                toast.toastError('Ocorreu um erro ao buscar a lista de línguas!', 4000)
            })
        }

        $scope.deleteLingua = (lingua) => {
            userAPI.deleteLingua(lingua).success(data => {
                $scope.getLinguaList($scope.search, $scope.offset)
                toast.toastSuccess('Língua excluída com sucesso!', 4000)
            }).error(err => {
                toast.toastError('Ocorreu um erro ao excluir esta língua!', 4000)
            })
        }

        $scope.linguaListIsEmpty = () => {
            return $scope.linguaList.length < 1
        }

        $scope.openModal = (modal, language) => {
            if (language) {
                $scope.lingua = language
            }
            $('#' + modal).modal()
        }

        $scope.paginationLingua = (name, offset, type) => {
            if (type === 'next') {
                $scope.offset += 10
            } else {
                $scope.offset -= 10
            }
            $scope.getLinguas(name, offset)
        }

        $scope.logout = () => {
            userService.logout()
        }

        $scope.changeLanguage = (language) => {
            $translate.use(language)
        }
    });
