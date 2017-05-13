var socket_io = require('socket.io');
//var mongoose = require('./js/data/mongoose');
var clashAPI = require('./js/clashAPI.js');
var http = require('http');
var https = require('https');
var express = require('express');
var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

//Endpoints

app.get('/player/:playerID', function (req, res) {
  var playerReq = clashAPI.getPlayerInfo(encodeURIComponent(req.params.playerID), res);
  playerReq.end();
});

app.get('/clan/:clanID', function (req, res) {
  var clanReq = clashAPI.getClanInfo(encodeURIComponent(req.params.clanID), res);
  clanReq.end();
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