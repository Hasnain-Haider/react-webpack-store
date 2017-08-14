require('babel-core/register');
const koaBodyparser = require('koa-bodyparser');
const koa = require('koa');
const config = require('../config');
const passport = require('koa-passport');
const router = require('koa-router');
const session = require('koa-session');
const mongoose = require('mongoose');

const app = new koa();
const auth = require('./routes/auth');

app.use(passport.initialize());
app.use(passport.session());

app.use(koaBodyparser());

mongoose.connect(config.db.url);
app.use(auth.routes());
app.use(auth.allowedMethods());

app.use(passport.initialize());
app.use(passport.session());

app.listen(config.api.port);

console.log("listening on ", config.api.port);
