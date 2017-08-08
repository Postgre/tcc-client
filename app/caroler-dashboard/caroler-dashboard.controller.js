angular.module('caroler-dashboard')
    .controller('CarolerDashboardController', CarolerDashboardController);

function CarolerDashboardController($scope) {
    /**
     * Models
     * ===============
     */
    $scope.available_events = DEFAULT_MODEL.available_events;
    $scope.my_events = [];

    /**
     * Functions
     * ===============
     */
    $scope.handleClaimEvent = handleClaimEvent;
    $scope.handleWithdraw = handleWithdraw;
    function handleClaimEvent(event){
        promptClaimConfirm(function(boo){
            if(boo){
                // do ajax request. then ->
                notifyClaimed();
            }
        });
    }
    function handleWithdraw(event){}

    /**
     * Init
     * ===============
     */
    (function init() {

    })();
}

const DEFAULT_MODEL = {
    available_events: [
        {
            customer: "Rocco's Christmas Party",
            date_time: "11/15/17 8:30 PM",
            status: "Booked",
            parts: [ "soprano", "tenor", "alto" ]
        },
        {
            customer: "Depot Holiday Party",
            date_time: "11/25/17 5:30 PM",
            status: "Booked",
            parts: [ "alto", "bass" ]
        }
    ]
}