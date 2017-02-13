angular.module('MCMRelationshopEnrollment.Resource.Store', [
	'MCMRelationshopEnrollment.Utils',
	'angular-data.DSCacheFactory'
])
.factory('Store', ['$q','$http','DSCacheFactory','HttpUtil','CacheUtil','AppUtil','APP_CONFIG',
	function($q, $http, DSCacheFactory, HttpUtil, CacheUtil, AppUtil, APP_CONFIG){
		var r = {
			getStore: function(storeid){
				var opts = HttpUtil.opts({
					cache: true,
					offcache: true,
				})
				var p  = $http.get('/stores/'+storeid, opts)
				return p;
			},
			searchStore: function(keyword, bannerId){				
				keyword = keyword == undefined ? '': keyword;
				var opts = HttpUtil.opts();
				return $http.get('/stores?'+ HttpUtil.encodeUrl({keyword: keyword, bannerId: bannerId}),opts);
			},
			searchNearByStore: function(latlng, bannerId){
				var opts = HttpUtil.opts();
				return $http.get('/stores?'+HttpUtil.encodeUrl({latlng:latlng, bannerId: bannerId}),opts);

			}
		};
		return r;
	}
]);