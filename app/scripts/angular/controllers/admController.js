'use strict'
angular.module('lifeStories')
    .controller('admController', function ($scope, $stateParams, userAPI, $location, userService, $rootScope, userLogged, instituteList, instituteDetails, instituteService, toast, iconSideNav, utils, studentList, studentDetails, studentAPI, $translate) {

        $scope.adm = {}
        $scope.institute = {}
        $scope.instituteList = []
        $scope.studentList = []
        $scope.student = {}
        $scope.idInstitute = $stateParams.idInstitute
        $scope.offset = 0
        $scope.count = 0

        const messageInstituteOk = "É com muita felicidade que viemos lhe avisar que o seu cadastro" +
            " no sistema Life Stories acabou de ser aprovado. Agora você pode acessá-lo e começar" +
            " a cadastrar seus tutores. Que eles sejam muito bem vindos =)"

        if (userLogged) {
            $rootScope.userLogged = userLogged.data
        }

        if (instituteList) {
            $scope.instituteList = instituteList.data.entityList
            $scope.count = instituteList.data.quantidadeTotalObjetos
        }

        if(studentList){
            $scope.studentList = studentList.data.entityList
            $scope.count = studentList.data.quantidadeTotalObjetos
        }

        if (studentDetails) {
            $scope.student = studentDetails.data
        } else {
            $scope.student = {}
        }

        if (instituteDetails) {
            $scope.institute = instituteDetails.data
            instituteService.loadMap($scope.institute)
        } else {
            $scope.institute = {}
        }

        $scope.changeIcon = () => {
            if (iconSideNav) {
                var src = '../images/' + iconSideNav + '-selected.png'
                document.getElementById(iconSideNav).childNodes[1].src = src
                $('#' + iconSideNav).addClass('active-menu')
            }
        }

        $scope.getAdmProfile = () => {
            userAPI.getUserById($rootScope.userLogged.id).success(data => {
                $scope.adm = data
            }).error(err => {

            })
        }

        $scope.updateAdmProfile = adm => {
            userAPI.updateAdmProfile(adm).success(data => {
                $location.path('/adm/profile')
            }).error(err => {
                toast.toastError('Ocorreu um erro ao atualizar os dados!', 4000)
            })
        }

        $scope.getInstitutes = (name, status, offset) => {
            userAPI.getInstitutes(name, status, offset).success(data => {
                $scope.instituteList = data.entityList
                $scope.count = data.quantidadeTotalObjetos
            }).error(err => {
                toast.toastError('Ocorreu um erro ao buscar a lista de instituições!', 4000)
            })
        }

        $scope.getStudents = (name, offset) => {
            studentAPI.getStudents(name, offset).success(data => {
                $scope.studentList = data.entityList
                $scope.count = data.quantidadeTotalObjetos
            }).error(err => {
                toast.toastError('Ocorreu um erro ao buscar a lista de estudantes!', 4000)
            })
        }

        $scope.deleteStudent = (student) => {
            student.tipo = 'dest'
            studentAPI.deleteStudent(student).success(data => {
                $scope.getStudents()
                toast.toastSuccess('Estudante desativado com sucesso!', 4000)
                $('#disableStudent').modal('hide')
            }).error(err => {
                toast.toastError('Ocorreu um erro ao desativar este estudante.', 4000)
            })
        }


        $scope.updateInstitute = (type, institute) => {
            institute.tipo = type
            document.getElementById('loading-modal').style.display = 'block'
            userAPI.updateInstitute(institute).success(data => {                
                document.getElementById('loading-modal').style.display = 'none'
                toast.toastSuccess('Cadastro analisado com sucesso!', 4000)
                if (type === 'ins') {
                    utils.sendEmail(institute.nome, messageInstituteOk, institute.email)
                } else {
                    utils.sendEmail(institute.nome, messageInstituteNok, institute.email)
                }
            }).error(err => {
                document.getElementById('loading-modal').style.display = 'none'
                toast.toastError('Erro ao analisar o cadastro', 4000)
            })
        }

        $scope.instituteListIsEmpty = () => {
            return $scope.instituteList.length < 1
        }

        $scope.openModal = (modal, institute) => {
            if (institute) {
                $scope.institute = institute
            }   
            $('#' + modal).modal()
        }

        $scope.openModalStudent = (modal, student) => {
            if (student) {
                $scope.student = student
            }
            $('#' + modal).modal()
        }

        $scope.pagination = (name, status, offset, type) => {
            if (type === 'next') {
                $scope.offset += 10
            } else {
                $scope.offset -= 10
            }
            $scope.getInstitutes(name, status, offset)
        }

        $scope.paginationStudent = (name, offset, type) => {
            if (type === 'next') {
                $scope.offset += 10
            } else {
                $scope.offset -= 10
            }
            $scope.getStudents(name, offset)
        }

        $scope.changeLanguage = (language) => {
            $translate.use(language)
        }

        $scope.logout = () => {
            userService.logout()
        }
    });
