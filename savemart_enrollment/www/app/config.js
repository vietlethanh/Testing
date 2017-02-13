var isAndroid = function() {
	var uagent = navigator.userAgent.toLowerCase();
	return uagent.search('android') > -1 ? true : false;
};
var qcserver = {
	Host:'https://savemartqcapi.myrelationshop.com/api',
	CheckVerionApi :'http://devcloud.mcmhq.com/SaveMart/enrollversion.json',
	DowloadAppLink: 'http://devcloud.mcmhq.com/SaveMart/index.html',
   	SecureHost: 'https://savemartqcapi.myrelationshop.com/api',
   	BlankImge: 'http://UnitedQCAdmin.MyRelationShop.com/Images/1x1.gif',   	
	APIComsumerKey:'768A49EA-2D05-45A9-AD64-B1BD962138DD',
	APIUserName:'SaveMartApiUser',
	APIPassword : 'SaveMartRS2013',

	
};
var liveserver = {
	Host:'https://savemartapi.myrelationshop.com/api',
	CheckVerionApi :'https://savemart.m.myrelationshop.com/enrollment/dl/enrollversion.json',
	DowloadAppLink: 'https://savemart.m.myrelationshop.com/enrollment/dl/index.html',
   	SecureHost: 'https://savemartapi.myrelationshop.com/api',
   	BlankImge: 'http://UnitedQCAdmin.MyRelationShop.com/Images/1x1.gif',   	
	APIComsumerKey:'768A49EA-2D05-45A9-AD64-B1BD962138DD',
	APIUserName:'SMartRSApiUser',
	APIPassword : 'SMartRS0123',
};
var AppCfg = {
	AlertTitle: '',
	AppName:'Relationshop Enrollment',
	AppVersion :'1.0',
	BuildVersion: 10005,
	CompanyId: 'A91F6788-BBE6-4ED3-8BB9-647C10ECEECA', // push and analytics
	SenderId: '1053425628001', // pushnotification	
};

var BannerAppCfg = {
	Lucky: {
		BannerId: 41
	},
	Savemart: {
		BannerId: 40
	}
};
var BannerName = 'Savemart';
var BannerSettings = {
	41:{
		BannerUrl: "www.luckysupermarkets.com",
		BannerClass: "lucky-banner"
	}, 
	40:{
		BannerUrl: "www.savemart.com",
		BannerClass: "savemart-banner"
	}
};
var env = {};
env.qcweb = angular.extend({}, qcserver, AppCfg, BannerAppCfg[BannerName], {IsWeb: true, enable_local: false}, BannerSettings);
env.liveweb = angular.extend({}, liveserver, AppCfg, BannerAppCfg[BannerName],{IsWeb: true, enable_local: false}, BannerSettings);

env.qcapp = angular.extend({}, qcserver, AppCfg, BannerAppCfg[BannerName],{IsWeb: false}, BannerSettings);
env.liveapp = angular.extend({}, liveserver, AppCfg, BannerAppCfg[BannerName], {IsWeb: false}, BannerSettings);

//Web Environment for Card less module
env.associateQCWeb = angular.extend({}, env.qcweb, {AssociateCardLess: true});
env.associateLiveWeb = angular.extend({}, env.liveweb, {AssociateCardLess: true});

angular.module('MCMRelationshopEnrollment.Config', [])
.constant('APP_CONFIG', env.qcweb);

