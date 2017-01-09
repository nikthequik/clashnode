var cred = require('./credential.js');
process.env.NODE_ENV = 'production';
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://'+ cred.userName + ':' + cred.pWord + '@ds047146.mlab.com:47146/messages' :
                            'mongodb://'+ cred.userName + ':' + cred.pWord + '@ds047146.mlab.com:47146/messages-dev');
exports.PORT = process.env.PORT || 3000;