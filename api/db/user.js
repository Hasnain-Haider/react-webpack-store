var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type:String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type:String,
    required: false
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = userSchema;
