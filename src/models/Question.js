'use strict';
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
    {
        id : {
            type : String,
            required : [true, "아이디 필수"],
            unique : [true, "아이디 중복 안됨"],
            trim : true,
            lowercase : true, 

        },
        content : {
            type : String,
            required : [true, "질문 필수"],
            unique : [true, "질문 중복 안됨"],
        },
        answer1 : {
            type : String,
            required : [true, "문답1 필수"],
        },
        answer2 : {
            type : String,
            required : [true, "문답2 필수"],
        },
        
    }, 
    {
        timestamps : true,
    },
)


module.exports = mongoose.model('Question', UserSchema)