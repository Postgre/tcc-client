angular.module('market-search')
    .controller('MarketSearchController', MarketSearchController);

function MarketSearchController($scope) {
    $scope.markets = [];
    $scope.form = {
        radius: false,
    };

    $scope.search = function (form) {
        params = {
            address: form.city + ", " + form.state,
            published: true
        };
        Object.assign(params, form);
        dataService.searchMarketsGeo(params)
            .then((_markets) => {
                console.log(_markets);
                _markets.forEach(
                    _market => _market.base_rate =
                        _market.rate_caroler_first +
                        _market.rate_caroler_second +
                        _market.rate_caroler_third +
                        _market.rate_caroler_fourth);
                $scope.markets = _markets;
                $scope.$apply();
            },
            (err) => console.log(err)
        );
    };
    $scope.openMap = function (market) {
        window.open("https://maps.google.com/maps?q=" + market.city + ',+' + market.state);
    };
    $scope.openPage = function (market) {
        window.navService.goto("market_page", {
            market_id: market.id
        })
    };
    $scope.handleBookNow = function (market) {
        navService.goto("book_event", {
            market_id: market.id
        })
    };
    $scope.calcBaseRate = function (market) {
        return hour4 = window.calcMarketPrice(4, market.rate_caroler_base, market.rate_caroler_discount);
    };

    (function init() {
        $scope.search($scope.form);
    })();
}