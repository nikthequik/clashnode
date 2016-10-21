//Dependencies
var express = require('express');
var router = express.Router();
var routes = require('./routes');
var api = require('./public/api');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
/*var socket = require('socket.io-client')('http://localhost');*/
var http = require('http');
var https = require('https');
var path = require('path');
var socket_io = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socket_io(server);

console.log(io, socket_io);
//Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser());
/*app.use(express.methodOverride());*/
/*app.use(app.router);*/
/*app.use(express.static(path.join(__dirname, 'public')));*/
app.use(express.static('public'));

//Development only
/*if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}*/

//Routes
app.get('/', routes.index);
/*app.get('/socket.io/socket.io.js', routes.socketIO);*/
app.get('/clashRoom', routes.clashRoom);

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
           Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjZmZGMwZjk1LWE1MjAtNDY4Mi04MDMzLTdmNDljMDU1NWVmMCIsImlhdCI6MTQ3Njc2MjIzNCwic3ViIjoiZGV2ZWxvcGVyL2MxMDc1MDEzLWU2NmUtNzQ0Ni1lNjFjLWExODFhNTg5MGE5MSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjY3LjE2NC4xNjUuMjA5Il0sInR5cGUiOiJjbGllbnQifV19.Kir-M4YvNoxGqcA_Ao5S7iive_tL-nr7_iLJoeVoGc9Lnyda6pTbc00UTWpyjR5VZa8Q7x01mNlte_hYh5Qm9A'
         },
         method: 'GET'
     };
     var str = '';
     var req = https.request(options, function(response) {
         console.log(response.statusMessage, response.statusCode);
         response.on('data', function(res) {
           str += res;
         });
         response.on('end', function () {
           res.send(str);
         });
     });
     req.end();
   };
  getClan(encodeURIComponent(req.params.clanID));
  /*getClan(req.params.clanID);*/
});

/*io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('enter', function() {
    console.log('client connected');
  })
});*/

io.on('connection', function (socket) {
    console.log('Client connected');

    socket.once('disconnect', function() {
        console.log('Client disconnected');
        socket.broadcast.emit('countdown', io.engine.clientsCount);
    });

    socket.on('enter', function(count) {
        socket.broadcast.emit('newConnect', io.engine.clientsCount);
        socket.emit('welcome', io.engine.clientsCount);
    });
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
