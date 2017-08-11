angular.module('markets-manage')
.controller('MarketsManageController', MarketsManageController);

function MarketsManageController( $scope ) {

    $scope.markets = [];
    $scope.form = {
        name: "TEST",
        state: "MS",
        city: "Biloxi"
    };

    function init(){
        window.dataService.getMarketsManaged().then(function(_markets){
            $scope.markets = modelFactory.wrapAll("Market", _markets);
            $scope.$apply();
        });
    }

    let onCreate = (market) => {
        swal({
            title: "Success!",
            text: "'"+market.name+"' has been created!",
            type: "success",
        }, init);
    };
    let onDelete = (market) => {
        swal({
            title: "Success!",
            text: "'"+market.name+"' has been deleted.",
            type: "success",
        }, init);
    };

    /**
     * Functions
     * ===============
     */
    $scope.create = () => {
        let market = modelFactory.create("Market", parseNewMarketForm());
        market.save().then(onCreate).catch(somethingWentWrong);
    };
    $scope.destroy = (market) => {
        market.destroy().then(onDelete).catch(somethingWentWrong);
    };

    // $scope.createMarket         = function(){
    //     let formData = parseNewMarketForm();
    //     window.dataService.postResource("markets", {
    //             name: formData.name,
    //             bio: formData.bio,
    //             address: formData.address
    //         }).then(function(id){
    //             console.info("res", id);
    //             swal({
    //                 title: "Success!",
    //                 text: "'"+formData.name+"' has been created!",
    //                 type: "success",
    //             }, function(){
    //                 init();
    //             });
    //         }).catch(function(err){
    //             console.error("err", err);
    //             sweetAlert("Oops...", "Something went wrong!", "error");
    //         });
    // };

    // $scope.deleteMarket         = function(market){
    //     let win = () => {
    //
    //     };
    //     let doIt = () => {
    //         let p = window.dataService.deleteResource("markets", market.id);
    //         p.then( win );
    //         p.catch(window.somethingWentWrong);
    //     };
    //
    //     swal({
    //         title: "Delete Market?",
    //         text: "Are you sure? This can't be undone.",
    //         type: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#DD6B55",
    //         confirmButtonText: "Yes, delete it!",
    //         closeOnConfirm: false
    //     }, doIt );
    // };

    $scope.navService = window.navService;

    $scope.gotoEdit             = function(market){
        window.navService.goto("edit_market", {
            market_id: market.id,
            market: market
        })
    };
    $scope.gotoPage             = function(market){
        window.navService.goto('market_page', {
            market_id: market.id
        })
    };
    $scope.gotoUpcomingEvents   = function(market){
        window.navService.goto('upcoming_events', {
            market: market
        });
    };
    $scope.gotoInvites          = function(market){
        window.navService.goto("invites", {
            market: market
        });
    };

    function parseNewMarketForm() {
        $scope.form['address'] = `${$scope.form.city}, ${$scope.form.state}`;
        return $scope.form;
    }

    init();
}