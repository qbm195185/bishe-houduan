const express = require("express");
const tagsCtrl = require('../controller/tag')

const router = express.Router();

// Get Tags
router.get("/tags", tagsCtrl.getTags);

module.exports = router;