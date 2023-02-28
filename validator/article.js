const { body, param } = require('express-validator')
const validate = require('../middleware/validate')
const mongoose = require('mongoose')
const { Article } = require('../model')

exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('标题不能为空'),
    body('article.description').notEmpty().withMessage('文章摘要不能为空'),
    body('article.body').notEmpty().withMessage('内容不能为空')
])

exports.getArticle = validate([
    validate.isValidObejectId(['params'], 'articleId')
])

exports.updateArticle = [
    validate([
        validate.isValidObejectId(['params'], 'articleId')
    ]),
    async (req, res, next) => {
        const articleId = req.params.articleId
        // console.log(articleId);
        const article = await Article.findById(articleId)

        // console.log(article);
        req.article = article
        if (!article) {
            res.status(404).end()
        }
        next()
    },
    async (req, res, next) => {
        // console.log(req.article);
        
        if (req.user._id.toString() !== req.article.author.toString()) {
            return res.status(403).end()
        }
        next()
    }
] 


exports.deleteArticle = exports.updateArticle


// 添加评论
exports.addComments = [
    validate([
        validate.isValidObejectId(['params'], 'articleId')
    ]),
    async (req, res, next) => {
        const articleId = req.params.articleId
        // console.log(articleId);
        const article = await Article.findById(articleId)

        // console.log(article);
        req.article = article
        if (!article) {
            res.status(404).end()
        }
        next()
    },
]