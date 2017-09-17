import Router from 'koa-router';
import passport from 'koa-passport';
import config from '../../config';
import User from '../db/user';
import authRedux from '../../app/lib/reduxes/auth';

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
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        console.log('pass invalid');
        return done(null, false);
      }
      console.log('pass valid, user =>', user, err);
      return done(null, user);
    });
  }));

  router.get('/user/:_id', async ctx => {
    const { _id } = ctx.params;
    console.log(_id);
    var user = await User.findById(_id)
    console.log(user);
  });

  router.get('/logout', async ctx => {
    ctx.status = 200;
    authRedux.dispatch({ type: 'LOGOUT' });
    ctx.logout();
  });

  router.post('/signup', async (ctx, next) => {
    const body = ctx.request.body;

    const user = {
      username: body.username,
      email: body.email,
    };

    try {
      await User.create({
        hash: User.generateHash(body.password),
        username: user.username,
        email: user.email,
      });
    } catch (e) {
      throw (e);
    }

    console.log('User Created');
    ctx.status = 201;
    await next();
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/good',
    failureRedirect: '/bad',
  }), (ctx, err) => {
    if (err) {
      console.error(err);
    }
  }
  );

  router.get('/', async (ctx, next) => {
    console.log(router);
    await next();
  });


  router.get('/good', async (ctx) => {
    console.log('ctx user ', ctx.state.user);
    ctx.status = 200;
    ctx.body = ctx.state.user;
  });

  router.get('/bad', async (ctx) => {
    ctx.status = 500;
    console.log('bad');
  });

  router.get('/allUsers', async (ctx, next) => {
    const user = await User.find({});
    ctx.body = user;
    await next();
  });

  router.post('/', async (ctx, next) => {
    await next();
  });

  app.use(router.allowedMethods());
  app.use(router.routes());
};
