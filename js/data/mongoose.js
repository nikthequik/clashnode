var mongoose = require('mongoose');
var cred = require('../credential.js');

var un = cred.username;
var pw = cred.pWord;

var createConnection = function() {
    var dburl = 'mongodb://clashmash:' + pw + 
    '@clashmash.documents.azure.com:10255/clashmash?ssl=true';//&replicaSet=globaldb'; Temporary fix to prevent destruction of pool
    
    var mongodb = mongoose.connect(dburl, function(err) {
        if (err) throw err;
    });
    mongoose.connection.once('open', function() {
        console.log('We\'re, connected!');
    });
    return mongodb;
};

module.exports = createConnection;




