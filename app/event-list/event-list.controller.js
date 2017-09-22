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

        $scope.recordPayment = function(event){
            let doit = (invoiceID, userID, amount) => {
                dataService.recordPayment(invoiceID, userID, amount)
                    .then(
                        (res) => {
                            swal("Success!", "Payment has been recorded", "success");
                            init();
                        },
                        (err) => {
                            swal(err.response.data.status, "Could not record payment", "error");
                        }
                    )
            };

            $("#modal").modal("hide");
            let invoiceID = event.invoice.id;
            let userID = event.host_id;

            swal({
                title: "Record Payment",
                text: "Provide an Amount:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: "Ex: 400"
            }, function (inputValue) {
                amount = parseInt(inputValue);
                if (amount === false) return false;
                if (amount === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }

                /* convert from pennies to dollars */
                amount *= 100;
                doit(invoiceID, userID, amount);
            });
            console.log(event);
        };

        //=================================================

        init();

        function initDataTable(){
            $("#datatable").dataTable();
        }
    });