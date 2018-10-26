var express = require('express')
var router = express.Router()
var swiperModel = require('../models/swiper')
var auth = require('./auth')

//添加一个轮播图
router.post('/swiper', auth, async (req, res, next) => {
    try{
        const {
            title,
            imgUrl,
            status,
            newsId,
            sort
        } = req.body
        const data = await swiperModel.create({
            title,
            imgUrl,
            status,
            newsId,
            sort
        })
        res.json({
            code:200,
            data,
            msg:'success'
        })
    }catch(err) {
        next(err)
    }
})

//获取轮播图

router.get('/swiper', async (req, res, next) => {
    try{
        let {page=1, size=10} = req.params
        page = parseInt(page)
        size = parseInt(size)
        const data = await swiperModel.find()
            .skip((page-1)*size)
            .limit(size)
            .populate({
                path:'newsId'
            })
            .sort({_id:-1})
        res.json({
            code:200,
            data,
            msg:'success'
        })
    }catch(err) {
        next(err)
    }
})

//查找单条轮播图
router.get('/swiper/:id', auth, async (req, res, next) => {
    try{
        let {id} = req.params
        const data = await swiperModel.findById(id)
            .populate({
                path:'newsId'
            })
        res.json({
            code:200,
            data,
            msg:'success'
        })
    }catch(err) {
        next(err)
    }
})

//修改单挑轮播图
router.patch('/swiper/:id', auth, async (req, res, next) => {
    try{
        const {id} = req.params
        const{
            title,
            imgUrl,
            status,
            newsId,
            sort
        } = req.body
        const data = await swiperModel.findById(id)
        await data.update({
            $set:{
                title,
                imgUrl,
                status,
                newsId,
                sort
            }
        })
        res.json({
            code:200,
            msg:'修改轮播图成功'
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router