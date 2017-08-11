angular.module("home")
    .controller("HomeController", HomeController);

function HomeController($scope) {
    $scope.daterange = null;
    $scope.quote = {};
    $scope.form = {};

    $scope.handleGetQuote = () => {
        let data = parseQuoteRequest($scope.daterange);
        let quoteRequest = new QuoteRequest(data, dataService);
        console.log(quoteRequest);
        quoteRequest.submit().then((data) => {
                $scope.quote = data.quote;
                $scope.quote.market = data.market;
                $scope.$apply();
                console.log($scope);
                $("#quoteModal").modal("show");
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
                swal("Wait a Minute!", "You can't book a past date", "warning")
            }
            if (reason === "INVALID_DATE_END") {
                swal("Wait a Minute!", "Your end date is before your start date", "warning")
            }
        })
    };
    $scope.handleBookNow = () => {
        window.navService.goto("book_event", {
            market_id: $scope.quote.market.id,
            quote_id: $scope.quote.id
        });
    };

    function init() {
        let today = new Date();
        let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        let nowHour = today.getHours();
        $scope.daterange = $(".daterange").daterangepicker({
            "opens": "center",
            timePicker: true,
            timePickerIncrement: 60,
            startDate: date + " " + (nowHour + 1) + ":00",
            endDate: date + " " + (nowHour + 2) + ":00",
            locale: {
                format: 'MM-DD hh:mm'
            },
            "buttonClasses": "button button-rounded button-mini nomargin",
            "applyClass": "button-color",
            "cancelClass": "button-light"
        });

        $(window).load(function () {
            window.dataService.getResourceAll("markets", {
                published: true
            }).then((markets) => {
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
                    })
                }
                renderMap(markers);
            }).catch(window.somethingWentWrong);
        });
    }

    function parseQuoteRequest(daterange) {
        let form = document.forms.quoteForm;
        return {
            start_time: daterange.data('daterangepicker').startDate.format("YYYY-MM-DD hh:mm"),
            end_time: daterange.data('daterangepicker').endDate.format("YYYY-MM-DD hh:mm"),
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