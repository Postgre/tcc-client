angular.module('booking')
    .controller('BookingController', BookingController);

function BookingController($scope) {
    /**
     * Models
     * ===============
     */
    $scope.event = {};
    $scope.market = {};
    $scope.invoice = {};
    $scope.travel_costs = {};

    /**
     * Functions
     * ===============
     */
    $scope.previewTravelCosts = previewTravelCosts;
    function previewTravelCosts() {
        if (!$("#travel_form").valid()) return;
        // do stuff
        // api call => update travel_costs
        console.log($scope.event);
        var p = window.dataService.previewTravel($scope.market.id, $scope.event.address, $scope.event.city, $scope.event.state);
        p.then(function (res) {
            console.info("res", res);
            $scope.$apply(function () {
                $scope.travel_costs.cost_travel_distance = res.data.cost_travel_distance;
                $scope.travel_costs.cost_travel_duration = res.data.cost_travel_duration;
                $scope.travel_costs.distance = res.data.distance;
                $scope.travel_costs.duration = res.data.duration;
            });
        });
        p.catch(function (err) {
            console.error("err", err);
        });
    }

    /**
     * Init
     * ===============
     */
    (function init() {
        /* Check for a quote */
        var quote_id = window.getQueryVariable("quote_id");
        if (quote_id) {
            // load the data from the quote
        }

        /* get the market object from the server */
        var nav_params = navService.getNavParams();
        console.log(nav_params);
        if (typeof nav_params === "undefined") {
            navService.goto("find_market");
            return;
        }
        var p = window.dataService.getMarket(nav_params.market_id);
        p.then(function (res) {
            console.log("res", res);
            $scope.$apply(function () {
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
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.$apply(function () {
                $scope.event.start_time = picker.startDate.format("MM/DD/YYYY h:mm A");
                $scope.event.end_time = picker.endDate.format("MM/DD/YYYY h:mm A");
            });
        });
    })();

    $("#state").on("change", function () {
        var val = $("#state").val();
        $scope.$apply(function () {
            $scope.event.state = val;
        });
        console.log($scope.event.state);
    });

    $scope.stepToTravel = stepToTravel;
    $scope.stepToReview = stepToReview;
    $scope.stepToConfirm = stepToConfirm;
    $scope.stepTo = stepTo;
    function stepToTravel() {
        // validate 'Event Details'
        if (!$("#details_form").valid()) return;
        if( !$scope.event.type ){
            alert("please select event type");
            return;
        }
        if( !$scope.event.type ){
            alert("please select event type");
            return;
        }
        if( !$scope.event.caroler_count ||
            $scope.event.caroler_count == ""){
            alert("please select a caroler configuration");
            return;
        }
        if( !$scope.event.start_time ||
            !$scope.event.end_time ){
            alert("please select a start and end time");
            return;
        }

        proccess_tabs.tabs("enable", 1);
        proccess_tabs.tabs("option", "active", 1);
    }
    function stepToReview() {
        // validate 'Travel Details'
        if( !$scope.event.state ){
            alert("please provide event state");
            return;
        }
        if( !$scope.event.city ){
            alert("please provide event city");
            return;
        }
        if( !$scope.event.address ){
            alert("please provide event address");
            return;
        }
        if (!$("#travel_form").valid()) return;
        // form is valid
        // generate quote
        var p = window.dataService.postQuote(
            $scope.event.address+', '+$scope.event.city+', '+$scope.event.state,
            $scope.event.start_time,
            $scope.event.end_time,
            $scope.event.caroler_count
        );
        p.then(function(res){
            console.info("res", res);
            $scope.$apply(function(){
                $scope.invoice.cost_carolers = res.data.quote.cost_carolers;
                $scope.invoice.cost_date = res.data.quote.cost_date;
                $scope.invoice.cost_discounts = res.data.quote.cost_discounts;
                $scope.invoice.tax = res.data.quote.cost_tax;
                $scope.invoice.cost_travel = res.data.quote.cost_travel;
                $scope.invoice.cost_total = res.data.quote.cost_total;
            });
        });
        p.catch(function(err){
            console.error("err", err);
            ;
        });
        // step forward
        proccess_tabs.tabs("enable", 2);
        proccess_tabs.tabs("option", "active", 2);
    }
    function stepToConfirm() {
        // generate quote
        proccess_tabs.tabs("enable", 3);
        proccess_tabs.tabs("option", "active", 3);
    }
    function stepTo(tab_number) {
        // submit booking
        proccess_tabs.tabs("option", "active", tab_number);
    }
}

const selector_daterange = ".daterange";
var proccess_tabs = null;
$(document).ready(function () {
    proccess_tabs = $("#processTabs").tabs({
        show: {effect: "fade", duration: 400},
        disabled: [1, 2, 3]
    });
});

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
        cost_travel_distance: "___",      // miles
        cost_travel_duration: "___",       // minutes
        distance: "___",   // USD
        duration: "___",   // USD
        tolls: 6        // USD
    }
};