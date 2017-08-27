angular.module('booking')
    .controller('BookingController', function BookingController($scope) {
        let process_tabs = null;

        $scope.booking = {};

        function init() {
            process_tabs = $("#processTabs").tabs({
                show: {effect: "fade", duration: 400},
                disabled: [1, 2, 3]
            });
            /* new blank booking */
            $scope.booking = window.modelFactory.create("Booking");
            // end

            /* load existing booking */
            if(localStorage.booking){
                let saved = JSON.parse(localStorage.booking);
                $scope.emit("load", saved);
            }
            // end
        }

        /* Tab 1: Event Details */
        $scope.stepToTravel = function () {
            let check = $scope.booking.validateDetails();
            if (check !== "all good!") {
                swal("Hmm", "Please check field: "+check, "warning");
                return;
            }

            if(!$scope.booking.market_id){
                swal("Hey!", "You need to select a market", "warning");
                return;
            }

            process_tabs.tabs("enable", 1);
            $scope.stepTo(1);
        };
        // end

        /* Tab 2: Travel Fees */
        $scope.stepToReview = function () {
            if (!$scope.booking.validateAddress()) {
                swal("Invalid Address", "Please check the provided location", "error");
                return;
            }
            $scope.$broadcast("loadQuote");
            process_tabs.tabs("enable", 2);
            $scope.stepTo(2);
        };
        // end

        /* Tab 3: Review Event */
        $scope.handleBookIt = function () {
            if(!authService.isLoggedIn()){
                swal("Book Now!", "Before you can book this event, you'll need to login or create an account", "warning");
            }

            process_tabs.tabs("enable", 3);
            $scope.stepTo(3);
        };
        $scope.applyPromo = function () {
            let tryIt = (code) => {
                console.log("Trying..");
                $scope.booking.applyPromoCode(code).then((promo) => {
                    swal("Success!", `Promo '${promo.name}' has been applied`, "success");
                    renderInvoicePreview($scope.booking);
                }).catch((err) => {
                    swal("Hmm..", "We couldn't find that code", "warning");
                    console.log("fail", err);
                });
            };
            swal({
                    title: "Enter Your Code:",
                    text: "",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Ex: XMAS2017"
                },
                function (inputValue) {
                    if (inputValue === false) return false;
                    if (inputValue === "") {
                        swal.showInputError("You need to write something!");
                        return false
                    }
                    tryIt(inputValue);
                });
        };
        $scope.removePromo = (code) => {
            $scope.booking.removePromoCode(code);
            renderInvoicePreview($scope.booking);
        };
        // end

        /* Tab 4: Book Event */
        $scope.handleConfirmBooking = function handleConfirmBooking() {
            if(!$scope.booking.name){
                swal("Invalid Form", "Please make sure you've filled all required fields", "warning");
                return;
            }

            $scope.booking.submit()
                .then(
                    (data) => {
                        $scope.booking.id = data.id;
                        $scope.booked = true;
                        $scope.$apply();
                    },
                    (err) => {
                        let r = err.response.data.status;
                        if(r === "INVALID_DISTANCE"){
                            notifyTooFar(); return;
                        }
                        somethingWentWrong();
                    }
                )
        };
        // end

        /* helpers */
        $scope.stepTo = function (tab_number) {
            process_tabs.tabs("option", "active", tab_number);
        };
        // end

        init();
    })
    .controller("DetailsController", function DetailsController($scope){
        let DATETIME_FORMAT = "YYYY-MM-DD HH:MM";
        let DATE_FORMAT = DATETIME_FORMAT.split(" ")[0];
        let TIME_FORMAT = DATETIME_FORMAT.split(" ")[1];

        $scope.markets = [];
        $scope.market = {};
        $scope.config = 'quartet';
        $scope.start = null;
        $scope.end = null;
        $scope.duration = null;

        function init(){
            /* load all markets */
            let market_id = parseInt(getQueryVariable("market"));
            function loadMarkets(markets){
                $scope.markets = markets;
                $scope.market = $scope.markets[0];
                if( market_id !== null ){
                    $scope.markets.forEach((market)=>{
                        if(market.id === market_id){
                            $scope.market = market;
                        }
                    });
                }
                $scope.$apply();
            }
            modelFactory.all("Market", { published: 1 }, "carolerConfigs").then(loadMarkets);
            $scope.$watch("market", function(){
                $scope.booking.market_id = $scope.market.id;
                console.log("watch(market):", $scope.booking);
            });
            // end

            /* date and time pickers */
            $scope.duration = 1;
            $scope.date = moment().add(7, 'days').format("MM/DD/YYYY");
            $scope.start = moment($scope.date).add(2, 'hours');
            $scope.end = moment($scope.start).add($scope.duration, 'hours');
            $scope.$watchGroup(["date", "start", "duration"], function(){
                let times = formatStartEnd();
                $scope.booking.start_time = times[0];
                $scope.booking.end_time = times[1];
                console.log("watch(date,start,duration)", $scope.booking);
            });
            // end

            /* caroler config */
            $scope.$watch("config", function(){
                $scope.booking.caroler_config = $scope.config;
                console.info("watch(config)", $scope.booking);
            });
            // end
        }

        init();

        function formatStartEnd(){
            let d = $scope.date;
            let s = $scope.start;
            let e = moment(s).add($scope.duration, 'hours');
            let start_time = moment(d).format(DATE_FORMAT) + " " + moment(s).format(TIME_FORMAT);
            let end_time = moment(d).format(DATE_FORMAT) + " " + moment(e).format(TIME_FORMAT);
            return [start_time, end_time];
        }
    })
    .controller("TravelController", function TravelController($scope){
        $scope.state = null;
        $scope.city = null;
        $scope.address = null;
        $scope.parking = "";
        $scope.other = "";
        $scope.travelPreview = {
            costs: {},
            metrics: {}
        };

        function init(){
            $scope.$watchGroup(["state", "city", "address"], function(){
                $scope.booking.state = $scope.state;
                $scope.booking.city = $scope.city;
                $scope.booking.address = $scope.address;
                console.info("watch(state,city,address)", $scope.booking);
            });
        }

        $scope.previewTravelCosts = function previewTravelCosts() {
            if (!$scope.booking.validateAddress()) {
                alert("Invalid Address");
                return;
            }
            googleMap($scope.booking.getFormattedAddress());
            $scope.booking.getTravelPreview($scope.booking.market_id)
                .then((report) => {
                    console.log("Travel Preview", report);
                    $scope.travelPreview = report;
                    $scope.$apply();
                }).catch((err) => {
                    let r = err.response.data.status;
                    if(r === "INVALID_DISTANCE"){
                        swal("Woah!", "That's too far out", "error");
                        return;
                    }
                    alert(r);
                });
        };
        function googleMap(address) {
            jQuery('#google-map-custom').gMap({
                address: address,
                maptype: 'ROADMAP',
                zoom: 8,
                markers: [
                    {
                        address: address
                    }
                ],
                doubleclickzoom: false,
                controls: {
                    panControl: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false
                }
            });
        }

        init();
    })
    .controller("QuoteController", function QuoteController($scope){
        $scope.invoice = {};
        $scope.date = moment($scope.booking.start_time).format("MM/DD/YYYY");
        $scope.start = moment($scope.booking.start_time).format("HH:MM");
        $scope.end = moment($scope.booking.end_time).format("HH:MM");
    })
    .controller("MoreDetailsController", function MoreDetailsController($scope){
        $scope.type = "public";
        $scope.details = "";
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
    })
    .directive("tccQuote", function (){
        return {
            require: "^QuoteController",
            scope: {
                booking: "="
            },
            controller: function($scope){
                $scope.valid = false;
                function render(){
                    $scope.booking.getInvoicePreview()
                        .then((invoice) => {
                            $scope.invoice = invoice;
                            $scope.$apply();
                        });
                }
                $scope.$on("loadQuote", function(){
                    if($scope.booking.validate()){
                        $scope.valid = true;
                        render();
                    } else {
                        $scope.valid = false;
                    }
                });
            },
            template: `<table ng-show="valid" class="table cart">
                            <tbody>
                            <tr class="cart_item">
                                <td class="cart-product-name">
                                    <strong>Caroler Cost</strong>
                                </td>
                                <td class="cart-product-name">
                                    $ <span ng-bind="invoice.carolers + invoice.date" class="amount"></span>
                                </td>
                            </tr>
                            <tr class="cart_item">
                                <td class="cart-product-name">
                                    <strong>Travel Fees</strong>
                                </td>
                                <td class="cart-product-name">
                                    $<span ng-bind="invoice.travel" class="amount"></span>
                                </td>
                            </tr>
                            <tr class="cart_item">
                                <td class="cart-product-name">
                                    <strong>Promos</strong>
                                </td>
                                <td class="cart-product-name">
                                    $<span ng-bind="invoice.discounts" class="amount"></span>
                                </td>
                            </tr>
                            <tr class="cart_item">
                                <td class="cart-product-name">
                                    <strong>Total</strong>
                                </td>
                                <td class="cart-product-name">
                                    <span class="amount color lead">
                                        $<strong ng-bind="invoice.total"></strong>
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <p ng-hide="valid">Invalid Booking Details</p>`
        }
    });