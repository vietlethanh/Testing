angular.module('MCMRelationshop.Resource.DigitalCoupon', [
	'MCMRelationshop.Utils',
	'angular-cache'
])
.factory('DigitalCoupon', ['$http','HttpUtil','security','APP_CONFIG',
	function($http, HttpUtil, security, APP_CONFIG){
		var r = {
			getDigitalCoupons:  function(){
				var opts = HttpUtil.opts(),
					user = security.getCurrentUser(),
					userid = security.getCurrentUserId(),
					params = {
						bannerId: APP_CONFIG.BannerId,
						username: userid

					};
				return $http.get('/mfr-digital-coupons?'+HttpUtil.encodeUrl(params), opts)
			},
			redeemDigitalCoupon: function(cid){
				var userid = security.getCurrentUserId(),
					params = {
						bannerId: APP_CONFIG.BannerId,
						username: userid,
						cpnId: cid
					},
					opts = HttpUtil.opts({
						clearCache: [
							'/shoppinglists/user-items?username='+userid,
							'/mfr-digital-coupons/clipped?'+HttpUtil.encodeUrl({bannerId: APP_CONFIG.BannerId,username: userid})
						]
					});
				return $http.post('/mfr-digital-coupons/clipped?'+HttpUtil.encodeUrl(params), {}, opts);
			},
			getCippedCoupons: function(userid){
				var opts = HttpUtil.opts({
						cache: true
					}),
					user = security.getCurrentUser(),
					userid = security.getCurrentUserId(),
					params = {
						bannerId: APP_CONFIG.BannerId,
						username: userid
					};
				return $http.get('/mfr-digital-coupons/clipped?'+HttpUtil.encodeUrl(params), opts)
			}
		};
		return r;
	}
]);
