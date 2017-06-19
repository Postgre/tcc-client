var app = angular.module("customer-events", ["ngRoute"]);
app.config( function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: ""
        })
        .when("/details", {
            templateUrl: "../../../angular/customer-events/event-details/details.htm"
        })
});