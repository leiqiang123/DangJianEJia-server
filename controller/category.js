var express = require('express')
var router = express.Router()
var categoryModel = require('../models/category')
var auth = require('./auth')

router.post('/category', auth, async (req, res, next) => {
    try{
        const {title, icon} = req.body
        const data = await categoryModel.create({title,icon})
        res.json({
            code:200,
            msg:'success'
        })
    }catch(err) {
        next(err)
    }
})

router.get('/category', async (req, res, next) => {
    try{
        const data = await categoryModel.find()
        res.json({
            code:200,
            data,
            msg:'success'
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router