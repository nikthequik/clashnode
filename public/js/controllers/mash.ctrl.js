var app = angular.module('clashmash')
.controller('MashCtrl', [function() {
	var mc = this;
	
	console.log(mc.username);
	var chat = angular.element(document.querySelector('#chat'));
	var socket = io({transports: ['websocket']});

	mc.userInfo = JSON.parse(localStorage.getItem('userInfo'))
	mc.clanInfo = JSON.parse(localStorage.getItem('clanInfo'));
	mc.oppClan = JSON.parse(localStorage.getItem('oppClan'));
	mc.members = mc.clanInfo.memberList;
	mc.username = mc.userInfo.name;
	
	mc.postMessage = function() {
		socket.emit('message', {
			cn: mc.clanInfo.name,
			un: mc.username,
			m: mc.messageText,
			d: new Date()
		});
		mc.messageText = '';
	};

	socket.on('message', function(message) {
		if (message.cn === mc.clanInfo.name) {
			var messageHtml = '<li class="message"><img class="userChatShield" src="' + 
			mc.clanInfo.badgeUrls.small + '" />' + '<p class="messageText">' +
			mc.username + ': ' + message.m + '</p></li>';
			chat.prepend(messageHtml);
		} else {
			var messageHtml = '<li class="oppMessage">' + 
				message.m + ' - ' + message.un + 
				'<img class="oppChatShield" src="' + 
				mc.oppClan.badgeUrls.small + '" /></li>';
			chat.prepend(messageHtml);
		}	
	});
}]);