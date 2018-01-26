var socket_io = require('socket.io');
var mongoose = require('./js/data/mongoose');
var clashAPI = require('./js/clashAPI.js');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use('*', function(req, res) {
//   // Just send the index.html for other files to support HTML5Mode
//   res.sendFile('/public/index.html', { root: __dirname });
// });

var server = http.Server(app);
var io = socket_io.listen(server);
var Message = require('./js/data/models/MessageModel');
var db = require('./js/data/mongoose')('clashmash');

clashRouter = require('./js/clashAPI')();

app.use('/', clashRouter);

//Socket IO

io.on('connection', function (socket) {

  console.log('Client connected');
  
  socket.once('disconnect', function () {
    console.log('Client disconnected');
    socket.broadcast.emit('countdown', io.engine.clientsCount);
  });

  socket.on('message', function (message) {
    //db(message.clanTag);
    var newMessage = new Message(message);
    newMessage.save(function(err) {
      if (err) throw err;

      console.log('Message stored!');
    });
    console.log('Received message:', message);
    io.emit('message', message);
  });
});
server.listen(process.env.PORT || 3000);