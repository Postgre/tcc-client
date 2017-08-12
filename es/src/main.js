/* Configuration */
const site = require('../../config/site.json');
const nav = require('../../config/nav.json');
const schema = require('../../config/schema.json');
const modelClassMap = require('./modelClassMap');

if(localStorage.api) site.serverURL = localStorage.api;

/* Services */
const AuthService = require('./services/AuthService');
const DataService = require('./services/DataService');
const ApplicationService = require('./services/ApplicationService');
const Bindings = require('./Bindings');
const NavService = require('./services/NavService');

let authService = new AuthService(site, window.localStorage);
let dataService = new DataService(site, authService);

/* ORM Models */
const ModelFactory = require('./models/core/ModelFactory');
let modelFactory = new ModelFactory(dataService, modelClassMap, schema);

/* Libraries */
const QuoteRequest = require('./lib/quote/QuoteRequest');
const CarolerConfigs = require('./lib/caroler_configs/CarolerConfigs');
const SpecialDate = require('./lib/special_date/SpecialDate');

/* Escaping Webpack */
window.authService = authService;
window.dataService = dataService;
window.modelFactory = modelFactory;
window.QuoteRequest = QuoteRequest;
window.CarolerConfigs = CarolerConfigs;
window.SpecialDate = SpecialDate;

/* Document Functions */
require('./functions');
window.navService = new NavService(nav);
window.appService = new ApplicationService();
new Bindings(authService, appService).apply();
const jQuery = require('jQuery');
jQuery(document).ready(function () {
    appService.renderSession();
});
/* Subscribe to Auth Events */
authService.subscribe('expired', function(e){
    swal("Your Session has expired", "Please log in again", "waring");
    window.navService.goto('home');
});
authService.subscribe('logout', function(e){
    window.navService.goto('home');
});