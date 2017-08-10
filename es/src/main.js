/* Configuration */
const config = require('../../config.json');

/* Services */
const AuthService = require('./services/AuthService');
const DataService = require('./services/DataService');
const ApplicationService = require('./services/ApplicationService');
const NavService = require('./services/NavService');
const Bindings = require('./Bindings');
window.appService = new ApplicationService();
window.navService = new NavService(config);
window.authService = new AuthService(config, window.localStorage);
window.dataService = new DataService(config, authService);
new Bindings(authService, appService).apply();

/* ORM Models */
const ModelFactory = require('./models/core/ModelFactory');
const Market = require('./models/Market');
const Booking = require('./models/Booking');
const PromoCode = require('./models/PromoCode');
const Reseller = require('./models/Reseller');
window.modelFactory = new ModelFactory(window.dataService, {
    Market, Booking, PromoCode, Reseller
});
window.Market = Market;
window.Booking = Booking;
window.PromoCode = PromoCode;
window.Reseller = Reseller;

/* Libraries */
const QuoteRequest = require('./lib/quote/QuoteRequest');
const CarolerConfigs = require('./lib/caroler_configs/CarolerConfigs');
const SpecialDate = require('./lib/special_date/SpecialDate');
window.QuoteRequest = QuoteRequest;
window.CarolerConfigs = CarolerConfigs;
window.SpecialDate = SpecialDate;

/* Global Functions */
require('./functions');
const jQuery = require('jQuery');
jQuery(document).ready(function () {
    appService.renderSession();
});