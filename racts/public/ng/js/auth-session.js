

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

racts.controller('authController', ['$scope','currentUser', 'authService','localStorageCheck', function($scope, currentUser, authService, localStorageCheck){

console.log('Its authController speaking!')

	// execute localstorage checker inside currentuser
	// console.log(session.get())
	$scope.credentials = authService.credentials

	$scope.submit = function(){
		authService.submit().then( successfullAuth, errorAuth )
	}

	function successfullAuth(user){
		console.log('weeeee!!')
		console.log(currentUser)
		currentUser.user = user;

	}
	function errorAuth(){
		console.log('Authentication failed!')
	}


}])




racts.service('session', ['currentUser', function(currentUser){
	
	this.localStorageCheck = function(){
		console.log('foo. localstoragecheck is doing some work')

	}



	this.set = function(currentUser){
		window.localStorage['currentUser'] = JSON.stringify(currentUser)
	}

	this.get = function(){
		var localStorage = window.localStorage['currentUser']
		if ( localStorage ){
			return JSON.parse(localStorage)
		}
		else {
			return null
		}
	}

	

}])


racts.factory('currentUser', [function(){

	// this.checkLocalStorage = function(){



	var currentUser = null

	// var currentUser =  {
	// 	id: null,
	// 	email: null
	// }

	return currentUser

}]);



/* 
https://github.com/angular-ui/ui-router/issues/42
http://blog.thejsj.com/angular-js-authentication-with-ui-router/
*/