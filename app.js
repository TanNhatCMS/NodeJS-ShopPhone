const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(bodyParser.json())
app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*')
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
     next()
})
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/shop', shopRouter);
// catch 404 and forward to error handler
app.use(
    (
        req, res, next)=>
        next(createError(404)
    )
);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
