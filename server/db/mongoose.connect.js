const mongoose = require('mongoose');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/pagination';

mongoose.connect(url);

module.exports = {
  mongooseConnection: mongoose
};