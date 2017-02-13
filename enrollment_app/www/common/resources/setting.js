angular.module('MCMRelationshop.Resource.Setting', [
	'MCMRelationshop.Utils',
	'angular-cache',
	'MCMRelationshop.Config',
])
.factory('Setting', ['$http','HttpUtil','APP_CONFIG',
	function($http, HttpUtil, APP_CONFIG){
		var r = {
			getSetting: function(key){
				var opts = HttpUtil.opts();
				return $http.get('/setting/'+key, opts);
			},
			sendFeedback: function(feedback){
				var opts = HttpUtil.opts();
				feedback.BannerID = APP_CONFIG.BannerId;
				return $http.post('/feedbacks',feedback,opts);
			},
			search: function(keyword,storeid){
				var opts = HttpUtil.opts();
				return $http.get('/circulars/0/items?'+HttpUtil.encodeUrl({keyword:keyword, storeId: storeid}),opts);
			},
			getLastVersion: function(){
				var opts = HttpUtil.opts();
				delete opts.intercetorParams.api;
				opts.noToken = true;
				return $http.get(APP_CONFIG.CheckVerionApi, opts);
			},
			getTerms: function(){
				var opts = HttpUtil.opts();
				return $http.get('/app/terms-conditions?banner='+APP_CONFIG.BannerId, opts);
			},
			getPP: function(){
				var opts = HttpUtil.opts();
				return $http.get('/app/privacy-policy?banner='+APP_CONFIG.BannerId, opts);
			}
		}
		return r;
	}
]);