angular.module("home")
    .controller("HomeController", HomeController);

function HomeController($scope) {
    $scope.daterange = null;
    $scope.quote = {};

    $scope.handleGetQuote = () => {
        let data = parseQuoteRequest($scope.daterange);
        let quoteRequest = new QuoteRequest(data, dataService);
        console.log(quoteRequest);
        quoteRequest.submit()
            .then((data)=>{
                $scope.quote = data.quote;
                $scope.quote.market = data.market;
                $scope.$apply();
                console.log($scope);
                $("#quoteModal").modal("show");
            }).catch((err)=>{
                swal("Bad Address", "Address could not be resolved", "error");
            })
    };
    $scope.handleBookNow = () => {
        window.navService.goto("book_event", {
            market_id: $scope.quote.market.id,
            quote_id: $scope.quote.id
        });
    };

    function init(){
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
                        address: formatAddress(mkt.city, mkt.state, mkt.address),
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
    init();

}

function parseQuoteRequest(daterange) {
    let form = document.forms.quoteForm;
    return {
        start_time : daterange.data('daterangepicker').startDate.format("YYYY-MM-DD hh:mm"),
        end_time : daterange.data('daterangepicker').endDate.format("YYYY-MM-DD hh:mm"),
        address : formatAddress(form.city.value ,form.state.value ,form.address.value ),
        caroler_config : form.caroler_config.value
    }
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