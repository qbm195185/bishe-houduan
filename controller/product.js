const { Product } = require('../model')

exports.creatProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body.product)
        product.author = req.user._id
        product.populate('author')
        await product.save()
        res.status(201).json({
            product
        })
    } catch (error) {
        next(error)
    }
}

exports.listProduct = async (req, res, next) => {
    try {
        // console.log(req.query);
        const { query  } = req.query;
        let ress
        if (query) {
            // console.log(11);
            ress = await Product.find({ name: query })
        } else {
            // console.log(22);
            ress = await Product.find({})
        }
        // console.log(ress);
        res.status(201).json({
            data: ress
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateProduct = async(req,res,next)=>{
    try {
        const product = req.product
        const body = req.body.product
        product.name = body.name || product.name
        product.subtitle = body.name || product.subtitle
        product.mainimage = body.name || product.mainimage
        product.subimage = body.subimage || product.subimage
        product.detail = body.detail || product.detail
        product.price = body.price || product.price
        product.stock = body.stock || product.stock
        product.status = body.status || product.status
        await product.save()
        res.status(201).json({
            product
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const article = req.product
        await article.remove()
        res.status(201).end()
    } catch (err) {
        next(err);
    }
}