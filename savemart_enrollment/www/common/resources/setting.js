angular.module('MCMRelationshopEnrollment.Resource.Setting', [
	'MCMRelationshopEnrollment.Utils'
])
.factory('Setting', ['$q','$http','HttpUtil','AppUtil','APP_CONFIG',
	function($q, $http, HttpUtil, AppUtil, APP_CONFIG){
		var r = {
			getLastVersion: function(){
				var opts = HttpUtil.opts();
				delete opts.intercetorParams.api;
				opts.noToken = true;
				return $http.get(APP_CONFIG.CheckVerionApi, opts);
			}
		};
		return r;
	}
]);