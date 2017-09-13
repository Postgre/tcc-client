const axios = require('axios');

/**
 * CONFIGURATION
 * ========================
 */
let site_local = require('../../config/site-local.json');
let site_master = require('../../config/site-master.json');
let site_dev = require('../../config/site-dev.json');
let site = site_master;
// detect environment
let host = window.location.host;
if(host.startsWith("markets")) site = site_master;
if(host.startsWith("dev")) site = site_dev;
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
    console.info("Overriding URL: ", localStorage.hostOverride);
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

authService.subscribe("newToken", function(){
    dataService.connection = axios.create({
        baseURL: site.serverURL,
        headers: {
            'Authorization': 'Bearer ' + authService.jwt
        }
    });
});

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
tcc.FilledService = require('./lib/filled/FilledService');
tcc.Braintree = require("./lib/braintree/Braintree");
tcc.qs = require('qs');

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
tcc.bindings = new Bindings(authService, appService);
tcc.bindings.apply();
const jQuery = require('jQuery');
jQuery(document).ready(function () {
    appService.renderSession();
});