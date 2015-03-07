racts.factory('availableModel', [function() {
	
	var data = {
		list: []
	}

	return data;

}]);



racts.service('availableResolver', ['$http', '$q', 'availableModel', function($http, $q, availableModel ) {


	var getAvailable = $http.get('http://localhost:3000/categories/')
				.success(function(response) {
					availableModel.list = response.list
				})
				.error(function(response){
					console.log('error')
				})

	return getAvailable

}])


racts.service('availableService', ['$http', '$q', 'availableModel', function($http, $q, availableModel ) {
		


	this.availableModel = availableModel


}])



racts.controller('availableController', ['$http', '$scope', 'availableService', 'availableResolver', function($http, $scope, availableService, availableResolver){

	$scope.available = availableService.availableModel.list

	

}])
