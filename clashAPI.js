var https = require('https');
var express = require('express');
var db = require('./data/mongoose');
var Message = require ('./data/models/MessageModel');
var mongoose = require('mongoose');

//Endpoints

var routes = function() {
  var clashRouter = require('express').Router();
  var apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjlhZTBjOTBkLTU4NTAtNGU2Mi05YzYwLWIzNjAwN2YxZjA5ZiIsImlhdCI6MTUwMTIxNDI0MCwic3ViIjoiZGV2ZWxvcGVyL2MxMDc1MDEzLWU2NmUtNzQ0Ni1lNjFjLWExODFhNTg5MGE5MSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEzLjg1LjE1LjE5NCIsIjIzLjk4LjIyMi4xOTEiLCIyMy45OC4yMjEuMTAiLCIyMy45OC4yMTcuMTUyIiwiMjMuOTguMjE3LjM1Il0sInR5cGUiOiJjbGllbnQifV19.6gkBBeHIUA-aQ9DBV2qK5iGOHFEL-vtb-cZ6aknSan2A6sVZEqOcRAShwi6DB0mi82eHRRk5ZLFmnU8oNfs03g';
  clashRouter.route('/player/:playerID') 
  .get(function (req, res) {
    var playerID = encodeURIComponent(req.params.playerID);

    var getPlayerInfo = function(playerID) {
      var url = 'api.clashofclans.com';
      var path = '/v1/players/' + playerID;
      var options = {
        host: url,
        path: path,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + apiKey
          },
        method: 'GET'
      };
      
      var playerReq = https.request(options, function(response) {
        console.log(response.reasonPhrase, response.statusCode);
        var data = '';
        response.on('data', function(clashRes) {
          console.log(clashRes);
          data += clashRes;
        })
        .on('error', function(error) {
        console.log(error);
        })
        .on('end', function(){
          return res.send(data);
        });
      });

      playerReq.end();
    };

    getPlayerInfo(playerID);
  });


  clashRouter.route('/clan/:clanID')
  .get(function (req, res) {
      var clanID = encodeURIComponent(req.params.clanID);

      var getClanInfo = function(clanID) {
        var url = 'api.clashofclans.com';
        var path = '/v1/clans/' + clanID;
        var options = {
          host: url,
          path: path,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + apiKey
          },
          method: 'GET'
        };
        var clanReq = https.request(options, function(response) {
          var data = '';
          console.log(response.reasonPhrase, response.statusCode);
          response.on('data', function(clanRes) {
            data += clanRes;
          })
          .on('error', function(error) {
            console.log(error);
          })
          .on('end', function() {
            return res.send(data);
          });
        });

        clanReq.end();        
      };
      
      getClanInfo(clanID);
  });

  clashRouter.route('/messages/:clanId')
  .get(function(req, res) {
    Message.find({clanTag: req.params.clanId}, function(err, messages) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(messages);
        res.status(200).json(messages);
      }
    });
  })
  // .post(function(req, res) {
    
  // })
  .delete(function(req, res) {
    console.log('delete');
    Message.remove({}, function(err) {
      if (err) {
        res.status(500).send();
      }
      else {
        res.status(202).send();
      }
      
    });
  });

  clashRouter.route('*')
  .get(function(req, res) {
    //res.sendFile('/Users/charlemagne/Dropbox/Projects/clashnode/public/index.html');
    res.sendFile('D:\home\site\wwwroot\public\index.html');
  });

  return clashRouter;
};

module.exports = routes;