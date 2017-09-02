angular.module("tcc-single", ['tcc'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "app/home/home.html",
                controller : "HomeController"
            })
            .when("/caroler-list", {
                templateUrl : "app/caroler-list/caroler-list.html",
                controller : "CarolerListController"
            });
    });