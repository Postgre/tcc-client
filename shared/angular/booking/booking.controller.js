module.exports = function BookingController( $scope ) {

    $scope.event = DEFAULT_MODEL.event;
    $scope.selectedMarket = DEFAULT_MODEL.market;
    $scope.invoice = DEFAULT_MODEL.invoice;
    $scope.travel_costs = DEFAULT_MODEL.travel_costs;

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
        $(".daterange").daterangepicker({
            "opens": "center",
            timePicker: true,
            timePickerIncrement: 30,
            locale: {
                format: 'MM/DD/YYYY h:mm A'
            },
            "buttonClasses": "button button-rounded button-mini nomargin",
            "applyClass": "button-color",
            "cancelClass": "button-light"
        }).on('apply.daterangepicker', function(ev, picker) {
            $scope.$apply( function(){
                $scope.event.start_time = picker.startDate.format("MM/DD/YYYY h:mm A");
                $scope.event.end_time = picker.endDate.format("MM/DD/YYYY h:mm A");
            });
        });
        window.market = $scope.selectedMarket;
    }
}

const DEFAULT_MODEL = {
    event: {
        name: "Rocco's Christmas Party",
        state: "AL",
        city: "Birmingham",
        venue: "1617 13th Avenue South",
        type: "company",
        company_name: "Vector Web Development",
        start_time: "07/19/2017 10:00 AM",
        end_time: "07/19/2017 12:00 AM",
        details: [],
        special_requests: "Send midgets if you have any. Please, thanks."
    },
    market: {
        name: "The Birmingham Carolers",
        description: "Beautiful Birmingham is known for its impressive skyline. That skyline lights up even brighter at Christmas, when holiday lights adorn every corner. From the Zoolight Safari at Birmingham Zoo to the city tree lighting ceremony, there’s a lot to love.",
        address: "Birmingham, AL",
        banner: "http://soulofamerica.com/soagalleries/birmingham/enjoy/Birmingham-skyline.jpg"
    },
    invoice: {
        carolers: 400,
        travel: 43,
        parking: 0,
        toll_roads: 0,
        special_dates: 0,
        promos: -20,
        total: 423
    },
    travel_costs: {
        miles: 32,      // miles
        time: 44,       // minutes
        miles_fee: 8,   // USD
        time_fee: 28,   // USD
        tolls: 6        // USD
    }
};
