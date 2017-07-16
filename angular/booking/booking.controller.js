angular.module('booking')
.controller('BookingController', BookingController);

function BookingController( $scope ) {
    /**
     * Models
     * ===============
     */
    $scope.event = {};
    $scope.market = {};
    $scope.invoice = {};
    $scope.travel_costs = {};

    init();

    /**
     * Functions
     * ===============
     */
    $scope.previewTravelCosts = previewTravelCosts;
    function previewTravelCosts(){
        // do stuff
        // api call => update travel_costs
    }

    /**
     * Init
     * ===============
     */
    function init(){
        /* Check for a quote */
        var quote_id = window.getQueryVariable("quote_id");
        if( quote_id ){
            // load the data from the quote
        }

        /* get the market object from the server */
        var nav_params = navService.getNavParams();
        console.log(nav_params);
        if( typeof nav_params === "undefined" ){
            navService.goto("find_market");
            return;
        }
        var p = window.dataService.getMarket( nav_params.market_id );
        p.then(function(res){
            console.log("res", res);
            $scope.$apply(function(){
                $scope.market = res.data.market;
                window.market = $scope.market;
            });
        });

        /* Setup directive for the daterangepicker plugin */
        $(selector_daterange).daterangepicker({
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
    }
}

const selector_daterange = ".daterange";

const DEFAULT_MODEL = {
    event: {
        name: "",
        state: "",
        city: "",
        venue: "",
        type: "",
        company_name: "",
        start_time: "",
        end_time: "",
        details: [],
        special_requests: ""
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