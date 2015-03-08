var racts = angular.module('racts', ['ui.router']);


racts.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/'),


	$stateProvider
		.state('auth', {
			resolve: {
				localStorageCheck: ['session', function(session){
					return session.localStorageCheck()
				}]
			},
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
			controller: 'subscriptionsController',
			resolve: {
				subscriptionsResolver: 'subscriptionsResolver'
			}
		})


		.state('landingpage.showtasks', {
			params: ['tasks'],
			views: {
				'@': {
					templateUrl: 'ng/templates/showtasks.html',
					controller: 'showTasksController'
				}
			}
		})


		.state('landingpage.public', {
			url: '/public',
			templateUrl: 'ng/templates/public.html',
			controller: 'availableController',
			resolve: {
				availableResolver: 'availableResolver'
			}
		})
}]);


//// CUSTOM DIRECTIVES

racts.directive('activeTask', function(){

	return {
		restrict: 'AE',
		templateUrl: 'ng/directives/activetask.html',
		replace: true
	}

})

racts.directive('subscription', function(){

	return {
		restrict: 'AE',
		templateUrl: 'ng/directives/subscription.html',
		replace: true
	}

})

racts.directive('available', function(){

	return {
		restrict: 'AE',
		templateUrl: 'ng/directives/available.html',
		replace: true
	}

})






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






racts.controller('randomController', [function(){

console.log('Its randomController speaking!')


}])
