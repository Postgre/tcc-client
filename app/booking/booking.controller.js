angular.module('booking')
    .controller('BookingController', BookingController);

function BookingController($scope) {
    /**
     * Models
     * ===============
     */
    $scope.market       = {};
    $scope.booking      = {};
    $scope.invoice      = {};
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
        initTabs();
        initDatepicker($scope);
        $scope.booking = window.modelFactory.create("Booking");
        /* load quote if exists */
        if(navService.getNavParams().query){
            $scope.booking.setData(navService.getNavParams().query);
            console.log("query", navService.getNavParams().query);
            console.log("booking", $scope.booking);
        }
        console.log("CREATED", $scope.booking);
        // $scope.booking  = window.modelFactory.create("Booking");
        window.modelFactory.find("Market", window.navService.getNavParams().market_id).then((market)=>{
            console.log($scope.booking);
            $scope.market = market;
            $scope.booking.market_id = $scope.market.id;
            $scope.$apply();
        });
        window.market   =   $scope.market;
    })();

    /**
     * Functions
     * ===============
     */
    $scope.previewTravelCosts = function previewTravelCosts() {
        updateMap();
        $scope.booking.getTravelPreview($scope.market.id)
            .then((report)=>{
                console.log("Travel Preview", report);
                $scope.travelPreview = report;
                $scope.$apply();
            }).catch((err)=>{
                let r = err.response.data.status;
                alert(r);
            });
    };
    function updateMap(){
        if(!$scope.booking.validateAddress()){
            alert("Invalid Address");
            return;
        }

        let pins = [{
            address: $scope.booking.getFormattedAddress(),
            icon: {
                image: "images/icons/map-icon-red.png",
                iconsize: [32, 39],
                iconanchor: [16, 36]
            }
        }];

        // load into the map
        const map = jQuery('#google-map-custom').gMap({address: 'United States',
            maptype: 'ROADMAP',
            zoom: 4,
            markers: pins,
            doubleclickzoom: false,
            controls: {
                panControl: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false
            }
        });
    }

    $scope.applyPromo = function (){
        let tryIt = (code) => {
            console.log("Trying..");
            $scope.booking.applyPromoCode(code).then((promo)=>{
                swal("Success!", `Promo '${promo.name}' has been applied`, "success");
                reloadInvoicePreview();
            }).catch((err)=>{
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
            function(inputValue){
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

    $scope.stepToTravel     = function () {
        // validate 'Event Details'
        if( !$scope.booking.validateDetails()){
            alert("Please fill out all event details");
            return;
        }

        process_tabs.tabs("enable", 1);
        $scope.stepTo(1);
    };
    $scope.stepToReview     = function () {
        if(!$scope.booking.validateAddress()){
            swal("Invalid Address", "Please check the provided location", "error");
            return;
        }
        $scope.booking.getInvoicePreview()
            .then((invoice)=>{
                $scope.invoice = invoice;
                $scope.$apply();

                process_tabs.tabs("enable", 2);
                $scope.stepTo(2);
            }).catch(somethingWentWrong);
    };
    $scope.stepToConfirm    = function () {
        $scope.booking.submit()
            .then(()=>{
                process_tabs.tabs("enable", 3);
                $scope.stepTo(3);
            }).catch(somethingWentWrong);
    };
    $scope.stepTo           = function (tab_number) {
        process_tabs.tabs("option", "active", tab_number);
    };

    function reloadInvoicePreview(){
        $scope.booking.getInvoicePreview()
            .then((invoice)=> {
                $scope.invoice = invoice;
                $scope.$apply();
            }).catch(somethingWentWrong);
    }
}

window.process_tabs = null;
function initTabs(){
    process_tabs = $("#processTabs").tabs({
        show: {effect: "fade", duration: 400},
        disabled: [1, 2, 3]
    });
}

const selector_daterange = ".daterange";
function initDatepicker($scope){
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
            $scope.booking.start_time = picker.startDate.format("MM/DD/YYYY h:mm A");
            $scope.booking.end_time = picker.endDate.format("MM/DD/YYYY h:mm A");
        });
    });
}