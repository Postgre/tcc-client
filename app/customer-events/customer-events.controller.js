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

        function ready(){
            $scope.$apply();
        }

        let now = moment().format("YYYY-MM-DD");
        /* load upcoming events */
        modelFactory.all("Booking", {
            where: "end_time > "+now
        }).then((events)=>{
            let calData = {};
            events.forEach(function(event){
                // loading into calendar format
                let date = moment(event.start_time);
                event.startDate = date.format("D");
                event.startMonth = date.format("MMM");
                calData[date.format("MM-DD-YYYY")] = event.name;
            });
            loadCalendar(calData);
            $scope.upcoming = events;
            ready();
        });
        // end
        /* load past events */
        modelFactory.all("Booking", {
            where: "end_time < "+now
        }).then((events)=>{
            events.forEach(function(event){
                let date = moment(event.start_time);
                event.startDate = date.format("D");
                event.startMonth = date.format("MMM");
            });

            $scope.past = events;
            ready();
        });
        // end
    }
}