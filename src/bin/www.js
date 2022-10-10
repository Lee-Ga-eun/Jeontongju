'use strict';
const app = require('../../app.js');

require('dotenv').config({path : './src/env/variables.env' });
const {PORT} = process.env || 3000;


/**
 * 
 * 
 * @param {*} portNumber : 함수 port 번호
 * @returns : 서버 연결 문장
 */

async function start(portNumber){
    const server = await app.listen(portNumber);
    return console.log("서버 오픈");
}

start(PORT);