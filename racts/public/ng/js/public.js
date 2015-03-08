racts.factory('availableModel', [function() {

	var data = {
		list: []
	}

	return data;

}]);



racts.service('availableResolver', ['$http', '$q', 'availableModel', function($http, $q, availableModel ) {


	var getavailable = $http.get('http://localhost:3000/categories/')
				.success(function(response) {
					console.log('resolve successful')
					availableModel.list = response.list
				})
				.error(function(response){
					console.log('error')
				})

	return getavailable

}])


racts.service('availableService', ['$http', '$q', 'availableModel', function($http, $q, availableModel ) {

	this.subscribe = function(category){
	  $http.post('/users/' + category.user_id + '/categories/' + category.id)
	  	.success(function(response) {
	  		console.log(response)
	  	})
	  	.error(function(response) {
	  		console.log("ERROR!")
	  	})		
	}
	this.availableModel = availableModel


}])



racts.controller('availableController', ['$http', '$scope', 'availableService', 'availableResolver', 'loadAvailableTasksService', function($http, $scope, availableService, availableResolver, loadAvailableTasksService){

	$scope.available = availableService.availableModel.list

  $scope.showTasks = function(index){
	var category = availableService.availableModel.list[index]
	console.log(category.id)
	loadAvailableTasksService.load(category.id)
  }

  $scope.subscribe = function(category, index) {
  	console.log(category)
  	console.log(index)
  	console.log('/users/' + category.user_id + '/categories/' + category.id)
  	availableService.subscribe(category)
  }
}])



racts.service('loadAvailableTasksService', ['$state','$http', '$q', 'availableModel', function($state, $http, $q, availableModel ){


		this.load = function(id){
			console.log()
			$http.get('http://localhost:3000/categories/'+id)
				.success(function(response) {
					console.log(response)
					var paramsJSON = JSON.stringify(response)
					$state.go('landingpage.showtasks', {tasks: paramsJSON})

				})
				.error(function(response){
					console.log('error')
				})
		}

}])

