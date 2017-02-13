angular.module('MCMRelationshop.Info', [
	'MCMRelationshop.Resource.Setting'
])
.controller('InfoCtrl', ['$scope','$state','APP_CONFIG',
	function($scope, $state,APP_CONFIG) {  
		//console.log('dang thu trang')
		// private properties -------------------------------------------------------------
		// public properties -------------------------------------------------------------
		// scope properties -------------------------------------------------------------
		$scope.cfg = APP_CONFIG;
		// private method -------------------------------------------------------------
		//public method -------------------------------------------------------------
		$scope.goSupport = function(){
			$state.go('app.support');
		}
		// Init -------------------------------------------------------------
	}
])
.controller('SupportCtrl',['$scope','Setting','security','$ionicLoading','$ionicPopup','APP_CONFIG',
	function($scope, Setting,security,$ionicLoading,$ionicPopup,APP_CONFIG){
		// private properties -------------------------------------------------------------
		var curentUser = security.getCurrentUser();
		//console.log(curentUser);
		// public properties -------------------------------------------------------------
		// scope properties -------------------------------------------------------------
		$scope.feedback = {
			Email: curentUser ? curentUser.UserEmail : '',
			BannerID: curentUser ? curentUser.BannerID: 13, // default is united banner
			Body: ''
		}
		// private method -------------------------------------------------------------
		//public method -------------------------------------------------------------
		$scope.send = function(){
			$ionicLoading.show();
			Setting.sendFeedback($scope.feedback).then(function(res){
				$ionicLoading.hide();
				if(res.data){
					// clear
					$scope.feedback = {
						Email: curentUser ? curentUser.UserEmail: '',
						BannerID: '',
						Body: ''
					};
					var alertPopup = $ionicPopup.alert({
						title: APP_CONFIG.AlertTitle,
						template: 'Your feedback was sent.'
					});
				}
				else {
					var alertPopup = $ionicPopup.alert({
						title: APP_CONFIG.AlertTitle,
						template: 'Have problem.Please try another time.'
					});

				}
			})
		}
		// Init -------------------------------------------------------------
	}
])
.controller('TermsController', ['$scope', '$state', '$stateParams','Setting',
	function($scope, $state, $stateParams, Setting){
		//$scope.return = $stateParams.return ? true : false;
		$scope.content = '';
		Setting.getTerms().then(function(res){
			$scope.content = res.data;
		});

	}
])
.controller('PPController', ['$scope', '$state', '$stateParams', 'Setting',
	function($scope, $state, $stateParams, Setting){
		//$scope.return = $stateParams.return ? true : false;
		$scope.content = '';
		Setting.getPP().then(function(res){
			$scope.content = res.data;
		});
	}
]);