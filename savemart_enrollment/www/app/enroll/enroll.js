var enrollModule = angular.module('MCMRelationshopEnrollment.Eroll', [
	'MCMRelationshopEnrollment.Form',
	'ui.utils',
	'MCMRelationshopEnrollment.Resource.Loyalty',

])
.controller('EnrollCtrl', ['$scope','$state','$stateParams', 'APP_CONFIG', '$ionicModal', function($scope, $state, $stateParams, APP_CONFIG, $ionicModal){
	// private properties -------------------------------------------------------------
	var mode, statePrefix, customerFlow, associateFlow, currentFlow;
	mode = $stateParams.mode;
	statePrefix = 'app.enroll.';
	customerFlow = ['cardmode','email','name','phone','password','card','customerSummary','customerRewardsCard' ];
	associateFlow = ['cardmode', 'id','name','address','email','password','phone','card', 'associateSummary','associateRewardsCard'];
	//Associate Card Less
	associateCardLessFlow = ['storelocator','id','name','address','email','password','phone','associateSummary','associateRewardsCardLess'];
	if(typeof(APP_CONFIG.AssociateCardLess) != "undefined" && APP_CONFIG.AssociateCardLess == true)
	{
		currentFlow = associateCardLessFlow;
	}else
	{
		currentFlow = mode=='customer' ? customerFlow: associateFlow;
	}
	// public properties -------------------------------------------------------------
	// scope properties -------------------------------------------------------------
	$scope.bannerUrl = $scope.currentStore?'http://'+APP_CONFIG[$scope.currentStore.CS_BannerID].BannerUrl: 'http://www.savemart.com';
	$scope.enrollInfo = {
		isReceiveCard: true,
		Email: '',
		UserEmail: '',
		Password: '',
		FirstName: '',
		MiddleName: '',
		LastName: '',
		Address: '',
		City: '',
		State: 'CA',
		ZipCode: '',
		Phone: '',
		CellPhone: '',
		StoreID: '',
		SRCardID: '',
		LoyaltyAutoEnroll: true,
		ReceiveEmail: false,
		ExternalCustomerCardID: ''
	};
	$scope.showInvalid = true;
	// Regular Expression
	$scope.zipcodeRegx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
	//$scope.emailRegx = /^[\w.\-]+@[a-zA-Z_.\-]+?\.[a-zA-Z]{2,3}$/;
	$scope.emailRegx = /^[^!'"\/]+$/;
	$scope.passwordRegx =/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,12}$/;
	$scope.nameRegx = /^(a-z|A-Z|0-9)*[^!#$%^&*()"\/\\;:@=+,?\[\]\/]*$/;
	$scope.addressRegx = /^(a-z|A-Z|0-9)*[^!$%^&*()'"\/\\;:@=+,?\[\]]*$/;
	$scope.numberRegx = /^\d*[0-9](|.\d*[0-9])?$/;

	// terms and conditons modal
	//$ionicModal.fromTemplateUrl('app/enroll/terms.html', {
	$ionicModal.fromTemplateUrl(APP_CONFIG.TermsLink, {	
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openTermModal = function() {
		//$scope.modal.show();
		$scope.openLink(APP_CONFIG.TermsLink);
	};
	$scope.closeTermModal = function() {
		$scope.modal.hide();
	};
	// private method -------------------------------------------------------------
	var getCurrentStepIndex = function(){
		var sortStateName = $state.current.name.replace(statePrefix, '');
		return currentFlow.indexOf(sortStateName);
	};
	//public method -------------------------------------------------------------
	$scope.next = function(){
		var currentStepIndex, nextStep;
		currentStepIndex = getCurrentStepIndex();
		if(currentStepIndex == currentFlow.length){
			return;
		}
		nextStep = currentFlow[currentStepIndex+1];
		if(nextStep == "card" && !$scope.enrollInfo.isReceiveCard){
			$scope.enrollInfo.SRCardID = '';
			nextStep =  currentFlow[currentStepIndex+2];
		}
		$state.go(statePrefix+nextStep, {mode: mode});
	};
	$scope.back = function(){
		//$state.go()
		var currentStepIndex, backStep;
		currentStepIndex = getCurrentStepIndex();
		if(currentStepIndex == 0){
			if(typeof(APP_CONFIG.AssociateCardLess) != "undefined" && APP_CONFIG.AssociateCardLess == true)
			{
				$state.go('app.enroll.storelocator');
				return;
			}
			$state.go('app.home');
			return;
		}
		backStep = currentFlow[currentStepIndex-1];
		if(backStep == "card" && !$scope.enrollInfo.isReceiveCard){
			backStep =  currentFlow[currentStepIndex-2];
		}
		$state.go(statePrefix+backStep, {mode: mode});
	}
	/*
	$scope.submit = function(){
		var formScope = $scope.$$childHead.$$childHead;
		if(formScope && formScope.enrollForm.$invalid){
			return;
		}
		$scope.next();
	}
	*/
	// Init -------------------------------------------------------------
}]);