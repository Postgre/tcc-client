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

        $scope.cancelEvent = function(event){
            swal({
                title: "Are you sure?",
                text: "Your will not be able to undo this action!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, cancel it!",
                closeOnConfirm: false
            },
            function(){
                dataService.cancelEvent(event.id)
                    .then(
                        (res)=>{
                            swal("Done.", "The event has been cancelled.\nNOTE: the amount has not been refunded automatically", "success");
                        },
                        (err)=>{
                            let d = err.response.data;
                            swal(d.status, d.msg, "error");
                        }
                    )
            });
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