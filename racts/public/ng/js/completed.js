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


racts.service('completedTasksService', function($http, $q, completedTasksModel, session, antiRefreshService ) {

    this.completedTasksModel = completedTasksModel

    this.like = function(task){
      console.log("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + task.id + '/vote?change=1')
      $http.post("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + task.id + '/vote?change=1')
        .success(function(response) {
          antiRefreshService.reloadCompleted()
        })
        .error(function(response) {
          console.log("Rejected!")
        })
      }


    this.unlike = function(task){
      console.log("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + task.id + '/vote?change=-1');
      $http.post("http://localhost:3000/users/" + session.currentUser().id + "/Task/" + task.id + '/vote?change=-1')
        .success(function(response) {
          antiRefreshService.reloadCompleted()
        })
        .error(function(response) {
          console.log("Rejected!")
        })
      }
})



racts.controller('completedTasksController', function($http, $scope, completedTasksService, $q){

  $scope.assignments = completedTasksService.completedTasksModel.assignments

  $scope.likeTask =  function(task, index) {
         completedTasksService.like(task)

  }

  $scope.unlikeTask =  function(task, index) {
         completedTasksService.unlike(task)


  }

   $scope.lvisible = false;
   $scope.uvisible = false;

  console.log('I am a new task')
  var newTaskDetails = { name: "", description: "", cost_estimate: ""}
  $scope.newTaskDetails = function(){ return newTaskDetails }

  $scope.submitNewTask = function() {
    var q = $q.defer()
    $http.post('http://localhost:3000/tasks', {details: newTaskDetails})
      .success(function(response) {
         console.log(response)
         newTaskDetails = { name: "", description: "", cost_estimate: ""}
         alert("Your Task is in the review phase, and will be added if approved by admin.")
      })
      .error(function(response) {
        console.log("Error!")
        q.reject(newTaskDetails)
      })
      return q.promise
    }

    console.log('yup I am still in the newTaskController')

})
