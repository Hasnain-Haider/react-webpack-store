import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: false,
  },
  hash: {
    type: String,
    bcrypt: true,
    required: false,
  },
});


autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'users');

userSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
};

module.exports = mongoose.model('users', userSchema);
