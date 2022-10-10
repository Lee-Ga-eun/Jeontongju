'use strict';
const mongoose = require('mongoose');

const ImgSchema = new mongoose.Schema(
    {
        
        img : {
            data : Buffer,
            contentType : String,
        },
    }, 
    {
        timestamps : true,
    },
)


module.exports = mongoose.model('Img', ImgSchema)