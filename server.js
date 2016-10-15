// dependencies
const express         = require('express');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const session         = require('express-session');
const exphbs          = require('express-handlebars');
const methodOverride  = require('method-override');

// controllers
const app_controller  = require('./controllers/app_controller');
const map_controller  = require('./controllers/map_controller');
const user_controller = require('./controllers/user_controller');

// instantiate  app
const app  = express();

// sessions
const sess = {
        secret: 'app',
        cookie: {
            maxAge: null
        },
        resave: true,
        saveUninitialized: true
    }

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

//set up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    dashboardLayout: 'dashboard'
}));
app.set('view engine', 'handlebars');

// uncomment when favicon.ico exists
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

// override POST to have DELETE and PUT
app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.use('/', app_controller);
app.use('/u', user_controller);
app.use('/map', map_controller);

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

// Where's the listen? Open up bin/www, and read the comments.
