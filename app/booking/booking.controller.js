angular.module('booking')
    .controller('BookingController', function BookingController($scope, dataService, authService) {
        $scope.booking = {};
        let tabMap = {
            "eventDetails": {
                id: 0,
                prev: false,
                validator: function(data){
                    let valid = true;
                    if(!data.market_id){ valid = false; swal("Invalid Market"); }
                    if(!data.start_time){ valid = false; swal("Invalid Start Time"); }
                    if(!data.end_time) { valid = false; swal("Invalid End Time"); }
                    return valid;
                }
            },
            "personalDetails": {
                id: 1,
                validator: function(data){
                    if(!data.name){
                        swal("Invalid Event Name");
                        return false;
                    }
                    return true;
                }
            },
            "travel": {
                id: 2,
                validator: function(data){
                    return new Promise((resolve, reject)=>{
                        if(!data.city || !data.state || !data.address){
                            alert("Please fill out all fields");
                            reject();
                        }
                        $scope.booking.getInvoicePreview()
                            .then(
                                (invoice) => {
                                    $scope.invoice = invoice;
                                    $scope.$apply();
                                    resolve();
                                },
                                (err)=>{
                                    swal("Invalid Travel Details", err.response.data.status, "error");
                                    reject();
                                });
                    });
                },
                async: true
            },
            "summary": {
                id: 3
            },
            "review": {
                id: 4,
                validator: function(data){
                    if(!authService.isLoggedIn()){
                        swal("Ready to Book", "You'll just need to create an account first!", "info");
                        return false;
                    }
                    return true;
                }
            },
            "confirmation": {
                id: 5
            }
        };

        function init() {
            $scope.process_tabs = $("#processTabs").tabs({
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

        /* helpers */
        $scope.stepToTravel = function(){
            if(!$scope.booking.market_id){
                alert("No Market Selected!"); return false;
            }
            return true;
        };
        $scope.stepTo = function (tab_number) {
            $scope.process_tabs.tabs("option", "active", tab_number);
        };
        // end

        $scope.next = function (current){
            let step = () => {
                $scope.process_tabs.tabs("enable", tab.id+1);
                $scope.stepTo(tab.id+1);
                $scope.process_tabs.tabs("disable", tab.id);
            };

            // validate. go to next.
            let tab = tabMap[current];
            if(!tab.validator) {
                step();
                return;
            }
            if(!tab.async){
                let result = tab.validator($scope.booking);
                if(result === true) step();
            }
            if(tab.async){
                let p = tab.validator($scope.booking);
                p.then(step);
            }
        };
        $scope.prev = function (current){
            let tab = tabMap[current];
            $scope.process_tabs.tabs("enable", tab.id-1);
            $scope.stepTo(tab.id-1);
            $scope.process_tabs.tabs("disable", tab.id);
        };

        init();
    })
    .controller("EventDetailsController", function DetailsController($scope){
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
                if(!$scope.market){
                    $scope.booking.market_id = null;
                    return;
                }
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

        $scope.handleMultipleEvents = handleMultipleEvents;
        function handleMultipleEvents(){
            swal("Coming Soon!", "Please pardon our progress", "info");
        }
    })
    .controller("PersonalDetailsController", function PersonalDetailsController($scope){
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

        $scope.handleConfirmBooking = function handleConfirmBooking() {
            if(!$scope.booking.name){
                swal("Invalid Form", "Please make sure you've filled all required fields", "warning"); return;
            }
            $scope.booking.submit().then(
                (data) => {
                    $scope.booking.id = data.id;
                    $scope.booked = true;
                    $scope.$apply();
                }, (err) => {
                    alert("Invalid Booking");
                }
            )
        };
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
            window.tscope = $scope;
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
            $scope.loadingTravel = true;
            $scope.booking.getTravelPreview($scope.booking.market_id)
                .then((report) => {
                    console.log("Travel Preview", report);
                    $scope.travelPreview = report;
                    $scope.loadingTravel = false;
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
    .controller("SummaryController", function($scope){
        // nothing to see here
    })
    .controller("ReviewController", function QuoteController($scope){

        $scope.applyPromo = function () {
            let tryIt = (code) => {
                console.log("Trying..");
                $scope.booking.applyPromoCode(code).then((promo) => {
                    swal("Success!", `Promo '${promo.name}' has been applied`, "success");
                    reload();
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
            reload();
        };
        $scope.handleEmailQuote = handleEmailQuote;

        function reload(){
            $scope.booking.getInvoicePreview().then((invoice) => {
                $scope.invoice = invoice;
                $scope.$apply();
            });
        }
        function handleEmailQuote(){
            swal("Coming Soon!", "pardon our progress", "info");
        }
    })
    .controller("ConfirmationController", function($scope){

    });