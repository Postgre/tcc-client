const axios = require('axios');

/* Configuration */
const site = require('../../config/site.json');
const nav = require('../../config/nav.json');
const schema = require('../../config/schema.json');
const modelClassMap = require('./modelClassMap');

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
            swal({
                title: "Your Session has Expired",
                text: "Please <a href='login-register.html'>Login</a> Again to Continue",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Ok",
                html: true,
                closeOnConfirm: false
            },
            function(){
                window.location = "index.php";
            });
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
        'Content-type': 'application/x-www-form-urlencoded',
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