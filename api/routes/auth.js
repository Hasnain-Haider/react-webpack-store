import Router from 'koa-router';
import passport from 'passport';
import config from '../../config';
import User from '../db/user';

const Strategy = require('passport-local').Strategy;

const router = new Router();

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new Strategy(async (username, password, done) => {
    await User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      try {
        if (!user.validPassword(password)) {
          console.log('pass invalid');
          return done(null, false);
        }
        console.error('pass valid');
        return done(null, user);
      } catch (e) {
        return done(null, user);
        console.error(e);
      }
    });
  }));

  router.all('/', async (ctx, next) => {
    const u = await User.findOne();
    console.log('local users', u);
    await next();
  });

  router.post('/register', async (ctx, next) => {
    const body = ctx.request.body;
    console.log('hit register -------->', body);
    const user = {
      username: body.username,
      email: body.email
    };
    console.log('user', user);
    await User.create({
      hash: User.generateHash(body.password),
      username: user.username,
      email: user.email
    });
    console.log('User Created');
    ctx.status = 201;
    await next();
  });

  router.post('/login', passport.authenticate('local'), async (ctx, next) => {
    const body = ctx.request.body;
    console.log('hit login -------->', body);
    await next();
  });

  router.get('/allUsers', async (ctx, next) => {
    const user = await User.find({});
    ctx.body = user;
  });

  app.use(router.routes());
};
