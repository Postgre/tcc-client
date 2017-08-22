angular.module('market-directors')
    .controller("MarketDirectorsController", MarketDirectorsController);

function MarketDirectorsController($scope){
    $scope.TABLE_INVITES = "app/market-directors/table-invites.html";
    $scope.TABLE_ACTIVE = "app/market-directors/table-active.html";
    $scope.MODAL_INVITE = "app/market-directors/modal-invite.html";

    $scope.market = {};
    $scope.invites = [];
    $scope.active = [];
    $scope.form = {};

    function init(){
        /* load market */
        let market_id = window.getQueryVariable('market');
        let market = modelFactory.get("Market", market_id);
        market.$promise.then(function(){
            $scope.$apply();
        });
        $scope.market = market;
        /* load caroler invites */
        // TODO: caroler -> director
        dataService.getDirectorInvites(market_id).then(
            (invites) => {
                $scope.invites = invites;
                $scope.$apply();
            }, somethingWentWrong
        );
        dataService.getMarketDirectors(market_id).then(
            (active) => {
                $scope.active = active;
                $scope.$apply();
            }, somethingWentWrong
        )
    }

    /**
     * Functions
     * ====================
     */
    $scope.handleResend = function handleResend(row){
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
            dataService.cancelDirectorInvite(row.id)
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
        sendInvite(form.email);
        init();
    };

    /* business logic */
    function sendInvite(to_email){
        dataService.sendDirectorInvite($scope.market.id, to_email)
            .then(
                () => {
                    swal("Done!", "Invite has been sent", "success");
                    init();
                    $("#modal").modal("hide");
                },
                (status) => {
                    if(status === "DUPLICATE"){
                        swal("Wait a minute!", "That director already manages this market.", "warning");
                        return;
                    }
                    somethingWentWrong();
                }
            );
    }

    init();
}