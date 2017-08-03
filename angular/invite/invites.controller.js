angular.module('invite', [])
    .controller("InviteController", InviteController);

function InviteController($scope){
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
        $scope.market = window.navService.getNavParams().market;
    })();
}