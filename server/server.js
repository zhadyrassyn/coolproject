var express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coolproject');

var app = express();

var Post = mongoose.model('Post', {
  title: String,
  content: String,
  author: String,
  date: {
    type: Date,
    default: new Date()
  }
});

const myPost = new Post({
  title: 'Dollar vishe 370tg',
  content: 'Segodnya dnem',
  author: 'Amirzhan'
});

myPost.save()
  .then(function(success) {
    console.log('success ', success);
  })
  .catch(function(error) {
    console.log('error ', error);
  });

app.get('/', function(req, res) {
  res.send('Hello, world, Decoce');
});

var port = 3000;
app.listen(port, function() {
  console.log('server started on port: ' + port);
});
