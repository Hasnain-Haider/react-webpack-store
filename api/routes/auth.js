import Router from 'koa-router';
import passport from 'koa-passport';
import config from '../../config';
import User from '../db/user';

const Strategy = require('passport-local').Strategy;

const router = new Router();

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      console.log('deserializeUser');
      if (err) {
        done(err, null)
      } else {
        done(null, user);
      }
    });
  });

  passport.use(new Strategy(async (username, password, done) => {
    // console.log('using Strategy', username, password);
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


  router.get('/logout', async (ctx, next) => {
    console.log('lonelyness');
    // for (v of ctx.req) {
    // console.log(Object.values(ctx));
    console.log('ctx.state       -', ctx.state);
    // }
    ctx.status = 200;
    ctx.logout();
  })

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

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/good',
    failureRedirect: '/bad'
  }), function (ctx, err)  {
    if (err) {
      console.error(err);
    }
    console.log('end login');
  }
);

router.get('/', async (ctx, next) => {
  console.log(router);
});


router.get('/good', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = ctx.state.user;
  console.log('in good');
});
router.get('/bad', async (ctx, next) => {
  ctx.status = 500;
  console.log('in bad');
})

router.get('/allUsers', async (ctx, next) => {
  const user = await User.find({});
  ctx.body = user;
});

router.post('/', async (ctx, next) => {
  // const u = await User.findOne();
  console.log('post / ');
  console.log('ctx.envelope', ctx.session );

  console.log('ctx.envelope', ctx.envelope );
  await next();
});
app.use(router.allowedMethods());
app.use(router.routes());
};
