var app = angular.module('clashmash');
app.controller('WelcomeCtrl', ['$http', '$location', '$rootScope', function ($http, $location, $rootScope) {
	var wc = this;
	wc.getUserInfo = function () {

		wc.playerNotFound = false;
		//Maker sure user input has a hash, and is encoded
		var userID = wc.userClanID;
		if (userID[0] !== '#') {
			userID = '#' + userID;
		}
		var url = 'player/' + encodeURIComponent(userID);

		$http.get(url)
			.then(function (res) {

				if (res.data.reason == "notFound") {
					wc.playerNotFound = true;
				} 
				else if (res.data.reason == "unknownException") {
					wc.playerNotFound = true;
				}
				else {
					wc.playerInfo = res.data;
					localStorage.setItem('userInfo', JSON.stringify(wc.playerInfo));
					// wc.$emit('addNav', wc.playerInfo);
					$rootScope.$broadcast('newData', wc.playerInfo);
					$location.path('/home');
				}
			}, function (err) {
				console.log(err);
				$location.path('/');
			});
	};
}]);