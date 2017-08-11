angular.module('markets-manage')
.controller('MarketsManageController', MarketsManageController);

function MarketsManageController( $scope ) {

    $scope.markets = [];
    $scope.form = {};

    function init(){
        window.dataService.getMarketsManaged().then(function(_markets){
            console.log(_markets);
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
        market.save().then(onCreate).catch((err)=>{
            let s = err.response.data.status;
            if(s === "BAD_ADDRESS"){
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

    function parseNewMarketForm() {
        $scope.form['address'] = `${$scope.form.city}, ${$scope.form.state}`;
        return $scope.form;
    }

    init();
}


function alertBadAddress(){
    swal("Bad Address", "That address could not be resolved", "error");
}