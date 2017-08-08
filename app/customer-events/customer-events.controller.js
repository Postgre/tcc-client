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