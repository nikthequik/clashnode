var app = angular.module('clashmash')
.controller('HomeCtrl', [function() {
	var hc = this;
	hc.userInfo = JSON.parse(localStorage.getItem('userInfo'));
	
}]);