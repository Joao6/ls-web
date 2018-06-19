angular.module("lifeStories").factory("loadingInterceptor", function ($q, $rootScope, $timeout) {
	return {
		request: function (config) {     
			var url = config.url;			
			return config;
		},
		requestError: function (rejection) {
			$rootScope.loading = false;
			return $q.reject(rejection);
		},
		response: function (response) {	
			return response;
		},
		responseError: function (rejection) {
			$rootScope.loading = false;
			return $q.reject(rejection);
		}
	};
});