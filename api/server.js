const koaBodyparser = require('koa-bodyparser');
const koa = require('koa');
const config = require('../config');
const passport = require('koa-passport');
const router = require('koa-router');
var app = new koa();
var envelope = require('./routes/envelope');

app.use(koaBodyparser());

app.use(envelope.routes());
app.use(envelope.allowedMethods());

app.listen(config.api.port)

console.log("listening on ", config.api.port);
