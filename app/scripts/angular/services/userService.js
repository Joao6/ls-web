angular.module('lifeStories').service('userService', function ($rootScope, $location, userAPI, toast, config) {
    this.validateLogin = (user) => {       
        $('.modal-backdrop').remove(); 
        userAPI.validateLogin(user).success(data => {
            $('.modal-backdrop').remove(); 
            document.getElementById('loading-modal').style.display = 'none'
            if (data) {
                $rootScope.userLogged = data
                if (data.email) {
                    window.localStorage.setItem('ls-user-hash', md5(data.email + data.senha) + data.id)
                } else {
                    window.localStorage.setItem('ls-user-hash', md5(data.codigo + data.senha) + data.id)
                }
                if (data.tipo === 'adm') {
                    $location.path('/adm/home')
                } else if (data.tipo === 'est') {
                    $location.path('/student/home')
                } else if (data.tipo === 'ido') {
                    $location.path('/elderly/home')
                } else {
                    $location.path('/institute/home')
                }
            } else {
                $('.modal-backdrop').remove(); 
                $('#modal-login').modal()
                toast.toastError('Login ou senha inválidos.', 4000)
            }
        }).error(err => {
            $('.modal-backdrop').remove(); 
            document.getElementById('loading-modal').style.display = 'none'
            $('#modal-login').modal()
            toast.toastError('Ocorreu um erro ao realizar o login =(', 4000)
        })
    }

    this.logout = () => {
        $rootScope.userLogged = null
        window.localStorage.removeItem('ls-user-hash')
        $location.path('/')
    }

    this.sendEmail = (name, message, to_email) => {
        emailjs.init("user_JlXYIwCPGdmsJlEzkNTLR");
        emailjs.send("gmail_lifestories", "life_stories", { name: name, message: message, to_email: to_email}) 
      }

    this.validateInstitute = (institute, type) => {
        let instituteOk = true
        if (institute) {
            if (!institute.nome || institute.nome === null || institute.nome === '') {
                instituteOk = false
            }
            if (!institute.email || institute.email === null || institute.email === '') {
                instituteOk = false
            }
            if (institute.localizacao) {
                if (institute.localizacao.latitude === null || institute.localizacao.latitude === '') {
                    instituteOk = false
                }
                if (institute.localizacao.longitude === null || institute.localizacao.longitude === '') {
                    instituteOk = false
                }
            } else {
                instituteOk = false
            }
            if (!institute.registroLegal || institute.registroLegal === null || institute.registroLegal === '') {
                instituteOk = false
            }
            if (type !== 'update') {
                if (institute.senha && institute.confSenha) {
                    if (institute.senha !== institute.confSenha) {
                        instituteOk = false
                    }
                } else {
                    instituteOk = false
                }
            }
        } else {
            instituteOk = false
        }
        return instituteOk
    }

    this.validateStudent = (student, type) => {
        let studentOk = true
        if (student) {
            if (!student.nome || student.nome === null || student.nome === '') {
                studentOk = false
            }
            if (!student.email || student.email === null || student.email === '') {
                studentOk = false
            }
            if (type !== 'update') {
                if (student.senha && student.confSenha) {
                    if (student.senha !== student.confSenha) {
                        studentOk = false
                    }
                } else {
                    studentOk = false
                }
            }
        } else {
            studentOk = false
        }
        return studentOk
    }

    this.validateElderly = (elderly, type) => {
        let elderlyOk = true
        if (elderly) {
            if (!elderly.nome || elderly.nome === null || elderly.nome === '') {
                $('#input-name').addClass('has-error')
                elderlyOk = false
            }
            if (type !== 'update') {
                if (elderly.senha) {
                    if (elderly.senha !== elderly.confSenha) {
                        elderlyOk = false
                        $('#input-password').addClass('has-error')
                        $('#input-password-2').addClass('has-error')
                    }
                } else {
                    elderlyOk = false
                    $('#input-password').addClass('has-error')
                    $('#input-password-2').addClass('has-error')
                }
            }

            if (!elderly.codigo || elderly.codigo === null || elderly.codigo === '') {
                $('#input-code').addClass('has-error')
                elderlyOk = false
            }
        } else {
            elderlyOk = false
        }
        return elderlyOk
    }
})