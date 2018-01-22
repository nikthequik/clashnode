(function() {angular.module('clashmash', ['ngRoute', 'ui.bootstrap'])
	.config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
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
		.when('/profile', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'hc'
		})
		.when('/progress', {
			templateUrl: 'views/progress.html',
			controller: 'ProgCtrl',
			controllerAs: 'pc'
		})
		.otherwise({
			templateUrl: 'views/welcome.html'
		});

		$locationProvider.html5Mode(true);
	}])
})();
