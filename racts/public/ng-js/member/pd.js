fiscAres.service('manipulationsService', ['$http', 'currentUser', function($http, currentUser){


	this.currentUser = function(){
		return currentUser}

	this.getManipulations = function(){
	return $http.get('/API/users/'+currentUser.user.id+'/manipulations')
		.success(function(data){
			currentUser.manipulations = data
		})
		.error(function(){
			console.log('failed to get manipulations')
		})
	}
	this.test = "this is meeeee"

}])

// The resolve keyword MUST be relative to state not views (in case you use multiple views).
// The resolve keys MUST be injected into the child states if you want to wait for the promises to be resolved before instantiating the children.

fiscAres.controller('PDController', ['$scope', 'fetchManipulations', 'manipulationsService', function($scope, fetchManipulations, manipulationsService ){

	// console.log(fetchManipulations)   undefined because it was just a return promise. the promise is already resolved, thats why this controller is initiated in the first place. A resolved promise is (probably) undefied after ?

	$scope.manipulations = manipulationsService.currentUser().manipulations
	$scope.balance = manipulationsService.currentUser().user.balance


}]);


fiscAres.directive('manipulation', function(){

	return {
		restrict: 'AE',
		templateUrl: 'templates/member/directives/manipulation.html',
		replace: true
	}

})