import Router from 'koa-router';
import passport from 'koa-passport';
import config from '../../config';
import User from '../db/user';
const Strategy = require('passport-local').Strategy;

const router = new Router();

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) {
        done(err, null);
      } else {
        done(null, user);
      }
    });
  });

  passport.use(new Strategy(async (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        console.debug('pass invalid');
        return done(null, false);
      }
      console.debug('pass valid, user =>', user, err);
      return done(null, user);
    });
  }));

  router.get('/api/logout', async ctx => {
    ctx.logout();
    ctx.status = 200;
  });

  router.post('/api/signup', async (ctx, next) => {
    let result = null;
    const body = ctx.request.body;
    const user = {
      username: body.username,
      email: body.email,
    };
    user.username = user.username || user.email;

    try {
      result = await User.create({
        hash: User.generateHash(body.password),
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      console.error(err);
    }
    console.log('User Created');
    ctx.status = 201;
    ctx.body = result;
    await next();
  });

  router.post('/api/login', passport.authenticate('local', {
    successRedirect: '/api/validPass',
    failureRedirect: '/api/badPass',
  }), (ctx, err) => {
    if (err) {
      console.error(err);
    }
  });

  router.get('/api/validPass', async ctx => {
    console.log('ctx user ', ctx.state.user);
    ctx.status = 200;
    ctx.body = ctx.state.user;
  });

  router.get('/api/badPass', async ctx => {
    ctx.status = 500;
  });

  app.use(router.allowedMethods());
  app.use(router.routes());
};
