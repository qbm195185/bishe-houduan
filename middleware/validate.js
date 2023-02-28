const { validationResult, buildCheckFunction } = require("express-validator");
const { isValidObjectId } = require('mongoose')

// parallel processing 并行处理
// 暴露一个函数，函数接收验证规则，返回一个函数
exports = module.exports = (validations) => {
  return async (req, res, next) => {
    // map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    // res.status(400).json({ errors: errors.array() });
    res.status(202).json({
      errors: errors.array()
    })
  };
};

exports.isValidObejectId = (location, fileds) => {
  return buildCheckFunction(location)(fileds).custom(async value => {
    // console.log(value);
    if (!isValidObjectId(value)) {
      return Promise.reject('ID 不是一个有效的ObjectID')
    }
  })
}