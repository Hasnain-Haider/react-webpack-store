import Koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import mount from 'koa-mount';
import session from 'koa-session';
import passport from 'koa-passport';
import mongoose from 'mongoose';
import cors from 'koa-cors';
import bluebird from 'bluebird';
import fs from 'fs';
import createModels from './db/';
import config, { resources } from '../config';

const origin = `http://${config.app.host}:${config.app.port}`;
const corsOptions = {
  origin,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS']
};
const DEBUG = process.env.DEBUG || true;
console.debug = (...args) => (DEBUG ? console.log(...args) : null);

mongoose.Promise = bluebird;
mongoose.connect(config.db.url, { useMongoClient: true });
mongoose.connection.on('connected', async () => {
  console.log('Mongoose has connected to the db');
});

const mountRoutes = app => app.use( mount('/api', require('./routes/')(resources)) )
const useAuthentication = app =>  require('./routes/auth.js')(app)

const testMongo = async () => {
  if (DEBUG) {
    for (const model in mongoose.models) {
      const mod = await mongoose.models[model].findOne();
      console.debug('routinefindone', model, { mod });
    }
  }
};

const start = async app => {
  try {
    await createModels(resources.filter(el => el !== 'user'));
    await testMongo();
    mountRoutes(app);
  } catch (err) {
    console.error(err);
  }
  return app;
};


if (require.main === module) {
  const app = new Koa();
  const port = config.api.port || 4501;
  app.keys = config.sessionSecret;

  app
    .use(cors(corsOptions))
    .use(koaBody())
    .use(session(app));

  useAuthentication(app);
  start(app);
  console.debug(`listening on ${port}`);
  app.listen(port);
}



export default start;
