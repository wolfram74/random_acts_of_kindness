var racts = angular.module('racts', ['ui.router']);


racts.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/'),

	$stateProvider
		.state('auth', {
			resolve: {
				localStorageCheck: ['$state','session', function($state, session){
					console.log('localstoragecheck ')
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
					url: '/',
					templateUrl: 'ng/templates/auth.html',
					controller: 'randomController'
				}
			},
			resolve: {
				randomTask: 'randomResolver'
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

		.state('landingpage.completed', {
			url: '/completed-tasks',
			templateUrl: 'ng/templates/completed.html',
			controller: 'completedTasksController',
			resolve: {
				completedTasksResolver: 'completedTasksResolver',
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

racts.directive('completedTask', function(){

	return {
		restrict: 'AE',
		templateUrl: 'ng/directives/completedtask.html',
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
racts.controller('landingpageController', ['$state','$scope','$http','session',function($state, $scope, $http, session){


	$scope.logOut = function(){
		session.setCurrentUser(null)
		$state.go('auth')
	}


}])


racts.run(['session', '$location', function(session, $location){

	if( !session.currentUser() ){
		$location.path('/')
	}

}])





/////// NOT IMPLEMENTED YET

racts.service('randomResolver', ['$http', 'randomService', function($http, randomService){

		var getRandomTask = $http.get('http://localhost:3000/tasks/random')
				.success(function(response) {
					randomService.randomTask = response
				})
				.error(function(response){
					console.log('error with fetching active tasks')
				})
		return getRandomTask
}])

racts.service('randomService', [function(){

	this.randomTask = {}

}])


racts.controller('randomController', ['$scope','randomTask', 'randomService', function($scope, randomTask, randomService){

$scope.task = randomService.randomTask
console.log('Its randomController speaking!')
console.log($scope.task)
console.log('Its randomController speaking! END')




}])
