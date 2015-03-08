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

}])

// racts.service('activeTasksComplete', ['$http', '$q', 'activeTasksModel', 'activeTasksService', function($http, $scope, activeTasksModel, activeTasksService) {
// 	var completedTask = function(task) {
// 			if(confirm("Are you sure?")) {
// 				$http.put("http://localhost:3000/assignments/" + #{task.assignemnt_id})
// 				.success(function(response) {
// 					console.log(response)
// 					var index =
// 					activeTasksService.activeTasksModel.assignments.delete(task)
// 				})
// 				.error(function(response) {
// 					console.log("Rejected")
// 				})
// 			}
// 	}
// }])

racts.controller('activeTasksController', ['$http', '$scope', 'activeTasksService', function($http, $scope, activeTasksService){

	$scope.assignments = activeTasksService.activeTasksModel.assignments

	console.log($scope.assignments)
	// console.log( #{task.assignemnt_id})
	$scope.completeTask =  function(task, index) {
			if(confirm("Are you sure?")) {
				 console.log("hello")
				 console.log("http://localhost:3000/assignments/" + task.assignment_id)
				$http.put("http://localhost:3000/assignments/" + task.assignment_id)
				.success(function(response) {
					console.log(response)
					// $scope.assignments.splice(index,1);
		    })
				// .error(function(response) {
				//   console.log("Rejected")
			}
	}
}])









