import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

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
  posts: {
    type: [String],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
};

module.exports = mongoose.model('user', userSchema);
