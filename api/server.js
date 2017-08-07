const koaBodyparser = require('koa-bodyparser');
const koa = require('koa');
const config = require('../config');
const passport = require('koa-passport');
const router = require('koa-router');
var app = new koa();
var routera = require('./routes/routea');

app.use(koaBodyparser());
app.use(async (ctx, next) => {
  const now = Date.now();
  ctx.envelope = {time:now};

  await next();
})

app.use(async(ctx, next)=>{
  console.log(ctx.envelope);
  await next();
})
app.use(routera.routes());
app.use(routera.allowedMethods());

app.listen(config.api.port)

console.log("listening on ", config.api.port);
