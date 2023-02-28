const { body,param,check } = require('express-validator')
const validate = require('../middleware/validate')
const { Administrator,User } = require('../model')
const md5 = require("../util/md5")

exports.register = validate([
    body('user.name').notEmpty().withMessage("name不能为空"),
    // body('user.role').notEmpty().withMessage("role不能为空"),
    body('user.password').notEmpty().withMessage("password不能为空")
])

exports.login = [
    validate([
        body('user.id').notEmpty().withMessage("id不能为空"),
        body('user.password').notEmpty().withMessage("password不能为空")
    ]),
    validate([
        body('user.id').custom(async (id, { req }) => {
            const user = await Administrator.findOne({ id: id }).select(['password', 'id', 'name', 'role'])
            if (!user) {
                return Promise.reject('用户不存在')
            }
            req.user = user
        })
    ]),
    validate([
        body('user.password').custom(async (password, { req }) => {
            if (md5(password) !== req.user.password) {
                return Promise.reject('密码错误')
            }
        })
    ])
]

exports.getCurrentUser = [
    body('user.id').notEmpty().withMessage("id不能为空"),
    validate([
        body('user.id').custom(async (id, { req }) => {
            // .select(['id','email','name','gender','type','createAt'])
            const user = await Administrator.findOne({ id: id })
            if (!user) {
                return Promise.reject('用户不存在')
            }
            req.user = user
        })
    ])
]

exports.update = [
    validate([
        validate.isValidObejectId(['params'], 'userid')
    ]),
    async (req, res, next) => {
        const userid = req.params.userid
        const user = await Administrator.findById(userid)
        req.upuser = user
        if (!user) {
            return res.status(404).end()
        }
        next()
    }
]

exports.password = [
    validate([
        body('user.id').notEmpty().withMessage("id不能为空"),
        body('user.password').notEmpty().withMessage("password不能为空"),
        body('user.newpassword').notEmpty().withMessage("新密码不能为空"),
    ]),
    validate([
        body('user.id').custom(async (id, { req }) => {
            // console.log(id);
            const user = await Administrator.findOne({ id: id }).select(['password', 'id'])
            if (!user) {
                return Promise.reject('用户不存在')
            }
            req.user = user
        })
    ]),
    validate([
        body('user.password').custom(async (password, { req }) => {
            if (md5(password) !== req.user.password) {
                return Promise.reject('原密码错误')
            }
        })
    ])
]

exports.alluser = [
    async (req, res, next) => {
        // console.log(req);
        if (!req.user) {
            return res.status(202).json({
                errors: [{
                    msg: "管理员错误"
                }]
            })
        }
        next()
    }
]

exports.oneuser = [
    validate([
        body('search.search').notEmpty().withMessage("search不能为空"),
        body('search.select').notEmpty().withMessage("select不能为空"),
    ])
]