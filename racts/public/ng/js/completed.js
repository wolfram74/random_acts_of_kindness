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

  // $scope.gottenTasks = $http.get('http://localhost:3000/users/'+session.currentUser().id+'/assignments')
  //       .success(function(response) {
  //         completedTasksModel.assignments = response
  //         console.log('completedTasks after API call :')
  //         console.log( completedTasksModel.assignments )
  //       })
  //       .error(function(response){
  //         console.log('error with fetching completed tasks')
  //       })

}])


racts.service('completedTasksService', ['$http', '$q', 'completedTasksModel', function($http, $q, completedTasksModel ) {

    this.completedTasksModel = completedTasksModel

}])



racts.controller('completedTasksController', ['$http', '$scope', 'completedTasksService', function($http, $scope, completedTasksService){

  $scope.assignments = completedTasksService.completedTasksModel.assignments
}])









