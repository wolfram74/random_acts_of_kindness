racts.factory('activeTasksModel', [function() {
	
	var API = {
		assignments: {}
	}
	return API;
}]);



racts.service('activeTasksResolver', ['$http', '$q', 'activeTasksModel', function($http, $q, activeTasksModel ) {


	var getActiveTasks = $http.get('http://localhost:3000/users/1/active')
				.success(function(response) {
					activeTasksModel.assignments = response
					console.log(response)
					console.log('success')
				})
				.error(function(response){
					console.log('error with fetching active tasks. response is:')
					console.log('looong')
					activeTasksModel.assignments = 'foooz0r' // for checking purposes
				})

	return $.when(getActiveTasks)

}])


racts.service('activeTasksService', ['$http', '$q', 'activeTasksModel', function($http, $q, activeTasksModel ) {
		

		var activeTasksModel = activeTasksModel




		var API = {

			activeTasksModel: function(){return activeTasksModel}

		}

		return API
		// getTasks();

		// var q = $q.defer();

		// save = function(task) {
		// 	$http.post('http://localhost:3000/categoires' + currentCategory.current_category.id + '/tasks', {task: task})
		// 	.success(function(response) {
		// 		tasksList.push(response)
		// 		q.resolve("Resolved!!")
		// 	})
		// 	.error(function(response) {
		// 		q.reject("Rejected!")
		// 	})
		// }

		// this.saveTask = function(task) {
		// 	save(task);
		// 	return q.promise
		// }

		// this.tasks = function() {
		// 	return tasksList;
		// }
}])



racts.controller('activeTasksController', ['$http', '$scope', 'activeTasksService', function($http, $scope, activeTasksService){


	console.log('activetaskcontroller is activated')
	console.log('resolver works if below has some assignments unparsed')
	$scope.assignments = activeTasksService.activeTasksModel().assignments
	console.log($scope.assignments)

	// function taskController(tasks) {
	// 	$scope.tasks = tasks;

	// 	$scope.new_task = {}

	// 	$scope.add_task = function() {
	// 		tasksService.saveTask($scope.new_task);
	// 		$scope.new_task = {}
	// 	}
	// }


}])





