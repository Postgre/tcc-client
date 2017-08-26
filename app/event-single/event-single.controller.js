angular.module("event-single")
.controller("EventSingleController", EventSingleController);

EventSingleController.$inject = ['$scope'];
function EventSingleController($scope){
    $scope.booking = {};
    $scope.host = {
        name: "Chris Rocco"
    };
    $scope.parts = [
        {
            name: "Alto",
            user: "Caroler Joe",
            image: "https://image.flaticon.com/icons/svg/145/145859.svg"
        },
        {
            name: "Soprano",
            user: "Caroler Bob",
            image: "https://image.flaticon.com/icons/svg/288/288508.svg"
        },
        {
            name: "Tenor",
            user: false
        }
    ];

    function init(){
        /* load the booking */
        let booking_id = getQueryVariable("booking");
        let booking = modelFactory.get("Booking", booking_id);
        booking.subscribe("ready", function(){
            loadMap(booking.getFormattedAddress());
            $scope.booking = booking;
            $scope.$apply();

            /* start countdown */
            let newDate = moment($scope.booking.start_time).toDate();
            $('#countdown-ex2').countdown({until: newDate});
            // end

            /* load the market */
            $scope.market = modelFactory.get("Market", booking.market_id);
            $scope.market.subscribe("ready", function(){ $scope.$apply(); });
            // end
        });
        // end
    }

    function loadMap(address) {
        $('#event-location').gMap({
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

    init();
}