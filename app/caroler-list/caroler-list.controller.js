angular.module("caroler-list")
    .controller("CarolerListController", function ($scope) {

        $scope.carolers = [];

        function init() {
            dataService.getResourceAll("users").then((carolers)=>{
                $scope.carolers = carolers;
                $scope.$apply();
            }).catch((err)=>{
                console.log(err);
            })
        }

        init();
    });