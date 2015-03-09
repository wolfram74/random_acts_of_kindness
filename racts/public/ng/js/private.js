racts.factory('subscriptionsModel', [function() {

	var data = {
		list: []
	}

	return data

}]);



racts.service('subscriptionsResolver', ['$http', '$q', 'subscriptionsModel', 'session', function($http, $q, subscriptionsModel, session ) {


	var getSubscriptions = $http.get('http://localhost:3000/users/'+session.currentUser().id+'/subscriptions')
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



racts.controller('subscriptionsController', ['$http', '$scope', 'subscriptionsService', 'subscriptionsResolver', 'loadSubscriptionTasksService', function($http, $scope, subscriptionsService, subscriptionsResolver, loadSubscriptionTasksService){



	$scope.subscriptions = subscriptionsService.subscriptionsModel.list

  $scope.showTasks = function(index){
  	var subscription = subscriptionsService.subscriptionsModel.list[index]
  	loadSubscriptionTasksService.load(subscription.id)
  }

  $scope.unsubscribe = function(subscription,index) {
  	console.log(subscription);
  	console.log(index);
  	console.log('/users/' + subscription.user_id + '/subscriptions/' + subscription.subscription_id)
  	$http.delete('/users/' + subscription.user_id + '/subscriptions/' + subscription.subscription_id)
  	.success(function(response) {
  		console.log(response)
  	})
  	.error(function(response) {
  		console.log("ERROR!")
  	})
  }
}])


racts.service('loadSubscriptionTasksService', ['$state','$http', '$q', 'subscriptionsModel', 'currentUser', function($state, $http, $q, subscriptionsModel, currentUser ){


		this.load = function(id){

			$http.get('http://localhost:3000/categories/'+id)
				.success(function(response) {
					console.log(response)
					var paramsJSON = JSON.stringify(response)
					$state.go('landingpage.showtasks', {tasks: paramsJSON})

				})
				.error(function(response){
					console.log('error')
				})
		}

}])


