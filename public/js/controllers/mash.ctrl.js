var app = angular.module('clashmash')
.controller('MashCtrl', ['$http', function($http) {
	var mc = this;
	var chat = angular.element(document.querySelector('#chat'));
	var socket = io.connect();

	mc.userInfo = JSON.parse(localStorage.getItem('userInfo'))
	mc.clanInfo = JSON.parse(localStorage.getItem('clanInfo'));
	mc.oppClan = JSON.parse(localStorage.getItem('oppClan'));
	mc.members = mc.clanInfo.memberList;
	mc.username = mc.userInfo.name;

	mc.getMessageHistory = function() {
		$http.get('/messages/' + mc.clanInfo.tag.substring(1))
			.then(function (res) {
				
				// mc.messageHistory = res;
				if (res.data[0].author) {
					for (i=0; i < res.data.length; i++) {
						var messageHtml = '<li class="message animated bounceInLeft"><img class="userChatShield" src="' + 
							mc.clanInfo.badgeUrls.small + '" />' + '<p class="messageText">' +
							res.data[i].author + ': ' + res.data[i].message + '</p></li>';
						chat.prepend(messageHtml);
					}
				}
				
				//console.log(mc.messageHistory);
			}, function (err) {
				console.log(err);
				
			});
	};
	mc.getMessageHistory();
	
	mc.postMessage = function() {
		socket.emit('message', {
			clan: mc.clanInfo.name,
			clanTag: mc.clanInfo.tag.substring(1),
			author: mc.username,
			message: mc.messageText,
			created : new Date()
		});
		mc.messageText = '';
	};

	socket.on('message', function(message) {
		console.log(message);
		if (message.clan === mc.clanInfo.name) {
			var messageHtml = '<li class="message animated bounceInLeft"><img class="userChatShield" src="' + 
			mc.clanInfo.badgeUrls.small + '" />' + '<p class="messageText">' +
			mc.username + ': ' + message.message + '</p></li>';
			chat.prepend(messageHtml);
		} else {
			var messageHtml = '<li class="oppMessage">' + 
				message.message + ' - ' + message.author + 
				'<img class="oppChatShield" src="' + 
				mc.oppClan.badgeUrls.small + '" /></li>';
			chat.prepend(messageHtml);
		}	
	});
}]);