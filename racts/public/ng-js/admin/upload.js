fiscAres.factory('formDataObject', function() {
	return function(data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			fd.append(key, value);
		});
		return fd;
	};
});


fiscAres.controller('uploadController', ['$scope', '$upload', '$state', function($scope, $upload, $state){


	$scope.upload = function (file) {
		if (file) {
			$upload.upload({
				url: '/API/batches/upload',
				file: file
			}).success(function(data){
				if(data.success){
					$state.go('admin.batch')
				}
				else{
					console.log("nah-ah")
				}
			})
		}
	};

	// $scope.upload = function(){
	// 	console.log('upload function launched')
	// 	return $http({
	// 		method: 'POST',
	// 		url: '/API/batches/upload',
	// 		data: {file: $scope.bill.serialize() },
	// 	});
	// };


}])


