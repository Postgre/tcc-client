angular.module("event-list")
    .controller("EventListController", function ($scope) {

        $scope.events = [];

        function init() {
            dataService.getResourceAll("events", {
                where: "end_time > "+moment().format("YYYY-MM-DD"),
                with: ["user", "invoice", "carolerConfig"]
            }).then((events)=>{
                $scope.events = events;
                $scope.$apply();
                setTimeout(initDataTable, 0);
            },somethingWentWrong)
        }

        $scope.fmt = (date) => moment(date).format("MM/DD/YYYY HH:MM");

        $scope.viewOrder = function(event){
            $scope.event = event;
            $("#modal").modal("show");
        };

        //=================================================

        init();

        function initDataTable(){
            $("#datatable").dataTable();
        }
    });