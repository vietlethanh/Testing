var enrollModule = angular.module('MCMRelationshop.Register', [
	'MCMRelationshop.Resource.User',
	'MCMRelationshop.Resource.Setting',
	'MCMRelationshop.Directive.PasswordMatch',
	'MCMRelationshop.Directive.FormDirective'
])
.controller('RegisterCtrl', ['$rootScope','$scope','$state', '$stateParams', 'AppUtil','User','Setting', '$ionicLoading','$ionicPopup','APP_CONFIG', 'CacheUtil', 'security', 'currentStore', 'toaster','$ionicHistory',
	function($rootScope,$scope, $state, $stateParams ,AppUtil, User, Setting, $ionicLoading,$ionicPopup, APP_CONFIG, CacheUtil, security, currentStore, toaster, $ionicHistory) {  
		// private properties -------------------------------------------------------------
		// public properties -------------------------------------------------------------
		// scope properties -------------------------------------------------------------
		$scope.step = $stateParams.step || 1;
		$scope.e_msges = {};
		$scope.chooseStore = security.getCurrentStore();
		$scope.states = AppUtil.getStateList();
		$scope.user = CacheUtil.getAppCache().get('/register/user') || {
			FirstName: '',
			MiddleName: '',
			LastName: '',
			Email: '',
			UserEmail: '',
			Phone: '',
			CellPhone: '',
			Password: '',
			RetypePassword: '',
			StoreID: $scope.chooseStore?$scope.chooseStore.CS_StoreID:null,
			PhoneIsCellPhone: false,
			LoyaltyAutoEnroll: true,
			SRCardID: ''
		};
		$scope.zipcodeRegx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		//$scope.emailRegx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		$scope.emailRegx = /^[^!'"\/]+$/;
		$scope.passwordRegx =/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,12}$/;
		$scope.nameRegx = /^(a-z|A-Z|0-9)*[^!#$%^&*()"\/\\;:@=+,?\[\]\/]*$/;
		// private method -------------------------------------------------------------
		//public method -------------------------------------------------------------

		var onFail = function(res){
			$ionicLoading.hide();
			$ionicPopup.alert({
				title: APP_CONFIG.AlertTitle,
				template: res.data.Message
			});
		};
		$scope.submit = function(form){
			$scope.showInvalid = true;
			if(form.$invalid){
				return;
			}
			// check confirm user
			$ionicLoading.show();
			$scope.user.UserEmail = $scope.user.Email;
			$scope.user.StoreID = $scope.user.StoreID + '';
			$scope.user.CellPhone = $scope.user.PhoneIsCellPhone ? $scope.user.Phone: '';
			// check user
			var isUserExistReq = User.checkUserExists($scope.user.Email).then(function(res){
				$ionicLoading.hide();
				if(res.data == null || res.data) { 
					form.username.$setValidity('server',false);
					$scope.e_msges['username'] = "This email address already has a rewards account.";
					//return res;
					return {data: true};
				 }//User exists.
				//return res;
				return {data: false}
			}, onFail);
			// check phone
			isUserExistReq  = isUserExistReq.then(function(res){
				if(res.data){
					return res;
				}
				var isPhoneExistReq = User.checkPhoneExists($scope.user.Phone).then(function(res){
					if(res.data != null && res.data.Users.length >= 1) {
						form.phone.$setValidity('server',false);
						$scope.e_msges['phone'] = "This phone number already has a rewards account.";
						return {data: true};
					}
					return {data: false};
				}, onFail);
				return isPhoneExistReq;
			});
			// finally
			isUserExistReq.then(function(res){
				// is Exist
				if(res.data){
					return;
				}
				CacheUtil.getAppCache().put('/register/user', $scope.user);
				$scope.step = 2;//Go to confirm step
			});
			
		};

		//Confirm account information
		$scope.editAccount = function(){
			$scope.step = 1;
		};
		$scope.changeStore = function(){
			$state.go('app.enroll', {back: 'app.register', step: 2});
		};
		$scope.openTermLink = function() {
			AppUtil.openNewWindow(APP_CONFIG[$scope.chooseStore.CS_BannerID+'_TermsLink']);
		};
		$scope.create = function(){
			$ionicLoading.show();
			//Execute create account
			var onSuccess = function(res){
				if(!res.data){
					$ionicLoading.hide();
					return;
				}
				$ionicLoading.hide();
				$scope.user = null;
				CacheUtil.getAppCache().remove('/register/user');
				toaster.pop('success','Success', 'Thank you for creating an account.');
				$state.go('app.cardmode', null, {reload: true});
			};//on Success
			User.createUser($scope.user).then(onSuccess, onFail);
		};
		// Init -------------------------------------------------------------
	}
])
.controller('RegisterCardCtrl', ['$scope','$state', '$stateParams', 'AppUtil','User','$ionicLoading','$ionicPopup','APP_CONFIG','security', 'CacheUtil', 'currentStore','toaster','$ionicHistory',
	function($scope, $state, $stateParams ,AppUtil, User,$ionicLoading,$ionicPopup, APP_CONFIG, security, CacheUtil, currentStore, toaster, $ionicHistory) {  
		// private properties -------------------------------------------------------------
		// public properties -------------------------------------------------------------
		// scope properties -------------------------------------------------------------
		$scope.step = $stateParams.step || 1;
		$scope.e_msges = {};
		$scope.chooseStore = security.getCurrentStore();
		$scope.states = AppUtil.getStateList();
		$scope.user = CacheUtil.getAppCache().get('/register/user') || {
			FirstName: '',
			MiddleName: '',
			LastName: '',
			Email: '',
			UserEmail: '',
			Phone: '',
			CellPhone: '',
			Password: '',
			RetypePassword: '',
			StoreID: $scope.chooseStore?$scope.chooseStore.CS_StoreID:null,
			PhoneIsCellPhone: false,
			LoyaltyAutoEnroll: true,
			SRCardID: ''
		};
		$scope.zipcodeRegx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		//$scope.emailRegx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		$scope.emailRegx = /^[^!'"\/]+$/;
		$scope.passwordRegx =/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,12}$/;
		$scope.nameRegx = /^(a-z|A-Z|0-9)*[^!#$%^&*()"\/\\;:@=+,?\[\]\/]*$/;
		// private method -------------------------------------------------------------
		//public method -------------------------------------------------------------

		var onFail = function(res){
			$ionicLoading.hide();
			$ionicPopup.alert({
				title: APP_CONFIG.AlertTitle,
				template: res.data.Message
			});
		};
		$scope.submit = function(form){
			$scope.showInvalid = true;
			if(form.$invalid){
				return;
			}
			// check confirm user
			$ionicLoading.show();
			var cardId = '440'+ $scope.user.SRCardIDtmp;
			$scope.user.SRCardID = cardId;
			//$scope.user.SRCardIDtmp = cardId;
			$scope.user.UserEmail = $scope.user.Email;
			$scope.user.StoreID = $scope.user.StoreID + '';
			$scope.user.CellPhone = $scope.user.PhoneIsCellPhone ? $scope.user.Phone: '';
			// check user
			var isUserExistReq = User.checkUserExists($scope.user.Email).then(function(res){
				$ionicLoading.hide();
				if(res.data == null || res.data) { 
					form.username.$setValidity('server',false);
					$scope.e_msges['username'] = "This email address already has a rewards account.";
					//return res;
					return {data: true};
				 }//User exists.
				//return res;
				return {data: false}
			}, onFail);
			// check card
			isUserExistReq = isUserExistReq.then(function(res){
				if(res.data){
					return res;
				}
				var checkCardExists = User.checkCardExists(cardId).then(function(res){
					if(res.data != null && res.data.Users.length >= 1) { 
						form.cardnumber.$setValidity('server',false);
						$scope.e_msges['cardnumber'] = "There is already an account for this Card Number.";
						return {data: true};
					}	
					return {data:false};
				},onFail);
				return checkCardExists;
			});
			// check phone
			isUserExistReq  = isUserExistReq.then(function(res){
				if(res.data){
					return res;
				}
				var isPhoneExistReq = User.checkPhoneExists($scope.user.Phone).then(function(res){
					if(res.data != null && res.data.Users.length >= 1) {
						form.phone.$setValidity('server',false);
						$scope.e_msges['phone'] = "This phone number already has a rewards account.";
						return {data: true};
					}
					return {data: false};
				}, onFail);
				return isPhoneExistReq;
			});
			// finally
			isUserExistReq.then(function(res){
				// is Exist
				if(res.data){
					return;
				}
				CacheUtil.getAppCache().put('/register/user', $scope.user);
				$scope.step = 2;//Go to confirm step
			});
		};

		//Confirm account information
		$scope.editAccount = function(){
			$scope.step = 1;
		};
		$scope.changeStore = function(){
			$state.go('app.enroll', {back: 'app.registercard', step: 2});
		};
		$scope.openTermLink = function() {
			AppUtil.openNewWindow(APP_CONFIG[$scope.chooseStore.CS_BannerID+'_TermsLink']);
		};
		$scope.create = function(){
			$ionicLoading.show();
			//Execute create account
			var onSuccess = function(res){
				if(!res.data){
					$ionicLoading.hide();
					return;
				}
				$ionicLoading.hide();
				$scope.user = null;
				CacheUtil.getAppCache().remove('/register/user');
				toaster.pop('success','Success', 'Thank you for creating an account.');
				$state.go('app.cardmode', null, {reload: true});
			};//on Success
			User.createUser($scope.user).then(onSuccess, onFail);
		};
		// Init -------------------------------------------------------------
	}
])