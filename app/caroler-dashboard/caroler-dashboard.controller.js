angular.module('caroler-dashboard')
    .controller('CarolerDashboardController', CarolerDashboardController);

function CarolerDashboardController($scope) {
    /**
     * Models
     * ===============
     */
    $scope.available = [];
    $scope.booked = [];
    $scope.past = [];

    /**
     * Functions
     * ===============
     */
    $scope.handleClaim = function handleClaim(event){
        swal({
            title: "Are you sure?",
            text: "We'll expect you to show!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, claim event!",
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
        function(){
            dataService.claimEvent(event.id)
                .then(() => swal("Success!", "You are now registered for "+event.name, "success"));
        });
    };
    $scope.handleWithdraw = function handleWithdraw(event){
        swal({
                title: "Aw Man..",
                text: "Your fellow carolers won't like this",
                type: "error",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "Deal with it.",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            },
            function(){
                dataService.withdrawEvent(event.id)
                    .then(() => swal("Done", "You have been withdrawn from "+event.name, "success"));
            });
    };

    /**
     * Init
     * ===============
     */
    (function init() {
        dataService.getCarolerEvents()
            .then(
                (_events) => {
                    $scope.available = _events;
                    $scope.$apply()
                }
            );
        dataService.getCarolerEvents()
            .then(
                (_events) => {
                    $scope.booked = _events;
                    $scope.$apply()
                }
            );
        dataService.getCarolerEvents()
            .then(
                (_events) => {
                    $scope.past = _events;
                    $scope.$apply()
                }
            );
    })();
}