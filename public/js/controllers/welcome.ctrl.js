var app = angular.module('clashmash')
.controller('WelcomeCtrl', ['$http', '$location', function($http, $location){
  	var wc = this;
	wc.getUserInfo = function() {
		wc.playerNotFound = false;
		var userID = wc.userClanID;
		if (userID[0] !== '#') {
			userID = '#' + userID;
		}
		var url = 'player/' + encodeURIComponent(userID);
		$http.get(url)
		.then(function(res) {
			console.log(JSON.stringify(res.data));
			if (res.data.reason == "notFound") {
				wc.playerNotFound = true;
			} else {
				wc.playerInfo = res.data;
				localStorage.setItem('userInfo', JSON.stringify(wc.playerInfo));
				$location.path('/home');
			}	
		}, function(err){
			console.log(err);
			$location.path('/');
		});
	};
}]);