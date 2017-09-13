angular.module('markets-manage')
.controller('MarketsManageController', MarketsManageController);

function MarketsManageController( $scope ) {

    $scope.markets = [];
    $scope.form = {};
    $scope.roles = authService.user.roles;

    function init(){
        window.dataService.getMarketsManaged().then(function(_markets){
            console.log(_markets);
            $scope.markets = modelFactory.wrapAll("Market", _markets);
            $scope.ready = true;
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
        market.save().then(
            onCreate,
            err =>{
                if(err.response.data.status === "BAD_ADDRESS"){
                    alertBadAddress();
                    return;
                }
                somethingWentWrong();
            });
    };
    $scope.destroy = (market) => {
        market.destroy().then(onDelete).catch(somethingWentWrong);
    };
    $scope.navService = window.navService;

    $scope.truncate = function truncate(marketBio, id){
        let charLimit = 255;
        if(marketBio.length <= charLimit) return marketBio;
        return marketBio.substring(0, charLimit) + `... &nbsp <a href='market-page.php?market=${id}'>see more</a>`;
    };

    function parseNewMarketForm() {
        $scope.form['address'] = `${$scope.form.city}, ${$scope.form.state}`;
        return $scope.form;
    }

    init();
}


function alertBadAddress(){
    swal("Bad Address", "That address could not be resolved", "error");
}