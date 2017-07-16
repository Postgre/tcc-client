angular.module('market-search')
.controller('MarketSearchController', MarketSearchController);

function MarketSearchController( $scope ) {
    $scope.markets = DEFAULT_MODEL.markets;
    $scope.search = DEFAULT_MODEL.search;

    $scope.search = search;
    $scope.openMap = openMap;
    $scope.handleBookNow = handleBookNow;
    function search( address, radius, limit, offset ){
        var search_state = $("#search_state").val();
        if( !address ) address = $scope.search.city+", "+search_state;
        if( radius === 'undefined' ) radius = $scope.search.radius;
        if( !limit ) limit = null;
        if( !offset ) offset = null;
        var p = window.dataService.searchMarketsGeo( address, radius, limit, offset );
        p.then(function(res){
            console.info("res", res);
            $scope.$apply(function(){
                $scope.markets = res.data.markets;
            });
        });
        p.catch(function(err){
            console.error("err", err);
        });
    }
    function openMap( market ){
        window.open("https://maps.google.com/maps?q="+market.city+',+'+market.state);
    }
    function handleBookNow( market ){
        navService.goto("book_event", {
            market_id: market.id
        })
    }

    (function init(){
        search( "Birmingham, AL", false );
    })();
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
        city: "Birmingham",
        radius: false
    }
};