const mongoose = require("mongoose");
const { dbURI } = require("../config/config.default");

// 连接 MongoDB 数据库
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.set('strictQuery', true)
const db = mongoose.connection;
// 当连接失败的时候
db.on("error", (err) => {
  console.log("MongoDB 数据库连接失败！", err);
});
// 当连接成功的时候
db.once("open", function () {
  console.log("MongoDB 数据库连接成功！");
});

module.exports = {
  User: mongoose.model('User', require('./user'), 'user'),
  Article: mongoose.model('Article', require('./article')),
  Administrator:mongoose.model('Administrator',require('./administrator')),
  Comment:mongoose.model('Comment',require('./comment')),
  Product:mongoose.model('Product',require('./product'))
}