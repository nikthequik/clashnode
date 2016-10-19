
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./public/api');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var path = require('path');
var firecon = require('./firebaseCon');

var app = express();

// all environments
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
/*firecon();*/
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

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
})



http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
