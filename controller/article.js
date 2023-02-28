const { Article, User } = require('../model')

exports.listArticle = async (req, res, next) => {
    try {
        const { limit = 20, offset = 0, tag, author } = req.query
        const filter = {}
        if (tag) {
            filter.tagList = tag
        }
        if (author) {
            const user = await User.findOne({ name: author })
            filter.author = user ? user._id : null
        }
        const articles = await Article.find(filter).skip(Number.parseInt(offset)).limit(Number.parseInt(limit))
        const articlesCount = await Article.countDocuments()
        res.status(201).json({
            articles,
            articlesCount
        })
    } catch (err) {
        next(err);
    }
}

// exports.feedArticle = async (req, res, next) => {
//     try {
//         // 处理请求
//         res.send("get /articles/feed");
//     } catch (err) {
//         next(err);
//     }
// }

exports.getArticle = async (req, res, next) => {
    try {
        // 处理请求
        const article = await Article.findById(req.params.articleId).populate('author')
        if (!article) {
            return res.status(202).json({
                errors:[
                    "未找到该文章"
                ]
            })
        }
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err);
    }
}

exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article)
        article.author = req.user._id
        article.populate("author")
        await article.save()
        // 处理请求
        res.status(201).json({
            article
        })
        // console.log(req.body);
        // console.log(req.user);
    } catch (err) {
        next(err);
    }
}

exports.updateArticle = async (req, res, next) => {
    try {
        const article = req.article
        const bodyArticle = req.body.article
        article.title = bodyArticle.title || article.title
        article.description = bodyArticle.description || article.description
        article.body = bodyArticle.body || article.body
        article.body = bodyArticle.tagList || article.tagList
        await article.save()
        res.status(201).json({
            article
        })
    } catch (err) {
        next(err);
    }
}

exports.deleteArticle = async (req, res, next) => {
    try {
        const article = req.article
        await article.remove()
        res.status(201).end()
    } catch (err) {
        next(err);
    }
}

exports.addComment = async (req, res, next) => {
    try {
        // 处理请求
        res.send("post /articles/:slug/comments");
    } catch (err) {
        next(err);
    }
}

exports.getComment = async (req, res, next) => {
    try {
        // 处理请求
        res.send("get /articles/:slug/comments");
    } catch (err) {
        next(err);
    }
}

