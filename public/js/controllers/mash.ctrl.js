(function() {
	var app = angular.module('clashmash')
	.controller('MashCtrl', ['$http', 'messageHistory', function($http, messageHistory) {
		var mc = this;
		var chat = angular.element(document.querySelector('#chat'));
		var socket = io.connect();

		mc.userInfo = JSON.parse(localStorage.getItem('userInfo'))
		mc.clanInfo = JSON.parse(localStorage.getItem('clanInfo'));
		mc.oppClan = JSON.parse(localStorage.getItem('oppClan'));
		mc.members = mc.clanInfo.memberList;
		mc.username = mc.userInfo.name;
		mc.messages = messageHistory.getMessageHistory(mc.clanInfo.tag);
		
		//Fetch message history
		if (chat[0].childElementCount < 2) {
			mc.messages.then(function(messages) {
				for (i=0; i < messages.data.length; i++) {
					var messageHtml = '<li class="message animated bounceInLeft"><img class="userChatShield" src="' + 
						mc.clanInfo.badgeUrls.small + '" />' + '<p class="messageText">' +
						messages.data[i].author + ': ' + messages.data[i].message + '</p></li>';
					chat.prepend(messageHtml);
				}
			})
		}

		//Socket IO
		
		//Emit message to others in chat
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

		//Respond to incoming message
		socket.on('message', function(message) {
			if (message.clan === mc.clanInfo.name) {
				var messageHtml = '<li class="message animated bounceInLeft"><img class="userChatShield" src="' + 
				mc.clanInfo.badgeUrls.small + '" />' + '<p class="messageText">' +
				message.author + ': ' + message.message + '</p></li>';
				chat.prepend(messageHtml);
			} else {
				var messageHtml = '<li class="oppMessage">' + 
					message.message + ' - ' + message.author + 
					'<img class="oppChatShield" src="' + 
					mc.oppClan.badgeUrls.small + '" /></li>';
				chat.prepend(messageHtml);
			}	
		});

		//Dynamic Height TODO
		

		
	}]);
})();
