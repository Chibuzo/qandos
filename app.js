const createError = require('http-errors');
const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authenticate = require('./middlewares/authenticate');
const formatView = require('./middlewares/formatView');
const { APP_NAME, EMAIL, PHONE } = require('./config/constants');

// schedule weekly newsletter
require('./jobs/weeklyNewsletter');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const propertyRouter = require('./routes/property');
const partnerRouter = require('./routes/partner');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767tobechangedbeforegoinglive",
    saveUninitialized: false,
    cookie: { maxAge: 24000 * 60 * 60, secure: false }, // one fucking hour
    resave: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(formatView);
app.use('/', indexRouter);
app.use('/user', authenticate, usersRouter);
app.use('/admin', adminRouter);
app.use('/property', propertyRouter);
app.use('/partner', authenticate, partnerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.url_referrer = req.get('referrer');
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// app level locals
app.locals._app_name = APP_NAME;
app.locals._email = EMAIL;
app.locals._phone = PHONE;
app.locals._recaptcha_site_key = process.env.RECAPTCHA_SITE_KEY;

module.exports = app;
