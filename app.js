var createError = require('http-errors');
var express = require('express');
const methodOverride = require('method-override');


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var usersRouter = require('./src/routes/users');
var productRouter = require('./src/routes/products');

var app = express();
app.use(methodOverride('_method'));
// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//permite capturar la informacion que se envia via post en el req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


app.listen(3000, ()=>{
  console.log("El servidor esta funcionando en el puerto : 3000");
});



app.use('/', usersRouter);
app.use('/products', productRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
