// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MCMRelationshopEnrollment', [
	'ionic',
	'security',
	'MCMRelationshopEnrollment.Resource.Store',
	'MCMRelationshopEnrollment.Resource.User',
	'MCMRelationshopEnrollment.Resource.Setting',
	'MCMRelationshopEnrollment.Home',
	'MCMRelationshopEnrollment.Eroll',
	'MCMRelationshopEnrollment.StoreLocator'
])
.config(['$sceDelegateProvider',function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.  Notice the difference between * and **.
		'http://**'
	]);
}])
.run(['$ionicPlatform', '$rootScope', 'APP_CONFIG', '$state',function($ionicPlatform, $rootScope, APP_CONFIG, $state) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)

		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}])
.config(['$stateProvider','$urlRouterProvider', 'APP_CONFIG', function($stateProvider, $urlRouterProvider, APP_CONFIG){
	var states = {};
	states['app'] = {
		url: '/app',
		abstract: true,
		templateUrl: 'app/layout.html',
		controller: 'AppCtrl',
		resolve: {
			ready: ['$q','$ionicPlatform', function($q,$ionicPlatform){
				var q = $q.defer();

				  $ionicPlatform.ready(function(){
					q.resolve();
					
				  });
				return q.promise;

			}],
			apiKey: ['security','ready',
				function(security,ready) {
					return security.requestApiKey(true);
				}
			],
			currentStore: ['$q', 'security','apiKey','Store', 
				function($q,security,apiKey, Store){
					var sInfo, defered, storeId;
					sInfo = security.loadSecurityFromCache();
					
					if(sInfo && sInfo.currentStore){
						storeId = sInfo.currentStore.CS_StoreID;
					}

					if(!storeId){
						return null;
					}
					//get CurrentStore
					var promise = Store.getStore(storeId).then(function(res){
						security.setCurrentStore(res.data);
						return res.data;
					}, function(){
						security.setCurrentStore(sInfo.currentStore);
						return sInfo.currentStore;
					});
					return promise;
				}
			],
			isOutdate:['$q', 'Setting','APP_CONFIG',
				function($q, Setting, APP_CONFIG){
					var v = Setting.getLastVersion().then(function(res){
						APP_CONFIG.TermsLink = _.isEmpty(res.data.TermsLink)? 'app/enroll/terms.html': res.data.TermsLink;
						return APP_CONFIG.BuildVersion < res.data.BuildVersion;
					});
					return v;
				}
			]
		}//resolove
	};
	states['app.home'] = {
		url: '/home',
		views: {
			'menuContent': {
				controller: 'HomeCtrl',
				templateUrl: 'app/home/home.html'
			}
		}
	};
	states['app.enroll'] = {
		url: '/enroll/:mode',
		abstract: true,
		views: {
			'menuContent': {
				controller: 'EnrollCtrl',
				templateUrl: 'app/enroll/enroll.html'
			}
		}
	};
	states['app.enroll.cardmode'] = {
		url: '/cardmode',
		views: {
			'menuContent': {
				controller: 'CardmodeCtrl',
				templateUrl: 'app/enroll/cardmode.html'
			}
		}
	};
	states['app.enroll.id'] = {
		url: '/associateid',
		views: {
			'menuContent': {
				controller: 'AssociateIdCtrl',
				templateUrl: 'app/enroll/associateId.html'
			}
		}
	};
	states['app.enroll.email'] = {
		url: '/email',
		views: {
			'menuContent': {
				controller: 'EmailCtrl',
				templateUrl: 'app/enroll/email.html'
			}
		}
	};
	states['app.enroll.password'] = {
		url: '/password',
		views: {
			'menuContent': {
				controller: 'PasswordCtrl',
				templateUrl: 'app/enroll/password.html'
			}
		}
	};

	states['app.storelocator'] =  {
		url: "/storelocator",
		views: {
			'menuContent': {
				controller: 'StoreLocatorCtrl',
				templateUrl: "app/setting/storelocator.html"
			}
		}
	};
	states['app.enroll.storelocator'] =  {
		url: "/storelocator",
		views: {
			'menuContent': {
				controller: 'StoreLocatorCtrl',
				templateUrl: "app/enroll/storelocator.html"
			}
		}
	};
	states['app.enroll.address'] = {
		url: '/address',
		views: {
			'menuContent': {
				controller: 'AddressCtrl',
				templateUrl: 'app/enroll/address.html'
			}
		}
	};
	states['app.enroll.name'] = {
		url: '/name',
		views: {
			'menuContent': {
				controller: 'NameCtrl',
				templateUrl: 'app/enroll/name.html'
			}
		}
	};
	states['app.enroll.phone'] = {
		url: '/phone',
		views: {
			'menuContent': {
				controller: 'PhoneCtrl',
				templateUrl: 'app/enroll/phone.html'
			}
		}
	};
	states['app.enroll.card'] = {
		url: '/card',
		views: {
			'menuContent': {
				controller: 'CardCtrl',
				templateUrl: 'app/enroll/card.html'
			}
		}
	};
	states['app.enroll.associateSummary'] = {
		url: '/associatesummary',
		views: {
			'menuContent': {
				controller: 'AssociateSummaryCtrl',
				templateUrl: 'app/enroll/associateSummary.html'
			}
		}
	};
	states['app.enroll.associateRewardsCard'] = {
		url: '/associateRewardsCard',
		views: {
			'menuContent': {
				controller: 'AssociateRewardsCardCtrl',
				templateUrl: 'app/enroll/associateRewardsCard.html'
			}
		}
	};
	states['app.enroll.customerSummary'] = {
		url: '/customerSummary',
		views: {
			'menuContent': {
				controller: 'CustomerSummaryCtrl',
				templateUrl: 'app/enroll/customerSummary.html'
			}
		}
	};
	states['app.enroll.customerRewardsCard'] = {
		url: '/customerRewardsCard',
		views: {
			'menuContent': {
				controller: 'CustomerRewardsCardCtrl',
				templateUrl: 'app/enroll/customerRewardsCard.html'
			}
		}
	};
	states['app.enroll.associateRewardsCardLess'] = {
		url: '/associateRewardsCardLess',
		views: {
			'menuContent': {
				controller: 'AssociateRewardsCardLessCtrl',
				templateUrl: 'app/enroll/associateRewardsCardLess.html'
			}
		}
	};
	
	for(state in states){
		$stateProvider.state(state, states[state]);
	}
	// if none of the above states are matched, use this as the fallback
	if(typeof(APP_CONFIG.AssociateCardLess) != "undefined" && APP_CONFIG.AssociateCardLess == true)
	{
		$urlRouterProvider.otherwise('/app/enroll/associate/storelocator');	
	}else
	{
		$urlRouterProvider.otherwise('/app/home');
	}
}])
.controller('AppCtrl', ['$rootScope', '$scope','$state', '$ionicPopup', '$timeout', 'security', 'Store','AppUtil','APP_CONFIG','apiKey','currentStore','isOutdate','CacheUtil','$ionicViewService',
	function($rootScope, $scope,$state, $ionicPopup, $timeout, security, Store,AppUtil, APP_CONFIG, apiKey,currentStore, isOutdate, CacheUtil, $ionicViewService) {
		// private properties -------------------------------------------------------------
		// public properties -------------------------------------------------------------
		$scope.appcfg = APP_CONFIG;
		$scope.currentStore = currentStore;
		$rootScope.bannerClass = $scope.currentStore ? APP_CONFIG[$scope.currentStore.CS_BannerID].BannerClass : "savemart-banner";
		$scope.reloadLink = "#/app/home";
		if(typeof(APP_CONFIG.AssociateCardLess) != "undefined" && APP_CONFIG.AssociateCardLess == true)
		{
			$scope.reloadLink = "#/app/enroll/associate/storelocator";
		}
		
		// scope properties -------------------------------------------------------------
		// private method -------------------------------------------------------------
		//public method -------------------------------------------------------------
		$scope.openLink = AppUtil.openNewWindow;
		$scope.goTo = function(link, params){
			$state.go(link, params);
		}
		// events
		$scope.$on('$stateChangeSuccess', function(events, toState, toParams, formState, formParams){
			if(toState.name=="app.storelocator" || toState.name=="app.enroll.storelocator"){
				$rootScope.hideLogo = true
			}
			else {
				$rootScope.hideLogo = false;
			}
			$rootScope.pageClass = toState.name.replace(/\./g,'-');
		});
		// Init -------------------------------------------------------------
		if(navigator.splashscreen){
			$timeout(function(){
				navigator.splashscreen.hide();
			}, 1000);     
		}
		if(isOutdate){
			//alert('isOutdate');
			//console.log('isOutdate');
			$ionicPopup.alert({
				title: 'Your app is out date',
				scope: $scope,
				template: "Please go to <a style=\"text-decoration: underline\" ng-click=\"openLink(appcfg.DowloadAppLink)\">here</a> for download lastest app."
			})
		};
		if(!currentStore){
			$state.go('app.storelocator');
		}
	}
]);
