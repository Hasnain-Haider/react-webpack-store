import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    unique: true,
    required: false
  },
  imgSrc: {
    type: [String],
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('posts', postSchema);
