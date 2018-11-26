var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
/* path = Блиблиотека, помогающая работать с путями */
var mongooseConnection = require('./db/mongoose.connect').mongooseConnection;
var app = express();
var postRouter = require('./controller/postController');
var authController = require('./controller/authController');
var profileController = require('./controller/profileController');
var commentController = require('./controller/commentController');

var passport = require('./service/auth');

var root = path.join(__dirname, "../client/public");
/* Указываем папку статических файлов */
app.use(express.static(path.join(__dirname, "../client/public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());

app.use(session({
  secret: 'some key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongooseConnection.connection })
  // name: 'sessionID'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', postRouter);
app.use('/', authController);
app.use('/', profileController);
app.use('/', commentController);
/*Отображаем index.html файл при запросе GET /* */

app.get('*', function(req, res) {
  res.redirect('/');
});

var port = 3000;
app.listen(port, function() {
  console.log('server started on port: ' + port);
});
