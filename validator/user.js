const { body } = require('express-validator')
const validate = require('../middleware/validate')
const { User } = require('../model')
const md5 = require("../util/md5")

exports.register = validate([
    body('user.name').notEmpty().withMessage("name不能为空"),
    // body('user.role').notEmpty().withMessage("role不能为空"),
    body('user.password').notEmpty().withMessage("password不能为空"),
    body('user.email').notEmpty().withMessage("email不能为空").isEmail().withMessage("email格式不正确")
        .custom(async value => {
            const user = await User.findOne({ email: value })
            if (user) {
                return Promise.reject('邮箱已存在')
            }
        }),
])

exports.login = [
    validate([
        body('user.id').notEmpty().withMessage("id不能为空"),
        body('user.password').notEmpty().withMessage("password不能为空")
    ]),
    validate([
        body('user.id').custom(async (id, { req }) => {
            // console.log(id);
            const user = await User.findOne({ id: id }).select(['password', 'id', 'name', 'gender', 'role','school'])
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
            const user = await User.findOne({ id: id })
            if (!user) {
                return Promise.reject('用户不存在')
            }
            req.user = user
        })
    ])
]

exports.update = [
    async (req, res, next) => {
        const email = req.body.user.email
        if (email) {
            const user = await User.findOne({ email: email })
            if (user) {
                return Promise.reject('邮箱已存在')
            }
        }
        next()
    },
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
            const user = await User.findOne({ id: id }).select(['password', 'id'])
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