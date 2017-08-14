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
    $scope.requests = [
        {
            sent: new Date().toDateString(),
            name: "Beric Dondarion",
            email: "beric.dondarion@thewall.com"
        },
        {
            sent: new Date().toDateString(),
            name: "Jon Snow",
            email: "jon.snow@gmail.com"
        }
    ];
    $scope.invites = [
        {
            status: "delivered",
            email: "sandor.clegane@thewall.com",
            sent: new Date().toDateString()
        }
    ];
    $scope.form = {};

    function init(){
        /* load market */
        let market_id = window.getQueryVariable('market');
        let market = modelFactory.get("Market", market_id);
        market.$promise.then(function(){
            console.log("market loaded..", market);
            $scope.$apply();
        });
        $scope.market = market;
        /* load caroler requests */
        dataService.getCarolerRequests(market_id).then(
            (requests) => {
                console.info("loaded requests", requests);
                // $scope.requests = requests;
                // $scope.$apply();
            }, somethingWentWrong
        );
        /* load caroler invites */
        dataService.getCarolerInvites(market_id).then(
            (invites) => {
                console.info("loaded invites", invites);
                // $scope.invites = invites;
                // $scope.$apply();
            }, somethingWentWrong
        )
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