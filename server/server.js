var bodyParser = require('body-parser');
var express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coolproject');

var app = express();
app.use(bodyParser.json());


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

app.get('/', function(req, res) {
  res.send('Hello, world, Decoce');
});

/* GET ALL POSTS */
app.get('/api/posts', function(req, res) {
  Post.find().then(function(posts) {
    res.send({
      posts
    });
  }).catch(function(error) {
    console.log('error ', error);
    res.sendStatus(400);
  });
});

//ID: 5bb77bcd2919b41e80b0f4eb
app.get('/api/posts/:id', function(req, res) {
  var idParam = req.params.id;
  Post.findById(idParam).then(function(post) {
    console.log('success ', post);
    res.send({
      post: post
    })
  }).catch(function(error) {
    console.log('error ', error);
    res.send(error);
  })
});

/* SAVE NEW POST */
app.put('/api/posts', function(req, res) {
  var title = req.body.title;
  var author = req.body.author;
  var content = req.body.content;

  var postToSave = {
    title: title,
    author: author,
    content: content
  };

  var newPost = new Post(postToSave);

  newPost.save().then(function(success) {
    console.log('saved');
    res.send(success);
  }).catch(function(error) {
    res.send(error);
  });

});

var port = 3000;
app.listen(port, function() {
  console.log('server started on port: ' + port);
});
