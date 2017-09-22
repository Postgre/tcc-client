angular.module("customer-events")
    .controller('CustomerEventsController', CustomerEventsController);

function CustomerEventsController( $scope, dataService ) {

    $scope.past = [];
    $scope.open = [];
    $scope.cancelled = [];
    let marketMap = {};

    /**
     * Functions
     * ===============
     */
    $scope.fmtDate = fmtDate;

    function fmtDate(date){
        return moment(date).format("MM/DD/YYYY");
    }

    $scope.requireFull = requireFull;
    $scope.cancelEvent = cancelEvent;

    function requireFull(date) {
        let ev = moment(date);
        let now = moment();
        return ev.diff(now, 'days') < 30;
    }

    function cancelEvent(event){
        swal("Cancel Event", "To cancel or modify an existing event, please call us", "info");
    }

    /**
     * Init
     * ===============
     */
    function init(){

        dataService.connection({
            url: "customer/orders",
            method: "GET",
        }).then((res)=>{
            let d = res.data;
            $scope.past = d.past;
            $scope.open = d.open;
            $scope.open.sort(function(evA, evB){
                // moves overdue events up
                if(evA.status === 'overdue') return -1;
                if(evB.status === 'overdue') return 1;
            });
            $scope.cancelled = d.cancelled;
            marketMap = d.markets;
            $scope.ready = true;
            $scope.$apply();
        });

    }

    init();
}