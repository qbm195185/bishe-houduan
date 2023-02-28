const express = require("express");
const articleCtrl = require('../controller/article')
const articleValidator = require('../validator/article')
const auth = require('../middleware/auth')
const router = express.Router();

// List Articles
router.get("/", articleCtrl.listArticle);

// Feed Articles
// router.get("/feed", articleCtrl.feedArticle);

// Get Article
router.get("/:articleId", articleValidator.getArticle, articleCtrl.getArticle);

// Create Article
router.post("/", auth, articleValidator.createArticle, articleCtrl.createArticle);

// Update Article
router.put("/:articleId", auth, articleValidator.updateArticle, articleCtrl.updateArticle);

// Delete Article
router.delete("/:articleId", auth, articleValidator.deleteArticle, articleCtrl.deleteArticle);

// Add Comments to an Article
// router.post("/:articleId/comments",auth, articleCtrl.addComment);

// // Get Comments from an Article
// router.get("/:slug/comments", articleCtrl.getComment);

// // Delete Comment
// router.delete("/:slug/comments/:id", articleCtrl.deleteArticle);

// // Favorite Article
// router.post("/:slug/favorite", articleCtrl.favoriteArticle);

// // Unfavorite Article
// router.delete("/:slug/favorite", articleCtrl.unfavoriteArticle);

module.exports = router;