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
            $scope.cancelled = d.cancelled;
            marketMap = d.markets;
            $scope.ready = true;
            $scope.$apply();
        });

    }

    init();
}