angular
  .module('lifeStories')
  .controller('MainController', function ($scope, $location, config, userAPI, userService, toast, utils, $stateParams, studentAPI, $translate) {

    $scope.studentList = [];
    $scope.recoveryType = $stateParams.recoveryType
    $scope.recovery = {}
    $scope.recoveryCode = $stateParams.recoveryCode
    $scope.user = {}
    $scope.objectRecovery = {}
    let messageEmail = 'Olá, para alterar sua senha, acesse o seguinte link https://localhost:3000/#/recovery-password/'

    $scope.getStudents = function () {
      userAPI.getStudents().success(function (data) {
        $scope.studentList = data;
      }).error(function (data) {
        console.log("error");
      });
    };

    $scope.login = (user, typeUser) => {
      document.getElementById('loading-modal').style.display = 'block'
      if (user) {
        user.tipoUsuario = typeUser
        userService.validateLogin(user)
      } else {
        document.getElementById('loading-modal').style.display = 'none'
        toast.toastWarning('Preencha os dados', 4000)
      }
    }

    $scope.recoveryPassword = (email, type) => {
      if (email !== null && email !== undefined) {
        document.getElementById('loading-modal').style.display = 'block'
        $scope.recovery.hash = Math.floor(Date.now() / 1000)
        $scope.recovery.email = email
        $scope.recovery.tipoUsuario = type
        utils.createCodeRecovery($scope.recovery).success(dataCode => {
          messageEmail += dataCode.hash + '/' + dataCode.usuario.id
          utils.sendEmail(dataCode.usuario.nome, messageEmail, email).then(function (response) {
            document.getElementById('loading-modal').style.display = 'none'
            showFeedback('success')
            delete $scope.recovery
          }, function (err) {
            document.getElementById('loading-modal').style.display = 'none'
            showFeedback('error')
          })
        }).error(err => {
          document.getElementById('loading-modal').style.display = 'none'
          showFeedback('error')
        })
      } else {
        showFeedback('error')
      }
    }

    $scope.verifyRecoveryCode = (code) => {
      document.getElementById('loading-modal').style.display = 'block'
      utils.verifyRecoveryCode(code).success(data => {
        document.getElementById('loading-modal').style.display = 'none'
        if (data === null || !data.ativo) {
          toast.toastError('Este código é inválido ou já expirou.', 5000)
        } else {
          $scope.user = data.usuario
          $scope.objectRecovery = data
        }
      }).error(err => {
        toast.toastError('Ocorreu um erro ao validar o código de recuperação.', 4000)
        document.getElementById('loading-modal').style.display = 'none'
      })
    }

    $scope.updateUserRecovered = (newPassword) => {
      if (newPassword !== null && newPassword.password === newPassword.passwordConf) {
        document.getElementById('loading-modal').style.display = 'block'
        $scope.user.senha = newPassword.password
        if ($scope.user.tipo === 'ins') {
          userAPI.updateInstitute($scope.user).success(data => {
            document.getElementById('loading-modal').style.display = 'none'
            delete $scope.recovery
            $scope.recoveryForm.$setPristine()
            showFeedback('success')
          }).error(err => {
            document.getElementById('loading-modal').style.display = 'none'
            toast.toastError('Ocorreu um erro ao atualizar os dados', 4000)
          })
        } else if ($scope.user.tipo === 'est') {
          studentAPI.updateStudentProfile($scope.user).success(data => {
            document.getElementById('loading-modal').style.display = 'none'
            delete $scope.recovery
            $scope.recoveryForm.$setPristine()
            showFeedback('success')
          }).error(err => {
            document.getElementById('loading-modal').style.display = 'none'
            toast.toastError('Ocorreu um erro ao atualizar os dados', 4000)
          })
        }
        const recoveryCodeUpdated = {
          id: $scope.objectRecovery.id, ativo: false,
          hash: $scope.objectRecovery.hash, tipoUsuario: $scope.objectRecovery.usuario.tipo,
          email: $scope.objectRecovery.usuario.email
        }
        utils.updateRecoveryCode(recoveryCodeUpdated)
      } else {
        //erro
        showFeedback('error')
      }
    }

    $scope.logout = () => {
      userService.logout()
    }

    $scope.redirectPage = (url) => {
      $('#modal-login').modal('hide')
      setTimeout(function () {
        window.location.href = '#' + url
      }, 200);

    }

    function showFeedback(tipo) {
      if (document.getElementById("carregar-lado-esquerdo")) {
        document.getElementById("carregar-lado-esquerdo").style.display = 'none'
      }
      document.getElementById("feedback-register-" + tipo).style.display = 'block'
      var ladoEsquerdo = document.getElementById("feedback-register-" + tipo);
      ladoEsquerdo.id = "carregar-lado-esquerdo";
    }

    $scope.changeLanguage = (language) => {
      $translate.use(language)
    }

    $scope.closeModal = () => {
      $('.modal-backdrop').remove(); 
    }

  });