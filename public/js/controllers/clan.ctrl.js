angular.module('clashmash')
.controller('ClanCtrl', ['$http', '$rootScope', function($http, $rootScope) {
	var cc = this;
	cc.userInfo = JSON.parse(localStorage.getItem('userInfo'));

	var url = 'clan/' + encodeURIComponent(cc.userInfo.clan.tag);
	cc.getClanInfo = function() {
		$http.get(url)
			.then(function (res) {
				
				if (res.data) {
					cc.userClan = res.data;
					localStorage.setItem('clanInfo', JSON.stringify(cc.userClan));
				}
				else {
					cc.userClan = localStorage.setItem('clanInfo', JSON.stringify(cc.userClan));
				}
				
			}, function (err) {
				console.log(err);
				$location.path('/');
			});
	};

	cc.getClanInfo();
	
}]);