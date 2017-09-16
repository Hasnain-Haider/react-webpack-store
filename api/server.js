import Koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import session from 'koa-session';
import genModels from './db/genMongoModels';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import passport from 'koa-passport';
import mongoose from 'mongoose';
import cors from 'koa-cors';
import config from '../config';
import fs from 'fs';


const resources = {
  http: [  ],
  mongo: [ 'post'],
  postgres: []
};
const port = 3007;
mongoose.connect(config.db.url);
mongoose.connection.on('connected', async() => {
  var res = await mongoose.models.post.find();
  for (var model in mongoose.models) {
    var mod = await mongoose.models[model].findOne();
    console.log(model, { mod });
  }
  // console.log({res});
  // console.log( (await mongoose.models.post.findOne()));
  console.log('Mongoose has connected to the db');
});

const mountRoutes = app => {
  let routes = fs.readdirSync('api/routes');
  routes.forEach(route => {
    require(`./routes/${route}`)(app, resources);
  });
}

const start = async app => {
  app.keys = config.sessionSecret;
  genModels(resources);
  mountRoutes(app);
  return app
  .use(session(app))
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());
}

if (require.main === module) {
  const app = new Koa();
  start(app);
  app.listen(port);
}

export default start;
