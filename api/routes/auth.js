import Router from 'koa-router';
import passport from 'passport';
import config from '../../config';
import User from '../db/user';
import koa from 'koa';


const Strategy = require('passport-local').Strategy;

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const router = new Router();
router.all('/', async (ctx, next) => {
  const u = await User.findOne();
  console.log('localhost users', u);
  await next();
});

router.post('/register', async (ctx, next) => {
  const body = ctx.request.body;
  console.log('hit register -------->', body);
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
  await next();
});

router.post('/login', passport.authenticate('local'), async (ctx, next) => {
  const body = ctx.request.body;
  console.log('hit login -------->', body);
})

router.get('/allUsers', async (ctx, next) => {
  const user = await User.find({});
  ctx.body = user;
});

module.exports = router;
