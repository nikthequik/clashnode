module.exports = {
    //Connect to MongoDB

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

    var dburl = 'mongodb://' + un + ':' + pw + '@ds157258.mlab.com:57258/messages';


    mongoose.connect(dburl);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log('We\'re, connected!');
    });
};

