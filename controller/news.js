var express = require('express')
var router = express.Router()
var newsModel = require('../models/news')
var auth = require('./auth')

//添加新闻
router.post('/news', auth, async (req, res, next) => {
    try{
        const {
            title,
            content,
            contentText,
            img,
            author,
            type,
            look_num
        } = req.body
        const news = await newsModel.create({
            title,
            content,
            contentText,
            img,
            author,
            type,
            look_num
        })

        res.json({
            code:200,
            msg:'新闻新建成功'
        })
    } catch(err) {
        next(err)
    }
})

//获取新闻
router.get('/news', async (req, res, next) => {
    try{
        let {page=1, size=10} = req.params
        page = parseInt(page)
        size = parseInt(size)
        const data = await newsModel.find()
            .limit(size)
            .skip((page-1)*size)
            .sort({_id:-1})
            .populate({
                path:'author',
                select:'-password'
            })
            .populate({
                path:'type'
            })
        res.json({
            code:200,
            data,
            msg:'success'
        })
    } catch(err) {
        next(err)
    }
})

//获取单条新闻
router.get('/news/:id', async (req, res, next) => {
    try{
        let {id} = req.params
        const data = await newsModel.findById(id)
            .populate({
                path:'user',
                select:'-password'
            }).populate({
                path:'category'
            })
        res.json({
            code:200,
            data,
            msg:'success'
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router