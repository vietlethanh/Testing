enrollModule.controller('AssociateSummaryCtrl', ['$scope', '$ionicLoading', 'UiUtil', 'User', function($scope, $ionicLoading, UiUtil, User){
	// private properties -------------------------------------------------------------
	var address = '';
	var currentStore = $scope.currentStore;
	if(currentStore.Address1 != '')
	{
		address = currentStore.Address1;
	}else
	{
		address = currentStore.Address2;
	}
	address += ' ' + currentStore.City + ', ' + currentStore.State + ' ' + currentStore.Zipcode
	// scope properties -------------------------------------------------------------
	// public properties -------------------------------------------------------------
	$scope.preferredStore = address;
	$scope.enrollInfo.StoreID = currentStore.StoreID;
	var fullName = $scope.enrollInfo.FirstName;
	fullName += $scope.enrollInfo.MiddleName != '' ? (' ' + $scope.enrollInfo.MiddleName) : '';
	fullName += ' ' + $scope.enrollInfo.LastName;
	$scope.fullName = fullName;

	//public method -------------------------------------------------------------
	$scope.createUser = function(){
		$ionicLoading.show();
		$scope.enrollInfo.UserEmail = $scope.enrollInfo.Email;
		var checkPhoneExistsReq = User.checkPhoneExists($scope.enrollInfo.Phone).then(function(res){
			$ionicLoading.hide();
			if(res.data != null && res.data.Users.length >= 1) { 
				UiUtil.alertPopup('Alert!', "This phone number already has a rewards account");
				return true;
			 }//Phone exists.
			return false;

		}, function(res){
			$ionicLoading.hide();
			UiUtil.alertPopup('Alert!', "This phone number already has a rewards account");
			return true;
		});

		checkPhoneExistsReq.then(function(phoneExists){
			if(phoneExists){
				return;
			}
			$ionicLoading.show();
			if($scope.enrollInfo.PhoneIsCellPhone == true)
			{
				$scope.enrollInfo.CellPhone = $scope.enrollInfo.Phone;
			}
			User.createUser($scope.enrollInfo).then(function(res){
				$ionicLoading.hide();
				if(res.data == 'false')
				{
					UiUtil.alertPopup('Alert!', "Create account unsuccessful!");
					return;
				}
				$scope.next();
			}, function(res){
				$ionicLoading.hide();
				if(res.data == null || res.data.Message == null)
				{
					if(res.status == 0){
						UiUtil.alertPopup('Alert!', "Request timeout");
						return;
					}
					UiUtil.alertPopup('Alert!', "Something wrong!");
					return;
				}
				if(res.data.InternalCode == 7)
				{
					UiUtil.alertPopup('Alert!', "This email address already has a rewards account");
					return;
				}
				UiUtil.alertPopup('Alert!', res.data.Message);
			});
		});
		
	};
	// Init -------------------------------------------------------------
}]);