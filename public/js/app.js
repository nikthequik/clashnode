angular.module('clashmash', ['ngRoute', 'ui.bootstrap'])
.config( ['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'views/welcome.html',
		controller: 'WelcomeCtrl',
		controllerAs: 'wc'
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
	.when('/clan', {
		templateUrl: 'views/clanInfo.html',
		controller: 'ClanCtrl',
		controllerAs: 'cc'
	})
	.otherwise({
		templateUrl: 'views/welcome.html'
	});
}]);
