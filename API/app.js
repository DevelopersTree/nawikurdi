const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const indexRouter = require('./routes/index');
const v2Router = require('./routes/v2');

app.use('/', v2Router);
// app.use('/legecy', indexRouter);

module.exports = app;
