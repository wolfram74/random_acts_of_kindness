racts.service('antiRefreshService', function($http, $q, availableModel, subscriptionsModel, session, activeTasksModel, completedTasksModel ){

	var reloadAvailable = function(boolean){
		$http.get('http://localhost:3000/categories/?user_id=' + session.currentUser().id )
				.success(function(response) {
						while(availableModel.list.length > 0) {
						    availableModel.list.pop();
						}
						while(response.list.length > 0) {
						    var popped = response.list.pop();
						    availableModel.list.push(popped);
						    console.log(availableModel.list)
						}
					if(boolean){
						reloadActive()
						reloadSubscriptions()
					}
				})
				.error(function(response){
					console.log('error')
				})
	}
	this.reloadAvailable = reloadAvailable

	var reloadSubscriptions = function(boolean){
		$http.get('http://localhost:3000/users/'+session.currentUser().id+'/subscriptions')
				.success(function(response) {
						while(subscriptionsModel.list.length > 0) {
						    subscriptionsModel.list.pop();
						}
						while(response.list.length > 0) {
						    var popped = response.list.pop();
						    subscriptionsModel.list.push(popped);
						}
					if(boolean){
						reloadActive()
						reloadAvailable()
					}
				})
				.error(function(response){
					console.log('error')
				})
	}
	this.reloadSubscriptions = reloadSubscriptions



	var reloadActive = function(){
		$http.get('http://localhost:3000/users/'+session.currentUser().id+'/active')
			.success(function(response) {

				while(activeTasksModel.assignments.length > 0) {
				    activeTasksModel.assignments.pop();
				}
				while(response.length > 0) {
				    var popped = response.pop();
				   	activeTasksModel.assignments.push(popped);
				}
				reloadCompleted()
			})
			.error(function(response){
				console.log('error with fetching active tasks')
			})
	}
	this.reloadActive = reloadActive

	var reloadCompleted = function(){
		$http.get('http://localhost:3000/users/'+session.currentUser().id+'/assignments')
      .success(function(response) {
				while(completedTasksModel.assignments.length > 0) {
				    completedTasksModel.assignments.pop();
				}
				while(response.length > 0) {
				    var popped = response.pop();
				   	completedTasksModel.assignments.push(popped);
				}
      })
      .error(function(response){
        console.log('error with fetching completed tasks')
      })
	}



})