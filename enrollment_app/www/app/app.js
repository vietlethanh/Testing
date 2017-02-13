// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('MCMRelationshop', [
	'ionic',
	'ngIOS9UIWebViewPatch',
	'toaster',
	'MCMRelationshop.Config',
	'security',
	'MCMRelationshop.Resource.Store',
	'MCMRelationshop.Resource.User',
	'MCMRelationshop.Enroll',
	'MCMRelationshop.CardMode',
	'MCMRelationshop.Register',
	'MCMRelationshop.Info',
	//Angular UI utils
	//'ui.utils',
	'ui.mask',
	'MCMRelationshop.Filter'
])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://**',
    'https://**',
    'geo:/**',
    'tel:/**',
    'maps:/**',
    'maps:**',
    'chrome-extension:/**'
  ]);
})
.config(['$ionicConfigProvider', function($ionicConfigProvider){
	$ionicConfigProvider.backButton.text('').previousTitleText(false);
	$ionicConfigProvider.views.maxCache(0);
	$ionicConfigProvider.navBar.alignTitle('center');

}])
.run(function($ionicPlatform, $http, CacheFactory, APP_CONFIG) {
	// register push notification 
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}		
	});
})
.config(function($stateProvider, $urlRouterProvider) {
	var states = {};
	
	states['app']= {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu.html",
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
						APP_CONFIG['40_TermsLink'] = _.isEmpty(res.data['40_TermsLink'] )? 'app/enroll/terms.html': res.data['40_TermsLink'] ;
						APP_CONFIG['41_TermsLink'] = _.isEmpty(res.data['41_TermsLink'] )? 'app/enroll/terms.html': res.data['41_TermsLink'] ;
						return APP_CONFIG.BuildVersion < res.data.BuildVersion;
					});
					return v;
				}
			]

		}
	};
	states['app.enroll']= {
		url: "/enroll?back&step",
		views: {
			'menuContent': {
				controller: 'enrollCtrl',
				templateUrl: "app/enroll/enroll.html",
			}
		}
	};
	states['app.cardmode']= {
		url: "/cardmode",
		views: {
			'menuContent': {
				controller: 'CardModeCtrl',
				templateUrl: "app/cardmode/cardmode.html",
			}
		}
	};
	states['app.register']= {
		url: "/register?step",
		views: {
			'menuContent': {
				controller: 'RegisterCtrl',
				templateUrl: "app/register/register.html",
			}
		}
	};
	states['app.registercard']= {
		url: "/registercard?step",
		views: {
			'menuContent': {
				controller: 'RegisterCardCtrl',
				templateUrl: "app/register/registercard.html",
			}
		}
	};
	states['app.info']= {
		url: "/info",
		views: {
			'menuContent': {
				controller: 'InfoCtrl',
				templateUrl: "app/info/info.html",
			}
		}
	};
	
	for(state in states){
		$stateProvider.state(state, states[state]);
	}
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/cardmode');
})
.controller('AppCtrl', ['$rootScope','$scope','$state','$stateParams', '$ionicModal', '$timeout', 'security', 'Store','AppUtil','APP_CONFIG','apiKey', 'CacheUtil', 'currentStore','isOutdate','$ionicHistory','$timeout','$ionicPopup','$ionicNavBarDelegate',
	function($rootScope, $scope,$state, $stateParams, $ionicModal, $timeout, security, Store,AppUtil, APP_CONFIG, apiKey, CacheUtil, currentStore, isOutdate, $ionicHistory, $timeout, $ionicPopup,$ionicNavBarDelegate) {
		$rootScope.version = '123';
		// Form data for the login modal
		// private properties -------------------------------------------------------------
		var logos = {
				'40': 'img/store-logo-savemart.png',
				'41': 'img/store-logo-lucky.png'
			};
		// public properties -------------------------------------------------------------
		$scope.appcfg = APP_CONFIG;
		$scope.currentStore = currentStore;
		$scope.storeLogo = currentStore ? logos[currentStore.CS_BannerID]: '';
		CacheUtil.getAppCache().put('/register/user', null);
		// scope properties -------------------------------------------------------------
		// private method -------------------------------------------------------------
		//public method -------------------------------------------------------------
		$scope.openLink = AppUtil.openNewWindow;
		$scope.goTo = function(link, params){
			$state.go(link, params);
		};
		// events
		$scope.$on('$stateChangeSuccess', function(events, toState, toParams, formState, formParams){
			// cheat for reload
			$ionicNavBarDelegate.showBar(true);
			$timeout(function(){
				$ionicNavBarDelegate.showBar(true);
			},0);
			$rootScope.pageClass = toState.name.replace(/\./g,'-');
		});
		// Init -------------------------------------------------------------
		if(navigator.splashscreen){
			$timeout(function(){
				navigator.splashscreen.hide();
			}, 1000);
		}
		$scope.$on('changeStore', function(event, store){
			$scope.currentStore = store;
			$scope.storeLogo = logos[store.CS_BannerID];
		});
		if(isOutdate){
			$ionicPopup.alert({
				title: 'Your app is out date',
				scope: $scope,
				template: "Please go to <a style=\"text-decoration: underline\" ng-click=\"openLink(appcfg.DowloadAppLink)\">here</a> for download lastest app."
			})
		};
		if(!currentStore && $state.current.name !='app.enroll'){
			$timeout(function(){
	   			$state.go('app.enroll', {}, {reload: true});
			}, 0);
		}
	}
]);