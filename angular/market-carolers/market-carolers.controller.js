var app = angular.module('market-carolers', []);
app.controller("MarketCarolersController", MarketCarolersController);

function MarketCarolersController($scope){
    $scope.market = {};
    $scope.carolers = [];

    (function init(){
        var mkt = window.navService.getNavParams().market;
        $scope.market = mkt;
        var promise = window.dataService.getMarketCarolers(mkt.id);
        promise.then(function(res){
            console.log("res", res);
            $scope.$apply(function(){
                $scope.carolers = res.data.carolers;
            });
        });
        promise.catch(function(err){
            console.log("err", err);
            alert("something went wrong");
        });
    })();
}