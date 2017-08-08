const Router = require('koa-router');
var router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = {
    time: Date.now()
  };
  ctx.stauts =277;
  await next();
})

router.post('/', async(ctx, next) => {
  console.log(Object.keys(ctx.req));
  ctx.body = Date.now();
  ctx.stauts=2727;
  await next();
})
module.exports = router;
