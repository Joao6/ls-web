angular.module('lifeStories').service('studentService', function (){

    this.validateStudentEntity = (student) => {
        let studentOk = true
        if(!student.id){
            studentOk = false
        }
        if(student.nome === undefined || student.nome === null){
            studentOk = false
        }
        if(student.email === undefined || student.email === null){
            studentOk = false
        }

        return studentOk
    }

})