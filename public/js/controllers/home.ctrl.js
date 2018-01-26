var app = angular.module('clashmash')
.controller('HomeCtrl', ['$http', 'clanInfo', function($http, clanInfo) {
	 var hc = this;
	 hc.userInfo = JSON.parse(localStorage.getItem('userInfo'));
	 
	localStorage.setItem('clanInfo', clanInfo.getClanInfo(hc.userInfo.clan.tag));
	
	
}]);