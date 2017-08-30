angular.module("caroler-single")
    .controller("CarolerSingleController", function ($scope) {
        $scope.user = [];
        $scope.caroler_profile = {};
        $scope.markets = [];
        $scope.events = [];
        $scope.types = [];

        function init() {
            window.scope = $scope;
            let caroler_id = getQueryVariable("caroler");
            dataService.carolerSingle(caroler_id).then((data) => {
                $scope.user = data.user;
                $scope.caroler_profile = data.caroler_profile;
                $scope.markets = data.markets;
                $scope.events = data.events;
                $scope.types = data.types;
                $scope.$apply();
            });
        }

        init();
    });