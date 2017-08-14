angular.module('market-page')
.controller('MarketPageController', MarketPageController);

function MarketPageController( $scope ) {
    $scope.market = {};
    $scope.base_rate = -1; // this is how much it costs to book a 1 hour event with 4 carolers

    function init(){
        let market_id = navService.getNavParam('market_id');
        if(getQueryVariable('market')) market_id = getQueryVariable('market');

        let market = modelFactory.get("Market", market_id);
        market.subscribe("async", function(){
            $scope.$apply();
        });
        market.$promise.then(()=>{
            loadMap(market.getFormattedAddress());
            $scope.base_rate =
                market.rate_caroler_first +
                market.rate_caroler_second +
                market.rate_caroler_third +
                market.rate_caroler_fourth;
            $scope.$apply();
        });
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

    $scope.handleBecomeCaroler = function handleBecomeCaroler(){
        if(!authService.isLoggedIn()){
            swal({
                title: "Become a Caroler",
                text: "Before requesting market access, you need to <a href='login-register.php'>create an account</a>",
                html: true
            });
            return;
        }
        swal({
            title: "Become a Caroler!",
            text: "We can send a caroler request to this city director on your behalf. Would you like to proceed?",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Yes, request access!",
            showLoaderOnConfirm: true,
            closeOnConfirm: false
        },
        function(){
            sendCarolerRequest();
        });
    };

    function sendCarolerRequest(){
        dataService.sendCarolerRequest($scope.market.id)
            .then(
                win => notifyRequestSent(),
                status => {
                    switch (status){
                        case 409: notifyDupes(); break;
                        default: somethingWentWrong();
                    }
                }
            );
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

function notifyRequestSent(){
    swal("Success!", "Your request has been sent to the city director", "success");
}
function notifyDupes(){
    swal("Wait a Minute!", "You're already a part of this market", "warning");
}