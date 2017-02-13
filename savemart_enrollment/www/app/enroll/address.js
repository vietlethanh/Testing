enrollModule.controller('AddressCtrl', ['$scope', 'AppUtil', function($scope, AppUtil){
	// private properties -------------------------------------------------------------
	var stateList = AppUtil.getStateList();
	// scope properties -------------------------------------------------------------
	// public properties -------------------------------------------------------------
	$scope.stateList = stateList;
	//public method -------------------------------------------------------------
	$scope.$watch('enrollInfo.ZipCode', function(){
		if(!$scope.enrollInfo.ZipCode) return;
		$scope.enrollInfo.ZipCode = $scope.enrollInfo.ZipCode.replace(/\D/gi, '');
	});
	
	$scope.saveAddress = function(){
		if($scope.enrollForm.$invalid){
			return;
		}
		$scope.enrollInfo.State = $scope.enrollInfo.SelectedState.value;
		$scope.next();
	};
	
	// Init -------------------------------------------------------------
}]);