const { Administrator, User } = require('../model')
const md5 = require('../util/md5')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')


exports.oneuser = async (req, res, next) => {
    try {
        // console.log(req.body.search);
        let select = req.body.search.select;
        let saerch = req.body.search.search
        let query = {
            [select]: saerch
        }
        // console.log(query);
        const { limit = 20, skip = 0 } = req.query
        // console.log(req.query);
        let count = await User.find(query).count()
        let alluser = await User.find(query, { id: 1, name: 1, email: 1, gender: 1, role: 1, school: 1, createdAt: 1 }).skip(skip).limit(limit)
        // console.log(alluser);
        res.status(200).json({
            total: count,
            alluser: alluser
        })
    } catch (error) {
        next(error);
    }
}

exports.alluser = async (req, res, next) => {
    try {
        // console.log(req.query);
        const { limit = 20, skip = 0, tag, author } = req.query
        // console.log(limit,skip);
        let count = await User.find({}).count()
        let alluser = await User.find({}, { id: 1, name: 1, email: 1, gender: 1, role: 1, school: 1, createdAt: 1 }).limit(limit).skip(skip)
        // console.log(alluser.length());
        res.status(200).json({
            total: count,
            alluser: alluser
        })
    } catch (err) {
        next(err);
    }
}

// 修改密码
exports.password = async (req, res, next) => {
    try {
        const user = req.user
        const bodyuser = req.body.user
        user.password = bodyuser.newpassword
        await Administrator.save()
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
        res.status(200).json({
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
        let id = await Administrator.find({}).sort({ id: -1 }).limit(1)
        // console.log(123122,id[0].id+1);
        // console.log(id[0]);
        if (!id[0]) {
            req.body.user.id = 10000
        } else {
            req.body.user.id = id[0].id + 1
        }
        let user = new Administrator(req.body.user);
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
        res.status(200).json({
            user: req.user
        })
    } catch (err) {
        next(err);
    }
};

// Update User 更新用户
exports.updateUser = async (req, res, next) => {
    try {
        const user = req.upuser
        const bodyuser = req.body.user
        user.name = bodyuser.name || user.name
        user.role = bodyuser.role || user.role
        await Administrator.save()
        res.status(201).json({
            user
        })
    } catch (err) {
        next(err);
    }
};