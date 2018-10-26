var app = require('express');
var router = app.Router();
var Post = require('./../db/model/post');

/* GET ALL POSTS */
router.get('/api/posts', function(req, res) {
  Post.find().then(function(posts) {
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


/* SAVE NEW POST */
router.put('/api/posts', function(req, res) {
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


//DELETE
router.delete('/api/posts/:id', function(req, res) {
  var id = req.params.id;

  Post.findByIdAndRemove(id)
    .then(function(deletedPost) {
      res.send({post: deletedPost});
    })
    .catch(function(error) {
      res.send(error).status(400);
    });
});

router.post('/api/posts/:id', function(req, res) {
  var id = req.params.id;

  var title = req.body.title;
  var author = req.body.author;
  var content = req.body.content;

  Post.findByIdAndUpdate(id, {$set: {
    title: title,
    author: author,
    content: content
  }}, {new: true})
    .then(function(updatedPost) {
      // console.log('success ', success);
      res.send({post: updatedPost});
    })
    .catch(function(error) {
      console.log('error ', error);
      res.send(error).status(400);
    });
});

module.exports = router;