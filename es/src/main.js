/* Configuration */
const config = require('../../config.json');
const schema = require('../../schema.json');
const modelClassMap = require('./modelClassMap');

/* Services */
const AuthService = require('./services/AuthService');
const DataService = require('./services/DataService');
const ApplicationService = require('./services/ApplicationService');
const Bindings = require('./Bindings');
const NavService = require('./services/NavService');

let authService = new AuthService(config, window.localStorage);
let dataService = new DataService(config, authService);

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
window.navService = new NavService(config);
window.appService = new ApplicationService();
new Bindings(authService, appService).apply();
const jQuery = require('jQuery');
jQuery(document).ready(function () {
    appService.renderSession();
});