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
        console.log('user ', user);
        if (user) {
          req.login(user, function(err) {
            if (err) {
              console.log('err ', err);
            } else {
              res.cookie('user', JSON.stringify(req.user));
              res.status(201).send({ user: user });
            }
          });
        }

      })
      .catch(function(error) {
        res.status(400).send({ error: error })
      });
  })
  .post('/api/auth/sign-in', passport.authenticate('local'), function(req, res) {
    res.cookie('user', JSON.stringify(req.user));
    res.sendStatus(200);
  })
  .post('/api/auth/sign-out', function(req, res) {
    req.session.destroy();
    req.logout();
    res.clearCookie("connect.sid");
    res.clearCookie('user');
    res.sendStatus(200);
  })
  .get('/secret', function(req, res) {
    console.log('user is: ', req.user);
    req.session.destroy();
    res.sendStatus(200);
  });

module.exports = router;