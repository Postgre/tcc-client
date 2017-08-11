angular.module("customer-events")
    .controller('CustomerEventsController', CustomerEventsController);

function CustomerEventsController( $scope ) {

    $scope.upcoming_events = [];
    init();
    /**
     * Models
     * ===============
     */

    /**
     * Functions
     * ===============
     */

    /**
     * Init
     * ===============
     */
    function init(){
        loadCalendar({});
        dataService.getMyEvents().then(
            (events)=>{
                let calData = {};
                events.forEach(function(event){
                    // loading into calendar format
                    let date = moment(event.start_time);
                    event.startDate = date.format("D");
                    event.startMonth = date.format("MMM");
                    calData[date.format("MM-DD-YYYY")] = event.name;
                });
                loadCalendar(calData);
                $scope.upcoming_events = events;
                $scope.$apply();
            }
        );
    }
}