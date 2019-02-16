const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const pingRouter = require('./routes/ping');
const testRouter = require('./routes/test');
const forgotPasswordRouter = require('./routes/forgot-password');
const verificationRouter = require('./routes/verification');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ping', pingRouter);
app.use('/test', testRouter);
app.use('/forgot-password', forgotPasswordRouter);
app.use('/verification', verificationRouter);

module.exports = app;
