angular.module('lifeStories').factory('userAPI', function ($http, config) {

	const _getStudents = () => {
		return $http.get(config.baseUrl + '/estudantes')
	}

	const _getStudent = id => {
		return $http.get(config.baseUrl + '/estudantes/' + id)
	}

	const _getInstitutes = (name, status, offset) => {
		return $http.get(config.baseUrl + '/instituicoes', { params: { 'nome': name, 'status': status, 'offset': offset } })
	}

	const _getUserById = id => {
		return $http.get(config.baseUrl + '/usuario/' + id)
	}

	const _updateAdmProfile = adm => {
		return $http.put(config.baseUrl + '/administrador/' + adm.id, adm)
	}

	const _getInstitute = id => {
		return $http.get(config.baseUrl + '/instituicoes/' + id)
	}

	const _updateInstitute = institute => {
		return $http.put(config.baseUrl + '/instituicoes', institute)
	}

	const _newStudent = student => {
		return $http.post(config.baseUrl + '/estudantes', student)
	}

	const _newInstitute = institute => {
		return $http.post(config.baseUrl + '/instituicoes', institute)
	}

	const _newElderly = elderly => {
		return $http.post(config.baseUrl + '/instituicoes/' + elderly.instituicao.id + '/idosos', elderly)
	}

	const _getUsers = () => {
		return $http.get(config.baseUrl + '/users')
	}

	const _validateLogin = (user) => {
		return $http.post(config.baseUrl + '/usuario/login', user)
	}

	const _validateEmail = (type, email) => {
		return $http.get(config.baseUrl + '/usuario/validar-email', { params: { 'tipo': type, 'email': email } })
	}

	const _validateUser = (hashUser) => {
		return $http.get(config.baseUrl + '/usuario/validar', { params: { 'hashUsuario': hashUser } })
	}

	const _getLinguaList = (name, offset) => {
		return $http.get(config.baseUrl + '/linguas', { params: { 'nome': name, 'offset': offset } })
	}

	const _deleteLingua = (lingua) => {
		return $http.delete(config.baseUrl + '/linguas/' + lingua.id, lingua)
	}

	const _saveCall = call => {
		return $http.post(config.baseUrl + '/conversas', call)
	}

	const _saveReport = report => {
		return $http.post(config.baseUrl + '/denuncias', report)
	}

	return {
		getStudents: _getStudents,
		getStudent: _getStudent,
		getInstitutes: _getInstitutes,
		getUsers: _getUsers,
		getUserById: _getUserById,
		getInstitute: _getInstitute,
		updateInstitute: _updateInstitute,
		updateAdmProfile: _updateAdmProfile,
		newStudent: _newStudent,
		newInstitute: _newInstitute,
		newElderly: _newElderly,
		validateLogin: _validateLogin,
		validateUser: _validateUser,
		getLinguaList: _getLinguaList,
		validateEmail: _validateEmail,
		deleteLingua: _deleteLingua,
		saveCall: _saveCall,
		saveReport: _saveReport
	}
})