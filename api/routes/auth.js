const Router = require('koa-router');

const router = new Router();

router.post('/register', (req, res) => {
  Account.register(new Account({ username: req.body.username }), req.body.password, (err, account) => {
    if (err) {
      return res.render('register', { account: account });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
});

module.exports = router;
