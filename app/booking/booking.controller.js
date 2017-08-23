angular.module('booking')
    .controller('BookingController', BookingController);

function BookingController($scope) {
    let process_tabs = null;
    let DATETIME_FORMAT = "YYYY-MM-DD HH:MM";
    let DATE_FORMAT = DATETIME_FORMAT.split(" ")[0];
    let TIME_FORMAT = DATETIME_FORMAT.split(" ")[1];
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
     * Models
     * ===============
     */
    $scope.markets = [];
    $scope.market = null;
    $scope.booking = {};
    $scope.invoice = {};
    $scope.travelPreview = {
        costs: {},
        metrics: {}
    };

    $scope.updateTimes = function() {
        let d = $scope.bind_date;
        let s = $scope.bind_start;
        let e = $scope.bind_end;
        $scope.booking.start_time = moment(d).format(DATE_FORMAT) + " " + moment(s).format(TIME_FORMAT);
        $scope.booking.end_time =   moment(d).format(DATE_FORMAT) + " " + moment(e).format(TIME_FORMAT);
    };

    /**
     * Init
     * ===============
     */
    function init() {
        initTabs();

        /* load all markets */
        modelFactory.all("Market", {published: 1}, "carolerConfigs").then(
            (markets)=>{
                $scope.markets = markets;
                $scope.market = $scope.markets[0];
                if( market_id = parseInt(getQueryVariable('market')) ){
                    $scope.markets.forEach((market)=>{
                        if(market.id === market_id){
                            $scope.market = market;
                        }
                    });
                }
                $scope.ready = true;
                $scope.$apply();
            }
        );
        // end

        /* date and time pickers */
        let date = moment().add(7, 'days');
        let start = moment(date);
        let end = moment(start).add(2, 'hours');
        $scope.bind_date = date;
        $scope.bind_start = start;
        $scope.bind_end = end;
        $scope.$watch('bind_date', function (value) {
            $scope.updateTimes();
        });
        // end

        /* state select */
        $scope.bind_state = null;
        $scope.$watch("bind_state", function(){
            $scope.booking.state = $scope.bind_state;
        });
        // end

        /* new blank booking */
        $scope.booking = window.modelFactory.create("Booking");
        $scope.$watch("market", ()=>{
            if(!$scope.market) return;
            $scope.booking.market_id = $scope.market.id;
            $scope.booking.state = $scope.market.state;
            $scope.booking.city = $scope.market.city;
        });
        $scope.updateTimes();
        // end
    }


    /* Tab 1: Event Details */
    $scope.stepToTravel = function () {
        let check = $scope.booking.validateDetails();
        if (check !== "all good!") {
            swal("Hmm", "Please check field: "+check, "warning");
            return;
        }

        if(!$scope.market){
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
        renderInvoicePreview($scope.booking).then(
            () => {
                process_tabs.tabs("enable", 2);
                $scope.stepTo(2);
            }
        );
    };
    $scope.previewTravelCosts = function previewTravelCosts() {
        if (!$scope.booking.validateAddress()) {
            alert("Invalid Address");
            return;
        }
        googleMap($scope.booking.getFormattedAddress());
        console.log($scope.market.id);
        $scope.booking.getTravelPreview($scope.market.id)
            .then((report) => {
                console.log("Travel Preview", report);
                $scope.travelPreview = report;
                $scope.$apply();
            }).catch((err) => {
            let r = err.response.data.status;
            if(r === "INVALID_DISTANCE"){
                notifyTooFar();
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
                reloadInvoicePreview();
            }).catch((err) => {
                swal("Hmm..", "We couldn't find that code", "warning");
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
        reloadInvoicePreview();
    };
    function renderInvoicePreview(booking) {
        $scope.inv_date = moment(booking.start_time).format(DATE_FORMAT);
        $scope.inv_start = moment(booking.start_time).format(TIME_FORMAT);
        $scope.inv_end = moment(booking.end_time).format(TIME_FORMAT);
        return booking.getInvoicePreview()
            .then((invoice) => {
                $scope.invoice = invoice;
                $scope.$apply();
            }).catch((err)=>{
                if(!err.response){
                    somethingWentWrong();
                    return;
                }
                let status = err.response.data.status;
                switch(status){
                    case "CONFIG_NOT_FOUND": alert("Please select a different caroler config"); break;
                    default:
                        alert("Error : "+status);
                }
            });
    }
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
    function initTabs() {
        process_tabs = $("#processTabs").tabs({
            show: {effect: "fade", duration: 400},
            disabled: [1, 2, 3]
        });
    }
    function notifyTooFar(){
        swal("Woah!", "That's too far out", "error");
    }
    // end

    init();
}