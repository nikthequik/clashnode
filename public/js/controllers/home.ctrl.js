var app = angular.module('clashmash')
.controller('HomeCtrl', [function() {
	var cc = this;
	cc.userInfo = JSON.parse(localStorage.getItem('userInfo'));
}]);