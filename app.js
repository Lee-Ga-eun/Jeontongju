'use strict';
const express = require('express');
const app = express();
const db = require('./src/db.js'); //함수 export로 가져옴
const path = require("path");

const session = require('./src/auth/session.js');
const passport = require('./src/auth/passport/local.js');

const indexRouter = require('./src/routes/indexRouter.js');
const authRouter = require('./src/routes/authRouter.js');

app.set('views','./src/views');
app.set('view engine','ejs');

db();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "react-project/build")));
app.use(express.static( './src' )); 

session(app); //session함수 호출! 
passport(app);

app.use('/api/auth', authRouter(passport(app)));
app.use('/', indexRouter()); // /로 들어오는 모든 경로는 indexRouter가 처리함.





module.exports = app;