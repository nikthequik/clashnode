/*var firebase = require('../bower_components/firebase/firebase');
var credentials = require('../js/credential');
exports.sendToDb = function(req, res) {
	console.log(req);
	var auth = firebase.auth();
	auth.signInWithEmailAndPassword(credentials.email, credentials.password)
	.then(function(user) {
		console.log(user);
		var clanRef = firebase.database().ref('clans'); 
		clanRef.on('child_added', function(data) { 
			console.log(data.val().text);
		});

		var postData = { id: '#' + req.clanId, username : req.username, password : req.pword};
		// Get a key for a new Post.
		var newPostKey = firebase.database().ref('clans').push().key;
		// Write the new post's data simultaneously in the posts list and the user's post list. 
		var updates = {}; 
		updates[newPostKey] = postData; 
		firebase.database().ref('clans').update(updates);
		res.type('text/plain');
		res.send('I am a beautiful butterfly');
	});
};*/