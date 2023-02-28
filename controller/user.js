const { User } = require('../model')
const md5 = require('../util/md5')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')


// 修改密码
exports.password = async (req, res, next) => {
    try {
        const user = req.user
        const bodyuser = req.body.user
        user.password = bodyuser.newpassword
        await user.save()
        res.status(201).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

// Authentication 用户登录
exports.login = async (req, res, next) => {
    try {
        const user = req.user.toJSON()
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret, {
            expiresIn: 60 * 60 * 60
        })
        delete user.password
        // console.log(req.body.user);
        res.status(201).json({
            ...user,
            token
        })
        // res.status(500).send("用户不存在")
    } catch (err) {
        next(err);
    }
};

// Registration 用户注册
exports.register = async (req, res, next) => {
    try {
        let id = await User.find({}).sort({ id: -1 }).limit(1)
        // console.log(123122,id[0].id+1);
        // console.log(id[0]);
        if (!id[0]) {
            req.body.user.id = 110000
        } else {
            req.body.user.id = id[0].id + 1
        }
        let user = new User(req.body.user);
        // console.log(user);
        // console.log(user.password);
        // 保存到数据库
        await user.save();
        // 转成json
        user = user.toJSON();
        // 删除密码属性
        // delete user.password;
        // 4. 发送成功响应，返回用户数据
        res.status(201).json({
            user,
        });
    } catch (err) {
        next(err);
    }
};

// Get Current User 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        res.status(201).json({
            user: req.user
        })
    } catch (err) {
        next(err);
    }
};

// Update User 更新用户
exports.updateUser = async (req, res, next) => {
    try {
        // const user = req.upuser
        const user = req.user
        const bodyuser = req.body.user
        user.name = bodyuser.name || user.name
        user.role = bodyuser.role || user.role
        user.gender = bodyuser.gender || user.gender
        user.email = bodyuser.email || user.email
        user.school = bodyuser.school || user.school
        await user.save()
        res.status(201).json({
            user
        })
    } catch (err) {
        next(err);
    }
};