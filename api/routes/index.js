import path from 'path';
import Router from 'koa-router';
import Koa from 'koa';
import mongoose from 'mongoose';
import bundleRouter from './bundleRouter';
import resourceRouter from './resourceRouter';
import authenticate from './auth';
import serve from 'koa-static';

const postRouter = resourceRouter('post')

export default function createRoutes(app) {
  if (process.env.NODE_ENV === 'production') {
    app
      .use(serve(path.resolve(__dirname, 'build')))
      .use(bundleRouter.routes())
      .use(bundleRouter.allowedMethods())
  }
  authenticate(app)
  app.use(postRouter.allowedMethods()).use(postRouter.routes());
  return app;
};
