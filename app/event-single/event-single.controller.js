angular.module("event-single")
.controller("EventSingleController", EventSingleController);

EventSingleController.$inject = ['$scope'];
function EventSingleController($scope){
    $scope.booking = {};
    $scope.host = {};
    $scope.enrollments = [];

    function init(){
        let booking_id = getQueryVariable("booking");

        /* load the booking */
        let booking = modelFactory.get("Booking", booking_id, ["user", "market", "leadCaroler"]);
        booking.subscribe("ready", function(){
            loadMap(booking.getFormattedAddress());
            $scope.booking = booking;
            $scope.market = modelFactory.create("Market", booking.market);
            $scope.host = booking.user;
            $scope.parts = booking;
            $scope.$apply();

            /* start countdown */
            let newDate = moment($scope.booking.start_time).toDate();
            $('#countdown-ex2').countdown({until: newDate});
            // end
        });
        // end

        /* load the enrollments */
        this.dataService.connection({
            url: `events/${booking_id}/enrollments`,
            method: "GET",
            params: {
                "with": ["user", "carolerType"]
            }
        }).then(
            (res) => {
                $scope.enrollments = res.data;
                $scope.$apply();
            }
        );
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