racts.factory('activeTasksModel', [function() {
	
	var data = {
		assignments: []
	}
	return data;
}]);



racts.service('activeTasksResolver', ['$http', '$q', 'activeTasksModel', function($http, $q, activeTasksModel ) {


	var getActiveTasks = $http.get('http://localhost:3000/users/1/active')
				.success(function(response) {
					activeTasksModel.assignments = response
				})
				.error(function(response){
					console.log('error with fetching active tasks. response is:')
					console.log('looong')
					activeTasksModel.assignments = 'foooz0r' // for checking purposes
				})

	return $.when(getActiveTasks)

}])


racts.service('activeTasksService', ['$http', '$q', 'activeTasksModel', function($http, $q, activeTasksModel ) {
		

		this.activeTasksModel = activeTasksModel
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

	$scope.assignments = activeTasksService.activeTasksModel.assignments

	console.log($scope.assignments)



}])





