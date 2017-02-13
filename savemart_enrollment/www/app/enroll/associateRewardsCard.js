enrollModule.controller('AssociateRewardsCardCtrl', ['$scope', '$state', 'APP_CONFIG', function($scope, $state, APP_CONFIG){
	// public properties -------------------------------------------------------------
	// scope properties -------------------------------------------------------------
	//public method -------------------------------------------------------------
	$scope.goHome = function(){
		$state.go('app.home');
	};
	// Init -------------------------------------------------------------
}]);