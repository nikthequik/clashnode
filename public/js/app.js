
angular.module('home', ['firebase', 'ngRoute'])
.config( ['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'view/home.html',
		controller: 'HomeCtrl',
		controllerAs: 'hc'
	})
	.when('/clashRoom', {
		templateUrl: 'view/clash.html',
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
  	/*hc.getFromDb();*/

	

	/*hc.test = "test";
	hc.display = function() {
		console.log(hc.clanID, hc.username, hc.pword);
	};
	hc.data = $http({
		method: 'GET', 
		url: 'https://api.clashofclans.com/v1/clans', 
		headers: {
		'Accept': 'application/json',
	    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjZjNzIwNzc3LWVhMDEtNDY5OC05MjE5LTY2NmYyYzQyZmI3NCIsImlhdCI6MTQ3Mjc3ODA4NSwic3ViIjoiZGV2ZWxvcGVyL2MxMDc1MDEzLWU2NmUtNzQ0Ni1lNjFjLWExODFhNTg5MGE5MSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjY3LjE2NC4xNjUuMjA5Il0sInR5cGUiOiJjbGllbnQifV19.MhZmwubEdQUfI-SLdX2-IguPayRmv9uOLvVi2D9G3V9XHSsusEyQkHkXWavUgXoq-UkePsU_bfYhp2kQx-WkOw', 
		},
		params: {
			'name': 'detroit'
		}
	}).then(function(res) {
		hc.data = res;
	});*/
	/*console.log(hc.data);*/
}]);