var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var session = require('express-session');
/* path = Блиблиотека, помогающая работать с путями */
var mongooseConnection = require('./db/mongoose.connect').mongooseConnection;
var app = express();
var postRouter = require('./controller/postController');
var authController = require('./controller/authController');

/* Указываем папку статических файлов */
app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

app.use(session({
  secret: 'some key',
  resave: true,
  saveUninitialized: true,
  unset: 'destroy'
}));

app.use('/', postRouter);
app.use('/', authController);

/*Отображаем index.html файл при запросе GET /* */
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

var port = 3000;
app.listen(port, function() {
  console.log('server started on port: ' + port);
});
