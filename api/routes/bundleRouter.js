import Router from 'koa-router';
const router = new Router();

router.get('*', async (ctx, next) => {
  console.log('sending bundle.js now');
  await send(ctx, ctx.path, { root: path.resolve(__dirname, 'build', 'index.html')});
  await next();
});
router.get('/', async(ctx, next) => {
  ctx.redirect('/', 'index.html');
  await next();
});

export default router;
