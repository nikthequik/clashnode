
angular.module('home', ['firebase', 'ngRoute'])
.config( ['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '../views/home.html',
		controller: 'HomeCtrl',
		controllerAs: 'hc'
	})
	.when('/clashRoom', {
		templateUrl: 'views/clash.html',
		controller: 'MashCtrl',
		controllerAs: 'mc'
	});
	
}])
.controller('HomeCtrl', ['$http', '$firebaseObject', '$location', function($http, $firebaseObject, $location){
	
  	var hc = this;
	var auth = firebase.auth();
	var provider = new firebase.auth.EmailAuthProvider();
	hc.sendToDb = function() {
		
		console.log('fire', hc.clanID);
		var url = 'clans/' + encodeURIComponent(hc.clanID);
		$http.get(url)
		.then(function(res) {
			console.log(res);
		});

	};
  	
  	hc.getFromDb = function() {
  		auth.signInWithEmailAndPassword(email, password)
  		.then(function(user){
  			var clanRef = firebase.database().ref('clans');
  			clanRef.on('value', function(snap) {
  				console.log(user);
  				hc.original = snap.val().text;
  			})
  		});
  	};
}]);