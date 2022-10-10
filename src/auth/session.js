'use strict';

module.exports = (app) => {
    const session = require('express-session');
    const FileStore = require('session-file-store')(session);

    app.use(session({
        secret : '$!#$!#$!#',
        resave : false,
        saveUninitialized : false,
        store : new FileStore(),
    }))

    return session; // session module활성화!
}