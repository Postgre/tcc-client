module.exports = function CustomerEventsController( $scope ) {

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
