angular.module("event-single")
.controller("EventSingleController", EventSingleController);

function EventSingleController($scope){

    $scope.booking = {};

    function init(){
        /* load the booking */
        let booking_id = getQueryVariable("booking");
        let booking = modelFactory.get("Booking", booking_id);
        booking.subscribe("ready", function(){
            $scope.booking = booking;
            $scope.$apply();
        });
        // end

        /* start countdown */
        var newDate = new Date(2019, 2, 31);
        $('#countdown-ex2').countdown({until: newDate});
        // end
    }

    init();
}