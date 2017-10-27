import Router from 'koa-router';
const router = new Router();
import serve from 'koa-static';
import path from 'path';
module.exports = (app) => {
  router.get('*', async (ctx, next) => {
    console.log('sending bundle.js now');

    await send(ctx, ctx.path, { root: path.resolve(__dirname, '..', 'build', 'index.html')});
    await next();
  });
  app.use(router.allowedMethods());
  app.use(router.routes());

};
