var router = require('express').Router();
var multer = require('multer');
var base64Img = require('base64-img');
var Post = require('./../db/model/post');

var path = require('path');
var fs = require('fs');
var uploadDir = path.join(__dirname, "../uploads");
var User = require('../db/model/user');

var upload = multer({ dest: uploadDir});


/* GET ALL POSTS */
router.get('/api/profile/:id/posts', function(req, res) {
  var id = req.params.id;
  //.populate('author', 'firstName')
  Post.find({author: id}).then(function(posts) {
    res.send({
      posts: posts
    });
  }).catch(function(error) {
    console.log('error ', error);
    res.sendStatus(400);
  });
});

/* SAVE NEW POST */
router.put('/api/profile/:id/posts', upload.single('file'), function(req, res) {
  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;

  var postToSave = {
    title: title,
    author: id,
    content: content
  };

  var filePath = "";

  try {
    filePath = req.file.path;
  } catch (e) {
    console.log('error ', e);
  }

  base64Img.base64(filePath, function(err, data) {
    if (err) {
      console.log('error ', err);
    } else {
      postToSave.image = data;
    }

    var newPost = new Post(postToSave);

    newPost.save().then(function(success) {
      console.log('saved');
      res.send(success);
    }).catch(function(error) {
      res.send(error);
    });
  });
});

//DELETE
router.delete('/api/profile/:userId/posts/:postId', function(req, res) {
  // var userId = req.params.userId;
  var postId = req.params.postId;

  Post.findByIdAndRemove(postId)
    .then(function(deletedPost) {
      res.send(deletedPost);
    })
    .catch(function(error) {
      res.send(error).status(400);
    });
});

//UPDATE POST
router.post('/api/profile/:userId/posts/:postId', function(req, res) {
  // var userId = req.params.userId;
  var postId = req.params.postId;

  var title = req.body.title;
  var content = req.body.content;

  Post.findByIdAndUpdate(postId, {$set: {
    title: title,
    content: content
  }}, {new: true})
    .then(function(updatedPost) {
      // console.log('success ', success);
      res.send(updatedPost);
    })
    .catch(function(error) {
      console.log('error ', error);
      res.status(400).send(error);
    });
});

var uploadDirAvatars = path.join(__dirname, '../uploads/avas');
var uploadAvatars = multer({ dest: uploadDirAvatars});

/* SAVE PROFILE PHOTO */
router.post('/api/profile/:userId/avatar', uploadAvatars.single('img'),
  function(req, res) {
    var userId = req.params.userId;
    var filePath = req.file.path;
    var targetFile = userId + '.' + req.file.originalname.split('.').pop();

    var targetPath = path.join(uploadDirAvatars, targetFile);
    fs.rename(filePath, targetPath, function(err) {
      if (err) {
        return res.status(500).send({err: err});
      }

      User.findByIdAndUpdate(userId, {$set: {
        avatarPath: '/avas/' + targetFile
      }}, {new: true})
        .then(function(updatedUser) {
          res.send(updatedUser);
        })
        .catch(function(error) {
          console.log('error ', error);
          res.status(400).send(error);
        });
    });

  });

module.exports = router;