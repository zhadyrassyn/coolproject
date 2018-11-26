var mongoose = require('./../mongoose.connect').mongooseConnection;
var Schema = mongoose.Schema;

var Comment = mongoose.model('comment', {
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  createDate: {
    type: Date,
    default: new Date()
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = Comment;

