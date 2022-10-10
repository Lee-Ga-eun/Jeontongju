'use strict';
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
    {
        id : {
            type : Number,
            required : [true, "아이디 필수"],
            unique : [true, "아이디 번호 중복 안됨"],
            trim : true,
            lowercase : true, 

        },
        전통주명 : {
            type : String,
            required : [true, "전통주명 필수"],
            unique : [true, "전통주명 중복 안됨"],
        },
        가격 : {
            type : Number,
        },
        용량 : {
            type : String,
        },
        주종 : {
            type : String,
            required : [true, "주종 필수"],
        },
        도수 : {
            type : Number,
            required : [true, "도수 필수"],
        },
        단맛 : {
            type : Number,
        },
        신맛 : {
            type : Number,
        },
        바디감 : {
            type : Number,
        },
        청량감 : {
            type : Number,
        },
        잘어울리는음식 : {
            type : String,
        },
        주원료 : {
            type : String,
        },
        이미지 : {
            data : Buffer,
            contentType : String,
        },
        img : {
            data : Buffer,
            contentType : String,
        },
    }, 
    {
        timestamps : true,
    },
)


module.exports = mongoose.model('Drink', UserSchema)