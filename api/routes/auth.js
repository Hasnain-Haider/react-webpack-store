import Router from 'koa-router';
import passport from 'koa-passport';
import User from '../db/user';
const Strategy = require('passport-local').Strategy;
const router = new Router();

export default function authenticate(app) {
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
        return done(null, false);
      }
      return done(null, user);
    });
  }));

  router.get('/api/logout', async (ctx) => {
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
      ctx.status = 201;
      ctx.body = result;
      console.log('User Created');
    } catch (err) {
      const { message } = err;
      if (message.indexOf('username') !== -1) {
        result = 'user';
      } else if (message.indexOf('email') !== -1) {
        result = 'email';
      }
      ctx.status = 500;
      ctx.body = { result };
    }
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

  router.get('/api/validPass', async (ctx) => {
    console.log('ctx user ', ctx.state.user);
    ctx.status = 200;
    ctx.body = ctx.state.user;
  });

  router.get('/api/badPass', async (ctx) => {
    ctx.status = 500;
  });

  app.use(router.allowedMethods());
  app.use(router.routes());
  return app;
};
