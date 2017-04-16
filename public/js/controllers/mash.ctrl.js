var app = angular.module('clashmash')
.controller('MashCtrl', [function() {
	var mc = this;
	mc.username = localStorage.getItem('username');
	var chat = angular.element(document.querySelector('#chat'));
	var socket = io();
	console.log(JSON.parse(localStorage.getItem('userClan')));
	mc.userInfo = JSON.parse(localStorage.getItem('playerInfo'))
	mc.userClan = JSON.parse(localStorage.getItem('userClan'));
	mc.oppClan = JSON.parse(localStorage.getItem('oppClan'));
	mc.members = mc.oppClan.memberList;
	
	mc.postMessage = function() {
		socket.emit('message', {
			cn: mc.userClan.name,
			un: mc.username,
			m: mc.messageText,
			d: new Date()
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