angular.module("invite-redeem")
.controller("InviteRedeemController", InviteRedeemController);

function InviteRedeemController( $scope ){

    $scope.code = "";
    $scope.role = "caroler";

    function init(){
        let mkt = getQueryVariable("market");
        let code = getQueryVariable("code");
        let role = getQueryVariable("role");

        $scope.code = code;
        $scope.role = role;
        $scope.market = modelFactory.get("Market", mkt);
        $scope.market.$promise.then(
            (market) => { $scope.$apply(); },
            somethingWentWrong
        )
    }

    $scope.handleSubmit = function (code){
        if(!code.match(/\w{6}/)){
            swal("Invalid Format", "Please review your code", "error");
            return;
        }
        dataService.redeemDirectorInvite(code)
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
    swal({
        title: "Success!",
        text: "You have joined this market!",
        type: "success",
        showCancelButton: true,
        confirmButtonText: "Let's get started",
        closeOnConfirm: false
    },
    function(){
        authService.refresh().then(()=>{
            window.location = "index.php";
        });
    });
}
function onDupes(){
    swal("Wait a Minute!", "You're already in this market", "warning");
}
function onFail(){
    swal("Hmm..", "We don't recognize that code", "error");
}