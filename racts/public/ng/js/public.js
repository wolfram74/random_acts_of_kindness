racts.factory('availableModel', [function() {
	
	var available = {
		available: []
	}

	var API = {
		available: function(){return available}
	}

	return API;

}]);



racts.service('availableResolver', ['$http', '$q', 'availableModel', function($http, $q, availableModel ) {


	var getAvailable = $http.get('http://localhost:3000/categories/')
				.success(function(response) {
					availableModel.available().available = response
					console.log( availableModel.available() )
				})
				.error(function(response){
					console.log('error')
				})

	return getAvailable

}])


racts.service('availableService', ['$http', '$q', 'availableModel', function($http, $q, availableModel ) {
		

		var availableModel = availableModel




		var API = {

			availableModel: function(){return availableModel}

		}

		return API


}])



racts.controller('availableController', ['$http', '$scope', 'availableService', 'availableResolver', function($http, $scope, availableService, availableResolver){


	console.log('availableController is activated')
	console.log('resolver works if below has some assignments unparsed')
	$scope.available = availableService.availableModel().available().available.list
	console.log($scope.available)
	

}])
