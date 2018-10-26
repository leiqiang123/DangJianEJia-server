var express = require('express');
var router = express.Router();
var user = require('../controller/user')
var news = require('../controller/news')
var category = require('../controller/category')
var swiper = require('../controller/swiper')
var topic = require('../controller/topic')
var forum = require('../controller/forum')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use(user)
router.use(news)
router.use(category)
router.use(swiper)
router.use(topic)
router.use(forum)

module.exports = router;
