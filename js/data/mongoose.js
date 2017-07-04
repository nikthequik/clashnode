var mongoose = require('mongoose');
var cred = require('../credential.js');

var un = cred.username;
var pw = cred.pWord;

var createConnection = function() {
    var dburl = 'mongodb://clashmash:' + pw + 
    '@clashmash.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';

    console.log(dburl);
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('We\'re, connected!');
    });
    var mongodb = mongoose.connect(dburl);
    return db;
};

module.exports = createConnection;





