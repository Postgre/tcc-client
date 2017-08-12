angular.module('market-page')
.controller('MarketPageController', MarketPageController);

function MarketPageController( $scope ) {
    $scope.market = {};

    /**
     * Functions
     * ===============
     */
    function init(){
        let market_id = navService.getNavParam('market_id');
        if(getQueryVariable('market')) market_id = getQueryVariable('market');

        let market = modelFactory.get("Market", market_id);
        market.subscribe("async", function(){
            $scope.$apply();
        });
        market.$promise.then(()=>loadMap(market.getFormattedAddress()));
        $scope.market = market;

        /* Older */
        // modelFactory.find("Market", market_id).then((market)=>{
        //     $scope.market = market;
        //     $scope.$apply();
        //     loadMap($scope.market.getFormattedAddress());
        // });

        /* Oldest */
        // var promise = window.dataService.getMarket( navService.getNavParams().market_id );
        // promise.then(function(res){
        //     console.log("res", res);
        //     var mkt = res.data.market;
        //     $scope.$apply(function(){
        //         $scope.market = mkt;
        //     });
        //     loadMap( mkt.address+', '+mkt.city,', '+mkt.state);
        //     $("#viewMap").attr('href', 'https://maps.google.com/maps?q='+mkt.address+','+mkt.city+','+mkt.state);
        // });
        // promise.catch(function(err){
        //     console.log("err", err);
        //     alert("something went wrong");
        // });
    }
    init();
}

function loadMap(address) {
    jQuery('#event-location').gMap({
        address: address,
        maptype: 'ROADMAP',
        zoom: 8,
        markers: [
            {
                address: address
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