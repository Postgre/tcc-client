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
            setTimeout(function(){
                swal("Success!", "You are now registered for "+event.name, "success");
            }, 2000);
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
                setTimeout(function(){
                    swal("Done", "You have been withdrawn from "+event.name, "success");
                }, 2000);
            });
    };

    /**
     * Init
     * ===============
     */
    (function init() {
        let cust = ['Jamie Lannister', 'Tyrion Lannister', 'Cersi Lannister', 'Tywin Lannister', 'Lancel Lannister', 'Kevan Lannister'];
        let stats = ['booked', 'pending', 'pending approval', 'overdue']

        for(let i = 0; i < 100; i++){
            let mom = moment().add(getRandomInt(1, 100), 'days').add(getRandomInt(1, 100), 'hours');
            let date = mom.format("MM/DD/YYYY");
            let time = mom.format("HH:MM");
            let event = {
                customer: cust[getRandomInt(0, cust.length-1)],
                date: date,
                time: time,
                status: stats[getRandomInt(0, stats.length-1)],
                parts: [
                    {
                        name: "alto"
                    },
                    {
                        name: "soprano"
                    }
                ]
            };
            $scope.available.push(event);
            $scope.booked.push(event);
        }
    })();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}