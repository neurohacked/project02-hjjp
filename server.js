// dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./js/hbsHelpers')
const methodOverride = require('method-override');

// instantiate  app
const app = express();

// sessions
app.use(session({
    secret: 'app',
    cookie: {
        maxAge: null
    },
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    dashboardLayout: 'dashboard'
}));

app.set('view engine', 'handlebars');

// uncomment when favicon.ico exists
// app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

// override POST to have DELETE and PUT
app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

// module gets exported as app.
module.exports = app;
