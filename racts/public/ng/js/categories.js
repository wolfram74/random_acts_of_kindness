racts.service('currentCategory', function() {
	this.current_category = {}
});





racts.factory('CategoryList', function(){
	categoryList = []
	return categoryList;
});


racts.service('CategoryService', ['$http', '$q', 'CategoryList', function($http, $q, CategoryList) {
		var q = $q.defer();
		getCategories = function() {
			$http.get('http://localhost:3000/categories')
			.success(function(response) {
				categoryList = response;
				q.resolve(response);
			})
		}

		getCategories();

		var q = $q.defer();
		save = function(category) {
			$http.post('http://localhost:3000/categories', {category: category})
			.success(function(response) {
				CategoryList.push(response)
				q.resolve("Resolved!")
			})
			.error(function(response) {
				q.reject("Rejected!")
			})
		}

		this.saveCategory = function(category) {
			save(category)
			return q.promise
		}

		this.categories = function() {
			return CategoryList
		}
}])

