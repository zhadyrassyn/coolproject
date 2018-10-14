const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coolproject');

module.exports = {
  mongooseConnection: mongoose
};