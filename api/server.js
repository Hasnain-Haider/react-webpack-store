import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import mount from 'koa-mount';
import session from 'koa-session';
import mongoose from 'mongoose';
import cors from 'koa-cors';
import bluebird from 'bluebird';
import send from 'koa-send';
import Router from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import createModels from './db/';
import authenticate from './routes/auth';
import createRouter from './routes/';

const resources = ["post", "user"];
const PORT = process.env.PORT || 4501;
const DEBUG = process.env.DEBUG || true;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/react-store';

const origin = `http://localhost:${PORT}`;
const corsOptions = {
  origin,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS']
};
console.debug = (...args) => (DEBUG ? console.log(...args) : null);

mongoose.Promise = bluebird;
mongoose.connect(MONGO_URL, { useMongoClient: true });
mongoose.connection.on('connected', async () => {
  console.log('Mongoose has connected to the db');
});

const testMongo = async () => {
  for (const model in mongoose.models) {
    const mod = await mongoose.models[model].findOne();
    console.debug('routine findone', model, { mod });
  }
};

const start = async (app) => {
  try {
    await createModels(resources.filter(el => el !== 'user'));
    await testMongo();
    app.use(mount('/api', createRouter(resources)));
  } catch (err) {
    console.error(err);
  }
  return app;
};


if (require.main === module) {
  const app = new Koa();
  app.keys = ["nv3y349ncqt3hi4;o;h4o;hue"];
  app
    .use(cors(corsOptions))
    .use(koaBody())
    .use(serve(path.resolve(__dirname, 'build')))
    .use(session(app));
  if (NODE_ENV === 'production') {
    const router = new Router();
    // app.use(serve('../app/build'));
    router.get('*', async (ctx, next) => {
      console.log('sending bundle.js now');
      await send(ctx, ctx.path, { root: path.resolve(__dirname, 'build', 'index.html')});
    });
    router.get('/', async(ctx, next) => {
      ctx.redirect('/', 'index.html');
      await next();
    });
    app.use(router.allowedMethods());
    app.use(router.routes());
  }
  authenticate(app);
  start(app);
  console.debug(`listening on ${PORT}`);
  app.listen(PORT);
}


export default start;
