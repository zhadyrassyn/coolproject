var app = require('express');
var multer = require('multer');
var base64Img = require('base64-img');
var router = app.Router();
var Post = require('./../db/model/post');

var path = require('path');
var uploadDir = path.join(__dirname, "../uploads");

var upload = multer({ dest: uploadDir});

/* GET ALL POSTS */
router.get('/api/posts', function(req, res) {
  Post.find().populate('author', ['firstName', 'lastName']).then(function(posts) {
    res.send({
      posts: posts
    });
  }).catch(function(error) {
    console.log('error ', error);
    res.sendStatus(400);
  });
});

//ID: 5bb77bcd2919b41e80b0f4eb
router.get('/api/posts/:id', function(req, res) {
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

module.exports = router;