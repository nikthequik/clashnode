var mongoose = require('mongoose');
var cred = require('../credential.js');
var un = cred.username;
var pw = cred.pWord;


var Schema = mongoose.Schema;
var MessageSchema = new Schema({
    message: String,
    createdDate: { type: Date, default: Date.now },
    author: String
});

var RoomSchema = new Schema({
    roomID: String,
    clanID: [String],
    created: { type: Date, default: Date.now },
    history: [MessageSchema]
});

var Room = mongoose.model('Room', RoomSchema);

var dburl = 'mongodb://nikthequik:' + pw + '@cluster0-shard-00-00-fnmq6.mongodb.net:27017,cluster0-shard-00-01-fnmq6.mongodb.net:27017,cluster0-shard-00-02-fnmq6.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

console.log(dburl);

//exports.mongo = function() {
    mongoose.connect(dburl);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('We\'re, connected!');
    });
//}





