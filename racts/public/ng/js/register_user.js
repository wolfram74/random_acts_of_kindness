// racts.service('registerService', ['$http', '$log', '$scope', function($http, $log, $scope) {
//   var userDetails = { email: "", username: "", password: ""}
//   this.userDetails = function(){ return userDetails }

//   this.submitRegister = function() {
//     $http.post('http://localhost:3000/users', {userDetails: userDetails})
//       .success(function(response) {
//          var currentUser = { email: userDetails.email, id: response.user}
//          authController.submitRegister(currentUser);
//       })
//       .error(function(response) {
//         console.log("Error!")
//       })
//     }
// }])