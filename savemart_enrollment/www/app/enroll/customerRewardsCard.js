enrollModule.controller('CustomerRewardsCardCtrl', ['$scope', '$state', function($scope, $state){

	//public method -------------------------------------------------------------
	$scope.goHome = function(){
		$state.go('app.home');
	};
	// Init -------------------------------------------------------------
}]);