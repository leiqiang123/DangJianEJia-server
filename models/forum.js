const mongoose = require('mongoose')

var forum = new mongoose.Schema({
    content:String,
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    topic:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'topic'
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('forum',forum)