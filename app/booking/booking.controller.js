angular.module('booking')
    .controller('BookingController', BookingController);

function BookingController($scope, $log) {
    window.log = function(){
        $log.log("booking", $scope.booking);
    };

    window.process_tabs = null;
    const DATETIME_FORMAT = "YYYY-MM-DD HH:MM:SS";

    $scope.ngModelOptionsSelected = function(value) {
        alert(value);
    };

    /**
     * Models
     * ===============
     */
    $scope.markets = [];
    $scope.market = {};
    $scope.booking = {};
    $scope.invoice = {};
    $scope.travelPreview = {
        costs: {},
        metrics: {}
    };
    $scope.carolerConfigurations = CarolerConfigs.options;
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

    $scope.updateTimes = function() {
        let date_format = DATETIME_FORMAT.split(" ")[0];
        let time_format = DATETIME_FORMAT.split(" ")[1];
        let d = $scope.bind_date;
        let s = $scope.bind_start;
        let e = $scope.bind_end;
        $scope.booking.start_time = moment(d).format(date_format) + " " + moment(s).format(time_format);
        $scope.booking.end_time =   moment(d).format(date_format) + " " + moment(e).format(time_format);
    };

    /**
     * Init
     * ===============
     */
    (function init() {
        initTabs();

        /* new blank booking */
        $scope.booking = window.modelFactory.create("Booking");
        $scope.booking.start_time = new Date();
        $scope.booking.end_time = new Date();
        // end

        /* date and time pickers */
        $scope.bind_date = new Date();
        $scope.bind_start = $scope.booking.start_time;
        $scope.bind_end = $scope.booking.end_time;
        $scope.$watch('bind_date', function (value) {
            $scope.updateTimes();
        });
        // end

        /* load all markets */
        modelFactory.all("Market", {published: 1}, "carolerConfigs").then(
            (markets)=>{
                $scope.markets = markets;
                if( market_id = getQueryVariable('market') ){
                    $scope.markets.forEach((market)=>{
                        if(market.id == market_id){
                            $scope.market = market;
                        }
                    });
                }
                $scope.ready = true;
                $scope.$apply();
            }
        );
        // end

        /* sync market with booking's market key */
        $scope.$watch("market", ()=>{ $scope.booking.market_id = $scope.market.id; });
        // end
    })();

    /**
     * Functions
     * ===============
     */
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

    $scope.stepToTravel = function () {
        // validate 'Event Details'
        if (!$scope.booking.validateDetails()) {
            alert("Please fill out all event details");
            return;
        }

        process_tabs.tabs("enable", 1);
        $scope.stepTo(1);
    };
    $scope.stepToReview = function () {
        if (!$scope.booking.validateAddress()) {
            swal("Invalid Address", "Please check the provided location", "error");
            return;
        }
        $scope.booking.getInvoicePreview()
            .then((invoice) => {
                $scope.invoice = invoice;
                $scope.$apply();

                process_tabs.tabs("enable", 2);
                $scope.stepTo(2);
            }).catch(somethingWentWrong);
    };
    $scope.stepToConfirm = function () {
        $scope.booking.submit()
            .then(
                (data) => {
                    $scope.booking.id = data;
                    process_tabs.tabs("enable", 3);
                    $scope.stepTo(3);
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
    $scope.stepTo = function (tab_number) {
        process_tabs.tabs("option", "active", tab_number);
    };

    function reloadInvoicePreview() {
        $scope.booking.getInvoicePreview()
            .then((invoice) => {
                $scope.invoice = invoice;
                $scope.$apply();
            }).catch(somethingWentWrong);
    }

    function initTabs() {
        process_tabs = $("#processTabs").tabs({
            show: {effect: "fade", duration: 400},
            disabled: [1, 2, 3]
        });
    }

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

    function notifyTooFar(){
        swal("Woah!", "That's too far out", "error");
    }

}