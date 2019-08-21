var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
require('dotenv').config()

var app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

module.exports = app;
