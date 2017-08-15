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
            showLoaderOnConfirm: false
        },
        function(){
            swal({
                    title: "Are you willing to be the lead caroler?",
                    text: "A lead caroler is responsible for communicating with the customer. (And they get paid more!)",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "Yes, I am!",
                    cancelButtonText: "I'll Pass",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                },
                function(choice){
                    console.log("lead?", choice);
                    dataService.claimEvent(event.id)
                        .then(() => swal("Success!", "You are now registered for "+event.name, "success"));
                });
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