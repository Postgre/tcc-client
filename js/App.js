/* App */
module.exports = class App{
  constructor(config, authService, dataService){
    console.info('App Loading...');

    /* Loading Angularjs */
    this.angular = require('angular');    

    /* Creating angular modules */
    this.angular.module("booking", []);
    this.angular.module("customer-events", []);
    this.angular.module("market", ['ngSanitize']);
    this.angular.module("markets", []);
    this.angular.module("profile", []);

    /* Load all controllers */
    this.angular.module('booking')
      .controller('BookingController', require('../shared/angular/booking/booking.controller.js'));

    this.angular.module('customer-events')
      .controller('CustomerEventsController', require('../shared/angular/customer-events/customer-events.controller.js'));

    this.angular.module('market')
      .controller('MarketController', require('../shared/angular/market/market.controller.js'));

    this.angular.module('markets')
      .controller('MarketsController', require('../shared/angular/markets/markets.controller.js'));

    this.angular.module('profile')
      .controller('ProfileController', require('../shared/angular/profile/profile.controller.js'));
  }
}
