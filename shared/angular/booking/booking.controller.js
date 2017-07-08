angular.module('booking')
.controller('BookingController', BookingController);

function BookingController( $scope ) {
    init();

    $scope.event = DEFAULT_MODEL.event;
    $scope.selectedMarket = getMarketById( DEFAULT_MODEL.event.market_id );
    $scope.change = function(){
        console.log( $scope.event );
    }
    /**
     * Models
     * ===============
     */

    /**
     * Functions
     * ===============
     */

    /**
     * Init
     * ===============
     */
    function init(){
        $('.typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: substringMatcher(MOCK_MARKETS)
            });
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
        }).on('apply.daterangepicker', function(ev, picker) {
            $scope.$apply( function(){
                $scope.event.start_time = picker.startDate.format("MM/DD/YYYY h:mm A");
                $scope.event.end_time = picker.endDate.format("MM/DD/YYYY h:mm A");
            });
        });
    }
}

function getMarketById( id ){
    for( var i = 0; i < MOCK_MARKETS.length; i++ ){
        var m = MOCK_MARKETS[i];
        if(m.id == id) return m;
    }
}

var substringMatcher = function(markets) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(markets, function(i, mkt) {
            if (substrRegex.test(mkt.name)) {
                matches.push(mkt.name);
            }
        });

        cb(matches);
    };
};

const DEFAULT_MODEL = {
    event: {
        name: "Rocco's Christmas Party",
        state: "AL",
        city: "Birmingham",
        venue: "1617 13th Avenue South",
        type: "company",
        company_name: "Vector Web Development",
        start_time: "07/19/2017 10:00 AM",
        end_time: "07/19/2017 12:00 AM",
        details: [],
        special_requests: "White carolers only please",
        market_id: 123
    }
};

const MOCK_MARKETS = [
    {
        id: 123,
        name: "The Birmingham Carolers"
    },
    {
        id: 456,
        name: "The New York Carolers"
    }
];