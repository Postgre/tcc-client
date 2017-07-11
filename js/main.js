/* Configuration */
const config = require('../config.json');

/* Custom Services */
const AuthService = require('./services/AuthService.js');
const DataService = require('./services/DataService.js');
const jQuery = require('jQuery');
const App = require('./App.js');

/* Initalizing Libraries */
const authService = new AuthService(config);
const dataService = new DataService(config, AuthService);
const app = new App(config, authService, dataService, jQuery);
