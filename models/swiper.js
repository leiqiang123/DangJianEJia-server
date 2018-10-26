const mongoose = require('mongoose')

var swiper = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    },
    newsId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'news',
        required:true
    },
    sort:{
        type:Number,
        default:1
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('swiper',swiper)