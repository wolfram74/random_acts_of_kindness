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

		.state('landingpage.active', {
			url: '/active-tasks',
			templateUrl: 'ng/templates/active.html',
			controller: 'activeTasksController',
			resolve: {
				activeTasksResolver: 'activeTasksResolver',
			}
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

//// ABSTRACT STATES

// LandingpageController lists,and submits a new category
racts.controller('landingpageController', ['$scope','$http', '$log', 'CategoryService', 'currentCategory',function($scope, $http, $log, CategoryService, currentCategory){

	// function mainController(categories) {
	// 	$scope.categories = categories
	// 	$scope.currentCategory = function(index) {
	// 		currentCategory.current_category = CategoryService.categories()[index]
	// 	}

	// 	$scope.newCategory = {}
	// 	$scope.addCategory = function() {
	// 		CategoryService.saveCategory($scope.newCategory)
	// 		$scope.newCategory = {}
	// 	}
	// }
}])








/////// NOT IMPLEMENTED YET



racts.controller('publicController', [function(){

console.log('Its publicController speaking!')


}])

racts.controller('privateController', [function(){

console.log('Its privateController speaking!')


}])

racts.controller('randomController', [function(){

console.log('Its randomController speaking!')


}])
