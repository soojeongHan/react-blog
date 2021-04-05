const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  category: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: new Date()
  },
  updatedDate: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('Post', Post);