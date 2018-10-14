var bodyParser = require('body-parser');
var express = require('express');
var mongooseConnection = require('./db/mongoose.connect').mongooseConnection;
var app = express();
var postRouter = require('./controller/postController');

app.use(bodyParser.json());

app.use('/', postRouter);

var port = 3000;
app.listen(port, function() {
  console.log('server started on port: ' + port);
});
