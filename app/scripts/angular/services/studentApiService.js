angular.module('lifeStories').factory('studentAPI', function ($http, config) {

    const _getStudents = (name, offset) => {
        return $http.get(config.baseUrl + '/estudantes', { params: { 'nome': name, 'offset': offset } })
    }

    const _updateStudentProfile = student => {
        return $http.put(config.baseUrl + '/estudantes', student)
    }

    const _linguaList = () => {
        return $http.get(config.baseUrl + '/linguas/all')
    }

    const _getCallList = (idStudent, nameElderly, offset) => {
        return $http.get(config.baseUrl + '/conversas', { params: { 'idEstudante': idStudent, 'nomeIdoso': nameElderly, 'offset': offset } })
    }

    const _getReportList = (idStudent, nameTutor, type, offset) => {
        return $http.get(config.baseUrl + '/denuncias', { params: { 'idEstudante': idStudent, 'nomeIdoso': nameTutor, 'tipo': type, 'offset': offset } })
    }

    const _getVinculoList = (idStudent, offset) => {
        return $http.get(config.baseUrl + '/vinculos', { params: { 'idEstudante': idStudent, 'offset': offset } })
    }

    const _deleteStudent = student => {
        return $http.put(config.baseUrl + '/estudantes' , student)
    }

    const _getCallCount = (id) => {
        return $http.get(config.baseUrl + '/progresso/conversas', {params: {'idEstudante': id}})
    }

    const _getAssocietedCount = (id) => {
        return $http.get(config.baseUrl + '/progresso/vinculos', {params: {'idEstudante': id}})
    }

    const _getAvaliationCall = (id) => {
        return $http.get(config.baseUrl + '/progresso/avaliacoes', {params: {'idEstudante': id}})
    }

    const _getReportCount = (id) => {
        return $http.get(config.baseUrl + '/progresso/denuncias', {params: {'idEstudante': id}})
    }

    return {
        getStudents: _getStudents,
        updateStudentProfile: _updateStudentProfile,
        linguaList: _linguaList,
        getCallList: _getCallList,
        getReportList: _getReportList,
        getVinculoList: _getVinculoList,
        deleteStudent: _deleteStudent,
        getCallCount: _getCallCount,
        getAssocietedCount: _getAssocietedCount,
        getAvaliationCall: _getAvaliationCall,
        getReportCount: _getReportCount
    }
})