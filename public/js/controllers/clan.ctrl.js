(function() {
	angular.module('clashmash')
		.controller('ClanCtrl', ['$http', '$rootScope', function($http, $rootScope) {
			var cc = this;
			cc.userInfo = JSON.parse(localStorage.getItem('userInfo'));
			cc.userClan = JSON.parse(localStorage.getItem('clanInfo'));		
	}])
})();