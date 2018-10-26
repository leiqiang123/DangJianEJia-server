const mongoose = require('mongoose')

var news = new mongoose.Schema({
    title:String,
    content:String,
    contentText:String,
    img:String,
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    type:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'category'
    },
    look_num:{
        type:Number,
        default:0
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('news',news)