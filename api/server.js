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

const DEBUG = true;
console.debug = (...args) => (DEBUG ? console.log(...args) : null);
mongoose.Promise = bluebird;
const origin = `http://${config.app.host}:${config.app.port}`;

const resources = {
  http: [],
  mongo: ['post', 'user'],
  postgres: [],
};
const corsOptions = {
  origin,
  credentials: true,
};

mongoose.connect(config.db.url, { useMongoClient: true });
mongoose.connection.on('connected', async () => {
  console.log('Mongoose has connected to the db');
  testMongo();
});

const mountRoutes = app =>
  fs.readdirSync('api/routes').forEach((route) => {
    try {
      require(`./routes/${route}`)(app, resources);
    } catch (e) {
      console.error(e);
    }
  });

const start = async app => {
  try {
    genMongooseModels(resources.mongo.filter(el => el !== 'user'));
    mountRoutes(app);
  } catch (e) {
    console.error(e);
  }
  return app;
};

const testMongo = async () => {
  if (DEBUG) {
    for (const model in mongoose.models) {
      const mod = await mongoose.models[model].findOne();
      console.debug(model, { mod });
    }
  }
};

if (require.main === module) {
  const app = new Koa();
  const port = config.api.port || 4501;

  app.keys = config.sessionSecret;
  app
    .use(cors(corsOptions))
    .use(koaBody())
    .use(session(app));

  start(app);
  console.debug(`listening on ${port}`);
  app.listen(port);
}

export default start;
