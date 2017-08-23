angular.module("home")
    .controller("HomeController", HomeController);

function HomeController($scope) {
    $scope.quote = {};
    /* instant quote form */
    $scope.address = "1500 1st Avenue North";
    $scope.city = "Birmingham";
    $scope.state = "AL";
    $scope.caroler_config = "quartet";
    // end

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

        dataService.getResourceAll("markets", {
            published: 1
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
                });
            }
            renderMap(markers);
        }).catch(window.somethingWentWrong);
    }

    $scope.updateTimes = function updateTimes() {
        let DATETIME_FORMAT = "MM/DD/YYYY HH:MM";
        let date_format = DATETIME_FORMAT.split(" ")[0];
        let time_format = DATETIME_FORMAT.split(" ")[1];
        let d = $scope.bind_date;
        let s = $scope.bind_start;
        let e = $scope.bind_end;
        $scope.start = moment(d).format(date_format) + " " + moment(s).format(time_format);
        $scope.end =   moment(d).format(date_format) + " " + moment(e).format(time_format);
        console.log($scope.start, $scope.end);
    };

    // TODO: make this re-usable
    $scope.truncate = function truncate(marketBio, id){
        let charLimit = 255;
        if(marketBio.length <= charLimit) return marketBio;
        return marketBio.substring(0, charLimit) + `... &nbsp <a href='market-page.php?market=${id}'>see more</a>`;
    };

    function parseQuoteRequest() {
        return {
            start_time: $scope.start,
            end_time: $scope.end,
            address: formatAddress($scope.address, $scope.city, $scope.state,),
            caroler_config: $scope.caroler_config
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