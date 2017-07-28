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
    $scope.carolerConfigurations = [
        {
            name: "Trio ( S, A, B )",
            val: "trio_sab"
        },
        {
            name: "Trio ( S, T, B )",
            val: "trio_stb"
        },
        {
            name: "Quartets ( S, A, T, B )",
            val: "quartet"
        },
        {
            name: "Sixtets ( S, S, A, T, T, B )",
            val: "sixtet"
        },
        {
            name: "Octets ( S, S, A, A, T, T, B, B )",
            val: "octet"
        }
    ];
    $scope.eventTypes = [
        {
            name: "Public",
            val: "public"
        },
        {
            name: "Personal",
            val: "personal"
        },
        {
            name: "Company",
            val: "company"
        }
    ];

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
    function loadQuote(quote){
        $scope.event.state = quote.state;
        $scope.event.city = quote.city;
        $scope.event.address = quote.address;
        $scope.event.caroler_count = quote.caroler_count;
        $("#cc").selectpicker('val', quote.caroler_count);
        $scope.event.start_time = quote.start_time;
        $scope.event.end_time = quote.end_time;
        $(selector_daterange).data('daterangepicker').setStartDate(new Date(quote.start_time));
        $(selector_daterange).data('daterangepicker').setEndDate(new Date(quote.end_time));
        loadMarket(quote.market_id);
    }

    /**
     * Init
     * ===============
     */
    (function init() {
        /* Make sure nav params are test */
        if (typeof window.navService.getNavParams().market_id === "undefined") {
            navService.goto("find_market");
            return;
        }
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

        /* Check for a quote */
        var quote_id = window.getQueryVariable("quote_id");
        if (!quote_id) {
            quote_id = window.navService.getNavParams().quote_id;
        }
        if(quote_id){
            var promise = window.dataService.getQuote(quote_id);
            promise.then(function(res){
                console.log("quote", res);
                loadQuote(res.data.quote);
            });
            promise.catch(function(err){
                console.log("err", err);
            });
            return;
        }
        loadMarket(window.navService.getNavParams().market_id);
    })();
    function loadMarket(id) {
        var p = window.dataService.getMarket(id);
        p.then(function (res) {
            console.log("res", res);
            $scope.$apply(function () {
                $scope.market = res.data.market;
                window.market = $scope.market;
            });
        });
    }

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
        stepTo(1);
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
        var p = window.dataService.postQuotePreview(
            $scope.event.address+', '+$scope.event.city+', '+$scope.event.state,
            $scope.event.start_time,
            $scope.event.end_time,
            $scope.event.caroler_count,
            $scope.market.id
        );
        p.then(function(res){
            console.info("res quote preview", res);
            $scope.$apply(function(){
                var quote = res.data;
                $scope.invoice.cost_carolers = quote.cost_carolers;
                $scope.invoice.cost_date = quote.cost_date;
                $scope.invoice.cost_discounts = quote.cost_discounts;
                $scope.invoice.cost_travel_distance = quote.cost_travel_distance;
                $scope.invoice.cost_travel_duration = quote.cost_travel_duration;
                $scope.invoice.cost_total = quote.cost_total;
            });
            proccess_tabs.tabs("enable", 2);
            stepTo(2);
        });
        p.catch(function(err){
            console.error("err", err);
            if(err.status === "BAD_ADDRESS"){
                alert("Bad Address");
            }
        });
    }
    function stepToConfirm() {
        var eventData = {
            name: $scope.event.name,
            start_time: $scope.event.start_time,
            end_time: $scope.event.end_time,
            state: $scope.event.state,
            city: $scope.event.city,
            address: $scope.event.address,
            caroler_count: $scope.event.caroler_count,
        };
        console.log( "event data", eventData );

        var promise = window.dataService.postBooking( $scope.market.id, eventData);
        promise.then(function(res){
            console.log("res", res);
            proccess_tabs.tabs("enable", 3);
            stepTo(3);
        });
        promise.catch(function(err){
            console.log("err", err);
        });
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