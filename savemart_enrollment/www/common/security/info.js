angular.module('security.info', [])

.factory('securityInfo', [

	function() {
		return {
			apiKey: null,
			currentUser: null,
			currentStore: null		
		};
	}
]);