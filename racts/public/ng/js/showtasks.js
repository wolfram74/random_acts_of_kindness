// racts.factory('tasksModel', [function() {
	
// 	var data = {
// 		list: []
// 	}

// 	return data;

// }]);



// racts.service('tasksResolver', ['$http', '$q', 'tasksModel', function($http, $q, tasksModel ) {


// 	var gettasks = $http.get('http://localhost:3000/categories/')
// 				.success(function(response) {
// 					tasksModel.list = response.list
// 				})
// 				.error(function(response){
// 					console.log('error')
// 				})

// 	return gettasks

// }])


// racts.service('tasksService', ['$http', '$q', 'tasksModel', function($http, $q, tasksModel ) {
		


// 	this.tasksModel = tasksModel


// }])



racts.controller('showTasksController', ['$stateParams','$http', '$scope',function($stateParams, $http, $scope){

	console.log('showtasksController is alive')
  var originalParams = JSON.parse($stateParams.tasks)
	console.log(originalParams)

	$scope.tasks = originalParams

}])
