enrollModule.controller('EmailCtrl', ['$scope', 'User', '$ionicLoading', function($scope, User, $ionicLoading, $ionicPopup){
	// public properties -------------------------------------------------------------
	$scope.enrollInfo.ReceiveEmail = true;
	$scope.e_msges = {};
	//public method -------------------------------------------------------------
	$scope.checkUserExists =  function(){
		if($scope.enrollForm.$invalid){
			return;
		}
		$ionicLoading.show();
		User.checkUserExists($scope.enrollInfo.Email).then(function(res){
			$ionicLoading.hide();
			if(res.data == null || res.data == 'true') { 
				$scope.enrollForm.email.$setValidity('server',false);
				$scope.e_msges['email'] = "This email address already has a rewards account";
				return;
			 }//User exists.
			$scope.enrollInfo.UserEmail = $scope.enrollInfo.Email;
			$scope.next();
		}, function(res){
			$ionicLoading.hide();
			// show not found error
			$scope.enrollForm.email.$setValidity('server',false);
			$scope.e_msges['email'] = "This email address already has a rewards account";
		});

	};
	// Init -------------------------------------------------------------

}]);