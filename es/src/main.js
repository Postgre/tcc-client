const axios = require('axios');

/**
 * CONFIGURATION
 * ========================
 */
let site;
// detect environment
switch (window.location.host){
    case "localhost:8080": site = require('../../config/site-local.json'); break;
    case "markets.thechristmascarolers.com": site = require('../../config/site-master.json'); break;
    case "dev.thechristmascarolers.com": site = require('../../config/site-dev.json'); break;
    default: site = require('../../config/site-dev.json')
}
console.info("Using Server: ", site.serverURL);
const callbacks = require('../../config/callbacks.json');
Object.assign(site, {callbacks: callbacks});
const nav = require('../../config/nav.json');
const schema = require('../../config/schema.json');
const modelClassMap = require('./modelClassMap');

/**
 * CONFIGURATION OVERRIDES
 * ===================================
 */
if(localStorage.hostOverride){
    site.serverURL = localStorage.hostOverride;
    console.info("Using server URL: ", localStorage.hostOverride);
}

/**
 * APPLICATION SERVICES
 * ===================================
 */
const AuthService = require('./services/AuthService');
const DataService = require('./services/DataService');
const ApplicationService = require('./services/ApplicationService');
const Bindings = require('./Bindings');
const NavService = require('./services/NavService');

let observers = [
    {
        event: "expired",
        callback: function(){
            alert("Your session has expired. Please login again.");
        }
    },
    {
        event: "logout",
        callback: function(){
            window.location = "login-register.php";
        }
    }
];

/* instantiating */
let authService = new AuthService(site, window.localStorage, observers);
let connection = axios.create({
    baseURL: site.serverURL,
    headers: {
        'Authorization': 'Bearer ' + authService.jwt
    }
});
let dataService = new DataService(connection, site);

/**
 * BOOTSTRAPPING ACTIVE RECORD
 * ====================================
 */
const AxiosDriver = require('./models/core/drivers/AxiosDriver');
const ModelFactory = require('./models/core/ModelFactory');
let axiosDriver = new AxiosDriver(connection);
let modelFactory = new ModelFactory(axiosDriver, modelClassMap, schema, dataService);

/**
 * LIBRARIES
 * ======================
 */
const tcc = {};
const QuoteRequest = require('./lib/quote/QuoteRequest');
const CarolerConfigs = require('./lib/caroler_configs/CarolerConfigs');
const SpecialDate = require('./lib/special_date/SpecialDate');
tcc.Braintree = require("./lib/braintree/Braintree");

/* Escaping Webpack */
window.authService = authService;
window.dataService = dataService;
window.modelFactory = modelFactory;
window.QuoteRequest = QuoteRequest;
window.CarolerConfigs = CarolerConfigs;
window.SpecialDate = SpecialDate;
window.tcc = tcc;
window.navService = new NavService(nav);
window.appService = new ApplicationService();

/* Global Functions */
require('./functions');

/* Render */
new Bindings(authService, appService).apply();
const jQuery = require('jQuery');
jQuery(document).ready(function () {
    appService.renderSession();
});