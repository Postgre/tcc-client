var app = angular.module('market-events', []);
app.controller("MarketEventsController", MarketEventsController);

function MarketEventsController($scope){
    $scope.market = {};
    $scope.events = [];

    (function init(){
        var mkt = window.navService.getNavParams().market;
        $scope.market = mkt;

        var promise = window.dataService.getMarketEvents(mkt.id);
        promise.then(function(res){
            console.log("res", res);
            $scope.$apply(function(){
                $scope.events = res.data;
            });
        });
        promise.catch(function(err){
            console.log("err", err);
        });
    })();
}