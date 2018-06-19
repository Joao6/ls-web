angular
    .module('lifeStories')
    .config(AppConfig);

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider']

function AppConfig($stateProvider, $urlRouterProvider, $rootScope) {

    $stateProvider
        .state({
            name: 'main',
            url: '/main',
            templateUrl: 'views/main/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                logout: function ($rootScope) {
                    $rootScope.userLogged = null
                    window.localStorage.removeItem('ls-user-hash')
                }
            }
        })
        .state({
            name: 'recovery-password',
            url: '/recovery-password/:recoveryType',
            templateUrl: 'views/main/recovery-password.html',
            controller: 'MainController',            
            resolve: {
                logout: function () {}
            }
        })
        .state({
            name: 'recovery-change-password',
            url: '/recovery-password/:recoveryCode/:userId',
            templateUrl: 'views/main/recovery-password-ok.html',
            controller: 'MainController',            
            resolve: {
                logout: function () {}
            }
        })
        .state({
            name: 'how-work',
            url: '/how-works',
            templateUrl: 'views/main/how-works.html',
            controller: 'MainController',
            resolve: {
                openModal: function () {

                }
            }
        })
        .state({
            name: 'register',
            url: '/register',
            templateUrl: 'views/main/register.html',
            controller: 'registerController',
            resolve: {
                openModal: function () {

                }
            }
        })
        .state({
            name: 'adm-home',
            url: '/adm/home',
            templateUrl: 'views/adm/home.html',
            controller: 'admController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)                   
                },
                instituteList: function () { },
                studentList: function () {},
                instituteDetails: function () { }, 
                studentDetails : function (){ },                 
                iconSideNav: function(){
                    return 'home'
                }
            }
        })
        .state({
            name: 'adm-profile',
            url: '/adm/profile',
            templateUrl: 'views/adm/profile.html',
            controller: 'admController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                instituteList: function () { },
                studentList: function () {},
                instituteDetails: function () { }, 
                studentDetails : function (){ },                 
                iconSideNav: function(){
                    return 'user'
                }
            }
        })
        .state({
            name: 'adm-institutes',
            url: '/adm/institutes',
            templateUrl: 'views/adm/institutes.html',
            controller: 'admController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                instituteList: function (userAPI) {
                    return userAPI.getInstitutes()
                },
                studentList: function () {},
                instituteDetails: function () { }, 
                studentDetails : function (){ },                 
                iconSideNav: function(){
                    return 'instituicoes'
                }
            }
        })
        .state({
            name: 'adm-students',
            url: '/adm/students',
            templateUrl: 'views/adm/students.html',
            controller: 'admController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                instituteList: function () {},
                studentList: function (studentAPI) {
                    return studentAPI.getStudents()
                },
                instituteDetails: function () { },  
                studentDetails : function (){ },                
                iconSideNav: function(){
                    return 'emoj'
                }
            }
        })
        .state({
            name: 'adm-languages',
            url: '/adm/languages',
            templateUrl: 'views/adm/languages.html',
            controller: 'languageController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                linguaList: function (userAPI){
                    return userAPI.getLinguaList()
                },
                studentDetails : function (){ },  
                iconSideNav: function(){
                    return 'gamificacao'
                }
            }
        })
        .state({
            name: 'adm-instituteDetails',
            url: '/adm/institutes/:idInstitute/details',
            templateUrl: 'views/adm/instituteDetails.html',
            controller: 'admController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                instituteList: function () { },
                studentList: function () {},
                instituteDetails: function (userAPI, $stateParams) {
                    return userAPI.getInstitute($stateParams.idInstitute)
                },     
                studentDetails : function (){ },           
                iconSideNav: function(){
                    return 'instituicoes'
                }
            }
        })
        .state({
            name: 'adm-studentDetails',
            url: '/adm/students/:idStudent/details',
            templateUrl: 'views/adm/studentDetails.html',
            controller: 'admController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                instituteList: function () { },
                studentList: function () {},
                instituteDetails: function () { },
                studentDetails : function (userAPI, $stateParams){
                    return userAPI.getStudent($stateParams.idStudent)
                },              
                iconSideNav: function(){
                    return 'emoj'
                }
            }
        })
        .state({
            //rota para a página do mapa do estudante
            name: 'student-home',
            url: '/student/home',
            templateUrl: 'views/student/home.html',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                iconSideNav: function(){
                    return 'home'
                }
            },
            controller: 'studentController'
        })
        .state({
            //rota para a página do mapa do estudante
            name: 'student-profile',
            url: '/student/profile',
            templateUrl: 'views/student/profile.html',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                iconSideNav: function(){
                    return 'user'
                }
            },
            controller: 'studentController'
        })
        .state({
            name: 'student-progress',
            url: '/student/progress',
            templateUrl: 'views/student/progress.html',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                iconSideNav: function(){
                    return 'gamificacao'
                }
            },
            controller: 'gameController'
        })
        .state({
            name: 'student-calls',
            url: '/student/calls',
            templateUrl: 'views/student/call-list.html',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },                
                iconSideNav: function(){
                    return 'emoj'
                }
            },
            controller: 'callController'
        })
        .state({
            name: 'student-reports',
            url: '/student/reports',
            templateUrl: 'views/student/report-list.html',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },                
                iconSideNav: function(){
                    return 'denuncias'
                }
            },
            controller: 'callController'
        })
        .state({
            name: 'student-call',
            url: '/student/call',
            templateUrl: 'views/student/call.html',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                callList: function(){},
                iconSideNav: function(){
                    return ''
                }
            },
            controller: 'studentRTCController'
        })
        .state({
            //rota para a página onde o idoso fica aguardando a conversa
            name: 'elderly-home',
            url: '/elderly/home',
            templateUrl: 'views/elderly/home.html',
            controller: 'elderlyController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                iconSideNav: function(){
                    return 'home'
                }
            }
        })
        .state({
            //rota para a página onde o idoso fica aguardando a conversa
            name: 'elderly-profile',
            url: '/elderly/profile',
            templateUrl: 'views/elderly/profile.html',
            controller: 'elderlyController',
            resolve: {
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                iconSideNav: function(){
                    return 'user'
                }
            }
        })
        .state({
            //rota para a página onde o idoso fica aguardando a conversa
            name: 'institute-home',
            url: '/institute/home',
            templateUrl: 'views/institute/home.html',
            controller: 'instituteController',
            resolve: {
                elderlyEdit: function () { },
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                elderlyList: function () { },
                iconSideNav: function(){
                    return 'home'
                },
                linguaList: function(){}
            }
        })
        .state({
            name: 'institute-profile',
            url: '/institute/profile',
            templateUrl: 'views/institute/profile.html',
            controller: 'instituteController',
            resolve: {
                elderlyEdit: function () { },
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                elderlyList: function () { },
                iconSideNav: function(){
                    return 'user'
                },
                linguaList: function(){}
            }
        })
        .state({
            name: 'institute-elderlies',
            url: '/institute/elderlies',
            templateUrl: 'views/institute/elderly-list.html',
            controller: 'instituteController',
            resolve: {
                elderlyEdit: function () { },
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                elderlyList: function getElderlyList($rootScope, instituteAPI) {
                    let hashUser = window.localStorage.getItem('ls-user-hash')
                    if (hashUser) {
                        hashUser = hashUser.substring(32, hashUser.length)
                        return instituteAPI.getElderlyList(parseInt(hashUser))
                    } else {
                        return null
                    }
                },
                iconSideNav: function(){
                    return 'professores'
                },
                linguaList: function(){}
            }
        })
        .state({
            name: 'institute-elderlies-new',
            url: '/institute/elderlies/new',
            templateUrl: 'views/institute/elderly-new.html',
            controller: 'instituteController',
            resolve: {
                elderlyEdit: function () { },
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                elderlyList: function () { },
                iconSideNav: function(){
                    return 'cadastrar'
                },
                linguaList: function(instituteAPI){
                    return instituteAPI.linguaListAll()
                }
            }
        })
        .state({
            name: 'institute-elderlies-edit',
            url: '/institute/elderlies/:idElderly/edit',
            templateUrl: 'views/institute/elderly-edit.html',
            controller: 'instituteController',
            resolve: {
                elderlyEdit: function ($stateParams, userAPI) {
                    return userAPI.getUserById($stateParams.idElderly)
                },
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                elderlyList: function () { },
                iconSideNav: function(){
                    return 'professores'
                },
                linguaList: function(instituteAPI){
                    return instituteAPI.linguaListAll()
                }
            }
        })
        .state({
            name: 'institute-report-list',
            url: '/institute/reports',
            templateUrl: 'views/institute/report-list.html',
            controller: 'instituteController',
            resolve: {
                elderlyEdit: function () {},
                userLogged: function getUser(userAPI, $rootScope) {
                    return getUserLogged(userAPI, $rootScope)
                },
                elderlyList: function () { },
                iconSideNav: function(){
                    return 'denuncias'
                },
                linguaList: function(){}
            }
        })
        .state({
            //rota chamada quando o usuário não possui autorização
            name: 'access-denied',
            url: '/access-denied',
            templateUrl: 'views/error/access-denied.html'
        });

    function getUserLogged(userAPI, $rootScope) {
        if (!$rootScope.userLogged) {
            let hashUser = window.localStorage.getItem('ls-user-hash')
            if (hashUser) {
                return userAPI.validateUser(hashUser)
            } else {
                return null
            }
        }
    }
    $urlRouterProvider.otherwise('main')    
}