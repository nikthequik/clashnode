var socket_io = require('socket.io');
var mongoose = require('./js/data/mongoose');
var http = require('http');
var https = require('https');
var express = require('express');
var clashAPI = require('./js/clashAPI');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

//Endpoints

app.get('/player/:playerID', function (req, res) {
  clashAPI.getPlayerInfo(encodeURIComponent(req.params.playerID))
  .then(function(result){
    res.send(result);
  });
});

app.get('/clan/:clanID', function (req, res) {
  console.log(req.params.clanID);
  clashAPI.getClanInfo(encodeURIComponent(req.params.clanID))
  .then(function(result){
    res.send(result);
  });
});

//Socket IO

io.on('connection', function (socket) {

  console.log('Client connected');
  
  socket.once('disconnect', function () {
    console.log('Client disconnected');
    socket.broadcast.emit('countdown', io.engine.clientsCount);
  });

  socket.on('message', function (message) {
    console.log('Received message:', message);
    io.emit('message', message);
  });
});

server.listen(process.env.PORT || 3000);