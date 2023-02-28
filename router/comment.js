const express = require("express");
const commentCtrl = require('../controller/comment')
const commentValidator = require('../validator/comment')
const auth = require('../middleware/auth')
const router = express.Router();

router.post('/createComment',auth,commentValidator.createComment,commentCtrl.createComment)
router.post('/updateComment',auth,commentValidator.updateComment,commentCtrl.updateComment)
router.post('/deleteComment',auth,commentValidator.deleteComment,commentCtrl.deleteComment)
router.get('/getComment',commentValidator.getComment,commentCtrl.getComment)

module.exports = router;