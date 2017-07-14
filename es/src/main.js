/* Configuration */
const config = require('../../config.json');

/* Custom Services */
const jQuery = require('jQuery');
const AuthService = require('./services/AuthService.js');
const DataService = require('./services/DataService.js');
const ApplicationService = require('./services/ApplicationService');
const RenderSession = require('./services/RenderSession');

/* Initalizing Libraries */
window.authService = new AuthService(config);
window.dataService = new DataService(config, AuthService);
window.renderSession = new RenderSession( new ApplicationService() );
