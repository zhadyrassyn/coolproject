var app = require('express');
var multer = require('multer');
var base64Img = require('base64-img');
var router = app.Router();
var Post = require('./../db/model/post');

var path = require('path');
var uploadDir = path.join(__dirname, "../uploads");

var upload = multer({ dest: uploadDir});
var Like = require('./../db/model/like');

/* GET ALL POSTS */
router.get('/api/posts', function(req, res) {
  Post.find()
    .populate('author', ['firstName', 'lastName'])
    .then(function(posts) {

    res.send({
      posts: posts
    });
  }).catch(function(error) {
    console.log('error ', error);
    res.sendStatus(400);
  });
});

//ID: 5bb77bcd2919b41e80b0f4eb
router.get('/api/posts/:id', async function(req, res) {
  var idParam = req.params.id;

  try {
    var post = await Post.findById(idParam).populate({path: 'comments', populate: {path: 'author'}});
    if (!post) {
      return res.status(400).send('Bad request');
    }

    var likes = await Like.count({ post: post._id });

    var userLikedAmount = 0;

    if (req.isAuthenticated()) {
       userLikedAmount = await Like.count({ post: post._id, author: req.user._id })
    }

    var response = {
      post: post,
      likes: likes,
    };

    if (userLikedAmount == 0) {
      response.liked = false;
    } else {
      response.liked = true;
    }

    res.status(200).send(response);

  } catch (e) {
    console.log('error ', e);
    res.status(500).send(e);
  }

});

module.exports = router;