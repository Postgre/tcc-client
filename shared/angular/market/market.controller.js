angular.module('market')
.controller('MarketController', MarketController);

function MarketController( $scope ) {
    $scope.market = DEFAULT_MODEL.market;
    $scope.gallery = DEFAULT_MODEL.gallery;
    init();

    /**
     * Functions
     * ===============
     */

    function init(){
        var loc = $scope.market.address + " " + $scope.market.city + ", " + $scope.market.state
        jQuery('#event-location').gMap({
            address: loc,
            maptype: 'ROADMAP',
            zoom: 15,
            markers: [
                {
                    address: loc
                }
            ],
            doubleclickzoom: false,
            controls: {
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false
            }
        });
    }
}

const DEFAULT_MODEL = {
    market: {
        name: "The Birmingham Carolers",
        description: "Birmingham's best holiday entertainment",
        html: 'Beautiful Birmingham is known for its impressive skyline. That skyline lights up even brighter at Christmas, when holiday lights adorn every corner. From the Zoolight Safari at Birmingham Zoo to the city tree lighting ceremony, there’s a lot to love.',
        city: "Birmingham",
        state: "AL",
        zip: 35205,
        address: "1617 13th Avenue South",
        email: "chris.rocco7@gmail.com",
        phone: 2056396666,
        video: "https://www.youtube.com/watch?v=DA2QpqgIq6g",
        specialDates: [ {} ],
        image: "http://soulofamerica.com/soagalleries/birmingham/enjoy/Birmingham-skyline.jpg",
        hourlyRates: {
            "1": 100,
            "2": 100,
            "3": 100,
            "4": 100,
            "5": 100
        },
        discounts: {
            "10-20":    .10,
            "21-30":    .14,
            "31-40":    .17,
            "41+":      .20
        },
        carolerConfigurations: {
            sab:        true,
            stb:        false,
            satb:       true,
            ssattb:     false,
            ssattbb:    false
        },
        squareCash: "$JohnDoe"
    },
    gallery: [
        {
            name: "Rocco's Christmas Party",
            where: "Sammy's, Valley Ave",
            thumb: "https://pbs.twimg.com/media/CRnzjIVVAAALvN3.jpg",
            overlay: "https://pbs.twimg.com/media/CRnzjIVVAAALvN3.jpg"
        },
        {
            name: "Christmas Work Party",
            where: "The M-Lounge",
            thumb: "https://blog.samuel-windsor.co.uk/wp-content/uploads/2015/12/office-party-group.jpg",
            overlay: "https://blog.samuel-windsor.co.uk/wp-content/uploads/2015/12/office-party-group.jpg"
        }
    ]
};