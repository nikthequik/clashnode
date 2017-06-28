var mongoose = require('mongoose');
var cred = require('../credential.js');

var un = cred.username;
var pw = cred.pWord;

var createConnection = function(database) {
    var dburl = 'mongodb://nikthequik:' + pw + 
    '@cluster0-shard-00-00-fnmq6.mongodb.net:27017,cluster0-shard-00-01-fnmq6.mongodb.net:27017,cluster0-shard-00-02-fnmq6.mongodb.net:27017/' + database + 
    '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

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





