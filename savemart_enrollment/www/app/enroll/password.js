enrollModule.controller('PasswordCtrl', ['$scope', function($scope){
	// scope properties -------------------------------------------------------------
	// public properties -------------------------------------------------------------
	// Regular Expression
	$scope.passwordRegx =/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,12}$/;
	// Init -------------------------------------------------------------
}]);