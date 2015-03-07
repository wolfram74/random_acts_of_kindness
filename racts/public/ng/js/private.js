racts.factory('subscriptionsModel', [function() {
	var subscriptions = {
		subscriptions: []
	}

	var API = {
		subscriptions: function(){return subscriptions}
	}

	return API;

}]);



racts.service('subscriptionsResolver', ['$http', '$q', 'subscriptionsModel', function($http, $q, subscriptionsModel ) {


	var getSubscriptions = $http.get('http://localhost:3000/users/1/subscriptions')
				.success(function(response) {
					subscriptionsModel.subscriptions().subscriptions = response
					console.log( subscriptionsModel.subscriptions() )
				})
				.error(function(response){
					console.log('error')
				})

	return getSubscriptions

}])


racts.service('subscriptionsService', ['$http', '$q', 'subscriptionsModel', function($http, $q, subscriptionsModel ) {
		

		var subscriptionsModel = subscriptionsModel




		var API = {

			subscriptionsModel: function(){return subscriptionsModel}

		}

		return API


}])



racts.controller('subscriptionsController', ['$http', '$scope', 'subscriptionsService', 'subscriptionsResolver', function($http, $scope, subscriptionsService, subscriptionsResolver){


	console.log('subscriptionsController is activated')
	console.log('resolver works if below has some assignments unparsed')
	$scope.subscriptions = subscriptionsService.subscriptionsModel().subscriptions().subscriptions.list
	console.log($scope.subscriptions)
	

}])





