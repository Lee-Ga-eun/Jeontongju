'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema(
    {
        id : {
            type : String,
            required : [true, "아이디 필수"],
            unique : [true, "same 아이디 중복 안됨"],
            trim : true,
            lowercase : true, 

        },
        password : {
            type : String,
            required : [true, "비밀번호 필수"],
            minlength : 2,
            maxlength : 12,
        },
        name : {
            type : String,
            minlength: 2,
            maxLength: 8,
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

UserSchema.pre('save', function(next){
    const user = this
  
    if(user.isModified('password')) {
      bcrypt.genSalt(saltRounds, function(err, salt){
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash){
          if (err) return next(err)
          user.password = hash
          next()
      })
    })
    }
    
  })

module.exports = mongoose.model('User', UserSchema)