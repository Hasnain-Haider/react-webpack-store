var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String
});

module.exports = userSchema;
