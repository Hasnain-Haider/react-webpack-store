import Router from 'koa-router';
import send from 'koa-send';
import path from 'path';
const router = new Router();

router.get('*', async (ctx, next) => {
  console.log('sending bundle.js now');
  console.log( path.resolve(__dirname, '..', 'build', 'index.html'));
  await send(ctx, ctx.path, { root: path.resolve(__dirname, '..', 'build', 'index.html')});
  await next();
});
router.get('/', async(ctx, next) => {
  ctx.redirect('/', 'index.html');
  await next();
});

export default router;
