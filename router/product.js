const productCtrl = require('../controller/product')
const productValidator = require('../validator/product')
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router();

router.post('/',auth,productValidator.createProduct,productCtrl.creatProduct);
router.post('/updateProduct',auth,productValidator.updateProduct,productCtrl.updateProduct)
router.get('/listProduct',productCtrl.listProduct)
router.get('/deleteProduct',auth,productValidator.deleteProduct,productCtrl.deleteProduct)

module.exports = router