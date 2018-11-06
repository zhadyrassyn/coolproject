var router = require('express').Router();
var User = require('./../db/model/user');

router
  .post('/api/auth/sign-up', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    // var { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.sendStatus(400);
    }

    var user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    /*
      var user = new User({
        firstName, lastName, email, password
      });
     */

    user.save()
      .then(function(user) {
        res.send({ user: user }).status(201);
      })
      .catch(function(error) {
        res.send({ error: error }).status(400);
      });
  })
  .post('/api/auth/sign-in', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
      res.sendStatus(400);
    }

    User.findOne({email: email})
      .then(function(user) {

        if (!user) {
          res.sendStatus(401);
        } else {
          user.comparePassword(password, function(error, isEqual) {
            if (error || isEqual === false) {
              res.sendStatus(401);
            } else {
              res.sendStatus(200);
            }
          })
        }
      })
      .catch(function(error) {
        res.send({ error: error }).status(400);
      })
  })
  .get('/secret', function(req, res) {
    if (req.session.authorized) {
      res.send("Data is available");
    } else {
      res.send("Da is not available");
    }
  });

module.exports = router;