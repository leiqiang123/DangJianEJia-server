const mongoose = require('mongoose')

var category = new mongoose.Schema({
    title:String,
    icon:String
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('category',category)