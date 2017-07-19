angular.module('market-page')
.controller('MarketPageController', MarketPageController);

function MarketPageController( $scope ) {
    $scope.market = DEFAULT_MODEL.market;
    $scope.gallery = DEFAULT_MODEL.gallery;
    init();

    $scope.rate = function(){
        return window.calcMarketPrice(4, $scope.market.rate_caroler_base, $scope.market.rate_caroler_discount);
    };
    $scope.handleBookNow = function(){
        window.navService.goto("book_event", {
            market_id: $scope.market.id
        });
    };
    /**
     * Functions
     * ===============
     */
    function init(){
        var promise = window.dataService.getMarket( navService.getNavParams().market_id );
        promise.then(function(res){
            console.log("res", res);
            var mkt = res.data.market;
            $scope.$apply(function(){
                $scope.market = mkt;
            });
            loadMap( mkt.address+', '+mkt.city,', '+mkt.state);
            $("#viewMap").attr('href', 'https://maps.google.com/maps?q='+mkt.address+','+mkt.city+','+mkt.state);
        });
        promise.catch(function(err){
            console.log("err", err);
            alert("something went wrong");
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
        baseRate: 99.99,
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
            name: "Christmas Work Party",
            where: "The M-Lounge",
            thumb: "https://blog.samuel-windsor.co.uk/wp-content/uploads/2015/12/office-party-group.jpg",
            overlay: "https://blog.samuel-windsor.co.uk/wp-content/uploads/2015/12/office-party-group.jpg"
        }
    ]
};