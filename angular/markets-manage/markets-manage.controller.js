angular.module('markets-manage')
.controller('MarketsManageController', MarketsManageController);

function MarketsManageController( $scope ) {
    $scope.ready = false;

    $scope.markets = {};
    $scope.upcoming_events = [];
    /**
     * Models
     * ===============
     */

    /**
     * Functions
     * ===============
     */
    $scope.createMarket = createMarket;
    $scope.deleteMarket = deleteMarket;
    $scope.gotoEdit = gotoEdit;
    $scope.gotoPage = gotoPage;
    $scope.invites = invites;
    $scope.gotoUpcomingEvents = gotoUpcomingEvents;
    function createMarket(){
        var form = document.forms.newMarketForm;
        var name = form.name.value;
        var address = form.city.value+', '+form.state.value;
        var bio = "Edit this market to write a BIO and upload a banner!";

        var p = window.dataService.postMarket( name, bio, address );
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
        swal({
            title: "Delete Market?",
            text: "Are you sure? This can't be undone.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function(){
            var p = window.dataService.deleteMarket(market.id);
            p.then(function(res){
                console.info("res", res);
                swal({
                    title: "Success!",
                    text: "'"+market.name+"' has been deleted.",
                    type: "success",
                }, function(){
                    window.location.reload();
                });
            });
            p.catch(function(err){
                console.error("err", err);
                sweetAlert("Oops...", "Something went wrong!", "error");
            });
        });

    }
    function gotoEdit(market){
        window.navService.goto("edit_market", {
            market_id: market.id,
            market: market
        })
    }
    function invites(market){
        window.navService.goto("invites", {
            market: market
        });
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

    (function init(){
        var p = window.dataService.getMarketsManaged();
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
    })();
}