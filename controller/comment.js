const { Comment } = require('../model')

exports.getComment = async (req,res,next) =>{
    try {
        res.status(201).json({
            comments:req.comment
        })
    } catch (error) {
        next(error)
    }
}

exports.createComment = async (req, res, next) => {
    try {
        // console.log(req.query);
        // console.log(req.body);
        const comment = new Comment(req.body.comment)
        comment.author = req.user._id
        comment.article = req.query.articleId
        comment.populate("author")
        comment.populate("article")
        await comment.save()
        res.status(201).json({
            comment
        })
    } catch (err) {
        next(err);
    }
}

exports.updateComment = async (req, res, next) => {
    const comment = req.comment
    comment.comment1 = req.body.comment.comment1 || comment.comment1
    if (req.body.comment.comment2) {
        comment.comment2.push(req.body.comment.comment2)
    }
    if (req.body.comment.favorite) {
        comment.favoritesCount += 1
    }
    await comment.save()
    res.status(201).json({
        comment
    })
}

exports.deleteComment = async (req, res, next) => {
    await req.comment.remove()
    res.status(201).json({
        data:"删除成功"
    })
}