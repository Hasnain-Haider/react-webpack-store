import Router from 'koa-router';
import passport from 'koa-passport';
import config from '../../config';
import User from '../db/user';
import Post from '../db/post'
import authRedux from '../../app/lib/reduxes/auth';

const router = new Router();

module.exports = (app) => {
  router.get('/posts', async (ctx, next) => {
    console.log('query', ctx.query);
    ctx.body = Post.find();
  });

  app.use(router.allowedMethods());
  app.use(router.routes());
};
