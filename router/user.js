const express = require('express')
const userCtrl = require('../controller/user')
const router = express.Router()
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')


// 登录
router.post('/users/login', userValidator.login, userCtrl.login)

// 注册
router.post('/users', userValidator.register, userCtrl.register)

// 获取当前登录用户
router.get('/user', auth, userValidator.getCurrentUser, userCtrl.getCurrentUser)

// 更新用户
router.post('/user', auth, userValidator.update, userCtrl.updateUser)

// 更改密码
router.post('/user/password', userValidator.password, userCtrl.password)

module.exports = router