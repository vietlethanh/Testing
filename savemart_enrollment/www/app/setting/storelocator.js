angular.module('MCMRelationshopEnrollment.StoreLocator', [
	'MCMRelationshopEnrollment.Resource.Store',
	'MCMRelationshopEnrollment.Utils'
])
.factory('BaseStoreLocatorCtrl',['$rootScope', 'APP_CONFIG', 'Store','AppUtil','$ionicLoading','$ionicScrollDelegate','$timeout', '$filter',
	function($rootScope, APP_CONFIG, Store,AppUtil,$ionicLoading, $ionicScrollDelegate,$timeout, $filter){
		var cls = Class.extend({
			logos: {
				'13': 'img/store-logo-united.png',
				'14': 'img/store-logo-mktstreet.png',
				'22': 'img/store-logo-mktstreet.png',
				'23': 'img/store-logo-Albertsons.png',
				'15': 'img/store-logo-amigos.png'
			},
			init: function($scope){
    			$ionicScrollDelegate.scrollTop();
				var self = this;
				this.$scope = $scope;
				$scope.mode='list'; /*map, list*/
				$scope.tab = "banner";// banner, store
				$scope.storeBannerClass = $scope.currentStore ? APP_CONFIG[$scope.currentStore.CS_BannerID].BannerClass : "savemart-banner";
				$scope.banners = [
					{BannerId: 40, Name: 'Save Mart'},
					{BannerId: 41, Name: 'Lucky'}
				];
				$scope.sc = {
					keyword: '',
					bannerId: null
				}
				
				$scope.showHere = false;
				$scope.hereKey = 'here';
				$scope.hereTitle = 'Here i am';
				$scope.stores = null;
				//public methodP
				$scope.getLogo =  function(store){
					return self.logos[store.CS_BannerID+''];
				}
				$scope.switchMode = this.switchMode.bind(this);
				
				$scope.nearBy = this.nearBy.bind(this);
				$scope.searchStore = function(){
					self.loadData($scope.sc.keyword);
				};

				$scope.selectBanner = function(bannerId){
					$scope.sc.bannerId = bannerId;
					self.loadData();
					$scope.tab = 'store';
					$rootScope.hideLogo = false;
					$scope.storeBannerClass = 'pane ' + APP_CONFIG[bannerId].BannerClass;
					$rootScope.bannerClass = APP_CONFIG[bannerId].BannerClass;
				};
				//this.loadData();
			},//init
			loadData: function(keyword){
				var self = this;
				$ionicLoading.show();
				this.$scope.showHere = false;
				return Store.searchStore(keyword, this.$scope.sc.bannerId).then(this._sucessLoadData.bind(this))
				.then(function(){
					var storeGrid = [],
						storeCol = 4, 
						stores = self.$scope.stores;
					_.forEach(stores, function(store, index){
						var rowIndex  = Math.floor(index/storeCol);
						if(storeGrid.length <= rowIndex){
							storeGrid.push([]);
						}
						storeGrid[rowIndex].push(store);
					});
					self.$scope.storeGrid = storeGrid;
				});
			},
			nearBy: function(){
				$ionicLoading.show();
				AppUtil.getCurrentPosition().then(function(res){
					var latlgn = res.data.latitude+','+res.data.longitude;
					//this.$scope.map.center=res.data;
					this.$scope.showHere  = true;
					//$ionicLoading.show();
					Store.searchNearByStore(latlgn , this.$scope.sc.bannerId).then(this._sucessLoadData.bind(this));

				}.bind(this), function(error){
					$ionicLoading.hide();
					if(error){
						alert(error.message);
					}
					else {
						alert('Please enable location service.');
					}
					
				});
			},
			_sucessLoadData: function(res){
				var self = this;
				var stores = res.data;
				_.forEach(stores, function(store){
					store.selectStore = self.onSelectStore;
					store.PharmacyHourArray = store.PharmacyHours ? store.PharmacyHours.split(',') : [];
					if(store.PharmacyPhone){
						var match = store.PharmacyPhone.match(/\d+/g);
						if(match == null){
							store.PharmacyPhone = null;
						}
					}
					//store.logo = self.[store.CS_BannerID+'']

				});
				//Sort by city
				var orderBy = $filter('orderBy');
	    		stores = orderBy(stores, 'StoreID', false);
				this.$scope.stores = stores;
				$ionicLoading.hide();
			},
			onSelectStore: function(store){
			},
			switchMode: function(mode){
				this.$scope.mode = mode;
				$timeout(function(){
					$ionicScrollDelegate.scrollTop(true);
				}, 500);	
			}
		});
		return cls;
	}
])
.controller('StoreLocatorCtrl', ['$scope','$state', 'CacheUtil', 'APP_CONFIG','Store', 'BaseStoreLocatorCtrl','security','$ionicPopup', '$rootScope',
	function($scope, $state, CacheUtil, APP_CONFIG, Store,BaseStoreLocatorCtrl, security,  $ionicPopup, $rootScope) {
		var offCache = CacheUtil.getOfflineAppCache(),
			appCache = CacheUtil.getAppCache();

		var controllerCls = BaseStoreLocatorCtrl.extend({
			onSelectStore: function(store){
				delete store.selectStore;
				security.setCurrentStore(store);
			   	//If the environment is a web
			   	if(typeof(APP_CONFIG.AssociateCardLess) != "undefined" && APP_CONFIG.AssociateCardLess == true)
			   	{
					$state.go('app.enroll.id',null, {
						reload: true
					});
					return;
			   	}
				var address = '';
				if(store.Address1 != '')
				{
					address = store.Address1;
				}else
				{
					address = store.Address2;
				}
				var preferredStore = address + ' ' + store.City + ', ' + store.State + ' ' + store.Zipcode
				var alertPopup = $ionicPopup.alert({
					title: APP_CONFIG.AlertTitle,
					template: 'You have selected Store '+ store.StoreID + ' located at ' + address + ' in ' + store.City 
					+ ' as your preferred store'
			   	});
			   	alertPopup.then(function(){
			   		$state.go('app.home',null, {
						reload: true
					});

			   	});
			}
		});
		$scope.back = function(){
			if($scope.currentStore)
			{
				var bannerId = $scope.currentStore.CS_BannerID;
				$scope.storeBannerClass = 'pane ' + APP_CONFIG[bannerId].BannerClass;
				$rootScope.bannerClass = APP_CONFIG[bannerId].BannerClass;
			}
	   		//If the environment is a web
	   		if(typeof(APP_CONFIG.AssociateCardLess) != "undefined" && APP_CONFIG.AssociateCardLess == true)
	   		{
				$state.go('app.enroll.storelocator',null, { reload: true });
				return;
	   		}
			$state.go('app.home');
		};
		var controller = new controllerCls($scope);
	}
]);
