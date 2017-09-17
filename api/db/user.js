import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true
  },
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
    type: [String]
  },
  created: {
    type: Date,
    default: Date.now
  }
});


// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, {
//   model: 'users',
//   field: '_id'
// });

userSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
};

module.exports = mongoose.model('users', userSchema);
