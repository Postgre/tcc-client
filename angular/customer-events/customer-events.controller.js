angular.module("customer-events", [])
    .controller('CustomerEventsController', CustomerEventsController);

function CustomerEventsController( $scope ) {

    $scope.upcoming_events = DEFAULT_MODEL.upcoming_events;
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
        var promise = window.dataService.getMyEvents();
        promise.then(function(res){
            console.log("res", res);
            $scope.$apply(function(){
                var calData = {};
                $scope.upcoming_events = res.data;
                $scope.upcoming_events.forEach(function(event){
                    var date = moment(event.start_time);
                    event.startDate = date.format("D");
                    event.startMonth = date.format("MMM");
                    calData[date.format("MM-DD-YYYY")] = event.name;
                });
                loadCalendar(calData);
            });
        });
        promise.catch(function(err){
            console.log("err", err);
        });
    }
}

const DEFAULT_MODEL = {
    upcoming_events: [
        {
            name: "Rocco's Christmas Party",
            state: "AL",
            city: "Birmingham",
            venue: "1617 13th Avenue South",
            type: "company",
            company_name: "Vector Web Development",
            start_time: "07/19/2017 10:00 AM",
            end_time: "07/19/2017 12:00 AM",
            details: [],
            description: "We'll have a jolly-good time.",
            special_requests: "Send midgets if you have any. Please, thanks.",
            image: "http://www.blogingbloging.com/wp-content/uploads/2013/08/christmas-party.jpg",
            status: "Not Paid"
        }
    ]
};