const mongoose = require('mongoose')

var user = new mongoose.Schema({
    avatar:String,
    nickname:String,
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    desc:String,
    job:Number,
    phone:String,
    sex:Number
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('user',user)