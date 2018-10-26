var express = require('express')
var router = express.Router()
var forumModel = require('../models/forum')
var topicModel = require('../models/topic')
var auth = require('./auth')

router.post('/forum', auth, async (req, res, next) => {
    try{
        const {content, topic_id} = req.body
        const userId = req.session.user._id

        const topic = await topicModel.findById(topic_id)
        let forum
        if(topic){
            forum = await forumModel.create({
                content,
                user:userId,
                topic:topic._id
            })

            await topic.update({$push: {forum: forum._id}})
            // await topic.save()

            res.json({
                code:200,
                msg:'success',
                data:forum
            })
        }else{
            res.json({
                code:400,
                msg:'没有找到该主题'
            })
        }
        
    }catch(err) {
        next(err)
    }
})

router.get('/forum', auth, async (req, res, next) => {
    try{
        let {page=1, size=10} = req.query
        page = parseInt(page)
        size = parseInt(size)
        const count = await forumModel.count()
        const data = await forumModel.find()
            .skip((page-1)*size)
            .limit(size)
            .sort({_id:-1})
            .populate({
                path:'user',
                select:'-password'
            })
        res.json({
            code:200,
            msg:'success',
            data,
            count
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router