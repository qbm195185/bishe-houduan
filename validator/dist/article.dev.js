"use strict";

var _require = require('express-validator'),
    body = _require.body,
    param = _require.param;

var validate = require('../middleware/validate');

var mongoose = require('mongoose');

exports.createArticle = validate([body('article.title').notEmpty().withMessage('标题不能为空'), body('article.description').notEmpty().withMessage('文章摘要不能为空'), body('article.body').notEmpty().withMessage('内容不能为空')]);
exports.getArticle = validate([param('articleId').custom(function _callee(value) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (mongoose.isValidObjectId(value)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", Promise.reject('文章ID类型错误'));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
})]);