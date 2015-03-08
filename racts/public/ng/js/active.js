racts.factory('activeTasksModel', [function() {

	var data = {
		assignments: []
	}
	return data;
}]);



racts.service('activeTasksResolver', ['$http', '$q', 'activeTasksModel', function($http, $q, activeTasksModel ) {

	console.log('fooo!!!')
	var getActiveTasks = $http.get('http://localhost:3000/users/1/active')
				.success(function(response) {
					activeTasksModel.assignments = response
				})
				.error(function(response){
					console.log('error with fetching active tasks. response is:')
					console.log('looong')
				})

	return $.when(getActiveTasks)

}])


racts.service('activeTasksService', ['$http', '$q', 'activeTasksModel', function($http, $q, activeTasksModel ) {

		this.activeTasksModel = activeTasksModel

}])

racts.service('activeTasksComplete', ['$http', '$q', 'activeTasksModel', 'activeTasksService', function($http, $scope, activeTasksModel, activeTasksService) {
	var completedTask = function(task) {
			if(confirm("Are you sure?")) {
				$http.put("http://localhost:3000/assignments/" + #{task.assignemnt_id})
				.success(function(response) {
					console.log(response)

				})
				.error(function(response) {
					console.log("Rejected")
				})
			}
	}
}])

racts.controller('activeTasksController', ['$http', '$scope', 'activeTasksService', function($http, $scope, activeTasksService){

	$scope.assignments = activeTasksService.activeTasksModel.assignments

	console.log($scope.assignments)

	// $scope.completeTask = activeTasksComplete
}])









