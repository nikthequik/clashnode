var app = angular.module('clashmash')
.controller('HomeCtrl', ['$http', function($http) {
	 var hc = this;
	// var url = 'clan/' + encodeURIComponent(userID);

	 hc.userInfo = JSON.parse(localStorage.getItem('userInfo'));
	// $http.get(url)
	// .then(function (res) {

	// 	if (res.data.reason == "notFound") {
	// 		wc.playerNotFound = true;
	// 	} 
	// 	else if (res.data.reason == "unknownException") {
	// 		wc.playerNotFound = true;
	// 	}
	// 	else {
	// 		wc.playerInfo = res.data;
	// 		localStorage.setItem('clanInfo', JSON.stringify(wc.playerInfo));
	// 		// wc.$emit('addNav', wc.playerInfo);
	// 		$rootScope.$broadcast('clanInfo', wc.playerInfo);
			
	// 	}
	// }, function (err) {
	// 	console.log(err);
		
	// });
	
}]);