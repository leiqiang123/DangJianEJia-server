const mongoose = require('mongoose')

var topic = new mongoose.Schema({
    commentCount:Number,
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    forum:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'forum'
        }
    ]
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('topic',topic)