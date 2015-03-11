racts.factory('availableModel', [function() {

	var data = {
		list: []
	}

	return data;

}]);



racts.service('availableResolver', ['$http', '$q', 'availableModel','session', function($http, $q, availableModel, session ) {
	  console.log(session.currentUser().id)

		var getAvailable = $http.get('http://localhost:3000/categories/?user_id=' + session.currentUser().id)

				.success(function(response) {
					availableModel.list = response.list
				})
				.error(function(response){
					console.log('error')
				})

	return getAvailable

}])


racts.service('availableService', ['$http', '$q', 'availableModel', 'session', 'antiRefreshService', function($http, $q, availableModel, session, antiRefreshService ) {


	this.availableModel = availableModel

	this.subscribe = function(category){
		var amount = Number(prompt("Enter the number of tasks you want to subscribe to")) || 1;
	  var period = Number(prompt("Enter the period of subscription in years")) || 4;
	  $http.post('/users/' + session.currentUser().id + '/categories/' + category.id + '/subscribe?amount=' + amount + '&period=' + period)
	  	.success(function(response) {
	  		antiRefreshService.reloadAvailable(true)
	  	})
	  	.error(function(response) {
	  		console.log("ERROR!")
	  	})
	}


    this.like = function(category){
      console.log("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + category.id + '/vote?change=1')

      $http.post("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + category.id + '/vote?change=1')
        .success(function(response) {
          console.log(response)
          console.log("DONE!")
        })
        .error(function(response) {
          console.log("Rejected!")
        })
      }


    this.unlike = function(category){
     console.log("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + category.id + '/vote?change=-1')
      $http.post("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + category.id + '/vote?change=-1')
        .success(function(response) {
          console.log(response)
          console.log("DONE!")
        })
        .error(function(response) {
          console.log("Rejected!")
        })
      }


}])



racts.controller('availableController', ['$http', '$scope', 'availableService', 'availableResolver', 'loadAvailableTasksService', function($http, $scope, availableService, availableResolver, loadAvailableTasksService){

	$scope.available = availableService.availableModel.list



  $scope.showTasks = function(index){
		var category = availableService.availableModel.list[index]
		loadAvailableTasksService.load(category.id)
  }

  $scope.subscribe = function(category, index) {
  	availableService.subscribe(category)
  }

  $scope.ucount=0;
  $scope.lcount=0;
  $scope.likeTask =  function(category, index) {


         availableService.like(category)

  }

  $scope.unlikeTask =  function(category, index) {

         availableService.unlike(category)
  }

  $scope.lvisible = false;
  $scope.uvisible = false;

}])



racts.service('loadAvailableTasksService', ['$state','$http', '$q', 'availableModel', function($state, $http, $q, availableModel ){


		this.load = function(id){
			$http.get('http://localhost:3000/categories/'+id)
				.success(function(response) {
					var paramsJSON = JSON.stringify(response)
					$state.go('landingpage.showtasks', {tasks: paramsJSON})

				})
				.error(function(response){
					console.log('error')
				})
		}

}])

