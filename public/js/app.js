angular.module('clashmash', ['ngRoute', 'ui.bootstrap'])
.config( ['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'views/signin.html',
		controller: 'HomeCtrl',
		controllerAs: 'hc'
	})
	.when('/clashRoom', {
		templateUrl: 'views/clashRoom.html',
		controller: 'MashCtrl',
		controllerAs: 'mc'
	});
}])
.controller('HomeCtrl', ['$http', '$location', function($http, $location){
	
  	var hc = this;
  	
	hc.getClans = function() {
		var userID = hc.userClanID;
		if (userID[0] !== '#') {
			userID = '#' + userID;
		}
		var url = 'clans/' + encodeURIComponent(userID);
		$http.get(url)
		.then(function(res) {
			localStorage.setItem('userClan', JSON.stringify(res.data));
			var oppID = hc.oppClanID;
			if (oppID[0] !== '#') {
				oppID = '#' + oppID;
			}
			var oppUrl = 'clans/' + encodeURIComponent(oppID);
			$http.get(oppUrl)
			.then(function(res){
				localStorage.setItem('oppClan', JSON.stringify(res.data));
				localStorage.setItem('username', hc.username);
				$location.path('/clashRoom');
			});
		});
	};
}])
.controller('MashCtrl', [function() {
	var mc = this;
	mc.username = localStorage.getItem('username');
	var chat = angular.element(document.querySelector('#chat'));
	var socket = io();

	mc.userClan = JSON.parse(localStorage.getItem('userClan'));
	mc.oppClan = JSON.parse(localStorage.getItem('oppClan'));
	mc.members = mc.oppClan.memberList;
	
	mc.postMessage = function() {
		socket.emit('message', {
			cn: mc.userClan.name,
			un: mc.username,
			m: mc.messageText
		});
		mc.messageText = '';
	};

	socket.on('message', function(message) {
		if (message.cn === mc.userClan.name) {
			var messageHtml = '<li class="message"><img class="userChatShield" src="' + 
			mc.userClan.badgeUrls.small + '" />' + '<p class="messageText">' +
			mc.username + ': ' + message.m + '</p></li>';
			chat.prepend(messageHtml);
		} else {
			var messageHtml = '<li class="oppMessage">' + message.m + ' - ' + message.un + '<img class="oppChatShield" src="' + mc.oppClan.badgeUrls.small + '" /></li>';
			chat.prepend(messageHtml);
		}	
	});
}]);
