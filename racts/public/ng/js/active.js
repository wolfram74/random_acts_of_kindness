racts.factory('activeTasksModel', [function() {

	var data = {
		assignments: []
	}
	return data;
}]);



racts.service('activeTasksResolver', ['$http', '$q', 'activeTasksModel', 'session', function($http, $q, activeTasksModel, session) {

	console.log('TESTZONE weeee')
	console.log( session.currentUser() )
	console.log('TESTZONE weeee ENDDD')
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
		this.complete = function(task){
			$http.put("http://localhost:3000/assignments/" + task.assignment_id)
				.success(function(response) {
					console.log("DONE!")
		    })
		    .error(function(response) {
		    	console.log("Rejected!")
		    })
			}
		
}])



racts.controller('activeTasksController', ['$http', '$scope', 'activeTasksService', function($http, $scope, activeTasksService){

	$scope.assignments = activeTasksService.activeTasksModel.assignments
	console.log($scope.assignments)
	$scope.completeTask =  function(task, index) {
			if(confirm("Are you sure?")) {
				 console.log("hello")
				 console.log(index)
				 console.log($scope.assignments[index].description)
				 console.log("http://localhost:3000/assignments/" + task.assignment_id)
				 activeTasksService.complete(task)
		}
	}
}])









