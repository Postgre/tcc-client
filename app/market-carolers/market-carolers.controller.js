angular.module('market-carolers')
    .controller("MarketCarolersController", MarketCarolersController);

function MarketCarolersController($scope){
    $scope.market = {
        name: "Sample Market"
    };
    $scope.requests = [];
    $scope.found = [];

    /**
     * Functions
     * ====================
     */
    $scope.searchUsers = () => {
        // TODO: optomize
        window.dataService.searchUsers($scope.searchUsersInput)
            .then((users)=>{
                console.log(users);
                $scope.$apply(function(){
                    $scope.found = users;
                });
            });
    };
    $scope.inviteCaroler = (caroler) => {
        window.dataService.postDelegationsCaroler($scope.market.id, caroler.email)
            .then(()=>{
                swal("Success!", caroler.name+" has been invited", "success");
            })
            .catch((status)=>{
                switch (status){
                    case "DUPLICATE":
                        swal("Wait a minute!", caroler.name+" already belongs to this market.", "warning");
                        break;
                }
            });
    };

    (function init(){
        let market;
        modelFactory.find("Market", navService.getNavParam('market_id')).then(
            (mkt)=>{
                market = mkt;
                market.getCarolers().then(
                    (carolers)=>{
                        $scope.market = market;
                        $scope.$apply();
                    }
                )
            }
        );
    })();
}