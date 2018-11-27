var router = require('express').Router();
var Comment = require('./../db/model/comment');
var Post = require('./../db/model/post');
var User = require('./../db/model/user');

router.post('/api/posts/:postId/comments', async function(req, res) {
  if (req.isUnauthenticated()) {
    return res.status(401).send('Unauthorized'); //Unauthorized
  }

  var userId = req.user._id;
  var postId = req.params.postId;
  var comment = req.body.comment;

  try {
    var post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    var commentModel = new Comment({
      text: comment,
      author: userId,
      post: postId,
    });

    var savedComment = await commentModel.save();
    post.comments.push(savedComment._id);

    await post.save();

    res.status(200).send(savedComment);

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

});

router.delete('/api/posts/:postId/comments/:commentId', async function(req, res) {
  if (req.isUnauthenticated()) {
    return res.status(401).send('Unauthorized'); //Unauthorized
  }

  var postId = req.params.postId;
  var commentId = req.params.commentId;

  try {
    const deletedComment = await Comment.findByIdAndRemove(commentId);

    if (deletedComment) {
      var post = await Post.findById(postId);
      post.comments = post.comments.filter(comment => !comment._id.equals(deletedComment._id));
      await post.save();
    }

    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;