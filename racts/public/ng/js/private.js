racts.factory('subscriptionsModel', [function() {
	
	var data = {
		list: []
	}

	return data

}]);



racts.service('subscriptionsResolver', ['$http', '$q', 'subscriptionsModel', function($http, $q, subscriptionsModel ) {


	var getSubscriptions = $http.get('http://localhost:3000/users/1/subscriptions')
				.success(function(response) {
					subscriptionsModel.list = response.list
				})
				.error(function(response){
					console.log('error')
				})

	return getSubscriptions

}])


racts.service('subscriptionsService', ['$http', '$q', 'subscriptionsModel', function($http, $q, subscriptionsModel ) {

		this.subscriptionsModel = subscriptionsModel

}])



racts.controller('subscriptionsController', ['$http', '$scope', 'subscriptionsService', 'subscriptionsResolver', function($http, $scope, subscriptionsService, subscriptionsResolver){

	$scope.subscriptions = subscriptionsService.subscriptionsModel.list

}])





