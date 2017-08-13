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

const router = new Router();
router.all('/', async (ctx, next) => {
  const u = await User.findOne();
  console.log('localhost users', u);
  await next();
});
// body is ctx.request.body
router.post('/register', async (ctx, next) => {
  const body = ctx.request.body;
  console.log('hit register --------', body);
  const user = {
    username: body.username,
    email: body.email
  };
  await User.register(new User(user), body.password, async (err) => {
    if (err) {
      console.error(err);
      ctx.throw(501, 'bad one');
    } else {
      console.log('User Created');
      ctx.status = 201;
    }
  });
});

router.get('/allUsers', async (ctx, next) => {
  const user = await User.find({});

  ctx.body = user;
});

module.exports = router;
