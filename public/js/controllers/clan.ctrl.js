angular.module('clashmash')
.controller('ClanCtrl', ['$http', '$rootScope', function($http, $rootScope) {
	var cc = this;
	cc.userInfo = JSON.parse(localStorage.getItem('userInfo'));

	var url = 'clan/' + encodeURIComponent(cc.userInfo.clan.tag);
	cc.getClanInfo = function() {
		$http.get(url)
			.then(function (res) {
				if (res.data.reason == "notFound") {
					cc.clanNotFound = true;
				} else {
					cc.userClan = res.data;
					console.log(cc.userClan);
					localStorage.setItem('clanInfo', JSON.stringify(cc.userClan));
					//cc.$emit('addNav', cc.playerInfo);
					//$rootScope.$broadcast('newData', cc.playerInfo);
				}
			}, function (err) {
				console.log(err);
				$location.path('/');
			});
	};
	if (JSON.parse(localStorage.getItem('clanInfo')) == null) {
		cc.getClanInfo();
	} else {
		cc.userClan = JSON.parse(localStorage.getItem('clanInfo'));
	}
	
}]);