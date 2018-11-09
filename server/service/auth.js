var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./../db/model/user');

passport.use(new LocalStrategy({ usernameField: 'email'},
  function(email, password, done) {
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          done(null, false);
        } else {
          user.comparePassword(password, function(error, isEqual) {
            if (error || isEqual === false) {
              done(null, false);
            } else {
              done(null, user);
            }
          })
        }
      })
      .catch((error) => {
        done(error);
      });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing user');
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializing user');
  User.findById(id, function(err, user) {
    if (err) {
      done(err);
    }
    done(null, user);
  });
});

module.exports = passport;