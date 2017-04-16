
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '129.121.176.177',
    user     : 'clashmas_nik',
    password : 'w00dst0ck'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});



