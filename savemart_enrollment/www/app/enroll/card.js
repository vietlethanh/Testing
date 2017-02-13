enrollModule.controller('CardCtrl', ['$scope','User','$ionicLoading', function($scope, User, $ionicLoading){
	// scope properties -------------------------------------------------------------
	$scope.e_msges = {};
	//public method -------------------------------------------------------------
	$scope.submit = function(){
		if($scope.enrollForm.$invalid){
			return;
		}
		$ionicLoading.show();
		// check card is exist
		var cardId = '440'+$scope.enrollInfo.SRCardIDtmp;
		var checkCardExists = User.checkCardExists(cardId).then(function(res){
			$ionicLoading.hide();
			if(res.data != null && res.data.Users.length >= 1) { 
				$scope.enrollForm.cardNumber.$setValidity('server',false);
				$scope.e_msges['cardNumber'] = "There is already an account for this Card Number.";
				return;
			}
			$scope.enrollInfo.SRCardID = cardId;
			$scope.next();
		}, function(){
			$ionicLoading.hide();
			$scope.enrollForm.cardNumber.$setValidity('server',false);
			$scope.e_msges['cardNumber'] = "Can't check this card.";
		});
	}
	// Init -------------------------------------------------------------
}]);