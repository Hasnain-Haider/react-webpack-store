require('babel-core/register');
const koaBodyparser = require('koa-bodyparser');
const koa = require('koa');
const config = require('../config');
const passport = require('koa-passport');
const router = require('koa-router');
const session = require('koa-session');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const app = new koa();
const auth = require('./routes/auth');

app.keys = config.sessionSecret;

mongoose.connect(config.db.url);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to db');
});

app.use(session(app));

app.use(passport.initialize());
app.use(passport.session());

app.use(koaBodyparser());

require('./routes/auth')(app);

app.use(passport.initialize());
app.use(passport.session());

app.listen(config.api.port);

console.log("listening on ", config.api.port);
