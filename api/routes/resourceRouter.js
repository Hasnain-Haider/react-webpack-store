import Router from 'koa-router';
import Koa from 'koa';
import mongoose from 'mongoose';

const router = new Router({prefix: '/api'});
const getModel = name => mongoose.models[name]
export default function resourceRouter (resource) {
    router.get(`/${resource}/:id`, async (ctx) => {
      const model = getModel(resource);
      const id = ctx.params.id;
      const result = await model.findOne({ _id: id});
      ctx.body = result;
    });

    router.get(`/${resource}`, async (ctx) => {
      const model = getModel(resource);
      console.log('get resource');
      const query = ctx.query || {};
      let limit = query.limit || 10;
      let skip = query.skip || 0;
      limit = JSON.parse(limit);
      skip = JSON.parse(skip);

      const result = await model
        .find({})
        .limit(limit)
        .skip(skip);
      ctx.body = result;
    });

    router.post(`/${resource}`, async (ctx) => {
      const model = getModel(resource);
      const body = ctx.request.body;
      try {
        ctx.status = 201;
        ctx.body = await model.create(body);
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.post(`/${resource}/query`, async (ctx) => {
      const model = getModel(resource);
      const body = ctx.request.body;
      try {
        ctx.status = 200;
        ctx.body = await model.find(body);
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.patch(`/${resource}/:id`, async (ctx) => {
      const model = getModel(resource);
      const body = ctx.request.body;
      const _id = ctx.params.id;
      try {
        ctx.body = await model.findOneAndUpdate({ _id }, body);
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.delete(`/${resource}`, async (ctx) => {
      const { _id } = ctx.request.body;
      if (!_id) return;
      try {
        ctx.body = await model.deleteOne({ _id });
      } catch (err) {
        console.error(err);
        ctx.status = 500;
      }
    });

    router.put(`/${resource}/:id`, async (ctx) => {
      const model = getModel(resource);
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
    return router;
  }
