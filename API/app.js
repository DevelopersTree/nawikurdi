const createError = require('http-errors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');

const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(compression());
// app.use(favicon(path.join(__dirname,'public','images','favicon-32x32.png')));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser("some random strings that comes to mind hsagdhja213242"));



const ApiRouter = require('./routes/api');
const UiRouter = require('./routes/ui');

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
