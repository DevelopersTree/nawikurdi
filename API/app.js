const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* bellow is legecy router */
// const indexRouter = require('./routes/index');
// app.use('/legecy', indexRouter);

const v2Router = require('./routes/v2');

app.use('/', v2Router);

module.exports = app;
