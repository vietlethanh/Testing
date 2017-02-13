angular.module('MCMRelationshopEnrollment.Resource.Loyalty', [
	'MCMRelationshopEnrollment.Utils',
	'angular-data.DSCacheFactory',
	'MCMRelationshopEnrollment.Config',
])
.factory('Loyalty', ['$http','HttpUtil','CacheUtil',
	function($http, HttpUtil, CacheUtil){
		var r = {
			getCardDemographic: function(cardId){
				var opts = HttpUtil.opts();
				return $http.get('/cards/' + cardId + '/demographic', opts);
			},
			requestPhysicalCard: function(physicalCardRequest){
				var opts = HttpUtil.opts();
				return $http.post('/cards/physical-card', physicalCardRequest, opts);
			}

		}
		
		return r;
	}
]);