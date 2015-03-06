console.log('im aliiiive BITCH')


var racts = angular.module('racts', ['ui.router']);


racts.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/'),


	$stateProvider
		.state('auth', {
			url: '/',
			templateUrl: 'ng/templates/auth.html',
			controller: 'authController'
		})

		.state('landingpage', {
			views: {
				'@': {
					url: '/logged-in',
					abstract: true,
					templateUrl: 'ng/templates/landingpage.html',
					controller: 'landingpageController'
				}
			}
		})

		.state('randomact', {
			views: {
				'@': {
					url: '/random',
					templateUrl: 'ng/templates/random.html',
					controller: 'randomController'
				}
			}
		})

		.state('landingpage.dashboard', {
			url: '/active-tasks',
			templateUrl: 'ng/templates/dashboard.html',
			controller: 'dashboardController'
		})

		.state('landingpage.private', {
			url: '/private',
			templateUrl: 'ng/templates/private.html',
			controller: 'privateController'
		})
		.state('landingpage.public', {
			url: '/public',
			templateUrl: 'ng/templates/public.html',
			controller: 'publicController'
		})
}]);

// Users service

racks.service('currentUser', function() {
	this.current_user = {}
});

racks.factory('UsersList', function() {
	userList = []
	return userList;
})

racks.service('UserService', ['$http', '$q', 'UsersList', function($http, $q, UsersList) {
		var q = $q.defer();
		getUsers = function() {
			$http.get('http://localhost:3000/users')
				.success( function(response) {
					 UserList = response;
					 q.resolve(response);
				})
		}
		getUsers();

		var q = $q.defer();
		save = function(user) {
			$http.post('http://localhost:3000/users', {user: user})
			.success(function(response) {
				UserList.push(response)
				q.resolve("Resolved!")
			})
			.error(function(response) {
				q.reject("Rejected!")
			})
		}

		this.saveUser = function(user) {
			save(user);
		  return q.promise
		}

		this.users = function() {
			return UsersList
		}

}])

// Category Services

racks.service('currentCategory', function() {
	this.current_category = {}
});

racks.factory('CategoryList', function(){
	categoryList = []
	return categoryList;
});


racks.service('CategoryService', ['$http', '$q', 'CategoryList', function($http, $q, CategoryList) {
		var q = $q.defer();
		getCategories = function() {
			$http.get('http://localhost:3000/categories')
			.success(function(response) {
				categoryList = response;
				q.resolve(response);
			})
		}

		getCategories();

		var q = $q.defer();
		save = function(category) {
			$http.post('http://localhost:3000/categories', {category: category})
			.success(function(response) {
				CategoryList.push(response)
				q.resolve("Resolved!")
			})
			.error(function(response) {
				q.reject("Rejected!")
			})
		}

		this.saveCategory = function(category) {
			save(category)
			return q.promise
		}

		this.categories = function() {
			return CategoryList
		}
}])

// Tasks Service

racts.factory('tasksList', function() {
	tasksList = []
	return tasksList;
});

racts.service('tasksService', ['$http', '$q', 'tasksList', 'currentCategory', function($http, $q, tasksList, currentCategory) {
		var q = $q.defer();
		getTasks = function() {
			$http.get('http://localhost:3000/categories' + currentCategory.current_category.id + '/tasks')
			.success(function(response) {
				tasksList.push(response);
				q.resolve(response);
			})
		}

		getTasks();

		var q = $q.defer();

		save = function(task) {
			$http.post('http://localhost:3000/categoires' + currentCategory.current_category.id + '/tasks', {task: task})
			.success(function(response) {
				tasksList.push(response)
				q.resolve("Resolved!!")
			})
			.error(function(response) {
				q.reject("Rejected!")
			})
		}

		this.saveTask = function(task) {
			save(task);
			return q.promise
		}

		this.tasks = function() {
			return tasksList;
		}
}])


racts.controller('authController', [function(){

console.log('Its authController speaking!')


}])

// LandingpageController lists,and submits a new category
racts.controller('landingpageController', ['$scope','$http', '$log', 'CategoryService', 'currentCategory',function($scope, $http, $log, CategoryService, currentCategory){

	function mainController(categories) {
		$scope.categories = categories
		$scope.currentCategory = function(index) {
			currentCategory.current_category = CategoryService.categories()[index]
		}

		$scope.newCategory = {}
		$scope.addCategory = function() {
			CategoryService.saveCategory($scope.newCategory)
			$scope.newCategory = {}
		}
	}

// console.log('Its landingpageController speaking!')
}])

// dashboarController lists and submits a task for a particular category

racts.controller('dashboardController', ['$http', '$log', '$scope', 'tasksService', function($http, $log, $scope, tasksService){

	function taskController(tasks) {
		$scope.tasks = tasks;

		$scope.new_task = {}

		$scope.add_task = function() {
			tasksService.saveTask($scope.new_task);
			$scope.new_task = {}
		}
	}

// console.log('Its dashboardController speaking!')


}])

racts.controller('publicController', [function(){

console.log('Its publicController speaking!')


}])

racts.controller('privateController', [function(){

console.log('Its privateController speaking!')


}])

racts.controller('randomController', [function(){

console.log('Its randomController speaking!')


}])




