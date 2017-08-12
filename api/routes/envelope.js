const Router = require('koa-router');
const mongoose = require('mongoose');
const config = require('../../config');
const passport = require('passport');
const autoIncrement = require('mongoose-auto-increment');
const userSchema = require('../db/user');
const Strategy = require('passport-local').Strategy;

// db = mongoose.createConnection(config.db.url);
mongoose.connect(config.db.url);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'users');
const User = mongoose.model('users', userSchema);

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var router = new Router();
router.all('/', async (ctx, next) => {
  var u = await User.findOne();
  console.log('localhost users', u);
  await next();
});
// body is ctx.request.body
router.post('/register', async (ctx, next) => {
  const body = ctx.request.body;
  console.log('hit register --------', body);

  await User.register(new User({ username: body.username }), body.password, async (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('User Created');
    }
    await next();
  });
});

router.get('/allUsers', async(ctx, next) => {
  var user = await User.findOne({});

  ctx.body = user
})

module.exports = router;
