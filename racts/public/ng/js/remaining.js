
// Users service



racts.factory('UsersList', function() {
	userList = []
	return userList;
})

racts.service('UserService', ['$http', '$q', 'UsersList', function($http, $q, UsersList) {
		var q = $q.defer();
		getUsers = function() {
			$http.get('http://localhost:3000/users')
				.success( function(response) {
					 UsersList = response;
					 q.resolve(response);
				})
		}
		getUsers();

		var q = $q.defer();
		save = function(user) {
			$http.post('http://localhost:3000/users', {user: user})
			.success(function(response) {
				UsersList.push(response)
				q.resolve("Resolved!")
			})
			.error(function(response) {
				q.reject("Rejected!")
			})
		}

		this.saveUser = function(user) {
			save(user);
		  return q.promise
		}

		this.users = function() {
			return UsersList
		}

}])









