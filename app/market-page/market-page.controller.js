angular.module('market-page')
.controller('MarketPageController', MarketPageController);

function MarketPageController( $scope ) {
    $scope.market = {};
    $scope.carolers = [];
    $scope.base_rate = -1; // this is how much it costs to book a 1 hour event with 4 carolers

    function init(){
        let market_id = navService.getNavParam('market_id');
        if(getQueryVariable('market')) market_id = getQueryVariable('market');

        let market = modelFactory.get("Market", market_id);
        market.loadGallery();
        market.subscribe("async", function(){
            $scope.$apply();
        });
        market.$promise.then(()=>{
            loadMap(market.getFormattedAddress());
            $scope.base_rate = market.rate_caroler_first * 4;
            $scope.$apply();
        });
        $scope.market = market;

        dataService.getMarketCarolers(market_id).then((carolers)=>{
            $scope.carolers = carolers;
            $scope.$apply();
        })

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
                    title: "Enter Your Email",
                    text: "We'll notify you when the director responds",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Your Email"
                },
                function(inputValue){
                    if (inputValue === false) return false;

                    if (inputValue === "") {
                        swal.showInputError("You need to write something!");
                        return false
                    }
                    sendRequest(inputValue);
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
            sendRequest(authService.user.email);
        });
    };

    function sendRequest(email){
        console.log(email);
        console.log($scope.market.id);
        dataService.sendCarolerRequest($scope.market.id, email)
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

    init();
}