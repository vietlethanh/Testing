angular.module('MCMRelationshop.Resource.Store', [
	'MCMRelationshop.Utils',
	'angular-cache'
])
.factory('Store', ['$q','$http','CacheFactory','HttpUtil','AppUtil','APP_CONFIG',
	function($q, $http, CacheFactory, HttpUtil, AppUtil, APP_CONFIG){
		var r = {
			getStore: function(storeid){
				var opts = HttpUtil.opts({
					cache: true,
					//offcache: true,
				})
				var p  = $http.get('/stores/'+storeid, opts).then(function(res){
					if(!res.data.Services){
						return res;
					}
					res.data.Services = angular.fromJson(res.data.Services);
					return res;

				});
				return p;
			},
			searchStore: function(keyword, bannerId){	
				keyword = keyword == undefined ? '': keyword;
				var opts = HttpUtil.opts();
				return $http.get('/stores?'+ HttpUtil.encodeUrl({keyword: keyword, bannerId: bannerId}),opts);
			},
			searchNearByStore: function(latlng){
				var opts = HttpUtil.opts();
				return $http.get('/stores?'+HttpUtil.encodeUrl({latlng:latlng, bannerId: APP_CONFIG.BannerId} ),opts);
			},
			_getCircular: function(storeid){
				var opts = HttpUtil.opts({
					cache: true,
					offcache: true
				})
				var p = $http.get('/stores/'+storeid+'/circular', opts);
				return p;
			},
			//Request.Get('/circulars/'+OLC.Account.CircularID+'/SearchCategories?storeId='+OLC.CurrentStoreID+'&keyword=', {},
			getCircularDepartmentList: function(circularId, storeid){
				var opts = HttpUtil.opts({
					cache: true,
					offcache: true
				});
				var promise = $http.get('/circulars/'+circularId+'/SearchCategories?storeId='+storeid+'&keyword=', opts);
				return promise;
			},
			getRecommendedItems: function(circularId, storeid, cardid){
				var opts = HttpUtil.opts({
					cache: true,
					offcache: true
				});
				var promise = $http.get('/recommended-items/circular/'+circularId+'/store/'+storeid+'/card/'+cardid, opts);
				return promise;
				
			},
			_apiCirular2WeeklyAd: function(circular, deparmentlist, store){
				var i = 0, l = circular.length, weeklyad, cir,
					ip, lp, p,
					is,ls, s;
				var weeklyads = _.map(circular, function(cir, index){
					var pages = cir.CS_Page,
						weeklyad = {};
					weeklyad.StartDate = cir.StartDate;
					weeklyad.EndDate = cir.EndDate;
					weeklyad.CS_CircularID = cir.CS_CircularID;
					weeklyad.DepartmentList = deparmentlist[index];
					weeklyad.Store  = store;

					if(!cir.CS_Page){
						return [];
					}
					weeklyad.Flyers = pages;
					var ps = _.flatten(_.pluck(pages, 'SaleItems'));

					// handle cateogryName				
					weeklyad.items = ps;
					return weeklyad;
				});
				//weeklyad.items = _.flatten(cir_saleItems);
				return weeklyads;
			},
			/*
				keycache: /stores/'+storeid+'/circular';
			*/
			getCircular: function(storeid){
			}
		}
		return r;
	}
]);