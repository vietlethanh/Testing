enrollModule.controller('AssociateIdCtrl', ['$q', '$scope', 'AppUtil', 'Loyalty', 'User', '$ionicLoading',
	function($q, $scope, AppUtil, Loyalty, User, $ionicLoading, $ionicPopup){
		// private properties -------------------------------------------------------------
		// public properties -------------------------------------------------------------
		$scope.e_msges = {};
		// scope properties -------------------------------------------------------------
		// private method -------------------------------------------------------------
		var associateId2CardId = function(assId){
			assId = ''+assId;
			return '441'+_.range(0,8-assId.length,0).join('')+assId; 
		}
		//public method -------------------------------------------------------------
		$scope.getCardDemographic = function(){
			if($scope.enrollForm.$invalid){
				return;
			}
			var cardId = associateId2CardId($scope.enrollInfo.AssociateId);
			$ionicLoading.show();
			
			var deferred = $q.defer();
			var getCardPromise = Loyalty.getCardDemographic(cardId).then(function(res){
				var selectedState, data;
				data = res.data;
				if(data == null || data== 'null')
				{
					$ionicLoading.hide();
					// show not found error
					$scope.enrollForm.associateId.$setValidity('server',false);
					$scope.e_msges['associateId'] = "This Associate ID does not exist.";
					deferred.resolve({result: false});
					return deferred.promise;
				}
				selectedState = AppUtil.getStateByVal(res.data.State);
				$scope.enrollInfo.ExternalCustomerCardID = cardId;
				$scope.enrollInfo.SelectedState = selectedState;
				$scope.enrollInfo.Email = data.Email;
				$scope.enrollInfo.FirstName = data.FirstName;
				$scope.enrollInfo.MiddleName = '';
				$scope.enrollInfo.LastName = data.LastName;
				$scope.enrollInfo.Address = data.Address1;
				$scope.enrollInfo.City = data.City;
				$scope.enrollInfo.State = selectedState.value;
				$scope.enrollInfo.ZipCode = data.PostalCode;
				deferred.resolve({result: true});
				return deferred.promise;
			}, function(res){
				$ionicLoading.hide();
				// show not found error
				$scope.enrollForm.associateId.$setValidity('server',false);
				$scope.e_msges['associateId'] = "This Associate ID does not exist.";
			});
			getCardPromise.then(function(promData){
				if(typeof(promData) != "undefined" && typeof(promData.result) != "undefined" && promData.result)
				{
					//Validate customer card id.
					User.searchUsers('externalcustomercardid', cardId).then(function(res){
						$ionicLoading.hide();
						var searchedData = res.data;
						if(searchedData != null && searchedData.TotalResult > 0)
						{
							// show not found error
							$scope.enrollForm.associateId.$setValidity('server',false);
							$scope.e_msges['associateId'] = "There is already an account associated to this Associate ID number, please re-check the number and try again or contact Customer Support at 800-692-5710.";
							return;
						}
						$scope.next();
					}, function(){
						$ionicLoading.hide();
						// show not found error
						$scope.enrollForm.associateId.$setValidity('server',false);
						$scope.e_msges['associateId'] = "There is already an account associated to this Associate ID number, please re-check the number and try again or contact Customer Support at 800-692-5710.";
					});
				}else{
					$ionicLoading.hide();
				}

			});

		};
		// Init -------------------------------------------------------------
	}
]);