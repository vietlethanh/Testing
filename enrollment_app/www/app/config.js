var isAndroid = function() {
	var uagent = navigator.userAgent.toLowerCase();
	return uagent.search('android') > -1 ? true : false;
};
var qcserver = {
	Host:'https://savemartqcapi.myrelationshop.com/api',
	CheckVerionApi :'https://savemart.m.myrelationshop.com/enrollment/dl/phoneenrollversion.json',
	DistributeHost: 'https://devapi.mcmhq.com/mcmdistribution/api',
   	SecureHost: 'https://savemartqcapi.myrelationshop.com/api',
   	ApplicationId: isAndroid()?'1ae87ef4-1ed3-4185-9b95-7b959ba3d579':'362746a4-2d70-4618-b29c-edcfcf1db3d5',
   	BlankImge: 'http://UnitedQCAdmin.MyRelationShop.com/Images/1x1.gif',   	
	APIComsumerKey:'768A49EA-2D05-45A9-AD64-B1BD962138DD',
	APIUserName:'SaveMartApiUser',
	APIPassword : 'SaveMartRS2013',
	
}
var liveserver = {
	Host:'https://savemartapi.myrelationshop.com/api',
	CheckVerionApi :'https://savemart.m.myrelationshop.com/enrollment/dl/phoneenrollversion.json',
 	SecureHost: 'https://savemartapi.myrelationshop.com/api',
 	DistributeHost: 'https://gtapi.mcmhq.com/mcmdistribution/api',
 	ApplicationId: isAndroid()?'1ae87ef4-1ed3-4185-9b95-7b959ba3d579':'362746a4-2d70-4618-b29c-edcfcf1db3d5',
 	BlankImge: 'http://UnitedAdmin.MyRelationShop.com/Images/1x1.gif',
 	APIComsumerKey:'768A49EA-2D05-45A9-AD64-B1BD962138DD',
	APIUserName:'SMartRSApiUser',
	APIPassword : 'SMartRS0123',
}

var AppCfg = {
	ShowSmartReward : true,
	FeedBackType : 'Mobile Web',
	//Tracker : AppTracker,
	AccountTrackerID: 'UA-29396554-2',
	TrackerCategory :'MobileApp',
	TOULink : 'http://www.unitedtexas.com/shopmoresavemore',
	FAQLink : 'https://www.savemart.com/rewards/how-it-works',
	PPLink : 'http://www.unitedtexas.com/privacypolicy',
	FullSiteLink : 'http://www.unitedtexas.com',
	StoreSearchDefaultKey:'',
	StoreMapCenterPointDefault:[32.808053,-96.771812],//dallas
	StoreMapZoomDefault:5,
	EnablePushnotification : false,
	AppName:'SaveMartRelationshop',
	AppVersion :'1.0.0',
	BuildVersion: 10000,
	AppTag :'savemart',
	WeeklyAdCacheTime : 3600*8, // 8 hour
	SmartRewardCacheTime: 3600,// 1 hour
	RecipeImageDefault: 'http://unitedadmin.myrelationshop.com/images/RecipeDefault.jpg',
	AppServicePrefix: 'Savemart',
	CompanyId: 'A91F6788-BBE6-4ED3-8BB9-647C10ECEECA', // push and analytics
	SenderId: '204111222735', // pushnotification
}
var BannerAppCfg = {
	Lucky: {
		BannerId: 41,
		AlertTitle: 'Lucky',
		FullSiteLink : 'http://www.luckyyourewards.com',
		AccountTrackerID: 'UA-23943946-17'
	},
	Savemart: {
		BannerId: 40,
		AlertTitle: 'Save Mart',
		FullSiteLink : 'http://www.savesmartrewards.com/',
		AccountTrackerID: 'UA-23943946-16'

	}
}
var BannerName = 'Savemart';
var env = {};
env.qcweb = angular.extend({}, qcserver, AppCfg, BannerAppCfg[BannerName], {IsWeb: true, enable_local: true});
env.liveweb = angular.extend({}, liveserver, AppCfg, BannerAppCfg[BannerName],{IsWeb: true});

env.qcapp = angular.extend({}, qcserver, AppCfg, BannerAppCfg[BannerName],{IsWeb: false});
env.liveapp = angular.extend({}, liveserver, AppCfg, BannerAppCfg[BannerName], {IsWeb: false});

angular.module('MCMRelationshop.Config', [])
.constant('APP_CONFIG', env.qcweb);
