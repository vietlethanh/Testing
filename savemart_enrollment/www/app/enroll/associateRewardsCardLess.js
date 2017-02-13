enrollModule.controller('AssociateRewardsCardLessCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$state', 'User', 'Loyalty', 'UiUtil', 
	function($scope, $ionicLoading,$ionicPopup,  $state, User, Loyalty, UiUtil){
	
	//public method -------------------------------------------------------------
	$scope.requestCard = function(){
		var confirmP = $ionicPopup.confirm({
			title: '',
			template: [
				'<p>If you would like an actual card to scan <br/> at the register, we will be happy to <br/>mail one to the address contained<br/>in you contact information.<br/>Please allow 4-6 week for delivery.</p>',
				'<p>Would you like to receive a physical card?</p>'
			].join(''),
			buttons: [
				{
					text:'Yes',
					type: 'button-positive',
					onTap: function(e) { return true; }
				},
				{
					text: 'No' ,
					type: 'button-positive',
					onTap: function(e) { return false; }
				}
				
			]
		});
		confirmP.then(function(res){
			if(!res){
				return;
			}
			
			$ionicLoading.show();
			User.getUser($scope.enrollInfo.Email, true).then(function(res){
				var physicalCardRequest = {
					BannerId: $scope.currentStore.CS_BannerID,
					CardId: res.data.SRCardID
				};
				Loyalty.requestPhysicalCard(physicalCardRequest).then(function(){
					$ionicLoading.hide();
					if(res.data == 'false')
					{
						UiUtil.alertPopup('Alert!', "Request unsuccessful!");
						return;
					}
					UiUtil.alertPopup('Alert!', "Request successful!");

				}, function(res){
					$ionicLoading.hide();
					if(res.data == null || res.data.Message == null)
					{
						UiUtil.alertPopup('Alert!', "Something wrong!");
						return;
					}
					UiUtil.alertPopup('Alert!', res.data.Message);
				});
			}, function(res){
				$ionicLoading.hide();
				if(res.data == null || res.data.Message == null)
				{
					UiUtil.alertPopup('Alert!', "Something wrong!");
					return;
				}
				UiUtil.alertPopup('Alert!', "Request unsuccessful!");

			});
		});
		
	};
	$scope.goHome = function(){
		$state.go('app.enroll.storelocator');
	};
	// Init -------------------------------------------------------------
}]);