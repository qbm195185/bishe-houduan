const express = require('express')
const adCtrl = require('../controller/administrator')
const router = express.Router()
const adValidator = require('../validator/administrator')
const auth = require('../middleware/auth')


// 登录
router.post('/login', adValidator.login, adCtrl.login)

// 注册
router.post('/users', adValidator.register, adCtrl.register)

// 获取当前登录用户
router.get('/user', auth, adValidator.getCurrentUser, adCtrl.getCurrentUser)

// 更新用户
router.put('/:userid', auth, adValidator.update, adCtrl.updateUser)

// 更改密码
router.post('/password', adValidator.password, adCtrl.password)

// 获取所有用户
router.get('/alluser',auth,adValidator.alluser,adCtrl.alluser)

// 获取单个用户
router.post('/oneuser',auth,adValidator.oneuser,adCtrl.oneuser)

module.exports = router