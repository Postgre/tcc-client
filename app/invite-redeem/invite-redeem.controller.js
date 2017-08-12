angular.module("invite-redeem")
.controller("InviteRedeemController", InviteRedeemController);

function InviteRedeemController( $scope ){

    $scope.handleSubmit = function (code){
        dataService.redeemCarolerInvite(code)
            .then(
                onWin,
                reason => {
                    if(reason === "DUPLICATE") {
                        onDupes();
                        return;
                    }
                    if(reason === "BAD_CODE") {
                        onFail();
                        return;
                    }
                    somethingWentWrong()
                }
            );
    }

    function onWin(){
        swal("Success!", "You have joined this market!", "success");
    }
    function onDupes(){
        swal("Wait a Minute!", "You're already in this market", "warning");
    }
    function onFail(){
        swal("Hmm..", "We don't recognize that code", "error");
    }
}