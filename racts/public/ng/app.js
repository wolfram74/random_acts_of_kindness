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

racts.controller('authController', [function(){

console.log('Its authController speaking!')


}])

racts.controller('landingpageController', [function(){

console.log('Its landingpageController speaking!')


}])

racts.controller('dashboardController', [function(){

console.log('Its dashboardController speaking!')


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




