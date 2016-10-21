// dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
// const hbs = require('handlebars');
const exphbs = require('express-handlebars');
// const hbsHelpers = require('./js/hbsHelpers')
const methodOverride = require('method-override');

// controllers
const app_controller = require('./controllers/app_controller');
const location_controller = require('./controllers/location_controller');
const data_controller = require('./controllers/data_controller');
const user_controller = require('./controllers/user_controller');
const risk_controller = require('./controllers/risk_controller');
const overview_controller = require('./controllers/overview_controller');

// instantiate  app
const app = express();

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

app.use('/', app_controller, user_controller, risk_controller, overview_controller);
app.use('/location', location_controller);
app.use('/data', data_controller);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler
// no stacktraces leaked to user unless in development environment
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: (app.get('env') === 'development') ? err : {}
//     });
// });

// module gets exported as app.
module.exports = app;
