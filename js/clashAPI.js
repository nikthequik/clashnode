var https = require('https');
var Promise = require('promise');

exports.getClanInfo = function(clanID, res) {
    var url = 'api.clashofclans.com';
    var path = '/v1/clans/' + clanID;
    var options = {
      endpoint: res,
      host: url,
      path: path,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjY2YjExYWI3LTZhODItNDBjMS1iMzY3LTliNDdjMzk2ODdjZSIsImlhdCI6MTQ5MjMwNDY1Nywic3ViIjoiZGV2ZWxvcGVyL2MxMDc1MDEzLWU2NmUtNzQ0Ni1lNjFjLWExODFhNTg5MGE5MSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjI0LjguODIuMTU0IiwiMTI5LjEyMS4xNzYuMTc3Il0sInR5cGUiOiJjbGllbnQifV19.cYgyAU81S_oGkTJtYvrBCv24BpbpvF8fOdMzPn1Wq_dSigTH3_lq2-_qBvERbLT47bf8zhywfnJyhUkZF6nodg'
      },
      method: 'GET'
    };
    return https.request(options, function(response) {
      console.log(response.statusMessage, response.statusCode);
      response.on('data', function(res) {
        str += res;
      });
  });
};

exports.getPlayerInfo = function(playerID, res) {
    var url = 'api.clashofclans.com';
    var path = '/v1/players/' + playerID;
    var options = {
      endpoint: res,
      host: url,
      path: path,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjY2YjExYWI3LTZhODItNDBjMS1iMzY3LTliNDdjMzk2ODdjZSIsImlhdCI6MTQ5MjMwNDY1Nywic3ViIjoiZGV2ZWxvcGVyL2MxMDc1MDEzLWU2NmUtNzQ0Ni1lNjFjLWExODFhNTg5MGE5MSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjI0LjguODIuMTU0IiwiMTI5LjEyMS4xNzYuMTc3Il0sInR5cGUiOiJjbGllbnQifV19.cYgyAU81S_oGkTJtYvrBCv24BpbpvF8fOdMzPn1Wq_dSigTH3_lq2-_qBvERbLT47bf8zhywfnJyhUkZF6nodg'
      },
      method: 'GET'
    };
    return https.request(options, function(response) {
      console.log(response.statusMessage, response.statusCode);
      response.on('data', function(clashRes) {
        options.endpoint.send(clashRes);
      });
    });
};

