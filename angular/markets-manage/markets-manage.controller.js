angular.module('markets-manage', [])
.controller('MarketsManageController', MarketsManageController);

function MarketsManageController( $scope ) {
    $scope.ready = false;

    $scope.markets = {};
    $scope.upcoming_events = [];

    /**
     * Functions
     * ===============
     */
    $scope.createMarket = createMarket;
    $scope.deleteMarket = deleteMarket;
    $scope.gotoEdit = gotoEdit;
    $scope.gotoPage = gotoPage;
    $scope.gotoUpcomingEvents = gotoUpcomingEvents;
    $scope.invites = invites;

    function createMarket(){
        let formData = parseNewMarketForm();

        let p = window.dataService.postMarket( formData.name, formData.bio, formData.address );
        p.then(function(res){
            console.info("res", res);
            swal({
                title: "Success!",
                text: "'"+name+"' has been created!",
                type: "success",
            }, function(){
                window.location.reload();
            });
        });
        p.catch(function(err){
            console.error("err", err);
            sweetAlert("Oops...", "Something went wrong!", "error");
        });
    }
    function deleteMarket( market ){
        let win = (res) => {
            swal({
                title: "Success!",
                text: "'"+market.name+"' has been deleted.",
                type: "success",
            }, function(){
                init();
            });
        };
        let doIt = () => {
            let p = window.dataService.deleteMarket(market.id);
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
    }
    function gotoEdit(market){
        window.navService.goto("edit_market", {
            market_id: market.id,
            market: market
        })
    }
    function gotoPage(market){
        window.navService.goto('market_page', {
            market_id: market.id
        })
    }
    function gotoUpcomingEvents(market){
        window.navService.goto('upcoming_events', {
            market: market
        });
    }
    function invites(market){
        window.navService.goto("invites", {
            market: market
        });
    }

    function init(){
        let p = window.dataService.getMarketsManaged();
        p.then(function(res){
            console.info("res", res);
            $scope.$apply(function(){
                $scope.markets = res.data.markets;
                $scope.ready = true;
            });
        });
        p.catch(function(err){
            console.error("err", err);
            alert( "Something went wrong" );
        });
    }
    init();
}