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

    $scope.markets = []; // markets i perform in

    /**
     * Functions
     * ===============
     */
    $scope.handleClaim = function handleClaim(event, enrollment){
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
                    dataService.claimEvent(enrollment.id)
                        .then(() => {
                            swal("Success!", "You are now registered for "+event.name, "success");
                            init();
                        });
                });
        });
    };
    $scope.handleWithdraw = function handleWithdraw(enrollment_id){
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
                dataService.withdrawEvent(enrollment_id)
                    .then(() => {
                        swal("Done", "You have been withdrawn", "success");
                        init();
                    });
            });
    };

    /**
     * Init
     * ===============
     */
    function init() {
        let p1 = dataService.marketsICarolIn().then(
            (_markets) => {
                $scope.markets = _markets;
                $scope.$apply();
            }
        );
        let p2 = dataService.getAvailableEvents()
            .then(
                (_events) => {
                    toTableRows(_events);
                    $scope.available = _events;
                    $scope.$apply()
                }
            );
        let p3 = dataService.getBookedEvents()
            .then(
                (_events) => {
                    toTableRows(_events);
                    $scope.booked = _events;
                    $scope.$apply()
                }
            );
        let p4 = dataService.getPastEvents()
            .then(
                (_events) => {
                    toTableRows(_events);
                    $scope.past = _events;
                    $scope.$apply()
                }
            );
    }
    init();
}

function toTableRows(_events){
    _events.forEach((_event)=>{
        Object.assign(_event, {
            date: moment(_event.start_time).format("MM-DD-YYYY"),
            time: moment(_event.start_time).format("HH:MM")
        });
    })
}