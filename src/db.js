'use strict';
const mongoose = require('mongoose');

require('dotenv').config({path : './src/env/variables.env' });
const {DB_URL} = process.env;

async function DB(){
    let db = await mongoose.connect(DB_URL, {
        useNewUrlParser : true,
    })
    return console.log('db연결')
}

module.exports = DB;