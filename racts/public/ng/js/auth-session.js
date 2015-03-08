

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

racts.service('registerService', ['$http','$q',function($http, $q){
	console.log('yup im here alright')
  var userDetails = { email: "", username: "", password: "", password_confirm: ""}
  this.userDetails = function(){ return userDetails }

  this.submit = function() {
  	var q = $q.defer()
    $http.post('http://localhost:3000/users', {credentials: userDetails})
      .success(function(response) {
         var currentUser = { email: userDetails.email, id: response.user}
         q.resolve(currentUser)
      })
      .error(function(response) {
        console.log("Error!")
        q.reject(currentUser)
      })
      return q.promise
    }

   	console.log('yup im here alright still here bitch')



}])

racts.controller('authController', ['$state','$scope','currentUser', 'authService','localStorageCheck', 'session', 'registerService', function($state, $scope, currentUser, authService, localStorageCheck, session, registerService){
		$scope.registrationDetails = registerService.userDetails
		console.log($scope.registrationDetails)

		// setInterval(function(){
		// 	console.log( registerService.userDetails() )
		// },5000)

		$scope.credentials = authService.credentials
		$scope.submit = function(){
			authService.submit().then( successfullAuth, errorAuth )
		}

		$scope.submitRegister = function() {
			registerService.submit().then( successfullAuth, errorAuth)
		}

		function successfullAuth(user){
			session.setCurrentUser(user)
			console.log(user)
			console.log('registering succesfull, error is beyond this point')
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
	//devmode//
	this.getLocal = getLocal
	//end
	this.localStorageCheck = function(){
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


	this.currentUser = function(){
		return currentUser
	}




}])


racts.factory('currentUser', [function(){

	var currentUser = null

	return currentUser

}]);



/*
https://github.com/angular-ui/ui-router/issues/42
http://blog.thejsj.com/angular-js-authentication-with-ui-router/
<<<<<<< HEAD
http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/
*/

//  Register controller

// racts.factory('UsersList', [''])