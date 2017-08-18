angular.module('booking')
    .controller('BookingController', BookingController);

function BookingController($scope) {
    /**
     * Models
     * ===============
     */
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

    /**
     * Init
     * ===============
     */
    (function init() {
        let market_id = getQueryVariable('market');
        if(!market_id) alert("No market set!");

        initTabs();
        initDatepicker();
        $scope.booking = window.modelFactory.create("Booking");
        Object.assign($scope.booking, DEFAULT);
        let market = modelFactory.get("Market", market_id);
        market.subscribe("ready", function () {
            $scope.booking.market_id = market.id;
            $scope.$apply();
        });
        $scope.market = market;
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
        $scope.booking.getTravelPreview($scope.market.id)
            .then((report) => {
                console.log("Travel Preview", report);
                $scope.travelPreview = report;
                $scope.$apply();
            }).catch((err) => {
            let r = err.response.data.status;
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
            .then((data) => {
                $scope.booking.id = data;
                process_tabs.tabs("enable", 3);
                $scope.stepTo(3);
                $scope.$apply();
            }).catch(somethingWentWrong);
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


    function initDatepicker() {
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
        }).on('apply.daterangepicker', function (ev, picker) {
            $scope.$apply(function () {
                $scope.booking.start_time = picker.startDate.format("MM/DD/YYYY h:mm A");
                $scope.booking.end_time = picker.endDate.format("MM/DD/YYYY h:mm A");
            });
        });
    }
}

window.process_tabs = null;

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

const DEFAULT = {
    name: "Test Event",
    start_time: "8/19/2017 8:00PM",
    end_time: "8/19/2017 10:00PM",
    state: "NJ",
    city: "Atlantic City",
    address: "Martin Luther King Dr."
};