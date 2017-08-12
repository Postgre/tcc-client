angular.module('market-carolers')
    .controller("MarketCarolersController", MarketCarolersController);

function MarketCarolersController($scope){
    $scope.TABLE_INVITES = "app/market-carolers/table-invites.html";
    $scope.TABLE_REQUESTS = "app/market-carolers/table-requests.html";
    $scope.MODAL_INVITE = "app/market-carolers/modal-invite.html";

    $scope.market = {
        name: "Birmingham Market",
        address: "1500 1st Avenue N, Birmingham, AL"
    };
    $scope.requests = [];
    $scope.invites = [];
    $scope.form = {};

    function init(){
        let market_id = window.getQueryVariable('market');
        modelFactory.find("Market", market_id).then(
            (market)=>{
                console.log("market loaded..", market);
                $scope.market = market;
                $scope.$apply();
            }
        );
    }

    /**
     * Functions
     * ====================
     */

    /* handlers */
    function handleApprove(row){

    }
    function handleReject(row){

    }
    function handleResend(row){

    }
    function handleCancel(row){

    }
    function handleForm(form){

    }

    /* business logic */
    function approveRequest(request){
        // win => swal("Success!", "caroler has been granted access", "success"),
        // dupes => swal("Wait a minute!", "That caroler already belongs to this market.", "warning");
        // fail => somethingWentWrong()
    }
    function sendInvite(caroler){
        $scope.market.inviteCaroler(caroler.email)
            .then(
                (win) => swal("Done!", "Caroler has joined market", "success"),
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