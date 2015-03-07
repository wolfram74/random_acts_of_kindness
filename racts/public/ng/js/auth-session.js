racts.factory('currentUser', function() {

	var session = {
		user: {
			id: 1,
			email: 'phaugen@gmail.com'
		} 
	}
	// this is hardcoded for now.

	return session

});



racts.controller('authController', [function(){

console.log('Its authController speaking!')


}])



/* 
https://github.com/angular-ui/ui-router/issues/42
*/