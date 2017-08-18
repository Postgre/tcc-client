angular.module("invite-redeem")
.controller("InviteRedeemController", InviteRedeemController);

function InviteRedeemController( $scope ){

    $scope.code = "";
    $scope.role = "caroler";
    let doInvite;

    function init(){
        doInvite = dataService.redeemCarolerInvite;
        if(rac = getQueryVariable('code')){
            $scope.code = rac;
        }
        if(role = getQueryVariable("role")){
            if(role === "d"){
                $scope.role = "director";
                doInvite = dataService.redeemDirectorInvite;
            }
        }
    }

    $scope.handleSubmit = function (code){
        if(!code.match(/\w{6}/)){
            swal("Invalid Format", "Please review your code", "error");
            return;
        }
        doInvite(code)
            .then(
                onWin,
                reason => {
                    if(reason === "INVITE_ALREADY_REDEEMED") {
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
    };

    init();
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