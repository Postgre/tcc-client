/* Configuration */
const config = require('../../config.json');

/* Custom Services */
const jQuery = require('jQuery');
const AuthService = require('./services/AuthService.js');
const DataService = require('./services/DataService.js');
const ApplicationService = require('./services/ApplicationService');
const Bindings = require('./Bindings');

/* Initalizing Libraries */
window.appService = new ApplicationService();
window.authService = new AuthService(config);
window.dataService = new DataService(config, authService);
new Bindings( authService, appService ).apply();

/* Global Functions */
require('./functions');

jQuery(document).ready(function(){
    appService.renderSession();
});