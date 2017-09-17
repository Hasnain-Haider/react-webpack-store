import Koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import session from 'koa-session';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import passport from 'koa-passport';
import mongoose from 'mongoose';
import cors from 'koa-cors';
import bluebird from 'bluebird';
import fs from 'fs';
import genMongooseModels from './db/genMongooseModels';
import config from '../config';
var DEBUG = true;
console.debug = (...args) => DEBUG ? console.log(...args) : null;


mongoose.Promise = bluebird;
const resources = {
  http: [],
  mongo: [ 'post', 'user'],
  postgres: []
};

mongoose.connect(config.db.url, {
  useMongoClient: true
});
mongoose.connection.on('connected', async() => {
if (DEBUG) {
  for (var model in mongoose.models) {
    var mod = await mongoose.models[model].findOne();
    console.debug(model, { mod });
  }
}
  console.log('Mongoose has connected to the db');
});

const mountRoutes = app => {
  let routes = fs.readdirSync('api/routes');
  routes.forEach(route => {
    try {
      require(`./routes/${route}`)(app, resources);
    } catch (e) {
      console.error(e);
    }
  });
}

const start = async app => {
  app.keys = config.sessionSecret;
  try {
    genMongooseModels(resources.mongo.filter(el => el !== 'user'));
    mountRoutes(app);
  } catch (e) {
    console.error(e);
  }
  return app
  .use(session(app))
  .use(koaBody());
}

if (require.main === module) {
  const app = new Koa();
  const port = config.api.port || 4501;
  start(app);

  console.log(`listening on ${port}`);
  app.listen(port);
}

export default start;
