angular.module('MCMRelationshopEnrollment.Resource.User', [
	'MCMRelationshopEnrollment.Utils',
	'angular-data.DSCacheFactory',
	'MCMRelationshopEnrollment.Config',
])
.factory('User', ['$http','HttpUtil','CacheUtil',
	function($http, HttpUtil, CacheUtil){
		var r = {
			getUser: function(userid, clearCache){
				if(clearCache){
					CacheUtil.clearKey(['/users/'+userid]);
				}
				var opts = HttpUtil.opts({
					cache: true
				});
				return $http.get('/users/'+userid, opts);
			},
			updatePassword: function(uid, opwd, npwd){
				var opts = HttpUtil.opts();
				opts.secure = true;
				return $http.put('/users/'+uid+'/ChangePassword',{
					Email: uid,
					OldPassword: opwd,
					NewPassword: npwd
				}, opts);	
			},
			updateUser: function(user){
				var opts = HttpUtil.opts({
					clearCache: ['/users/'+user.UserID,'/users/'+user.Email]
				});
				return $http.put('/users/'+user.UserID, user, opts);
			},
			createUser: function(user){
				var opts = HttpUtil.opts();
				opts.secure = true;
				return $http.post('/users/',user, opts);	
			},
			forgotPassword: function(email, bannerid){
				var opts = HttpUtil.opts();
				return $http.post('/forgotpassword/'+email+'?bannerid='+bannerid,{}, opts);
			},
			createCard: function(uid){
				var opts = HttpUtil.opts();
				return $http.post('/loyalty/enrollment/','"'+ uid+'"', opts);
			},
			checkUserExists: function(username){
				var opts = HttpUtil.opts();
				return $http.get('/users/' + username + '/exist', opts);
			},
			checkPhoneExists: function(phoneNumber){
				var opts = HttpUtil.opts();
				//Search user by phone number
				return $http.get('/users?field=phones&value=' + phoneNumber, opts);
			},
			checkCardExists: function(card){
				var opts = HttpUtil.opts();
				//Search user by phone number
				return $http.get('/users?field=loyaltycardid&value=' + card, opts);
			},
			updateProfileProperty: function(username, profile, value){
				var opts = HttpUtil.opts();
				return $http.put('/profile/' + profile + '?username=' + username, value, opts);
			},
			searchUsers: function(field, value){
				var opts = HttpUtil.opts();
				return $http.get('/users?field=' + field + '&value=' + value, opts);
			}

		}
		
		return r;
	}
]);