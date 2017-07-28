angular.module('market-search')
.controller('MarketSearchController', MarketSearchController);

function MarketSearchController( $scope ) {
    $scope.markets = [];
    $scope.search = {};

    $scope.search = search;
    $scope.openMap = openMap;
    $scope.handleBookNow = handleBookNow;
    $scope.calcBaseRate = calcBaseRate;
    $scope.openPage = openPage;
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
    function openPage( market ){
        window.navService.goto("market_page", {
            market_id: market.id
        })
    }
    function handleBookNow( market ){
        navService.goto("book_event", {
            market_id: market.id
        })
    }
    function calcBaseRate(market){
        return hour4 = window.calcMarketPrice( 4, market.rate_caroler_base, market.rate_caroler_discount);
    }

    (function init(){
        search( "Birmingham, AL", false );
    })();
}