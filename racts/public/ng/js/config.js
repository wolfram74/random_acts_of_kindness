var racts = angular.module('racts', ['ui.router']);


racts.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/'),

	$stateProvider
		.state('auth', {
			resolve: {
				localStorageCheck: ['$state','session', function($state, session){
					return session.localStorageCheck().then( function(loggedIn){
						if(loggedIn){$state.go('landingpage.active')}
					})
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
racts.controller('landingpageController', ['$state','$scope','$http', '$log', 'CategoryService', 'currentCategory','session',function($state, $scope, $http, $log, CategoryService, currentCategory, session){


	$scope.logOut = function(){
		session.setCurrentUser(null)
		$state.go('auth')
	}


}])


racts.run(['session', '$location', function(session, $location){

	if( !session.currentUser() ){
		console.log('executed run statement')
		$location.path('/')
	}

}])





/////// NOT IMPLEMENTED YET






racts.controller('randomController', [function(){

console.log('Its randomController speaking!')


}])
