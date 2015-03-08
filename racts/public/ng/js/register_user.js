racts.controller('RegisterService', ['$http', '$log', '$scope', function($http, $log, $scope) {
  this.registration = function(category) {
    $http.post('')
      .success(function(response) {
        console.log(response)
  })
  .error(function(response) {
    console.log("Error!")
  })
}])