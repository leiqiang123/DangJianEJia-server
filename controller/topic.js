var express = require('express')
var router = express.Router()
var topicModel = require('../models/topic')
var auth = require('./auth')

router.post('/topic', auth, async (req, res, next) => {
    try{
        const {content} = req.body
        const userId = req.session.user._id

        const data = await topicModel.create({
            content,
            user:userId
        })
        res.json({
            code:200,
            msg:'success',
            data
        })
    }catch(err) {
        next(err)
    }
})

router.get('/topic', auth, async (req, res, next) => {
    try{
        let {page=1, size=10} = req.query
        page = parseInt(page)
        size = parseInt(size)
        const count = await topicModel.count()
        const data = await topicModel.find()
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