const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const compression = require('compression');
const passport = require('./auth/passport');

const pingRouter = require('./routes/ping');

const emailVerificationRouter = require('./routes/user/email-verification');
const forgotPasswordRouter = require('./routes/user/forgot-password');
const loginRouter = require('./routes/user/login');
const logoutRouter = require('./routes/user/logout');
const registerRouter = require('./routes/user/register');
const reservationRouter = require('./routes/user/reservation');
const serviceRouter = require('./routes/user/services');

const adminEmailVerificationRouter = require('./routes/admin/email-verification');
const adminLoginRouter = require('./routes/admin/login');
const adminLogoutRouter = require('./routes/admin/logout');
const adminRegisterRouter = require('./routes/admin/register');
const adminServicesRouter = require('./routes/admin/services');
const adminUsersRouter = require('./routes/admin/users');
const adminReservationRouter = require('./routes/admin/reservation');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'api5000', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
    app.use(compression());
}

app.use('/ping', pingRouter);

app.use('/user/email-verification', emailVerificationRouter);
app.use('/user/forgot-password', forgotPasswordRouter);
app.use('/user/login', loginRouter);
app.use('/user/logout', logoutRouter);
app.use('/user/register', registerRouter);
app.use('/user/reservation', reservationRouter);
app.use('/user/services', serviceRouter);

app.use('/admin/email-verification', adminEmailVerificationRouter);
app.use('/admin/login', adminLoginRouter);
app.use('/admin/logout', adminLogoutRouter);
app.use('/admin/register', adminRegisterRouter);
app.use('/admin/services', adminServicesRouter);
app.use('/admin/users', adminUsersRouter);
app.use('/admin/reservation', adminReservationRouter);

module.exports = app;
