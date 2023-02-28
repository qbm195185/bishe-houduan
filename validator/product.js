const { body, check } = require('express-validator')
const validate = require('../middleware/validate')
const mongoose = require('mongoose')
const { Product } = require('../model')

// exports.listProduct = [
//     validate([
//         body('search.search').notEmpty().withMessage("search不能为空")
//     ])
// ]

exports.createProduct = [
    validate([
        body('product.name').notEmpty().isLength({ min: 1 }).withMessage('商品名不能为空'),
        body('product.subtitle').notEmpty().withMessage('商品副标题不能为空'),
        body('product.mainimage').notEmpty().withMessage('商品主图片错误'),
        body('product.subimage').notEmpty().withMessage('商品图片不能为空'),
        body('product.detail').notEmpty().withMessage('商品详情不能为空'),
        body('product.price').notEmpty().isFloat({ min: 0 }).withMessage('商品价格不能为空且不能小于0'),
    ]),
    async (req, res, next) => {
        const base64 = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
        const { mainimage, subimage } = req.body.product
        if (!base64.test(mainimage)) {
            return res.status(202).json({
                errors: [
                    '主图片错误'
                ]
            })
        }
        for (const ele of subimage) {
            if (!base64.test(ele)) {
                return res.status(202).json({
                    errors: [
                        '副图片错误'
                    ]
                })
            }
        }
        next()
    }
]

exports.updateProduct = [
    validate([
        validate.isValidObejectId(['params'], 'productId')
    ]),
    async (req, res, next) => {
        const productId = req.params.productId
        // console.log(articleId);
        const product = await Product.findById(productId)

        // console.log(article);
        req.product = product
        if (!product) {
            res.status(202).json({
                errors:[
                    '该商品不存在'
                ]
            })
        }
        next()
    },
    async (req, res, next) => {
        // console.log(req.article);
        
        if (req.user._id.toString() !== req.product.author.toString()) {
            return res.status(202).json({
                errors:[
                    '你想干什么，大傻春'
                ]
            })
        }
        next()
    }
] 

exports.deleteProduct = exports.updateProduct