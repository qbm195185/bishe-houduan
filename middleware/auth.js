const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User, Administrator } = require('../model')

module.exports = async (req, res, next) => {
    // console.log(111);
    let token = req.headers['authorization']
    token = token ? token.split('Bearer ')[1] : null
    // console.log(token);
    if (!token) {
        return res.status(202).json({
            errors: [
                {
                    mag: "非法访问"
                }
            ]
        })
    }
    try {
        const decodedToken = await verify(token, jwtSecret)
        if (req.originalUrl.split('/').includes('ad')) {
            req.user = await Administrator.findById(decodedToken.userId) || null
            next()
        } else {
            req.user = await User.findById(decodedToken.userId) || null
            next()
        }

    } catch (error) {
        res.status(202).json({
            errors: [
                {
                    mag: "请联系管理员"
                }
            ]
        })
    }
}