angular.module("caroler-list")
.controller("CarolerListController", CarolerListController);

function CarolerListController( $scope ){
    $scope.rows = [
        {
            name: "Caleb Falcione",
            pricing_offset: 50,
            pricing_scale: null,
            email: "caleb.falcione@gmail.com"
        },
        {
            name: "Chris Rocco",
            pricing_offset: null,
            pricing_scale: 0.13,
            email: "caleb.falcione@gmail.com"
        }
    ];
}