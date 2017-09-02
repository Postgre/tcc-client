angular.module("event-list")
    .controller("EventListController", function ($scope) {

        $scope.events = [];

        function init() {
            dataService.getResourceAll("events", {
                where: "end_time > "+moment().format("YYYY-MM-DD"),
                with: "user"
            }).then((events)=>{
                $scope.events = events;
                $scope.$apply();
                setTimeout(initDataTable, 0);
            },somethingWentWrong)
        }

        $scope.fmt = (date) => moment(date).format("MM/DD/YYYY HH:MM");

        //=================================================

        init();

        function initDataTable(){
            $("#datatable").dataTable();
        }
    });