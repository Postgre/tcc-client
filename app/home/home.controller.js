angular.module("home")
    .controller("HomeController", HomeController);

function HomeController($scope) {
    $scope.daterange = null;
    $scope.quote = {};
    $scope.form = {
        caroler_config: "quartet"
    };

    let quoteRequest = null;
    $scope.handleGetQuote = () => {
        let data = parseQuoteRequest();
        let qr = new QuoteRequest(data, dataService);
        qr.submit().then((data) => {
                $scope.quote = data.quote;
                $scope.quote.market = data.market;
                $scope.market = data.market;
                $scope.$apply();
                $("#quoteModal").modal("show");
                quoteRequest = qr;
                quoteRequest.id = $scope.quote.id;
        }).catch((reason) => {
            if (reason === "INVALID_DATE_TIME") {
                swal("Oops..", "Invalid Date Time", "error");
            }
            if (reason === "BAD_ADDRESS") {
                swal("Bad Address", "Address could not be resolved", "error")
            }
            if (reason === "INVALID_DISTANCE") {
                swal("No Results", "No markets were found near you", "warning")
            }
            if (reason === "DURATION_TOO_SHORT") {
                swal("Invalid Duration", "The minimum duration for events is 1 hour", "warning")
            }
            if (reason === "DURATION_TOO_LONG") {
                swal("Invalid Duration", "The maximum duration for events is 10 hours", "warning")
            }
            if (reason === "INVALID_DATE_START") {
                swal("Wait a Minute!", "That date has already passed.", "warning")
            }
            if (reason === "INVALID_DATE_END") {
                swal("Wait a Minute!", "Your end date is before your start date", "warning")
            }
        })
    };
    $scope.handleSaveQuote = () => {
        $("#quoteModal").modal("hide");
        swal({
                title: "Send Quote to Email",
                text: "You can book it later!",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Your Email"
            },
            function(inputValue){
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }

                quoteRequest.save(inputValue).then(()=>{
                    swal("Done!", "We've sent the quote to your email", "success");
                }).catch(somethingWentWrong);
            });
    };

    function init() {
        /* date and time pickers */
        $scope.bind_date = new Date();
        $scope.bind_start = null;
        $scope.bind_end = null;
        $scope.$watch('bind_date', function (value) {
            $scope.updateTimes();
        });
        // end

        let today = new Date();
        let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        let nowHour = today.getHours();
        $scope.daterange = $(".daterange").daterangepicker({
            "showWeekNumbers": true,
            "timePicker": true,
            "timePicker24Hour": true,
            "dateLimit": {
                "days": 1
            },
            "startDate": "08/10/2017",
            "endDate": "08/16/2017"
        });

        $(window).load(function () {
            window.dataService.getResourceAll("markets", {
                published: 1
            }).then((markets) => {
                console.log("markets", markets);
                let markers = [];
                for (let i = 0; i < markets.length; i++) {
                    let mkt = markets[i];
                    markers.push({
                        address: formatAddress(mkt.address, mkt.city, mkt.state),
                        icon: {
                            image: "images/icons/map-icon-red.png",
                            iconsize: [32, 39],
                            iconanchor: [16, 36]
                        }
                    });
                    console.log(mkt);
                }
                renderMap(markers);
            }).catch(window.somethingWentWrong);
        });
    }

    $scope.updateTimes = function updateTimes() {
        let DATETIME_FORMAT = "YYYY-MM-DD HH:MM:SS";
        let date_format = DATETIME_FORMAT.split(" ")[0];
        let time_format = DATETIME_FORMAT.split(" ")[1];
        let d = $scope.bind_date;
        let s = $scope.bind_start;
        let e = $scope.bind_end;
        $scope.start = moment(d).format(date_format) + " " + moment(s).format(time_format);
        $scope.end =   moment(d).format(date_format) + " " + moment(e).format(time_format);
    };

    function parseQuoteRequest() {
        let form = document.forms.quoteForm;
        return {
            start_time: $scope.start,
            end_time: $scope.end,
            address: formatAddress(form.address.value, form.city.value, $scope.form.state,),
            caroler_config: form.caroler_config.value
        }
    }

    init();
}


function renderMap(markers) {
    $('#popular-dest-map').gMap({
        address: 'United States',
        maptype: 'ROADMAP',
        zoom: 4,
        markers: markers,
        doubleclickzoom: false,
        controls: {
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        },
        styles: [{
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{"visibility": "on"}, {"color": "#e0efef"}]
        }, {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{"visibility": "on"}, {"hue": "#1900ff"}, {"color": "#c0e8e8"}]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"lightness": 100}, {"visibility": "simplified"}]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{"visibility": "on"}, {"lightness": 700}]
        }, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#7dcdcd"}]}]
    });
}