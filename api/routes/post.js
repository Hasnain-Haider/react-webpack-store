import Router from 'koa-router';
import passport from 'koa-passport';
import config from '../../config';
import User from '../db/user';
// import Post from '../db/post';
import authRedux from '../../app/lib/reduxes/auth';

const router = new Router();

module.exports = (app, resources) => {
  router.get('/posts', async (ctx, next) => {
    ctx.body = Post.find();
  });

  router.post('/post', async (ctx, next) => {
    let newPost = null;
    const body = ctx.body;
    const post = {
      price: body.price,
      title: body.title,
      description: body.description,
      imgSrc: body.imgSrc,
    };
    try {
      newPost = await Post.create(post);
    } catch (e) {
      ctx.throw(e);
    }
    ctx.status = 201;
    ctx.body = newPost;
  });

  app.use(router.allowedMethods());
  app.use(router.routes());
};
