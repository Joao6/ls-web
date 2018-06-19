angular.module('lifeStories').service('registerService', function (userAPI, $location) {

    this.newStudent = (student) => {
        return new Promise((resolve, reject) => {
            userAPI.newStudent(student).success(data => {
                resolve(data)
            }).error(err => {
                reject({ 'error': err })
            })
        })
    }

    this.newInstitute = (institute) => {
        userAPI.newInstitute(institute).success(data => {
            return (data)
        }).error(err => {
            return ({ 'error': err })
        })
    }

})