angular.module('markets-manage', [])
.controller('MarketsManageController', MarketsManageController);

function MarketsManageController( $scope ) {

    $scope.markets = {};
    $scope.upcoming_events = [];

    $scope.ready = false;

    /**
     * Functions
     * ===============
     */
    $scope.createMarket         = function(){
        let formData = parseNewMarketForm();
        window.dataService.postResource("markets", {
                name: formData.name,
                bio: formData.bio,
                address: formData.address
            }).then(function(id){
                console.info("res", id);
                swal({
                    title: "Success!",
                    text: "'"+formData.name+"' has been created!",
                    type: "success",
                }, function(){
                    init();
                });
            }).catch(function(err){
                console.error("err", err);
                sweetAlert("Oops...", "Something went wrong!", "error");
            });
    };
    $scope.deleteMarket         = function(market){
        let win = () => {
            swal({
                title: "Success!",
                text: "'"+market.name+"' has been deleted.",
                type: "success",
            }, function(){
                init();
            });
        };
        let doIt = () => {
            let p = window.dataService.deleteResource("markets", market.id);
            p.then( win );
            p.catch(window.somethingWentWrong);
        };

        swal({
            title: "Delete Market?",
            text: "Are you sure? This can't be undone.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, doIt );
    };
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

    function init(){
        window.dataService.getMarketsManaged()
            .then(function(markets){
                $scope.markets = markets;
                $scope.ready = true;
                $scope.$apply();
            }).catch(function(err){
                console.error("err", err);
                alert( "Something went wrong" );
            });
    }
    init();
}