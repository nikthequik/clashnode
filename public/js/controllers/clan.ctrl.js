var app = angular.module('clashmash')
.controller('ClanCtrl', [function() {
	var cc = this;
	cc.userClan = JSON.parse(localStorage.getItem('userClan'));
}]);