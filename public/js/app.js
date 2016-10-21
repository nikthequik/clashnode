angular.module('clashmash', ['ngRoute'])
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
  	hc.userClanID = '2GJPGY2P';
  	hc.oppClanID = '229LUGO';
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
}])
.controller('MashCtrl', ['ClanInfo', function(ClanInfo) {
	var mc = this;
	var socket = io();
	mc.userClan = ClanInfo.userClan[0];
	mc.oppClan = ClanInfo.oppClan[0];
	mc.members = mc.oppClan.memberList;
	mc.userClanName = localStorage.clanName || mc.oppClan.name;
	localStorage.setItem('clanName', mc.userClan.name);
	mc.postMessage = function() {

		var messageText = $('#input').val();
		console.log(messageText);
		var message = '<li class="message"><img class="userChatShield" src="' + mc.userClan.badgeUrls.small + '" />' + messageText + '</li>';
		$('#chat').prepend(message);
		/*socket.emit('message', messageText);*/
	};
	
	/*socket.emit('enter', function() {
		console.log('fire');
	});*/

}]);
