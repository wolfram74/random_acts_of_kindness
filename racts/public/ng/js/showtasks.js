

racts.controller('showTasksController', ['$stateParams','$http', '$scope',function($stateParams, $http, $scope){

  var originalParams = JSON.parse($stateParams.tasks)
	$scope.tasks = originalParams

}])
