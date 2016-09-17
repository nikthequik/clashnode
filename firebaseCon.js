// Initialize Firebase
var firebase = require('./public/bower_components/firebase/firebase');

module.exports = function() {
    var config = {
		apiKey: "AIzaSyA7guuUSqtVPZFDFhrq3Fu-U33lDuEejzM",
		authDomain: "clashmash-30849.firebaseapp.com",
		databaseURL: "https://clashmash-30849.firebaseio.com",
		storageBucket: "clashmash-30849.appspot.com",
	};
	console.log(firebase);
	/*firebase.initializeApp(config);*/
};