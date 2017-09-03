angular.module("tcc-single", ['tcc'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "app/home/home.html",
                controller : "HomeController"
            })
            .when("/home", {
                templateUrl : "app/home/home.html",
                controller : "HomeController"
            })
            .when("/caroler-list", {
                templateUrl : "app/caroler-list/caroler-list.html",
                controller : "CarolerListController"
            })
            .when("/markets-manage", {
                templateUrl : "app/markets-manage/markets-manage.html",
                controller : "MarketsManageController"
            })
            .when("/locations", {
                templateUrl : "app/market-search/market-search.html",
                controller : "MarketSearchController"
            })
            .when("/customer-events", {
                templateUrl : "app/customer-events/customer-events.html",
                controller : "CustomerEventsController"
            })
            .when("/event-book", {
                templateUrl : "app/event-book/event-book.html",
                controller : "BookingController"
            })
            .when("/promos", {
                templateUrl : "app/promos/promos.html",
                controller : "PromosController"
            })
            .when("/resellers", {
                templateUrl : "app/resellers/resellers.html",
                controller : "ResellersController"
            })
    });