var socket_io = require('public/socket.io/socket.io.js');
var http = require('http');
var https = require('https');
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
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk1NjMxYzY2LWMyMjItNDJmMi1hY2MyLTgwODhhNWYyMjIzYyIsImlhdCI6MTQ4MjM4Mjk5Miwic3ViIjoiZGV2ZWxvcGVyL2MxMDc1MDEzLWU2NmUtNzQ0Ni1lNjFjLWExODFhNTg5MGE5MSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEyOS4xMjEuMTQzLjE0NSIsIjY3LjE2NC4xNjUuMjA5Il0sInR5cGUiOiJjbGllbnQifV19.1BriqMNbnVZ2FZcmVyc_8kyZNalQqaagAEF3Ends2SX0leA_y0B-HuH3eswRigcb-IJjymAyui_4tCzO3xy4Cg'
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