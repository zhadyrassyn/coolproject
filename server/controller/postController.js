var app = require('express');
var multer = require('multer');
var base64Img = require('base64-img');
var router = app.Router();
var Post = require('./../db/model/post');

var path = require('path');
var uploadDir = path.join(__dirname, "../uploads");

var upload = multer({ dest: uploadDir});
var Like = require('./../db/model/like');


async function generate() {
  for(var i = 1; i < 20; i++) {
    var post = new Post({
      title: 'Title: ' + i,
      content: 'Content: ' + i
    });

    await post.save();
  }
}

// generate();

/* GET ALL POSTS */
router.get('/api/posts', function(req, res) {
  var perPage = parseInt(req.query.perPage); //сколько элементов на странице
  var currentPage = parseInt(req.query.currentPage); //на какой странице мы находимся
  var searchText = req.query.searchText;

  if (searchText !== null && searchText !== undefined && searchText.length !== 0) {
    const myRegExp = new RegExp(`${searchText}`, 'gi');

    var posts = Post.find({
      $or: [
        {title: myRegExp},
        {content: myRegExp}
      ]
    }).skip((currentPage -1) * perPage) //пропустить
      .limit(perPage) //
      .populate('author', ['firstName', 'lastName']);

    var counts = Post.count({
      $or: [
        {title: myRegExp},
        {content: myRegExp}
      ]
    });

    Promise.all([posts, counts]).then(values => {
      res.send({
        posts: values[0],
        total: values[1]
      });
    }).catch(error => {
      res.status(500).send(error);
    })

  } else {

    var posts = Post.find()
      .skip((currentPage -1) * perPage) //пропустить
      .limit(perPage) //
      .populate('author', ['firstName', 'lastName']);

    var counts = Post.count();

    Promise.all([posts, counts]).then(values => {
      res.send({
        posts: values[0],
        total: values[1]
      });
    }).catch(error => {
      res.status(500).send(error);
    })
  }
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