

racts.service('authService', ['$http', '$q', function($http, $q){
	var credentials = {email: "", password: ""}
	this.credentials = function(){return credentials}

	var authenticate = function(defer){
		$http.post('/login', {credentials: credentials})
		.success(function(data){
			if(data.success === false){
				defer.reject()
			}
			else{
			var currentUser = {email: credentials.email, id: data.user}
			defer.resolve(currentUser)
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

racts.controller('authController', ['$state','$scope','currentUser', 'authService','localStorageCheck', 'session', function($state, $scope, currentUser, authService, localStorageCheck, session){

	// if ( session.currentUser() ){
	// 	$state.go('landingpage.active')
	// } 
	// else{

		$scope.credentials = authService.credentials
		$scope.submit = function(){
			authService.submit().then( successfullAuth, errorAuth )
		}

		function successfullAuth(user){
			console.log('weeeee!!')
			session.setCurrentUser(user)
			$state.go('landingpage.active')

		}
		function errorAuth(){
			console.log('Authentication failed!')
		}
	// }

}])




racts.service('session', ['$q', 'currentUser', function($q, currentUser){
	
	function getLocal(){
		var localStorage = window.localStorage['currentUser']
		if ( localStorage ){
			return JSON.parse(localStorage)
		}
		else {
			return null
		}
	}
	this.localStorageCheck = function(){
		console.log('im working in localstorage right now')
		var deferLocalCheck = $q.defer()
		user = getLocal()
		var trigger = false
		if (user){
			setCurrentUser(user)
			trigger = true
		}
		deferLocalCheck.resolve(trigger)
		return deferLocalCheck.promise
	}



	function setLocal(currentUser){
		window.localStorage['currentUser'] = JSON.stringify(currentUser)
	}
	function setCurrentUser(user){
		currentUser = user
		setLocal(user)
	}

	this.setCurrentUser = setCurrentUser


	this.currentUser = function(){return currentUser}


	

}])


racts.factory('currentUser', [function(){

	this.test = 'foo'
	var currentUser = null

	return currentUser

}]);



/* 
https://github.com/angular-ui/ui-router/issues/42
http://blog.thejsj.com/angular-js-authentication-with-ui-router/
*/