var socket_io = require('socket.io');
var mongoose = require('mongoose');
var http = require('http');
var https = require('https');
var db = require('./db');
var express = require('express');
var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

app.get('/clans/:clanID', function(req, res) {
  console.log(req.params.clanID);
    var getClan = function(clanID) {
      var url = 'api.clashofclans.com';
      var path = '/v1/clans/' + clanID;
      var options = {
        host: url,
        path: path,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjllZTcyNDU3LWQzZGEtNDI1OS04ZWE2LTg3MmFkYmYyMGJiNSIsImlhdCI6MTQ4Mjk3NDAyNywic3ViIjoiZGV2ZWxvcGVyL2MxMDc1MDEzLWU2NmUtNzQ0Ni1lNjFjLWExODFhNTg5MGE5MSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEyOS4xMjEuMTc2LjE3NyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.lFuzwdToBqWiMAHPv36MAqA0Kdehrcfft9uftGLsNIykH5ou9NfBIlD2mbbKesfWYhUl9-jEXXA5DhDLqxf8hw'
        },
        method: 'GET'
      };
      var str = '';
      var clanRequest = https.request(options, function(response) {
        console.log(response.statusMessage, response.statusCode);
        response.on('data', function(res) {
          str += res;
        });
        response.on('end', function () {
          res.send(str);
        });
      });
      clanRequest.end();
    };
  getClan(encodeURIComponent(req.params.clanID));
});

io.on('connection', function (socket) {

    console.log('Client connected');

    socket.once('disconnect', function() {
        console.log('Client disconnected');
        socket.broadcast.emit('countdown', io.engine.clientsCount);
    });

    socket.on('message', function(message) {
        console.log('Received message:', message);
        io.emit('message', message);
    });
});

server.listen(process.env.PORT || 3000);