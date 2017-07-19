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
    $scope.updateAddress = updateAddress;
    function previewTravelCosts() {
        updateAddress();
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
    function updateAddress(){
        const map = jQuery('#google-map-custom').gMap();
        var p1 = $scope.event.state;
        var p2 = $scope.event.city;
        var p3 = $scope.event.address;
        var address = p3 + p2 + ", " + p1;
        var locationFinderIcon = jQuery(this).find('i');	// get the icon to animate
        locationFinderIcon.removeClass('icon-map-marker').addClass('icon-line-loader icon-spin');	// animate the icon
        // 1.) make pricing request to data-service
        // 2.) clear map markers
        // 3.) place market map marker
        // 4.) call geocoding api => place event map marker
        var market_lat = window.market.location.coordinates[0];
        var market_lng = window.market.location.coordinates[1];
        map.gMap('addMarker', {
            latitude: market_lat,
            longitude: market_lng,
            content: "Market Location",
            zoom: 12
        });
        map.gMap('clearMarkers');
        jQuery.ajax({
            url: 'http://maps.google.com/maps/api/geocode/json?address=' + encodeURI(address),		// request to google api
            //force to handle it as text
            dataType: "text",
            success: function (data) {
                var json = jQuery.parseJSON(data);
                map.gMap('addMarker', {
                    latitude: json.results[0].geometry.location.lat,
                    longitude: json.results[0].geometry.location.lng,
                    content: "Your Event",
                    zoom: 12
                });
                locationFinderIcon.removeClass('icon-line-loader icon-spin').addClass('icon-map-marker');
            }
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
        console.log( "event data", $scope.event );
        console.log( "market data", $scope.market );
        // window.dataService.postBooking( $scope.market.id, $scope.event );

        proccess_tabs.tabs("enable", 3);
        stepTo(3);
    }
    function stepTo(tab_number) {
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