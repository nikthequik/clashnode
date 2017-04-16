angular.module('clashmash', ['ngRoute', 'ui.bootstrap'])
.config( ['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'views/signin.html',
		controller: 'WelcomeCtrl',
		controllerAs: 'hc'
	})
	.when('/home', {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl',
		controllerAs: 'hc'
	})
	.when('/clashRoom', {
		templateUrl: 'views/clashRoom.html',
		controller: 'MashCtrl',
		controllerAs: 'mc'
	})
	.when('/claninfo', {
		templateUrl: 'views/clanInfo.html',
		controller: 'ClanCtrl',
		controllerAs: 'cc'
	})
	.otherwise({
		templateUrl: 'views/signin.html'
	});
}]);
