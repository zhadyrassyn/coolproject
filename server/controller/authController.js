var router = require('express').Router();
var User = require('./../db/model/user');

var passport = require('./../service/auth');

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
  .post('/api/auth/sign-in', passport.authenticate('local'), function(req, res) {
    res.sendStatus(200);
  })
  .get('/secret', function(req, res) {
    if (req.session.authorized) {
      res.send("Data is available");
    } else {
      res.send("Da is not available");
    }
  });

module.exports = router;