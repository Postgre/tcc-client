angular.module('market-carolers')
    .controller("MarketCarolersController", MarketCarolersController);

function MarketCarolersController($scope){
    $scope.TABLE_REQUESTS = "app/market-carolers/table-requests.html";
    $scope.MODAL_INVITE = "app/market-carolers/modal-invite.html";

    $scope.market = {};
    $scope.requests = [];
    $scope.active = [];
    $scope.form = {};

    function init(){
        /* load market */
        let market_id = window.getQueryVariable('market');
        dataService.marketCarolers(market_id).then(
            (res) => {
                let data = res.data;
                $scope.market = data.market;
                $scope.active = data.carolers;
                $scope.requests = data.requests;
                $scope.$apply();
            }, somethingWentWrong
        );
    }

    /**
     * Functions
     * ====================
     */
    $scope.handleApprove = function handleApprove(row){
        console.log("approving...", row);
        swal({
            title: `Approve ${row.user.name}?`,
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },
        function(){
            dataService.approveCarolerRequest(row.id)
                .then(
                    () => {
                        swal("Approved!", `${row.user.name} is now a caroler of ${$scope.market.name}`, "success");
                        init();
                    }, somethingWentWrong
                );
        });
    };
    $scope.handleReject = function handleReject(row){
        console.log("rejecting...", row);
        swal({
            title: `Reject ${row.user.name}?`,
            type: "error",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            cancelButtonText: "No, I didn't mean it!",
            showLoaderOnConfirm: true,
        },
        function(){
            dataService.rejectCarolerRequest(row.id)
                .then(
                    () => {
                        swal("Ouch!", `${row.user.name} just got rejected!\n(We wont tell him it was you)`, "info");
                        init();
                    },
                    somethingWentWrong
                )
        });
    };
    $scope.handleResend = function handleResend(row){
        console.log("resending...", row);
        swal({
            title: "Resend Invite?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },
        function(){
            setTimeout(function(){
                swal("Done!", "We re-sent the invite email", "success");
            }, 2000);
        });
    };
    $scope.handleCancel = function handleCancel(row){
        swal({
            title: "Cancel Invite?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },
        function(){
            dataService.cancelCarolerInvite(row.id)
                .then(
                    () => {
                        swal("Done!", "We've canceled the invite to "+row.name, "success");
                        init();
                    },
                    somethingWentWrong
                )
        });
    };
    $scope.handleForm = function handleForm(form){
        console.log("sending...", form);
        sendInvite(form.email);
    };

    /* business logic */
    function sendInvite(to_email){
        dataService.sendCarolerInvite($scope.market.id, to_email)
            .then(
                (win) => swal("Done!", "Invite has been sent", "success"),
                (status) => {
                    if(status === "DUPLICATE"){
                        swal("Wait a minute!", "That caroler already belongs to this market.", "warning");
                        return;
                    }
                    somethingWentWrong();
                }
            );
    }

    init();
}