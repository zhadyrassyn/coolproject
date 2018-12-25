const mongoose = require('mongoose');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/coolproject';

mongoose.connect(url);

module.exports = {
  mongooseConnection: mongoose
};