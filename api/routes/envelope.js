const Router = require('koa-router');
const mongoose = require('mongoose');
const userSchema = require('../db/user');
const config = require('../../config');

mongoose.connect(config.db.url);

const User = mongoose.model('users', userSchema);

var router = new Router();

router.all('/', async (ctx, next) => {
  ctx.envelope = {
      time: Date.now()
  };
  var u = await User.findOne();
  console.log('localhost users', u);
  await next();
});

module.exports = router;
