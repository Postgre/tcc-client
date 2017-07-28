/* Configuration */
const config = require('../../config.json');

/* Custom Services */
const jQuery = require('jQuery');
const AuthService = require('./services/AuthService.js');
const DataService = require('./services/DataService.js');
const ApplicationService = require('./services/ApplicationService');
const NavService = require('./services/NavService');
const Bindings = require('./Bindings');
const ModelFactory = require('./models/ModelFactory');

/* Loading Data Classes */
require('./data_classes/loader');
/* Loading Model Classes */
require('./models/loader');

/* Initalizing Libraries */
window.appService = new ApplicationService();
window.navService = new NavService(config);
window.authService = new AuthService(config, navService);
window.dataService = new DataService(config, authService);
window.modelFactory = new ModelFactory(window.dataService, window.authService);
new Bindings( authService, appService ).apply();

/* Global Functions */
require('./functions');

jQuery(document).ready(function(){
    appService.renderSession();
});