const express = require('express')

const router = express.Router()

router.get('/sse', (req, res) => {
    res.header({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    const interval = setInterval(() => {
        res.write("data: " + (new Date()) + "\n\n");
    }, 1000);

    // setTimeout(() => {
    //     clearInterval(interval);
    //     res.write("event: close\n");
    //     res.write("data: test close->" + (new Date()) + "\n\n");
    // }, 5000);
})

// 用户相关路由
router.use(require('./user'))

// 用户资料相关的路由
// router.use('/profile',require('./profile'))

// 文章路由
router.use('/article', require('./article'))

// 标签路由
// router.use('/tag',require('./tag'))

// 管理员路由
router.use('/ad', require('./administrator'))

// 评论路由
router.use('/comment', require('./comment'))

router.use('/product', require('./product'))

module.exports = router
