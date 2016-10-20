//Dependencies
var express = require('express');
var router = express.Router();
var routes = require('./routes');
var api = require('./public/api');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var path = require('path');
var socket_io = require('socket.io');
var firecon = require('./firebaseCon');
var app = express();
var server = http.Server(app);
var io = socket_io(server);

//Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
/*app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());*/
app.use(bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
/*app.use(require('stylus').middleware(path.join(__dirname, 'public')));*/
app.use(express.static(path.join(__dirname, 'public')));

//Development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//
app.get('/', routes.index);

app.get('/clashRoom', routes.clashRoom);

app.get('/clans/:clanID', function(req, res) {
  console.log(req.params.clanID);
  
  getClan(encodeURIComponent(req.params.clanID));
})



http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
