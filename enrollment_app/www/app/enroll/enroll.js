angular.module('MCMRelationshop.Enroll', [
])
.controller('enrollCtrl',['$rootScope', '$scope', 'APP_CONFIG', 'Store','AppUtil','$ionicLoading','$ionicScrollDelegate', '$ionicPopup', '$timeout', '$filter', '$state', '$stateParams', 'security',
	function($rootScope, $scope, APP_CONFIG, Store,AppUtil,$ionicLoading, $ionicScrollDelegate, $ionicPopup, $timeout, $filter, $state, $stateParams , security){
		//$ionicScrollDelegate.scrollTop();
		var back = $stateParams.back;
		var step = $stateParams.step;
		var self = this;
		var logos = {
				'40': 'img/store-logo-savemart.png',
				'41': 'img/store-logo-lucky.png'
			};
		$scope.tab = "banner";// banner, store
		$scope.banners = [
			{BannerId: 40, Name: 'Save Mart'},
			{BannerId: 41, Name: 'Lucky'}
		];
		$scope.sc = {
			keyword: '',
			bannerId: null
		}
		$scope.selectBanner = function(bannerId){
			$scope.sc.bannerId = bannerId;
			loadData();
			$scope.tab = 'store';
			$rootScope.pageClass = 'app-enroll-store';
		};
		$scope.searchStore = function(){
			loadData($scope.sc.keyword);			
		};
		$scope.back = function(){
			$scope.tab = 'banner';
			$rootScope.pageClass = 'app-enroll';
		};
		$scope.getLogo =  function(store){
			return logos[store.CS_BannerID];
		};
		//Functions
		function loadData(keyword){
			$ionicLoading.show();
			return Store.searchStore(keyword, $scope.sc.bannerId).then(sucessLoadData.bind(this))
			.then(function(){
				var storeGrid = [],
					storeCol = 4, 
					stores = $scope.stores;
				_.forEach(stores, function(store, index){
					var rowIndex  = Math.floor(index/storeCol);
					if(storeGrid.length <= rowIndex){
						storeGrid.push([]);
					}
					storeGrid[rowIndex].push(store);
				});
				$scope.storeGrid = storeGrid;
			});
		};
		function sucessLoadData(res){
			var self = this;
			var stores = res.data;
			_.forEach(stores, function(store){
				store.selectStore = onSelectStore;
				store.PharmacyHourArray = store.PharmacyHours ? store.PharmacyHours.split(',') : [];
				if(store.PharmacyPhone){
					var match = store.PharmacyPhone.match(/\d+/g);
					if(match == null){
						store.PharmacyPhone = null;
					}
				}
			});
			//Sort by city
			var orderBy = $filter('orderBy');
    		stores = orderBy(stores, 'StoreID', false);
			$scope.stores = stores;
			$ionicLoading.hide();
		};

		function onSelectStore(store){
			delete store.selectStore;
			security.setCurrentStore(store);
			$scope.$emit('changeStore', store);
			var address = '';
			if(store.Address1 != '')
			{
				address = store.Address1;
			}else
			{
				address = store.Address2;
			}
			var preferredStore = address + ' ' + store.City + ', ' + store.State + ' ' + store.Zipcode;
			var alertPopup = $ionicPopup.alert({
				title: store.StoreName,
				template: 'You have selected Store '+ store.StoreID + ' located at ' + address + ' in ' + store.City 
				+ ' as your preferred store'
		   	});
		   	alertPopup.then(function(){
		   		if(!angular.isUndefined(back) && back != '')
		   		{
			   		$state.go(back, {step: 2});
					return;
				}
		   		$state.go('app.cardmode');
		   	});
		};
	}
]);