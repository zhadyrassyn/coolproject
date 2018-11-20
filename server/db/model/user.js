var bcryptNodejs = require('bcrypt-nodejs');
var mongoose = require('./../mongoose.connect').mongooseConnection;

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true, //       SASHA =>Sasha
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarPath: String
});

userSchema.pre('save', function(next) {
  var user = this;
  bcryptNodejs.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcryptNodejs.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  });
});

userSchema.methods.comparePassword = function(passwordToCheck, callback) {
  var user = this;
  bcryptNodejs.compare(passwordToCheck, user.password, function(error, isEqual) {
    if (error) {
      callback(error);
    } else {
      callback(null, isEqual);
    }
  });
};

var User = mongoose.model('user', userSchema);

module.exports = User;