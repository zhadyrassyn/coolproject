var router = require('express').Router();
var Like = require('./../db/model/like');
var Post = require('./../db/model/post');

router.post('/api/posts/:postId/likes', async function(req, res) {
  if (req.isUnauthenticated()) {
    return res.status(401).send('Unauthorized');
  }

  var userId = req.user._id;
  var postId = req.params.postId;

  try {
    var post = await Post.findById(postId);
    if (!post) {
      return res.status(400).send('Post id is not valid');
    }

    var like = new Like({
      author: userId,
      post: postId
    });

    var savedLike = await like.save();

    res.status(201).send(savedLike);
  } catch (e) {
    console.log('Error ', e);
    res.status(500).send(e);
  }
});

router.delete('/api/posts/:postId/likes', async function(req, res) {
  if (req.isUnauthenticated()) {
    return res.status(401).send('Unauthorized');
  }

  var userId = req.user._id;
  var postId = req.params.postId;

  try {
    var deletedLike = await Like.findOneAndDelete({post: postId, author: userId});

    if (!deletedLike) {
      return res.status(400).send('Bad params');
    }

    res.status(204).send(deletedLike);
  } catch (e) {
    console.log('error ', e);
    res.status(500).send(e);
  }

  res.status(204).send(deletedLike);
});

module.exports = router;