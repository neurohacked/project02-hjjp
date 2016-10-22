module.exports = function(app) {

    // controllers
    const app_controller = require('./controllers/app_controller');
    const location_controller = require('./controllers/location_controller');
    const data_controller = require('./controllers/data_controller');
    const user_controller = require('./controllers/user_controller');
    const risk_controller = require('./controllers/risk_controller');
    const news_controller = require('./controllers/news_controller');

    app.use('/', app_controller, user_controller, risk_controller);
    app.use('/location', location_controller);
    app.use('/data', data_controller);

}
