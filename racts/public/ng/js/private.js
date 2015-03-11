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


racts.service('subscriptionsService', ['$http', '$q', 'subscriptionsModel', 'session', function($http, $q, subscriptionsModel, session ) {

		this.subscriptionsModel = subscriptionsModel

    this.like = function(subscription){
      console.log("http://localhost:3000/users/" + session.currentUser().id + "/Category/" + subscription.id + '/vote?change=1')

      $http.post("http://localhost:3000/users/" + session.currentUser().id + "/Category/" + subscription.id + '/vote?change=1')
        .success(function(response) {
          console.log(response)
          console.log("DONE!")
        })
        .error(function(response) {
          console.log("Rejected!")
        })
      }


    this.unlike = function(subscription){
     console.log("http://localhost:3000/users/" + session.currentUser().id + "/Category/" + subscription.id + '/vote?change=-1')
      $http.post("http://localhost:3000/users/" + session.currentUser().id + "/Category/" + subscription.id + '/vote?change=-1')
        .success(function(response) {
          console.log(response)
          console.log("DONE!")
        })
        .error(function(response) {
          console.log("Rejected!")
        })
      }


}])



racts.controller('subscriptionsController', ['$http', '$scope', 'subscriptionsService', 'subscriptionsResolver', 'loadSubscriptionTasksService', 'session', 'antiRefreshService', function($http, $scope, subscriptionsService, subscriptionsResolver, loadSubscriptionTasksService, session, antiRefreshService){



	$scope.subscriptions = subscriptionsService.subscriptionsModel.list

  $scope.showTasks = function(index){
  	var subscription = subscriptionsService.subscriptionsModel.list[index]
  	loadSubscriptionTasksService.load(subscription.id)
  }

  $scope.unsubscribe = function(subscription,index) {
  	console.log(subscription);
  	console.log(index);
  	console.log('/users/' + session.currentUser().id + '/subscriptions/' + subscription.subscription_id)
  	$http.delete('/users/' + session.currentUser().id + '/subscriptions/' + subscription.subscription_id)
  	.success(function(response) {
  		console.log(response)
  		antiRefreshService.reloadSubscriptions(true)
  	})
  	.error(function(response) {
  		console.log("ERROR!")
  	})
  }

  $scope.likeTask =  function(subscription, index) {


         subscriptionsService.like(subscription)

  }

  $scope.unlikeTask =  function(subscription, index) {

         subscriptionsService.unlike(subscription)
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


