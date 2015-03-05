fiscAres.controller('adminController', ['$scope', 'currentUser', function($scope, currentUser){

	$scope.handle = currentUser.user.handle

}])

fiscAres.controller('adminDashBoardController', ['$scope', 'currentUser', function($scope, currentUser){

console.log('this is the dashboard speaking')


}])