exports.getProfile = async (req, res, next) => {
    try {
        // 处理请求
        res.send("get /profile/:username");
    } catch (err) {
        next(err);
    }
}

exports.followProfile = async (req, res, next) => {
    try {
        // 处理请求
        res.send("post /profile/:username/follow");
    } catch (err) {
        next(err);
    }
}

exports.unfollowUser = async (req, res, next) => {
    try {
        // 处理请求
        res.send("delete /profile/:username/follow");
    } catch (err) {
        next(err);
    }
}