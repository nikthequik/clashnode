var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var RoomModel = new Schema({
    roomID: {type: String},
    clanID: {type: String},
    created: { type: Date, default: Date.now },
    history: [MessageModel]
});

module.exports = mongoose.model('Room', RoomModel);