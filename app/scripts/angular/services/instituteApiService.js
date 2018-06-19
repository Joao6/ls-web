angular.module('lifeStories').factory('instituteAPI', function ($http, config) {
    
        const _getElderlyList = (idInstitute, name, offset) => {
            return $http.get(config.baseUrl + '/instituicoes/' + idInstitute + '/idosos', {params: {'nome': name, 'offset': offset }})
        }
    
        const _updateInstituteProfile = institute => {
            return $http.put(config.baseUrl + '/instituicoes', institute)
        }

        const _deleteElderly = elderly => {
            return $http.put(config.baseUrl + '/instituicoes/' + elderly.instituicao.id + '/idosos', elderly)
        }

        const _updateElderly = elderly => {
            return $http.put(config.baseUrl + '/instituicoes/' + elderly.instituicao.id + '/idosos', elderly)
        }

        const _linguaList = () => {
            return $http.get(config.baseUrl + '/linguas')
        }

        const _linguaListAll = () => {
            return $http.get(config.baseUrl + '/linguas/all')
        }

        const _getReportList = (idInstitute, nameTutor, type, offset) => {
            return $http.get(config.baseUrl + '/denuncias', { params: { 'idInstituicao': idInstitute, 'nomeIdoso': nameTutor, 'tipo': type, 'offset': offset } })
        }
    
        return {
            getElderlyList: _getElderlyList,
            updateInstituteProfile: _updateInstituteProfile,
            deleteElderly: _deleteElderly,
            updateElderly: _updateElderly,
            linguaList: _linguaList,
            linguaListAll: _linguaListAll,
            getReportList: _getReportList
        }
    })