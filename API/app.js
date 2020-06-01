const createError = require('http-errors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const uniqid = require('uniqid');
const favicon = require('serve-favicon');

const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(compression());
app.use(favicon(path.join(__dirname,'public','images','fav-icon.png')));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser(process.env.cookie_secret));



const ApiRouter = require('./routes/api');
const UiRouter = require('./routes/ui');

app.use((req,res,next)=>{
    if(!req.cookies.uid){
      const id = uniqid();
      res.cookie('uid', id, {maxAge: 3.154e+10});
    }
    next();
});

app.use('/api/', ApiRouter);
app.use('/', UiRouter);


// catch 404 and forward to error handler
// app.use((err, req, res, next) => {
//   next(createError(404));
// });

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
