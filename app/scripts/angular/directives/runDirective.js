angular.module('lifeStories').run(($location, $rootScope, userAPI, config, toast, $window) => {

    const nonBlockedRoutes = ['/main', '/register', '/login', 'recovery-password', '/access-denied', '/how-works']

    $rootScope.$on('$stateChangeStart', () => {

        const urlActual = $location.path();
        if ($rootScope.userLogged != null) {
            if ($rootScope.userLogged.tipo === 'est') {
                if ((urlActual.indexOf('/adm/') !== -1) || (urlActual.indexOf('/elderly/') !== -1) || (urlActual.indexOf('/institute/') !== -1)) {
                    $location.path('/access-denied')
                }
            } else if ($rootScope.userLogged.tipo === 'ido') {
                if ((urlActual.indexOf('/adm/') !== -1) || (urlActual.indexOf('/student/') !== -1) || (urlActual.indexOf('/institute/') !== -1)) {
                    $location.path('/access-denied')
                }
            } else if ($rootScope.userLogged.tipo === 'adm') {
                if ((urlActual.indexOf('/student/') !== -1) || (urlActual.indexOf('/elderly/') !== -1) || (urlActual.indexOf('/institute/') !== -1)) {
                    $location.path('/access-denied')
                }
            } else if ($rootScope.userLogged.tipo === 'ins') {
                if ((urlActual.indexOf('/student/') !== -1) || (urlActual.indexOf('/elderly/') !== -1) || (urlActual.indexOf('/adm/') !== -1)) {
                    $location.path('/access-denied')
                }
            }
        } else {
            if (nonBlockedRoutes.indexOf(urlActual) === -1 && urlActual.indexOf('recovery-password') === -1) {
                if (!window.localStorage.getItem('ls-user-hash')) {
                    toast.toastWarning('Sua sessão expirou, faça login novamente!', 4000)
                    //$location.path('/main')                    
                    $window.location.href = '/#/main';
                }
            }
        } /*else {
            let hashUser = {}
            hashUser = window.localStorage.getItem('ls-user-hash')            
            if (hashUser) {
                userAPI.validateUser(hashUser).success(data => {
                    if (data.id) {
                        $rootScope.userLogged = data
                        if($rootScope.userLogged.imagem){
                            $rootScope.userLogged.imagem = config.baseUrl + '/imagens?url=' + $rootScope.userLogged.imagem 
                        }                        
                    } else {
                        $location.path('/main')
                    }
                }).error(err => {
                    $location.path('/main')
                })
            } else {
                if (nonBlockedRoutes.indexOf(urlActual) === -1) {
                    $location.path('/main')
                }
            }
        }*/
    })
})