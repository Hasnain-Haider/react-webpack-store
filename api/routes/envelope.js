const Router = require('koa-router');
var router = new Router();

router.all('/', async (ctx, next) => {
  ctx.envelope = {
      time: Date.now()
  };
  await next();
});

module.exports = router;
