const { body, check } = require('express-validator')
const validate = require('../middleware/validate')
const mongoose = require('mongoose')
const { Comment,Article } = require('../model')

exports.getComment = [
    validate([
        check('articleId').notEmpty().withMessage('articleId不能为空')
    ]),
    validate([  
        check('articleId').customSanitizer(async (value,{req}) =>{
            // console.log(typeof(value));
            const comment = await Comment.find({article:value})
            req.comment = comment  
        })
    ])
]

exports.createComment = [
    validate([
        body('comment.comment1').notEmpty().withMessage('内容不能为空'),
        check('articleId').notEmpty().withMessage('articleId不能为空'),
        validate.isValidObejectId(['query'], 'articleId'),
    ]),
    async (req,res,next)=>{
        const articleId = req.query.articleId
        const article = await Article.findById(articleId)
        req.article = article
        if (!article) {
            res.status(202).json({
                error:"文章不存在"
            })
        }
        next()
    }
]

exports.updateComment = [
    validate([
        validate.isValidObejectId(['query'], '_id'),
    ]),
    async (req,res,next)=>{
        const commentId = req.query._id
        const comment = await Comment.findById(commentId)
        req.comment = comment
        if (!comment) {
            res.status(202).json({
                error:"评论不存在"
            })
        }
        next()
    },
    async (req, res, next) => {
        // console.log(req.article);
        
        if (req.user._id.toString() !== req.comment.author.toString()) {
            return res.status(202).json({
                error:"用户不一致"
            })
        }
        next()
    }
]

exports.deleteComment = [
    validate([
        validate.isValidObejectId(['query'], '_id'),
    ]),
    async (req,res,next)=>{
        const commentId = req.query._id
        const comment = await Comment.findById(commentId)
        req.comment = comment
        if (!comment) {
            res.status(202).json({
                error:"评论不存在"
            })
        }
        next()
    },
    async (req, res, next) => {
        // console.log(req.article);
        
        if (req.user._id.toString() !== req.comment.author.toString()) {
            return res.status(202).json({
                error:"用户不一致"
            })
        }
        next()
    }
]