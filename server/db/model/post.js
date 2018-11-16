var mongoose = require('./../mongoose.connect').mongooseConnection;
var Schema = mongoose.Schema;

var Post = mongoose.model('Post', {
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: new Date()
  },
  image: String,
});

module.exports = Post;
