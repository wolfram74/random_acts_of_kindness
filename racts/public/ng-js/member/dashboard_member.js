fiscAres.controller('memberController', ['$scope', 'currentUser', function($scope, currentUser){

	$scope.handle = currentUser.user.handle

}])

fiscAres.controller('dashBoardController', ['$scope', 'currentUser', function($scope, currentUser){

console.log('this is the dashboard speaking')


}])