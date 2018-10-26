var express = require('express')
var router = express.Router()
var userModel = require('../models/user')
var auth = require('./auth')


//注册模块
router.post('/user', auth, async (req, res, next) => {
    try{
        const {
            avatar,
            username,
            password,
            nickname,
            desc,
            job,
            phone,
            sex
        } = req.body
        const userInfo = await userModel.findOne({username})
        if(userInfo){
            res.json({
                code:403,
                msg:'该用户已存在'
            })
        }else{
            if(password && password.length >= 5){
                const data = await userModel.create({
                    avatar,
                    username,
                    password,
                    nickname,
                    desc,
                    job,
                    phone,
                    sex
                })
                res.json({
                    code:200,
                    data,
                    msg:'注册成功'
                })
            }else{
                res.json({
                    code:400,
                    msg:'密码长度不符合要求'
                })
            }
        }
    }catch(err){
        next(err)
    }
})

//获取管理员信息
router.get('/user', async (req, res, next) => {
    try{
        let {page=1, size=10} = req.query
        page = parseInt(page)
        size = parseInt(size)
        let data = await userModel.find().limit(size).skip((page-1)*size).select('-password')
        res.json({
            code:200,
            msg:'获取成功',
            data
        })
    } catch(err) {
        next(err)
    }
})

//登录模块
router.post('/login',async (req, res, next) => {
    try{
        const {password, username} = req.body
        if(password && username){
            const userData = await userModel.findOne({username})
            if(userData){
                if(password == userData.password){
                    req.session.user = userData  //将用户信息存到session里
                    res.json({
                        code:200,
                        msg:'登录成功',
                        userData
                    })
                }else{
                    res.json({
                        code:401,
                        msg:'密码不正确'
                    })
                }
            }else{
                res.json({
                    code:401,
                    msg:'该用户不存在'
                })
            }
        }else{
            res.json({
                code:400,
                msg:'缺少必要参数'
            })
        }
    }catch(err){
        next(err)
    }
})
router.get('/logout',(req, res) => {
    if(req.session.user){
        req.session.user = null
        res.json({
            code:200,
            msg:'退出登录成功'
        })
    }else{
        res.json({
            code:400,
            msg:'不能在未登录状态下退出登录'
        })
    }
})




module.exports = router
