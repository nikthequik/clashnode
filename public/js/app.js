angular.module('clashmash', ['firebase', 'ngRoute'])
.config( ['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'views/index.html',
		controller: 'HomeCtrl',
		controllerAs: 'hc'
	})
	.when('/clashRoom', {
		templateUrl: 'views/clashRoom.html',
		controller: 'MashCtrl',
		controllerAs: 'mc'
	});
}])
.controller('HomeCtrl', ['$http', 'ClanInfo', '$location', function($http, ClanInfo, $location){
	
  	var hc = this;
	/*var auth = firebase.auth();
	var provider = new firebase.auth.EmailAuthProvider();*/
	hc.getClans = function() {
		var userID = hc.userClanID;
		if (userID[0] !== '#') {
			userID = '#' + userID;
		}
		var url = 'clans/' + encodeURIComponent(userID);
		$http.get(url)
		.then(function(res) {
			ClanInfo.userClan.push(res.data);
			var oppID = hc.oppClanID;
			if (oppID[0] !== '#') {
				oppID = '#' + oppID;
			}
			var oppUrl = 'clans/' + encodeURIComponent(oppID);
			$http.get(oppUrl)
			.then(function(res){
				ClanInfo.oppClan.push(res.data);
				$location.path('/clashRoom');
			});
		});
	};
  	
  	/*hc.getFromDb = function() {
  		auth.signInWithEmailAndPassword(email, password)
  		.then(function(user){
  			var clanRef = firebase.database().ref('clans');
  			clanRef.on('value', function(snap) {
  				console.log(user);
  				hc.original = snap.val().text;
  			})
  		});
  	};*/
}])
.controller('MashCtrl', ['ClanInfo', function(ClanInfo) {
	var mc = this;
	mc.userClan = ClanInfo.userClan[0];
	mc.oppClan = ClanInfo.oppClan[0];
	mc.members = mc.oppClan.memberList;
	mc.badgeUrl = mc.oppClan.badgeUrls.large;
	mc.userClanName = localStorage.clanName || mc.oppClan.name;
	console.log(localStorage.clanName ? 'true' : 'false');
	localStorage.setItem('clanName', mc.userClan.name);


}]);
