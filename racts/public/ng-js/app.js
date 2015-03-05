var fiscAres = angular.module('fiscAres', ['ui.router', 'angularFileUpload']);


fiscAres.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/'),


	$stateProvider

		.state('login', {
			url: '/',
			templateUrl: '/templates/login.html',
			controller: 'authController'
		})

		.state('member', {
			views: {
				'@': {
					url: '/member',
					abstract: true,
					templateUrl: '/templates/member/member.html',
					controller: 'memberController'
				}
			}
		})

		.state('member.dashboard', {
			url: '/dashboard',
			templateUrl: '/templates/member/dashboard.html',
			controller: 'dashBoardController'
		})

		.state('member.pd', {
			url: '/pd',
			resolve: {
				fetchManipulations: function(manipulationsService){
					manipulationsService.getManipulations()
				}
			},
			views: {
				'@member': {
					templateUrl: '/templates/member/pd.html',
					controller: 'PDController'
				}
			}

		})

		.state('admin', {
			views: {
				'@': {
					url: '/fiscus',
					abstract: true,
					templateUrl: '/templates/admin/admin.html',
					controller: 'adminController'
				}
			}
		})
		.state('admin.dashboard', {
			url: '/dashboard',
			templateUrl: '/templates/admin/dashboard.html',
			controller: 'adminDashBoardController'
		})
		.state('admin.import', {
			url: '/batch/upload',
			templateUrl: '/templates/admin/upload.html',
			controller: 'uploadController'
		})
		.state('admin.batch', {
			url: '/batch/new',
			templateUrl: '/templates/admin/batch.html',
			controller: 'batchController',
			resolve: {
				batchRequest: 'batchResovler'
			}
		})


}]);


fiscAres.factory('batchResovler', ['$http', 'batchService', function($http, batchService){


	var batches = $http.get('/API/batches/new')
		.success(function(data){
			batchService.get().manipulations = data
		})
		.error(function(){
			console.log('failed to get manipulations')
		})

	var usersById = $http.get('/API/users/ids')
		.success(function(data){
			batchService.get().usersById = data
		})
		.error(function(){
			console.log('failed to get manipulations')
		})


	return $.when(batches, usersById)

}])

fiscAres.factory('batchService', [function(){

	var storage = {
		manipulations: [],
		usersById: []
	}

	return {
		get: function(){return storage}
	}

}])




fiscAres.controller('batchController', ['batchResovler', 'batchService', function(batchRequest, batchService){
	console.log('request is done:', batchService)
}])








