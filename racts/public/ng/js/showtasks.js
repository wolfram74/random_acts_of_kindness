

racts.controller('showTasksController', ['$stateParams','$http', '$scope',function($stateParams, $http, $scope){

	console.log('showtasksController is alive')
  var originalParams = JSON.parse($stateParams.tasks)
	console.log(originalParams)

	$scope.tasks = originalParams

}])
