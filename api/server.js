require('babel-core/register');
const koaBodyparser = require('koa-bodyparser');
const koa = require('koa');
const passport = require('koa-passport');
const session = require('koa-session');
const mongoose = require('mongoose');
const cors = require('koa-cors');
const config = require('../config');

const app = new koa();

app.keys = config.sessionSecret;
mongoose.connect(config.db.url);
mongoose.connection.on('connected', () => {
  console.log('Mongoose has connected to the db');
});

app.use(koaBodyparser());
app.use(session(app));
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS', 'DELETE']
}));

require('./routes/auth')(app);
require('./routes/post')(app);

app.listen(config.api.port);
console.log("listening on PORT ", config.api.port);
