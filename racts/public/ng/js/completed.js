racts.factory('completedTasksModel', [function() {

  var data = {
    assignments: []
  }
  return data;
}]);



racts.service('completedTasksResolver', ['$http', '$q', 'completedTasksModel', 'session', function($http, $q, completedTasksModel, session) {

  console.log('********** CompletedTaskResolver initiated TEST BEGIN **********')
  console.log('currentUser in session:')
  console.log( session.currentUser() )

  console.log('completedTask before resolving:')
  console.log( completedTasksModel.assignments )


  var getCompletedTasks = $http.get('http://localhost:3000/users/'+session.currentUser().id+'/assignments')
        .success(function(response) {
          completedTasksModel.assignments = response
          console.log('completedTasks after API call :')
          console.log( completedTasksModel.assignments )
        })
        .error(function(response){
          console.log('error with fetching completed tasks')
        })


  console.log('********** CompletedTaskResolver initiated TEST END **********')
  return getCompletedTasks

}])


racts.service('completedTasksService', ['$http', '$q', 'completedTasksModel','session', function($http, $q, completedTasksModel, session ) {

    this.completedTasksModel = completedTasksModel

    this.like = function(task){
      console.log("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + task.id + '/vote?change=1')
      $http.post("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + task.id + '/vote?change=1')
        .success(function(response) {
          console.log(response)
          console.log("DONE!")
        })
        .error(function(response) {
          console.log("Rejected!")
        })
      }


    this.unlike = function(task){
      console.log("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + task.id + '/vote?change=-1');
      $http.post("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + task.id + '/vote?change=-1')
        .success(function(response) {
          console.log(response)
          console.log("DONE!")
        })
        .error(function(response) {
          console.log("Rejected!")
        })
      }
}])



racts.controller('completedTasksController', ['$http', '$scope', 'completedTasksService', function($http, $scope, completedTasksService){

  $scope.assignments = completedTasksService.completedTasksModel.assignments

  $scope.ucount=0;
  $scope.lcount=0;

  $scope.lStyle= {
        "background-color":"green"
    }
  $scope.uStyle= {
        "background-color":"red"
    }

  $scope.likeTask =  function(task, index) {

         completedTasksService.like(task)

  }

  $scope.unlikeTask =  function(task, index) {

         completedTasksService.unlike(task)

  }

   $scope.lvisible = false;
   $scope.uvisible = false;

}])

