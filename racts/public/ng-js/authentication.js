fiscAres.factory('currentUser', [function(){

	currentUser = {
		
		user: {}, 
		manipulations: []
	}

	return currentUser

}])


fiscAres.service('authService', ['$http', '$q', function($http, $q){
	var credentials = {handle: "", password: ""}
	this.credentials = function(){return credentials}

	var authenticate = function(defer){
		$http.post('/API/authentication', credentials)
		.success(function(data){
			if(data.success === false){
				defer.reject()
			}
			else{
			defer.resolve(data.user)
			}
		})
		.error(function(){
			defer.reject()
		})
	}


	this.submit = function(){
		deferSubmit = $q.defer()
		authenticate(deferSubmit)
		return deferSubmit.promise
	}

}])

fiscAres.controller('authController', ['$state', '$scope', 'authService', 'currentUser', function($state, $scope, authService, currentUser){

	$scope.credentials = authService.credentials


	$scope.submit = function(){
		authService.submit().then( successfullAuth, errorAuth )
	}

	function successfullAuth(user){
		currentUser.user = user;
		openPage(user);

	}
	function errorAuth(){
		console.log('Authentication failed!')
	}

	function openPage(user){
		if(user.access_level === 'member'){
			$state.go('member.dashboard')
		}
		else if(user.access_level === 'superadmin'){
			$state.go('admin.dashboard')
		}
		else{
			console.log('I dont know where to send you.')
		}
	}

}]);