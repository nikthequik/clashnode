var socket_io = require('socket.io');
//var mongoose = require('./js/data/mongoose');
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
var server = http.Server(app);
var io = socket_io(server);

clashRouter = require('./js/clashAPI')();

app.use('/', clashRouter);
// app.use()

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