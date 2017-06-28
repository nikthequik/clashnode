var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageModel = new Schema({
    clan: String,
    clanTag: String,
    author: String,
    message: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageModel);