angular.module('markets')
.controller('MarketsController', MarketsController);

function MarketsController( $scope ) {
    $scope.markets = DEFAULT_MODEL.markets;
    $scope.upcoming_events = DEFAULT_MODEL.upcoming_events;
    init();
    /**
     * Models
     * ===============
     */

    /**
     * Functions
     * ===============
     */

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
            badge: "LLC"
        },
        {
            name: "The New York Carolers",
            description: "New York's best holiday entertainment",
            location: "New York, NY",
            image: "http://www.nationalgeographic.com/new-york-city-skyline-tallest-midtown-manhattan/assets/img/articleImg/01nyskyline640.jpg",
            badge: "LLC"
        },
        {
            name: "The Miami Carolers",
            description: "Miami's best holiday entertainment",
            location: "Miami, FL",
            image: "https://media-cdn.tripadvisor.com/media/photo-s/05/a4/fb/7e/miami-beach.jpg",
            badge: "LLC"
        }
    ],
    upcoming_events: [
        {
            name: "Rocco's Christmas Party",
            state: "AL",
            city: "Birmingham",
            venue: "1617 13th Avenue South",
            type: "company",
            company_name: "Vector Web Development",
            start_time: "07/19/2017 10:00 AM",
            end_time: "07/19/2017 12:00 AM",
            details: [],
            description: "We'll have a jolly-good time.",
            special_requests: "Send midgets if you have any. Please, thanks.",
            image: "http://www.blogingbloging.com/wp-content/uploads/2013/08/christmas-party.jpg",
            status: "Not Paid"
        }
    ]
};