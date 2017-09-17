import Router from 'koa-router';
import passport from 'koa-passport';
import config from '../../config';
import User from '../db/user';
import mongoose from 'mongoose';
import authRedux from '../../app/lib/reduxes/auth';
var Post = mongoose.models.post;
const router = new Router();

module.exports = app => {
  router.get('/posts', async (ctx, next) => {
    ctx.body = await Post.find();
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
