var mongoose = require('./../mongoose.connect').mongooseConnection;
var Schema = mongoose.Schema;

var Like = mongoose.model('like', {
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
});

module.exports = Like;
