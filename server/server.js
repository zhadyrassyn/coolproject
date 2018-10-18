var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
/* path = Блиблиотека, помогающая работать с путями */
var mongooseConnection = require('./db/mongoose.connect').mongooseConnection;
var app = express();
var postRouter = require('./controller/postController');

/* Указываем папку статических файлов */
app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.json());

app.use('/', postRouter);

/*Отображаем index.html файл при запросе GET /* */
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

var port = 3000;
app.listen(port, function() {
  console.log('server started on port: ' + port);
});
