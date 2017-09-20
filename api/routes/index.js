import Router from 'koa-router';
import Koa from 'koa';
import mongoose from 'mongoose';
import config from '../../config';
import authRedux from '../../app/lib/reduxes/auth';
const router = new Router();
const app = new Koa();
const models = mongoose.models;

module.exports = resources => {
  resources.forEach(resource => {
    const model = models[resource];

    router.get(`/${resource}`, async ctx => {
      const query =  ctx.query ;
      const result = await model.findOne(query);
      ctx.body = result;
    });

    router.post(`/${resource}`, async ctx => {
      const body = ctx.request.body;
      try {
        ctx.status = 201;
        ctx.body = await model.create(body);
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.patch(`/${resource}/:id`, async ctx => {
      const body = ctx.request.body;
      const _id = ctx.params.id;
      try {
        ctx.body = await model.findOneAndUpdate({ _id }, body);
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.delete(`${resource}/:id`, async ctx => {
      console.log({_id});
      const _id = ctx.params.id;
      try {
        ctx.body = await model.deleteOne({_id });
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.put(`/${resource}/:id`, async ctx => {
      const body = ctx.request.body;
      const _id = ctx.params.id;
      try {
        ctx.body = await model.findOneAndUpdate({ _id }, body, { upsert: true });
        ctx.status = 200;
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });
  });
  app.use(router.allowedMethods());
  app.use(router.routes());
  return app;
}
