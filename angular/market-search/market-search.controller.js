angular.module('market-search')
.controller('MarketSearchController', MarketSearchController);

function MarketSearchController( $scope ) {
    $scope.markets = DEFAULT_MODEL.markets;
    $scope.search = DEFAULT_MODEL.search;

    init();

    function init(){

    }
}

const DEFAULT_MODEL = {
    markets: [
        {
            name: "The Birmingham Carolers",
            description: "Birmingham's best holiday entertainment",
            location: "Birmingham, AL",
            image: "http://soulofamerica.com/soagalleries/birmingham/enjoy/Birmingham-skyline.jpg",
            badge: "LLC",
            baseRate: 99.99
        },
        {
            name: "The New York Carolers",
            description: "New York's best holiday entertainment",
            location: "New York, NY",
            image: "http://www.nationalgeographic.com/new-york-city-skyline-tallest-midtown-manhattan/assets/img/articleImg/01nyskyline640.jpg",
            badge: "LLC",
            baseRate: 99.99
        },
        {
            name: "The Miami Carolers",
            description: "Miami's best holiday entertainment",
            location: "Miami, FL",
            image: "https://media-cdn.tripadvisor.com/media/photo-s/05/a4/fb/7e/miami-beach.jpg",
            badge: "LLC",
            baseRate: 99.99
        }
    ],
    search: {
        state: "AL",
        city: "Birmingham",
        radius: {
            "a": false,
            "b": false,
            "c": false,
            "d": true,
        }
    }
};