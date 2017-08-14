const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  }
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'users');

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);
