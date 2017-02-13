angular.module('MCMRelationshop.CardMode', [
])
.controller('CardModeCtrl', ['$scope', '$state','CacheUtil', function($scope, $state, CacheUtil){
	// private properties -------------------------------------------------------------
	// public properties -------------------------------------------------------------
	// scope properties -------------------------------------------------------------
	// private method -------------------------------------------------------------
	//public method -------------------------------------------------------------
	$scope.selectCardMode  = function(receiveCard){
		if(receiveCard)
		{
	   		$state.go('app.registercard',null, {
				reload: false
			});
			return;
   		}
   		$state.go('app.register',null, {
			reload: false
		});
	};
	// Init -------------------------------------------------------------
	CacheUtil.getAppCache().remove('/register/user');
}]);