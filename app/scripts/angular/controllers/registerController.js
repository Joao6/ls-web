angular.module('lifeStories').controller('registerController', function ($scope, registerService, $location, userAPI, userService, toast, utils, $translate) {

    $scope.typeOfRegister = '';
    $scope.institute = {};
    $scope.emailOk = true;
    $scope.student = {}
    $scope.institute = {}
    $scope.registered = false

    const messageInstitute = "Obrigado por se cadastrar em nosso sistema. Pedimos que você aguarde" +
        " até que um administrador do sistema aprove o seu cadastro, este procedimento" +
        " é realizado em torno de duas horas. Desta forma é possível realizar um" +
        " controle sobre as instituições que estão cadastradas em nosso sistema." +
        " Não se preocupe, você será avisado assim que isto acontecer =)"
    const messageStudent = "Obrigado por se cadastrar em nosso sistema. Agora você possui acesso e poderá" +
        " conversar com pessoas do mundo todo. Divirta-se =)"

    $scope.openModalRegister = () => {
        setTimeout(function () {
            $('#modal-register').modal()
        }, 500);
    }

    $scope.setTypeOfRegister = function (type) {
        $scope.typeOfRegister = type;
        if ($scope.typeOfRegister == 'Institute') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.$apply(function () {
                        var localizacao = {};
                        localizacao.latitude = position.coords.latitude;
                        localizacao.longitude = position.coords.longitude;

                        $scope.institute.localizacao = localizacao;
                    });
                });
            } else {
                //navegador não compativel
            }
        }
    };

    $scope.registerNewStudent = (student) => {

        if (userService.validateStudent(student)) {
            document.getElementById('loading-modal').style.display = 'block'
            student.imagem = $('#urlImageStudent').val()
            userAPI.newStudent(student).success(data => {
                utils.sendEmail(student.nome, messageStudent, student.email)
                document.getElementById('loading-modal').style.display = 'none'
                $scope.registered = true
                delete $scope.student
                showFeedback('success')
            }).error(err => {
                document.getElementById('loading-modal').style.display = 'none'
                showFeedback('error')
            })
        } else {
            showFeedback('error')
        }
    }

    $scope.registerNewInstitute = (institute) => {

        if (userService.validateInstitute(institute)) {
            document.getElementById('loading-modal').style.display = 'block'
            userAPI.newInstitute(institute).success(data => {
                utils.sendEmail(institute.nome, messageInstitute, institute.email)
                document.getElementById('loading-modal').style.display = 'none'
                $scope.registered = true
                delete $scope.institute
                showFeedback('success')
            }).error(err => {
                document.getElementById('loading-modal').style.display = 'none'
                showFeedback('error')
            })
        } else {
            showFeedback('error')
        }
    }

    $scope.validateEmail = (type, email) => {
        userAPI.validateEmail(type, email).success(data => {
            if (!data) {
                $scope.emailOk = false
                toast.toastError('Este e-mail já está cadastrado no sistema...', 4000)
                $('#input-email').addClass('has-error')
            } else {
                $scope.emailOk = true
                $('#input-email').removeClass('has-error')
            }
        }).error(err => {
            toast.toastError('Erro ao validar o e-mail.', 4000)
        })
    }

    function showFeedback(tipo) {
        if (document.getElementById("carregar-lado-esquerdo")) {
            document.getElementById("carregar-lado-esquerdo").style.display = 'none'
        }
        document.getElementById("feedback-register-" + tipo).style.display = 'block'
        var ladoEsquerdo = document.getElementById("feedback-register-" + tipo);
        ladoEsquerdo.id = "carregar-lado-esquerdo";
    }

    $scope.openModal = (modal) => {
        $('#' + modal).modal()
    }

    $scope.changeLanguage = (language) => {
        $translate.use(language)
    }
})