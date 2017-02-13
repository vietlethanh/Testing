enrollModule.controller('PhoneCtrl', ['$scope', 'User', '$ionicLoading', function($scope, User, $ionicLoading){
	// private properties -------------------------------------------------------------
	// public properties -------------------------------------------------------------
	// scope properties -------------------------------------------------------------
	$scope.e_msges = {};
	// private method -------------------------------------------------------------
	//public method -------------------------------------------------------------
	$scope.submit = function(){
		if($scope.enrollForm.$invalid){
			return;
		}
		$ionicLoading.show();
		User.checkPhoneExists($scope.enrollInfo.Phone).then(function(res){
			$ionicLoading.hide();
			if(res.data != null && res.data.Users.length >= 1) { 
				$scope.enrollForm.phone.$setValidity('server',false);
				$scope.e_msges['phone'] = "This phone number already has a rewards account";
				return;
			 }//Phone exists.
			if($scope.enrollInfo.PhoneIsCellPhone == true)
			{
				$scope.enrollInfo.CellPhone = $scope.enrollInfo.Phone;
			}
			$scope.next();
		}, function(res){
			$ionicLoading.hide();
			// show not found error
			$scope.enrollForm.phone.$setValidity('server',false);
			$scope.e_msges['phone'] = "This phone number already has a rewards account";
		});

	}
	// Init -------------------------------------------------------------
}]);