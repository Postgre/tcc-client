const axios = require('axios');

/* Configuration */
const site = require('../../config/site.json');
const callbacks = require('../../config/callbacks.json');
Object.assign(site, {callbacks: callbacks});
const nav = require('../../config/nav.json');
const schema = require('../../config/schema.json');
const modelClassMap = require('./modelClassMap');

/* allow Caleb to point at his local server */
if(localStorage.hostOverride){
    site.serverURL = localStorage.hostOverride;
    console.log("Using server URL: ", localStorage.hostOverride);
}
window.api = function(url){
    localStorage.hostOverride = url;
    console.log("Changed Server URL to: ", localStorage.hostOverride);
    console.log("Reload page for changes to take effect");
};
window.reset = function(){
    if(typeof localStorage.hostOverride === 'undefined'){
        console.log("Already using default host: ", site.serverURL);
        return;
    }
    delete localStorage.hostOverride;
    console.log("Server URL reset.");
    console.log("Reload page for changes to take effect");
};

/* Services */
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

let authService = new AuthService(site, window.localStorage, observers);
let connection = axios.create({
    baseURL: site.serverURL,
    headers: {
        // 'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + authService.jwt
    }
});
let dataService = new DataService(connection, site);

/* ORM Models */
const AxiosDriver = require('./models/core/drivers/AxiosDriver');
const ModelFactory = require('./models/core/ModelFactory');
let axiosDriver = new AxiosDriver(connection);
let modelFactory = new ModelFactory(axiosDriver, modelClassMap, schema, dataService);

/* Libraries */
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

/* Document Functions */
require('./functions');
window.navService = new NavService(nav);
window.appService = new ApplicationService();
new Bindings(authService, appService).apply();
const jQuery = require('jQuery');
jQuery(document).ready(function () {
    appService.renderSession();
});