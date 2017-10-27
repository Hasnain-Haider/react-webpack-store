import Router from 'koa-router';
import Koa from 'koa';
import mongoose from 'mongoose';

const router = new Router();
const app = new Koa();
const models = mongoose.models;

module.exports = (resources) => {
  resources.forEach((resource) => {
    const model = models[resource];
    router.get(`/${resource}/:id`, async (ctx) => {
      const id = ctx.params.id;
      const result = await model.findOneById(id);
      ctx.body = result;
    });

    router.get(`/${resource}`, async (ctx) => {
      const query = ctx.query || {};
      let limit = query.limit || 10;
      let skip = query.skip || 0;
      console.log('getting resource');
      limit = JSON.parse(limit);
      skip = JSON.parse(skip);
      const result = await model
        .find({})
        .limit(limit)
        .skip(skip);
      console.debug(resource, 'get many ', result.length);
      ctx.body = result;
    });

    router.post(`/${resource}`, async (ctx) => {
      const body = ctx.request.body;
      console.log({ body });
      try {
        ctx.status = 201;
        ctx.body = await model.create(body);
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.post(`/${resource}/query`, async (ctx) => {
      const body = ctx.request.body;
      console.log('query', { body });
      try {
        ctx.status = 200;
        ctx.body = await model.find(body);
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.patch(`/${resource}/:id`, async (ctx) => {
      const body = ctx.request.body;
      const _id = ctx.params.id;
      console.log('patch', resource);
      try {
        ctx.body = await model.findOneAndUpdate({ _id }, body);
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.delete(`/${resource}`, async (ctx) => {
      const { _id } = ctx.request.body;
      console.debug('resource', 'delete', _id);
      if (!_id) return;
      try {
        ctx.body = await model.deleteOne({ _id });
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.put(`/${resource}/:id`, async (ctx) => {
      const body = ctx.request.body;
      console.debug('resource', 'put', body);
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
};
