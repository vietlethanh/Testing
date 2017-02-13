enrollModule.controller('CardmodeCtrl', ['$scope', function($scope){
	// private properties -------------------------------------------------------------
	// public properties -------------------------------------------------------------
	// scope properties -------------------------------------------------------------
	// private method -------------------------------------------------------------
	//public method -------------------------------------------------------------
	$scope.selectCardMode  = function(receiveCard){
		$scope.enrollInfo.isReceiveCard = receiveCard;
		$scope.enrollInfo.LoyaltyAutoEnroll = !receiveCard;
		$scope.next();
	}
	// Init -------------------------------------------------------------

}]);