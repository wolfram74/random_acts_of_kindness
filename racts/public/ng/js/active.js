racts.factory('activeTasksModel', [function() {

	var data = {
		assignments: []
	}
	return data;
}]);



racts.service('activeTasksResolver', ['$http', '$q', 'activeTasksModel', 'session', function($http, $q, activeTasksModel, session) {

	console.log('********** ActiveTaskResolver initiated TEST BEGIN **********')
	console.log('currentUser in session:')
	console.log( session.currentUser() )

	console.log('activeTask before resolving:')
	console.log( activeTasksModel.assignments )


	var getActiveTasks = $http.get('http://localhost:3000/users/'+session.currentUser().id+'/active')
				.success(function(response) {
					activeTasksModel.assignments = response
					console.log('activeTasks after API call :')
					console.log( activeTasksModel.assignments )
				})
				.error(function(response){
					console.log('error with fetching active tasks')
				})

	console.log('********** ActiveTaskResolver initiated TEST END **********')
	return getActiveTasks

}])


racts.service('activeTasksService', ['$http', '$q', 'activeTasksModel', function($http, $q, activeTasksModel ) {

		this.activeTasksModel = activeTasksModel
		this.complete = function(task){
			$http.put("http://localhost:3000/assignments/" + task.assignment_id+'/complete')
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
	$scope.completeTask =  function(task, index) {
			if(confirm("Are you sure?")) {
				 activeTasksService.complete(task)
		}
	}
}])









